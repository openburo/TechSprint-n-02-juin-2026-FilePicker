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

<!-- excalidraw src="../diagrams/protocol-postmessage-v1.excalidraw" alt="postMessage protocol V1" sha256="f59a8dc308d636869f478127bdbfdb28206402e9adad79b4947b6cdd410fe181" -->
[![postMessage protocol V1](../diagrams/protocol-postmessage-v1.excalidraw.svg)](../diagrams/protocol-postmessage-v1.excalidraw)
<!-- /excalidraw -->

> `[RESERVED]` **Normative `postMessage` message catalogue.** The complete, normative catalogue — every message type, its direction, required and optional fields, the canonical `document` object schema, the response modes (by reference vs by base64 content), size limits, and the error-code registry — will be specified as a normative artefact. The flow and payloads above are illustrative distillations of the TechSprint draft.

---
