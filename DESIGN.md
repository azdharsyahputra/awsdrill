---
name: CLF-C02 Drill
description: A personal field notebook for passing the AWS Cloud Practitioner retake.
colors:
  pass-mark-green: "#0f7a5c"
  pass-mark-ink: "#ffffff"
  pass-mark-wash: "#e1f1eb"
  study-desk: "#f3f5f4"
  sheet-white: "#ffffff"
  notebook-ink: "#17201d"
  pencil-grey: "#5d6b66"
  ruled-line: "#d9e0dd"
  correct-green: "#1d7a3a"
  correct-wash: "#e3f4e7"
  miss-red: "#b3261e"
  miss-wash: "#fbe9e7"
  trap-amber: "#a65f00"
  domain-1-blue: "#2f6fb0"
  domain-2-red: "#b3261e"
  domain-3-green: "#0f7a5c"
  domain-4-amber: "#a65f00"
  pass-mark-green-dark: "#3fc398"
  pass-mark-ink-dark: "#06231a"
  pass-mark-wash-dark: "#183a2f"
  study-desk-dark: "#101614"
  sheet-dark: "#18201d"
  notebook-ink-dark: "#e6ece9"
  pencil-grey-dark: "#9aa8a2"
  ruled-line-dark: "#2a3531"
  correct-green-dark: "#5fd27f"
  correct-wash-dark: "#173523"
  miss-red-dark: "#ff8a80"
  miss-wash-dark: "#3d1a18"
  trap-amber-dark: "#f0b24a"
  domain-1-blue-dark: "#7fb2ea"
typography:
  display:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "30px"
    fontWeight: 800
  score:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "48px"
    fontWeight: 800
    fontFeature: "tnum"
  headline:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "28px"
    fontWeight: 800
  section:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "19px"
    fontWeight: 700
  question:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: "25px"
  title:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "17px"
    fontWeight: 700
  body:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "22px"
  body-small:
    fontFamily: "System UI (San Francisco, Roboto, system-ui)"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "19px"
  label:
    fontFamily: "Menlo, monospace, ui-monospace"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "1px"
  data:
    fontFamily: "Menlo, monospace, ui-monospace"
    fontSize: "13px"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  tag: "4px"
  control: "8px"
  sheet: "10px"
  pill: "99px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
components:
  button-primary:
    backgroundColor: "{colors.pass-mark-green}"
    textColor: "{colors.pass-mark-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  button-secondary:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.notebook-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "11px 16px"
  chip:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.notebook-ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "7px 12px"
  chip-selected:
    backgroundColor: "{colors.pass-mark-wash}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.pill}"
    padding: "7px 12px"
  answer-option:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.notebook-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px"
  answer-option-selected:
    backgroundColor: "{colors.pass-mark-wash}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.control}"
    padding: "12px"
  answer-option-correct:
    backgroundColor: "{colors.correct-wash}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.control}"
    padding: "12px"
  answer-option-wrong:
    backgroundColor: "{colors.miss-wash}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.control}"
    padding: "12px"
  sheet:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.notebook-ink}"
    rounded: "{rounded.sheet}"
    padding: "16px"
  domain-tag:
    textColor: "{colors.domain-1-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "3px 7px"
  input-search:
    backgroundColor: "{colors.sheet-white}"
    textColor: "{colors.notebook-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px"
  progress-bar:
    backgroundColor: "{colors.ruled-line}"
    rounded: "{rounded.pill}"
    height: "6px"
---

# Design System: CLF-C02 Drill

## Overview

**Creative North Star: "The Field Notebook"**

CLF-C02 Drill is a study notebook you carry everywhere. On the phone it fits short, one-handed drills; on the laptop it is the sit-down desk for a full 90-minute simulation and the comparison tables. The page is the Study Desk. Every question, result and table sits on it as a loose sheet. The writing on those sheets carries the design: one question, four or five choices, then the explanation of the trap. Everything else stays out of the way.

The mood is **encouraging**. The app is coaching someone close to the pass mark, so it should feel like a coach writing in your margin, not a proctor. Encouragement comes from feedback at the right moment: the correct state, the score breakdown, the progress bar filling. It never comes from decorative cheer. Components are **tactile and confident**: generous tap targets, firm fills, and a visible response to every press, because half the sessions happen with a thumb.

The incumbent build is quieter and flatter than this direction. Panels have only a 1px border, and the moments of encouragement are plain text. Where this document states the direction ahead of the code, it says so.

**Key Characteristics:**
- One accent, Pass-Mark Green, reserved for progress toward passing.
- Light and dark palettes that follow the system setting.
- Monospace for data and labels, the system font for everything you read.
- Sheets on a desk: rounded panels, ruled 1px borders, and soft ambient depth (adopted direction).
- Four fixed domain colors that identify the exam domains everywhere.

## Colors

A cool, sage-tinted neutral desk with one green accent, a red/green feedback pair, and four domain hues. Every color is defined twice, light and dark (the `-dark` tokens), and the theme switches with the system.

