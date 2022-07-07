(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 8788:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "aboutSkills_wrapper__UP10I",
	"skills": "aboutSkills_skills__tXgA6",
	"skill": "aboutSkills_skill__8gkO4",
	"icon": "aboutSkills_icon__zx2N2",
	"title": "aboutSkills_title___diZ1",
	"description": "aboutSkills_description__tcJvW",
	"subtitle": "aboutSkills_subtitle__eQRZB",
	"toolList": "aboutSkills_toolList__N7w5u",
	"onLongHover": "aboutSkills_onLongHover__1EoRt"
};


/***/ }),

/***/ 5131:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "featuredprojects_wrapper__Z_MOM",
	"projects": "featuredprojects_projects__Om2b5"
};


/***/ }),

/***/ 6995:
/***/ ((module) => {

// Exports
module.exports = {
	"hero": "hero_hero____GXA",
	"heroContent": "hero_heroContent__oUG9B",
	"about": "hero_about__j8FF7",
	"image": "hero_image__BG2Yl",
	"scrollIcon": "hero_scrollIcon__VJzOs"
};


/***/ }),

/***/ 5187:
/***/ ((module) => {

// Exports
module.exports = {
	"cardWrapper": "projectcard_cardWrapper__oIiQt",
	"about": "projectcard_about__uZnED",
	"header": "projectcard_header__dpprS",
	"featured": "projectcard_featured__DMiRJ",
	"date": "projectcard_date__oHtIg",
	"content": "projectcard_content__9Y_9F",
	"tags": "projectcard_tags__lhDuV",
	"links": "projectcard_links__W9qfl",
	"image": "projectcard_image__3NqDJ"
};


/***/ }),

/***/ 6986:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ getProjects)
/* harmony export */ });
const getProjects = ()=>fetch("/data/projects.json").then((res)=>res.json()).then((json)=>json.projects).then((rawProjects)=>rawProjects.map((project)=>{
            project.date = new Date(project.date);
            return project;
        }).sort(({ date: a  }, { date: b  })=>a < b ? 1 : -1));


/***/ }),

/***/ 8770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next-seo"
var external_next_seo_ = __webpack_require__(6641);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./app/components/elements/hero.module.scss
var hero_module = __webpack_require__(6995);
var hero_module_default = /*#__PURE__*/__webpack_require__.n(hero_module);
// EXTERNAL MODULE: ./app/components/elements/Button.tsx
var Button = __webpack_require__(9036);
;// CONCATENATED MODULE: ./app/components/elements/Hero.tsx




const Hero = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: (hero_module_default()).hero,
            id: "mainHero",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (hero_module_default()).heroContent,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (hero_module_default()).about,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h6", {
                                children: "Hi, I'm Zach"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                children: "Web Developer"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "Web/iOS developer with Agile Software Development skills and a passion for creating beautiful and functional apps."
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                children: [
                                    "I'm currently working on ",
                                    /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                        as: "link",
                                        href: "/",
                                        styleType: "tertiary",
                                        noPadding: true,
                                        children: "My Portfolio"
                                    }),
                                    " (this site)"
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                style: {
                                    fontSize: "1rem",
                                    display: "flex",
                                    gap: "1rem"
                                },
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                        as: "link",
                                        href: "/contact",
                                        styleType: "primary",
                                        children: "Hire me"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                        as: "link",
                                        href: "/projects",
                                        styleType: "secondary",
                                        children: "My projects"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (hero_module_default()).image,
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (hero_module_default()).inner
                        })
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const elements_Hero = (Hero);

// EXTERNAL MODULE: ./app/components/elements/Navbar.tsx
var Navbar = __webpack_require__(9193);
// EXTERNAL MODULE: ./app/api/portfolioApi.ts
var portfolioApi = __webpack_require__(6986);
// EXTERNAL MODULE: ./app/components/elements/featuredprojects.module.scss
var featuredprojects_module = __webpack_require__(5131);
var featuredprojects_module_default = /*#__PURE__*/__webpack_require__.n(featuredprojects_module);
// EXTERNAL MODULE: ./app/components/elements/projectcard.module.scss
var projectcard_module = __webpack_require__(5187);
var projectcard_module_default = /*#__PURE__*/__webpack_require__.n(projectcard_module);
;// CONCATENATED MODULE: ./app/components/elements/ProjectCard.tsx




function ProjectCard({ project  }) {
    const { title , description , image , hoverImage , url , githubUrl , date , featured , tags  } = project;
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (projectcard_module_default()).cardWrapper,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (projectcard_module_default()).image,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: image,
                        alt: ""
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (projectcard_module_default()).about,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (projectcard_module_default()).header,
                            children: [
                                featured && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (projectcard_module_default()).featured,
                                    children: "Featured Project"
                                }),
                                date && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (projectcard_module_default()).date,
                                    children: date.toLocaleDateString()
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            children: title
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (projectcard_module_default()).content,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    dangerouslySetInnerHTML: {
                                        __html: description
                                    }
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                    className: (projectcard_module_default()).tags,
                                    children: tags.map((tag, idx)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                            className: (projectcard_module_default()).tag,
                                            children: tag
                                        }, idx))
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (projectcard_module_default()).links,
                            children: [
                                url ? /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                    as: "link",
                                    href: url,
                                    styleType: "ghost",
                                    children: "Check it out"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                    as: "button",
                                    styleType: "ghost",
                                    disabled: true,
                                    children: "Not hosted"
                                }),
                                githubUrl ? /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                    as: "link",
                                    href: githubUrl,
                                    styleType: "tertiary",
                                    children: "The code"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                    as: "button",
                                    styleType: "tertiary",
                                    disabled: true,
                                    children: "No github"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};

