# Untitled string in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/mimePattern
```

A full MIME type, a subtype wildcard (image/\*), or the catch-all */*.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## mimePattern Type

`string`

## mimePattern Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^(\*/\*|[A-Za-z0-9][A-Za-z0-9!#$&^_.+-]*/(\*|[A-Za-z0-9][A-Za-z0-9!#$&^_.+-]*))$
```

[try pattern](https://regexr.com/?expression=%5E\(%5C*%2F%5C*%7C%5BA-Za-z0-9%5D%5BA-Za-z0-9!%23%24%26%5E_.%2B-%5D*%2F\(%5C*%7C%5BA-Za-z0-9%5D%5BA-Za-z0-9!%23%24%26%5E_.%2B-%5D*\)\)%24 "try regular expression with regexr.com")

## mimePattern Examples

```json
"*/*"
```

```json
"image/*"
```

```json
"application/pdf"
```
