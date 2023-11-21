var te = String.prototype.replace, ne = /%20/g, C = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, B = {
  default: C.RFC3986,
  formatters: {
    RFC1738: function(f) {
      return te.call(f, ne, "+");
    },
    RFC3986: function(f) {
      return String(f);
    }
  },
  RFC1738: C.RFC1738,
  RFC3986: C.RFC3986
}, ie = B, A = Object.prototype.hasOwnProperty, O = Array.isArray, b = function() {
  for (var f = [], e = 0; e < 256; ++e)
    f.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
  return f;
}(), ae = function(e) {
  for (; e.length > 1; ) {
    var r = e.pop(), t = r.obj[r.prop];
    if (O(t)) {
      for (var l = [], n = 0; n < t.length; ++n)
        typeof t[n] < "u" && l.push(t[n]);
      r.obj[r.prop] = l;
    }
  }
}, G = function(e, r) {
  for (var t = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, l = 0; l < e.length; ++l)
    typeof e[l] < "u" && (t[l] = e[l]);
  return t;
}, oe = function f(e, r, t) {
  if (!r)
    return e;
  if (typeof r != "object") {
    if (O(e))
      e.push(r);
    else if (e && typeof e == "object")
      (t && (t.plainObjects || t.allowPrototypes) || !A.call(Object.prototype, r)) && (e[r] = !0);
    else
      return [e, r];
    return e;
  }
  if (!e || typeof e != "object")
    return [e].concat(r);
  var l = e;
  return O(e) && !O(r) && (l = G(e, t)), O(e) && O(r) ? (r.forEach(function(n, i) {
    if (A.call(e, i)) {
      var a = e[i];
      a && typeof a == "object" && n && typeof n == "object" ? e[i] = f(a, n, t) : e.push(n);
    } else
      e[i] = n;
  }), e) : Object.keys(r).reduce(function(n, i) {
    var a = r[i];
    return A.call(n, i) ? n[i] = f(n[i], a, t) : n[i] = a, n;
  }, l);
}, ue = function(e, r) {
  return Object.keys(r).reduce(function(t, l) {
    return t[l] = r[l], t;
  }, e);
}, fe = function(f, e, r) {
  var t = f.replace(/\+/g, " ");
  if (r === "iso-8859-1")
    return t.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(t);
  } catch {
    return t;
  }
}, le = function(e, r, t, l, n) {
  if (e.length === 0)
    return e;
  var i = e;
  if (typeof e == "symbol" ? i = Symbol.prototype.toString.call(e) : typeof e != "string" && (i = String(e)), t === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(c) {
      return "%26%23" + parseInt(c.slice(2), 16) + "%3B";
    });
  for (var a = "", o = 0; o < i.length; ++o) {
    var u = i.charCodeAt(o);
    if (u === 45 || u === 46 || u === 95 || u === 126 || u >= 48 && u <= 57 || u >= 65 && u <= 90 || u >= 97 && u <= 122 || n === ie.RFC1738 && (u === 40 || u === 41)) {
      a += i.charAt(o);
      continue;
    }
    if (u < 128) {
      a = a + b[u];
      continue;
    }
    if (u < 2048) {
      a = a + (b[192 | u >> 6] + b[128 | u & 63]);
      continue;
    }
    if (u < 55296 || u >= 57344) {
      a = a + (b[224 | u >> 12] + b[128 | u >> 6 & 63] + b[128 | u & 63]);
      continue;
    }
    o += 1, u = 65536 + ((u & 1023) << 10 | i.charCodeAt(o) & 1023), a += b[240 | u >> 18] + b[128 | u >> 12 & 63] + b[128 | u >> 6 & 63] + b[128 | u & 63];
  }
  return a;
}, ce = function(e) {
  for (var r = [{ obj: { o: e }, prop: "o" }], t = [], l = 0; l < r.length; ++l)
    for (var n = r[l], i = n.obj[n.prop], a = Object.keys(i), o = 0; o < a.length; ++o) {
      var u = a[o], c = i[u];
      typeof c == "object" && c !== null && t.indexOf(c) === -1 && (r.push({ obj: i, prop: u }), t.push(c));
    }
  return ae(r), e;
}, se = function(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}, de = function(e) {
  return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
}, pe = function(e, r) {
  return [].concat(e, r);
}, he = function(e, r) {
  if (O(e)) {
    for (var t = [], l = 0; l < e.length; l += 1)
      t.push(r(e[l]));
    return t;
  }
  return r(e);
}, K = {
  arrayToObject: G,
  assign: ue,
  combine: pe,
  compact: ce,
  decode: fe,
  encode: le,
  isBuffer: de,
  isRegExp: se,
  maybeMap: he,
  merge: oe
}, T = K, P = B, ye = Object.prototype.hasOwnProperty, M = {
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
}, j = Array.isArray, ve = String.prototype.split, me = Array.prototype.push, X = function(f, e) {
  me.apply(f, j(e) ? e : [e]);
}, ge = Date.prototype.toISOString, W = P.default, m = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: T.encode,
  encodeValuesOnly: !1,
  format: W,
  formatter: P.formatters[W],
  // deprecated
  indices: !1,
  serializeDate: function(e) {
    return ge.call(e);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, be = function(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
}, we = function f(e, r, t, l, n, i, a, o, u, c, p, h, y, s) {
  var d = e;
  if (typeof a == "function" ? d = a(r, d) : d instanceof Date ? d = c(d) : t === "comma" && j(d) && (d = T.maybeMap(d, function($) {
    return $ instanceof Date ? c($) : $;
  })), d === null) {
    if (l)
      return i && !y ? i(r, m.encoder, s, "key", p) : r;
    d = "";
  }
  if (be(d) || T.isBuffer(d)) {
    if (i) {
      var H = y ? r : i(r, m.encoder, s, "key", p);
      if (t === "comma" && y) {
        for (var I = ve.call(String(d), ","), z = "", F = 0; F < I.length; ++F)
          z += (F === 0 ? "" : ",") + h(i(I[F], m.encoder, s, "value", p));
        return [h(H) + "=" + z];
      }
      return [h(H) + "=" + h(i(d, m.encoder, s, "value", p))];
    }
    return [h(r) + "=" + h(String(d))];
  }
  var N = [];
  if (typeof d > "u")
    return N;
  var S;
  if (t === "comma" && j(d))
    S = [{ value: d.length > 0 ? d.join(",") || null : void 0 }];
  else if (j(a))
    S = a;
  else {
    var U = Object.keys(d);
    S = o ? U.sort(o) : U;
  }
  for (var R = 0; R < S.length; ++R) {
    var w = S[R], q = typeof w == "object" && typeof w.value < "u" ? w.value : d[w];
    if (!(n && q === null)) {
      var re = j(d) ? typeof t == "function" ? t(r, w) : r : r + (u ? "." + w : "[" + w + "]");
      X(N, f(
        q,
        re,
        t,
        l,
        n,
        i,
        a,
        o,
        u,
        c,
        p,
        h,
        y,
        s
      ));
    }
  }
  return N;
}, Oe = function(e) {
  if (!e)
    return m;
  if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var r = e.charset || m.charset;
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var t = P.default;
  if (typeof e.format < "u") {
    if (!ye.call(P.formatters, e.format))
      throw new TypeError("Unknown format option provided.");
    t = e.format;
  }
  var l = P.formatters[t], n = m.filter;
  return (typeof e.filter == "function" || j(e.filter)) && (n = e.filter), {
    addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : m.addQueryPrefix,
    allowDots: typeof e.allowDots > "u" ? m.allowDots : !!e.allowDots,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : m.charsetSentinel,
    delimiter: typeof e.delimiter > "u" ? m.delimiter : e.delimiter,
    encode: typeof e.encode == "boolean" ? e.encode : m.encode,
    encoder: typeof e.encoder == "function" ? e.encoder : m.encoder,
    encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : m.encodeValuesOnly,
    filter: n,
    format: t,
    formatter: l,
    serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : m.serializeDate,
    skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : m.skipNulls,
    sort: typeof e.sort == "function" ? e.sort : null,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : m.strictNullHandling
  };
}, je = function(f, e) {
  var r = f, t = Oe(e), l, n;
  typeof t.filter == "function" ? (n = t.filter, r = n("", r)) : j(t.filter) && (n = t.filter, l = n);
  var i = [];
  if (typeof r != "object" || r === null)
    return "";
  var a;
  e && e.arrayFormat in M ? a = e.arrayFormat : e && "indices" in e ? a = e.indices ? "indices" : "repeat" : a = "indices";
  var o = M[a];
  l || (l = Object.keys(r)), t.sort && l.sort(t.sort);
  for (var u = 0; u < l.length; ++u) {
    var c = l[u];
    t.skipNulls && r[c] === null || X(i, we(
      r[c],
      c,
      o,
      t.strictNullHandling,
      t.skipNulls,
      t.encode ? t.encoder : null,
      t.filter,
      t.sort,
      t.allowDots,
      t.serializeDate,
      t.format,
      t.formatter,
      t.encodeValuesOnly,
      t.charset
    ));
  }
  var p = i.join(t.delimiter), h = t.addQueryPrefix === !0 ? "?" : "";
  return t.charsetSentinel && (t.charset === "iso-8859-1" ? h += "utf8=%26%2310003%3B&" : h += "utf8=%E2%9C%93&"), p.length > 0 ? h + p : "";
}, x = K, k = Object.prototype.hasOwnProperty, xe = Array.isArray, v = {
  allowDots: !1,
  allowPrototypes: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: x.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, Se = function(f) {
  return f.replace(/&#(\d+);/g, function(e, r) {
    return String.fromCharCode(parseInt(r, 10));
  });
}, Y = function(f, e) {
  return f && typeof f == "string" && e.comma && f.indexOf(",") > -1 ? f.split(",") : f;
}, Pe = "utf8=%26%2310003%3B", Ee = "utf8=%E2%9C%93", Fe = function(e, r) {
  var t = {}, l = r.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, n = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit, i = l.split(r.delimiter, n), a = -1, o, u = r.charset;
  if (r.charsetSentinel)
    for (o = 0; o < i.length; ++o)
      i[o].indexOf("utf8=") === 0 && (i[o] === Ee ? u = "utf-8" : i[o] === Pe && (u = "iso-8859-1"), a = o, o = i.length);
  for (o = 0; o < i.length; ++o)
    if (o !== a) {
      var c = i[o], p = c.indexOf("]="), h = p === -1 ? c.indexOf("=") : p + 1, y, s;
      h === -1 ? (y = r.decoder(c, v.decoder, u, "key"), s = r.strictNullHandling ? null : "") : (y = r.decoder(c.slice(0, h), v.decoder, u, "key"), s = x.maybeMap(
        Y(c.slice(h + 1), r),
        function(d) {
          return r.decoder(d, v.decoder, u, "value");
        }
      )), s && r.interpretNumericEntities && u === "iso-8859-1" && (s = Se(s)), c.indexOf("[]=") > -1 && (s = xe(s) ? [s] : s), k.call(t, y) ? t[y] = x.combine(t[y], s) : t[y] = s;
    }
  return t;
}, Ne = function(f, e, r, t) {
  for (var l = t ? e : Y(e, r), n = f.length - 1; n >= 0; --n) {
    var i, a = f[n];
    if (a === "[]" && r.parseArrays)
      i = [].concat(l);
    else {
      i = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var o = a.charAt(0) === "[" && a.charAt(a.length - 1) === "]" ? a.slice(1, -1) : a, u = parseInt(o, 10);
      !r.parseArrays && o === "" ? i = { 0: l } : !isNaN(u) && a !== o && String(u) === o && u >= 0 && r.parseArrays && u <= r.arrayLimit ? (i = [], i[u] = l) : o !== "__proto__" && (i[o] = l);
    }
    l = i;
  }
  return l;
}, Re = function(e, r, t, l) {
  if (e) {
    var n = t.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, i = /(\[[^[\]]*])/, a = /(\[[^[\]]*])/g, o = t.depth > 0 && i.exec(n), u = o ? n.slice(0, o.index) : n, c = [];
    if (u) {
      if (!t.plainObjects && k.call(Object.prototype, u) && !t.allowPrototypes)
        return;
      c.push(u);
    }
    for (var p = 0; t.depth > 0 && (o = a.exec(n)) !== null && p < t.depth; ) {
      if (p += 1, !t.plainObjects && k.call(Object.prototype, o[1].slice(1, -1)) && !t.allowPrototypes)
        return;
      c.push(o[1]);
    }
    return o && c.push("[" + n.slice(o.index) + "]"), Ne(c, r, t, l);
  }
}, $e = function(e) {
  if (!e)
    return v;
  if (e.decoder !== null && e.decoder !== void 0 && typeof e.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var r = typeof e.charset > "u" ? v.charset : e.charset;
  return {
    allowDots: typeof e.allowDots > "u" ? v.allowDots : !!e.allowDots,
    allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : v.allowPrototypes,
    arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : v.arrayLimit,
    charset: r,
    charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : v.charsetSentinel,
    comma: typeof e.comma == "boolean" ? e.comma : v.comma,
    decoder: typeof e.decoder == "function" ? e.decoder : v.decoder,
    delimiter: typeof e.delimiter == "string" || x.isRegExp(e.delimiter) ? e.delimiter : v.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : v.depth,
    ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : v.interpretNumericEntities,
    parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : v.parameterLimit,
    parseArrays: e.parseArrays !== !1,
    plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : v.plainObjects,
    strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : v.strictNullHandling
  };
}, Ce = function(f, e) {
  var r = $e(e);
  if (f === "" || f === null || typeof f > "u")
    return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var t = typeof f == "string" ? Fe(f, r) : f, l = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n = Object.keys(t), i = 0; i < n.length; ++i) {
    var a = n[i], o = Re(a, t[a], r, typeof f == "string");
    l = x.merge(l, o, r);
  }
  return x.compact(l);
}, Ae = je, De = Ce, Te = B, J = {
  formats: Te,
  parse: De,
  stringify: Ae
};
function Z(f, e) {
  for (var r = 0; r < e.length; r++) {
    var t = e[r];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(f, typeof (l = function(n, i) {
      if (typeof n != "object" || n === null)
        return n;
      var a = n[Symbol.toPrimitive];
      if (a !== void 0) {
        var o = a.call(n, "string");
        if (typeof o != "object")
          return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(n);
    }(t.key)) == "symbol" ? l : String(l), t);
  }
  var l;
}
function ee(f, e, r) {
  return e && Z(f.prototype, e), r && Z(f, r), Object.defineProperty(f, "prototype", { writable: !1 }), f;
}
function g() {
  return g = Object.assign ? Object.assign.bind() : function(f) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var t in r)
        Object.prototype.hasOwnProperty.call(r, t) && (f[t] = r[t]);
    }
    return f;
  }, g.apply(this, arguments);
}
function Q(f) {
  return Q = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Q(f);
}
function E(f, e) {
  return E = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, t) {
    return r.__proto__ = t, r;
  }, E(f, e);
}
function _(f, e, r) {
  return _ = function() {
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
  }() ? Reflect.construct.bind() : function(t, l, n) {
    var i = [null];
    i.push.apply(i, l);
    var a = new (Function.bind.apply(t, i))();
    return n && E(a, n.prototype), a;
  }, _.apply(null, arguments);
}
function L(f) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return L = function(r) {
    if (r === null || Function.toString.call(r).indexOf("[native code]") === -1)
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (e !== void 0) {
      if (e.has(r))
        return e.get(r);
      e.set(r, t);
    }
    function t() {
      return _(r, arguments, Q(this).constructor);
    }
    return t.prototype = Object.create(r.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), E(t, r);
  }, L(f);
}
var D = /* @__PURE__ */ function() {
  function f(r, t, l) {
    var n, i;
    this.name = r, this.definition = t, this.bindings = (n = t.bindings) != null ? n : {}, this.wheres = (i = t.wheres) != null ? i : {}, this.config = l;
  }
  var e = f.prototype;
  return e.matchesUrl = function(r) {
    var t = this;
    if (!this.definition.methods.includes("GET"))
      return !1;
    var l = this.template.replace(/(\/?){([^}?]*)(\??)}/g, function(c, p, h, y) {
      var s, d = "(?<" + h + ">" + (((s = t.wheres[h]) == null ? void 0 : s.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")";
      return y ? "(" + p + d + ")?" : "" + p + d;
    }).replace(/^\w+:\/\//, ""), n = r.replace(/^\w+:\/\//, "").split("?"), i = n[0], a = n[1], o = new RegExp("^" + l + "/?$").exec(decodeURI(i));
    if (o) {
      for (var u in o.groups)
        o.groups[u] = typeof o.groups[u] == "string" ? decodeURIComponent(o.groups[u]) : o.groups[u];
      return { params: o.groups, query: J.parse(a) };
    }
    return !1;
  }, e.compile = function(r) {
    var t = this;
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function(l, n, i) {
      var a, o;
      if (!i && [null, void 0].includes(r[n]))
        throw new Error("Ziggy error: '" + n + "' parameter is required for route '" + t.name + "'.");
      if (t.wheres[n] && !new RegExp("^" + (i ? "(" + t.wheres[n] + ")?" : t.wheres[n]) + "$").test((o = r[n]) != null ? o : ""))
        throw new Error("Ziggy error: '" + n + "' parameter does not match required format '" + t.wheres[n] + "' for route '" + t.name + "'.");
      return encodeURI((a = r[n]) != null ? a : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.origin + "//", this.origin + "/").replace(/\/+$/, "") : this.template;
  }, ee(f, [{ key: "template", get: function() {
    var r = (this.origin + "/" + this.definition.uri).replace(/\/+$/, "");
    return r === "" ? "/" : r;
  } }, { key: "origin", get: function() {
    return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "";
  } }, { key: "parameterSegments", get: function() {
    var r, t;
    return (r = (t = this.template.match(/{[^}?]+\??}/g)) == null ? void 0 : t.map(function(l) {
      return { name: l.replace(/{|\??}/g, ""), required: !/\?}$/.test(l) };
    })) != null ? r : [];
  } }]), f;
}(), ke = /* @__PURE__ */ function(f) {
  var e, r;
  function t(n, i, a, o) {
    var u;
    if (a === void 0 && (a = !0), (u = f.call(this) || this).t = o ?? (typeof Ziggy < "u" ? Ziggy : globalThis == null ? void 0 : globalThis.Ziggy), u.t = g({}, u.t, { absolute: a }), n) {
      if (!u.t.routes[n])
        throw new Error("Ziggy error: route '" + n + "' is not in the route list.");
      u.i = new D(n, u.t.routes[n], u.t), u.u = u.o(i);
    }
    return u;
  }
  r = f, (e = t).prototype = Object.create(r.prototype), e.prototype.constructor = e, E(e, r);
  var l = t.prototype;
  return l.toString = function() {
    var n = this, i = Object.keys(this.u).filter(function(a) {
      return !n.i.parameterSegments.some(function(o) {
        return o.name === a;
      });
    }).filter(function(a) {
      return a !== "_query";
    }).reduce(function(a, o) {
      var u;
      return g({}, a, ((u = {})[o] = n.u[o], u));
    }, {});
    return this.i.compile(this.u) + J.stringify(g({}, i, this.u._query), { addQueryPrefix: !0, arrayFormat: "indices", encodeValuesOnly: !0, skipNulls: !0, encoder: function(a, o) {
      return typeof a == "boolean" ? Number(a) : o(a);
    } });
  }, l.l = function(n) {
    var i = this;
    n ? this.t.absolute && n.startsWith("/") && (n = this.h().host + n) : n = this.v();
    var a = {}, o = Object.entries(this.t.routes).find(function(u) {
      return a = new D(u[0], u[1], i.t).matchesUrl(n);
    }) || [void 0, void 0];
    return g({ name: o[0] }, a, { route: o[1] });
  }, l.v = function() {
    var n = this.h(), i = n.pathname, a = n.search;
    return (this.t.absolute ? n.host + i : i.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + a;
  }, l.current = function(n, i) {
    var a = this.l(), o = a.name, u = a.params, c = a.query, p = a.route;
    if (!n)
      return o;
    var h = new RegExp("^" + n.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o);
    if ([null, void 0].includes(i) || !h)
      return h;
    var y = new D(o, p, this.t);
    i = this.o(i, y);
    var s = g({}, u, c);
    return !(!Object.values(i).every(function(d) {
      return !d;
    }) || Object.values(s).some(function(d) {
      return d !== void 0;
    })) || Object.entries(i).every(function(d) {
      return s[d[0]] == d[1];
    });
  }, l.h = function() {
    var n, i, a, o, u, c, p = typeof window < "u" ? window.location : {}, h = p.host, y = p.pathname, s = p.search;
    return { host: (n = (i = this.t.location) == null ? void 0 : i.host) != null ? n : h === void 0 ? "" : h, pathname: (a = (o = this.t.location) == null ? void 0 : o.pathname) != null ? a : y === void 0 ? "" : y, search: (u = (c = this.t.location) == null ? void 0 : c.search) != null ? u : s === void 0 ? "" : s };
  }, l.has = function(n) {
    return Object.keys(this.t.routes).includes(n);
  }, l.o = function(n, i) {
    var a = this;
    n === void 0 && (n = {}), i === void 0 && (i = this.i), n != null || (n = {}), n = ["string", "number"].includes(typeof n) ? [n] : n;
    var o = i.parameterSegments.filter(function(c) {
      return !a.t.defaults[c.name];
    });
    if (Array.isArray(n))
      n = n.reduce(function(c, p, h) {
        var y, s;
        return g({}, c, o[h] ? ((y = {})[o[h].name] = p, y) : typeof p == "object" ? p : ((s = {})[p] = "", s));
      }, {});
    else if (o.length === 1 && !n[o[0].name] && (n.hasOwnProperty(Object.values(i.bindings)[0]) || n.hasOwnProperty("id"))) {
      var u;
      (u = {})[o[0].name] = n, n = u;
    }
    return g({}, this.g(i), this.p(n, i));
  }, l.g = function(n) {
    var i = this;
    return n.parameterSegments.filter(function(a) {
      return i.t.defaults[a.name];
    }).reduce(function(a, o, u) {
      var c, p = o.name;
      return g({}, a, ((c = {})[p] = i.t.defaults[p], c));
    }, {});
  }, l.p = function(n, i) {
    var a = i.bindings, o = i.parameterSegments;
    return Object.entries(n).reduce(function(u, c) {
      var p, h, y = c[0], s = c[1];
      if (!s || typeof s != "object" || Array.isArray(s) || !o.some(function(d) {
        return d.name === y;
      }))
        return g({}, u, ((h = {})[y] = s, h));
      if (!s.hasOwnProperty(a[y])) {
        if (!s.hasOwnProperty("id"))
          throw new Error("Ziggy error: object passed as '" + y + "' parameter is missing route model binding key '" + a[y] + "'.");
        a[y] = "id";
      }
      return g({}, u, ((p = {})[y] = s[a[y]], p));
    }, {});
  }, l.valueOf = function() {
    return this.toString();
  }, l.check = function(n) {
    return this.has(n);
  }, ee(t, [{ key: "params", get: function() {
    var n = this.l();
    return g({}, n.params, n.query);
  } }]), t;
}(/* @__PURE__ */ L(String));
function Qe(f, e, r, t) {
  var l = new ke(f, e, r, t);
  return f ? l.toString() : l;
}
const V = "https://laravel-shadcn.test";
Qe("public.notification.subscribe");
_e();
function _e() {
  if (console.log("Init SW"), console.log(V), console.log("serviceWorker" in navigator), !1 in navigator) {
    console.warn("Service worker not supported");
    return;
  }
  navigator.serviceWorker.register(`${V}/sw.js`).then((f) => {
    f.update();
  }).catch((f) => {
    console.warn(f);
  });
}
