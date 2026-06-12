## 2. Functional Overview

### 2.1 What the File Picker does

The Open Buro File Picker is a protocol that lets a **consumer** cast an **intent** asking to open a file picker served by a **provider**. From the end-user's standpoint: while attaching a file in a mail client (consumer), the user is presented with their drive's (provider's) own picker, browses it natively, selects a file, and the result flows back into the mail client.

Defining properties:

- The **picker frontend is supplied by the provider**. The consumer does not implement any user interface.
- All of the provider's navigation features (search, favourites, recents, tags…) are **automatically available**.
- The picker interface is **homogeneous** from one consumer to the next — it is the provider's file picker, regardless of the consumer from which it is being invoked.
- The picker UX remains **visually distinct** from the consumer, so the user understands they are momentarily in the provider and that the consumer does not see the provider's contents.
- A consumer can **list the providers** that expose a file-picker capability — `PICK` or `SAVE`.

### 2.2 Roles at a glance

| Role | Responsibility |
|---|---|
| **Consumer** | Casts the intent; drives the lifecycle (with the Open Buro Bridge); consumes the response. |
| **Provider** | Declares its capabilities; serves the picker frontend; returns the result over `postMessage`. |
| **Platform registry** | Exposes the list of available capabilities for the workplace. |
| **Open Buro Bridge** | Reference implementation of the consumer-side lifecycle. |
| **Capability chooser** | Lets the user pick among several matching providers. |

<!-- excalidraw src="../diagrams/consumer-provider-architecture.excalidraw" alt="Consumer/provider architecture" sha256="52258ff15c8cb630151c7ace4d5b25ce6b62ed1d11b6b720ee95e4795ed0164a" -->
[![Consumer/provider architecture](../diagrams/consumer-provider-architecture.excalidraw.svg)](../diagrams/consumer-provider-architecture.excalidraw)
<!-- /excalidraw -->

---
