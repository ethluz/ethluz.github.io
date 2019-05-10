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
    "url": "webpack-runtime-42935682824a5297dd28.js"
  },
  {
    "url": "app.319712d3e7fffa8163a7.css"
  },
  {
    "url": "app-27b2aee15fb4d8b3b340.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-4460707f5c7186067dfa.js"
  },
  {
    "url": "index.html",
    "revision": "16bddb700ca86274c8f8aad663172629"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "a5c381bc3ffb8f69feac99f9f9a6c6a9"
  },
  {
    "url": "1.8054dcf0e9faec300f6d.css"
  },
  {
    "url": "component---src-templates-blog-list-js-6845f6f24dff5975c2e4.js"
  },
  {
    "url": "1-49ad50eaf7c07da53747.js"
  },
  {
    "url": "0-a377e4c168a9050581ea.js"
  },
  {
    "url": "static/d/650/path---index-6a9-s7yboGzmLLMBKFoWNyIaAVlOxc.json",
    "revision": "2aa107d433ee1da99116e3fa320f0d9e"
  },
  {
    "url": "component---src-pages-404-js-bac42fec7ba96cda2666.js"
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