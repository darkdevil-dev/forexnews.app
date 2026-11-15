# TEST_READY: ForexNews Blog Expansion & 2027 SEO Dominance Test Suite

## Overview
The automated end-to-end verification suite has been designed, implemented, and verified in `tests/verify_blog_audit.py`.
The suite comprehensively validates all 7 core requirements from `ORIGINAL_REQUEST.md` and `PROJECT.md` against both source code (`src/`, `scripts/`, `public/`, `index.html`) and pre-rendered production artifacts (`dist/`).

---

## Test Execution Commands

### Run Full Test Suite (All 7 Suites)
```bash
python tests/verify_blog_audit.py
```
Exit code `0` indicates 100% compliance across all criteria. Exit code `1` indicates one or more defects detected.

### Run Individual Test Suites
```bash
# 1. Zero Em Dash Test
python tests/verify_blog_audit.py --suite em_dash

# 2. Word Count Test (2000+ words floor)
python tests/verify_blog_audit.py --suite word_count

# 3. 2027 Targeting & Competitor Coverage Test
python tests/verify_blog_audit.py --suite competitor_2027

# 4. Inline Links Test (Play Store & Homepage Anchors)
python tests/verify_blog_audit.py --suite inline_links

# 5. JSON-LD Schema Test (BlogPosting & BreadcrumbList)
python tests/verify_blog_audit.py --suite jsonld

# 6. Audit Compliance Test (page_checks.py 0/0/0/0)
python tests/verify_blog_audit.py --suite audit

# 7. Lint & Build Test
python tests/verify_blog_audit.py --suite lint_build
```

### Advanced Flags
- `--verbose`: Displays line numbers, snippets, and individual page findings.
- `--skip-build`: Skips the `npm run build` step during `lint_build` suite for fast local iteration.
- `--json`: Outputs structured JSON results for automated CI/CD parsing.

---

## Test Suite Architecture & Verification Matrix

| # | Test Suite | Scope & Target Files | Verification & Assertion Rules | Authoritative Source |
|---|------------|----------------------|--------------------------------|----------------------|
| 1 | `em_dash` | `src/`, `public/`, `scripts/`, `index.html`, `dist/` | Scans for `\u2014`, `&mdash;`, `&#8212;`, `&#x2014;`. Asserts 0 occurrences across all text assets. | ORIGINAL_REQUEST §1 |
| 2 | `word_count` | `src/data/blogPosts.js`, `dist/blog/*/index.html` | Asserts `wordCount >= 2000` property in JS post object, raw body text >= 2000 words, rendered HTML visible text >= 2000 words, and schema `wordCount >= 2000`. | ORIGINAL_REQUEST §2 |
| 3 | `competitor_2027` | `src/data/blogPosts.js`, `dist/blog/*/index.html` | Asserts target year "2027" appears in titles, meta descriptions, and body. Asserts substantive coverage of Forex Factory, Myfxbook, Investing.com, DailyFX, FXStreet across latency, push alerts, calculators, and UI noise/ad fatigue. | ORIGINAL_REQUEST §3, §4 |
| 4 | `inline_links` | `src/data/blogPosts.js`, `dist/blog/*/index.html` | Asserts presence of Play Store link (`https://play.google.com/store/apps/details?id=com.forexnews.app`) and internal anchors (`/#calculators`, `/#alerts`, `/#features`) rendered as genuine `<a>` tags. Asserts zero unparsed markdown link syntax leaked into rendered HTML. | ORIGINAL_REQUEST §5 |
| 5 | `jsonld` | `dist/blog/*/index.html` | Validates valid JSON-LD syntax. Asserts `BlogPosting` schema contains `headline`, `description`, `datePublished`, `dateModified`, `author`, `publisher`, `wordCount >= 2000`, and valid `inLanguage` (e.g. `en`). Asserts `BreadcrumbList` has >= 3 valid `ListItem` entries. Supports top-level and `@graph` layouts. | ORIGINAL_REQUEST §6, PROJECT.md |
| 6 | `audit` | `dist/**/*.html` | Executes `C:\Users\dell\.gemini\config\skills\seo\scripts\page_checks.py` on all HTML files in `dist/`. Verifies blog posts and legal pages exist. Asserts 0 Critical, 0 High, 0 Medium, 0 Low. | ORIGINAL_REQUEST §6 |
| 7 | `lint_build` | Workspace root | Executes `npm run lint` and asserts exit code 0 (zero errors). Executes `npm run build` and asserts exit code 0. | ORIGINAL_REQUEST §6 |

---

## Baseline Test Execution Results (Pre-Implementation)

The test suite was executed against the existing repository state to verify its sensitivity and reporting accuracy. All 7 suites correctly detected the pre-implementation defects:

```
===========================================================================
 TEST SUITE SUMMARY
===========================================================================
[FAIL] Zero Em Dash Test
       -> 20+ em dashes found in src/data/blogPosts.js, index.html, dist/
[FAIL] Word Count Test (>= 2000 words)
       -> Existing 4 articles range between 724 and 1022 words (< 2000 floor)
[FAIL] 2027 Targeting & Competitor Coverage Test
       -> Year 2027 missing from titles; 0 of 5 required competitors covered
[FAIL] Inline Links Test
       -> Play Store link & internal anchor links missing from articles
[FAIL] JSON-LD Schema Test
       -> BlogPosting missing wordCount and inLanguage; BreadcrumbList missing in articles
[FAIL] Audit Compliance Test (page_checks.py)
       -> 5 Medium findings: 'title-too-short' on privacy, terms, risk-disclaimer, refund, refund-policy
[FAIL] Lint & Build Test
       -> scripts/generate-static-pages.js has duplicate code syntax error at line 423
       -> src/pages/BlogPostPage.jsx has conditional hook violations
---------------------------------------------------------------------------
TOTAL: 7 suites | PASSED: 0 | FAILED: 7
OVERALL RESULT: FAILURES DETECTED [DEFECTS ESCALATED TO IMPLEMENTING AGENT]
===========================================================================
```

---

## Defect Escalation for Implementing Agent

1. **Syntax Error in `scripts/generate-static-pages.js:423`**:
   - Duplicate block lines 423-428 (`${sectionsHtml}\n${faqsHtml}...`) outside string template breaks Node compilation during `npm run build`.
2. **ESLint Violations in `src/pages/BlogPostPage.jsx`**:
   - `usePageMeta` and `useEffect` called after early conditional `return`, violating React hook rules.
3. **Em Dash Occurrences**:
   - Multiple `\u2014` and `&mdash;` instances in `src/data/blogPosts.js` and `index.html`. Replace with hyphens, colons, or parentheses.
4. **Article Word Counts & Expansion**:
   - All articles must expand to >= 2000 words of substantive, math-rich, analytical content with explicit `wordCount: number` in `src/data/blogPosts.js`.
5. **2027 & Competitor Comparison Content**:
   - Update titles to target 2027. Add direct comparison articles covering Forex Factory, Myfxbook, Investing.com, DailyFX, FXStreet.
6. **Markdown Link Parsing in SSG**:
   - Ensure `scripts/generate-static-pages.js` converts `[text](url)` to `<a href="url">text</a>` so Play Store and internal links render as genuine `<a>` tags.
7. **Legal Page Titles**:
   - Extend page titles in `standardPages` to 30-60 characters to eliminate `title-too-short` Medium findings on `privacy`, `terms`, `risk-disclaimer`, `refund-policy`, and `refund`.
8. **JSON-LD Schema Expansion**:
   - Add `wordCount` (>= 2000) and `inLanguage: "en"` to `BlogPosting` schemas, and include `BreadcrumbList`.
