## 5. Architecture

### 5.1 Components

A File Picker exchange involves a **consumer**, one or more **providers**, a **platform registry** that advertises capabilities, and — on the consumer side — the **Open Buro Bridge** and the **capability chooser**.

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
    }
  ]
}
```

Field intent: `id`/`name`/`version` identify the provider; `url` locates the capabilities manifest itself; each entry in `capabilities[]` binds an `action` (`PICK` | `SAVE`) to a `path` (the frontend surface to embed) and a set of `properties` (e.g. accepted `mimeTypes`, `multiple`); optional `display` hints at presentation (e.g. `modal`).

> `[RESERVED]` **Manifest JSON Schema.** A formal JSON Schema (types, required fields, allowed `properties` per action, extensibility rules, versioning policy) will be produced as a normative artefact. The snippet above is illustrative.

### 5.4 The platform registry (discovery)

The list of available capabilities is served by a minimal **platform registry** (the "Open Buro server") that exposes the capabilities of the workplace's applications. A consumer queries it to discover which capabilities the providers support: `PICK` or `SAVE`.

**Out of scope (see §8.1):** *how* applications come to know the link to each other's capabilities manifest. A static configuration and a dynamic registry are both legitimate; the discovery transport is not constrained here.

### 5.5 The Open Buro Bridge

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

### 5.6 The capability chooser

When several providers expose the requested capability, the end-user must be able to choose. Implementing the chooser is the **consumer's responsibility**, but Open Buro ships a **shared standard implementation** so consumers can adopt a consistent, accessible chooser instead of building their own.

---
