(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Te(i){return i=i||[],Array.isArray(i)?i:[i]}function U(i){return`[Vaadin.Router] ${i}`}function fi(i){if(typeof i!="object")return String(i);const e=Object.prototype.toString.call(i).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(i)}`:e}function Jt(i){if(!i||!T(i.path))throw new Error(U('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=["component","redirect"];if(!B(i.action)&&!Array.isArray(i.children)&&!B(i.children)&&!e.some(t=>T(i[t])))throw new Error(U(`Expected route config "${i.path}" to include either "${e.join('", "')}" or "action" function but none found.`));i.redirect&&["component"].forEach(t=>{t in i&&console.warn(U(`Route config "${i.path}" has both "redirect" and "${t}" properties, and "redirect" will always override the latter. Did you mean to only use "${t}"?`))})}function yt(i){Te(i).forEach(e=>Jt(e))}function he(i,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${i}`,{cancelable:i==="go",detail:e}))}function it(i){return typeof i=="object"&&!!i}function B(i){return typeof i=="function"}function T(i){return typeof i=="string"}function Kt(i){const e=new Error(U(`Page not found (${i.pathname})`));return e.context=i,e.code=404,e}const Z=new class{};function mi(i){const e=i.port,t=i.protocol,s=t==="http:"&&e==="80"||t==="https:"&&e==="443"?i.hostname:i.host;return`${t}//${s}`}function _t(i){if(i.defaultPrevented||i.button!==0||i.shiftKey||i.ctrlKey||i.altKey||i.metaKey)return;let e=i.target;const t=i.composedPath?i.composedPath():i.path||[];for(let c=0;c<t.length;c++){const a=t[c];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||mi(e))!==window.location.origin)return;const{pathname:r,search:s,hash:n}=e;he("go",{pathname:r,search:s,hash:n})&&(i.preventDefault(),i&&i.type==="click"&&window.scrollTo(0,0))}const vi={activate(){window.document.addEventListener("click",_t)},inactivate(){window.document.removeEventListener("click",_t)}},bi=/Trident/.test(navigator.userAgent);bi&&!B(window.PopStateEvent)&&(window.PopStateEvent=function(i,e){e=e||{};var t=document.createEvent("Event");return t.initEvent(i,!!e.bubbles,!!e.cancelable),t.state=e.state||null,t},window.PopStateEvent.prototype=window.Event.prototype);function wt(i){if(i.state==="vaadin-router-ignore")return;const{pathname:e,search:t,hash:o}=window.location;he("go",{pathname:e,search:t,hash:o})}const xi={activate(){window.addEventListener("popstate",wt)},inactivate(){window.removeEventListener("popstate",wt)}};function yi(i){for(var e=[],t=0;t<i.length;){var o=i[t];if(o==="*"||o==="+"||o==="?"){e.push({type:"MODIFIER",index:t,value:i[t++]});continue}if(o==="\\"){e.push({type:"ESCAPED_CHAR",index:t++,value:i[t++]});continue}if(o==="{"){e.push({type:"OPEN",index:t,value:i[t++]});continue}if(o==="}"){e.push({type:"CLOSE",index:t,value:i[t++]});continue}if(o===":"){for(var r="",s=t+1;s<i.length;){var n=i.charCodeAt(s);if(n>=48&&n<=57||n>=65&&n<=90||n>=97&&n<=122||n===95){r+=i[s++];continue}break}if(!r)throw new TypeError("Missing parameter name at ".concat(t));e.push({type:"NAME",index:t,value:r}),t=s;continue}if(o==="("){var c=1,a="",s=t+1;if(i[s]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<i.length;){if(i[s]==="\\"){a+=i[s++]+i[s++];continue}if(i[s]===")"){if(c--,c===0){s++;break}}else if(i[s]==="("&&(c++,i[s+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(s));a+=i[s++]}if(c)throw new TypeError("Unbalanced pattern at ".concat(t));if(!a)throw new TypeError("Missing pattern at ".concat(t));e.push({type:"PATTERN",index:t,value:a}),t=s;continue}e.push({type:"CHAR",index:t,value:i[t++]})}return e.push({type:"END",index:t,value:""}),e}function lt(i,e){e===void 0&&(e={});for(var t=yi(i),o=e.prefixes,r=o===void 0?"./":o,s="[^".concat(Y(e.delimiter||"/#?"),"]+?"),n=[],c=0,a=0,l="",d=function(E){if(a<t.length&&t[a].type===E)return t[a++].value},h=function(E){var M=d(E);if(M!==void 0)return M;var q=t[a],Ke=q.type,Ge=q.index;throw new TypeError("Unexpected ".concat(Ke," at ").concat(Ge,", expected ").concat(E))},u=function(){for(var E="",M;M=d("CHAR")||d("ESCAPED_CHAR");)E+=M;return E};a<t.length;){var g=d("CHAR"),A=d("NAME"),k=d("PATTERN");if(A||k){var w=g||"";r.indexOf(w)===-1&&(l+=w,w=""),l&&(n.push(l),l=""),n.push({name:A||c++,prefix:w,suffix:"",pattern:k||s,modifier:d("MODIFIER")||""});continue}var P=g||d("ESCAPED_CHAR");if(P){l+=P;continue}l&&(n.push(l),l="");var le=d("OPEN");if(le){var w=u(),pe=d("NAME")||"",x=d("PATTERN")||"",N=u();h("CLOSE"),n.push({name:pe||(x?c++:""),pattern:pe&&!x?s:x,prefix:w,suffix:N,modifier:d("MODIFIER")||""});continue}h("END")}return n}function Gt(i,e){return Xt(lt(i,e),e)}function Xt(i,e){e===void 0&&(e={});var t=pt(e),o=e.encode,r=o===void 0?function(a){return a}:o,s=e.validate,n=s===void 0?!0:s,c=i.map(function(a){if(typeof a=="object")return new RegExp("^(?:".concat(a.pattern,")$"),t)});return function(a){for(var l="",d=0;d<i.length;d++){var h=i[d];if(typeof h=="string"){l+=h;continue}var u=a?a[h.name]:void 0,g=h.modifier==="?"||h.modifier==="*",A=h.modifier==="*"||h.modifier==="+";if(Array.isArray(u)){if(!A)throw new TypeError('Expected "'.concat(h.name,'" to not repeat, but got an array'));if(u.length===0){if(g)continue;throw new TypeError('Expected "'.concat(h.name,'" to not be empty'))}for(var k=0;k<u.length;k++){var w=r(u[k],h);if(n&&!c[d].test(w))throw new TypeError('Expected all "'.concat(h.name,'" to match "').concat(h.pattern,'", but got "').concat(w,'"'));l+=h.prefix+w+h.suffix}continue}if(typeof u=="string"||typeof u=="number"){var w=r(String(u),h);if(n&&!c[d].test(w))throw new TypeError('Expected "'.concat(h.name,'" to match "').concat(h.pattern,'", but got "').concat(w,'"'));l+=h.prefix+w+h.suffix;continue}if(!g){var P=A?"an array":"a string";throw new TypeError('Expected "'.concat(h.name,'" to be ').concat(P))}}return l}}function Y(i){return i.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function pt(i){return i&&i.sensitive?"":"i"}function _i(i,e){if(!e)return i;for(var t=/\((?:\?<(.*?)>)?(?!\?)/g,o=0,r=t.exec(i.source);r;)e.push({name:r[1]||o++,prefix:"",suffix:"",modifier:"",pattern:""}),r=t.exec(i.source);return i}function wi(i,e,t){var o=i.map(function(r){return Yt(r,e,t).source});return new RegExp("(?:".concat(o.join("|"),")"),pt(t))}function $i(i,e,t){return Pi(lt(i,t),e,t)}function Pi(i,e,t){t===void 0&&(t={});for(var o=t.strict,r=o===void 0?!1:o,s=t.start,n=s===void 0?!0:s,c=t.end,a=c===void 0?!0:c,l=t.encode,d=l===void 0?function(Ge){return Ge}:l,h=t.delimiter,u=h===void 0?"/#?":h,g=t.endsWith,A=g===void 0?"":g,k="[".concat(Y(A),"]|$"),w="[".concat(Y(u),"]"),P=n?"^":"",le=0,pe=i;le<pe.length;le++){var x=pe[le];if(typeof x=="string")P+=Y(d(x));else{var N=Y(d(x.prefix)),E=Y(d(x.suffix));if(x.pattern)if(e&&e.push(x),N||E)if(x.modifier==="+"||x.modifier==="*"){var M=x.modifier==="*"?"?":"";P+="(?:".concat(N,"((?:").concat(x.pattern,")(?:").concat(E).concat(N,"(?:").concat(x.pattern,"))*)").concat(E,")").concat(M)}else P+="(?:".concat(N,"(").concat(x.pattern,")").concat(E,")").concat(x.modifier);else x.modifier==="+"||x.modifier==="*"?P+="((?:".concat(x.pattern,")").concat(x.modifier,")"):P+="(".concat(x.pattern,")").concat(x.modifier);else P+="(?:".concat(N).concat(E,")").concat(x.modifier)}}if(a)r||(P+="".concat(w,"?")),P+=t.endsWith?"(?=".concat(k,")"):"$";else{var q=i[i.length-1],Ke=typeof q=="string"?w.indexOf(q[q.length-1])>-1:q===void 0;r||(P+="(?:".concat(w,"(?=").concat(k,"))?")),Ke||(P+="(?=".concat(w,"|").concat(k,")"))}return new RegExp(P,pt(t))}function Yt(i,e,t){return i instanceof RegExp?_i(i,e):Array.isArray(i)?wi(i,e,t):$i(i,e,t)}const{hasOwnProperty:Ei}=Object.prototype,rt=new Map;rt.set("|false",{keys:[],pattern:/(?:)/});function $t(i){try{return decodeURIComponent(i)}catch{return i}}function Ai(i,e,t,o,r){t=!!t;const s=`${i}|${t}`;let n=rt.get(s);if(!n){const l=[];n={keys:l,pattern:Yt(i,l,{end:t,strict:i===""})},rt.set(s,n)}const c=n.pattern.exec(e);if(!c)return null;const a=Object.assign({},r);for(let l=1;l<c.length;l++){const d=n.keys[l-1],h=d.name,u=c[l];(u!==void 0||!Ei.call(a,h))&&(d.modifier==="+"||d.modifier==="*"?a[h]=u?u.split(/[/?#]/).map($t):[]:a[h]=u&&$t(u))}return{path:c[0],keys:(o||[]).concat(n.keys),params:a}}function Qt(i,e,t,o,r){let s,n,c=0,a=i.path||"";return a.charAt(0)==="/"&&(t&&(a=a.substr(1)),t=!0),{next(l){if(i===l)return{done:!0};const d=i.__children=i.__children||i.children;if(!s&&(s=Ai(a,e,!d,o,r),s))return{done:!1,value:{route:i,keys:s.keys,params:s.params,path:s.path}};if(s&&d)for(;c<d.length;){if(!n){const u=d[c];u.parent=i;let g=s.path.length;g>0&&e.charAt(g)==="/"&&(g+=1),n=Qt(u,e.substr(g),t,s.keys,s.params)}const h=n.next(l);if(!h.done)return{done:!1,value:h.value};n=null,c++}return{done:!0}}}}function Ci(i){if(B(i.route.action))return i.route.action(i)}function Oi(i,e){let t=e;for(;t;)if(t=t.parent,t===i)return!0;return!1}function ki(i){let e=`Path '${i.pathname}' is not properly resolved due to an error.`;const t=(i.route||{}).path;return t&&(e+=` Resolution had failed on route: '${t}'`),e}function Si(i,e){const{route:t,path:o}=e;if(t&&!t.__synthetic){const r={path:o,route:t};if(!i.chain)i.chain=[];else if(t.parent){let s=i.chain.length;for(;s--&&i.chain[s].route&&i.chain[s].route!==t.parent;)i.chain.pop()}i.chain.push(r)}}class ot{constructor(e,t={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t.baseUrl||"",this.errorHandler=t.errorHandler,this.resolveRoute=t.resolveRoute||Ci,this.context=Object.assign({resolver:this},t.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){yt(e);const t=[...Te(e)];this.root.__children=t}addRoutes(e){return yt(e),this.root.__children.push(...Te(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const t=Object.assign({},this.context,T(e)?{pathname:e}:e),o=Qt(this.root,this.__normalizePathname(t.pathname),this.baseUrl),r=this.resolveRoute;let s=null,n=null,c=t;function a(l,d=s.value.route,h){const u=h===null&&s.value.route;return s=n||o.next(u),n=null,!l&&(s.done||!Oi(d,s.value.route))?(n=s,Promise.resolve(Z)):s.done?Promise.reject(Kt(t)):(c=Object.assign(c?{chain:c.chain?c.chain.slice(0):[]}:{},t,s.value),Si(c,s.value),Promise.resolve(r(c)).then(g=>g!=null&&g!==Z?(c.result=g.result||g,c):a(l,d,g)))}return t.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(l=>{const d=ki(c);if(l?console.warn(d):l=new Error(d),l.context=l.context||c,l instanceof DOMException||(l.code=l.code||500),this.errorHandler)return c.result=this.errorHandler(l),c;throw l})}static __createUrl(...e){return new URL(...e)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,o=e[0]==="/"?this.constructor.__createUrl(t).origin+e:"./"+e,r=this.constructor.__createUrl(o,t).href;if(r.slice(0,t.length)===t)return r.slice(t.length)}}const Pt=new Map;function Zt(i,e,t){const o=e.name||e.component;if(o&&(i.has(o)?i.get(o).push(e):i.set(o,[e])),Array.isArray(t))for(let r=0;r<t.length;r++){const s=t[r];s.parent=e,Zt(i,s,s.__children||s.children)}}function Et(i,e){const t=i.get(e);if(t&&t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t&&t[0]}function At(i){let e=i.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function Ri(i,e={encode:encodeURIComponent}){if(!(i instanceof ot))throw new TypeError("An instance of Resolver is expected");const t=new Map;return(o,r)=>{let s=Et(t,o);if(!s&&(t.clear(),Zt(t,i.root,i.root.__children),s=Et(t,o),!s))throw new Error(`Route "${o}" not found`);let n=Pt.get(s.fullPath);if(!n){let l=At(s),d=s.parent;for(;d;){const g=At(d);g&&(l=g.replace(/\/$/,"")+"/"+l.replace(/^\//,"")),d=d.parent}const h=lt(l),u=Object.create(null);for(let g=0;g<h.length;g++)T(h[g])||(u[h[g].name]=!0);n={tokens:h,keys:u},Pt.set(l,n),s.fullPath=l}let a=Xt(n.tokens,e)(r)||"/";if(e.stringifyQueryParams&&r){const l={},d=Object.keys(r);for(let u=0;u<d.length;u++){const g=d[u];n.keys[g]||(l[g]=r[g])}const h=e.stringifyQueryParams(l);h&&(a+=h.charAt(0)==="?"?h:`?${h}`)}return a}}let Ct=[];function Ti(i){Ct.forEach(e=>e.inactivate()),i.forEach(e=>e.activate()),Ct=i}const ji=i=>{const e=getComputedStyle(i).getPropertyValue("animation-name");return e&&e!=="none"},Ui=(i,e)=>{const t=()=>{i.removeEventListener("animationend",t),e()};i.addEventListener("animationend",t)};function Ot(i,e){return i.classList.add(e),new Promise(t=>{if(ji(i)){const o=i.getBoundingClientRect(),r=`height: ${o.bottom-o.top}px; width: ${o.right-o.left}px`;i.setAttribute("style",`position: absolute; ${r}`),Ui(i,()=>{i.classList.remove(e),i.removeAttribute("style"),t()})}else i.classList.remove(e),t()})}const Di=256;function Xe(i){return i!=null}function Li(i){const e=Object.assign({},i);return delete e.next,e}function C({pathname:i="",search:e="",hash:t="",chain:o=[],params:r={},redirectFrom:s,resolver:n},c){const a=o.map(l=>l.route);return{baseUrl:n&&n.baseUrl||"",pathname:i,search:e,hash:t,routes:a,route:c||a.length&&a[a.length-1]||null,params:r,redirectFrom:s,searchParams:new URLSearchParams(e),getUrl:(l={})=>ke(Gt(ei(a))(Object.assign({},r,l)),n)}}function kt(i,e){const t=Object.assign({},i.params);return{redirect:{pathname:e,from:i.pathname,params:t}}}function zi(i,e){e.location=C(i);const t=i.chain.map(o=>o.route).indexOf(i.route);return i.chain[t].element=e,e}function Oe(i,e,t){if(B(i))return i.apply(t,e)}function St(i,e,t){return o=>{if(o&&(o.cancel||o.redirect))return o;if(t)return Oe(t[i],e,t)}}function Ii(i,e){if(!Array.isArray(i)&&!it(i))throw new Error(U(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${i}`));e.__children=[];const t=Te(i);for(let o=0;o<t.length;o++)Jt(t[o]),e.__children.push(t[o])}function ke(i,e){const t=e.__effectiveBaseUrl;return t?e.constructor.__createUrl(i.replace(/^\//,""),t).pathname:i}function ei(i){return i.map(e=>e.path).reduce((e,t)=>t.length?e.replace(/\/$/,"")+"/"+t.replace(/^\//,""):e,"")}class f extends ot{constructor(e,t){const o=document.head.querySelector("base"),r=o&&o.getAttribute("href");super([],Object.assign({baseUrl:r&&ot.__createUrl(r,document.URL).href.replace(/[^/]*$/,"")},t)),this.resolveRoute=n=>this.__resolveRoute(n);const s=f.NavigationTrigger;f.setTriggers.apply(f,Object.keys(s).map(n=>s[n])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=C({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const t=e.route;let o=Promise.resolve();B(t.children)&&(o=o.then(()=>t.children(Li(e))).then(s=>{!Xe(s)&&!B(t.children)&&(s=t.children),Ii(s,t)}));const r={redirect:s=>kt(e,s),component:s=>{const n=document.createElement(s);return this.__createdByRouter.set(n,!0),n}};return o.then(()=>{if(this.__isLatestRender(e))return Oe(t.action,[e,r],t)}).then(s=>{if(Xe(s)&&(s instanceof HTMLElement||s.redirect||s===Z))return s;if(T(t.redirect))return r.redirect(t.redirect)}).then(s=>{if(Xe(s))return s;if(T(t.component))return r.component(t.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,t=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),t||this.__onNavigationEvent(),this.ready}render(e,t){const o=++this.__lastStartedRenderId,r=Object.assign({search:"",hash:""},T(e)?{pathname:e}:e,{__renderId:o});return this.ready=this.resolve(r).then(s=>this.__fullyResolveChain(s)).then(s=>{if(this.__isLatestRender(s)){const n=this.__previousContext;if(s===n)return this.__updateBrowserHistory(n,!0),this.location;if(this.location=C(s),t&&this.__updateBrowserHistory(s,o===1),he("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.__copyUnchangedElements(s,n),this.__previousContext=s,this.location;this.__addAppearingContent(s,n);const c=this.__animateIfNeeded(s);return this.__runOnAfterEnterCallbacks(s),this.__runOnAfterLeaveCallbacks(s,n),c.then(()=>{if(this.__isLatestRender(s))return this.__removeDisappearingContent(),this.__previousContext=s,this.location})}}).catch(s=>{if(o===this.__lastStartedRenderId)throw t&&this.__updateBrowserHistory(r),f.__removeDomNodes(this.__outlet&&this.__outlet.children),this.location=C(Object.assign(r,{resolver:this})),he("error",Object.assign({router:this,error:s},r)),s}),this.ready}__fullyResolveChain(e,t=e){return this.__findComponentContextAfterAllRedirects(t).then(o=>{const s=o!==t?o:e,c=ke(ei(o.chain),o.resolver)===o.pathname,a=(l,d=l.route,h)=>l.next(void 0,d,h).then(u=>u===null||u===Z?c?l:d.parent!==null?a(l,d.parent,u):u:u);return a(o).then(l=>{if(l===null||l===Z)throw Kt(s);return l&&l!==Z&&l!==o?this.__fullyResolveChain(s,l):this.__amendWithOnBeforeCallbacks(o)})})}__findComponentContextAfterAllRedirects(e){const t=e.result;return t instanceof HTMLElement?(zi(e,t),Promise.resolve(e)):t.redirect?this.__redirect(t.redirect,e.__redirectCount,e.__renderId).then(o=>this.__findComponentContextAfterAllRedirects(o)):t instanceof Error?Promise.reject(t):Promise.reject(new Error(U(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${fi(t)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(t=>t===this.__previousContext||t===e?t:this.__fullyResolveChain(t))}__runOnBeforeCallbacks(e){const t=this.__previousContext||{},o=t.chain||[],r=e.chain;let s=Promise.resolve();const n=()=>({cancel:!0}),c=a=>kt(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,o.length){for(let a=0;a<Math.min(o.length,r.length)&&!(o[a].route!==r[a].route||o[a].path!==r[a].path&&o[a].element!==r[a].element||!this.__isReusableElement(o[a].element,r[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=r.length===o.length&&e.__divergedChainIndex==r.length&&this.__isReusableElement(e.result,t.result),e.__skipAttach){for(let a=r.length-1;a>=0;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:n},o[a]);for(let a=0;a<r.length;a++)s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:n,redirect:c},r[a]),o[a].element.location=C(e,o[a].route)}else for(let a=o.length-1;a>=e.__divergedChainIndex;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:n},o[a])}if(!e.__skipAttach)for(let a=0;a<r.length;a++)a<e.__divergedChainIndex?a<o.length&&o[a].element&&(o[a].element.location=C(e,o[a].route)):(s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:n,redirect:c},r[a]),r[a].element&&(r[a].element.location=C(e,r[a].route)));return s.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,t,o,r){const s=C(t);return e.then(n=>{if(this.__isLatestRender(t))return St("onBeforeLeave",[s,o,this],r.element)(n)}).then(n=>{if(!(n||{}).redirect)return n})}__runOnBeforeEnterCallbacks(e,t,o,r){const s=C(t,r.route);return e.then(n=>{if(this.__isLatestRender(t))return St("onBeforeEnter",[s,o,this],r.element)(n)})}__isReusableElement(e,t){return e&&t?this.__createdByRouter.get(e)&&this.__createdByRouter.get(t)?e.localName===t.localName:e===t:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,t,o){if(t>Di)throw new Error(U(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(t||0)+1,__renderId:o})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(U(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:t="",hash:o=""},r){if(window.location.pathname!==e||window.location.search!==t||window.location.hash!==o){const s=r?"replaceState":"pushState";window.history[s](null,document.title,e+t+o),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,t){let o=this.__outlet;for(let r=0;r<e.__divergedChainIndex;r++){const s=t&&t.chain[r].element;if(s)if(s.parentNode===o)e.chain[r].element=s,o=s;else break}return o}__addAppearingContent(e,t){this.__ensureOutlet(),this.__removeAppearingContent();const o=this.__copyUnchangedElements(e,t);this.__appearingContent=[],this.__disappearingContent=Array.from(o.children).filter(s=>this.__addedByRouter.get(s)&&s!==e.result);let r=o;for(let s=e.__divergedChainIndex;s<e.chain.length;s++){const n=e.chain[s].element;n&&(r.appendChild(n),this.__addedByRouter.set(n,!0),r===o&&this.__appearingContent.push(n),r=n)}}__removeDisappearingContent(){this.__disappearingContent&&f.__removeDomNodes(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(f.__removeDomNodes(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,t){if(t)for(let o=t.chain.length-1;o>=e.__divergedChainIndex&&this.__isLatestRender(e);o--){const r=t.chain[o].element;if(r)try{const s=C(e);Oe(r.onAfterLeave,[s,{},t.resolver],r)}finally{this.__disappearingContent.indexOf(r)>-1&&f.__removeDomNodes(r.children)}}}__runOnAfterEnterCallbacks(e){for(let t=e.__divergedChainIndex;t<e.chain.length&&this.__isLatestRender(e);t++){const o=e.chain[t].element||{},r=C(e,e.chain[t].route);Oe(o.onAfterEnter,[r,{},e.resolver],o)}}__animateIfNeeded(e){const t=(this.__disappearingContent||[])[0],o=(this.__appearingContent||[])[0],r=[],s=e.chain;let n;for(let c=s.length;c>0;c--)if(s[c-1].route.animate){n=s[c-1].route.animate;break}if(t&&o&&n){const c=it(n)&&n.leave||"leaving",a=it(n)&&n.enter||"entering";r.push(Ot(t,c)),r.push(Ot(o,a))}return Promise.all(r).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:t,search:o,hash:r}=e?e.detail:window.location;T(this.__normalizePathname(t))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:t,search:o,hash:r},!0))}static setTriggers(...e){Ti(e)}urlForName(e,t){return this.__urlForName||(this.__urlForName=Ri(this)),ke(this.__urlForName(e,t),this)}urlForPath(e,t){return ke(Gt(e)(t),this)}static go(e){const{pathname:t,search:o,hash:r}=T(e)?this.__createUrl(e,"http://a"):e;return he("go",{pathname:t,search:o,hash:r})}static __removeDomNodes(e){if(e&&e.length){const t=e[0].parentNode,o=e.length-1;for(let r=o;r>=0;r--)t.removeChild(e[r])}}}const Ni=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,Se=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Mi(){function i(){return!0}return ti(i)}function qi(){try{return Hi()?!0:Fi()?Se?!Bi():!Mi():!1}catch{return!1}}function Hi(){return localStorage.getItem("vaadin.developmentmode.force")}function Fi(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function Bi(){return!!(Se&&Object.keys(Se).map(e=>Se[e]).filter(e=>e.productionMode).length>0)}function ti(i,e){if(typeof i!="function")return;const t=Ni.exec(i.toString());if(t)try{i=new Function(t[1])}catch(o){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",o)}return i(e)}window.Vaadin=window.Vaadin||{};const Rt=function(i,e){if(window.Vaadin.developmentMode)return ti(i,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=qi());function Vi(){}const Wi=function(){if(typeof Rt=="function")return Rt(Vi)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.2"});Wi();f.NavigationTrigger={POPSTATE:xi,CLICK:vi};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re=globalThis,dt=Re.ShadowRoot&&(Re.ShadyCSS===void 0||Re.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ht=Symbol(),Tt=new WeakMap;let ii=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==ht)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(dt&&e===void 0){const o=t!==void 0&&t.length===1;o&&(e=Tt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Tt.set(t,e))}return e}toString(){return this.cssText}};const Ji=i=>new ii(typeof i=="string"?i:i+"",void 0,ht),_=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((o,r,s)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1],i[0]);return new ii(t,i,ht)},Ki=(i,e)=>{if(dt)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const o=document.createElement("style"),r=Re.litNonce;r!==void 0&&o.setAttribute("nonce",r),o.textContent=t.cssText,i.appendChild(o)}},jt=dt?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return Ji(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Gi,defineProperty:Xi,getOwnPropertyDescriptor:Yi,getOwnPropertyNames:Qi,getOwnPropertySymbols:Zi,getPrototypeOf:er}=Object,D=globalThis,Ut=D.trustedTypes,tr=Ut?Ut.emptyScript:"",Ye=D.reactiveElementPolyfillSupport,ue=(i,e)=>i,je={toAttribute(i,e){switch(e){case Boolean:i=i?tr:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ut=(i,e)=>!Gi(i,e),Dt={attribute:!0,type:String,converter:je,reflect:!1,hasChanged:ut};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),D.litPropertyMetadata??(D.litPropertyMetadata=new WeakMap);class Q extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Dt){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,t);r!==void 0&&Xi(this.prototype,e,r)}}static getPropertyDescriptor(e,t,o){const{get:r,set:s}=Yi(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get(){return r==null?void 0:r.call(this)},set(n){const c=r==null?void 0:r.call(this);s.call(this,n),this.requestUpdate(e,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Dt}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;const e=er(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){const t=this.properties,o=[...Qi(t),...Zi(t)];for(const r of o)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[o,r]of t)this.elementProperties.set(o,r)}this._$Eh=new Map;for(const[t,o]of this.elementProperties){const r=this._$Eu(t,o);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const r of o)t.unshift(jt(r))}else e!==void 0&&t.push(jt(e));return t}static _$Eu(e,t){const o=t.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ki(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostConnected)==null?void 0:o.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostDisconnected)==null?void 0:o.call(t)})}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$EC(e,t){var s;const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(r!==void 0&&o.reflect===!0){const n=(((s=o.converter)==null?void 0:s.toAttribute)!==void 0?o.converter:je).toAttribute(t,o.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var s;const o=this.constructor,r=o._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const n=o.getPropertyOptions(r),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((s=n.converter)==null?void 0:s.fromAttribute)!==void 0?n.converter:je;this._$Em=r,this[r]=c.fromAttribute(t,n.type),this._$Em=null}}requestUpdate(e,t,o){if(e!==void 0){if(o??(o=this.constructor.getPropertyOptions(e)),!(o.hasChanged??ut)(this[e],t))return;this.P(e,t,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,o){this._$AL.has(e)||this._$AL.set(e,t),o.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,n]of r)n.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(o=this._$EO)==null||o.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(t)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(o=>{var r;return(r=o.hostUpdated)==null?void 0:r.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},Q[ue("elementProperties")]=new Map,Q[ue("finalized")]=new Map,Ye==null||Ye({ReactiveElement:Q}),(D.reactiveElementVersions??(D.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=globalThis,Ue=ge.trustedTypes,Lt=Ue?Ue.createPolicy("lit-html",{createHTML:i=>i}):void 0,ri="$lit$",j=`lit$${(Math.random()+"").slice(9)}$`,oi="?"+j,ir=`<${oi}>`,V=document,fe=()=>V.createComment(""),me=i=>i===null||typeof i!="object"&&typeof i!="function",si=Array.isArray,rr=i=>si(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Qe=`[ 	
\f\r]`,de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zt=/-->/g,It=/>/g,H=RegExp(`>|${Qe}(?:([^\\s"'>=/]+)(${Qe}*=${Qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nt=/'/g,Mt=/"/g,ni=/^(?:script|style|textarea|title)$/i,or=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),p=or(1),ee=Symbol.for("lit-noChange"),$=Symbol.for("lit-nothing"),qt=new WeakMap,F=V.createTreeWalker(V,129);function ai(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Lt!==void 0?Lt.createHTML(e):e}const sr=(i,e)=>{const t=i.length-1,o=[];let r,s=e===2?"<svg>":"",n=de;for(let c=0;c<t;c++){const a=i[c];let l,d,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,d=n.exec(a),d!==null);)u=n.lastIndex,n===de?d[1]==="!--"?n=zt:d[1]!==void 0?n=It:d[2]!==void 0?(ni.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=H):d[3]!==void 0&&(n=H):n===H?d[0]===">"?(n=r??de,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,l=d[1],n=d[3]===void 0?H:d[3]==='"'?Mt:Nt):n===Mt||n===Nt?n=H:n===zt||n===It?n=de:(n=H,r=void 0);const g=n===H&&i[c+1].startsWith("/>")?" ":"";s+=n===de?a+ir:h>=0?(o.push(l),a.slice(0,h)+ri+a.slice(h)+j+g):a+j+(h===-2?c:g)}return[ai(i,s+(i[t]||"<?>")+(e===2?"</svg>":"")),o]};class ve{constructor({strings:e,_$litType$:t},o){let r;this.parts=[];let s=0,n=0;const c=e.length-1,a=this.parts,[l,d]=sr(e,t);if(this.el=ve.createElement(l,o),F.currentNode=this.el.content,t===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=F.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(ri)){const u=d[n++],g=r.getAttribute(h).split(j),A=/([.?@])?(.*)/.exec(u);a.push({type:1,index:s,name:A[2],strings:g,ctor:A[1]==="."?ar:A[1]==="?"?cr:A[1]==="@"?lr:qe}),r.removeAttribute(h)}else h.startsWith(j)&&(a.push({type:6,index:s}),r.removeAttribute(h));if(ni.test(r.tagName)){const h=r.textContent.split(j),u=h.length-1;if(u>0){r.textContent=Ue?Ue.emptyScript:"";for(let g=0;g<u;g++)r.append(h[g],fe()),F.nextNode(),a.push({type:2,index:++s});r.append(h[u],fe())}}}else if(r.nodeType===8)if(r.data===oi)a.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(j,h+1))!==-1;)a.push({type:7,index:s}),h+=j.length-1}s++}}static createElement(e,t){const o=V.createElement("template");return o.innerHTML=e,o}}function te(i,e,t=i,o){var n,c;if(e===ee)return e;let r=o!==void 0?(n=t._$Co)==null?void 0:n[o]:t._$Cl;const s=me(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((c=r==null?void 0:r._$AO)==null||c.call(r,!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,o)),o!==void 0?(t._$Co??(t._$Co=[]))[o]=r:t._$Cl=r),r!==void 0&&(e=te(i,r._$AS(i,e.values),r,o)),e}class nr{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,r=((e==null?void 0:e.creationScope)??V).importNode(t,!0);F.currentNode=r;let s=F.nextNode(),n=0,c=0,a=o[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new we(s,s.nextSibling,this,e):a.type===1?l=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(l=new pr(s,this,e)),this._$AV.push(l),a=o[++c]}n!==(a==null?void 0:a.index)&&(s=F.nextNode(),n++)}return F.currentNode=V,r}p(e){let t=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class we{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,o,r){this.type=2,this._$AH=$,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=te(this,e,t),me(e)?e===$||e==null||e===""?(this._$AH!==$&&this._$AR(),this._$AH=$):e!==this._$AH&&e!==ee&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):rr(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==$&&me(this._$AH)?this._$AA.nextSibling.data=e:this.T(V.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ve.createElement(ai(o.h,o.h[0]),this.options)),o);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(t);else{const n=new nr(r,this),c=n.u(this.options);n.p(t),this.T(c),this._$AH=n}}_$AC(e){let t=qt.get(e.strings);return t===void 0&&qt.set(e.strings,t=new ve(e)),t}k(e){si(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,r=0;for(const s of e)r===t.length?t.push(o=new we(this.S(fe()),this.S(fe()),this,this.options)):o=t[r],o._$AI(s),r++;r<t.length&&(this._$AR(o&&o._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class qe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,r,s){this.type=1,this._$AH=$,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=$}_$AI(e,t=this,o,r){const s=this.strings;let n=!1;if(s===void 0)e=te(this,e,t,0),n=!me(e)||e!==this._$AH&&e!==ee,n&&(this._$AH=e);else{const c=e;let a,l;for(e=s[0],a=0;a<s.length-1;a++)l=te(this,c[o+a],t,a),l===ee&&(l=this._$AH[a]),n||(n=!me(l)||l!==this._$AH[a]),l===$?e=$:e!==$&&(e+=(l??"")+s[a+1]),this._$AH[a]=l}n&&!r&&this.j(e)}j(e){e===$?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ar extends qe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$?void 0:e}}class cr extends qe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$)}}class lr extends qe{constructor(e,t,o,r,s){super(e,t,o,r,s),this.type=5}_$AI(e,t=this){if((e=te(this,e,t,0)??$)===ee)return;const o=this._$AH,r=e===$&&o!==$||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==$&&(o===$||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class pr{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){te(this,e)}}const Ze=ge.litHtmlPolyfillSupport;Ze==null||Ze(ve,we),(ge.litHtmlVersions??(ge.litHtmlVersions=[])).push("3.1.2");const dr=(i,e,t)=>{const o=(t==null?void 0:t.renderBefore)??e;let r=o._$litPart$;if(r===void 0){const s=(t==null?void 0:t.renderBefore)??null;o._$litPart$=r=new we(e.insertBefore(fe(),s),s,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let v=class extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=dr(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ee}};var Wt;v._$litElement$=!0,v.finalized=!0,(Wt=globalThis.litElementHydrateSupport)==null||Wt.call(globalThis,{LitElement:v});const et=globalThis.litElementPolyfillSupport;et==null||et({LitElement:v});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hr={attribute:!0,type:String,converter:je,reflect:!1,hasChanged:ut},ur=(i=hr,e,t)=>{const{kind:o,metadata:r}=t;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),s.set(t.name,i),o==="accessor"){const{name:n}=t;return{set(c){const a=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,a,i)},init(c){return c!==void 0&&this.P(n,void 0,i),c}}}if(o==="setter"){const{name:n}=t;return function(c){const a=this[n];e.call(this,c),this.requestUpdate(n,a,i)}}throw Error("Unsupported decorator location: "+o)};function m(i){return(e,t)=>typeof t=="object"?ur(i,e,t):((o,r,s)=>{const n=r.hasOwnProperty(s);return r.constructor.createProperty(s,n?{...o,wrapped:!0}:o),n?Object.getOwnPropertyDescriptor(r,s):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(i){return m({...i,state:!0,attribute:!1})}const gr="http://localhost:3000/api";function gt(i){return`${gr}${i}`}const tt="http://localhost:3000",fr="/api",st="JWT_AUTH_TOKEN",R=class R{constructor(){this.authenticated=!1,this.username="fellow_traveler",this.signOut=()=>{}}static deauthenticate(e){const t=new R;return console.log("Deauthenticating",e,R._theUser),e===R._theUser&&(localStorage.removeItem(st),R._theUser=t),console.log("Deauthenticated",R._theUser),t}};R._theUser=new R;let O=R;class L extends O{constructor(e,t){super();const r=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),s=decodeURIComponent(window.atob(r).split("").map(function(a){return"%"+("00"+a.charCodeAt(0).toString(16)).slice(-2)}).join("")),n=JSON.parse(s);console.log("Token payload",n),this.token=e,this.authenticated=!1;const c=Math.floor(Date.now()/1e3);n.exp&&n.exp<c?console.log("Token expired"):(console.log("Token not expired"),this.authenticated=!0,this.username=n.username,this.signOut=t),this.username=n.username,this.signOut=t}static authenticate(e,t){return O._theUser=new L(e,t),localStorage.setItem(st,e),O._theUser}static authenticateFromLocalStorage(e){const t=localStorage.getItem(st);return t?L.authenticate(t,e):O._theUser}}class He{constructor(e){this._base=fr,this.json=e}base(e=""){return this._base=e,this}get(e){return fetch(this._url(e),{headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}getAbsolute(e){const t=`${tt}${e}`;return fetch(t,{headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}post(e){return fetch(this._url(e),{method:"POST",headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}postAbsolute(e){const t=`${tt}${e}`;return fetch(t,{method:"POST",headers:this._headers(),body:this.json&&JSON.stringify(this.json)})}put(e){return fetch(this._url(e),{method:"PUT",headers:this._headers(),body:this.json&&JSON.stringify(this.json)}).then(t=>t.status===413?Promise.reject("Payload Too Large"):t.json()).catch(t=>Promise.reject(t))}_headers(){const e=this.json!==void 0,t=O._theUser.authenticated,o={"Content-Type":"application/json"};if(t){const s={Authorization:`Bearer ${O._theUser.token}`};return e?{...o,...s}:s}else return e?{...o}:void 0}_url(e){return`${tt}${this._base}${e}`}}class Ht extends He{constructor(e){super(Object.fromEntries(e))}}class X extends He{constructor(){super(void 0)}}var mr=Object.defineProperty,vr=Object.getOwnPropertyDescriptor,ft=(i,e,t,o)=>{for(var r=o>1?void 0:o?vr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&mr(e,t,r),r};const xt=class xt extends v{constructor(){super(...arguments),this.open=!1,this.alphAsc=!1,this.dateAsc=!1,this.priceAsc=!1,this.sort=["",!0]}openPopup(){this.open=!0}closePopup(e){e.target.classList.contains("popup-overlay")&&(this.open=!1,document.body.style.overflow="",console.log("Closing popup..."))}triggerSort(e){e[0]==="alphabetical"&&(this.alphAsc=!this.alphAsc),e[0]==="date"&&(this.dateAsc=!this.dateAsc),e[0]==="price"&&(this.priceAsc=!this.priceAsc),this.sort=e,this.dispatchEvent(new CustomEvent("sort-requested",{detail:this.sort}))}render(){return p`
  
        <button class="filter-container" @click="${this.openPopup}">
          <svg class="filter-icon">
            <use href="/icons/filter.svg#icon-filter" />
          </svg>
          <h4>Filter</h4>
        </button>

        ${this.open?p`
                <div class="popup-overlay" @click="${this.closePopup}">
                  <div class="popup">
                    <div class="filter-title">
                      <h3>Change Filters</h3>

                      <img
                        class="close"
                        src="/icons/close.svg"
                        alt="close"
                        class="close-button"
                        @click="${()=>this.open=!1}"
                        width="30px"
                      />
                    </div>

                    <button
                      @click="${()=>this.triggerSort(["alphabetical",this.alphAsc])}"
                      class="sort-button"
                    >
                      Sort Alphabetically
                    </button>

                    <button
                      @click="${()=>this.triggerSort(["date",this.dateAsc])}"
                      class="sort-button"
                    >
                      Sort By Date
                    </button>

                    <button
                      @click="${()=>this.triggerSort(["price",this.priceAsc])}"
                      class="sort-button"
                    >
                      Sort By Price
                    </button>
                  </div>
                </div>
              `:""}
      </div>
    `}};xt.styles=_`
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
      height: 40vh;
      width: 40vw;
      border-radius: 5px;
      position: relative;
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

    .filter-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .close {
      cursor: pointer;
    }

    button {
      cursor: pointer;
      background-color: white;
      border: 1px solid var(--color-light);
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 10px;
    }

    button:hover {
      background-color: rgb(230, 230, 230);
    }
  `;let ie=xt;ft([m({reflect:!0,type:Boolean})],ie.prototype,"open",2);ft([b()],ie.prototype,"alphAsc",2);ft([b()],ie.prototype,"sort",2);customElements.define("filter-popup",ie);var br=Object.defineProperty,xr=Object.getOwnPropertyDescriptor,ci=(i,e,t,o)=>{for(var r=o>1?void 0:o?xr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&br(e,t,r),r};let De=class extends v{constructor(){super(...arguments),this.open=!1}render(){return p`
      <section class="category">
        <div>
          <ul class="category-list">
            <li>
              <div class="category-item" @click="${()=>f.go("/app/")}">
                <div class="image-border">
                  <img src="/icons/flame.svg" alt="flame-icon" width="33px" />
                </div>
                <p>Trending</p>
              </div>
            </li>

            <li>
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/american")}"
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
                @click="${()=>f.go("/app/category/italian")}"
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
                @click="${()=>f.go("/app/category/mexican")}"
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
                @click="${()=>f.go("/app/category/japanese")}"
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
                @click="${()=>f.go("/app/category/indian")}"
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
                @click="${()=>f.go("/app/category/date-night")}"
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
                @click="${()=>f.go("/app/category/chicken")}"
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
              <div
                class="category-item"
                @click="${()=>f.go("/app/category/beef")}"
              >
                <div class="image-border">
                  <img
                    src="/icons/beef.svg"
                    alt="beef-icon"
                    width="30px"
                  />
                </div>
                <p>Beef</p>
              </div>
            </li>

            <li>
            
                <div class="more-icon">
                  <svg class="m-icon">
                    <use href="/icons/right-arrow-2.svg#icon-right-arrow" />
                  </svg>
                </div>
         
            </li>
          </ul>
        </div>

        <filter-popup @sort-requested=${this.handleSort}></filter-popup>
      </section>
    `}handleSort(i){let e=i.detail;this.dispatchEvent(new CustomEvent("sort-requested",{detail:e}))}};De.styles=_`
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

    .more-icon:hover {
      cursor: pointer;
      background-color: var(--color-light);
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
  `;ci([m({reflect:!0,type:Boolean})],De.prototype,"open",2);De=ci([y("category-list")],De);var yr=Object.defineProperty,_r=Object.getOwnPropertyDescriptor,li=(i,e,t,o)=>{for(var r=o>1?void 0:o?_r(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&yr(e,t,r),r};let Le=class extends v{constructor(){super(...arguments),this.id=""}handleClick(){const i="/app/recipe/"+this.id;f.go(i)}render(){return p`
      <li class="recipe-container">
        <div @click = ${this.handleClick}>
          <div class="recipe-img-container">
           <slot name="image"></slot>
          </div>
          <h4><slot name="title"></slot></h4>
          <p><slot name="cuisine"></slot></p>
          <p><slot name="price"></slot></p>
        </div>
      </li>
    `}};Le.styles=_`
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
  `;li([m({reflect:!0,type:String})],Le.prototype,"id",2);Le=li([y("recipe-card")],Le);var wr=Object.defineProperty,$r=Object.getOwnPropertyDescriptor,Fe=(i,e,t,o)=>{for(var r=o>1?void 0:o?$r(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&wr(e,t,r),r};let re=class extends v{constructor(){super(...arguments),this.sorted=!1,this.recipeList=[],this.sort=["",!0],this.sortedRecipes=[...this.recipeList]}convertPrice(i){let e="",t=0;for(let o=0;o<i&&(e+="$",t++,!(t>4));o+=5);return e}sortAlphabetically(){if(this.sortedRecipes=[...this.recipeList],this.sort[0]=="alphabetical"&&(this.sort[1]?this.sortedRecipes=this.sortedRecipes.sort((i,e)=>e.name.localeCompare(i.name)):this.sortedRecipes=this.sortedRecipes.sort((i,e)=>i.name.localeCompare(e.name))),this.sort[0]=="price"&&(this.sort[1]?this.sortedRecipes=this.sortedRecipes.sort((i,e)=>e.cost-i.cost):this.sortedRecipes=this.sortedRecipes.sort((i,e)=>i.cost-e.cost)),this.sort[0]==="date"){const i=this.sort[1];this.sortedRecipes=this.sortedRecipes.sort((e,t)=>{const o=new Date(e.date).getTime(),r=new Date(t.date).getTime();return i?o-r:r-o})}this.requestUpdate()}updated(i){i.has("recipeList")&&(this.sortedRecipes=[...this.recipeList],this.requestUpdate()),i.has("sort")&&this.sortAlphabetically()}capitalizeFirstLetter(i){return i.charAt(0).toUpperCase()+i.slice(1)}render(){return p`
      <div class="container">
        <ul class="recipe-list">
          ${this.sortedRecipes.map(i=>p`
              <recipe-card .id=${i._id}>
                <img
                  slot="image"
                  src="${i.picture}"
                  alt="${i.name}"
                />
                <span slot="title">${i.name}</span>
                <span slot="cuisine"
                  >${this.capitalizeFirstLetter(i.cuisine)}</span
                >
                <span slot="price">${this.convertPrice(i.cost)}</span>
              </recipe-card>
            `)}
        </ul>
      </div>
    `}};re.styles=_`
    * {
      margin: 0;
      padding: 0;
      font-family: "Raleway", sans-serif;
    }

    // :host {
    //   display: inline-block;
    //   position: relative;
    // }

    .recipe-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

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
  `;Fe([m({reflect:!0,type:Boolean})],re.prototype,"sorted",2);Fe([m({reflect:!0,type:Array})],re.prototype,"recipeList",2);Fe([m({reflect:!0,type:Boolean})],re.prototype,"sort",2);re=Fe([y("recipe-grid")],re);var Pr=Object.defineProperty,Er=Object.getOwnPropertyDescriptor,mt=(i,e,t,o)=>{for(var r=o>1?void 0:o?Er(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Pr(e,t,r),r};let be=class extends v{constructor(){super(...arguments),this.open=!1,this.recipeList=[],this.sort=["",!0]}connectedCallback(){super.connectedCallback(),new X().getAbsolute("/recipes/trending").then(t=>{if(t.status===200)return t.json()}).then(t=>{this.recipeList=t,this.requestUpdate()})}handleSort(i){let e=i.detail;this.sort=e,this.requestUpdate()}render(){return p`
      <div>
        <category-list @sort-requested=${this.handleSort}></category-list>
        <section class="trending">
          <h2>Trending Recipes</h2>

          <recipe-grid
            .recipeList=${this.recipeList}
            .sort=${this.sort}
          ></recipe-grid>
        </section>
      </div>
    `}};be.styles=_`
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
  `;mt([m({reflect:!0,type:Boolean})],be.prototype,"open",2);mt([b()],be.prototype,"recipeList",2);be=mt([y("trending-view")],be);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let pi=class extends Event{constructor(e,t,o){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=t,this.subscribe=o??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ft=class{constructor(e,t,o,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(s,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(s,n)),this.unsubscribe=n},this.host=e,t.context!==void 0){const s=t;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??!1}else this.context=t,this.callback=o,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new pi(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ar{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const o=t||!Object.is(e,this.o);this.o=e,o&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:o}]of this.subscriptions)t(this.o,o)},e!==void 0&&(this.value=e)}addCallback(e,t,o){if(!o)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Cr=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}};class Bt extends Ar{constructor(e,t,o){var r,s;super(t.context!==void 0?t.initialValue:o),this.onContextRequest=n=>{const c=n.composedPath()[0];n.context===this.context&&c!==this.host&&(n.stopPropagation(),this.addCallback(n.callback,c,n.subscribe))},this.onProviderRequest=n=>{const c=n.composedPath()[0];if(n.context!==this.context||c===this.host)return;const a=new Set;for(const[l,{consumerHost:d}]of this.subscriptions)a.has(l)||(a.add(l),d.dispatchEvent(new pi(this.context,l,!0)));n.stopPropagation()},this.host=e,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),(s=(r=this.host).addController)==null||s.call(r,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Cr(this.context))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Or({context:i}){return(e,t)=>{const o=new WeakMap;if(typeof t=="object")return t.addInitializer(function(){o.set(this,new Bt(this,{context:i}))}),{get(){return e.get.call(this)},set(r){var s;return(s=o.get(this))==null||s.setValue(r),e.set.call(this,r)},init(r){var s;return(s=o.get(this))==null||s.setValue(r),r}};{e.constructor.addInitializer(n=>{o.set(n,new Bt(n,{context:i}))});const r=Object.getOwnPropertyDescriptor(e,t);let s;if(r===void 0){const n=new WeakMap;s={get:function(){return n.get(this)},set:function(c){o.get(this).setValue(c),n.set(this,c)},configurable:!0,enumerable:!0}}else{const n=r.set;s={...r,set:function(c){o.get(this).setValue(c),n==null||n.call(this,c)}}}return void Object.defineProperty(e,t,s)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $e({context:i,subscribe:e}){return(t,o)=>{typeof o=="object"?o.addInitializer(function(){new Ft(this,{context:i,callback:r=>{this[o.name]=r},subscribe:e})}):t.constructor.addInitializer(r=>{new Ft(r,{context:i,callback:s=>{r[o]=s},subscribe:e})})}}var kr=Object.defineProperty,Sr=Object.getOwnPropertyDescriptor,Be=(i,e,t,o)=>{for(var r=o>1?void 0:o?Sr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&kr(e,t,r),r};let ae="auth",xe=class extends v{constructor(){super(...arguments),this.loginStatus=0,this.registerStatus=0,this.user=L.authenticateFromLocalStorage(()=>this._signOut())}isAuthenticated(){return this.user.authenticated}render(){return p`${p`<slot .user=${this.user}></slot>`}`}_handleLogin(i){i.preventDefault();const e=i.target,t=new FormData(e);new Ht(t).base().post("/api/login").then(r=>{if(r.status===200)return r.json();this.loginStatus=r.status}).then(r=>{r&&(console.log("Authentication:",r.token),this.user=L.authenticate(r.token,()=>this._signOut()),this.requestUpdate())})}_handleRegister(i){i.preventDefault();const e=i.target,t=new FormData(e);new Ht(t).base().post("/signup").then(r=>{if(r.status===200)return r.json();this.registerStatus=r.status}).then(r=>{console.log("Registration:",r)})}_signOut(){this.user=O.deauthenticate(this.user),document.location.reload()}};Be([b()],xe.prototype,"loginStatus",2);Be([b()],xe.prototype,"registerStatus",2);Be([Or({context:ae}),b()],xe.prototype,"user",2);xe=Be([y("auth-required")],xe);var Rr=Object.defineProperty,Tr=Object.getOwnPropertyDescriptor,I=(i,e,t,o)=>{for(var r=o>1?void 0:o?Tr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Rr(e,t,r),r};let S=class extends v{constructor(){super(...arguments),this.path="",this.pictureUploadFailed=!1,this.errorMessage="",this.editName=!1,this.editUsername=!1,this.editEmail=!1,this.editPhone=!1,this.editPicture=!1}render(){var i,e,t,o,r,s,n,c,a,l;return p`
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
                ${this.editName?p`<input
                      class="edit-input"
                      type="text"
                      value="${(i=this.profile)==null?void 0:i.name}"
                      @change="${d=>this.handleFormChange(0,d)}"
                    />`:p`<p>${(e=this.profile)==null?void 0:e.name}</p>`}
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
                ${this.editUsername?p`<input
                      class="edit-input"
                      type="text"
                      value="${(t=this.profile)==null?void 0:t.userid}"
                      @change="${d=>this.handleFormChange(1,d)}"
                    />`:p`<p>${(o=this.profile)==null?void 0:o.userid}</p>`}
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Email Address</h5>
                <h4 @click="${()=>this.toggleEditMode(2)}">Edit</h4>
              </div>
              <div class="pi-content">
                ${this.editEmail?p`<input
                      class="edit-input"
                      type="text"
                      value="${(r=this.profile)==null?void 0:r.email}"
                      @change="${d=>this.handleFormChange(2,d)}"
                    />`:p`<p>${(s=this.profile)==null?void 0:s.email}</p>`}
              </div>
            </div>

            <div class="pi-block">
              <div class="pi-header">
                <h5>Phone Number</h5>
                <h4 @click="${()=>this.toggleEditMode(3)}">Edit</h4>
              </div>
              <div class="pi-content">
                ${this.editPhone?p`<input
                      class="edit-input"
                      type="text"
                      value="${(n=this.profile)==null?void 0:n.phone}"
                      @change="${d=>this.handleFormChange(3,d)}"
                    />`:p`<p>
                      ${((c=this.profile)==null?void 0:c.phone)==null||this.profile.phone===""?"Add Phone":this.profile.phone}
                    </p>`}
              </div>
            </div>
          </div>

          <div class="pi-img">
            ${(a=this.profile)!=null&&a.picture?p`<img
                  src="${(l=this.profile)==null?void 0:l.picture}"
                  alt="Profile"
                  draggable="false"
                  @click="${()=>this.toggleEditMode(4)}"
                />`:p` <img
                  src="/images/empty-pfp.png"
                  alt="Profile"
                  draggable="false"
                  @click="${()=>this.toggleEditMode(4)}"
                />`}

            <p class = "upload" @click="${()=>this.toggleEditMode(4)}">Replace</p>

            ${this.pictureUploadFailed?p`<p class="error">Upload failed: ${this.errorMessage}</p>`:p``}
          </div>
        </div>
      </div>
    `}toggleEditMode(i){var e;if(i===0&&(this.editUsername=!1,this.editEmail=!1,this.editPhone=!1,this.editPicture=!1),i===1&&(this.editName=!1,this.editEmail=!1,this.editPhone=!1,this.editPicture=!1),i===2&&(this.editName=!1,this.editUsername=!1,this.editPhone=!1,this.editPicture=!1),i===3&&(this.editName=!1,this.editUsername=!1,this.editEmail=!1,this.editPicture=!1),i===4){this.oldPicture=(e=this.profile)==null?void 0:e.picture;const t=document.createElement("input");t.type="file",t.accept="image/*",t.addEventListener("change",o=>{const s=o.target.files[0];new Promise((c,a)=>{const l=new FileReader;l.onload=()=>c(l.result),l.onerror=d=>a(d),l.readAsDataURL(s)}).then(c=>{this.avatar=c,this.profile.picture=c,this.updateProfile()})}),t.click()}i===0?this.editName=!this.editName:i===1?this.editUsername=!this.editUsername:i===2?this.editEmail=!this.editEmail:i===3?this.editPhone=!this.editPhone:i===4&&(this.editPicture=!this.editPicture),this.requestUpdate()}updateProfile(){var t,o,r,s,n,c,a,l,d;let i={};this.avatar!==void 0?i={name:(t=this.profile)==null?void 0:t.name,userid:(o=this.profile)==null?void 0:o.userid,email:(r=this.profile)==null?void 0:r.email,phone:(s=this.profile)==null?void 0:s.phone,picture:(n=this.profile)==null?void 0:n.picture}:i={name:(c=this.profile)==null?void 0:c.name,userid:(a=this.profile)==null?void 0:a.userid,email:(l=this.profile)==null?void 0:l.email,phone:(d=this.profile)==null?void 0:d.phone},new He(i).put(this.path).then(h=>h.status===200?h.json():null).then(h=>{h&&(console.log("PUT request successful:",h),this.profile=h,this.pictureUploadFailed=!1,this.errorMessage="")}).catch(h=>{this.profile.picture=this.oldPicture??"",this.requestUpdate(),this.pictureUploadFailed=!0,this.errorMessage=h,setTimeout(()=>{this.pictureUploadFailed=!1,this.errorMessage=""},3e3),console.log("Failed to POST form data",h)})}handleFormChange(i,e){const t=e.target.value;i===0&&(this.profile.name=t),i===1&&(this.profile.userid=t),i===2&&(this.profile.email=t),i===3&&(this.profile.phone=t),this.updateProfile(),this.toggleEditMode(i),i===0&&alert("Name changed"),i===1&&alert("User id changed"),i===2&&alert("Email changed"),i===3&&alert("Phone number changed")}_fetchData(i){fetch(gt(i),{method:"GET",headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(e=>e.status===200?e.json():(console.log("Error fetching data",e),null)).then(e=>{e&&(this.profile=e)}).catch(e=>{console.log("Error fetching data",e)})}_getData(i){new X().get(i).then(t=>t.status===200?t.json():null).then(t=>{this.profile=t}).catch(t=>{console.log("Error fetching data",t)})}async connectedCallback(){var i;if(super.connectedCallback(),this.requestUpdate(),await new Promise(e=>{const t=()=>{this.user!==void 0&&this.user!==null?e():setTimeout(t,100)};t()}),this.user&&this.user.authenticated===!1){console.log(this.user),f.go("/app/login");return}if(this.location){const e=this.location.pathname.split("/"),t=e.indexOf("profile")+1,o=e[t];o!==((i=this.user)==null?void 0:i.username)&&f.go("/app/"),this.path=`/profiles/${o}`}this.path&&(console.log("Fetching data from",this.path),this._getData(this.path))}attributeChangedCallback(i,e,t){i==="path"&&e!==t&&e&&this._getData(t),super.attributeChangedCallback(i,e,t)}};S.styles=_`
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
  `;I([m({attribute:!1})],S.prototype,"location",2);I([m()],S.prototype,"path",2);I([b()],S.prototype,"profile",2);I([$e({context:ae,subscribe:!0}),m({attribute:!1})],S.prototype,"user",2);I([b()],S.prototype,"avatar",2);I([b()],S.prototype,"oldPicture",2);I([b()],S.prototype,"pictureUploadFailed",2);S=I([y("user-profile")],S);var jr=Object.defineProperty,Ur=Object.getOwnPropertyDescriptor,di=(i,e,t,o)=>{for(var r=o>1?void 0:o?Ur(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&jr(e,t,r),r};let ze=class extends v{render(){var i;return p`
      <div class="profile-content">
        <div class="profile-header">
          <h2>Account</h2>
          <div class="inline">
            ${(i=this.user)!=null&&i.username?p`<p>${this.user.username}</p>`:p``}
            <p>· Go to</p>
            <p class="link" @click=${()=>{var e;return f.go("/app/profile/"+((e=this.user)==null?void 0:e.username))}}>Profile</p>
          </div>
        </div>

        <div class="profile-tabs">
          <div @click=${()=>{var e;return f.go("/app/profile/"+((e=this.user)==null?void 0:e.username))}}>
            <img src="/icons/profile.svg" alt="profile-icon" />
            <h3>Personal Info</h3>
            <p>Personal Details and Account information</p>
          </div>
          <!-- <div @click=${()=>f.go("/app/groups")}>
            <img src="/images/groups.png" alt="groups-icon" />
            <h3>Groups</h3>
            <p>Find and create groups</p>
          </div> -->
          <div @click=${()=>f.go("/app/my-recipes")}>
            <img src="/icons/notes.svg" alt="recipe-icon" />
            <h3>My Recipes</h3>
            <p>View your recipes of your own creation</p>
          </div>
        </div>
      </div>
    `}};ze.styles=[_`
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
    `];di([$e({context:ae,subscribe:!0}),m({attribute:!1})],ze.prototype,"user",2);ze=di([y("account-view")],ze);var Dr=Object.defineProperty,Lr=Object.getOwnPropertyDescriptor,zr=(i,e,t,o)=>{for(var r=o>1?void 0:o?Lr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Dr(e,t,r),r};let nt=class extends v{render(){return p`
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
    `}};nt.styles=_`
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
  `;nt=zr([y("group-view")],nt);var Ir=Object.defineProperty,Nr=Object.getOwnPropertyDescriptor,Ve=(i,e,t,o)=>{for(var r=o>1?void 0:o?Nr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Ir(e,t,r),r};let oe=class extends v{constructor(){super(...arguments),this.open=!1,this.recipeList=[]}connectedCallback(){var t;super.connectedCallback();const i="/recipes/user/"+((t=this.user)==null?void 0:t.username);console.log(i),new X().getAbsolute(i).then(o=>{if(o.status===200)return o.json()}).then(o=>{this.recipeList=o,this.requestUpdate()})}render(){return p`
      <div>
        <section class="trending">
          <h2>My Recipes</h2>

          <recipe-grid .recipeList=${this.recipeList}></recipe-grid>
        </section>
      </div>
    `}};oe.styles=_`
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
      margin-top: 110px;
    }
  `;Ve([m({reflect:!0,type:Boolean})],oe.prototype,"open",2);Ve([b()],oe.prototype,"recipeList",2);Ve([$e({context:ae,subscribe:!0}),m({attribute:!1})],oe.prototype,"user",2);oe=Ve([y("user-recipes")],oe);var Mr=Object.defineProperty,qr=Object.getOwnPropertyDescriptor,vt=(i,e,t,o)=>{for(var r=o>1?void 0:o?qr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Mr(e,t,r),r};let ye=class extends v{constructor(){super(...arguments),this.activeTab=0}changeTab(i){this.activeTab=i}renderDirections(){var i;return p`
      <div class="card-directions">
        ${(i=this.recipe)==null?void 0:i.directions.map((e,t)=>p` <h4>Step ${t+1}</h4>
            <p>${e}</p>`)}
      </div>
    `}renderIngredients(){var i;return p`
      <div class="card-ingredients">
        <h4>Ingredients</h4>

        ${(i=this.recipe)==null?void 0:i.ingredients.map(e=>p` <p>${e}</p>`)}
      </div>
    `}renderTools(){var i;return p`
      <div class="card-tools">
        <h4>Tools</h4>

        ${(i=this.recipe)==null?void 0:i.tools.map(e=>p` <p>${e}</p>`)}
      </div>
    `}_getData(i){new X().getAbsolute(i).then(t=>t.status===200?t.json():null).then(t=>{this.recipe=t,this.requestUpdate()}).catch(t=>{console.log("Error fetching data",t)})}connectedCallback(){var t;super.connectedCallback(),window.scrollTo(0,0);const e=`/recipes/${(t=this.location)==null?void 0:t.params.recipeid}`;this._getData(e)}attributeChangedCallback(i,e,t){i==="path"&&e!==t&&e&&this._getData(t),super.attributeChangedCallback(i,e,t)}capitalize(i){return i.charAt(0).toUpperCase()+i.slice(1)}render(){var i,e,t,o,r,s,n,c;return p`
      <div>
        <section class="recipe-content">
          <div class="recipe-header">
            <h2>${(i=this.recipe)==null?void 0:i.name}</h2>

            <div class="recipe-stats">
              <div class="time-stat">
                <img src="/icons/alarm.svg" alt="heart" width="20px" />
                <p>
                  ${(e=this.recipe)!=null&&e.time?((t=this.recipe)==null?void 0:t.time)+" minutes":"N/A"}
                </p>
              </div>

              <div class="cost-stat">
                <img src="/icons/money.svg" alt="money" width="25px" />
                <p>
                  ${(o=this.recipe)!=null&&o.cost?"$"+((r=this.recipe)==null?void 0:r.cost)+" per serving":"N/A"}
                </p>
              </div>
            </div>
          </div>
          <p class="author">By ${(s=this.recipe)==null?void 0:s.userid}</p>

          <div class="tags-container">
            <div class="tag-title">
              <img src="/icons/tag.svg" alt="tag icon" width="25px" />
              <h5>Tags:</h5>
            </div>

            <div class="tags">
              ${(n=this.recipe)==null?void 0:n.tags.map(a=>p`<p @click = ${()=>f.go("/app/category/"+a)}>${this.capitalize(a)}</p>`)}
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
                  ${this.activeTab===0?this.renderDirections():p``}
                  ${this.activeTab===1?this.renderIngredients():p``}
                  ${this.activeTab===2?this.renderTools():p``}
                </div>
              </div>
            </div>

            <div class="recipe-images">
              <img src=${(c=this.recipe)==null?void 0:c.picture} alt="Recipe Image" />
            </div>
          </div>
        </section>
      </div>
    `}};ye.styles=_`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .recipe-header {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .author {
      font-size: 15px;
      font-weight: 300;
      color: #333;
      margin-bottom: 10px;
      text-decoration: underline;
      cursor: pointer;
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
  `;vt([m({attribute:!1})],ye.prototype,"location",2);vt([b()],ye.prototype,"activeTab",2);ye=vt([y("recipe-view")],ye);var Hr=Object.defineProperty,Fr=Object.getOwnPropertyDescriptor,hi=(i,e,t,o)=>{for(var r=o>1?void 0:o?Fr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Hr(e,t,r),r};let Ie=class extends v{constructor(){super(),this.on=!1;const i=localStorage.getItem("darkMode");i!==null&&(this.on=JSON.parse(i),this.on?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode"))}render(){return p`<label>
      <slot class="mode">${this.on?"Dark":"Light"}</slot>
      <span class="slider">
        <input type="checkbox" .checked=${this.on} @change=${this._handleChange} />
      </span>
    </label>`}_handleChange(i){const e=i.target;this.on=e==null?void 0:e.checked,localStorage.setItem("darkMode",JSON.stringify(this.on)),this.on?document.body.classList.add("dark-mode"):document.body.classList.remove("dark-mode")}};Ie.styles=_`
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
  `;hi([m({reflect:!0,type:Boolean})],Ie.prototype,"on",2);Ie=hi([y("toggle-switch")],Ie);var Br=Object.defineProperty,Vr=Object.getOwnPropertyDescriptor,Wr=(i,e,t,o)=>{for(var r=o>1?void 0:o?Vr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Br(e,t,r),r};let at=class extends v{render(){return p`
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
    `}};at.styles=_`
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
  `;at=Wr([y("setting-view")],at);var Jr=Object.defineProperty,Kr=Object.getOwnPropertyDescriptor,Pe=(i,e,t,o)=>{for(var r=o>1?void 0:o?Kr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Jr(e,t,r),r};let W=class extends v{constructor(){super(...arguments),this.recipeList=[],this.sort=!1}convertToTitleCase(i){return i.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}connectedCallback(){if(super.connectedCallback(),this.location){const i=this.location.pathname.split("/"),e=i.indexOf("category")+1,t=i[e];this.category=t;let o=this.convertToTitleCase(t);this.Category=o;const r=`/recipes/tag/${this.category}`;new X().getAbsolute(r).then(n=>{if(n.status===200)return n.json()}).then(n=>{this.recipeList=n,this.requestUpdate()})}}handleSort(i){let e=i.detail;this.sort=e,this.requestUpdate()}render(){return p`
      <div>
        <category-list @sort-requested=${this.handleSort}></category-list>
        <section class="trending">
          <h2>${this.Category} Recipes</h2>

          <recipe-grid
            .recipeList=${this.recipeList}
            .sort=${this.sort}
          ></recipe-grid>
        </section>
      </div>
    `}};W.styles=_`
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
  `;Pe([m({attribute:!1})],W.prototype,"location",2);Pe([b()],W.prototype,"category",2);Pe([b()],W.prototype,"Category",2);Pe([b()],W.prototype,"recipeList",2);W=Pe([y("category-view")],W);var Gr=Object.defineProperty,Xr=Object.getOwnPropertyDescriptor,bt=(i,e,t,o)=>{for(var r=o>1?void 0:o?Xr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Gr(e,t,r),r};let _e=class extends v{constructor(){super(...arguments),this.open=!1,this.cuisine=null}_selectCuisine(i){this.cuisine=i,this.dispatchEvent(new CustomEvent("cuisine-selected",{detail:i}))}render(){return p`
      <div class="all">
        <input
          type="checkbox"
          id="is-shown"
          @change=${this._handleChange}
          .checked=${this.open}
        />
        <label for="is-shown">
          <div class="navbar-menu">
            <h5>${this.cuisine?this.cuisine:p`Select Cuisine`}</h5>
          </div>
        </label>

        <slot name="menu">
          <ul>
            <li class="command">
              <p
                @click=${()=>{this._toggle(!1),this._selectCuisine("American")}}
              >
                American
              </p>
            </li>

            <li class="command">
              <p
                @click=${()=>{this._toggle(!1),this._selectCuisine("Italian")}}
              >
                Italian
              </p>
            </li>

            <li class="command">
              <p
                @click=${()=>{this._toggle(!1),this._selectCuisine("Mexican")}}
              >
                Mexican
              </p>
            </li>

            <li class="command">
              <p
                @click=${()=>{this._toggle(!1),this._selectCuisine("Japanese")}}
              >
                Japanese
              </p>
            </li>

            <li class="command">
              <p
                @click=${()=>{this._toggle(!1),this._selectCuisine("Chinese")}}
              >
                Chinese
              </p>
            </li>

            <li class="command">
              <p
                @click=${()=>{this._toggle(!1),this._selectCuisine("Indian")}}
              >
                Indian
              </p>
            </li>

            <li class="command">
              <p
                @click=${()=>{this._toggle(!1),this._selectCuisine("French")}}
              >
                French
              </p>
            </li>
          </ul>
        </slot>
      </div>
    `}_handleChange(i){const e=i.target;this._toggle(e==null?void 0:e.checked)}_toggle(i){this.open=i,this._toggleClickAway(i)}_toggleClickAway(i){const e=t=>{t.composedPath().includes(this)?t.stopPropagation():this._toggle(!1)};i?document.addEventListener("click",e):document.removeEventListener("click",e)}};_e.styles=_`
    :host {
      display: inline-block;
      position: relative;
    }

    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
    }

    .navbar-menu h5 {
      font-size: 15px;
      font-weight: 500;
      color: var(--color-primary);
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
      left: 0;
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
      padding: 10px;
      padding-left: 8px;
      padding-right: 8px;
      border-radius: 5px;
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
  `;bt([m({reflect:!0,type:Boolean})],_e.prototype,"open",2);bt([b()],_e.prototype,"cuisine",2);_e=bt([y("cuisine-drop-down")],_e);var Yr=Object.defineProperty,Qr=Object.getOwnPropertyDescriptor,We=(i,e,t,o)=>{for(var r=o>1?void 0:o?Qr(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Yr(e,t,r),r};let se=class extends v{constructor(){super(...arguments),this.activeTab=0,this.path="/recipes",this.recipeCost=null,this.recipeTime=null,this.steps=[],this.ingredients=[],this.tools=[],this.recipeTitle="",this.editTitle=!0,this.editTime=!1,this.editCost=!1,this.picture=null,this.cuisine=null,this.tags=[]}changeTab(i){this.activeTab=i}_addSteps(i){const e=i.target,t=e.value;t&&(this.steps.push(t),e.value="",this.requestUpdate())}_addIngredients(i){const e=i.target,t=e.value;t&&(this.ingredients.push(t),e.value="",this.requestUpdate())}_addTools(i){const e=i.target,t=e.value;t&&(this.tools.push(t),e.value="",this.requestUpdate())}renderDirections(){return p`<div class="card-directions">
      ${this.steps.map((i,e)=>p`
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
    </div>`}renderIngredients(){return p`<div class="card-directions">
      ${this.ingredients.map((i,e)=>p`
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
    </div>`}renderTools(){return p`<div class="card-directions">
      ${this.tools.map((i,e)=>p`
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
    </div>`}_handleSubmit(){var t,o;if(!((t=this.user)!=null&&t.authenticated)){console.log("User is not authenticated");return}const i={name:this.recipeTitle,cost:this.recipeCost,time:this.recipeTime,directions:this.steps,ingredients:this.ingredients,tools:this.tools,picture:this.picture||"",userid:(o=this.user)==null?void 0:o.username,cuisine:this.cuisine,tags:this.tags};console.log(i),new He(i).postAbsolute(this.path).then(r=>r.json()).then(r=>{console.log(r._id),f.go("/app/recipe/"+r._id)}).catch(r=>{console.error(r)})}handleEditTitle(){this.editTitle=!this.editTitle,this.requestUpdate()}handleTitleChange(i){const t=i.target.value;this.recipeTitle=t,this.handleEditTitle()}handleTimeChange(i){const t=i.target.value;isNaN(parseInt(t))||(this.recipeTime=parseInt(t),this.handleEditTime())}handleCostChange(i){const t=i.target.value;isNaN(parseInt(t))||(this.recipeCost=parseInt(t),this.handleEditCost())}handleImageUpload(){console.log("Image Upload");const i=document.createElement("input");i.type="file",i.accept="image/*",i.addEventListener("change",e=>{const o=e.target.files[0];new Promise((s,n)=>{const c=new FileReader;c.onload=()=>{const a=new Image;a.onload=()=>s(a),a.onerror=l=>n(l),a.src=c.result},c.onerror=a=>n(a),c.readAsDataURL(o)}).then(s=>{const c=document.createElement("canvas"),a=c.getContext("2d");let l,d,h=0,u=0;s.width/s.height>1?(d=s.height,l=s.height*1,h=(s.width-l)/2):(l=s.width,d=s.width/1,u=(s.height-d)/2),c.width=l,c.height=d,a.drawImage(s,h,u,l,d,0,0,l,d);const g=c.toDataURL("image/jpeg",1);this.picture=g,this.requestUpdate()})}),i.click()}handleEditTime(){this.editTime=!this.editTime,this.requestUpdate()}handleEditCost(){this.editCost=!this.editCost,this.requestUpdate()}handleCuisineChange(i){const t=i.target.value;this.cuisine=t,this.requestUpdate()}handleCuisineSelected(i){let e=i.detail;e=e.toLowerCase(),this.cuisine=e,this.tags.push(e)}render(){return p`<section class="recipe-content">
      <div class="space-between">
        <div class="create-class">
          ${this.editTitle?p`<input
                class="title-input"
                type="text"
                name="title"
                value=${this.recipeTitle}
                placeholder="Recipe Title"
                @change=${i=>this.handleTitleChange(i)}
              />`:p`<h2 @click=${this.handleEditTitle}>${this.recipeTitle}</h2>`}
          <img
            @click=${this.recipeTitle!=""&&this.handleEditTitle}
            src="/icons/edit.svg"
            alt="edit-icon"
          />
        </div>

        <div class="post-container">
          ${this.recipeTitle&&this.picture&&this.cuisine&&this.steps&&this.ingredients&&this.tools?p`<button class="save-button" @click=${this._handleSubmit}>
                <h3>Post</h3>
              </button>`:p`<button class="save-button-disabled" disabled>
                <h3>Post</h3>
              </button>`}
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
          ${this.editTime?p`<input
                class="time-cost-buttons"
                type="text"
                @change=${i=>this.handleTimeChange(i)}
              />`:p`<p @click=${this.handleEditTime}>
                ${this.recipeTime?this.recipeTime+" minutes":p`Add Time`}
              </p>`}
        </div>

        <div class="cost-stat">
          <img
            @click=${this.handleEditCost}
            src="/icons/money.svg"
            alt="money"
            width="25px"
          />
          ${this.editCost?p`<input
                class="time-cost-buttons"
                type="text"
                @change=${i=>this.handleCostChange(i)}
              />`:p`<p @click=${this.handleEditCost}>
                ${this.recipeCost?"$"+this.recipeCost:p`Add Cost`}
              </p>`}
        </div>
      </div>

      <div class="cuisine-input">
        <p>Cuisine:</p>
        <cuisine-drop-down
          @cuisine-selected=${this.handleCuisineSelected}
        ></cuisine-drop-down>
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
          ${this.picture?p`<img src="${this.picture}" alt="Recipe Image" />`:p`<img src="/images/add-image.png" alt="Recipe Image" />`}
        </div>
      </div>
    </section>`}};se.styles=_`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .cuisine-input {
      display: flex;
      align-items: center;
      gap: 10px;

      margin-top: 20px;
    }

    .save-button {
      padding: 20px;
      border-radius: 10px;
      border: none;
      background-color: var(--color-primary-orange);
      color: white;
      font-size: 15px;
      font-weight: 600;
    }

    .save-button-disabled{
      padding: 20px;
      border-radius: 10px;
      border: none;
      background-color: lightgray;
      color: white;
      font-size: 15px;
      font-weight: 600;
    }

    


    .cuisine-input p {
      font-size: 16px;
      font-weight: 500;
      color: var(--color-primary);
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
      width: 100%;
      height: 70vh;
    }

    .uploaded-image:hover {
      opacity: 70%;
    }

    .uploaded-image img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
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
  `;We([$e({context:ae,subscribe:!0}),m({attribute:!1})],se.prototype,"user",2);We([b()],se.prototype,"activeTab",2);We([b()],se.prototype,"recipeCost",2);se=We([y("create-view")],se);var Zr=Object.defineProperty,eo=Object.getOwnPropertyDescriptor,to=(i,e,t,o)=>{for(var r=o>1?void 0:o?eo(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&Zr(e,t,r),r};let ct=class extends v{render(){return p`
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
    `}};ct.styles=_`
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
  `;ct=to([y("public-profile-view")],ct);var io=Object.defineProperty,ro=Object.getOwnPropertyDescriptor,ce=(i,e,t,o)=>{for(var r=o>1?void 0:o?ro(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&io(e,t,r),r};let z=class extends v{constructor(){super(),this.user=L.authenticateFromLocalStorage(()=>this._signOut()),this.path="/login",this.password="",this.username="",this.loginStatus=0,this.username="",this.password=""}render(){return p`
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
              ${this.loginStatus?`Login failed: ${this.loginStatus}`:p``}
            </p>

            <div class="register-link">
              <p>Don't have an account?</p>
              <p @click=${()=>f.go("/app/signup")}>Register</p>
            </div>
          </div>
        </div>
      </div>
    `}handleSubmit(i){i.preventDefault(),fetch(gt(this.path),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,pwd:this.password})}).then(e=>{if(e.status===200)return e.json();this.loginStatus=e.status}).then(e=>{if(e){console.log("Authentication:",e.token),this.user=L.authenticate(e.token,()=>this._signOut());const o=new URLSearchParams(window.location.search).get("redirect");o?f.go(o):window.location.href="/app/",this.requestUpdate()}})}handleUsernameChange(i){const e=i.target;this.username=e.value}handlePasswordChange(i){const e=i.target;this.password=e.value}_signOut(){this.user=O.deauthenticate(this.user),document.location.reload()}};z.styles=_`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
      box-sizing: border-box;
    }

    button {
      cursor: pointer;
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
  `;ce([b()],z.prototype,"user",2);ce([m()],z.prototype,"path",2);ce([m({reflect:!0,type:Boolean})],z.prototype,"password",2);ce([m({reflect:!0,type:Boolean})],z.prototype,"username",2);ce([b()],z.prototype,"loginStatus",2);z=ce([y("login-view")],z);var oo=Object.defineProperty,so=Object.getOwnPropertyDescriptor,Ee=(i,e,t,o)=>{for(var r=o>1?void 0:o?so(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&oo(e,t,r),r};let J=class extends v{constructor(){super(),this.path="/signup",this.password="",this.username="",this.windowWidth=window.innerWidth,this.username="",this.password=""}render(){return p`<div class="login-content">
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
    </div> `}handleSubmit(i){i.preventDefault(),console.log("Username:",this.username),fetch(gt(this.path),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,pwd:this.password})}).then(e=>{if(e.status===201)return f.go("/app/login"),e.json();console.log("Error:",e.status)})}handleUsernameChange(i){const e=i.target;this.username=e.value}handlePasswordChange(i){const e=i.target;this.password=e.value}};J.styles=_`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
      box-sizing: border-box;
    }

    button {
      cursor: pointer;
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

      .login-content {
        height: 80vh;
      }
    }
  `;Ee([m()],J.prototype,"path",2);Ee([m({reflect:!0,type:Boolean})],J.prototype,"password",2);Ee([m({reflect:!0,type:Boolean})],J.prototype,"username",2);Ee([b()],J.prototype,"windowWidth",2);J=Ee([y("signup-view")],J);var no=Object.defineProperty,ao=Object.getOwnPropertyDescriptor,ui=(i,e,t,o)=>{for(var r=o>1?void 0:o?ao(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&no(e,t,r),r};let Ne=class extends v{render(){return p`
      <auth-required>
       <user-profile .location="${this.location}"></user-profile>
      </auth-required>
    `}};Ne.styles=_`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }


  `;ui([m({attribute:!1})],Ne.prototype,"location",2);Ne=ui([y("test-component")],Ne);var co=Object.defineProperty,lo=Object.getOwnPropertyDescriptor,Je=(i,e,t,o)=>{for(var r=o>1?void 0:o?lo(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&co(e,t,r),r};let ne=class extends v{constructor(){super(...arguments),this.open=!1,this.user=L.authenticateFromLocalStorage(()=>this._signOut())}render(){return p`
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
            <li class="no-display"><toggle-switch></toggle-switch></li>
            ${this.user.authenticated?p`<li class="command">
            
            <p @click = ${()=>{this._toggle(!1),f.go("/app/account")}}>Account</a>
              </li>`:p``}
            ${this.user.authenticated?p`<li class="command">
                  <p
                    @click=${()=>{this._toggle(!1),f.go("/app/profile/"+this.user.username)}}
                  >
                    Profile
                  </p>
                </li>`:p``}
            ${this.user.authenticated?p`<li class="command">
                  <p
                    @click=${()=>{this._toggle(!1),f.go("/app/settings")}}
                  >
                    Settings
                  </p>
                </li>`:p``}
            ${this.user.authenticated?p``:p`<li
                  class="command"
                  @click=${()=>{this._toggle(!1),f.go("/app/signup")}}
                >
                  <p>Signup</p>
                </li> `}
            ${this.user.authenticated?p``:p`<li
                  class="command"
                  @click=${()=>{this._toggle(!1),f.go("/app/login")}}
                >
                  <p>Login</p>
                </li>`}
            ${this.user.authenticated?p`<li
                  class="command"
                  @click=${()=>{this._signOut(),this._toggle(!1)}}
                >
                  <p>Log Out</p>
                </li>`:p``}
          </ul>
        </slot>
      </div>
    `}_signOut(){const i="JWT_AUTH_TOKEN";console.log("Signing out"),localStorage.removeItem(i),this.user=O.deauthenticate(this.user),window.location.href="/app/"}_handleChange(i){const e=i.target;this._toggle(e==null?void 0:e.checked)}_toggle(i){this.open=i,this._toggleClickAway(i)}_toggleClickAway(i){const e=t=>{t.composedPath().includes(this)?t.stopPropagation():this._toggle(!1)};i?document.addEventListener("click",e):document.removeEventListener("click",e)}};ne.styles=_`
    :host {
      display: inline-block;
      position: relative;
    }

    .all {
      background-color: inherit;
    }

    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
    }

    .no-display {
      display: none;
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
      background-color: var(--color-border);
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
      font-size: 15px;
      text-decoration: none;
    }

    

    .switch {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border-bottom: 1px solid var(--color-light);
    }
  `;Je([m({reflect:!0,type:Boolean})],ne.prototype,"open",2);Je([b()],ne.prototype,"user",2);Je([m({reflect:!0})],ne.prototype,"profile",2);ne=Je([y("drop-down")],ne);var po=Object.defineProperty,ho=Object.getOwnPropertyDescriptor,Ae=(i,e,t,o)=>{for(var r=o>1?void 0:o?ho(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&po(e,t,r),r};let K=class extends v{constructor(){super(...arguments),this.open=!1,this.isLoading=!1}_getData(i){new X().get(i).then(t=>t.status===200?t.json():null).then(t=>{this.profile=t}).catch(t=>{console.log("Error fetching data",t)})}connectedCallback(){var i,e;super.connectedCallback(),(i=this.user)!=null&&i.authenticated&&this._getData(`/profiles/${(e=this.user)==null?void 0:e.username}`)}render(){var i;return p`
      <header class=${this.isLoading?"navbar-loading":"navbar"}>
        <div class="navbar-content">
          <div class="logo" @click=${()=>f.go("/app/")}>
            <svg class="main-icon">
              <use href="/icons/icon.svg#cooked-logo" />
            </svg>
            <h1>COOKED</h1>
          </div>

          <section class="search-box">
            <form
              @submit=${e=>{e.preventDefault();const o=new FormData(e.target).get("search");console.log("Search value:",o),f.go(`/app/search/${o}`),e.target.reset(),this.isLoading=!0,setTimeout(()=>{this.isLoading=!1},1100)}}
            >
              <input
                type="text"
                name="search"
                placeholder="Search for Recipes, Chefs, & More"
              />
            </form>
          </section>

          <div class="right-navbar">
            ${(i=this.user)!=null&&i.authenticated?p`<div
                  class="group-icon"
                  @click=${()=>f.go("/app/create")}
                >
                  <svg class="icon">
                    <use href="/icons/create.svg#create-recipe" />
                  </svg>
                </div>`:p``}

            <drop-down profile=${this.profile}></drop-down>
          </div>
        </div>
      </header>
    `}};K.styles=_`
    * {
      font-family: "Raleway", sans-serif;
      padding: 0;
      margin: 0;
      background-color: var(--color-main-bg);
    }

    .search-box input:focus {
      outline: none;
      border: 1px solid var(--color-primary);
    }

    /* Define your animation */
    @keyframes borderAnimation {
      0% {
        background-position: 0 0;
        width: 0;
      }
      100% {
        background-position: 100% 0;
        width: 100%;
      }
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

    .navbar-loading {
      z-index: 2;
      background-color: var(--color-main-bg);
      padding: 15px 0;
      border-bottom: 1px solid var(--color-border);
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
    }

    .navbar-loading::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px; /* Adjust the thickness of the border */
      background: linear-gradient(
        to right,
        var(--color-loading-bg-1),
        var(--color-loading-bg-2)
      );
      background-size: 200% auto;
      animation: borderAnimation 1.1s infinite; /* Adjust animation duration as needed */
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
  `;Ae([m({reflect:!0,type:Boolean})],K.prototype,"open",2);Ae([$e({context:ae,subscribe:!0}),m({attribute:!1})],K.prototype,"user",2);Ae([b()],K.prototype,"isLoading",2);Ae([b()],K.prototype,"profile",2);K=Ae([y("navbar-component")],K);var uo=Object.defineProperty,go=Object.getOwnPropertyDescriptor,Ce=(i,e,t,o)=>{for(var r=o>1?void 0:o?go(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&uo(e,t,r),r};let G=class extends v{constructor(){super(...arguments),this.open=!1,this.input="",this.recipeList=[],this.sort=["",!0],this.recipeCount=0,this.isPending=!0}connectedCallback(){if(super.connectedCallback(),this.location){const i=this.location.pathname.split("/"),e=i.indexOf("search")+1,t=i[e];this.input=t;const o="/recipes/search/"+t;new X().getAbsolute(o).then(s=>{if(s.status===200)return s.json()}).then(s=>{this.recipeList=s,this.recipeCount=this.recipeList.length,this.isPending=!1,this.requestUpdate()})}}handleSort(i){let e=i.detail;this.sort=e,this.requestUpdate()}render(){return p`
      <div>
        <category-list @sort-requested=${this.handleSort}></category-list>
        <section class="trending">
          <h2>Search Results for '${this.input}'</h2>
          ${this.isPending?"":p`<p>
                ${this.recipeCount}
                ${this.recipeCount>1?p`results`:p`result`}
              </p>`}

          <recipe-grid
            .recipeList=${this.recipeList}
            .sort=${this.sort}
          ></recipe-grid>
        </section>
      </div>
    `}};G.styles=_`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    p {
      margin-bottom: 10px;
      color: var(--color-light-alt);
      font-size: 14px;
    }

    .trending {
      margin-bottom: 20px;
    }

    .trending h2 {
      font-size: 20px;
      font-weight: 500;
      color: var(--color-primary);
    }
  `;Ce([m({attribute:!1})],G.prototype,"location",2);Ce([m({reflect:!0,type:Boolean})],G.prototype,"open",2);Ce([m({reflect:!0,type:String})],G.prototype,"input",2);Ce([b()],G.prototype,"recipeList",2);G=Ce([y("search-view")],G);var fo=Object.defineProperty,mo=Object.getOwnPropertyDescriptor,vo=(i,e,t,o)=>{for(var r=o>1?void 0:o?mo(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&fo(e,t,r),r};let Vt=class extends v{constructor(){super()}firstUpdated(){var e;new f((e=this.shadowRoot)==null?void 0:e.querySelector("#outlet")).setRoutes([{path:"/app/profile/:userid",component:"user-profile"},{path:"/app/",component:"trending-view",action:()=>{window.scrollTo(0,0)}},{path:"/app/search/:input",component:"search-view"},{path:"/app/account",component:"account-view"},{path:"/app/groups",component:"group-view"},{path:"/app/my-recipes",component:"user-recipes"},{path:"/app/recipe/:recipeid",component:"recipe-view",action:()=>{window.scrollTo(0,0)}},{path:"/app/settings",component:"setting-view"},{path:"/app/category/:category",component:"category-view"},{path:"/app/create",component:"create-view"},{path:"/app/user/:userid",component:"public-profile-view"},{path:"/app/login",component:"login-view"},{path:"/app/signup",component:"signup-view"},{path:"(.*)",action:()=>{f.go("/app/")}}])}render(){return p`
      <auth-required>
        <navbar-component></navbar-component>
        <div id="outlet"></div>
      </auth-required>
    `}};Vt=vo([y("my-app")],Vt);var bo=Object.defineProperty,xo=Object.getOwnPropertyDescriptor,gi=(i,e,t,o)=>{for(var r=o>1?void 0:o?xo(e,t):e,s=i.length-1,n;s>=0;s--)(n=i[s])&&(r=(o?n(e,t,r):n(r))||r);return o&&r&&bo(e,t,r),r};let Me=class extends v{constructor(){super(...arguments),this.open=!1}render(){return p`
      <footer>
        <p>© 2024 Ethan Outangoun</p>
      </footer>
    `}};Me.styles=_`

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
  
  `;gi([m({reflect:!0,type:Boolean})],Me.prototype,"open",2);Me=gi([y("footer-component")],Me);
