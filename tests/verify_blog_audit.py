#!/usr/bin/env python3
"""
ForexNews.app Automated Blog & SEO Compliance Audit Suite
=========================================================

Verifies all rules and specifications from ORIGINAL_REQUEST.md and PROJECT.md:
1. Zero Em Dash Test: Confirms no em dashes (\\u2014, &mdash;, &#8212;, &#x2014;) exist across
   src/, public/, scripts/, index.html, dist/.
2. Word Count Test: Verifies every blog article in dist/blog/*/index.html and
   src/data/blogPosts.js strictly meets or exceeds 2000 words.
3. 2027 Targeting & Competitor Coverage Test: Checks that articles reference 2027 and
   cover the direct competitors (Forex Factory, Myfxbook, Investing.com, DailyFX, FXStreet).
4. Inline Links Test: Checks presence of Google Play Store link
   (https://play.google.com/store/apps/details?id=com.forexnews.app) and internal links
   (/#calculators, /#alerts, /#features) rendered as genuine <a> tags.
5. JSON-LD Schema Test: Validates BlogPosting (with wordCount, inLanguage) and
   BreadcrumbList schemas in static HTML.
6. Audit Compliance Test: Runs page_checks.py across all HTML files in dist/ and asserts
   0 Critical, 0 High, 0 Medium, 0 Low.
7. Lint & Build Test: Asserts npm run lint passes with 0 errors and npm run build completes
   with exit code 0.

Usage:
    python tests/verify_blog_audit.py                  # Run all 7 test suites
    python tests/verify_blog_audit.py --suite em_dash   # Run single suite
    python tests/verify_blog_audit.py --verbose         # Detailed output
    python tests/verify_blog_audit.py --json            # JSON summary output
"""

import os
import sys
import json
import re
import argparse
import subprocess
import html
from pathlib import Path
from typing import Dict, List, Any, Optional, Tuple
from bs4 import BeautifulSoup

# Base paths
PROJECT_ROOT = Path(__file__).resolve().parent.parent
PAGE_CHECKS_SCRIPT = Path(r"C:\Users\dell\.gemini\config\skills\seo\scripts\page_checks.py")

# Em dash patterns to detect (literal \u2014, &mdash;, numeric decimal and hex entities)
EM_DASH_PATTERNS = [
    (re.compile(r"\u2014"), "literal em dash (\\u2014)"),
    (re.compile(r"&mdash;", re.IGNORECASE), "HTML entity (&mdash;)"),
    (re.compile(r"&#8212;"), "decimal HTML entity (&#8212;)"),
    (re.compile(r"&#x2014;", re.IGNORECASE), "hex HTML entity (&#x2014;)"),
]

# File extensions to ignore during em dash scan (binary, media, fonts)
IGNORED_EXTENSIONS = {
    ".png", ".jpg", ".jpeg", ".gif", ".ico", ".webp", ".woff", ".woff2",
    ".ttf", ".eot", ".mp4", ".zip", ".pdf", ".map"
}

# Competitor list from ORIGINAL_REQUEST.md §4
REQUIRED_COMPETITORS = [
    "Forex Factory",
    "Myfxbook",
    "Investing.com",
    "DailyFX",
    "FXStreet"
]

# Required link targets
GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.forexnews.app"
INTERNAL_FEATURE_LINKS = ["/#calculators", "/#alerts", "/#features"]


class TestResult:
    def __init__(self, name: str):
        self.name = name
        self.passed = True
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.details: List[str] = []

    def fail(self, msg: str):
        self.passed = False
        self.errors.append(msg)

    def warn(self, msg: str):
        self.warnings.append(msg)

    def info(self, msg: str):
        self.details.append(msg)


def load_blog_posts_from_source() -> List[Dict[str, Any]]:
    """Loads BLOG_POSTS directly from src/data/blogPosts.js using node."""
    script = "import('./src/data/blogPosts.js').then(m => process.stdout.write(JSON.stringify(m.BLOG_POSTS)))"
    res = subprocess.run(
        ["node", "-e", script],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8"
    )
    if res.returncode != 0:
        raise RuntimeError(f"Failed to load blog posts via Node: {res.stderr}")
    return json.loads(res.stdout)


