# Phillipa Aidoo

Multipage professional profile and author website. The original Landi stylesheet and Bootstrap components power the floating navigation, split hero, role cards, feature tabs, service cards, page titles, breadcrumbs and details sidebar. Personalised styles are in assets/site.css and shared component markup is in landi.mjs.

## Build and preview

From the repository directory, run `node build.mjs`. Serve `dist/` as the site root with directory indexes enabled. For example, run `python -m http.server 8080 --directory dist` and open `http://localhost:8080/`. Public links use directory routes such as `/about/` and `/books/my-blue-rubber-slippers/`.

## Deploy on Vercel

Import the GitHub repository into Vercel. The checked-in configuration builds the static pages into dist/ and serves extensionless URLs with trailing slashes.

## Public launch

The build uses `https://phillipaaidoo.com` by default. Set `SITE_URL` to the final public origin before building if hosting elsewhere, and verify the domain property in Google Search Console after the domain and hosting are connected. Submit `/sitemap.xml` and inspect the homepage and book URL. The host must serve a real 404 for unknown paths and issue a permanent redirect for alternate versions of each canonical URL if it serves them.

Page copy and metadata live in `build.mjs`. The book page links to Amazon for purchase, reviews and available preview options. Add the approved portrait, official cover, full synopsis and sample when available. The provisional book artwork is generated in CSS. Add upcoming titles when announced. To enable newsletter subscriptions, connect the Contact page to the author’s newsletter provider and add its consent copy.
