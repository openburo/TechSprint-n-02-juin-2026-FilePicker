package eu.openburo.manifest;

import java.io.IOException;
import java.io.IOException;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.annotation.*;
import java.util.Map;

/**
 * Human-readable display name, e.g. shown in a chooser when several applications match. Can
 * be used by screen readers. Accepts either a plain string or an object keyed by BCP 47
 * language tag for localization.
 */
@JsonDeserialize(using = Name.Deserializer.class)
@JsonSerialize(using = Name.Serializer.class)
public class Name {
    public Map<String, String> stringMapValue;
    public String stringValue;

    static class Deserializer extends JsonDeserializer<Name> {
        @Override
        public Name deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
            Name value = new Name();
            switch (jsonParser.currentToken()) {
                case VALUE_STRING:
                    String string = jsonParser.readValueAs(String.class);
                    value.stringValue = string;
                    break;
                case START_OBJECT:
                    value.stringMapValue = jsonParser.readValueAs(Map.class);
                    break;
                default: throw new IOException("Cannot deserialize Name");
            }
            return value;
        }
    }

    static class Serializer extends JsonSerializer<Name> {
        @Override
        public void serialize(Name obj, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            if (obj.stringMapValue != null) {
                jsonGenerator.writeObject(obj.stringMapValue);
                return;
            }
            if (obj.stringValue != null) {
                jsonGenerator.writeObject(obj.stringValue);
                return;
            }
            throw new IOException("Name must not be null");
        }
    }
}