### Primary
- **Pass-Mark Green** (`pass-mark-green`; dark `pass-mark-green-dark`): the Start button, selected answers and chips, progress bars, links ("Service glossary →"), and the D3 domain color. It marks what moves you toward 700.
- **Pass-Mark Ink** (`pass-mark-ink`): text on a solid Pass-Mark Green fill.
- **Pass-Mark Wash** (`pass-mark-wash`): the fill of a selected answer, selected chip, selected mode card, and table header row.

### Secondary
- **Correct Green** (`correct-green`) with **Correct Wash** (`correct-wash`): the revealed correct answer and the "Correct" explanation block.
- **Miss Red** (`miss-red`) with **Miss Wash** (`miss-wash`): a wrong pick, the "Not quite" block, and a timer under 5 minutes.
- **Trap Amber** (`trap-amber`): "Select 2 answers", the RECOMMENDED tag, flagged exam questions, and the EXAM TRAPS heading in Compare.

### Tertiary
- **Domain colors** (`domain-1-blue`, `domain-2-red`, `domain-3-green`, `domain-4-amber`): exam domains 1–4 on tags, accuracy bars and result rows. D2 shares Miss Red's value, D3 shares Pass-Mark Green's, and D4 shares Trap Amber's.

### Neutral
- **Study Desk** (`study-desk`): the page background behind every sheet.
- **Sheet White** (`sheet-white`; dark `sheet-dark`): panels, answer options, buttons, chips and inputs.
- **Notebook Ink** (`notebook-ink`): primary text.
- **Pencil Grey** (`pencil-grey`): secondary text, counts, placeholders, unanswered states.
- **Ruled Line** (`ruled-line`): every 1px border, the progress track and table gridlines.

### Named Rules
**The Pass-Mark Rule.** Pass-Mark Green means progress or choice: the primary action, the current selection, a filling bar. It is never decoration, and a screen has one solid green button at most.

**The Never-Color-Alone Rule.** Correct and wrong are always spelled out in text ("Correct", "Not quite. Answer: B", "Your answer:", "Correct:"). The red/green wash is reinforcement, never the only signal.

**The Domain Identity Rule.** Each domain color always identifies the same exam domain. Never reuse a domain color for an unrelated meaning on the same screen.

## Typography

**Body Font:** the platform system font (San Francisco on iOS/macOS, Roboto on Android, system-ui on web).
**Label/Mono Font:** Menlo on iOS, monospace on Android, ui-monospace on web.

**Character:** The system font keeps reading native and fast on both devices. The mono face is the notebook's stamp: counts, timers, domain tags and eyebrow labels.

### Hierarchy
- **Display** (800, 30px): the app name on the home screen.
- **Score** (800, 48px, tabular figures): the result percentage. It is the peak moment of a session.
- **Headline** (800, 28px): screen titles for Compare services and Service glossary.
- **Section** (700, 19px): category headings inside the glossary.
- **Question** (500, 17px / 25px): the question stem, the most-read text in the app.
- **Title** (700, 17px): Compare table titles and mode names (16px).
- **Body** (400, 15px / 22px): answer options, explanations and descriptions.
- **Body Small** (400, 13px / 19px): mode descriptions, chip labels, table cells.
- **Label** (600, 11px, 1px tracking, uppercase, mono): eyebrows such as MODE, QUESTIONS, EXAM TRAPS and RECOMMENDED.
- **Data** (400, 13px, mono, tabular): "Question 3/20", timers, "12/18", counts inside chips.

### Named Rules
**The Mono Means Data Rule.** Monospace is only for numbers, timers, counts and uppercase labels. A sentence is never set in mono.

**The Question First Rule.** The question stem is the largest text on the quiz screen after the progress line. Nothing in the quiz chrome competes with it.

## Layout

A single centered column with a maximum width of 780px and a 16px side gutter, scrolling vertically inside the safe area. On a phone the column fills the width; on a laptop it stays a readable column centered on the desk. Screens stack sheets with 16–18px gaps, and sheets space their contents with 12px gaps. Chips and button groups wrap onto new lines. The only horizontal scroll is the Compare table, which scrolls sideways inside its own sheet with fixed 170px columns and a 190px first column.

Navigation is one level deep. Home links to Quiz, Results, Compare and Glossary, and each of those has a "← Back" link at the top or a Menu button. A mono progress line at the top of the quiz shows "Question n/N" plus done/correct counts or the exam timer.

**The One Column Rule.** Every screen is one column of sheets on the desk. No sidebars and no multi-column dashboards, so the phone and laptop layouts are the same layout.

## Elevation & Depth

The current build is flat: every sheet, answer option, chip and button is separated from the desk by a 1px Ruled Line border and a Sheet White fill, with no shadows. The confirmed direction is **soft cards**: sheets and answer options sit on the desk with a gentle ambient shadow at rest, so the notebook reads as paper on a desk rather than outlines. Pressed states darken or wash the fill (Pass-Mark Wash) rather than adding more lift.

