# Open Buro Applications Manifest

*An Application manifest is the array of applications a consumer fetches in order to discover and resolve capabilities.*

## Items

- <a id="items"></a>**Items**: Refer to *[#/$defs/application](#%24defs/application)*.
## Definitions

- <a id="%24defs/application"></a>**`application`** *(object)*: An application that provides one or more capabilities. Cannot contain additional properties.
  - <a id="%24defs/application/properties/id"></a>**`id`** *(string, required)*: Unique, stable, technical identifier for the application, in reverse-DNS notation (lowercase, dot-separated, at least two labels). Must match pattern: `^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$` ([Test](https://regexr.com/?expression=%5E%5Ba-z0-9%5D%28%5Ba-z0-9-%5D%2A%5Ba-z0-9%5D%29%3F%28%5C.%5Ba-z0-9%5D%28%5Ba-z0-9-%5D%2A%5Ba-z0-9%5D%29%3F%29%2B%24)).

    Examples:
    ```json
    "com.twake.drive-filepicker"
    ```

    ```json
    "eu.openburo.webdav-filepicker"
    ```

    ```json
    "io.cozy.files"
    ```

  - <a id="%24defs/application/properties/name"></a>**`name`** *(string, required)*: Human-readable display name, e.g. shown in a chooser when several applications match. Can be used by screen readers. Default when no localization is available. Length must be at least 2.

    Examples:
    ```json
    "Twake Drive File Picker"
    ```

  - <a id="%24defs/application/properties/localizedName"></a>**`localizedName`** *(object)*: Localized display names keyed by BCP 47 language tag. Number of properties must be at least 1. Can contain additional properties.
    - <a id="%24defs/application/properties/localizedName/additionalProperties"></a>**Additional properties** *(string)*: Length must be at least 2.

    Examples:
    ```json
    {
        "en": "Twake Drive File Picker",
        "fr": "S\u00e9lecteur de fichiers Twake Drive"
    }
    ```

  - <a id="%24defs/application/properties/url"></a>**`url`** *(string, format: uri)*: Application base URL. Used for CSP and message origin verification.

    Examples:
    ```json
    "https://drive.example.com/"
    ```

  - <a id="%24defs/application/properties/manifestVersion"></a>**`manifestVersion`** *(string)*: Version of this manifest entry's format, used by the consumer to know how to parse the entry. This is not the application's own version number. A single manifest may mix applications of different format versions. Length must be at least 1.

    Examples:
    ```json
    "1"
    ```

  - <a id="%24defs/application/properties/icon"></a>**`icon`** *(string, format: uri)*: Optional URL to the application's icon, shown in the chooser when several applications match.

    Examples:
    ```json
    "https://drive.example.com/favicon.svg"
    ```

  - <a id="%24defs/application/properties/capabilities"></a>**`capabilities`** *(array, required)*: The actions this application can perform. Length must be at least 0.
    - <a id="%24defs/application/properties/capabilities/items"></a>**Items**: Refer to *[#/$defs/capability](#%24defs/capability)*.
- <a id="%24defs/capability"></a>**`capability`** *(object)*: A single action an application can perform. Cannot contain additional properties.
  - <a id="%24defs/capability/properties/action"></a>**`action`** *(string, required)*: The action this capability performs. The consumer uses it to match capabilities to the user's intent and may group capabilities by action in the chooser UI. Reserved actions: `PICK` - the consumer asks the application for one file, many files, or a folder. `SAVE` - the consumer sends one file, many files, or a folder to the application. `SHARE` - the consumer asks the application for a shareable URL to a document. Consumers must ignore capabilities whose action they do not recognize.
    - **Any of**
      - <a id="%24defs/capability/properties/action/anyOf/0"></a>: Actions reserved by this specification. Must be one of: "PICK", "SAVE", or "SHARE".
      - <a id="%24defs/capability/properties/action/anyOf/1"></a>: Custom actions should carry a vendor prefix (e.g. `ACME_PUBLISH`); un-prefixed names are reserved for future versions of this specification. Must match pattern: `^[A-Z][A-Z0-9_]*$` ([Test](https://regexr.com/?expression=%5E%5BA-Z%5D%5BA-Z0-9_%5D%2A%24)).

    Examples:
    ```json
    "PICK"
    ```

    ```json
    "SAVE"
    ```

    ```json
    "SHARE"
    ```

    ```json
    "ACME_PUBLISH"
    ```

  - <a id="%24defs/capability/properties/path"></a>**`path`** *(string, format: uri, required)*: Endpoint that fulfils this capability. Absolute URL. Should return a UI for the user to pick or save files, and then return the picked or saved file(s) to the consumer.

    Examples:
    ```json
    "https://drive.example.com/capabilities/filePicker.jsp"
    ```

  - <a id="%24defs/capability/properties/iframeAllow"></a>**`iframeAllow`** *(array)*: Permissions Policy features the application needs when opened in an iframe. The consumer uses this list to build the iframe `allow` attribute. When omitted, the application needs no extra features. Ignored for non-iframe targets.
See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow. Length must be at least 1. Items must be unique.
    - <a id="%24defs/capability/properties/iframeAllow/items"></a>**Items**: Refer to *[#/$defs/permissionsPolicyFeature](#%24defs/permissionsPolicyFeature)*.

    Examples:
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

  - <a id="%24defs/capability/properties/mimeTypes"></a>**`mimeTypes`** *(array)*: MIME filters the capability accepts (e.g. any file, or only images for a gallery). When omitted, the consumer falls back to the catch-all pattern accepting any file type. Not used outside of file-picking, saving or sharing capabilities. Length must be at least 1. Default: `["*/*"]`.
    - <a id="%24defs/capability/properties/mimeTypes/items"></a>**Items**: Refer to *[#/$defs/mimePattern](#%24defs/mimePattern)*.
  - <a id="%24defs/capability/properties/multiple"></a>**`multiple`** *(boolean)*: Whether the capability can pick or save multiple files. Only used for file-picking or saving capabilities. Default: `false`.
- <a id="%24defs/permissionsPolicyFeature"></a>**`permissionsPolicyFeature`** *(string)*: A Permissions Policy directive name, as used in the iframe `allow` attribute (lowercase, hyphen-separated).
See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy#directives. Must match pattern: `^[a-z]+(-[a-z]+)*$` ([Test](https://regexr.com/?expression=%5E%5Ba-z%5D%2B%28-%5Ba-z%5D%2B%29%2A%24)).

  Examples:
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

- <a id="%24defs/mimePattern"></a>**`mimePattern`** *(string)*: A full MIME type, a subtype wildcard (image/*), or the catch-all wildcard matching any type. Must match pattern: `^(\*/\*|[A-Za-z0-9][A-Za-z0-9!#$&^_.+-]*/(\*|[A-Za-z0-9][A-Za-z0-9!#$&^_.+-]*))$` ([Test](https://regexr.com/?expression=%5E%28%5C%2A/%5C%2A%7C%5BA-Za-z0-9%5D%5BA-Za-z0-9%21%23%24%26%5E_.%2B-%5D%2A/%28%5C%2A%7C%5BA-Za-z0-9%5D%5BA-Za-z0-9%21%23%24%26%5E_.%2B-%5D%2A%29%29%24)).

  Examples:
  ```json
  "*/*"
  ```

  ```json
  "image/*"
  ```

  ```json
  "application/pdf"
  ```

