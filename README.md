# Chaelin Design Studio website

A fast static site (plain HTML, CSS and a little JavaScript). No build step is needed to deploy.

## Deploy on Vercel
1. Put this folder in a GitHub repo, or drag the folder into vercel.com → Add New → Project.
2. Framework preset: **Other**. No build command. Output directory: the folder root.
3. Point `design.chaelinstudios.com` at the project (Settings → Domains).
`vercel.json` turns on clean URLs (`/services` instead of `/services.html`).

## Before you go live (5 things)
1. **Contact form:** go to formspree.io → sign up with chaelin@chaelinstudios.com → New Form → copy the ID (e.g. `xyzabcd` from `https://formspree.io/f/xyzabcd`) → open `contact.html`, find `YOUR_FORM_ID` and replace it. Submit one test enquiry and confirm the email Formspree sends you. Until then, the form opens an email to hello@design.chaelinstudios.com so no lead is lost. Sign up to Formspree with chaelin@chaelinstudios.com so enquiries land there.
2. **Terms & Privacy pages:** included (`terms.html`, `privacy.html`). Read them and adjust anything that doesn't match how you work (revisions, notice period, refund timing).
4. **Prices (optional):** on `pricing.html`, search for `PRICE:` and add prices if you want to show them.
5. **Concept work:** `work.html` and the homepage show concept redesigns of real businesses, labelled "Concept"
   with no results claimed. They use those businesses' names, photos and reviews, so ask each business for a quick OK
   before publishing (or remove the ones you don't have permission for).

## Adding ad campaigns
In `work.html` there's a commented-out "AD CAMPAIGNS" block. Only add campaigns you created or managed, with the client's OK,
and only real numbers.

## How to update the website (the easy way)
Set this up once:
1. Create a free GitHub account and a new repository, e.g. `chaelin-website`.
2. Upload everything in this folder to it (drag and drop on github.com → "Add file" → "Upload files").
3. In Vercel: Add New → Project → Import that repository. From now on, **every change you save on GitHub goes live automatically in about 30 seconds.**

Then, to change anything:
1. Go to your repository on github.com and click the page you want, e.g. `pricing.html`.
2. Click the pencil icon (Edit).
3. Press Ctrl+F (Cmd+F on Mac) to find the words you want to change, and type over them. Only change the words between the `>` and `<` signs.
4. Click "Commit changes". Done: the site updates by itself.

Which file is which page:
- `index.html` → Home · `services.html` → Services · `process.html` → How we work
- `work.html` → Work · `pricing.html` → Plans and the 90-day promise · `contact.html` → Contact/audit form

To change an image: upload the new picture into `assets/img/` with the **same file name** as the old one.
Emails used on the site: chaelin@chaelinstudios.com (main) and michael@chaelinstudios.com (new projects). Phone: +44 7916 688760. To change one, edit it on every page (Ctrl+F helps).
Bigger changes (new sections, new pages, new design)? Ask Claude and paste the request; you'll get updated files back.

Styles are in `assets/css/style.css`.
SEO files are included: `robots.txt`, `sitemap.xml`, `llms.txt`, and business schema in `index.html`.

## Booking link and industry pages
- The Calendly link is set once at the top of `build.py` (`CAL = ...`). It appears in the hero, every "free score" box, the contact page calendar and the footer.
- Industry pages (plumbers, contractors, painters, notaries, cleaning, home buyers) are files like `plumbers-hvac.html`. To change their text on GitHub, edit the HTML file directly.

## Instant website check (Google PageSpeed API key)
The contact page runs a free instant check using Google PageSpeed Insights. It needs a free API key:
1. Go to https://console.cloud.google.com and sign in with your Google account. Create a project (any name, e.g. "Chaelin website").
2. Open "APIs & Services" → "Library", search "PageSpeed Insights API" and click **Enable**.
3. Open "APIs & Services" → "Credentials" → "Create credentials" → "API key". Copy the key.
4. Click the key to edit it. Under "Application restrictions" choose **Websites** and add `design.chaelinstudios.com/*`. Under "API restrictions" choose **Restrict key** → PageSpeed Insights API. Save. (This stops anyone else using your key.)
5. In `contact.html`, find `data-psi-key="YOUR_PAGESPEED_API_KEY"` and replace `YOUR_PAGESPEED_API_KEY` with your key. Commit. Done.
It's free (Google allows 25,000 checks a day). Without a key the check will usually show "busy" and ask the visitor to send the form instead, so no lead is lost.
When someone sends the form after a check, their instant score is included in the email you receive ("instant_score").
