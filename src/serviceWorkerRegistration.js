// Lightweight service worker registration with secure-context checks
// Registers only when running on HTTPS or localhost, and skips WebView/Electron.

function isSecureContextAllowed() {
  try {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    // Basic secure context: HTTPS or localhost
    if (
      protocol === "https:" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    )
      return true;

    // Avoid registering inside Electron / WebView / native wrappers
    const ua = navigator.userAgent || "";
    if (/Electron|wv|WebView/i.test(ua)) return false;

    return false;
  } catch (e) {
    return false;
  }
}

export function register(swUrl = "/service-worker.js") {
  if ("serviceWorker" in navigator && isSecureContextAllowed()) {
    // Wait for the page to load before registering.
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // Successful registration
          // You can add update handling here if desired
          // console.debug('ServiceWorker registration successful:', registration);
        })
        .catch((error) => {
          // Registration failed
          // console.warn('ServiceWorker registration failed:', error);
        });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
  }
}
