# Untitled object in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability
```

A single action an application can perform.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## capability Type

`object` ([Details](application-manifest-defs-capability.md))

# capability Properties

| Property                | Type      | Required | Nullable       | Defined by                                                                                                                                                                                               |
| :---------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [action](#action)       | `string`  | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-action.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/action")       |
| [path](#path)           | `string`  | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-path.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/path")           |
| [mimeTypes](#mimetypes) | `array`   | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-mimetypes.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/mimeTypes") |
| [multiple](#multiple)   | `boolean` | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-multiple.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/multiple")   |

## action

PICK: the consumer asks the application for one file, many files, or a folder. SAVE: the consumer sends one file, many files, or a folder to the application.

`action`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-action.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/action")

### action Type

`string`

### action Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value    | Explanation |
| :------- | :---------- |
| `"PICK"` |             |
| `"SAVE"` |             |

## path

Endpoint that fulfils this capability. Either an absolute URL or a relative reference resolved against the application `url`. Should return a UI for the user to pick or save files, and then return the picked or saved file(s) to the consumer.

`path`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-path.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/path")

### path Type

`string`

### path Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**URI reference**: the string must be a URI reference, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### path Examples

```json
"https://drive.example.com/capabilities/PICK"
```

```json
"/embed/file-picker"
```

## mimeTypes

MIME filters the capability accepts (e.g. any file, or only images for a gallery). When omitted, the consumer falls back to \['*/*'].

`mimeTypes`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-mimetypes.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/mimeTypes")

### mimeTypes Type

`string[]`

### mimeTypes Constraints

**minimum number of items**: the minimum number of items for this array is: `1`

### mimeTypes Default Value

The default value is:

```json
[
  "*/*"
]
```

## multiple

Whether the capability can pick or save multiple files.

`multiple`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-multiple.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/multiple")

### multiple Type

`boolean`

### multiple Default Value

The default value is:

```json
false
```