### Shadow Vocabulary
- **Soft sheet** (adopted direction, not yet implemented; see `.impeccable/design.json`): one diffuse, low-opacity ambient shadow under sheets and answer options. In dark mode, depth comes from the slightly lighter Sheet Dark instead of shadow.

### Named Rules
**The Paper On A Desk Rule.** Only sheets (panels, answer options, Compare cards) carry depth. Chips, tags, bars and buttons inside a sheet stay flat.

## Shapes

Four radii. Domain tags use 4px. Buttons, answer options, inputs and table frames use 8px. Sheets use 10px. Chips and progress bars are fully round (99px). Borders are always 1px Ruled Line, except where state changes their color: Pass-Mark Green when selected, Correct Green or Miss Red when revealed. The explanation block uses a 3px left rule in its feedback color, like a margin mark.

## Components

### Buttons
Firm, full-width-capable, built for thumbs.
- **Shape:** 8px corners, 11px × 16px padding, 15px text (at least 44px tall).
- **Primary:** solid Pass-Mark Green with Pass-Mark Ink text, bold. One per screen: Start, Check, Next, See results, New session.
- **Secondary:** Sheet White with a Ruled Line border and Notebook Ink text: Back, Quit, Menu, Retry missed, Compare services, Service glossary.
- **Pressed / Disabled:** 0.8 opacity while pressed, 0.45 when disabled. Direction: a firmer pressed fill instead of only fading.

### Chips
- **Style:** pill-shaped Sheet White chips with a Ruled Line border and 13px text. An optional mono count sits on the right in Pencil Grey.
- **Selected:** Pass-Mark Wash fill, Pass-Mark Green border, bold label. Used for domain, topic, count and table-domain filters.

### Answer options (signature component)
The heart of the app.
- **Shape:** an 8px sheet row with 12px padding, a mono letter (A–E) in Pencil Grey, then the option text.
- **Default:** Sheet White with a Ruled Line border.
- **Selected:** Pass-Mark Wash fill with a Pass-Mark Green border. Radio or checkbox semantics depend on whether the question is single-answer or "Choose TWO".
- **Revealed:** the correct option turns Correct Wash with a Correct Green border. A wrong pick turns Miss Wash with a Miss Red border. The options then lock.
- **Explanation block:** below the options. It has a 3px left rule and a wash in the feedback color, a bold verdict line ("Correct" / "Not quite. Answer: B"), then the explanation.

### Sheets / Containers
- **Corner Style:** 10px.
- **Background:** Sheet White on Study Desk.
- **Shadow Strategy:** soft sheet (direction). See Elevation & Depth.
- **Border:** 1px Ruled Line. A Pass-Mark Green border marks the selected mode card or the open Compare card.
- **Internal Padding:** 16px, with 12px gaps between children.

### Mode cards
Stacked buttons on the home sheet. Each has a title (16px, 700), a one-line description (13px, Pencil Grey) and an optional Trap Amber RECOMMENDED label. The selected card takes Pass-Mark Wash with a Pass-Mark Green border.

### Progress & score
- **Progress bar:** a 6px round track in Ruled Line, filled with Pass-Mark Green, or with the domain color on per-domain accuracy bars.
- **Score:** the 48px percentage in Correct Green at 75% or higher and Miss Red below, followed by a Pencil Grey summary line. Direction: make this the encouraging peak of the session.

### Domain tag
A mono uppercase label inside a 1px border in its domain color ("D3 · Cloud Technology & Services"). Its text color comes from the domain token.

### Inputs / Fields
- **Style:** glossary search. Sheet White, 1px Ruled Line border, 8px corners, 12px padding, Pencil Grey placeholder.

### Comparison table
The Compare screen's sideways-scrolling grid. The header row is in Pass-Mark Wash, the first column is bold on Study Desk, and cells use 1px Ruled Line rules. The EXAM TRAPS list below it uses Trap Amber bullets.

## Do's and Don'ts

### Do:
- **Do** keep one solid Pass-Mark Green button per screen, and use it for the next step toward finishing a session.
- **Do** spell out every verdict in words next to its color ("Correct", "Not quite. Answer: B").
- **Do** use the domain colors only for exam domains D1–D4, and the same hue for the same domain on every screen.
- **Do** keep tap targets at least 44px tall and wrap chip rows instead of shrinking them.
- **Do** set counts, timers and "n/N" in the mono Data style with tabular figures.
- **Do** define every new color as a light and dark pair.

### Don't:
- **Don't** use AWS logos, AWS orange, or official-looking certification badges. This is a personal tool, not an AWS product.
- **Don't** set sentences or explanations in monospace.
- **Don't** add shadows to chips, tags, bars or buttons. Depth belongs to sheets only.
- **Don't** add a second accent hue. Red, green and amber are feedback colors, not brand accents.
- **Don't** introduce multi-column layouts. One column of sheets works on both devices.
