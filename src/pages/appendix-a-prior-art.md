## Appendix A — Prior Art and Rationale (non-normative)

The File Picker design is informed by a survey of existing intent/capability systems. This appendix distils that survey; it is rationale, not specification.

- **Android intents & intent-filters.** The canonical decentralised model: each app declares capabilities (`action` + data type), the system resolves matches, a chooser disambiguates, results return to the caller. Open Buro borrows the `action`/capability vocabulary and the chooser pattern.
- **freedesktop.org / XDG.** `.desktop` entries plus the D-Bus `org.freedesktop.portal.FileChooser` portal, which lets a sandboxed app request a file selection from the desktop without direct filesystem access — the closest semantic ancestor for a *provider-served, isolation-preserving* picker.
- **Cozy / Twake.** A web-native intents system (manifest-declared `intents`, stack-side resolution, iframe + `postMessage` handshake, `service.terminate(doc)` to return). This is the most direct lineage for the lifecycle in §6; it also surfaced the limitations Open Buro aims to remove.
- **openDesk (Intercom Service).** A backend-for-frontend proxy with hardcoded integrations and broad cross-app trust. Instructive as a *counter-model*: it requires embedding each provider's component into each consumer and grants wide rights — exactly the coupling and trust footprint Open Buro avoids by having the provider serve its own isolated frontend.
- **Google Picker.** The most mature proprietary web picker. Its decade-tuned response object (`id`, `name`, `mimeType`, `url`, `size`…) directly informs Open Buro's response shape; its Builder/SDK approach motivates offering the Bridge as an *optional facilitator* over a framework-independent `postMessage` contract.

**Why this shape.** The TechSprint confirmed that a workable open file picker needs: a normalised-but-rich response, MIME filtering, multi-select, a clear PICK/SAVE distinction and an isolation model where the provider serves its own UI and the consumer never gains ambient access to provider data.

---