;// CONCATENATED MODULE: ./app/components/elements/FeaturedProjects.tsx





function FeaturedProjects(props) {
    const { 0: featuredProjects , 1: setFeaturedProjects  } = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        (0,portfolioApi/* getProjects */.m)().then((projects)=>{
            setFeaturedProjects(projects.filter((project)=>project.featured));
        });
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: (featuredprojects_module_default()).wrapper,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (featuredprojects_module_default()).projects,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        style: {
                            fontSize: "7vmin",
                            textAlign: "center"
                        },
                        children: "Featured Projects"
                    }),
                    featuredProjects && featuredProjects.map((project, idx)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(ProjectCard, {
                                project: project
                            })
                        }, idx))
                ]
            })
        })
    });
};

// EXTERNAL MODULE: ./app/components/elements/aboutSkills.module.scss
var aboutSkills_module = __webpack_require__(8788);
var aboutSkills_module_default = /*#__PURE__*/__webpack_require__.n(aboutSkills_module);
;// CONCATENATED MODULE: external "@fortawesome/react-fontawesome"
const react_fontawesome_namespaceObject = require("@fortawesome/react-fontawesome");
;// CONCATENATED MODULE: external "@fortawesome/free-solid-svg-icons"
const free_solid_svg_icons_namespaceObject = require("@fortawesome/free-solid-svg-icons");
;// CONCATENATED MODULE: ./app/components/elements/aboutSkills.tsx






const loadSkills = ()=>fetch("/data/skills.json").then((res)=>res.json()).then((json)=>json.skills).then((skills)=>skills.map((skill)=>{
            skill.icon = skill.icon === "faCode" ? free_solid_svg_icons_namespaceObject.faCode : skill.icon === "faLaptopCode" ? free_solid_svg_icons_namespaceObject.faLaptopCode : free_solid_svg_icons_namespaceObject.faBook;
            return skill;
        })).then((skills)=>skills);
function AboutSkills(props) {
    const { 0: skills , 1: setSkills  } = (0,external_react_.useState)([]);
    (0,external_react_.useEffect)(()=>{
        loadSkills().then((s)=>setSkills(s || [])).catch((err)=>console.error(`Error fetching skills: ${err}`));
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (aboutSkills_module_default()).wrapper,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    style: {
                        fontSize: "7vmin",
                        textAlign: "center",
                        marginBottom: "2rem"
                    },
                    children: "My Skills"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (aboutSkills_module_default()).skills,
                    children: skills.map(({ icon , title , desc , subtitle1 , desc1 , toolSubtitle , tools  }, idx)=>/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: (aboutSkills_module_default()).skill,
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (aboutSkills_module_default()).icon,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_namespaceObject.FontAwesomeIcon, {
                                            icon: icon
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (aboutSkills_module_default()).title,
                                        children: title
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (aboutSkills_module_default()).description,
                                        children: desc
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (aboutSkills_module_default()).subtitle,
                                        children: subtitle1
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (aboutSkills_module_default()).description,
                                        children: desc1
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: (aboutSkills_module_default()).subtitle,
                                        children: toolSubtitle
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                        className: (aboutSkills_module_default()).toolList,
                                        children: tools.map(({ text , link  }, idx)=>{
                                            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
                                                children: [
                                                    link && /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                                        styleType: "tertiary",
                                                        as: "externalLink",
                                                        noPadding: true,
                                                        href: link,
                                                        children: text
                                                    }),
                                                    !link && text
                                                ]
                                            }, idx);
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: (aboutSkills_module_default()).onLongHover,
                                        children: [
                                            "Need to hire a ",
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                children: title
                                            }),
                                            "?",
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                                    styleType: "primary",
                                                    as: "link",
                                                    href: "/contact",
                                                    children: "contact me"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }, idx)
                        }))
                })
            ]
        })
    });
};

;// CONCATENATED MODULE: ./pages/index.tsx







async function getStaticProps() {
    return {
        props: {}
    };
}
const Home = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Navbar/* default */.Z, {
                animate: true,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Home"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/about",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "About"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/projects",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Projects"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/contact",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: "Contact"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_next_seo_.NextSeo, {
                description: "Let's build something great together!"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(elements_Hero, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(FeaturedProjects, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(AboutSkills, {})
        ]
    });
};
/* harmony default export */ const pages = (Home);


/***/ }),

/***/ 6641:
/***/ ((module) => {

"use strict";
module.exports = require("next-seo");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [952,664,193,36], () => (__webpack_exec__(8770)));
module.exports = __webpack_exports__;

})();