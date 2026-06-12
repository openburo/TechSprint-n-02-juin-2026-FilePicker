### 6.3 Sequence messaging schema generated reference

*Validates the postMessage messages a provider iframe sends to the consumer during an intent. Every message has a `type` discriminator and a `payload` whose shape depends on `type`.*

#### Definitions

- <a id="%24defs/intentInit"></a>**`intentInit`** *(object)*: Provider -> consumer. Cannot contain additional properties.
  - <a id="%24defs/intentInit/properties/type"></a>**`type`**: Must be: `"intent:init"`.
  - <a id="%24defs/intentInit/properties/payload"></a>**`payload`** *(object, required)*: Cannot contain additional properties.
- <a id="%24defs/intentResize"></a>**`intentResize`** *(object)*: Provider -> consumer. Optional: not mandatory to send, and the consumer must not wait for it. Cannot contain additional properties.
  - <a id="%24defs/intentResize/properties/type"></a>**`type`**: Must be: `"intent:resize"`.
  - <a id="%24defs/intentResize/properties/payload"></a>**`payload`** *(object, required)*: Cannot contain additional properties.
    - <a id="%24defs/intentResize/properties/payload/properties/width"></a>**`width`** *(number, required)*: Minimum: `0`.
    - <a id="%24defs/intentResize/properties/payload/properties/height"></a>**`height`** *(number, required)*: Minimum: `0`.

    Examples:
    ```json
    {
        "width": 800,
        "height": 600
    }
    ```

- <a id="%24defs/intentProgress"></a>**`intentProgress`** *(object)*: Provider -> consumer. Progress updates, likely needed for chunking large files or streaming results. Cannot contain additional properties.
  - <a id="%24defs/intentProgress/properties/type"></a>**`type`**: Must be: `"intent:progress"`.
  - <a id="%24defs/intentProgress/properties/payload"></a>**`payload`** *(object, required)*
- <a id="%24defs/intentDone"></a>**`intentDone`** *(object)*: Provider -> consumer. Delivers the result. May be sent more than once to stream documents as they are downloaded; `final` marks the last message. Cannot contain additional properties.
  - <a id="%24defs/intentDone/properties/type"></a>**`type`**: Must be: `"intent:done"`.
  - <a id="%24defs/intentDone/properties/payload"></a>**`payload`** *(object, required)*
    - <a id="%24defs/intentDone/properties/payload/properties/final"></a>**`final`** *(boolean)*: Whether this is the last intent:done for the intent. When false, more messages follow. When omitted, treated as final. Default: `true`.

---
