## 9. Security Considerations

This section defines the security model that governs the File Picker protocol.

### 9.1 Origin Validation and `postMessage` Security

All `postMessage` communication between consumer and provider **MUST** strictly specify targetOrigin and validate origin to prevent message interception by malicious frames.

**In the consumer:**

| Direction | Sender | Receiver | Validation Rule |
|---|---|---|---|
| Consumer → Provider | Consumer | Provider iframe | `targetOrigin` **MUST** be set to the selected provider's origin as declared in its manifest `url`. |
| Provider → Consumer | Provider iframe | Consumer | Consumer **MUST** verify `event.origin` matches the selected provider's origin as declared in its manifest `url`.

**In the provider:**

- The provider obtain the consumer's origin from the initial `intent:init` message's `event.origin`, or from a verified `consumer` query parameter in the iframe URL.
- The provider **MUST** validate this origin against a list of known consumer manifests for the workplace. If validation fails, the provider **MUST NOT** respond.
- Once validated, the consumer origin becomes the `targetOrigin` for all subsequent `postMessage` calls from provider to consumer.

> **Rationale:** This two-way origin binding ensures that messages cannot be intercepted by a frame impersonating either party. The initial handshake bootstraps trust; subsequent messages are protected by origin checks.

### 9.2 Content Security Policy (CSP)

Content Security Policy headers control which domains may embed or be embedded by others in the File Picker exchange.

| Component | CSP Directive | Requirement |
|---|---|---|
| Provider | `frame-ancestors` | All consumer origins that are permitted to embed the provider's picker. |
| Consumer | `frame-src` | All provider origins that may be embedded as pickers. |

The integrator can adds every consumer in the providers CSP and every providers in the consumers CSP. An integrator can also implement a way to restrict these lists.

> **Note on legacy headers:** `X-Frame-Options` should be handled the same way.

### 9.3 Cross-Origin Resource Sharing (CORS)

CORS configuration ensures that cross-origin requests within the File Picker flow are permitted only between authorised parties.

| Resource | Requester | Requirement |
|---|---|---|
| Platform registry (backend) | Consumers and providers | Backend **MUST** accept requests from both consumer and provider origins. |
| Provider download links (for `PICK` by reference) | Consumer | **MUST** accept `fetch` requests originating from consumer origins. |

### 9.4 iframe Embedding Controls

The provider's picker runs in an iframe embedded by the consumer. The iframe environment **MUST** permit the operations necessary for file selection.

**`sandbox` attribute:**

- If a consumer applies the `sandbox` attribute, it **MUST** explicitly allow scripts and popup opening are they are required by the protocol.

** `allow` attribute:**

A provider **MUST** document which permissions it requires in its capability manifest. E.g. if a File Picker requires the camera, it must specify `camera`. Then, the iframe **MUST** apply these permissions in `allow` attribute. See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow.

### 9.5 Intent Identification

To prevent interference between multiple concurrent picker invocations, each intent exchange **MUST** carry a unique identifier.

- The consumer **MUST** generate a unique intent ID and include it in the `intent:init` message.
- The provider **MUST** echo this ID in all subsequent messages (`intent:resize`, `intent:done`, `intent:error`).
- The consumer **MUST** correlate responses to the originating intent using this ID.

> **Rationale:** Multiple tabs or rapid successive invocations could otherwise cause message collision. The intent ID acts as a session identifier for the lifecycle of a single picker interaction.

---