def extract_visible_text_from_html(html_content: str) -> str:
    """Extracts visible body text excluding chrome (head, script, style, nav, footer)."""
    soup = BeautifulSoup(html_content, "html.parser")
    for tag in soup(["head", "script", "style", "noscript", "nav", "footer"]):
        tag.decompose()
    for tag in soup.find_all("header"):
        if not tag.decomposed and tag.find_parent(["article", "main"]) is None:
            tag.decompose()
    return re.sub(r"\s+", " ", soup.get_text(" ", strip=True)).strip()


# ==============================================================================
# Suite 1: Zero Em Dash Test
# ==============================================================================
def test_zero_em_dash(verbose: bool = False) -> TestResult:
    result = TestResult("Zero Em Dash Test")
    targets = ["src", "public", "scripts", "index.html", "dist"]
    found_matches: List[Tuple[str, int, str, str]] = []

    for target_rel in targets:
        target_path = PROJECT_ROOT / target_rel
        if not target_path.exists():
            continue

        if target_path.is_file():
            file_paths = [target_path]
        else:
            file_paths = [
                p for p in target_path.rglob("*")
                if p.is_file() and p.suffix.lower() not in IGNORED_EXTENSIONS
            ]

        for p in file_paths:
            # Skip node_modules or .git if somehow traversed
            if "node_modules" in p.parts or ".git" in p.parts:
                continue

            try:
                content = p.read_text(encoding="utf-8", errors="ignore")
            except Exception as e:
                result.warn(f"Could not read {p}: {e}")
                continue

            for pattern, pattern_name in EM_DASH_PATTERNS:
                for match in pattern.finditer(content):
                    # Compute line number
                    line_no = content.count("\n", 0, match.start()) + 1
                    start_snippet = max(0, match.start() - 30)
                    end_snippet = min(len(content), match.end() + 30)
                    snippet = content[start_snippet:end_snippet].replace("\n", " ")
                    found_matches.append((
                        str(p.relative_to(PROJECT_ROOT)),
                        line_no,
                        pattern_name,
                        snippet.strip()
                    ))

    if found_matches:
        result.fail(f"Found {len(found_matches)} em dash occurrence(s) across codebase.")
        for rel_path, line, pat, snip in found_matches[:20]:
            result.errors.append(f"  {rel_path}:{line} [{pat}] -> ...{snip}...")
        if len(found_matches) > 20:
            result.errors.append(f"  ... and {len(found_matches) - 20} more occurrences.")
    else:
        result.info("Zero em dashes found across src/, public/, scripts/, index.html, dist/.")

    return result


