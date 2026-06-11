## postMessage Answer Formats

```json
{
  "type": "intent:done",
  "action": "PICK",
  "documents": [
    {
      "id": "abc-123",
      "name": "report.pdf",
      "mimeType": "application/pdf",
      "url": "https://drive.example.com/share/abc-123?token=xyz",
      "size": 245000
    }
  ]
}
```

Elements of the `documents` array depend on the `action`.

### Common Data

Mandatory
* id
* name
* mimeType
* size

Optional
* lastModified
* created
* version (from WebDAV)

### PICK

#### By Reference
* `url`: mandatory. For security reasons, the URL should not contain any permanent credentials.
  * Limited lifetime (Minutes)
  * One-time
  * Unique/random credentials (nonce)
* `preview`: optional. A small image useful for previews. A `Document` object with a small subset of fields:
  * url
  * content
  * mimeType
  * size
  
  request size

#### Embedded Content
* content: ArrayBuffer

#### Streaming Embedded Content

To avoid loading an entire 10GB file into the RAM of an 8GB laptop, the contents might need to be streamed even for the embedded content use case.

We postpone the protocol for this until later. This can be a separate mini-standard, since it will probably be useful in other contexts.

### SHARE

* url

### SAVE

The content is either embedded in the request message, or the service provider can return a URL to upload the content via PUT and/or POST.

* url
* method: "PUT" | "POST"; if missing then provider supports both

# Feedback for the group

* Define the overall document, so that groups can work on chapters/sections
