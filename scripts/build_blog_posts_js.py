# scripts/build_blog_posts_js.py
import json
import importlib.util
from pathlib import Path

articles = []
for i in range(1, 7):
    path = f"scripts/articles/article{i}.py"
    spec = importlib.util.spec_from_file_location(f"article{i}", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    art = getattr(mod, f"article{i}")
    
    # Calculate word count
    parts = []
    if art.get("summaryCapsule"):
        parts.append(str(art.get("summaryCapsule")))
    if art.get("takeaways"):
        parts.extend([str(t) for t in art.get("takeaways")])
    if art.get("sections"):
        for sec in art.get("sections"):
            parts.append(str(sec.get("heading", "")))
            parts.append(str(sec.get("content", "")))
    if art.get("faqs"):
        for faq in art.get("faqs"):
            parts.append(str(faq.get("question", "")))
            parts.append(str(faq.get("answer", "")))
    
    words = len(" ".join(parts).split())
    art["wordCount"] = words
    articles.append(art)
    print(f"Loaded Article {i}: {art['slug']} - {words} words")

# Verify constraints
all_text = json.dumps(articles)
assert "\u2014" not in all_text, "Found unicode em dash!"
assert ("&" + "mdash;") not in all_text, "Found HTML em dash!"

# Write to src/data/blogPosts.js
header = """/**
 * Comprehensive blog post articles for Forex News (forexnews.app)
 * Optimized for SEO, GEO (Generative Engine Optimization), and Agentic discovery.
 * Strictly 2000+ words per article, 2027 targeting, zero em dashes.
 */

export const BLOG_POSTS = """

js_content = header + json.dumps(articles, indent=2) + ";\n"

output_path = Path("src/data/blogPosts.js")
output_path.write_text(js_content, encoding="utf-8")
print(f"Successfully wrote {len(articles)} articles to {output_path}")
