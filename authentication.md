## Authentication

Authenticating the user of the consumer application to the provider application is not strictly part of the protocol. The only assumption is that the service provider can rely on cookies or similar browser storage to re-use an existing session to avoid repeated logins every time the file picker opens.

Typically, both the consumer and service provider are using the same SSO system, which all but guarantees that a valid service provider session can be obtained immediately and translarently for the user. In case this is not possible, the service provider will need to open a login dialog in a new window, browser tab or popup. Showing a login dialog directly in the IFrame is not likely to work because of size constraints, and because modern browsers prevent IFrames from setting cookies.

### OIDC

If the service provider is using OIDC, then obtaining a session requires redirecting the IFrame to the OpenID Provider. To prevent the OpenID Provider from showing a login screen before returning, the parameter `prompt=none` needs to be used.

## Feedback for the group

* camelCase vs snake_case for identifiers.
* add optional username to init parameters, to be used with OIDC `login_hint` parameter?
