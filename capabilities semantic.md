# Capabilities semantic

## Example from hackathon

https://github.com/openburo/TechSprint-n-01-april-20206-FilePicker/blob/master/application_manifest_registry.json

```json
[
  { 
    "id":"jalios-demo",
    "name":"Jalios Demo",
    "url":"https://openburo-jalios.eu.ngrok.io/en/",
    "version":"0.1",
    "capabilities": [
      {
        "action":"PICK",
        "properties":{
            "mimeTypes":["*/*"],
            "multiple": true
        },
        "path":"https://openburo-jalios.eu.ngrok.io/en/plugins/OpenBuroPlugin/jsp/openBuroChooser.jsp"
      }
    ]
  },
  {
    "id": "webdav-filepicker",
    "name": "WebDAV File Picker",
    "url": "http://10.4.0.32:5000",
    "version": "1",
    "capabilities": [
      {
        "action": "PICK",
        "path": "http://10.4.0.32:5000/browse/",
        "properties": {
          "mimeTypes": [
            "*/*"
          ]
        }
      },
      {
        "action": "SAVE",
        "path": "http://10.4.0.32:5000/save/",
        "properties": {
          "mimeTypes": [
            "*/*"
          ]
        }
      }
    ],
  },
  {
    "id": "fichiers-file-picker",
    "name": "Fichiers File Picker",
    "url": "https://837a-46-255-204-128.ngrok-free.app",
    "version": "1",
    "display": "modal",
    "capabilities": [
      {
        "action": "PICK",
        "path": "http://837a-46-255-204-128.ngrok-free.app/embed/file-picker",
        "properties": {
          "mimeTypes": [
            "*/*"
          ]
        }
      }
    ]
  },
  {
    "id": "twake-drive-filepicker",
    "name": "Twake Drive File Picker",
    "url": "https://openburo1-drive.stg.lin-saas.com/openburo.json",
    "version": "0.0.1",
    "capabilities": [
      {
        "action": "PICK",
        "properties": {
          "mimeTypes": ["*/*"]
        },
        "path":"https://openburo1-drive.stg.lin-saas.com/capabilities/PICK"
      }
    ]
  }
]
```

## Formalisation

```ts
type Manifest = Provider[];
type Provider = {
    /** unique technical id */
    id: string;
    /** natural language pretty string for humans */
    name: string;
    /** Provider base url - probably only used to give an access point for admin, to know more about a given provider. */
    url?: string;
    /**
     * Expected format x.y.z?
     * Version of the provider format.
     * Use by the consumer to know how to parse a given entry.
     * A manifest can have providers with different versions.
     * TODO: do we need an implementation or a protocol version? Are they always aligned with the format?
     */
    version: string;
    capabilities: Capability[]
}

/**
 * PICK: ask the provider for one file, many files, or a folder.
 * SAVE: send to the provider one file, many files, or a folder.
 * TODO: VIEW, CREATE, SHARE, EDIT
 */
type Capability = {
    action: "PICK" | "SAVE";
    /**
     * Full url the provider service.
     */
    url: string;
    /**
     * A set of mimetypes that are allowed to be asked (e.g., all kind of files, only images for an image gallery).
     * When undefined, fallbacks to `['*\/*']`
     */
    mimeTypes?: string[];
    /**
     * Enable to pick or save multiple files. Default value false.
     * TODO: do we want to handle folders?
     */
    multiple?: boolean;
}
```

## To discuss

- moving mimetypes/multiple out of "properties"?
- [x] fallback to url as the base of the path or mandatory full url?

## For later

* Consumer negocation (CORS, iframe...) - providers can have a need for a list of known consumers.
* Security more generally
* Folders?
* More actions: VIEW, CREATE, SHARE, EDIT...