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

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

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
    "url": "webpack-runtime-3b575e2c68ea5844ae94.js"
  },
  {
    "url": "app.319712d3e7fffa8163a7.css"
  },
  {
    "url": "app-8e201cfcb1ccfe8c9e94.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-4460707f5c7186067dfa.js"
  },
  {
    "url": "index.html",
    "revision": "b1e30b6b7fd8bb4881e8db2ff7cc9c87"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "5f606ebad7c9584cbe85e4f46d10e778"
  },
  {
    "url": "1.8054dcf0e9faec300f6d.css"
  },
  {
    "url": "component---src-templates-blog-list-js-1179a4d6b40e9e3c69e7.js"
  },
  {
    "url": "1-323936c1fed5218400a2.js"
  },
  {
    "url": "0-c595419efddf5dddbbc8.js"
  },
  {
    "url": "static/d/306/path---index-6a9-q7W0TJ1YZ5E1pmelpL9a2OyYCU.json",
    "revision": "ffeaecb49e6c73731550b8431e213637"
  },
  {
    "url": "component---src-pages-404-js-2a8e65d9a2791d53ad88.js"
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
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});