# ==============================================================================
# Suite 2: Word Count Test (2000+ words)
# ==============================================================================
def test_word_count(verbose: bool = False) -> TestResult:
    result = TestResult("Word Count Test (>= 2000 words)")

    # 1. Check in src/data/blogPosts.js
    try:
        posts = load_blog_posts_from_source()
    except Exception as e:
        result.fail(f"Failed to load src/data/blogPosts.js: {e}")
        return result

    if not posts:
        result.fail("No blog posts found in src/data/blogPosts.js.")
        return result

    for post in posts:
        slug = post.get("slug", "unknown-slug")
        word_count_prop = post.get("wordCount")

        if word_count_prop is None:
            result.fail(f"Post '{slug}' in src/data/blogPosts.js lacks 'wordCount' property.")
        elif word_count_prop < 2000:
            result.fail(
                f"Post '{slug}' in src/data/blogPosts.js has wordCount={word_count_prop} (< 2000)."
            )

        # Calculate actual content word count
        parts = []
        if post.get("summaryCapsule"):
            parts.append(str(post.get("summaryCapsule")))
        if post.get("takeaways"):
            parts.extend([str(t) for t in post.get("takeaways")])
        if post.get("sections"):
            for sec in post.get("sections"):
                parts.append(str(sec.get("heading", "")))
                parts.append(str(sec.get("content", "")))
        if post.get("faqs"):
            for faq in post.get("faqs"):
                parts.append(str(faq.get("question", "")))
                parts.append(str(faq.get("answer", "")))

        full_content = " ".join(parts)
        words = full_content.split()
        calculated_count = len(words)

        if calculated_count < 2000:
            result.fail(
                f"Post '{slug}' raw content word count in blogPosts.js is {calculated_count} (< 2000)."
            )
        else:
            result.info(f"Post '{slug}' raw content words: {calculated_count} (>= 2000).")

    # 2. Check in dist/blog/*/index.html
    dist_blog_dir = PROJECT_ROOT / "dist" / "blog"
    if not dist_blog_dir.exists():
        result.fail("dist/blog/ directory does not exist. Run build first.")
        return result

    article_dirs = [
        d for d in dist_blog_dir.iterdir()
        if d.is_dir() and (d / "index.html").exists()
    ]

    if not article_dirs:
        result.fail("No static article directories found in dist/blog/*.")

    for art_dir in article_dirs:
        slug = art_dir.name
        html_file = art_dir / "index.html"
        content = html_file.read_text(encoding="utf-8")
        visible_text = extract_visible_text_from_html(content)
        rendered_word_count = len(visible_text.split())

        if rendered_word_count < 2000:
            result.fail(
                f"Rendered article '{slug}' at {html_file.relative_to(PROJECT_ROOT)} has "
                f"{rendered_word_count} words (< 2000)."
            )
        else:
            result.info(f"Rendered article '{slug}': {rendered_word_count} words (>= 2000).")

        # Also verify JSON-LD wordCount inside the static HTML
        soup = BeautifulSoup(content, "html.parser")
        jsonld_scripts = soup.find_all("script", type="application/ld+json")
        found_schema_word_count = False

        for script in jsonld_scripts:
            try:
                data = json.loads(script.string or "")
                entries = data.get("@graph", [data]) if isinstance(data, dict) else [data]
                for item in entries:
                    if isinstance(item, dict) and item.get("@type") == "BlogPosting":
                        schema_wc = item.get("wordCount")
                        if schema_wc is not None:
                            found_schema_word_count = True
                            if schema_wc < 2000:
                                result.fail(
                                    f"Article '{slug}' JSON-LD BlogPosting schema has wordCount={schema_wc} (< 2000)."
                                )
            except Exception:
                pass

        if not found_schema_word_count:
            result.fail(f"Article '{slug}' static HTML lacks JSON-LD BlogPosting wordCount.")

    return result


# ==============================================================================
# Suite 3: 2027 Targeting & Competitor Coverage Test
# ==============================================================================
def test_2027_and_competitor_coverage(verbose: bool = False) -> TestResult:
    result = TestResult("2027 Targeting & Competitor Coverage Test")

    try:
        posts = load_blog_posts_from_source()
    except Exception as e:
        result.fail(f"Failed to load src/data/blogPosts.js: {e}")
        return result

    # 1. 2027 Targeting Check
    target_year = "2027"
    posts_with_2027 = []
    titles_with_2027 = []

    for post in posts:
        slug = post.get("slug", "")
        post_str = json.dumps(post)
        if target_year in post_str:
            posts_with_2027.append(slug)
        if target_year in post.get("title", "") or target_year in post.get("seoTitle", ""):
            titles_with_2027.append(slug)

    if not posts_with_2027:
        result.fail(f"No blog posts reference the target year '{target_year}'.")
    else:
        result.info(f"Year {target_year} referenced in {len(posts_with_2027)} post(s).")

    if not titles_with_2027:
        result.fail(f"No blog post titles target '{target_year}'. Expected 2027 in article titles.")
    else:
        result.info(f"Year {target_year} in titles: {', '.join(titles_with_2027)}")

    # 2. Competitor Coverage Check
    all_content = " ".join([json.dumps(p) for p in posts])
    missing_competitors = []

    for comp in REQUIRED_COMPETITORS:
        # Case insensitive regex match for competitor name
        pattern = re.compile(re.escape(comp), re.IGNORECASE)
        count = len(pattern.findall(all_content))
        if count == 0:
            missing_competitors.append(comp)
        else:
            result.info(f"Competitor '{comp}' mentioned {count} time(s).")

    if missing_competitors:
        result.fail(
            f"Missing coverage for direct competitor(s): {', '.join(missing_competitors)}. "
            f"Required competitors: {', '.join(REQUIRED_COMPETITORS)}."
        )

    # 3. Check comparison dimensions (latency, alert precision, push reliability, calculators, UI noise, ad fatigue)
    comparison_vectors = [
        ("latency / real-time updates", [r"latency", r"real-time", r"speed", r"sub-second"]),
        ("push reliability / alerts", [r"alert", r"push notification", r"background"]),
        ("calculators", [r"calculator", r"position size", r"pip value", r"margin"]),
        ("UI noise / ad fatigue", [r"ad fatigue", r"noise", r"clean", r"clutter", r"banner ads"])
    ]

    for dim_name, regexes in comparison_vectors:
        matched = False
        for reg in regexes:
            if re.search(reg, all_content, re.IGNORECASE):
                matched = True
                break
        if not matched:
            result.fail(f"Competitor comparison lacks evaluation of: {dim_name}")
        else:
            result.info(f"Comparison dimension covered: {dim_name}")

    return result


