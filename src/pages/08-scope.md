## 8. Scope and Assumptions

### 8.1 In scope / out of scope

**In scope:** the protocol by which a consumer casts an intent, discovers and chooses a provider, embeds the provider's picker, and receives a standard response.

**Out of scope:**

- **How applications come to know one another** — i.e. how an application obtains the link to another's capabilities manifest.
- **Rights attribution for data access.** If applications grant or exchange specific access rights, they do so outside this specification.

### 8.2 Presentation assumption

For clarity, the protocol is presented assuming that **all applications are controlled by the workplace administrator**, who can act on every technical aspect (configuration, embedding, sessions). This **simplifies understanding but is not a requirement** of the standard.

### 8.3 Generalisation ambition

The standard targets more heterogeneous settings — applications from **different organisations**, and **administrators with limited control** (e.g. restricted IAM configuration). Guiding principle: **when a generalisation is simple, integrate it directly; otherwise postpone it and say so.** Open points are flagged inline (`[RESERVED]`) rather than silently assumed away.

### 8.4 Mobile

The overall architecture is designed to extend to **mobile application** contexts, but the mobile binding is **not specified at this date**.

> `[RESERVED]` **Mobile binding.** How intent casting, provider embedding, and response return map onto native mobile apps (flagship app, dedicated apps) will be specified separately.

---
