# safira.me: blog plan & ghostwriting guide

Working notes for posts ghostwritten with Claude (acting as a journalist/interviewer). Drafts live in `mdx/draft/`.

## How we work

1. **Pick a post** from the plan below.
2. **Interview, live and one question at a time.** Claude asks one question, listens, and adapts the next one to the answer. Never a full list up front.
3. **Research.** Claude can read Google Drive, Jira, Slack, and Coda for background, then ask only about the gaps: the *why* and how it *felt*. Every fact gets verified against the source before it goes in a draft. Inferences are flagged as inferences.
4. **Draft.** Claude writes the full narrative and marks anything uncertain with `[CHECK: …]`.
5. **Edit.** Safira edits, and the final voice is hers.

## Ground rules (non-negotiable)

- **No company name.** Never mention the company, internal service names, repo names, team names, ticket numbers, or internal tool names (e.g. say "the central API", "the internal tool").
- **Not the company's stance.** All opinions are Safira's own.
- **High-level concepts only.** No inner workings of technical details, and especially no access-control specifics.
- **No colleague names** unless they've agreed. Write it as a "we" story: it was a collaborative effort across people and teams. Safira is the narrator, not the lone hero.
- **Internal docs are background only.** Quarterly reports, RFCs, and Slack threads are interview prep, never quoted or linked.

## Voice & tone

- Casual and conversational. It should sound like Safira wrote it.
- **Understated, not dramatic.** Avoid lines like "it's the whole game", "I think about that a lot", "I didn't expect to feel so good", or disease/cure metaphors. State things plainly.
- Frame decisions in neutral terms.
- Easy to read: short sections, bold lead-ins, a practical takeaway at the end.
- Audience can differ per post. Pick one per post.

## About Safira (context for posts)

- Currently a full-stack engineer (Engineer II) on a web platform team.
- Previously a senior consultant at Thoughtworks (Melbourne). Clients included Atlassian, NAB, MYOB, and Falabella (a retailer based in Chile).
- Co-presented a main-stage talk at an internal tech conference alongside two Staff Engineers, to a mostly senior+ audience. It started as a lightning talk on unifying the web stack and grew into the main-stage version (the one actually delivered).
- Source material: Q2 and Q3 2026 quarterly achievement reports (Google Docs), plus the related RFCs and docs.

## Focus

**My experiences as a senior platform engineer.** No series label for now.

Narrative thread to keep in mind (not a label, just context for framing): much of the work is **defragmentation** (Safira's preferred word): making fragmented systems smaller. That covers retiring a legacy service, merging micro-frontends into one app, a shared data layer, shared navigation/layout primitives, and hunting down cloud waste. Use this where it fits naturally, but don't force it or name it.

## Post plan (in suggested order)

| # | Working title | Audience | Status |
|---|---|---|---|
| 1 | **The service nobody owned (and how we finally turned it off)**: retiring a legacy internal-tool BFF; shared ownership → no ownership → clear ownership | Engineers & tech leads facing a zombie service | Published |
| 2 | **Merging micro-frontends back into one app, without anyone noticing**: why, history preservation, order of operations, zero user-noticed incidents | Engineers considering undoing micro-frontends | Not started |
| 3 | **Consultant to product engineer: what changed when I stopped leaving**: consulting vs living with your decisions | Anyone weighing consulting vs in-house | Not started |
| 4 | **A few hours, $36k a year: finding money in the cloud bill**: replicas on a stopped primary, zero-traffic instances; nobody owns the bill | Broad engineering audience | Not started |
| 5 | **Design-then-delegate**: planning, handing work to newer engineers + onboarding (30/60/90 plans, context packs, ticket breakdowns someone else can pick up) | Senior engineers & new leads | Not started |
| 6 | **The migration was the easy part**: phase two de-duplication (providers, query clients, error boundaries, config) | Frontend engineers | Not started |
| 7 | **The migration checklist**: the reusable pre-work checklist that makes each migration cheaper | Practical / stealable | Not started |
| 8 | **Cutting a 45-minute build to 19, and why I bothered**: CI time as team morale | Broad, short | Not started |
| 9 | **Building a public data story**: and asking whether the data counts the right audience | Product-minded engineers | Not started |
| 10 | **On the main stage as an Engineer II**: how it happened, preparing for a senior audience, linking engineering to business outcomes. Frame as lessons on influence. | Early-to-mid-career engineers | Not started |
| 11 | **Building ops tooling for a team living in SQL queries**: solo end-to-end internal tool | Full-stack / product-minded | Not started |
| 12 | **How I actually work with an AI pair**: rules files, guardrails, team adoption | Broad, timely | Not started |
