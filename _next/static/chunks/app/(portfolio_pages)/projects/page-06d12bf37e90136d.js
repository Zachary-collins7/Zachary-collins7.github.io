(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[296],{2001:function(e,t,r){Promise.resolve().then(r.t.bind(r,7387,23)),Promise.resolve().then(r.bind(r,5208))},5208:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Search}});var s=r(7437),n=r(1168),a=r.n(n),l=r(2265),c=r(1396),i=r.n(c),o=r(3777);function Search(e){let{projects:t}=e,r=(0,l.useRef)(null),[n,c]=(0,l.useState)(""),[h,u]=(0,l.useState)(t),[_,p]=(0,l.useState)(0),[d,f]=(0,l.useState)([]);return(0,l.useEffect)(()=>{if(""===n)return f([]),u(t);let e=t.map(e=>{let t=n.toLowerCase();return{project:e,query:t,distance:(0,o.A)(t,e.title.toLowerCase())}}).filter(e=>{let{project:t,query:r,distance:s}=e;return!!(!n||t.title.toLowerCase().includes(r))||s.distance<7}).sort((e,t)=>e.distance.distance-t.distance.distance).map(e=>{let{project:t}=e;return t});f(e.map(e=>e.title)),u(e),p(0)},[n,t]),(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:a().wrapper,children:[(0,s.jsxs)("div",{className:a().search,children:[(0,s.jsxs)("div",{className:a().searchTextBox,children:[(0,s.jsx)("input",{autoFocus:!0,type:"text",ref:r,placeholder:"Search for a project",value:n,onChange:e=>c(e.target.value.trimStart().replace("  "," ")),onKeyDown:e=>{let t="ArrowUp"===e.key?-1:"ArrowDown"===e.key?1:0;if(0!==t&&e.preventDefault(),("Tab"===e.key||"Enter"===e.key)&&d.length&&n&&(e.preventDefault(),d.length>0)){var s;c(e=>d[_]||e),null===(s=r.current)||void 0===s||s.blur()}p(e=>{let r=(e+t)%d.length||0;return r})}}),(0,s.jsx)("div",{className:a().hasButton,children:(0,s.jsx)("button",{type:"submit"})})]}),(0,s.jsx)("div",{className:a().searchSuggestions,children:d.map((e,t)=>(0,s.jsx)("div",{className:a().searchSuggestion+(t===_?" "+a().selected:""),children:e},t))})]}),(0,s.jsx)("div",{className:a().searchResults,children:(0,s.jsx)("ul",{children:h.map((e,t)=>{let{id:r,date:n,title:l,image:c,imageAlt:o}=e;return(0,s.jsx)("li",{className:a().project,children:(0,s.jsxs)(i(),{href:"/projects/".concat(r),children:[(0,s.jsx)("div",{className:a().image,children:(0,s.jsx)("img",{src:c,alt:o})}),(0,s.jsxs)("div",{className:a().details,children:[(0,s.jsx)("h2",{children:l}),(0,s.jsx)("p",{children:n})]})]})},t)})})})]})})}},3777:function(e,t,r){"use strict";function levenshteinDistance(e,t){let r=Array(e.length).fill(Array(t.length).fill(0));for(let t=0;t<=e.length;t++)r[t]=[t];for(let e=0;e<=t.length;e++)r[0][e]=e;for(let s=1;s<=e.length;s++)for(let n=1;n<=t.length;n++){let a=e[s-1]===t[n-1]?0:1;r[s][n]=Math.min(r[s-1][n]+1,r[s][n-1]+1,r[s-1][n-1]+a)}let s=[],n=e.length,a=t.length;for(;n>0||a>0;){let l=e[n-1]===t[a-1]?0:1;n>0&&a>0&&r[n][a]===r[n-1][a-1]+l?(0===l?s.push({type:"match",oldChar:e[n-1],newChar:t[a-1],i:n}):s.push({type:"substitution",oldChar:e[n-1],newChar:t[a-1],i:n}),n--,a--):n>0&&r[n][a]===r[n-1][a]+1?(s.push({type:"deletion",oldChar:e[n-1],newChar:"",i:n}),n--):a>0&&r[n][a]===r[n][a-1]+1&&(s.push({type:"insertion",oldChar:"",newChar:t[a-1],i:n}),a--),console.groupEnd()}return{distance:r[e.length][t.length],matrix:r,steps:s.reverse()}}r.d(t,{A:function(){return levenshteinDistance}})},7387:function(e){e.exports={wrapper:"page_wrapper__46YqI",header:"page_header__3m85O",scaleIn:"page_scaleIn__Q0Z9w",floatUpRight:"page_floatUpRight__3wwKp"}},1168:function(e){e.exports={wrapper:"search_wrapper__iiOST",search:"search_search__VOt9j",searchTextBox:"search_searchTextBox__3ugJ0",searchSuggestions:"search_searchSuggestions__E8_nt",hasButton:"search_hasButton__dSM6y",searchSuggestion:"search_searchSuggestion__fVolC",selected:"search_selected__oQhHb",searchResults:"search_searchResults__9TzL3",project:"search_project__p6tUE",details:"search_details__f0k8W",image:"search_image__DjhNR",scaleIn:"search_scaleIn__MSRIu",floatUpRight:"search_floatUpRight__26yl_"}},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s=r(2265),n=Symbol.for("react.element"),a=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,c=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,r){var s,a={},o=null,h=null;for(s in void 0!==r&&(o=""+r),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(h=t.ref),t)l.call(t,s)&&!i.hasOwnProperty(s)&&(a[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps)void 0===a[s]&&(a[s]=t[s]);return{$$typeof:n,type:e,key:o,ref:h,props:a,_owner:c.current}}t.Fragment=a,t.jsx=q,t.jsxs=q},7437:function(e,t,r){"use strict";e.exports=r(622)},1396:function(e,t,r){e.exports=r(4724)}},function(e){e.O(0,[454,724,971,864,744],function(){return e(e.s=2001)}),_N_E=e.O()}]);