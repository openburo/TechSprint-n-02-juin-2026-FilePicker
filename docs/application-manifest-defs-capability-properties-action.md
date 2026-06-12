# Untitled string in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/capability/properties/action
```

PICK: the consumer asks the application for one file, many files, or a folder. SAVE: the consumer sends one file, many files, or a folder to the application.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## action Type

`string`

## action Constraints

**enum**: the value of this property must be equal to one of the following values:

| Value    | Explanation |
| :------- | :---------- |
| `"PICK"` |             |
| `"SAVE"` |             |
