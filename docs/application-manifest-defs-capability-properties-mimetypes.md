# Untitled array in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/mimeTypes
```

MIME filters the capability accepts (e.g. any file, or only images for a gallery). When omitted, the consumer falls back to \['*/*'].

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## mimeTypes Type

`string[]`

## mimeTypes Constraints

**minimum number of items**: the minimum number of items for this array is: `1`

## mimeTypes Default Value

The default value is:

```json
[
  "*/*"
]
```
