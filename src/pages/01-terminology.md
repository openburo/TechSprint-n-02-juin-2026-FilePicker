## 1. Terminology and Conventions

### 1.1 Requirement keywords

The key words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** are to be interpreted as described in [RFC 2119] and [RFC 8174] when, and only when, they appear in all capitals. In this Editor's Draft they are used where a requirement is already firm from the TechSprint; requirements still under refinement live in `[RESERVED]` sections.

### 1.2 Core terms

| Term | Definition |
|---|---|
| **Consumer** | The application that initiates a file-picking interaction by casting an intent (e.g. a mail or document editor). It does not implement the file picking interface. |
| **Provider** | The application that exposes a file-picking widget and resolves the intent (e.g. a drive). It supplies its own frontend. |
| **Capability** | A declared ability of a provider to handle a class of intent — for the File Picker: `PICK` or `SAVE`. |
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
