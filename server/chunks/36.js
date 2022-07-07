exports.id = 36;
exports.ids = [36];
exports.modules = {

/***/ 4926:
/***/ ((module) => {

// Exports
module.exports = {
	"base": "button_base__wjLYL",
	"noPadding": "button_noPadding__kUnwb",
	"disabled": "button_disabled__Fx73_",
	"primary": "button_primary__NvUfE",
	"secondary": "button_secondary__P1fMh",
	"tertiary": "button_tertiary__L_fcM",
	"ghost": "button_ghost__AEbQ8"
};


/***/ }),

/***/ 9036:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _button_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4926);
/* harmony import */ var _button_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_button_module_scss__WEBPACK_IMPORTED_MODULE_3__);




function Button({ className , styleType , as: buttonType , noPadding , ...props }) {
    const allClassNames = [
        className,
        (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().base),
        noPadding ? (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().noPadding) : null,
        styleType === "primary" ? (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().primary) : styleType === "secondary" ? (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().secondary) : styleType === "tertiary" ? (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().tertiary) : styleType === "ghost" ? (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().ghost) : null
    ].filter((n)=>n).join(" ");
    switch(buttonType){
        case "link":
            {
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                    ...props,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        className: allClassNames,
                        children: props.children
                    })
                });
            }
        case "externalLink":
            {
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: allClassNames,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    ...props,
                    children: props.children
                });
            }
        case "unstyled":
            {
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    className: className,
                    ...props
                });
            }
        default:
            {
                const buttonProps = props;
                const isDisabledClass = (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().disabled) ? " " + (_button_module_scss__WEBPACK_IMPORTED_MODULE_3___default().disabled) : "";
                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                    className: allClassNames + isDisabledClass,
                    ...props
                });
            }
    }
};


/***/ })

};
;