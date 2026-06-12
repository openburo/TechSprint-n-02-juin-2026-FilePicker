# Untitled array in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/iframeAllow
```

Permissions Policy features the application needs when opened in an iframe. The consumer uses this list to build the iframe `allow` attribute. When omitted, the application needs no extra features. Ignored for non-iframe targets. See <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow>

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## iframeAllow Type

`string[]`

## iframeAllow Constraints

**minimum number of items**: the minimum number of items for this array is: `1`

**unique items**: all items in this array must be unique. Duplicates are not allowed.

## iframeAllow Examples

```json
[
  "clipboard-read",
  "clipboard-write"
]
```

```json
[
  "camera",
  "microphone",
  "geolocation"
]
```
