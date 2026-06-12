from enum import Enum
from dataclasses import dataclass
from typing import List, Optional, Any, Dict, TypeVar, Callable, Type, cast


T = TypeVar("T")
EnumT = TypeVar("EnumT", bound=Enum)


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


def from_list(f: Callable[[Any], T], x: Any) -> List[T]:
    assert isinstance(x, list)
    return [f(y) for y in x]


def from_none(x: Any) -> Any:
    assert x is None
    return x


def from_union(fs, x):
    for f in fs:
        try:
            return f(x)
        except:
            pass
    assert False


def from_bool(x: Any) -> bool:
    assert isinstance(x, bool)
    return x


def to_enum(c: Type[EnumT], x: Any) -> EnumT:
    assert isinstance(x, c)
    return x.value


def from_dict(f: Callable[[Any], T], x: Any) -> Dict[str, T]:
    assert isinstance(x, dict)
    return { k: f(v) for (k, v) in x.items() }


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


class Action(Enum):
    """`PICK`: the consumer asks the application for one file, many files, or a folder. `SAVE`:
    the consumer sends one file, many files, or a folder to the application.
    """
    PICK = "PICK"
    SAVE = "SAVE"


@dataclass
class Capability:
    """A single action an application can perform."""

    action: Action
    """`PICK`: the consumer asks the application for one file, many files, or a folder. `SAVE`:
    the consumer sends one file, many files, or a folder to the application.
    """
    path: str
    """Endpoint that fulfils this capability. Absolute URL. Should return a UI for the user to
    pick or save files, and then return the picked or saved file(s) to the consumer.
    """
    iframe_allow: Optional[List[str]] = None
    """Permissions Policy features the application needs when opened in an iframe. The consumer
    uses this list to build the iframe `allow` attribute. When omitted, the application needs
    no extra features. Ignored for non-iframe targets.
    See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe#allow
    """
    mime_types: Optional[List[str]] = None
    """MIME filters the capability accepts (e.g. any file, or only images for a gallery). When
    omitted, the consumer falls back to the catch-all pattern accepting any file type.
    """
    multiple: Optional[bool] = None
    """Whether the capability can pick or save multiple files."""

    @staticmethod
    def from_dict(obj: Any) -> 'Capability':
        assert isinstance(obj, dict)
        action = Action(obj.get("action"))
        path = from_str(obj.get("path"))
        iframe_allow = from_union([lambda x: from_list(from_str, x), from_none], obj.get("iframeAllow"))
        mime_types = from_union([lambda x: from_list(from_str, x), from_none], obj.get("mimeTypes"))
        multiple = from_union([from_bool, from_none], obj.get("multiple"))
        return Capability(action, path, iframe_allow, mime_types, multiple)

    def to_dict(self) -> dict:
        result: dict = {}
        result["action"] = to_enum(Action, self.action)
        result["path"] = from_str(self.path)
        if self.iframe_allow is not None:
            result["iframeAllow"] = from_union([lambda x: from_list(from_str, x), from_none], self.iframe_allow)
        if self.mime_types is not None:
            result["mimeTypes"] = from_union([lambda x: from_list(from_str, x), from_none], self.mime_types)
        if self.multiple is not None:
            result["multiple"] = from_union([from_bool, from_none], self.multiple)
        return result


@dataclass
class ApplicationElement:
    """An Application manifest is the array of applications a consumer fetches in order to
    discover and resolve capabilities.
    
    An application that provides one or more capabilities.
    """
    capabilities: List[Capability]
    """The actions this application can perform."""

    id: str
    """Unique, stable, technical identifier for the application, in reverse-DNS notation
    (lowercase, dot-separated, at least two labels).
    """
    manifest_version: str
    """Version of this manifest entry's format, used by the consumer to know how to parse the
    entry. This is not the application's own version number. A single manifest may mix
    applications of different format versions.
    """
    name: str
    """Human-readable display name, e.g. shown in a chooser when several applications match. Can
    be used by screen readers. Default when no localization is available
    """
    icon: Optional[str] = None
    """Optional URL to the application's icon, shown in the chooser when several applications
    match.
    """
    localized_name: Optional[Dict[str, str]] = None
    """Localized display names keyed by BCP 47 language tag."""

    url: Optional[str] = None
    """Application base URL. Used for CSP and message origin verification."""

    @staticmethod
    def from_dict(obj: Any) -> 'ApplicationElement':
        assert isinstance(obj, dict)
        capabilities = from_list(Capability.from_dict, obj.get("capabilities"))
        id = from_str(obj.get("id"))
        manifest_version = from_str(obj.get("manifestVersion"))
        name = from_str(obj.get("name"))
        icon = from_union([from_str, from_none], obj.get("icon"))
        localized_name = from_union([lambda x: from_dict(from_str, x), from_none], obj.get("localizedName"))
        url = from_union([from_str, from_none], obj.get("url"))
        return ApplicationElement(capabilities, id, manifest_version, name, icon, localized_name, url)

    def to_dict(self) -> dict:
        result: dict = {}
        result["capabilities"] = from_list(lambda x: to_class(Capability, x), self.capabilities)
        result["id"] = from_str(self.id)
        result["manifestVersion"] = from_str(self.manifest_version)
        result["name"] = from_str(self.name)
        if self.icon is not None:
            result["icon"] = from_union([from_str, from_none], self.icon)
        if self.localized_name is not None:
            result["localizedName"] = from_union([lambda x: from_dict(from_str, x), from_none], self.localized_name)
        if self.url is not None:
            result["url"] = from_union([from_str, from_none], self.url)
        return result


def application_from_dict(s: Any) -> List[ApplicationElement]:
    return from_list(ApplicationElement.from_dict, s)


def application_to_dict(x: List[ApplicationElement]) -> Any:
    return from_list(lambda x: to_class(ApplicationElement, x), x)