# ==============================================================================
# Suite 4: Inline Links Test
# ==============================================================================
def test_inline_links(verbose: bool = False) -> TestResult:
    result = TestResult("Inline Links Test")

    # 1. Check in src/data/blogPosts.js
    try:
        posts = load_blog_posts_from_source()
    except Exception as e:
        result.fail(f"Failed to load src/data/blogPosts.js: {e}")
        return result

    all_source = json.dumps(posts)
    if GOOGLE_PLAY_URL not in all_source:
        result.fail(f"Google Play Store link '{GOOGLE_PLAY_URL}' not found in src/data/blogPosts.js.")

    for link in INTERNAL_FEATURE_LINKS:
        if link not in all_source:
            result.fail(f"Internal link '{link}' not found in src/data/blogPosts.js.")

    # 2. Check in dist/blog/*/index.html
    dist_blog_dir = PROJECT_ROOT / "dist" / "blog"
    if not dist_blog_dir.exists():
        result.fail("dist/blog/ does not exist. Run build first.")
        return result

    article_dirs = [
        d for d in dist_blog_dir.iterdir()
        if d.is_dir() and (d / "index.html").exists()
    ]

    found_play_store_tag = 0
    found_internal_tags = {link: 0 for link in INTERNAL_FEATURE_LINKS}
    unrendered_md_links = []

    for art_dir in article_dirs:
        slug = art_dir.name
        html_file = art_dir / "index.html"
        content = html_file.read_text(encoding="utf-8")
        soup = BeautifulSoup(content, "html.parser")

        # Check for genuine <a> tags
        anchors = soup.find_all("a", href=True)
        for a in anchors:
            href = a["href"].strip()
            if href == GOOGLE_PLAY_URL or href.startswith(GOOGLE_PLAY_URL):
                found_play_store_tag += 1
            for int_link in INTERNAL_FEATURE_LINKS:
                anchor_name = int_link.replace("/", "")  # e.g. #calculators
                if href == int_link or href.endswith(int_link) or href == anchor_name or href.endswith(anchor_name):
                    found_internal_tags[int_link] += 1

        # Check for unrendered markdown link artifacts (e.g. [text](url)) in body text
        # Remove script and style tags first
        for s in soup(["script", "style"]):
            s.decompose()
        body_text = soup.get_text()
        raw_md_matches = re.findall(r"\[([^\]]+)\]\((https?://[^\)]+|/#[^\)]+)\)", body_text)
        if raw_md_matches:
            for text, url in raw_md_matches:
                unrendered_md_links.append(f"{slug}: [{text}]({url})")

    if found_play_store_tag == 0:
        result.fail(
            f"No genuine <a> tags pointing to Google Play Store ({GOOGLE_PLAY_URL}) "
            f"found across dist/blog/*/index.html."
        )
    else:
        result.info(f"Found {found_play_store_tag} Google Play Store <a> link(s) in static blog HTML.")

    for int_link, count in found_internal_tags.items():
        if count == 0:
            result.fail(f"No genuine <a> tags pointing to internal '{int_link}' found in static blog HTML.")
        else:
            result.info(f"Found {count} <a> link(s) for '{int_link}'.")

    if unrendered_md_links:
        result.fail(
            f"Found {len(unrendered_md_links)} unrendered markdown link(s) in HTML body text: "
            + "; ".join(unrendered_md_links[:5])
        )

    return result


