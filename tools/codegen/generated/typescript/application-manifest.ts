// To parse this data:
//
//   import { Convert } from "./file";
//
//   const application = Convert.toApplication(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * An Application manifest is the array of applications a consumer fetches in order to
 * discover and resolve capabilities.
 *
 * An application that provides one or more capabilities.
 */
export interface Application {
    /**
     * The actions this application can perform.
     */
    capabilities: Capability[];
    /**
     * Optional URL to the application's icon, shown in the chooser when several applications
     * match.
     */
    icon?: string;
    /**
     * Unique, stable, technical identifier for the application, in reverse-DNS notation
     * (lowercase, dot-separated, at least two labels).
     */
    id: string;
    /**
     * Localized display names keyed by BCP 47 language tag.
     */
    localizedName?: { [key: string]: string };
    /**
     * Version of this manifest entry's format, used by the consumer to know how to parse the
     * entry. This is not the application's own version number. A single manifest may mix
     * applications of different format versions.
     */
    manifestVersion: string;
    /**
     * Human-readable display name, e.g. shown in a chooser when several applications match. Can
     * be used by screen readers. Default when no localization is available
     */
    name: string;
    /**
     * Application base URL. Used for CSP and message origin verification.
     */
    url?: string;
}

/**
 * A single action an application can perform.
 */
export interface Capability {
    /**
     * The action this capability performs. The consumer uses it to match capabilities to the
     * user's intent and may group capabilities by action in the chooser UI. Reserved actions:
     * `PICK` - the consumer asks the application for one file, many files, or a folder. `SAVE`
     * - the consumer sends one file, many files, or a folder to the application. `SHARE` - the
     * consumer asks the application for a shareable URL to a document. Consumers must ignore
     * capabilities whose action they do not recognize.
     */
    action: string;
    /**
     * Permissions Policy features the application needs when opened in an iframe. The consumer
     * uses this list to build the iframe `allow` attribute. When omitted, the application needs
     * no extra features. Ignored for non-iframe targets.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow
     */
    iframeAllow?: string[];
    /**
     * MIME filters the capability accepts (e.g. any file, or only images for a gallery). When
     * omitted, the consumer falls back to the catch-all pattern accepting any file type. Not
     * used outside of file-picking, saving or sharing capabilities.
     */
    mimeTypes?: string[];
    /**
     * Whether the capability can pick or save multiple files. Only used for file-picking or
     * saving capabilities.
     */
    multiple?: boolean;
    /**
     * Endpoint that fulfils this capability. Absolute URL. Should return a UI for the user to
     * pick or save files, and then return the picked or saved file(s) to the consumer.
     */
    path: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toApplication(json: string): Application[] {
        return cast(JSON.parse(json), a(r("Application")));
    }

    public static applicationToJson(value: Application[]): string {
        return JSON.stringify(uncast(value, a(r("Application"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Application": o([
        { json: "capabilities", js: "capabilities", typ: a(r("Capability")) },
        { json: "icon", js: "icon", typ: u(undefined, "") },
        { json: "id", js: "id", typ: "" },
        { json: "localizedName", js: "localizedName", typ: u(undefined, m("")) },
        { json: "manifestVersion", js: "manifestVersion", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], false),
    "Capability": o([
        { json: "action", js: "action", typ: "" },
        { json: "iframeAllow", js: "iframeAllow", typ: u(undefined, a("")) },
        { json: "mimeTypes", js: "mimeTypes", typ: u(undefined, a("")) },
        { json: "multiple", js: "multiple", typ: u(undefined, true) },
        { json: "path", js: "path", typ: "" },
    ], false),
};
