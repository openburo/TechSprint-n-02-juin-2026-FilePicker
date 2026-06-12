# Untitled string in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/path
```

Endpoint that fulfils this capability. Either an absolute URL or a relative reference resolved against the application `url`. Should return a UI for the user to pick or save files, and then return the picked or saved file(s) to the consumer.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## path Type

`string`

## path Constraints

**minimum length**: the minimum number of characters for this string is: `1`

**URI reference**: the string must be a URI reference, according to [RFC 3986](https://tools.ietf.org/html/rfc3986 "check the specification")

## path Examples

```json
"https://drive.example.com/capabilities/PICK"
```

```json
"/embed/file-picker"
```
