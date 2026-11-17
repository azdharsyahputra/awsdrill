# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

One user: the owner, retaking the AWS Certified Cloud Practitioner (CLF-C02) exam. Their weakest areas are Domain 3 (Cloud Technology & Services) and Domain 4 (Billing, Pricing & Support); Domains 1 and 2 are stronger but still practiced. They lose points mainly by confusing look-alike AWS services (for example S3 storage classes, Macie vs GuardDuty).

They take the exam in English and want all app content in English.

## Product Purpose

A personal drill app for passing the CLF-C02 retake. Success means passing the exam with at least 700/1000; inside the app, the working target is a consistent score above 75%.

## Positioning

- **Built around one person's weaknesses:** it weights practice toward the learner's weak domains (D3, D4), and its questions pit look-alike services against each other.
- **Explains the trap:** every explanation says why the right answer is right and what the tempting distractor actually does.
- **Uses exam names, not today's AWS names:** content follows the official CLF-C02 exam guide v1.3 (Oct 29, 2026). Every correct answer is an in-scope service, named the way the guide names it.

## Operating Context

- **Two devices, used about equally:**
  - **Phone:** short drill sessions through Expo Go or an installed build, often one-handed and on the go.
  - **Laptop browser:** the web build, used for longer sit-down sessions such as the 65-question, 90-minute exam simulation and reading the comparison tables. Keyboard shortcuts are available there.
- **Progress stays on each device:** it is stored with AsyncStorage (localStorage on web) and does not sync between phone and laptop.
- **The real exam:** 65 questions (50 scored, 15 unscored), 90 minutes, multiple choice (1 of 4) and multiple response (2 of 5). Domain weights are D1 24%, D2 30%, D3 34% and D4 12%.

## Capabilities and Constraints

- **Stack:** Expo (React Native) app for iOS, Android and web, with one codebase in `clf-drill/`. Navigation is state-based in `App.js`, with no router.
- **Modes:** weak-spot focus (D3 and D4, with missed questions and weak topics first), name that service (generated from the glossary), free practice (filter by domain and topic), exam simulation (65 questions, weighted by domain, timed), and retry missed.
- **Screens:** home, quiz, results with per-domain breakdown and review, compare services (33 side-by-side tables with exam traps), and service glossary (148 services, searchable).
- **Content:** 1,100 questions in `src/data/*.js` (D1 122, D2 199, D3 636, D4 143). Topic tags drive filtering and the weak-topic statistics.
- **Content integrity:** run `scripts/validate.mjs` (format, answer keys, Choose TWO rules, duplicates), `scripts/validate-compare.mjs` and `scripts/coverage.mjs` (questions per in-scope service) after any content change.
- **Terminology:** use the exam guide's names, for example Amazon Quick, Amazon AppStream 2.0, Amazon Q, and support plans Basic / Business Support+ / Enterprise / Unified Operations. Real-world renames and closures go only in explanations.
- **Undecided:** whether the app grows to cover other AWS certifications after the retake. Don't build for multiple exams until this is decided.

## Brand Commitments

- **Name:** "CLF-C02 Drill".
- **Not an AWS product:** this is a personal study tool, not affiliated with AWS. Don't use AWS logos, trade dress, or official-looking certification branding.

## Evidence on Hand

- **Question bank and data:** `src/data/` holds the question bank, glossary and comparison tables. Facts are checked against the official exam guide and AWS documentation.
- **No social proof:** there are no other users, testimonials, pass-rate statistics or official endorsements. Don't invent them.

## Product Principles

1. The official exam guide decides scope and naming. AWS's current reality goes in the explanations, not in the answer keys.
2. Train discrimination, not recall: the most valuable question makes two look-alike services compete.
3. Weak spots first. D3 and D4 get the most practice, but no domain is allowed to slip.
4. Every answer teaches. Show why the right option is right and why the trap is wrong, right after the answer.
5. A session should be quick to start on either device. Exam simulation should feel like the real exam.
