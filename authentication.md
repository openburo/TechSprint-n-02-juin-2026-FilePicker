## Authentication

Authenticating the user of the consumer application to the provider application can happen in two ways: implicitly or explicitly.

### Implicit

From the point of view of the consumer application, the simplest case of authentication is when it is implicitly handled by the service provider. Typically, the service provider first redirects to its ID provider, where a new session is created from an existing SSO session.

When the SSO session has recently expired, the ID provider might show a login screen, before creating a new session and returning it to the service provider. In case this is not desired, e.g. because the service provider is displayed in a small IFrame, the consumer can specify the parameter `preventLogin` to avoid showing a login screen.

When the service provider is using OIDC, `preventLogin` directly translates to the `prompt=none` parameter to the authentication request.

In case the ID provider cannot be configured to be displayed in an IFrame, the manifest can to be configured to only be open in new windows.

#### New Error Code

If `preventLogin` is set, but if the session could not be obtained automatically, e.g. because login or other form of interaction with the ID Provider is required, the error code `authentication_required` is returned.

### Explicit

To avoid problems and user-visible delays associated with redirects, the provider's session can be created by the consumer, and an associated token be passed in the `intent:init` message. This assumes the two applications have a common ID provider.

#### OIDC

In the case of OIDC, the token sent in the `intent:init` message is the access token. Ideally, this token is obtained via token exchange to restrict the scope and audience to the service provider.

TODO: Add a `token` parameter to the `intent:init` message.

The token needs to be periodically refreshed by the consumer. This is done in a new message `intent:update_token`:

```json
{
  "type": "intent:update_token",
  "token": "eyJleGFtcGxlIjoiIn0K"
}
```

## Feedback for the group

* camelCase vs snake_case for identifiers.
