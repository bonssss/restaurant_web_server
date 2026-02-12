# Medium Node.js Tag Scraper API

A Node.js project using **Puppeteer** to scrape Medium articles tagged with Node.js and serve them via a **JSON API**.  
Includes optional **keyword filtering** and duplicate removal.

---

## Features

- Scrapes article **titles** and **URLs** from Medium’s Node.js tag page.
- Filters articles by a **keyword** (case-insensitive).
- Serves scraped results via a **JSON API** (`/api/articles`).
- Supports multiple page scraping (infinite scroll simulation).
- Removes duplicate articles automatically.
- Compatible with older Puppeteer versions using a Promise-based delay.

---

## Prerequisites

- Node.js v18+ (tested on v22)
- npm
- Windows / Linux / macOS