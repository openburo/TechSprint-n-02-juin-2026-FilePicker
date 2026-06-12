## 3. Use Cases — illustrating the value proposition

The following use cases motivate the standard's design and illustrate the value of a *Smart Platform Experience* over a mere SSO portal. Each maps to capabilities and properties declared by providers and consumers; points still open are flagged `TODO`.

1. **Reopen on a given context.** The picker can reopen at a previously visited location (e.g. the last folder used) rather than at the provider's root every time. The provider returns an opaque *context* token with its response; the consumer stores it and passes it back on the next cast, so the user resumes where they left off. The context is opaque to the consumer and interpreted only by the provider.

2. **Switch provider (drive) dynamically.** Within a single picking flow, the end-user can switch from one provider to another without restarting — e.g. from the capability chooser, or via a "change drive" affordance — so a user with several drives is not locked into the first one. `TODO`: confirm whether switching happens only at the capability-chooser level, or also live inside an already-open picker session.

3. **MIME-type adaptation.** The consumer declares the accepted `mimeTypes`; the provider adapts its picker accordingly — for example a gallery / thumbnail view when only images are requested — improving the selection experience.

4. **Dual return: share link + download link.** A `PICK` response can return several link forms at once — typically a share link and a direct download link — so the consumer can choose per payload (e.g. embed a small payload, link a large one). The provider announces which link forms it supports in its capabilities (§5.2). This refines the response-by-reference mode of §6.

5. **Encrypted content (raw-data transfer).** A consumer can `PICK` or `SAVE` a file that is encrypted on the provider. In that case the transfer is performed **by raw data (by value)** rather than by URL, so the content can be decrypted in the appropriate context rather than served from a link. `TODO`: specify the decryption boundary — where the keys live and which side decrypts — in coordination with the platform end-to-end vault and the §9 security model.

6. **Simple authentication.** Opening the provider's picker reuses the user's existing workplace session (SSO), so no re-authentication is required when the provider iframe loads. `TODO`: specify the session/token mechanism the provider relies on inside the iframe (to be defined with §9).

7. **Automatic iframe rights management.** The platform automatically grants the embedding rights the provider iframe needs inside the consumer — it opens the consumer's CSP (`frame-src`) for whitelisted providers and sets the appropriate iframe permissions — so developers and administrators do not configure this by hand for every consumer/provider pair. See the consumer how-to (§10) and the §9 security model.

---
