# mercybuilt.com

Static copy of mercybuilt.com, self-hosted on GitHub Pages (moved off ChatGPT Sites).

- `index.html` – home page (story, first drop, sports, bracelets, join, tell us)
- `preorder/` – 2 Corinthians 5:17 hoodie preorder (edit `preorder/config.js` for colors/price)
- `assets/site.js` – form handling. Forms save to Supabase:
  - hoodie preorders -> `public.mercy_built_preorders`
  - "Get first-drop updates" + "Tell us what you want" -> `public.mercy_built_interest`
- `CNAME` – custom domain mercybuilt.com (www redirects).
