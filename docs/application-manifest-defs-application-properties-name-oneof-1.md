# Untitled object in Open Buro Applications Manifest Schema

```txt
https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/name/oneOf/1
```

Localized display names keyed by BCP 47 language tag.

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                                           |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :--------------------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [application-manifest.schema.json\*](../out/application-manifest.schema.json "open original schema") |

## 1 Type

`object` ([Details](application-manifest-defs-application-properties-name-oneof-1.md))

## 1 Constraints

**minimum number of properties**: the minimum number of properties for this object is: `1`

## 1 Examples

```json
{
  "en": "Twake Drive File Picker",
  "fr": "Sélecteur de fichiers Twake Drive"
}
```

# 1 Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                                                                                                                                                 |
| :-------------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Additional Properties | `string` | Optional | cannot be null | [Open Buro Applications Manifest](application-manifest-defs-application-properties-name-oneof-1-additionalproperties.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/name/oneOf/1/additionalProperties") |

## Additional Properties

Additional properties are allowed, as long as they follow this schema:



* is optional

* Type: `string`

* cannot be null

* defined in: [Open Buro Applications Manifest](application-manifest-defs-application-properties-name-oneof-1-additionalproperties.md "https://openburo.eu/schemas/v1/application-manifest.schema.json#/$defs/application/properties/name/oneOf/1/additionalProperties")

### additionalProperties Type

`string`

### additionalProperties Constraints

**minimum length**: the minimum number of characters for this string is: `2`
