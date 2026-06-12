package eu.openburo.manifest;

import com.fasterxml.jackson.annotation.*;

/**
 * A single action an application can perform.
 */
public class Capability {
    private Action action;
    private String[] iframeAllow;
    private String[] mimeTypes;
    private Boolean multiple;
    private String path;

    /**
     * `PICK`: the consumer asks the application for one file, many files, or a folder. `SAVE`:
     * the consumer sends one file, many files, or a folder to the application.
     */
    @JsonProperty("action")
    public Action getAction() { return action; }
    @JsonProperty("action")
    public void setAction(Action value) { this.action = value; }

    /**
     * Permissions Policy features the application needs when opened in an iframe. The consumer
     * uses this list to build the iframe `allow` attribute. When omitted, the application needs
     * no extra features. Ignored for non-iframe targets.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow
     */
    @JsonProperty("iframeAllow")
    public String[] getIframeAllow() { return iframeAllow; }
    @JsonProperty("iframeAllow")
    public void setIframeAllow(String[] value) { this.iframeAllow = value; }

    /**
     * MIME filters the capability accepts (e.g. any file, or only images for a gallery). When
     * omitted, the consumer falls back to the catch-all pattern accepting any file type.
     */
    @JsonProperty("mimeTypes")
    public String[] getMIMETypes() { return mimeTypes; }
    @JsonProperty("mimeTypes")
    public void setMIMETypes(String[] value) { this.mimeTypes = value; }

    /**
     * Whether the capability can pick or save multiple files.
     */
    @JsonProperty("multiple")
    public Boolean getMultiple() { return multiple; }
    @JsonProperty("multiple")
    public void setMultiple(Boolean value) { this.multiple = value; }

    /**
     * Endpoint that fulfils this capability. Absolute URL. Should return a UI for the user to
     * pick or save files, and then return the picked or saved file(s) to the consumer.
     */
    @JsonProperty("path")
    public String getPath() { return path; }
    @JsonProperty("path")
    public void setPath(String value) { this.path = value; }
}
