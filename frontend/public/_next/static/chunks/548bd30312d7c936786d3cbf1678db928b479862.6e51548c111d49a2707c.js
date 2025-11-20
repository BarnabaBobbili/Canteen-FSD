(window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [4],
  {
    "+jAA": function (e, t, n) {
      "use strict";
      n.d(t, "c", function () {
        return u;
      }),
        n.d(t, "a", function () {
          return s;
        }),
        n.d(t, "b", function () {
          return l;
        });
      var r,
        o = n("HaE+"),
        a = (n("LpSC"), { endpoint: "https://api.raindrop.io/v1" });
      function i() {
        var e,
          t,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.toStringTag || "@@toStringTag";
        function a(n, r, o, a) {
          var i = r && r.prototype instanceof s ? r : s,
            l = Object.create(i.prototype);
          return (
            c(
              l,
              "_invoke",
              (function (n, r, o) {
                var a,
                  i,
                  c,
                  s = 0,
                  l = o || [],
                  p = !1,
                  f = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, n) {
                      return (a = t), (i = 0), (c = e), (f.n = n), u;
                    },
                  };
                function d(n, r) {
                  for (
                    i = n, c = r, t = 0;
                    !p && s && !o && t < l.length;
                    t++
                  ) {
                    var o,
                      a = l[t],
                      d = f.p,
                      h = a[2];
                    n > 3
                      ? (o = h === r) &&
                        ((c = a[(i = a[4]) ? 5 : ((i = 3), 3)]),
                        (a[4] = a[5] = e))
                      : a[0] <= d &&
                        ((o = n < 2 && d < a[1])
                          ? ((i = 0), (f.v = r), (f.n = a[1]))
                          : d < h &&
                            (o = n < 3 || a[0] > r || r > h) &&
                            ((a[4] = n), (a[5] = r), (f.n = h), (i = 0)));
                  }
                  if (o || n > 1) return u;
                  throw ((p = !0), r);
                }
                return function (o, l, h) {
                  if (s > 1) throw TypeError("Generator is already running");
                  for (
                    p && 1 === l && d(l, h), i = l, c = h;
                    (t = i < 2 ? e : c) || !p;

                  ) {
                    a ||
                      (i
                        ? i < 3
                          ? (i > 1 && (f.n = -1), d(i, c))
                          : (f.n = c)
                        : (f.v = c));
                    try {
                      if (((s = 2), a)) {
                        if ((i || (o = "next"), (t = a[o]))) {
                          if (!(t = t.call(a, c)))
                            throw TypeError("iterator result is not an object");
                          if (!t.done) return t;
                          (c = t.value), i < 2 && (i = 0);
                        } else
                          1 === i && (t = a.return) && t.call(a),
                            i < 2 &&
                              ((c = TypeError(
                                "The iterator does not provide a '" +
                                  o +
                                  "' method"
                              )),
                              (i = 1));
                        a = e;
                      } else if ((t = (p = f.n < 0) ? c : n.call(r, f)) !== u)
                        break;
                    } catch (t) {
                      (a = e), (i = 1), (c = t);
                    } finally {
                      s = 1;
                    }
                  }
                  return { value: t, done: p };
                };
              })(n, o, a),
              !0
            ),
            l
          );
        }
        var u = {};
        function s() {}
        function l() {}
        function p() {}
        t = Object.getPrototypeOf;
        var f = [][r]
            ? t(t([][r]()))
            : (c((t = {}), r, function () {
                return this;
              }),
              t),
          d = (p.prototype = s.prototype = Object.create(f));
        function h(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, p)
              : ((e.__proto__ = p), c(e, o, "GeneratorFunction")),
            (e.prototype = Object.create(d)),
            e
          );
        }
        return (
          (l.prototype = p),
          c(d, "constructor", p),
          c(p, "constructor", l),
          (l.displayName = "GeneratorFunction"),
          c(p, o, "GeneratorFunction"),
          c(d),
          c(d, o, "Generator"),
          c(d, r, function () {
            return this;
          }),
          c(d, "toString", function () {
            return "[object Generator]";
          }),
          (i = function () {
            return { w: a, m: h };
          })()
        );
      }
      function c(e, t, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, "", {});
        } catch (e) {
          o = 0;
        }
        (c = function (e, t, n, r) {
          function a(t, n) {
            c(e, t, function (e) {
              return this._invoke(t, n, e);
            });
          }
          t
            ? o
              ? o(e, t, {
                  value: n,
                  enumerable: !r,
                  configurable: !r,
                  writable: !r,
                })
              : (e[t] = n)
            : (a("next", 0), a("throw", 1), a("return", 2));
        })(e, t, n, r);
      }
      var u = function () {
          if (r) return r.logged;
          try {
            return !(!localStorage || !localStorage.getItem("logged"));
          } catch (e) {}
          return !1;
        },
        s = (function () {
          var e = Object(o.a)(
            i().m(function e() {
              var t;
              return i().w(
                function (e) {
                  for (;;)
                    switch ((e.p = e.n)) {
                      case 0:
                        if (!r) {
                          e.n = 1;
                          break;
                        }
                        return e.a(2, r);
                      case 1:
                        return (
                          (t = {}),
                          (e.p = 2),
                          (e.n = 3),
                          fetch("".concat(a.endpoint, "/user"), {
                            credentials: "include",
                          })
                        );
                      case 3:
                        return (e.n = 4), e.v.json();
                      case 4:
                        (t = e.v), (e.n = 6);
                        break;
                      case 5:
                        (e.p = 5), e.v;
                      case 6:
                        if (!t.result) {
                          e.n = 7;
                          break;
                        }
                        return (
                          localStorage && localStorage.setItem("logged", 1),
                          (r = { logged: !0, user: t.user }),
                          e.a(2, r)
                        );
                      case 7:
                        return (
                          localStorage && localStorage.removeItem("logged"),
                          e.a(2, { logged: !1, user: {} })
                        );
                    }
                },
                e,
                null,
                [[2, 5]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        l = (function () {
          var e = Object(o.a)(
            i().m(function e() {
              var t;
              return i().w(
                function (e) {
                  for (;;)
                    switch ((e.p = e.n)) {
                      case 0:
                        return (
                          (t = {}),
                          (e.p = 1),
                          (e.n = 2),
                          fetch("".concat(a.endpoint, "/user/subscription"), {
                            credentials: "include",
                          })
                        );
                      case 2:
                        return (e.n = 3), e.v.json();
                      case 3:
                        (t = e.v), (e.n = 5);
                        break;
                      case 4:
                        (e.p = 4), e.v;
                      case 5:
                        if (!t.result) {
                          e.n = 6;
                          break;
                        }
                        return e.a(2, t);
                      case 6:
                        return e.a(2, {});
                      case 7:
                        return e.a(2);
                    }
                },
                e,
                null,
                [[1, 4]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })();
    },
    "/0+H": function (e, t, n) {
      "use strict";
      (t.__esModule = !0),
        (t.isInAmpMode = i),
        (t.useAmp = function () {
          return i(o.default.useContext(a.AmpStateContext));
        });
      var r,
        o = (r = n("q1tI")) && r.__esModule ? r : { default: r },
        a = n("lwAK");
      function i() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.ampFirst,
          n = void 0 !== t && t,
          r = e.hybrid,
          o = void 0 !== r && r,
          a = e.hasQuery,
          i = void 0 !== a && a;
        return n || (o && i);
      }
    },
    "1OyB": function (e, t, n) {
      "use strict";
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      n.d(t, "a", function () {
        return r;
      });
    },
    "2qfT": function (e, t, n) {
      "use strict";
      var r = n("q1tI"),
        o = n.n(r),
        a = n("qXeB"),
        i = n.n(a),
        c = n("1OyB"),
        u = n("vuIU"),
        s = n("md7G"),
        l = n("foSv"),
        p = n("Ji7U"),
        f = n("rePB"),
        d = n("SG3g"),
        h = n.n(d),
        v = n("b132"),
        m = o.a.createElement;
      function g(e, t, n) {
        return (
          (t = Object(l.a)(t)),
          Object(s.a)(
            e,
            (function () {
              try {
                var e = !Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                );
              } catch (e) {}
              return (function () {
                return !!e;
              })();
            })()
              ? Reflect.construct(t, n || [], Object(l.a)(e).constructor)
              : t.apply(e, n)
          )
        );
      }
      var b = (function (e) {
          function t() {
            var e;
            Object(c.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              (e = g(this, t, [].concat(r))),
              Object(f.a)(e, "state", { show: !1 }),
              Object(f.a)(e, "yes", function (t) {
                t.preventDefault(),
                  localStorage && localStorage.setItem("cookie", "yes"),
                  e.setState({ show: !1 });
              }),
              Object(f.a)(e, "no", function (t) {
                t.preventDefault(),
                  localStorage && localStorage.setItem("cookie", "no"),
                  e.setState({ show: !1 });
              }),
              e
            );
          }
          return (
            Object(p.a)(t, e),
            Object(u.a)(t, [
              {
                key: "componentDidMount",
                value: function () {
                  try {
                    localStorage &&
                      localStorage.getItem("cookie") &&
                      this.setState({ show: !1 });
                  } catch (e) {}
                },
              },
              {
                key: "render",
                value: function () {
                  return (
                    !!this.state.show &&
                    m(
                      "div",
                      { className: h.a.cookie },
                      m("p", { className: h.a.title }, "Can we store cookies?"),
                      m(
                        v.b,
                        {
                          "data-appearance": "primary",
                          "data-size": "small",
                          href: "",
                          onClick: this.yes,
                        },
                        "Yes"
                      ),
                      m(
                        v.b,
                        { "data-size": "small", href: "", onClick: this.no },
                        "No"
                      )
                    )
                  );
                },
              },
            ])
          );
        })(o.a.Component),
        y = o.a.createElement;
      t.a = function (e) {
        var t = e.children,
          n = e.className,
          r = void 0 === n ? "" : n;
        return y("div", { className: i.a.page + " " + r }, t, y(b, null));
      };
    },
    "5HRt": function (e, t, n) {
      e.exports = {
        header: "header1jtx",
        toolbar: "toolbar2CHY",
        logo: "logoZTSe",
        nav: "nav4SBj",
        appnav: "appnav26r1",
        divider: "divider2KDO",
        hamburgerButton: "hamburgerButton1pOy",
      };
    },
    "7W2i": function (e, t, n) {
      var r = n("SksO");
      e.exports = function (e, t) {
        if ("function" !== typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && r(e, t);
      };
    },
    "8Kt/": function (e, t, n) {
      "use strict";
      n("lSNA");
      (t.__esModule = !0), (t.defaultHead = l), (t.default = void 0);
      var r,
        o = (function (e) {
          if (e && e.__esModule) return e;
          if (null === e || ("object" !== typeof e && "function" !== typeof e))
            return { default: e };
          var t = s();
          if (t && t.has(e)) return t.get(e);
          var n = {},
            r = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if (Object.prototype.hasOwnProperty.call(e, o)) {
              var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
              a && (a.get || a.set)
                ? Object.defineProperty(n, o, a)
                : (n[o] = e[o]);
            }
          (n.default = e), t && t.set(e, n);
          return n;
        })(n("q1tI")),
        a = (r = n("Xuae")) && r.__esModule ? r : { default: r },
        i = n("lwAK"),
        c = n("FYa8"),
        u = n("/0+H");
      function s() {
        if ("function" !== typeof WeakMap) return null;
        var e = new WeakMap();
        return (
          (s = function () {
            return e;
          }),
          e
        );
      }
      function l() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = [o.default.createElement("meta", { charSet: "utf-8" })];
        return (
          e ||
            t.push(
              o.default.createElement("meta", {
                name: "viewport",
                content: "width=device-width",
              })
            ),
          t
        );
      }
      function p(e, t) {
        return "string" === typeof t || "number" === typeof t
          ? e
          : t.type === o.default.Fragment
          ? e.concat(
              o.default.Children.toArray(t.props.children).reduce(function (
                e,
                t
              ) {
                return "string" === typeof t || "number" === typeof t
                  ? e
                  : e.concat(t);
              },
              [])
            )
          : e.concat(t);
      }
      var f = ["name", "httpEquiv", "charSet", "itemProp"];
      function d(e, t) {
        return e
          .reduce(function (e, t) {
            var n = o.default.Children.toArray(t.props.children);
            return e.concat(n);
          }, [])
          .reduce(p, [])
          .reverse()
          .concat(l(t.inAmpMode))
          .filter(
            (function () {
              var e = new Set(),
                t = new Set(),
                n = new Set(),
                r = {};
              return function (o) {
                var a = !0;
                if (
                  o.key &&
                  "number" !== typeof o.key &&
                  o.key.indexOf("$") > 0
                ) {
                  var i = o.key.slice(o.key.indexOf("$") + 1);
                  e.has(i) ? (a = !1) : e.add(i);
                }
                switch (o.type) {
                  case "title":
                  case "base":
                    t.has(o.type) ? (a = !1) : t.add(o.type);
                    break;
                  case "meta":
                    for (var c = 0, u = f.length; c < u; c++) {
                      var s = f[c];
                      if (o.props.hasOwnProperty(s))
                        if ("charSet" === s) n.has(s) ? (a = !1) : n.add(s);
                        else {
                          var l = o.props[s],
                            p = r[s] || new Set();
                          p.has(l) ? (a = !1) : (p.add(l), (r[s] = p));
                        }
                    }
                }
                return a;
              };
            })()
          )
          .reverse()
          .map(function (e, t) {
            var n = e.key || t;
            return o.default.cloneElement(e, { key: n });
          });
      }
      function h(e) {
        var t = e.children,
          n = (0, o.useContext)(i.AmpStateContext),
          r = (0, o.useContext)(c.HeadManagerContext);
        return o.default.createElement(
          a.default,
          {
            reduceComponentsToState: d,
            headManager: r,
            inAmpMode: (0, u.isInAmpMode)(n),
          },
          t
        );
      }
      h.rewind = function () {};
      var v = h;
      t.default = v;
    },
    "9nNC": function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return R;
      });
      var r = n("HaE+"),
        o = n("1OyB"),
        a = n("vuIU"),
        i = n("md7G"),
        c = n("foSv"),
        u = n("Ji7U"),
        s = n("rePB"),
        l = n("5HRt"),
        p = n.n(l),
        f = n("q1tI"),
        d = n.n(f),
        h = n("+jAA"),
        v = n("t/pG"),
        m = n.n(v),
        g = n("8Kt/"),
        b = n.n(g),
        y = d.a.createElement,
        w = function () {
          return y(
            b.a,
            null,
            y("meta", {
              name: "apple-itunes-app",
              content: "app-id=1021913807",
            }),
            y("meta", {
              name: "google-play-app",
              content: "app-id=io.raindrop.raindropio",
            }),
            y("link", {
              rel: "icon",
              href: n("voUO"),
              sizes: "16x16",
              type: "image/png",
            }),
            y("link", {
              rel: "icon",
              href: n("wB7i"),
              sizes: "32x32",
              type: "image/png",
            }),
            y("link", {
              rel: "icon",
              href: n("fMjQ"),
              sizes: "64x64",
              type: "image/png",
            }),
            y("link", {
              rel: "icon",
              href: n("bgmj"),
              sizes: "128x128",
              type: "image/png",
            }),
            y("link", { rel: "apple-touch-icon", href: n("bgmj") }),
            y("link", { rel: "icon", type: "image/svg+xml", href: n("SVUp") }),
            y("meta", { name: "twitter:card", content: "app" }),
            y("meta", { name: "twitter:site", content: "@raindrop_io" }),
            y("meta", {
              name: "twitter:description",
              content:
                "All in One Bookmark Manager. For your inspiration, read later, media and stuff.",
            }),
            y("meta", {
              name: "twitter:app:name:iphone",
              content: "Raindrop.io",
            }),
            y("meta", { name: "twitter:app:id:iphone", content: "1021913807" }),
            y("meta", {
              name: "twitter:app:name:ipad",
              content: "Raindrop.io",
            }),
            y("meta", { name: "twitter:app:id:ipad", content: "1021913807" }),
            y("meta", {
              name: "twitter:app:name:googleplay",
              content: "Raindrop.io",
            }),
            y("meta", {
              name: "twitter:app:id:googleplay",
              content: "io.raindrop.raindropio",
            }),
            y("meta", { name: "twitter:image", content: n("AxmM") }),
            y("meta", { property: "og:type", content: "product" }),
            y("meta", {
              property: "og:title",
              content: "Raindrop.io \u2014 All in One Bookmark Manager",
            }),
            y("meta", {
              property: "og:description",
              content: "For your inspiration, read later, media and stuff",
            }),
            y("meta", { property: "og:url", content: m.a.home }),
            y("meta", { property: "og:image", content: n("AxmM") }),
            y("meta", { property: "fb:app_id", content: "204807143019847" })
          );
        },
        O = n("YFqc"),
        j = n.n(O),
        k = n("Fsgp"),
        x = (n("S8Lw"), d.a.createElement);
      function _() {
        var e,
          t,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.toStringTag || "@@toStringTag";
        function a(n, r, o, a) {
          var u = r && r.prototype instanceof c ? r : c,
            s = Object.create(u.prototype);
          return (
            S(
              s,
              "_invoke",
              (function (n, r, o) {
                var a,
                  c,
                  u,
                  s = 0,
                  l = o || [],
                  p = !1,
                  f = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, n) {
                      return (a = t), (c = 0), (u = e), (f.n = n), i;
                    },
                  };
                function d(n, r) {
                  for (
                    c = n, u = r, t = 0;
                    !p && s && !o && t < l.length;
                    t++
                  ) {
                    var o,
                      a = l[t],
                      d = f.p,
                      h = a[2];
                    n > 3
                      ? (o = h === r) &&
                        ((u = a[(c = a[4]) ? 5 : ((c = 3), 3)]),
                        (a[4] = a[5] = e))
                      : a[0] <= d &&
                        ((o = n < 2 && d < a[1])
                          ? ((c = 0), (f.v = r), (f.n = a[1]))
                          : d < h &&
                            (o = n < 3 || a[0] > r || r > h) &&
                            ((a[4] = n), (a[5] = r), (f.n = h), (c = 0)));
                  }
                  if (o || n > 1) return i;
                  throw ((p = !0), r);
                }
                return function (o, l, h) {
                  if (s > 1) throw TypeError("Generator is already running");
                  for (
                    p && 1 === l && d(l, h), c = l, u = h;
                    (t = c < 2 ? e : u) || !p;

                  ) {
                    a ||
                      (c
                        ? c < 3
                          ? (c > 1 && (f.n = -1), d(c, u))
                          : (f.n = u)
                        : (f.v = u));
                    try {
                      if (((s = 2), a)) {
                        if ((c || (o = "next"), (t = a[o]))) {
                          if (!(t = t.call(a, u)))
                            throw TypeError("iterator result is not an object");
                          if (!t.done) return t;
                          (u = t.value), c < 2 && (c = 0);
                        } else
                          1 === c && (t = a.return) && t.call(a),
                            c < 2 &&
                              ((u = TypeError(
                                "The iterator does not provide a '" +
                                  o +
                                  "' method"
                              )),
                              (c = 1));
                        a = e;
                      } else if ((t = (p = f.n < 0) ? u : n.call(r, f)) !== i)
                        break;
                    } catch (t) {
                      (a = e), (c = 1), (u = t);
                    } finally {
                      s = 1;
                    }
                  }
                  return { value: t, done: p };
                };
              })(n, o, a),
              !0
            ),
            s
          );
        }
        var i = {};
        function c() {}
        function u() {}
        function s() {}
        t = Object.getPrototypeOf;
        var l = [][r]
            ? t(t([][r]()))
            : (S((t = {}), r, function () {
                return this;
              }),
              t),
          p = (s.prototype = c.prototype = Object.create(l));
        function f(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, s)
              : ((e.__proto__ = s), S(e, o, "GeneratorFunction")),
            (e.prototype = Object.create(p)),
            e
          );
        }
        return (
          (u.prototype = s),
          S(p, "constructor", s),
          S(s, "constructor", u),
          (u.displayName = "GeneratorFunction"),
          S(s, o, "GeneratorFunction"),
          S(p),
          S(p, o, "Generator"),
          S(p, r, function () {
            return this;
          }),
          S(p, "toString", function () {
            return "[object Generator]";
          }),
          (_ = function () {
            return { w: a, m: f };
          })()
        );
      }
      function S(e, t, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, "", {});
        } catch (e) {
          o = 0;
        }
        (S = function (e, t, n, r) {
          function a(t, n) {
            S(e, t, function (e) {
              return this._invoke(t, n, e);
            });
          }
          t
            ? o
              ? o(e, t, {
                  value: n,
                  enumerable: !r,
                  configurable: !r,
                  writable: !r,
                })
              : (e[t] = n)
            : (a("next", 0), a("throw", 1), a("return", 2));
        })(e, t, n, r);
      }
      function M(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function P(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? M(Object(n), !0).forEach(function (t) {
                Object(s.a)(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : M(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      }
      function E(e, t, n) {
        return (
          (t = Object(c.a)(t)),
          Object(i.a)(
            e,
            (function () {
              try {
                var e = !Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                );
              } catch (e) {}
              return (function () {
                return !!e;
              })();
            })()
              ? Reflect.construct(t, n || [], Object(c.a)(e).constructor)
              : t.apply(e, n)
          )
        );
      }
      var I = function (e) {
        return x(
          "svg",
          e,
          x("path", {
            fillRule: "evenodd",
            d: "M1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
            opacity: ".3",
          })
        );
      };
      I.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "2",
        height: "17",
        viewBox: "0 0 2 17",
      };
      var z = function (e) {
        return x(
          "svg",
          e,
          x("path", {
            fillRule: "evenodd",
            d: "M5.392 15c1.054.635 2.288 1 3.608 1 1.32 0 2.554-.365 3.608-1A6.967 6.967 0 0 0 9 14c-1.32 0-2.554.365-3.608 1zm-1.61-1.334A8.959 8.959 0 0 1 9 12c1.945 0 3.746.617 5.218 1.666a7 7 0 1 0-10.436 0zM9 18A9 9 0 1 1 9 0a9 9 0 0 1 0 18zm0-6c-1.657 0-3-1.79-3-4s1.343-4 3-4 3 1.79 3 4-1.343 4-3 4z",
          })
        );
      };
      z.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "18",
        height: "18",
        viewBox: "0 0 18 18",
      };
      var C = function (e) {
        return x(
          "svg",
          e,
          x("path", {
            d: "M14.25 6.25A4.257 4.257 0 0 0 10 2a4.249 4.249 0 0 0-4.17 3.497l-.232 1.292-1.278.3A3.001 3.001 0 0 0 2 10c0 1.653 1.347 3 3 3h11.25c.963 0 1.75-.787 1.75-1.75s-.787-1.75-1.75-1.75h-2V6.25zm2 0V7.5A3.755 3.755 0 0 1 20 11.25 3.755 3.755 0 0 1 16.25 15H5c-2.757 0-5-2.242-5-5 0-2.364 1.654-4.339 3.862-4.857C4.388 2.224 6.932 0 10 0a6.257 6.257 0 0 1 6.25 6.25z",
          })
        );
      };
      C.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "15",
        viewBox: "0 0 20 15",
      };
      var A = function (e) {
        return x(
          "svg",
          e,
          x(
            "defs",
            null,
            x("path", {
              id: "a",
              d: "M9.5.917a9.5 9.5 0 0 1 9.5 9.5v9.5H9.5a9.5 9.5 0 0 1 0-19z",
            }),
            x("path", {
              id: "c",
              d: "M0 19.917v-9.5l.004-.27a9.5 9.5 0 1 1 9.496 9.77H0z",
            })
          ),
          x(
            "g",
            { fill: "none", fillRule: "evenodd" },
            x("path", {
              fill: "#0B7ED0",
              d: "M28.192 4.7c5.077 4.933 5.077 12.93 0 17.863-.17.165-.343.325-.519.479L19 31l-8.673-7.958c-.176-.154-.35-.314-.52-.479-5.076-4.932-5.076-12.93 0-17.863 5.077-4.933 13.309-4.933 18.385 0z",
            }),
            x(
              "g",
              { transform: "translate(0 11.083)" },
              x(
                "mask",
                { id: "b", fill: "#fff" },
                x("use", { xlinkHref: "#a" })
              ),
              x("use", { fill: "#2CD4ED", xlinkHref: "#a" }),
              x("path", {
                fill: "#0DB4E2",
                d: "M28.192-6.384c5.077 4.933 5.077 12.931 0 17.864-.17.165-.343.324-.519.478L19 19.917l-8.673-7.959c-.176-.154-.35-.313-.52-.478-5.076-4.933-5.076-12.93 0-17.864 5.077-4.933 13.309-4.933 18.385 0z",
                mask: "url(#b)",
              })
            ),
            x(
              "g",
              { transform: "translate(19 11.083)" },
              x(
                "mask",
                { id: "d", fill: "#fff" },
                x("use", { xlinkHref: "#c" })
              ),
              x("use", { fill: "#3169FF", xlinkHref: "#c" }),
              x("path", {
                fill: "#3153FF",
                d: "M9.192-6.384c5.077 4.933 5.077 12.931 0 17.864-.17.165-.343.324-.519.478L0 19.917l-8.673-7.959c-.176-.154-.35-.313-.52-.478-5.076-4.933-5.076-12.93 0-17.864 5.077-4.933 13.309-4.933 18.385 0z",
                mask: "url(#d)",
              })
            ),
            x("path", {
              fill: "#000",
              fillRule: "nonzero",
              d: "M59.722 22.774l-3.071-4.936c1.507-.245 2.977-1.451 2.977-3.693 0-2.317-1.62-3.938-4.108-3.938H50v12.567h2.204v-4.691h2.186l2.788 4.69h2.544zm-7.518-6.632v-3.994h3.015c1.243 0 2.148.791 2.148 1.997s-.905 1.997-2.148 1.997h-3.015zm20.932 6.632L68.2 10.207h-2.75l-4.937 12.567h2.506l.923-2.412h5.765l.923 2.412h2.506zm-4.05-4.352h-4.522l2.26-5.992 2.262 5.992zm7.63 4.352V10.207h-2.204v12.567h2.204zm13.565 0V10.207h-2.204v8.723l-6.425-8.723h-2.26v12.567h2.204v-8.968l6.556 8.968h2.13zm7.348 0c3.919 0 6.575-2.581 6.575-6.274s-2.656-6.293-6.575-6.293h-4.672v12.567h4.672zm-2.468-1.94v-8.686h2.468c2.807 0 4.314 1.922 4.314 4.352 0 2.374-1.582 4.333-4.314 4.333h-2.468zm20.894 1.94l-3.07-4.936c1.506-.245 2.976-1.451 2.976-3.693 0-2.317-1.62-3.938-4.107-3.938h-5.52v12.567h2.204v-4.691h2.185l2.789 4.69h2.543zm-7.517-6.632v-3.994h3.014c1.244 0 2.148.791 2.148 1.997s-.904 1.997-2.148 1.997h-3.014zm21.911.358c0-3.75-2.656-6.5-6.424-6.5-3.768 0-6.425 2.75-6.425 6.5s2.657 6.5 6.425 6.5 6.424-2.75 6.424-6.5zm-10.588 0c0-2.6 1.62-4.54 4.164-4.54 2.524 0 4.163 1.94 4.163 4.54 0 2.581-1.639 4.54-4.163 4.54-2.544 0-4.164-1.959-4.164-4.54zm14.922 6.274v-4.691h3.316c2.618 0 4.107-1.81 4.107-3.938 0-2.13-1.47-3.938-4.107-3.938h-5.52v12.567h2.204zm3.014-6.632h-3.014v-3.994h3.014c1.244 0 2.148.791 2.148 1.997s-.904 1.997-2.148 1.997zM149.273 10h1.182v8.273h-1.182V10zm-4.728 2.364a1.182 1.182 0 1 0 0-2.364 1.182 1.182 0 0 0 0 2.364zm12.41 5.909a4.136 4.136 0 1 1 0-8.273 4.136 4.136 0 0 1 0 8.273zm0-1.182a2.955 2.955 0 1 0 0-5.91 2.955 2.955 0 0 0 0 5.91z",
              opacity: ".8",
            })
          )
        );
      };
      A.defaultProps = {
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        width: "162",
        height: "32",
        viewBox: "0 0 162 32",
      };
      var R = (function (e) {
        function t(e) {
          var n;
          return (
            Object(o.a)(this, t),
            (n = E(this, t, [e])),
            Object(s.a)(n, "_bindRef", function (e) {
              return e != n.state.ref && n.setState({ ref: e });
            }),
            Object(s.a)(n, "getMenuItems", function () {
              return [
                { title: "Download", active: "download", href: "/download" },
                { title: "Pricing", active: "pricing", href: "/pro/buy" },
                {
                  title: "Integrations",
                  active: "integrations",
                  href: "/integrations",
                },
                { title: "Blog", href: m.a.blog },
                { title: "About", active: "about", href: m.a.about },
                { type: "separator" },
                P(
                  {},
                  n.state.logged
                    ? {
                        type: "app",
                        title: "Open app",
                        icon: x(C, null),
                        href: m.a.app,
                      }
                    : "product" == n.props.active
                    ? {
                        type: "app",
                        title: "Login",
                        icon: x(z, null),
                        href: m.a.login,
                      }
                    : {
                        type: "app",
                        title: "Sign up",
                        icon: x(z, null),
                        href: m.a.signup,
                      }
                ),
              ];
            }),
            Object(s.a)(n, "onScroll", function () {
              var e = window.scrollY;
              e < 0 ? (e = 0) : e > 64 && (e = 64),
                (e = parseInt(1.5625 * e)) != n._cache &&
                  ((n._cache = e),
                  n.state.ref.setAttribute(
                    "style",
                    "--scrollview-inset-value: ".concat(n._cache, ";")
                  ));
            }),
            Object(s.a)(n, "onMenuSelectChange", function (e) {
              var t = e.target,
                r = n.getMenuItems()[parseInt(t.value)].href;
              window.location.href = r;
            }),
            Object(s.a)(n, "renderLink", function (e) {
              var t = e.href,
                n = e.icon,
                r = e.title,
                o = x("a", { href: t }, n, r);
              return t.startsWith("http") ? o : x(j.a, { href: t }, o);
            }),
            Object(s.a)(n, "renderLinks", function (e, t) {
              return "separator" == e.type
                ? x(
                    "li",
                    { key: "sep" + t, className: p.a.divider },
                    x(I, null)
                  )
                : x(
                    "li",
                    {
                      key: e.href,
                      "data-active": (n.props.active || "") === e.active,
                    },
                    n.renderLink(e)
                  );
            }),
            (n.state = { ref: null, logged: !1 }),
            n
          );
        }
        return (
          Object(u.a)(t, e),
          Object(a.a)(t, [
            {
              key: "componentDidMount",
              value: (function () {
                var e = Object(r.a)(
                  _().m(function e() {
                    var t;
                    return _().w(
                      function (e) {
                        for (;;)
                          switch (e.n) {
                            case 0:
                              return (
                                this.setState({ logged: Object(h.c)() }),
                                window.addEventListener(
                                  "scroll",
                                  this.onScroll
                                ),
                                (e.n = 1),
                                Object(h.a)()
                              );
                            case 1:
                              (t = e.v), this.setState({ logged: t.logged });
                            case 2:
                              return e.a(2);
                          }
                      },
                      e,
                      this
                    );
                  })
                );
                return function () {
                  return e.apply(this, arguments);
                };
              })(),
            },
            {
              key: "componentWillUnmount",
              value: function () {
                window.removeEventListener("scroll", this.onScroll);
              },
            },
            {
              key: "render",
              value: function () {
                var e = this.props,
                  t = e.children,
                  n = e.active,
                  r = void 0 === n ? "" : n;
                return x(
                  "header",
                  { className: p.a.header, ref: this._bindRef },
                  x(b.a, null, t),
                  x(w, null),
                  x(
                    k.a,
                    { className: p.a.toolbar },
                    x(
                      "div",
                      { className: p.a.logo },
                      x(j.a, { href: "/" }, x("a", null, x(A, null)))
                    ),
                    x(
                      "menu",
                      { className: p.a.nav },
                      this.getMenuItems()
                        .filter(function (e) {
                          return !e.type;
                        })
                        .map(this.renderLinks)
                    ),
                    x(
                      "menu",
                      { className: p.a.appnav },
                      this.getMenuItems()
                        .filter(function (e) {
                          return e.type;
                        })
                        .map(this.renderLinks)
                    ),
                    x(
                      "label",
                      { className: p.a.hamburgerButton },
                      x(
                        "select",
                        {
                          onChange: this.onMenuSelectChange,
                          value: this.getMenuItems().findIndex(function (e) {
                            return e.active == r;
                          }),
                        },
                        x("option", { disabled: !0, value: "-1" }, "Menu"),
                        this.getMenuItems().map(function (e, t) {
                          return "separator" == e.type
                            ? x(
                                "option",
                                { key: "sep" + t, disabled: !0 },
                                "--------"
                              )
                            : x("option", { key: e.title, value: t }, e.title);
                        })
                      )
                    )
                  )
                );
              },
            },
          ])
        );
      })(d.a.PureComponent);
    },
    AxmM: function (e, t) {
      e.exports = {
        srcSet:
          "/_next/static/images/screenshot-720-9fbbcdc4ee205fd823f4824fb7c1e16d.jpg 720w",
        images: [
          {
            path: "/_next/static/images/screenshot-720-9fbbcdc4ee205fd823f4824fb7c1e16d.jpg",
            width: 720,
            height: 406,
          },
        ],
        src: "/_next/static/images/screenshot-720-9fbbcdc4ee205fd823f4824fb7c1e16d.jpg",
        toString: function () {
          return "/_next/static/images/screenshot-720-9fbbcdc4ee205fd823f4824fb7c1e16d.jpg";
        },
        placeholder: void 0,
        width: 720,
        height: 406,
      };
    },
    Bnag: function (e, t) {
      e.exports = function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      };
    },
    D1PQ: function (e, t, n) {
      e.exports = { content: "contentoxL5" };
    },
    EbDI: function (e, t) {
      e.exports = function (e) {
        if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e))
          return Array.from(e);
      };
    },
    FYa8: function (e, t, n) {
      "use strict";
      var r;
      (t.__esModule = !0), (t.HeadManagerContext = void 0);
      var o = (
        (r = n("q1tI")) && r.__esModule ? r : { default: r }
      ).default.createContext({});
      t.HeadManagerContext = o;
    },
    Ff2n: function (e, t, n) {
      "use strict";
      function r(e, t) {
        if (null == e) return {};
        var n,
          r,
          o = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              o = {},
              a = Object.keys(e);
            for (r = 0; r < a.length; r++)
              (n = a[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
            return o;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(e);
          for (r = 0; r < a.length; r++)
            (n = a[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (o[n] = e[n]));
        }
        return o;
      }
      n.d(t, "a", function () {
        return r;
      });
    },
    Fsgp: function (e, t, n) {
      "use strict";
      var r = n("wx14"),
        o = n("Ff2n"),
        a = n("q1tI"),
        i = n.n(a),
        c = n("D1PQ"),
        u = n.n(c),
        s = ["className", "children"],
        l = i.a.createElement;
      t.a = function (e) {
        var t = e.className,
          n = void 0 === t ? "" : t,
          a = e.children,
          i = Object(o.a)(e, s);
        return l(
          "div",
          Object(r.a)({ className: u.a.content + " " + n }, i),
          a
        );
      };
    },
    "HaE+": function (e, t, n) {
      "use strict";
      function r(e, t, n, r, o, a, i) {
        try {
          var c = e[a](i),
            u = c.value;
        } catch (s) {
          return void n(s);
        }
        c.done ? t(u) : Promise.resolve(u).then(r, o);
      }
      function o(e) {
        return function () {
          var t = this,
            n = arguments;
          return new Promise(function (o, a) {
            var i = e.apply(t, n);
            function c(e) {
              r(i, o, a, c, u, "next", e);
            }
            function u(e) {
              r(i, o, a, c, u, "throw", e);
            }
            c(void 0);
          });
        };
      }
      n.d(t, "a", function () {
        return o;
      });
    },
    Ijbi: function (e, t, n) {
      var r = n("WkPL");
      e.exports = function (e) {
        if (Array.isArray(e)) return r(e);
      };
    },
    Ji7U: function (e, t, n) {
      "use strict";
      function r(e, t) {
        return (r =
          Object.setPrototypeOf ||
          function (e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function o(e, t) {
        if ("function" !== typeof t && null !== t)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          t && r(e, t);
      }
      n.d(t, "a", function () {
        return o;
      });
    },
    K64n: function (e, t, n) {
      "use strict";
      (t.Headers = self.Headers),
        (t.Request = self.Request),
        (t.Response = self.Response),
        (t.fetch = self.fetch);
    },
    KEug: function (e, t, n) {
      e.exports = { button: "buttonYAU-", iconRight: "iconRight2LgQ" };
    },
    LpSC: function (e, t, n) {
      n("K64n"), (e.exports = self.fetch.bind(self));
    },
    Nsbk: function (e, t) {
      function n(t) {
        return (
          (e.exports = n =
            Object.setPrototypeOf
              ? Object.getPrototypeOf
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
          n(t)
        );
      }
      e.exports = n;
    },
    PJYZ: function (e, t) {
      e.exports = function (e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      };
    },
    RIqP: function (e, t, n) {
      var r = n("Ijbi"),
        o = n("EbDI"),
        a = n("ZhPi"),
        i = n("Bnag");
      e.exports = function (e) {
        return r(e) || o(e) || a(e) || i();
      };
    },
    S8Lw: function (e, t, n) {
      "use strict";
      var r = n("q1tI"),
        o = n.n(r).a.createElement;
      t.a = function (e) {
        var t = e.src,
          n = e.srcSet,
          r = e.width,
          a = e.height,
          i = e.className,
          c = e.style;
        return o("img", {
          src: t,
          srcSet: n,
          width: r,
          height: a,
          className: i,
          style: c,
        });
      };
    },
    SG3g: function (e, t, n) {
      e.exports = { cookie: "cookie2l8w" };
    },
    SVUp: function (e, t) {
      e.exports =
        "/_next/static/images/icon-383cf1a6e834bf67e6c58ec01945ae1c.svg";
    },
    Xuae: function (e, t, n) {
      "use strict";
      var r = n("RIqP"),
        o = n("lwsE"),
        a = n("W8MJ"),
        i = n("a1gu"),
        c = n("Nsbk"),
        u = n("7W2i");
      function s(e, t, n) {
        return (
          (t = c(t)),
          i(
            e,
            (function () {
              try {
                var e = !Boolean.prototype.valueOf.call(
                  Reflect.construct(Boolean, [], function () {})
                );
              } catch (e) {}
              return (function () {
                return !!e;
              })();
            })()
              ? Reflect.construct(t, n || [], c(e).constructor)
              : t.apply(e, n)
          )
        );
      }
      (t.__esModule = !0), (t.default = void 0);
      var l = n("q1tI"),
        p = (function (e) {
          function t(e) {
            var n;
            return (
              o(this, t),
              ((n = s(this, t, [e]))._hasHeadManager = void 0),
              (n.emitChange = function () {
                n._hasHeadManager &&
                  n.props.headManager.updateHead(
                    n.props.reduceComponentsToState(
                      r(n.props.headManager.mountedInstances),
                      n.props
                    )
                  );
              }),
              (n._hasHeadManager =
                n.props.headManager && n.props.headManager.mountedInstances),
              n
            );
          }
          return (
            u(t, e),
            a(t, [
              {
                key: "componentDidMount",
                value: function () {
                  this._hasHeadManager &&
                    this.props.headManager.mountedInstances.add(this),
                    this.emitChange();
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  this.emitChange();
                },
              },
              {
                key: "componentWillUnmount",
                value: function () {
                  this._hasHeadManager &&
                    this.props.headManager.mountedInstances.delete(this),
                    this.emitChange();
                },
              },
              {
                key: "render",
                value: function () {
                  return null;
                },
              },
            ])
          );
        })(l.Component);
      t.default = p;
    },
    YFqc: function (e, t, n) {
      e.exports = n("cTJO");
    },
    a1gu: function (e, t, n) {
      var r = n("cDf5"),
        o = n("PJYZ");
      e.exports = function (e, t) {
        return !t || ("object" !== r(t) && "function" !== typeof t) ? o(e) : t;
      };
    },
    b132: function (e, t, n) {
      "use strict";
      n.d(t, "a", function () {
        return d;
      });
      var r = n("wx14"),
        o = n("Ff2n"),
        a = n("q1tI"),
        i = n.n(a),
        c = n("KEug"),
        u = n.n(c),
        s = n("YFqc"),
        l = n.n(s),
        p = ["href", "hidden", "className", "children"],
        f = i.a.createElement;
      t.b = function (e) {
        var t = e.href,
          n = e.hidden,
          a = void 0 !== n && n,
          i = e.className,
          c = void 0 === i ? "" : i,
          s = e.children,
          d = Object(o.a)(e, p);
        if (a) return null;
        var h = f(
          "a",
          Object(r.a)(
            {
              "data-appearance": "",
              "data-size": "",
              className: u.a.button + " " + c,
              href: t,
            },
            d
          ),
          s
        );
        return "string" == typeof t && t.startsWith("http")
          ? h
          : f(l.a, { href: t }, h);
      };
      var d = function (e) {
        var t = e.children;
        return f("span", { className: u.a.iconRight }, t);
      };
    },
    bgmj: function (e, t) {
      e.exports =
        "/_next/static/images/icon_128-85815217bb96f05ae96e383c4160cb5d.png";
    },
    cTJO: function (e, t, n) {
      "use strict";
      var r = n("J4zp"),
        o = n("284h");
      (t.__esModule = !0), (t.default = void 0);
      var a,
        i = o(n("q1tI")),
        c = n("elyg"),
        u = n("nOHt"),
        s = new Map(),
        l = window.IntersectionObserver,
        p = {};
      var f = function (e, t) {
        var n =
          a ||
          (l
            ? (a = new l(
                function (e) {
                  e.forEach(function (e) {
                    if (s.has(e.target)) {
                      var t = s.get(e.target);
                      (e.isIntersecting || e.intersectionRatio > 0) &&
                        (a.unobserve(e.target), s.delete(e.target), t());
                    }
                  });
                },
                { rootMargin: "200px" }
              ))
            : void 0);
        return n
          ? (n.observe(e),
            s.set(e, t),
            function () {
              try {
                n.unobserve(e);
              } catch (t) {
                console.error(t);
              }
              s.delete(e);
            })
          : function () {};
      };
      function d(e, t, n, r) {
        (0, c.isLocalURL)(t) &&
          (e.prefetch(t, n, r).catch(function (e) {
            0;
          }),
          (p[t + "%" + n] = !0));
      }
      var h = function (e) {
        var t = !1 !== e.prefetch,
          n = i.default.useState(),
          o = r(n, 2),
          a = o[0],
          s = o[1],
          h = (0, u.useRouter)(),
          v = (h && h.pathname) || "/",
          m = i.default.useMemo(
            function () {
              var t = (0, c.resolveHref)(v, e.href, !0),
                n = r(t, 2),
                o = n[0],
                a = n[1];
              return {
                href: o,
                as: e.as ? (0, c.resolveHref)(v, e.as) : a || o,
              };
            },
            [v, e.href, e.as]
          ),
          g = m.href,
          b = m.as;
        i.default.useEffect(
          function () {
            if (
              t &&
              l &&
              a &&
              a.tagName &&
              (0, c.isLocalURL)(g) &&
              !p[g + "%" + b]
            )
              return f(a, function () {
                d(h, g, b);
              });
          },
          [t, a, g, b, h]
        );
        var y = e.children,
          w = e.replace,
          O = e.shallow,
          j = e.scroll;
        "string" === typeof y && (y = i.default.createElement("a", null, y));
        var k = i.Children.only(y),
          x = {
            ref: function (e) {
              e && s(e),
                k &&
                  "object" === typeof k &&
                  k.ref &&
                  ("function" === typeof k.ref
                    ? k.ref(e)
                    : "object" === typeof k.ref && (k.ref.current = e));
            },
            onClick: function (e) {
              k.props &&
                "function" === typeof k.props.onClick &&
                k.props.onClick(e),
                e.defaultPrevented ||
                  (function (e, t, n, r, o, a, i) {
                    ("A" !== e.currentTarget.nodeName ||
                      (!(function (e) {
                        var t = e.currentTarget.target;
                        return (
                          (t && "_self" !== t) ||
                          e.metaKey ||
                          e.ctrlKey ||
                          e.shiftKey ||
                          e.altKey ||
                          (e.nativeEvent && 2 === e.nativeEvent.which)
                        );
                      })(e) &&
                        (0, c.isLocalURL)(n))) &&
                      (e.preventDefault(),
                      null == i && (i = r.indexOf("#") < 0),
                      t[o ? "replace" : "push"](n, r, { shallow: a }).then(
                        function (e) {
                          e &&
                            i &&
                            (window.scrollTo(0, 0), document.body.focus());
                        }
                      ));
                  })(e, h, g, b, w, O, j);
            },
          };
        return (
          t &&
            (x.onMouseEnter = function (e) {
              (0, c.isLocalURL)(g) &&
                (k.props &&
                  "function" === typeof k.props.onMouseEnter &&
                  k.props.onMouseEnter(e),
                d(h, g, b, { priority: !0 }));
            }),
          (e.passHref || ("a" === k.type && !("href" in k.props))) &&
            (x.href = (0, c.addBasePath)(
              (0, c.addLocale)(b, h && h.locale, h && h.defaultLocale)
            )),
          i.default.cloneElement(k, x)
        );
      };
      t.default = h;
    },
    fMjQ: function (e, t) {
      e.exports =
        "/_next/static/images/icon_64-1c65f08ef5eb889c3b61c99b74246fa5.png";
    },
    foSv: function (e, t, n) {
      "use strict";
      function r(e) {
        return (r = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      n.d(t, "a", function () {
        return r;
      });
    },
    lSNA: function (e, t) {
      e.exports = function (e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      };
    },
    lwAK: function (e, t, n) {
      "use strict";
      var r;
      (t.__esModule = !0), (t.AmpStateContext = void 0);
      var o = (
        (r = n("q1tI")) && r.__esModule ? r : { default: r }
      ).default.createContext({});
      t.AmpStateContext = o;
    },
    md7G: function (e, t, n) {
      "use strict";
      function r(e) {
        return (r =
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" === typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function o(e, t) {
        return !t || ("object" !== r(t) && "function" !== typeof t)
          ? (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e)
          : t;
      }
      n.d(t, "a", function () {
        return o;
      });
    },
    qXeB: function (e, t, n) {},
    rePB: function (e, t, n) {
      "use strict";
      function r(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      n.d(t, "a", function () {
        return r;
      });
    },
    "t/pG": function (e, t) {
      var n = {
        home: "https://raindrop.io",
        app: "https://app.raindrop.io",
        login: "https://app.raindrop.io/account/login",
        signup: "https://app.raindrop.io/account/signup",
        manage_subscription: "https://app.raindrop.io/settings/pro",
        backups: "https://app.raindrop.io/settings/backups",
        import: "https://app.raindrop.io/settings/import",
        blog: "https://blog.raindrop.io/",
        dev: "https://developer.raindrop.io/",
        better: "https://raindropio.canny.io",
        about: "https://help.raindrop.io/about",
        twitter: "https://twitter.com/raindrop_io",
        terms: "https://help.raindrop.io/terms",
        privacy: "https://help.raindrop.io/privacy",
        ifttt: "https://ifttt.com/raindrop",
        help: {
          index: "https://help.raindrop.io",
          cloud_backup: "https://help.raindrop.io/backups#automatic",
          search: "https://help.raindrop.io/using-search",
          duplicates: "https://help.raindrop.io/using-search#duplicates",
          broken_links: "https://help.raindrop.io/using-search#broken-links",
          full_text_search:
            "https://help.raindrop.io/using-search#full-text-search",
          permanent_library: "https://help.raindrop.io/permanent-copy",
          collections: "https://help.raindrop.io/collections",
          files: "https://help.raindrop.io/files",
          premium_features: "https://help.raindrop.io/premium-features",
          highlights: "https://help.raindrop.io/highlights",
          reminders: "https://help.raindrop.io/reminders",
          tags: "https://help.raindrop.io/tags",
          bookmarks: "https://help.raindrop.io/bookmarks",
          bookmarks_preview: "https://help.raindrop.io/bookmarks#preview",
          bookmarks_appearance: "https://help.raindrop.io/bookmarks#appearance",
          collaboration: "https://help.raindrop.io/collaboration",
          public_page: "https://help.raindrop.io/public-page",
          ai_suggestions: "https://help.raindrop.io/ai-suggestions",
        },
      };
      Object.freeze(n), (e.exports = n);
    },
    voUO: function (e, t) {
      e.exports =
        "/_next/static/images/icon_16-a92608a2ed9a2cb690b9ffff747ffd08.png";
    },
    vuIU: function (e, t, n) {
      "use strict";
      function r(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function o(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e;
      }
      n.d(t, "a", function () {
        return o;
      });
    },
    wB7i: function (e, t) {
      e.exports =
        "/_next/static/images/icon_32-971c192ac5cfb33811c4e426442c1432.png";
    },
    wx14: function (e, t, n) {
      "use strict";
      function r() {
        return (r =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      n.d(t, "a", function () {
        return r;
      });
    },
  },
]);
