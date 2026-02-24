import json
from pathlib import Path
from typing import List, Optional

import feedparser
from markdownify import markdownify as md
from pydantic import BaseModel, HttpUrl


class FeedConfig(BaseModel):
    name: str
    url: HttpUrl


class Headline(BaseModel):
    source: str
    title: str
    link: HttpUrl
    published: Optional[str] = None
    summary: Optional[str] = None


def clean_summary(raw: str, max_len: int = 220) -> str:
    # Keep short, transformed summaries only (no full-text copy)
    text = md(raw or "", strip=["a", "img"]).replace("\n", " ").strip()
    text = " ".join(text.split())
    return (text[: max_len - 1] + "...") if len(text) > max_len else text


def load_feeds(path: Path) -> List[FeedConfig]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return [FeedConfig(**item) for item in data]


def fetch_headlines(feeds: List[FeedConfig], per_feed: int = 5) -> List[Headline]:
    out: List[Headline] = []
    for feed in feeds:
        parsed = feedparser.parse(str(feed.url))
        for entry in parsed.entries[:per_feed]:
            out.append(
                Headline(
                    source=feed.name,
                    title=(entry.get("title") or "(no title)").strip(),
                    link=entry.get("link"),
                    published=entry.get("published"),
                    summary=clean_summary(entry.get("summary", "")),
                )
            )
    return out


def print_report(items: List[Headline]) -> None:
    print("# Market Brief (Headlines + Links)")
    print("# Policy note: summary/link only. Do not republish full article body.\n")
    for idx, item in enumerate(items, start=1):
        print(f"{idx}. [{item.source}] {item.title}")
        print(f"   - Link: {item.link}")
        if item.published:
            print(f"   - Published: {item.published}")
        if item.summary:
            print(f"   - Summary: {item.summary}")
        print()


if __name__ == "__main__":
    config_path = Path("feeds.json")
    feeds = load_feeds(config_path)
    headlines = fetch_headlines(feeds, per_feed=5)
    print_report(headlines)
