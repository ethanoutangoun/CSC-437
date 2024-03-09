(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();function ye(i){return i=i||[],Array.isArray(i)?i:[i]}function U(i){return`[Vaadin.Router] ${i}`}function si(i){if(typeof i!="object")return String(i);const e=Object.prototype.toString.call(i).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(i)}`:e}function Nt(i){if(!i||!R(i.path))throw new Error(U('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=["component","redirect"];if(!B(i.action)&&!Array.isArray(i.children)&&!B(i.children)&&!e.some(t=>R(i[t])))throw new Error(U(`Expected route config "${i.path}" to include either "${e.join('", "')}" or "action" function but none found.`));i.redirect&&["component"].forEach(t=>{t in i&&console.warn(U(`Route config "${i.path}" has both "redirect" and "${t}" properties, and "redirect" will always override the latter. Did you mean to only use "${t}"?`))})}function lt(i){ye(i).forEach(e=>Nt(e))}function re(i,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${i}`,{cancelable:i==="go",detail:e}))}function Fe(i){return typeof i=="object"&&!!i}function B(i){return typeof i=="function"}function R(i){return typeof i=="string"}function zt(i){const e=new Error(U(`Page not found (${i.pathname})`));return e.context=i,e.code=404,e}const J=new class{};function ai(i){const e=i.port,t=i.protocol,n=t==="http:"&&e==="80"||t==="https:"&&e==="443"?i.hostname:i.host;return`${t}//${n}`}function pt(i){if(i.defaultPrevented||i.button!==0||i.shiftKey||i.ctrlKey||i.altKey||i.metaKey)return;let e=i.target;const t=i.composedPath?i.composedPath():i.path||[];for(let c=0;c<t.length;c++){const a=t[c];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||ai(e))!==window.location.origin)return;const{pathname:r,search:n,hash:s}=e;re("go",{pathname:r,search:n,hash:s})&&(i.preventDefault(),i&&i.type==="click"&&window.scrollTo(0,0))}const ci={activate(){window.document.addEventListener("click",pt)},inactivate(){window.document.removeEventListener("click",pt)}},li=/Trident/.test(navigator.userAgent);li&&!B(window.PopStateEvent)&&(window.PopStateEvent=function(i,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(i,!!e.bubbles,!!e.cancelable),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function dt(i){if(i.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:o}=window.location;re("go",{pathname:e,search:t,hash:o})}const pi={activate(){window.addEventListener("popstate",dt)},inactivate(){window.removeEventListener("popstate",dt)}};function di(i){for(var e=[],t=0;t<i.length;){var o=i[t];if(o==="*"||o==="+"||o==="?"){e.push({type:"MODIFIER",index:t,value:i[t++]});continue}if(o==="\\"){e.push({type:"ESCAPED_CHAR",index:t++,value:i[t++]});continue}if(o==="{"){e.push({type:"OPEN",index:t,value:i[t++]});continue}if(o==="}"){e.push({type:"CLOSE",index:t,value:i[t++]});continue}if(o===":"){for(var r="",n=t+1;n<i.length;){var s=i.charCodeAt(n);if(s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122||s===95){r+=i[n++];continue}break}if(!r)throw new TypeError("Missing parameter name at ".concat(t));e.push({type:"NAME",index:t,value:r}),t=n;continue}if(o==="("){var c=1,a="",n=t+1;if(i[n]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(n));for(;n<i.length;){if(i[n]==="\\"){a+=i[n++]+i[n++];continue}if(i[n]===")"){if(c--,c===0){n++;break}}else if(i[n]==="("&&(c++,i[n+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(n));a+=i[n++]}if(c)throw new TypeError("Unbalanced pattern at ".concat(t));if(!a)throw new TypeError("Missing pattern at ".concat(t));e.push({type:"PATTERN",index:t,value:a}),t=n;continue}e.push({type:"CHAR",index:t,value:i[t++]})}return e.push({type:"END",index:t,value:""}),e}function Ze(i,e){e===void 0&&(e={});for(var t=di(i),o=e.prefixes,r=o===void 0?"./":o,n="[^".concat(K(e.delimiter||"/#?"),"]+?"),s=[],c=0,a=0,l="",d=function(E){if(a<t.length&&t[a].type===E)return t[a++].value},p=function(E){var L=d(E);if(L!==void 0)return L;var H=t[a],Ne=H.type,ze=H.index;throw new TypeError("Unexpected ".concat(Ne," at ").concat(ze,", expected ").concat(E))},u=function(){for(var E="",L;L=d("CHAR")||d("ESCAPED_CHAR");)E+=L;return E};a<t.length;){var g=d("CHAR"),A=d("NAME"),S=d("PATTERN");if(A||S){var _=g||"";r.indexOf(_)===-1&&(l+=_,_=""),l&&(s.push(l),l=""),s.push({name:A||c++,prefix:_,suffix:"",pattern:S||n,modifier:d("MODIFIER")||""});continue}var $=g||d("ESCAPED_CHAR");if($){l+=$;continue}l&&(s.push(l),l="");var ee=d("OPEN");if(ee){var _=u(),te=d("NAME")||"",v=d("PATTERN")||"",M=u();p("CLOSE"),s.push({name:te||(v?c++:""),pattern:te&&!v?n:v,prefix:_,suffix:M,modifier:d("MODIFIER")||""});continue}p("END")}return s}function It(i,e){return Mt(Ze(i,e),e)}function Mt(i,e){e===void 0&&(e={});var t=et(e),o=e.encode,r=o===void 0?function(a){return a}:o,n=e.validate,s=n===void 0?!0:n,c=i.map(function(a){if(typeof a=="object")return new RegExp("^(?:".concat(a.pattern,")$"),t)});return function(a){for(var l="",d=0;d<i.length;d++){var p=i[d];if(typeof p=="string"){l+=p;continue}var u=a?a[p.name]:void 0,g=p.modifier==="?"||p.modifier==="*",A=p.modifier==="*"||p.modifier==="+";if(Array.isArray(u)){if(!A)throw new TypeError('Expected "'.concat(p.name,'" to not repeat, but got an array'));if(u.length===0){if(g)continue;throw new TypeError('Expected "'.concat(p.name,'" to not be empty'))}for(var S=0;S<u.length;S++){var _=r(u[S],p);if(s&&!c[d].test(_))throw new TypeError('Expected all "'.concat(p.name,'" to match "').concat(p.pattern,'", but got "').concat(_,'"'));l+=p.prefix+_+p.suffix}continue}if(typeof u=="string"||typeof u=="number"){var _=r(String(u),p);if(s&&!c[d].test(_))throw new TypeError('Expected "'.concat(p.name,'" to match "').concat(p.pattern,'", but got "').concat(_,'"'));l+=p.prefix+_+p.suffix;continue}if(!g){var $=A?"an array":"a string";throw new TypeError('Expected "'.concat(p.name,'" to be ').concat($))}}return l}}function K(i){return i.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function et(i){return i&&i.sensitive?"":"i"}function hi(i,e){if(!e)return i;for(var t=/\((?:\?<(.*?)>)?(?!\?)/g,o=0,r=t.exec(i.source);r;)e.push({name:r[1]||o++,prefix:"",suffix:"",modifier:"",pattern:""}),r=t.exec(i.source);return i}function ui(i,e,t){var o=i.map(function(r){return Lt(r,e,t).source});return new RegExp("(?:".concat(o.join("|"),")"),et(t))}function gi(i,e,t){return fi(Ze(i,t),e,t)}function fi(i,e,t){t===void 0&&(t={});for(var o=t.strict,r=o===void 0?!1:o,n=t.start,s=n===void 0?!0:n,c=t.end,a=c===void 0?!0:c,l=t.encode,d=l===void 0?function(ze){return ze}:l,p=t.delimiter,u=p===void 0?"/#?":p,g=t.endsWith,A=g===void 0?"":g,S="[".concat(K(A),"]|$"),_="[".concat(K(u),"]"),$=s?"^":"",ee=0,te=i;ee<te.length;ee++){var v=te[ee];if(typeof v=="string")$+=K(d(v));else{var M=K(d(v.prefix)),E=K(d(v.suffix));if(v.pattern)if(e&&e.push(v),M||E)if(v.modifier==="+"||v.modifier==="*"){var L=v.modifier==="*"?"?":"";$+="(?:".concat(M,"((?:").concat(v.pattern,")(?:").concat(E).concat(M,"(?:").concat(v.pattern,"))*)").concat(E,")").concat(L)}else $+="(?:".concat(M,"(").concat(v.pattern,")").concat(E,")").concat(v.modifier);else v.modifier==="+"||v.modifier==="*"?$+="((?:".concat(v.pattern,")").concat(v.modifier,")"):$+="(".concat(v.pattern,")").concat(v.modifier);else $+="(?:".concat(M).concat(E,")").concat(v.modifier)}}if(a)r||($+="".concat(_,"?")),$+=t.endsWith?"(?=".concat(S,")"):"$";else{var H=i[i.length-1],Ne=typeof H=="string"?_.indexOf(H[H.length-1])>-1:H===void 0;r||($+="(?:".concat(_,"(?=").concat(S,"))?")),Ne||($+="(?=".concat(_,"|").concat(S,")"))}return new RegExp($,et(t))}function Lt(i,e,t){return i instanceof RegExp?hi(i,e):Array.isArray(i)?ui(i,e,t):gi(i,e,t)}const{hasOwnProperty:mi}=Object.prototype,Be=new Map;Be.set("|false",{keys:[],pattern:/(?:)/});function ht(i){try{return decodeURIComponent(i)}catch{return i}}function vi(i,e,t,o,r){t=!!t;const n=`${i}|${t}`;let s=Be.get(n);if(!s){const l=[];s={keys:l,pattern:Lt(i,l,{end:t,strict:i===""})},Be.set(n,s)}const c=s.pattern.exec(e);if(!c)return null;const a=Object.assign({},r);for(let l=1;l<c.length;l++){const d=s.keys[l-1],p=d.name,u=c[l];(u!==void 0||!mi.call(a,p))&&(d.modifier==="+"||d.modifier==="*"?a[p]=u?u.split(/[/?#]/).map(ht):[]:a[p]=u&&ht(u))}return{path:c[0],keys:(o||[]).concat(s.keys),params:a}}function Ht(i,e,t,o,r){let n,s,c=0,a=i.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(l){if(i===l)return{done:!0};const d=i.__children=i.__children||i.children;if(!n&&(n=vi(a,e,!d,o,r),n))return{done:!1,value:{route:i,keys:n.keys,params:n.params,path:n.path}};if(n&&d)for(;c<d.length;){if(!s){const u=d[c];u.parent=i;let g=n.path.length;g>0&&e.charAt(g)==="/"&&(g+=1),s=Ht(u,e.substr(g),t,n.keys,n.params)}const p=s.next(l);if(!p.done)return{done:!1,value:p.value};s=null,c++}return{done:!0}}}}function bi(i){if(B(i.route.action))return i.route.action(i)}function xi(i,e){let t=e;for(;t;)if(t=t.parent,t===i)return!0;return!1}function yi(i){let e=`Path '${i.pathname}' is not properly resolved due to an error.`;const t=(i.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function _i(i,e){const{route:t,path:o}=e;if(t&&!t.__synthetic){const r={path:o,route:t};if(!i.chain)i.chain=[];else if(t.parent){let n=i.chain.length;for(;n--&&i.chain[n].route&&i.chain[n].route!==t.parent;)i.chain.pop()}i.chain.push(r)}}class Ve{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||bi,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){lt(e);const t=[...ye(e)];this.root.__children=t}addRoutes(e){return lt(e),this.root.__children.push(...ye(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,R(e)?{pathname:e}:e),o=Ht(this.root,this.__normalizePathname(t.pathname),this.baseUrl),r=this.resolveRoute;let n=null,s=null,c=t;function a(l,d=n.value.route,p){const u=p===null&&n.value.route;return n=s||o.next(u),s=null,!l&&(n.done||!xi(d,n.value.route))?(s=n,Promise.resolve(J)):n.done?Promise.reject(zt(t)):(c=Object.assign(c?{chain:c.chain?c.chain.slice(0):[]}:{},t,n.value),_i(c,n.value),Promise.resolve(r(c)).then(g=>g!=null&&g!==J?(c.result=g.result||g,c):a(l,d,g)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(l=>{const d=yi(c);if(l?console.warn(d):l=new Error(d),l.context=l.context||c,l instanceof DOMException||(l.code=l.code||500),this.errorHandler)return c.result=this.errorHandler(l),c;throw l})}static __createUrl(...e){return new URL(...e)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,o=e[0]==="/"?this.constructor.__createUrl(t).origin+e:"./"+e,r=this.constructor.__createUrl(o,t).href;if(r.slice(0,t.length)===t)return r.slice(t.length)}}const ut=new Map;function qt(i,e,t){const o=e.name||e.component;if(o&&(i.has(o)?i.get(o).push(e):i.set(o,[e])),Array.isArray(t))for(let r=0;r<t.length;r++){const n=t[r];n.parent=e,qt(i,n,n.__children||n.children)}}function gt(i,e){const t=i.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function ft(i){let e=i.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function wi(i,e={encode:encodeURIComponent}){if(!(i instanceof Ve))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(o,r)=>{let n=gt(t,o);if(!n&&(t.clear(),qt(t,i.root,i.root.__children),n=gt(t,o),!n))throw new Error(`Route "${o}" not found`);let s=ut.get(n.fullPath);if(!s){let l=ft(n),d=n.parent;for(;d;){const g=ft(d);g&&(l=g.replace(/\/$/,"")+"/"+l.replace(/^\//,"")),d=d.parent}const p=Ze(l),u=Object.create(null);for(let g=0;g<p.length;g++)R(p[g])||(u[p[g].name]=!0);s={tokens:p,keys:u},ut.set(l,s),n.fullPath=l}let a=Mt(s.tokens,e)(r)||"/";if(e.stringifyQueryParams&&r){const l={},d=Object.keys(r);for(let u=0;u<d.length;u++){const g=d[u];s.keys[g]||(l[g]=r[g])}const p=e.stringifyQueryParams(l);p&&(a+=p.charAt(0)==="?"?p:`?${p}`)}return a}}let mt=[];function $i(i){mt.forEach(e=>e.inactivate()),i.forEach(e=>e.activate()),mt=i}const Pi=i=>{const e=getComputedStyle(i).getPropertyValue("animation-name");return e&&e!=="none"},Ei=(i,e)=>{const t=()=>{i.removeEventListener("animationend",t),e()};i.addEventListener("animationend",t)};function vt(i,e){return i.classList.add(e),new Promise(t=>{if(Pi(i)){const o=i.getBoundingClientRect(),r=`height: ${o.bottom-o.top}px; width: ${o.right-o.left}px`;i.setAttribute("style",`position: absolute; ${r}`),Ei(i,()=>{i.classList.remove(e),i.removeAttribute("style"),t()})}else i.classList.remove(e),t()})}const Ai=256;function Ie(i){return i!=null}function Oi(i){const e=Object.assign({},i);return delete e.next,e}function O({pathname:i="",search:e="",hash:t="",chain:o=[],params:r={},redirectFrom:n,resolver:s},c){const a=o.map(l=>l.route);return{baseUrl:s&&s.baseUrl||"",pathname:i,search:e,hash:t,routes:a,route:c||a.length&&a[a.length-1]||null,params:r,redirectFrom:n,searchParams:new URLSearchParams(e),getUrl:(l={})=>ve(It(Ft(a))(Object.assign({},r,l)),s)}}function bt(i,e){const t=Object.assign({},i.params);return{redirect:{pathname:e,from:i.pathname,params:t}}}function Ci(i,e){e.location=O(i);const t=i.chain.map(o=>o.route).indexOf(i.route);return i.chain[t].element=e,e}function me(i,e,t){if(B(i))return i.apply(t,e)}function xt(i,e,t){return o=>{if(o&&(o.cancel||o.redirect))return o;if(t)return me(t[i],e,t)}}function Si(i,e){if(!Array.isArray(i)&&!Fe(i))throw new Error(U(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${i}`));e.__children=[];const t=ye(i);for(let o=0;o<t.length;o++)Nt(t[o]),e.__children.push(t[o])}function ve(i,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(i.replace(/^\//,""),t).pathname:i}function Ft(i){return i.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class f extends Ve{constructor(e,t){const o=document.head.querySelector("base"),r=o&&o.getAttribute("href");super([],Object.assign({baseUrl:r&&Ve.__createUrl(r,document.URL).href.replace(/[^/]*$/,"")},t)),this.resolveRoute=s=>this.__resolveRoute(s);const n=f.NavigationTrigger;f.setTriggers.apply(f,Object.keys(n).map(s=>n[s])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=O({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let o=Promise.resolve();B(t.children)&&(o=o.then(()=>t.children(Oi(e))).then(n=>{!Ie(n)&&!B(t.children)&&(n=t.children),Si(n,t)}));const r={redirect:n=>bt(e,n),component:n=>{const s=document.createElement(n);return this.__createdByRouter.set(s,!0),s}};return o.then(()=>{if(this.__isLatestRender(e))return me(t.action,[e,r],t)}).then(n=>{if(Ie(n)&&(n instanceof HTMLElement||n.redirect||n===J))return n;if(R(t.redirect))return r.redirect(t.redirect)}).then(n=>{if(Ie(n))return n;if(R(t.component))return r.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const o=++this.__lastStartedRenderId,r=Object.assign({search:"",hash:""},R(e)?{pathname:e}:e,{__renderId:o});return this.ready=this.resolve(r).then(n=>this.__fullyResolveChain(n)).then(n=>{if(this.__isLatestRender(n)){const s=this.__previousContext;if(n===s)return this.__updateBrowserHistory(s,!0),this.location;if(this.location=O(n),t&&this.__updateBrowserHistory(n,o===1),re("location-changed",{router:this,location:this.location}),n.__skipAttach)return this.__copyUnchangedElements(n,s),this.__previousContext=n,this.location;this.__addAppearingContent(n,s);const c=this.__animateIfNeeded(n);return this.__runOnAfterEnterCallbacks(n),this.__runOnAfterLeaveCallbacks(n,s),c.then(()=>{if(this.__isLatestRender(n))return this.__removeDisappearingContent(),this.__previousContext=n,this.location})}}).catch(n=>{if(o===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(r),f.__removeDomNodes(this.__outlet&&this.__outlet.children),this.location=O(Object.assign(r,{resolver:this})),re("error",Object.assign({router:this,error:n},r)),n}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(o=>{const n=o!==t?o:e,c=ve(Ft(o.chain),o.resolver)===o.pathname,a=(l,d=l.route,p)=>l.next(void 0,d,p).then(u=>u===null||u===J?c?l:d.parent!==null?a(l,d.parent,u):u:u);return a(o).then(l=>{if(l===null||l===J)throw zt(n);return l&&l!==J&&l!==o?this.__fullyResolveChain(n,l):this.__amendWithOnBeforeCallbacks(o)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(Ci(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(o=>this.__findComponentContextAfterAllRedirects(o)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(U(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${si(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},o=t.chain||[],r=e.chain;let n=Promise.resolve();const s=()=>({cancel:!0}),c=a=>bt(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,o.length){for(let a=0;a<Math.min(o.length,r.length)&&!(o[a].route!==r[a].route||o[a].path!==r[a].path&&o[a].element!==r[a].element||!this.__isReusableElement(o[a].element,r[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=r.length===o.length&&e.__divergedChainIndex==r.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=r.length-1;a>=0;a--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:s},o[a]);for(let a=0;a<r.length;a++)n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:s,redirect:c},r[a]),o[a].element.location=O(e,o[a].route)}else for(let a=o.length-1;a>=e.__divergedChainIndex;a--)n=this.__runOnBeforeLeaveCallbacks(n,e,{prevent:s},o[a])}if(!e.__skipAttach)for(let a=0;a<r.length;a++)a<e.__divergedChainIndex?a<o.length&&o[a].element&&(o[a].element.location=O(e,o[a].route)):(n=this.__runOnBeforeEnterCallbacks(n,e,{prevent:s,redirect:c},r[a]),r[a].element&&(r[a].element.location=O(e,r[a].route)));return n.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,o,r){const n=O(t);return e.then(s=>{if(this.__isLatestRender(t))return xt("onBeforeLeave",[n,o,this],r.element)(s)}).then(s=>{if(!(s||{}).redirect)return s})}__runOnBeforeEnterCallbacks(e,t,o,r){const n=O(t,r.route);return e.then(s=>{if(this.__isLatestRender(t))return xt("onBeforeEnter",[n,o,this],r.element)(s)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,o){if(t>Ai)throw new Error(U(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:o})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(U(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:o=""},r){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==o){const n=r?"replaceState":"pushState";window.history[n](null,document.title,e+t+o),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let o=this.__outlet;for(let r=0;r<e.__divergedChainIndex;r++){const n=t&&t.chain[r].element;if(n)if(n.parentNode===o)e.chain[r].element=n,o=n;else break}return o}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const o=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(o.children).filter(n=>this.__addedByRouter.get(n)&&n!==e.result);let r=o;for(let n=e.__divergedChainIndex;n<e.chain.length;n++){const s=e.chain[n].element;s&&(r.appendChild(s),this.__addedByRouter.set(s,!0),r===o&&this.__appearingContent.push(s),r=s)}}__removeDisappearingContent(){this.__disappearingContent&&f.__removeDomNodes(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(f.__removeDomNodes(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let o=t.chain.length-1;o>=e.__divergedChainIndex&&this.__isLatestRender(e);o--){const r=t.chain[o].element;if(r)try{const n=O(e);me(r.onAfterLeave,[n,{},t.resolver],r)}finally{this.__disappearingContent.indexOf(r)>-1&&f.__removeDomNodes(r.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const o=e.chain[t].element||{},r=O(e,e.chain[t].route);me(o.onAfterEnter,[r,{},e.resolver],o)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],o=(this.__appearingContent||[])[0],r=[],n=e.chain;let s;for(let c=n.length;c>0;c--)if(n[c-1].route.animate){s=n[c-1].route.animate;break}if(t&&o&&s){const c=Fe(s)&&s.leave||"leaving",a=Fe(s)&&s.enter||"entering";r.push(vt(t,c)),r.push(vt(o,a))}return Promise.all(r).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:o,hash:r}=e?e.detail:window.location;R(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:o,hash:r},!0))}static setTriggers(...e){$i(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=wi(this)),ve(this.__urlForName(e,t),this)}urlForPath(e,t){return ve(It(e)(t),this)}static go(e){const{pathname:t,search:o,hash:r}=R(e)?this.__createUrl(e,"http://a"):e;return re("go",{pathname:t,search:o,hash:r})}static __removeDomNodes(e){if(e&&e.length){const t=e[0].parentNode,o=e.length-1;for(let r=o;r>=0;r--)t.removeChild(e[r])}}}const Ti=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,be=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function ki(){function i(){return!0}return Bt(i)}function Ri(){try{return ji()?!0:Ui()?be?!Di():!ki():!1}catch{return!1}}function ji(){return localStorage.getItem("vaadin.developmentmode.force")}function Ui(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function Di(){return!!(be&&Object.keys(be).map(e=>be[e]).filter(e=>e.productionMode).length>0)}function Bt(i,e){if(typeof i!="function")return;const t=Ti.exec(i.toString());if(t)try{i=new Function(t[1])}catch(o){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",o)}return i(e)}window.Vaadin=window.Vaadin||{};const yt=function(i,e){if(window.Vaadin.developmentMode)return Bt(i,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Ri());function Ni(){}const zi=function(){if(typeof yt=="function")return yt(Ni)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.2"});zi();f.NavigationTrigger={POPSTATE:pi,CLICK:ci};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe=globalThis,tt=xe.ShadowRoot&&(xe.ShadyCSS===void 0||xe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol(),_t=new WeakMap;let Vt=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==it)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(tt&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=_t.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&_t.set(t,e))}return e}toString(){return this.cssText}};const Ii=i=>new Vt(typeof i=="string"?i:i+"",void 0,it),y=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((o,r,n)=>o+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new Vt(t,i,it)},Mi=(i,e)=>{if(tt)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),r=xe.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}},wt=tt?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Ii(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Li,defineProperty:Hi,getOwnPropertyDescriptor:qi,getOwnPropertyNames:Fi,getOwnPropertySymbols:Bi,getPrototypeOf:Vi}=Object,D=globalThis,$t=D.trustedTypes,Wi=$t?$t.emptyScript:"",Me=D.reactiveElementPolyfillSupport,oe=(i,e)=>i,_e={toAttribute(i,e){switch(e){case Boolean:i=i?Wi:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},rt=(i,e)=>!Li(i,e),Pt={attribute:!0,type:String,converter:_e,reflect:!1,hasChanged:rt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),D.litPropertyMetadata??(D.litPropertyMetadata=new WeakMap);class G extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Pt){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,t);r!==void 0&&Hi(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){const{get:r,set:n}=qi(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get(){return r==null?void 0:r.call(this)},set(s){const c=r==null?void 0:r.call(this);n.call(this,s),this.requestUpdate(e,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Pt}static _$Ei(){if(this.hasOwnProperty(oe("elementProperties")))return;const e=Vi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(oe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(oe("properties"))){const t=this.properties,o=[...Fi(t),...Bi(t)];for(const r of o)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,r]of t)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const r=this._$Eu(t,o);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(wt(r))}else e!==void 0&&t.push(wt(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Mi(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var n;const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const s=(((n=o.converter)==null?void 0:n.toAttribute)!==void 0?o.converter:_e).toAttribute(t,o.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){var n;const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const s=o.getPropertyOptions(r),c=typeof s.converter=="function"?{fromAttribute:s.converter}:((n=s.converter)==null?void 0:n.fromAttribute)!==void 0?s.converter:_e;this._$Em=r,this[r]=c.fromAttribute(t,s.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??rt)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,s]of r)s.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],s)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var r;return(r=o.hostUpdated)==null?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}G.elementStyles=[],G.shadowRootOptions={mode:"open"},G[oe("elementProperties")]=new Map,G[oe("finalized")]=new Map,Me==null||Me({ReactiveElement:G}),(D.reactiveElementVersions??(D.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,we=ne.trustedTypes,Et=we?we.createPolicy("lit-html",{createHTML:i=>i}):void 0,Wt="$lit$",j=`lit$${(Math.random()+"").slice(9)}$`,Kt="?"+j,Ki=`<${Kt}>`,V=document,se=()=>V.createComment(""),ae=i=>i===null||typeof i!="object"&&typeof i!="function",Gt=Array.isArray,Gi=i=>Gt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Le=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,At=/-->/g,Ot=/>/g,q=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,St=/"/g,Jt=/^(?:script|style|textarea|title)$/i,Ji=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),h=Ji(1),X=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),Tt=new WeakMap,F=V.createTreeWalker(V,129);function Xt(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Et!==void 0?Et.createHTML(e):e}const Xi=(i,e)=>{const t=i.length-1,o=[];let r,n=e===2?"<svg>":"",s=ie;for(let c=0;c<t;c++){const a=i[c];let l,d,p=-1,u=0;for(;u<a.length&&(s.lastIndex=u,d=s.exec(a),d!==null);)u=s.lastIndex,s===ie?d[1]==="!--"?s=At:d[1]!==void 0?s=Ot:d[2]!==void 0?(Jt.test(d[2])&&(r=RegExp("</"+d[2],"g")),s=q):d[3]!==void 0&&(s=q):s===q?d[0]===">"?(s=r??ie,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,l=d[1],s=d[3]===void 0?q:d[3]==='"'?St:Ct):s===St||s===Ct?s=q:s===At||s===Ot?s=ie:(s=q,r=void 0);const g=s===q&&i[c+1].startsWith("/>")?" ":"";n+=s===ie?a+Ki:p>=0?(o.push(l),a.slice(0,p)+Wt+a.slice(p)+j+g):a+j+(p===-2?c:g)}return[Xt(i,n+(i[t]||"<?>")+(e===2?"</svg>":"")),o]};class ce{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let n=0,s=0;const c=e.length-1,a=this.parts,[l,d]=Xi(e,t);if(this.el=ce.createElement(l,o),F.currentNode=this.el.content,t===2){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(r=F.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const p of r.getAttributeNames())if(p.endsWith(Wt)){const u=d[s++],g=r.getAttribute(p).split(j),A=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:A[2],strings:g,ctor:A[1]==="."?Yi:A[1]==="?"?Zi:A[1]==="@"?er:ke}),r.removeAttribute(p)}else p.startsWith(j)&&(a.push({type:6,index:n}),r.removeAttribute(p));if(Jt.test(r.tagName)){const p=r.textContent.split(j),u=p.length-1;if(u>0){r.textContent=we?we.emptyScript:"";for(let g=0;g<u;g++)r.append(p[g],se()),F.nextNode(),a.push({type:2,index:++n});r.append(p[u],se())}}}else if(r.nodeType===8)if(r.data===Kt)a.push({type:2,index:n});else{let p=-1;for(;(p=r.data.indexOf(j,p+1))!==-1;)a.push({type:7,index:n}),p+=j.length-1}n++}}static createElement(e,t){const o=V.createElement("template");return o.innerHTML=e,o}}function Q(i,e,t=i,o){var s,c;if(e===X)return e;let r=o!==void 0?(s=t._$Co)==null?void 0:s[o]:t._$Cl;const n=ae(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((c=r==null?void 0:r._$AO)==null||c.call(r,!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=r:t._$Cl=r),r!==void 0&&(e=Q(i,r._$AS(i,e.values),r,o)),e}class Qi{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,r=((e==null?void 0:e.creationScope)??V).importNode(t,!0);F.currentNode=r;let n=F.nextNode(),s=0,c=0,a=o[0];for(;a!==void 0;){if(s===a.index){let l;a.type===2?l=new ue(n,n.nextSibling,this,e):a.type===1?l=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(l=new tr(n,this,e)),this._$AV.push(l),a=o[++c]}s!==(a==null?void 0:a.index)&&(n=F.nextNode(),s++)}return F.currentNode=V,r}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class ue{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,r){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),ae(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==X&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Gi(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==w&&ae(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ce.createElement(Xt(o.h,o.h[0]),this.options)),o);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{const s=new Qi(r,this),c=s.u(this.options);s.p(t),this.T(c),this._$AH=s}}_$AC(e){let t=Tt.get(e.strings);return t===void 0&&Tt.set(e.strings,t=new ce(e)),t}k(e){Gt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const n of e)r===t.length?t.push(o=new ue(this.S(se()),this.S(se()),this,this.options)):o=t[r],o._$AI(n),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class ke{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,r,n){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=w}_$AI(e,t=this,o,r){const n=this.strings;let s=!1;if(n===void 0)e=Q(this,e,t,0),s=!ae(e)||e!==this._$AH&&e!==X,s&&(this._$AH=e);else{const c=e;let a,l;for(e=n[0],a=0;a<n.length-1;a++)l=Q(this,c[o+a],t,a),l===X&&(l=this._$AH[a]),s||(s=!ae(l)||l!==this._$AH[a]),l===w?e=w:e!==w&&(e+=(l??"")+n[a+1]),this._$AH[a]=l}s&&!r&&this.j(e)}j(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Yi extends ke{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===w?void 0:e}}class Zi extends ke{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==w)}}class er extends ke{constructor(e,t,o,r,n){super(e,t,o,r,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??w)===X)return;const o=this._$AH,r=e===w&&o!==w||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==w&&(o===w||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class tr{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const He=ne.litHtmlPolyfillSupport;He==null||He(ce,ue),(ne.litHtmlVersions??(ne.litHtmlVersions=[])).push("3.1.2");const ir=(i,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let r=o._$litPart$;if(r===void 0){const n=(t==null?void 0:t.renderBefore)??null;o._$litPart$=r=new ue(e.insertBefore(se(),n),n,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let m=class extends G{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ir(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return X}};var Dt;m._$litElement$=!0,m.finalized=!0,(Dt=globalThis.litElementHydrateSupport)==null||Dt.call(globalThis,{LitElement:m});const qe=globalThis.litElementPolyfillSupport;qe==null||qe({LitElement:m});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rr={attribute:!0,type:String,converter:_e,reflect:!1,hasChanged:rt},or=(i=rr,e,t)=>{const{kind:o,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),n.set(t.name,i),o==="accessor"){const{name:s}=t;return{set(c){const a=e.get.call(this);e.set.call(this,c),this.requestUpdate(s,a,i)},init(c){return c!==void 0&&this.P(s,void 0,i),c}}}if(o==="setter"){const{name:s}=t;return function(c){const a=this[s];e.call(this,c),this.requestUpdate(s,a,i)}}throw Error("Unsupported decorator location: "+o)};function b(i){return(e,t)=>typeof t=="object"?or(i,e,t):((o,r,n)=>{const s=r.hasOwnProperty(n);return r.constructor.createProperty(n,s?{...o,wrapped:!0}:o),s?Object.getOwnPropertyDescriptor(r,n):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(i){return b({...i,state:!0,attribute:!1})}var nr=Object.defineProperty,sr=Object.getOwnPropertyDescriptor,ar=(i,e,t,o)=>{for(var r=o>1?void 0:o?sr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&nr(e,t,r),r};const ct=class ct extends m{constructor(){super(...arguments),this.open=!1}openPopup(){this.open=!0}closePopup(){this.open=!1,document.body.style.overflow=""}triggerSort(){this.dispatchEvent(new CustomEvent("sort-requested"))}render(){return h`
  
        <button class="filter-container" @click="${this.openPopup}">
          <svg class="filter-icon">
            <use href="/icons/filter.svg#icon-filter" />
          </svg>
          <h4>Filter</h4>
        </button>

        ${this.open?h`
                <div class="popup-overlay" @click="${this.closePopup}"  >
                  <div class="popup">
                    <button @click="${this.closePopup}" class="close-button">
                      Close
                    </button>

                    <button @click="${this.triggerSort}" class="sort-button">
                      Sort Alphabetically
                    </button>
                 
                    <p>This is the filter popup content.</p>
                  </div>
                </div>
              `:""}
      </div>
    `}};ct.styles=y`
    * {
      margin: 0;
      padding: 0;
    }

    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* Darkens the background */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .popup {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      position: relative;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }

    .filter-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      background-color: var(--color-main-bg);
      margin-left: 30px;
      border: 1px solid var(--color-light);
    }

    .filter-icon {
      display: inline;
      height: 25px;
      width: 25px;
      vertical-align: top;
      fill: var(--color-primary);
      stroke: var(--color-primary);
      transform: translate(1.5px, 1px);
      background-color: inherit;
    }

    .filter-container h4 {
      font-size: 15px;
      font-weight: 500;
      color: var(--color-primary);
      background-color: inherit;
    }

    .filter-container:hover {
      cursor: pointer;
      background-color: rgb(230, 230, 230);
    }
  `;let $e=ct;ar([b({reflect:!0,type:Boolean})],$e.prototype,"open",2);customElements.define("filter-popup",$e);var cr=Object.defineProperty,lr=Object.getOwnPropertyDescriptor,Qt=(i,e,t,o)=>{for(var r=o>1?void 0:o?lr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&cr(e,t,r),r};let Pe=class extends m{constructor(){super(...arguments),this.open=!1}render(){return h`
      <section class="category">
        <div>
          <ul class="category-list">
            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/flame.svg" alt="flame-icon" width="33px" />
                </div>
                <p>Trending</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/american.svg" alt="American" width="35px" />
                </div>
                <p>American</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/italian.svg" alt="Italian" width="35px" />
                </div>
                <p>Italian</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img
                    src="/icons/mexican.svg"
                    alt="mexican-icon"
                    width="35px"
                  />
                </div>
                <p>Mexican</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img
                    src="/icons/japanese.svg"
                    alt="japanese-icon"
                    width="35px"
                  />
                </div>
                <p>Japanese</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/indian.svg" alt="indian-icon" width="42px" />
                </div>
                <p>Indian</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img src="/icons/wine.svg" alt="wine-icon" width="36px" />
                </div>
                <p>Date Night</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/1")}"
              >
                <div class="image-border">
                  <img
                    src="/icons/chicken.svg"
                    alt="chicken-icon"
                    width="32px"
                  />
                </div>
                <p>Chicken</p>
              </div>
            </li>

            <li>
              <a href="/app/category/1">
                <div class="more-icon">
                  <svg class="m-icon">
                    <use href="/icons/right-arrow-2.svg#icon-right-arrow" />
                  </svg>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <filter-popup></filter-popup>
      </section>
    `}};Pe.styles=y`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .category {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      justify-content: space-between;
      overflow-x: scroll;
    }

    .category::-webkit-scrollbar {
      display: none;
    }

    .category-list {
      margin-top: 10px;
      display: flex;
      list-style: none;
      gap: 30px;
      align-items: center;
    }

    .category-list div {
      text-decoration: none;
      color: var(--color-primary);
      font-size: 12px;
      font-weight: 300;
    }

    .category-item {
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 3px;
      border-bottom: 2px solid transparent;
      transition: border-bottom 0.3s ease;
    }

    .category-item p {
      white-space: nowrap;
      color: var(--color-primary);
    }

    .category-item:hover {
      border-bottom: 2px solid rgb(190, 187, 187);
      cursor: pointer;
    }

    .more-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--color-light);
      padding: 6px;
      padding-left: 8px;
      border-radius: 50%;
    }

    .m-icon {
      display: inline;
      height: 15px;
      width: 15px;
      vertical-align: top;
      fill: var(--color-primary);
      stroke: var(--color-primary);
      transform: translate(1.5px, 1px);
    }

    .image-border {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .trending {
      margin-bottom: 20px;
    }

    .trending h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }

    footer {
      border-top: 1px solid var(--color-border);
      color: var(--color-primary);
      padding: 20px; /* Padding inside the footer */
      padding-left: 80px;
      padding-right: 80px;
      margin-top: 10px;
    }

    footer p {
      font-size: 14px;
    }

    @media screen and (max-width: 800px) {
      .content {
        margin-left: 50px;
        margin-right: 50px;
      }

      .navbar-content {
        margin-left: 50px;
        margin-right: 50px;
      }

      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      }

      footer {
        padding-left: 50px;
        padding-right: 50px;
      }
    }

    @media screen and (max-width: 600px) {
      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    @media screen and (max-width: 500px) {
      .content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .navbar-content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .group-icon {
        display: none;
      }

      .recipe-list {
        grid-template-columns: 1fr;
      }

      footer {
        padding-left: 31px;
        padding-right: 31px;
      }
    }
  `;Qt([b({reflect:!0,type:Boolean})],Pe.prototype,"open",2);Pe=Qt([x("category-list")],Pe);var pr=Object.defineProperty,dr=Object.getOwnPropertyDescriptor,hr=(i,e,t,o)=>{for(var r=o>1?void 0:o?dr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&pr(e,t,r),r};let We=class extends m{render(){return h`
      <li class="recipe-container">
        <div @click = ${()=>f.go("/app/recipe/65ebef158361e8ce1926edd6")}>
          <div class="recipe-img-container">
           <slot name="image"></slot>
          </div>
          <h4><slot name="title"></slot></h4>
          <p><slot name="cuisine"></slot></p>
          <p><slot name="price"></slot></p>
        </div>
      </li>
    `}};We.styles=y`
    * {
      display: block;
      margin: 0;
      padding: 0;
    }

    .recipe-container h4 {
      font-size: 15px;
      font-weight: 550;
      color: var(--color-primary);
      font-family: "Montserrat", sans-serif;
    }

    li {
      list-style: none;
    }

    .recipe-container a {
      text-decoration: none;
    }

    .recipe-container p {
      font-size: 15px;
      font-weight: 300;
      color: var(--color-light-alt);
    }

    .recipe-container {
      margin-bottom: 50px;
      width: 100%;
      height: 100%;
      position: relative;
      // margin: 0;
      display: flex;
      align-items: stretch;
    }

    .recipe-container:hover {
      cursor: pointer;
    }

    .recipe-container h4 {
      margin-top: 10px;
    }

    .recipe-img-container {
      width: 100%;
      position: relative;
      display: flex;
      align-items: stretch;

      height: calc(100% - 100px);
    }

    .recipe-container img {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }

    ::slotted(img){
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  `;We=hr([x("recipe-card")],We);var ur=Object.defineProperty,gr=Object.getOwnPropertyDescriptor,Yt=(i,e,t,o)=>{for(var r=o>1?void 0:o?gr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&ur(e,t,r),r};let Ee=class extends m{constructor(){super(...arguments),this.sorted=!1,this.recipes=[{title:"Steak and Bordelaise Sauce",cuisine:"American",price:"$$$",image:"/images/steak.jpeg"},{title:"Beef Pho",cuisine:"Vietnamese",price:"$$",image:"/images/pho.jpeg"},{title:"Scalloped Potatoes",cuisine:"American",price:"$",image:"/images/potatoes.jpeg"},{title:"Lemon Garlic Chicken Pasta",cuisine:"American",price:"$",image:"/images/lemon-chicken.png"},{title:"Beef Pho",cuisine:"Vietnamese",price:"$$",image:"/images/pho.jpeg"}],this.sortedRecipes=[...this.recipes]}sortAlphabetically(){this.sorted?(this.sortedRecipes=this.sortedRecipes.sort((i,e)=>e.title.localeCompare(i.title)),this.sorted=!1):(this.sortedRecipes=this.sortedRecipes.sort((i,e)=>i.title.localeCompare(e.title)),this.sorted=!0),this.requestUpdate()}render(){return h`
      <div class="container">
        ${""}
        <ul class="recipe-list">
          ${this.sortedRecipes.map(i=>h`
            <recipe-card>
              <img slot="image" src="${i.image}" alt="${i.title}" />
              <span slot="title">${i.title}</span>
              <span slot="cuisine">${i.cuisine}</span>
              <span slot="price">${i.price}</span>
            </recipe-card>
          `)}
        </ul>
      </div>
    `}};Ee.styles=y`
    * {
      margin: 0;
      padding: 0;
      font-family: "Raleway", sans-serif;
    }

    :host {
      display: inline-block;
      position: relative;
    }

    .recipe-list {
      /* display: flex;
    justify-content: space-between; */

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      /* I want my rows to be the exact same height as my auto generated columns */
      grid-auto-rows: 1fr;

      gap: 20px;

      font-family: "Raleway", sans-serif;
      flex-wrap: wrap;
    }

    @media screen and (max-width: 800px) {
      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
      }
    }

    @media screen and (max-width: 600px) {
      .recipe-list {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    @media screen and (max-width: 500px) {
      .recipe-list {
        grid-template-columns: 1fr;
      }
    }
  `;Yt([b({reflect:!0,type:Boolean})],Ee.prototype,"sorted",2);Ee=Yt([x("recipe-grid")],Ee);var fr=Object.defineProperty,mr=Object.getOwnPropertyDescriptor,Zt=(i,e,t,o)=>{for(var r=o>1?void 0:o?mr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&fr(e,t,r),r};let Ae=class extends m{constructor(){super(...arguments),this.open=!1}render(){return h`
      <div>
  
        <category-list></category-list>
        <section class="trending">
          <h2>Trending Recipes</h2>

          <recipe-grid></recipe-grid>
        </section>

      </div>
    `}};Ae.styles=y`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .trending {
      margin-bottom: 20px;
    }

    .trending h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }
  `;Zt([b({reflect:!0,type:Boolean})],Ae.prototype,"open",2);Ae=Zt([x("trending-view")],Ae);const vr="http://localhost:3000/api";function ot(i){return`${vr}${i}`}const br="http://localhost:3000",xr="/api",Ke="JWT_AUTH_TOKEN",k=class k{constructor(){this.authenticated=!1,this.username="fellow_traveler",this.signOut=()=>{}}static deauthenticate(e){const t=new k;return console.log("Deauthenticating",e,k._theUser),e===k._theUser&&(localStorage.removeItem(Ke),k._theUser=t),console.log("Deauthenticated",k._theUser),t}};k._theUser=new k;let C=k;class N extends C{constructor(e,t){super();const r=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),n=decodeURIComponent(window.atob(r).split("").map(function(a){return"%"+("00"+a.charCodeAt(0).toString(16)).slice(-2)}).join("")),s=JSON.parse(n);console.log("Token payload",s),this.token=e,this.authenticated=!1;const c=Math.floor(Date.now()/1e3);s.exp&&s.exp<c?console.log("Token expired"):(console.log("Token not expired"),this.authenticated=!0,this.username=s.username,this.signOut=t),this.username=s.username,this.signOut=t}static authenticate(e,t){return C._theUser=new N(e,t),localStorage.setItem(Ke,e),C._theUser}static authenticateFromLocalStorage(e){const t=localStorage.getItem(Ke);return t?N.authenticate(t,e):C._theUser}}class Re{constructor(e){this._base=xr,this.json=e}base(e=""){return this._base=e,this}get(e){return fetch(this._url(e),{headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}post(e){return fetch(this._url(e),{method:"POST",headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}put(e){return fetch(this._url(e),{method:"PUT",headers:this._headers(),body:this.json&&JSON.stringify(this.json)}).then(t=>t.status===413?Promise.reject("Payload Too Large"):t.json()).catch(t=>Promise.reject(t))}_headers(){const e=this.json!==void 0,t=C._theUser.authenticated,o={"Content-Type":"application/json"};if(t){const n={Authorization:`Bearer ${C._theUser.token}`};return e?{...o,...n}:n}else return e?{...o}:void 0}_url(e){return`${br}${this._base}${e}`}}class kt extends Re{constructor(e){super(Object.fromEntries(e))}}class ei extends Re{constructor(){super(void 0)}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ti=class extends Event{constructor(e,t,o){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=t,this.subscribe=o??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Rt=class{constructor(e,t,o,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(n,s)=>{this.unsubscribe&&(this.unsubscribe!==s&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=n,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(n,s)),this.unsubscribe=s},this.host=e,t.context!==void 0){const n=t;this.context=n.context,this.callback=n.callback,this.subscribe=n.subscribe??!1}else this.context=t,this.callback=o,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new ti(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class yr{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const o=t||!Object.is(e,this.o);this.o=e,o&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:o}]of this.subscriptions)t(this.o,o)},e!==void 0&&(this.value=e)}addCallback(e,t,o){if(!o)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let _r=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}};class jt extends yr{constructor(e,t,o){var r,n;super(t.context!==void 0?t.initialValue:o),this.onContextRequest=s=>{const c=s.composedPath()[0];s.context===this.context&&c!==this.host&&(s.stopPropagation(),this.addCallback(s.callback,c,s.subscribe))},this.onProviderRequest=s=>{const c=s.composedPath()[0];if(s.context!==this.context||c===this.host)return;const a=new Set;for(const[l,{consumerHost:d}]of this.subscriptions)a.has(l)||(a.add(l),d.dispatchEvent(new ti(this.context,l,!0)));s.stopPropagation()},this.host=e,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),(n=(r=this.host).addController)==null||n.call(r,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new _r(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function wr({context:i}){return(e,t)=>{const o=new WeakMap;if(typeof t=="object")return t.addInitializer(function(){o.set(this,new jt(this,{context:i}))}),{get(){return e.get.call(this)},set(r){var n;return(n=o.get(this))==null||n.setValue(r),e.set.call(this,r)},init(r){var n;return(n=o.get(this))==null||n.setValue(r),r}};{e.constructor.addInitializer(s=>{o.set(s,new jt(s,{context:i}))});const r=Object.getOwnPropertyDescriptor(e,t);let n;if(r===void 0){const s=new WeakMap;n={get:function(){return s.get(this)},set:function(c){o.get(this).setValue(c),s.set(this,c)},configurable:!0,enumerable:!0}}else{const s=r.set;n={...r,set:function(c){o.get(this).setValue(c),s==null||s.call(this,c)}}}return void Object.defineProperty(e,t,n)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function je({context:i,subscribe:e}){return(t,o)=>{typeof o=="object"?o.addInitializer(function(){new Rt(this,{context:i,callback:r=>{this[o.name]=r},subscribe:e})}):t.constructor.addInitializer(r=>{new Rt(r,{context:i,callback:n=>{r[o]=n},subscribe:e})})}}var $r=Object.defineProperty,Pr=Object.getOwnPropertyDescriptor,Ue=(i,e,t,o)=>{for(var r=o>1?void 0:o?Pr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&$r(e,t,r),r};let ge="auth",le=class extends m{constructor(){super(...arguments),this.loginStatus=0,this.registerStatus=0,this.user=N.authenticateFromLocalStorage(()=>this._signOut())}isAuthenticated(){return this.user.authenticated}render(){return h`${h`<slot .user=${this.user}></slot>`}`}_handleLogin(i){i.preventDefault();const e=i.target,t=new FormData(e);new kt(t).base().post("/api/login").then(r=>{if(r.status===200)return r.json();this.loginStatus=r.status}).then(r=>{r&&(console.log("Authentication:",r.token),this.user=N.authenticate(r.token,()=>this._signOut()),this.requestUpdate())})}_handleRegister(i){i.preventDefault();const e=i.target,t=new FormData(e);new kt(t).base().post("/signup").then(r=>{if(r.status===200)return r.json();this.registerStatus=r.status}).then(r=>{console.log("Registration:",r)})}_signOut(){this.user=C.deauthenticate(this.user),document.location.reload()}};Ue([P()],le.prototype,"loginStatus",2);Ue([P()],le.prototype,"registerStatus",2);Ue([wr({context:ge}),P()],le.prototype,"user",2);le=Ue([x("auth-required")],le);var Er=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,I=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ar(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Er(e,t,r),r};let T=class extends m{constructor(){super(...arguments),this.path="",this.pictureUploadFailed=!1,this.errorMessage="",this.editName=!1,this.editUsername=!1,this.editEmail=!1,this.editPhone=!1,this.editPicture=!1}render(){var i,e,t,o,r,n,s,c,a,l;return h`
      <div class="profile-content">
        <div class="profile-header">
          <h4>Account > Personal Info</h4>
          <h2>Personal Info</h2>
        </div>

        <div class="pi-all">
          <div class="pi-container">
            <div class="pi-block">
              <div class="pi-header">
                <h5>Full Name</h5>
                <h4 @click="${()=>this.toggleEditMode(0)}">Edit</h4>
              </div>
              <div class="pi-content">
                ${this.editName?h`<input
                      class="edit-input"
                      type="text"
                      value="${(i=this.profile)==null?void 0:i.name}"
                      @change="${d=>this.handleFormChange(0,d)}"
                    />`:h`<p>${(e=this.profile)==null?void 0:e.name}</p>`}
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Username</h5>
                <h4 @click="${()=>console.log(window.location.origin)}">
                  Edit
                </h4>
              </div>
              <div class="pi-content">
                ${this.editUsername?h`<input
                      class="edit-input"
                      type="text"
                      value="${(t=this.profile)==null?void 0:t.userid}"
                      @change="${d=>this.handleFormChange(1,d)}"
                    />`:h`<p>${(o=this.profile)==null?void 0:o.userid}</p>`}
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Email Address</h5>
                <h4 @click="${()=>this.toggleEditMode(2)}">Edit</h4>
              </div>
              <div class="pi-content">
                ${this.editEmail?h`<input
                      class="edit-input"
                      type="text"
                      value="${(r=this.profile)==null?void 0:r.email}"
                      @change="${d=>this.handleFormChange(2,d)}"
                    />`:h`<p>${(n=this.profile)==null?void 0:n.email}</p>`}
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Phone Number</h5>
                <h4 @click="${()=>this.toggleEditMode(3)}">Edit</h4>
              </div>
              <div class="pi-content">
                ${this.editPhone?h`<input
                      class="edit-input"
                      type="text"
                      value="${(s=this.profile)==null?void 0:s.phone}"
                      @change="${d=>this.handleFormChange(3,d)}"
                    />`:h`<p>
                      ${((c=this.profile)==null?void 0:c.phone)==null||this.profile.phone===""?"Add Phone":this.profile.phone}
                    </p>`}
              </div>
            </div>
          </div>

          <div class="pi-img">
            ${(a=this.profile)!=null&&a.picture?h`<img
                  src="${(l=this.profile)==null?void 0:l.picture}"
                  alt="Profile"
                  draggable="false"
                  @click="${()=>this.toggleEditMode(4)}"
                />`:h` <img
                  src="/images/empty-pfp.png"
                  alt="Profile"
                  draggable="false"
                  @click="${()=>this.toggleEditMode(4)}"
                />`}

            <p class = "upload" @click="${()=>this.toggleEditMode(4)}">Replace</p>

            ${this.pictureUploadFailed?h`<p class="error">Upload failed: ${this.errorMessage}</p>`:h``}
          </div>
        </div>
      </div>
    `}toggleEditMode(i){var e;if(i===0&&(this.editUsername=!1,this.editEmail=!1,this.editPhone=!1,this.editPicture=!1),i===1&&(this.editName=!1,this.editEmail=!1,this.editPhone=!1,this.editPicture=!1),i===2&&(this.editName=!1,this.editUsername=!1,this.editPhone=!1,this.editPicture=!1),i===3&&(this.editName=!1,this.editUsername=!1,this.editEmail=!1,this.editPicture=!1),i===4){this.oldPicture=(e=this.profile)==null?void 0:e.picture;const t=document.createElement("input");t.type="file",t.accept="image/*",t.addEventListener("change",o=>{const n=o.target.files[0];new Promise((c,a)=>{const l=new FileReader;l.onload=()=>c(l.result),l.onerror=d=>a(d),l.readAsDataURL(n)}).then(c=>{this.avatar=c,this.profile.picture=c,this.updateProfile()})}),t.click()}i===0?this.editName=!this.editName:i===1?this.editUsername=!this.editUsername:i===2?this.editEmail=!this.editEmail:i===3?this.editPhone=!this.editPhone:i===4&&(this.editPicture=!this.editPicture),this.requestUpdate()}updateProfile(){var t,o,r,n,s,c,a,l,d;let i={};this.avatar!==void 0?i={name:(t=this.profile)==null?void 0:t.name,userid:(o=this.profile)==null?void 0:o.userid,email:(r=this.profile)==null?void 0:r.email,phone:(n=this.profile)==null?void 0:n.phone,picture:(s=this.profile)==null?void 0:s.picture}:i={name:(c=this.profile)==null?void 0:c.name,userid:(a=this.profile)==null?void 0:a.userid,email:(l=this.profile)==null?void 0:l.email,phone:(d=this.profile)==null?void 0:d.phone},new Re(i).put(this.path).then(p=>p.status===200?p.json():null).then(p=>{p&&(console.log("PUT request successful:",p),this.profile=p,this.pictureUploadFailed=!1,this.errorMessage="")}).catch(p=>{this.profile.picture=this.oldPicture??"",this.requestUpdate(),this.pictureUploadFailed=!0,this.errorMessage=p,setTimeout(()=>{this.pictureUploadFailed=!1,this.errorMessage=""},3e3),console.log("Failed to POST form data",p)})}handleFormChange(i,e){const t=e.target.value;i===0&&(this.profile.name=t),i===1&&(this.profile.userid=t),i===2&&(this.profile.email=t),i===3&&(this.profile.phone=t),this.updateProfile(),this.toggleEditMode(i),i===0&&alert("Name changed"),i===1&&alert("User id changed"),i===2&&alert("Email changed"),i===3&&alert("Phone number changed")}_fetchData(i){fetch(ot(i),{method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(e=>e.status===200?e.json():(console.log("Error fetching data",e),null)).then(e=>{e&&(this.profile=e)}).catch(e=>{console.log("Error fetching data",e)})}_getData(i){new ei().get(i).then(t=>t.status===200?t.json():null).then(t=>{this.profile=t}).catch(t=>{console.log("Error fetching data",t)})}async connectedCallback(){if(super.connectedCallback(),this.requestUpdate(),await new Promise(i=>{const e=()=>{this.user!==void 0&&this.user!==null?i():setTimeout(e,100)};e()}),this.user&&this.user.authenticated===!1){console.log(this.user),f.go("/app/login");return}if(this.location){const i=this.location.pathname.split("/"),e=i.indexOf("profile")+1,t=i[e];this.path=`/profiles/${t}`}this.path&&(console.log("Fetching data from",this.path),this._getData(this.path))}attributeChangedCallback(i,e,t){i==="path"&&e!==t&&e&&this._getData(t),super.attributeChangedCallback(i,e,t)}};T.styles=y`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    

    .edit-input {
      margin-top: 10px;
      padding: 5px;
    }

    .profile-content {
      margin-top: 100px;
      margin-left: 80px;
      margin-right: 80px;
      padding-bottom: 80px;
    }

    .profile-header {
      margin-top: 120px;
      color: var(--color-primary);
    }

    .profile-tabs {
      margin-top: 40px;
      display: grid;

      grid-template-columns: 1fr 1fr 1fr;

      gap: 20px;
    }

    .profile-tabs a {
      /*add drop shadow */
      box-shadow: 0px 5px 5px var(--color-card-highlight);
      padding: 20px;
      text-decoration: none;
      background-color: var(--color-card-bg);
    }

    .profile-tabs h3 {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      background-color: inherit;
    }

    .profile-tabs p {
      margin-top: 15px;
      font-size: 14px;
      font-weight: 300;
      color: var(--color-light-alt);
      background-color: inherit;
    }

    .profile-tabs img {
      width: 40px;
      margin-bottom: 10px;
      background-color: inherit;
    }

    @media screen and (max-width: 988px) {
      .profile-tabs {
        grid-template-columns: 1fr;
      }
      .profile-content {
        margin: 0;
      }
    }

    .profile-header h4 {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 20px;
    }

    .pi-all {
      display: grid;
      margin-top: 60px;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .pi-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .pi-header h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary);
      text-decoration: underline;
    }

    .pi-header h4:hover {
      cursor: pointer;
    }

    .pi-header h5 {
      font-size: 16px;
      font-weight: 400;
      color: var(--color-primary);
    }

    .pi-content p {
      margin-top: 7px;
      font-size: 15px;
      font-weight: 300;
      color: var(--color-light-alt);
    }

    .pi-block {
      border-bottom: 1px solid var(--color-light);
      padding: 20px 0px 20px 0px;
    }

    .pi-img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
    }

    .upload {
      text-decoration: underline;
      color: var(--color-primary);
    }

    .pi-img p:hover {
      cursor: pointer;
    }

    .pi-img img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 100%;
    }

    .pi-img img:hover {
      cursor: pointer;
      opacity: 70%;
    }

    .error{
      color: red;
      text-decoration: none;
    }

    @media screen and (max-width: 988px) {
      .pi-all {
        grid-template-columns: 1fr;
        gap: 50px;

        /* reverse direction for grid*/
        grid-template-rows: 1fr 1fr;
      }

      .pi-img {
        grid-row: 1;
        grid-column: 1;
      }
    }
  `;I([b({attribute:!1})],T.prototype,"location",2);I([b()],T.prototype,"path",2);I([P()],T.prototype,"profile",2);I([je({context:ge,subscribe:!0}),b({attribute:!1})],T.prototype,"user",2);I([P()],T.prototype,"avatar",2);I([P()],T.prototype,"oldPicture",2);I([P()],T.prototype,"pictureUploadFailed",2);T=I([x("user-profile")],T);var Or=Object.defineProperty,Cr=Object.getOwnPropertyDescriptor,ii=(i,e,t,o)=>{for(var r=o>1?void 0:o?Cr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Or(e,t,r),r};let Oe=class extends m{render(){var i;return h`
      <div class="profile-content">
        <div class="profile-header">
          <h2>Account</h2>
          <div class="inline">
            ${(i=this.user)!=null&&i.username?h`<p>${this.user.username}</p>`:h``}
            <p>· Go to</p>
            <p class="link" @click=${()=>f.go("/app/user/1")}>Profile</p>
          </div>
        </div>

        <div class="profile-tabs">
          <div @click=${()=>{var e;return f.go("/app/profile/"+((e=this.user)==null?void 0:e.username))}}>
            <img src="/icons/profile.svg" alt="profile-icon" />
            <h3>Personal Info</h3>
            <p>Personal Details and Account information</p>
          </div>
          <div @click=${()=>f.go("/app/groups")}>
            <img src="/images/groups.png" alt="groups-icon" />
            <h3>Groups</h3>
            <p>Find and create groups</p>
          </div>
          <div @click=${()=>f.go("/app/my-recipes")}>
            <img src="/icons/notes.svg" alt="recipe-icon" />
            <h3>My Recipes</h3>
            <p>View your recipes of your own creation</p>
          </div>
        </div>
      </div>
    `}};Oe.styles=[y`
      * {
        font-family: "Raleway", sans-serif;
        padding: 0;
        margin: 0;
        background-color: var(--color-main-bg);
      }

      .inline {
        margin-top: 10px;
        display: flex;
        gap: 5px;
      }

      .profile-content {
        margin-top: 100px;
        margin-left: 80px;
        margin-right: 80px;
      }

      .profile-header {
        margin-top: 120px;
        color: var(--color-primary);
      }

      .profile-tabs {
        margin-top: 40px;
        display: grid;

        grid-template-columns: 1fr 1fr 1fr;

        gap: 20px;
      }

      .profile-tabs a {
        /*add drop shadow */
        box-shadow: 0px 5px 5px var(--color-card-highlight);
        padding: 20px;
        text-decoration: none;
        background-color: var(--color-card-bg);
      }

      .profile-tabs h3 {
        font-size: 15px;
        font-weight: 600;
        color: #333;
        background-color: inherit;
      }

      .profile-tabs p {
        margin-top: 15px;
        font-size: 14px;
        font-weight: 300;
        color: var(--color-light-alt);
        background-color: inherit;
      }

      .profile-tabs img {
        width: 40px;
        margin-bottom: 10px;
        background-color: inherit;
      }

      @media screen and (max-width: 988px) {
        .profile-tabs {
          grid-template-columns: 1fr;
        }
        .profile-content {
          margin: 0;
        }
      }

      .profile-tabs div {
        /*add drop shadow */
        box-shadow: 0px 5px 5px var(--color-card-highlight);
        padding: 20px;
        text-decoration: none;
        background-color: var(--color-card-bg);
      }

      .profile-tabs div:hover {
        cursor: pointer;
      }

      .link {
        text-decoration: underline;
      }

      .link:hover {
        cursor: pointer;
      }
    `];ii([je({context:ge,subscribe:!0}),b({attribute:!1})],Oe.prototype,"user",2);Oe=ii([x("account-view")],Oe);var Sr=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,kr=(i,e,t,o)=>{for(var r=o>1?void 0:o?Tr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Sr(e,t,r),r};let Ge=class extends m{render(){return h`
      <div class="profile-content">
        <div class="groups-page">
          <section class="find-group">
            <h2>Find Groups</h2>

            <form action="">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Search for groups"
              />
            </form>
            <button class="search-btn">Search</button>
          </section>

          <section class="my-groups">
            <h2>My Groups</h2>
            <div>
              <ul>
                <li>
                  <a>Group 1</a>
                </li>
                <li>
                  <a>Group 2</a>
                </li>
                <li>
                  <a>Group 3</a>
                </li>
              </ul>
            </div>
            <button onclick="alert('New group created')">
              <p>Create New Group</p>
            </button>
          </section>
        </div>
      </div>
    `}};Ge.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .profile-content {
      margin-top: 100px;
      margin-left: 80px;
      margin-right: 80px;
    }

    .groups-page {
      margin-top: 130px;
      margin-bottom: 130px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 50px;
    }

    .find-group form {
      margin-top: 20px;
    }

    .find-group input {
      padding-top: 14px;
      padding-bottom: 14px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 16px;
      width: calc(100% - 20px);
      max-width: 800px;
      border-radius: 10px;
      border: 1px solid var(--color-light);
    }

    .find-group h2 {
      color: var(--color-primary);
    }

    .find-group button {
      margin-top: 20px;
      padding: 14px;
      border-radius: 4px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 16px;
      font-weight: 600;
    }

    .find-group button:hover {
      cursor: pointer;
      background-color: rgb(212, 126, 7);
    }

    .my-groups {
      margin-top: 20px;
      max-width: 800px;
    }

    .my-groups h2 {
      color: var(--color-primary);
      margin-bottom: 20px;
    }

    .my-groups li {
      /* margin-top: 20px; */
      list-style: none;
      /* margin-bottom: 20px; */
      /* padding: 30px; */
      /* box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1); */
    }

    .my-groups p {
      background-color: inherit;
    }

    .my-groups li a {
      display: block;
      padding: 30px;

      text-decoration: none;
      color: var(--color-primary);
      width: calc(100% - 60px);
      height: 100%;
      margin-bottom: 20px;
      border-bottom: 1px solid #d6d5d5;
    }

    .my-groups li a:hover {
      cursor: pointer;
      box-shadow: 0px 5px 5px var(--color-card-highlight);
    }

    .my-groups button {
      padding: 14px;
      border-radius: 4px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 16px;
      font-weight: 600;
    }

    .my-groups button:hover {
      cursor: pointer;
      background-color: rgb(212, 126, 7);
    }

    @media screen and (max-width: 988px) {
      .profile-tabs {
        grid-template-columns: 1fr;
      }
      .profile-content {
        margin: 0;
      }
    }
  `;Ge=kr([x("group-view")],Ge);var Rr=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,Ur=(i,e,t,o)=>{for(var r=o>1?void 0:o?jr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Rr(e,t,r),r};let Je=class extends m{render(){return h`
      <section class="my-recipes">
        <h2>My Recipes</h2>

        <recipe-grid></recipe-grid>
      </section>
    `}};Je.styles=y`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .my-recipes {
      margin-top: 120px;
    }

    .my-recipes h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }
  `;Je=Ur([x("user-recipes")],Je);var Dr=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,nt=(i,e,t,o)=>{for(var r=o>1?void 0:o?Nr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Dr(e,t,r),r};let pe=class extends m{constructor(){super(...arguments),this.activeTab=0}changeTab(i){this.activeTab=i}renderDirections(){var i;return h`
      <div class="card-directions">

        ${(i=this.recipe)==null?void 0:i.directions.map((e,t)=>h`
          <h4>Step ${t+1}</h4>  
          <p>${e}</p>`)}  
          
        

      </div>
    `}renderIngredients(){var i;return h`
      <div class="card-ingredients">
        <h4>Ingredients</h4>

        ${(i=this.recipe)==null?void 0:i.ingredients.map(e=>h`
          <p>${e}</p>`)}
     
      </div>
    `}renderTools(){var i;return h`
      <div class="card-tools">
        <h4>Tools</h4>
        
        ${(i=this.recipe)==null?void 0:i.tools.map(e=>h`
          <p>${e}</p>`)}
      </div>
    `}_getData(i){new ei().get(i).then(t=>t.status===200?t.json():null).then(t=>{this.recipe=t,console.log(this.recipe),this.requestUpdate()}).catch(t=>{console.log("Error fetching data",t)})}connectedCallback(){var t;super.connectedCallback(),window.scrollTo(0,0);const e=`/recipes/${(t=this.location)==null?void 0:t.params.recipeid}`;this._getData(e)}attributeChangedCallback(i,e,t){i==="path"&&e!==t&&e&&this._getData(t),super.attributeChangedCallback(i,e,t)}render(){var i,e,t,o;return h`
      <div>
        <section class="recipe-content">
          <h2>${(i=this.recipe)==null?void 0:i.name}</h2>

          <div class="recipe-stats">
            <div class="time-stat">
              <img src="/icons/alarm.svg" alt="heart" width="20px" />
              <p>${((e=this.recipe)==null?void 0:e.time)+" minutes"}</p>
            </div>

            <div class="cost-stat">
              <img src="/icons/money.svg" alt="money" width="25px" />
              <p>${"$"+((t=this.recipe)==null?void 0:t.cost)}</p>
            </div>
          </div>
          <div class="tags-container">
            <div class="tag-title">
              <img src="/icons/tag.svg" alt="tag icon" width="25px" />
              <h5>Tags:</h5>
            </div>

            <div class="tags">
            ${(o=this.recipe)==null?void 0:o.tags.map(r=>h`<p>${r}</p>`)}
            </div>
          </div>
          <div class="recipe-intro">
            <div class="recipe-card">
              <div class="card-categories">
                <p
                  id="${this.activeTab===0?"selected-tab":""}"
                  @click=${()=>this.changeTab(0)}
                >
                  Directions
                </p>
                <p
                  id="${this.activeTab===1?"selected-tab":""}"
                  @click=${()=>this.changeTab(1)}
                >
                  Ingredients
                </p>
                <p
                  id="${this.activeTab===2?"selected-tab":""}"
                  @click=${()=>this.changeTab(2)}
                >
                  Tools
                </p>
              </div>
              <div class="card-content-container">
                <div class="card-content">
                  ${this.activeTab===0?this.renderDirections():h``}
                  ${this.activeTab===1?this.renderIngredients():h``}
                  ${this.activeTab===2?this.renderTools():h``}
                </div>
              </div>
            </div>

            <div class="recipe-images">
              <img src="/images/steak.jpeg" alt="Recipe Image" />
            </div>
          </div>
        </section>

      </div>
    `}};pe.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .recipe-content h2 {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      font-size: 26px;
      padding-top: 20px;
      padding-bottom: 10px;
      color: var(--color-primary);
    }

    .rating-container {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }

    .rating-container svg {
      width: 24px;
      height: 24px;
      fill: rgb(255, 102, 0);
    }

    .recipe-stats {
      display: inline-block;
      display: flex;
      gap: 10px;
    }

    .recipe-stats img {
      background-color: inherit;
    }

    .recipe-stats p {
      font-size: 15px;
      font-weight: 300;
      color: #333;
      background-color: inherit;
    }

    .time-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(255, 255, 204);

      padding: 7px;
      justify-content: center;
    }

    .cost-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(193, 245, 193);

      padding: 7px;
      justify-content: center;
    }

    .tags-container {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .tag-title {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      /* border: 1px solid rgb(255, 204, 204); */
      padding: 7px;
    }

    .tag-title h5 {
      font-size: 15px;
      font-weight: 600;
      color: var(--color-primary);
    }

    .tags {
      display: flex;
      gap: 15px;
      align-items: center;
      justify-content: center;
      overflow-x: scroll;
    }

    .tags p {
      font-size: 15px;
      font-weight: 400;
      color: var(--color-primary);
      padding: 7px;
      border-radius: 3px;
      background-color: rgb(242, 241, 241);
    }

    .tags p:hover {
      cursor: pointer;
      background-color: rgb(27, 33, 100);
      color: white;
    }

    .heart-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(255, 204, 204);
      padding: 7px;
      justify-content: center;
    }

    .recipe-intro {
      margin-top: 15px;
      display: grid;
      grid-template-columns: 5fr 4fr;
      margin-bottom: 20px;
      grid-template-rows: 100%;
      gap: 20px;
    }

    .recipe-card {
      border: 1px solid var(--color-light);
      border-radius: 10px;
      height: 70vh;
      box-sizing: border-box;
    }

    .recipe-images {
      width: 100%;
      height: 70vh;
    }

    .recipe-intro img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }

    /* tab containers */
    .card-categories {
      display: flex;
      align-items: center;
      gap: 10px;

      background-color: rgb(242, 242, 242);
      border-radius: 8px 8px 0px 0px;
      /* border-bottom: 1px solid var(--color-light); */
      padding-left: 10px;
      padding-top: 10px;
    }

    /* tab elements */
    .card-categories p {
      display: flex;
      justify-content: center;
      font-size: 17px;
      font-weight: 600;
      color: #333;
      padding: 12px;
      background-color: rgb(255, 255, 255);
      /* make the radius 8px only on the top corners */
      border-radius: 8px 8px 0px 0px;
      margin-right: 10px;
      width: 100px;
    }

    .card-categories p:hover {
      cursor: pointer;
    }

    .card-categories #selected-tab {
      background-color: var(--color-primary-orange);
      color: white;
    }

    .card-content-container {
      height: calc(100% - 54px);
      border-radius: 0px 0px 8px 8px;
      background-color: rgb(242, 242, 242);
    }

    .card-content {
      margin-left: 10px;
      margin-right: 10px;
      border-top: 2px solid var(--color-primary-orange);
      height: calc(100% - 35px);
      border-radius: 0px 0px 8px 8px;
      padding: 10px;
      padding-top: 15px;
      background-color: white;
      overflow-y: scroll;
    }

    .card-directions {
      background-color: inherit;
    }

    .card-directions h4 {
      font-size: 20px;
      font-weight: 600;
      background-color: inherit;
      margin-bottom: 5px;
    }

    .card-directions p {
      font-size: 16px;
      font-weight: 400;
      color: #181818;
      margin-bottom: 28px;
      background-color: inherit;
    }

    @media screen and (max-width: 1000px) {
      .recipe-intro {
        display: flex;
        flex-direction: column-reverse;
      }

      .recipe-images {
        height: 30vh;
      }
    }

    @media screen and (max-width: 500px) {
      /* make recipe category smaller */
      .card-categories p {
        font-size: 12px;
        padding: 5px;
        margin-right: 5px;
        width: 80px;
      }

      /* make the recipe-instructions text smaller */
      .card-directions h4 {
        font-size: 18px;
      }

      .card-directions p {
        font-size: 16px;
      }

      .card-content-container {
        height: calc(100% - 34px);
      }
    }

    .review-content {
      margin-top: 30px;
    }

    .review-content h3 {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 10px;
    }

    .review-stat {
      height: 150px;
      border-bottom: 1px solid var(--color-light);
    }
  `;nt([b({attribute:!1})],pe.prototype,"location",2);nt([P()],pe.prototype,"activeTab",2);pe=nt([x("recipe-view")],pe);var zr=Object.defineProperty,Ir=Object.getOwnPropertyDescriptor,Mr=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ir(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&zr(e,t,r),r};let Xe=class extends m{render(){return h`
      <div class="profile-content">
        <div class="profile-header">
          <h2>Settings</h2>
        </div>

        <div class="pi-all">
          <div class="pi-container">
            <div class="pi-block">
              <div class="pi-header">
                <h5>Appearance</h5>
              </div>
              <div class="pi-content">
                <toggle-switch></toggle-switch>
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Font Size</h5>
                <h4>Edit</h4>
              </div>
              <div class="pi-content">
                <p>Medium</p>
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Delete Account</h5>
                <h4>Edit</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};Xe.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }
    .profile-content {
      margin-top: 100px;
      margin-left: 80px;
      margin-right: 80px;
    }

    .profile-header {
      margin-top: 120px;
      color: var(--color-primary);
    }

    .profile-header h4 {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 20px;
    }

    .pi-all {
      display: grid;
      margin-top: 60px;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .pi-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .pi-header h4 {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-primary);
      text-decoration: underline;
    }

    .pi-header h4:hover {
      cursor: pointer;
    }

    .pi-header h5 {
      font-size: 16px;
      font-weight: 400;
      color: var(--color-primary);
    }

    .pi-content p {
      margin-top: 7px;
      font-size: 15px;
      font-weight: 300;
      color: var(--color-light-alt);
    }

    .pi-block {
      border-bottom: 1px solid var(--color-light);
      padding: 20px 0px 20px 0px;
    }

    .pi-img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 20px;
    }

    .pi-img p {
      text-decoration: underline;
      color: var(--color-primary);
    }

    .pi-img p:hover {
      cursor: pointer;
    }

    .pi-img img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 100%;
    }

    .pi-img img:hover {
      cursor: pointer;
      opacity: 70%;
    }

    @media screen and (max-width: 988px) {
      .pi-all {
        grid-template-columns: 1fr;
        gap: 50px;

        /* reverse direction for grid*/
        grid-template-rows: 1fr 1fr;
      }

      .pi-img {
        grid-row: 1;
        grid-column: 1;
      }
    }

    @media screen and (max-width: 988px) {
      .profile-tabs {
        grid-template-columns: 1fr;
      }
      .profile-content {
        margin: 0;
      }
    }
  `;Xe=Mr([x("setting-view")],Xe);var Lr=Object.defineProperty,Hr=Object.getOwnPropertyDescriptor,qr=(i,e,t,o)=>{for(var r=o>1?void 0:o?Hr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Lr(e,t,r),r};let Qe=class extends m{render(){return h`
      <div>
        <category-list></category-list>
        <section class="trending">
          <h2>Category Name</h2>

          <recipe-grid></recipe-grid>
        </section>
      </div>
    `}};Qe.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .trending {
      margin-bottom: 20px;
    }
    
    .trending h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }
    
  `;Qe=qr([x("category-view")],Qe);var Fr=Object.defineProperty,Br=Object.getOwnPropertyDescriptor,De=(i,e,t,o)=>{for(var r=o>1?void 0:o?Br(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Fr(e,t,r),r};let Y=class extends m{constructor(){super(...arguments),this.activeTab=0,this.path="/recipes",this.recipeCost=null,this.recipeTime=null,this.steps=[],this.ingredients=[],this.tools=[],this.recipeTitle="",this.editTitle=!0,this.editTime=!1,this.editCost=!1,this.picture=null}changeTab(i){this.activeTab=i}_addSteps(i){const e=i.target,t=e.value;t&&(this.steps.push(t),e.value="",this.requestUpdate())}_addIngredients(i){const e=i.target,t=e.value;t&&(this.ingredients.push(t),e.value="",this.requestUpdate())}_addTools(i){const e=i.target,t=e.value;t&&(this.tools.push(t),e.value="",this.requestUpdate())}renderDirections(){return h`<div class="card-directions">
      ${this.steps.map((i,e)=>h`
          <h4>Step ${e+1}</h4>
          <p>${i}</p>
        `)}

      <div class="directions-input">
        <h4>Step ${this.steps.length+1}</h4>
        <input
          type="text"
          name="directions"
          placeholder="Add Directions"
          @change=${i=>this._addSteps(i)}
        />
        <button @click=${this._addSteps}>Submit</button>
      </div>

      <div class="add-directions"></div>
    </div>`}renderIngredients(){return h`<div class="card-directions">
      ${this.ingredients.map((i,e)=>h`
          <h4>Ingredient ${e+1}</h4>
          <p>${i}</p>
        `)}

      <div class="directions-input">
        <h4>Ingredient ${this.ingredients.length+1}</h4>
        <input
          type="text"
          name="ingredients"
          placeholder="Add Ingredients"
          @change=${i=>this._addIngredients(i)}
        />
        <button @click=${this._addIngredients}>Submit</button>
      </div>

      <div class="add-directions"></div>
    </div>`}renderTools(){return h`<div class="card-directions">
      ${this.tools.map((i,e)=>h`
          <h4>Tool ${e+1}</h4>
          <p>${i}</p>
        `)}

      <div class="directions-input">
        <h4>Tool ${this.tools.length+1}</h4>
        <input
          type="text"
          name="tools"
          placeholder="Add Tools"
          @change=${i=>this._addTools(i)}
        />
        <button @click=${this._addTools}>Submit</button>
      </div>

      <div class="add-directions"></div>
    </div>`}_handleSubmit(){var t,o;if(!((t=this.user)!=null&&t.authenticated)){console.log("User is not authenticated");return}const i={name:this.recipeTitle,cost:this.recipeCost,time:this.recipeTime,directions:this.steps,ingredients:this.ingredients,tools:this.tools,picture:this.picture||"",userid:(o=this.user)==null?void 0:o.username};console.log(i),new Re(i).post(this.path).then(r=>r.json()).then(r=>{console.log(r._id)}).catch(r=>{console.error(r)})}handleEditTitle(){this.editTitle=!this.editTitle,this.requestUpdate()}handleTitleChange(i){const t=i.target.value;this.recipeTitle=t,this.handleEditTitle()}handleTimeChange(i){const t=i.target.value;isNaN(parseInt(t))||(this.recipeTime=parseInt(t),this.handleEditTime())}handleCostChange(i){const t=i.target.value;isNaN(parseInt(t))||(this.recipeCost=parseInt(t),this.handleEditCost())}handleImageUpload(){console.log("Image Upload");const i=document.createElement("input");i.type="file",i.accept="image/*",i.addEventListener("change",e=>{const o=e.target.files[0];new Promise((n,s)=>{const c=new FileReader;c.onload=()=>n(c.result),c.onerror=a=>s(a),c.readAsDataURL(o)}).then(n=>{this.picture=n,this.requestUpdate()})}),i.click()}handleEditTime(){this.editTime=!this.editTime,this.requestUpdate()}handleEditCost(){this.editCost=!this.editCost,this.requestUpdate()}render(){return h`<section class="recipe-content">
      <div class="space-between">
        <div class="create-class">
          ${this.editTitle?h`<input
                class="title-input"
                type="text"
                name="title"
                placeholder="Recipe Title"
                @change=${i=>this.handleTitleChange(i)}
              />`:h`<h2 @click=${this.handleEditTitle}>${this.recipeTitle}</h2>`}
          <img
            @click=${this.handleEditTitle}
            src="/icons/edit.svg"
            alt="edit-icon"
          />
        </div>

        <div class="post-container">
          <button class="save-button" @click=${this._handleSubmit}>
            <h3>Post</h3>
          </button>
        </div>
      </div>

      <div class="recipe-stats">
        <div class="time-stat">
          <img
            @click=${this.handleEditTime}
            src="/icons/alarm.svg"
            alt="heart"
            width="20px"
          />
          ${this.editTime?h`<input class="time-cost-buttons" type="text" @change=${i=>this.handleTimeChange(i)} />`:h`<p @click=${this.handleEditTime}>${this.recipeTime?this.recipeTime+" minutes":h`Add Time`}</p>`}
        </div>

        <div class="cost-stat">
          <img
            @click=${this.handleEditCost}
            src="/icons/money.svg"
            alt="money"
            width="25px"
          />
          ${this.editCost?h`<input
                class="time-cost-buttons"
                type="text"
                @change=${i=>this.handleCostChange(i)}
              />`:h`<p @click=${this.handleEditCost}>${this.recipeCost?"$"+this.recipeCost:h`Add Cost`}</p>`}
        </div>
      </div>
      <div class="tags-container">
        <div class="tag-title">
          <img src="/icons/tag.svg" alt="tag icon" width="25px" />
          <h5>Tags:</h5>
          <div class="tag-input">
            <input type="text" name="tags" placeholder="Add Tags" />
          </div>
        </div>
      </div>
      <div class="recipe-intro">
        <div class="recipe-card">
          <div class="card-categories">
            <p
              id="${this.activeTab===0?"selected-tab":""}"
              @click=${()=>this.changeTab(0)}
            >
              Directions
            </p>
            <p
              id="${this.activeTab===1?"selected-tab":""}"
              @click=${()=>this.changeTab(1)}
            >
              Ingredients
            </p>
            <p
              id="${this.activeTab===2?"selected-tab":""}"
              @click=${()=>this.changeTab(2)}
            >
              Tools
            </p>
          </div>
          <div class="card-content-container">
            <div class="card-content">
              ${this.activeTab===0?this.renderDirections():this.activeTab===1?this.renderIngredients():this.renderTools()}
            </div>
          </div>
        </div>

        <div
          @click=${this.handleImageUpload}
          class=${this.picture===null?"edit-recipe-image":"uploaded-image"}
        >
          ${this.picture?h`<img src="${this.picture}" alt="Recipe Image" />`:h`<img src="/images/add-image.png" alt="Recipe Image" />`}
        </div>
      </div>
    </section>`}};Y.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .time-cost-buttons {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid var(--color-light);
      width: 55px;
    }

    .uploaded-image {
      cursor: pointer;
      border: none:
    }

    .uploaded-image:hover {
      opacity: 70%;
    }

    .title-input {
      padding: 10px;
      border: 1px solid var(--color-light);
      border-radius: 5px;
      font-size: 20px;
      font-weight: 600;
    }

    button {
      cursor: pointer;
    }
    .recipe-content {
      padding-bottom: 40px;
    }

    .recipe-content h2 {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      font-size: 26px;
      padding-top: 20px;
      padding-bottom: 20px;
      color: var(--color-primary);
    }

    .rating-container {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }

    .rating-container svg {
      width: 24px;
      height: 24px;
      fill: rgb(255, 102, 0);
    }

    .recipe-stats {
      display: inline-block;
      display: flex;
      gap: 10px;
    }

    .recipe-stats img {
      background-color: inherit;
    }

    .recipe-stats p {
      font-size: 15px;
      font-weight: 300;
      color: #333;
      background-color: inherit;
    }

    .time-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(255, 255, 204);

      padding: 7px;
      justify-content: center;
    }

    .cost-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(193, 245, 193);

      padding: 7px;
      justify-content: center;
    }

    .tags-container {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .tag-title {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      /* border: 1px solid rgb(255, 204, 204); */
      padding: 7px;
    }

    .tag-title h5 {
      font-size: 15px;
      font-weight: 600;
      color: var(--color-primary);
    }

    .tags {
      display: flex;
      gap: 15px;
      align-items: center;
      justify-content: center;
      overflow-x: scroll;
    }

    .tags p {
      font-size: 15px;
      font-weight: 400;
      color: var(--color-primary);
      padding: 7px;
      border-radius: 3px;
      background-color: rgb(242, 241, 241);
    }

    .tags p:hover {
      cursor: pointer;
      background-color: rgb(27, 33, 100);
      color: white;
    }

    .heart-stat {
      display: flex;
      align-items: center;
      gap: 5px;
      border-radius: 3px;
      background-color: rgb(255, 204, 204);
      padding: 7px;
      justify-content: center;
    }

    .recipe-intro {
      margin-top: 15px;
      display: grid;
      grid-template-columns: 5fr 4fr;

      grid-template-rows: 100%;
      gap: 20px;
    }

    .recipe-card {
      border: 1px solid var(--color-light);
      border-radius: 10px;
      height: 70vh;
      box-sizing: border-box;
    }

    .recipe-images {
      width: 100%;
      height: 70vh;
    }

    .recipe-intro img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }

    /* tab containers */
    .card-categories {
      display: flex;
      align-items: center;
      gap: 10px;

      background-color: rgb(242, 242, 242);
      border-radius: 8px 8px 0px 0px;
      /* border-bottom: 1px solid var(--color-light); */
      padding-left: 10px;
      padding-top: 10px;
    }

    /* tab elements */
    .card-categories p {
      display: flex;
      justify-content: center;
      font-size: 17px;
      font-weight: 600;
      color: #333;
      padding: 12px;
      background-color: rgb(255, 255, 255);
      /* make the radius 8px only on the top corners */
      border-radius: 8px 8px 0px 0px;
      margin-right: 10px;
      width: 100px;
    }

    .card-categories p:hover {
      cursor: pointer;
    }

    .card-categories #selected-tab {
      background-color: var(--color-primary-orange);
      color: white;
    }

    .card-content-container {
      height: calc(100% - 54px);
      border-radius: 0px 0px 8px 8px;
      background-color: rgb(242, 242, 242);
    }

    .card-content {
      margin-left: 10px;
      margin-right: 10px;
      border-top: 2px solid var(--color-primary-orange);
      height: calc(100% - 35px);
      border-radius: 0px 0px 8px 8px;
      padding: 10px;
      padding-top: 15px;
      background-color: white;
      overflow-y: scroll;
    }

    .card-directions {
      background-color: inherit;
    }

    .card-directions h4 {
      font-size: 20px;
      font-weight: 600;
      background-color: inherit;
      margin-bottom: 5px;
    }

    .card-directions p {
      font-size: 16px;
      font-weight: 400;
      color: #181818;
      margin-bottom: 28px;
      background-color: inherit;
    }

    @media screen and (max-width: 1000px) {
      .recipe-intro {
        display: flex;
        flex-direction: column-reverse;
      }

      .recipe-images {
        height: 30vh;
      }
    }

    @media screen and (max-width: 500px) {
      /* make recipe category smaller */
      .card-categories p {
        font-size: 12px;
        padding: 5px;
        margin-right: 5px;
        width: 80px;
      }

      /* make the recipe-instructions text smaller */
      .card-directions h4 {
        font-size: 18px;
      }

      .card-directions p {
        font-size: 16px;
      }

      .card-content-container {
        height: calc(100% - 34px);
      }
    }

    .create-class {
      display: flex;
      align-items: center;
      color: gray;
      gap: 10px;
    }

    .create-class img {
      width: 25px;
    }

    .edit-recipe-image {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed var(--color-light);
      border-radius: 10px;
    }

    .edit-recipe-image img {
      width: 40%;
      height: auto;
      opacity: 20%;
      object-fit: cover;
    }

    .edit-recipe-image:hover {
      cursor: pointer;
    }

    .tag-input input {
      padding: 5px;
      margin-left: 10px;
      border: 1px solid var(--color-light);
      border-radius: 5px;
    }

    .post-container {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .post-container h3 {
      background-color: inherit;
    }

    .post-container button {
      padding: 20px;
      border-radius: 10px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 15px;
      font-weight: 600;
    }

    .post-container button:hover {
      cursor: pointer;
    }

    .add-directions {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 40px;
      border-top: 1px solid var(--color-light);
      padding-top: 10px;
      background-color: inherit;
    }

    .add-directions p {
      margin: 0;
      padding: 0;
      background-color: inherit;
    }

    .add-directions img {
      width: 30px;
      background-color: inherit;
    }

    .add-directions img:hover {
      cursor: pointer;
    }

    .space-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .directions-input {
      background-color: inherit;
    }

    .directions-input input {
      padding: 10px;
      width: 400px;
      border: 1px solid #949494;
      background-color: inherit;
    }

    .directions-input button {
      padding: 10px;
      border-radius: 10px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 15px;
      font-weight: 600;
    }
  `;De([je({context:ge,subscribe:!0}),b({attribute:!1})],Y.prototype,"user",2);De([P()],Y.prototype,"activeTab",2);De([P()],Y.prototype,"recipeCost",2);Y=De([x("create-view")],Y);var Vr=Object.defineProperty,Wr=Object.getOwnPropertyDescriptor,Kr=(i,e,t,o)=>{for(var r=o>1?void 0:o?Wr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Vr(e,t,r),r};let Ye=class extends m{render(){return h`
      <div class="public-profile">
        <div class="public-profile-content">
          <h1 id="main">Ethan's Profile</h1>
          <img src="/images/dude.jpg" alt="Ethan's Profile Picture" />
          <div class="public-stats">
            <p>Joined: 1/1/2020</p>
            <p>Recipes: 4</p>
            <p>Likes: 230</p>
          </div>

          <div class="public-bio">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ab
              commodi dolores natus id excepturi modi voluptatibus at, corrupti
              totam aperiam ea reiciendis nobis autem consequatur ipsam itaque.
              Accusantium dicta porro quae, nam blanditiis officia reiciendis
              excepturi ipsa voluptatibus voluptates?
            </p>
          </div>
        </div>

        <section class="my-recipes">
          <h2>Featured Recipes</h2>
          <recipe-grid></recipe-grid>
        </section>
      </div>
    `}};Ye.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .public-profile {
      margin-top: 120px;
      margin-bottom: 80px;
    }

    .public-profile h1 {
      font-size: 35px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }

    .public-profile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .public-profile-content img {
      margin-top: 30px;
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 100%;
    }

    .public-stats {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .public-stats p {
      font-size: 15px;
      font-weight: 300;
      color: var(--color-primary);
    }

    .public-bio {
      margin-top: 40px;
      display: flex;
      align-items: center;
      max-width: 800px;
      color: var(--color-primary);
    }

    .my-recipes {
      margin-top: 120px;
    }

    .my-recipes h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
      margin-bottom: 10px;
    }
  `;Ye=Kr([x("public-profile-view")],Ye);var Gr=Object.defineProperty,Jr=Object.getOwnPropertyDescriptor,Z=(i,e,t,o)=>{for(var r=o>1?void 0:o?Jr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Gr(e,t,r),r};let z=class extends m{constructor(){super(),this.user=N.authenticateFromLocalStorage(()=>this._signOut()),this.path="/login",this.password="",this.username="",this.loginStatus=0,this.username="",this.password=""}render(){return h`
      <div class="login-content">
        <div class="image-display">
          <img src="/images/chef-avatar.png" alt="food" />
        </div>

        <div class="login-form">
          <div class="align">
            <p class="back" @click=${()=>f.go("/app/")}>
              <- Back to Home
            </p>
            <h1>Log In</h1>

            <form
              @submit=${this.handleSubmit}
              @change=${()=>this.loginStatus=0}
            >
              <input
                type="text"
                .value=${this.username}
                @input=${this.handleUsernameChange}
                placeholder="Username"
                required
              />
              <input
                type="password"
                .value=${this.password}
                @input=${this.handlePasswordChange}
                placeholder="Password"
                required
              />
              <button type="submit">Log In</button>
            </form>

            <p class="fail">
              ${this.loginStatus?`Login failed: ${this.loginStatus}`:h``}
            </p>

            <div class="register-link">
              <p>Don't have an account?</p>
              <p @click=${()=>f.go("/app/signup")}>Register</p>
            </div>
          </div>
        </div>
      </div>
    `}handleSubmit(i){i.preventDefault(),fetch(ot(this.path),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,pwd:this.password})}).then(e=>{if(e.status===200)return e.json();this.loginStatus=e.status}).then(e=>{if(e){console.log("Authentication:",e.token),this.user=N.authenticate(e.token,()=>this._signOut());const o=new URLSearchParams(window.location.search).get("redirect");o?f.go(o):window.location.href="/app/",this.requestUpdate()}})}handleUsernameChange(i){const e=i.target;this.username=e.value}handlePasswordChange(i){const e=i.target;this.password=e.value}_signOut(){this.user=C.deauthenticate(this.user),document.location.reload()}};z.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
      box-sizing: border-box;
    }

    h1 {
      color: var(--color-primary);
      font-size: 2rem;
    }

    .back {
      font-size: 0.8rem;
      color: var(--color-primary);
      cursor: pointer;
    }

    .fail {
      font-size: 0.8rem;

      color: red;
    }

    .login-content {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 3fr;
      z-index: 100;
      align-items: stretch;
      height: 100vh;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    form input {
      width: 400px;
      height: 50px;
      padding: 10px;
      border: none;
      background-color: var(--color-login-input-bg);
      border-radius: 10px;
    }

    form button {
      width: 400px;
      height: 50px;
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: var(--color-login-button-bg);
      color: white;
    }

    .login-form {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .align {
      height: 100%;
      display: flex;
      gap: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    .image-display {
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .image-display img {
      width: 600px;
      height: auto;
      object-fit: cover;
      transform: translateX(100px);
    }

    .register-link {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary);
      gap: 5px;
    }

    .register-link p:last-child {
      font-weight: 500;
    }

    .register-link p:last-child:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    @media (max-width: 1283px) {
      .image-display img {
        height: 0;
        display: none;
      }

      .login-content {
        grid-template-columns: 1fr;
      }

      .login-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .login-form {
        padding: 100px;
      }

      form button {
        width: 350px;
      }

      form input {
        width: 350px;
        font-size: 16px;
      }
    }

    @media (max-width: 500px) {
      form button {
        width: 320px;
      }

      form input {
        width: 320px;
        font-size: 14px;
      }

     
    }
  `;Z([P()],z.prototype,"user",2);Z([b()],z.prototype,"path",2);Z([b({reflect:!0,type:Boolean})],z.prototype,"password",2);Z([b({reflect:!0,type:Boolean})],z.prototype,"username",2);Z([P()],z.prototype,"loginStatus",2);z=Z([x("login-view")],z);var Xr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,fe=(i,e,t,o)=>{for(var r=o>1?void 0:o?Qr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Xr(e,t,r),r};let W=class extends m{constructor(){super(),this.path="/signup",this.password="",this.username="",this.windowWidth=window.innerWidth,this.username="",this.password=""}render(){return h`<div class="login-content">
      <div class="image-display">
        <img src="/images/chef-avatar.png" alt="food" />
      </div>

      <div class="login-form">
        <div class="align">
          <p class="back" @click=${()=>f.go("/app/")}><- Back to Home</p>
          <h1>Sign Up</h1>

          <form @submit=${this.handleSubmit}>
            <input
              type="text"
              .value=${this.username}
              @input=${this.handleUsernameChange}
              placeholder="Username"
              required
            />
            <input
              type="password"
              .value=${this.password}
              @input=${this.handlePasswordChange}
              placeholder="Password"
              required
            />
            <button type="submit">Sign In</button>
          </form>

          <div class="register-link">
            <p>Already have an account?</p>
            <p @click=${()=>f.go("/app/login")}>Log In</p>
          </div>
        </div>
      </div>
    </div> `}handleSubmit(i){i.preventDefault(),console.log("Username:",this.username),fetch(ot(this.path),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,pwd:this.password})}).then(e=>{if(e.status===201)return f.go("/app/login"),e.json();console.log("Error:",e.status)})}handleUsernameChange(i){const e=i.target;this.username=e.value}handlePasswordChange(i){const e=i.target;this.password=e.value}};W.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
      box-sizing: border-box;
    }

    h1 {
      color: var(--color-primary);
      font-size: 2rem;
    }

    .back {
      font-size: 0.8rem;
      color: var(--color-primary);
      cursor: pointer;
    }

    .fail {
      font-size: 0.8rem;

      color: red;
    }

    .login-content {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 3fr;
      z-index: 100;
      align-items: stretch;
      height: calc(100vh - 20px);
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    form input {
      width: 400px;
      height: 50px;
      padding: 10px;
      border: none;
      background-color: var(--color-login-input-bg);
      border-radius: 10px;
    }

    form button {
      width: 400px;
      height: 50px;
      padding: 10px;
      border: none;
      border-radius: 10px;
      background-color: var(--color-login-button-bg);
      color: white;
    }

    .login-form {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .align {
      height: 100%;
      display: flex;
      gap: 20px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    .image-display {
      display: flex;
      justify-content: center;
      align-items: flex-end;
    }

    .image-display img {
      width: 600px;
      height: auto;
      object-fit: cover;
      transform: translate(100px, 20px);
    }

    .register-link {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary);
      gap: 5px;
    }

    .register-link p:last-child {
      font-weight: 500;
    }

    .register-link p:last-child:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    @media (max-width: 1283px) {
      .image-display img {
        height: 0;
        display: none;
      }

      .login-content {
        grid-template-columns: 1fr;
      }

      .login-form {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      .login-form {
        padding: 100px;
      }

      form button {
        width: 350px;
      }

      form input {
        width: 350px;
        font-size: 16px;
      }
    }

    @media (max-width: 500px) {
      form button {
        width: 320px;
      }

      form input {
        width: 320px;
        font-size: 14px;
      }

      .login-content{
        height: 80vh;
      }
    }
  `;fe([b()],W.prototype,"path",2);fe([b({reflect:!0,type:Boolean})],W.prototype,"password",2);fe([b({reflect:!0,type:Boolean})],W.prototype,"username",2);fe([P()],W.prototype,"windowWidth",2);W=fe([x("signup-view")],W);var Yr=Object.defineProperty,Zr=Object.getOwnPropertyDescriptor,ri=(i,e,t,o)=>{for(var r=o>1?void 0:o?Zr(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&Yr(e,t,r),r};let Ce=class extends m{render(){return h`
      <auth-required>
       <user-profile .location="${this.location}"></user-profile>
      </auth-required>
    `}};Ce.styles=y`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }


  `;ri([b({attribute:!1})],Ce.prototype,"location",2);Ce=ri([x("test-component")],Ce);var eo=Object.defineProperty,to=Object.getOwnPropertyDescriptor,oi=(i,e,t,o)=>{for(var r=o>1?void 0:o?to(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&eo(e,t,r),r};let Se=class extends m{constructor(){super(),this.on=!1;const i=localStorage.getItem("darkMode");i!==null&&(this.on=JSON.parse(i),this.on?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode"))}render(){return h`<label>
      <slot class="mode">${this.on?"Dark":"Light"}</slot>
      <span class="slider">
        <input type="checkbox" .checked=${this.on} @change=${this._handleChange} />
      </span>
    </label>`}_handleChange(i){const e=i.target;this.on=e==null?void 0:e.checked,localStorage.setItem("darkMode",JSON.stringify(this.on)),this.on?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode")}};Se.styles=y`
    :host {
      display: block;
    }
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      gap: var(--size-spacing-medium);
      line-height: 2em;
      gap: 10px;
    }
    .slider {
      display: inline-block;
      border: 1px solid var(--color-border-control);
      border-radius: 0.75em;
      background-color: var(--color-light);
      height: 1.5em;
      width: 2.75em;
      position: relative;
      transition: background-color var(--time-transition-control);
    }
    .slider:has(input:checked) {
      background-color: var(--color-light);
    }
    input {
      appearance: none;
      background-color: var(--color-primary-orange);
      border-radius: 50%;
      width: 1.25em;
      height: 1.25em;
      vertical-align: center;
      position: absolute;
      left: 0;
      transition: left var(--time-transition-control);
    }
    input:checked {
      left: 1.5em;
    }

    .mode {
      color: var(--color-light-alt);
      font-size: 15px;
      font-weight: 300;

    }
  `;oi([b({reflect:!0,type:Boolean})],Se.prototype,"on",2);Se=oi([x("toggle-switch")],Se);var io=Object.defineProperty,ro=Object.getOwnPropertyDescriptor,st=(i,e,t,o)=>{for(var r=o>1?void 0:o?ro(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&io(e,t,r),r};let de=class extends m{constructor(){super(...arguments),this.open=!1,this.user=N.authenticateFromLocalStorage(()=>this._signOut())}render(){return h`
      <div class="all">
        <input
          type="checkbox"
          id="is-shown"
          @change=${this._handleChange}
          .checked=${this.open}
        />
        <label for="is-shown">
          <div class="navbar-menu">
            <svg class="icon">
              <use href="/icons/menu.svg#icon-menu"></use>
            </svg>
            <svg
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="display: block; height: 100%; width: 100%;   fill: var(--color-primary);"
              
            >
              <path
                d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"
              ></path>
            </svg>
          </div>
        </label>

        <slot name="menu">
          <ul>
            <li class="switch"><toggle-switch></toggle-switch></li>
            ${this.user.authenticated?h`<li class="command">
            
            <p @click = ${()=>{this._toggle(!1),f.go("/app/account")}}>Account</a>
              </li>`:h``}
            ${this.user.authenticated?h`<li class="command">
                  <p
                    @click=${()=>{this._toggle(!1),f.go("/app/profile/"+this.user.username)}}
                  >
                    Profile
                  </p>
                </li>`:h``}
            ${this.user.authenticated?h`<li class="command">
                  <p
                    @click=${()=>{this._toggle(!1),f.go("/app/settings")}}
                  >
                    Settings
                  </p>
                </li>`:h``}
            ${this.user.authenticated?h``:h`<li
                  class="command"
                  @click=${()=>{this._toggle(!1),f.go("/app/signup")}}
                >
                  <p>Signup</p>
                </li> `}
            ${this.user.authenticated?h``:h`<li
                  class="command"
                  @click=${()=>{this._toggle(!1),f.go("/app/login")}}
                >
                  <p>Login</p>
                </li>`}
            ${this.user.authenticated?h`<li
                  class="command"
                  @click=${()=>{this._signOut(),this._toggle(!1)}}
                >
                  <p>Logout</p>
                </li>`:h``}
          </ul>
        </slot>
      </div>
    `}_signOut(){const i="JWT_AUTH_TOKEN";console.log("Signing out"),localStorage.removeItem(i),this.user=C.deauthenticate(this.user),window.location.href="/app/"}_handleChange(i){const e=i.target;this._toggle(e==null?void 0:e.checked)}_toggle(i){this.open=i,this._toggleClickAway(i)}_toggleClickAway(i){const e=t=>{t.composedPath().includes(this)?t.stopPropagation():this._toggle(!1)};i?document.addEventListener("click",e):document.removeEventListener("click",e)}};de.styles=y`
    :host {
      display: inline-block;
      position: relative;
    }

    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
    }

    svg.icon {
      width: 30px;
      height: 30px;
      stroke: var(--color-primary);
      background-color: inherit;
      fill: none;
      fill-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.7;
      transform: translate(6px, 0);
    }

    #is-shown {
      display: none;
    }

    label {
      cursor: pointer;
    }

    slot[name="menu"] {
      display: none;
      position: absolute;
      top: 110%;
      right: 0;
      border-radius: 10px;
      // padding: 15px;
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
      background: white;
    }

    #is-shown:checked ~ slot[name="menu"] {
      display: block;
    }
    m
    /* CSS for slotted elements and default slot content */

    ::slotted(ul[slot="menu"]),
    slot[name="menu"] > ul {
      margin: 0;
      padding: 0;
      margin-top: 6px;
      margin-bottom: 6px;
      list-style: none;
      white-space: nowrap;
    }

    .command {
      display: flex;
    }

    .command:hover {
      cursor: pointer;
      background-color: var(--color-light);
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 20px;
      border: 1px solid var(--color-light);
      padding: 5px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 20px;
      background-color: inherit;
    }

    p {
      color: var(--color-dark);
      padding: 10px;
      padding-left: 20px;
      width: 180px;
      text-decoration: none;
    }

    .all {
      background-color: inherit;
    }

    .switch {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border-bottom: 1px solid var(--color-light);
    }
  `;st([b({reflect:!0,type:Boolean})],de.prototype,"open",2);st([P()],de.prototype,"user",2);de=st([x("drop-down")],de);var oo=Object.defineProperty,no=Object.getOwnPropertyDescriptor,at=(i,e,t,o)=>{for(var r=o>1?void 0:o?no(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&oo(e,t,r),r};let he=class extends m{constructor(){super(...arguments),this.open=!1}render(){var i;return h`
      <header class="navbar">
        <div class="navbar-content">
          <div class="logo" @click=${()=>f.go("/app/")}>
            <svg class="main-icon">
              <use href="/icons/icon.svg#cooked-logo" />
            </svg>
            <h1>COOKED</h1>
          </div>

          <section class="search-box">
            <form>
              <input
                type="text"
                name="search"
                placeholder="Search for Recipes, Chefs, & More"
              />
            </form>
          </section>

          <div class="right-navbar">
            ${(i=this.user)!=null&&i.authenticated?h`<div
                  class="group-icon"
                  @click=${()=>f.go("/app/create")}
                >
                  <svg class="icon">
                    <use href="/icons/create.svg#create-recipe" />
                  </svg>
                </div>`:h``}

            <drop-down></drop-down>
          </div>
        </div>
      </header>
    `}};he.styles=y`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .navbar {
      z-index: 2;
      background-color: var(--color-main-bg);
      padding: 15px 0;
      border-bottom: 1px solid var(--color-border);
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }

    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: inherit;
      margin-left: 80px;
      margin-right: 80px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: inherit;
    }

    .logo:hover {
      cursor: pointer;
    }

    .logo h1 {
      font-size: 28px;
      font-weight: 300;
      color: var(--color-primary);
      background-color: inherit;
      text-shadow: 1px 1px 1px var(--color-light);
    }

    .logo img {
      background-color: inherit;
    }

    .navbar-content a {
      text-decoration: none;
    }

    .content {
      margin-top: 93px;
      margin-left: 80px;
      margin-right: 80px;
    }

    .search-box {
      margin-right: 100px;
      background-color: inherit;
    }

    .search-box form {
      background-color: inherit;
    }

    .search-box input {
      width: 100%;
      padding-top: 13px;
      padding-bottom: 13px;
      padding-right: 80px;
      padding-left: 20px;
      background-color: inherit;
      border-radius: 20px;
      border: 1px solid var(--color-light);
      font-size: 16px;
      font-weight: 300;
      color: var(--color-primary);
    }

    .right-navbar {
      display: flex;
      align-items: center;
      gap: 25px;
      background-color: inherit;
    }

    svg.icon {
      width: 40px;
      height: 40px;
      stroke: var(--color-primary);
      stroke-width: 0.8px;
      background-color: inherit;
      fill: none;
      fill-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      transform: translate(3px, 5px);
    }

    svg.icon:hover {
      cursor: pointer;
    }

    svg.main-icon {
      width: 50px;
      height: 50px;
      stroke: var(--color-primary);
      background-color: inherit;
      fill: none;
      fill-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* svg.icon {
    display: inline;
    height: 2em;
    width: 2em;
    vertical-align: top;
    fill: black;
    stroke: black;
  } */

    .right-navbar a {
      background-color: inherit;
    }
    /* On hover, ease in to make bigger */
    .group-icon img {
      transition: transform 0.3s ease;
      background-color: inherit;
    }

    .group-icon img:hover {
      transform: scale(1.15);
    }

    .navbar-menu {
      display: flex;
      align-items: center;
      gap: 20px;
      border: 1px solid var(--color-light);
      padding: 5px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 20px;
      background-color: white;
    }

    /* Add box shadow transition */
    .navbar-menu {
      transition: box-shadow 0.3s ease; /* Add a transition for the box-shadow property */
    }

    /*add a drop shadow upon hover, shadow in downward direction*/
    .navbar-menu:hover {
      cursor: pointer;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
    }

    @media screen and (max-width: 800px) {
      .content {
        margin-left: 50px;
        margin-right: 50px;
      }

      .navbar-content {
        margin-left: 50px;
        margin-right: 50px;
      }
    }

    @media screen and (max-width: 500px) {
      .content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .navbar-content {
        margin-left: 31px;
        margin-right: 31px;
      }

      .logo h1 {
        display: none;
      }
    }

    @media screen and (max-width: 988px) {
      .search-box {
        display: none;
      }
    }
  `;at([b({reflect:!0,type:Boolean})],he.prototype,"open",2);at([je({context:ge,subscribe:!0}),b({attribute:!1})],he.prototype,"user",2);he=at([x("navbar-component")],he);var so=Object.defineProperty,ao=Object.getOwnPropertyDescriptor,co=(i,e,t,o)=>{for(var r=o>1?void 0:o?ao(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&so(e,t,r),r};let Ut=class extends m{constructor(){super()}firstUpdated(){var e;new f((e=this.shadowRoot)==null?void 0:e.querySelector("#outlet")).setRoutes([{path:"/app/profile/:userid",component:"user-profile"},{path:"/app/",component:"trending-view",action:()=>{window.scrollTo(0,0)}},{path:"/app/account",component:"account-view"},{path:"/app/groups",component:"group-view"},{path:"/app/my-recipes",component:"user-recipes"},{path:"/app/recipe/:recipeid",component:"recipe-view",action:()=>{window.scrollTo(0,0)}},{path:"/app/settings",component:"setting-view"},{path:"/app/category/:category",component:"category-view"},{path:"/app/create",component:"create-view"},{path:"/app/user/:userid",component:"public-profile-view"},{path:"/app/login",component:"login-view"},{path:"/app/signup",component:"signup-view"},{path:"(.*)",action:()=>{f.go("/app/")}}])}render(){return h`
      <auth-required>
        <navbar-component></navbar-component>
        <div id="outlet"></div>
      </auth-required>
    `}};Ut=co([x("my-app")],Ut);var lo=Object.defineProperty,po=Object.getOwnPropertyDescriptor,ni=(i,e,t,o)=>{for(var r=o>1?void 0:o?po(e,t):e,n=i.length-1,s;n>=0;n--)(s=i[n])&&(r=(o?s(e,t,r):s(r))||r);return o&&r&&lo(e,t,r),r};let Te=class extends m{constructor(){super(...arguments),this.open=!1}render(){return h`
      <footer>
        <p>© 2024 Ethan Outangoun</p>
      </footer>
    `}};Te.styles=y`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  footer {
    border-top: 1px solid var(--color-border);
    color: var(--color-primary);
    padding: 20px; /* Padding inside the footer */
    padding-left: 80px;
    padding-right: 80px;
    margin-top: 60px;
  }
  
  footer p {
    font-size: 14px;
  }
  
  @media screen and (max-width: 800px) {
  
    footer {
      padding-left: 50px;
      padding-right: 50px;
    }
  }
  

  
  @media screen and (max-width: 500px) {

  
    footer {
      padding-left: 31px;
      padding-right: 31px;
    }
  }
  
  `;ni([b({reflect:!0,type:Boolean})],Te.prototype,"open",2);Te=ni([x("footer-component")],Te);