# ==============================================================================
# Suite 5: JSON-LD Schema Test
# ==============================================================================
def test_jsonld_schema(verbose: bool = False) -> TestResult:
    result = TestResult("JSON-LD Schema Test")

    dist_blog_dir = PROJECT_ROOT / "dist" / "blog"
    if not dist_blog_dir.exists():
        result.fail("dist/blog/ does not exist. Run build first.")
        return result

    article_dirs = [
        d for d in dist_blog_dir.iterdir()
        if d.is_dir() and (d / "index.html").exists()
    ]

    if not article_dirs:
        result.fail("No static articles found in dist/blog/*.")

    for art_dir in article_dirs:
        slug = art_dir.name
        html_file = art_dir / "index.html"
        content = html_file.read_text(encoding="utf-8")
        soup = BeautifulSoup(content, "html.parser")

        scripts = soup.find_all("script", type="application/ld+json")
        if not scripts:
            result.fail(f"Article '{slug}' has no JSON-LD script blocks.")
            continue

        schemas = []
        for s in scripts:
            try:
                data = json.loads(s.string or "")
                if isinstance(data, dict) and "@graph" in data and isinstance(data["@graph"], list):
                    schemas.extend(data["@graph"])
                else:
                    schemas.append(data)
            except Exception as e:
                result.fail(f"Article '{slug}' has malformed JSON-LD: {e}")

        # Check for BlogPosting schema
        blog_posting = next((s for s in schemas if s.get("@type") == "BlogPosting"), None)
        if not blog_posting:
            result.fail(f"Article '{slug}' is missing 'BlogPosting' JSON-LD schema.")
        else:
            # Required fields in BlogPosting
            req_fields = ["headline", "description", "datePublished", "dateModified", "author", "publisher"]
            for field in req_fields:
                if not blog_posting.get(field):
                    result.fail(f"Article '{slug}' BlogPosting schema is missing '{field}'.")

            # Validate wordCount
            wc = blog_posting.get("wordCount")
            if wc is None:
                result.fail(f"Article '{slug}' BlogPosting schema is missing 'wordCount'.")
            elif not isinstance(wc, int) or wc < 2000:
                result.fail(
                    f"Article '{slug}' BlogPosting schema 'wordCount' must be integer >= 2000, got: {wc}"
                )

            # Validate inLanguage
            lang = blog_posting.get("inLanguage")
            if not lang:
                result.fail(f"Article '{slug}' BlogPosting schema is missing 'inLanguage'.")
            elif not re.match(r"^[a-z]{2}(-[A-Z]{2})?$", lang):
                result.fail(f"Article '{slug}' inLanguage '{lang}' is not a valid language code.")

        # Check for BreadcrumbList schema
        breadcrumb = next((s for s in schemas if s.get("@type") == "BreadcrumbList"), None)
        if not breadcrumb:
            result.fail(f"Article '{slug}' is missing 'BreadcrumbList' JSON-LD schema.")
        else:
            items = breadcrumb.get("itemListElement", [])
            if not isinstance(items, list) or len(items) < 3:
                result.fail(f"Article '{slug}' BreadcrumbList must have at least 3 items.")
            else:
                for idx, it in enumerate(items):
                    if it.get("@type") != "ListItem" or not it.get("name") or not it.get("item"):
                        result.fail(f"Article '{slug}' BreadcrumbList item {idx} is invalid: {it}")

    if result.passed:
        result.info("All blog posts have valid BlogPosting (with wordCount & inLanguage) and BreadcrumbList schemas.")

    return result


