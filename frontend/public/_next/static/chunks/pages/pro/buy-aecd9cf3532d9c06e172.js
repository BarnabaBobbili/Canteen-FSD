_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [44],
  {
    "4/hZ": function (a, e, t) {
      "use strict";
      var n = t("q1tI"),
        r = t.n(n),
        o = t("di54"),
        i = t.n(o),
        l = t("t/pG"),
        c = t.n(l),
        s = t("YFqc"),
        u = t.n(s),
        p = t("Fsgp"),
        m = t("S8Lw"),
        f = r.a.createElement,
        d = function (a) {
          return f(
            "svg",
            a,
            f("path", {
              d: "M6.285 4.358a3.42 3.42 0 0 1 5.852-2.341c.496-.004.919.122 1.863-.45-.234 1.144-.349 1.64-.847 2.324 0 5.334-3.279 7.927-6.605 8.591-2.28.455-5.597-.292-6.548-1.285.484-.037 2.453-.249 3.59-1.082-.962-.634-4.793-2.888-2.276-8.95 1.182 1.38 2.38 2.32 3.595 2.818.808.332 1.006.325 1.377.376h-.001z",
            })
          );
        };
      (d.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
      }),
        (e.a = function () {
          return f(
            "footer",
            { className: i.a.footer },
            f(
              p.a,
              { className: i.a.layout },
              f(
                "menu",
                null,
                f("li", null, f(u.a, { href: "/" }, f("a", null, "Features"))),
                f(
                  "li",
                  null,
                  f(u.a, { href: "/pro/buy" }, f("a", null, "Pricing"))
                ),
                f(
                  "li",
                  null,
                  f(u.a, { href: "/download" }, f("a", null, "Download"))
                ),
                f(
                  "li",
                  null,
                  f(u.a, { href: c.a.about }, f("a", null, "About"))
                )
              ),
              f(
                "menu",
                null,
                f("li", null, f("a", { href: c.a.blog }, "Blog")),
                f("li", null, f("a", { href: c.a.better }, "Suggest feature")),
                f(
                  "li",
                  null,
                  f("a", { href: c.a.help.index }, "Help & support")
                ),
                f("li", null, f("a", { href: c.a.dev }, "API"))
              ),
              f(
                "div",
                { className: i.a.copy },
                f("div", { className: i.a.logo }, f(m.a, t("GPu0"))),
                f(
                  "div",
                  { className: i.a.about },
                  f("h5", null, "Raindrop.io"),
                  f("p", null, "All in one bookmark manager"),
                  "\xa9 2013 - ",
                  new Date().getFullYear(),
                  " SP Rustem Mussabekov",
                  f("br", null),
                  f(d, { className: i.a.twitterIcon }),
                  " ",
                  f("a", { href: c.a.twitter }, "Twitter"),
                  f("a", { href: c.a.terms }, "Terms"),
                  f("a", { href: c.a.privacy }, "Privacy")
                )
              )
            )
          );
        });
    },
    "8QRZ": function (a, e, t) {
      "use strict";
      function n(a, e) {
        (null == e || e > a.length) && (e = a.length);
        for (var t = 0, n = new Array(e); t < e; t++) n[t] = a[t];
        return n;
      }
      function r(a, e) {
        return (
          (function (a) {
            if (Array.isArray(a)) return a;
          })(a) ||
          (function (a, e) {
            if ("undefined" !== typeof Symbol && Symbol.iterator in Object(a)) {
              var t = [],
                n = !0,
                r = !1,
                o = void 0;
              try {
                for (
                  var i, l = a[Symbol.iterator]();
                  !(n = (i = l.next()).done) &&
                  (t.push(i.value), !e || t.length !== e);
                  n = !0
                );
              } catch (c) {
                (r = !0), (o = c);
              } finally {
                try {
                  n || null == l.return || l.return();
                } finally {
                  if (r) throw o;
                }
              }
              return t;
            }
          })(a, e) ||
          (function (a, e) {
            if (a) {
              if ("string" === typeof a) return n(a, e);
              var t = Object.prototype.toString.call(a).slice(8, -1);
              return (
                "Object" === t && a.constructor && (t = a.constructor.name),
                "Map" === t || "Set" === t
                  ? Array.from(a)
                  : "Arguments" === t ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                  ? n(a, e)
                  : void 0
              );
            }
          })(a, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      t.r(e);
      var o = t("HaE+"),
        i = t("1OyB"),
        l = t("vuIU"),
        c = t("md7G"),
        s = t("foSv"),
        u = t("Ji7U"),
        p = t("rePB"),
        m = t("igaF"),
        f = t.n(m),
        d = t("nOHt"),
        h = t.n(d),
        b = t("B419"),
        g = t.n(b),
        v = t("LvDl"),
        y = t.n(v),
        w = t("t/pG"),
        z = t.n(w),
        N = t("djLo"),
        O = t("+jAA"),
        j = t("YYK4"),
        P = function () {
          return new URLSearchParams(window.location.search);
        },
        k = t("q1tI"),
        x = t.n(k),
        S = t("2qfT"),
        _ = t("9nNC"),
        I = t("4/hZ"),
        B = t("Fsgp"),
        C = t("wx14"),
        A = t("Ff2n"),
        D = t("7Pyw"),
        T = t.n(D),
        M = ["options", "value", "className"],
        E = x.a.createElement;
      function F(a, e, t) {
        return (
          (e = Object(s.a)(e)),
          Object(c.a)(
            a,
            (function () {
              try {
                var a = !Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                );
              } catch (a) {}
              return (function () {
                return !!a;
              })();
            })()
              ? Reflect.construct(e, t || [], Object(s.a)(a).constructor)
              : e.apply(a, t)
          )
        );
      }
      var R = (function (a) {
          function e() {
            var a;
            Object(i.a)(this, e);
            for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
              n[r] = arguments[r];
            return (
              (a = F(this, e, [].concat(n))),
              Object(p.a)(a, "renderOption", function (e) {
                var t = e.title,
                  n = e.value;
                return E(
                  "label",
                  {
                    key: t,
                    className: T.a.option,
                    "data-active": a.props.value == n,
                    onClick: function () {
                      return a.props.onChange && a.props.onChange(n);
                    },
                  },
                  E("span", { className: T.a.bullet }),
                  E("span", { className: T.a.title }, t)
                );
              }),
              a
            );
          }
          return (
            Object(u.a)(e, a),
            Object(l.a)(e, [
              {
                key: "render",
                value: function () {
                  var a = this.props,
                    e = a.options,
                    t = (a.value, a.className),
                    n = void 0 === t ? "" : t,
                    r = Object(A.a)(a, M);
                  return E(
                    "div",
                    Object(C.a)({ className: T.a.radioGroup + " " + n }, r),
                    e.map(this.renderOption)
                  );
                },
              },
            ])
          );
        })(x.a.PureComponent),
        L = t("S8Lw"),
        q = t("Olp5"),
        G = t("b132"),
        U = t("vq74"),
        W = x.a.createElement;
      function Y() {
        var a,
          e,
          t = "function" == typeof Symbol ? Symbol : {},
          n = t.iterator || "@@iterator",
          r = t.toStringTag || "@@toStringTag";
        function o(t, n, r, o) {
          var c = n && n.prototype instanceof l ? n : l,
            s = Object.create(c.prototype);
          return (
            V(
              s,
              "_invoke",
              (function (t, n, r) {
                var o,
                  l,
                  c,
                  s = 0,
                  u = r || [],
                  p = !1,
                  m = {
                    p: 0,
                    n: 0,
                    v: a,
                    a: f,
                    f: f.bind(a, 4),
                    d: function (e, t) {
                      return (o = e), (l = 0), (c = a), (m.n = t), i;
                    },
                  };
                function f(t, n) {
                  for (
                    l = t, c = n, e = 0;
                    !p && s && !r && e < u.length;
                    e++
                  ) {
                    var r,
                      o = u[e],
                      f = m.p,
                      d = o[2];
                    t > 3
                      ? (r = d === n) &&
                        ((c = o[(l = o[4]) ? 5 : ((l = 3), 3)]),
                        (o[4] = o[5] = a))
                      : o[0] <= f &&
                        ((r = t < 2 && f < o[1])
                          ? ((l = 0), (m.v = n), (m.n = o[1]))
                          : f < d &&
                            (r = t < 3 || o[0] > n || n > d) &&
                            ((o[4] = t), (o[5] = n), (m.n = d), (l = 0)));
                  }
                  if (r || t > 1) return i;
                  throw ((p = !0), n);
                }
                return function (r, u, d) {
                  if (s > 1) throw TypeError("Generator is already running");
                  for (
                    p && 1 === u && f(u, d), l = u, c = d;
                    (e = l < 2 ? a : c) || !p;

                  ) {
                    o ||
                      (l
                        ? l < 3
                          ? (l > 1 && (m.n = -1), f(l, c))
                          : (m.n = c)
                        : (m.v = c));
                    try {
                      if (((s = 2), o)) {
                        if ((l || (r = "next"), (e = o[r]))) {
                          if (!(e = e.call(o, c)))
                            throw TypeError("iterator result is not an object");
                          if (!e.done) return e;
                          (c = e.value), l < 2 && (l = 0);
                        } else
                          1 === l && (e = o.return) && e.call(o),
                            l < 2 &&
                              ((c = TypeError(
                                "The iterator does not provide a '" +
                                  r +
                                  "' method"
                              )),
                              (l = 1));
                        o = a;
                      } else if ((e = (p = m.n < 0) ? c : t.call(n, m)) !== i)
                        break;
                    } catch (e) {
                      (o = a), (l = 1), (c = e);
                    } finally {
                      s = 1;
                    }
                  }
                  return { value: e, done: p };
                };
              })(t, r, o),
              !0
            ),
            s
          );
        }
        var i = {};
        function l() {}
        function c() {}
        function s() {}
        e = Object.getPrototypeOf;
        var u = [][n]
            ? e(e([][n]()))
            : (V((e = {}), n, function () {
                return this;
              }),
              e),
          p = (s.prototype = l.prototype = Object.create(u));
        function m(a) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(a, s)
              : ((a.__proto__ = s), V(a, r, "GeneratorFunction")),
            (a.prototype = Object.create(p)),
            a
          );
        }
        return (
          (c.prototype = s),
          V(p, "constructor", s),
          V(s, "constructor", c),
          (c.displayName = "GeneratorFunction"),
          V(s, r, "GeneratorFunction"),
          V(p),
          V(p, r, "Generator"),
          V(p, n, function () {
            return this;
          }),
          V(p, "toString", function () {
            return "[object Generator]";
          }),
          (Y = function () {
            return { w: o, m: m };
          })()
        );
      }
      function V(a, e, t, n) {
        var r = Object.defineProperty;
        try {
          r({}, "", {});
        } catch (a) {
          r = 0;
        }
        (V = function (a, e, t, n) {
          function o(e, t) {
            V(a, e, function (a) {
              return this._invoke(e, t, a);
            });
          }
          e
            ? r
              ? r(a, e, {
                  value: t,
                  enumerable: !n,
                  configurable: !n,
                  writable: !n,
                })
              : (a[e] = t)
            : (o("next", 0), o("throw", 1), o("return", 2));
        })(a, e, t, n);
      }
      function H(a, e, t) {
        return (
          (e = Object(s.a)(e)),
          Object(c.a)(
            a,
            (function () {
              try {
                var a = !Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                );
              } catch (a) {}
              return (function () {
                return !!a;
              })();
            })()
              ? Reflect.construct(e, t || [], Object(s.a)(a).constructor)
              : e.apply(a, t)
          )
        );
      }
      var J = function (a) {
        return W(
          "svg",
          a,
          W(
            "g",
            { fillRule: "evenodd", opacity: ".2" },
            W("path", {
              d: "M113.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm112 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm96 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm80 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm72 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm64 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm56 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm48 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm40 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm40 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm32 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm32 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm24 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm16 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm16 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm16 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm8 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm8 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z",
            }),
            W("rect", {
              width: "3",
              height: "3",
              x: "112",
              y: "144",
              rx: "1.5",
            }),
            W("rect", {
              width: "3",
              height: "3",
              x: "112",
              y: "152",
              rx: "1.5",
            })
          )
        );
      };
      J.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "115",
        height: "155",
        viewBox: "0 0 115 155",
      };
      var X = function (a) {
        return W(
          "svg",
          a,
          W("path", {
            fill: "#E1E1E1",
            fillRule: "evenodd",
            d: "M252 0v14C252 5.067 167.594.4-1.219 0H252z",
          })
        );
      };
      X.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "252",
        height: "14",
        viewBox: "0 0 252 14",
      };
      var Z = function (a) {
        return W(
          "svg",
          a,
          W("path", {
            fillRule: "evenodd",
            d: "M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1.001 1.001 0 0 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33h-.01z",
          })
        );
      };
      Z.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
      };
      var $ = function (a) {
        return W(
          "svg",
          a,
          W("path", {
            fillRule: "evenodd",
            d: "M15.64 6.216a1 1 0 0 1 .21 1.41l-7.83 10a1 1 0 0 1-.83.38 1 1 0 0 1-.78-.37l-4.17-5.18a1 1 0 1 1 1.56-1.25l3.43 4.18 7-9a1 1 0 0 1 1.41-.17zm5 0a1 1 0 0 1 .21 1.4l-7.83 10a1 1 0 0 1-1.56.01l-1.1-1.37 1.26-1.62.61.75 7-9a1 1 0 0 1 1.41-.17zm-12.91 6.85l-.49-.65a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.43.2l.2.24-1.29 1.62z",
          })
        );
      };
      $.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
      };
      var Q = function (a) {
        return W(
          "svg",
          a,
          W(
            "g",
            { fillRule: "evenodd" },
            W("rect", {
              width: "14",
              height: "14",
              x: "5",
              y: "5",
              opacity: ".2",
              rx: "7",
            }),
            W("path", {
              d: "M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 1a6 6 0 1 0 0 12 6 6 0 0 0 0-12z",
              opacity: ".3",
            }),
            W("path", {
              d: "M12 12a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
            })
          )
        );
      };
      Q.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
      };
      var K = (function (a) {
        function e() {
          var a;
          Object(i.a)(this, e);
          for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
            r[o] = arguments[o];
          return (
            (a = H(this, e, [].concat(r))),
            Object(p.a)(
              a,
              "query",
              new URLSearchParams(window.location.search)
            ),
            Object(p.a)(a, "state", {
              loading: !0,
              user: {},
              subscription: {},
            }),
            Object(p.a)(a, "query", P()),
            Object(p.a)(a, "products", [
              {
                title: g.a.s("pro.billMonthly"),
                short: g.a.s("pro.monthly"),
                value: N.a.products[0],
              },
              {
                title: g.a.s("pro.billYearly"),
                short: g.a.s("pro.yearly"),
                value: N.a.products[1],
              },
            ]),
            Object(p.a)(a, "onProductChange", function (e) {
              a.props.fs.select(e);
            }),
            Object(p.a)(a, "onSubscribeClick", function (e) {
              if (!a.state.user.logged) return !0;
              e.preventDefault(),
                (a.state.subscription.plan &&
                  "legacy" != a.state.subscription.plan) ||
                  a.props.fs.checkout(a.state.user.user);
            }),
            Object(p.a)(a, "onPurchase", function () {
              h.a.push("/pro/success");
            }),
            Object(p.a)(a, "tooltip", {
              essential: function () {
                return W(
                  "ul",
                  null,
                  W("li", null, "Search"),
                  W("li", null, "Edit titles, add descriptions, and tags"),
                  W("li", null, "Batch move, delete, add tags, etc"),
                  W("li", null, "Preview articles, images and videos"),
                  W("li", null, "Import and export")
                );
              },
              share: function () {
                return W(
                  "div",
                  null,
                  "Your bookmarks are ",
                  W("u", null, "private by default"),
                  ", but you have opt-in features:",
                  W(
                    "ul",
                    null,
                    W(
                      "li",
                      null,
                      "Enable access to specific collection(s) by public URL"
                    ),
                    W(
                      "li",
                      null,
                      "Invite friends and colleagues to collaborate on specific collection(s)"
                    )
                  )
                );
              },
            }),
            Object(p.a)(a, "renderSubscribeButton", function () {
              return a.state.subscription.plan &&
                "legacy" != a.state.subscription.plan
                ? W(
                    x.a.Fragment,
                    null,
                    W(
                      "div",
                      { className: f.a.method },
                      W(
                        G.b,
                        {
                          "data-size": "big",
                          className: f.a.button,
                          href: "",
                          disabled: !0,
                        },
                        g.a.s("pro.already")
                      )
                    ),
                    W(
                      "div",
                      { className: f.a.info },
                      W(
                        "div",
                        null,
                        W(
                          "a",
                          { href: a.state.subscription.links.manage },
                          "Manage your subscription"
                        )
                      )
                    )
                  )
                : W(
                    x.a.Fragment,
                    null,
                    W(
                      "div",
                      { className: f.a.method },
                      W(
                        G.b,
                        {
                          "data-appearance": "primary",
                          "data-size": "big",
                          className: f.a.button + " " + f.a.accent,
                          disabled: a.state.loading,
                          href:
                            z.a.login +
                            "?redirect=" +
                            encodeURIComponent(
                              z.a.home + a.props.router.asPath
                            ),
                          onClick: a.onSubscribeClick,
                        },
                        g.a.s("pro.subscribe")
                      )
                    ),
                    W(
                      "div",
                      { className: f.a.info },
                      W(
                        "div",
                        null,
                        "Billed as ",
                        a.props.fs.renderPrice(),
                        " ",
                        a.props.fs.active.includes("monthly")
                          ? g.a.s("pro.monthly")
                          : g.a.s("yearly"),
                        " (auto-renewal)"
                      )
                    )
                  );
            }),
            Object(p.a)(a, "renderPricing", function () {
              return W(
                B.a,
                null,
                W(
                  "div",
                  { className: f.a.plans },
                  W(
                    "div",
                    { className: f.a.leftSide },
                    W("h1", null, g.a.s("pro.simplePricing")),
                    W(
                      "div",
                      { className: f.a.configure },
                      W(R, {
                        className: f.a.radio,
                        value: a.props.fs.active,
                        options: a.products,
                        onChange: a.onProductChange,
                      }),
                      W(
                        "div",
                        {
                          className: f.a.saveDiscount,
                          "data-active": a.props.fs.active == N.a.products[1],
                          onClick: function () {
                            return a.onProductChange(N.a.products[1]);
                          },
                        },
                        W("p", null, "-20%")
                      )
                    ),
                    W(
                      "div",
                      { className: f.a.plan + " " + f.a.free },
                      W(
                        "div",
                        { className: f.a.planWrap },
                        W(J, { className: f.a.freePattern }),
                        W(
                          "div",
                          { className: f.a.content },
                          W("h3", null, g.a.s("pro.free")),
                          W(
                            "div",
                            { className: f.a.bigPrice },
                            W("sup", null, "$"),
                            W("span", null, "0")
                          ),
                          W(
                            "ul",
                            { className: f.a.features },
                            W(
                              "li",
                              null,
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.unlimitedBookmarks")
                              )
                            ),
                            W(
                              "li",
                              null,
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.unlimitedCollections")
                              )
                            ),
                            W(
                              "li",
                              null,
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.unlimitedHighlights")
                              )
                            ),
                            W(
                              "li",
                              null,
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.unlimitedDevices")
                              )
                            ),
                            W(
                              q.a,
                              {
                                tagName: "li",
                                content: g.a.s("pro.integrationsD"),
                              },
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.integrations"),
                                " ",
                                W(Q, { className: f.a.infoIcon })
                              )
                            ),
                            W(
                              "li",
                              null,
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.apps")
                              )
                            ),
                            W(
                              q.a,
                              { tagName: "li", content: a.tooltip.share() },
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.shareCollaborate"),
                                " ",
                                W(Q, { className: f.a.infoIcon })
                              )
                            ),
                            W(
                              "li",
                              null,
                              W(Z, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.uploadFree")
                              )
                            ),
                            W(
                              q.a,
                              { tagName: "li", content: a.tooltip.essential() },
                              W($, { className: f.a.check }),
                              W(
                                "span",
                                { className: f.a.label },
                                g.a.s("pro.allEssentialFeatures"),
                                " ",
                                W(Q, { className: f.a.infoIcon })
                              )
                            )
                          )
                        )
                      )
                    )
                  ),
                  W(
                    "div",
                    { className: f.a.plan + " " + f.a.pro },
                    W(
                      "div",
                      { className: f.a.planWrap },
                      W(X, { className: f.a.pageSheet }),
                      W(
                        "div",
                        { className: f.a.content },
                        W(
                          "h3",
                          null,
                          g.a.s("pro.pro"),
                          " ",
                          y.a.find(a.products, function (e) {
                            return e.value == a.props.fs.active;
                          }).short
                        ),
                        W(
                          "div",
                          { className: f.a.proPrice },
                          W(
                            "div",
                            { className: f.a.bigPrice },
                            a.props.fs.renderPrice(),
                            a.props.fs.hasVat &&
                              W("div", { className: f.a.vat }, "VAT inc.")
                          ),
                          W("div", { className: f.a.image }, W(L.a, t("BSy2")))
                        ),
                        W(
                          "ul",
                          { className: f.a.features },
                          W(
                            "li",
                            null,
                            W($, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label + " " + f.a.important },
                              g.a.s("pro.everythingOnFree")
                            )
                          ),
                          W(
                            q.a,
                            {
                              tagName: "li",
                              content: g.a.s("pro.aiSuggestionsD"),
                            },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.aiSuggestions"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            q.a,
                            {
                              tagName: "li",
                              content: g.a.s("pro.fullTextSearchD"),
                            },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.fullTextSearch"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            q.a,
                            {
                              tagName: "li",
                              content: g.a.s("pro.permanentLibraryD"),
                            },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.permanentLibrary"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            q.a,
                            { tagName: "li", content: g.a.s("pro.remindersD") },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.reminders"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            q.a,
                            {
                              tagName: "li",
                              content: g.a.s("pro.annotationsD"),
                            },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.annotations"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            q.a,
                            {
                              tagName: "li",
                              content:
                                g.a.s("pro.brokenLinksD") +
                                "\n" +
                                g.a.s("pro.duplicatesD"),
                            },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.duplicatesNbroken"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            q.a,
                            {
                              tagName: "li",
                              content: g.a.s("pro.automaticBackupsD"),
                            },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.automaticBackups"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            q.a,
                            { tagName: "li", content: g.a.s("pro.uploadD") },
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.upload"),
                              " ",
                              W(Q, { className: f.a.infoIcon })
                            )
                          ),
                          W(
                            "li",
                            null,
                            W(Z, { className: f.a.check }),
                            W("span", {
                              className: f.a.label,
                              dangerouslySetInnerHTML: {
                                __html: g.a.s("pro.prioritySupport", {
                                  link: "<a href='mailto:info@raindrop.io'>$1</a>",
                                }),
                              },
                            })
                          ),
                          W(
                            "li",
                            null,
                            W(Z, { className: f.a.check }),
                            W(
                              "span",
                              { className: f.a.label },
                              g.a.s("pro.enabledAllPlatforms")
                            )
                          ),
                          W(
                            "li",
                            { className: f.a.learnMore },
                            W(
                              "a",
                              {
                                href: z.a.help.premium_features,
                                target: "_blank",
                                className: f.a.label,
                              },
                              g.a.s("learnMore"),
                              "\u2026"
                            )
                          )
                        ),
                        a.renderSubscribeButton()
                      )
                    )
                  )
                )
              );
            }),
            a
          );
        }
        return (
          Object(u.a)(e, a),
          Object(l.a)(e, [
            {
              key: "componentDidMount",
              value: (function () {
                var a = Object(o.a)(
                  Y().m(function a() {
                    var e, t, n, o;
                    return Y().w(
                      function (a) {
                        for (;;)
                          switch (a.n) {
                            case 0:
                              return (
                                (a.n = 1),
                                Promise.all([Object(O.a)(), Object(O.b)()])
                              );
                            case 1:
                              (e = a.v),
                                (t = r(e, 2)),
                                (n = t[0]),
                                (o = t[1]),
                                this.setState({
                                  user: n,
                                  subscription: o,
                                  loading: !1,
                                }),
                                this.props.fs.onPurchase(this.onPurchase);
                            case 2:
                              return a.a(2);
                          }
                      },
                      a,
                      this
                    );
                  })
                );
                return function () {
                  return a.apply(this, arguments);
                };
              })(),
            },
            {
              key: "render",
              value: function () {
                return W(
                  S.a,
                  null,
                  W(
                    _.a,
                    { active: "pricing" },
                    W(
                      "title",
                      null,
                      g.a.s("pro.pricing"),
                      " \u2014 Raindrop.io"
                    )
                  ),
                  this.renderPricing(),
                  W("div", { className: f.a.twitter }, W(L.a, t("pCuV"))),
                  W(U.default, null),
                  W(I.a, null)
                );
              },
            },
          ])
        );
      })(x.a.PureComponent);
      e.default = Object(d.withRouter)(
        Object(j.b)(K, N.a.products, N.a.products[1])
      );
    },
    BSy2: function (a, e) {
      a.exports = {
        srcSet:
          "/_next/static/images/pro-192-84c0d48ca6448c3b179d9c4918632d15.png 192w,/_next/static/images/pro-384-6b277e7bada33ad586465c3315620445.png 384w",
        images: [
          {
            path: "/_next/static/images/pro-192-84c0d48ca6448c3b179d9c4918632d15.png",
            width: 192,
            height: 180,
          },
          {
            path: "/_next/static/images/pro-384-6b277e7bada33ad586465c3315620445.png",
            width: 384,
            height: 360,
          },
        ],
        src: "/_next/static/images/pro-192-84c0d48ca6448c3b179d9c4918632d15.png",
        toString: function () {
          return "/_next/static/images/pro-192-84c0d48ca6448c3b179d9c4918632d15.png";
        },
        placeholder: void 0,
        width: 192,
        height: 180,
      };
    },
    GPu0: function (a, e) {
      a.exports = {
        srcSet:
          "/_next/static/images/logotype-30-e945fa61f37ace825a8ee2586bf481f6.png 30w,/_next/static/images/logotype-60-73ba67bc4d66d42ef20d908a2e0c5322.png 60w",
        images: [
          {
            path: "/_next/static/images/logotype-30-e945fa61f37ace825a8ee2586bf481f6.png",
            width: 30,
            height: 30,
          },
          {
            path: "/_next/static/images/logotype-60-73ba67bc4d66d42ef20d908a2e0c5322.png",
            width: 60,
            height: 60,
          },
        ],
        src: "/_next/static/images/logotype-30-e945fa61f37ace825a8ee2586bf481f6.png",
        toString: function () {
          return "/_next/static/images/logotype-30-e945fa61f37ace825a8ee2586bf481f6.png";
        },
        placeholder: void 0,
        width: 30,
        height: 30,
      };
    },
    Olp5: function (a, e, t) {
      "use strict";
      t.d(e, "a", function () {
        return w;
      });
      var n = t("wx14"),
        r = t("Ff2n"),
        o = t("1OyB"),
        i = t("vuIU"),
        l = t("md7G"),
        c = t("foSv"),
        s = t("Ji7U"),
        u = t("rePB"),
        p = t("q1tI"),
        m = t.n(p),
        f = t("i8i4"),
        d = t.n(f),
        h = t("qNV+"),
        b = t.n(h),
        g = ["tagName", "content", "children", "className"],
        v = m.a.createElement;
      function y(a, e, t) {
        return (
          (e = Object(c.a)(e)),
          Object(l.a)(
            a,
            (function () {
              try {
                var a = !Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                );
              } catch (a) {}
              return (function () {
                return !!a;
              })();
            })()
              ? Reflect.construct(e, t || [], Object(c.a)(a).constructor)
              : e.apply(a, t)
          )
        );
      }
      var w = (function (a) {
        function e() {
          var a;
          Object(o.a)(this, e);
          for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
            n[r] = arguments[r];
          return (
            (a = y(this, e, [].concat(n))),
            Object(u.a)(a, "el", void 0),
            Object(u.a)(a, "state", { status: "", style: {} }),
            Object(u.a)(a, "_timeout", null),
            Object(u.a)(a, "onMouseMove", function (e) {
              var t = e.pageX,
                n = e.pageY;
              clearTimeout(a._timeout),
                t + 300 > window.innerWidth && (t = window.innerWidth - 300),
                a.setState({
                  status: "show",
                  style: {
                    left: t - window.scrollX + "px",
                    top: n - window.scrollY + "px",
                  },
                });
            }),
            Object(u.a)(a, "onMouseLeave", function () {
              a.setState({ status: "hiding" }, function () {
                clearTimeout(a._timeout),
                  (a._timeout = setTimeout(function () {
                    return a.setState({ status: "" });
                  }, 150));
              });
            }),
            Object(u.a)(a, "renderTooltip", function () {
              return (
                a.state.status &&
                d.a.createPortal(
                  v(
                    "div",
                    {
                      className: b.a.tooltip,
                      "data-status": a.state.status,
                      style: a.state.style,
                    },
                    a.props.content
                  ),
                  a.el
                )
              );
            }),
            a
          );
        }
        return (
          Object(s.a)(e, a),
          Object(i.a)(e, [
            {
              key: "componentDidMount",
              value: function () {
                this.el = document.getElementById("portals");
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                clearTimeout(this._timeout);
              },
            },
            {
              key: "render",
              value: function () {
                var a = this.props,
                  e = a.tagName,
                  t = void 0 === e ? "div" : e,
                  o = (a.content, a.children),
                  i = a.className,
                  l = Object(r.a)(a, g);
                return v(
                  t,
                  Object(n.a)(
                    { className: (i ? i + " " : "") + b.a.elementWithTooltip },
                    l,
                    {
                      onMouseMove: this.onMouseMove,
                      onMouseLeave: this.onMouseLeave,
                    }
                  ),
                  o,
                  this.renderTooltip()
                );
              },
            },
          ])
        );
      })(m.a.PureComponent);
    },
    V9AI: function (a, e, t) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/pro/buy",
        function () {
          return t("8QRZ");
        },
      ]);
    },
    YYK4: function (a, e, t) {
      "use strict";
      t.d(e, "a", function () {
        return y;
      }),
        t.d(e, "b", function () {
          return w;
        });
      var n = t("wx14"),
        r = t("1OyB"),
        o = t("vuIU"),
        i = t("md7G"),
        l = t("foSv"),
        c = t("Ji7U"),
        s = t("rePB"),
        u = t("q1tI"),
        p = t.n(u),
        m = t("djLo"),
        f = p.a.createElement;
      function d(a, e) {
        var t =
          ("undefined" != typeof Symbol && a[Symbol.iterator]) ||
          a["@@iterator"];
        if (!t) {
          if (
            Array.isArray(a) ||
            (t = (function (a, e) {
              if (a) {
                if ("string" == typeof a) return h(a, e);
                var t = {}.toString.call(a).slice(8, -1);
                return (
                  "Object" === t && a.constructor && (t = a.constructor.name),
                  "Map" === t || "Set" === t
                    ? Array.from(a)
                    : "Arguments" === t ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                    ? h(a, e)
                    : void 0
                );
              }
            })(a)) ||
            (e && a && "number" == typeof a.length)
          ) {
            t && (a = t);
            var n = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return n >= a.length
                  ? { done: !0 }
                  : { done: !1, value: a[n++] };
              },
              e: function (a) {
                throw a;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          i = !0,
          l = !1;
        return {
          s: function () {
            t = t.call(a);
          },
          n: function () {
            var a = t.next();
            return (i = a.done), a;
          },
          e: function (a) {
            (l = !0), (o = a);
          },
          f: function () {
            try {
              i || null == t.return || t.return();
            } finally {
              if (l) throw o;
            }
          },
        };
      }
      function h(a, e) {
        (null == e || e > a.length) && (e = a.length);
        for (var t = 0, n = Array(e); t < e; t++) n[t] = a[t];
        return n;
      }
      function b(a, e) {
        var t = Object.keys(a);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(a);
          e &&
            (n = n.filter(function (e) {
              return Object.getOwnPropertyDescriptor(a, e).enumerable;
            })),
            t.push.apply(t, n);
        }
        return t;
      }
      function g(a) {
        for (var e = 1; e < arguments.length; e++) {
          var t = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? b(Object(t), !0).forEach(function (e) {
                Object(s.a)(a, e, t[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t))
            : b(Object(t)).forEach(function (e) {
                Object.defineProperty(
                  a,
                  e,
                  Object.getOwnPropertyDescriptor(t, e)
                );
              });
        }
        return a;
      }
      function v(a, e, t) {
        return (
          (e = Object(l.a)(e)),
          Object(i.a)(
            a,
            (function () {
              try {
                var a = !Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                );
              } catch (a) {}
              return (function () {
                return !!a;
              })();
            })()
              ? Reflect.construct(e, t || [], Object(l.a)(a).constructor)
              : e.apply(a, t)
          )
        );
      }
      function y() {
        return f("script", {
          id: "fsc-api",
          src: "https://sbl.onfastspring.com/sbl/0.9.5/fastspring-builder.min.js",
          type: "text/javascript",
          "data-storefront": m.a.storefront.popup,
          "data-popup-closed": "fsPopupClose",
        });
      }
      function w(a) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          t = arguments.length > 2 ? arguments[2] : void 0;
        return (function (i) {
          function l() {
            var a;
            Object(r.a)(this, l);
            for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++)
              n[o] = arguments[o];
            return (
              (a = v(this, l, [].concat(n))),
              Object(s.a)(a, "state", {
                active: t,
                hasVat: !1,
                products: {},
                select: function (e) {
                  a.setState({ active: e });
                },
                checkout: function () {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    t = e._id,
                    n = e.email,
                    r = void 0 === n ? "" : n,
                    o = e.fullName,
                    i = void 0 === o ? "" : o,
                    l = {};
                  try {
                    l = {
                      firstName: i.split(" ")[0],
                      lastName: i.split(" ")[1],
                    };
                  } catch (c) {}
                  fastspring.builder.reset(),
                    fastspring.builder.add(a.state.active),
                    fastspring.builder.recognize(g(g({}, l), {}, { email: r })),
                    fastspring.builder.tag({ userId: t }),
                    fastspring.builder.checkout();
                },
                onPurchase: function (a) {
                  window.fsPopupClose = function (e) {
                    e && a(e);
                  };
                },
                getPrice: function () {
                  return a
                    .getPriceParts()
                    .map(function (a) {
                      return a.value;
                    })
                    .join("");
                },
                renderPrice: function () {
                  return a.getPriceParts().map(function (a, e) {
                    var t = "span";
                    switch (a.type) {
                      case "currency":
                        t = "sup";
                        break;
                      case "decimal":
                      case "fraction":
                        t = "slot";
                    }
                    return f(t, { key: e }, a.value);
                  });
                },
              }),
              Object(s.a)(a, "getPriceParts", function () {
                var e = a.state.products[a.state.active] || {},
                  t = e.price,
                  n = void 0 === t ? 0 : t,
                  r = e.language,
                  o = void 0 === r ? "" : r,
                  i = e.currency,
                  l = void 0 === i ? "" : i;
                try {
                  return new Intl.NumberFormat(
                    o,
                    g(
                      { style: "currency", currency: l },
                      n % 1 === 0
                        ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
                        : {}
                    )
                  ).formatToParts(n);
                } catch (c) {}
                return [{ type: "currency", value: l }, { value: n || "\xb7" }];
              }),
              Object(s.a)(a, "onProductsLoad", function (e) {
                var t,
                  n = e.currency,
                  r = e.taxValue,
                  o = e.language,
                  i = e.groups,
                  l = {},
                  c = d(void 0 === i ? [] : i);
                try {
                  for (c.s(); !(t = c.n()).done; ) {
                    var s,
                      u = d(t.value.items);
                    try {
                      for (u.s(); !(s = u.n()).done; ) {
                        var p = s.value;
                        l[p.path] = {
                          price: p.priceTotalValue,
                          currency: n,
                          language: o,
                        };
                      }
                    } catch (m) {
                      u.e(m);
                    } finally {
                      u.f();
                    }
                  }
                } catch (m) {
                  c.e(m);
                } finally {
                  c.f();
                }
                a.setState({ products: l, hasVat: !!r });
              }),
              a
            );
          }
          return (
            Object(c.a)(l, i),
            Object(o.a)(l, [
              {
                key: "componentDidMount",
                value: function () {
                  fastspring.builder.reset(),
                    fastspring.builder.push(
                      {
                        reset: !0,
                        products: e.map(function (a) {
                          return { path: a, quantity: 1 };
                        }),
                      },
                      this.onProductsLoad
                    );
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  window.fsPopupClose = void 0;
                },
              },
              {
                key: "render",
                value: function () {
                  return f(a, Object(n.a)({}, this.props, { fs: this.state }));
                },
              },
            ])
          );
        })(p.a.PureComponent);
      }
    },
    di54: function (a, e, t) {
      a.exports = {
        layout: "layout2ACP",
        footer: "footerSy6B",
        copy: "copy2CzI",
        logo: "logo1Thp",
        about: "about1uw1",
        twitterIcon: "twitterIcon1g61",
      };
    },
    djLo: function (a, e, t) {
      "use strict";
      e.a = {
        storefront: { popup: "raindrop.onfastspring.com/popup-raindrop" },
        products: ["promonthly1", "proannual1"],
      };
    },
    pCuV: function (a, e) {
      a.exports = {
        srcSet:
          "/_next/static/images/twitter-1162-9daa791a9b7dbf26abf345ceb681a395.png 1162w,/_next/static/images/twitter-2324-f097a97f4e7d0670da4118b58a32b4a8.png 2324w",
        images: [
          {
            path: "/_next/static/images/twitter-1162-9daa791a9b7dbf26abf345ceb681a395.png",
            width: 1162,
            height: 458,
          },
          {
            path: "/_next/static/images/twitter-2324-f097a97f4e7d0670da4118b58a32b4a8.png",
            width: 2324,
            height: 916,
          },
        ],
        src: "/_next/static/images/twitter-1162-9daa791a9b7dbf26abf345ceb681a395.png",
        toString: function () {
          return "/_next/static/images/twitter-1162-9daa791a9b7dbf26abf345ceb681a395.png";
        },
        placeholder: void 0,
        width: 1162,
        height: 458,
      };
    },
    vq74: function (a, e, t) {
      "use strict";
      t.r(e);
      var n = t("q1tI"),
        r = t.n(n),
        o = t("6tMI"),
        i = t.n(o),
        l = t("Fsgp"),
        c = r.a.createElement;
      e.default = function (a) {
        var e = a.frame;
        return c(
          l.a,
          null,
          c(
            "div",
            { className: i.a.faq },
            c("h1", null, "FAQ"),
            c("h5", null, "Can I use Raindrop.io for free?"),
            c(
              "p",
              null,
              "Absolutely! Raindrop.io is completely free to use indefinitely.",
              c("br", null),
              "You can use it on unlimited devices and create unlimited bookmarks and collections in all plans."
            ),
            c("h5", null, "How is the Pro plan different from the Free?"),
            c(
              "p",
              null,
              "In short you will have full-text search, permanent copies of your bookmarks, more space for uploads, cloud backup and tools to keep your bookmarks clean."
            ),
            c(
              "h5",
              null,
              "Can I collaborate with other people without paying?"
            ),
            c("p", null, "Of course!"),
            c("h5", null, "Do you have monthly and yearly billing options?"),
            c(
              "p",
              null,
              "Yes! We offer either monthly or yearly billing options. The yearly billing option is always cheaper (usually ~20% discount)."
            ),
            !e &&
              c(
                r.a.Fragment,
                null,
                c(
                  "h5",
                  null,
                  "How is the payment being processed? Can I pay with Paypal?"
                ),
                c(
                  "p",
                  null,
                  "We handle billing via ",
                  c(
                    "a",
                    { href: "https://fastspring.com", target: "_blank" },
                    "FastSpring"
                  ),
                  ". It's the same payment provider used in companies such as Adobe, Sketch, DaisyDisk and other. We do not handle your credit card information directly.",
                  c("br", null),
                  "Paypal is fully supported, select it as your payment method on checkout."
                )
              ),
            c("h5", null, "What happens if I cancel my paid plan?"),
            c(
              "p",
              null,
              "When you cancel your plan, you will remain on the plan until the end of your billing cycle, at which time the plan will be canceled."
            ),
            c("h5", null, "Do you offer refunds?"),
            c(
              "p",
              null,
              "30-day money back guarantee. To do this, please ",
              c("a", { href: "mailto:info@raindrop.io" }, "contact us"),
              "."
            ),
            c(
              "h5",
              null,
              "What happens if my payment fails? E.g. an expired credit card."
            ),
            c(
              "p",
              null,
              "Your account email will be notified after each failed payment. Payments may be retried up to 4 times within the next week. After this, if the payment did not succeed, you will be downgraded to the Free plan."
            )
          )
        );
      };
    },
  },
  [["V9AI", 0, 1, 7, 3, 4, 5, 2]],
]);
