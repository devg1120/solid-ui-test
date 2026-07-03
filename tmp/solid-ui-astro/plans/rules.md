# Global Rules

- Port primitive file fully into `src/registry/ui/<primitive>.tsx`.
- If source is `zaidan`: convert `z-*` classes to `cn-*`, replace direct lucide usage with `src/components/icon-placeholder.tsx`.
- Port docs page into `src/content/docs/components/<primitive>.mdx` adapted to Kobalte API.
- Port every docs-referenced example into `src/registry/examples`.
- Update `src/registry/ui/_registry.ts` and `src/registry/examples/_registry.ts` entries for each new primitive/example.
- RTL support is not included yet: skip RTL-specific docs sections/previews and skip all `*-rtl` examples.
- Keep docs in non-RTL parity with the source page (sections, usage notes, and API content), not just a minimal rewrite.
- Keep `ComponentPreview` centered by default and preserve source API depth (tables/snippets) when present; use `align="start"` only when layout requires it.
- Don't use webfetch, everything you need is locally available
