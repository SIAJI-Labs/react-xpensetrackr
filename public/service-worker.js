function Pi(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Ka } = Object.prototype, { getPrototypeOf: qr } = Object, Jt = ((t) => (e) => {
  const r = Ka.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), fe = (t) => (t = t.toLowerCase(), (e) => Jt(e) === t), Kt = (t) => (e) => typeof e === t, { isArray: Ye } = Array, mt = Kt("undefined");
function Qa(t) {
  return t !== null && !mt(t) && t.constructor !== null && !mt(t.constructor) && ne(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const _i = fe("ArrayBuffer");
function Xa(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && _i(t.buffer), e;
}
const Za = Kt("string"), ne = Kt("function"), xi = Kt("number"), Qt = (t) => t !== null && typeof t == "object", Ya = (t) => t === !0 || t === !1, jt = (t) => {
  if (Jt(t) !== "object")
    return !1;
  const e = qr(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, es = fe("Date"), ts = fe("File"), rs = fe("Blob"), ns = fe("FileList"), is = (t) => Qt(t) && ne(t.pipe), os = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || ne(t.append) && ((e = Jt(t)) === "formdata" || // detect form-data instance
  e === "object" && ne(t.toString) && t.toString() === "[object FormData]"));
}, as = fe("URLSearchParams"), ss = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function bt(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, o;
  if (typeof t != "object" && (t = [t]), Ye(t))
    for (n = 0, o = t.length; n < o; n++)
      e.call(null, t[n], n, t);
  else {
    const i = r ? Object.getOwnPropertyNames(t) : Object.keys(t), a = i.length;
    let s;
    for (n = 0; n < a; n++)
      s = i[n], e.call(null, t[s], s, t);
  }
}
function Ri(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let n = r.length, o;
  for (; n-- > 0; )
    if (o = r[n], e === o.toLowerCase())
      return o;
  return null;
}
const Ti = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), $i = (t) => !mt(t) && t !== Ti;
function Ar() {
  const { caseless: t } = $i(this) && this || {}, e = {}, r = (n, o) => {
    const i = t && Ri(e, o) || o;
    jt(e[i]) && jt(n) ? e[i] = Ar(e[i], n) : jt(n) ? e[i] = Ar({}, n) : Ye(n) ? e[i] = n.slice() : e[i] = n;
  };
  for (let n = 0, o = arguments.length; n < o; n++)
    arguments[n] && bt(arguments[n], r);
  return e;
}
const ls = (t, e, r, { allOwnKeys: n } = {}) => (bt(e, (o, i) => {
  r && ne(o) ? t[i] = Pi(o, r) : t[i] = o;
}, { allOwnKeys: n }), t), us = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), cs = (t, e, r, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, fs = (t, e, r, n) => {
  let o, i, a;
  const s = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (o = Object.getOwnPropertyNames(t), i = o.length; i-- > 0; )
      a = o[i], (!n || n(a, t, e)) && !s[a] && (e[a] = t[a], s[a] = !0);
    t = r !== !1 && qr(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, ps = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const n = t.indexOf(e, r);
  return n !== -1 && n === r;
}, ds = (t) => {
  if (!t)
    return null;
  if (Ye(t))
    return t;
  let e = t.length;
  if (!xi(e))
    return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, ys = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && qr(Uint8Array)), hs = (t, e) => {
  const n = (t && t[Symbol.iterator]).call(t);
  let o;
  for (; (o = n.next()) && !o.done; ) {
    const i = o.value;
    e.call(t, i[0], i[1]);
  }
}, ms = (t, e) => {
  let r;
  const n = [];
  for (; (r = t.exec(e)) !== null; )
    n.push(r);
  return n;
}, gs = fe("HTMLFormElement"), vs = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(r, n, o) {
    return n.toUpperCase() + o;
  }
), In = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), bs = fe("RegExp"), Ci = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), n = {};
  bt(r, (o, i) => {
    let a;
    (a = e(o, i, t)) !== !1 && (n[i] = a || o);
  }), Object.defineProperties(t, n);
}, Ss = (t) => {
  Ci(t, (e, r) => {
    if (ne(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const n = t[r];
    if (ne(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, ws = (t, e) => {
  const r = {}, n = (o) => {
    o.forEach((i) => {
      r[i] = !0;
    });
  };
  return Ye(t) ? n(t) : n(String(t).split(e)), r;
}, Os = () => {
}, Es = (t, e) => (t = +t, Number.isFinite(t) ? t : e), sr = "abcdefghijklmnopqrstuvwxyz", jn = "0123456789", Fi = {
  DIGIT: jn,
  ALPHA: sr,
  ALPHA_DIGIT: sr + sr.toUpperCase() + jn
}, As = (t = 16, e = Fi.ALPHA_DIGIT) => {
  let r = "";
  const { length: n } = e;
  for (; t--; )
    r += e[Math.random() * n | 0];
  return r;
};
function Ps(t) {
  return !!(t && ne(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const _s = (t) => {
  const e = new Array(10), r = (n, o) => {
    if (Qt(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[o] = n;
        const i = Ye(n) ? [] : {};
        return bt(n, (a, s) => {
          const u = r(a, o + 1);
          !mt(u) && (i[s] = u);
        }), e[o] = void 0, i;
      }
    }
    return n;
  };
  return r(t, 0);
}, xs = fe("AsyncFunction"), Rs = (t) => t && (Qt(t) || ne(t)) && ne(t.then) && ne(t.catch), m = {
  isArray: Ye,
  isArrayBuffer: _i,
  isBuffer: Qa,
  isFormData: os,
  isArrayBufferView: Xa,
  isString: Za,
  isNumber: xi,
  isBoolean: Ya,
  isObject: Qt,
  isPlainObject: jt,
  isUndefined: mt,
  isDate: es,
  isFile: ts,
  isBlob: rs,
  isRegExp: bs,
  isFunction: ne,
  isStream: is,
  isURLSearchParams: as,
  isTypedArray: ys,
  isFileList: ns,
  forEach: bt,
  merge: Ar,
  extend: ls,
  trim: ss,
  stripBOM: us,
  inherits: cs,
  toFlatObject: fs,
  kindOf: Jt,
  kindOfTest: fe,
  endsWith: ps,
  toArray: ds,
  forEachEntry: hs,
  matchAll: ms,
  isHTMLForm: gs,
  hasOwnProperty: In,
  hasOwnProp: In,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ci,
  freezeMethods: Ss,
  toObjectSet: ws,
  toCamelCase: vs,
  noop: Os,
  toFiniteNumber: Es,
  findKey: Ri,
  global: Ti,
  isContextDefined: $i,
  ALPHABET: Fi,
  generateString: As,
  isSpecCompliantForm: Ps,
  toJSONObject: _s,
  isAsyncFn: xs,
  isThenable: Rs
};
function F(t, e, r, n, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), n && (this.request = n), o && (this.response = o);
}
m.inherits(F, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: m.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Ni = F.prototype, Ii = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  Ii[t] = { value: t };
});
Object.defineProperties(F, Ii);
Object.defineProperty(Ni, "isAxiosError", { value: !0 });
F.from = (t, e, r, n, o, i) => {
  const a = Object.create(Ni);
  return m.toFlatObject(t, a, function(u) {
    return u !== Error.prototype;
  }, (s) => s !== "isAxiosError"), F.call(a, t.message, e, r, n, o), a.cause = t, a.name = t.name, i && Object.assign(a, i), a;
};
const Ts = null;
function Pr(t) {
  return m.isPlainObject(t) || m.isArray(t);
}
function ji(t) {
  return m.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Dn(t, e, r) {
  return t ? t.concat(e).map(function(o, i) {
    return o = ji(o), !r && i ? "[" + o + "]" : o;
  }).join(r ? "." : "") : e;
}
function $s(t) {
  return m.isArray(t) && !t.some(Pr);
}
const Cs = m.toFlatObject(m, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Xt(t, e, r) {
  if (!m.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), r = m.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(d, w) {
    return !m.isUndefined(w[d]);
  });
  const n = r.metaTokens, o = r.visitor || h, i = r.dots, a = r.indexes, u = (r.Blob || typeof Blob < "u" && Blob) && m.isSpecCompliantForm(e);
  if (!m.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(f) {
    if (f === null)
      return "";
    if (m.isDate(f))
      return f.toISOString();
    if (!u && m.isBlob(f))
      throw new F("Blob is not supported. Use a Buffer instead.");
    return m.isArrayBuffer(f) || m.isTypedArray(f) ? u && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function h(f, d, w) {
    let S = f;
    if (f && !w && typeof f == "object") {
      if (m.endsWith(d, "{}"))
        d = n ? d : d.slice(0, -2), f = JSON.stringify(f);
      else if (m.isArray(f) && $s(f) || (m.isFileList(f) || m.endsWith(d, "[]")) && (S = m.toArray(f)))
        return d = ji(d), S.forEach(function(x, _) {
          !(m.isUndefined(x) || x === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? Dn([d], _, i) : a === null ? d : d + "[]",
            c(x)
          );
        }), !1;
    }
    return Pr(f) ? !0 : (e.append(Dn(w, d, i), c(f)), !1);
  }
  const y = [], v = Object.assign(Cs, {
    defaultVisitor: h,
    convertValue: c,
    isVisitable: Pr
  });
  function b(f, d) {
    if (!m.isUndefined(f)) {
      if (y.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + d.join("."));
      y.push(f), m.forEach(f, function(S, P) {
        (!(m.isUndefined(S) || S === null) && o.call(
          e,
          S,
          m.isString(P) ? P.trim() : P,
          d,
          v
        )) === !0 && b(S, d ? d.concat(P) : [P]);
      }), y.pop();
    }
  }
  if (!m.isObject(t))
    throw new TypeError("data must be an object");
  return b(t), e;
}
function Ln(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function Wr(t, e) {
  this._pairs = [], t && Xt(t, this, e);
}
const Di = Wr.prototype;
Di.append = function(e, r) {
  this._pairs.push([e, r]);
};
Di.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, Ln);
  } : Ln;
  return this._pairs.map(function(o) {
    return r(o[0]) + "=" + r(o[1]);
  }, "").join("&");
};
function Fs(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Li(t, e, r) {
  if (!e)
    return t;
  const n = r && r.encode || Fs, o = r && r.serialize;
  let i;
  if (o ? i = o(e, r) : i = m.isURLSearchParams(e) ? e.toString() : new Wr(e, r).toString(n), i) {
    const a = t.indexOf("#");
    a !== -1 && (t = t.slice(0, a)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class Ns {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, r, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    m.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const Bn = Ns, Bi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Is = typeof URLSearchParams < "u" ? URLSearchParams : Wr, js = typeof FormData < "u" ? FormData : null, Ds = typeof Blob < "u" ? Blob : null, Ls = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Is,
    FormData: js,
    Blob: Ds
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Ui = typeof window < "u" && typeof document < "u", Bs = ((t) => Ui && ["ReactNative", "NativeScript", "NS"].indexOf(t) < 0)(typeof navigator < "u" && navigator.product), Us = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), Ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ui,
  hasStandardBrowserEnv: Bs,
  hasStandardBrowserWebWorkerEnv: Us
}, Symbol.toStringTag, { value: "Module" })), ce = {
  ...Ms,
  ...Ls
};
function ks(t, e) {
  return Xt(t, new ce.classes.URLSearchParams(), Object.assign({
    visitor: function(r, n, o, i) {
      return ce.isNode && m.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Hs(t) {
  return m.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Vs(t) {
  const e = {}, r = Object.keys(t);
  let n;
  const o = r.length;
  let i;
  for (n = 0; n < o; n++)
    i = r[n], e[i] = t[i];
  return e;
}
function Mi(t) {
  function e(r, n, o, i) {
    let a = r[i++];
    if (a === "__proto__")
      return !0;
    const s = Number.isFinite(+a), u = i >= r.length;
    return a = !a && m.isArray(o) ? o.length : a, u ? (m.hasOwnProp(o, a) ? o[a] = [o[a], n] : o[a] = n, !s) : ((!o[a] || !m.isObject(o[a])) && (o[a] = []), e(r, n, o[a], i) && m.isArray(o[a]) && (o[a] = Vs(o[a])), !s);
  }
  if (m.isFormData(t) && m.isFunction(t.entries)) {
    const r = {};
    return m.forEachEntry(t, (n, o) => {
      e(Hs(n), o, r, 0);
    }), r;
  }
  return null;
}
function qs(t, e, r) {
  if (m.isString(t))
    try {
      return (e || JSON.parse)(t), m.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(t);
}
const zr = {
  transitional: Bi,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, r) {
    const n = r.getContentType() || "", o = n.indexOf("application/json") > -1, i = m.isObject(e);
    if (i && m.isHTMLForm(e) && (e = new FormData(e)), m.isFormData(e))
      return o ? JSON.stringify(Mi(e)) : e;
    if (m.isArrayBuffer(e) || m.isBuffer(e) || m.isStream(e) || m.isFile(e) || m.isBlob(e))
      return e;
    if (m.isArrayBufferView(e))
      return e.buffer;
    if (m.isURLSearchParams(e))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let s;
    if (i) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return ks(e, this.formSerializer).toString();
      if ((s = m.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Xt(
          s ? { "files[]": e } : e,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return i || o ? (r.setContentType("application/json", !1), qs(e)) : e;
  }],
  transformResponse: [function(e) {
    const r = this.transitional || zr.transitional, n = r && r.forcedJSONParsing, o = this.responseType === "json";
    if (e && m.isString(e) && (n && !this.responseType || o)) {
      const a = !(r && r.silentJSONParsing) && o;
      try {
        return JSON.parse(e);
      } catch (s) {
        if (a)
          throw s.name === "SyntaxError" ? F.from(s, F.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ce.classes.FormData,
    Blob: ce.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
m.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  zr.headers[t] = {};
});
const Gr = zr, Ws = m.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), zs = (t) => {
  const e = {};
  let r, n, o;
  return t && t.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), r = a.substring(0, o).trim().toLowerCase(), n = a.substring(o + 1).trim(), !(!r || e[r] && Ws[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
}, Un = Symbol("internals");
function at(t) {
  return t && String(t).trim().toLowerCase();
}
function Dt(t) {
  return t === !1 || t == null ? t : m.isArray(t) ? t.map(Dt) : String(t);
}
function Gs(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t); )
    e[n[1]] = n[2];
  return e;
}
const Js = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function lr(t, e, r, n, o) {
  if (m.isFunction(n))
    return n.call(this, e, r);
  if (o && (e = r), !!m.isString(e)) {
    if (m.isString(n))
      return e.indexOf(n) !== -1;
    if (m.isRegExp(n))
      return n.test(e);
  }
}
function Ks(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function Qs(t, e) {
  const r = m.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + r, {
      value: function(o, i, a) {
        return this[n].call(this, e, o, i, a);
      },
      configurable: !0
    });
  });
}
class Zt {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, n) {
    const o = this;
    function i(s, u, c) {
      const h = at(u);
      if (!h)
        throw new Error("header name must be a non-empty string");
      const y = m.findKey(o, h);
      (!y || o[y] === void 0 || c === !0 || c === void 0 && o[y] !== !1) && (o[y || u] = Dt(s));
    }
    const a = (s, u) => m.forEach(s, (c, h) => i(c, h, u));
    return m.isPlainObject(e) || e instanceof this.constructor ? a(e, r) : m.isString(e) && (e = e.trim()) && !Js(e) ? a(zs(e), r) : e != null && i(r, e, n), this;
  }
  get(e, r) {
    if (e = at(e), e) {
      const n = m.findKey(this, e);
      if (n) {
        const o = this[n];
        if (!r)
          return o;
        if (r === !0)
          return Gs(o);
        if (m.isFunction(r))
          return r.call(this, o, n);
        if (m.isRegExp(r))
          return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = at(e), e) {
      const n = m.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || lr(this, this[n], n, r)));
    }
    return !1;
  }
  delete(e, r) {
    const n = this;
    let o = !1;
    function i(a) {
      if (a = at(a), a) {
        const s = m.findKey(n, a);
        s && (!r || lr(n, n[s], s, r)) && (delete n[s], o = !0);
      }
    }
    return m.isArray(e) ? e.forEach(i) : i(e), o;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, o = !1;
    for (; n--; ) {
      const i = r[n];
      (!e || lr(this, this[i], i, e, !0)) && (delete this[i], o = !0);
    }
    return o;
  }
  normalize(e) {
    const r = this, n = {};
    return m.forEach(this, (o, i) => {
      const a = m.findKey(n, i);
      if (a) {
        r[a] = Dt(o), delete r[i];
        return;
      }
      const s = e ? Ks(i) : String(i).trim();
      s !== i && delete r[i], r[s] = Dt(o), n[s] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const r = /* @__PURE__ */ Object.create(null);
    return m.forEach(this, (n, o) => {
      n != null && n !== !1 && (r[o] = e && m.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, r]) => e + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...r) {
    const n = new this(e);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(e) {
    const n = (this[Un] = this[Un] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(a) {
      const s = at(a);
      n[s] || (Qs(o, a), n[s] = !0);
    }
    return m.isArray(e) ? e.forEach(i) : i(e), this;
  }
}
Zt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
m.reduceDescriptors(Zt.prototype, ({ value: t }, e) => {
  let r = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(n) {
      this[r] = n;
    }
  };
});
m.freezeMethods(Zt);
const ge = Zt;
function ur(t, e) {
  const r = this || Gr, n = e || r, o = ge.from(n.headers);
  let i = n.data;
  return m.forEach(t, function(s) {
    i = s.call(r, i, o.normalize(), e ? e.status : void 0);
  }), o.normalize(), i;
}
function ki(t) {
  return !!(t && t.__CANCEL__);
}
function St(t, e, r) {
  F.call(this, t ?? "canceled", F.ERR_CANCELED, e, r), this.name = "CanceledError";
}
m.inherits(St, F, {
  __CANCEL__: !0
});
function Xs(t, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t(r) : e(new F(
    "Request failed with status code " + r.status,
    [F.ERR_BAD_REQUEST, F.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Zs = ce.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, r, n, o, i) {
      const a = [t + "=" + encodeURIComponent(e)];
      m.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), m.isString(n) && a.push("path=" + n), m.isString(o) && a.push("domain=" + o), i === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(t) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Ys(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function el(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Hi(t, e) {
  return t && !Ys(e) ? el(t, e) : e;
}
const tl = ce.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const e = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
    let n;
    function o(i) {
      let a = i;
      return e && (r.setAttribute("href", a), a = r.href), r.setAttribute("href", a), {
        href: r.href,
        protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
        host: r.host,
        search: r.search ? r.search.replace(/^\?/, "") : "",
        hash: r.hash ? r.hash.replace(/^#/, "") : "",
        hostname: r.hostname,
        port: r.port,
        pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
      };
    }
    return n = o(window.location.href), function(a) {
      const s = m.isString(a) ? o(a) : a;
      return s.protocol === n.protocol && s.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function rl(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function nl(t, e) {
  t = t || 10;
  const r = new Array(t), n = new Array(t);
  let o = 0, i = 0, a;
  return e = e !== void 0 ? e : 1e3, function(u) {
    const c = Date.now(), h = n[i];
    a || (a = c), r[o] = u, n[o] = c;
    let y = i, v = 0;
    for (; y !== o; )
      v += r[y++], y = y % t;
    if (o = (o + 1) % t, o === i && (i = (i + 1) % t), c - a < e)
      return;
    const b = h && c - h;
    return b ? Math.round(v * 1e3 / b) : void 0;
  };
}
function Mn(t, e) {
  let r = 0;
  const n = nl(50, 250);
  return (o) => {
    const i = o.loaded, a = o.lengthComputable ? o.total : void 0, s = i - r, u = n(s), c = i <= a;
    r = i;
    const h = {
      loaded: i,
      total: a,
      progress: a ? i / a : void 0,
      bytes: s,
      rate: u || void 0,
      estimated: u && a && c ? (a - i) / u : void 0,
      event: o
    };
    h[e ? "download" : "upload"] = !0, t(h);
  };
}
const il = typeof XMLHttpRequest < "u", ol = il && function(t) {
  return new Promise(function(r, n) {
    let o = t.data;
    const i = ge.from(t.headers).normalize();
    let { responseType: a, withXSRFToken: s } = t, u;
    function c() {
      t.cancelToken && t.cancelToken.unsubscribe(u), t.signal && t.signal.removeEventListener("abort", u);
    }
    let h;
    if (m.isFormData(o)) {
      if (ce.hasStandardBrowserEnv || ce.hasStandardBrowserWebWorkerEnv)
        i.setContentType(!1);
      else if ((h = i.getContentType()) !== !1) {
        const [d, ...w] = h ? h.split(";").map((S) => S.trim()).filter(Boolean) : [];
        i.setContentType([d || "multipart/form-data", ...w].join("; "));
      }
    }
    let y = new XMLHttpRequest();
    if (t.auth) {
      const d = t.auth.username || "", w = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(d + ":" + w));
    }
    const v = Hi(t.baseURL, t.url);
    y.open(t.method.toUpperCase(), Li(v, t.params, t.paramsSerializer), !0), y.timeout = t.timeout;
    function b() {
      if (!y)
        return;
      const d = ge.from(
        "getAllResponseHeaders" in y && y.getAllResponseHeaders()
      ), S = {
        data: !a || a === "text" || a === "json" ? y.responseText : y.response,
        status: y.status,
        statusText: y.statusText,
        headers: d,
        config: t,
        request: y
      };
      Xs(function(x) {
        r(x), c();
      }, function(x) {
        n(x), c();
      }, S), y = null;
    }
    if ("onloadend" in y ? y.onloadend = b : y.onreadystatechange = function() {
      !y || y.readyState !== 4 || y.status === 0 && !(y.responseURL && y.responseURL.indexOf("file:") === 0) || setTimeout(b);
    }, y.onabort = function() {
      y && (n(new F("Request aborted", F.ECONNABORTED, t, y)), y = null);
    }, y.onerror = function() {
      n(new F("Network Error", F.ERR_NETWORK, t, y)), y = null;
    }, y.ontimeout = function() {
      let w = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const S = t.transitional || Bi;
      t.timeoutErrorMessage && (w = t.timeoutErrorMessage), n(new F(
        w,
        S.clarifyTimeoutError ? F.ETIMEDOUT : F.ECONNABORTED,
        t,
        y
      )), y = null;
    }, ce.hasStandardBrowserEnv && (s && m.isFunction(s) && (s = s(t)), s || s !== !1 && tl(v))) {
      const d = t.xsrfHeaderName && t.xsrfCookieName && Zs.read(t.xsrfCookieName);
      d && i.set(t.xsrfHeaderName, d);
    }
    o === void 0 && i.setContentType(null), "setRequestHeader" in y && m.forEach(i.toJSON(), function(w, S) {
      y.setRequestHeader(S, w);
    }), m.isUndefined(t.withCredentials) || (y.withCredentials = !!t.withCredentials), a && a !== "json" && (y.responseType = t.responseType), typeof t.onDownloadProgress == "function" && y.addEventListener("progress", Mn(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && y.upload && y.upload.addEventListener("progress", Mn(t.onUploadProgress)), (t.cancelToken || t.signal) && (u = (d) => {
      y && (n(!d || d.type ? new St(null, t, y) : d), y.abort(), y = null);
    }, t.cancelToken && t.cancelToken.subscribe(u), t.signal && (t.signal.aborted ? u() : t.signal.addEventListener("abort", u)));
    const f = rl(v);
    if (f && ce.protocols.indexOf(f) === -1) {
      n(new F("Unsupported protocol " + f + ":", F.ERR_BAD_REQUEST, t));
      return;
    }
    y.send(o || null);
  });
}, _r = {
  http: Ts,
  xhr: ol
};
m.forEach(_r, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const kn = (t) => `- ${t}`, al = (t) => m.isFunction(t) || t === null || t === !1, Vi = {
  getAdapter: (t) => {
    t = m.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, n;
    const o = {};
    for (let i = 0; i < e; i++) {
      r = t[i];
      let a;
      if (n = r, !al(r) && (n = _r[(a = String(r)).toLowerCase()], n === void 0))
        throw new F(`Unknown adapter '${a}'`);
      if (n)
        break;
      o[a || "#" + i] = n;
    }
    if (!n) {
      const i = Object.entries(o).map(
        ([s, u]) => `adapter ${s} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = e ? i.length > 1 ? `since :
` + i.map(kn).join(`
`) : " " + kn(i[0]) : "as no adapter specified";
      throw new F(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: _r
};
function cr(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new St(null, t);
}
function Hn(t) {
  return cr(t), t.headers = ge.from(t.headers), t.data = ur.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Vi.getAdapter(t.adapter || Gr.adapter)(t).then(function(n) {
    return cr(t), n.data = ur.call(
      t,
      t.transformResponse,
      n
    ), n.headers = ge.from(n.headers), n;
  }, function(n) {
    return ki(n) || (cr(t), n && n.response && (n.response.data = ur.call(
      t,
      t.transformResponse,
      n.response
    ), n.response.headers = ge.from(n.response.headers))), Promise.reject(n);
  });
}
const Vn = (t) => t instanceof ge ? t.toJSON() : t;
function Ge(t, e) {
  e = e || {};
  const r = {};
  function n(c, h, y) {
    return m.isPlainObject(c) && m.isPlainObject(h) ? m.merge.call({ caseless: y }, c, h) : m.isPlainObject(h) ? m.merge({}, h) : m.isArray(h) ? h.slice() : h;
  }
  function o(c, h, y) {
    if (m.isUndefined(h)) {
      if (!m.isUndefined(c))
        return n(void 0, c, y);
    } else
      return n(c, h, y);
  }
  function i(c, h) {
    if (!m.isUndefined(h))
      return n(void 0, h);
  }
  function a(c, h) {
    if (m.isUndefined(h)) {
      if (!m.isUndefined(c))
        return n(void 0, c);
    } else
      return n(void 0, h);
  }
  function s(c, h, y) {
    if (y in e)
      return n(c, h);
    if (y in t)
      return n(void 0, c);
  }
  const u = {
    url: i,
    method: i,
    data: i,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: s,
    headers: (c, h) => o(Vn(c), Vn(h), !0)
  };
  return m.forEach(Object.keys(Object.assign({}, t, e)), function(h) {
    const y = u[h] || o, v = y(t[h], e[h], h);
    m.isUndefined(v) && y !== s || (r[h] = v);
  }), r;
}
const qi = "1.6.7", Jr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Jr[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const qn = {};
Jr.transitional = function(e, r, n) {
  function o(i, a) {
    return "[Axios v" + qi + "] Transitional option '" + i + "'" + a + (n ? ". " + n : "");
  }
  return (i, a, s) => {
    if (e === !1)
      throw new F(
        o(a, " has been removed" + (r ? " in " + r : "")),
        F.ERR_DEPRECATED
      );
    return r && !qn[a] && (qn[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), e ? e(i, a, s) : !0;
  };
};
function sl(t, e, r) {
  if (typeof t != "object")
    throw new F("options must be an object", F.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let o = n.length;
  for (; o-- > 0; ) {
    const i = n[o], a = e[i];
    if (a) {
      const s = t[i], u = s === void 0 || a(s, i, t);
      if (u !== !0)
        throw new F("option " + i + " must be " + u, F.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new F("Unknown option " + i, F.ERR_BAD_OPTION);
  }
}
const xr = {
  assertOptions: sl,
  validators: Jr
}, Ae = xr.validators;
class Ht {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new Bn(),
      response: new Bn()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, r) {
    try {
      return await this._request(e, r);
    } catch (n) {
      if (n instanceof Error) {
        let o;
        Error.captureStackTrace ? Error.captureStackTrace(o = {}) : o = new Error();
        const i = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        n.stack ? i && !String(n.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + i) : n.stack = i;
      }
      throw n;
    }
  }
  _request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = Ge(this.defaults, r);
    const { transitional: n, paramsSerializer: o, headers: i } = r;
    n !== void 0 && xr.assertOptions(n, {
      silentJSONParsing: Ae.transitional(Ae.boolean),
      forcedJSONParsing: Ae.transitional(Ae.boolean),
      clarifyTimeoutError: Ae.transitional(Ae.boolean)
    }, !1), o != null && (m.isFunction(o) ? r.paramsSerializer = {
      serialize: o
    } : xr.assertOptions(o, {
      encode: Ae.function,
      serialize: Ae.function
    }, !0)), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let a = i && m.merge(
      i.common,
      i[r.method]
    );
    i && m.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete i[f];
      }
    ), r.headers = ge.concat(a, i);
    const s = [];
    let u = !0;
    this.interceptors.request.forEach(function(d) {
      typeof d.runWhen == "function" && d.runWhen(r) === !1 || (u = u && d.synchronous, s.unshift(d.fulfilled, d.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(d) {
      c.push(d.fulfilled, d.rejected);
    });
    let h, y = 0, v;
    if (!u) {
      const f = [Hn.bind(this), void 0];
      for (f.unshift.apply(f, s), f.push.apply(f, c), v = f.length, h = Promise.resolve(r); y < v; )
        h = h.then(f[y++], f[y++]);
      return h;
    }
    v = s.length;
    let b = r;
    for (y = 0; y < v; ) {
      const f = s[y++], d = s[y++];
      try {
        b = f(b);
      } catch (w) {
        d.call(this, w);
        break;
      }
    }
    try {
      h = Hn.call(this, b);
    } catch (f) {
      return Promise.reject(f);
    }
    for (y = 0, v = c.length; y < v; )
      h = h.then(c[y++], c[y++]);
    return h;
  }
  getUri(e) {
    e = Ge(this.defaults, e);
    const r = Hi(e.baseURL, e.url);
    return Li(r, e.params, e.paramsSerializer);
  }
}
m.forEach(["delete", "get", "head", "options"], function(e) {
  Ht.prototype[e] = function(r, n) {
    return this.request(Ge(n || {}, {
      method: e,
      url: r,
      data: (n || {}).data
    }));
  };
});
m.forEach(["post", "put", "patch"], function(e) {
  function r(n) {
    return function(i, a, s) {
      return this.request(Ge(s || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: a
      }));
    };
  }
  Ht.prototype[e] = r(), Ht.prototype[e + "Form"] = r(!0);
});
const Lt = Ht;
class Kr {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners)
        return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](o);
      n._listeners = null;
    }), this.promise.then = (o) => {
      let i;
      const a = new Promise((s) => {
        n.subscribe(s), i = s;
      }).then(o);
      return a.cancel = function() {
        n.unsubscribe(i);
      }, a;
    }, e(function(i, a, s) {
      n.reason || (n.reason = new St(i, a, s), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new Kr(function(o) {
        e = o;
      }),
      cancel: e
    };
  }
}
const ll = Kr;
function ul(t) {
  return function(r) {
    return t.apply(null, r);
  };
}
function cl(t) {
  return m.isObject(t) && t.isAxiosError === !0;
}
const Rr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Rr).forEach(([t, e]) => {
  Rr[e] = t;
});
const fl = Rr;
function Wi(t) {
  const e = new Lt(t), r = Pi(Lt.prototype.request, e);
  return m.extend(r, Lt.prototype, e, { allOwnKeys: !0 }), m.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(o) {
    return Wi(Ge(t, o));
  }, r;
}
const U = Wi(Gr);
U.Axios = Lt;
U.CanceledError = St;
U.CancelToken = ll;
U.isCancel = ki;
U.VERSION = qi;
U.toFormData = Xt;
U.AxiosError = F;
U.Cancel = U.CanceledError;
U.all = function(e) {
  return Promise.all(e);
};
U.spread = ul;
U.isAxiosError = cl;
U.mergeConfig = Ge;
U.AxiosHeaders = ge;
U.formToJSON = (t) => Mi(m.isHTMLForm(t) ? new FormData(t) : t);
U.getAdapter = Vi.getAdapter;
U.HttpStatusCode = fl;
U.default = U;
const Tr = U;
var We = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function pl(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function dl(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var yl = function(e) {
  return hl(e) && !ml(e);
};
function hl(t) {
  return !!t && typeof t == "object";
}
function ml(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || bl(t);
}
var gl = typeof Symbol == "function" && Symbol.for, vl = gl ? Symbol.for("react.element") : 60103;
function bl(t) {
  return t.$$typeof === vl;
}
function Sl(t) {
  return Array.isArray(t) ? [] : {};
}
function gt(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Je(Sl(t), t, e) : t;
}
function wl(t, e, r) {
  return t.concat(e).map(function(n) {
    return gt(n, r);
  });
}
function Ol(t, e) {
  if (!e.customMerge)
    return Je;
  var r = e.customMerge(t);
  return typeof r == "function" ? r : Je;
}
function El(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function Wn(t) {
  return Object.keys(t).concat(El(t));
}
function zi(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function Al(t, e) {
  return zi(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function Pl(t, e, r) {
  var n = {};
  return r.isMergeableObject(t) && Wn(t).forEach(function(o) {
    n[o] = gt(t[o], r);
  }), Wn(e).forEach(function(o) {
    Al(t, o) || (zi(t, o) && r.isMergeableObject(e[o]) ? n[o] = Ol(o, r)(t[o], e[o], r) : n[o] = gt(e[o], r));
  }), n;
}
function Je(t, e, r) {
  r = r || {}, r.arrayMerge = r.arrayMerge || wl, r.isMergeableObject = r.isMergeableObject || yl, r.cloneUnlessOtherwiseSpecified = gt;
  var n = Array.isArray(e), o = Array.isArray(t), i = n === o;
  return i ? n ? r.arrayMerge(t, e, r) : Pl(t, e, r) : gt(e, r);
}
Je.all = function(e, r) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, o) {
    return Je(n, o, r);
  }, {});
};
var _l = Je, xl = _l;
const Rl = /* @__PURE__ */ pl(xl);
var Tl = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var e = {}, r = Symbol("test"), n = Object(r);
  if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var o = 42;
  e[r] = o;
  for (r in e)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(e).length !== 0)
    return !1;
  var i = Object.getOwnPropertySymbols(e);
  if (i.length !== 1 || i[0] !== r || !Object.prototype.propertyIsEnumerable.call(e, r))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var a = Object.getOwnPropertyDescriptor(e, r);
    if (a.value !== o || a.enumerable !== !0)
      return !1;
  }
  return !0;
}, zn = typeof Symbol < "u" && Symbol, $l = Tl, Cl = function() {
  return typeof zn != "function" || typeof Symbol != "function" || typeof zn("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : $l();
}, Gn = {
  foo: {}
}, Fl = Object, Nl = function() {
  return { __proto__: Gn }.foo === Gn.foo && !({ __proto__: null } instanceof Fl);
}, Il = "Function.prototype.bind called on incompatible ", jl = Object.prototype.toString, Dl = Math.max, Ll = "[object Function]", Jn = function(e, r) {
  for (var n = [], o = 0; o < e.length; o += 1)
    n[o] = e[o];
  for (var i = 0; i < r.length; i += 1)
    n[i + e.length] = r[i];
  return n;
}, Bl = function(e, r) {
  for (var n = [], o = r || 0, i = 0; o < e.length; o += 1, i += 1)
    n[i] = e[o];
  return n;
}, Ul = function(t, e) {
  for (var r = "", n = 0; n < t.length; n += 1)
    r += t[n], n + 1 < t.length && (r += e);
  return r;
}, Ml = function(e) {
  var r = this;
  if (typeof r != "function" || jl.apply(r) !== Ll)
    throw new TypeError(Il + r);
  for (var n = Bl(arguments, 1), o, i = function() {
    if (this instanceof o) {
      var h = r.apply(
        this,
        Jn(n, arguments)
      );
      return Object(h) === h ? h : this;
    }
    return r.apply(
      e,
      Jn(n, arguments)
    );
  }, a = Dl(0, r.length - n.length), s = [], u = 0; u < a; u++)
    s[u] = "$" + u;
  if (o = Function("binder", "return function (" + Ul(s, ",") + "){ return binder.apply(this,arguments); }")(i), r.prototype) {
    var c = function() {
    };
    c.prototype = r.prototype, o.prototype = new c(), c.prototype = null;
  }
  return o;
}, kl = Ml, Qr = Function.prototype.bind || kl, Hl = Function.prototype.call, Vl = Object.prototype.hasOwnProperty, ql = Qr, Wl = ql.call(Hl, Vl), T, Ke = SyntaxError, Gi = Function, ze = TypeError, fr = function(t) {
  try {
    return Gi('"use strict"; return (' + t + ").constructor;")();
  } catch {
  }
}, De = Object.getOwnPropertyDescriptor;
if (De)
  try {
    De({}, "");
  } catch {
    De = null;
  }
var pr = function() {
  throw new ze();
}, zl = De ? function() {
  try {
    return arguments.callee, pr;
  } catch {
    try {
      return De(arguments, "callee").get;
    } catch {
      return pr;
    }
  }
}() : pr, ke = Cl(), Gl = Nl(), H = Object.getPrototypeOf || (Gl ? function(t) {
  return t.__proto__;
} : null), qe = {}, Jl = typeof Uint8Array > "u" || !H ? T : H(Uint8Array), Le = {
  "%AggregateError%": typeof AggregateError > "u" ? T : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? T : ArrayBuffer,
  "%ArrayIteratorPrototype%": ke && H ? H([][Symbol.iterator]()) : T,
  "%AsyncFromSyncIteratorPrototype%": T,
  "%AsyncFunction%": qe,
  "%AsyncGenerator%": qe,
  "%AsyncGeneratorFunction%": qe,
  "%AsyncIteratorPrototype%": qe,
  "%Atomics%": typeof Atomics > "u" ? T : Atomics,
  "%BigInt%": typeof BigInt > "u" ? T : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? T : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? T : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? T : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array > "u" ? T : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? T : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? T : FinalizationRegistry,
  "%Function%": Gi,
  "%GeneratorFunction%": qe,
  "%Int8Array%": typeof Int8Array > "u" ? T : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? T : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? T : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ke && H ? H(H([][Symbol.iterator]())) : T,
  "%JSON%": typeof JSON == "object" ? JSON : T,
  "%Map%": typeof Map > "u" ? T : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ke || !H ? T : H((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? T : Promise,
  "%Proxy%": typeof Proxy > "u" ? T : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect > "u" ? T : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? T : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ke || !H ? T : H((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? T : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ke && H ? H(""[Symbol.iterator]()) : T,
  "%Symbol%": ke ? Symbol : T,
  "%SyntaxError%": Ke,
  "%ThrowTypeError%": zl,
  "%TypedArray%": Jl,
  "%TypeError%": ze,
  "%Uint8Array%": typeof Uint8Array > "u" ? T : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? T : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? T : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? T : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap > "u" ? T : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? T : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? T : WeakSet
};
if (H)
  try {
    null.error;
  } catch (t) {
    var Kl = H(H(t));
    Le["%Error.prototype%"] = Kl;
  }
var Ql = function t(e) {
  var r;
  if (e === "%AsyncFunction%")
    r = fr("async function () {}");
  else if (e === "%GeneratorFunction%")
    r = fr("function* () {}");
  else if (e === "%AsyncGeneratorFunction%")
    r = fr("async function* () {}");
  else if (e === "%AsyncGenerator%") {
    var n = t("%AsyncGeneratorFunction%");
    n && (r = n.prototype);
  } else if (e === "%AsyncIteratorPrototype%") {
    var o = t("%AsyncGenerator%");
    o && H && (r = H(o.prototype));
  }
  return Le[e] = r, r;
}, Kn = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, wt = Qr, Vt = Wl, Xl = wt.call(Function.call, Array.prototype.concat), Zl = wt.call(Function.apply, Array.prototype.splice), Qn = wt.call(Function.call, String.prototype.replace), qt = wt.call(Function.call, String.prototype.slice), Yl = wt.call(Function.call, RegExp.prototype.exec), eu = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, tu = /\\(\\)?/g, ru = function(e) {
  var r = qt(e, 0, 1), n = qt(e, -1);
  if (r === "%" && n !== "%")
    throw new Ke("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && r !== "%")
    throw new Ke("invalid intrinsic syntax, expected opening `%`");
  var o = [];
  return Qn(e, eu, function(i, a, s, u) {
    o[o.length] = s ? Qn(u, tu, "$1") : a || i;
  }), o;
}, nu = function(e, r) {
  var n = e, o;
  if (Vt(Kn, n) && (o = Kn[n], n = "%" + o[0] + "%"), Vt(Le, n)) {
    var i = Le[n];
    if (i === qe && (i = Ql(n)), typeof i > "u" && !r)
      throw new ze("intrinsic " + e + " exists, but is not available. Please file an issue!");
    return {
      alias: o,
      name: n,
      value: i
    };
  }
  throw new Ke("intrinsic " + e + " does not exist!");
}, Be = function(e, r) {
  if (typeof e != "string" || e.length === 0)
    throw new ze("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof r != "boolean")
    throw new ze('"allowMissing" argument must be a boolean');
  if (Yl(/^%?[^%]*%?$/, e) === null)
    throw new Ke("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = ru(e), o = n.length > 0 ? n[0] : "", i = nu("%" + o + "%", r), a = i.name, s = i.value, u = !1, c = i.alias;
  c && (o = c[0], Zl(n, Xl([0, 1], c)));
  for (var h = 1, y = !0; h < n.length; h += 1) {
    var v = n[h], b = qt(v, 0, 1), f = qt(v, -1);
    if ((b === '"' || b === "'" || b === "`" || f === '"' || f === "'" || f === "`") && b !== f)
      throw new Ke("property names with quotes must have matching quotes");
    if ((v === "constructor" || !y) && (u = !0), o += "." + v, a = "%" + o + "%", Vt(Le, a))
      s = Le[a];
    else if (s != null) {
      if (!(v in s)) {
        if (!r)
          throw new ze("base intrinsic for " + e + " exists, but the property is not available.");
        return;
      }
      if (De && h + 1 >= n.length) {
        var d = De(s, v);
        y = !!d, y && "get" in d && !("originalValue" in d.get) ? s = d.get : s = s[v];
      } else
        y = Vt(s, v), s = s[v];
      y && !u && (Le[a] = s);
    }
  }
  return s;
}, Ji = { exports: {} }, iu = Be, $r = iu("%Object.defineProperty%", !0), Cr = function() {
  if ($r)
    try {
      return $r({}, "a", { value: 1 }), !0;
    } catch {
      return !1;
    }
  return !1;
};
Cr.hasArrayLengthDefineBug = function() {
  if (!Cr())
    return null;
  try {
    return $r([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Ki = Cr, ou = Be, Bt = ou("%Object.getOwnPropertyDescriptor%", !0);
if (Bt)
  try {
    Bt([], "length");
  } catch {
    Bt = null;
  }
var Qi = Bt, au = Ki(), Xr = Be, ct = au && Xr("%Object.defineProperty%", !0);
if (ct)
  try {
    ct({}, "a", { value: 1 });
  } catch {
    ct = !1;
  }
var su = Xr("%SyntaxError%"), He = Xr("%TypeError%"), Xn = Qi, lu = function(e, r, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new He("`obj` must be an object or a function`");
  if (typeof r != "string" && typeof r != "symbol")
    throw new He("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new He("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new He("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new He("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new He("`loose`, if provided, must be a boolean");
  var o = arguments.length > 3 ? arguments[3] : null, i = arguments.length > 4 ? arguments[4] : null, a = arguments.length > 5 ? arguments[5] : null, s = arguments.length > 6 ? arguments[6] : !1, u = !!Xn && Xn(e, r);
  if (ct)
    ct(e, r, {
      configurable: a === null && u ? u.configurable : !a,
      enumerable: o === null && u ? u.enumerable : !o,
      value: n,
      writable: i === null && u ? u.writable : !i
    });
  else if (s || !o && !i && !a)
    e[r] = n;
  else
    throw new su("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, Xi = Be, Zn = lu, uu = Ki(), Yn = Qi, ei = Xi("%TypeError%"), cu = Xi("%Math.floor%"), fu = function(e, r) {
  if (typeof e != "function")
    throw new ei("`fn` is not a function");
  if (typeof r != "number" || r < 0 || r > 4294967295 || cu(r) !== r)
    throw new ei("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], o = !0, i = !0;
  if ("length" in e && Yn) {
    var a = Yn(e, "length");
    a && !a.configurable && (o = !1), a && !a.writable && (i = !1);
  }
  return (o || i || !n) && (uu ? Zn(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r,
    !0,
    !0
  ) : Zn(
    /** @type {Parameters<define>[0]} */
    e,
    "length",
    r
  )), e;
};
(function(t) {
  var e = Qr, r = Be, n = fu, o = r("%TypeError%"), i = r("%Function.prototype.apply%"), a = r("%Function.prototype.call%"), s = r("%Reflect.apply%", !0) || e.call(a, i), u = r("%Object.defineProperty%", !0), c = r("%Math.max%");
  if (u)
    try {
      u({}, "a", { value: 1 });
    } catch {
      u = null;
    }
  t.exports = function(v) {
    if (typeof v != "function")
      throw new o("a function is required");
    var b = s(e, a, arguments);
    return n(
      b,
      1 + c(0, v.length - (arguments.length - 1)),
      !0
    );
  };
  var h = function() {
    return s(e, i, arguments);
  };
  u ? u(t.exports, "apply", { value: h }) : t.exports.apply = h;
})(Ji);
var pu = Ji.exports, Zi = Be, Yi = pu, du = Yi(Zi("String.prototype.indexOf")), yu = function(e, r) {
  var n = Zi(e, !!r);
  return typeof n == "function" && du(e, ".prototype.") > -1 ? Yi(n) : n;
};
const hu = {}, mu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hu
}, Symbol.toStringTag, { value: "Module" })), gu = /* @__PURE__ */ dl(mu);
var Zr = typeof Map == "function" && Map.prototype, dr = Object.getOwnPropertyDescriptor && Zr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Wt = Zr && dr && typeof dr.get == "function" ? dr.get : null, ti = Zr && Map.prototype.forEach, Yr = typeof Set == "function" && Set.prototype, yr = Object.getOwnPropertyDescriptor && Yr ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, zt = Yr && yr && typeof yr.get == "function" ? yr.get : null, ri = Yr && Set.prototype.forEach, vu = typeof WeakMap == "function" && WeakMap.prototype, ft = vu ? WeakMap.prototype.has : null, bu = typeof WeakSet == "function" && WeakSet.prototype, pt = bu ? WeakSet.prototype.has : null, Su = typeof WeakRef == "function" && WeakRef.prototype, ni = Su ? WeakRef.prototype.deref : null, wu = Boolean.prototype.valueOf, Ou = Object.prototype.toString, Eu = Function.prototype.toString, Au = String.prototype.match, en = String.prototype.slice, _e = String.prototype.replace, Pu = String.prototype.toUpperCase, ii = String.prototype.toLowerCase, eo = RegExp.prototype.test, oi = Array.prototype.concat, ue = Array.prototype.join, _u = Array.prototype.slice, ai = Math.floor, Fr = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, hr = Object.getOwnPropertySymbols, Nr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Qe = typeof Symbol == "function" && typeof Symbol.iterator == "object", Q = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Qe || "symbol") ? Symbol.toStringTag : null, to = Object.prototype.propertyIsEnumerable, si = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(t) {
  return t.__proto__;
} : null);
function li(t, e) {
  if (t === 1 / 0 || t === -1 / 0 || t !== t || t && t > -1e3 && t < 1e3 || eo.call(/e/, e))
    return e;
  var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof t == "number") {
    var n = t < 0 ? -ai(-t) : ai(t);
    if (n !== t) {
      var o = String(n), i = en.call(e, o.length + 1);
      return _e.call(o, r, "$&_") + "." + _e.call(_e.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return _e.call(e, r, "$&_");
}
var Ir = gu, ui = Ir.custom, ci = no(ui) ? ui : null, xu = function t(e, r, n, o) {
  var i = r || {};
  if (Pe(i, "quoteStyle") && i.quoteStyle !== "single" && i.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (Pe(i, "maxStringLength") && (typeof i.maxStringLength == "number" ? i.maxStringLength < 0 && i.maxStringLength !== 1 / 0 : i.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var a = Pe(i, "customInspect") ? i.customInspect : !0;
  if (typeof a != "boolean" && a !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (Pe(i, "indent") && i.indent !== null && i.indent !== "	" && !(parseInt(i.indent, 10) === i.indent && i.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (Pe(i, "numericSeparator") && typeof i.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var s = i.numericSeparator;
  if (typeof e > "u")
    return "undefined";
  if (e === null)
    return "null";
  if (typeof e == "boolean")
    return e ? "true" : "false";
  if (typeof e == "string")
    return oo(e, i);
  if (typeof e == "number") {
    if (e === 0)
      return 1 / 0 / e > 0 ? "0" : "-0";
    var u = String(e);
    return s ? li(e, u) : u;
  }
  if (typeof e == "bigint") {
    var c = String(e) + "n";
    return s ? li(e, c) : c;
  }
  var h = typeof i.depth > "u" ? 5 : i.depth;
  if (typeof n > "u" && (n = 0), n >= h && h > 0 && typeof e == "object")
    return jr(e) ? "[Array]" : "[Object]";
  var y = Wu(i, n);
  if (typeof o > "u")
    o = [];
  else if (io(o, e) >= 0)
    return "[Circular]";
  function v(ie, be, Ue) {
    if (be && (o = _u.call(o), o.push(be)), Ue) {
      var Se = {
        depth: i.depth
      };
      return Pe(i, "quoteStyle") && (Se.quoteStyle = i.quoteStyle), t(ie, Se, n + 1, o);
    }
    return t(ie, i, n + 1, o);
  }
  if (typeof e == "function" && !fi(e)) {
    var b = Du(e), f = Ct(e, v);
    return "[Function" + (b ? ": " + b : " (anonymous)") + "]" + (f.length > 0 ? " { " + ue.call(f, ", ") + " }" : "");
  }
  if (no(e)) {
    var d = Qe ? _e.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : Nr.call(e);
    return typeof e == "object" && !Qe ? st(d) : d;
  }
  if (Hu(e)) {
    for (var w = "<" + ii.call(String(e.nodeName)), S = e.attributes || [], P = 0; P < S.length; P++)
      w += " " + S[P].name + "=" + ro(Ru(S[P].value), "double", i);
    return w += ">", e.childNodes && e.childNodes.length && (w += "..."), w += "</" + ii.call(String(e.nodeName)) + ">", w;
  }
  if (jr(e)) {
    if (e.length === 0)
      return "[]";
    var x = Ct(e, v);
    return y && !qu(x) ? "[" + Dr(x, y) + "]" : "[ " + ue.call(x, ", ") + " ]";
  }
  if ($u(e)) {
    var _ = Ct(e, v);
    return !("cause" in Error.prototype) && "cause" in e && !to.call(e, "cause") ? "{ [" + String(e) + "] " + ue.call(oi.call("[cause]: " + v(e.cause), _), ", ") + " }" : _.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + ue.call(_, ", ") + " }";
  }
  if (typeof e == "object" && a) {
    if (ci && typeof e[ci] == "function" && Ir)
      return Ir(e, { depth: h - n });
    if (a !== "symbol" && typeof e.inspect == "function")
      return e.inspect();
  }
  if (Lu(e)) {
    var C = [];
    return ti && ti.call(e, function(ie, be) {
      C.push(v(be, e, !0) + " => " + v(ie, e));
    }), pi("Map", Wt.call(e), C, y);
  }
  if (Mu(e)) {
    var N = [];
    return ri && ri.call(e, function(ie) {
      N.push(v(ie, e));
    }), pi("Set", zt.call(e), N, y);
  }
  if (Bu(e))
    return mr("WeakMap");
  if (ku(e))
    return mr("WeakSet");
  if (Uu(e))
    return mr("WeakRef");
  if (Fu(e))
    return st(v(Number(e)));
  if (Iu(e))
    return st(v(Fr.call(e)));
  if (Nu(e))
    return st(wu.call(e));
  if (Cu(e))
    return st(v(String(e)));
  if (typeof window < "u" && e === window)
    return "{ [object Window] }";
  if (e === We)
    return "{ [object globalThis] }";
  if (!Tu(e) && !fi(e)) {
    var E = Ct(e, v), A = si ? si(e) === Object.prototype : e instanceof Object || e.constructor === Object, D = e instanceof Object ? "" : "null prototype", V = !A && Q && Object(e) === e && Q in e ? en.call(xe(e), 8, -1) : D ? "Object" : "", X = A || typeof e.constructor != "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", G = X + (V || D ? "[" + ue.call(oi.call([], V || [], D || []), ": ") + "] " : "");
    return E.length === 0 ? G + "{}" : y ? G + "{" + Dr(E, y) + "}" : G + "{ " + ue.call(E, ", ") + " }";
  }
  return String(e);
};
function ro(t, e, r) {
  var n = (r.quoteStyle || e) === "double" ? '"' : "'";
  return n + t + n;
}
function Ru(t) {
  return _e.call(String(t), /"/g, "&quot;");
}
function jr(t) {
  return xe(t) === "[object Array]" && (!Q || !(typeof t == "object" && Q in t));
}
function Tu(t) {
  return xe(t) === "[object Date]" && (!Q || !(typeof t == "object" && Q in t));
}
function fi(t) {
  return xe(t) === "[object RegExp]" && (!Q || !(typeof t == "object" && Q in t));
}
function $u(t) {
  return xe(t) === "[object Error]" && (!Q || !(typeof t == "object" && Q in t));
}
function Cu(t) {
  return xe(t) === "[object String]" && (!Q || !(typeof t == "object" && Q in t));
}
function Fu(t) {
  return xe(t) === "[object Number]" && (!Q || !(typeof t == "object" && Q in t));
}
function Nu(t) {
  return xe(t) === "[object Boolean]" && (!Q || !(typeof t == "object" && Q in t));
}
function no(t) {
  if (Qe)
    return t && typeof t == "object" && t instanceof Symbol;
  if (typeof t == "symbol")
    return !0;
  if (!t || typeof t != "object" || !Nr)
    return !1;
  try {
    return Nr.call(t), !0;
  } catch {
  }
  return !1;
}
function Iu(t) {
  if (!t || typeof t != "object" || !Fr)
    return !1;
  try {
    return Fr.call(t), !0;
  } catch {
  }
  return !1;
}
var ju = Object.prototype.hasOwnProperty || function(t) {
  return t in this;
};
function Pe(t, e) {
  return ju.call(t, e);
}
function xe(t) {
  return Ou.call(t);
}
function Du(t) {
  if (t.name)
    return t.name;
  var e = Au.call(Eu.call(t), /^function\s*([\w$]+)/);
  return e ? e[1] : null;
}
function io(t, e) {
  if (t.indexOf)
    return t.indexOf(e);
  for (var r = 0, n = t.length; r < n; r++)
    if (t[r] === e)
      return r;
  return -1;
}
function Lu(t) {
  if (!Wt || !t || typeof t != "object")
    return !1;
  try {
    Wt.call(t);
    try {
      zt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Map;
  } catch {
  }
  return !1;
}
function Bu(t) {
  if (!ft || !t || typeof t != "object")
    return !1;
  try {
    ft.call(t, ft);
    try {
      pt.call(t, pt);
    } catch {
      return !0;
    }
    return t instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Uu(t) {
  if (!ni || !t || typeof t != "object")
    return !1;
  try {
    return ni.call(t), !0;
  } catch {
  }
  return !1;
}
function Mu(t) {
  if (!zt || !t || typeof t != "object")
    return !1;
  try {
    zt.call(t);
    try {
      Wt.call(t);
    } catch {
      return !0;
    }
    return t instanceof Set;
  } catch {
  }
  return !1;
}
function ku(t) {
  if (!pt || !t || typeof t != "object")
    return !1;
  try {
    pt.call(t, pt);
    try {
      ft.call(t, ft);
    } catch {
      return !0;
    }
    return t instanceof WeakSet;
  } catch {
  }
  return !1;
}
function Hu(t) {
  return !t || typeof t != "object" ? !1 : typeof HTMLElement < "u" && t instanceof HTMLElement ? !0 : typeof t.nodeName == "string" && typeof t.getAttribute == "function";
}
function oo(t, e) {
  if (t.length > e.maxStringLength) {
    var r = t.length - e.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
    return oo(en.call(t, 0, e.maxStringLength), e) + n;
  }
  var o = _e.call(_e.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, Vu);
  return ro(o, "single", e);
}
function Vu(t) {
  var e = t.charCodeAt(0), r = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[e];
  return r ? "\\" + r : "\\x" + (e < 16 ? "0" : "") + Pu.call(e.toString(16));
}
function st(t) {
  return "Object(" + t + ")";
}
function mr(t) {
  return t + " { ? }";
}
function pi(t, e, r, n) {
  var o = n ? Dr(r, n) : ue.call(r, ", ");
  return t + " (" + e + ") {" + o + "}";
}
function qu(t) {
  for (var e = 0; e < t.length; e++)
    if (io(t[e], `
`) >= 0)
      return !1;
  return !0;
}
function Wu(t, e) {
  var r;
  if (t.indent === "	")
    r = "	";
  else if (typeof t.indent == "number" && t.indent > 0)
    r = ue.call(Array(t.indent + 1), " ");
  else
    return null;
  return {
    base: r,
    prev: ue.call(Array(e + 1), r)
  };
}
function Dr(t, e) {
  if (t.length === 0)
    return "";
  var r = `
` + e.prev + e.base;
  return r + ue.call(t, "," + r) + `
` + e.prev;
}
function Ct(t, e) {
  var r = jr(t), n = [];
  if (r) {
    n.length = t.length;
    for (var o = 0; o < t.length; o++)
      n[o] = Pe(t, o) ? e(t[o], t) : "";
  }
  var i = typeof hr == "function" ? hr(t) : [], a;
  if (Qe) {
    a = {};
    for (var s = 0; s < i.length; s++)
      a["$" + i[s]] = i[s];
  }
  for (var u in t)
    Pe(t, u) && (r && String(Number(u)) === u && u < t.length || Qe && a["$" + u] instanceof Symbol || (eo.call(/[^\w$]/, u) ? n.push(e(u, t) + ": " + e(t[u], t)) : n.push(u + ": " + e(t[u], t))));
  if (typeof hr == "function")
    for (var c = 0; c < i.length; c++)
      to.call(t, i[c]) && n.push("[" + e(i[c]) + "]: " + e(t[i[c]], t));
  return n;
}
var tn = Be, et = yu, zu = xu, Gu = tn("%TypeError%"), Ft = tn("%WeakMap%", !0), Nt = tn("%Map%", !0), Ju = et("WeakMap.prototype.get", !0), Ku = et("WeakMap.prototype.set", !0), Qu = et("WeakMap.prototype.has", !0), Xu = et("Map.prototype.get", !0), Zu = et("Map.prototype.set", !0), Yu = et("Map.prototype.has", !0), rn = function(t, e) {
  for (var r = t, n; (n = r.next) !== null; r = n)
    if (n.key === e)
      return r.next = n.next, n.next = t.next, t.next = n, n;
}, ec = function(t, e) {
  var r = rn(t, e);
  return r && r.value;
}, tc = function(t, e, r) {
  var n = rn(t, e);
  n ? n.value = r : t.next = {
    // eslint-disable-line no-param-reassign
    key: e,
    next: t.next,
    value: r
  };
}, rc = function(t, e) {
  return !!rn(t, e);
}, nc = function() {
  var e, r, n, o = {
    assert: function(i) {
      if (!o.has(i))
        throw new Gu("Side channel does not contain " + zu(i));
    },
    get: function(i) {
      if (Ft && i && (typeof i == "object" || typeof i == "function")) {
        if (e)
          return Ju(e, i);
      } else if (Nt) {
        if (r)
          return Xu(r, i);
      } else if (n)
        return ec(n, i);
    },
    has: function(i) {
      if (Ft && i && (typeof i == "object" || typeof i == "function")) {
        if (e)
          return Qu(e, i);
      } else if (Nt) {
        if (r)
          return Yu(r, i);
      } else if (n)
        return rc(n, i);
      return !1;
    },
    set: function(i, a) {
      Ft && i && (typeof i == "object" || typeof i == "function") ? (e || (e = new Ft()), Ku(e, i, a)) : Nt ? (r || (r = new Nt()), Zu(r, i, a)) : (n || (n = { key: {}, next: null }), tc(n, i, a));
    }
  };
  return o;
}, ic = String.prototype.replace, oc = /%20/g, gr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, nn = {
  default: gr.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return ic.call(t, oc, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: gr.RFC1738,
  RFC3986: gr.RFC3986
}, ac = nn, vr = Object.prototype.hasOwnProperty, Ne = Array.isArray, se = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), sc = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (Ne(n)) {
      for (var o = [], i = 0; i < n.length; ++i)
        typeof n[i] < "u" && o.push(n[i]);
      r.obj[r.prop] = o;
    }
  }
}, ao = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, lc = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (Ne(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !vr.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return Ne(e) && !Ne(r) && (o = ao(e, n)), Ne(e) && Ne(r) ? (r.forEach(function(i, a) {
    if (vr.call(e, a)) {
      var s = e[a];
      s && typeof s == "object" && i && typeof i == "object" ? e[a] = t(s, i, n) : e.push(i);
    } else
      e[a] = i;
  }), e) : Object.keys(r).reduce(function(i, a) {
    var s = r[a];
    return vr.call(i, a) ? i[a] = t(i[a], s, n) : i[a] = s, i;
  }, o);
}, uc = function(e, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, e);
}, cc = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, fc = function(e, r, n, o, i) {
  if (e.length === 0)
    return e;
  var a = e;
  if (typeof e == "symbol" ? a = Symbol.prototype.toString.call(e) : typeof e != "string" && (a = String(e)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(h) {
      return "%26%23" + parseInt(h.slice(2), 16) + "%3B";
    });
  for (var s = "", u = 0; u < a.length; ++u) {
    var c = a.charCodeAt(u);
    if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || i === ac.RFC1738 && (c === 40 || c === 41)) {
      s += a.charAt(u);
      continue;
    }
    if (c < 128) {
      s = s + se[c];
      continue;
    }
    if (c < 2048) {
      s = s + (se[192 | c >> 6] + se[128 | c & 63]);
      continue;
    }
    if (c < 55296 || c >= 57344) {
      s = s + (se[224 | c >> 12] + se[128 | c >> 6 & 63] + se[128 | c & 63]);
      continue;
    }
    u += 1, c = 65536 + ((c & 1023) << 10 | a.charCodeAt(u) & 1023), s += se[240 | c >> 18] + se[128 | c >> 12 & 63] + se[128 | c >> 6 & 63] + se[128 | c & 63];
  }
  return s;
}, pc = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var i = r[o], a = i.obj[i.prop], s = Object.keys(a), u = 0; u < s.length; ++u) {
      var c = s[u], h = a[c];
      typeof h == "object" && h !== null && n.indexOf(h) === -1 && (r.push({ obj: a, prop: c }), n.push(h));
    }
  return sc(r), e;
}, dc = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, yc = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, hc = function(e, r) {
  return [].concat(e, r);
}, mc = function(e, r) {
  if (Ne(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, so = {
  arrayToObject: ao,
  assign: uc,
  combine: hc,
  compact: pc,
  decode: cc,
  encode: fc,
  isBuffer: yc,
  isRegExp: dc,
  maybeMap: mc,
  merge: lc
}, lo = nc, Ut = so, dt = nn, gc = Object.prototype.hasOwnProperty, di = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, r) {
    return e + "[" + r + "]";
  },
  repeat: function(e) {
    return e;
  }
}, me = Array.isArray, vc = Array.prototype.push, uo = function(t, e) {
  vc.apply(t, me(e) ? e : [e]);
}, bc = Date.prototype.toISOString, yi = dt.default, K = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: Ut.encode,
  encodeValuesOnly: !1,
  format: yi,
  formatter: dt.formatters[yi],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return bc.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Sc = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, br = {}, wc = function t(e, r, n, o, i, a, s, u, c, h, y, v, b, f, d, w) {
  for (var S = e, P = w, x = 0, _ = !1; (P = P.get(br)) !== void 0 && !_; ) {
    var C = P.get(e);
    if (x += 1, typeof C < "u") {
      if (C === x)
        throw new RangeError("Cyclic object value");
      _ = !0;
    }
    typeof P.get(br) > "u" && (x = 0);
  }
  if (typeof u == "function" ? S = u(r, S) : S instanceof Date ? S = y(S) : n === "comma" && me(S) && (S = Ut.maybeMap(S, function(Se) {
    return Se instanceof Date ? y(Se) : Se;
  })), S === null) {
    if (i)
      return s && !f ? s(r, K.encoder, d, "key", v) : r;
    S = "";
  }
  if (Sc(S) || Ut.isBuffer(S)) {
    if (s) {
      var N = f ? r : s(r, K.encoder, d, "key", v);
      return [b(N) + "=" + b(s(S, K.encoder, d, "value", v))];
    }
    return [b(r) + "=" + b(String(S))];
  }
  var E = [];
  if (typeof S > "u")
    return E;
  var A;
  if (n === "comma" && me(S))
    f && s && (S = Ut.maybeMap(S, s)), A = [{ value: S.length > 0 ? S.join(",") || null : void 0 }];
  else if (me(u))
    A = u;
  else {
    var D = Object.keys(S);
    A = c ? D.sort(c) : D;
  }
  for (var V = o && me(S) && S.length === 1 ? r + "[]" : r, X = 0; X < A.length; ++X) {
    var G = A[X], ie = typeof G == "object" && typeof G.value < "u" ? G.value : S[G];
    if (!(a && ie === null)) {
      var be = me(S) ? typeof n == "function" ? n(V, G) : V : V + (h ? "." + G : "[" + G + "]");
      w.set(e, x);
      var Ue = lo();
      Ue.set(br, w), uo(E, t(
        ie,
        be,
        n,
        o,
        i,
        a,
        n === "comma" && f && me(S) ? null : s,
        u,
        c,
        h,
        y,
        v,
        b,
        f,
        d,
        Ue
      ));
    }
  }
  return E;
}, Oc = function(e) {
  if (!e)
    return K;
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || K.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = dt.default;
  if (typeof e.format < "u") {
    if (!gc.call(dt.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = dt.formatters[n], i = K.filter;
  return (typeof e.filter == "function" || me(e.filter)) && (i = e.filter), {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : K.addQueryPrefix,
    allowDots: typeof e.allowDots > "u" ? K.allowDots : !!e.allowDots,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : K.charsetSentinel,
    delimiter: typeof e.delimiter > "u" ? K.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : K.encode,
    encoder: typeof e.encoder == "function" ? e.encoder : K.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : K.encodeValuesOnly,
    filter: i,
    format: n,
    formatter: o,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : K.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : K.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : K.strictNullHandling
  };
}, Ec = function(t, e) {
  var r = t, n = Oc(e), o, i;
  typeof n.filter == "function" ? (i = n.filter, r = i("", r)) : me(n.filter) && (i = n.filter, o = i);
  var a = [];
  if (typeof r != "object" || r === null)
    return "";
  var s;
  e && e.arrayFormat in di ? s = e.arrayFormat : e && "indices" in e ? s = e.indices ? "indices" : "repeat" : s = "indices";
  var u = di[s];
  if (e && "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var c = u === "comma" && e && e.commaRoundTrip;
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var h = lo(), y = 0; y < o.length; ++y) {
    var v = o[y];
    n.skipNulls && r[v] === null || uo(a, wc(
      r[v],
      v,
      u,
      c,
      n.strictNullHandling,
      n.skipNulls,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset,
      h
    ));
  }
  var b = a.join(n.delimiter), f = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? f += "utf8=%26%2310003%3B&" : f += "utf8=%E2%9C%93&"), b.length > 0 ? f + b : "";
}, Xe = so, Lr = Object.prototype.hasOwnProperty, Ac = Array.isArray, k = {
  allowDots: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: Xe.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, Pc = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, co = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, _c = "utf8=%26%2310003%3B", xc = "utf8=%E2%9C%93", Rc = function(e, r) {
  var n = { __proto__: null }, o = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, i = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, a = o.split(r.delimiter, i), s = -1, u, c = r.charset;
  if (r.charsetSentinel)
    for (u = 0; u < a.length; ++u)
      a[u].indexOf("utf8=") === 0 && (a[u] === xc ? c = "utf-8" : a[u] === _c && (c = "iso-8859-1"), s = u, u = a.length);
  for (u = 0; u < a.length; ++u)
    if (u !== s) {
      var h = a[u], y = h.indexOf("]="), v = y === -1 ? h.indexOf("=") : y + 1, b, f;
      v === -1 ? (b = r.decoder(h, k.decoder, c, "key"), f = r.strictNullHandling ? null : "") : (b = r.decoder(h.slice(0, v), k.decoder, c, "key"), f = Xe.maybeMap(
        co(h.slice(v + 1), r),
        function(d) {
          return r.decoder(d, k.decoder, c, "value");
        }
      )), f && r.interpretNumericEntities && c === "iso-8859-1" && (f = Pc(f)), h.indexOf("[]=") > -1 && (f = Ac(f) ? [f] : f), Lr.call(n, b) ? n[b] = Xe.combine(n[b], f) : n[b] = f;
    }
  return n;
}, Tc = function(t, e, r, n) {
  for (var o = n ? e : co(e, r), i = t.length - 1; i >= 0; --i) {
    var a, s = t[i];
    if (s === "[]" && r.parseArrays)
      a = [].concat(o);
    else {
      a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var u = s.charAt(0) === "[" && s.charAt(s.length - 1) === "]" ? s.slice(1, -1) : s, c = parseInt(u, 10);
      !r.parseArrays && u === "" ? a = { 0: o } : !isNaN(c) && s !== u && String(c) === u && c >= 0 && r.parseArrays && c <= r.arrayLimit ? (a = [], a[c] = o) : u !== "__proto__" && (a[u] = o);
    }
    o = a;
  }
  return o;
}, $c = function(e, r, n, o) {
  if (e) {
    var i = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, a = /(\[[^[\]]*])/, s = /(\[[^[\]]*])/g, u = n.depth > 0 && a.exec(i), c = u ? i.slice(0, u.index) : i, h = [];
    if (c) {
      if (!n.plainObjects && Lr.call(Object.prototype, c) && !n.allowPrototypes)
        return;
      h.push(c);
    }
    for (var y = 0; n.depth > 0 && (u = s.exec(i)) !== null && y < n.depth; ) {
      if (y += 1, !n.plainObjects && Lr.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      h.push(u[1]);
    }
    return u && h.push("[" + i.slice(u.index) + "]"), Tc(h, r, n, o);
  }
}, Cc = function(e) {
  if (!e)
    return k;
  if (e.decoder !== null && e.decoder !== void 0 && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof e.charset > "u" ? k.charset : e.charset;
  return {
    allowDots: typeof e.allowDots > "u" ? k.allowDots : !!e.allowDots,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : k.allowPrototypes,
    allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : k.allowSparse,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : k.arrayLimit,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : k.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : k.comma,
    decoder: typeof e.decoder == "function" ? e.decoder : k.decoder,
    delimiter: typeof e.delimiter == "string" || Xe.isRegExp(e.delimiter) ? e.delimiter : k.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : k.depth,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : k.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : k.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : k.plainObjects,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : k.strictNullHandling
  };
}, Fc = function(t, e) {
  var r = Cc(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? Rc(t, r) : t, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i = Object.keys(n), a = 0; a < i.length; ++a) {
    var s = i[a], u = $c(s, n[s], r, typeof t == "string");
    o = Xe.merge(o, u, r);
  }
  return r.allowSparse === !0 ? o : Xe.compact(o);
}, Nc = Ec, Ic = Fc, jc = nn, hi = {
  formats: jc,
  parse: Ic,
  stringify: Nc
}, Dc = { exports: {} };
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(We, function() {
    var r = {};
    r.version = "0.2.0";
    var n = r.settings = {
      minimum: 0.08,
      easing: "ease",
      positionUsing: "",
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: "body",
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    };
    r.configure = function(f) {
      var d, w;
      for (d in f)
        w = f[d], w !== void 0 && f.hasOwnProperty(d) && (n[d] = w);
      return this;
    }, r.status = null, r.set = function(f) {
      var d = r.isStarted();
      f = o(f, n.minimum, 1), r.status = f === 1 ? null : f;
      var w = r.render(!d), S = w.querySelector(n.barSelector), P = n.speed, x = n.easing;
      return w.offsetWidth, s(function(_) {
        n.positionUsing === "" && (n.positionUsing = r.getPositioningCSS()), u(S, a(f, P, x)), f === 1 ? (u(w, {
          transition: "none",
          opacity: 1
        }), w.offsetWidth, setTimeout(function() {
          u(w, {
            transition: "all " + P + "ms linear",
            opacity: 0
          }), setTimeout(function() {
            r.remove(), _();
          }, P);
        }, P)) : setTimeout(_, P);
      }), this;
    }, r.isStarted = function() {
      return typeof r.status == "number";
    }, r.start = function() {
      r.status || r.set(0);
      var f = function() {
        setTimeout(function() {
          r.status && (r.trickle(), f());
        }, n.trickleSpeed);
      };
      return n.trickle && f(), this;
    }, r.done = function(f) {
      return !f && !r.status ? this : r.inc(0.3 + 0.5 * Math.random()).set(1);
    }, r.inc = function(f) {
      var d = r.status;
      return d ? (typeof f != "number" && (f = (1 - d) * o(Math.random() * d, 0.1, 0.95)), d = o(d + f, 0, 0.994), r.set(d)) : r.start();
    }, r.trickle = function() {
      return r.inc(Math.random() * n.trickleRate);
    }, function() {
      var f = 0, d = 0;
      r.promise = function(w) {
        return !w || w.state() === "resolved" ? this : (d === 0 && r.start(), f++, d++, w.always(function() {
          d--, d === 0 ? (f = 0, r.done()) : r.set((f - d) / f);
        }), this);
      };
    }(), r.render = function(f) {
      if (r.isRendered())
        return document.getElementById("nprogress");
      h(document.documentElement, "nprogress-busy");
      var d = document.createElement("div");
      d.id = "nprogress", d.innerHTML = n.template;
      var w = d.querySelector(n.barSelector), S = f ? "-100" : i(r.status || 0), P = document.querySelector(n.parent), x;
      return u(w, {
        transition: "all 0 linear",
        transform: "translate3d(" + S + "%,0,0)"
      }), n.showSpinner || (x = d.querySelector(n.spinnerSelector), x && b(x)), P != document.body && h(P, "nprogress-custom-parent"), P.appendChild(d), d;
    }, r.remove = function() {
      y(document.documentElement, "nprogress-busy"), y(document.querySelector(n.parent), "nprogress-custom-parent");
      var f = document.getElementById("nprogress");
      f && b(f);
    }, r.isRendered = function() {
      return !!document.getElementById("nprogress");
    }, r.getPositioningCSS = function() {
      var f = document.body.style, d = "WebkitTransform" in f ? "Webkit" : "MozTransform" in f ? "Moz" : "msTransform" in f ? "ms" : "OTransform" in f ? "O" : "";
      return d + "Perspective" in f ? "translate3d" : d + "Transform" in f ? "translate" : "margin";
    };
    function o(f, d, w) {
      return f < d ? d : f > w ? w : f;
    }
    function i(f) {
      return (-1 + f) * 100;
    }
    function a(f, d, w) {
      var S;
      return n.positionUsing === "translate3d" ? S = { transform: "translate3d(" + i(f) + "%,0,0)" } : n.positionUsing === "translate" ? S = { transform: "translate(" + i(f) + "%,0)" } : S = { "margin-left": i(f) + "%" }, S.transition = "all " + d + "ms " + w, S;
    }
    var s = function() {
      var f = [];
      function d() {
        var w = f.shift();
        w && w(d);
      }
      return function(w) {
        f.push(w), f.length == 1 && d();
      };
    }(), u = function() {
      var f = ["Webkit", "O", "Moz", "ms"], d = {};
      function w(_) {
        return _.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(C, N) {
          return N.toUpperCase();
        });
      }
      function S(_) {
        var C = document.body.style;
        if (_ in C)
          return _;
        for (var N = f.length, E = _.charAt(0).toUpperCase() + _.slice(1), A; N--; )
          if (A = f[N] + E, A in C)
            return A;
        return _;
      }
      function P(_) {
        return _ = w(_), d[_] || (d[_] = S(_));
      }
      function x(_, C, N) {
        C = P(C), _.style[C] = N;
      }
      return function(_, C) {
        var N = arguments, E, A;
        if (N.length == 2)
          for (E in C)
            A = C[E], A !== void 0 && C.hasOwnProperty(E) && x(_, E, A);
        else
          x(_, N[1], N[2]);
      };
    }();
    function c(f, d) {
      var w = typeof f == "string" ? f : v(f);
      return w.indexOf(" " + d + " ") >= 0;
    }
    function h(f, d) {
      var w = v(f), S = w + d;
      c(w, d) || (f.className = S.substring(1));
    }
    function y(f, d) {
      var w = v(f), S;
      c(f, d) && (S = w.replace(" " + d + " ", " "), f.className = S.substring(1, S.length - 1));
    }
    function v(f) {
      return (" " + (f.className || "") + " ").replace(/\s+/gi, " ");
    }
    function b(f) {
      f && f.parentNode && f.parentNode.removeChild(f);
    }
    return r;
  });
})(Dc);
function Lc(t, e) {
  let r;
  return function(...n) {
    clearTimeout(r), r = setTimeout(() => t.apply(this, n), e);
  };
}
function ve(t, e) {
  return document.dispatchEvent(new CustomEvent(`inertia:${t}`, e));
}
var Bc = (t) => ve("before", { cancelable: !0, detail: { visit: t } }), Uc = (t) => ve("error", { detail: { errors: t } }), Mc = (t) => ve("exception", { cancelable: !0, detail: { exception: t } }), mi = (t) => ve("finish", { detail: { visit: t } }), kc = (t) => ve("invalid", { cancelable: !0, detail: { response: t } }), lt = (t) => ve("navigate", { detail: { page: t } }), Hc = (t) => ve("progress", { detail: { progress: t } }), Vc = (t) => ve("start", { detail: { visit: t } }), qc = (t) => ve("success", { detail: { page: t } });
function Br(t) {
  return t instanceof File || t instanceof Blob || t instanceof FileList && t.length > 0 || t instanceof FormData && Array.from(t.values()).some((e) => Br(e)) || typeof t == "object" && t !== null && Object.values(t).some((e) => Br(e));
}
function fo(t, e = new FormData(), r = null) {
  t = t || {};
  for (let n in t)
    Object.prototype.hasOwnProperty.call(t, n) && yo(e, po(r, n), t[n]);
  return e;
}
function po(t, e) {
  return t ? t + "[" + e + "]" : e;
}
function yo(t, e, r) {
  if (Array.isArray(r))
    return Array.from(r.keys()).forEach((n) => yo(t, po(e, n.toString()), r[n]));
  if (r instanceof Date)
    return t.append(e, r.toISOString());
  if (r instanceof File)
    return t.append(e, r, r.name);
  if (r instanceof Blob)
    return t.append(e, r);
  if (typeof r == "boolean")
    return t.append(e, r ? "1" : "0");
  if (typeof r == "string")
    return t.append(e, r);
  if (typeof r == "number")
    return t.append(e, `${r}`);
  if (r == null)
    return t.append(e, "");
  fo(r, t, e);
}
var Wc = { modal: null, listener: null, show(t) {
  typeof t == "object" && (t = `All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(t)}`);
  let e = document.createElement("html");
  e.innerHTML = t, e.querySelectorAll("a").forEach((n) => n.setAttribute("target", "_top")), this.modal = document.createElement("div"), this.modal.style.position = "fixed", this.modal.style.width = "100vw", this.modal.style.height = "100vh", this.modal.style.padding = "50px", this.modal.style.boxSizing = "border-box", this.modal.style.backgroundColor = "rgba(0, 0, 0, .6)", this.modal.style.zIndex = 2e5, this.modal.addEventListener("click", () => this.hide());
  let r = document.createElement("iframe");
  if (r.style.backgroundColor = "white", r.style.borderRadius = "5px", r.style.width = "100%", r.style.height = "100%", this.modal.appendChild(r), document.body.prepend(this.modal), document.body.style.overflow = "hidden", !r.contentWindow)
    throw new Error("iframe not yet ready.");
  r.contentWindow.document.open(), r.contentWindow.document.write(e.outerHTML), r.contentWindow.document.close(), this.listener = this.hideOnEscape.bind(this), document.addEventListener("keydown", this.listener);
}, hide() {
  this.modal.outerHTML = "", this.modal = null, document.body.style.overflow = "visible", document.removeEventListener("keydown", this.listener);
}, hideOnEscape(t) {
  t.keyCode === 27 && this.hide();
} };
function Ve(t) {
  return new URL(t.toString(), window.location.toString());
}
function ho(t, e, r, n = "brackets") {
  let o = /^https?:\/\//.test(e.toString()), i = o || e.toString().startsWith("/"), a = !i && !e.toString().startsWith("#") && !e.toString().startsWith("?"), s = e.toString().includes("?") || t === "get" && Object.keys(r).length, u = e.toString().includes("#"), c = new URL(e.toString(), "http://localhost");
  return t === "get" && Object.keys(r).length && (c.search = hi.stringify(Rl(hi.parse(c.search, { ignoreQueryPrefix: !0 }), r), { encodeValuesOnly: !0, arrayFormat: n }), r = {}), [[o ? `${c.protocol}//${c.host}` : "", i ? c.pathname : "", a ? c.pathname.substring(1) : "", s ? c.search : "", u ? c.hash : ""].join(""), r];
}
function ut(t) {
  return t = new URL(t.href), t.hash = "", t;
}
var gi = typeof window > "u", zc = class {
  constructor() {
    this.visitId = null;
  }
  init({ initialPage: e, resolveComponent: r, swapComponent: n }) {
    this.page = e, this.resolveComponent = r, this.swapComponent = n, this.setNavigationType(), this.clearRememberedStateOnReload(), this.isBackForwardVisit() ? this.handleBackForwardVisit(this.page) : this.isLocationVisit() ? this.handleLocationVisit(this.page) : this.handleInitialPageVisit(this.page), this.setupEventListeners();
  }
  setNavigationType() {
    this.navigationType = window.performance && window.performance.getEntriesByType("navigation").length > 0 ? window.performance.getEntriesByType("navigation")[0].type : "navigate";
  }
  clearRememberedStateOnReload() {
    var e;
    this.navigationType === "reload" && ((e = window.history.state) != null && e.rememberedState) && delete window.history.state.rememberedState;
  }
  handleInitialPageVisit(e) {
    this.page.url += window.location.hash, this.setPage(e, { preserveState: !0 }).then(() => lt(e));
  }
  setupEventListeners() {
    window.addEventListener("popstate", this.handlePopstateEvent.bind(this)), document.addEventListener("scroll", Lc(this.handleScrollEvent.bind(this), 100), !0);
  }
  scrollRegions() {
    return document.querySelectorAll("[scroll-region]");
  }
  handleScrollEvent(e) {
    typeof e.target.hasAttribute == "function" && e.target.hasAttribute("scroll-region") && this.saveScrollPositions();
  }
  saveScrollPositions() {
    this.replaceState({ ...this.page, scrollRegions: Array.from(this.scrollRegions()).map((e) => ({ top: e.scrollTop, left: e.scrollLeft })) });
  }
  resetScrollPositions() {
    window.scrollTo(0, 0), this.scrollRegions().forEach((e) => {
      typeof e.scrollTo == "function" ? e.scrollTo(0, 0) : (e.scrollTop = 0, e.scrollLeft = 0);
    }), this.saveScrollPositions(), window.location.hash && setTimeout(() => {
      var e;
      return (e = document.getElementById(window.location.hash.slice(1))) == null ? void 0 : e.scrollIntoView();
    });
  }
  restoreScrollPositions() {
    this.page.scrollRegions && this.scrollRegions().forEach((e, r) => {
      let n = this.page.scrollRegions[r];
      if (n)
        typeof e.scrollTo == "function" ? e.scrollTo(n.left, n.top) : (e.scrollTop = n.top, e.scrollLeft = n.left);
      else
        return;
    });
  }
  isBackForwardVisit() {
    return window.history.state && this.navigationType === "back_forward";
  }
  handleBackForwardVisit(e) {
    window.history.state.version = e.version, this.setPage(window.history.state, { preserveScroll: !0, preserveState: !0 }).then(() => {
      this.restoreScrollPositions(), lt(e);
    });
  }
  locationVisit(e, r) {
    try {
      let n = { preserveScroll: r };
      window.sessionStorage.setItem("inertiaLocationVisit", JSON.stringify(n)), window.location.href = e.href, ut(window.location).href === ut(e).href && window.location.reload();
    } catch {
      return !1;
    }
  }
  isLocationVisit() {
    try {
      return window.sessionStorage.getItem("inertiaLocationVisit") !== null;
    } catch {
      return !1;
    }
  }
  handleLocationVisit(e) {
    var n, o;
    let r = JSON.parse(window.sessionStorage.getItem("inertiaLocationVisit") || "");
    window.sessionStorage.removeItem("inertiaLocationVisit"), e.url += window.location.hash, e.rememberedState = ((n = window.history.state) == null ? void 0 : n.rememberedState) ?? {}, e.scrollRegions = ((o = window.history.state) == null ? void 0 : o.scrollRegions) ?? [], this.setPage(e, { preserveScroll: r.preserveScroll, preserveState: !0 }).then(() => {
      r.preserveScroll && this.restoreScrollPositions(), lt(e);
    });
  }
  isLocationVisitResponse(e) {
    return !!(e && e.status === 409 && e.headers["x-inertia-location"]);
  }
  isInertiaResponse(e) {
    return !!(e != null && e.headers["x-inertia"]);
  }
  createVisitId() {
    return this.visitId = {}, this.visitId;
  }
  cancelVisit(e, { cancelled: r = !1, interrupted: n = !1 }) {
    e && !e.completed && !e.cancelled && !e.interrupted && (e.cancelToken.abort(), e.onCancel(), e.completed = !1, e.cancelled = r, e.interrupted = n, mi(e), e.onFinish(e));
  }
  finishVisit(e) {
    !e.cancelled && !e.interrupted && (e.completed = !0, e.cancelled = !1, e.interrupted = !1, mi(e), e.onFinish(e));
  }
  resolvePreserveOption(e, r) {
    return typeof e == "function" ? e(r) : e === "errors" ? Object.keys(r.props.errors || {}).length > 0 : e;
  }
  cancel() {
    this.activeVisit && this.cancelVisit(this.activeVisit, { cancelled: !0 });
  }
  visit(e, { method: r = "get", data: n = {}, replace: o = !1, preserveScroll: i = !1, preserveState: a = !1, only: s = [], headers: u = {}, errorBag: c = "", forceFormData: h = !1, onCancelToken: y = () => {
  }, onBefore: v = () => {
  }, onStart: b = () => {
  }, onProgress: f = () => {
  }, onFinish: d = () => {
  }, onCancel: w = () => {
  }, onSuccess: S = () => {
  }, onError: P = () => {
  }, queryStringArrayFormat: x = "brackets" } = {}) {
    let _ = typeof e == "string" ? Ve(e) : e;
    if ((Br(n) || h) && !(n instanceof FormData) && (n = fo(n)), !(n instanceof FormData)) {
      let [E, A] = ho(r, _, n, x);
      _ = Ve(E), n = A;
    }
    let C = { url: _, method: r, data: n, replace: o, preserveScroll: i, preserveState: a, only: s, headers: u, errorBag: c, forceFormData: h, queryStringArrayFormat: x, cancelled: !1, completed: !1, interrupted: !1 };
    if (v(C) === !1 || !Bc(C))
      return;
    this.activeVisit && this.cancelVisit(this.activeVisit, { interrupted: !0 }), this.saveScrollPositions();
    let N = this.createVisitId();
    this.activeVisit = { ...C, onCancelToken: y, onBefore: v, onStart: b, onProgress: f, onFinish: d, onCancel: w, onSuccess: S, onError: P, queryStringArrayFormat: x, cancelToken: new AbortController() }, y({ cancel: () => {
      this.activeVisit && this.cancelVisit(this.activeVisit, { cancelled: !0 });
    } }), Vc(C), b(C), Tr({ method: r, url: ut(_).href, data: r === "get" ? {} : n, params: r === "get" ? n : {}, signal: this.activeVisit.cancelToken.signal, headers: { ...u, Accept: "text/html, application/xhtml+xml", "X-Requested-With": "XMLHttpRequest", "X-Inertia": !0, ...s.length ? { "X-Inertia-Partial-Component": this.page.component, "X-Inertia-Partial-Data": s.join(",") } : {}, ...c && c.length ? { "X-Inertia-Error-Bag": c } : {}, ...this.page.version ? { "X-Inertia-Version": this.page.version } : {} }, onUploadProgress: (E) => {
      n instanceof FormData && (E.percentage = E.progress ? Math.round(E.progress * 100) : 0, Hc(E), f(E));
    } }).then((E) => {
      var X;
      if (!this.isInertiaResponse(E))
        return Promise.reject({ response: E });
      let A = E.data;
      s.length && A.component === this.page.component && (A.props = { ...this.page.props, ...A.props }), i = this.resolvePreserveOption(i, A), a = this.resolvePreserveOption(a, A), a && ((X = window.history.state) != null && X.rememberedState) && A.component === this.page.component && (A.rememberedState = window.history.state.rememberedState);
      let D = _, V = Ve(A.url);
      return D.hash && !V.hash && ut(D).href === V.href && (V.hash = D.hash, A.url = V.href), this.setPage(A, { visitId: N, replace: o, preserveScroll: i, preserveState: a });
    }).then(() => {
      let E = this.page.props.errors || {};
      if (Object.keys(E).length > 0) {
        let A = c ? E[c] ? E[c] : {} : E;
        return Uc(A), P(A);
      }
      return qc(this.page), S(this.page);
    }).catch((E) => {
      if (this.isInertiaResponse(E.response))
        return this.setPage(E.response.data, { visitId: N });
      if (this.isLocationVisitResponse(E.response)) {
        let A = Ve(E.response.headers["x-inertia-location"]), D = _;
        D.hash && !A.hash && ut(D).href === A.href && (A.hash = D.hash), this.locationVisit(A, i === !0);
      } else if (E.response)
        kc(E.response) && Wc.show(E.response.data);
      else
        return Promise.reject(E);
    }).then(() => {
      this.activeVisit && this.finishVisit(this.activeVisit);
    }).catch((E) => {
      if (!Tr.isCancel(E)) {
        let A = Mc(E);
        if (this.activeVisit && this.finishVisit(this.activeVisit), A)
          return Promise.reject(E);
      }
    });
  }
  setPage(e, { visitId: r = this.createVisitId(), replace: n = !1, preserveScroll: o = !1, preserveState: i = !1 } = {}) {
    return Promise.resolve(this.resolveComponent(e.component)).then((a) => {
      r === this.visitId && (e.scrollRegions = e.scrollRegions || [], e.rememberedState = e.rememberedState || {}, n = n || Ve(e.url).href === window.location.href, n ? this.replaceState(e) : this.pushState(e), this.swapComponent({ component: a, page: e, preserveState: i }).then(() => {
        o || this.resetScrollPositions(), n || lt(e);
      }));
    });
  }
  pushState(e) {
    this.page = e, window.history.pushState(e, "", e.url);
  }
  replaceState(e) {
    this.page = e, window.history.replaceState(e, "", e.url);
  }
  handlePopstateEvent(e) {
    if (e.state !== null) {
      let r = e.state, n = this.createVisitId();
      Promise.resolve(this.resolveComponent(r.component)).then((o) => {
        n === this.visitId && (this.page = r, this.swapComponent({ component: o, page: r, preserveState: !1 }).then(() => {
          this.restoreScrollPositions(), lt(r);
        }));
      });
    } else {
      let r = Ve(this.page.url);
      r.hash = window.location.hash, this.replaceState({ ...this.page, url: r.href }), this.resetScrollPositions();
    }
  }
  get(e, r = {}, n = {}) {
    return this.visit(e, { ...n, method: "get", data: r });
  }
  reload(e = {}) {
    return this.visit(window.location.href, { ...e, preserveScroll: !0, preserveState: !0 });
  }
  replace(e, r = {}) {
    return console.warn(`Inertia.replace() has been deprecated and will be removed in a future release. Please use Inertia.${r.method ?? "get"}() instead.`), this.visit(e, { preserveState: !0, ...r, replace: !0 });
  }
  post(e, r = {}, n = {}) {
    return this.visit(e, { preserveState: !0, ...n, method: "post", data: r });
  }
  put(e, r = {}, n = {}) {
    return this.visit(e, { preserveState: !0, ...n, method: "put", data: r });
  }
  patch(e, r = {}, n = {}) {
    return this.visit(e, { preserveState: !0, ...n, method: "patch", data: r });
  }
  delete(e, r = {}) {
    return this.visit(e, { preserveState: !0, ...r, method: "delete" });
  }
  remember(e, r = "default") {
    var n;
    gi || this.replaceState({ ...this.page, rememberedState: { ...(n = this.page) == null ? void 0 : n.rememberedState, [r]: e } });
  }
  restore(e = "default") {
    var r, n;
    if (!gi)
      return (n = (r = window.history.state) == null ? void 0 : r.rememberedState) == null ? void 0 : n[e];
  }
  on(e, r) {
    let n = (o) => {
      let i = r(o);
      o.cancelable && !o.defaultPrevented && i === !1 && o.preventDefault();
    };
    return document.addEventListener(`inertia:${e}`, n), () => document.removeEventListener(`inertia:${e}`, n);
  }
};
function Gc(t) {
  let e = t.currentTarget.tagName.toLowerCase() === "a";
  return !(t.target && (t == null ? void 0 : t.target).isContentEditable || t.defaultPrevented || e && t.which > 1 || e && t.altKey || e && t.ctrlKey || e && t.metaKey || e && t.shiftKey);
}
var Jc = new zc(), mo = { exports: {} }, $ = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ot = Symbol.for("react.element"), Kc = Symbol.for("react.portal"), Qc = Symbol.for("react.fragment"), Xc = Symbol.for("react.strict_mode"), Zc = Symbol.for("react.profiler"), Yc = Symbol.for("react.provider"), ef = Symbol.for("react.context"), tf = Symbol.for("react.forward_ref"), rf = Symbol.for("react.suspense"), nf = Symbol.for("react.memo"), of = Symbol.for("react.lazy"), vi = Symbol.iterator;
function af(t) {
  return t === null || typeof t != "object" ? null : (t = vi && t[vi] || t["@@iterator"], typeof t == "function" ? t : null);
}
var go = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, vo = Object.assign, bo = {};
function tt(t, e, r) {
  this.props = t, this.context = e, this.refs = bo, this.updater = r || go;
}
tt.prototype.isReactComponent = {};
tt.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
tt.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function So() {
}
So.prototype = tt.prototype;
function on(t, e, r) {
  this.props = t, this.context = e, this.refs = bo, this.updater = r || go;
}
var an = on.prototype = new So();
an.constructor = on;
vo(an, tt.prototype);
an.isPureReactComponent = !0;
var bi = Array.isArray, wo = Object.prototype.hasOwnProperty, sn = { current: null }, Oo = { key: !0, ref: !0, __self: !0, __source: !0 };
function Eo(t, e, r) {
  var n, o = {}, i = null, a = null;
  if (e != null)
    for (n in e.ref !== void 0 && (a = e.ref), e.key !== void 0 && (i = "" + e.key), e)
      wo.call(e, n) && !Oo.hasOwnProperty(n) && (o[n] = e[n]);
  var s = arguments.length - 2;
  if (s === 1)
    o.children = r;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++)
      u[c] = arguments[c + 2];
    o.children = u;
  }
  if (t && t.defaultProps)
    for (n in s = t.defaultProps, s)
      o[n] === void 0 && (o[n] = s[n]);
  return { $$typeof: Ot, type: t, key: i, ref: a, props: o, _owner: sn.current };
}
function sf(t, e) {
  return { $$typeof: Ot, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function ln(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Ot;
}
function lf(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(r) {
    return e[r];
  });
}
var Si = /\/+/g;
function Sr(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? lf("" + t.key) : e.toString(36);
}
function Mt(t, e, r, n, o) {
  var i = typeof t;
  (i === "undefined" || i === "boolean") && (t = null);
  var a = !1;
  if (t === null)
    a = !0;
  else
    switch (i) {
      case "string":
      case "number":
        a = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Ot:
          case Kc:
            a = !0;
        }
    }
  if (a)
    return a = t, o = o(a), t = n === "" ? "." + Sr(a, 0) : n, bi(o) ? (r = "", t != null && (r = t.replace(Si, "$&/") + "/"), Mt(o, e, r, "", function(c) {
      return c;
    })) : o != null && (ln(o) && (o = sf(o, r + (!o.key || a && a.key === o.key ? "" : ("" + o.key).replace(Si, "$&/") + "/") + t)), e.push(o)), 1;
  if (a = 0, n = n === "" ? "." : n + ":", bi(t))
    for (var s = 0; s < t.length; s++) {
      i = t[s];
      var u = n + Sr(i, s);
      a += Mt(i, e, r, u, o);
    }
  else if (u = af(t), typeof u == "function")
    for (t = u.call(t), s = 0; !(i = t.next()).done; )
      i = i.value, u = n + Sr(i, s++), a += Mt(i, e, r, u, o);
  else if (i === "object")
    throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function It(t, e, r) {
  if (t == null)
    return t;
  var n = [], o = 0;
  return Mt(t, n, "", "", function(i) {
    return e.call(r, i, o++);
  }), n;
}
function uf(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(r) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = r);
    }, function(r) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = r);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1)
    return t._result.default;
  throw t._result;
}
var Z = { current: null }, kt = { transition: null }, cf = { ReactCurrentDispatcher: Z, ReactCurrentBatchConfig: kt, ReactCurrentOwner: sn };
$.Children = { map: It, forEach: function(t, e, r) {
  It(t, function() {
    e.apply(this, arguments);
  }, r);
}, count: function(t) {
  var e = 0;
  return It(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return It(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!ln(t))
    throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
$.Component = tt;
$.Fragment = Qc;
$.Profiler = Zc;
$.PureComponent = on;
$.StrictMode = Xc;
$.Suspense = rf;
$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cf;
$.cloneElement = function(t, e, r) {
  if (t == null)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var n = vo({}, t.props), o = t.key, i = t.ref, a = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (i = e.ref, a = sn.current), e.key !== void 0 && (o = "" + e.key), t.type && t.type.defaultProps)
      var s = t.type.defaultProps;
    for (u in e)
      wo.call(e, u) && !Oo.hasOwnProperty(u) && (n[u] = e[u] === void 0 && s !== void 0 ? s[u] : e[u]);
  }
  var u = arguments.length - 2;
  if (u === 1)
    n.children = r;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++)
      s[c] = arguments[c + 2];
    n.children = s;
  }
  return { $$typeof: Ot, type: t.type, key: o, ref: i, props: n, _owner: a };
};
$.createContext = function(t) {
  return t = { $$typeof: ef, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: Yc, _context: t }, t.Consumer = t;
};
$.createElement = Eo;
$.createFactory = function(t) {
  var e = Eo.bind(null, t);
  return e.type = t, e;
};
$.createRef = function() {
  return { current: null };
};
$.forwardRef = function(t) {
  return { $$typeof: tf, render: t };
};
$.isValidElement = ln;
$.lazy = function(t) {
  return { $$typeof: of, _payload: { _status: -1, _result: t }, _init: uf };
};
$.memo = function(t, e) {
  return { $$typeof: nf, type: t, compare: e === void 0 ? null : e };
};
$.startTransition = function(t) {
  var e = kt.transition;
  kt.transition = {};
  try {
    t();
  } finally {
    kt.transition = e;
  }
};
$.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
$.useCallback = function(t, e) {
  return Z.current.useCallback(t, e);
};
$.useContext = function(t) {
  return Z.current.useContext(t);
};
$.useDebugValue = function() {
};
$.useDeferredValue = function(t) {
  return Z.current.useDeferredValue(t);
};
$.useEffect = function(t, e) {
  return Z.current.useEffect(t, e);
};
$.useId = function() {
  return Z.current.useId();
};
$.useImperativeHandle = function(t, e, r) {
  return Z.current.useImperativeHandle(t, e, r);
};
$.useInsertionEffect = function(t, e) {
  return Z.current.useInsertionEffect(t, e);
};
$.useLayoutEffect = function(t, e) {
  return Z.current.useLayoutEffect(t, e);
};
$.useMemo = function(t, e) {
  return Z.current.useMemo(t, e);
};
$.useReducer = function(t, e, r) {
  return Z.current.useReducer(t, e, r);
};
$.useRef = function(t) {
  return Z.current.useRef(t);
};
$.useState = function(t) {
  return Z.current.useState(t);
};
$.useSyncExternalStore = function(t, e, r) {
  return Z.current.useSyncExternalStore(t, e, r);
};
$.useTransition = function() {
  return Z.current.useTransition();
};
$.version = "18.2.0";
mo.exports = $;
var yt = mo.exports, Gt = { exports: {} };
Gt.exports;
(function(t, e) {
  var r = 200, n = "__lodash_hash_undefined__", o = 1, i = 2, a = 9007199254740991, s = "[object Arguments]", u = "[object Array]", c = "[object AsyncFunction]", h = "[object Boolean]", y = "[object Date]", v = "[object Error]", b = "[object Function]", f = "[object GeneratorFunction]", d = "[object Map]", w = "[object Number]", S = "[object Null]", P = "[object Object]", x = "[object Promise]", _ = "[object Proxy]", C = "[object RegExp]", N = "[object Set]", E = "[object String]", A = "[object Symbol]", D = "[object Undefined]", V = "[object WeakMap]", X = "[object ArrayBuffer]", G = "[object DataView]", ie = "[object Float32Array]", be = "[object Float64Array]", Ue = "[object Int8Array]", Se = "[object Int16Array]", $o = "[object Int32Array]", Co = "[object Uint8Array]", Fo = "[object Uint8ClampedArray]", No = "[object Uint16Array]", Io = "[object Uint32Array]", jo = /[\\^$.*+?()[\]{}|]/g, Do = /^\[object .+?Constructor\]$/, Lo = /^(?:0|[1-9]\d*)$/, I = {};
  I[ie] = I[be] = I[Ue] = I[Se] = I[$o] = I[Co] = I[Fo] = I[No] = I[Io] = !0, I[s] = I[u] = I[X] = I[h] = I[G] = I[y] = I[v] = I[b] = I[d] = I[w] = I[P] = I[C] = I[N] = I[E] = I[V] = !1;
  var cn = typeof We == "object" && We && We.Object === Object && We, Bo = typeof self == "object" && self && self.Object === Object && self, pe = cn || Bo || Function("return this")(), fn = e && !e.nodeType && e, pn = fn && !0 && t && !t.nodeType && t, dn = pn && pn.exports === fn, Yt = dn && cn.process, yn = function() {
    try {
      return Yt && Yt.binding && Yt.binding("util");
    } catch {
    }
  }(), hn = yn && yn.isTypedArray;
  function Uo(l, p) {
    for (var g = -1, O = l == null ? 0 : l.length, j = 0, R = []; ++g < O; ) {
      var B = l[g];
      p(B, g, l) && (R[j++] = B);
    }
    return R;
  }
  function Mo(l, p) {
    for (var g = -1, O = p.length, j = l.length; ++g < O; )
      l[j + g] = p[g];
    return l;
  }
  function ko(l, p) {
    for (var g = -1, O = l == null ? 0 : l.length; ++g < O; )
      if (p(l[g], g, l))
        return !0;
    return !1;
  }
  function Ho(l, p) {
    for (var g = -1, O = Array(l); ++g < l; )
      O[g] = p(g);
    return O;
  }
  function Vo(l) {
    return function(p) {
      return l(p);
    };
  }
  function qo(l, p) {
    return l.has(p);
  }
  function Wo(l, p) {
    return l == null ? void 0 : l[p];
  }
  function zo(l) {
    var p = -1, g = Array(l.size);
    return l.forEach(function(O, j) {
      g[++p] = [j, O];
    }), g;
  }
  function Go(l, p) {
    return function(g) {
      return l(p(g));
    };
  }
  function Jo(l) {
    var p = -1, g = Array(l.size);
    return l.forEach(function(O) {
      g[++p] = O;
    }), g;
  }
  var Ko = Array.prototype, Qo = Function.prototype, Et = Object.prototype, er = pe["__core-js_shared__"], mn = Qo.toString, ae = Et.hasOwnProperty, gn = function() {
    var l = /[^.]+$/.exec(er && er.keys && er.keys.IE_PROTO || "");
    return l ? "Symbol(src)_1." + l : "";
  }(), vn = Et.toString, Xo = RegExp(
    "^" + mn.call(ae).replace(jo, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), bn = dn ? pe.Buffer : void 0, At = pe.Symbol, Sn = pe.Uint8Array, wn = Et.propertyIsEnumerable, Zo = Ko.splice, Re = At ? At.toStringTag : void 0, On = Object.getOwnPropertySymbols, Yo = bn ? bn.isBuffer : void 0, ea = Go(Object.keys, Object), tr = Me(pe, "DataView"), rt = Me(pe, "Map"), rr = Me(pe, "Promise"), nr = Me(pe, "Set"), ir = Me(pe, "WeakMap"), nt = Me(Object, "create"), ta = Ce(tr), ra = Ce(rt), na = Ce(rr), ia = Ce(nr), oa = Ce(ir), En = At ? At.prototype : void 0, or = En ? En.valueOf : void 0;
  function Te(l) {
    var p = -1, g = l == null ? 0 : l.length;
    for (this.clear(); ++p < g; ) {
      var O = l[p];
      this.set(O[0], O[1]);
    }
  }
  function aa() {
    this.__data__ = nt ? nt(null) : {}, this.size = 0;
  }
  function sa(l) {
    var p = this.has(l) && delete this.__data__[l];
    return this.size -= p ? 1 : 0, p;
  }
  function la(l) {
    var p = this.__data__;
    if (nt) {
      var g = p[l];
      return g === n ? void 0 : g;
    }
    return ae.call(p, l) ? p[l] : void 0;
  }
  function ua(l) {
    var p = this.__data__;
    return nt ? p[l] !== void 0 : ae.call(p, l);
  }
  function ca(l, p) {
    var g = this.__data__;
    return this.size += this.has(l) ? 0 : 1, g[l] = nt && p === void 0 ? n : p, this;
  }
  Te.prototype.clear = aa, Te.prototype.delete = sa, Te.prototype.get = la, Te.prototype.has = ua, Te.prototype.set = ca;
  function de(l) {
    var p = -1, g = l == null ? 0 : l.length;
    for (this.clear(); ++p < g; ) {
      var O = l[p];
      this.set(O[0], O[1]);
    }
  }
  function fa() {
    this.__data__ = [], this.size = 0;
  }
  function pa(l) {
    var p = this.__data__, g = _t(p, l);
    if (g < 0)
      return !1;
    var O = p.length - 1;
    return g == O ? p.pop() : Zo.call(p, g, 1), --this.size, !0;
  }
  function da(l) {
    var p = this.__data__, g = _t(p, l);
    return g < 0 ? void 0 : p[g][1];
  }
  function ya(l) {
    return _t(this.__data__, l) > -1;
  }
  function ha(l, p) {
    var g = this.__data__, O = _t(g, l);
    return O < 0 ? (++this.size, g.push([l, p])) : g[O][1] = p, this;
  }
  de.prototype.clear = fa, de.prototype.delete = pa, de.prototype.get = da, de.prototype.has = ya, de.prototype.set = ha;
  function $e(l) {
    var p = -1, g = l == null ? 0 : l.length;
    for (this.clear(); ++p < g; ) {
      var O = l[p];
      this.set(O[0], O[1]);
    }
  }
  function ma() {
    this.size = 0, this.__data__ = {
      hash: new Te(),
      map: new (rt || de)(),
      string: new Te()
    };
  }
  function ga(l) {
    var p = xt(this, l).delete(l);
    return this.size -= p ? 1 : 0, p;
  }
  function va(l) {
    return xt(this, l).get(l);
  }
  function ba(l) {
    return xt(this, l).has(l);
  }
  function Sa(l, p) {
    var g = xt(this, l), O = g.size;
    return g.set(l, p), this.size += g.size == O ? 0 : 1, this;
  }
  $e.prototype.clear = ma, $e.prototype.delete = ga, $e.prototype.get = va, $e.prototype.has = ba, $e.prototype.set = Sa;
  function Pt(l) {
    var p = -1, g = l == null ? 0 : l.length;
    for (this.__data__ = new $e(); ++p < g; )
      this.add(l[p]);
  }
  function wa(l) {
    return this.__data__.set(l, n), this;
  }
  function Oa(l) {
    return this.__data__.has(l);
  }
  Pt.prototype.add = Pt.prototype.push = wa, Pt.prototype.has = Oa;
  function we(l) {
    var p = this.__data__ = new de(l);
    this.size = p.size;
  }
  function Ea() {
    this.__data__ = new de(), this.size = 0;
  }
  function Aa(l) {
    var p = this.__data__, g = p.delete(l);
    return this.size = p.size, g;
  }
  function Pa(l) {
    return this.__data__.get(l);
  }
  function _a(l) {
    return this.__data__.has(l);
  }
  function xa(l, p) {
    var g = this.__data__;
    if (g instanceof de) {
      var O = g.__data__;
      if (!rt || O.length < r - 1)
        return O.push([l, p]), this.size = ++g.size, this;
      g = this.__data__ = new $e(O);
    }
    return g.set(l, p), this.size = g.size, this;
  }
  we.prototype.clear = Ea, we.prototype.delete = Aa, we.prototype.get = Pa, we.prototype.has = _a, we.prototype.set = xa;
  function Ra(l, p) {
    var g = Rt(l), O = !g && Va(l), j = !g && !O && ar(l), R = !g && !O && !j && Fn(l), B = g || O || j || R, M = B ? Ho(l.length, String) : [], q = M.length;
    for (var L in l)
      (p || ae.call(l, L)) && !(B && // Safari 9 has enumerable `arguments.length` in strict mode.
      (L == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      j && (L == "offset" || L == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      R && (L == "buffer" || L == "byteLength" || L == "byteOffset") || // Skip index properties.
      Ba(L, q))) && M.push(L);
    return M;
  }
  function _t(l, p) {
    for (var g = l.length; g--; )
      if (Rn(l[g][0], p))
        return g;
    return -1;
  }
  function Ta(l, p, g) {
    var O = p(l);
    return Rt(l) ? O : Mo(O, g(l));
  }
  function it(l) {
    return l == null ? l === void 0 ? D : S : Re && Re in Object(l) ? Da(l) : Ha(l);
  }
  function An(l) {
    return ot(l) && it(l) == s;
  }
  function Pn(l, p, g, O, j) {
    return l === p ? !0 : l == null || p == null || !ot(l) && !ot(p) ? l !== l && p !== p : $a(l, p, g, O, Pn, j);
  }
  function $a(l, p, g, O, j, R) {
    var B = Rt(l), M = Rt(p), q = B ? u : Oe(l), L = M ? u : Oe(p);
    q = q == s ? P : q, L = L == s ? P : L;
    var Y = q == P, oe = L == P, J = q == L;
    if (J && ar(l)) {
      if (!ar(p))
        return !1;
      B = !0, Y = !1;
    }
    if (J && !Y)
      return R || (R = new we()), B || Fn(l) ? _n(l, p, g, O, j, R) : Ia(l, p, q, g, O, j, R);
    if (!(g & o)) {
      var te = Y && ae.call(l, "__wrapped__"), re = oe && ae.call(p, "__wrapped__");
      if (te || re) {
        var Ee = te ? l.value() : l, ye = re ? p.value() : p;
        return R || (R = new we()), j(Ee, ye, g, O, R);
      }
    }
    return J ? (R || (R = new we()), ja(l, p, g, O, j, R)) : !1;
  }
  function Ca(l) {
    if (!Cn(l) || Ma(l))
      return !1;
    var p = Tn(l) ? Xo : Do;
    return p.test(Ce(l));
  }
  function Fa(l) {
    return ot(l) && $n(l.length) && !!I[it(l)];
  }
  function Na(l) {
    if (!ka(l))
      return ea(l);
    var p = [];
    for (var g in Object(l))
      ae.call(l, g) && g != "constructor" && p.push(g);
    return p;
  }
  function _n(l, p, g, O, j, R) {
    var B = g & o, M = l.length, q = p.length;
    if (M != q && !(B && q > M))
      return !1;
    var L = R.get(l);
    if (L && R.get(p))
      return L == p;
    var Y = -1, oe = !0, J = g & i ? new Pt() : void 0;
    for (R.set(l, p), R.set(p, l); ++Y < M; ) {
      var te = l[Y], re = p[Y];
      if (O)
        var Ee = B ? O(re, te, Y, p, l, R) : O(te, re, Y, l, p, R);
      if (Ee !== void 0) {
        if (Ee)
          continue;
        oe = !1;
        break;
      }
      if (J) {
        if (!ko(p, function(ye, Fe) {
          if (!qo(J, Fe) && (te === ye || j(te, ye, g, O, R)))
            return J.push(Fe);
        })) {
          oe = !1;
          break;
        }
      } else if (!(te === re || j(te, re, g, O, R))) {
        oe = !1;
        break;
      }
    }
    return R.delete(l), R.delete(p), oe;
  }
  function Ia(l, p, g, O, j, R, B) {
    switch (g) {
      case G:
        if (l.byteLength != p.byteLength || l.byteOffset != p.byteOffset)
          return !1;
        l = l.buffer, p = p.buffer;
      case X:
        return !(l.byteLength != p.byteLength || !R(new Sn(l), new Sn(p)));
      case h:
      case y:
      case w:
        return Rn(+l, +p);
      case v:
        return l.name == p.name && l.message == p.message;
      case C:
      case E:
        return l == p + "";
      case d:
        var M = zo;
      case N:
        var q = O & o;
        if (M || (M = Jo), l.size != p.size && !q)
          return !1;
        var L = B.get(l);
        if (L)
          return L == p;
        O |= i, B.set(l, p);
        var Y = _n(M(l), M(p), O, j, R, B);
        return B.delete(l), Y;
      case A:
        if (or)
          return or.call(l) == or.call(p);
    }
    return !1;
  }
  function ja(l, p, g, O, j, R) {
    var B = g & o, M = xn(l), q = M.length, L = xn(p), Y = L.length;
    if (q != Y && !B)
      return !1;
    for (var oe = q; oe--; ) {
      var J = M[oe];
      if (!(B ? J in p : ae.call(p, J)))
        return !1;
    }
    var te = R.get(l);
    if (te && R.get(p))
      return te == p;
    var re = !0;
    R.set(l, p), R.set(p, l);
    for (var Ee = B; ++oe < q; ) {
      J = M[oe];
      var ye = l[J], Fe = p[J];
      if (O)
        var Nn = B ? O(Fe, ye, J, p, l, R) : O(ye, Fe, J, l, p, R);
      if (!(Nn === void 0 ? ye === Fe || j(ye, Fe, g, O, R) : Nn)) {
        re = !1;
        break;
      }
      Ee || (Ee = J == "constructor");
    }
    if (re && !Ee) {
      var Tt = l.constructor, $t = p.constructor;
      Tt != $t && "constructor" in l && "constructor" in p && !(typeof Tt == "function" && Tt instanceof Tt && typeof $t == "function" && $t instanceof $t) && (re = !1);
    }
    return R.delete(l), R.delete(p), re;
  }
  function xn(l) {
    return Ta(l, za, La);
  }
  function xt(l, p) {
    var g = l.__data__;
    return Ua(p) ? g[typeof p == "string" ? "string" : "hash"] : g.map;
  }
  function Me(l, p) {
    var g = Wo(l, p);
    return Ca(g) ? g : void 0;
  }
  function Da(l) {
    var p = ae.call(l, Re), g = l[Re];
    try {
      l[Re] = void 0;
      var O = !0;
    } catch {
    }
    var j = vn.call(l);
    return O && (p ? l[Re] = g : delete l[Re]), j;
  }
  var La = On ? function(l) {
    return l == null ? [] : (l = Object(l), Uo(On(l), function(p) {
      return wn.call(l, p);
    }));
  } : Ga, Oe = it;
  (tr && Oe(new tr(new ArrayBuffer(1))) != G || rt && Oe(new rt()) != d || rr && Oe(rr.resolve()) != x || nr && Oe(new nr()) != N || ir && Oe(new ir()) != V) && (Oe = function(l) {
    var p = it(l), g = p == P ? l.constructor : void 0, O = g ? Ce(g) : "";
    if (O)
      switch (O) {
        case ta:
          return G;
        case ra:
          return d;
        case na:
          return x;
        case ia:
          return N;
        case oa:
          return V;
      }
    return p;
  });
  function Ba(l, p) {
    return p = p ?? a, !!p && (typeof l == "number" || Lo.test(l)) && l > -1 && l % 1 == 0 && l < p;
  }
  function Ua(l) {
    var p = typeof l;
    return p == "string" || p == "number" || p == "symbol" || p == "boolean" ? l !== "__proto__" : l === null;
  }
  function Ma(l) {
    return !!gn && gn in l;
  }
  function ka(l) {
    var p = l && l.constructor, g = typeof p == "function" && p.prototype || Et;
    return l === g;
  }
  function Ha(l) {
    return vn.call(l);
  }
  function Ce(l) {
    if (l != null) {
      try {
        return mn.call(l);
      } catch {
      }
      try {
        return l + "";
      } catch {
      }
    }
    return "";
  }
  function Rn(l, p) {
    return l === p || l !== l && p !== p;
  }
  var Va = An(function() {
    return arguments;
  }()) ? An : function(l) {
    return ot(l) && ae.call(l, "callee") && !wn.call(l, "callee");
  }, Rt = Array.isArray;
  function qa(l) {
    return l != null && $n(l.length) && !Tn(l);
  }
  var ar = Yo || Ja;
  function Wa(l, p) {
    return Pn(l, p);
  }
  function Tn(l) {
    if (!Cn(l))
      return !1;
    var p = it(l);
    return p == b || p == f || p == c || p == _;
  }
  function $n(l) {
    return typeof l == "number" && l > -1 && l % 1 == 0 && l <= a;
  }
  function Cn(l) {
    var p = typeof l;
    return l != null && (p == "object" || p == "function");
  }
  function ot(l) {
    return l != null && typeof l == "object";
  }
  var Fn = hn ? Vo(hn) : Fa;
  function za(l) {
    return qa(l) ? Ra(l) : Na(l);
  }
  function Ga() {
    return [];
  }
  function Ja() {
    return !1;
  }
  t.exports = Wa;
})(Gt, Gt.exports);
Gt.exports;
var ff = yt.createContext(void 0);
ff.displayName = "InertiaHeadContext";
var pf = yt.createContext(void 0);
pf.displayName = "InertiaPageContext";
var he = () => {
}, df = yt.forwardRef(({ children: t, as: e = "a", data: r = {}, href: n, method: o = "get", preserveScroll: i = !1, preserveState: a = null, replace: s = !1, only: u = [], headers: c = {}, queryStringArrayFormat: h = "brackets", onClick: y = he, onCancelToken: v = he, onBefore: b = he, onStart: f = he, onProgress: d = he, onFinish: w = he, onCancel: S = he, onSuccess: P = he, onError: x = he, ..._ }, C) => {
  let N = yt.useCallback((D) => {
    y(D), Gc(D) && (D.preventDefault(), Jc.visit(n, { data: r, method: o, preserveScroll: i, preserveState: a ?? o !== "get", replace: s, only: u, headers: c, onCancelToken: v, onBefore: b, onStart: f, onProgress: d, onFinish: w, onCancel: S, onSuccess: P, onError: x }));
  }, [r, n, o, i, a, s, u, c, y, v, b, f, d, w, S, P, x]);
  e = e.toLowerCase(), o = o.toLowerCase();
  let [E, A] = ho(o, n || "", r, h);
  return n = E, r = A, e === "a" && o !== "get" && console.warn(`Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.

Please specify a more appropriate element using the "as" attribute. For example:

<Link href="${n}" method="${o}" as="button">...</Link>`), yt.createElement(e, { ..._, ...e === "a" ? { href: n } : {}, ref: C, onClick: N }, t);
});
df.displayName = "InertiaLink";
var yf = String.prototype.replace, hf = /%20/g, wr = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, un = {
  default: wr.RFC3986,
  formatters: {
    RFC1738: function(t) {
      return yf.call(t, hf, "+");
    },
    RFC3986: function(t) {
      return String(t);
    }
  },
  RFC1738: wr.RFC1738,
  RFC3986: wr.RFC3986
}, mf = un, Or = Object.prototype.hasOwnProperty, Ie = Array.isArray, le = function() {
  for (var t = [], e = 0; e < 256; ++e)
    t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return t;
}(), gf = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), n = r.obj[r.prop];
    if (Ie(n)) {
      for (var o = [], i = 0; i < n.length; ++i)
        typeof n[i] < "u" && o.push(n[i]);
      r.obj[r.prop] = o;
    }
  }
}, Ao = function(e, r) {
  for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = 0; o < e.length; ++o)
    typeof e[o] < "u" && (n[o] = e[o]);
  return n;
}, vf = function t(e, r, n) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (Ie(e))
      e.push(r);
    else if (e && typeof e == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Or.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var o = e;
  return Ie(e) && !Ie(r) && (o = Ao(e, n)), Ie(e) && Ie(r) ? (r.forEach(function(i, a) {
    if (Or.call(e, a)) {
      var s = e[a];
      s && typeof s == "object" && i && typeof i == "object" ? e[a] = t(s, i, n) : e.push(i);
    } else
      e[a] = i;
  }), e) : Object.keys(r).reduce(function(i, a) {
    var s = r[a];
    return Or.call(i, a) ? i[a] = t(i[a], s, n) : i[a] = s, i;
  }, o);
}, bf = function(e, r) {
  return Object.keys(r).reduce(function(n, o) {
    return n[o] = r[o], n;
  }, e);
}, Sf = function(t, e, r) {
  var n = t.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, wf = function(e, r, n, o, i) {
  if (e.length === 0)
    return e;
  var a = e;
  if (typeof e == "symbol" ? a = Symbol.prototype.toString.call(e) : typeof e != "string" && (a = String(e)), n === "iso-8859-1")
    return escape(a).replace(/%u[0-9a-f]{4}/gi, function(h) {
      return "%26%23" + parseInt(h.slice(2), 16) + "%3B";
    });
  for (var s = "", u = 0; u < a.length; ++u) {
    var c = a.charCodeAt(u);
    if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || i === mf.RFC1738 && (c === 40 || c === 41)) {
      s += a.charAt(u);
      continue;
    }
    if (c < 128) {
      s = s + le[c];
      continue;
    }
    if (c < 2048) {
      s = s + (le[192 | c >> 6] + le[128 | c & 63]);
      continue;
    }
    if (c < 55296 || c >= 57344) {
      s = s + (le[224 | c >> 12] + le[128 | c >> 6 & 63] + le[128 | c & 63]);
      continue;
    }
    u += 1, c = 65536 + ((c & 1023) << 10 | a.charCodeAt(u) & 1023), s += le[240 | c >> 18] + le[128 | c >> 12 & 63] + le[128 | c >> 6 & 63] + le[128 | c & 63];
  }
  return s;
}, Of = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], n = [], o = 0; o < r.length; ++o)
    for (var i = r[o], a = i.obj[i.prop], s = Object.keys(a), u = 0; u < s.length; ++u) {
      var c = s[u], h = a[c];
      typeof h == "object" && h !== null && n.indexOf(h) === -1 && (r.push({ obj: a, prop: c }), n.push(h));
    }
  return gf(r), e;
}, Ef = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, Af = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, Pf = function(e, r) {
  return [].concat(e, r);
}, _f = function(e, r) {
  if (Ie(e)) {
    for (var n = [], o = 0; o < e.length; o += 1)
      n.push(r(e[o]));
    return n;
  }
  return r(e);
}, Po = {
  arrayToObject: Ao,
  assign: bf,
  combine: Pf,
  compact: Of,
  decode: Sf,
  encode: wf,
  isBuffer: Af,
  isRegExp: Ef,
  maybeMap: _f,
  merge: vf
}, Ur = Po, ht = un, xf = Object.prototype.hasOwnProperty, wi = {
  brackets: function(e) {
    return e + "[]";
  },
  comma: "comma",
  indices: function(e, r) {
    return e + "[" + r + "]";
  },
  repeat: function(e) {
    return e;
  }
}, je = Array.isArray, Rf = String.prototype.split, Tf = Array.prototype.push, _o = function(t, e) {
  Tf.apply(t, je(e) ? e : [e]);
}, $f = Date.prototype.toISOString, Oi = ht.default, z = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: Ur.encode,
  encodeValuesOnly: !1,
  format: Oi,
  formatter: ht.formatters[Oi],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return $f.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Cf = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, Ff = function t(e, r, n, o, i, a, s, u, c, h, y, v, b, f) {
  var d = e;
  if (typeof s == "function" ? d = s(r, d) : d instanceof Date ? d = h(d) : n === "comma" && je(d) && (d = Ur.maybeMap(d, function(X) {
    return X instanceof Date ? h(X) : X;
  })), d === null) {
    if (o)
      return a && !b ? a(r, z.encoder, f, "key", y) : r;
    d = "";
  }
  if (Cf(d) || Ur.isBuffer(d)) {
    if (a) {
      var w = b ? r : a(r, z.encoder, f, "key", y);
      if (n === "comma" && b) {
        for (var S = Rf.call(String(d), ","), P = "", x = 0; x < S.length; ++x)
          P += (x === 0 ? "" : ",") + v(a(S[x], z.encoder, f, "value", y));
        return [v(w) + "=" + P];
      }
      return [v(w) + "=" + v(a(d, z.encoder, f, "value", y))];
    }
    return [v(r) + "=" + v(String(d))];
  }
  var _ = [];
  if (typeof d > "u")
    return _;
  var C;
  if (n === "comma" && je(d))
    C = [{ value: d.length > 0 ? d.join(",") || null : void 0 }];
  else if (je(s))
    C = s;
  else {
    var N = Object.keys(d);
    C = u ? N.sort(u) : N;
  }
  for (var E = 0; E < C.length; ++E) {
    var A = C[E], D = typeof A == "object" && typeof A.value < "u" ? A.value : d[A];
    if (!(i && D === null)) {
      var V = je(d) ? typeof n == "function" ? n(r, A) : r : r + (c ? "." + A : "[" + A + "]");
      _o(_, t(
        D,
        V,
        n,
        o,
        i,
        a,
        s,
        u,
        c,
        h,
        y,
        v,
        b,
        f
      ));
    }
  }
  return _;
}, Nf = function(e) {
  if (!e)
    return z;
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || z.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = ht.default;
  if (typeof e.format < "u") {
    if (!xf.call(ht.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    n = e.format;
  }
  var o = ht.formatters[n], i = z.filter;
  return (typeof e.filter == "function" || je(e.filter)) && (i = e.filter), {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : z.addQueryPrefix,
    allowDots: typeof e.allowDots > "u" ? z.allowDots : !!e.allowDots,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : z.charsetSentinel,
    delimiter: typeof e.delimiter > "u" ? z.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : z.encode,
    encoder: typeof e.encoder == "function" ? e.encoder : z.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : z.encodeValuesOnly,
    filter: i,
    format: n,
    formatter: o,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : z.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : z.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : z.strictNullHandling
  };
}, If = function(t, e) {
  var r = t, n = Nf(e), o, i;
  typeof n.filter == "function" ? (i = n.filter, r = i("", r)) : je(n.filter) && (i = n.filter, o = i);
  var a = [];
  if (typeof r != "object" || r === null)
    return "";
  var s;
  e && e.arrayFormat in wi ? s = e.arrayFormat : e && "indices" in e ? s = e.indices ? "indices" : "repeat" : s = "indices";
  var u = wi[s];
  o || (o = Object.keys(r)), n.sort && o.sort(n.sort);
  for (var c = 0; c < o.length; ++c) {
    var h = o[c];
    n.skipNulls && r[h] === null || _o(a, Ff(
      r[h],
      h,
      u,
      n.strictNullHandling,
      n.skipNulls,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset
    ));
  }
  var y = a.join(n.delimiter), v = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? v += "utf8=%26%2310003%3B&" : v += "utf8=%E2%9C%93&"), y.length > 0 ? v + y : "";
}, Ze = Po, Mr = Object.prototype.hasOwnProperty, jf = Array.isArray, W = {
  allowDots: !1,
  allowPrototypes: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: Ze.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, Df = function(t) {
  return t.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, xo = function(t, e) {
  return t && typeof t == "string" && e.comma && t.indexOf(",") > -1 ? t.split(",") : t;
}, Lf = "utf8=%26%2310003%3B", Bf = "utf8=%E2%9C%93", Uf = function(e, r) {
  var n = {}, o = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, i = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, a = o.split(r.delimiter, i), s = -1, u, c = r.charset;
  if (r.charsetSentinel)
    for (u = 0; u < a.length; ++u)
      a[u].indexOf("utf8=") === 0 && (a[u] === Bf ? c = "utf-8" : a[u] === Lf && (c = "iso-8859-1"), s = u, u = a.length);
  for (u = 0; u < a.length; ++u)
    if (u !== s) {
      var h = a[u], y = h.indexOf("]="), v = y === -1 ? h.indexOf("=") : y + 1, b, f;
      v === -1 ? (b = r.decoder(h, W.decoder, c, "key"), f = r.strictNullHandling ? null : "") : (b = r.decoder(h.slice(0, v), W.decoder, c, "key"), f = Ze.maybeMap(
        xo(h.slice(v + 1), r),
        function(d) {
          return r.decoder(d, W.decoder, c, "value");
        }
      )), f && r.interpretNumericEntities && c === "iso-8859-1" && (f = Df(f)), h.indexOf("[]=") > -1 && (f = jf(f) ? [f] : f), Mr.call(n, b) ? n[b] = Ze.combine(n[b], f) : n[b] = f;
    }
  return n;
}, Mf = function(t, e, r, n) {
  for (var o = n ? e : xo(e, r), i = t.length - 1; i >= 0; --i) {
    var a, s = t[i];
    if (s === "[]" && r.parseArrays)
      a = [].concat(o);
    else {
      a = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var u = s.charAt(0) === "[" && s.charAt(s.length - 1) === "]" ? s.slice(1, -1) : s, c = parseInt(u, 10);
      !r.parseArrays && u === "" ? a = { 0: o } : !isNaN(c) && s !== u && String(c) === u && c >= 0 && r.parseArrays && c <= r.arrayLimit ? (a = [], a[c] = o) : u !== "__proto__" && (a[u] = o);
    }
    o = a;
  }
  return o;
}, kf = function(e, r, n, o) {
  if (e) {
    var i = n.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, a = /(\[[^[\]]*])/, s = /(\[[^[\]]*])/g, u = n.depth > 0 && a.exec(i), c = u ? i.slice(0, u.index) : i, h = [];
    if (c) {
      if (!n.plainObjects && Mr.call(Object.prototype, c) && !n.allowPrototypes)
        return;
      h.push(c);
    }
    for (var y = 0; n.depth > 0 && (u = s.exec(i)) !== null && y < n.depth; ) {
      if (y += 1, !n.plainObjects && Mr.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      h.push(u[1]);
    }
    return u && h.push("[" + i.slice(u.index) + "]"), Mf(h, r, n, o);
  }
}, Hf = function(e) {
  if (!e)
    return W;
  if (e.decoder !== null && e.decoder !== void 0 && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof e.charset > "u" ? W.charset : e.charset;
  return {
    allowDots: typeof e.allowDots > "u" ? W.allowDots : !!e.allowDots,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : W.allowPrototypes,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : W.arrayLimit,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : W.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : W.comma,
    decoder: typeof e.decoder == "function" ? e.decoder : W.decoder,
    delimiter: typeof e.delimiter == "string" || Ze.isRegExp(e.delimiter) ? e.delimiter : W.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : W.depth,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : W.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : W.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : W.plainObjects,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : W.strictNullHandling
  };
}, Vf = function(t, e) {
  var r = Hf(e);
  if (t === "" || t === null || typeof t > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof t == "string" ? Uf(t, r) : t, o = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i = Object.keys(n), a = 0; a < i.length; ++a) {
    var s = i[a], u = kf(s, n[s], r, typeof t == "string");
    o = Ze.merge(o, u, r);
  }
  return Ze.compact(o);
}, qf = If, Wf = Vf, zf = un, Ro = {
  formats: zf,
  parse: Wf,
  stringify: qf
};
function Ei(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, typeof (o = function(i, a) {
      if (typeof i != "object" || i === null)
        return i;
      var s = i[Symbol.toPrimitive];
      if (s !== void 0) {
        var u = s.call(i, "string");
        if (typeof u != "object")
          return u;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(i);
    }(n.key)) == "symbol" ? o : String(o), n);
  }
  var o;
}
function To(t, e, r) {
  return e && Ei(t.prototype, e), r && Ei(t, r), Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
function ee() {
  return ee = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, ee.apply(this, arguments);
}
function kr(t) {
  return kr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, kr(t);
}
function vt(t, e) {
  return vt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, vt(t, e);
}
function Hr(t, e, r) {
  return Hr = function() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function")
      return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }() ? Reflect.construct.bind() : function(n, o, i) {
    var a = [null];
    a.push.apply(a, o);
    var s = new (Function.bind.apply(n, a))();
    return i && vt(s, i.prototype), s;
  }, Hr.apply(null, arguments);
}
function Vr(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Vr = function(r) {
    if (r === null || Function.toString.call(r).indexOf("[native code]") === -1)
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (e !== void 0) {
      if (e.has(r))
        return e.get(r);
      e.set(r, n);
    }
    function n() {
      return Hr(r, arguments, kr(this).constructor);
    }
    return n.prototype = Object.create(r.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), vt(n, r);
  }, Vr(t);
}
var Er = /* @__PURE__ */ function() {
  function t(r, n, o) {
    var i, a;
    this.name = r, this.definition = n, this.bindings = (i = n.bindings) != null ? i : {}, this.wheres = (a = n.wheres) != null ? a : {}, this.config = o;
  }
  var e = t.prototype;
  return e.matchesUrl = function(r) {
    var n = this;
    if (!this.definition.methods.includes("GET"))
      return !1;
    var o = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(h, y, v, b) {
      var f, d = "(?<" + v + ">" + (((f = n.wheres[v]) == null ? void 0 : f.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return b ? "(" + y + d + ")?" : "" + y + d;
    }).replace(/^\w+:\/\//, ""), i = r.replace(/^\w+:\/\//, "").split("?"), a = i[0], s = i[1], u = new RegExp("^" + o + "/?$").exec(decodeURI(a));
    if (u) {
      for (var c in u.groups)
        u.groups[c] = typeof u.groups[c] == "string" ? decodeURIComponent(u.groups[c]) : u.groups[c];
      return { params: u.groups, query: Ro.parse(s) };
    }
    return !1;
  }, e.compile = function(r) {
    var n = this;
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(o, i, a) {
      var s, u;
      if (!a && [null, void 0].includes(r[i]))
        throw new Error("Ziggy error: '" + i + "' parameter is required for route '" + n.name + "'.");
      if (n.wheres[i] && !new RegExp("^" + (a ? "(" + n.wheres[i] + ")?" : n.wheres[i]) + "$").test((u = r[i]) != null ? u : ""))
        throw new Error("Ziggy error: '" + i + "' parameter does not match required format '" + n.wheres[i] + "' for route '" + n.name + "'.");
      return encodeURI((s = r[i]) != null ? s : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.origin + "//", this.origin + "/").replace(/\/+$/, "") : this.template;
  }, To(t, [{ key: "template", get: function() {
    var r = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
    return r === "" ? "/" : r;
  } }, { key: "origin", get: function() {
    return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
  } }, { key: "parameterSegments", get: function() {
    var r, n;
    return (r = (n = this.template.match(/{[^}?]+\??}/g)) == null ? void 0 : n.map(function(o) {
      return { name: o.replace(/{|\??}/g, ""), required: !/\?}$/.test(o) };
    })) != null ? r : [];
  } }]), t;
}(), Gf = /* @__PURE__ */ function(t) {
  var e, r;
  function n(i, a, s, u) {
    var c;
    if (s === void 0 && (s = !0), (c = t.call(this) || this).t = u ?? (typeof Ziggy < "u" ? Ziggy : globalThis == null ? void 0 : globalThis.Ziggy), c.t = ee({}, c.t, { absolute: s }), i) {
      if (!c.t.routes[i])
        throw new Error("Ziggy error: route '" + i + "' is not in the route list.");
      c.i = new Er(i, c.t.routes[i], c.t), c.u = c.o(a);
    }
    return c;
  }
  r = t, (e = n).prototype = Object.create(r.prototype), e.prototype.constructor = e, vt(e, r);
  var o = n.prototype;
  return o.toString = function() {
    var i = this, a = Object.keys(this.u).filter(function(s) {
      return !i.i.parameterSegments.some(function(u) {
        return u.name === s;
      });
    }).filter(function(s) {
      return s !== "_query";
    }).reduce(function(s, u) {
      var c;
      return ee({}, s, ((c = {})[u] = i.u[u], c));
    }, {});
    return this.i.compile(this.u) + Ro.stringify(ee({}, a, this.u._query), { addQueryPrefix: !0, arrayFormat: "indices", encodeValuesOnly: !0, skipNulls: !0, encoder: function(s, u) {
      return typeof s == "boolean" ? Number(s) : u(s);
    } });
  }, o.l = function(i) {
    var a = this;
    i ? this.t.absolute && i.startsWith("/") && (i = this.h().host + i) : i = this.v();
    var s = {}, u = Object.entries(this.t.routes).find(function(c) {
      return s = new Er(c[0], c[1], a.t).matchesUrl(i);
    }) || [void 0, void 0];
    return ee({ name: u[0] }, s, { route: u[1] });
  }, o.v = function() {
    var i = this.h(), a = i.pathname, s = i.search;
    return (this.t.absolute ? i.host + a : a.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + s;
  }, o.current = function(i, a) {
    var s = this.l(), u = s.name, c = s.params, h = s.query, y = s.route;
    if (!i)
      return u;
    var v = new RegExp("^" + i.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(u);
    if ([null, void 0].includes(a) || !v)
      return v;
    var b = new Er(u, y, this.t);
    a = this.o(a, b);
    var f = ee({}, c, h);
    return !(!Object.values(a).every(function(d) {
      return !d;
    }) || Object.values(f).some(function(d) {
      return d !== void 0;
    })) || Object.entries(a).every(function(d) {
      return f[d[0]] == d[1];
    });
  }, o.h = function() {
    var i, a, s, u, c, h, y = typeof window < "u" ? window.location : {}, v = y.host, b = y.pathname, f = y.search;
    return { host: (i = (a = this.t.location) == null ? void 0 : a.host) != null ? i : v === void 0 ? "" : v, pathname: (s = (u = this.t.location) == null ? void 0 : u.pathname) != null ? s : b === void 0 ? "" : b, search: (c = (h = this.t.location) == null ? void 0 : h.search) != null ? c : f === void 0 ? "" : f };
  }, o.has = function(i) {
    return Object.keys(this.t.routes).includes(i);
  }, o.o = function(i, a) {
    var s = this;
    i === void 0 && (i = {}), a === void 0 && (a = this.i), i != null || (i = {}), i = ["string", "number"].includes(typeof i) ? [i] : i;
    var u = a.parameterSegments.filter(function(h) {
      return !s.t.defaults[h.name];
    });
    if (Array.isArray(i))
      i = i.reduce(function(h, y, v) {
        var b, f;
        return ee({}, h, u[v] ? ((b = {})[u[v].name] = y, b) : typeof y == "object" ? y : ((f = {})[y] = "", f));
      }, {});
    else if (u.length === 1 && !i[u[0].name] && (i.hasOwnProperty(Object.values(a.bindings)[0]) || i.hasOwnProperty("id"))) {
      var c;
      (c = {})[u[0].name] = i, i = c;
    }
    return ee({}, this.g(a), this.p(i, a));
  }, o.g = function(i) {
    var a = this;
    return i.parameterSegments.filter(function(s) {
      return a.t.defaults[s.name];
    }).reduce(function(s, u, c) {
      var h, y = u.name;
      return ee({}, s, ((h = {})[y] = a.t.defaults[y], h));
    }, {});
  }, o.p = function(i, a) {
    var s = a.bindings, u = a.parameterSegments;
    return Object.entries(i).reduce(function(c, h) {
      var y, v, b = h[0], f = h[1];
      if (!f || typeof f != "object" || Array.isArray(f) || !u.some(function(d) {
        return d.name === b;
      }))
        return ee({}, c, ((v = {})[b] = f, v));
      if (!f.hasOwnProperty(s[b])) {
        if (!f.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + b + "' parameter is missing route model binding key '" + s[b] + "'.");
        s[b] = "id";
      }
      return ee({}, c, ((y = {})[b] = f[s[b]], y));
    }, {});
  }, o.valueOf = function() {
    return this.toString();
  }, o.check = function(i) {
    return this.has(i);
  }, To(n, [{ key: "params", get: function() {
    var i = this.l();
    return ee({}, i.params, i.query);
  } }]), n;
}(/* @__PURE__ */ Vr(String));
function Jf(t, e, r, n) {
  var o = new Gf(t, e, r, n);
  return t ? o.toString() : o;
}
let Ai = !1;
const Kf = "https://xtrackr.siaji.com", Qf = Jf("api.notification.v1.subscribe"), Xf = "BHghdd8D_S28sRAgFQFGs8WxvFNi8iJx8N_CKmTxUdMGW6j4Xcyv-Q37o6jgmnXvjIlPfa-Ke5HkEgqqvUUX990";
Zf();
function Zf() {
  if (!1 in navigator) {
    console.warn("Service worker not supported");
    return;
  }
  navigator.serviceWorker.register(`${Kf}/sw.js`).then((t) => {
    t.update();
    let e = document.getElementById("app");
    if (e && e.dataset.page) {
      let n = JSON.parse(e.dataset.page).props;
      n && n.auth && n.auth.user && (Ai = !0);
    }
    Ai && Yf();
  }).catch((t) => {
    console.warn(t);
  });
}
function Yf() {
  if (!navigator.serviceWorker.ready) {
    console.warn("Service worker isn't ready");
    return;
  }
  "permissions" in navigator && navigator.permissions.query({ name: "notifications" }).then(function(t) {
    t.onchange = () => {
      "state" in t && t.state === "granted" && ep();
    };
  });
}
function ep() {
  navigator.serviceWorker.ready.then((t) => {
    const e = {
      userVisibleOnly: !0,
      applicationServerKey: tp(Xf)
    };
    return t.pushManager.subscribe(e);
  }).then((t) => {
    rp(t);
  }).catch((t) => {
    console.error("Service Worker registration failed:", t);
  });
}
function tp(t) {
  for (var e = "=".repeat((4 - t.length % 4) % 4), r = (t + e).replace(/\-/g, "+").replace(/_/g, "/"), n = window.atob(r), o = new Uint8Array(n.length), i = 0; i < n.length; ++i)
    o[i] = n.charCodeAt(i);
  return o;
}
function rp(t) {
  let e = new FormData(), r = JSON.stringify(t), n = JSON.parse(r);
  for (const o in n)
    if (typeof n[o] == "object") {
      let i = o, a = n[o];
      if (n[o] !== null) {
        let s = n[o];
        for (const u in s)
          i = `${o}[${u}]`, a = s[u], e.append(i, a);
      } else
        e.append(i, a);
    } else
      typeof n[o] == "string" && e.append(o, n[o]);
  Tr.post(`${Qf}`, e).then(function(o) {
  }).catch(function(o) {
  }).then(function(o) {
  });
}
