## 10. Implementation Resources (How-tos)

The ecosystem provides, around this standard:

- **Reference implementations** — minimal "hello world" consumer and provider for demonstration and as a starting point.
- **Test frameworks** — conformance harnesses to validate a consumer or a provider implementation against the protocol.
- **Libraries** covering the generic parts of the lifecycle — the **Open Buro Bridge** (consumer-side lifecycle) and the **capability chooser** (shared chooser UI).

### 10.1 How-to — add a provider (expose a capability)

To make an application a **provider** for one or more file-picker capabilities:

1. **Build the picker surface** for each action you support (`PICK`, `SAVE`) — a web page your app serves, to be embedded in the consumer's iframe.
2. **Implement the provider side of the intent lifecycle** (§6): emit `intent:ready`, handle `intent:init` (read `action` and `params`), and return `intent:done` / `intent:cancel` / `intent:error`.
3. **Declare your capabilities** in a capabilities manifest (`openburo.json`, §5.2): `id`, `name`, `url`, `version`, and one `capabilities[]` entry per action with its `path` and `properties` (`mimeTypes`, `multiple`, supported link forms…).
4. **Allow embedding**: set the response headers so the picker page can be framed by the authorised consumer origins (CSP `frame-ancestors` / workplace policy). `TODO`: align the exact headers with the §9 security model.
5. **Expose the capabilities manifest** so the platform registry can list it. `TODO`: the registration/discovery transport is out of scope (§8.1) — document the workplace-specific mechanism here.
6. **Validate** against the provider conformance test framework.

### 10.2 How-to — add a consumer

To make an application a **consumer** that casts file-picker intents:

1. **Integrate the Open Buro Bridge** (§5.4) — or implement the consumer-side lifecycle yourself — to cast intents and handle responses.
2. **Update the provider whitelist.** Add the provider origins this consumer is allowed to embed. This whitelist drives the consumer's **CSP `frame-src`**, so the provider's picker can open inside the consumer's iframe; it is the mechanism behind use case 7 (automatic iframe rights). Providers absent from the whitelist cannot be embedded.
3. **Cast intents** for the capabilities you need (`PICK` / `SAVE`) with the right params (`accept` / `mimeTypes`, `multiple`, context token…).
4. **Handle the response**: support response-by-reference and response-by-value, dual links where offered (§3, use case 4), and store the returned context token to reopen on the same location next time (§3, use case 1).
5. **Validate** against the consumer conformance test framework.

> `[RESERVED]` **Further how-to pages.** Additional guides ("run the conformance suite", end-to-end examples) will be added as the reference implementations stabilise, with links to the relevant `github.com/openburo` repositories.

---
