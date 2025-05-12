!(function () {
  var n = {
      4456: function (e, t, n) {
        var r = n(8057),
          o = n(9228),
          n = (n(8962), n(9898));
        e.exports = {
          checkDialogShow: function () {
            var n,
              e = new r(o.arrToSizzle(o.HtmlElemRoles.dialog));
            return (
              o.each(e, function (e, t) {
                t = new r(t);
                if (!t.isHidden()) return (n = t);
              }),
              n
            );
          },
          eventKeyCode: n.eventKeyCode,
          checkKeyCode: n.checkKeyCode,
          keyCodeSettings: n.keyCodeSettings,
        };
      },
      9898: function (e, t, n) {
        function o(e) {
          return (o =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var i = n(9724),
          a = n(1643);
        function r(e, t) {
          if (!e || !t) return !1;
          if (
            (void 0 === (t = !t.keyCode ? { keyCode: t } : t).status &&
              (t.status = !0),
            t.status && !i.get(a.keys().status))
          )
            return !1;
          var n = e.keyCode || e.which || e.charCode;
          if (
            n &&
            !(
              ("number" == typeof t.keyCode && t.keyCode != n) ||
              ("object" == o(t.keyCode) && [].indexOf.call(t.keyCode, n) < 0)
            )
          ) {
            var r = e.ctrlKey,
              n = e.shfitKey,
              e = e.altKey;
            return (
              !(t.ctrlKey && !r) && !(t.shfitKey && !n) && !(t.altKey && !e)
            );
          }
        }
        var s = {
          wakeup: {
            shiftKey: !1,
            ctrlKey: !0,
            altKey: !1,
            status: !1,
            keyCode: 192,
          },
          wakupConfig: {
            shiftKey: !1,
            ctrlKey: !0,
            altKey: !0,
            status: !0,
            keyCode: 76,
          },
          dialogClose: { shiftKey: !1, ctrlKey: !1, altKey: !1, keyCode: 27 },
          changeRegion: {
            next: {
              shiftKey: !1,
              ctrlKey: !0,
              altKey: !0,
              status: !0,
              keyCode: [34, 40],
            },
            pre: {
              shiftKey: !1,
              ctrlKey: !0,
              altKey: !0,
              status: !0,
              keyCode: [33, 38],
            },
          },
          opVoice: {
            shiftKey: !1,
            ctrlKey: !0,
            altKey: !0,
            status: !0,
            keyCode: 86,
          },
          vocierate: {
            shiftKey: !1,
            ctrlKey: !0,
            altKey: !0,
            status: !0,
            keyCode: 75,
          },
          mouseb: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 77 },
          mouseten: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 78 },
          reset: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 67 },
          readsrc: {
            shiftKey: !1,
            ctrlKey: !0,
            altKey: !0,
            status: !1,
            keyCode: 82,
          },
          bigsrc: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 66 },
          readtype: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 70 },
          exitservice: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 69 },
          changeTheme: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 84 },
          fontTob: {
            shiftKey: !1,
            ctrlKey: !0,
            altKey: !0,
            keyCode: [187, 107],
          },
          fontTos: {
            shiftKey: !1,
            ctrlKey: !0,
            altKey: !0,
            keyCode: [189, 109],
          },
          help: { shiftKey: !1, ctrlKey: !0, altKey: !0, keyCode: 191 },
          showImg: {
            shiftKey: !1,
            ctrlKey: !1,
            altKey: !0,
            keyCode: [57, 105],
          },
          showQrcode: {
            shiftKey: !1,
            ctrlKey: !1,
            altKey: !0,
            keyCode: [48, 96],
          },
        };
        e.exports = {
          eventKeyCode: function (e) {
            return e.keyCode || e.which || e.charCode;
          },
          checkKeyCode: r,
          keyCodeSettings: s,
          toWakeUpRead: function (e) {
            var t = e.altKey,
              n = e.keyCode || e.which || e.charCode;
            return (
              !(!t || !((48 <= n && n <= 57) || (96 <= n && n <= 105))) ||
              !!r(e, s.readsrc)
            );
          },
        };
      },
      1941: function (e, t, n) {
        var r = n(8962),
          o = n(6057),
          i = n(2125);
        e.exports = {
          ariaSettings: {
            get voice() {
              return r.voice.enable;
            },
            set voice(e) {
              e || i.stop(), (r.voice.enable = e);
            },
            get voiceRate() {
              return r.voice.rate;
            },
            set voiceRate(e) {
              r.voice.rate = e;
            },
            get scale() {
              return r.scale;
            },
            set scale(e) {
              (r.scale = e), o.setBodyTran();
            },
            get themes() {
              return r.Themes;
            },
            get theme() {
              return r.defaultTheme;
            },
            set theme(e) {
              (r.defaultTheme = e), o.setSettingTheme();
            },
            readSrc: function (e) {
              if (void 0 === e) return r.status && r.readsrc;
              (r.readsrc = e),
                (r.status = e) &&
                  ((r.voice.enable = !1),
                  (r.defaultTheme = "default"),
                  (r.scale = 1),
                  i.stop());
            },
            zzms: function (e) {
              if (void 0 === e) return r.status && !r.readsrc;
              e && ((r.readsrc = !1), (r.voice.enable = !0));
            },
          },
        };
      },
      755: function (e, t, n) {
        var r = n(9228);
        e.exports = {
          check: function () {
            return !0;
          },
          browserIE: function () {
            return "IE" == r.browser.getBrowserInfo().browser;
          },
        };
      },
      7316: function (e, t, n) {
        var r = n(9724),
          o = n(1643),
          i = o.keys(),
          n = "/api/services/Accessibility",
          a = {
            data: {
              config: n + "/Configuration/GetAll",
              curconf: n + "/Configuration/GetConf",
              security: n + "/Security/Get",
              ttsurl: n + "/TTS/Create",
            },
            get serviceUrl() {
              var e =
                  location.protocol +
                  "://" +
                  location.host +
                  ":" +
                  location.port,
                t = r.get(i.runtime.serviceUrl);
              return null != t ? t : e;
            },
            set serviceUrl(e) {
              r.set(i.runtime.serviceUrl, e);
            },
            get config() {
              return this.serviceUrl + a.data.config;
            },
            get curconf() {
              return this.serviceUrl + a.data.curconf;
            },
            get security() {
              return this.serviceUrl + a.data.security;
            },
            get ttsurl() {
              return a.data.ttsurl.indexOf("//") < 0
                ? this.serviceUrl + a.data.ttsurl
                : a.data.ttsurl;
            },
          };
        e.exports = {
          keys: i,
          api: a,
          elem: { shortCutIcon: "aria-shortCutIcon" },
          copyright: {
            name: "aria",
            version: "3.0.1",
            description: "无障碍功能脚本",
            author: "Locas",
          },
          getAppid: o.getAppid,
        };
      },
      1643: function (e) {
        var a = {
          val: function (e, t) {
            if (
              ((t = t || location.search.substring(1)),
              !new RegExp("(^|/?|&)" + e + "=([^&]*)(/s|&|$)", "i").test(t))
            )
              return "";
            try {
              return JSON.parse(RegExp.$2);
            } catch (e) {
              return RegExp.$2;
            }
          },
        };
        function s() {
          var e = document.scripts,
            t = "aria.";
          window.isAriaDev && (t = "ariaDev");
          for (var n = {}, r = 0; r < e.length; r++) {
            var o = e[r],
              i = o.src.indexOf("/" + t);
            if (
              (i <= 0 && (i = o.src.indexOf("/_" + t)),
              null !== o.src && -1 < i)
            ) {
              (n.road = o.src.substr(0, i + 1)),
                (n.appid = a.val("appid", o.src)),
                (n.success = !0);
              break;
            }
          }
          return n;
        }
        var l = "aria";
        window.isAriaDev && (l = "ariaDev");
        var t = null;
        var n = {
          en: "welcome {0},When a blind user enters the intelligent blind lane, press the shortcut key Ctrl + Alt + R; To read the detailed operation instructions, press the shortcut key Ctrl + Alt + question mark",
          "zh-CN":
            "欢迎进入 {0},盲人用户进入智能盲道请按快捷键Ctrl+Alt+R；阅读详细操作说明请按快捷键Ctrl+Alt+问号键。",
        };
        e.exports = {
          keys: function () {
            var e = s().appid;
            if (window.ariaAppId == e && window.ariaKeys)
              return window.ariaKeys;
            window.ariaAppId = e;
            function t() {
              return l + "/" + e;
            }
            function n() {
              return t() + "/runtime/settings";
            }
            function r() {
              return t() + "/data/settings";
            }
            function o() {
              return t() + "/runtime";
            }
            function i() {
              return t() + "/data";
            }
            var a = l + "/userSettings";
            return (
              (window.ariaKeys = {
                base: l,
                status: l + "/status",
                userSettings: {
                  root: a,
                  defaultTheme: a + "/defaultTheme",
                  scale: a + "/scale",
                  ariaPointerRead: a + "/ariaPointerRead",
                  bigpoint: a + "/bigpoint",
                  leftfixed: a + "/leftfixed",
                  topfixed: a + "/fixed",
                  readtype: a + "/readtype",
                  readsrc: a + "/readsrc",
                  voice: {
                    root: a + "/voice",
                    enable: a + "/voice/enable",
                    rate: a + "/voice/rate",
                  },
                  mousemode: a + "/mousemode",
                  mouseten: a + "/mouseten",
                  py: a + "/py",
                  big5: a + "/big5",
                  bigsrc: a + "/bigsrc",
                  canRead: a + "/canRead",
                },
                road: t() + "/road",
                root: t(),
                runtime: {
                  root: o(),
                  serviceUrl: o() + "/serviceUrl",
                  security: o() + "/security",
                  appid: o() + "/appid",
                  settings: {
                    root: n(),
                    highlight: {
                      root: n() + "/highlight",
                      enable: n() + "/highlight/enable",
                      rate: n() + "/highlight/rate",
                      mode: n() + "/highlight/mode",
                    },
                    voice: {
                      root: n() + "/voice",
                      enable: n() + "/voice/enable",
                      maxRate: n() + "/voice/maxRate",
                      minRate: n() + "/voice/minRate",
                      rate: n() + "/voice/rate",
                    },
                    curregion: { id: n() + "/curregion/id" },
                    golabSkipScale: n() + "/golabSkipScale",
                    golabSkipAll: n() + "/golabSkipAll",
                    golabSkipTheme: n() + "/golabSkipTheme",
                    golabFocus: n() + "/golabFocus",
                    golabRegion1: n() + "/golabRegion1",
                    golabRegion2: n() + "/golabRegion2",
                    golabRegion3: n() + "/golabRegion3",
                    golabRegion4: n() + "/golabRegion4",
                    golabReplaceBg: n() + "/golabReplaceBg",
                    tellerMode: n() + "/tellerMode",
                    defaultLanguage: n() + "/defaultLanguage",
                    shortCutIcon: n() + "/shortCutIcon",
                    css: n() + "/css",
                    closeShortIcon: n() + "/closeShortIcon",
                    bodyfont: n() + "/bodyfont",
                    reticle: n() + "/reticle",
                    spacing: n() + "/spacing",
                    padding: n() + "/padding",
                    maxZoom: n() + "/maxZoom",
                    minZoom: n() + "/minZoom",
                  },
                },
                data: {
                  root: i(),
                  version: l + "/version",
                  languages: i() + "/languages",
                  themes: i() + "/theme",
                  golbalElems: i() + "/golbalElems",
                  roles: i() + "/roles",
                  conf: { root: i() + "/conf", region: i() + "/conf/region" },
                  settings: {
                    root: r(),
                    enable: r() + "/enable",
                    topfixed: r() + "/fixed",
                    highlight: {
                      root: r() + "/highlight",
                      enable: r() + "/highlight/enable",
                      rate: r() + "/highlight/rate",
                      mode: r() + "/highlight/mode",
                    },
                    voice: {
                      root: r() + "/voice",
                      enable: r() + "/voice/enable",
                      rate: r() + "/voice/rate",
                    },
                    tellerMode: r() + "/tellerMode",
                    defaultTheme: r() + "/defaultTheme",
                    defaultLanguage: r() + "/defaultLanguage",
                    shortCutIcon: r() + "/shortCutIcon",
                    scale: r() + "/scale",
                    golabFixedCss: r() + "/golabFixedCss",
                    golabCss: r() + "/golabCss",
                    iconType: r() + "/iconType",
                    spacing: r() + "/spacing",
                    padding: r() + "/padding",
                  },
                },
              }),
              window.ariaKeys
            );
          },
          getAppid: s,
          queryString: a,
          AppIdChangeAddListen: function (e) {
            t = setInterval(function () {
              (appid = s().appid),
                window.ariaAppId != appid &&
                  e &&
                  "function" == typeof e &&
                  ((window.ariaAppId = appid), e());
            }, 1500);
          },
          AppIdChangeRemoveListen: function () {
            clearInterval(t), (t = null);
          },
          addWelcomeContent: function () {
            var e =
                document.querySelector("html").getAttribute("lang") || "zh-CN",
              t = n[e];
            t &&
              ((t = t.replace("{0}", document.title)),
              (e = document.querySelector("#ariaTipText")) ||
                (((e = document.createElement("a")).id = "ariaTipText"),
                e.setAttribute("role", "pagedescription"),
                e.setAttribute("aria-label", t),
                e.setAttribute("href", "javascript:void(0)"),
                document.body.insertBefore(
                  e,
                  document.body.firstElementChild
                )));
          },
          welcomeContent: n,
        };
      },
      3969: function (e, t, n) {
        var r = n(3334),
          o = "aria";
        window.isAriaDev && (o = "ariaDev"),
          (e.exports = {
            get status() {
              var e = r.getCookie(o + "Status");
              if (void 0 !== e) return JSON.parse(e);
            },
            set status(e) {
              r.setCookie(o + "Status", e);
            },
            get bigsrc() {
              var e = r.getCookie(o + "Bigsrc");
              if (void 0 !== e) return JSON.parse(e);
            },
            set bigsrc(e) {
              r.setCookie(o + "Bigsrc", e);
            },
            get defaultTheme() {
              return r.getCookie(o + "DefaultTheme");
            },
            set defaultTheme(e) {
              r.setCookie(o + "DefaultTheme", e);
            },
            get fixed() {
              var e = r.getCookie(o + "Fixed");
              if (void 0 !== e) return JSON.parse(e);
            },
            set fixed(e) {
              r.setCookie(o + "Fixed", e);
            },
            get mousemode() {
              var e = r.getCookie(o + "Mousemode");
              if (void 0 !== e) return JSON.parse(e);
            },
            set mousemode(e) {
              r.setCookie(o + "Mousemode", e);
            },
            get mouseten() {
              var e = r.getCookie(o + "Mouseten");
              if (void 0 !== e && "undefined" != e) return JSON.parse(e);
            },
            set mouseten(e) {
              r.setCookie(o + "Mouseten", e);
            },
            get scale() {
              var e = r.getCookie(o + "Scale");
              return void 0 !== e && "undefined" != e ? JSON.parse(e) : 1;
            },
            set scale(e) {
              r.setCookie(o + "Scale", e);
            },
            get readtype() {
              var e = r.getCookie(o + "Readtype");
              if (void 0 !== e && "undefined" != e) return JSON.parse(e);
            },
            set readtype(e) {
              r.setCookie(o + "Readtype", e);
            },
            clearAll: function () {
              r.devareCookie(o + "Bigsrc"),
                r.devareCookie(o + "Readtype"),
                r.devareCookie(o + "Fixed"),
                r.devareCookie(o + "Mouseten"),
                r.devareCookie(o + "Scale"),
                r.devareCookie(o + "Mousemode"),
                r.devareCookie(o + "DefaultTheme");
            },
          });
      },
      954: function (e, t, n) {
        function i(e) {
          return (i =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var a = n(7316),
          s = n(9632),
          l = n(8962);
        n(9228);
        e.exports = {
          init: function (o) {
            return new Promise(function (t, e) {
              l.conf && 30 < l.conf.lenght && (l.conf = []);
              var r = l.conf || [];
              r && "object" != i(r) && (r = JSON.parse(r)),
                s.getService().then(function () {
                  if (((o = o || {}), !l.appid && !o.appid))
                    throw "请先设置Appid字段，请登录后台查看";
                  if (l.curpageConf) return t(l.conf);
                  var n;
                  o.serviceUrl && (l.serviceUrl = o.serviceUrl),
                    o.appid && (l.appid = o.appid),
                    o.appid || (o.appid = l.appid),
                    o.beforeInit &&
                      "function" == typeof o.beforeInit &&
                      o.beforeInit(),
                    (n = o),
                    new Promise(function (t, e) {
                      s.checkUpdateToken()
                        ? s
                            .get(a.api.config, { appid: n.appid })
                            .then(function (e) {
                              (l.data = e), l.init(e.settings), t(e);
                            })
                        : t(l.data);
                    }).then(
                      function () {
                        s.get(a.api.curconf).then(function (e) {
                          null != e
                            ? r.push({ name: window.location.href, value: e })
                            : r.push({ name: window.location.href, value: {} }),
                            (l.conf = r),
                            t(e);
                        });
                      },
                      function (e) {}
                    );
                });
            });
          },
          settings: l,
          checkJs: function () {
            s.checkUpdateToken() && l.clear();
            var e = a.getAppid();
            return (l.appid = e.appid), (l.road = e.road), e.success;
          },
        };
      },
      9632: function (e, t, n) {
        function o(e) {
          return (o =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var a = n(9438),
          s = n(9724),
          l = n(9228),
          c = n(7316);
        function u() {
          var e = s.get(c.keys.runtime.security);
          return (
            void 0 === e ||
            null == e ||
            !e ||
            !e.token ||
            !e.timestamp ||
            e.timestamp < new Date().getTime() - 864e5
          );
        }
        function i() {
          return new Promise(function (t, e) {
            var n = s.get(c.keys.runtime.serviceUrl),
              r = s.get(c.keys.road);
            n
              ? t()
              : a.get(r + "config.json").then(function (e) {
                  (e = "object" != o(e) ? JSON.parse(e) : e).url ||
                    (e.url = location.protocol + "//" + location.host),
                    s.set(c.keys.runtime.serviceUrl, e.url),
                    t();
                });
          });
        }
        function r(r) {
          return new Promise(function (n, e) {
            (r = r || {}),
              i().then(function () {
                new Promise(function (t, n) {
                  var r,
                    o,
                    e,
                    i = s.get(c.keys.runtime.security);
                  u()
                    ? ((r = new Date().getTime()),
                      (o = s.get(c.keys.runtime.appid)),
                      (e = {
                        data: { timestamp: r, appid: o },
                        headers: [],
                        url: c.api.security,
                        error: function () {},
                      }),
                      a.ajax(e).then(function (e) {
                        void 0 !== e
                          ? ((e = (e = l.isIE() ? JSON.parse(e) : e).result),
                            s.set(c.keys.runtime.security, {
                              timestamp: r,
                              appid: o,
                              token: e.token,
                            }),
                            t({ timestamp: r, token: e.token, appid: o }))
                          : n("未传出参数");
                      }))
                    : t(i);
                }).then(function (e) {
                  (e.referer = encodeURIComponent(document.location.href)),
                    r.data &&
                      "function" == typeof r.data &&
                      ((r.success = r.data), (r.data = {})),
                    (r.data = Object.assign({}, r.data, e)),
                    r.headers || (r.headers = []),
                    r.headers &&
                      "object" === o(r.headers) &&
                      (r.headers["Content-Type"] ||
                        r.headers.push({
                          name: "Content-Type",
                          value: "application/json",
                        })),
                    r.headers.push({
                      name: "Accept-Language",
                      value: "zh-Hans",
                    }),
                    r.error || (r.error = function (e) {});
                  var t = r.success;
                  (r.success = null),
                    a.ajax(r).then(
                      function (e) {
                        l.isIE() && (e = JSON.parse(e)),
                          t && "function" == typeof t && t(e.result),
                          n(e.result);
                      },
                      function (e, t) {}
                    );
                });
              });
          });
        }
        e.exports = {
          ajax: r,
          get: function (e, t, n) {
            return r({ url: e, type: "GET", data: t, success: n });
          },
          post: function (e, t, n) {
            return r({ url: e, type: "POST", data: t, success: n });
          },
          checkUpdateToken: u,
          getService: i,
        };
      },
      8962: function (e, t, n) {
        function r(e) {
          return (r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var o,
          i = n(7316),
          a = n(2392),
          s = n(9724),
          l = n(9228),
          c = n(3969),
          u = i.keys.runtime,
          d = i.keys.data,
          f = i.keys.userSettings,
          p = {
            hostEnable: {
              get highlight() {
                if (p.Theme) return p.Theme.highlight.enable;
              },
              get mouseover() {
                if (p.Theme) return p.Theme.mouseover.enable;
              },
              get focus() {
                if (p.Theme) return p.Theme.focus.enable;
              },
              get region() {
                if (p.Theme) return p.Theme.region.enable;
              },
              get voice() {
                return s.get(d.settings.voice.enable);
              },
              get shortCutIcon() {
                return s.get(d.settings.shortCutIcon);
              },
              get fontScal() {
                return 0 <= s.get(d.settings.scale);
              },
              get enable() {
                return s.get(d.settings.enable);
              },
            },
            init: function (e) {
              var t = s.get(u.settings.root),
                t = a(!0, e, t);
              s.set(u.settings.root, t);
            },
            clear: function () {
              s.remove(i.keys.data.root), s.remove(i.keys.runtime.root);
            },
            clearAll: function () {
              s.remove(i.keys.base);
            },
            reset: function () {
              var e = s.get(f.voice.root);
              s.set(f.root, {}), s.set(f.voice.root, e), c.clearAll();
            },
            className: {
              region: "ariaregion",
              highlight: "ariahighlight",
              focus: "ariafocus",
            },
            get golabFixedCss() {
              return s.get(d.settings.golabFixedCss);
            },
            get golabCss() {
              return s.get(d.settings.golabCss);
            },
            get golabSkipScale() {
              return s.get(u.settings.golabSkipScale);
            },
            get golabReplaceBg() {
              return s.get(u.settings.golabReplaceBg);
            },
            get golabSkipAll() {
              return s.get(u.settings.golabSkipAll);
            },
            get golabFocus() {
              return s.get(u.settings.golabFocus);
            },
            get golabRegion1() {
              return s.get(u.settings.golabRegion1);
            },
            get golabRegion2() {
              return s.get(u.settings.golabRegion2);
            },
            get golabRegion3() {
              return s.get(u.settings.golabRegion3);
            },
            get golabRegion4() {
              return s.get(u.settings.golabRegion4);
            },
            get golabSkipTheme() {
              return s.get(u.settings.golabSkipTheme);
            },
            get topfixed() {
              var e = c.fixed;
              return (
                void 0 === (e = void 0 === e ? s.get(f.topfixed) : e) &&
                  ((e = s.get(d.settings.topfixed)),
                  s.set(f.topfixed, e),
                  (c.fixed = e)),
                e
              );
            },
            set topfixed(e) {
              s.set(f.topfixed, e), (c.fixed = e);
            },
            get minZoom() {
              var e = s.get(u.settings.minZoom);
              return (e = 0 == e ? 0.5 : e);
            },
            get maxZoom() {
              var e = s.get(u.settings.maxZoom);
              return (e = 0 == e ? 0.5 : e);
            },
            get py() {
              return s.get(f.py);
            },
            set py(e) {
              s.set(f.py, e);
            },
            get big5() {
              return s.get(f.big5);
            },
            set big5(e) {
              s.set(f.big5, e);
            },
            get canRead() {
              return s.get(f.canRead);
            },
            set canRead(e) {
              s.set(f.canRead, e);
            },
            get iconType() {
              var e = s.get(d.settings.iconType);
              return (e = void 0 === e || 0 == e ? 1 : e);
            },
            get themeRoad() {
              return this.road + "public/theme/" + this.iconType;
            },
            get readsrc() {
              return s.get(f.readsrc);
            },
            set readsrc(e) {
              s.set(f.readsrc, e);
            },
            get readtype() {
              return void 0 === c.readtype ? s.get(f.readtype) : c.readtype;
            },
            set readtype(e) {
              s.set(f.readtype, e), (c.readtype = e);
            },
            get leftfixed() {
              return s.get(f.leftfixed);
            },
            set leftfixed(e) {
              s.set(f.leftfixed, e);
            },
            get bigpoint() {
              return s.get(f.bigpoint);
            },
            set bigpoint(e) {
              s.set(f.bigpoint, e);
            },
            get reticle() {
              return s.get(u.settings.reticle);
            },
            set reticle(e) {
              s.set(u.settings.reticle, e);
            },
            set conf(e) {
              "object" != r(e) && (e = JSON.parse(e)), s.set(d.conf.root, e);
            },
            get golbalElems() {
              return s.get(d.golbalElems);
            },
            get conf() {
              return s.get(d.conf.root);
            },
            get curpageConf() {
              var t = top.location.href,
                e = s.get(d.conf.root);
              if (e)
                return 0 <
                  (e = (e = "object" != r(e) ? JSON.parse(e) : e).filter(
                    function (e) {
                      return e.name == t;
                    }
                  )).length
                  ? e[0]
                  : void 0;
            },
            confQuerySelector: function (e) {
              if (e && (n = e.key)) {
                switch (e.type) {
                  case 1:
                    for (
                      var t = n.split(" "),
                        n = "#" === t[0].substr(0, 1) ? t[0] : "#" + t[0],
                        r = 1;
                      r < t.length;
                      r++
                    )
                      0 < (i = t[r]).length &&
                        ((n += ":is("),
                        (n += "#" === i.substr(0, 1) ? i : "#" + i),
                        (n += ")"));
                    return n;
                  case 2:
                    var o = n.split(" ");
                    n = "." === o[0].substr(0, 1) ? o[0] : "." + o[0];
                    for (var i, r = 1; r < o.length; r++)
                      0 < (i = o[r]).length &&
                        ((n += ":is("),
                        (n += "." === i.substr(0, 1) ? i : "." + i),
                        (n += ")"));
                    return n;
                }
                return n;
              }
            },
            get shortCutIcon() {
              return s.get(u.settings.shortCutIcon);
            },
            set shortCutIcon(e) {
              s.set(u.settings.shortCutIcon, e);
            },
            get scale() {
              var e = s.get(f.scale) || c.scale;
              return (
                e ||
                  ((e = s.get(d.settings.scale)),
                  s.set(f.scale, e),
                  (c.scale = e)),
                e
              );
            },
            set scale(e) {
              (e = parseFloat(e)), s.set(f.scale, e), (c.scale = e);
            },
            get road() {
              return s.get(i.keys.road);
            },
            set road(e) {
              s.set(i.keys.road, e);
            },
            get ariaPointerRead() {
              return s.get(f.ariaPointerRead);
            },
            set ariaPointerRead(e) {
              s.set(f.ariaPointerRead, e);
            },
            get bodyfont() {
              var e = s.get(u.settings.bodyfont);
              return e
                ? 24 < e
                  ? 24
                  : e
                : ((e = parseInt(l.getStyle(document.body)["font-size"], 10)),
                  s.set(u.settings.bodyfont, (e = 24 < e ? 24 : e)),
                  e);
            },
            get inFrame() {
              return window.self !== top;
            },
            get data() {
              return s.get(i.keys.data.root);
            },
            set data(e) {
              s.set(i.keys.data.root, e);
            },
            get appid() {
              return s.get(u.appid);
            },
            set appid(e) {
              s.set(u.appid, e);
            },
            get serviceUrl() {
              return s.get(u.serviceUrl);
            },
            set serviceUrl(e) {
              s.set(u.serviceUrl, e);
            },
            get root() {
              return s.get(u.root);
            },
            get settingsRoot() {
              return s.get(u.settings.root);
            },
            voice: {
              set enable(e) {
                s.set(f.voice.enable, e), s.set(f.voice.isActive, e);
              },
              get enable() {
                var e = s.get(f.voice.enable);
                return (
                  void 0 === e &&
                    ((e = s.get(d.settings.voice.enable)),
                    s.set(f.voice.enable, e)),
                  e
                );
              },
              get maxRate() {
                var e = s.get(i.keys.runtime.settings.voice.maxRate);
                return (e = e < 2 ? 3 : e);
              },
              get minRate() {
                var e = s.get(i.keys.runtime.settings.voice.minRate);
                return (e = e <= 0.5 ? 0.5 : e);
              },
              get rate() {
                var e = s.get(f.voice.rate);
                return (
                  void 0 === e &&
                    ((e = s.get(d.settings.voice.rate)),
                    s.set(f.voice.rate, e)),
                  e
                );
              },
              set rate(e) {
                s.set(f.voice.rate, e);
              },
            },
            highlight: {
              set enable(e) {
                s.set(u.settings.highlight.enable, e),
                  s.set(u.settings.highlight.isActive, e);
              },
              get enable() {
                return s.get(u.settings.highlight.enable);
              },
              get rate() {
                return s.get(u.settings.highlight.rate);
              },
              set rate(e) {
                s.set(u.settings.highlight.rate, e);
              },
              get mode() {
                return s.get(u.settings.highlight.mode);
              },
              set mode(e) {
                s.set(u.settings.highlight.mode, e);
              },
            },
            get padding() {
              return s.get(u.settings.padding);
            },
            set padding(e) {
              s.set(u.settings.padding, e);
            },
            get spacing() {
              return s.get(u.settings.spacing);
            },
            set spacing(e) {
              s.set(u.settings.spacing, e);
            },
            get tellerMode() {
              return s.get(u.settings.tellerMode);
            },
            set tellerMode(e) {
              s.set(u.settings.tellerMode, e);
            },
            get status() {
              return void 0 !== c.status && c.status;
            },
            set status(e) {
              c.status = e;
            },
            get mousemode() {
              return c.mousemode;
            },
            set mousemode(e) {
              c.mousemode = e;
            },
            get mouseten() {
              return c.mouseten;
            },
            set mouseten(e) {
              c.mouseten = e;
            },
            get bigsrc() {
              return c.bigsrc;
            },
            set bigsrc(e) {
              c.bigsrc = e;
            },
            get defaultTheme() {
              var e = c.defaultTheme || s.get(f.defaultTheme);
              return (
                (void 0 !== e && "undefined" != e) ||
                  ((e = s.get(d.settings.defaultTheme)),
                  s.set(f.defaultTheme, e),
                  (c.defaultTheme = e)),
                e
              );
            },
            set defaultTheme(e) {
              s.set(f.defaultTheme, e), (c.defaultTheme = e);
            },
            get Theme() {
              var t = p.defaultTheme;
              if (t) {
                var e = s.get(i.keys.data.themes),
                  e = (e = "object" != r(e) ? JSON.parse(e) : e).filter(
                    function (e) {
                      return e.name == t;
                    }
                  );
                return (o = 0 < e.length ? e[0].value : o);
              }
            },
            get Themes() {
              var e = s.get(i.keys.data.themes);
              return void 0 === e ? [] : "object" != r(e) ? JSON.parse(e) : e;
            },
            get defaultLanguage() {
              return s.get(u.settings.defaultLanguage);
            },
            set defaultLanguage(e) {
              s.set(u.settings.defaultLanguage, e);
            },
            get Language() {
              var e = this.defaultLanguage;
              if (e) return s.get(i.keys.data.languages)[e];
            },
            get Languages() {
              return s.get(i.keys.data.languages);
            },
            getText: function (e) {
              var t = this.Language;
              if (t) return t[e];
            },
            set closeShortIcon(e) {
              s.set(u.settings.closeShortIcon, e);
            },
            get closeShortIcon() {
              return s.get(u.settings.closeShortIcon);
            },
          };
        e.exports = p;
      },
      2264: function (e) {
        e.exports = {
          globalListen: "globalListen",
          voicePlay: "voicePlay",
          click: "click",
          focusIn: "focusIn",
          blur: "blur",
          globalStart: "globalStart",
          globalEnd: "globalEnd",
          startService: "startService",
          endService: "endService",
          SizzleKeyDown: "SizzleKeyDown",
          TouchWakeup: "TouchWakeup",
        };
      },
      57: function (e, t, n) {
        function r(e) {
          return (r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var i = n(9228),
          n = n(2264),
          a = [];
        e.exports = {
          registerEvent: function (e, t, n) {
            "object" == r(e) && a.push(e),
              a.push({ name: e, event: t, priority: n });
          },
          execEvent: function (t, n) {
            if (t) {
              for (var r = !1, o = 0; o < 10; o++) {
                var e = a.filter(function (e) {
                  return e.name == t && e.priority == o;
                });
                i.each(e, function (e, t) {
                  t &&
                    t.event &&
                    "function" == typeof t.event &&
                    (r =
                      "array" == i.type(n)
                        ? r || t.event.apply(this, n)
                        : r || t.event.call(this, n));
                });
              }
              return r;
            }
          },
          eventNames: n,
        };
      },
      2133: function (e, t, n) {
        var c,
          r,
          u,
          d = n(8057),
          f = n(4456),
          p = n(8962),
          g = (n(2125), ["aria-message", "aria-error", "aria-success"]),
          h = n(5602),
          o =
            (window.document,
            window.MutationObserver ||
              window.WebKitMutationObserver ||
              window.MozMutationObserver);
        function i(e) {
          if (void 0 !== e) {
            (c = c || p.Language), (u = "");
            var t = f.checkDialogShow(),
              n = [],
              r = new d(document.activeElement);
            t &&
              0 < t.length &&
              !r.aria.dialog &&
              (document.activeElement.blur(),
              (t.aria.tabindex = 0),
              t.focus(),
              (u = t.aria.lastText));
            var o,
              i = !1;
            for (o in e) {
              var a,
                s = o.type,
                l = o.target;
              switch (s) {
                case "childList":
                  i = !0;
                  break;
                case "attributes":
                  -1 < [].indexOf.call(g, o.attributeName) &&
                    (a = new d(l).attr(o.attributeName)) &&
                    [].indexOf.call(n, l) < 0 &&
                    ((u += c[o.attributeName] + a), n.push(l));
              }
            }
            i && (h.end(), p.status && h.start()), u.length;
          }
        }
        e.exports = {
          start: function (e) {
            !r &&
              o &&
              (r = new o(i)).observe(e.body, {
                childList: !1,
                subtree: !0,
                attributes: !0,
                attributeOldValue: !0,
              });
          },
          end: function () {
            r && r.disconnect();
          },
        };
      },
      8528: function (e, t, n) {
        var s,
          l = n(8057),
          c = n(8962),
          u = n(9228);
        e.exports = {
          breakEvents: function (e, t) {
            try {
              if (
                "true" == e.ariaAttr("skipall") ||
                "ariaContainer" == e.aria.id ||
                "body" == e.aria.role ||
                "iframe" == e.aria.role
              )
                return !0;
            } catch (e) {
              return !0;
            }
            return !1;
          },
          breakEventsFirst: function (e) {
            return (
              1 != e.target.nodeType ||
              (9 == e.target.nodeType && 2 == c.readtype) ||
              "HTML" == e.target.nodeName ||
              "BODY" == e.target.nodeName
            );
          },
          viewDocument: function (e) {
            try {
              return e.target.ownerDocument;
            } catch (e) {}
          },
          realPlayElem: function (e) {
            if (e.aria.atomic) return e.aria.atomicElem;
            if (e.ariaAttr("label")) return e;
            var t = e.parent();
            return "a" == t.aria.role
              ? (t.aria.atomic ||
                  (e.attr("title") &&
                    !t.attr("title") &&
                    t.attr("title", e.attr("title")),
                  e.attr("alt") &&
                    !t.attr("alt") &&
                    t.attr("alt", e.attr("alt")),
                  e.attr("aria-label") &&
                    !t.attr("aria-label") &&
                    t.attr("aria-label", e.attr("aria-label"))),
                t)
              : e.find("*").length < 2 || 0 == (t = e.childNodes()).length
              ? e
              : (1 == t.length && "A" == t[0].nodeName) ||
                3 == t[0].nodeType ||
                (-1 < [].indexOf.call(["ul", "li"], e.aria.nodeName) &&
                  -1 <
                    [].indexOf.call(
                      ["A", "H1", "H2", "H3", "H4", "H5"],
                      t[0].nodeName
                    ))
              ? new l(t[0])
              : -1 <
                [].indexOf.call(
                  [
                    "td",
                    "li",
                    "dd",
                    "label",
                    "span",
                    "a",
                    "p",
                    "img",
                    "h1",
                    "h2",
                    "h3",
                    "h4",
                    "h5",
                    "h6",
                  ],
                  e.aria.role
                )
              ? e
              : void 0;
          },
          CenterScale: function (e, t) {
            (s = s || c.Language),
              new l(".ariaBigCenterScale").remove(),
              (t = t || 2);
            var n = document.createElement("div");
            n.classList.add("ariaBigCenterScale"),
              n.setAttribute("role", "dialog"),
              n.setAttribute("tabindex", 0),
              n.setAttribute(
                "aria-label",
                e.aria.lastText + "," + s.keyESCExist
              );
            var r = document.createElement("div");
            r.classList.add("ariablackground"), n.appendChild(r);
            var o = e.firstNode.cloneNode(!0);
            o.classList.add("ariaCloneDom"),
              o.removeAttribute("aria-isCenterScale"),
              n.appendChild(o),
              document.body.appendChild(n);
            var i = new l(".ariaCloneDom"),
              a = i.width();
            return (
              0 == a && (a = e.width()),
              0 == (r = i.height()) && (r = e.height()),
              (e = isNaN(a) || 0 == a ? 2 : window.innerWidth / t / a),
              (t = isNaN(r) || 0 == r ? 2 : window.innerHeight / t / r),
              (e = t < e ? t : e),
              "IMG" != o.nodeName
                ? ((o.style.zoom = e),
                  u.isFF() && (o.style.transform = "scale(" + e + ")"))
                : 400 < a * e
                ? i.css({ width: a * e, height: r * e })
                : i.css({ width: 400, height: "auto" }),
              setTimeout(function () {
                n.focus();
              }, 150),
              !0
            );
          },
          removeCenterScale: function () {
            new l(".ariaBigCenterScale").remove();
          },
        };
      },
      7524: function (e, t, n) {
        n(2125);
        var l = n(8057),
          c = n(954).settings,
          u = n(3497),
          d = n(1643);
        e.exports = {
          start: function () {
            var e = e || c.Language,
              t = "";
            if (c.readsrc) {
              (t = e.firstRead_welcome + " " + document.title),
                (regions = u.getAll());
              for (var n = !1, r = 0, o = 1; o < 7; o++)
                (r += i = regions[o] ? regions[o].length : 0),
                  0 < i &&
                    (n || (t += e.firstRead_first),
                    (n = !0),
                    (t += i + e.firstRead_unit + e["regiontype" + o] + ","));
              0 < r && (t += e.firstRead_sum.replace("{0}", r) + ",");
              for (var i, o = 1; o < 7; o++)
                0 < (i = regions[o] ? regions[o].length : 0) &&
                  ((t += (
                    1 < i ? e.firstRead_loopvisit : e.firstRead_visit
                  ).replace("{0}", o)),
                  (t += e["regiontype" + o] + ","));
              (t += e.firstRead_remark), (t += e.ariaacchelpbook);
            } else {
              var e =
                document.querySelector("html").getAttribute("lang") || "zh-CN";
              t = (t =
                (t =
                  (t = d.welcomeContent[e]) ||
                  new l('[name="description"]', document.head).attr(
                    "content"
                  )) || document.title).replace("{0}", document.title);
            }
            var a,
              s = new l("#ariaTipText");
            0 == s.length &&
              (document.body.focus(),
              (a = document.createElement("a")).setAttribute(
                "href",
                "javascript:void(0)"
              ),
              a.setAttribute("role", "pagedescription"),
              (a.id = "ariaTipText"),
              document.body.insertBefore(a, document.body.firstElementChild),
              (s = new l("#ariaTipText"))),
              s.ariaAttr("label", t);
          },
        };
      },
      1151: function (e, t, n) {
        var r = n(5045),
          o = n(8057),
          i = n(2125),
          a = n(9228),
          s = n(8962),
          l = n(5046),
          c = n(8528),
          n = n(8528),
          u = n.viewDocument,
          d = n.realPlayElem;
        function f(e) {
          var t;
          2 == s.readtype ||
            (function (e) {
              a.stopBubble(), a.stopDefault();
              e = new o(e.target);
              if (e.aria.isCenterScale) {
                if (!e.ariaAttr("fromClone"))
                  return c.CenterScale(e, 2), e.ariaAttr("fromClone", !0), !0;
                e.removeAttr("fromClone");
              }
            })(e) ||
            ((t = e.target),
            "hover" == (t = new o(t)).aria.expandShowMethod &&
              (a.triggerEvent(e.target, "mouseover"),
              a.triggerEvent(e.target, "mousemove")),
            "click" == t.aria.expandShowMethod &&
              a.triggerEvent(e.target, "click"),
            r.setClass(t, u(e)),
            2 != s.readtype &&
              (l.foucseEvent(e),
              c.breakEvents(t, e) ||
                (t.aria.dialog || (globalActiveElem = t),
                t.ariaAttr("label")
                  ? i.play(t.aria.lastText)
                  : (t = d(t)) &&
                    window.playElem != t &&
                    ((window.playElem = t), i.play(t.aria.lastText)))));
        }
        function p(e) {}
        e.exports = {
          start: function (e) {
            (e = e || document),
              new o(e).on("focusin", "*:not(iframe)", f),
              new o(e.body).on("blur", "*", p);
          },
          end: function (e) {
            (e = e || document),
              new o(e).off("focusin", "*:not(iframe)", f),
              new o(e.body).off("blur", "*", p);
          },
        };
      },
      7629: function (e, t, n) {
        var o = n(8057),
          i = n(8962),
          a = n(5046),
          s = n(1712);
        n(5932);
        var l = n(9564),
          c = n(6139),
          u = n(8528),
          d = n(9228),
          f = n(8528).viewDocument,
          p = n(4823),
          g = n(2125);
        function r(t) {
          var n, r, e;
          if (
            ((window.canRead = !0), f(t) == document || !l.keydown(t)) &&
            2 != i.readtype &&
            i.status
          )
            if (
              (function (e) {
                var t = new o(".ariaBigCenterScale");
                if (
                  0 != t.length &&
                  27 == (e.keyCode || e.which || e.charCode)
                ) {
                  t.remove();
                  t = new o("[aria-fromClone]");
                  return (
                    g.stop(), t.focus(), t.removeAttr("aria-fromClone"), !0
                  );
                }
              })(t)
            )
              setTimeout(function () {
                t.keyCode = 40;
              }, 350);
            else if (!p.showImg(t) && !p.showQrcode(t))
              return (
                !s.doEventTab(t) &&
                (a.doEventEnter(t) || a.doEventESC(t)
                  ? (d.stopBubble(), void d.stopDefault())
                  : void (
                      c.doEvent(t) ||
                      ((n = t.view.document),
                      (r = t.keyCode || t.which || t.charCode),
                      (e = new o(t.target)),
                      u.breakEvents(e, t) ||
                        (9 == r && d.triggerEvent(t.target, "mouseout"),
                        setTimeout(function () {
                          var e = new o(n.activeElement);
                          0 != e.length &&
                            ("true" == e.ariaAttr("skipall") ||
                              0 < e.closest('[aria-skipall="true"]').length ||
                              (e.aria.hidden &&
                                9 == r &&
                                (t.shiftKey
                                  ? e.aria.preFocus && e.aria.preFocus.focus()
                                  : e.aria.nextFocus &&
                                    e.aria.nextFocus.focus())));
                        }, 5),
                        (window.preAcitveElem = n.activeElement)))
                    ))
              );
        }
        e.exports = {
          start: function (e) {
            (e = e || document), new o(e).on("keydown", "*", r);
          },
          end: function (e) {
            (e = e || document), new o(e).off("keydown", "*", r);
          },
        };
      },
      6139: function (e, t, n) {
        var i = n(8057),
          a = n(4456),
          s = n(9228),
          l = n(8528).viewDocument;
        function c(e) {
          e = new i(e.target);
          if (e.parent().attr("aria-enterownsmethod")) {
            e = e.child();
            return 0 != e.length ? (e[0].focus(), 1) : void 0;
          }
        }
        e.exports = {
          doEvent: function (e) {
            var t = new i(e.target),
              n = e.ctrlKey,
              r = e.shfitKey,
              o = e.altKey;
            if (!(n || r || o))
              switch (a.eventKeyCode(e)) {
                case 40:
                case 39:
                  return (
                    c(e) ||
                      (s.stopBubble(e),
                      s.stopDefault(e),
                      (function (e) {
                        var t,
                          n = !1;
                        t = e.closest('[aria-popup="true"]')
                          ? e
                              .closest('[aria-popup="true"]')
                              .find("a,select,input,[role]")
                          : new i(e.parent().child());
                        1 == t.length &&
                          ((n = !0),
                          (t = new i(e.parent().parent().child())),
                          (e = new i(e.parent())));
                        e = e.index(t);
                        e == t.length - 1 ? (e = 0) : (e += 1);
                        e = t.nodeList[e];
                        n
                          ? 0 < (n = new i(e).child()).length &&
                            ((n = n[0]),
                            s.triggerEvent(e, "mouseover"),
                            n.focus())
                          : (e.setAttribute("tabindex", 0),
                            e.focus(),
                            s.triggerEvent(e, "mouseover"));
                      })(t)),
                    !0
                  );
                case 38:
                case 37:
                  return (
                    c(e) ||
                      (s.stopBubble(e),
                      s.stopDefault(e),
                      (function (e, t) {
                        var n = !1;
                        e.closest('[aria-popup="true"]'),
                          (list = l(t)
                            ? e
                                .closest('[aria-popup="true"]', l(t))
                                .find("a,select,input,[role]")
                            : new i(e.parent().child()));
                        1 == list.length &&
                          ((n = !0),
                          (list = new i(e.parent().parent().child())),
                          (e = new i(e.parent())));
                        e = e.index(list);
                        e <= 0 ? (e = list.length - 1) : --e;
                        e = list.nodeList[e];
                        n
                          ? 0 < (n = new i(e).child()).length &&
                            ((n = n[0]),
                            s.triggerEvent(e, "mouseover"),
                            n.focus())
                          : (e.setAttribute("tabindex", 0),
                            e.focus(),
                            s.triggerEvent(e, "mouseover"));
                      })(t)),
                    !0
                  );
              }
          },
        };
      },
      1712: function (e, t, n) {
        var r = n(8057),
          o = n(9228),
          i = n(4456),
          a = n(57),
          n = n(2264);
        function s(e) {
          var t = i.eventKeyCode(e),
            n = !0;
          ((n =
            "dialogclose" == new r(e.target).aria.action && 13 == t ? !1 : n) &&
            !i.checkKeyCode(e, i.keyCodeSettings.dialogClose)) ||
            ((t = i.checkDialogShow()) &&
              (0 < t.closest(".aria-container").length
                ? new r(".icon-close").click()
                : 0 <
                  (e = n
                    ? t.find("[aria-action='dialogclose']")
                    : new r(e.target)).length
                ? e.click()
                : (t.css("display", "none"), t.attr("tabindex", -1))));
        }
        a.registerEvent(n.globalListen, s, 0),
          (e.exports = {
            doEventTab: function (e) {
              if (!i.checkKeyCode(e, 9)) return !1;
              var t = !1,
                n = i.checkDialogShow();
              return (
                !!n &&
                ((e = new r(e.target || e.currentTarget)).aria.isDialog ||
                  (t = !0),
                (t = e.aria.dialog.firstNode != n.firstNode || t)
                  ? (o.stopBubble(), o.stopDefault(), !0)
                  : void 0)
              );
            },
            KeyEsc: s,
          });
      },
      5046: function (e, t, n) {
        var o = n(8057),
          i = n(9228),
          n = n(8528),
          a = n.viewDocument,
          s = n.realPlayElem;
        e.exports = {
          doEventEnter: function (e) {
            var t = e.keyCode || e.which || e.charCode,
              n = e.ctrlKey;
            if (n && 40 == t) {
              n = new o(e.target);
              if (
                "1" == n.aria.enterownsmethod ||
                0 != (n = n.closest("[aria-enterownsmethod]")).length ||
                n.firstNode == e.target
              ) {
                t = n.aria.owns;
                if (t) {
                  var r,
                    n = new o(t, a(e));
                  return (
                    0 < n.length &&
                      ((t = (r = 0) == r ? -1 : 0),
                      (e = n).attr("oldtabindex") ||
                        e.attr("oldtabindex", e.attr("tabindex") || "none"),
                      e.attr("tabindex", r),
                      (t = e.find("[tabindex='" + t + "'],a,input,select")),
                      i.each(t, function (e, t) {
                        t.getAttribute("oldtabindex") ||
                          t.setAttribute(
                            "oldtabindex",
                            t.getAttribute("tabindex") || "none"
                          ),
                          t.setAttribute("tabindex", r);
                      }),
                      n.show(),
                      (n.ariaAttr("label")
                        ? n
                        : (t = s(n)) && 0 < t.length
                        ? t
                        : 0 < (t = n.find("a,input,select")).length
                        ? t[0]
                        : n
                      ).focus()),
                    !0
                  );
                }
              }
            }
          },
          doEventESC: function (e) {
            if (27 == (e.keyCode || e.which || e.charCode)) {
              var t = new o(e.target),
                t =
                  "true" == t.ariaAttr("popup") ? t : t.closest("[aria-popup]");
              if (0 < t.length && t.aria.owns) {
                e = new o(t.aria.owns, a(e));
                return e.focus(), void (e.aria.eschide && t.hide());
              }
              return !0;
            }
          },
          foucseEvent: function (e) {
            var t = new o(e.target);
            !t.aria.enterownsmethod ||
              ((t = t.ariaAttr("owns")) && (swons = new o(t, a(e))));
          },
          ResetRegTabindex: function (e) {
            var n = e.attr("oldtabindex");
            n &&
              ("none" == n ? e.removeAttr("tabindex") : e.attr("tabindex", n)),
              (e = e.find("a,input,select")),
              i.each(e, function (e, t) {
                (n = t.getAttribute("oldtabindex")) &&
                  ("none" == n
                    ? new o(t).removeAttr("tabindex")
                    : t.setAttribute("tabindex", n));
              });
          },
          CreateRelated: function (r) {
            var e = new o("[aria-owns]", r);
            i.each(e, function (e, t) {
              var n = new o(t),
                t = new o(n.aria.owns, r);
              0 < t.length &&
                !n.ariaAttr("autoowns") &&
                ((n.aria.ownsfor = "#" + t.aria.id),
                n.ariaAttr("sourceowns", !0),
                (t.aria.tabindex = 0),
                (t.aria.owns = "#" + n.aria.id),
                t.ariaAttr("autoowns", !0),
                n.aria.haspopup && t.ariaAttr("popup", !0));
            });
          },
        };
      },
      9564: function (e, t, n) {
        var r = n(8962),
          o = n(57),
          i = n(2264),
          a = (n(8057), n(4456)),
          s = n(755),
          l = n(9898),
          c = n(57);
        function u(e) {
          var t;
          if (
            ((window.canRead = !0),
            (t = e).keyCode || t.which || t.charCode,
            l.checkKeyCode(t, a.keyCodeSettings.wakeup)
              ? (r.status
                  ? c.execEvent(i.globalEnd)
                  : c.execEvent(i.globalStart),
                0)
              : r.status ||
                !l.toWakeUpRead(t) ||
                ((r.voice.enable = !1),
                (r.readsrc = !0),
                c.execEvent(i.globalStart),
                0))
          )
            return o.execEvent(i.globalListen, e);
        }
        e.exports = {
          start: function (e) {
            s.check() &&
              ((e = e || document), document.addEventListener("keydown", u));
          },
          end: function () {
            document.removeEventListener("keydown", u);
          },
          keydown: u,
        };
      },
      5932: function (e, t, n) {
        var r = n(57),
          o = n(2264),
          i = n(4456),
          a = n(8057),
          s = n(5045),
          l = n(8528).viewDocument;
        function c(e) {
          var t;
          i.checkKeyCode(e, i.keyCodeSettings.changeRegion.next) &&
            ((t = new a(e.target, l(e))),
            0 != (t = new a(t.aria.regionN)).length &&
              (s.setClass(t, l(e)), t.focus()));
        }
        function u(e) {
          var t;
          i.checkKeyCode(e, i.keyCodeSettings.changeRegion.pre) &&
            ((t = new a(e.target, l(e))),
            0 != (t = new a(t.aria.regionP)).length &&
              (s.setClass(t, l(e)), t.focus()));
        }
        r.registerEvent(o.globalListen, c, 0),
          r.registerEvent(o.globalListen, u, 0),
          (e.exports = { goNext: c, goPre: u });
      },
      1194: function (e, t, n) {
        var r,
          o = n(8057),
          i = n(5045),
          a = n(2125),
          s = n(7623),
          l = n(8962),
          c = n(8528),
          u = n(8528),
          d = u.viewDocument,
          f = u.realPlayElem;
        n(9228);
        function p(e) {
          var t, n;
          2 != l.readtype &&
            ((window.canRead = !0),
            c.breakEventsFirst(e) ||
              (2 != l.readtype &&
                e.target != document.body &&
                ((void 0 !== r && e.target == r) ||
                  (1 == e.target.nodeType &&
                    ((t = new o(e.target)),
                    c.breakEvents(t, e) ||
                      ((n = f(t)) &&
                        0 < n.length &&
                        (a.play(n.aria.lastText),
                        3 == (window.playElem = n).firstNode.nodeType &&
                          (n = n.parent()),
                        i.setClass(t, d(e)),
                        t.focus()),
                      (r = e.target)))))));
        }
        e.exports = {
          start: function (e) {
            (e = e || document),
              new o(e).on("click", "*", p),
              new o(e).on(
                "click",
                '[aria-action="dialogclose"]',
                s.dialogClose
              );
          },
          end: function (e) {
            (e = e || document),
              new o(e).off("click", "*", p),
              new o(e).off(
                "click",
                '[aria-action="dialogclose"]',
                s.dialogClose
              );
          },
        };
      },
      7623: function (e, t, n) {
        var r = n(8057),
          o = n(9228);
        e.exports = {
          dialogClose: function () {
            var e = o.arrToSizzle(o.HtmlElemRoles.dialog);
            0 < (e = new r(this).closest(e)).length &&
              ((e.aria.tabindex = -1),
              e.hide(),
              globalActiveElem && globalActiveElem.focus());
          },
        };
      },
      3786: function (e, t, n) {
        var r = n(8057),
          o = n(2125),
          i = n(8962),
          a = n(8528),
          n = n(8528),
          s = (n.viewDocument, n.realPlayElem),
          l = new Date().getTime(),
          c = null,
          u = null;
        function d(e) {
          u && (clearTimeout(u), (u = null));
        }
        var f,
          p = { screenX: 0, screenY: 0 };
        function g(e) {
          var t;
          2 != i.readtype &&
            (l + 20 > new Date().getTime() ||
              ((l = new Date().getTime()),
              a.breakEventsFirst(e) ||
                (f && e == f) ||
                (0 != (t = new r(e.target)).length &&
                  ("BODY" != e.target.nodeName
                    ? a.breakEvents(t, e) ||
                      ((u = setTimeout(function () {
                        var e = s(t);
                        e &&
                          0 < e.length &&
                          ((c && c.firstNode == e.firstNode) ||
                            ((c = e), o.play(e.aria.lastText)));
                      }, 100)),
                      (p.screenX = e.screenX),
                      (p.screenY = e.screenY),
                      (f = e))
                    : o.play(document.body.title)))));
        }
        e.exports = {
          start: function (e) {
            (e = e || document),
              new r(e).on("mousemove", "*:not([aria-hidden='true'])", g),
              new r(e).on("mouseout", "*:not([aria-hidden='true'])", d);
          },
          end: function (e) {
            (e = e || document),
              new r(e).off("mousemove", "*:not([aria-hidden='true'])", g),
              new r(e).off("mouseout", "*:not([aria-hidden='true'])", d);
          },
        };
      },
      8347: function (e, t, n) {
        var r = n(8057),
          o = n(2125),
          i = n(8962),
          a = n(8528);
        var s = !0;
        function l() {
          s = !1;
        }
        var c = { x: 0, y: 0 };
        function u(e) {
          var t, n;
          2 == i.readtype &&
            ((n = new r(e.target)),
            a.breakEventsFirst(e) ||
              a.breakEvents(n, e) ||
              ((t = e),
              (n = n),
              2 == i.readtype &&
                (0 == n.length ||
                  "true" == n.ariaAttr("skipall") ||
                  0 < n.closest('[aria-skipall="true"]').length ||
                  ((c = { x: t.clientX, y: t.clientY }),
                  (s = !0),
                  setTimeout(function () {
                    t.clientX == c.x &&
                      t.clientY == c.y &&
                      s &&
                      ((canNextRead = !1),
                      (mouseMove = !0),
                      o.play(t.target),
                      setTimeout(function () {
                        canNextRead = !0;
                      }, 2e4));
                  }, 4e3)))));
        }
        e.exports = {
          start: function (e) {
            (e = e || document),
              new r(e).on("mousemove", u),
              e == document && document.body.addEventListener("mouseout", l);
          },
          end: function (e) {
            (e = e || document),
              new r(e).off("mousemove", u),
              e == document && document.body.removeEventListener("mouseout", l);
          },
        };
      },
      8141: function (e, t, n) {
        var r = n(8057),
          o = n(8962),
          i = n(2125);
        function a(e) {
          2 != o.readtype && ((e = new r(e.target)), i.play(e.aria.lastText));
        }
        e.exports = {
          start: function (e) {
            (e = e || document), new r(e).on("change", "*", a);
          },
          end: function (e) {
            (e = e || document), new r(e).off("change", "*", a);
          },
        };
      },
      3827: function (e, t, n) {
        var r,
          l = n(8057),
          o = n(9228),
          i = n(8458),
          a = (n(5602), n(954)),
          s = n(8962),
          c = n(964);
        n(8528).viewDocument;
        if (!o.isIE())
          try {
            function u(e) {
              var t = window.history[e],
                n = new Event(e);
              return function () {
                var e = t.apply(this, arguments);
                return (n.arguments = arguments), window.dispatchEvent(n), e;
              };
            }
            (history.pushState = u("pushState")),
              (history.replaceState = u("replaceState"));
          } catch (e) {}
        var d = location.href;
        var f = 100,
          p = !1,
          g = 0,
          h = 0;
        function m(e) {
          h + f < new Date().getTime() && !p && 0 < g
            ? ((p = !0), (g = 0), (h = new Date().getTime()), v(e), (h = 0))
            : g++;
        }
        function v(t) {
          s.status &&
            a.init().then(function (e) {
              i.start(),
                c.getAll(document, function (e) {
                  i.start(e);
                }),
                (p = !1),
                0 < g && ((p = !(g = 0)), v(t));
            });
        }
        function y(e, t, n, r, o) {
          for (
            var i = r.getElementsByTagName("iframe"), a = 0;
            a < i.length;
            a++
          ) {
            var s = i[a].contentWindow;
            try {
              s.document.body &&
                (o
                  ? (new l(s.document.body).on(e, t, n),
                    new l(s.document.body).attr("ariaevent", "true"))
                  : (new l(s.document.body).off(e, t, n),
                    new l(s.document.body).removeAttr("ariaevent")),
                y(e, t, n, s.document, o));
            } catch (e) {}
          }
        }
        e.exports = {
          start: function () {
            var e;
            o.addEventListener(window, "pushState", v),
              o.addEventListener(window, "replaceState", v),
              new l(document.body).on("DOMNodeInserted", m),
              "onhashchange" in window &&
              (void 0 === document.documentMode || 8 === document.documentMode)
                ? document.addEventListener("hashchange", v)
                : (e = setInterval(function () {
                    d == location.href ||
                      ((d = location.href), 0) ||
                      (v(), clearInterval(e), (e = null));
                  }, 150));
          },
          end: function () {
            new l(document.body).off("DOMNodeInserted", m),
              window.removeEventListener("pushState", v),
              window.removeEventListener("replaceState", v),
              "onhashchange" in window &&
                (void 0 === document.documentMode ||
                  8 === document.documentMode) &&
                (window.onhashchange = null),
              clearInterval(r),
              (r = null);
          },
          removelistenIncludeIframe: function (e, t, n) {
            y(e, t, n, document, !1), new l(document.body).off(e, t, n);
          },
          listenIncludeIframe: function (e, t, n) {
            y(e, t, n, document, !0), new l(document.body).on(e, t, n);
          },
        };
      },
      4823: function (e, t, n) {
        var s,
          i,
          l = n(8057),
          c = (n(9228), n(9898)),
          u = n(964),
          d = n(8528);
        e.exports = {
          showImg: function (e) {
            if (c.checkKeyCode(e, c.keyCodeSettings.showImg)) {
              d.removeCenterScale();
              var n = new l("img").nodeList;
              if (
                (u.getAll(document, function (e) {
                  var t = new l("img").nodeList;
                  0 < t.length && n.concat(t);
                }),
                0 == n.length)
              )
                return !0;
              for (var t = [], r = 0; r < n.length; r++) {
                var o = n[r],
                  i = new l(o),
                  a = i.width(),
                  i = i.height();
                200 < a && 100 < i && o.src && t.push(o);
              }
              if (0 == t.length) return !0;
              r = 0;
              return (
                s && (r = [].indexOf.call(t, s) + 1) > t.length - 1 && (r = 0),
                (s = t[r]),
                d.CenterScale(new l(t[r]), 1.2),
                !0
              );
            }
          },
          showQrcode: function (e) {
            if (c.checkKeyCode(e, c.keyCodeSettings.showQrcode)) {
              d.removeCenterScale();
              var n = new l("[role='qrcode']").nodeList;
              if (
                (u.getAll(document, function (e) {
                  var t = new l("[role='qrcode']").nodeList;
                  0 < t.length && n.concat(t);
                }),
                0 == n.length)
              )
                return !0;
              for (var t = [], r = 0; r < n.length; r++) {
                var o = n[r];
                o.src && t.push(o);
              }
              if (0 == t.length) return !0;
              r = 0;
              return (
                i && (r = [].indexOf.call(t, i) + 1) > t.length - 1 && (r = 0),
                (i = t[r]),
                d.CenterScale(new l(t[r]), 2),
                !0
              );
            }
          },
        };
      },
      626: function (e, t, n) {
        var i = n(8962),
          a = n(8057),
          s = n(4001);
        e.exports = {
          innerBigSrc: function (e) {
            if (i.bigsrc)
              if (
                (i.big5 && (e = s.toBig5(e)),
                i.py && "undefined" != typeof ariaPY)
              ) {
                new a("#accscreen #acctip").html("");
                for (var t = 0; t < e.length; t++) {
                  for (
                    var n = ariaPY.parse_word(e[t]),
                      r = '<div class="pinyin">',
                      o = 0;
                    o < n.length;
                    o++
                  )
                    !1 !== n[o] &&
                      (r +=
                        "<b><i>" + n[o][1] + "</i><i>" + n[o][0] + "</i></b>");
                  (r += "</div>"), new a("#accscreen #acctip").append(r);
                }
              } else new a("#accscreen #acctip").html(e);
          },
        };
      },
      6167: function (e) {
        var t = new Audio();
        e.exports = t;
      },
      2125: function (e, t, n) {
        var r = n(8962),
          o = n(4840),
          n = n(8180);
        e.exports = {
          play: function (e) {
            0 != window.HideNoRead &&
              (1 == r.readtype || "string" == typeof e
                ? o.startSingle(e)
                : o.startContinu(e));
          },
          stop: n.stop,
          start: n.start,
          end: n.end,
        };
      },
      4191: function (e, t, n) {
        var r,
          o,
          i = n(6167);
        function a(e) {
          window.aria || (window.aria = {}),
            document[r]
              ? (i && !i.paused && i.pause(), (window.HideNoRead = !1))
              : (window.HideNoRead = !0);
        }
        (o =
          void 0 !== document.hidden
            ? ((r = "hidden"), "visibilitychange")
            : void 0 !== document.mozHidden
            ? ((r = "mozHidden"), "mozvisibilitychange")
            : void 0 !== document.msHidden
            ? ((r = "msHidden"), "msvisibilitychange")
            : void 0 !== document.webkitHidden
            ? ((r = "webkitHidden"), "webkitvisibilitychange")
            : ((r = "hidden"), "visibilitychange")),
          (e.exports = {
            start: function () {
              document.addEventListener(o, a);
            },
            end: function () {
              document.removeEventListener(o, a);
            },
          });
      },
      4840: function (e, t, n) {
        var o = n(9228),
          r = n(8180),
          i = n(6167),
          a = n(8962),
          s = n(626),
          l = n(8057),
          c = [],
          u = 0,
          d = null,
          f = !1;
        window.ariaPlayElem = null;
        var p = "";
        function g(e) {
          e &&
            (e.jTool && (e = new l(e).aria.lastText),
            p != e &&
              ((e = e.replace(/ +/g, " ")),
              r.stop(),
              (p = e),
              d && (clearInterval(d), (d = null)),
              f && ((u = 0), (c = []), i.removeEventListener("ended", h)),
              (c = o.splitBylength(e, 40)),
              (f = !0),
              (u = 0),
              a.voice.enable
                ? (h(), i.addEventListener("ended", h))
                : (function e() {
                    if (u >= c.length) return;
                    s.innerBigSrc(c[u]);
                    var t = parseInt(o.getLength(c[u]) / 16);
                    d = setTimeout(function () {
                      e(), (u += 1);
                    }, 1e3 * t);
                  })()));
        }
        function h(e) {
          if (c.length > u) {
            var t = o.replaceSpChar(c[u]);
            if (0 == t.length) return (u += 1), void h();
            setTimeout(function () {
              r.play(t, h), s.innerBigSrc(c[u]), (u += 1);
            }, 250);
          } else
            (f = !1),
              i.removeEventListener("ended", h),
              2 == a.readtype
                ? (function t() {
                    if (!window.ariaPlayElem) return;
                    var e = window.ariaPlayElem;
                    if (e.aria.skipall) return;
                    v(e);
                    var n = e.next();
                    if (!n)
                      return (
                        v(window.ariaPlayElem),
                        void (window.ariaPlayElem = null)
                      );
                    if ("IFRAME" == n.nodeName)
                      try {
                        var r = n.contentDocument;
                        if (null == r || !r.body)
                          return (window.ariaPlayElem = n.next()), void t();
                        n = new l(r.body.firstChild);
                      } catch (e) {
                        return (window.ariaPlayElem = n.next()), void t();
                      }
                    n = new l(n);
                    0 == n.length && (n = e.parent().next());
                    if (0 == n.length) return;
                    n = new l(m(n));
                    window.ariaPlayElem = n;
                    if (n.isHidden()) return void t();
                    try {
                      !n.aria.lastText ||
                      0 == o.replaceSpChar(n.aria.lastText).length
                        ? t()
                        : (v(null, n), g(n.aria.lastText));
                    } catch (e) {}
                  })()
                : ((u = 0),
                  (c = []),
                  (p = ""),
                  window.ariaPlayElem && v(window.ariaPlayElem),
                  (window.ariaPlayElem = null));
        }
        function m(e) {
          if (e && 0 != (e = !e.jTool ? new l(e) : e).length) {
            var t = e.firstNode;
            if (3 == t.nodeType) return e;
            if (e.aria.atomic) return e.aria.atomicElem;
            var n = [
              "INPUT",
              "SELECT",
              "OBJECT",
              "A",
              "COMBOBOX",
              "SELECT-ONE",
              "SELECT-MULTIPLE",
              "TEXTAREA",
              "BUTTON",
              "CHECKBOX",
            ];
            if (0 < [].indexOf.call(n, t.nodeName)) return e;
            t = e.childNodes();
            if (0 == t.length) return e;
            return -1 <
              [].indexOf.call(
                ["ul", "li", "td", "label", "span", "dd", "dt"],
                e.aria.nodeName
              ) && -1 < [].indexOf.call(n, t[0].nodeName)
              ? new l(t[0])
              : m(t[0]);
          }
        }
        function v(e, t) {
          if (null != e) {
            if (0 == (e = !e.jTool ? new l(e) : e).length) return;
            (e = 3 == e.firstNode.nodeType ? e.parent() : e).removeClass(
              "ariafocus"
            ),
              "none" == (n = e.ariaAttr("oldTabindex"))
                ? e.removeAttr("tabindex")
                : e.attr("tabindex", n);
          }
          var n;
          t &&
            0 != (t = !t.jTool ? new l(t) : t).length &&
            ((n =
              (t = 3 == t.firstNode.nodeType ? t.parent() : t).attr(
                "tabindex"
              ) || "none"),
            t.ariaAttr("oldTabindex", n),
            t.attr("tabindex", 0),
            t.addClass("ariafocus"),
            t.focus());
        }
        e.exports = {
          startSingle: g,
          startContinu: function (e) {
            e &&
              ((e = new l(m(e))).aria.skipall ||
                (v(null, e), g((window.ariaPlayElem = e).aria.lastText)));
          },
        };
      },
      8180: function (e, t, n) {
        var r = n(8962),
          o = n(9632),
          i = n(7316),
          a = n(6167),
          s = n(4191),
          l = n(9228),
          c = a,
          u = !1,
          d = "",
          f = {
            times: 5,
            reTimelater: 500,
            nextReplayTime: new Date().getTime(),
          };
        function p(e) {}
        function g(e) {
          (u = !1), c.play();
        }
        function h(e) {
          c.paused
            ? 3 <= f.times
              ? (f.times = 0)
              : ((f.times += 1),
                setTimeout(function () {
                  b(d);
                }, 500))
            : ((u = !0), c.pause());
        }
        function m(e) {
          u && b(d);
        }
        function v(e) {
          u = !1;
        }
        function y(e) {}
        function b(e) {
          (d = e),
            (c.loop = !1),
            (c.playbackRate = r.voice.rate || 1),
            (c.defaultPlaybackRate = r.voice.rate),
            (c.src = e),
            c.load();
        }
        e.exports = {
          play: function (e, t) {
            if (r.status && r.hostEnable.voice && r.voice.enable && e) {
              try {
                if (0 == l.replaceSpChar(e).length) return;
              } catch (e) {}
              o.post(i.api.ttsurl, {
                text: e,
                error: function () {
                  t();
                },
              }).then(function (e) {
                e ? b(r.serviceUrl + e) : t();
              });
            }
          },
          stop: function () {
            c && !c.paused && c.pause();
          },
          start: function () {
            c.addEventListener("abort", p),
              c.addEventListener("pause", m),
              c.addEventListener("canplay", g),
              c.addEventListener("durationchange", y),
              c.addEventListener("ended", v),
              c.addEventListener("error", h),
              c.addEventListener("timeupdate", y),
              s.start();
          },
          end: function () {
            c.removeEventListener("pause", m),
              c.removeEventListener("abort", p),
              c.removeEventListener("canplay", g),
              c.removeEventListener("durationchange", y),
              c.removeEventListener("ended", v),
              c.removeEventListener("error", h),
              c.removeEventListener("timeupdate", y),
              s.end();
          },
        };
      },
      1689: function (e, t, n) {
        var r = n(8057),
          o = n(9228);
        new Date().getTime();
        function i(e) {
          var t, n, r;
          o.stopBubble(),
            o.stopDefault(),
            e &&
              (("mousemove" != e.type && "keydown" != e.type) ||
                ((t = e.clientX),
                (n = e.clientY),
                (t = (r = (function (e) {
                  var t = e.view;
                  if (!t) return { x: e.clientX, y: e.clientY };
                  if (t == window || !t.parent)
                    return { x: e.clientX, y: e.clientY };
                  var n = t.parent;
                  var r = t.location,
                    o = null,
                    i = 0,
                    a = 0;
                  for (; null != n && void 0 !== n; ) {
                    for (var s = 0; s < n.frames.length; s++)
                      if (r == n.frames[s].location) {
                        o = n.frames[s].frameElement;
                        break;
                      }
                    if (o)
                      for (
                        ;
                        (i += o.offsetLeft - o.scrollLeft || 0),
                          (a += o.offsetTop - o.scrollTop || 0),
                          (o = o.offsetParent);

                      );
                    if (n == window) break;
                    (r = n.location), (n = n.parent);
                  }
                  return {
                    x:
                      i +
                      e.clientX -
                      (document.documentElement.scrollLeft || 0),
                    y: a + e.clientY - document.documentElement.scrollTop || 0,
                  };
                })(e)).x),
                (n = r.y),
                (e = document.getElementById("ariamouseten1")),
                (r = document.getElementById("ariamouseten2")),
                (e.style.top = n + 15 + "px"),
                (r.style.left = t + 15 + "px")));
        }
        e.exports = {
          start: function (e) {
            (e = e || document) == document &&
              (function (e) {
                if (
                  ((e = e || window.event),
                  !document.getElementById("ariamouseten1"))
                ) {
                  var t = document.createElement("div"),
                    n = document.createElement("div");
                  if (
                    ((t.style.width = "100%"),
                    (t.style.left = "0px"),
                    (t.style.height = "4px"),
                    (t.className = "mouseten noscale"),
                    e)
                  )
                    try {
                      t.style.top = (e.clientY || 150) - 2 + "px";
                    } catch (e) {
                      t.style.top = "150px";
                    }
                  if (
                    (t.setAttribute("id", "ariamouseten1"),
                    t.setAttribute("aria-skipall", "true"),
                    document.body.appendChild(t),
                    (n.style.height = "100%"),
                    (n.style.width = "4px"),
                    (n.className = "mouseten noscale"),
                    (n.style.top = "0px"),
                    e)
                  )
                    try {
                      n.style.left = (e.clientX || 150) - 2 + "px";
                    } catch (e) {
                      n.style.left = "150px";
                    }
                  n.setAttribute("aria-skipall", "true"),
                    n.setAttribute("id", "ariamouseten2"),
                    document.body.appendChild(n),
                    i(e);
                }
              })(),
              new r(e).on("mousemove", i);
          },
          end: function (e) {
            (e = e || document) == document &&
              (new r("#ariamouseten1").remove(),
              new r("#ariamouseten2").remove()),
              new r(e).off("mousemove", i);
          },
          listenMouseTen: i,
        };
      },
      4001: function (e) {
        e.exports = {
          toBig5: function (e) {
            if (e) {
              for (var t = "", n = 0; n < e.length; n++) {
                var r = e[n],
                  o =
                    "皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩"[
                      "皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄".indexOf(
                        r
                      )
                    ];
                t += void 0 === o ? r : o;
              }
              return t;
            }
          },
        };
      },
      1282: function (e, t, n) {
        n(8057), n(9228);
        e.exports = { start: function (e) {}, end: function (e) {} };
      },
      964: function (e, t, n) {
        var s = n(9228);
        e.exports = {
          getAll: function e(t, n) {
            for (
              var r,
                o = (t = t || document).getElementsByTagName("iframe"),
                i = 0;
              i < o.length;
              i++
            )
              try {
                (r = o[i].getAttribute("id")) ||
                  ((r = s.genID()), o[i].setAttribute("id", r));
                var a = o[i].contentWindow.document;
                if (!a.body) continue;
                n && "function" == typeof n && n(a, o[i]), e(a, n);
              } catch (e) {}
          },
        };
      },
      5020: function (e, t, n) {
        n(8057);
        e.exports = { iframeMouse: function (e) {} };
      },
      8458: function (e, t, n) {
        var c = n(9228),
          u = n(8057),
          d = n(8962),
          o = (n(6057), n(5046));
        function i(e, t) {
          t && new Date().getTime(), t || new Date().getTime();
        }
        function a(e, t) {
          e.aria.tabindex || (e.aria.tabindex = t);
        }
        function s(e, t) {
          var n = e.selector;
          if (n) {
            var r,
              o = new u(t.body).find(n);
            if (!o.hasClass("setedaria") && 0 < o.length) {
              for (var i in (e.focusable && !o.isHidden()
                ? (o.aria.focusable = 0)
                : (o.aria.focusable = -1),
              e.role && (o.aria.role = e.role),
              e.prop))
                e.prop[i] &&
                  Object.hasOwnProperty.call(e.prop, i) &&
                  ((r = e.prop[i]), o.ariaAttr(i, r));
              e.prop &&
                e.prop.dialogclose &&
                o.find(e.prop.dialogclose).ariaAttr("action", "dialogclose");
            }
          }
        }
        e.exports = {
          start: function (e) {
            var r, t;
            (e = e || document),
              c.isFF() &&
                (function () {
                  var e = [
                    "ariatoolcss",
                    "ariaToptoolbar",
                    "accscreen",
                    "ariamouseten1",
                    "ariamouseten2",
                    "pack_popup_depart",
                  ];
                  if ("true" != document.body.getAttribute("ariaCopy")) {
                    var t = document.createElement("div");
                    (t.id = "ariaContainer"), (t.className = "elemscale");
                    for (
                      var n = document.body.children, r = n.length - 1;
                      -1 < r;
                      r--
                    ) {
                      var o = n[r],
                        i = new u(o),
                        a = i.css("position");
                      [].indexOf.call(e, o.id) < 0 &&
                        o.id.indexOf("pack_popup") < 0 &&
                        !i.hasClass("city-plug") &&
                        [].indexOf.call(["fixed", "absolute"], a) < 0 &&
                        t.insertBefore(o, t.firstChild);
                    }
                    document.body.insertBefore(t, document.body.firstChild),
                      document.body.setAttribute("ariaCopy", !0);
                  }
                })(),
              (r = e),
              (t = d.curpageConf),
              r.body &&
                (i(0, !0),
                (function (e) {
                  var t = d.golabSkipAll;
                  t &&
                    ((n = new u(e.body).find(t)),
                    c.each(n, function (e, t) {
                      t.setAttribute("aria-skipall", "true");
                    }));
                  var n = d.golabFocus;
                  n &&
                    ((r = new u(e.body).find(n)),
                    c.each(r, function (e, t) {
                      t.setAttribute("tabindex", 0);
                    }));
                  var r = d.golabRegion1;
                  r &&
                    ((o = new u(e.body).find(r)),
                    c.each(o, function (e, t) {
                      t = new u(t);
                      t.ariaAttr("region", "true"),
                        t.ariaAttr("regiontype", 1),
                        t.attr("tabindex", 0);
                    }));
                  var o = d.golabRegion2;
                  o &&
                    ((i = new u(e.body).find(o)),
                    c.each(i, function (e, t) {
                      t = new u(t);
                      t.ariaAttr("region", "true"),
                        t.ariaAttr("regiontype", 2),
                        t.attr("tabindex", 0);
                    }));
                  var i = d.golabRegion3;
                  i &&
                    ((a = new u(e.body).find(i)),
                    c.each(a, function (e, t) {
                      t = new u(t);
                      t.ariaAttr("region", "true"),
                        t.ariaAttr("regiontype", 3),
                        t.attr("tabindex", 0);
                    }));
                  var a = d.golabRegion4;
                  a &&
                    ((s = new u(e.body).find(a)),
                    c.each(s, function (e, t) {
                      t = new u(t);
                      t.ariaAttr("region", "true"),
                        t.ariaAttr("regiontype", 4),
                        t.attr("tabindex", 0);
                    }));
                  var s = d.golabSkipTheme;
                  s &&
                    ((l = new u(e.body).find(s)),
                    c.each(l, function (e, t) {
                      new u(t).ariaAttr("skiptheme", "true");
                    }));
                  var l = d.golabSkipScale;
                  l &&
                    ((l = new u(e.body).find(l)),
                    c.each(l, function (e, t) {
                      new u(t).ariaAttr("skipscale", "true");
                    }));
                })(r),
                i(0, !1),
                i(0, !0),
                (function (n) {
                  var e = d.golbalElems;
                  e &&
                    c.each(e, function (e, t) {
                      s(t, n);
                    });
                })(r),
                i(0, !1),
                t && t.name && null != t.value && null != t.value.name
                  ? (i(0, !0),
                    (function (e, n) {
                      e.value &&
                        e.value.elems &&
                        c.each(e.value.elems, function (e, t) {
                          s(t, n);
                        });
                      e.value &&
                        e.value.templateElems &&
                        c.each(e.value.templateElems, function (e, t) {
                          s(t, n);
                        });
                    })(t, r),
                    i(0, !1))
                  : (i(0, !0),
                    (function (e) {
                      var t = new u(e.body).find("form,.login_box");
                      c.each(t, function (e, t) {
                        t = new u(t);
                        "true" != t.ariaAttr("region") &&
                          0 == t.closest('[aria-region="true"]').length &&
                          (t.ariaAttr("region", "true"),
                          t.ariaAttr("regiontype", 3),
                          (t.aria.focusable = 1));
                      });
                      t = new u(e.body).find(
                        "header,nav,#header,#nav,.header,.nav,.left-nav,.d-subnav"
                      );
                      c.each(t, function (e, t) {
                        t = new u(t);
                        "true" != t.ariaAttr("region") &&
                          0 == t.closest('[aria-region="true"]').length &&
                          (t.ariaAttr("region", "true"),
                          t.ariaAttr("regiontype", 2),
                          (t.aria.focusable = 1));
                      });
                      t = new u(e.body).find(
                        ".content,#content,.wrapper,#wrapper,.main-r,.main,#main"
                      );
                      c.each(t, function (e, t) {
                        t = new u(t);
                        "true" != t.ariaAttr("region") &&
                          0 == t.closest('[aria-region="true"]').length &&
                          (t.ariaAttr("region", "true"),
                          t.ariaAttr("regiontype", 1),
                          (t.aria.focusable = 1));
                      });
                      e = new u(e.body).find(".footer,#footer,footer");
                      c.each(e, function (e, t) {
                        t = new u(t);
                        "true" != t.ariaAttr("region") &&
                          0 == t.closest('[aria-region="true"]').length &&
                          (t.ariaAttr("region", "true"),
                          t.ariaAttr("regiontype", 4),
                          (t.aria.focusable = 1));
                      });
                    })(r),
                    i(0, !1)),
                i(0, !0),
                (t = new u(r.body).find(
                  "[role]:not([setedaria='true'])"
                ).nodeList),
                c.each(t, function (e, t) {
                  var n = !1,
                    r = new u(t);
                  r.attr("id") || r.attr("id", c.genID()),
                    t.setAttribute("setedaria", "true"),
                    r.isHidden()
                      ? a(r, -1)
                      : (!n &&
                          -1 <
                            [].indexOf.call(
                              c.HtmlElemRoles.foucsable0,
                              r.aria.role
                            ) &&
                          (a(r, 0), (n = !0)),
                        !n &&
                          -1 <
                            [].indexOf.call(
                              c.HtmlElemRoles.foucsable0,
                              r.aria.nodeName
                            ) &&
                          a(r, 0));
                }),
                i(0, !1),
                (t = new u(r.body).find("p:not([setedaria='true'])")),
                c.each(t, function (e, t) {
                  var n = new u(t, r.body);
                  t.setAttribute("setedaria", "true");
                  t = c.reMoveHtml(n.text());
                  t && 0 < t.length && (n.aria.tabindex = 0);
                }),
                (t = new u(r.body).find("[aria-hidden='true']")),
                c.each(t, function (e, t) {
                  new u(t, r.body).aria.tabindex = -1;
                }),
                c.isFF() &&
                  ((t = new u("body").child()),
                  c.each(t, function (e, t) {
                    var n = new u(t);
                    1 == t.nodeType &&
                      n.aria &&
                      !n.aria.skipscale &&
                      n.addClass("elemscale");
                  })),
                i(0, !0),
                new u(r.body)
                  .find("[aria-region='true']")
                  .attr("tabindex", "0"),
                new u(r.body).find("[role='floatingwindow']").remove(),
                (function (e) {
                  var t = new u("[aria-atomic='true']", e.body).find("*");
                  c.each(t, function (e, t) {
                    t.setAttribute("tabindex", -1);
                  }),
                    new u(e).on(
                      "keydown",
                      "[aria-atomic='true']",
                      function (e) {
                        13 != e.keyCode ||
                          1 != this.nodeType ||
                          (0 <
                            (e = new u(this).find(
                              "a,[role='a'],[role='button']"
                            )).length &&
                            e.firstNode.click());
                      }
                    );
                })(r),
                i(0, !1),
                c.isMobile() &&
                  (function (o) {
                    var e = new u(o.body).find("#ariabodyscale");
                    0 < e.length && e.remove();
                    new u(o.body).find("#ariabodyscale").remove();
                    var t = new u(o.body).find("a"),
                      e = "*:not(.setfont):not(a)";
                    t.length < 500 && (e = "*:not(.setfont)");
                    e = new u(o.body).find(e);
                    c.each(e, function (e, t) {
                      try {
                        var n = new u(t, o),
                          r = c.getStyle(t);
                        24 < (r = parseInt(r.fontSize, 10)) && (r = 24),
                          n.addClass("setfont ariafont" + r);
                      } catch (e) {}
                    });
                  })(r),
                i(0, !0),
                (function (e) {
                  e = new u(e.body).find("a");
                  1e3 < e.length ||
                    c.each(e, function (e, t) {
                      t = new u(t);
                      t.closest("[aria-atomic]") || t.ariaAttr("atomic", !0);
                    });
                })(r),
                i(0, !1),
                i(0, !0),
                (function (e) {
                  e = new u(e.body).find("[v]");
                  c.each(e, function (e, t) {
                    var n = new u(t);
                    n.attr("fromvlabel") ||
                      (n.attr("fromvlabel", !0),
                      n.aria.label ||
                        n.aria.title ||
                        n.aria.placeholder ||
                        ("INPUT" == t.nodeType
                          ? (n.aria.placeholder = n.attr("v"))
                          : (n.aria.title = n.attr("v"))));
                  });
                })(r),
                i(0, !1),
                i(0, !0),
                new u(r.body).addClass("ariatheme"),
                (function (e) {
                  e = new u(e.body).find(
                    "*:not(.ariatheme):not(a):not(td):not(li):not(tr)"
                  );
                  c.each(e, function (e, t) {
                    try {
                      var n;
                      1 == t.nodeType &&
                        "svg" != t.nodeName.toLowerCase() &&
                        (((n = new u(t)).aria &&
                          (n.aria.skipall || n.aria.skiptheme)) ||
                          n.addClass("ariatheme"));
                    } catch (e) {}
                  });
                })(r),
                i(0, !1)),
              o.CreateRelated(e);
          },
        };
      },
      6057: function (e, t, n) {
        var o = n(9228),
          a = n(9724),
          s = n(8962),
          l = n(7316),
          i = n(8057);
        function r() {
          var e = "",
            t = s.curpageConf;
          t && t.value.pageCss && (e += t.value.pageCss),
            s.golabCss && (e += s.golabCss);
          var n = ".ariatheme:not(i):not(input),td,li,a{",
            r = ".ariatheme a{",
            o = s.Theme;
          (e += ".ariaHide{display:none !important;}"),
            (e +=
              "input {color:black !important;background-color:white !important;}"),
            (e +=
              "input:disabled {color:black !important;background-color:#ccc !important;}"),
            o &&
              (s.hostEnable.region &&
                ((e += g(o.region, ".ariaregion")),
                o.region.link &&
                  ((e += ".ariaregion a{ "),
                  (e += " color:" + o.region.link + "!important;"),
                  (e += "}"))),
              o.backgroundColor &&
                (n += "background-color:" + o.backgroundColor + " !important;"),
              o.color && (n += "color:" + o.color + " !important;"),
              o.link && (r += "color:" + o.link + " !important;"));
          var i = s.scale,
            t = s.bodyfont;
          s.hostEnable.fontScal &&
            ((i = parseFloat(i)),
            s.padding,
            s.spacing,
            (e += "input[type='checkbox'],input[type='radio'] {"),
            (e += "min-height:  " + (t = s.bodyfont * i) + "px !important;"),
            (e += "min-width:   " + t + "px !important;"),
            (e += "}")),
            s.golabReplaceBg &&
              s.Theme &&
              s.Theme.backgroundColor &&
              ((e += s.golabReplaceBg + "{"),
              (e += "background-image:none !important;"),
              (e += "}")),
            o &&
              (s.hostEnable.focus &&
                ((e += g(o.focus, ".ariafocus")),
                (t = o.focus.value) &&
                  t.value &&
                  (delete t.value.outline, (e += g(t, ".ariafocus *")))),
              s.hostEnable.mouseover &&
                (e += g(o.mouseover, ".ariamouseover")));
          var e = n + "}" + r + "}" + e,
            r = s.highlight;
          return (
            s.hostEnable.highlight &&
              r.enable &&
              (r.rate && r.rate > i && r.rate,
              (e += ".ariahighlight{"),
              o &&
                ((i = o.highlight.backgroundColor),
                (r = o.highlight.color) &&
                  (e += " color: " + r + " !important;"),
                i && (e += "background-color: " + i + " !important;"),
                (e += "}"),
                (o = o.highlight.link) &&
                  ((e += ".ariahighlight a{"),
                  (e += " color: " + o + "  !important;"),
                  (e += "}")))),
            a.set(l.keys.runtime.settings.css, e),
            e
          );
        }
        function c(e) {
          s.golabFixedCss && o.appendCss(e, "golabFixedCss", s.golabFixedCss);
        }
        function u(e) {
          new i(e).find("#golabFixedCss").remove();
        }
        function d() {
          new i("#ariabodyscale").remove();
          var e = s.scale,
            t = "";
          if (1 != e) {
            if (o.isMobile())
              for (var n = 10; n < 30; n++)
                t +=
                  ".ariafont" +
                  n +
                  "{font-size:" +
                  parseInt(n * e) +
                  "px  !important;}";
            else
              o.isFF()
                ? (t += (function () {
                    var e = s.scale;
                    if (1 == e) return "";
                    var t = "#ariaContainer{";
                    return (
                      (t += "-moz-transform:scale(" + e + ");"),
                      (t += "transform-origin: center top;"),
                      (t += "}")
                    );
                  })())
                : (t += (function () {
                    var e = s.scale;
                    if (1 == e) return "";
                    var t = "body{";
                    return (
                      (t += "zoom:" + e + "  !important;"),
                      (t += "transform-origin: center top;"),
                      (t += "}"),
                      o.isIE() ||
                        ((t += ".noscale{"),
                        (t +=
                          "zoom:" +
                          (e = parseFloat(1 / e).toFixed(10)) +
                          "  !important;"),
                        (t += "transform-origin: center top;"),
                        (t += "-moz-transform: scale(" + e + ")  !important;"),
                        (t += "-moz-transform-origin: center top;"),
                        (t += "-o-transform: scale(" + e + ")  !important;"),
                        (t += "-o-transform-origin: center top;"),
                        (t += "}")),
                      t
                    );
                  })());
            var r = document.createElement("style");
            r.setAttribute("id", "ariabodyscale"),
              (r.innerHTML = t),
              document.body.appendChild(r),
              window.scrollTo(
                (document.body.scrollWidth - document.body.offsetWidth) / 2,
                0
              );
          }
        }
        function f(e) {
          (e = e || document),
            new i(e.body).find('[title="ariatoolbarstylemouse"]').remove();
        }
        function p(e, t) {
          new i(e.body).find("#ariacss").remove();
          var n = e.createElement("style");
          n.setAttribute("type", "text/css"),
            n.setAttribute("id", "ariacss"),
            (n.innerHTML = t),
            e.body.appendChild(n);
        }
        function g(e, t) {
          var n = "ariafocus" == t ? ":focus," : "";
          return (
            e &&
              e.enable &&
              ((n += t + "{"),
              o.each(e, function (e, t) {
                "enable" != e &&
                  null != t &&
                  ("outline" == e &&
                    (n += "border-radius: 3px;outline-offset:-2px;"),
                  (n += o.toCssCamelCase(e) + ":" + t + " !important;"));
              }),
              (n += "}")),
            n
          );
        }
        e.exports = {
          start: function (e) {
            e = e || document;
            var t = a.get(l.keys.runtime.settings.css) || r();
            0 == new i(e).find("#ariaiconstyle").length &&
              new i(e.body).append(
                '<link type="text/css" rel="stylesheet" id="ariaiconstyle" href="' +
                  s.themeRoad +
                  '/css/font.min.css"></link>'
              ),
              p(e, t),
              c(e),
              d();
          },
          end: function (e) {
            (e = e || document),
              new i(e.body).find("#ariacss").remove(),
              new i(e.body).find("#ariaiconstyle").remove(),
              new i(e.body).find("#ariabodyscale").remove(),
              u(e);
          },
          setSettingTheme: function (e) {
            p((e = e || document), r()), c(e), e == document && d();
          },
          setBodyTran: d,
          addPy: function () {
            var e = document.createElement("script");
            e.setAttribute("id", "ariapy"),
              e.setAttribute("charset", "UTF-8"),
              (e.src = s.road + "public/pinyin.min.js"),
              document.body.appendChild(e);
          },
          setMouseb: function (e) {
            f((e = e || document));
            var t = e.createElement("style");
            t.setAttribute("title", "ariatoolbarstylemouse");
            var n = "\n *,a {\n";
            (n +=
              "cursor: url(" +
              s.themeRoad +
              "/images/allaw.cur), auto !important;\n"),
              (t.innerHTML = n += "}\n"),
              e.body.appendChild(t);
          },
          removeMouseb: f,
          cssToStore: r,
          seGolabFixedCss: c,
          removeGolabFixedCss: u,
        };
      },
      1266: function (e, t, n) {
        n(9724), n(1643);
        var r = n(3969),
          o = !1;
        function i(e, t) {
          a(".cnwza", e),
            a("#cnwza", e),
            a("#cniil_wza", e),
            e
              ? (a("[onclick='aria.start();']", e),
                a("[onclick='aria.start()']", e))
              : (a("[onclick='aria.end();']", e),
                a("[onclick='aria.end()']", e)),
            t && a(t, e);
        }
        function a(e, t) {
          var n = "string" == typeof e ? document.querySelectorAll(e) : [e];
          if (n && void 0 !== n && 0 != n.length)
            for (var r = 0; r < n.length; r++) {
              var o = n[r],
                i = o.getAttribute("clickhide"),
                a = o.getAttribute("closeText"),
                s = (s = o.getAttribute("openText")) || o.innerText;
              t
                ? "false" != i
                  ? o.classList.add("ariaHide")
                  : a && (o.innerText = a)
                : "false" != i
                ? o.classList.remove("ariaHide")
                : s && (o.innerText = s),
                "string" == typeof e &&
                  (-1 < e.indexOf("end") &&
                    o.setAttribute("onclick", "aria.start()"),
                  -1 < e.indexOf("start") &&
                    o.setAttribute("onclick", "aria.end()"));
            }
        }
        function s(e) {
          null !=
            (e.target.closestReplenish("#cniil_wza") ||
              e.target.closestReplenish("#cnwza") ||
              e.target.closestReplenish(".cnwza")) &&
            (r.status
              ? aria && "function" == typeof aria.end && (i(!1), aria.end())
              : aria &&
                "function" == typeof aria.start &&
                (i(!0), aria.start()));
        }
        (Element.prototype.closestReplenish = function (t) {
          var e = this,
            n = (function () {
              if (t instanceof HTMLElement) return [t];
              try {
                t = document.querySelectorAll(t);
              } catch (e) {
              } finally {
                var e = Object.prototype.toString.call(t).slice(8, -1);
                if (-1 < ["NodeList", "HTMLCollection", "Array"].indexOf(e))
                  return [].slice.call(t);
              }
            })();
          do {
            if (-1 < n.indexOf(e)) return e;
          } while (null !== (e = e.parentElement));
          return null;
        }),
          (e.exports = {
            setBtn: i,
            addListenBtn: function () {
              o || (window.addEventListener("click", s), (o = !0));
            },
            removeListenBtn: function () {
              (o = !1), window.removeEventListener("click", s);
            },
          });
      },
      3497: function (e, t, n) {
        var a = n(8057),
          r = (n(9228), n(8962), n(964)),
          i = n(5046);
        function o(e, t) {
          try {
            for (
              var n = new a(e.body).find("[aria-region='true']"), r = 0;
              r < n.length;
              r++
            ) {
              var o = new a(n[r]),
                i = o.ariaAttr("regiontype");
              null == t[i] && (t[i] = []), t[i].push(o);
            }
          } catch (e) {}
          return t;
        }
        function s() {
          var n = {},
            n = o(document, n);
          return (
            r.getAll(document, function (e, t) {
              n = o(e, n);
            }),
            n
          );
        }
        e.exports = {
          getAll: s,
          changeRegion: function (e) {
            var t,
              n = s()[e];
            if (null == n || 0 == n.length) return !1;
            for (var r = 0; r < n.length; r++) {
              var o = n[r];
              if (o.hasClass("currentRegion" + e)) {
                r == n.length - 1 ? (r = 0) : (r += 1),
                  o.blur(),
                  (t = n[r]),
                  o.removeClass("currentRegion" + e),
                  i.ResetRegTabindex(t);
                break;
              }
            }
            return (
              (t = void 0 === t ? n[0] : t).addClass("currentRegion" + e), t
            );
          },
        };
      },
      5045: function (e, t, n) {
        var r = n(8057),
          o = n(8962),
          i = n(57),
          a = n(2264),
          s = n(964);
        function l() {}
        function c(t) {
          new r(document).find("." + t).removeClass(t),
            s.getAll(document, function (e) {
              new r(e).find("." + t).removeClass(t);
            });
        }
        i.registerEvent(a.startService, l, 0),
          (e.exports = {
            setFontSize: l,
            setClass: function (e, t) {
              0 != e.length &&
                ((t = t || document),
                c(o.className.focus),
                e.aria.canSetClass && e.addClass(o.className.focus),
                (t = e.aria.regionElem),
                c(o.className.region),
                t &&
                  0 < t.length &&
                  e.aria.canSetClass &&
                  t.addClass(o.className.region),
                (t = e),
                0 <
                  (t = t =
                    1 === o.highlight.mode ? new r(t.aria.regionElem) : t)
                    .length &&
                  o.highlight.enable &&
                  (c("ariahighlight"),
                  e.aria.canSetClass && t.addClass(o.className.highlight)),
                0 < t.length &&
                  o.highlight.enable &&
                  !t.hasClass("ariahighlightScale") &&
                  t.width() * o.highlight.rate + t.firstNode.offsetLeft <=
                    document.body.scrollWidth &&
                  e.aria.canSetClass &&
                  (c("ariahighlightScale"),
                  e.aria.canSetClass && t.addClass("ariahighlightScale")));
            },
          });
      },
      3385: function (e, t, n) {
        var a,
          r,
          o = n(9438),
          s = n(8057),
          l = n(9228),
          c = n(8962),
          i = n(4456),
          u = n(57),
          d = n(2264),
          f = (n(57), n(2125)),
          p = n(2713),
          g = n(6057),
          h = (n(5045), c.hostEnable),
          m = n(7524),
          v = n(3497);
        function y(e) {
          window.open(
            c.road + "public/instructions_" + c.defaultLanguage + ".html"
          );
        }
        function b(e) {
          var t = c.py;
          e && ((c.py = !t), t ? f.play("拼音已关闭") : f.play("拼音已启用")),
            c.py;
        }
        function w() {
          c.big5;
          "繁体" == new s("#accscreen-jt").html()
            ? (new s("#accscreen-jt").html("简体"),
              (c.big5 = !1),
              f.play("简体已启用"))
            : (new s("#accscreen-jt").html("繁体"),
              (c.big5 = !0),
              f.play("繁体已启用"));
        }
        function x() {
          f.stop(),
            q(),
            M(),
            p.endMouseTen(),
            new s("#ariaToptoolbar").remove(),
            new s("#accscreen").remove(),
            new s("#ariatoolcss").remove(),
            r && (clearInterval(r), (r = null)),
            p.end(),
            new s(document.body).off("click", ".ariavoice", H),
            new s(document.body).off("click", ".ariatopfixed", z),
            new s(document.body).off("click", ".ariathemebtn", _),
            new s(document.body).off("click", ".ariazoomb", B),
            new s(document.body).off("click", ".ariazooms", F),
            new s(document.body).off("click", ".ariaVoiceRate", j),
            new s(document.body).off("click", ".ariaReadtype", O),
            new s(document.body).off("click", ".ariareset", A),
            new s(document.body).off("click", ".ariamouseb", P),
            new s(document.body).off("click", ".ariamouseten", I),
            new s(document.body).off("click", ".ariahighlighttool", D),
            new s(document.body).off("click", ".ariaexit", R),
            new s(document.body).off("click", ".ariablackgroud", U),
            new s(document.body).off("click", ".ariabigsrc", K),
            new s(document.body).off("click", "#accscreen-py", b),
            new s(document.body).off("click", "#accscreen-jt", w),
            new s(document.body).off("click", ".ariaReadScreen", E);
        }
        function T(e) {
          !(function () {
            new s("#acccont-logo-img").css(
              "background-image",
              "url(" +
                c.themeRoad +
                "/images/" +
                c.defaultLanguage +
                (c.readsrc ? 2 : 1) +
                ".png)"
            );
            var e = c.scale;
            new s(".ariazoomb").attr(
              "title",
              a.curZoomPage.replace("{0}", e.toFixed(1)) +
                "," +
                a.airafontScaleTextToBig
            ),
              new s(".ariazooms").attr(
                "title",
                a.curZoomPage.replace("{0}", e.toFixed(1)) +
                  "," +
                  a.airafontScaleTextToSmall
              ),
              new s(".ariaTopsubzoomb").html(a.ariaTopsubzoomb),
              new s(".ariaTopsubzooms").html(a.ariaTopsubzooms),
              new s(".ariathemebtn").attr(
                "title",
                a.ariathemebtn +
                  (c.Theme && c.Theme.displayName ? c.Theme.displayName : "无")
              ),
              new s(".ariaTopsubtheme").html(a.ariaTopsubtheme),
              new s(".ariaReadScreen").attr("title", a.ariaReadScreen),
              new s(".ariaTopsubReadScreen").html(a.ariaTopsubReadScreen),
              new s(".ariaTopsubVoice").html(a.ariaTopsubVoice),
              N(),
              new s(".ariaTopsubVoiceRate").html(a.ariaTopsubVoiceRate),
              L(),
              new s(".ariaTopsubReadtype").html(a.ariaTopsubReadtype),
              k(),
              new s(".ariaTopsubmouseb ").html(a.ariaTopsubmouseb),
              new s(".ariaTopsubten ").html(a.ariaTopsubten),
              S(),
              new s(".ariareset").attr("title", a.ariareset),
              new s(".ariaTopsubreset").html(a.ariaTopsubreset),
              new s(".ariatopfixedtext").attr("title", a.ariatopfixedtext),
              new s(".ariaTopsubtopfixed").html(a.ariaTopsubtopfixed),
              new s(".ariaTopsubigsrc").html(a.ariaTopsubigsrc),
              new s(".ariabigsrc").attr(
                "title",
                c.bigsrc ? a.ariabigsrcopen : a.ariabigsrcclose
              ),
              new s(".ariaTopsubtopexit").html(a.ariaTopsubtopexit),
              new s(".ariaexit").attr("title", a.ariaexit),
              new s(".ariaacchelpbook").attr("title", a.ariaacchelpbook),
              new s(".ariaTopacchelpbook").html(a.ariaTopacchelpbook);
          })(),
            H(e),
            z(),
            _(null),
            P(null),
            I(null),
            K(null),
            O(null),
            j(),
            setTimeout(function () {
              C(), c.readsrc && E();
            }, 500),
            (r = setInterval(C, 1e3));
        }
        function C() {
          for (
            var e = v.getAll(),
              t = new s(".onlineread"),
              n = new s(".readsrc").length < 2,
              r = 1;
            r < 7;
            r++
          ) {
            var o,
              i = e[r] ? e[r].length : 0;
            n
              ? ((o =
                  '<div id="acccross" class="readsrc acccross' +
                  r +
                  " " +
                  (0 == i ? "disable" : "") +
                  '">'),
                (o +=
                  ' <span class="title">' +
                  (a["regiontype" + r] || a[void 0]) +
                  '<label>(<t id="regioncount' +
                  r +
                  '">' +
                  i +
                  "</t>)</label></span>"),
                (o += '<span class="desc">ALT+' + r + "</span>"),
                (o += "</div>"),
                t.append(o))
              : i != parseInt(new s("#regioncount" + r).html()) &&
                (new s("#regioncount" + r).html(i),
                0 < i
                  ? new s(".acccross" + r).removeClass("disable")
                  : new s(".acccross" + r).addClass("disable"));
          }
        }
        function E(e) {
          var t = c.readsrc;
          void 0 !== e && ((c.readsrc = !t), (t = !t)),
            t
              ? (new s(".notonlineread").addClass("hidden"),
                new s(".onlineread").removeClass("hidden"),
                K())
              : (new s(".notonlineread").removeClass("hidden"),
                new s(".onlineread").addClass("hidden")),
            m.start(),
            f.play(new s("#ariaTipText")),
            new s("#acccont-logo-img").css(
              "background-image",
              "url(" +
                c.themeRoad +
                "/images/" +
                c.defaultLanguage +
                (c.readsrc ? 2 : 1) +
                ".png)"
            );
        }
        function A(e) {
          clearInterval(r),
            (r = null),
            c.reset(),
            T(),
            M(),
            p.setSettingTheme(),
            (window.canRead = !0),
            f.play(a.ariaresetsuccess);
        }
        function S() {
          c.mousemode
            ? new s(".ariamouseb").attr("title", a.ariamousebopen)
            : new s(".ariamouseb").attr("title", a.ariamousebclose),
            c.mouseten
              ? new s(".ariamouseten").attr("title", a.ariamousetenopen)
              : new s(".ariamouseten").attr("title", a.ariamousetenclose);
        }
        function k() {
          var e = 2 == c.readtype ? "2" : "1",
            e = a["ariaReadtype" + e];
          new s(".ariaReadtype").attr("title", e);
        }
        function N(e) {
          e || c.voice.enable
            ? new s(".ariavoice").attr("title", a.openvoice)
            : new s(".ariavoice").attr("title", a.closevoice);
        }
        function L() {
          var e = c.voice.rate;
          new s(".ariaVoiceRate").attr(
            "title",
            a.ariaVoiceRate.replace("{0}", e)
          );
        }
        function R() {
          f.stop(), x(), u.execEvent(d.globalEnd), p.end();
          var e = new s(".fixedbottom100");
          l.each(e, function (e, t) {
            var n = new s(t),
              t = n.css("bottom");
            n.css("bottom", t - 150);
          }),
            new s(".fixedbottom100").removeClass("fixedbottom100");
        }
        function O(e) {
          var t = c.readtype,
            n = new s(".ariaReadtype");
          e &&
            (f.play(a["ariaReadtype" + (2 == c.readtype ? "1" : "2")]),
            (t = c.readtype = 2 == t ? 1 : 2)),
            2 == t
              ? (n.removeClass("ariaicon-finger_reading"),
                n.addClass("ariaicon-continuous_reading"))
              : ((c.readtype = 1),
                n.addClass("ariaicon-finger_reading"),
                n.removeClass("ariaicon-continuous_reading")),
            k();
        }
        function D(e) {
          var t = c.highlight.enable;
          e
            ? t
              ? ((c.highlight.enable = !1),
                new s(".ariahighlighttool").parent().removeClass("fixedSelect"),
                new s(".ariahighlighttool").ariaAttr(
                  "success",
                  a.unsethighlight
                ))
              : ((c.highlight.enable = !0),
                new s(".ariahighlighttool").parent().addClass("fixedSelect"),
                new s(".ariahighlighttool").ariaAttr("success", a.sethighlight))
            : t && new s(".ariahighlighttool").parent().addClass("fixedSelect");
        }
        function I(e) {
          var t = c.mouseten;
          e
            ? ((c.mouseten = t = !t),
              S(),
              t ? f.play(a.ariamousetenopen) : f.play(a.ariamousetenclose),
              t ? p.startMouseTen() : p.endMouseTen())
            : t && p.startMouseTen();
        }
        function P(e) {
          var t = new s(".ariamouseb"),
            n = c.mousemode;
          e
            ? (n
                ? (t.removeClass("fixedSelect"),
                  (c.mousemode = null),
                  f.play(a.ariamousebclose))
                : ((c.mousemode = !0), f.play(a.ariamousebopen)),
              (n = c.mousemode),
              S())
            : n && t.addClass("fixedSelect"),
            M(n);
        }
        function M(e) {
          e ? p.startBigMouse() : p.endBigMouse();
        }
        function j(e) {
          var t;
          c.voice.enable
            ? ((t = c.voice.rate),
              e &&
                (t >= c.voice.maxRate
                  ? (t = c.voice.minRate)
                  : (t += t < 1 ? 0.1 : 0.5),
                (c.voice.rate = parseFloat(t.toFixed(1))),
                f.play(a.ariaCurVoiceRate.replace("{0}", t.toFixed(1)))),
              (e = new s(".ariaVoiceRate")),
              t <= 1
                ? (e.removeClass("ariaicon-quick_read"),
                  e.addClass("ariaicon-slow_read"))
                : (e.addClass("ariaicon-quick_read"),
                  e.removeClass("ariaicon-slow_read")),
              L())
            : f.play(a.ariaVoiceUnEnable);
        }
        function B() {
          var e = c.scale;
          e >= c.maxZoom
            ? f.play(a.maxZoomPage)
            : (e ? (e += 0.1) : (e = 1),
              (c.scale = parseFloat(e.toFixed(1))),
              f.play(a.curZoomPage.replace("{0}", e.toFixed(1))),
              new s(".ariazoomb").attr(
                "title",
                a.curZoomPage.replace("{0}", e.toFixed(1)) +
                  "," +
                  a.airafontScaleTextToBig
              ),
              new s(".ariazooms").attr(
                "title",
                a.curZoomPage.replace("{0}", e.toFixed(1)) +
                  "," +
                  a.airafontScaleTextToSmall
              ),
              g.setBodyTran());
        }
        function F() {
          var e = c.scale;
          e <= c.minZoom
            ? f.play(a.minZoomPage)
            : (e ? ((e -= 0.1), (c.scale = parseFloat(e.toFixed(1)))) : (e = 1),
              f.play(a.curZoomPage.replace("{0}", e.toFixed(1))),
              new s(".ariazoomb").attr(
                "title",
                a.curZoomPage.replace("{0}", e.toFixed(1)) +
                  "," +
                  a.airafontScaleTextToBig
              ),
              new s(".ariazooms").attr(
                "title",
                a.curZoomPage.replace("{0}", e.toFixed(1)) +
                  "," +
                  a.airafontScaleTextToSmall
              ),
              g.setBodyTran());
        }
        function _(e) {
          var t,
            n = c.Themes,
            r = c.defaultTheme;
          if (e) {
            if (r) {
              for (var o = 0; o < n.length; o++)
                if (n[o].name == r) {
                  o == n.length - 1
                    ? (c.defaultTheme = n[0].name)
                    : (c.defaultTheme = n[o + 1].name);
                  break;
                }
            } else c.defaultTheme = n[0].name;
            M(c.mousemode),
              p.setSettingTheme(),
              f.play(
                a.ariathemebtn +
                  (c.Theme && c.Theme.displayName ? c.Theme.displayName : "无")
              ),
              new s(".ariathemebtn").attr(
                "title",
                a.ariathemebtn +
                  (c.Theme && c.Theme.displayName ? c.Theme.displayName : "无")
              );
          }
          if (((r = c.defaultTheme), n && 0 < n.length)) {
            for (var i, o = 0; o < n.length; o++)
              if (n[o].name == r) {
                t = o + 1 < n.length ? n[o + 1] : n[0];
                break;
              }
            t
              ? ((i = t.value.color || "black"),
                (e = t.value.backgroundColor || "white"),
                l.addCss(
                  "#ariaToptoolbar .ariathemebtn",
                  {
                    color: i + " !important",
                    "background-color": e + " !important",
                  },
                  "ariathemebtn"
                ))
              : new s("[title='ariathemebtn']").remove();
          }
        }
        function H(e) {
          var t = c.voice.enable,
            n = new s(".ariavoice");
          e &&
            ((c.voice.enable = t = !t)
              ? f.play(a.openvoice)
              : (f.play(a.closevoice), f.stop()),
            N()),
            t
              ? (n.removeClass("ariaicon-close_sound"),
                n.addClass("ariaicon-open_sound"))
              : (n.removeClass("ariaicon-open_sound"),
                n.addClass("ariaicon-close_sound"));
        }
        function K(e) {
          var t,
            n = c.bigsrc;
          e &&
            ((c.bigsrc = !n),
            (e = (n = !n) ? a.ariabigsrcopen : a.ariabigsrcclose),
            new s(".ariabigsrc").attr("title", e),
            f.play(e)),
            n
              ? (new s(document.body).css("margin-bottom") < 150 &&
                  new s(document.body).addClass("ariabodybottomfiexed"),
                new s("#accscreen").addClass("expanded"),
                new s(".ariabigsrc").addClass("fixedSelect"),
                (t = new s("div,footer")),
                l.each(t, function (e, t) {
                  var n = new s(t),
                    t = n.css("bottom");
                  "fixed" == n.css("position") &&
                    !n.aria.skipall &&
                    t < 99 &&
                    (n.css("bottom", t + 150), n.addClass("fixedbottom100"));
                }))
              : (new s(".ariabigsrc").removeClass("fixedSelect"),
                new s(document.body).removeClass("ariabodybottomfiexed"),
                new s("#accscreen").removeClass("expanded"),
                (t = new s(".fixedbottom100")),
                l.each(t, function (e, t) {
                  var n = new s(t),
                    t = n.css("bottom");
                  n.css("bottom", t - 150);
                }),
                new s(".fixedbottom100").removeClass("fixedbottom100"));
        }
        function q() {
          new s(".ariabodytopfiexed").removeClass("ariabodytopfiexed");
          new s(".fiexdTop100");
          new s(".fiexdToabsolute").css("positon", "absolute"),
            new s(".fiexdToabsolute").removeClass("fiexdToabsolute"),
            new s(".fiexdTop100").removeClass("fiexdTop100"),
            new s("#ariaToptoolbar").removeClass("expanded");
        }
        function z(e) {
          var t = c.topfixed;
          e && (c.topfixed = t = !t);
          var n = new s(".ariatopfixed");
          t
            ? (new s(document.body).addClass("ariabodytopfiexed"),
              (t = new s("div,header")),
              l.each(t, function (e, t) {
                new s(t).css("top");
              }),
              e && f.play(a.ariatopfixedtextopen),
              n.addClass("fixedSelect"),
              new s("#ariaToptoolbar").addClass("expanded"))
            : (n.removeClass("fixedSelect"),
              q(),
              e && f.play(a.ariatopfixedtextclose));
        }
        function U(e) {
          new s("#ariaToptoolbar").removeClass("showpannel");
        }
        function W(e) {
          var t,
            n,
            r,
            o = v.changeRegion(e);
          o
            ? o &&
              ((t = o).addClass("currentRegion" + e),
              t.attr("tabindex", 0),
              (n = new s(".acccross" + e)).addClass("select"),
              setTimeout(function () {
                n.removeClass("select");
              }, 500),
              null != (r = t.aria.owns)
                ? (0 < (r = new s(t.context).find(r)).length &&
                    ((o = o.aria.expandShowMethod),
                    window.isAriaDev
                      ? (window.ariaDev.forHideRegion = !0)
                      : (window.aria.forHideRegion = !0),
                    "click" == o
                      ? l.triggerEvent(r.firstNode, "click")
                      : "focus" == o
                      ? r.firstNode.focus()
                      : l.triggerEvent(
                          new s(t.context).find(r).firstNode,
                          "mouseover"
                        )),
                  setTimeout(function () {
                    window.isAriaDev
                      ? (window.ariaDev.forHideRegion = null)
                      : (window.aria.forHideRegion = null),
                      t.addClass("currentRegion" + e),
                      t.focus(),
                      f.play(t.aria.lastText);
                  }, 200))
                : (t.focus(), f.play(t.aria.lastText)))
            : f.play(a.noregiontype.replace("{0}", a["regiontype" + e]));
        }
        c.hostEnable,
          u.registerEvent(
            d.globalListen,
            function (e) {
              var t = i.eventKeyCode(e);
              if (c.status && 49 <= t && t <= 54 && e.altKey)
                return W(t - 48), l.stopBubble(), l.stopDefault(), !0;
              if (c.status && 96 <= t && t <= 105 && e.altKey)
                return W(t - 96), l.stopBubble(), l.stopDefault(), !0;
              if (!i.checkKeyCode(e, i.keyCodeSettings.readtype))
                return i.checkKeyCode(e, i.keyCodeSettings.readsrc)
                  ? (E(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.help)
                  ? (y(), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.wakupConfig)
                  ? (z(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.opVoice)
                  ? (H(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.vocierate)
                  ? (j(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.changeTheme)
                  ? (_(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.fontTob)
                  ? (B(), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.fontTos)
                  ? (F(), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.mouseb)
                  ? (P(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.mouseten)
                  ? (I(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.reset)
                  ? (A(), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.bigsrc)
                  ? (K(e), l.stopBubble(), l.stopDefault(), !0)
                  : i.checkKeyCode(e, i.keyCodeSettings.exitservice)
                  ? (R(), l.stopBubble(), l.stopDefault(), !0)
                  : void 0;
              O(e), l.stopBubble(), l.stopDefault();
            },
            1
          ),
          (e.exports = {
            start: function () {
              return new Promise(function (t, e) {
                (a = a || c.Language),
                  h.enable &&
                    void 0 !== c.road &&
                    (c.inFrame ||
                      0 < new s("#ariaToptoolbar").length ||
                      o.getText(
                        c.themeRoad + "/toolbar.min.html",
                        function (e) {
                          "undefined" == typeof ariaPY && g.addPy(),
                            0 == new s("#ariaiconstyle").length &&
                              new s(document.head).append(
                                '<link type="text/css" rel="stylesheet" id="ariaiconstyle" href="' +
                                  c.themeRoad +
                                  '/css/font.min.css"></link>'
                              ),
                            (e = l.replaceAll(e, "{road}", c.themeRoad)),
                            new s(document.body).append(e),
                            "zh-CN" != c.defaultLanguage &&
                              (new s("#accscreen-py").hide(),
                              new s("#accscreen-jt").hide()),
                            T(),
                            c.readsrc ||
                              (m.start(), f.play(new s("#ariaTipText"))),
                            setTimeout(function () {
                              new s(document.body).on("click", ".ariavoice", H),
                                new s(document.body).on(
                                  "click",
                                  ".ariatopfixed",
                                  z
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariathemebtn",
                                  _
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariazoomb",
                                  B
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariazooms",
                                  F
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariareset",
                                  A
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariaVoiceRate",
                                  j
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariaReadtype",
                                  O
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariamouseb",
                                  P
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariamouseten",
                                  I
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariahighlighttool",
                                  D
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariaexit",
                                  R
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariabigsrc",
                                  K
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariablackgroud",
                                  U
                                ),
                                new s(document.body).on(
                                  "click",
                                  "#accscreen-py",
                                  b
                                ),
                                new s(document.body).on(
                                  "click",
                                  "#accscreen-jt",
                                  w
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariaacchelpbook",
                                  y
                                ),
                                new s(document.body).on(
                                  "click",
                                  ".ariaReadScreen",
                                  E
                                ),
                                t();
                            }, 350);
                        }
                      ));
              });
            },
            end: x,
          });
      },
      2713: function (e, t, n) {
        var r = n(5602),
          o = n(7608),
          i = n(3827),
          a = n(8962),
          s = n(2133),
          l = n(8057),
          c = n(6057),
          u = n(1689),
          d = n(5020),
          f = n(964),
          p = (n(8347), n(9564));
        function g(e) {
          var t;
          (e = e || document),
            o.start(e),
            r.start(e),
            i.start(e),
            s.start(e),
            a.mouseten && u.start(e),
            a.bigpoint && (c.setMouseb(e), c.seGolabFixedCss(e)),
            e == document &&
              (m(document),
              null == h &&
                (h = setInterval(function () {
                  return a.status || null == clearInterval
                    ? void m(document)
                    : (clearInterval(h), void (h = null));
                }, 2e3)),
              (t = e),
              c.setSettingTheme(t),
              d.iframeMouse(e)),
            e != document && a.status && p.start(e);
        }
        var h = null;
        function m(e) {
          f.getAll(e, function (e, t) {
            e.body &&
              0 != e.body.childElementCount &&
              "true" != e.body.getAttribute("ariaevent") &&
              0 < e.body.childElementCount &&
              (g(e), e.body.setAttribute("ariaevent", !0));
          });
        }
        e.exports = {
          start: g,
          end: function () {
            i.end(),
              o.end(),
              r.end(),
              (a.status = !1),
              s.end(),
              c.end(),
              clearInterval(h),
              (h = null),
              f.getAll(document, function (e) {
                new l("body", e).attr("ariaevent", "false"),
                  o.end(e),
                  r.end(e),
                  c.end(e),
                  i.end(e);
              });
          },
          startBigMouse: function () {
            c.setMouseb(document),
              f.getAll(document, function (e) {
                c.setMouseb(e);
              });
          },
          endBigMouse: function () {
            c.removeMouseb(),
              f.getAll(document, function (e) {
                c.removeMouseb(e);
              });
          },
          startMouseTen: function () {
            u.start(),
              f.getAll(document, function (e) {
                u.start(e);
              });
          },
          endMouseTen: function () {
            u.end(),
              f.getAll(document, function (e) {
                u.end(e);
              });
          },
          setSettingTheme: function () {
            c.setSettingTheme(),
              f.getAll(document, function (e) {
                c.setSettingTheme(e);
              });
          },
        };
      },
      5602: function (e, t, n) {
        var r = n(1194),
          o = n(1151),
          i = n(7629),
          a = n(8141),
          s = n(3786),
          l = n(8347);
        e.exports = {
          start: function (e) {
            (e = e || document),
              i.start(e),
              o.start(e),
              r.start(e),
              a.start(e),
              s.start(e),
              l.start(e);
          },
          end: function (e) {
            (e = e || document),
              i.end(e),
              o.end(e),
              r.end(e),
              a.end(e),
              s.end(e),
              l.end(e);
          },
        };
      },
      7608: function (e, t, n) {
        n(8962);
        var r = n(6057),
          o = n(8458),
          i = n(5045),
          a = n(1282);
        n(8057);
        e.exports = {
          start: function (e) {
            (e = e || document),
              o.start(e),
              r.start(e),
              i.setFontSize(e),
              a.start(e);
          },
          end: function (e) {
            (e = e || document), r.end(e), a.end(e);
          },
        };
      },
      8690: function (e, t, n) {
        var r,
          o = n(9228),
          s = n(2491),
          l = n(7156),
          c = n(1771),
          u = n(8962),
          d = n(4152);
        e.exports = function (i, a) {
          function t(e) {
            if (e && 0 < e.length) {
              e = e.split(",");
              for (var t = "", n = 0; n < e.length; n++) {
                var r = e[n];
                0 < r.length && (t += "," + r);
              }
              0 < t.length && (t = t.substring(1, t.length));
              var o = i.find(t);
              return 0 == o.length ? new a(t) : o;
            }
            return null;
          }
          function e(e) {
            e = t(e);
            if (!e) return "";
            var n = "";
            return (
              o.each(e.nodeList, function (e, t) {
                (n += t.value || t.textContent), (n += ",");
              }),
              (n = o.reMoveHtml(n))
            );
          }
          return (
            (r = r || u.Language),
            {
              get id() {
                var e = i.attr("id");
                return e || ((e = o.genID()), i.attr("id", e)), e;
              },
              get isCenterScale() {
                return "true" === i.ariaAttr("isCenterScale");
              },
              get canSetClass() {
                return (
                  "true" !== i.ariaAttr("skipall") &&
                  !(0 < i.closest("[aria-skipall='true']").length) &&
                  ("true" !== i.ariaAttr("skiptheme") || void 0)
                );
              },
              set id(e) {
                i.attr("id", e);
              },
              get isregion() {
                return "true" === i.ariaAttr("region") || !1;
              },
              get region() {
                return i.ariaAttr("region");
              },
              set region(e) {
                i.ariaAttr("region", e);
              },
              get regions() {
                return new a("[aria-region='true']");
              },
              get regionN() {
                var e = i.aria.regionElem,
                  t = i.aria.regions;
                if (!e) return t.firstNode;
                e = e.index(t.nodeList);
                return e < t.length - 1 ? t[e + 1] : null;
              },
              get regionP() {
                var e = i.aria.regionElem,
                  t = i.aria.regions;
                if (!e) return t.firstNode;
                e = e.index(t.nodeList);
                return 0 < e ? t[e - 1] : null;
              },
              get expandShowMethod() {
                return i.ariaAttr("expandShowMethod");
              },
              set expandShowMethod(e) {
                i.ariaAttr("expandShowMethod", e);
              },
              get regionElem() {
                return "true" == i.ariaAttr("region")
                  ? i
                  : new a(i.closest("[aria-region='true']"));
              },
              get nodeName() {
                if (0 === i.length) return null;
                try {
                  var e = i.firstNode.nodeName.toLowerCase();
                  return -1 < [].indexOf.call(o.HtmlElemRoles.select, e)
                    ? "select"
                    : e;
                } catch (e) {}
              },
              get role() {
                return c.getRole(i);
              },
              set role(e) {
                i.attr("role", e);
              },
              get roleText() {
                return c.getRoleText(i);
              },
              get mainText() {
                return s.mainText(i.aria);
              },
              get descText() {
                return s.descText(i.aria);
              },
              get orientation() {
                return i.ariaAttr("orientation");
              },
              set orientation(e) {
                i.ariaAttr("orientation", e);
              },
              get errormessage() {
                return i.ariaAttr("errormessage") || i.attr("errormessage");
              },
              set errormessage(e) {
                i.ariaAttr("errormessage", e);
              },
              get description() {
                return i.ariaAttr("description");
              },
              set description(e) {
                i.ariaAttr("description", e);
              },
              get current() {
                return i.ariaAttr("current");
              },
              set current(e) {
                i.ariaAttr("current", e);
              },
              get modal() {
                return i.ariaAttr("modal");
              },
              set modal(e) {
                i.ariaAttr("modal", e);
              },
              get pressed() {
                return i.ariaAttr("pressed");
              },
              set pressed(e) {
                i.ariaAttr("pressed", e);
              },
              get valueText() {
                return l(i);
              },
              set valueText(e) {
                i.ariaAttr("valuetext", e), i.val(e), i.text(e);
              },
              get valuenow() {
                return i.ariaAttr("valuenow") || i.val();
              },
              set valuenow(e) {
                i.ariaAttr("valuenow", e), i.val(e);
              },
              get valuemin() {
                return i.ariaAttr("valuemin") || i.attr("min");
              },
              get valueminText() {
                return this.valuemin ? r.min + this.valuemin : null;
              },
              set valuemin(e) {
                i.ariaAttr("valuemin", e), i.attr("min", e);
              },
              get valuemax() {
                return i.ariaAttr("valuemax") || i.attr("max");
              },
              set valuemax(e) {
                i.ariaAttr("valuemax", e), i.attr("max", e);
              },
              get valuemaxText() {
                return this.valuemax ? r.max + this.valuemax : null;
              },
              get value() {
                return i.val();
              },
              get text() {
                return i.text();
              },
              get sort() {
                return i.ariaAttr("sort") || i.attr("sort");
              },
              set sort(e) {
                i.ariaAttr("sort", e), i.attr("sort", e);
              },
              get relevant() {
                return i.ariaAttr("relevant");
              },
              set relevant(e) {
                i.ariaAttr("relevant", e);
              },
              get posinset() {
                return o.formatInt(i.ariaAttr("posinset"));
              },
              set posinset(e) {
                i.ariaAttr("posinset", e);
              },
              get owns() {
                return i.ariaAttr("owns");
              },
              set owns(e) {
                i.ariaAttr("owns", e);
              },
              get ownsfor() {
                return i.ariaAttr("ownsfor");
              },
              set ownsfor(e) {
                i.ariaAttr("ownsfor", e);
              },
              get live() {
                return i.ariaAttr("live");
              },
              set live(e) {
                i.ariaAttr("live", e);
              },
              get computedName() {
                return i.attr("computedName");
              },
              get describedby() {
                return t(i.ariaAttr("describedby"));
              },
              set describedby(e) {
                i.ariaAttr("describedby", e);
              },
              get describedbyText() {
                return e(i.ariaAttr("describedby"));
              },
              get labelledbyText() {
                return e(i.ariaAttr("labelledby") || i.attr("labelled-by"));
              },
              get labelledby() {
                return i.ariaAttr("labelledby") || i.attr("labelled-by");
              },
              set labelledby(e) {
                i.ariaAttr("labelledby", e);
              },
              get toolTipText() {
                return i.attr("data-tooltip-text");
              },
              get labelforText() {
                var e = i.attr("id");
                if (!e || 0 === e.length) return null;
                e = new a("label[for='" + e + "']");
                return 0 < e.nodeList.length ? e.text() : null;
              },
              get labelfor() {
                return i.attr("for");
              },
              set labelfor(e) {
                i.attr("for", e);
              },
              get labelWrapperText() {
                if (0 === i.nodeList.length) return null;
                var e = i.nodeList[0];
                if (!e.labels || 0 === e.labels.length) return null;
                var r = "";
                return (
                  o.each(e.labels, function (e, t) {
                    var n = new a(t),
                      t = n.aria.descText;
                    t && (r += t), (r += n.aria.valueText);
                  }),
                  r
                );
              },
              get placeholder() {
                return i.attr("placeholder");
              },
              set placeholder(e) {
                i.attr("placeholder", e);
              },
              get title() {
                return i.attr("title");
              },
              set title(e) {
                i.attr("title", e);
              },
              get alt() {
                return i.attr("alt");
              },
              set alt(e) {
                i.attr("alt", e);
              },
              get label() {
                return i.ariaAttr("label");
              },
              set label(e) {
                i.ariaAttr("label", e);
              },
              get described() {
                return i.ariaAttr("described");
              },
              set described(e) {
                i.ariaAttr("described", e);
              },
              get grabbed() {
                return i.ariaAttr("grabbed");
              },
              set grabbed(e) {
                i.ariaAttr("grabbed", e);
              },
              get flowto() {
                return t(i.ariaAttr("flowto"));
              },
              set flowto(e) {
                i.ariaAttr("flowto", e);
              },
              get dropeffect() {
                return i.ariaAttr("dropeffect");
              },
              set dropeffect(e) {
                i.ariaAttr("dropeffect", e);
              },
              get controls() {
                return t(i.ariaAttr("controls"));
              },
              get nextFocus() {
                return d.nextFocus1(i, a);
              },
              get preFocus() {
                return d.preFocus1(i, a);
              },
              get firstFocus() {
                return d.firstFocus1(i, a);
              },
              get lastFocus() {
                return d.lastFocus1(i, a);
              },
              set controls(e) {
                i.ariaAttr("controls", e);
              },
              get busy() {
                return o.strToObj(i.ariaAttr("busy"));
              },
              set busy(e) {
                i.ariaAttr("busy", e);
              },
              get autocomplete() {
                return i.ariaAttr("autocomplete");
              },
              set autocomplete(e) {
                "none" === e
                  ? i.attr("autocomplete", "off")
                  : i.attr("autocomplete", "on"),
                  i.ariaAttr("autocomplete", e);
              },
              get atomic() {
                return (
                  0 < i.closest("[aria-atomic='true']").length ||
                  "true" == i.ariaAttr("atomic")
                );
              },
              set atomic(e) {
                i.ariaAttr("atomic", e);
              },
              get atomicElem() {
                return "true" == i.ariaAttr("atomic")
                  ? i
                  : i.closest("[aria-atomic='true']");
              },
              get atomicText() {
                var e =
                  "true" == i.ariaAttr("atomic")
                    ? i
                    : i.closest("[aria-atomic='true']");
                return e ? e.textAll(!0) : null;
              },
              get activedescendant() {
                return i.ariaAttr("activedescendant");
              },
              set activedescendant(e) {
                i.ariaAttr("activedescendant", e);
              },
              get hidden() {
                return o.strToObj(i.ariaAttr("hidden") || i.isHidden());
              },
              set hidden(e) {
                i.ariaAttr("hidden", e), e ? i.hidden() : i.show();
              },
              get expanded() {
                return o.strToObj(i.ariaAttr("expanded"));
              },
              set expanded(e) {
                i.ariaAttr("expanded", e), i.attr("expanded", e);
              },
              get checked() {
                return -1 <
                  ["checkbox", "radiobox", "radio", "switch"].indexOf(
                    i.aria.role
                  ) && void 0 !== i.is("checked")
                  ? i.is("checked")
                  : o.strToObj(i.attr("checked") || i.ariaAttr("checked"));
              },
              set checked(e) {
                e
                  ? (i.ariaAttr("checked", e), i.attr("checked", e))
                  : (i.removeAttr("checked"), i.removeAttr("aria-checked"));
              },
              get haspopup() {
                return o.strToObj(i.attr("haspopup") || i.ariaAttr("haspopup"));
              },
              set haspopup(e) {
                i.ariaAttr("haspopup", e), i.attr("haspopup", e);
              },
              get disabled() {
                return (
                  i.is("disabled") ||
                  o.strToObj(i.attr("disabled") || i.ariaAttr("disabled"))
                );
              },
              set disabled(e) {
                i.ariaAttr("disabled", e), i.attr("disabled", e);
              },
              get invalid() {
                return o.strToObj(i.ariaAttr("invalid"));
              },
              set invalid(e) {
                i.ariaAttr("invalid", e);
              },
              get selected() {
                return o.strToObj(
                  i.is("selected") ||
                    i.attr("selected") ||
                    i.ariaAttr("selected")
                );
              },
              set selected(e) {
                i.ariaAttr("selected", e), i.attr("selected", e);
              },
              get level() {
                var e,
                  t = i.ariaAttr("level");
                return (
                  t ||
                    ((e = this.nodeName),
                    -1 < o.HtmlElemRoles.heading.indexOf(e) &&
                      (t = e.replace("h", ""))),
                  o.strToObj(t)
                );
              },
              set level(e) {
                i.ariaAttr("level", e);
              },
              get multiselectable() {
                return o.strToObj(i.ariaAttr("multiselectable"));
              },
              set multiselectable(e) {
                i.ariaAttr("multiselectable", e);
              },
              get required() {
                return o.strToObj(i.ariaAttr("required") || i.attr("required"));
              },
              set required(e) {
                i.ariaAttr("required", e), i.attr("required", e);
              },
              get readonly() {
                return (
                  i.is("readonly") ||
                  o.strToObj(i.ariaAttr("readonly") || i.attr("readonly"))
                );
              },
              set readonly(e) {
                i.ariaAttr("readonly", e), i.attr("readonly", e);
              },
              get multiLine() {
                return o.strToObj(
                  i.ariaAttr("multiline") || i.attr("multiline")
                );
              },
              set multiLine(e) {
                i.ariaAttr("multiline", e), i.attr("multiline", e);
              },
              get focusable() {
                if (i.isHidden()) return !1;
                var e = i.firstNode;
                if (!e) return !1;
                if (1 == e.nodeType) {
                  if ("0" == e.getAttribute("tabindex")) return !0;
                  if ("INPUT" == e.tagName) {
                    var t = e.getAttribute("type");
                    if (!t || "hidden" != t) return !0;
                  }
                  if (
                    ("A" == e.tagName && e.getAttribute("href")) ||
                    "SELECT" == e.tagName ||
                    "TEXTAREA" == e.tagName ||
                    "BUTTON" == e.tagName
                  )
                    return !0;
                }
                return !1;
              },
              set focusable(e) {
                i.attr("tabindex", (e = e || 0));
              },
              get skiptheme() {
                return (
                  "true" == i.ariaAttr("skiptheme") ||
                  0 < i.closest("[aria-skiptheme='true']").length ||
                  "true" == i.ariaAttr("skipall") ||
                  0 < i.closest("[aria-skipall='true']").length
                );
              },
              get skipall() {
                return (
                  "true" == i.ariaAttr("skipall") ||
                  0 < i.closest("[aria-skipall='true']").length
                );
              },
              get skipscale() {
                return (
                  "true" == i.ariaAttr("skipscale") ||
                  0 < i.closest("[aria-skipscale='true']").length ||
                  "true" == i.ariaAttr("skipall") ||
                  0 < i.closest("[aria-skipall='true']").length
                );
              },
              get isDialog() {
                return (
                  -1 < [].indexOf.call(o.HtmlElemRoles.dialog, i.aria.role) ||
                  0 < i.closest(o.arrToSizzle(o.HtmlElemRoles.dialog)).length
                );
              },
              get dialog() {
                if (-1 < [].indexOf.call(o.HtmlElemRoles.dialog, i.aria.role))
                  return i;
                var e = i.closest(o.arrToSizzle(o.HtmlElemRoles.dialog));
                return 0 < e.length ? e : null;
              },
              get action() {
                return i.ariaAttr("action");
              },
              get lastText() {
                return s.lastDesc(i);
              },
              get tabindex() {
                return i.attr("tabindex");
              },
              set tabindex(e) {
                null != e ? i.attr("tabindex", e) : i.removeAttr("tabindex");
              },
              get enterownsmethod() {
                var e = i.ariaAttr("enterownsmethod");
                return "Ctrl+Enter" == e ? "1" : e;
              },
              set enterownsmethod(e) {
                i.ariaAttr("enterownsmethod", e);
              },
              get eschide() {
                return i.ariaAttr("eschide");
              },
            }
          );
        };
      },
      2087: function (e, t, n) {
        var r,
          o = n(9722),
          i = n(365),
          a = n(2998),
          s = n(994),
          l = n(9427),
          c = n(6057),
          u = (n(8458), n(8962)),
          d = n(954),
          f = n(57),
          p = n(2264),
          g = !1;
        var h = u.defaultTheme,
          m = u.scale,
          v = u.voice.enable,
          y = u.status;
        e.exports = {
          start: function (e) {
            (g = !0),
              r || (clearInterval(r), (r = null)),
              d.init().then(function () {
                o.start(),
                  i.start(),
                  a.start(),
                  u.readsrc || (s.start(), l.start()),
                  (u.status = !0),
                  (r = setInterval(function () {
                    (h == u.defaultTheme && m == u.scale) ||
                      ((h = u.defaultTheme),
                      (m = u.scale),
                      c.setSettingTheme()),
                      v != u.voice.enable && (v = u.voice.enable),
                      y != u.status &&
                        ((y = u.status),
                        u.status
                          ? f.execEvent(p.globalStart)
                          : f.execEvent(p.globalEnd));
                  }, 5e3));
              });
          },
          end: function () {
            if (
              ((g = !1),
              r || (clearInterval(r), (r = null)),
              o.end(),
              i.end(),
              a.end(),
              !u.readsrc)
            )
              try {
                s.end(), l.end();
              } catch (e) {}
            c.end(), (u.status = !1);
          },
          getMobileStart: function () {
            return g;
          },
        };
      },
      1855: function (e, t, n) {
        var r = n(8057),
          o = n(8962),
          i = n(2125),
          a = (n(2087), n(6057)),
          s = n(8458);
        function l(e) {
          e = new r(e.target);
          i.play(e.aria.lastText);
        }
        function c(e) {
          setTimeout(function () {
            o.status ? (s.start(), a.setSettingTheme()) : a.end();
          }, 50);
        }
        e.exports = {
          start: function (e) {
            function t(e) {
              var t = history[e],
                n = new Event(e);
              return function () {
                var e = t.apply(this, arguments);
                return (n.arguments = arguments), window.dispatchEvent(n), e;
              };
            }
            (history.pushState = t("pushState")),
              (history.replaceState = t("replaceState")),
              window.addEventListener("pushState", c),
              window.addEventListener("replaceState", c),
              window.addEventListener("popstate", c),
              window.addEventListener("hashchange", c),
              new r(document).on("change", "*", l);
          },
          end: function () {
            window.removeEventListener("popstate", c),
              window.removeEventListener("pushState", c),
              window.removeEventListener("replaceState", c),
              window.removeEventListener("hashchange", c),
              new r(document).off("change", "*", l);
          },
        };
      },
      9427: function (e, t, n) {
        var r = n(5014);
        function o(e) {
          window.doubletap = !0;
        }
        e.exports = {
          start: function () {
            r.on(document, "doubletap", "*", o);
          },
          end: function () {
            r.off(document, "doubletap", "*", o);
          },
        };
      },
      1337: function (e, t, n) {
        var r = n(5014),
          o = n(8962),
          i = n(2087);
        function a(e) {
          (window.canRead = !0),
            2 == e.fingersCount &&
              (o.status ? i.end() : i.start(), (window.ariaHold = !0));
        }
        e.exports = {
          start: function () {
            r.on(document, "hold", "*", a),
              setInterval(function () {
                o.status && !i.getMobileStart() && i.start(),
                  !o.status && i.getMobileStart() && i.end();
              }, 500);
          },
          end: function () {
            r.off(document, "hold", "*", a);
          },
        };
      },
      2998: function (e, t, n) {
        var r = n(5014),
          i = n(8057),
          a = n(9228),
          s = n(2125),
          l = n(5045);
        var c = 0;
        function o(e) {
          var t = e.fingersCount,
            n = e.distance,
            e = e.direction;
          if (!(n < 100) && window.startSwipe) {
            if (1 == t) {
              var n = window.ariaFocusElem,
                r = new i(n),
                o = r;
              switch (e) {
                case "left":
                  o = r.aria.preFocus;
                  break;
                case "right":
                  o = r.aria.nextFocus;
              }
              (o = !(window.ariaFocusElem = o).jTool ? new i(o) : o) != r &&
                (o.focus(), s.play(o.aria.lastText), l.setClass(o));
            }
            if (2 == t)
              switch (e) {
                case "up":
                  a.scroll(0, 0);
                  break;
                case "down":
                  a.scroll(0, document.body.scrollHeight);
                  break;
                case "right":
                  (c += 1), u();
                  break;
                case "left":
                  --c, u();
              }
            window.startSwipe = !1;
          }
        }
        function u() {
          var e = new i("[aria-region='true']");
          0 != e.length &&
            ((c = c < 0 ? e.length - 1 : c) >= e.length && (c = 0),
            (e = new i(e[c])).focus(),
            l.setClass(e),
            s.play(e.aria.lastText));
        }
        e.exports = {
          start: function () {
            r.on(document, "swipe", "*", o);
          },
          end: function () {
            r.off(document, "swipe", "*", o);
          },
        };
      },
      994: function (e, t, n) {
        var r = n(5014),
          o = n(2125),
          i = n(8057),
          a = n(5045);
        n(9228);
        function s(e) {
          window.canRead = !0;
          e = new i(e.target);
          3 < e.child().length ||
            ((window.ariaFocusElem = e),
            o.play(e.aria.lastText),
            a.setClass(e, document));
        }
        e.exports = {
          start: function () {
            r.on(document, "tap", "*", s);
          },
          end: function () {
            r.off(document, "tap", "*", s);
          },
        };
      },
      5014: function (e, t, n) {
        "use strict";
        var r;
        void 0 ===
          (r =
            "function" ==
            typeof (r = function () {
              var p = {
                PCevts: {
                  touchstart: "mousedown",
                  touchmove: "mousemove",
                  touchend: "mouseup",
                  touchcancel: "mouseout",
                },
              };
              (p.hasTouch = "ontouchstart" in window),
                (p.getType = function (e) {
                  return Object.prototype.toString
                    .call(e)
                    .match(/\s([a-z|A-Z]+)/)[1]
                    .toLowerCase();
                }),
                (p.getSelector = function (e) {
                  if (e.id) return "#" + e.id;
                  if (e.className) {
                    var t = e.className.split(/\s+/);
                    return "." + t.join(".");
                  } else if (e === document) return "body";
                  else return e.tagName.toLowerCase();
                }),
                (p.matchSelector = function (e, t) {
                  return e.webkitMatchesSelector(t);
                }),
                (p.getEventListeners = function (e) {
                  return e.listeners;
                }),
                (p.getPCevts = function (e) {
                  return this.PCevts[e] || e;
                }),
                (p.forceReflow = function () {
                  var e = "reflowDivBlock";
                  var t = document.getElementById(e);
                  if (!t) {
                    t = document.createElement("div");
                    t.id = e;
                    document.body.appendChild(t);
                  }
                  var n = t.parentNode;
                  var r = t.nextSibling;
                  n.removeChild(t);
                  n.insertBefore(t, r);
                }),
                (p.simpleClone = function (e) {
                  return Object.create(e);
                }),
                (p.getPosOfEvent = function (e) {
                  if (this.hasTouch) {
                    var t = [];
                    var n = null;
                    for (var r = 0, o = e.touches.length; r < o; r++) {
                      n = e.touches[r];
                      t.push({ x: n.pageX, y: n.pageY });
                    }
                    return t;
                  } else return [{ x: e.pageX, y: e.pageY }];
                }),
                (p.getDistance = function (e, t) {
                  var n = t.x - e.x,
                    r = t.y - e.y;
                  return Math.sqrt(n * n + r * r);
                }),
                (p.getFingers = function (e) {
                  return e.touches ? e.touches.length : 1;
                }),
                (p.calScale = function (e, t) {
                  if (e.length >= 2 && t.length >= 2) {
                    var n = this.getDistance(e[1], e[0]);
                    var r = this.getDistance(t[1], t[0]);
                    return r / n;
                  }
                  return 1;
                }),
                (p.getAngle = function (e, t) {
                  return (Math.atan2(t.y - e.y, t.x - e.x) * 180) / Math.PI;
                }),
                (p.getAngle180 = function (e, t) {
                  var n =
                    Math.atan(((t.y - e.y) * -1) / (t.x - e.x)) *
                    (180 / Math.PI);
                  return n < 0 ? n + 180 : n;
                }),
                (p.getDirectionFromAngle = function (e) {
                  var t = {
                    up: e < -45 && e > -135,
                    down: e >= 45 && e < 135,
                    left: e >= 135 || e <= -135,
                    right: e >= -45 && e <= 45,
                  };
                  for (var n in t) if (t[n]) return n;
                  return null;
                }),
                (p.getXYByElement = function (e) {
                  var t = 0,
                    n = 0;
                  while (e.offsetParent) {
                    t += e.offsetLeft;
                    n += e.offsetTop;
                    e = e.offsetParent;
                  }
                  return { left: t, top: n };
                }),
                (p.reset = function () {
                  i = t = a = null;
                  l = T = b = u = false;
                  w = false;
                  v = {};
                  f = false;
                }),
                (p.isTouchMove = function (e) {
                  return e.type === "touchmove" || e.type === "mousemove";
                }),
                (p.isTouchEnd = function (e) {
                  return (
                    e.type === "touchend" ||
                    e.type === "mouseup" ||
                    e.type === "touchcancel"
                  );
                }),
                (p.env = (function () {
                  var e = {},
                    t = navigator.userAgent,
                    n = t.match(/(Android)[\s\/]+([\d\.]+)/),
                    r = t.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
                    o = t.match(/(Windows\s+Phone)\s([\d\.]+)/),
                    i = /WebKit\/[\d.]+/i.test(t),
                    a = r
                      ? navigator.standalone
                        ? i
                        : /Safari/i.test(t) &&
                          !/CriOS/i.test(t) &&
                          !/MQQBrowser/i.test(t)
                      : false;
                  if (n) {
                    e.android = true;
                    e.version = n[2];
                  }
                  if (r) {
                    e.ios = true;
                    e.version = r[2].replace(/_/g, ".");
                    e.ios7 = /^7/.test(e.version);
                    if (r[1] === "iPad") e.ipad = true;
                    else if (r[1] === "iPhone") {
                      e.iphone = true;
                      e.iphone5 = screen.height == 568;
                    } else if (r[1] === "iPod") e.ipod = true;
                  }
                  if (o) {
                    e.wp = true;
                    e.version = o[2];
                    e.wp8 = /^8/.test(e.version);
                  }
                  if (i) e.webkit = true;
                  if (a) e.safari = true;
                  return e;
                })());
              var g = {
                  proxyid: 0,
                  proxies: [],
                  trigger: function e(t, n, r) {
                    r = r || {};
                    var o,
                      i = { bubbles: true, cancelable: true, detail: r };
                    try {
                      if (typeof CustomEvent !== "undefined") {
                        o = new CustomEvent(n, i);
                        if (t) t.dispatchEvent(o);
                      } else {
                        o = document.createEvent("CustomEvent");
                        o.initCustomEvent(n, true, true, r);
                        if (t) t.dispatchEvent(o);
                      }
                    } catch (e) {
                      console.warn("Touch.js is not supported by environment.");
                    }
                  },
                  bind: function e(t, n, o) {
                    t.listeners = t.listeners || {};
                    if (!t.listeners[n]) t.listeners[n] = [o];
                    else t.listeners[n].push(o);
                    var r = function e(t) {
                      if (p.env.ios7) p.forceReflow();
                      t.originEvent = t;
                      for (var n in t.detail)
                        if (n !== "type") t[n] = t.detail[n];
                      t.startRotate = function () {
                        f = true;
                      };
                      var r = o.call(t.target, t);
                      if (typeof r !== "undefined" && !r) {
                        t.stopPropagation();
                        t.preventDefault();
                      }
                    };
                    o.proxy = o.proxy || {};
                    if (!o.proxy[n]) o.proxy[n] = [this.proxyid++];
                    else o.proxy[n].push(this.proxyid++);
                    this.proxies.push(r);
                    if (t.addEventListener) t.addEventListener(n, r, false);
                  },
                  unbind: function e(t, n, r) {
                    if (!r) {
                      var o = t.listeners[n];
                      if (o && o.length)
                        o.forEach(function (e) {
                          t.removeEventListener(n, e, false);
                        });
                    } else {
                      var i = r.proxy[n];
                      if (i && i.length)
                        i.forEach(function (e) {
                          if (t.removeEventListener)
                            t.removeEventListener(
                              n,
                              this.proxies[this.proxyid],
                              false
                            );
                        });
                    }
                  },
                  delegate: function e(l, t, c, u) {
                    var n = function e(t) {
                      var n, r;
                      t.originEvent = t;
                      for (var o in t.detail)
                        if (o !== "type") t[o] = t.detail[o];
                      t.startRotate = function () {
                        f = true;
                      };
                      var i = p.getSelector(l) + " " + c;
                      var a = p.matchSelector(t.target, i);
                      var s = p.matchSelector(
                        t.target,
                        i + " " + t.target.nodeName
                      );
                      if (!a && s) {
                        if (p.env.ios7) p.forceReflow();
                        n = t.target;
                        while (!p.matchSelector(n, i)) n = n.parentNode;
                        r = u.call(t.target, t);
                        if (typeof r !== "undefined" && !r) {
                          t.stopPropagation();
                          t.preventDefault();
                        }
                      } else {
                        if (p.env.ios7) p.forceReflow();
                        if (a || s) {
                          r = u.call(t.target, t);
                          if (typeof r !== "undefined" && !r) {
                            t.stopPropagation();
                            t.preventDefault();
                          }
                        }
                      }
                    };
                    u.proxy = u.proxy || {};
                    if (!u.proxy[t]) u.proxy[t] = [this.proxyid++];
                    else u.proxy[t].push(this.proxyid++);
                    this.proxies.push(n);
                    l.listeners = l.listeners || {};
                    if (!l.listeners[t]) l.listeners[t] = [n];
                    else l.listeners[t].push(n);
                    if (l.addEventListener) l.addEventListener(t, n, false);
                  },
                  undelegate: function e(t, n, r, o) {
                    if (!o) {
                      var i = t.listeners[n];
                      i.forEach(function (e) {
                        t.removeEventListener(n, e, false);
                      });
                    } else
                      try {
                        var a = o.proxy[n];
                        var s = this;
                        if (a.length)
                          a.forEach(function (e) {
                            if (t.removeEventListener)
                              t.removeEventListener(n, s.proxies[e], false);
                          });
                      } catch (e) {}
                  },
                },
                h = {
                  tap: true,
                  doubleTap: true,
                  tapMaxDistance: 10,
                  hold: true,
                  tapTime: 200,
                  holdTime: 650,
                  maxDoubleTapInterval: 300,
                  swipe: true,
                  swipeTime: 300,
                  swipeMinDistance: 18,
                  swipeFactor: 5,
                  drag: true,
                  pinch: true,
                  minScaleRate: 0,
                  minRotationAngle: 0,
                },
                m = {
                  TOUCH_START: "touchstart",
                  TOUCH_MOVE: "touchmove",
                  TOUCH_END: "touchend",
                  TOUCH_CANCEL: "touchcancel",
                  MOUSE_DOWN: "mousedown",
                  MOUSE_MOVE: "mousemove",
                  MOUSE_UP: "mouseup",
                  CLICK: "click",
                  PINCH_START: "pinchstart",
                  PINCH_END: "pinchend",
                  PINCH: "pinch",
                  PINCH_IN: "pinchin",
                  PINCH_OUT: "pinchout",
                  ROTATION_LEFT: "rotateleft",
                  ROTATION_RIGHT: "rotateright",
                  ROTATION: "rotate",
                  SWIPE_START: "swipestart",
                  SWIPING: "swiping",
                  SWIPE_END: "swipeend",
                  SWIPE_LEFT: "swipeleft",
                  SWIPE_RIGHT: "swiperight",
                  SWIPE_UP: "swipeup",
                  SWIPE_DOWN: "swipedown",
                  SWIPE: "swipe",
                  DRAG: "drag",
                  DRAGSTART: "dragstart",
                  DRAGEND: "dragend",
                  HOLD: "hold",
                  TAP: "tap",
                  DOUBLE_TAP: "doubletap",
                },
                v = { start: null, move: null, end: null },
                y = 0,
                e = 0,
                i = null,
                t = null,
                a = null,
                b = false,
                u = false,
                w = false,
                x = {},
                T = false,
                s = null,
                l = false,
                n = null,
                c = null,
                d = 1,
                f = false,
                C = [],
                E = 0,
                A = 0,
                S = 0,
                k = null,
                N = {
                  getAngleDiff: function e(t) {
                    var n = parseInt(E - p.getAngle180(t[0], t[1]), 10);
                    var r = 0;
                    while (Math.abs(n - A) > 90 && r++ < 50)
                      if (A < 0) n -= 180;
                      else n += 180;
                    A = parseInt(n, 10);
                    return A;
                  },
                  pinch: function e(t) {
                    var n = t.target;
                    if (h.pinch) {
                      if (!T) return;
                      if (p.getFingers(t) < 2) if (!p.isTouchEnd(t)) return;
                      var r = p.calScale(v.start, v.move);
                      var o = this.getAngleDiff(v.move);
                      var i = {
                        type: "",
                        originEvent: t,
                        scale: r,
                        rotation: o,
                        direction: o > 0 ? "right" : "left",
                        fingersCount: p.getFingers(t),
                      };
                      if (!u) {
                        u = true;
                        i.fingerStatus = "start";
                        g.trigger(n, m.PINCH_START, i);
                      } else if (p.isTouchMove(t)) {
                        i.fingerStatus = "move";
                        g.trigger(n, m.PINCH, i);
                      } else if (p.isTouchEnd(t)) {
                        i.fingerStatus = "end";
                        g.trigger(n, m.PINCH_END, i);
                        p.reset();
                      }
                      if (Math.abs(1 - r) > h.minScaleRate) {
                        var a = p.simpleClone(i);
                        var s = 1e-11;
                        if (r > d) {
                          d = r - s;
                          g.trigger(n, m.PINCH_OUT, a, false);
                        } else if (r < d) {
                          d = r + s;
                          g.trigger(n, m.PINCH_IN, a, false);
                        }
                        if (p.isTouchEnd(t)) d = 1;
                      }
                      if (Math.abs(o) > h.minRotationAngle) {
                        var l = p.simpleClone(i),
                          c;
                        c = o > 0 ? m.ROTATION_RIGHT : m.ROTATION_LEFT;
                        g.trigger(n, c, l, false);
                        g.trigger(n, m.ROTATION, i);
                      }
                    }
                  },
                  rotateSingleFinger: function e(t) {
                    var n = t.target;
                    if (f && p.getFingers(t) < 2) {
                      if (!v.move) return;
                      if (C.length < 2) {
                        var r = p.getXYByElement(n);
                        C = [
                          {
                            x: r.left + n.offsetWidth / 2,
                            y: r.top + n.offsetHeight / 2,
                          },
                          v.move[0],
                        ];
                        E = parseInt(p.getAngle180(C[0], C[1]), 10);
                      }
                      var o = [C[0], v.move[0]];
                      var i = this.getAngleDiff(o);
                      var a = {
                        type: "",
                        originEvent: t,
                        rotation: i,
                        direction: i > 0 ? "right" : "left",
                        fingersCount: p.getFingers(t),
                      };
                      if (p.isTouchMove(t)) a.fingerStatus = "move";
                      else if (p.isTouchEnd(t) || t.type === "mouseout") {
                        a.fingerStatus = "end";
                        g.trigger(n, m.PINCH_END, a);
                        p.reset();
                      }
                      var s = i > 0 ? m.ROTATION_RIGHT : m.ROTATION_LEFT;
                      g.trigger(n, s, a);
                      g.trigger(n, m.ROTATION, a);
                    }
                  },
                  swipe: function e(t) {
                    var n = t.target;
                    if (!T || !v.move || p.getFingers(t) > 1) return;
                    var r = Date.now();
                    var o = r - y;
                    var i = p.getDistance(v.start[0], v.move[0]);
                    var a = { x: v.move[0].x - x.left, y: v.move[0].y - x.top };
                    var s = p.getAngle(v.start[0], v.move[0]);
                    var l = p.getDirectionFromAngle(s);
                    var c = o / 1e3;
                    var u = (10 - h.swipeFactor) * 10 * c * c;
                    var d = {
                      type: m.SWIPE,
                      originEvent: t,
                      position: a,
                      direction: l,
                      distance: i,
                      distanceX: v.move[0].x - v.start[0].x,
                      distanceY: v.move[0].y - v.start[0].y,
                      x: v.move[0].x - v.start[0].x,
                      y: v.move[0].y - v.start[0].y,
                      angle: s,
                      duration: o,
                      fingersCount: p.getFingers(t),
                      factor: u,
                    };
                    if (h.swipe) {
                      var f = function e() {
                        var t = m;
                        switch (l) {
                          case "up":
                            g.trigger(n, t.SWIPE_UP, d);
                            break;
                          case "down":
                            g.trigger(n, t.SWIPE_DOWN, d);
                            break;
                          case "left":
                            g.trigger(n, t.SWIPE_LEFT, d);
                            break;
                          case "right":
                            g.trigger(n, t.SWIPE_RIGHT, d);
                            break;
                        }
                      };
                      if (!b) {
                        d.fingerStatus = d.swipe = "start";
                        b = true;
                        g.trigger(n, m.SWIPE_START, d);
                      } else if (p.isTouchMove(t)) {
                        d.fingerStatus = d.swipe = "move";
                        g.trigger(n, m.SWIPING, d);
                        if (
                          o > h.swipeTime &&
                          o < h.swipeTime + 50 &&
                          i > h.swipeMinDistance
                        ) {
                          f();
                          g.trigger(n, m.SWIPE, d, false);
                        }
                      } else if (p.isTouchEnd(t) || t.type === "mouseout") {
                        d.fingerStatus = d.swipe = "end";
                        g.trigger(n, m.SWIPE_END, d);
                        if (h.swipeTime > o && i > h.swipeMinDistance) {
                          f();
                          g.trigger(n, m.SWIPE, d, false);
                        }
                      }
                    }
                    if (h.drag)
                      if (!w) {
                        d.fingerStatus = d.swipe = "start";
                        w = true;
                        g.trigger(n, m.DRAGSTART, d);
                      } else if (p.isTouchMove(t)) {
                        d.fingerStatus = d.swipe = "move";
                        g.trigger(n, m.DRAG, d);
                      } else if (p.isTouchEnd(t)) {
                        d.fingerStatus = d.swipe = "end";
                        g.trigger(n, m.DRAGEND, d);
                      }
                  },
                  tap: function e(t) {
                    var n = t.target;
                    if (h.tap) {
                      var r = Date.now();
                      var o = r - y;
                      var i = p.getDistance(
                        v.start[0],
                        v.move ? v.move[0] : v.start[0]
                      );
                      clearTimeout(s);
                      var a = (function () {
                        if (
                          k &&
                          h.doubleTap &&
                          y - S < h.maxDoubleTapInterval
                        ) {
                          var e = p.getDistance(k, v.start[0]);
                          if (e < 16) return true;
                        }
                        return false;
                      })();
                      if (a) {
                        clearTimeout(c);
                        g.trigger(n, m.DOUBLE_TAP, {
                          type: m.DOUBLE_TAP,
                          originEvent: t,
                          position: v.start[0],
                        });
                        return;
                      }
                      if (h.tapMaxDistance < i) return;
                      if (h.holdTime > o && p.getFingers(t) <= 1) {
                        l = true;
                        S = r;
                        k = v.start[0];
                        c = setTimeout(function () {
                          g.trigger(n, m.TAP, {
                            type: m.TAP,
                            originEvent: t,
                            fingersCount: p.getFingers(t),
                            position: k,
                          });
                        }, h.tapTime);
                      }
                    }
                  },
                  hold: function e(t) {
                    var n = t.target;
                    if (h.hold) {
                      clearTimeout(s);
                      s = setTimeout(function () {
                        if (!v.start) return;
                        var e = p.getDistance(
                          v.start[0],
                          v.move ? v.move[0] : v.start[0]
                        );
                        if (h.tapMaxDistance < e) return;
                        if (!l)
                          g.trigger(n, "hold", {
                            type: "hold",
                            originEvent: t,
                            fingersCount: p.getFingers(t),
                            position: v.start[0],
                          });
                      }, h.holdTime);
                    }
                  },
                },
                r = function e(t) {
                  var n = t.target;
                  switch (t.type) {
                    case "touchstart":
                    case "mousedown":
                      C = [];
                      T = true;
                      if (!v.start || v.start.length < 2)
                        v.start = p.getPosOfEvent(t);
                      if (p.getFingers(t) >= 2)
                        E = parseInt(p.getAngle180(v.start[0], v.start[1]), 10);
                      y = Date.now();
                      i = t;
                      x = {};
                      var r = n.getBoundingClientRect();
                      var o = document.documentElement;
                      x = {
                        top:
                          r.top +
                          (window.pageYOffset || o.scrollTop) -
                          (o.clientTop || 0),
                        left:
                          r.left +
                          (window.pageXOffset || o.scrollLeft) -
                          (o.clientLeft || 0),
                      };
                      N.hold(t);
                      break;
                    case "touchmove":
                    case "mousemove":
                      if (!T || !v.start) return;
                      v.move = p.getPosOfEvent(t);
                      if (p.getFingers(t) >= 2) N.pinch(t);
                      else if (f) N.rotateSingleFinger(t);
                      else N.swipe(t);
                      break;
                    case "touchend":
                    case "touchcancel":
                    case "mouseup":
                    case "mouseout":
                      if (!T) return;
                      a = t;
                      if (u) N.pinch(t);
                      else if (f) N.rotateSingleFinger(t);
                      else if (b) N.swipe(t);
                      else N.tap(t);
                      p.reset();
                      E = 0;
                      A = 0;
                      if (t.touches && t.touches.length === 1) {
                        T = true;
                        f = true;
                      }
                      break;
                  }
                },
                o = function e() {
                  var t,
                    n,
                    r,
                    o,
                    i = arguments;
                  if (i.length < 2 || i > 4)
                    return console.error("unexpected arguments!");
                  var a =
                    p.getType(i[0]) === "string"
                      ? document.querySelectorAll(i[0])
                      : i[0];
                  a = a.length ? Array.prototype.slice.call(a) : [a];
                  if (i.length === 3 && p.getType(i[1]) === "string") {
                    t = i[1].split(" ");
                    n = i[2];
                    t.forEach(function (t) {
                      if (!p.hasTouch) t = p.getPCevts(t);
                      a.forEach(function (e) {
                        g.bind(e, t, n);
                      });
                    });
                    return;
                  }
                  function s(t) {
                    if (!p.hasTouch) t = p.getPCevts(t);
                    a.forEach(function (e) {
                      g.delegate(e, t, o, r[t]);
                    });
                  }
                  if (i.length === 3 && p.getType(i[1]) === "object") {
                    r = i[1];
                    o = i[2];
                    for (var l in r) s(l);
                    return;
                  }
                  function c(t) {
                    if (!p.hasTouch) t = p.getPCevts(t);
                    a.forEach(function (e) {
                      g.bind(e, t, r[t]);
                    });
                  }
                  if (i.length === 2 && p.getType(i[1]) === "object") {
                    r = i[1];
                    for (var u in r) c(u);
                    return;
                  }
                  if (i.length === 4 && p.getType(i[2]) === "object") {
                    t = i[1].split(" ");
                    n = i[3];
                    t.forEach(function (t) {
                      if (!p.hasTouch) t = p.getPCevts(t);
                      a.forEach(function (e) {
                        g.bind(e, t, n);
                      });
                    });
                    return;
                  }
                  if (i.length === 4) {
                    var d = a[0];
                    t = i[1].split(" ");
                    o = i[2];
                    n = i[3];
                    t.forEach(function (e) {
                      if (!p.hasTouch) e = p.getPCevts(e);
                      g.delegate(d, e, o, n);
                    });
                    return;
                  }
                },
                L = function e() {
                  var n, r;
                  var o = arguments;
                  if (o.length < 1 || o.length > 4)
                    return console.error("unexpected arguments!");
                  var t =
                    p.getType(o[0]) === "string"
                      ? document.querySelectorAll(o[0])
                      : o[0];
                  t = t.length ? Array.prototype.slice.call(t) : [t];
                  if (o.length === 1 || o.length === 2) {
                    t.forEach(function (t) {
                      n = o[1] ? o[1].split(" ") : Object.keys(t.listeners);
                      if (n.length)
                        n.forEach(function (e) {
                          if (!p.hasTouch) e = p.getPCevts(e);
                          g.unbind(t, e);
                          g.undelegate(t, e);
                        });
                    });
                    return;
                  }
                  if (o.length === 3 && p.getType(o[2]) === "function") {
                    r = o[2];
                    t.forEach(function (t) {
                      n = o[1].split(" ");
                      n.forEach(function (e) {
                        if (!p.hasTouch) e = p.getPCevts(e);
                        g.unbind(t, e, r);
                      });
                    });
                    return;
                  }
                  if (o.length === 3 && p.getType(o[2]) === "string") {
                    var i = o[2];
                    t.forEach(function (t) {
                      n = o[1].split(" ");
                      n.forEach(function (e) {
                        if (!p.hasTouch) e = p.getPCevts(e);
                        g.undelegate(t, e, i);
                      });
                    });
                    return;
                  }
                  if (o.length === 4) {
                    r = o[3];
                    t.forEach(function (t) {
                      n = o[1].split(" ");
                      n.forEach(function (e) {
                        if (!p.hasTouch) e = p.getPCevts(e);
                        g.undelegate(t, e, i, r);
                      });
                    });
                    return;
                  }
                },
                R = function e(t, n, r) {
                  var o = arguments;
                  if (!p.hasTouch) n = p.getPCevts(n);
                  var i =
                    p.getType(o[0]) === "string"
                      ? document.querySelectorAll(o[0])
                      : o[0];
                  i = i.length ? Array.prototype.call(i) : [i];
                  i.forEach(function (e) {
                    g.trigger(e, n, r);
                  });
                };
              function O() {
                if (!p.hasTouch) return;
                var e = "mouseup mousedown mousemove mouseout",
                  t = "touchstart touchmove touchend touchcancel";
                var n = p.hasTouch ? t : e;
                n.split(" ").forEach(function (e) {
                  document.addEventListener(e, r, false);
                });
              }
              O();
              var D = {};
              return (
                (D.on = D.bind = D.live = o),
                (D.off = D.unbind = D.die = L),
                (D.config = h),
                (D.trigger = R),
                D
              );
            })
              ? r.call(t, n, t, e)
              : r) || (e.exports = r);
      },
      365: function (e, t, n) {
        var r = n(5014),
          o = n(8962);
        function i(e) {
          o.readsrc ||
            (window.doubletap && !window.ariaHold) ||
            (e.preventDefault(), e.stopPropagation());
        }
        e.exports = {
          start: function () {
            r.on(document, "touchend", "*", i);
          },
          end: function () {
            r.off(document, "touchend", "*", i);
          },
        };
      },
      9722: function (e, t, n) {
        var r = n(5014);
        function o(e) {
          (window.doubletap = !1),
            (window.canRead = !0),
            (window.startSwipe = !0),
            (window.ariaHold = !1);
        }
        e.exports = {
          start: function () {
            r.on(document, "touchstart", "*", o);
          },
          end: function () {
            r.off(document, "touchstart", "*", o);
          },
        };
      },
      1771: function (e, t, n) {
        var r = n(9228),
          o = n(954);
        e.exports = {
          getRole: function (e) {
            if (0 !== e.nodeList.length) {
              var t = e,
                e = (t = 3 == t.firstNode.nodeType ? t.parent() : t).attr(
                  "role"
                );
              if (
                (t.hasClass("alert") && (e = "alert"),
                t.hasClass("nav") && (e = "navigation"),
                t.hasClass("alertdialog") && (e = "alertdialog"),
                t.hasClass("log") && (e = "log"),
                t.hasClass("menu") && (e = "menu"),
                t.hasClass("menubar") && (e = "menubar"),
                t.hasClass("menuitem") && (e = "menuitem"),
                t.hasClass("row") && (e = "row"),
                t.hasClass("separator") && (e = "separator"),
                t.hasClass("slider") && (e = "slider"),
                t.hasClass("spinbutton") && (e = "spinbutton"),
                t.hasClass("tab") && (e = "tab"),
                t.hasClass("tablist") && (e = "tablist"),
                t.hasClass("tabpanel") && (e = "tabpanel"),
                t.hasClass("timer") && (e = "timer"),
                t.hasClass("toolbar") && (e = "toolbar"),
                t.hasClass("tooltip") && (e = "tooltip"),
                t.hasClass("tree") && (e = "tree"),
                t.hasClass("treeitem") && (e = "treeitem"),
                !(e = t.hasClass("button") ? "button" : e) || 0 === e.length)
              )
                try {
                  e = t.firstNode.type || t.firstNode.nodeName.toLowerCase();
                } catch (e) {}
              return (e =
                e && -1 < [].indexOf.call(r.HtmlElemRoles.heading, e)
                  ? "heading"
                  : e);
            }
          },
          getRoleText: function (e) {
            var t = e.aria.role,
              n = e.aria.nodeName;
            return e.aria.role
              ? (n && "textbox" === t && (t = n),
                o.settings.getText(e.aria.role))
              : "";
          },
        };
      },
      2491: function (e, t, n) {
        var o,
          i = n(9228),
          a = n(8962);
        function s(e) {
          return (
            e.labelledbyText ||
            e.label ||
            e.describedbyText ||
            e.labelWrapperText ||
            e.labelforText ||
            e.toolTipText ||
            e.placeholder ||
            e.title ||
            e.alt ||
            ""
          );
        }
        function l(e) {
          o = o || a.Language;
          var t = "";
          return e.atomicText
            ? (t += "," + e.atomicText)
            : e.label || e.title || e.alt || e.toolTipText
            ? ""
            : (e.valueText
                ? (t += "," + e.valueText)
                : e.value
                ? (t += "," + o.curvalue + e.value)
                : e.text && (t += "," + e.text),
              e.valueminText && (t += "," + o.min + e.valueminText),
              e.valuemaxText && (t += "," + o.max + e.valuemaxText),
              t);
        }
        function c(e, t) {
          var n = "";
          return (
            (o = o || a.Language),
            (n = void 0 !== t ? (t ? "," + o[e] : "," + o["un" + e]) : n)
          );
        }
        function u(e, t) {
          var n = "";
          return (n = t ? "," + o[e] : n);
        }
        e.exports = {
          lastDesc: function (e) {
            var t = "",
              n = e.aria;
            if (((o = o || a.Language), !n || n.busy)) return null;
            (t += u("readonly", n.readonly)),
              (t += u("multiselectable", n.multiselectable)),
              (t += u("multiLine", n.multiLine)),
              n.multiple && (t += o.multiple),
              n.isregion && (t += o["regiontype" + e.ariaAttr("regiontype")]),
              n.roleText && (t += n.roleText);
            var r = s(n);
            return (
              "" != r ||
                !n.isregion ||
                (0 <
                  (e = e.find("h1,h2,h3,h4,h5,h6,title,.title,title")).length &&
                  (r = e.aria.text)),
              (t += "," + r),
              n.isregion ||
                ((t += "," + l(n)),
                (t +=
                  "," +
                  (function (e) {
                    o = o || a.Language;
                    var t = "";
                    (t += u("disabled", e.disabled)),
                      (t += c("checked", e.checked)),
                      (t += c("expanded", e.expanded)),
                      0 < (t += c("selected", e.selected)).length &&
                        (t = o.curstatus + t);
                    return t;
                  })(n))),
              n.described && (t += "," + n.described),
              (t += u("haspopup", n.haspopup)),
              (t = i.formatStrToRead(t, !0))
            );
          },
          descText: s,
          mainText: l,
        };
      },
      998: function (e, t, n) {
        var i = n(8057),
          r = n(9228);
        e.exports = {
          getText: function (e, t) {
            return null !== t && -1 < [].indexOf.call(r.HtmlElemRoles.select, t)
              ? (function (e) {
                  var t = [];
                  if ("SELECT" === e.nodeName) {
                    for (var n = 0; n < e.length; n++)
                      e.options[n].selected && t.push(e[n].text);
                    return 0 === t.length ? void 0 : 1 === t.length ? t[0] : t;
                  }
                  var r = new i(e);
                  if (
                    "select" !== r.aria.nodeName &&
                    "select" === r.aria.role
                  ) {
                    var o = e.getAttribute("aria-controls");
                    if (o) {
                      r = o.substring(0, 1);
                      return (
                        [].indexOf.call(["#", "."], r) < 0 && (o = "#" + o),
                        (t = document.querySelector(o)
                          ? document.querySelector(o).textContent
                          : t)
                      );
                    }
                  }
                })(e)
              : e.textContent || e.value;
          },
        };
      },
      4152: function (e) {
        function r(e, o) {
          return (function e(t) {
            for (var n = 0; n < t.length; n++) {
              var r = t.nodeList[n];
              if ((r = new o(r)).aria.focusable && !r.aria.hidden) return r;
              if (0 < (r = new o(r.child())).length) return e(r);
            }
          })((e = "BODY" == e.firstNode.nodeName ? new o(e.child()) : e));
        }
        function o(e, o) {
          return (function e(t) {
            for (var n = t.length - 1; 0 <= n; n--) {
              var r = t.nodeList[n];
              if ((r = new o(r)).aria.focusable && !r.aria.hidden) return r;
              if (0 < (r = new o(r.child())).length) return e(r);
            }
          })((e = "BODY" == e.firstNode.nodeName ? new o(e.child()) : e));
        }
        e.exports = {
          nextFocus1: function e(t, n) {
            if ("BODY" == (t = t.jTool ? t : new n(t)).firstNode.nodeName)
              return r(t, n);
            (t = new n(t.firstNode).nextNode()), (t = new n(t));
            return t && t.aria && t.aria.focusable && !t.aria.hidden
              ? t
              : e(t, n);
          },
          preFocus1: function e(t, n) {
            if ("BODY" == (t = t.jTool ? t : new n(t)).firstNode.nodeName)
              return o(t, n);
            (t = new n(t.firstNode).preNode()), (t = new n(t));
            return t && t.aria && t.aria.focusable && !t.aria.hidden
              ? t
              : e(t, n);
          },
          firstFocus1: r,
          lastFocus1: o,
        };
      },
      7156: function (e, t, n) {
        var r,
          o = n(9228),
          i = n(954);
        e.exports = function (e) {
          var t = "";
          return (
            (r = r || i.settings.Language),
            -1 < [].indexOf.call(o.HtmlElemRoles.select, e.aria.role)
              ? void 0 !== (t = o.reMoveHtml(e.text())) && 0 < t.length
                ? r.selectedelem + t
                : r.unselectedelem
              : ((t = e.attr("aria-valuetext") || e.html()), o.reMoveHtml(t))
          );
        };
      },
      9489: function (e, t, n) {
        var c = n(9228),
          u = n(3655);
        e.exports = {
          visibility: function () {
            c.each(this.nodeList, function (e, t) {
              t.style.visibility = "visible";
            });
          },
          unvisibility: function () {
            c.each(this.nodeList, function (e, t) {
              t.style.visibility = "hidden";
            });
          },
          show: function () {
            return (
              c.each(this.nodeList, function (e, t) {
                var n = "";
                if (-1 !== t.nodeName.indexOf(["SPAN", "A", "FONT", "I"]))
                  return (
                    t.style.visibility && (t.style.visibility = "visible"),
                    (t.style.display = "inline-block"),
                    this
                  );
                switch (t.nodeName) {
                  case "TABLE":
                    n = "table";
                    break;
                  case "THEAD":
                    n = "table-header-group";
                    break;
                  case "TBODY":
                    n = "table-row-group";
                    break;
                  case "TR":
                    n = "table-row";
                    break;
                  case "TH":
                  case "TD":
                    n = "table-cell";
                    break;
                  default:
                    n = "block";
                }
                t.style.visibility && (t.style.visibility = "visible"),
                  (t.style.display = n);
              }),
              this
            );
          },
          hide: function () {
            return (
              c.each(this.nodeList, function (e, t) {
                t.style.visibility && (t.style.visibility = "hidden"),
                  (t.style.display = "none");
              }),
              this
            );
          },
          animate: function (e, t, n) {
            var r,
              o,
              i = this,
              a = "",
              s = "",
              l = i.nodeList[0];
            e &&
              ("undefined" === c.type(n) &&
                "function" === c.type(t) &&
                ((n = t), (t = 0)),
              "undefined" === c.type(n) && (n = c.noop),
              "undefined" === c.type(t) && (t = 0),
              c.each(e, function (e, t) {
                (a += e + ":" + c.getStyle(l, e) + ";"),
                  (s += e + ":" + t + ";");
              }),
              (r = "@keyframes jToolAnimate {from {" + a + "}to {" + s + "}}"),
              ((o = document.createElement("style")).className =
                "jTool-animate-style"),
              (o.type = "text/css"),
              document.head.appendChild(o),
              (o.textContent = o.textContent + r),
              (l.style.animation =
                "jToolAnimate " + t / 1e3 + "s ease-in-out forwards"),
              window.setTimeout(function () {
                u.css.call(i, e),
                  (l.style.animation = ""),
                  document.head.removeChild(o),
                  n();
              }, t));
          },
        };
      },
      6981: function (e, t, n) {
        var o = n(9228);
        e.exports = {
          addClass: function (e) {
            return this.changeClass(e, "add");
          },
          removeClass: function (e) {
            return this.changeClass(e, "remove");
          },
          toggleClass: function (e) {
            return this.changeClass(e, "toggle");
          },
          hasClass: function (e) {
            var t = this.firstNode;
            return !(!t || 1 != t.nodeType) && t.classList.contains(e);
          },
          parseClassName: function (e) {
            return e.indexOf(" ") ? e.split(" ") : [e];
          },
          changeClass: function (e, r) {
            var t = this.parseClassName(e);
            return (
              o.each(this.nodeList, function (e, n) {
                1 == n.nodeType &&
                  o.each(t, function (e, t) {
                    n.classList[r](t);
                  });
              }),
              this
            );
          },
        };
      },
      3334: function (e) {
        function t() {}
        function o() {
          var e = document.domain.split("."),
            t = e.length,
            n = e[t - 2] + "." + e[t - 1];
          return (
            "." +
            (n =
              2 < n.length &&
              -1 < [].indexOf.call(["com", "gov", "org", "net"], e[t - 2])
                ? e[t - 3] + "." + n
                : n)
          );
        }
        (t.prototype.devareCookie = function (e) {
          var t = new Date();
          t.setTime(t.getTime() - 1e4),
            (document.cookie =
              e + "=v; expires=" + t.toGMTString() + ";path=/;domain=" + o());
        }),
          (t.prototype.setCookie = function (e, t) {
            this.devareCookie(e);
            var n,
              r = new Date();
            r.setTime(r.getTime() + 864e6),
              (n = document.domain),
              /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
                n
              )
                ? (document.cookie =
                    e + "=" + t + "; expires=" + r.toGMTString() + ";path=/;")
                : (document.cookie =
                    e +
                    "=" +
                    t +
                    "; expires=" +
                    r.toGMTString() +
                    ";path=/;domain=" +
                    o());
          }),
          (t.prototype.getCookie = function (e) {
            for (
              var t = document.cookie.split("; "), n = 0;
              n < t.length;
              n++
            ) {
              var r = t[n].split("=");
              if (r[0] == e) return r[1];
            }
          }),
          (t.prototype.getCookies = function (e) {
            for (var t = document.cookie.split("; "), n = 0; n < t.length; n++)
              if (t[n].split("=")[0] == e)
                return t[n].substring(t[n].indexOf("=") + 1);
          }),
          (t.prototype.getAllCookie = function () {
            var e = document.cookie.split("; ");
            return 0 < arrcookie.length ? e : "";
          });
        var n = new t();
        e.exports = n;
      },
      3655: function (e, t, n) {
        var s = n(9228);
        e.exports = {
          css: function (e, t) {
            var o = this;
            if (0 != o.length) {
              var i = [
                "width",
                "height",
                "min-width",
                "max-width",
                "min-height",
                "min-height",
                "top",
                "left",
                "right",
                "bottom",
                "padding-top",
                "padding-right",
                "padding-bottom",
                "padding-left",
                "font-size",
                "margin-top",
                "margin-right",
                "margin-bottom",
                "margin-left",
                "border-width",
                "border-top-width",
                "border-left-width",
                "border-right-width",
                "border-bottom-width",
              ];
              if ("string" === s.type(e) && !t && 0 !== t)
                return -1 !== i.indexOf(e)
                  ? parseInt(s.getStyle(this.firstNode, e), 10)
                  : s.getStyle(this.firstNode, e);
              if ("object" === s.type(e)) {
                var n,
                  r = e;
                for (n in r) a(n, r[n]);
              } else a(e, t);
              return this;
            }
            function a(n, r) {
              (n = n.replace(/[A-Z]/g, function (e) {
                return "-" + e.toLowerCase();
              })),
                "number" === s.type(r) && (r = r.toString() + "px"),
                -1 !== i.indexOf(n) && -1 === r.indexOf("px") && (r += "px"),
                s.each(o.nodeList, function (e, t) {
                  t.style[n] = r;
                });
            }
          },
          width: function (e) {
            return this.css("width", e);
          },
          height: function (e) {
            return this.css("height", e);
          },
        };
      },
      5924: function (e, t, n) {
        var o = n(9228);
        e.exports = {
          data: function (e, t) {
            return (
              "data-" !== (e = e.toLowerCase()).substr(0, 5) &&
                (e = "data-" + e),
              this.attr(e, t)
            );
          },
          removeData: function (e) {
            "data-" !== (e = e.toLowerCase()).substr(0, 5) && (e = "data-" + e),
              this.removeAttr(e);
          },
          ariaAttr: function (e, t) {
            return (
              "aria-" !== (e = e.toLowerCase()).substr(0, 5) &&
                (e = "aria-" + e),
              this.attr(e, t)
            );
          },
          removeAriaAttr: function (e) {
            "aria-" !== (e = e.toLowerCase()).substr(0, 5) && (e = "aria-" + e),
              this.removeAttr(e);
          },
          attr: function (n, r) {
            if (0 !== this.nodeList.length)
              return void 0 === n && void 0 === r
                ? null
                : void 0 !== r
                ? (o.each(this.nodeList, function (e, t) {
                    1 == t.nodeType && t.setAttribute(n, r);
                  }),
                  this)
                : 1 == this.firstNode.nodeType
                ? this.transformValue(this.firstNode.getAttribute(n))
                : void 0;
          },
          removeAttr: function (n) {
            void 0 !== n &&
              o.each(this.nodeList, function (e, t) {
                t.removeAttribute(n);
              });
          },
          prop: function (n, r) {
            if (0 !== this.nodeList.length)
              return void 0 === n && void 0 === r
                ? null
                : void 0 !== r
                ? (o.each(this.nodeList, function (e, t) {
                    t[n] = r;
                  }),
                  this)
                : this.transformValue(this.firstNode[n]);
          },
          removeProp: function (n) {
            void 0 !== n &&
              o.each(this.nodeList, function (e, t) {
                delete t[n];
              });
          },
          val: function (e) {
            return this.prop("value", e) || null;
          },
          transformValue: function (e) {
            return (e = "null" === o.type(e) ? void 0 : e);
          },
        };
      },
      3284: function (e, t, n) {
        var s = n(9228),
          l = n(8057),
          c = n(998);
        function u(e) {
          var t = e.nodeType;
          if (1 == t && "checkbox" == e.type && "on" == e.value) return "";
          var n = "";
          switch (t) {
            case 1:
              if (e.getAttribute("aria-label"))
                return e.getAttribute("aria-label");
              e.getAttribute("aria-described") &&
                (n += e.getAttribute("aria-described")),
                (n = e.innerHTML || e.value);
              break;
            case 3:
              n = e.nodeValue.trim();
          }
          return n;
        }
        e.exports = {
          append: function (e) {
            return this.html(e, "append");
          },
          prepend: function (e) {
            return this.html(e, "prepend");
          },
          before: function (e) {
            e.jTool && (e = e.nodeList[0]);
            var t = this.firstNode;
            return t.parentNode.insertBefore(e, t), this;
          },
          after: function (e) {
            var n;
            (e = "string" == typeof e ? new l(e) : e).jTool &&
              ((n = this.firstNode.parentNode),
              s.each(e.nodeList, function (e, t) {
                n.appendChild(t);
              }));
          },
          text: function (n) {
            if (0 !== this.nodeList.length)
              return void 0 !== n
                ? (s.each(this.nodeList, function (e, t) {
                    t.textContent = n;
                  }),
                  this)
                : c.getText(
                    this.firstNode,
                    this.aria ? this.aria.role : this.nodeName.toLowerCase()
                  );
          },
          html: function (t, r) {
            if (0 !== this.nodeList.length) {
              if (this.firstNode && void 0 === t && void 0 === r)
                try {
                  return this.firstNode.innerHTML;
                } catch (e) {
                  return;
                }
              var o,
                e = s.type(t);
              return (
                t.jTool
                  ? (t = t.nodeList)
                  : "string" === e
                  ? (t = s.createDOM(t || ""))
                  : "number" === e
                  ? (t = s.createDOM(t.toString() || ""))
                  : "element" === e && (t = [t]),
                s.each(this.nodeList, function (e, n) {
                  r
                    ? "prepend" === r && (o = n.firstChild)
                    : (n.innerHTML = ""),
                    s.each(t, function (e, t) {
                      (t = t.cloneNode(!0)).nodeType ||
                        (t = document.createTextNode(t)),
                        o ? n.insertBefore(t, o) : n.appendChild(t);
                    });
                }),
                this
              );
            }
          },
          wrap: function (r, o) {
            var i;
            return (
              s.each(this.nodeList, function (e, t) {
                i = t.parentNode;
                var n = new l(r, t.ownerDocument).get(0);
                i.insertBefore(n, t),
                  (o
                    ? n.querySelector(o)
                    : n.querySelector(":empty")
                  ).appendChild(t);
              }),
              this
            );
          },
          closest: function (e) {
            if (0 !== this.nodeList.length) {
              var t = this.firstNode.parentNode;
              if (void 0 === e) return new l(t);
              var n = (
                this.firstNode.ownerDocument || document
              ).querySelectorAll(e);
              return (
                (function e() {
                  t && 0 !== n.length && 1 === t.nodeType
                    ? -1 === [].indexOf.call(n, t) && ((t = t.parentNode), e())
                    : (t = null);
                })(),
                new l(t)
              );
            }
          },
          parent: function () {
            return this.closest();
          },
          clone: function (e) {
            return new l(this.firstNode.cloneNode(e || !1));
          },
          remove: function () {
            s.each(this.nodeList, function (e, t) {
              t.parentNode.removeChild(t);
            });
          },
          textAll: function (e) {
            if (0 !== this.nodeList.length) {
              var t = "",
                t = (function i(e) {
                  var e = (e = e.jTool ? e : new l(e)).childNodes(),
                    a = "";
                  return (
                    s.each(e, function (e, t) {
                      var n,
                        r,
                        o = new l(t).childNodes();
                      1 == t.nodeType
                        ? t.getAttribute("aria-label")
                          ? (a += t.getAttribute("aria-label"))
                          : ((n =
                              t.getAttribute("aria-described") ||
                              t.getAttribute("title") ||
                              t.getAttribute("alt")) && (a += n),
                            (n = (n =
                              t.getAttribute("role") ||
                              t.nodeName).toLowerCase()),
                            -1 < [].indexOf.call(s.HtmlElemRoles.select, n)
                              ? (a += "," + c.getText(t, n))
                              : -1 <
                                [].indexOf.call(
                                  ["input", "textbox", "textarea"],
                                  n
                                )
                              ? (a += "," + new l(t).val())
                              : 0 < o.length
                              ? (a += "," + i(t))
                              : (r = u(t)) && (a += "," + r))
                        : (r = u(t)) && (a += "," + r);
                    }),
                    a
                  );
                })(this);
              return (t = e ? s.formatStrToRead(t, e) : t);
            }
          },
        };
      },
      3873: function (e, t, n) {
        var a = n(8057),
          s = n(9228);
        e.exports = {
          focus: function () {
            this.jTool &&
              this.firstNode &&
              1 == this.firstNode.nodeType &&
              this.firstNode.focus();
          },
          blur: function () {
            this.jTool &&
              this.firstNode &&
              1 == this.firstNode.nodeType &&
              this.firstNode.blur();
          },
          next: function () {
            if (0 != this.length) {
              var e,
                t = this.firstNode;
              return null != (e = t.nextSibling)
                ? !(
                    -1 <
                    [].indexOf.call(["HEAD", "STYLE", "SCRIPT"], e.nodeName)
                  ) &&
                  (1 == e.nodeType ||
                    (3 == e.nodeType && /\S/.test(e.nodeValue)))
                  ? e
                  : new a(e).next()
                : null == t.parentNode &&
                  t.defaultView &&
                  t.defaultView.frameElement
                ? new a(t.defaultView.frameElement).next()
                : null != t.parentNode
                ? new a(t.parentNode).next()
                : void 0;
            }
          },
          pre: function () {
            if (0 != this.length) {
              var e,
                t = this.firstNode;
              return null != (e = t.previousElementSibling)
                ? -1 < [].indexOf.call(["HEAD", "STYLE", "SCRIPT"], e.nodeName)
                  ? new a(e).pre()
                  : 1 === e.nodeType
                  ? e
                  : void 0
                : null == t.parentNode &&
                  t.defaultView &&
                  t.defaultView.frameElement
                ? new a(t.defaultView.frameElement).pre()
                : null != t.parentNode
                ? new a(t.parentNode).pre()
                : void 0;
            }
          },
          nextAll: function () {
            if (0 != this.length) {
              for (var e = this.firstNode, t = next(e), n = []; null != t; )
                n.push(t), (t = next(t));
              return n;
            }
          },
          preAll: function () {
            if (0 != this.length) {
              for (var e = this.firstNode, t = pre(e), n = []; null != t; )
                n.push(t), (t = pre(t));
              return n;
            }
          },
          get: function (e) {
            return this.nodeList[e];
          },
          is: function (e) {
            if (e && 0 !== this.length)
              return (
                0 === e.indexOf(":") && (e = e.subStr(1, e.length)),
                this.firstNode[e]
              );
          },
          eq: function (e) {
            return new a(this.nodeList[e]);
          },
          first: function () {
            return this.firstNode;
          },
          last: function () {
            return this.nodeList[this.nodeList.length - 1];
          },
          childNodes: function () {
            var e = this.firstNode.childNodes,
              r = [];
            return (
              s.each(e, function (e, t) {
                switch (t.nodeType) {
                  case 1:
                    r.push(t);
                    break;
                  case 3:
                    var n = t.nodeValue;
                    /\S/.test(n) && r.push(t);
                }
              }),
              r
            );
          },
          child: function () {
            var e = this.firstNode.childNodes,
              n = [];
            return (
              s.each(e, function (e, t) {
                1 === t.nodeType && n.push(t);
              }),
              n
            );
          },
          find: function (r) {
            if (r instanceof HTMLElement) {
              var o,
                e = r.getAttribute("id");
              return e
                ? new a(e, this)
                : ((function n(e) {
                    s.each(e, function (e, t) {
                      t == r
                        ? (o = new a(r))
                        : o || ((t = new a(t).child()), n(t));
                    });
                  })(this),
                  (o = o || new a()));
            }
            return new a(r, this);
          },
          isHidden: function () {
            return (function e(t) {
              var n = new a(t);
              try {
                if (1 == t.nodeType || 9 == t.nodeType) {
                  if ("BODY" == t.nodeName) return !1;
                  if (
                    "none" === n.css("display") ||
                    "hidden" === n.css("visibility") ||
                    "hidden" === n.attr("type")
                  )
                    return !0;
                }
              } catch (e) {
                return !0;
              }
              return e(n.parent().firstNode);
            })(this.firstNode);
          },
          index: function (e) {
            var t = this.firstNode;
            return (
              e
                ? e.jTool && (e = e.nodeList)
                : (e = this.parent().child().nodeList),
              e ? [].indexOf.call(e, t) : -1
            );
          },
          tofirstChild: function () {
            var e = this.firstNode;
            if ("IFRAME" == this.firstNode.nodeName)
              try {
                var t = e.contentDocument;
                if (null == t || !t.body) return null;
                e = t.body.firstElementChild;
              } catch (e) {
                return null;
              }
            else
              var n = this.child(),
                e = 0 < n.length ? n[0] : this.firstNode;
            if (-1 < [].indexOf.call(["A"], e.nodeName)) return e;
            n = new a(e).find("*");
            return 0 == n.length ? e : new a(n[0]).tofirstChild();
          },
          nextNode: function () {
            var t = this.next();
            if ((t = t || this.parent().next())) {
              if (-1 < [].indexOf.call(["A"], t.nodeName)) return t;
              if ("IFRAME" == t.nodeName)
                try {
                  var e = t.contentDocument;
                  if (null == e || !e.body) return new a(t).nextNode();
                  t = e.body.firstChild;
                } catch (e) {
                  return new a(t).nextNode();
                }
              return (
                (function e(t) {
                  if (-1 < [].indexOf.call(["A"], t.nodeName)) return t;
                  var n = new a(t).find("*");
                  return 0 == n.length ? t : e(n[0]);
                })(t) || new a(t).nextNode()
              );
            }
          },
          preNode: function () {
            var e = this.pre();
            if ((e = e || this.parent().pre())) {
              "IFRAME" == e.nodeName && (e = e.contentDocument);
              var t = new a(e).child();
              return 0 == t
                ? e
                : (function e(t) {
                    for (i = t.length - 1; 0 <= i; i--) {
                      var n = new a(t[i]).child();
                      return 0 == n.length ? t[i] : e(n);
                    }
                  })(t);
            }
          },
        };
      },
      5538: function (e, t, n) {
        var l = n(9228);
        e.exports = {
          dblclick: function (e, t, n) {
            return this.on("dblclick", e, t, n);
          },
          click: function (e, t, n) {
            return e ? this.on("click", e, t, n) : this.trigger("click");
          },
          mousemove: function (e, t, n) {
            return this.on("mousemove", e, t, n);
          },
          mousedown: function (e, t, n) {
            return this.on("mousedown", e, t, n);
          },
          touchstart: function (e, t, n) {
            return this.on("touchstart", e, t, n);
          },
          touchend: function (e, t, n) {
            return this.on("touchend", e, t, n);
          },
          touchmove: function (e, t, n) {
            return this.on("touchmove", e, t, n);
          },
          change: function (e, t, n) {
            return this.on("change", e, t, n);
          },
          on: function (e, t, n, r) {
            return this.addEvent(this.getEventObject(e, t, n, r));
          },
          off: function (e, t) {
            return this.removeEvent(this.getEventObject(e, t));
          },
          bind: function (e, t, n) {
            return this.on(e, void 0, t, n);
          },
          unbind: function (e) {
            return this.removeEvent(this.getEventObject(e));
          },
          trigger: function (r) {
            return (
              l.each(this.nodeList, function (e, t) {
                try {
                  var n;
                  t.qToolEvent && t.qToolEvent[r] && 0 < t.qToolEvent[r].length
                    ? ((n = new Event(r)), t.dispatchEvent(n))
                    : "click" !== r || ("click" === r && t[r]());
                } catch (e) {}
              }),
              this
            );
          },
          getEventObject: function (e, n, r, o) {
            if (
              ("function" == typeof n && ((o = r || !1), (r = n), (n = void 0)),
              !e)
            )
              return this;
            var i;
            "" !== (n = !n || "element" !== l.type(this.firstNode) ? "" : n) &&
              ((i = r),
              (r = function (e) {
                for (var t = e.target; t && t !== this; ) {
                  if (-1 !== [].indexOf.call(this.querySelectorAll(n), t)) {
                    i.apply(t, arguments);
                    break;
                  }
                  t = t.parentNode;
                }
              }));
            var a,
              e = e.split(" "),
              s = [];
            return (
              l.each(e, function (e, t) {
                return (
                  "" === t.trim() ||
                  ((a = t.split(".")),
                  (a = {
                    eventName: t + n,
                    type: a[0],
                    querySelector: n,
                    callback: r || l.noop,
                    useCapture: o || !1,
                    nameScope: a[1] || void 0,
                  }),
                  void s.push(a))
                );
              }),
              s
            );
          },
          addEvent: function (e) {
            var t = this;
            return (
              l.each(e, function (e, n) {
                l.each(t.nodeList, function (e, t) {
                  (t.qToolEvent = t.qToolEvent || {}),
                    (t.qToolEvent[n.eventName] =
                      t.qToolEvent[n.eventName] || []),
                    t.qToolEvent[n.eventName].push(n),
                    l.addEventListener(t, n.type, n.callback, n.useCapture);
                });
              }),
              t
            );
          },
          removeEvent: function (e) {
            var r,
              n = this;
            return (
              l.each(e, function (e, t) {
                l.each(n.nodeList, function (e, n) {
                  n.qToolEvent &&
                    (r = n.qToolEvent[t.eventName]) &&
                    (l.each(r, function (e, t) {
                      n.removeEventListener(t.type, t.callback);
                    }),
                    delete n.qToolEvent[t.eventName]);
                });
              }),
              n
            );
          },
        };
      },
      3068: function (e, t, n) {
        var r = n(9228);
        e.exports = {
          offset: function () {
            var e = { top: 0, left: 0 },
              t = this.firstNode;
            if (!t.getClientRects().length) return e;
            if ("none" === r.getStyle(t, "display")) return e;
            (e = t.getBoundingClientRect()),
              (t = t.ownerDocument.documentElement);
            return {
              top: e.top + window.pageYOffset - t.clientTop,
              left: e.left + window.pageXOffset - t.clientLeft,
            };
          },
          scrollTop: function (e) {
            return this.scrollFN(e, "top");
          },
          scrollLeft: function (e) {
            return this.scrollFN(e, "left");
          },
          scrollFN: function (e, t) {
            var n = this.firstNode;
            return e || 0 === e
              ? (this.setScrollFN(n, t, e), this)
              : this.getScrollFN(n, t);
          },
          getScrollFN: function (e, t) {
            return r.isWindow(e)
              ? "top" === t
                ? e.pageYOffset
                : e.pageXOffset
              : 9 === e.nodeType
              ? "top" === t
                ? e.body.scrollTop
                : e.body.scrollLeft
              : 1 === e.nodeType
              ? "top" === t
                ? e.scrollTop
                : e.scrollLeft
              : void 0;
          },
          setScrollFN: function (e, t, n) {
            return r.isWindow(e)
              ? "top" === t
                ? (e.document.body.scrollTop = n)
                : (e.document.body.scrollLeft = n)
              : 9 === e.nodeType
              ? "top" === t
                ? (e.body.scrollTop = n)
                : (e.body.scrollLeft = n)
              : 1 === e.nodeType
              ? "top" === t
                ? (e.scrollTop = n)
                : (e.scrollLeft = n)
              : void 0;
          },
        };
      },
      8057: function (e, t, n) {
        var o = n(8690),
          i = n(9228),
          a = n(2392),
          s = n(4462);
        e.exports = function e(n, t) {
          var r;
          if (n)
            if (i.isWindow(n)) (r = [n]), (t = void 0);
            else if (n instanceof HTMLElement) (r = [n]), (t = void 0);
            else if (n instanceof NodeList || n instanceof Array)
              (r = n), (t = void 0);
            else if (n.jTool) (r = n.nodeList), (t = void 0);
            else if (/<.+>/.test(n)) (r = i.createDOM(n)), (t = void 0);
            else {
              if (t)
                "string" == typeof t
                  ? (t = s(t, document))
                  : t instanceof HTMLElement
                  ? (t = [t])
                  : t instanceof NodeList ||
                    (t.jTool
                      ? (t = t.nodeList)
                      : "document" == i.type(t) || (t = void 0));
              else
                try {
                  r = document.querySelectorAll(n);
                } catch (e) {
                  (r = [n]), (t = void 0);
                }
              if (t)
                if (((r = []), "document" == i.type(t)))
                  try {
                    r = s(n, t);
                  } catch (e) {
                    r = [n];
                  }
                else
                  i.each(t, function (e, t) {
                    try {
                      i.each(t.querySelectorAll(n), function (e, t) {
                        t && r.push(t);
                      });
                    } catch (e) {}
                  });
            }
          else n = null;
          return (
            (r && 0 !== r.length) || (r = []),
            (this.jTool = !0),
            (this.context = t || document),
            (this.nodeList = r),
            (this.length = this.nodeList ? this.nodeList.length : 0),
            (this.querySelector = n),
            (e.prototype.extend = a),
            e.prototype.extend(r),
            0 < this.length
              ? ((this.aria = o(this, e)), (this.firstNode = this.nodeList[0]))
              : ((this.aria = {}), (this.firstNode = null)),
            this
          );
        };
      },
      9724: function (e) {
        function o(e) {
          return (o =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        function i(e) {
          if (null === e) return "null";
          if (e != e) return "nan";
          if ("function" == typeof Array.isArray) {
            if (Array.isArray(e)) return "array";
          } else if ("[object Array]" === Object.prototype.toString.call(e))
            return "array";
          return o(e).toLowerCase();
        }
        function t() {
          this.name = "Store";
        }
        t.prototype = {
          init: function (e) {
            return (this.store = window[e]), this;
          },
          set: function (e, t) {
            if (null != (e = "object" === o(e) ? e.root : e)) {
              var n = e.split("/"),
                r = (r = this.get(n[0])) || {};
              switch (
                i(
                  (r =
                    1 < n.length
                      ? (function e(t, n, r, o) {
                          return (
                            (t = t || {})[n[o]] || (t[n[o]] = {}),
                            o >= n.length - 1
                              ? void 0 === r
                                ? delete t[n[o]]
                                : (t[n[o]] = r)
                              : e(t[n[o]], n, r, o + 1),
                            t
                          );
                        })(r, n, t, 1)
                      : r)
                )
              ) {
                case "object":
                case "array":
                  this.store.setItem(n[0], JSON.stringify(r));
                  break;
                default:
                  this.store.setItem(n[0], r);
              }
            }
          },
          get: function (e) {
            e = e.split("/");
            return (function e(t, n, r) {
              if (null === t) return null;
              try {
                t = "number" === i(+t) ? t : JSON.parse(t);
              } catch (e) {}
              return 1 === n.length
                ? t
                : ("object" === o(t) && (t = t[n[r]]),
                  (r += 1) > n.length - 1 ? t : e(t, n, r));
            })(this.store.getItem(e[0]), e, 1);
          },
          getAll: function () {
            var e,
              t = JSON.parse(JSON.stringify(this.store)),
              n = {},
              r = "";
            for (e in t) {
              try {
                r = "number" === i(+(r = t[e])) ? r : JSON.parse(r);
              } catch (e) {}
              n[e] = r;
            }
            return n;
          },
          remove: function (e) {
            this.set(e, void 0);
          },
          clear: function () {
            this.store.clear();
          },
        };
        var n = new t().init("localStorage");
        new t().init("sessionStorage");
        e.exports = n;
      },
      9438: function (e, t, n) {
        function a(e) {
          return (a =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var r = n(2392),
          u = n(9228);
        function o(s) {
          var l,
            e = {
              url: null,
              type: "GET",
              data: null,
              headers: {},
              async: !0,
              xhrFields: {},
              beforeSend: u.noop,
              complete: u.noop,
              success: u.noop,
              error: u.noop,
            };
          if ((s = r(e, s)).url) {
            s.data = s.data || {};
            try {
              l = new XMLHttpRequest();
            } catch (e) {}
            var c = new Promise(function (e, t) {
              var n,
                r,
                o = "";
              "GET" === s.type.toUpperCase() &&
                ((n = ""),
                (o =
                  "object" === u.type(s.data)
                    ? (u.each(s.data, function (e, t) {
                        void 0 !== t &&
                          ("" !== n && (n += "&"), (n += e + "=" + t));
                      }),
                      n)
                    : s.data) &&
                  (s.url = s.url + (-1 === s.url.indexOf("?") ? "?" : "&") + o),
                (o = null));
              try {
                l.open(s.type, s.url, s.async);
              } catch (e) {}
              for (r in s.xhrFields) l[r] = s.xhrFields[r];
              for (var i = 0; i < s.headers.length; i++) {
                var a = s.headers[i];
                l.setRequestHeader(a.name, a.value);
              }
              "POST" === s.type.toUpperCase() &&
                (l.setRequestHeader(
                  "Content-Type",
                  "application/json;charset=utf-8"
                ),
                (o = JSON.stringify(s.data))),
                s.beforeSend(l),
                l.responseType || (l.responseType = "json");
              try {
                l.send(o);
              } catch (e) {}
              s.async
                ? ((l.onload = function () {
                    200 === l.status
                      ? (c.done &&
                          "function" == typeof c.done &&
                          c.done(
                            l.responseJSON || l.response || l.responseText
                          ),
                        s.success && s.success(l.response, l.status),
                        e &&
                          "function" == typeof e &&
                          e(l.response || l.responseText))
                      : t && "function" == typeof t && t(l, l.status);
                  }),
                  (l.onerror = function () {
                    s.error && s.error(l, l.status),
                      t && "function" == typeof t && t(l, l.status);
                  }))
                : 200 === l.status
                ? (c.done &&
                    "function" == typeof c.done &&
                    c.done(l.responseJSON || l.response || l.responseText),
                  s.success && s.success(l.response, l.status),
                  e(l.response || l.responseText))
                : (s.error && s.error(l, l.status),
                  t && "function" == typeof t && t(l, l.status));
            });
            return c;
          }
        }
        e.exports = {
          ajax: o,
          post: function (e, t, n) {
            return o({ url: e, type: "POST", data: t, success: n });
          },
          get: function (e, t, n) {
            return o({ url: e, type: "GET", data: t, success: n });
          },
          getText: function (e, t) {
            return o({
              url: e,
              type: "GET",
              headers: { "Content-Type": "text/html;charset:utf-8" },
              xhrFields: { responseType: "text" },
              success: t,
            });
          },
          jsonp: function (e, r) {
            var o,
              i = document.createElement("script");
            return (
              "object" === a(e) && ((e = (r = e).url), delete r.url),
              (e =
                e +
                (0 < e.indexOf("?") ? "&" : "?") +
                (function (e) {
                  var t,
                    n = [];
                  for (t in e)
                    n.push(
                      encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                    );
                  return n.join("&");
                })(r.data)),
              new Promise(function (t, n) {
                (i.onerror = function (e) {
                  return r.error && r.error(e), n("出错了");
                }),
                  (o = ("jsonp_" + Math.random()).replace(".", "")),
                  (window[o] = function (e) {
                    return (
                      document.head.removeChild(i),
                      r.success && r.success(e),
                      t(e)
                    );
                  }),
                  (i.src =
                    e +
                    (0 <= e.indexOf("?") ? "&" : "?") +
                    (r.callback || "callback") +
                    "=" +
                    o),
                  document.head.append(i);
              })
            );
          },
        };
      },
      2392: function (e, t, n) {
        function r(e) {
          return (r =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }
        var i = n(9228);
        e.exports = function () {
          if (0 === arguments.length) return {};
          var o = !1,
            e = 1,
            t = arguments[0];
          for (
            1 === arguments.length && "object" === r(arguments[0])
              ? ((t = this), (e = 0))
              : 2 === arguments.length && "boolean" == typeof arguments[0]
              ? ((o = arguments[0]), (t = this), (e = 1))
              : 2 < arguments.length &&
                "boolean" == typeof arguments[0] &&
                ((o = arguments[0]), (t = arguments[1] || {}), (e = 2));
            e < arguments.length;
            e++
          )
            (function e(t, n) {
              for (var r in t)
                Object.prototype.hasOwnProperty.call(t, r) &&
                  (o && "object" === i.type(t[r])
                    ? ("object" !== i.type(n[r]) && (n[r] = {}), e(t[r], n[r]))
                    : (n[r] = t[r]));
            })(arguments[e] || {}, t);
          return t;
        };
      },
      6413: function () {
        Array.from ||
          (Array.from = function (e) {
            return Array.apply(this, e);
          }),
          "function" != typeof Object.assign &&
            (Object.assign = function (e) {
              "use strict";
              if (null == e)
                throw new TypeError(
                  "Cannot convert undefined or null to object"
                );
              e = Object(e);
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                if (null != n)
                  for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            }),
          "classList" in document.documentElement ||
            Object.defineProperty(HTMLElement.prototype, "classList", {
              get: function () {
                var o = this;
                function e(r) {
                  return function (e) {
                    var t = o.className.split(/\s+/g),
                      n = t.indexOf(e);
                    r(t, n, e), (o.className = t.join(" "));
                  };
                }
                return {
                  add: e(function (e, t, n) {
                    ~t || e.push(n);
                  }),
                  remove: e(function (e, t) {
                    ~t && e.splice(t, 1);
                  }),
                  toggle: e(function (e, t, n) {
                    ~t ? e.splice(t, 1) : e.push(n);
                  }),
                  contains: function (e) {
                    return !!~o.className.split(/\s+/g).indexOf(e);
                  },
                  item: function (e) {
                    return o.className.split(/\s+/g)[e] || null;
                  },
                };
              },
            });
      },
      1439: function (e, t, n) {
        function r(e, t) {
          return new o(e, t);
        }
        var o = n(8057),
          i = n(2392),
          a = n(9228),
          s = n(9438),
          l = n(5538),
          c = n(3655),
          u = n(6981),
          d = n(3284),
          f = n(3068),
          p = n(3873),
          g = n(9489),
          h = n(5924),
          n = n(9724);
        (o.prototype = r.prototype = {}),
          (r.extend = r.prototype.extend = i),
          r.extend(a),
          r.extend(s),
          (r.store = n),
          r.prototype.extend(l),
          r.prototype.extend(c),
          r.prototype.extend(u),
          r.prototype.extend(d),
          r.prototype.extend(f),
          r.prototype.extend(p),
          r.prototype.extend(g),
          r.prototype.extend(h),
          (e.exports = r);
      },
      4462: function (Ee, Ae, Se) {
        var ke;
        !(function (n) {
          function d(e, t) {
            return (
              (e = "0x" + e.slice(1) - 65536),
              t ||
                (e < 0
                  ? String.fromCharCode(65536 + e)
                  : String.fromCharCode((e >> 10) | 55296, (1023 & e) | 56320))
            );
          }
          function f(e, t) {
            return t
              ? "\0" === e
                ? "�"
                : e.slice(0, -1) +
                  "\\" +
                  e.charCodeAt(e.length - 1).toString(16) +
                  " "
              : "\\" + e;
          }
          function r() {
            T();
          }
          var e,
            p,
            w,
            i,
            o,
            g,
            h,
            m,
            x,
            l,
            c,
            T,
            C,
            a,
            E,
            v,
            s,
            u,
            y,
            A = "sizzle" + +new Date(),
            b = n.document,
            S = 0,
            k = 0,
            N = le(),
            L = le(),
            R = le(),
            O = le(),
            D = function (e, t) {
              return e === t && (c = !0), 0;
            },
            I = {}.hasOwnProperty,
            t = [],
            P = t.pop,
            M = t.push,
            j = t.push,
            B = t.slice,
            F = function (e, t) {
              for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t) return n;
              return -1;
            },
            _ =
              "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            H = "[\\x20\\t\\r\\n\\f]",
            K =
              "(?:\\\\[\\da-fA-F]{1,6}" +
              H +
              "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            q =
              "\\[" +
              H +
              "*(" +
              K +
              ")(?:" +
              H +
              "*([*^$|!~]?=)" +
              H +
              "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
              K +
              "))|)" +
              H +
              "*\\]",
            z =
              ":(" +
              K +
              ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
              q +
              ")*)|.*)\\)|)",
            U = new RegExp(H + "+", "g"),
            W = new RegExp(
              "^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$",
              "g"
            ),
            G = new RegExp("^" + H + "*," + H + "*"),
            Y = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
            V = new RegExp(H + "|>"),
            J = new RegExp(z),
            $ = new RegExp("^" + K + "$"),
            X = {
              ID: new RegExp("^#(" + K + ")"),
              CLASS: new RegExp("^\\.(" + K + ")"),
              TAG: new RegExp("^(" + K + "|[*])"),
              ATTR: new RegExp("^" + q),
              PSEUDO: new RegExp("^" + z),
              CHILD: new RegExp(
                "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                  H +
                  "*(even|odd|(([+-]|)(\\d*)n|)" +
                  H +
                  "*(?:([+-]|)" +
                  H +
                  "*(\\d+)|))" +
                  H +
                  "*\\)|)",
                "i"
              ),
              bool: new RegExp("^(?:" + _ + ")$", "i"),
              needsContext: new RegExp(
                "^" +
                  H +
                  "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                  H +
                  "*((?:-\\d)?\\d*)" +
                  H +
                  "*\\)|)(?=[^-]|$)",
                "i"
              ),
            },
            Z = /HTML$/i,
            Q = /^(?:input|select|textarea|button)$/i,
            ee = /^h\d$/i,
            te = /^[^{]+\{\s*\[native \w/,
            ne = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            re = /[+~]/,
            oe = new RegExp(
              "\\\\[\\da-fA-F]{1,6}" + H + "?|\\\\([^\\r\\n\\f])",
              "g"
            ),
            ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ae = ye(
              function (e) {
                return (
                  !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                );
              },
              { dir: "parentNode", next: "legend" }
            );
          try {
            j.apply((t = B.call(b.childNodes)), b.childNodes),
              t[b.childNodes.length].nodeType;
          } catch (e) {
            j = {
              apply: t.length
                ? function (e, t) {
                    M.apply(e, B.call(t));
                  }
                : function (e, t) {
                    for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                    e.length = n - 1;
                  },
            };
          }
          function se(t, e, n, r) {
            var o,
              i,
              a,
              s,
              l,
              c,
              u = e && e.ownerDocument,
              d = e ? e.nodeType : 9;
            if (
              ((n = n || []),
              "string" != typeof t || !t || (1 !== d && 9 !== d && 11 !== d))
            )
              return n;
            if (!r && (T(e), (e = e || C), E)) {
              if (11 !== d && (s = ne.exec(t)))
                if ((c = s[1])) {
                  if (9 === d) {
                    if (!(i = e.getElementById(c))) return n;
                    if (i.id === c) return n.push(i), n;
                  } else if (
                    u &&
                    (i = u.getElementById(c)) &&
                    y(e, i) &&
                    i.id === c
                  )
                    return n.push(i), n;
                } else {
                  if (s[2]) return j.apply(n, e.getElementsByTagName(t)), n;
                  if (
                    (c = s[3]) &&
                    p.getElementsByClassName &&
                    e.getElementsByClassName
                  )
                    return j.apply(n, e.getElementsByClassName(c)), n;
                }
              if (
                p.qsa &&
                !O[t + " "] &&
                (!v || !v.test(t)) &&
                (1 !== d || "object" !== e.nodeName.toLowerCase())
              ) {
                if (((c = t), (u = e), 1 === d && (V.test(t) || Y.test(t)))) {
                  for (
                    ((u = (re.test(t) && he(e.parentNode)) || e) === e &&
                      p.scope) ||
                      ((a = e.getAttribute("id"))
                        ? (a = a.replace(ie, f))
                        : e.setAttribute("id", (a = A))),
                      o = (l = g(t)).length;
                    o--;

                  )
                    l[o] = (a ? "#" + a : ":scope") + " " + ve(l[o]);
                  c = l.join(",");
                }
                try {
                  return j.apply(n, u.querySelectorAll(c)), n;
                } catch (e) {
                  O(t, !0);
                } finally {
                  a === A && e.removeAttribute("id");
                }
              }
            }
            return m(t.replace(W, "$1"), e, n, r);
          }
          function le() {
            var n = [];
            function r(e, t) {
              return (
                n.push(e + " ") > w.cacheLength && delete r[n.shift()],
                (r[e + " "] = t)
              );
            }
            return r;
          }
          function ce(e) {
            return (e[A] = !0), e;
          }
          function ue(e) {
            var t = C.createElement("fieldset");
            try {
              return !!e(t);
            } catch (e) {
              return !1;
            } finally {
              t.parentNode && t.parentNode.removeChild(t);
            }
          }
          function de(e, t) {
            for (var n = e.split("|"), r = n.length; r--; )
              w.attrHandle[n[r]] = t;
          }
          function fe(e, t) {
            var n = t && e,
              r =
                n &&
                1 === e.nodeType &&
                1 === t.nodeType &&
                e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
            return e ? 1 : -1;
          }
          function pe(t) {
            return function (e) {
              return "form" in e
                ? e.parentNode && !1 === e.disabled
                  ? "label" in e
                    ? "label" in e.parentNode
                      ? e.parentNode.disabled === t
                      : e.disabled === t
                    : e.isDisabled === t || (e.isDisabled !== !t && ae(e) === t)
                  : e.disabled === t
                : "label" in e && e.disabled === t;
            };
          }
          function ge(a) {
            return ce(function (i) {
              return (
                (i = +i),
                ce(function (e, t) {
                  for (var n, r = a([], e.length, i), o = r.length; o--; )
                    e[(n = r[o])] && (e[n] = !(t[n] = e[n]));
                })
              );
            });
          }
          function he(e) {
            return e && void 0 !== e.getElementsByTagName && e;
          }
          for (e in ((p = se.support = {}),
          (o = se.isXML =
            function (e) {
              var t = e.namespaceURI,
                e = (e.ownerDocument || e).documentElement;
              return !Z.test(t || (e && e.nodeName) || "HTML");
            }),
          (T = se.setDocument =
            function (e) {
              var t,
                e = e ? e.ownerDocument || e : b;
              return (
                e != C &&
                  9 === e.nodeType &&
                  e.documentElement &&
                  ((a = (C = e).documentElement),
                  (E = !o(C)),
                  b != C &&
                    (t = C.defaultView) &&
                    t.top !== t &&
                    (t.addEventListener
                      ? t.addEventListener("unload", r, !1)
                      : t.attachEvent && t.attachEvent("onunload", r)),
                  (p.scope = ue(function (e) {
                    return (
                      a.appendChild(e).appendChild(C.createElement("div")),
                      void 0 !== e.querySelectorAll &&
                        !e.querySelectorAll(":scope fieldset div").length
                    );
                  })),
                  (p.attributes = ue(function (e) {
                    return (e.className = "i"), !e.getAttribute("className");
                  })),
                  (p.getElementsByTagName = ue(function (e) {
                    return (
                      e.appendChild(C.createComment("")),
                      !e.getElementsByTagName("*").length
                    );
                  })),
                  (p.getElementsByClassName = te.test(
                    C.getElementsByClassName
                  )),
                  (p.getById = ue(function (e) {
                    return (
                      (a.appendChild(e).id = A),
                      !C.getElementsByName || !C.getElementsByName(A).length
                    );
                  })),
                  p.getById
                    ? ((w.filter.ID = function (e) {
                        var t = e.replace(oe, d);
                        return function (e) {
                          return e.getAttribute("id") === t;
                        };
                      }),
                      (w.find.ID = function (e, t) {
                        if (void 0 !== t.getElementById && E) {
                          e = t.getElementById(e);
                          return e ? [e] : [];
                        }
                      }))
                    : ((w.filter.ID = function (e) {
                        var t = e.replace(oe, d);
                        return function (e) {
                          e =
                            void 0 !== e.getAttributeNode &&
                            e.getAttributeNode("id");
                          return e && e.value === t;
                        };
                      }),
                      (w.find.ID = function (e, t) {
                        if (void 0 !== t.getElementById && E) {
                          var n,
                            r,
                            o,
                            i = t.getElementById(e);
                          if (i) {
                            if ((n = i.getAttributeNode("id")) && n.value === e)
                              return [i];
                            for (
                              o = t.getElementsByName(e), r = 0;
                              (i = o[r++]);

                            )
                              if (
                                (n = i.getAttributeNode("id")) &&
                                n.value === e
                              )
                                return [i];
                          }
                          return [];
                        }
                      })),
                  (w.find.TAG = p.getElementsByTagName
                    ? function (e, t) {
                        return void 0 !== t.getElementsByTagName
                          ? t.getElementsByTagName(e)
                          : p.qsa
                          ? t.querySelectorAll(e)
                          : void 0;
                      }
                    : function (e, t) {
                        var n,
                          r = [],
                          o = 0,
                          i = t.getElementsByTagName(e);
                        if ("*" !== e) return i;
                        for (; (n = i[o++]); ) 1 === n.nodeType && r.push(n);
                        return r;
                      }),
                  (w.find.CLASS =
                    p.getElementsByClassName &&
                    function (e, t) {
                      if (void 0 !== t.getElementsByClassName && E)
                        return t.getElementsByClassName(e);
                    }),
                  (s = []),
                  (v = []),
                  (p.qsa = te.test(C.querySelectorAll)) &&
                    (ue(function (e) {
                      var t;
                      (a.appendChild(e).innerHTML =
                        "<a id='" +
                        A +
                        "'></a><select id='" +
                        A +
                        "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                        e.querySelectorAll("[msallowcapture^='']").length &&
                          v.push("[*^$]=" + H + "*(?:''|\"\")"),
                        e.querySelectorAll("[selected]").length ||
                          v.push("\\[" + H + "*(?:value|" + _ + ")"),
                        e.querySelectorAll("[id~=" + A + "-]").length ||
                          v.push("~="),
                        (t = C.createElement("input")).setAttribute("name", ""),
                        e.appendChild(t),
                        e.querySelectorAll("[name='']").length ||
                          v.push(
                            "\\[" + H + "*name" + H + "*=" + H + "*(?:''|\"\")"
                          ),
                        e.querySelectorAll(":checked").length ||
                          v.push(":checked"),
                        e.querySelectorAll("a#" + A + "+*").length ||
                          v.push(".#.+[+~]"),
                        e.querySelectorAll("\\\f"),
                        v.push("[\\r\\n\\f]");
                    }),
                    ue(function (e) {
                      e.innerHTML =
                        "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                      var t = C.createElement("input");
                      t.setAttribute("type", "hidden"),
                        e.appendChild(t).setAttribute("name", "D"),
                        e.querySelectorAll("[name=d]").length &&
                          v.push("name" + H + "*[*^$|!~]?="),
                        2 !== e.querySelectorAll(":enabled").length &&
                          v.push(":enabled", ":disabled"),
                        (a.appendChild(e).disabled = !0),
                        2 !== e.querySelectorAll(":disabled").length &&
                          v.push(":enabled", ":disabled"),
                        e.querySelectorAll("*,:x"),
                        v.push(",.*:");
                    })),
                  (p.matchesSelector = te.test(
                    (u =
                      a.matches ||
                      a.webkitMatchesSelector ||
                      a.mozMatchesSelector ||
                      a.oMatchesSelector ||
                      a.msMatchesSelector)
                  )) &&
                    ue(function (e) {
                      (p.disconnectedMatch = u.call(e, "*")),
                        u.call(e, "[s!='']:x"),
                        s.push("!=", z);
                    }),
                  (v = v.length && new RegExp(v.join("|"))),
                  (s = s.length && new RegExp(s.join("|"))),
                  (t = te.test(a.compareDocumentPosition)),
                  (y =
                    t || te.test(a.contains)
                      ? function (e, t) {
                          var n = 9 === e.nodeType ? e.documentElement : e,
                            t = t && t.parentNode;
                          return (
                            e === t ||
                            !(
                              !t ||
                              1 !== t.nodeType ||
                              !(n.contains
                                ? n.contains(t)
                                : e.compareDocumentPosition &&
                                  16 & e.compareDocumentPosition(t))
                            )
                          );
                        }
                      : function (e, t) {
                          if (t)
                            for (; (t = t.parentNode); ) if (t === e) return !0;
                          return !1;
                        }),
                  (D = t
                    ? function (e, t) {
                        if (e === t) return (c = !0), 0;
                        var n =
                          !e.compareDocumentPosition -
                          !t.compareDocumentPosition;
                        return (
                          n ||
                          (1 &
                            (n =
                              (e.ownerDocument || e) == (t.ownerDocument || t)
                                ? e.compareDocumentPosition(t)
                                : 1) ||
                          (!p.sortDetached &&
                            t.compareDocumentPosition(e) === n)
                            ? e == C || (e.ownerDocument == b && y(b, e))
                              ? -1
                              : t == C || (t.ownerDocument == b && y(b, t))
                              ? 1
                              : l
                              ? F(l, e) - F(l, t)
                              : 0
                            : 4 & n
                            ? -1
                            : 1)
                        );
                      }
                    : function (e, t) {
                        if (e === t) return (c = !0), 0;
                        var n,
                          r = 0,
                          o = e.parentNode,
                          i = t.parentNode,
                          a = [e],
                          s = [t];
                        if (!o || !i)
                          return e == C
                            ? -1
                            : t == C
                            ? 1
                            : o
                            ? -1
                            : i
                            ? 1
                            : l
                            ? F(l, e) - F(l, t)
                            : 0;
                        if (o === i) return fe(e, t);
                        for (n = e; (n = n.parentNode); ) a.unshift(n);
                        for (n = t; (n = n.parentNode); ) s.unshift(n);
                        for (; a[r] === s[r]; ) r++;
                        return r
                          ? fe(a[r], s[r])
                          : a[r] == b
                          ? -1
                          : s[r] == b
                          ? 1
                          : 0;
                      })),
                C
              );
            }),
          (se.matches = function (e, t) {
            return se(e, null, null, t);
          }),
          (se.matchesSelector = function (e, t) {
            if (
              (T(e),
              p.matchesSelector &&
                E &&
                !O[t + " "] &&
                (!s || !s.test(t)) &&
                (!v || !v.test(t)))
            )
              try {
                var n = u.call(e, t);
                if (
                  n ||
                  p.disconnectedMatch ||
                  (e.document && 11 !== e.document.nodeType)
                )
                  return n;
              } catch (e) {
                O(t, !0);
              }
            return 0 < se(t, C, null, [e]).length;
          }),
          (se.contains = function (e, t) {
            return (e.ownerDocument || e) != C && T(e), y(e, t);
          }),
          (se.attr = function (e, t) {
            (e.ownerDocument || e) != C && T(e);
            var n = w.attrHandle[t.toLowerCase()],
              n =
                n && I.call(w.attrHandle, t.toLowerCase())
                  ? n(e, t, !E)
                  : void 0;
            return void 0 !== n
              ? n
              : p.attributes || !E
              ? e.getAttribute(t)
              : (n = e.getAttributeNode(t)) && n.specified
              ? n.value
              : null;
          }),
          (se.escape = function (e) {
            return (e + "").replace(ie, f);
          }),
          (se.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
          }),
          (se.uniqueSort = function (e) {
            var t,
              n = [],
              r = 0,
              o = 0;
            if (
              ((c = !p.detectDuplicates),
              (l = !p.sortStable && e.slice(0)),
              e.sort(D),
              c)
            ) {
              for (; (t = e[o++]); ) t === e[o] && (r = n.push(o));
              for (; r--; ) e.splice(n[r], 1);
            }
            return (l = null), e;
          }),
          (i = se.getText =
            function (e) {
              var t,
                n = "",
                r = 0,
                o = e.nodeType;
              if (o) {
                if (1 === o || 9 === o || 11 === o) {
                  if ("string" == typeof e.textContent) return e.textContent;
                  for (e = e.firstChild; e; e = e.nextSibling) n += i(e);
                } else if (3 === o || 4 === o) return e.nodeValue;
              } else for (; (t = e[r++]); ) n += i(t);
              return n;
            }),
          ((w = se.selectors =
            {
              cacheLength: 50,
              createPseudo: ce,
              match: X,
              attrHandle: {},
              find: {},
              relative: {
                ">": { dir: "parentNode", first: !0 },
                " ": { dir: "parentNode" },
                "+": { dir: "previousSibling", first: !0 },
                "~": { dir: "previousSibling" },
              },
              preFilter: {
                ATTR: function (e) {
                  return (
                    (e[1] = e[1].replace(oe, d)),
                    (e[3] = (e[3] || e[4] || e[5] || "").replace(oe, d)),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                  );
                },
                CHILD: function (e) {
                  return (
                    (e[1] = e[1].toLowerCase()),
                    "nth" === e[1].slice(0, 3)
                      ? (e[3] || se.error(e[0]),
                        (e[4] = +(e[4]
                          ? e[5] + (e[6] || 1)
                          : 2 * ("even" === e[3] || "odd" === e[3]))),
                        (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                      : e[3] && se.error(e[0]),
                    e
                  );
                },
                PSEUDO: function (e) {
                  var t,
                    n = !e[6] && e[2];
                  return X.CHILD.test(e[0])
                    ? null
                    : (e[3]
                        ? (e[2] = e[4] || e[5] || "")
                        : n &&
                          J.test(n) &&
                          (t = g(n, !0)) &&
                          (t = n.indexOf(")", n.length - t) - n.length) &&
                          ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                      e.slice(0, 3));
                },
              },
              filter: {
                TAG: function (e) {
                  var t = e.replace(oe, d).toLowerCase();
                  return "*" === e
                    ? function () {
                        return !0;
                      }
                    : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                      };
                },
                CLASS: function (e) {
                  var t = N[e + " "];
                  return (
                    t ||
                    ((t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) &&
                      N(e, function (e) {
                        return t.test(
                          ("string" == typeof e.className && e.className) ||
                            (void 0 !== e.getAttribute &&
                              e.getAttribute("class")) ||
                            ""
                        );
                      }))
                  );
                },
                ATTR: function (t, n, r) {
                  return function (e) {
                    e = se.attr(e, t);
                    return null == e
                      ? "!=" === n
                      : !n ||
                          ((e += ""),
                          "=" === n
                            ? e === r
                            : "!=" === n
                            ? e !== r
                            : "^=" === n
                            ? r && 0 === e.indexOf(r)
                            : "*=" === n
                            ? r && -1 < e.indexOf(r)
                            : "$=" === n
                            ? r && e.slice(-r.length) === r
                            : "~=" === n
                            ? -1 < (" " + e.replace(U, " ") + " ").indexOf(r)
                            : "|=" === n &&
                              (e === r ||
                                e.slice(0, r.length + 1) === r + "-"));
                  };
                },
                CHILD: function (g, e, t, h, m) {
                  var v = "nth" !== g.slice(0, 3),
                    y = "last" !== g.slice(-4),
                    b = "of-type" === e;
                  return 1 === h && 0 === m
                    ? function (e) {
                        return !!e.parentNode;
                      }
                    : function (e, t, n) {
                        var r,
                          o,
                          i,
                          a,
                          s,
                          l,
                          c = v != y ? "nextSibling" : "previousSibling",
                          u = e.parentNode,
                          d = b && e.nodeName.toLowerCase(),
                          f = !n && !b,
                          p = !1;
                        if (u) {
                          if (v) {
                            for (; c; ) {
                              for (a = e; (a = a[c]); )
                                if (
                                  b
                                    ? a.nodeName.toLowerCase() === d
                                    : 1 === a.nodeType
                                )
                                  return !1;
                              l = c = "only" === g && !l && "nextSibling";
                            }
                            return !0;
                          }
                          if (
                            ((l = [y ? u.firstChild : u.lastChild]), y && f)
                          ) {
                            for (
                              p =
                                (s =
                                  (r =
                                    (o =
                                      (i = (a = u)[A] || (a[A] = {}))[
                                        a.uniqueID
                                      ] || (i[a.uniqueID] = {}))[g] ||
                                    [])[0] === S && r[1]) && r[2],
                                a = s && u.childNodes[s];
                              (a =
                                (++s && a && a[c]) || (p = s = 0) || l.pop());

                            )
                              if (1 === a.nodeType && ++p && a === e) {
                                o[g] = [S, s, p];
                                break;
                              }
                          } else if (
                            !1 ===
                            (p = f
                              ? (s =
                                  (r =
                                    (o =
                                      (i = (a = e)[A] || (a[A] = {}))[
                                        a.uniqueID
                                      ] || (i[a.uniqueID] = {}))[g] ||
                                    [])[0] === S && r[1])
                              : p)
                          )
                            for (
                              ;
                              (a =
                                (++s && a && a[c]) || (p = s = 0) || l.pop()) &&
                              ((b
                                ? a.nodeName.toLowerCase() !== d
                                : 1 !== a.nodeType) ||
                                !++p ||
                                (f &&
                                  ((o =
                                    (i = a[A] || (a[A] = {}))[a.uniqueID] ||
                                    (i[a.uniqueID] = {}))[g] = [S, p]),
                                a !== e));

                            );
                          return (p -= m) === h || (p % h == 0 && 0 <= p / h);
                        }
                      };
                },
                PSEUDO: function (e, i) {
                  var t,
                    a =
                      w.pseudos[e] ||
                      w.setFilters[e.toLowerCase()] ||
                      se.error("unsupported pseudo: " + e);
                  return a[A]
                    ? a(i)
                    : 1 < a.length
                    ? ((t = [e, e, "", i]),
                      w.setFilters.hasOwnProperty(e.toLowerCase())
                        ? ce(function (e, t) {
                            for (var n, r = a(e, i), o = r.length; o--; )
                              e[(n = F(e, r[o]))] = !(t[n] = r[o]);
                          })
                        : function (e) {
                            return a(e, 0, t);
                          })
                    : a;
                },
              },
              pseudos: {
                not: ce(function (e) {
                  var r = [],
                    o = [],
                    s = h(e.replace(W, "$1"));
                  return s[A]
                    ? ce(function (e, t, n, r) {
                        for (var o, i = s(e, null, r, []), a = e.length; a--; )
                          (o = i[a]) && (e[a] = !(t[a] = o));
                      })
                    : function (e, t, n) {
                        return (
                          (r[0] = e), s(r, null, n, o), (r[0] = null), !o.pop()
                        );
                      };
                }),
                has: ce(function (t) {
                  return function (e) {
                    return 0 < se(t, e).length;
                  };
                }),
                contains: ce(function (t) {
                  return (
                    (t = t.replace(oe, d)),
                    function (e) {
                      return -1 < (e.textContent || i(e)).indexOf(t);
                    }
                  );
                }),
                lang: ce(function (n) {
                  return (
                    $.test(n || "") || se.error("unsupported lang: " + n),
                    (n = n.replace(oe, d).toLowerCase()),
                    function (e) {
                      var t;
                      do {
                        if (
                          (t = E
                            ? e.lang
                            : e.getAttribute("xml:lang") ||
                              e.getAttribute("lang"))
                        )
                          return (
                            (t = t.toLowerCase()) === n ||
                            0 === t.indexOf(n + "-")
                          );
                      } while ((e = e.parentNode) && 1 === e.nodeType);
                      return !1;
                    }
                  );
                }),
                target: function (e) {
                  var t = n.location && n.location.hash;
                  return t && t.slice(1) === e.id;
                },
                root: function (e) {
                  return e === a;
                },
                focus: function (e) {
                  return (
                    e === C.activeElement &&
                    (!C.hasFocus || C.hasFocus()) &&
                    !!(e.type || e.href || ~e.tabIndex)
                  );
                },
                enabled: pe(!1),
                disabled: pe(!0),
                checked: function (e) {
                  var t = e.nodeName.toLowerCase();
                  return (
                    ("input" === t && !!e.checked) ||
                    ("option" === t && !!e.selected)
                  );
                },
                selected: function (e) {
                  return (
                    e.parentNode && e.parentNode.selectedIndex,
                    !0 === e.selected
                  );
                },
                empty: function (e) {
                  for (e = e.firstChild; e; e = e.nextSibling)
                    if (e.nodeType < 6) return !1;
                  return !0;
                },
                parent: function (e) {
                  return !w.pseudos.empty(e);
                },
                header: function (e) {
                  return ee.test(e.nodeName);
                },
                input: function (e) {
                  return Q.test(e.nodeName);
                },
                button: function (e) {
                  var t = e.nodeName.toLowerCase();
                  return (
                    ("input" === t && "button" === e.type) || "button" === t
                  );
                },
                text: function (e) {
                  return (
                    "input" === e.nodeName.toLowerCase() &&
                    "text" === e.type &&
                    (null == (e = e.getAttribute("type")) ||
                      "text" === e.toLowerCase())
                  );
                },
                first: ge(function () {
                  return [0];
                }),
                last: ge(function (e, t) {
                  return [t - 1];
                }),
                eq: ge(function (e, t, n) {
                  return [n < 0 ? n + t : n];
                }),
                even: ge(function (e, t) {
                  for (var n = 0; n < t; n += 2) e.push(n);
                  return e;
                }),
                odd: ge(function (e, t) {
                  for (var n = 1; n < t; n += 2) e.push(n);
                  return e;
                }),
                lt: ge(function (e, t, n) {
                  for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; )
                    e.push(r);
                  return e;
                }),
                gt: ge(function (e, t, n) {
                  for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                  return e;
                }),
              },
            }).pseudos.nth = w.pseudos.eq),
          { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
            w.pseudos[e] = (function (t) {
              return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t;
              };
            })(e);
          for (e in { submit: !0, reset: !0 })
            w.pseudos[e] = (function (n) {
              return function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n;
              };
            })(e);
          function me() {}
          function ve(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r;
          }
          function ye(a, e, t) {
            var s = e.dir,
              l = e.next,
              c = l || s,
              u = t && "parentNode" === c,
              d = k++;
            return e.first
              ? function (e, t, n) {
                  for (; (e = e[s]); )
                    if (1 === e.nodeType || u) return a(e, t, n);
                  return !1;
                }
              : function (e, t, n) {
                  var r,
                    o,
                    i = [S, d];
                  if (n) {
                    for (; (e = e[s]); )
                      if ((1 === e.nodeType || u) && a(e, t, n)) return !0;
                  } else
                    for (; (e = e[s]); )
                      if (1 === e.nodeType || u)
                        if (
                          ((r =
                            (o = e[A] || (e[A] = {}))[e.uniqueID] ||
                            (o[e.uniqueID] = {})),
                          l && l === e.nodeName.toLowerCase())
                        )
                          e = e[s] || e;
                        else {
                          if ((o = r[c]) && o[0] === S && o[1] === d)
                            return (i[2] = o[2]);
                          if (((r[c] = i)[2] = a(e, t, n))) return !0;
                        }
                  return !1;
                };
          }
          function be(o) {
            return 1 < o.length
              ? function (e, t, n) {
                  for (var r = o.length; r--; ) if (!o[r](e, t, n)) return !1;
                  return !0;
                }
              : o[0];
          }
          function we(e, t, n, r, o) {
            for (var i, a = [], s = 0, l = e.length, c = null != t; s < l; s++)
              (i = e[s]) && ((n && !n(i, r, o)) || (a.push(i), c && t.push(s)));
            return a;
          }
          function xe(p, g, h, m, v, e) {
            return (
              m && !m[A] && (m = xe(m)),
              v && !v[A] && (v = xe(v, e)),
              ce(function (e, t, n, r) {
                var o,
                  i,
                  a,
                  s = [],
                  l = [],
                  c = t.length,
                  u =
                    e ||
                    (function (e, t, n) {
                      for (var r = 0, o = t.length; r < o; r++) se(e, t[r], n);
                      return n;
                    })(g || "*", n.nodeType ? [n] : n, []),
                  d = !p || (!e && g) ? u : we(u, s, p, n, r),
                  f = h ? (v || (e ? p : c || m) ? [] : t) : d;
                if ((h && h(d, f, n, r), m))
                  for (o = we(f, l), m(o, [], n, r), i = o.length; i--; )
                    (a = o[i]) && (f[l[i]] = !(d[l[i]] = a));
                if (e) {
                  if (v || p) {
                    if (v) {
                      for (o = [], i = f.length; i--; )
                        (a = f[i]) && o.push((d[i] = a));
                      v(null, (f = []), o, r);
                    }
                    for (i = f.length; i--; )
                      (a = f[i]) &&
                        -1 < (o = v ? F(e, a) : s[i]) &&
                        (e[o] = !(t[o] = a));
                  }
                } else (f = we(f === t ? f.splice(c, f.length) : f)), v ? v(null, t, f, r) : j.apply(t, f);
              })
            );
          }
          function Te(m, v) {
            function e(e, t, n, r, o) {
              var i,
                a,
                s,
                l = 0,
                c = "0",
                u = e && [],
                d = [],
                f = x,
                p = e || (b && w.find.TAG("*", o)),
                g = (S += null == f ? 1 : Math.random() || 0.1),
                h = p.length;
              for (
                o && (x = t == C || t || o);
                c !== h && null != (i = p[c]);
                c++
              ) {
                if (b && i) {
                  for (
                    a = 0, t || i.ownerDocument == C || (T(i), (n = !E));
                    (s = m[a++]);

                  )
                    if (s(i, t || C, n)) {
                      r.push(i);
                      break;
                    }
                  o && (S = g);
                }
                y && ((i = !s && i) && l--, e && u.push(i));
              }
              if (((l += c), y && c !== l)) {
                for (a = 0; (s = v[a++]); ) s(u, d, t, n);
                if (e) {
                  if (0 < l) for (; c--; ) u[c] || d[c] || (d[c] = P.call(r));
                  d = we(d);
                }
                j.apply(r, d),
                  o &&
                    !e &&
                    0 < d.length &&
                    1 < l + v.length &&
                    se.uniqueSort(r);
              }
              return o && ((S = g), (x = f)), u;
            }
            var y = 0 < v.length,
              b = 0 < m.length;
            return y ? ce(e) : e;
          }
          (me.prototype = w.filters = w.pseudos),
            (w.setFilters = new me()),
            (g = se.tokenize =
              function (e, t) {
                var n,
                  r,
                  o,
                  i,
                  a,
                  s,
                  l,
                  c = L[e + " "];
                if (c) return t ? 0 : c.slice(0);
                for (a = e, s = [], l = w.preFilter; a; ) {
                  for (i in ((n && !(r = G.exec(a))) ||
                    (r && (a = a.slice(r[0].length) || a), s.push((o = []))),
                  (n = !1),
                  (r = Y.exec(a)) &&
                    ((n = r.shift()),
                    o.push({ value: n, type: r[0].replace(W, " ") }),
                    (a = a.slice(n.length))),
                  w.filter))
                    !(r = X[i].exec(a)) ||
                      (l[i] && !(r = l[i](r))) ||
                      ((n = r.shift()),
                      o.push({ value: n, type: i, matches: r }),
                      (a = a.slice(n.length)));
                  if (!n) break;
                }
                return t ? a.length : a ? se.error(e) : L(e, s).slice(0);
              }),
            (h = se.compile =
              function (e, t) {
                var n,
                  r = [],
                  o = [],
                  i = R[e + " "];
                if (!i) {
                  for (n = (t = t || g(e)).length; n--; )
                    ((i = (function e(t) {
                      for (
                        var r,
                          n,
                          o,
                          i = t.length,
                          a = w.relative[t[0].type],
                          s = a || w.relative[" "],
                          l = a ? 1 : 0,
                          c = ye(
                            function (e) {
                              return e === r;
                            },
                            s,
                            !0
                          ),
                          u = ye(
                            function (e) {
                              return -1 < F(r, e);
                            },
                            s,
                            !0
                          ),
                          d = [
                            function (e, t, n) {
                              return (
                                (n =
                                  (!a && (n || t !== x)) ||
                                  ((r = t).nodeType ? c : u)(e, t, n)),
                                (r = null),
                                n
                              );
                            },
                          ];
                        l < i;
                        l++
                      )
                        if ((n = w.relative[t[l].type])) d = [ye(be(d), n)];
                        else {
                          if (
                            (n = w.filter[t[l].type].apply(null, t[l].matches))[
                              A
                            ]
                          ) {
                            for (o = ++l; o < i && !w.relative[t[o].type]; o++);
                            return xe(
                              1 < l && be(d),
                              1 < l &&
                                ve(
                                  t
                                    .slice(0, l - 1)
                                    .concat({
                                      value: " " === t[l - 2].type ? "*" : "",
                                    })
                                ).replace(W, "$1"),
                              n,
                              l < o && e(t.slice(l, o)),
                              o < i && e((t = t.slice(o))),
                              o < i && ve(t)
                            );
                          }
                          d.push(n);
                        }
                      return be(d);
                    })(t[n]))[A]
                      ? r
                      : o
                    ).push(i);
                  (i = R(e, Te(o, r))).selector = e;
                }
                return i;
              }),
            (m = se.select =
              function (e, t, n, r) {
                var o,
                  i,
                  a,
                  s,
                  l,
                  c = "function" == typeof e && e,
                  u = !r && g((e = c.selector || e));
                if (((n = n || []), 1 === u.length)) {
                  if (
                    2 < (i = u[0] = u[0].slice(0)).length &&
                    "ID" === (a = i[0]).type &&
                    9 === t.nodeType &&
                    E &&
                    w.relative[i[1].type]
                  ) {
                    if (
                      !(t = (w.find.ID(a.matches[0].replace(oe, d), t) ||
                        [])[0])
                    )
                      return n;
                    c && (t = t.parentNode),
                      (e = e.slice(i.shift().value.length));
                  }
                  for (
                    o = X.needsContext.test(e) ? 0 : i.length;
                    o-- && ((a = i[o]), !w.relative[(s = a.type)]);

                  )
                    if (
                      (l = w.find[s]) &&
                      (r = l(
                        a.matches[0].replace(oe, d),
                        (re.test(i[0].type) && he(t.parentNode)) || t
                      ))
                    ) {
                      if ((i.splice(o, 1), !(e = r.length && ve(i))))
                        return j.apply(n, r), n;
                      break;
                    }
                }
                return (
                  (c || h(e, u))(
                    r,
                    t,
                    !E,
                    n,
                    !t || (re.test(e) && he(t.parentNode)) || t
                  ),
                  n
                );
              }),
            (p.sortStable = A.split("").sort(D).join("") === A),
            (p.detectDuplicates = !!c),
            T(),
            (p.sortDetached = ue(function (e) {
              return 1 & e.compareDocumentPosition(C.createElement("fieldset"));
            })),
            ue(function (e) {
              return (
                (e.innerHTML = "<a href='#'></a>"),
                "#" === e.firstChild.getAttribute("href")
              );
            }) ||
              de("type|href|height|width", function (e, t, n) {
                if (!n)
                  return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
              }),
            (p.attributes &&
              ue(function (e) {
                return (
                  (e.innerHTML = "<input/>"),
                  e.firstChild.setAttribute("value", ""),
                  "" === e.firstChild.getAttribute("value")
                );
              })) ||
              de("value", function (e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase())
                  return e.defaultValue;
              }),
            ue(function (e) {
              return null == e.getAttribute("disabled");
            }) ||
              de(_, function (e, t, n) {
                if (!n)
                  return !0 === e[t]
                    ? t.toLowerCase()
                    : (t = e.getAttributeNode(t)) && t.specified
                    ? t.value
                    : null;
              });
          var Ce = n.Sizzle;
          (se.noConflict = function () {
            return n.Sizzle === se && (n.Sizzle = Ce), se;
          }),
            void 0 ===
              (ke = function () {
                return se;
              }.call(Ae, Se, Ae, Ee)) || (Ee.exports = ke);
        })(window);
      },
      9228: function (e, t, n) {
        try {
          n(6413);
          var r = n(2702);
          window.Promise || r.polyfill();
        } catch (e) {}
        var o = {
          "[object String]": "string",
          "[object Boolean]": "boolean",
          "[object Undefined]": "undefined",
          "[object Number]": "number",
          "[object Object]": "object",
          "[object Error]": "error",
          "[object Function]": "function",
          "[object Date]": "date",
          "[object Array]": "array",
          "[object RegExp]": "regexp",
          "[object Null]": "null",
          "[object Arguments]": "arguments",
          "[object Window]": "window",
          "[object HTMLDocument]": "document",
          "[object NodeList]": "array",
          "[object HTMLCollection]": "array",
        };
        function a(e) {
          return (
            o[Object.prototype.toString.call(e)] ||
            (e instanceof Node && 1 == e.nodeType ? "element" : "")
          );
        }
        function i(e, t) {
          var n = a((e = e && e.jTool ? e.nodeList : e));
          if ("array" === n || "nodeList" === n || "arguments" === n)
            for (
              var r = Array.prototype.slice.call(e, 0, e.length), o = 0;
              o < r.length;
              o++
            ) {
              var i = r[o];
              t.call(i, o, i);
            }
          else if ("object" === n)
            for (var o in e) if (!1 === t.call(e[o], o, e[o])) break;
        }
        r = {
          getBrowserInfo: function () {
            var e = navigator.userAgent.toLowerCase(),
              t = "",
              n = "";
            if (0 < e.indexOf("msie"))
              (t = "IE"), (n = "" + e.match(/msie [\d.]+;/gi));
            else if (0 < e.indexOf("trident")) (t = "IE"), (n = 11);
            else if (0 < e.indexOf("edge")) (t = "IE"), (n = 12);
            else if (0 < e.indexOf("firefox"))
              (t = "firefox"), (n = "" + e.match(/firefox\/[\d.]+/gi));
            else if (0 < e.indexOf("chrome"))
              (t = "chrome"), (n = "" + e.match(/chrome\/[\d.]+/gi));
            else if (0 < e.indexOf("safari") && e.indexOf("chrome") < 0)
              (t = "safari"), (n = "" + e.match(/version\/[\d.]+/gi));
            else if (0 <= e.indexOf("opera"))
              (t = "opera"), (n = "" + e.match(/version\/[\d.]+/gi));
            else if ("Netscape" == navigator.appName) {
              try {
                n = e
                  .split(";")[7]
                  .replace(/[ ]/g, "")
                  .match(/[\d\.]/g)
                  .toString()
                  .replace(/[,]/g, "");
              } catch (e) {
                n = "11";
              }
              t = "IE";
            }
            return (
              (n = (n + "").replace(/[^0-9.]/gi, "")),
              { browser: t, version: parseInt(n) }
            );
          },
          language: (
            navigator.browserLanguage || navigator.language
          ).toLowerCase(),
        };
        function s(e) {
          if (null == e || "" == e) return 0;
          for (var t, n = 0, r = e.length, o = 0; o < r; o++)
            n += 0 <= (t = e.charCodeAt(o)) && t <= 128 ? 1 : 2;
          return n;
        }
        function l(e, t, n) {
          if (!e) return "";
          t = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          return e.replace(new RegExp(t, "g"), n);
        }
        function c(e) {
          if (e)
            return (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e =
              e.toString()).replace(
              /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
              ""
            )).replace(/aria-[a-zA-z]+=\"(.*?)\"/gi, "")).replace(
              "  ",
              ""
            )).replace("  ", "")).replace("  ", "")).replace(
              /<style\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/style>/gi,
              ""
            )).replace(/ /g, "acaicaele")).replace(
              /<\/?[^>]*>|(\n|\t|\r)|(\s)/g,
              ""
            )).replace(/acaicaele/g, " ")).trim());
        }
        function u(e) {
          if (null == e || void 0 === e) return "";
          return (e = e
            .trim()
            .replace(
              /\\|\/|\?|\？|\,|\，|\*|\"|\“|\”|\'|\-|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\•|\|/g,
              ""
            ));
        }
        e.exports = {
          addEventListener: function (e, t, n, r) {
            if (e)
              try {
                e.addEventListener
                  ? e.addEventListener(t, n, r)
                  : e.attachEvent("on" + t, n.bind(e));
              } catch (e) {}
          },
          removeEventListener: function (e, t, n) {
            e.removeEventListener
              ? e.removeEventListener(t, n, !1)
              : e.detachEvent("on" + t, n.bind(e));
          },
          isWindow: function (e) {
            return null !== e && e === e.window;
          },
          noop: function () {},
          type: a,
          isEmptyObject: function (e) {
            var t,
              n = !0;
            for (t in e) Object.prototype.hasOwnProperty.call(e, t) && (n = !1);
            return n;
          },
          each: i,
          createDOM: function (e) {
            var t = document.createElement("div");
            return (t.innerHTML = e), t.childNodes;
          },
          getStyle: function (e, t) {
            try {
              return t
                ? window.getComputedStyle(e)[t]
                : window.getComputedStyle(e);
            } catch (e) {
              return null;
            }
          },
          version: "1.3.0",
          browser: r,
          genID: function (e) {
            return (
              (e = e || 4),
              "aria" +
                Number(
                  Math.random().toString().substr(3, e) + Date.now()
                ).toString(36)
            );
          },
          splitBylength: function (e, t) {
            var n = e.split(/([,，。；;])/),
              r = [],
              o = "";
            do {
              for (var i = 0; i < n.length; i++)
                if (
                  ((o += n[i]),
                  i < n.length - 1 && (o += n[(i += 1)]),
                  80 < s(o) ||
                    i == n.length - 1 ||
                    (i < n.length - 1 && 106 < s(o) + s(n[i + 1])))
                ) {
                  n.splice(0, i + 1), 1 < u(o).length && r.push(o), (o = "");
                  break;
                }
            } while (0 < n.length);
            return r;
          },
          replaceAll: l,
          formatString: function () {
            if (arguments.length < 1) return null;
            for (var e = arguments[0], t = 1; t < arguments.length; t++)
              e = l(e, "{" + (t - 1) + "}", arguments[t]);
            return e;
          },
          toPascalCase: function (e) {
            return e && e.length
              ? 1 === e.length
                ? e.charAt(0).toUpperCase()
                : e.charAt(0).toUpperCase() + e.substr(1)
              : e;
          },
          toCamelCase: function (e) {
            return e && e.length
              ? 1 === e.length
                ? e.charAt(0).toLowerCase()
                : e.charAt(0).toLowerCase() + e.substr(1)
              : e;
          },
          queryString: {
            toJson: function (e) {
              for (
                var t = {},
                  n = (e = e || location.search.substring(1)).split("&"),
                  r = 0;
                r < n.length;
                r++
              ) {
                var o = n[r].indexOf("=");
                if (-1 !== o) {
                  var i = n[r].substring(0, o),
                    o = n[r].substring(o + 1),
                    o = decodeURIComponent(o);
                  try {
                    t[i] = JSON.parse(o);
                  } catch (e) {
                    t[i] = o;
                  }
                }
              }
              return t;
            },
            val: function (e, t) {
              if (
                ((t = t || location.search.substring(1)),
                !new RegExp("(^|/?|&)" + e + "=([^&]*)(/s|&|$)", "i").test(t))
              )
                return "";
              try {
                return JSON.parse(RegExp.$2);
              } catch (e) {
                return RegExp.$2;
              }
            },
          },
          formatBoolean: function (e) {
            return void 0 === e ? e : Boolean(e);
          },
          formatInt: function (e) {
            return void 0 === e ? 0 : parseInt(e);
          },
          reMoveHtml: c,
          formatStrToRead: function (e, t) {
            var n;
            if (e)
              return (
                (n = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' }),
                (e = e.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (e, t) {
                  return n[t];
                })),
                t && ((e = l(c(e), ",,", ",")), (e = l(e, ",,", ","))),
                (e =
                  1 < e.length &&
                  "," ===
                    (e =
                      "," === e.substr(0, 1)
                        ? e.substr(1, e.length)
                        : e).substr(e.length - 1, 1)
                    ? e.substr(0, e.length - 1)
                    : e)
              );
          },
          strToObj: function (e) {
            if (void 0 === e) return e;
            try {
              return JSON.parse(e);
            } catch (e) {
              return {};
            }
          },
          HtmlElemRoles: {
            moveoverBesides: ["div", "ul", "table", "tr", "html", "body"],
            noregion: ["option", "radiobox", "checkbox"],
            heading: ["h1", "h2", "h3", "h4", "h5", "h6", "h7"],
            textbox: ["text", "tel", "date"],
            dialog: ["alert", "alertdialog", "dialog", "confirm"],
            select: ["combobox", "select", "select-one", "select-multiple"],
            foucsable0: [
              "0",
              "region",
              "combobox",
              "select",
              "select-one",
              "select-multiple",
              "input",
              "textarea",
              "a",
              "button",
              "checkbox",
              "group",
              "heading",
              "log",
              "menu",
              "menubar",
              "option",
              "radio",
              "radiogroup",
              "row",
            ],
            foucsable1: [
              "tablistbox",
              "alert",
              "alertdialog",
              "dialog",
              "dd",
              "dt",
              "confirm",
              "application",
              "grid",
              "gridcell",
              "menuitem",
              "menuitemcheckbox",
              "menuitemradio",
              "presentation",
              "tr",
              "td",
              "th",
              "li",
            ],
          },
          stopBubble: function (e) {
            (e = e || window.event) &&
              (e && e.stopPropagation
                ? e.stopPropagation()
                : (e.cancelBubble = !0));
          },
          stopDefault: function (e) {
            if ((e = e || window.event))
              return (
                e && e.preventDefault
                  ? e.preventDefault()
                  : (e.returnValue = !1),
                !1
              );
          },
          arrToSizzle: function (e) {
            var n = e.toString();
            return (
              i(e, function (e, t) {
                n += ",[role='" + t + "']";
              }),
              n
            );
          },
          triggerEvent: function (e, t) {
            var n;
            document.createEvent
              ? ((n = document.createEvent("HTMLEvents")).initEvent(t, !0, !0),
                (n.eventName = t),
                e.dispatchEvent(n))
              : (((n = document.createEventObject()).eventType = t),
                (n.eventName = t),
                e.fireEvent("on" + n.eventType, n));
          },
          addCss: function (e, t, n) {
            void 0 === n && (n = "sheet");
            var r,
              o = Array.from(document.styleSheets).reduce(function (e, t) {
                return t.title == n ? t : e;
              }, null);
            o
              ? 0 < o.length && (o = o[o.length - 1])
              : (((r = document.createElement("style")).title = n),
                document.body.appendChild(r),
                (o = document.styleSheets[document.styleSheets.length - 1]));
            var i,
              a = "";
            for (i in t)
              a +=
                i.replace(/[A-Z]/g, function (e) {
                  return "-" + e.toLowerCase();
                }) +
                ":" +
                ("number" == typeof t[i] ? t[i] + "px" : t[i]) +
                ";";
            o.addRule
              ? o.addRule(e, a, o.cssRules.length)
              : o && o.insertRule(e + "{" + a + "}", 0);
          },
          colorRgbToHex: function (e) {
            if (/^(rgb|RGB)/.test(e)) {
              for (
                var t = e.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","),
                  n = "#",
                  r = 0;
                r < t.length;
                r++
              ) {
                var o = Number(t[r]).toString(16);
                n += o = o.length < 2 ? "0" + o : o;
              }
              return (n = 7 !== n.length ? e : n);
            }
            if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)) {
              var i = e.replace(/#/, "").split("");
              if (6 === i.length) return e;
              if (3 === i.length) {
                for (var a = "#", s = 0; s < i.length; s += 1) a += i[s] + i[s];
                return a;
              }
            }
            return e;
          },
          colorHexToRgb: function (e) {
            if (
              (e = e.toLowerCase()) &&
              /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(e)
            ) {
              if (4 === e.length) {
                for (var t = "#", n = 1; n < 4; n += 1)
                  t += e.slice(n, n + 1).concat(e.slice(n, n + 1));
                e = t;
              }
              for (var r = [], o = 1; o < 7; o += 2)
                r.push(parseInt("0x" + e.slice(o, o + 2)));
              return "RGB(" + r.join(",") + ")";
            }
            return e;
          },
          isMobile: function () {
            return (
              /mobile/i.test(navigator.userAgent) ||
              /android/i.test(navigator.userAgent)
            );
          },
          toCssCamelCase: function (e) {
            return e.replace(/[A-Z]/g, function (e) {
              return "-" + e.toLowerCase();
            });
          },
          isIE: function () {
            return -1 < navigator.userAgent.toLowerCase().indexOf("trident");
          },
          hasScrollbar: function () {
            return (
              document.body.scrollHeight >
              (window.innerHeight || document.documentElement.clientHeight)
            );
          },
          getMouseOffset: function (e) {
            var t =
              document.documentElement.scrollTop || document.body.scrollTop;
            return {
              x:
                (document.documentElement.scrollLeft ||
                  document.body.scrollLeft) + e.clientX,
              y: t + e.clientY,
            };
          },
          isElementInViewport: function (e) {
            return (
              0 <= (e = e.getBoundingClientRect()).top &&
              0 <= e.left &&
              e.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
              e.right <=
                (window.innerWidth || document.documentElement.clientWidth)
            );
          },
          scroll: function t(n, r) {
            var o = r - n,
              i = n;
            setTimeout(function () {
              var e = Math.ceil(o / 10);
              (i += e),
                window.scrollTo(i, n),
                10 < o || o < -10 ? t(i, r) : window.scrollTo(i, r);
            }, 1);
          },
          isFF: function () {
            return -1 < navigator.userAgent.toLowerCase().indexOf("firefox");
          },
          appendCss: function (e, t, n) {
            var r = e.getElementById(t);
            r && r.parentNode.removeChild(r),
              (r = e.createElement("style")).setAttribute("type", "text/css"),
              (r.id = t),
              r.setAttribute("isaria", "true"),
              (r.innerHTML = n),
              e.body.appendChild(r);
          },
          getLength: s,
          replaceSpChar: u,
        };
      },
      2702: function (e, t, re) {
        e.exports = (function () {
          "use strict";
          function r(e) {
            var t = typeof e;
            return e !== null && (t === "object" || t === "function");
          }
          function l(e) {
            return typeof e === "function";
          }
          var e = void 0;
          if (Array.isArray) e = Array.isArray;
          else
            e = function (e) {
              return Object.prototype.toString.call(e) === "[object Array]";
            };
          var n = e,
            o = 0,
            t = void 0,
            i = void 0,
            a = function e(t, n) {
              w[o] = t;
              w[o + 1] = n;
              o += 2;
              if (o === 2)
                if (i) i(x);
                else C();
            };
          function s(e) {
            i = e;
          }
          function c(e) {
            a = e;
          }
          var u = typeof window !== "undefined" ? window : undefined,
            d = u || {},
            f = d.MutationObserver || d.WebKitMutationObserver,
            p =
              typeof self === "undefined" &&
              typeof process !== "undefined" &&
              {}.toString.call(process) === "[object process]",
            g =
              typeof Uint8ClampedArray !== "undefined" &&
              typeof importScripts !== "undefined" &&
              typeof MessageChannel !== "undefined";
          function h() {
            return function () {
              return process.nextTick(x);
            };
          }
          function m() {
            if (typeof t !== "undefined")
              return function () {
                t(x);
              };
            return b();
          }
          function v() {
            var e = 0;
            var t = new f(x);
            var n = document.createTextNode("");
            t.observe(n, { characterData: true });
            return function () {
              n.data = e = ++e % 2;
            };
          }
          function y() {
            var e = new MessageChannel();
            e.port1.onmessage = x;
            return function () {
              return e.port2.postMessage(0);
            };
          }
          function b() {
            var e = setTimeout;
            return function () {
              return e(x, 1);
            };
          }
          var w = new Array(1e3);
          function x() {
            for (var e = 0; e < o; e += 2) {
              var t = w[e];
              var n = w[e + 1];
              t(n);
              w[e] = undefined;
              w[e + 1] = undefined;
            }
            o = 0;
          }
          function T() {
            try {
              var e = Function("return this")().require("vertx");
              t = e.runOnLoop || e.runOnContext;
              return m();
            } catch (e) {
              return b();
            }
          }
          var C = void 0;
          if (p) C = h();
          else if (f) C = v();
          else if (g) C = y();
          else if (u === undefined && "function" === "function") C = T();
          else C = b();
          function E(e, t) {
            var n = this;
            var r = new this.constructor(k);
            if (r[S] === undefined) Y(r);
            var o = n._state;
            if (o) {
              var i = arguments[o - 1];
              a(function () {
                return z(o, r, i, n._result);
              });
            } else K(n, r, e, t);
            return r;
          }
          function A(e) {
            var t = this;
            if (e && typeof e === "object" && e.constructor === t) return e;
            var n = new t(k);
            B(n, e);
            return n;
          }
          var S = Math.random().toString(36).substring(2);
          function k() {}
          var N = void 0,
            L = 1,
            R = 2;
          function O() {
            return new TypeError("You cannot resolve a promise with itself");
          }
          function D() {
            return new TypeError(
              "A promises callback cannot return that same promise."
            );
          }
          function I(e, t, n, r) {
            try {
              e.call(t, n, r);
            } catch (e) {
              return e;
            }
          }
          function P(e, r, o) {
            a(function (t) {
              var n = false;
              var e = I(
                o,
                r,
                function (e) {
                  if (n) return;
                  n = true;
                  if (r !== e) B(t, e);
                  else _(t, e);
                },
                function (e) {
                  if (n) return;
                  n = true;
                  H(t, e);
                },
                "Settle: " + (t._label || " unknown promise")
              );
              if (!n && e) {
                n = true;
                H(t, e);
              }
            }, e);
          }
          function M(t, e) {
            if (e._state === L) _(t, e._result);
            else if (e._state === R) H(t, e._result);
            else
              K(
                e,
                undefined,
                function (e) {
                  return B(t, e);
                },
                function (e) {
                  return H(t, e);
                }
              );
          }
          function j(e, t, n) {
            if (
              t.constructor === e.constructor &&
              n === E &&
              t.constructor.resolve === A
            )
              M(e, t);
            else if (n === undefined) _(e, t);
            else if (l(n)) P(e, t, n);
            else _(e, t);
          }
          function B(t, e) {
            if (t === e) H(t, O());
            else if (r(e)) {
              var n = void 0;
              try {
                n = e.then;
              } catch (e) {
                H(t, e);
                return;
              }
              j(t, e, n);
            } else _(t, e);
          }
          function F(e) {
            if (e._onerror) e._onerror(e._result);
            q(e);
          }
          function _(e, t) {
            if (e._state !== N) return;
            e._result = t;
            e._state = L;
            if (e._subscribers.length !== 0) a(q, e);
          }
          function H(e, t) {
            if (e._state !== N) return;
            e._state = R;
            e._result = t;
            a(F, e);
          }
          function K(e, t, n, r) {
            var o = e._subscribers;
            var i = o.length;
            e._onerror = null;
            o[i] = t;
            o[i + L] = n;
            o[i + R] = r;
            if (i === 0 && e._state) a(q, e);
          }
          function q(e) {
            var t = e._subscribers;
            var n = e._state;
            if (t.length === 0) return;
            var r = void 0,
              o = void 0,
              i = e._result;
            for (var a = 0; a < t.length; a += 3) {
              r = t[a];
              o = t[a + n];
              if (r) z(n, r, o, i);
              else o(i);
            }
            e._subscribers.length = 0;
          }
          function z(e, t, n, r) {
            var o = l(n),
              i = void 0,
              a = void 0,
              s = true;
            if (o) {
              try {
                i = n(r);
              } catch (e) {
                s = false;
                a = e;
              }
              if (t === i) {
                H(t, D());
                return;
              }
            } else i = r;
            if (t._state !== N);
            else if (o && s) B(t, i);
            else if (s === false) H(t, a);
            else if (e === L) _(t, i);
            else if (e === R) H(t, i);
          }
          function U(n, e) {
            try {
              e(
                function e(t) {
                  B(n, t);
                },
                function e(t) {
                  H(n, t);
                }
              );
            } catch (e) {
              H(n, e);
            }
          }
          var W = 0;
          function G() {
            return W++;
          }
          function Y(e) {
            e[S] = W++;
            e._state = undefined;
            e._result = undefined;
            e._subscribers = [];
          }
          function V() {
            return new Error("Array Methods must be provided an Array");
          }
          var J = (function () {
            function e(e, t) {
              this._instanceConstructor = e;
              this.promise = new e(k);
              if (!this.promise[S]) Y(this.promise);
              if (n(t)) {
                this.length = t.length;
                this._remaining = t.length;
                this._result = new Array(this.length);
                if (this.length === 0) _(this.promise, this._result);
                else {
                  this.length = this.length || 0;
                  this._enumerate(t);
                  if (this._remaining === 0) _(this.promise, this._result);
                }
              } else H(this.promise, V());
            }
            e.prototype._enumerate = function e(t) {
              for (var n = 0; this._state === N && n < t.length; n++)
                this._eachEntry(t[n], n);
            };
            e.prototype._eachEntry = function e(t, n) {
              var r = this._instanceConstructor;
              var o = r.resolve;
              if (o === A) {
                var i = void 0;
                var a = void 0;
                var s = false;
                try {
                  i = t.then;
                } catch (e) {
                  s = true;
                  a = e;
                }
                if (i === E && t._state !== N)
                  this._settledAt(t._state, n, t._result);
                else if (typeof i !== "function") {
                  this._remaining--;
                  this._result[n] = t;
                } else if (r === te) {
                  var l = new r(k);
                  if (s) H(l, a);
                  else j(l, t, i);
                  this._willSettleAt(l, n);
                } else
                  this._willSettleAt(
                    new r(function (e) {
                      return e(t);
                    }),
                    n
                  );
              } else this._willSettleAt(o(t), n);
            };
            e.prototype._settledAt = function e(t, n, r) {
              var o = this.promise;
              if (o._state === N) {
                this._remaining--;
                if (t === R) H(o, r);
                else this._result[n] = r;
              }
              if (this._remaining === 0) _(o, this._result);
            };
            e.prototype._willSettleAt = function e(t, n) {
              var r = this;
              K(
                t,
                undefined,
                function (e) {
                  return r._settledAt(L, n, e);
                },
                function (e) {
                  return r._settledAt(R, n, e);
                }
              );
            };
            return e;
          })();
          function $(e) {
            return new J(this, e).promise;
          }
          function X(o) {
            var i = this;
            if (!n(o))
              return new i(function (e, t) {
                return t(new TypeError("You must pass an array to race."));
              });
            else
              return new i(function (e, t) {
                var n = o.length;
                for (var r = 0; r < n; r++) i.resolve(o[r]).then(e, t);
              });
          }
          function Z(e) {
            var t = this;
            var n = new t(k);
            H(n, e);
            return n;
          }
          function Q() {
            throw new TypeError(
              "You must pass a resolver function as the first argument to the promise constructor"
            );
          }
          function ee() {
            throw new TypeError(
              "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
            );
          }
          var te = (function () {
            function t(e) {
              this[S] = G();
              this._result = this._state = undefined;
              this._subscribers = [];
              if (k !== e) {
                typeof e !== "function" && Q();
                this instanceof t ? U(this, e) : ee();
              }
            }
            t.prototype.catch = function e(t) {
              return this.then(null, t);
            };
            t.prototype.finally = function e(t) {
              var n = this;
              var r = n.constructor;
              if (l(t))
                return n.then(
                  function (e) {
                    return r.resolve(t()).then(function () {
                      return e;
                    });
                  },
                  function (e) {
                    return r.resolve(t()).then(function () {
                      throw e;
                    });
                  }
                );
              return n.then(t, t);
            };
            return t;
          })();
          function ne() {
            var e = void 0;
            if (typeof re.g !== "undefined") e = re.g;
            else if (typeof self !== "undefined") e = self;
            else
              try {
                e = Function("return this")();
              } catch (e) {
                throw new Error(
                  "polyfill failed because global object is unavailable in this environment"
                );
              }
            var t = e.Promise;
            if (t) {
              var n = null;
              try {
                n = Object.prototype.toString.call(t.resolve());
              } catch (e) {}
              if (n === "[object Promise]" && !t.cast) return;
            }
            e.Promise = te;
          }
          return (
            (te.prototype.then = E),
            (te.all = $),
            (te.race = X),
            (te.resolve = A),
            (te.reject = Z),
            (te._setScheduler = s),
            (te._setAsap = c),
            (te._asap = a),
            (te.polyfill = ne),
            (te.Promise = te)
          );
        })();
      },
    },
    r = {};
  function b(e) {
    var t = r[e];
    if (void 0 !== t) return t.exports;
    t = r[e] = { exports: {} };
    return n[e].call(t.exports, t, t.exports, b), t.exports;
  }
  b.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })();
  !(function () {
    var t = b(1439),
      n = b(954),
      r = b(2713),
      o = b(8962),
      e = b(57),
      i = b(2264),
      a = b(755);
    b(5602);
    var s = b(2087),
      l = b(9564),
      c = b(9228),
      u = b(1337),
      d = b(1855);
    b(5045);
    var f = b(3385),
      p = b(1941),
      g = b(1266),
      h = b(2125),
      m = b(1643),
      v = {};
    (v.settings = p.ariaSettings),
      (v.status = function () {
        return o.status;
      }),
      (v.support = a.check()),
      (v.browserSupport = {
        error: function () {
          t(".cnwza").addClass("ariaHide"),
            t("#cnwza").addClass("ariaHide"),
            t("#cniil_wza").addClass("ariaHide"),
            alert("您浏览器版本太低，请升级您的浏览器");
        },
      }),
      (v.end = function () {
        (y = !1),
          h.end(),
          m.AppIdChangeRemoveListen(),
          (o.status = !1),
          (o.tellerMode = !1),
          c.isMobile()
            ? (h.stop(), s.end(), (o.status = !1))
            : (h.stop(), r.end(), f.end()),
          g.setBtn(!1);
      });
    var y = !(v.startFrame = function (e) {
      r.start(e);
    });
    if (
      ((v.start = function (e) {
        h.start(),
          y ||
            (v.support
              ? ((y = !0),
                n.init().then(function () {
                  c.isMobile()
                    ? (s.start(), (o.status = !0))
                    : (function () {
                        try {
                          f.start().then(function () {
                            function e(e) {
                              e = t(e);
                              o.status
                                ? "false" != e.attr("clickhide")
                                  ? e.addClass("ariaHide")
                                  : e.attr("closeText") &&
                                    e.html(e.attr("closeText"))
                                : (e.removeClass("ariaHide"),
                                  e.attr("openText") &&
                                    e.html(e.attr("openText")));
                            }
                            r.start(),
                              (o.status = !0),
                              e(".cnwza"),
                              e("#cnwza"),
                              e("#cniil_wza"),
                              v.browserSupport &&
                                v.browserSupport.error &&
                                "function" == typeof v.browserSupport.success &&
                                v.browserSupport.success();
                          });
                        } catch (e) {}
                      })(),
                    e && "function" == typeof e && e(),
                    g.setBtn(!0);
                }))
              : v.browserSupport &&
                v.browserSupport.error &&
                "function" == typeof v.browserSupport.error &&
                v.browserSupport.error());
      }),
      (v.reload = function () {
        v.end(), v.start();
      }),
      n.checkJs(),
      g.removeListenBtn(),
      g.addListenBtn(),
      m.addWelcomeContent(),
      c.isMobile() ? (d.start(), u.start()) : l.start(document),
      "0" == c.queryString.val("aria") && (o.status = !1),
      o.status || "1" == c.queryString.val("aria"))
    )
      try {
        setTimeout(function () {
          v.start();
        }, 100);
      } catch (e) {}
    e.registerEvent(i.globalStart, v.start, 0),
      e.registerEvent(i.globalEnd, v.end, 0),
      window.isAriaDev ? (window.ariaDev = v) : (window.aria = v);
  })();
})();
