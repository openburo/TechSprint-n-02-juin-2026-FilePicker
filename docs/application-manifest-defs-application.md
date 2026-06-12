# Untitled object in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application
```

An application that provides one or more capabilities.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## application Type

`object` ([Details](application-manifest-defs-application.md))

# application Properties

| Property                      | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                       |
| :---------------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [id](#id)                     | `string` | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-id.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/id")                     |
| [name](#name)                 | Merged   | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-name.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/name")                 |
| [url](#url)                   | `string` | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-url.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/url")                   |
| [version](#version)           | `string` | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-version.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/version")           |
| [icon](#icon)                 | `string` | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-icon.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/icon")                 |
| [iframeAllow](#iframeallow)   | `array`  | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-iframeallow.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/iframeAllow")   |
| [capabilities](#capabilities) | `array`  | Required | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-capabilities.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/capabilities") |

## id

Unique, stable, technical identifier for the application, in reverse-DNS notation (lowercase, dot-separated, at least two labels).

`id`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-id.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/id")

### id Type

`string`

### id Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$
```

[try pattern](https://regexr.com/?expression=%5E%5Ba-z0-9%5D\(%5Ba-z0-9-%5D*%5Ba-z0-9%5D\)%3F\(%5C.%5Ba-z0-9%5D\(%5Ba-z0-9-%5D*%5Ba-z0-9%5D\)%3F\)%2B%24 "try regular expression with regexr.com")

### id Examples

```json
"com.twake.drive-filepicker"
```

```json
"eu.openburo.webdav-filepicker"
```

```json
"io.cozy.files"
```

## name

Human-readable display name, e.g. shown in a chooser when several applications match. Can be used by screen readers. Accepts either a plain string or an object keyed by BCP 47 language tag for localization.

`name`

* is required

* Type: merged type ([Details](application-manifest-defs-application-properties-name.md))

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-name.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/name")

### name Type

merged type ([Details](application-manifest-defs-application-properties-name.md))

one (and only one) of

* [Untitled string in Open Buro Applications Manifest](application-manifest-defs-application-properties-name-oneof-0.md "check type definition")

* [Untitled object in Open Buro Applications Manifest](application-manifest-defs-application-properties-name-oneof-1.md "check type definition")

## url

Application base URL. Informational entry point.

`url`

* is optional

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-url.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/url")

### url Type

`string`

### url Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### url Examples

```json
"https://drive.example.com/"
```

## version

Version of this manifest entry's format, used by the consumer to know how to parse the entry. This is not the application's own version number. A single manifest may mix applications of different format versions.

`version`

* is required

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-version.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/version")

### version Type

`string`

### version Constraints

**minimum length**: the minimum number of characters for this string is: `1`

### version Examples

```json
"1"
```

## icon

Optional URL to the application's icon, shown in the chooser when several applications match.

`icon`

* is optional

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-icon.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/icon")

### icon Type

`string`

### icon Constraints

**URI**: the string must be a URI, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

### icon Examples

```json
"https://drive.example.com/favicon.svg"
```

## iframeAllow

Permissions Policy features the application needs when opened in an iframe. The consumer uses this list to build the iframe `allow` attribute. When omitted, the application needs no extra features. Ignored for non-iframe targets. See <https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow>

`iframeAllow`

* is optional

* Type: `string[]`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-iframeallow.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/iframeAllow")

### iframeAllow Type

`string[]`

### iframeAllow Constraints

**minimum number of items**: the minimum number of items for this array is: `1`

**unique items**: all items in this array must be unique. Duplicates are not allowed.

### iframeAllow Examples

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

## capabilities

The actions this application can perform.

`capabilities`

* is required

* Type: `object[]` ([Details](application-manifest-defs-capability.md))

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-capabilities.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/capabilities")

### capabilities Type

`object[]` ([Details](application-manifest-defs-capability.md))

### capabilities Constraints

**minimum number of items**: the minimum number of items for this array is: `1`