# ==============================================================================
# Suite 6: Audit Compliance Test (page_checks.py)
# ==============================================================================
def test_audit_compliance(verbose: bool = False) -> TestResult:
    result = TestResult("Audit Compliance Test (page_checks.py)")

    if not PAGE_CHECKS_SCRIPT.exists():
        result.fail(f"page_checks.py not found at: {PAGE_CHECKS_SCRIPT}")
        return result

    dist_dir = PROJECT_ROOT / "dist"
    if not dist_dir.exists():
        result.fail("dist/ directory does not exist. Run build first.")
        return result

    html_files = list(dist_dir.rglob("*.html"))
    if not html_files:
        result.fail("No HTML files found in dist/. Run build first.")
        return result

    # Ensure SSG output has rendered the expected pages (blog articles, legal pages)
    dist_blog_dir = dist_dir / "blog"
    if not dist_blog_dir.exists() or len(list(dist_blog_dir.glob("*/index.html"))) == 0:
        result.fail("Static blog pages are missing from dist/blog/*/index.html. Run build and SSG generation first.")

    if len(html_files) < 6:
        result.fail(
            f"Insufficient HTML files found in dist/ ({len(html_files)} found). "
            f"Expected root, blog listing, blog articles, and legal pages."
        )

    def get_base_url(rel_path: str) -> str:
        rel = rel_path.replace("\\", "/")
        if rel == "index.html":
            return "https://forexnews.app/"
        if rel.endswith("/index.html"):
            return "https://forexnews.app/" + rel[:-11]
        return "https://forexnews.app/" + rel

    audit_findings = []

    for html_file in html_files:
        rel_str = str(html_file.relative_to(dist_dir))
        url = get_base_url(rel_str)

        proc = subprocess.run(
            ["python", str(PAGE_CHECKS_SCRIPT), "--file", str(html_file), "--base-url", url],
            capture_output=True,
            text=True,
            encoding="utf-8"
        )

        if proc.returncode != 0:
            result.fail(f"page_checks.py failed on {rel_str}: {proc.stderr}")
            continue

        try:
            data = json.loads(proc.stdout)
        except Exception as e:
            result.fail(f"page_checks.py produced invalid JSON on {rel_str}: {e}")
            continue

        summary = data.get("summary", {})
        crit = summary.get("Critical", 0)
        high = summary.get("High", 0)
        med = summary.get("Medium", 0)
        low = summary.get("Low", 0)

        if crit > 0 or high > 0 or med > 0 or low > 0:
            for item in data.get("findings", []):
                audit_findings.append({
                    "file": rel_str,
                    "url": url,
                    "severity": item.get("severity"),
                    "id": item.get("id"),
                    "message": item.get("message"),
                    "evidence": item.get("evidence")
                })

    if audit_findings:
        result.fail(
            f"Audit Compliance Failed: Found {len(audit_findings)} issue(s) across HTML files in dist/ "
            f"(Required: 0 Critical, 0 High, 0 Medium, 0 Low)."
        )
        for f in audit_findings:
            result.errors.append(
                f"  [{f['severity']}] {f['file']} ({f['url']}) -> {f['id']}: {f['message']}"
            )
            if f.get("evidence") and verbose:
                result.errors.append(f"      Evidence: {f['evidence']}")
    else:
        result.info(f"All {len(html_files)} HTML pages in dist/ passed with 0 Critical, 0 High, 0 Medium, 0 Low.")

    return result


