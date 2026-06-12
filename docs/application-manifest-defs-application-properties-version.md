# Untitled string in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/version
```

Version of this manifest entry's format, used by the consumer to know how to parse the entry. This is not the application's own version number. A single manifest may mix applications of different format versions.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## version Type

`string`

## version Constraints

**minimum length**: the minimum number of characters for this string is: `1`

## version Examples

```json
"1"
```
