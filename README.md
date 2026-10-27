# NMS Portfolio Website

Nilupul Madhusanka’s portfolio, built with Next.js, React, and Tailwind CSS.

## Run locally

Use Node.js 20.9 or later (the update was verified with Node.js 24).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview, run `npm run build`, then `npm start`.

## Update portfolio content

Edit `src/app/data/portfolio.js` for the biography, education, certifications, skills, contact links, and projects. The project total is calculated from this file.

- A project can belong to multiple categories through its `categories` array.
- Add public repository or live-demo links to its `links` array. Omit unavailable links.
- Put screenshots in `public/images/projects/` and set `image` to the public path.
- Projects without screenshots use a colored cover with their initials.
- Replace `public/nms-cv.pdf` to update the downloadable CV.

Recent additions include AI Customer Support Automation, FinTrack for Windows 11, Hela Eats (frontend, backend, and mobile), and Edirisinghe Curtain Service. NMS Chat App is featured alongside them; older projects remain available.

## Contact form

The form opens a `mailto:` draft in the visitor’s email application. The visitor reviews and sends the email there. It does not send email through a backend. A direct email link is available if no email application is configured. No API keys or environment variables are required.

## Checks

```sh
npm run lint
npm run build
npm audit
```

`npm run check` runs lint and the production build. Keep the lockfile committed and use `npm ci` for reproducible installs. ESLint 9 is retained for compatibility with the lint plugins; npm may display its upstream deprecation notice.

See [maintenance and verification notes](docs/maintenance.md) for the checked behaviors and remaining content limitations.

## Demo

Existing deployment: [nms-portfolio-website.vercel.app](https://nms-portfolio-website.vercel.app/). Local changes must be deployed before they appear there.

## License

This portfolio is licensed under the [MIT License](LICENSE).
