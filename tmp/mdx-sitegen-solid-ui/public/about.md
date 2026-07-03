---
title: About Us
description: Learn more about our project
layout: default
---

# About Us

This is a dynamically loaded markdown page. The system automatically detected that there's no specific route component for `/about` and loaded this markdown file instead.

## Features

- **Dynamic Loading**: Markdown files are loaded automatically
- **Flexible Routing**: Works for any URL that doesn't have a specific route
- **Layout Support**: Different layouts based on frontmatter

## How it works

When you visit a URL that doesn't have a specific route component, the system:

1. Checks for markdown files in multiple locations
2. Loads and parses the frontmatter
3. Renders the content with the appropriate layout

This allows you to create new pages just by adding markdown files!
