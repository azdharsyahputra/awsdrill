# CLF-C02 Drill

AWS Certified Cloud Practitioner practice app (Expo / React Native: Android, iOS, web).

- 1,100 questions in `src/data/*.js` (D1 122 · D2 199 · D3 636 · D4 143), 148-service glossary (`services.js`), 33 comparison tables (`compare/`)
- Modes: weak-spot focus (D3 + D4), name that service, free practice, 65-question exam simulation, retry missed
- Screens: compare services (side-by-side tables + exam traps), service glossary
- Aligned to the official CLF-C02 exam guide v1.3 (Oct 29, 2026): every correct answer is an in-scope service, named as the guide names it; support plans use the v1.3 lineup (Basic, Business Support+, Enterprise, Unified Operations). Explanations note real-world renames/closures.
- Progress is stored on the device (AsyncStorage)

## Run

```bash
npm install
npx expo start          # scan the QR code with Expo Go, or press w for web
npx expo start --web    # web only
npx expo export --platform web   # static site in dist/ (deploy to S3, Netlify, GitHub Pages…)
```

## Check the data

```bash
node scripts/validate.mjs          # questions: format, answer indexes, Choose TWO, duplicates
node scripts/validate-compare.mjs  # comparison tables
node scripts/coverage.mjs          # questions per in-scope service (flags <3)
```

## Question format

```js
{ d: 3, t: "storage", q: "question", o: ["A", "B", "C", "D"], a: [1], e: "explanation" }
```
`d` = domain 1–4, `t` = topic tag, `a` = zero-based correct index(es); two indexes = "Choose TWO".
