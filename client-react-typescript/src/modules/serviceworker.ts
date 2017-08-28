/**
 * Service worker manager
 * @module serviceworker
 */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

const envPublicUrl = process.env.PUBLIC_URL || '';

const registerValidSW = (swUrl: string) => {
  navigator.serviceWorker.register(swUrl);
};

const checkValidServiceWorker = (swUrl: string) => {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl).then((response) => {
    // Ensure service worker exists, and that we really are getting a JS file.
    if (
      response.status === 404 ||
      (response.headers.get('content-type') as any).indexOf('javascript') === -1
    ) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl);
    }
  });
};

/** Register service worker */
export const register = () => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(envPublicUrl, window.location as any);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${envPublicUrl}/service-worker.js`;

      if (!isLocalhost) {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      } else {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);
      }
    });
  }
};

/** Unregister service worker */
export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
};
