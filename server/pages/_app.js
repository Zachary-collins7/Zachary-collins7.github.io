"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8925:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
var router_default = /*#__PURE__*/__webpack_require__.n(router_namespaceObject);
;// CONCATENATED MODULE: external "nprogress"
const external_nprogress_namespaceObject = require("nprogress");
var external_nprogress_default = /*#__PURE__*/__webpack_require__.n(external_nprogress_namespaceObject);
;// CONCATENATED MODULE: external "nextjs-google-analytics"
const external_nextjs_google_analytics_namespaceObject = require("nextjs-google-analytics");
// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__(6641);
;// CONCATENATED MODULE: ./next-seo.config.ts
/* harmony default export */ const next_seo_config = ({
    defaultTitle: "Zachary's Portforlio",
    titleTemplate: "%s | Zachary's Portforlio",
    openGraph: {
        type: "website",
        url: process.env.SITE_URL || "example.com",
        site_name: "Zachary's Portforlio",
        profile: {
            firstName: "Zachary",
            lastName: "Collins"
        }
    },
    twitter: {
        handle: "@ZachTheCollins",
        site: "@ZachTheCollins",
        cardType: "summary_large_image"
    }
});

;// CONCATENATED MODULE: ./pages/_app.tsx







external_nprogress_default().configure({
    showSpinner: false
});
router_default().events.on("routeChangeStart", ()=>external_nprogress_default().start());
router_default().events.on("routeChangeComplete", ()=>external_nprogress_default().done());
router_default().events.on("routeChangeError", ()=>external_nprogress_default().done());
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            process && "production" === "production" && /*#__PURE__*/ jsx_runtime_.jsx(external_nextjs_google_analytics_namespaceObject.GoogleAnalytics, {
                strategy: "lazyOnload"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_next_seo_.DefaultSeo, {
                ...next_seo_config
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        ]
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 6641:
/***/ ((module) => {

module.exports = require("next-seo");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8925));
module.exports = __webpack_exports__;

})();