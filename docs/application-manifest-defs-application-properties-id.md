# Untitled string in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/id
```

Unique, stable, technical identifier for the application, in reverse-DNS notation (lowercase, dot-separated, at least two labels).

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## id Type

`string`

## id Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$
```

[try pattern](https://regexr.com/?expression=%5E%5Ba-z0-9%5D\(%5Ba-z0-9-%5D*%5Ba-z0-9%5D\)%3F\(%5C.%5Ba-z0-9%5D\(%5Ba-z0-9-%5D*%5Ba-z0-9%5D\)%3F\)%2B%24 "try regular expression with regexr.com")

## id Examples

```json
"com.twake.drive-filepicker"
```

```json
"eu.openburo.webdav-filepicker"
```

```json
"io.cozy.files"
```
