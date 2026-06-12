# Sequence of messages

See [sequence-messaging.schema.json](./sequence-messaging.schema.json) for the schema of the messages.

## intent:init

```jsonc
{
    "type": "intent:init",  // Message between provider to consumer
    "payload": {},
    "": {}
}
```

## intent:resize

This message is optional, not of mandatory use by the consumer. Not mandatory to send by the provider.
Do not wait for this message to arrive nor be sent.

```jsonc
{
    "type": "intent:resize",  // This message is from the provider to the consumer
    "payload": {
        "width": 800,
        "height": 600
    },
    "": {}
}
```

## intent:progress

Very likely we will need to have it for chunking large files.

## intent:done

> Handled by others

Worth adding a flag for the last message,
so multiple `intent:done` messages can be sent
(for streaming documents as they are downloaded)
