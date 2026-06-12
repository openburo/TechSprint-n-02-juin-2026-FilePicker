# Codegen

Generates typed models from [`../src/schemas/application-manifest.schema.json`](../src/schemas/application-manifest.schema.json) using [quicktype](https://quicktype.io/).

## Usage

```sh
pnpm install
pnpm run generate   # writes all languages under generated/
pnpm run check      # type-checks the generated TypeScript
```

Requires `jq` (used to derive the PHP variant of the schema, see below). Individual languages: `pnpm run generate:ts`, `generate:python`, `generate:php`, `generate:java`.

| Language   | Output | Notes |
|------------|--------|-------|
| TypeScript | `generated/typescript/application-manifest.ts` | `Convert.toApplication(json)` parses and validates structure |
| Python     | `generated/python/application_manifest.py` | `application_from_dict(data)` parses and validates structure (dataclasses, Python ≥ 3.7) |
| PHP        | `generated/php/Application.php` | Classes with `from()`/`to()` helpers |
| Java       | `generated/java/eu/openburo/manifest/*.java` | Jackson-based; consumers need `jackson-databind` on the classpath. Parse with `Converter.fromJsonString(json)` |

All targets expose `Application` and `Capability` models plus `Action`/`Target` enums, and the parsers reject structural mismatches (unknown properties, wrong enum values, missing required fields).

## Caveats

- quicktype validates structure, not string constraints: the `pattern` regexes (application `id`, BCP 47 language tags, MIME patterns) and `default` values from the schema are **not** enforced by the generated code. Use a JSON Schema validator (e.g. AJV) if full validation is needed.
- The generated files are build artifacts: regenerate them after every schema change instead of editing them by hand. Each `pnpm run generate` overwrites the output.
- Schema descriptions are copied verbatim into JSDoc block comments, so they must not contain `*/` (e.g. spell out the catch-all MIME pattern instead of writing it literally).
- quicktype's PHP renderer does not support union types, so `generate:php` feeds quicktype a jq-derived schema where the `name` union (plain string or localized map) is loosened to an untyped value. PHP consumers must handle both shapes of `name` themselves. TypeScript, Python and Java all model the union properly (Java via the generated `Name` wrapper class).

## Adding languages

Add a `generate:<lang>` script in `package.json` following the `generate:ts` example (`quicktype --lang csharp|go|rust ...`) and chain it in the `generate` script.
