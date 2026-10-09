# MetricMind Website

Static website structure for MetricMind Solutions.

## Pages
- Home: `index.html`
- Solutions overview: `solutions.html`
- Digital solutions services: `services.html`
- Industries: `industries.html`
- About: `about.html`
- Resources: `resources.html`
- Contact / Request a Demo: `contact.html`

## Product pages
- `solutions/operational-excellence.html`
- `solutions/qms.html`
- `solutions/hse.html`
- `solutions/esg.html`

## Shared assets
- `css/style.css`
- `js/main.js`
- `js/contact.js`
- `js/supabase-config.js`
- `logos/long-logo.png`
- `logos/short-logo.png`
- `images/*`

## Contact form database
The demo request form submits leads to the Supabase `public.contact_leads` table.
Apply `supabase/contact_leads.sql` to the project before testing the form. The
browser config uses only the Supabase publishable key; do not put a service-role
key in website files.

## Local preview
Open `index.html` in a browser, or run a local static server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
