## What changes

<!-- One rule, one example, or one site improvement per PR. -->

**Rule(s) affected:** <!-- section number and rule_id, e.g. §9.3.3 tables-multi-row-header-tiers, or "site only" -->

**Discussion:** <!-- link the issue for any change to a requirement -->

## Checklist

- [ ] Source edits under `protocol/` and the regenerated files in `app/data/`, `resources/` and `public/` are committed together
- [ ] `pnpm protocol:check` passes
- [ ] `python -m unittest discover -s tests -p 'test_*.py'` passes
- [ ] For site changes: `npx tsc --noEmit`, `pnpm exec eslint app` and `pnpm exec next build --webpack` pass
- [ ] Any new image is public, openly licensed or constructed, and recorded in `protocol/tools/provenance/manifest.json`
- [ ] I agree this contribution is licensed under MIT (code) and CC BY 4.0 (protocol text and examples)
