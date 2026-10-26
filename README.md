# Ishika Chaudhary — Portfolio

A dark, neon-anime cinematic portfolio built with React + Vite + Tailwind v4,
Framer Motion and AOS. Single page: Hero → About → Expertise → Skills → Projects → Contact.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build & preview
```bash
npm run build
npm run preview
```

## Deploy (Vercel — free)
1. Push this folder to a GitHub repo.
2. Import it at vercel.com → framework preset "Vite" (auto-detected).
3. Deploy. Add a custom domain in Vercel → Settings → Domains.

## Customise
- **Colors** — edit the `:root` neon variables at the top of `src/index.css`.
- **Your résumé** — replace `public/resume.pdf` (the hero button downloads it).
- **Your photo** — replace `src/assets/about/ishika.jpg`.
- **Link preview image** — add `public/og.png` (1200×630) for social/application previews.
- **Hero video** — to use a real anime clip instead of the animated canvas:
  put an mp4 at `src/assets/hero video/herovideo.mp4`, then in `src/components/Hero.jsx`
  set `showVideo = true` and uncomment the `<source>` line.
- **Project preview clips** — in `src/components/Projects.jsx`, import a screen-recording
  and add `video: myClip` to a project. It auto-plays on hover.

## Notes
- Fully responsive, keyboard-focusable, and respects `prefers-reduced-motion`.
- Contact links (email/phone/LinkedIn/GitHub) are in `src/components/Contact.jsx`.
