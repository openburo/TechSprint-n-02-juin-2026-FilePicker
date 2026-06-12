# Open Buro — File Picker

**The first standard of the Open Buro suite.**

| | |
|---|---|
| **Status** | Draft / Beta — Editor's Draft |
| **This version** | 0.1 (June 2026) |
| **Standard suite** | Open Buro — European Workplace Orchestration Standard |
| **Topic** | File Picker (first topic) |
| **Editors** | Benjamin André (LINAGORA / Twake) · Samuel Paccoud (DINUM / La Suite numérique) |
| **Origin** | Open Buro TechSprint #01 — File Picker, April 2026 |
| **License** | CC BY-SA 4.0 |
| **Project** | <https://openburo.eu> · <https://github.com/openburo> |

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

1. Introduction
2. Terminology and Conventions
3. Functional Overview
4. Personas and Audience
5. Architecture
6. The Intent Lifecycle
7. Capabilities Reference — PICK, SAVE, SHARE
8. Scope and Assumptions
9. Security Considerations `[RESERVED]`
10. Implementation Resources (How-tos)
11. Open Items — the road to a normative specification
- Appendix A — Prior Art and Rationale (non-normative)
- Appendix B — Mapping from earlier terminology
- References

---

## 1. Introduction

### 1.1 What Open Buro is

Europe now has credible open-source applications for every workplace need — email, instant messaging, Office suite, collaborative notes, video-conferencing, drive, project management. What it lacks is not better apps but the **orchestration layer between them**: the cross-cutting integration that turns separate services into one platform. A shared SSO produces a portal, not a platform. Open Buro is the standard that supplies the missing layer, so that the European ecosystem can collectively offer a usage value that exceeds Microsoft 365.

Open Buro has two inseparable facets: a **technical standard** and an **Alliance** that carries its governance and promotion. This document concerns the technical standard, and specifically its first topic.

### 1.2 Why the File Picker first

Picking a file from one application while working in another is the smallest complete proof that two independently-built services can cooperate deeply — not merely sit side by side. It is concrete, universally needed, and bounded enough to quicly specify and demonstrate. Starting from a working use case (rather than from abstract governance debates) is a deliberate sequencing choice: **architecture conditions governance**, and a demonstration earns the credibility that a specification alone cannot.

### 1.3 Origin

The need for a service-orchestration standard emerged from concrete collaboration between **LaSuite** and **Twake**, who worked on advanced cross-service integration. The File Picker was the first use case taken to a TechSprint (April 2026), producing the reference material this document formalises.

---

## 2. Terminology and Conventions

### 2.1 Requirement keywords

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as described in [RFC 2119] and [RFC 8174] when, and only when, they appear in all capitals. In this Editor's Draft they are used where a requirement is already firm from the TechSprint; requirements still under refinement live in `[RESERVED]` sections.

### 2.2 Core terms

| Term | Definition |
|---|---|
| **Consumer** | The application that initiates a file-picking interaction by casting an intent (e.g. a mail or document editor). It does not implement the file picking interface. |
| **Provider** | The application that exposes a file-picking widget and resolves the intent (e.g. a drive). It supplies its own frontend. |
| **Capability** | A declared ability of a provider to handle a class of intent — for the File Picker: `PICK` or  `SAVE`. |
| **Intent casting** | The act, by a consumer, of broadcasting a request for a capability and letting the platform resolve it to one or more providers. |
| **Capabilities manifest** | The standard-format document in which an application declares its capabilities (see §5.2). |
| **Capability chooser** | The UI shown to the end-user when several providers expose the requested capability. Implementing it is the consumer's responsibility; Open Buro offers a shared standard implementation. |
| **Open Buro Bridge** | The reference client library that handles the consumer side of the intent lifecycle (discovery, resolution, iframe and `postMessage` orchestration, response management). |
| **Platform registry** | The service (the "Open Buro server") that lists the capabilities exposed by the applications of a given workplace. |
| **Workplace / Platform** | The set of applications orchestrated together under one administration. |
| **Interop environment** | A broader setting in which applications from different organisations interoperate, with administrators of limited control (see §8.3). |
| **End-user / Workplace administrator / Application developer** | The three personas (see §4). |

> **Note on terminology lineage.** The April working note used an Android-flavoured vocabulary (*client, service/source, intent-filter, ob_bridge, chooser*). This standard fixes the canonical terms above. A full mapping is given in **Appendix B**, and all examples in this document — including manifest snippets — use the canonical terms.

