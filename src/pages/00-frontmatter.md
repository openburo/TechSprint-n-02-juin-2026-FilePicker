# Open Buro — File Picker

**The first standard of the Open Buro suite.**

| | |
|---|---|
| **Status** | Draft / Beta — Editor's Draft |
| **This version** | 0.1 (June 2026) |
| **Standard suite** | Open Buro — European Workplace Orchestration Standard |
| **Topic** | File Picker (first topic) |
| **Editors & contributors** | Listed alphabetically below — see [Contributors](#contributors). |
| **Origin** | Open Buro TechSprint #01 — File Picker, April 2026 |
| **License** | CC BY-SA 4.0 |
| **Project** | <https://openburo.eu> · <https://github.com/openburo> |

---

## Contributors

Listed alphabetically by surname.

| Name | Organisation | GitHub | Email |
|---|---|---|---|
| Benjamin André | LINAGORA | [Benibur](https://github.com/Benibur) | bandre@linagora.com |
| Stephan Bergmann | Collabora Productivity | [stbergmann](https://github.com/stbergmann) | stephan.bergmann@collabora.com |
| Jaime Conde Segovia | Univention | — | conde-segovia@univention.de |
| Thibaud Delobelle | Oriatec | — | thibaud.delobelle@oriatec.fr |
| Manuel Leduc | XWiki | [manuelleduc](https://github.com/manuelleduc) | manuel.leduc@xwiki.com |
| Samuel Paccoud | DINUM / La Suite numérique | — | samuel.paccoud@numerique.gouv.fr |
| Théo Poizat | LINAGORA | [zatteo](https://github.com/zatteo) | tpoizat@linagora.com |
| Viktor Pracht | Open-Xchange | [VP-](https://github.com/VP-) | viktor.pracht@open-xchange.com |
| Éloi Rivard | LaSuite.coop / Yaal coop | [azmeuk](https://github.com/azmeuk) | eloi@yaal.coop |

> **`TODO`** — Add the remaining first-TechSprint participants not yet listed above (and confirm the two organisations inferred from email domains: Manuel Leduc → XWiki, Thibaud Delobelle → Oriatec).

---

## Abstract

Open Buro is an open standard that **platformises independent digital services** — it orchestrates separately-built applications into a coherent workplace that delivers a *Smart Platform Experience*, rather than a mere catalogue of apps behind a single sign-on.

The **File Picker** is the first Open Buro standard. It defines a protocol that lets a *consumer* application (mail, docs, chat, calendar…) cast an *intent* asking a *provider* application (a drive such as Twake Drive, LaSuite Drive, Nextcloud…) to present a file-selection widget and return the result in a predefined format. The provider supplies its own file picker frontend; the consumer application doesn't need to implement anything for the user to benefit from the provider's full navigation (search, favourites, recents, tags…).

This document is the **explanatory specification** of the File Picker: its purpose, terminology, architecture, and the intent lifecycle. The deep normative artefacts (the formal manifest JSON Schema, the exhaustive `postMessage` message exchanges, the error registry, and the security model) are presented here at the architectural level and **reserved** for iterative refinement; the sections that hold them are marked `[RESERVED]`.

---

## Status of This Document

This is an **Editor's Draft**. Open Buro and its File Picker standard are in **beta**. The protocol described here was validated in practice during the April 2026 TechSprint, where four independent providers (Jalios, a WebDAV picker, LaSuite Drive and Twake Drive) interoperated against a shared capabilities registry.

This document **supersedes** the earlier hackathon working note (`open-buro-dossier-technique-file-picker.md`) as the canonical entry point for the File Picker. The comparative survey of prior art from that note has been distilled into **Appendix A** as non-normative rationale.

Sections marked `[RESERVED]` are **not yet normative**. They name the artefact to be produced and scope it, so that implementers know what is settled and what is still open. Following the project's working principle — *when a generalisation is simple, integrate it directly; otherwise postpone it and say so* — open points are flagged inline rather than silently resolved.

---

## Table of Contents

[Abstract](#abstract) · [Status of This Document](#status-of-this-document) · [Contributors](#contributors)

1. [Terminology and Conventions](#1-terminology-and-conventions)
2. [Functional Overview](#2-functional-overview)
3. [Use Cases — value proposition](#3-use-cases--illustrating-the-value-proposition)
4. [Personas and Audience](#4-personas-and-audience)
5. [Architecture](#5-architecture)
6. [The Intent Lifecycle](#6-the-intent-lifecycle)
7. [Capabilities Reference — PICK, SAVE](#7-capabilities-reference--pick-save)
8. [Scope and Assumptions](#8-scope-and-assumptions)
9. [Security Considerations](#9-security-considerations)
10. [Implementation Resources (How-tos)](#10-implementation-resources-how-tos)
11. [Open Items — the road to a normative specification](#11-open-items--the-road-to-a-normative-specification)
- [Appendix A — Prior Art and Rationale](#appendix-a--prior-art-and-rationale-non-normative)
- [Appendix B — Mapping from earlier terminology](#appendix-b--mapping-from-earlier-terminology)
- [References](#references)

---
