# Untitled string in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/permissionsPolicyFeature
```

A Permissions Policy directive name, as used in the iframe `allow` attribute (lowercase, hyphen-separated).

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## permissionsPolicyFeature Type

`string`

## permissionsPolicyFeature Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^[a-z]+(-[a-z]+)*$
```

[try pattern](https://regexr.com/?expression=%5E%5Ba-z%5D%2B\(-%5Ba-z%5D%2B\)*%24 "try regular expression with regexr.com")

## permissionsPolicyFeature Examples

```json
"clipboard-read"
```

```json
"clipboard-write"
```

```json
"geolocation"
```

```json
"camera"
```

```json
"microphone"
```

```json
"fullscreen"
```
