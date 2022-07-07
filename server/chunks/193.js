exports.id = 193;
exports.ids = [193];
exports.modules = {

/***/ 9869:
/***/ ((module) => {

// Exports
module.exports = {
	"navToggle": "navbar_navToggle__YcYdH",
	"navLabel": "navbar_navLabel__UPDdd",
	"nav": "navbar_nav__QFzJU",
	"navLogo": "navbar_navLogo__vpyzY",
	"navItems": "navbar_navItems__wBKX0",
	"navItem": "navbar_navItem__s4eSy",
	"fixed": "navbar_fixed__aLRvr",
	"nav-logo": "navbar_nav-logo__kYW8W",
	"hide": "navbar_hide__rlppm",
	"animate": "navbar_animate__QQSWr"
};


/***/ }),

/***/ 9193:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ NavBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _navbar_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9869);
/* harmony import */ var _navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2__);



function NavBar({ animate =false , children  }) {
    const { 0: offset , 1: setOffset  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const { 0: lightMode , 1: setLightMode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: showNav , 1: setShowNav  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10000);
    const navHeight = 16 * 3;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setShowNav(window.innerHeight - navHeight);
        const onScroll = ()=>setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, {
            passive: true
        });
        return ()=>window.removeEventListener("scroll", onScroll);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.querySelector("html")?.setAttribute("data-theme", lightMode ? "light" : "dark");
    }, [
        lightMode
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "checkbox",
                id: "nav-toggle",
                className: (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().navToggle)
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                id: "nav-label",
                htmlFor: "nav-toggle",
                className: (!animate ? (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().fixed) : offset >= showNav ? (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().fixed) + " " + (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().animate) : offset >= showNav / 2 ? (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().fixed) + " " + (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().hide) + " " + (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().animate) : offset >= navHeight ? (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().fixed) + " " + (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().hide) : "") + " " + (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().navLabel),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                    className: (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().nav),
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().navLogo),
                            onClick: ()=>{
                                setLightMode((cur)=>!cur);
                            }
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                            className: (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().navItems),
                            children: Array.isArray(children) ? children.map((child, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: (_navbar_module_scss__WEBPACK_IMPORTED_MODULE_2___default().navItem),
                                    children: child
                                }, index)) : children
                        })
                    ]
                })
            })
        ]
    });
};


/***/ })

};
;