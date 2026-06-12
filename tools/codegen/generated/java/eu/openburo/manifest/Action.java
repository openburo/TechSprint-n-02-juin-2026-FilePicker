package eu.openburo.manifest;

import java.io.IOException;
import com.fasterxml.jackson.annotation.*;

/**
 * `PICK`: the consumer asks the application for one file, many files, or a folder. `SAVE`:
 * the consumer sends one file, many files, or a folder to the application.
 */
public enum Action {
    PICK, SAVE;

    @JsonValue
    public String toValue() {
        switch (this) {
            case PICK: return "PICK";
            case SAVE: return "SAVE";
        }
        return null;
    }

    @JsonCreator
    public static Action forValue(String value) throws IOException {
        if (value.equals("PICK")) return PICK;
        if (value.equals("SAVE")) return SAVE;
        throw new IOException("Cannot deserialize Action");
    }
}
