export function getSubdomain() {
    return import.meta.env.VITE_ENV === "local"
      ? window.location.host.split(".")[0].toLowerCase()
      : window.location.host.split("-")[0].toLowerCase();
  }