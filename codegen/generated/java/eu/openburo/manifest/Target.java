package eu.openburo.manifest;

import java.io.IOException;
import com.fasterxml.jackson.annotation.*;

public enum Target {
    IFRAME, POPUP;

    @JsonValue
    public String toValue() {
        switch (this) {
            case IFRAME: return "iframe";
            case POPUP: return "popup";
        }
        return null;
    }

    @JsonCreator
    public static Target forValue(String value) throws IOException {
        if (value.equals("iframe")) return IFRAME;
        if (value.equals("popup")) return POPUP;
        throw new IOException("Cannot deserialize Target");
    }
}
