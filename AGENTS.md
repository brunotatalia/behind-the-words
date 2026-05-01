<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Question content rules (enforced)

Every entry in `src/data/questions.json` MUST have a `sources` array and a `verified` boolean. The build runs `scripts/validate-questions.mjs` in `prebuild` and fails on violations.

When adding or modifying any question:

1. **Verify the explanation** against at least 2 independent sources. Do NOT rely on model knowledge alone — fetch the actual sources (WebFetch / WebSearch).
2. **Prefer Hebrew sources** (Wikipedia HE, Haaretz, Ynet, Mako music) when they cover the song; otherwise English (Wikipedia EN, Songfacts, Genius, Rolling Stone, official artist site, documented interview).
3. **At least one non-Wikipedia source** is required for `verified: true`.
4. **Every factual claim** in `explanation_he` must be traceable to one of the listed sources. If you cannot source a claim, remove it from the explanation.
5. **Source object shape** (see [src/types/question.ts](src/types/question.ts)):
   - `url` — direct link, https preferred
   - `title` — page/article title in its original language
   - `type` — one of: `wikipedia`, `songfacts`, `genius`, `interview`, `book`, `article`, `official`
   - `accessed` — ISO date `YYYY-MM-DD` of when you verified it
6. **`verified: true`** only when the above are satisfied. Otherwise leave `verified: false` (allowed in the dataset, but flagged in stats).
7. After editing, run `npm run validate:questions` locally before committing.
