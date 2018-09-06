/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-5cc5f95798780d5d0f9c.js"
  },
  {
    "url": "app-d2ad79cd18aee1fd1006.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-2f31d823bbe33170f70a.js"
  },
  {
    "url": "index.html",
    "revision": "cfd6ba9fcb5c894737ae607971c0502b"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "a15e934f59520d583044b068dce01785"
  },
  {
    "url": "1.fa9abe4e5ce223327f85.css",
    "revision": "e24b42a993bcb8770f904dc77ff160fa"
  },
  {
    "url": "0.cdfaa7a5fca2ee45ebbd.css",
    "revision": "3c2f9db5cfac3b788e0b9458f3fa7686"
  },
  {
    "url": "component---src-templates-template-blog-list-js-9e40d0628dbf9003e5ea.js"
  },
  {
    "url": "1-107d593a7b40feabcd81.js"
  },
  {
    "url": "0-a403ce26cc7c01a78005.js"
  },
  {
    "url": "static/d/893/path---index-6a9-UOrNNiog9meysbeJdUqnhb9mUhE.json",
    "revision": "a83de9963b58f0ec3ee62ddde897423e"
  },
  {
    "url": "component---src-pages-404-js-b80c782eb407b918affc.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.json",
    "revision": "b773e901ef06ac93343dc05e67540787"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "750d153095b0a0f67ee74de8de2f11f9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
