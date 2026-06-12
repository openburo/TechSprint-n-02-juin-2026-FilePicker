package eu.openburo.manifest;

import com.fasterxml.jackson.annotation.*;
import java.util.Map;

/**
 * An Application manifest is the array of applications a consumer fetches in order to
 * discover and resolve capabilities.
 *
 * An application that provides one or more capabilities.
 */
public class Application {
    private Capability[] capabilities;
    private String icon;
    private String id;
    private Map<String, String> localizedName;
    private String name;
    private String url;
    private String version;

    /**
     * The actions this application can perform.
     */
    @JsonProperty("capabilities")
    public Capability[] getCapabilities() { return capabilities; }
    @JsonProperty("capabilities")
    public void setCapabilities(Capability[] value) { this.capabilities = value; }

    /**
     * Optional URL to the application's icon, shown in the chooser when several applications
     * match.
     */
    @JsonProperty("icon")
    public String getIcon() { return icon; }
    @JsonProperty("icon")
    public void setIcon(String value) { this.icon = value; }

    /**
     * Unique, stable, technical identifier for the application, in reverse-DNS notation
     * (lowercase, dot-separated, at least two labels).
     */
    @JsonProperty("id")
    public String getID() { return id; }
    @JsonProperty("id")
    public void setID(String value) { this.id = value; }

    /**
     * Localized display names keyed by BCP 47 language tag.
     */
    @JsonProperty("localizedName")
    public Map<String, String> getLocalizedName() { return localizedName; }
    @JsonProperty("localizedName")
    public void setLocalizedName(Map<String, String> value) { this.localizedName = value; }

    /**
     * Human-readable display name, e.g. shown in a chooser when several applications match. Can
     * be used by screen readers. Default when no localization is available
     */
    @JsonProperty("name")
    public String getName() { return name; }
    @JsonProperty("name")
    public void setName(String value) { this.name = value; }

    /**
     * Application base URL. Used for CSP and message origin verification.
     */
    @JsonProperty("url")
    public String getURL() { return url; }
    @JsonProperty("url")
    public void setURL(String value) { this.url = value; }

    /**
     * Version of this manifest entry's format, used by the consumer to know how to parse the
     * entry. This is not the application's own version number. A single manifest may mix
     * applications of different format versions.
     */
    @JsonProperty("version")
    public String getVersion() { return version; }
    @JsonProperty("version")
    public void setVersion(String value) { this.version = value; }
}
