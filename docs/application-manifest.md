# Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json
```

An Application manifest is the array of applications a consumer fetches in order to discover and resolve capabilities.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                         |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json](../out/application-manifest.schema.json "open original schema") |

## Open Buro Applications Manifest Type

`object[]` ([Details](application-manifest-defs-application.md))

# Open Buro Applications Manifest Definitions

## Definitions group application

Reference this group by using

```json
{"$ref":"https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application"}
```

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                       |
| :---------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [id](#id)                     | `string` | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-id.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/id")                     |
| [name](#name)                 | Merged   | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-name.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/name")                 |
| [url](#url)                   | `string` | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-url.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/url")                   |
| [version](#version)           | `string` | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-version.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/version")           |
| [icon](#icon)                 | `string` | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-icon.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/icon")                 |
| [iframeAllow](#iframeallow)   | `array`  | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-iframeallow.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/iframeAllow")   |
| [capabilities](#capabilities) | `array`  | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-capabilities.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/capabilities") |

### id

Unique, stable, technical identifier for the application, in reverse-DNS notation (lowercase, dot-separated, at least two labels).

`id`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-id.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/id")

#### id Type

`string`

#### id Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$
```

[try pattern](https://regexr.com/?expression=%5E%5Ba-z0-9%5D\(%5Ba-z0-9-%5D*%5Ba-z0-9%5D\)%3F\(%5C.%5Ba-z0-9%5D\(%5Ba-z0-9-%5D*%5Ba-z0-9%5D\)%3F\)%2B%24 "try regular expression with regexr.com")

#### id Examples

```json
"com.twake.drive-filepicker"
```

```json
"eu.openburo.webdav-filepicker"
```

```json
"io.cozy.files"
```

### name

Human-readable display name, e.g. shown in a chooser when several applications match. Can be used by screen readers. Accepts either a plain string or an object keyed by BCP 47 language tag for localization.

`name`

* is required

* Type: merged type ([Details](application-manifest-defs-application-properties-name.md))

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-name.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/name")

#### name Type

merged type ([Details](application-manifest-defs-application-properties-name.md))

one (and only one) of

* [Untitled string in Open Buro Applications Manifest](application-manifest-defs-application-properties-name-oneof-0.md "check type definition")

* [Untitled object in Open Buro Applications Manifest](application-manifest-defs-application-properties-name-oneof-1.md "check type definition")

### url

Application base URL. Informational entry point.

`url`

* is optional

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-url.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/url")

#### url Type

`string`

#### url Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

#### url Examples

```json
"https://drive.example.com/"
```

### version

Version of this manifest entry's format, used by the consumer to know how to parse the entry. This is not the application's own version number. A single manifest may mix applications of different format versions.

`version`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-version.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/version")

#### version Type

`string`

#### version Constraints

**minimum length**: the minimum number of characters for this string is: `1`

#### version Examples

```json
"1"
```

### icon

Optional URL to the application's icon, shown in the chooser when several applications match.

`icon`

* is optional

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-icon.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/icon")

#### icon Type

`string`

#### icon Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

#### icon Examples

```json
"https://drive.example.com/favicon.svg"
```

### iframeAllow

Permissions Policy features the application needs when opened in an iframe. The consumer uses this list to build the iframe `allow` attribute. When omitted, the application needs no extra features. Ignored for non-iframe targets. See <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow>

`iframeAllow`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-iframeallow.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/iframeAllow")

#### iframeAllow Type

`string[]`

#### iframeAllow Constraints

**minimum number of items**: the minimum number of items for this array is: `1`

**unique items**: all items in this array must be unique. Duplicates are not allowed.

#### iframeAllow Examples

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

### capabilities

The actions this application can perform.

`capabilities`

* is required

* Type: `object[]` ([Details](application-manifest-defs-capability.md))

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-capabilities.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/capabilities")

#### capabilities Type

`object[]` ([Details](application-manifest-defs-capability.md))

#### capabilities Constraints

**minimum number of items**: the minimum number of items for this array is: `1`

## Definitions group capability

Reference this group by using

```json
{"$ref":"https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability"}
```

| Property                | Type      | Required | Nullable       | Defined by                                                                                                                                                                                               |
| :---------------------- | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [action](#action)       | `string`  | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-action.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/action")       |
| [path](#path)           | `string`  | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-path.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/path")           |
| [mimeTypes](#mimetypes) | `array`   | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-mimetypes.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/mimeTypes") |
| [multiple](#multiple)   | `boolean` | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-capability-properties-multiple.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/multiple")   |

### action

PICK: the consumer asks the application for one file, many files, or a folder. SAVE: the consumer sends one file, many files, or a folder to the application.

`action`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-action.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/action")

#### action Type

`string`

#### action Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value    | Explanation |
| :------- | :---------- |
| `"PICK"` |             |
| `"SAVE"` |             |

### path

Endpoint that fulfils this capability. Either an absolute URL or a relative reference resolved against the application `url`. Should return a UI for the user to pick or save files, and then return the picked or saved file(s) to the consumer.

`path`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-path.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/path")

#### path Type

`string`

#### path Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**URI reference**: the string must be a URI reference, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

#### path Examples

```json
"https://drive.example.com/capabilities/PICK"
```

```json
"/embed/file-picker"
```

### mimeTypes

MIME filters the capability accepts (e.g. any file, or only images for a gallery). When omitted, the consumer falls back to \['*/*'].

`mimeTypes`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-mimetypes.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/mimeTypes")

#### mimeTypes Type

`string[]`

#### mimeTypes Constraints

**minimum number of items**: the minimum number of items for this array is: `1`

#### mimeTypes Default Value

The default value is:

```json
[
  "*/*"
]
```

### multiple

Whether the capability can pick or save multiple files.

`multiple`

* is optional

* Type: `boolean`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-capability-properties-multiple.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/multiple")

#### multiple Type

`boolean`

#### multiple Default Value

The default value is:

```json
false
```

## Definitions group permissionsPolicyFeature

Reference this group by using

```json
{"$ref":"https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/permissionsPolicyFeature"}
```

| Property | Type | Required | Nullable | Defined by |
| :------- | :--- | :------- | :------- | :--------- |

## Definitions group mimePattern

Reference this group by using

```json
{"$ref":"https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/mimePattern"}
```

| Property | Type | Required | Nullable | Defined by |
| :------- | :--- | :------- | :------- | :--------- |
