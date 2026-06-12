# postMessage Answer Formats

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

TODO: resize message
TODO: check Google File Picker API for use cases
TODO: error for unsupported transfer mode
TODO: consumer can request preview size

## Message Definitions

This section defines the contents of all `postMessage` messages.

TODO: define top-level structure:
```json
{
  "sourceId": "123", // file picker ID from the init parameters, to support multiple simultaneously open file pickers
  "type": "intent:done", // do we need the `intent:` prefix?
  "documents": [ … ]
}
```

The elements of the `documents` array depend on various circumstances, even for the same initial action.

### Common Data in Responses

Response messages which contain the results of the file picker have several common fields, which describe the picked data. They are described here once.

Mandatory fields
* `id`: string, unique identifier of this document. Reserved for future uses.
* `name`: string, name of the file
* `mimeType`: string, the MIME type of the file. If unknown, should be specified as `application/octet-stream`.
* `size`: number, file size in bytes

Optional fields might be missing.
* `lastModified`: Date, last modified timestamp
* `created`: Date, the timestamp when the file was created
* TODO: version (from WebDAV), to preserve versioning information if relevant and possible.
* Alternative: etag: any hash likely to identify the file content.
* `preview`: A small image useful for previews. A nested `document`-like object with a small subset of fields:
  * `content`: ArrayBuffer, the image content
  * `mimeType`: string, the MIME type of the image
  * `size`: number, file size in bytes

### Transfer Mode

The content can be transferred from the provider to the consumer in multiple ways. Since consumers and providers may support only a subset of the defined options, there needs to be a way to negotiate the transfer mode. The provider specifies a list of supported modes in the field `modes` of each `capability`. The consumer selects one or more of these modes and specifies them as a comma-separated list in the URL query parameter `modes`. The response message from the provider contains at least one, but possibly multiple representations corresponding to the requested modes. If the provider does not support any of the requested modes (i.e. when the client requested modes which are not in the manifest) then the provider returns an error immediately.

### PICK

#### By Reference

The provider returns a temporary HTTPS URL which the consumer should download immediately. (Note: even for prototyping, a consumer on a secure page cannot access HTTP URLs.) The lifetime of the URL should be configurable. For big files, there might even be multiple lifetimes: a short time to start the download, and a longer time to finish it or to wait while no data is transferred.

The URL should not be guessable. But limit the effect of a leaked URL, it should not contain any long-lived credentials. Instead, the URL should contain a random nonce, an HMAC-based signature or some other way to ensure that the URL cannot be guessed.

* `url`: string, mandatory. A temporary unguessable HTTPS URL from which the consumer should download the document immediately.

#### Embedded Content

Instead of using a separate request to transfer file data, it might be simpler to include the file content in the message directly. This avoids potential errors which can occur during a later download. On the other hand, this only sensibly works for small files because the file needs to be downloaded to the browser from the provider, is kept completely in RAM, and then needs to be uploaded again (this time to the consumer back-end). Some providers might need to transfer the data to the browser anyway, e.g. to decrypt an end-to-end encrypted file. In this case, the overhead is technically necessary.

* `content`: ArrayBuffer, the file contents. If possible, the same ArrayBuffer object should be passed as an array element of the 3rd parameter `transfer` to the `postMessage` function, to fully transfer the data between provider and consumer instead of duplicating it in RAM.

TODO: MessageChannel

#### Streaming Embedded Content

To avoid loading an entire 10GB file into the RAM of an 8GB laptop, the contents might need to be streamed even for the embedded content use case.

We postpone the protocol for this until later. This can be a separate mini-standard, since it will probably be useful in other contexts.

#### Share Link

* `share`: string, the URL where other users can access the document. This URL does not necessarily return the document directly. Instead it might be the entry URL to the provider application, where users are first required to log in.

### SAVE

The content is either embedded in the request message, or the service provider can return a URL to upload the content via PUT and/or POST.

* `url`: string, The base URL where to upload documents with an HTTP PUT request. The actual URL of the request is built by appending the file name at the end of the URL, as the last path element separated by a slash. The security of this URL has the same considerations as the URL for the `PICK` action by reference.

# Feedback for the group

* Do we want to specify what needs to be "Configurable" in addition to "Mandatory" and "Optional"?
