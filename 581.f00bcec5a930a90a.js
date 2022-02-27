(()=>{var $n={456:d=>{var y,h=(y="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0,function(E){var o,K,tn;E=E||{},o||(o=void 0!==E?E:{}),o.ready=new Promise(function(n,r){K=n,tn=r});var on,wn=Object.assign({},o),O="";O=self.location.href,y&&(O=y),O=0!==O.indexOf("blob:")?O.substr(0,O.replace(/[?#].*/,"").lastIndexOf("/")+1):"",on=n=>{var r=new XMLHttpRequest;return r.open("GET",n,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)};var B,k=o.printErr||console.warn.bind(console);Object.assign(o,wn),wn=null,o.wasmBinary&&(B=o.wasmBinary),"object"!=typeof WebAssembly&&N("no native wasm support detected");var An=!1,Tn="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,Pn="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function Xn(n,r){for(var e=n>>1,t=e+r/2;!(e>=t)&&X[e];)++e;if(32<(e<<=1)-n&&Pn)return Pn.decode(A.subarray(n,e));for(e="",t=0;!(t>=r/2);++t){var i=D[n+2*t>>1];if(0==i)break;e+=String.fromCharCode(i)}return e}function Gn(n,r,e){if(void 0===e&&(e=2147483647),2>e)return 0;var t=r;e=(e-=2)<2*n.length?e/2:n.length;for(var i=0;i<e;++i)D[r>>1]=n.charCodeAt(i),r+=2;return D[r>>1]=0,r-t}function Yn(n){return 2*n.length}function Jn(n,r){for(var e=0,t="";!(e>=r/4);){var i=T[n+4*e>>2];if(0==i)break;++e,65536<=i?(i-=65536,t+=String.fromCharCode(55296|i>>10,56320|1023&i)):t+=String.fromCharCode(i)}return t}function Qn(n,r,e){if(void 0===e&&(e=2147483647),4>e)return 0;var t=r;e=t+e-4;for(var i=0;i<n.length;++i){var u=n.charCodeAt(i);if(55296<=u&&57343>=u&&(u=65536+((1023&u)<<10)|1023&n.charCodeAt(++i)),T[r>>2]=u,(r+=4)+4>e)break}return T[r>>2]=0,r-t}function Zn(n){for(var r=0,e=0;e<n.length;++e){var t=n.charCodeAt(e);55296<=t&&57343>=t&&++e,r+=4}return r}var Wn,V,A,D,X,T,R,Cn,En,On,Rn=[],Fn=[],Sn=[];function qn(){var n=o.preRun.shift();Rn.unshift(n)}var F,M=0,an=null,H=null;function N(n){throw o.onAbort&&o.onAbort(n),k(n="Aborted("+n+")"),An=!0,n=new WebAssembly.RuntimeError(n+". Build with -s ASSERTIONS=1 for more info."),tn(n),n}function Un(){return F.startsWith("data:application/octet-stream;base64,")}if(o.preloadedImages={},o.preloadedAudios={},F="simplex.wasm",!Un()){var In=F;F=o.locateFile?o.locateFile(In,O):O+In}function xn(){var n=F;try{if(n==F&&B)return new Uint8Array(B);if(on)return on(n);throw"both async and sync fetching of the wasm failed"}catch(r){N(r)}}function un(n){for(;0<n.length;){var r=n.shift();if("function"==typeof r)r(o);else{var e=r.ja;"number"==typeof e?void 0===r.O?Y(e)():Y(e)(r.O):e(void 0===r.O?null:r.O)}}}var G=[];function Y(n){var r=G[n];return r||(n>=G.length&&(G.length=n+1),G[n]=r=On.get(n)),r}function rr(n){this.N=n-16,this.X=function(r){T[this.N+4>>2]=r},this.U=function(r){T[this.N+8>>2]=r},this.V=function(){T[this.N>>2]=0},this.T=function(){V[this.N+12>>0]=0},this.W=function(){V[this.N+13>>0]=0},this.S=function(r,e){this.X(r),this.U(e),this.V(),this.T(),this.W()}}var J={};function fn(n){for(;n.length;){var r=n.pop();n.pop()(r)}}function Q(n){return this.fromWireType(R[n>>2])}var L={},b={},Z={};function sn(n){if(void 0===n)return"_unknown";var r=(n=n.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return 48<=r&&57>=r?"_"+n:n}function Mn(n,r){return n=sn(n),new Function("body","return function "+n+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(r)}function cn(n){var r=Error,e=Mn(n,function(t){this.name=n,this.message=t,void 0!==(t=Error(t).stack)&&(this.stack=this.toString()+"\n"+t.replace(/^Error(:[^\n]*)?\n/,""))});return e.prototype=Object.create(r.prototype),e.prototype.constructor=e,e.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},e}var ln=void 0;function bn(n,r,e){function t(a){if((a=e(a)).length!==n.length)throw new ln("Mismatched type converter count");for(var f=0;f<n.length;++f)S(n[f],a[f])}n.forEach(function(a){Z[a]=r});var i=Array(r.length),u=[],s=0;r.forEach(function(a,f){b.hasOwnProperty(a)?i[f]=b[a]:(u.push(a),L.hasOwnProperty(a)||(L[a]=[]),L[a].push(function(){i[f]=b[a],++s===u.length&&t(i)}))}),0===u.length&&t(i)}function vn(n){switch(n){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+n)}}var jn=void 0;function g(n){for(var r="";A[n];)r+=jn[A[n++]];return r}var Dn=void 0;function _(n){throw new Dn(n)}function S(n,r,e={}){if(!("argPackAdvance"in r))throw new TypeError("registerType registeredInstance requires argPackAdvance");var t=r.name;if(n||_('type "'+t+'" must have a positive integer typeid pointer'),b.hasOwnProperty(n)){if(e.ca)return;_("Cannot register type '"+t+"' twice")}b[n]=r,delete Z[n],L.hasOwnProperty(n)&&(r=L[n],delete L[n],r.forEach(function(i){i()}))}var pn=[],P=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function dn(n){4<n&&0==--P[n].P&&(P[n]=void 0,pn.push(n))}function U(n){return n||_("Cannot use deleted val. handle = "+n),P[n].value}function j(n){switch(n){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var r=pn.length?pn.pop():P.length;return P[r]={P:1,value:n},r}}function tr(n,r){switch(r){case 2:return function(e){return this.fromWireType(Cn[e>>2])};case 3:return function(e){return this.fromWireType(En[e>>3])};default:throw new TypeError("Unknown float type: "+n)}}function Ln(n){var r=Function;if(!(r instanceof Function))throw new TypeError("new_ called with constructor type "+typeof r+" which is not a function");var e=Mn(r.name||"unknownFunctionName",function(){});return e.prototype=r.prototype,e=new e,(n=r.apply(e,n))instanceof Object?n:e}function z(n,r){var e=(n=g(n)).includes("j")?function ur(n,r){var e=[];return function(){if(e.length=0,Object.assign(e,arguments),n.includes("j")){var t=o["dynCall_"+n];t=e&&e.length?t.apply(null,[r].concat(e)):t.call(null,r)}else t=Y(r).apply(null,e);return t}}(n,r):Y(r);return"function"!=typeof e&&_("unknown function pointer with signature "+n+": "+r),e}var kn=void 0;function Bn(n){var r=g(n=zn(n));return I(n),r}function sr(n,r,e){switch(r){case 0:return e?function(t){return V[t]}:function(t){return A[t]};case 1:return e?function(t){return D[t>>1]}:function(t){return X[t>>1]};case 2:return e?function(t){return T[t>>2]}:function(t){return R[t>>2]};default:throw new TypeError("Unknown integer type: "+n)}}function hn(n,r){var e=b[n];return void 0===e&&_(r+" has unknown type "+Bn(n)),e}var cr={};function Vn(n){var r=cr[n];return void 0===r?g(n):r}var yn=[],Hn=[];ln=o.InternalError=cn("InternalError");for(var Nn=Array(256),q=0;256>q;++q)Nn[q]=String.fromCharCode(q);jn=Nn,Dn=o.BindingError=cn("BindingError"),o.count_emval_handles=function(){for(var n=0,r=5;r<P.length;++r)void 0!==P[r]&&++n;return n},o.get_first_emval=function(){for(var n=5;n<P.length;++n)if(void 0!==P[n])return P[n];return null},kn=o.UnboundTypeError=cn("UnboundTypeError");var pr={e:function(n){return nn(n+16)+16},f:function(n,r,e){throw new rr(n).S(r,e),n},B:function(n){var r=J[n];delete J[n];var e=r.ea,t=r.fa,i=r.R;bn([n],i.map(function(s){return s.ba}).concat(i.map(function(s){return s.ha})),function(s){var a={};return i.forEach(function(f,c){var p=s[c],l=f.$,m=f.aa,w=s[c+i.length],v=f.ga,en=f.ia;a[f.Z]={read:function(W){return p.fromWireType(l(m,W))},write:function(W,x){var $=[];v(en,W,w.toWireType($,x)),fn($)}}}),[{name:r.name,fromWireType:function(f){var p,c={};for(p in a)c[p]=a[p].read(f);return t(f),c},toWireType:function(f,c){for(var p in a)if(!(p in c))throw new TypeError('Missing field:  "'+p+'"');var l=e();for(p in a)a[p].write(l,c[p]);return null!==f&&f.push(t,l),l},argPackAdvance:8,readValueFromPointer:Q,M:t}]})},v:function(){},z:function(n,r,e,t,i){var u=vn(e);S(n,{name:r=g(r),fromWireType:function(s){return!!s},toWireType:function(s,a){return a?t:i},argPackAdvance:8,readValueFromPointer:function(s){if(1===e)var a=V;else if(2===e)a=D;else{if(4!==e)throw new TypeError("Unknown boolean type size: "+r);a=T}return this.fromWireType(a[s>>u])},M:null})},y:function(n,r){S(n,{name:r=g(r),fromWireType:function(e){var t=U(e);return dn(e),t},toWireType:function(e,t){return j(t)},argPackAdvance:8,readValueFromPointer:Q,M:null})},t:function(n,r,e){e=vn(e),S(n,{name:r=g(r),fromWireType:function(t){return t},toWireType:function(t,i){return i},argPackAdvance:8,readValueFromPointer:tr(r,e),M:null})},D:function(n,r,e,t,i,u){var s=function ar(n,r){for(var e=[],t=0;t<n;t++)e.push(T[(r>>2)+t]);return e}(r,e);n=g(n),i=z(t,i),function or(n,r,e){o.hasOwnProperty(n)?((void 0===e||void 0!==o[n].L&&void 0!==o[n].L[e])&&_("Cannot register public name '"+n+"' twice"),function ir(n,r){var e=o;if(void 0===e[n].L){var t=e[n];e[n]=function(){return e[n].L.hasOwnProperty(arguments.length)||_("Function '"+r+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+e[n].L+")!"),e[n].L[arguments.length].apply(this,arguments)},e[n].L=[],e[n].L[t.Y]=t}}(n,n),o.hasOwnProperty(e)&&_("Cannot register multiple overloads of a function with the same number of arguments ("+e+")!"),o[n].L[e]=r):(o[n]=r,void 0!==e&&(o[n].ka=e))}(n,function(){!function fr(n,r){var t=[],i={};throw r.forEach(function e(u){i[u]||b[u]||(Z[u]?Z[u].forEach(e):(t.push(u),i[u]=!0))}),new kn(n+": "+t.map(Bn).join([", "]))}("Cannot call "+n+" due to unbound types",s)},r-1),bn([],s,function(a){var f=n,c=n;a=[a[0],null].concat(a.slice(1));var p=i,l=a.length;2>l&&_("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var m=null!==a[1]&&!1,w=!1,v=1;v<a.length;++v)if(null!==a[v]&&void 0===a[v].M){w=!0;break}var en="void"!==a[0].name,W="",x="";for(v=0;v<l-2;++v)W+=(0!==v?", ":"")+"arg"+v,x+=(0!==v?", ":"")+"arg"+v+"Wired";c="return function "+sn(c)+"("+W+") {\nif (arguments.length !== "+(l-2)+") {\nthrowBindingError('function "+c+" called with ' + arguments.length + ' arguments, expected "+(l-2)+" args!');\n}\n",w&&(c+="var destructors = [];\n");var $=w?"destructors":"null";for(W="throwBindingError invoker fn runDestructors retType classParam".split(" "),p=[_,p,u,fn,a[0],a[1]],m&&(c+="var thisWired = classParam.toWireType("+$+", this);\n"),v=0;v<l-2;++v)c+="var arg"+v+"Wired = argType"+v+".toWireType("+$+", arg"+v+"); // "+a[v+2].name+"\n",W.push("argType"+v),p.push(a[v+2]);if(m&&(x="thisWired"+(0<x.length?", ":"")+x),c+=(en?"var rv = ":"")+"invoker(fn"+(0<x.length?", ":"")+x+");\n",w)c+="runDestructors(destructors);\n";else for(v=m?1:2;v<a.length;++v)l=1===v?"thisWired":"arg"+(v-2)+"Wired",null!==a[v].M&&(c+=l+"_dtor("+l+"); // "+a[v].name+"\n",W.push(l+"_dtor"),p.push(a[v].M));if(en&&(c+="var ret = retType.fromWireType(rv);\nreturn ret;\n"),W.push(c+"}\n"),a=Ln(W).apply(null,p),v=r-1,!o.hasOwnProperty(f))throw new ln("Replacing nonexistant public symbol");return void 0!==o[f].L&&void 0!==v?o[f].L[v]=a:(o[f]=a,o[f].Y=v),[]})},g:function(n,r,e,t,i){r=g(r),-1===i&&(i=4294967295),i=vn(e);var u=a=>a;if(0===t){var s=32-8*e;u=a=>a<<s>>>s}e=r.includes("unsigned")?function(a,f){return f>>>0}:function(a,f){return f},S(n,{name:r,fromWireType:u,toWireType:e,argPackAdvance:8,readValueFromPointer:sr(r,i,0!==t),M:null})},c:function(n,r,e){function t(u){return new i(Wn,R[1+(u>>=2)],R[u])}var i=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][r];S(n,{name:e=g(e),fromWireType:t,argPackAdvance:8,readValueFromPointer:t},{ca:!0})},s:function(n,r){var e="std::string"===(r=g(r));S(n,{name:r,fromWireType:function(t){var i=R[t>>2];if(e)for(var u=t+4,s=0;s<=i;++s){var a=t+4+s;if(s==i||0==A[a]){if(u){var f=u,c=A,p=f+(a-u);for(u=f;c[u]&&!(u>=p);)++u;if(16<u-f&&c.subarray&&Tn)f=Tn.decode(c.subarray(f,u));else{for(p="";f<u;){var l=c[f++];if(128&l){var m=63&c[f++];if(192==(224&l))p+=String.fromCharCode((31&l)<<6|m);else{var w=63&c[f++];65536>(l=224==(240&l)?(15&l)<<12|m<<6|w:(7&l)<<18|m<<12|w<<6|63&c[f++])?p+=String.fromCharCode(l):(l-=65536,p+=String.fromCharCode(55296|l>>10,56320|1023&l))}}else p+=String.fromCharCode(l)}f=p}}else f="";if(void 0===v)var v=f;else v+=String.fromCharCode(0),v+=f;u=a+1}}else{for(v=Array(i),s=0;s<i;++s)v[s]=String.fromCharCode(A[t+4+s]);v=v.join("")}return I(t),v},toWireType:function(t,i){i instanceof ArrayBuffer&&(i=new Uint8Array(i));var u="string"==typeof i;u||i instanceof Uint8Array||i instanceof Uint8ClampedArray||i instanceof Int8Array||_("Cannot pass non-string to std::string");var s=(e&&u?()=>{for(var c=0,p=0;p<i.length;++p){var l=i.charCodeAt(p);55296<=l&&57343>=l&&(l=65536+((1023&l)<<10)|1023&i.charCodeAt(++p)),127>=l?++c:c=2047>=l?c+2:65535>=l?c+3:c+4}return c}:()=>i.length)(),a=nn(4+s+1);if(R[a>>2]=s,e&&u)!function Kn(n,r,e){var t=A;if(0<e){e=r+e-1;for(var i=0;i<n.length;++i){var u=n.charCodeAt(i);if(55296<=u&&57343>=u&&(u=65536+((1023&u)<<10)|1023&n.charCodeAt(++i)),127>=u){if(r>=e)break;t[r++]=u}else{if(2047>=u){if(r+1>=e)break;t[r++]=192|u>>6}else{if(65535>=u){if(r+2>=e)break;t[r++]=224|u>>12}else{if(r+3>=e)break;t[r++]=240|u>>18,t[r++]=128|u>>12&63}t[r++]=128|u>>6&63}t[r++]=128|63&u}}t[r]=0}}(i,a+4,s+1);else if(u)for(u=0;u<s;++u){var f=i.charCodeAt(u);255<f&&(I(a),_("String has UTF-16 code units that do not fit in 8 bits")),A[a+4+u]=f}else for(u=0;u<s;++u)A[a+4+u]=i[u];return null!==t&&t.push(I,a),a},argPackAdvance:8,readValueFromPointer:Q,M:function(t){I(t)}})},p:function(n,r,e){if(e=g(e),2===r)var t=Xn,i=Gn,u=Yn,s=()=>X,a=1;else 4===r&&(t=Jn,i=Qn,u=Zn,s=()=>R,a=2);S(n,{name:e,fromWireType:function(f){for(var l,c=R[f>>2],p=s(),m=f+4,w=0;w<=c;++w){var v=f+4+w*r;(w==c||0==p[v>>a])&&(m=t(m,v-m),void 0===l?l=m:(l+=String.fromCharCode(0),l+=m),m=v+r)}return I(f),l},toWireType:function(f,c){"string"!=typeof c&&_("Cannot pass non-string to C++ string type "+e);var p=u(c),l=nn(4+p+r);return R[l>>2]=p>>a,i(c,l+4,p+r),null!==f&&f.push(I,l),l},argPackAdvance:8,readValueFromPointer:Q,M:function(f){I(f)}})},C:function(n,r,e,t,i,u){J[n]={name:g(r),ea:z(e,t),fa:z(i,u),R:[]}},u:function(n,r,e,t,i,u,s,a,f,c){J[n].R.push({Z:g(r),ba:e,$:z(t,i),aa:u,ha:s,ga:z(a,f),ia:c})},A:function(n,r){S(n,{da:!0,name:r=g(r),argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},o:function(n,r,e){n=U(n),r=hn(r,"emval::as");var t=[],i=j(t);return T[e>>2]=i,r.toWireType(t,n)},h:function(n,r,e,t){(n=yn[n])(r=U(r),e=Vn(e),null,t)},a:dn,i:function(n,r){var e=function vr(n,r){for(var e=Array(n),t=0;t<n;++t)e[t]=hn(T[(r>>2)+t],"parameter "+t);return e}(n,r),t=e[0];r=t.name+"_$"+e.slice(1).map(function(p){return p.name}).join("_")+"$";var i=Hn[r];if(void 0!==i)return i;i=["retType"];for(var u=[t],s="",a=0;a<n-1;++a)s+=(0!==a?", ":"")+"arg"+a,i.push("argType"+a),u.push(e[1+a]);var f="return function "+sn("methodCaller_"+r)+"(handle, name, destructors, args) {\n",c=0;for(a=0;a<n-1;++a)f+="    var arg"+a+" = argType"+a+".readValueFromPointer(args"+(c?"+"+c:"")+");\n",c+=e[a+1].argPackAdvance;for(f+="    var rv = handle[name]("+s+");\n",a=0;a<n-1;++a)e[a+1].deleteObject&&(f+="    argType"+a+".deleteObject(arg"+a+");\n");return t.da||(f+="    return retType.toWireType(destructors, rv);\n"),i.push(f+"};\n"),i=function lr(n){var r=yn.length;return yn.push(n),r}(n=Ln(i).apply(null,u)),Hn[r]=i},m:function(n,r){return j((n=U(n))[r=U(r)])},l:function(n){4<n&&(P[n].P+=1)},j:function(){return j([])},b:function(n){return j(Vn(n))},q:function(){return j({})},n:function(n){fn(U(n)),dn(n)},d:function(n,r,e){n=U(n),r=U(r),e=U(e),n[r]=e},k:function(n,r){return j(n=(n=hn(n,"_emval_take_value")).readValueFromPointer(r))},r:function(){N("")},x:function(n,r,e){A.copyWithin(n,r,r+e)},w:function(){N("OOM")}};(function(){function n(i){o.asm=i.exports,Wn=i=o.asm.E.buffer,o.HEAP8=V=new Int8Array(i),o.HEAP16=D=new Int16Array(i),o.HEAP32=T=new Int32Array(i),o.HEAPU8=A=new Uint8Array(i),o.HEAPU16=X=new Uint16Array(i),o.HEAPU32=R=new Uint32Array(i),o.HEAPF32=Cn=new Float32Array(i),o.HEAPF64=En=new Float64Array(i),On=o.asm.H,Fn.unshift(o.asm.F),M--,o.monitorRunDependencies&&o.monitorRunDependencies(M),0==M&&(null!==an&&(clearInterval(an),an=null),H&&(i=H,H=null,i()))}function r(i){n(i.instance)}function e(i){return function nr(){return B||"function"!=typeof fetch?Promise.resolve().then(function(){return xn()}):fetch(F,{credentials:"same-origin"}).then(function(n){if(!n.ok)throw"failed to load wasm binary file at '"+F+"'";return n.arrayBuffer()}).catch(function(){return xn()})}().then(function(u){return WebAssembly.instantiate(u,t)}).then(function(u){return u}).then(i,function(u){k("failed to asynchronously prepare wasm: "+u),N(u)})}var t={a:pr};if(M++,o.monitorRunDependencies&&o.monitorRunDependencies(M),o.instantiateWasm)try{return o.instantiateWasm(t,n)}catch(i){return k("Module.instantiateWasm callback failed with error: "+i),!1}(B||"function"!=typeof WebAssembly.instantiateStreaming||Un()||"function"!=typeof fetch?e(r):fetch(F,{credentials:"same-origin"}).then(function(i){return WebAssembly.instantiateStreaming(i,t).then(r,function(u){return k("wasm streaming compile failed: "+u),k("falling back to ArrayBuffer instantiation"),e(r)})})).catch(tn)})(),o.___wasm_call_ctors=function(){return(o.___wasm_call_ctors=o.asm.F).apply(null,arguments)};var nn=o._malloc=function(){return(nn=o._malloc=o.asm.G).apply(null,arguments)},zn=o.___getTypeName=function(){return(zn=o.___getTypeName=o.asm.I).apply(null,arguments)};o.___embind_register_native_and_builtin_types=function(){return(o.___embind_register_native_and_builtin_types=o.asm.J).apply(null,arguments)};var rn,I=o._free=function(){return(I=o._free=o.asm.K).apply(null,arguments)};function mn(){function n(){if(!rn&&(rn=!0,o.calledRun=!0,!An)){if(un(Fn),K(o),o.onRuntimeInitialized&&o.onRuntimeInitialized(),o.postRun)for("function"==typeof o.postRun&&(o.postRun=[o.postRun]);o.postRun.length;){var r=o.postRun.shift();Sn.unshift(r)}un(Sn)}}if(!(0<M)){if(o.preRun)for("function"==typeof o.preRun&&(o.preRun=[o.preRun]);o.preRun.length;)qn();un(Rn),0<M||(o.setStatus?(o.setStatus("Running..."),setTimeout(function(){setTimeout(function(){o.setStatus("")},1),n()},1)):n())}}if(H=function n(){rn||mn(),rn||(H=n)},o.run=mn,o.preInit)for("function"==typeof o.preInit&&(o.preInit=[o.preInit]);0<o.preInit.length;)o.preInit.pop()();return mn(),E.ready});d.exports=h}},gn={};function C(d){var h=gn[d];if(void 0!==h)return h.exports;var y=gn[d]={exports:{}};return $n[d](y,y.exports,C),y.exports}C.n=d=>{var h=d&&d.__esModule?()=>d.default:()=>d;return C.d(h,{a:h}),h},C.d=(d,h)=>{for(var y in h)C.o(h,y)&&!C.o(d,y)&&Object.defineProperty(d,y,{enumerable:!0,get:h[y]})},C.o=(d,h)=>Object.prototype.hasOwnProperty.call(d,h),(()=>{"use strict";var d=C(456),h=C.n(d);addEventListener("message",({data:y})=>{h()({locateFile:E=>`native/${E}`}).then(E=>{const o=E.simplex(y.A,y.B,y.C),K=y.vars;postMessage(Object.assign(Object.assign({},o),{vars:K}))})})})()})();