# ==============================================================================
# Suite 7: Lint & Build Test
# ==============================================================================
def test_lint_and_build(skip_build: bool = False, verbose: bool = False) -> TestResult:
    result = TestResult("Lint & Build Test")

    # 1. npm run lint
    lint_proc = subprocess.run(
        ["npm", "run", "lint"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        shell=True,
        encoding="utf-8"
    )

    if lint_proc.returncode != 0:
        result.fail("npm run lint failed with non-zero exit code.")
        output_lines = (lint_proc.stdout + "\n" + lint_proc.stderr).strip().splitlines()
        for l in output_lines:
            if "error" in l.lower() or "problem" in l.lower():
                result.errors.append(f"  {l}")
    else:
        result.info("npm run lint passed with 0 errors.")

    # 2. npm run build
    if not skip_build:
        build_proc = subprocess.run(
            ["npm", "run", "build"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            shell=True,
            encoding="utf-8"
        )

        if build_proc.returncode != 0:
            result.fail(f"npm run build failed with exit code {build_proc.returncode}.")
            build_lines = (build_proc.stdout + "\n" + build_proc.stderr).strip().splitlines()
            for l in build_lines[-10:]:
                result.errors.append(f"  {l}")
        else:
            result.info("npm run build completed successfully with exit code 0.")
    else:
        result.info("Skipped npm run build as requested (--skip-build).")

    return result


# ==============================================================================
# Runner & CLI Dispatch
# ==============================================================================
SUITES = {
    "em_dash": test_zero_em_dash,
    "word_count": test_word_count,
    "competitor_2027": test_2027_and_competitor_coverage,
    "inline_links": test_inline_links,
    "jsonld": test_jsonld_schema,
    "audit": test_audit_compliance,
    "lint_build": test_lint_and_build,
}


def print_banner():
    print("=" * 75)
    print(" FOREXNEWS.APP AUTOMATED BLOG & SEO COMPLIANCE AUDIT SUITE")
    print(" Target: 2027 Dominance | 2000+ Words | Zero Em Dashes | 100/100 Audits")
    print("=" * 75)


def main():
    parser = argparse.ArgumentParser(description="ForexNews Blog Audit & Compliance Verification Suite")
    parser.add_argument("--suite", choices=list(SUITES.keys()) + ["all"], default="all",
                        help="Run a specific test suite or 'all'")
    parser.add_argument("--verbose", action="store_true", help="Show detailed diagnostics and snippets")
    parser.add_argument("--skip-build", action="store_true", help="Skip npm run build in lint_build suite")
    parser.add_argument("--json", action="store_true", help="Output results in JSON format")

    args = parser.parse_args()

    if not args.json:
        print_banner()

    suites_to_run = list(SUITES.keys()) if args.suite == "all" else [args.suite]
    results: List[TestResult] = []

    for key in suites_to_run:
        fn = SUITES[key]
        if not args.json:
            print(f"\n>> Running [{key}] ...")

        if key == "lint_build":
            res = fn(skip_build=args.skip_build, verbose=args.verbose)
        else:
            res = fn(verbose=args.verbose)

        results.append(res)

        if not args.json:
            status_tag = "[PASS]" if res.passed else "[FAIL]"
            print(f"{status_tag} {res.name}")
            if not res.passed:
                for err in res.errors:
                    print(f"    ! {err}")
            elif args.verbose:
                for d in res.details:
                    print(f"    * {d}")

    # Summary
    all_passed = all(r.passed for r in results)

    if args.json:
        payload = {
            "all_passed": all_passed,
            "total_suites": len(results),
            "passed_count": sum(1 for r in results if r.passed),
            "failed_count": sum(1 for r in results if not r.passed),
            "suites": [
                {
                    "name": r.name,
                    "passed": r.passed,
                    "errors": r.errors,
                    "warnings": r.warnings,
                    "details": r.details
                }
                for r in results
            ]
        }
        print(json.dumps(payload, indent=2))
    else:
        print("\n" + "=" * 75)
        print(" TEST SUITE SUMMARY")
        print("=" * 75)
        for r in results:
            tag = "PASS" if r.passed else "FAIL"
            print(f"[{tag:4s}] {r.name}")
            if not r.passed and not args.verbose:
                print(f"       -> {len(r.errors)} defect(s) detected.")

        print("-" * 75)
        passed_cnt = sum(1 for r in results if r.passed)
        failed_cnt = sum(1 for r in results if not r.passed)
        print(f"TOTAL: {len(results)} suites | PASSED: {passed_cnt} | FAILED: {failed_cnt}")
        print("OVERALL RESULT: " + ("ALL TESTS PASSED [OK]" if all_passed else "FAILURES DETECTED [DEFECTS ESCALATED]"))
        print("=" * 75 + "\n")

    sys.exit(0 if all_passed else 1)


if __name__ == "__main__":
    main()
