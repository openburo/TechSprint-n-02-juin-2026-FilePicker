## 7. Capabilities Reference — PICK, SAVE

The File Picker defines two capabilities. Both are **in scope for V1**. Their architectural semantics are fixed here; their formal parameter and response schemas are reserved together with the message catalogue (§6).

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