---

## 3. Functional Overview

### 3.1 What the File Picker does

The Open Buro File Picker is a protocol that lets a **consumer** cast an **intent** asking to open a file picker served by a **provider**. From the end-user's standpoint: while attaching a file in a mail client (consumer), the user is presented with their drive's (provider's) own picker, browses it natively, selects a file, and the result flows back into the mail client.

Defining properties:

- The **picker frontend is supplied by the provider**. The consumer does not implement any user interface.
- All of the provider's navigation features (search, favourites, recents, tags…) are **automatically available**.
- The picker interface is **homogeneous** from one consumer to the next — it is the provider's file picker, regardless of the consumer from which it is being invoked.
- The picker UX remains **visually distinct** from the consumer, so the user understands they are momentarily in the provider and that the consumer does not see the provider's contents.
- A consumer can **list the providers** that expose a file-picker capability — `PICK` or `SAVE`.

### 3.2 Roles at a glance

| Role | Responsibility |
|---|---|
| **Consumer** | Casts the intent; drives the lifecycle (with the Open Buro Bridge); consumes the response. |
| **Provider** | Declares its capabilities; serves the picker frontend; returns the result over `postMessage`. |
| **Platform registry** | Exposes the list of available capabilities for the workplace. |
| **Open Buro Bridge** | Reference implementation of the consumer-side lifecycle. |
| **Capability chooser** | Lets the user pick among several matching providers. |

> **[ DIAGRAM PLACEHOLDER — `consumer_provider_architecture` ]**
>
> *Generation prompt:* "A clean, modern technical architecture diagram on a light background. Centre: a browser window containing two side-by-side panels — a left panel labelled 'Consumer (e.g. Mail)' and a right panel, visually distinct (different accent border), labelled 'Provider file picker (e.g. Drive)', connected by a horizontal double-headed arrow labelled 'postMessage'. Below the browser, two boxes: 'Platform registry (Open Buro server)' connected to the consumer by an arrow labelled 'list capabilities', and 'Provider backend' connected to the provider panel. A small library chip labelled 'Open Buro Bridge' overlaps the consumer panel. Flat vector style, restrained European-tech palette (deep blue, teal accent), thin lines, generous whitespace, labels in English."

---

## 4. Personas and Audience

| Persona | Role |
|---|---|
| **End-user** | Uses the consumer and provider applications. |
| **Workplace administrator** | Deploys and configures the applications. |
| **Application developer** | Builds consumer or provider applications. |

**This document addresses workplace administrators and application developers.** The product ambition remains centred on the end-user: an integrated, fluid and productive journey.

---

## 5. Architecture

### 5.1 Components

A File Picker exchange involves a **consumer**, one or more **providers**, a **platform registry** that advertises capabilities, and — on the consumer side — the **Open Buro Bridge** and the **capability chooser**.

> **[ DIAGRAM PLACEHOLDER — `component_architecture` ]**
>
> *Generation prompt:* "A component diagram, flat vector, light background. Four labelled blocks arranged around a central dashed boundary marked 'Browser': (1) 'Consumer app' containing two nested chips 'Open Buro Bridge' and 'Capability chooser'; (2) 'Provider app — file picker (iframe)'; an arrow 'postMessage (bidirectional)' between (1) and (2). Outside the browser boundary: (3) 'Platform registry / Open Buro server — capabilities list' with an arrow from the Bridge labelled 'GET capabilities'; (4) 'Provider backend' with an arrow from the provider iframe. Use distinct border colours for consumer vs provider to stress visual separation. English labels, thin connectors, ample whitespace."

### 5.2 The capabilities manifest

Every application in the ecosystem — consumer or provider — **MUST** declare its capabilities in a **capabilities manifest** the format of which is part of the standard. Providers declare the file-picker capabilities they serve in the following format:

```json
{
  "id": "twake-drive-filepicker",
  "name": "Twake Drive File Picker",
  "url": "https://drive.example.eu/openburo.json",
  "version": "0.0.1",
  "display": "modal",
  "capabilities": [
    {
      "action": "PICK",
      "properties": { "mimeTypes": ["*/*"], "multiple": true },
      "path": "https://drive.example.eu/capabilities/PICK"
    },
    {
      "action": "SAVE",
      "properties": { "mimeTypes": ["*/*"] },
      "path": "https://drive.example.eu/capabilities/SAVE"
    },
  ]
}
```

Field intent: `id`/`name`/`version` identify the provider; `url` locates the capabilities file itself; each entry in `capabilities[]` binds an `action` (`PICK` | `SAVE`) to a `path` (the frontend surface to embed) and a set of `properties` (e.g. accepted `mimeTypes`, `multiple`); optional `display` hints at presentation (e.g. `modal`).

> `[RESERVED]` **Manifest JSON Schema.** A formal JSON Schema (types, required fields, allowed `properties` per action, extensibility rules, versioning policy) will be produced as a normative artefact. The snippet above is illustrative.

### 5.3 The platform registry (discovery)

The list of available capabilities is served by a minimal **platform registry** (the "Open Buro server") that exposes the capabilities of the workplace's applications. A consumer queries it to discover which capabilities the providers support: `PICK` or `SAVE`.

**Out of scope (see §8.1):** *how* applications come to know the link to each other's capabilities manifest. A static configuration and a dynamic registry are both legitimate; the discovery transport is not constrained here.

### 5.4 The Open Buro Bridge

The consumer is responsible for the full intent lifecycle. Open Buro provides a reference library, the **Open Buro Bridge**, that implements it so consumers do not re-write it. The Bridge:

- knows the capabilities available on the platform (via the registry);
- resolves an intent to one or more capabilities (resolver + capability chooser);
- drives the provider iframe over its lifecycle (sizing, bidirectional message handling, teardown);
- returns the response to the consumer through a callback.

An **illustrative** consumer-side API (final reference reserved):

```js
// Illustrative only — see [RESERVED] below for the normative API.
const bridge = new OpenBuroBridge({ registry: "https://platform.example.eu" });

const result = await bridge.cast({
  action: "PICK",
  accept: ["image/*", "application/pdf"],
  multiple: true
});
// result.documents -> [{ id, name, mimeType, url, size }, ...]
```

> `[RESERVED]` **Open Buro Bridge — normative API reference.** The method surface, configuration options, framework bindings, and conformance expectations of the Bridge will be specified separately. The sketch above only conveys intent.

### 5.5 The capability chooser

When several providers expose the requested capability, the end-user must be able to choose. Implementing the chooser is the **consumer's responsibility**, but Open Buro ships a **shared standard implementation** so consumers can adopt a consistent, accessible chooser instead of building their own.

---

## 6. The Intent Lifecycle

The consumer owns the lifecycle: **intent cast → retrieve capabilities → capability chooser → iframe + `postMessage` setup → iframe layout → response management**. The Open Buro Bridge implements these steps.

The provider and consumer establish a channel over `window.postMessage`. The validated message flow is:

```
Consumer                                  Provider (iframe)
   |                                            |
   |  -- load iframe (capability path) ------->  |
   |  <----------- { type: "intent:ready" } ---  |   (1) provider ready
   |  -- { type: "intent:init",                  |
   |       action: "PICK",                       |
   |       params: { multiple: true,             |   (2) consumer sends params
   |                 accept: ["image/*"] } } -->  |
   |              ... user browses & selects ...  |
   |  <-- { type: "intent:resize", height } ----  |   (optional) layout hint
   |  <-- { type: "intent:done",                  |
   |        documents: [ ... ] } --------------   |   (3) result
   |  -- close iframe ------------------------->  |   (4) consumer tears down
```

Illustrative result message (`PICK`, returned by reference):

```json
{
  "type": "intent:done",
  "action": "PICK",
  "documents": [
    {
      "id": "abc-123",
      "name": "report.pdf",
      "mimeType": "application/pdf",
      "url": "https://drive.example.eu/share/abc-123?token=xyz",
      "size": 245000
    }
  ]
}
```

Terminal messages also include `intent:cancel` and `intent:error` (with an error code such as `user_cancelled`, `permission_denied`, `not_found`, `size_exceeded`, `unknown`).

A consumer that receives messages **MUST** validate `event.origin` before acting on them.

> **[ DIAGRAM PLACEHOLDER — `intent_lifecycle_sequence` ]**
>
> *Generation prompt:* "A vertical UML-style sequence diagram, flat vector, light background, two lifelines: 'Consumer (Open Buro Bridge)' and 'Provider (file-picker iframe)'. Ordered messages top to bottom: 'load iframe' (consumer→provider), 'intent:ready' (provider→consumer), 'intent:init {action, params}' (consumer→provider), a self-note on the provider 'user browses & selects', 'intent:resize {height}' dashed/optional (provider→consumer), 'intent:done {documents[]}' (provider→consumer), 'close iframe' (consumer→provider). Monospaced message labels, thin arrows, subtle activation bars, English."

> **[ DIAGRAM PLACEHOLDER — `end_user_file_picking_journey` ]**
>
> *Generation prompt:* "A 4-step horizontal end-user journey, flat vector, light background, friendly product-illustration style. Step 1: a mail composer with an 'Attach' button highlighted (label 'Consumer'). Step 2: a small chooser dialog listing two drives with logos (label 'Capability chooser — only if several providers'). Step 3: the chosen drive's own file browser shown in a clearly bordered modal over the dimmed mail composer (label 'Provider picker — visually distinct'). Step 4: the mail composer again, now with a file chip attached (label 'Result returned'). Numbered 1–4, English captions, consistent restrained palette."

> `[RESERVED]` **Normative `postMessage` message catalogue.** The complete, normative catalogue — every message type, its direction, required and optional fields, the canonical `document` object schema, the answer modes (by reference vs by base64 content), size limits, and the error-code registry — will be specified as a normative artefact. The flow and payloads above are illustrative distillations of the TechSprint draft.

---

## 7. Capabilities Reference — PICK, SAVE

The File Picker defines three capabilities. All three are **in scope for V1**. Their architectural semantics are fixed here; their formal parameter and response schemas are reserved together with the message catalogue (§6).

Intent parameters (consumer → provider) at the architectural level:

| Parameter | Type | Applies to | Description |
|---|---|---|---|
| `action` | string | all | `PICK` or `SAVE`. |
| `type` | string | all | Object class, e.g. `files` (extensible to `images`, `documents`…). |
| `multiple` | boolean | PICK | Allow selecting several items. |
| `accept` | string[] | PICK, SAVE | Optional MIME filters, e.g. `["image/*", "application/pdf"]`. |
| `data` | object | SAVE | Action input, e.g. for SAVE `{ content, filename }`. |

### 7.1 PICK

Select one or more existing items in the provider and return them to the consumer — by **reference** (a `url`, with the provider's own access strategy embedded) or by **value** (base64 `content`, bounded in size). This is the canonical case demonstrated at the TechSprint.

### 7.2 SAVE

Deposit content supplied by the consumer into a location the user chooses in the provider (the provider serves a destination-selection widget). The consumer supplies `data: { content, filename }`; the response confirms the stored item.

---

## 8. Scope and Assumptions

### 8.1 In scope / out of scope

**In scope:** the protocol by which a consumer casts an intent, discovers and chooses a provider, embeds the provider's picker, and receives a standard response.

**Out of scope:**

- **How applications come to know one another** — i.e. how an application obtains the link to another's capabilities file.
- **Rights attribution for data access.** If applications grant or exchange specific access rights, they do so outside this specification.

### 8.2 Presentation assumption

For clarity, the protocol is presented assuming that **all applications are controlled by the workplace administrator**, who can act on every technical aspect (configuration, embedding, sessions). This **simplifies understanding but is not a requirement** of the standard.

### 8.3 Generalisation ambition

The standard targets more heterogeneous settings — applications from **different organisations**, and **administrators with limited control** (e.g. restricted IAM configuration). Guiding principle: **when a generalisation is simple, integrate it directly; otherwise postpone it and say so.** Open points are flagged inline (`[RESERVED]`) rather than silently assumed away.

### 8.4 Mobile

The overall architecture is designed to extend to **mobile application** contexts, but the mobile binding is **not specified at this date**.

> `[RESERVED]` **Mobile binding.** How intent casting, provider embedding, and answer return map onto native mobile apps (flagship app, dedicated apps) will be specified separately.

---

## 9. Security Considerations `[RESERVED]`

> `[RESERVED]` This section will cover, at minimum: `event.origin` validation (the one firm requirement already stated in §6); embedding controls (CSP `frame-ancestors` / `frame-src`) and how a workplace establishes the set of domains allowed to embed providers; clickjacking protection for the embedded picker; and the access strategy for returned references (token-bearing URLs) versus returned content. The TechSprint relied on browser-security workarounds for local testing; those are explicitly **not** part of the production model and will be replaced by this section.

---

## 10. Implementation Resources (How-tos)

The ecosystem provides, around this standard:

- **Reference implementations** — minimal "hello world" consumer and provider for demonstration and as a starting point.
- **Test frameworks** — conformance harnesses to validate a consumer or a provider implementation against the protocol.
- **Libraries** covering the generic parts of the lifecycle — the **Open Buro Bridge** (consumer-side lifecycle) and the **capability chooser** (shared chooser UI).

> `[RESERVED]` **How-to pages.** Step-by-step guides ("expose a PICK capability on your drive", "add a file picker to your editor with the Bridge", "run the conformance suite") will be added as the reference implementations stabilise. Links will point to the relevant `github.com/openburo` repositories.

---

## 11. Open Items — the road to a normative specification

This Editor's Draft fixes the architecture and terminology. The following normative artefacts remain to be produced (each flagged `[RESERVED]` in place):

1. Manifest JSON Schema (§5.2).
2. Open Buro Bridge normative API reference (§5.4).
3. Normative `postMessage` message catalogue, canonical `document` object, answer modes, size limits, and error-code registry (§6).
4. Security model (§9).
5. Mobile binding (§8.4).
6. How-to pages (§10).

---

## Appendix A — Prior Art and Rationale (non-normative)

The File Picker design is informed by a survey of existing intent/capability systems. This appendix distils that survey; it is rationale, not specification.

- **Android intents & intent-filters.** The canonical decentralised model: each app declares capabilities (`action` + data type), the system resolves matches, a chooser disambiguates, results return to the caller. Open Buro borrows the `action`/capability vocabulary and the chooser pattern.
- **freedesktop.org / XDG.** `.desktop` entries plus the D-Bus `org.freedesktop.portal.FileChooser` portal, which lets a sandboxed app request a file selection from the desktop without direct filesystem access — the closest semantic ancestor for a *provider-served, isolation-preserving* picker.
- **Cozy / Twake.** A web-native intents system (manifest-declared `intents`, stack-side resolution, iframe + `postMessage` handshake, `service.terminate(doc)` to return). This is the most direct lineage for the lifecycle in §6; it also surfaced the limitations Open Buro aims to remove.
- **openDesk (Intercom Service).** A backend-for-frontend proxy with hardcoded integrations and broad cross-app trust. Instructive as a *counter-model*: it requires embedding each provider's component into each consumer and grants wide rights — exactly the coupling and trust footprint Open Buro avoids by having the provider serve its own isolated frontend.
- **Google Picker.** The most mature proprietary web picker. Its decade-tuned response object (`id`, `name`, `mimeType`, `url`, `size`…) directly informs Open Buro's answer shape; its Builder/SDK approach motivates offering the Bridge as an *optional facilitator* over a framework-independent `postMessage` contract.

**Why this shape.** The TechSprint confirmed that a workable open file picker needs: a normalised-but-rich response, MIME filtering, multi-select, a clear PICK/SAVE distinction and an isolation model where the provider serves its own UI and the consumer never gains ambient access to provider data.

---

## Appendix B — Mapping from earlier terminology

| April working note | This standard (canonical) |
|---|---|
| Client | **Consumer** |
| Service / Source | **Provider** |
| Intent (cast) | **Intent casting** (the act); **intent** (the request) |
| `ob_bridge` | **Open Buro Bridge** |
| Chooser | **Capability chooser** |
| Registry / resolver | **Platform registry** (discovery) + resolver inside the Bridge |
| Coquille (shell app) | Shell-hosting pattern (a deployment choice, not a protocol role) |

---

## References

**Normative**

- [RFC 2119] Bradner, S., *Key words for use in RFCs to Indicate Requirement Levels*, 1997.
- [RFC 8174] Leiba, B., *Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words*, 2017.

**Informative**

- Open Buro project site — <https://openburo.eu>
- Open Buro repositories — <https://github.com/openburo>
- Open Buro TechSprint #01 (File Picker) — <https://github.com/openburo/TechSprint-n-01-april-20206-FilePicker>
- Android Intents & Intent Filters — <https://developer.android.com/guide/components/intents-filters>
- D-Bus FileChooser Portal — <https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.FileChooser.html>
- Cozy Stack Intents — <https://docs.cozy.io/en/cozy-stack/intents/>
- openDesk architecture — <https://docs.opendesk.eu/operations/architecture/>
- Google Picker API — <https://developers.google.com/drive/picker>

---

*Open Buro is a project in service of European digital-sovereignty policy. "Code is Law… but Architecture is Politics."*