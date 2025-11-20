_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [8],
  {
    "0sNQ": function (e, t) {
      "trimStart" in String.prototype ||
        (String.prototype.trimStart = String.prototype.trimLeft),
        "trimEnd" in String.prototype ||
          (String.prototype.trimEnd = String.prototype.trimRight),
        "description" in Symbol.prototype ||
          Object.defineProperty(Symbol.prototype, "description", {
            get: function () {
              return /\((.+)\)/.exec(this)[1];
            },
          }),
        Array.prototype.flat ||
          ((Array.prototype.flat = function (e, t) {
            return (
              (t = this.concat.apply([], this)),
              e > 1 && t.some(Array.isArray) ? t.flat(e - 1) : t
            );
          }),
          (Array.prototype.flatMap = function (e, t) {
            return this.map(e, t).flat();
          })),
        Promise.prototype.finally ||
          (Promise.prototype.finally = function (e) {
            if ("function" != typeof e) return this.then(e, e);
            var t = this.constructor || Promise;
            return this.then(
              function (n) {
                return t.resolve(e()).then(function () {
                  return n;
                });
              },
              function (n) {
                return t.resolve(e()).then(function () {
                  throw n;
                });
              }
            );
          });
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
    BMP1: function (e, t, n) {
      "use strict";
      var r = n("284h")(n("IKlv"));
      (window.next = r), (0, r.default)().catch(console.error);
    },
    DqTX: function (e, t, n) {
      "use strict";
      var r = n("J4zp");
      (t.__esModule = !0),
        (t.default = function (e) {
          var t = document.getElementsByTagName("head")[0],
            n = new Set(t.children);
          i(
            n,
            e.map(function (e) {
              var t = r(e, 2),
                n = t[0],
                a = t[1];
              return (0, o.createElement)(n, a);
            }),
            !1
          );
          var a = null;
          return {
            mountedInstances: new Set(),
            updateHead: function (e) {
              var t = (a = Promise.resolve().then(function () {
                t === a && ((a = null), i(n, e, !0));
              }));
            },
          };
        });
      var o = n("q1tI"),
        a = {
          acceptCharset: "accept-charset",
          className: "class",
          htmlFor: "for",
          httpEquiv: "http-equiv",
        };
      function i(e, t, n) {
        var r = document.getElementsByTagName("head")[0],
          o = new Set(e);
        t.forEach(function (t) {
          if ("title" !== t.type) {
            for (
              var n = (function (e) {
                  var t = e.type,
                    n = e.props,
                    r = document.createElement(t);
                  for (var o in n)
                    if (
                      n.hasOwnProperty(o) &&
                      "children" !== o &&
                      "dangerouslySetInnerHTML" !== o &&
                      void 0 !== n[o]
                    ) {
                      var i = a[o] || o.toLowerCase();
                      r.setAttribute(i, n[o]);
                    }
                  var u = n.children,
                    c = n.dangerouslySetInnerHTML;
                  return (
                    c
                      ? (r.innerHTML = c.__html || "")
                      : u &&
                        (r.textContent =
                          "string" === typeof u
                            ? u
                            : Array.isArray(u)
                            ? u.join("")
                            : ""),
                    r
                  );
                })(t),
                i = e.values();
              ;

            ) {
              var u = i.next(),
                c = u.done,
                s = u.value;
              if (null == s ? void 0 : s.isEqualNode(n))
                return void o.delete(s);
              if (c) break;
            }
            e.add(n), r.appendChild(n);
          } else {
            var f = "";
            if (t) {
              var l = t.props.children;
              f =
                "string" === typeof l ? l : Array.isArray(l) ? l.join("") : "";
            }
            f !== document.title && (document.title = f);
          }
        }),
          o.forEach(function (t) {
            n && t.parentNode.removeChild(t), e.delete(t);
          });
      }
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
    IKlv: function (e, t, n) {
      "use strict";
      var r = n("yXPU"),
        o = n("lwsE"),
        a = n("W8MJ"),
        i = n("a1gu"),
        u = n("Nsbk"),
        c = n("7W2i"),
        s = n("J4zp");
      function f() {
        var e,
          t,
          n = "function" == typeof Symbol ? Symbol : {},
          r = n.iterator || "@@iterator",
          o = n.toStringTag || "@@toStringTag";
        function a(n, r, o, a) {
          var c = r && r.prototype instanceof u ? r : u,
            s = Object.create(c.prototype);
          return (
            l(
              s,
              "_invoke",
              (function (n, r, o) {
                var a,
                  u,
                  c,
                  s = 0,
                  f = o || [],
                  l = !1,
                  d = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: p,
                    f: p.bind(e, 4),
                    d: function (t, n) {
                      return (a = t), (u = 0), (c = e), (d.n = n), i;
                    },
                  };
                function p(n, r) {
                  for (
                    u = n, c = r, t = 0;
                    !l && s && !o && t < f.length;
                    t++
                  ) {
                    var o,
                      a = f[t],
                      p = d.p,
                      h = a[2];
                    n > 3
                      ? (o = h === r) &&
                        ((c = a[(u = a[4]) ? 5 : ((u = 3), 3)]),
                        (a[4] = a[5] = e))
                      : a[0] <= p &&
                        ((o = n < 2 && p < a[1])
                          ? ((u = 0), (d.v = r), (d.n = a[1]))
                          : p < h &&
                            (o = n < 3 || a[0] > r || r > h) &&
                            ((a[4] = n), (a[5] = r), (d.n = h), (u = 0)));
                  }
                  if (o || n > 1) return i;
                  throw ((l = !0), r);
                }
                return function (o, f, h) {
                  if (s > 1) throw TypeError("Generator is already running");
                  for (
                    l && 1 === f && p(f, h), u = f, c = h;
                    (t = u < 2 ? e : c) || !l;

                  ) {
                    a ||
                      (u
                        ? u < 3
                          ? (u > 1 && (d.n = -1), p(u, c))
                          : (d.n = c)
                        : (d.v = c));
                    try {
                      if (((s = 2), a)) {
                        if ((u || (o = "next"), (t = a[o]))) {
                          if (!(t = t.call(a, c)))
                            throw TypeError("iterator result is not an object");
                          if (!t.done) return t;
                          (c = t.value), u < 2 && (u = 0);
                        } else
                          1 === u && (t = a.return) && t.call(a),
                            u < 2 &&
                              ((c = TypeError(
                                "The iterator does not provide a '" +
                                  o +
                                  "' method"
                              )),
                              (u = 1));
                        a = e;
                      } else if ((t = (l = d.n < 0) ? c : n.call(r, d)) !== i)
                        break;
                    } catch (t) {
                      (a = e), (u = 1), (c = t);
                    } finally {
                      s = 1;
                    }
                  }
                  return { value: t, done: l };
                };
              })(n, o, a),
              !0
            ),
            s
          );
        }
        var i = {};
        function u() {}
        function c() {}
        function s() {}
        t = Object.getPrototypeOf;
        var d = [][r]
            ? t(t([][r]()))
            : (l((t = {}), r, function () {
                return this;
              }),
              t),
          p = (s.prototype = u.prototype = Object.create(d));
        function h(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, s)
              : ((e.__proto__ = s), l(e, o, "GeneratorFunction")),
            (e.prototype = Object.create(p)),
            e
          );
        }
        return (
          (c.prototype = s),
          l(p, "constructor", s),
          l(s, "constructor", c),
          (c.displayName = "GeneratorFunction"),
          l(s, o, "GeneratorFunction"),
          l(p),
          l(p, o, "Generator"),
          l(p, r, function () {
            return this;
          }),
          l(p, "toString", function () {
            return "[object Generator]";
          }),
          (f = function () {
            return { w: a, m: h };
          })()
        );
      }
      function l(e, t, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, "", {});
        } catch (e) {
          o = 0;
        }
        (l = function (e, t, n, r) {
          function a(t, n) {
            l(e, t, function (e) {
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
      function d(e, t, n) {
        return (
          (t = u(t)),
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
              ? Reflect.construct(t, n || [], u(e).constructor)
              : t.apply(e, n)
          )
        );
      }
      var p = n("284h"),
        h = n("TqRt");
      (t.__esModule = !0),
        (t.render = ie),
        (t.renderError = ce),
        (t.default = t.emitter = t.router = t.version = void 0);
      var m = h(n("pVnL"));
      h(n("284h"));
      n("0sNQ");
      var v = h(n("q1tI")),
        y = h(n("i8i4")),
        g = n("FYa8"),
        S = h(n("dZ6Y")),
        w = n("qOIg"),
        _ = n("elyg"),
        b = n("/jkW"),
        E = p(n("3WeD")),
        P = p(n("yLiY")),
        T = n("g/15"),
        C = h(n("DqTX")),
        N = p(n("zmvN")),
        x = h(n("bGXG")),
        A = n("nOHt"),
        k = JSON.parse(document.getElementById("__NEXT_DATA__").textContent);
      window.__NEXT_DATA__ = k;
      t.version = "9.5.5";
      var R = k.props,
        M = k.err,
        I = k.page,
        L = k.query,
        F = k.buildId,
        D = k.assetPrefix,
        j = k.runtimeConfig,
        O = k.dynamicIds,
        B = k.isFallback,
        q = k.head,
        G = k.locales,
        H = k.defaultLocale,
        U = k.locale,
        W = D || "";
      (n.p = "".concat(W, "/_next/")),
        P.setConfig({ serverRuntimeConfig: {}, publicRuntimeConfig: j || {} });
      var X = (0, T.getURL)();
      (0, _.hasBasePath)(X) && (X = (0, _.delBasePath)(X)),
        (X = (0, _.delLocale)(X, U));
      var J = new N.default(F, W, I),
        Y = function (e) {
          var t = s(e, 2),
            n = t[0],
            r = t[1];
          return J.registerPage(n, r);
        };
      window.__NEXT_P &&
        window.__NEXT_P.map(function (e) {
          return setTimeout(function () {
            return Y(e);
          }, 0);
        }),
        (window.__NEXT_P = []),
        (window.__NEXT_P.push = Y);
      var V,
        z,
        Z,
        K,
        Q,
        $,
        ee,
        te = (0, C.default)(q),
        ne = document.getElementById("__next");
      t.router = Z;
      var re = (function (e) {
          function t() {
            return o(this, t), d(this, t, arguments);
          }
          return (
            c(t, e),
            a(t, [
              {
                key: "componentDidCatch",
                value: function (e, t) {
                  this.props.fn(e, t);
                },
              },
              {
                key: "componentDidMount",
                value: function () {
                  this.scrollToHash(),
                    Z.isSsr &&
                      (B ||
                        (k.nextExport &&
                          ((0, b.isDynamicRoute)(Z.pathname) ||
                            location.search)) ||
                        (R && R.__N_SSG && location.search)) &&
                      Z.replace(
                        Z.pathname +
                          "?" +
                          String(
                            E.assign(
                              E.urlQueryToSearchParams(Z.query),
                              new URLSearchParams(location.search)
                            )
                          ),
                        X,
                        { _h: 1, shallow: !B }
                      );
                },
              },
              {
                key: "componentDidUpdate",
                value: function () {
                  this.scrollToHash();
                },
              },
              {
                key: "scrollToHash",
                value: function () {
                  var e = location.hash;
                  if ((e = e && e.substring(1))) {
                    var t = document.getElementById(e);
                    t &&
                      setTimeout(function () {
                        return t.scrollIntoView();
                      }, 0);
                  }
                },
              },
              {
                key: "render",
                value: function () {
                  return this.props.children;
                },
              },
            ])
          );
        })(v.default.Component),
        oe = (0, S.default)();
      t.emitter = oe;
      var ae = (function () {
        var e = r(
          f().m(function e() {
            var n,
              r,
              o,
              a,
              i,
              u,
              c,
              s = arguments;
            return f().w(
              function (e) {
                for (;;)
                  switch ((e.p = e.n)) {
                    case 0:
                      return (
                        s.length > 0 && void 0 !== s[0] ? s[0] : {},
                        (e.n = 1),
                        J.loadPage("/_app")
                      );
                    case 1:
                      return (
                        (n = e.v),
                        (r = n.page),
                        (o = n.mod),
                        ($ = r),
                        o &&
                          o.reportWebVitals &&
                          (ee = function (e) {
                            var t,
                              n = e.id,
                              r = e.name,
                              a = e.startTime,
                              i = e.value,
                              u = e.duration,
                              c = e.entryType,
                              s = e.entries,
                              f = ""
                                .concat(Date.now(), "-")
                                .concat(
                                  Math.floor(8999999999999 * Math.random()) +
                                    1e12
                                );
                            s && s.length && (t = s[0].startTime),
                              o.reportWebVitals({
                                id: n || f,
                                name: r,
                                startTime: a || t,
                                value: null == i ? u : i,
                                label:
                                  "mark" === c || "measure" === c
                                    ? "custom"
                                    : "web-vital",
                              });
                          }),
                        (a = M),
                        (e.p = 2),
                        (e.n = 3),
                        J.loadPage(I)
                      );
                    case 3:
                      (i = e.v), (K = i.page), (Q = i.styleSheets), (e.n = 4);
                      break;
                    case 4:
                      e.n = 6;
                      break;
                    case 5:
                      (e.p = 5), (c = e.v), (a = c);
                    case 6:
                      if (!window.__NEXT_PRELOADREADY) {
                        e.n = 7;
                        break;
                      }
                      return (e.n = 7), window.__NEXT_PRELOADREADY(O);
                    case 7:
                      return (
                        (t.router = Z =
                          (0, A.createRouter)(I, L, X, {
                            initialProps: R,
                            pageLoader: J,
                            App: $,
                            Component: K,
                            initialStyleSheets: Q,
                            wrapApp: he,
                            err: a,
                            isFallback: Boolean(B),
                            subscription: function (e, t) {
                              return ie({
                                App: t,
                                Component: e.Component,
                                styleSheets: e.styleSheets,
                                props: e.props,
                                err: e.err,
                              });
                            },
                            locale: U,
                            locales: G,
                            defaultLocale: H,
                          })),
                        ie(
                          (u = {
                            App: $,
                            Component: K,
                            styleSheets: Q,
                            props: R,
                            err: a,
                          })
                        ),
                        e.a(2, oe)
                      );
                    case 8:
                      return e.a(2, { emitter: oe, render: ie, renderCtx: u });
                    case 9:
                      return e.a(2);
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
      })();
      function ie(e) {
        return ue.apply(this, arguments);
      }
      function ue() {
        return (ue = r(
          f().m(function e(t) {
            var n;
            return f().w(
              function (e) {
                for (;;)
                  switch ((e.p = e.n)) {
                    case 0:
                      if (!t.err) {
                        e.n = 2;
                        break;
                      }
                      return (e.n = 1), ce(t);
                    case 1:
                      return e.a(2);
                    case 2:
                      return (e.p = 2), (e.n = 3), me(t);
                    case 3:
                      e.n = 6;
                      break;
                    case 4:
                      if (((e.p = 4), !(n = e.v).cancelled)) {
                        e.n = 5;
                        break;
                      }
                      throw n;
                    case 5:
                      return (e.n = 6), ce((0, m.default)({}, t, { err: n }));
                    case 6:
                      return e.a(2);
                  }
              },
              e,
              null,
              [[2, 4]]
            );
          })
        )).apply(this, arguments);
      }
      function ce(e) {
        var t = e.App,
          n = e.err;
        return (
          console.error(n),
          J.loadPage("/_error").then(function (r) {
            var o = r.page,
              a = r.styleSheets,
              i = he(t),
              u = {
                Component: o,
                AppTree: i,
                router: Z,
                ctx: { err: n, pathname: I, query: L, asPath: X, AppTree: i },
              };
            return Promise.resolve(
              e.props ? e.props : (0, T.loadGetInitialProps)(t, u)
            ).then(function (t) {
              return me(
                (0, m.default)({}, e, {
                  err: n,
                  Component: o,
                  styleSheets: a,
                  props: t,
                })
              );
            });
          })
        );
      }
      t.default = ae;
      var se = "function" === typeof y.default.hydrate;
      function fe() {
        T.ST &&
          (performance.mark("afterHydrate"),
          performance.measure(
            "Next.js-before-hydration",
            "navigationStart",
            "beforeRender"
          ),
          performance.measure(
            "Next.js-hydration",
            "beforeRender",
            "afterHydrate"
          ),
          ee && performance.getEntriesByName("Next.js-hydration").forEach(ee),
          de());
      }
      function le() {
        if (T.ST) {
          performance.mark("afterRender");
          var e = performance.getEntriesByName("routeChange", "mark");
          e.length &&
            (performance.measure(
              "Next.js-route-change-to-render",
              e[0].name,
              "beforeRender"
            ),
            performance.measure(
              "Next.js-render",
              "beforeRender",
              "afterRender"
            ),
            ee &&
              (performance.getEntriesByName("Next.js-render").forEach(ee),
              performance
                .getEntriesByName("Next.js-route-change-to-render")
                .forEach(ee)),
            de(),
            ["Next.js-route-change-to-render", "Next.js-render"].forEach(
              function (e) {
                return performance.clearMeasures(e);
              }
            ));
        }
      }
      function de() {
        ["beforeRender", "afterHydrate", "afterRender", "routeChange"].forEach(
          function (e) {
            return performance.clearMarks(e);
          }
        );
      }
      function pe(e) {
        var t = e.children;
        return v.default.createElement(
          re,
          {
            fn: function (e) {
              return ce({ App: $, err: e }).catch(function (e) {
                return console.error("Error rendering page: ", e);
              });
            },
          },
          v.default.createElement(
            w.RouterContext.Provider,
            { value: (0, A.makePublicRouterInstance)(Z) },
            v.default.createElement(
              g.HeadManagerContext.Provider,
              { value: te },
              t
            )
          )
        );
      }
      var he = function (e) {
        return function (t) {
          var n = (0, m.default)({}, t, { Component: K, err: M, router: Z });
          return v.default.createElement(
            pe,
            null,
            v.default.createElement(e, n)
          );
        };
      };
      function me(e) {
        var t = e.App,
          n = e.Component,
          r = e.props,
          o = e.err,
          a = e.styleSheets;
        (n = n || V.Component), (r = r || V.props);
        var i = (0, m.default)({}, r, { Component: n, err: o, router: Z });
        V = i;
        var u,
          c = !1,
          s = new Promise(function (e, t) {
            z && z(),
              (u = function () {
                (z = null), e();
              }),
              (z = function () {
                (c = !0), (z = null);
                var e = new Error("Cancel rendering route");
                (e.cancelled = !0), t(e);
              });
          });
        var f,
          l,
          d = v.default.createElement(
            ve,
            {
              callback: function () {
                if (!se && !c) {
                  for (
                    var e = new Set(
                        a.map(function (e) {
                          return e.href;
                        })
                      ),
                      t = (0, N.looseToArray)(
                        document.querySelectorAll("style[data-n-href]")
                      ),
                      n = t.map(function (e) {
                        return e.getAttribute("data-n-href");
                      }),
                      r = 0;
                    r < n.length;
                    ++r
                  )
                    e.has(n[r])
                      ? t[r].removeAttribute("media")
                      : t[r].setAttribute("media", "x");
                  var o = document.querySelector("noscript[data-n-css]");
                  o &&
                    a.forEach(function (e) {
                      var t = e.href,
                        n = document.querySelector(
                          'style[data-n-href="'.concat(t, '"]')
                        );
                      n &&
                        (o.parentNode.insertBefore(n, o.nextSibling), (o = n));
                    }),
                    (0, N.looseToArray)(
                      document.querySelectorAll("link[data-n-p]")
                    ).forEach(function (e) {
                      e.parentNode.removeChild(e);
                    }),
                    getComputedStyle(document.body, "height");
                }
                u();
              },
            },
            v.default.createElement(pe, null, v.default.createElement(t, i))
          );
        return (
          (function () {
            if (se) return !1;
            var e = (0, N.looseToArray)(
                document.querySelectorAll("style[data-n-href]")
              ),
              t = new Set(
                e.map(function (e) {
                  return e.getAttribute("data-n-href");
                })
              );
            a.forEach(function (e) {
              var n = e.href,
                r = e.text;
              if (!t.has(n)) {
                var o = document.createElement("style");
                o.setAttribute("data-n-href", n),
                  o.setAttribute("media", "x"),
                  document.head.appendChild(o),
                  o.appendChild(document.createTextNode(r));
              }
            });
          })(),
          (f = d),
          (l = ne),
          T.ST && performance.mark("beforeRender"),
          se
            ? (y.default.hydrate(f, l, fe),
              (se = !1),
              ee && T.ST && (0, x.default)(ee))
            : y.default.render(f, l, le),
          s
        );
      }
      function ve(e) {
        var t = e.callback,
          n = e.children;
        return (
          v.default.useLayoutEffect(
            function () {
              return t();
            },
            [t]
          ),
          n
        );
      }
    },
    Lab5: function (e, t, n) {
      "use strict";
      (t.__esModule = !0),
        (t.default = function (e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "",
            n =
              "/" === e
                ? "/index"
                : /^\/index(\/|$)/.test(e)
                ? "/index".concat(e)
                : "".concat(e);
          return n + t;
        });
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
    a1gu: function (e, t, n) {
      var r = n("cDf5"),
        o = n("PJYZ");
      e.exports = function (e, t) {
        return !t || ("object" !== r(t) && "function" !== typeof t) ? o(e) : t;
      };
    },
    bGXG: function (e, t, n) {
      "use strict";
      (t.__esModule = !0), (t.default = void 0);
      var r = n("w6Sm");
      t.default = function (e) {
        (0, r.getCLS)(e),
          (0, r.getFID)(e),
          (0, r.getFCP)(e),
          (0, r.getLCP)(e),
          (0, r.getTTFB)(e);
      };
    },
    pVnL: function (e, t) {
      function n() {
        return (
          (e.exports = n =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          n.apply(this, arguments)
        );
      }
      e.exports = n;
    },
    w6Sm: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, "getCLS", function () {
          return h;
        }),
        n.d(t, "getFCP", function () {
          return v;
        }),
        n.d(t, "getFID", function () {
          return y;
        }),
        n.d(t, "getLCP", function () {
          return S;
        }),
        n.d(t, "getTTFB", function () {
          return w;
        });
      var r,
        o,
        a = function () {
          return ""
            .concat(Date.now(), "-")
            .concat(Math.floor(8999999999999 * Math.random()) + 1e12);
        },
        i = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
          return {
            name: e,
            value: t,
            delta: 0,
            entries: [],
            id: a(),
            isFinal: !1,
          };
        },
        u = function (e, t) {
          try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
              var n = new PerformanceObserver(function (e) {
                return e.getEntries().map(t);
              });
              return n.observe({ type: e, buffered: !0 }), n;
            }
          } catch (e) {}
        },
        c = !1,
        s = !1,
        f = function (e) {
          c = !e.persisted;
        },
        l = function () {
          addEventListener("pagehide", f),
            addEventListener("beforeunload", function () {});
        },
        d = function (e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          s || (l(), (s = !0)),
            addEventListener(
              "visibilitychange",
              function (t) {
                var n = t.timeStamp;
                "hidden" === document.visibilityState &&
                  e({ timeStamp: n, isUnloading: c });
              },
              { capture: !0, once: t }
            );
        },
        p = function (e, t, n, r) {
          var o;
          return function () {
            n && t.isFinal && n.disconnect(),
              t.value >= 0 &&
                (r || t.isFinal || "hidden" === document.visibilityState) &&
                ((t.delta = t.value - (o || 0)),
                (t.delta || t.isFinal || void 0 === o) &&
                  (e(t), (o = t.value)));
          };
        },
        h = function (e) {
          var t,
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = i("CLS", 0),
            o = function (e) {
              e.hadRecentInput ||
                ((r.value += e.value), r.entries.push(e), t());
            },
            a = u("layout-shift", o);
          a &&
            ((t = p(e, r, a, n)),
            d(function (e) {
              var n = e.isUnloading;
              a.takeRecords().map(o), n && (r.isFinal = !0), t();
            }));
        },
        m = function () {
          return (
            void 0 === r &&
              ((r = "hidden" === document.visibilityState ? 0 : 1 / 0),
              d(function (e) {
                var t = e.timeStamp;
                return (r = t);
              }, !0)),
            {
              get timeStamp() {
                return r;
              },
            }
          );
        },
        v = function (e) {
          var t,
            n = i("FCP"),
            r = m(),
            o = u("paint", function (e) {
              "first-contentful-paint" === e.name &&
                e.startTime < r.timeStamp &&
                ((n.value = e.startTime),
                (n.isFinal = !0),
                n.entries.push(e),
                t());
            });
          o && (t = p(e, n, o));
        },
        y = function (e) {
          var t = i("FID"),
            n = m(),
            r = function (e) {
              e.startTime < n.timeStamp &&
                ((t.value = e.processingStart - e.startTime),
                t.entries.push(e),
                (t.isFinal = !0),
                a());
            },
            o = u("first-input", r),
            a = p(e, t, o);
          o
            ? d(function () {
                o.takeRecords().map(r), o.disconnect();
              }, !0)
            : window.perfMetrics &&
              window.perfMetrics.onFirstInputDelay &&
              window.perfMetrics.onFirstInputDelay(function (e, r) {
                r.timeStamp < n.timeStamp &&
                  ((t.value = e),
                  (t.isFinal = !0),
                  (t.entries = [
                    {
                      entryType: "first-input",
                      name: r.type,
                      target: r.target,
                      cancelable: r.cancelable,
                      startTime: r.timeStamp,
                      processingStart: r.timeStamp + e,
                    },
                  ]),
                  a());
              });
        },
        g = function () {
          return (
            o ||
              (o = new Promise(function (e) {
                return ["scroll", "keydown", "pointerdown"].map(function (t) {
                  addEventListener(t, e, {
                    once: !0,
                    passive: !0,
                    capture: !0,
                  });
                });
              })),
            o
          );
        },
        S = function (e) {
          var t,
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = i("LCP"),
            o = m(),
            a = function (e) {
              var n = e.startTime;
              n < o.timeStamp
                ? ((r.value = n), r.entries.push(e))
                : (r.isFinal = !0),
                t();
            },
            c = u("largest-contentful-paint", a);
          if (c) {
            t = p(e, r, c, n);
            var s = function () {
              r.isFinal || (c.takeRecords().map(a), (r.isFinal = !0), t());
            };
            g().then(s), d(s, !0);
          }
        },
        w = function (e) {
          var t,
            n = i("TTFB");
          (t = function () {
            try {
              var t =
                performance.getEntriesByType("navigation")[0] ||
                (function () {
                  var e = performance.timing,
                    t = { entryType: "navigation", startTime: 0 };
                  for (var n in e)
                    "navigationStart" !== n &&
                      "toJSON" !== n &&
                      (t[n] = Math.max(e[n] - e.navigationStart, 0));
                  return t;
                })();
              (n.value = n.delta = t.responseStart),
                (n.entries = [t]),
                (n.isFinal = !0),
                e(n);
            } catch (e) {}
          }),
            "complete" === document.readyState
              ? setTimeout(t, 0)
              : addEventListener("pageshow", t);
        };
    },
    yLiY: function (e, t, n) {
      "use strict";
      var r;
      (t.__esModule = !0),
        (t.setConfig = function (e) {
          r = e;
        }),
        (t.default = void 0);
      t.default = function () {
        return r;
      };
    },
    zmvN: function (e, t, n) {
      "use strict";
      var r = n("lwsE"),
        o = n("W8MJ"),
        a = n("TqRt");
      (t.__esModule = !0), (t.default = t.looseToArray = void 0);
      var i = a(n("dZ6Y")),
        u = n("elyg"),
        c = a(n("Lab5")),
        s = n("/jkW"),
        f = n("hS4m"),
        l = function (e) {
          return [].slice.call(e);
        };
      function d(e, t) {
        try {
          return document.createElement("link").relList.supports(e);
        } catch (n) {}
      }
      function p(e) {
        return (0, u.markLoadingError)(new Error("Error loading ".concat(e)));
      }
      t.looseToArray = l;
      var h = d("preload") && !d("prefetch") ? "preload" : "prefetch",
        m = d("preload") ? "preload" : h;
      document.createElement("script");
      function v(e) {
        if ("/" !== e[0])
          throw new Error(
            'Route name should start with a "/", got "'.concat(e, '"')
          );
        return "/" === e ? e : e.replace(/\/$/, "");
      }
      function y(e, t, n, r) {
        return new Promise(function (o, a) {
          (r = document.createElement("link")),
            n && (r.as = n),
            (r.rel = t),
            (r.crossOrigin = void 0),
            (r.onload = o),
            (r.onerror = a),
            (r.href = e),
            document.head.appendChild(r);
        });
      }
      var g = (function () {
        return o(
          function e(t, n, o) {
            r(this, e),
              (this.initialPage = void 0),
              (this.buildId = void 0),
              (this.assetPrefix = void 0),
              (this.pageCache = void 0),
              (this.pageRegisterEvents = void 0),
              (this.loadingRoutes = void 0),
              (this.promisedBuildManifest = void 0),
              (this.promisedSsgManifest = void 0),
              (this.promisedDevPagesManifest = void 0),
              (this.initialPage = o),
              (this.buildId = t),
              (this.assetPrefix = n),
              (this.pageCache = {}),
              (this.pageRegisterEvents = (0, i.default)()),
              (this.loadingRoutes = { "/_app": !0 }),
              "/_error" !== o && (this.loadingRoutes[o] = !0),
              (this.promisedBuildManifest = new Promise(function (e) {
                window.__BUILD_MANIFEST
                  ? e(window.__BUILD_MANIFEST)
                  : (window.__BUILD_MANIFEST_CB = function () {
                      e(window.__BUILD_MANIFEST);
                    });
              })),
              (this.promisedSsgManifest = new Promise(function (e) {
                window.__SSG_MANIFEST
                  ? e(window.__SSG_MANIFEST)
                  : (window.__SSG_MANIFEST_CB = function () {
                      e(window.__SSG_MANIFEST);
                    });
              }));
          },
          [
            {
              key: "getPageList",
              value: function () {
                return this.promisedBuildManifest.then(function (e) {
                  return e.sortedPages;
                });
              },
            },
            {
              key: "getDependencies",
              value: function (e) {
                var t = this;
                return this.promisedBuildManifest.then(function (n) {
                  return n[e]
                    ? n[e].map(function (e) {
                        return ""
                          .concat(t.assetPrefix, "/_next/")
                          .concat(encodeURI(e));
                      })
                    : Promise.reject(p(e));
                });
              },
            },
            {
              key: "getDataHref",
              value: function (e, t, n, r, o) {
                var a = this,
                  i = (0, f.parseRelativeUrl)(e),
                  l = i.pathname,
                  d = i.query,
                  p = i.search,
                  h = (0, f.parseRelativeUrl)(t).pathname,
                  m = v(l),
                  y = function (e) {
                    var t = (0, u.addLocale)((0, c.default)(e, ".json"), r, o);
                    return (0, u.addBasePath)(
                      "/_next/data/"
                        .concat(a.buildId)
                        .concat(t)
                        .concat(n ? "" : p)
                    );
                  },
                  g = (0, s.isDynamicRoute)(m),
                  S = g ? (0, u.interpolateAs)(l, h, d).result : "";
                return g ? S && y(S) : y(m);
              },
            },
            {
              key: "prefetchData",
              value: function (e, t, n, r) {
                var o = this,
                  a = v((0, f.parseRelativeUrl)(e).pathname);
                return this.promisedSsgManifest.then(function (i, u) {
                  return (
                    i.has(a) &&
                    (u = o.getDataHref(e, t, !0, n, r)) &&
                    !document.querySelector(
                      'link[rel="'.concat(h, '"][href^="').concat(u, '"]')
                    ) &&
                    y(u, h, "fetch").catch(function () {})
                  );
                });
              },
            },
            {
              key: "loadPage",
              value: function (e) {
                var t = this;
                return (
                  (e = v(e)),
                  new Promise(function (n, r) {
                    var o = t.pageCache[e];
                    if (o) "error" in o ? r(o.error) : n(o);
                    else {
                      var a = function (o) {
                        t.pageRegisterEvents.off(e, a),
                          delete t.loadingRoutes[e],
                          "error" in o ? r(o.error) : n(o);
                      };
                      if ((t.pageRegisterEvents.on(e, a), !t.loadingRoutes[e]))
                        (t.loadingRoutes[e] = !0),
                          t
                            .getDependencies(e)
                            .then(function (e) {
                              var t = [];
                              return (
                                e.forEach(function (e) {
                                  e.endsWith(".js") &&
                                    !document.querySelector(
                                      'script[src^="'.concat(e, '"]')
                                    ) &&
                                    t.push(
                                      (function (e) {
                                        return new Promise(function (t, n) {
                                          var r =
                                            document.createElement("script");
                                          (r.crossOrigin = void 0),
                                            (r.src = e),
                                            (r.onload = t),
                                            (r.onerror = function () {
                                              return n(p(e));
                                            }),
                                            document.body.appendChild(r);
                                        });
                                      })(e)
                                    ),
                                    e.endsWith(".css") &&
                                      !document.querySelector(
                                        'link[rel="'
                                          .concat(m, '"][href^="')
                                          .concat(e, '"]')
                                      ) &&
                                      y(e, m, "fetch").catch(function () {});
                                }),
                                Promise.all(t)
                              );
                            })
                            .catch(function (n) {
                              (t.pageCache[e] = { error: n }), a({ error: n });
                            });
                    }
                  })
                );
              },
            },
            {
              key: "registerPage",
              value: function (e, t) {
                var n = this;
                var r = e === this.initialPage;
                ("/_app" === e
                  ? Promise.resolve([])
                  : (r
                      ? Promise.resolve(
                          l(document.querySelectorAll("link[data-n-p]")).map(
                            function (e) {
                              return e.getAttribute("href");
                            }
                          )
                        )
                      : this.getDependencies(e).then(function (e) {
                          return e.filter(function (e) {
                            return e.endsWith(".css");
                          });
                        })
                    ).then(function (e) {
                      return Promise.all(
                        e.map(function (e) {
                          return (
                            (t = e),
                            fetch(t).then(function (e) {
                              if (!e.ok) throw p(t);
                              return e.text().then(function (e) {
                                return { href: t, text: e };
                              });
                            })
                          );
                          var t;
                        })
                      ).catch(function (e) {
                        if (r)
                          return l(document.styleSheets)
                            .filter(function (e) {
                              return (
                                e.ownerNode &&
                                "LINK" === e.ownerNode.tagName &&
                                e.ownerNode.hasAttribute("data-n-p")
                              );
                            })
                            .map(function (e) {
                              return {
                                href: e.ownerNode.getAttribute("href"),
                                text: l(e.cssRules)
                                  .map(function (e) {
                                    return e.cssText;
                                  })
                                  .join(""),
                              };
                            });
                        throw e;
                      });
                    })
                ).then(
                  function (r) {
                    return (function (r) {
                      try {
                        var o = t(),
                          a = { page: o.default || o, mod: o, styleSheets: r };
                        (n.pageCache[e] = a), n.pageRegisterEvents.emit(e, a);
                      } catch (i) {
                        (n.pageCache[e] = { error: i }),
                          n.pageRegisterEvents.emit(e, { error: i });
                      }
                    })(r);
                  },
                  function (t) {
                    (n.pageCache[e] = { error: t }),
                      n.pageRegisterEvents.emit(e, { error: t });
                  }
                );
              },
            },
            {
              key: "prefetch",
              value: function (e, t) {
                var n,
                  r,
                  o = this;
                if (
                  (n = navigator.connection) &&
                  (n.saveData || /2g/.test(n.effectiveType))
                )
                  return Promise.resolve();
                if (t) r = e;
                else;
                return Promise.all(
                  document.querySelector(
                    'link[rel="'.concat(h, '"][href^="').concat(r, '"]')
                  )
                    ? []
                    : [
                        r && y(r, h, r.endsWith(".css") ? "fetch" : "script"),
                        !t &&
                          this.getDependencies(e).then(function (e) {
                            return Promise.all(
                              e.map(function (e) {
                                return o.prefetch(e, !0);
                              })
                            );
                          }),
                      ]
                ).then(
                  function () {},
                  function () {}
                );
              },
            },
          ]
        );
      })();
      t.default = g;
    },
  },
  [["BMP1", 0, 1, 3]],
]);
