(function() {
	function X(d, a, e) {
		var b;
		a = a.toLowerCase();
		return (b = d.__allListeners || e && (d.__allListeners = {})) && (b[a] || e && (b[a] = []))
	}
	function Y(d, a, e, b, c, g) {
		b = b && d[a];
		var f;
		for (!b && (b = d[e]); ! b && (f = (f || d).parentNode);) {
			if ("BODY" == f.tagName || g && !g(f)) return null;
			b = f[e]
		}
		return b && c && !c(b) ? Y(b, a, e, !1, c) : b
	}
	UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
	var s = window.baidu || {};
	window.baidu = s;
	window.UE = s.editor = window.UE || {};
	UE.plugins = {};
	UE.commands = {};
	UE.instants = {};
	UE.I18N = {};
	UE.version = "1.3.6";
	var I = UE.dom = {},
	q = UE.browser = function() {
		var d = navigator.userAgent.toLowerCase(),
		a = window.opera,
		e = {
			ie: /(msie\s|trident.*rv:)([\w.]+)/.test(d),
			opera: !!a && a.version,
			webkit: -1 < d.indexOf(" applewebkit/"),
			mac: -1 < d.indexOf("macintosh"),
			quirks: "BackCompat" == document.compatMode
		};
		e.gecko = "Gecko" == navigator.product && !e.webkit && !e.opera && !e.ie;
		var b = 0;
		e.ie && (b = 1 * (d.match(/(msie\s|trident.*rv:)([\w.]+)/)[2] || 0), e.ie11Compat = 11 == document.documentMode, e.ie9Compat = 9 == document.documentMode, e.ie8 = !!document.documentMode, e.ie8Compat = 8 == document.documentMode, e.ie7Compat = 7 == b && !document.documentMode || 7 == document.documentMode, e.ie6Compat = 7 > b || e.quirks, e.ie9above = 8 < b, e.ie9below = 9 > b);
		if (e.gecko) {
			var c = d.match(/rv:([\d\.]+)/);
			c && (c = c[1].split("."), b = 1E4 * c[0] + 100 * (c[1] || 0) + 1 * (c[2] || 0))
		}
		/chrome\/(\d+\.\d)/i.test(d) && (e.chrome = +RegExp.$1);
		/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(d) && !/chrome/i.test(d) && (e.safari = +(RegExp.$1 || RegExp.$2));
		e.opera && (b = parseFloat(a.version()));
		e.webkit && (b = parseFloat(d.match(/ applewebkit\/(\d+)/)[1]));
		e.version = b;
		e.isCompatible = !e.mobile && (e.ie && 6 <= b || e.gecko && 10801 <= b || e.opera && 9.5 <= b || e.air && 1 <= b || e.webkit && 522 <= b || !1);
		return e
	} (),
	H = q.ie,
	ka = q.opera,
	p = UE.utils = {
		each: function(d, a, e) {
			if (null != d) if (d.length === +d.length) for (var b = 0,
			c = d.length; b < c; b++) {
				if (!1 === a.call(e, d[b], b, d)) return ! 1
			} else for (b in d) if (d.hasOwnProperty(b) && !1 === a.call(e, d[b], b, d)) return ! 1
		},
		makeInstance: function(d) {
			var a = new Function;
			a.prototype = d;
			d = new a;
			a.prototype = null;
			return d
		},
		extend: function(d, a, e) {
			if (a) for (var b in a) e && d.hasOwnProperty(b) || (d[b] = a[b]);
			return d
		},
		extend2: function(d) {
			for (var a = arguments,
			e = 1; e < a.length; e++) {
				var b = a[e],
				c;
				for (c in b) d.hasOwnProperty(c) || (d[c] = b[c])
			}
			return d
		},
		inherits: function(d, a) {
			var e = d.prototype,
			b = p.makeInstance(a.prototype);
			p.extend(b, e, !0);
			d.prototype = b;
			return b.constructor = d
		},
		bind: function(d, a) {
			return function() {
				return d.apply(a, arguments)
			}
		},
		defer: function(d, a, e) {
			var b;
			return function() {
				e && clearTimeout(b);
				b = setTimeout(d, a)
			}
		},
		indexOf: function(d, a, e) {
			var b = -1;
			e = this.isNumber(e) ? e: 0;
			this.each(d,
			function(c, g) {
				if (g >= e && c === a) return b = g,
				!1
			});
			return b
		},
		removeItem: function(d, a) {
			for (var e = 0,
			b = d.length; e < b; e++) d[e] === a && (d.splice(e, 1), e--)
		},
		trim: function(d) {
			return d.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "")
		},
		listToMap: function(d) {
			if (!d) return {};
			d = p.isArray(d) ? d: d.split(",");
			for (var a = 0,
			e, b = {}; e = d[a++];) b[e.toUpperCase()] = b[e] = 1;
			return b
		},
		unhtml: function(d, a) {
			return d ? d.replace(a || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g,
			function(a, b) {
				return b ? a: {
					"<": "&lt;",
					"&": "&amp;",
					'"': "&quot;",
					">": "&gt;",
					"'": "&#39;"
				} [a]
			}) : ""
		},
		html: function(d) {
			return d ? d.replace(/&((g|l|quo)t|amp|#39|nbsp);/g,
			function(a) {
				return {
					"&lt;": "<",
					"&amp;": "&",
					"&quot;": '"',
					"&gt;": ">",
					"&#39;": "'",
					"&nbsp;": " "
				} [a]
			}) : ""
		},
		cssStyleToDomStyle: function() {
			var d = document.createElement("div").style,
			a = {
				"float": void 0 != d.cssFloat ? "cssFloat": void 0 != d.styleFloat ? "styleFloat": "float"
			};
			return function(e) {
				return a[e] || (a[e] = e.toLowerCase().replace(/-./g,
				function(a) {
					return a.charAt(1).toUpperCase()
				}))
			}
		} (),
		loadFile: function() {
			function d(e, b) {
				try {
					for (var c = 0,
					g; g = a[c++];) if (g.doc === e && g.url == (b.src || b.href)) return g
				} catch(f) {
					return null
				}
			}
			var a = [];
			return function(e, b, c) {
				var g = d(e, b);
				if (g) g.ready ? c && c() : g.funs.push(c);
				else if (a.push({
					doc: e,
					url: b.src || b.href,
					funs: [c]
				}), !e.body) {
					c = [];
					for (var f in b)"tag" != f && c.push(f + '="' + b[f] + '"');
					e.write("<" + b.tag + " " + c.join(" ") + " ></" + b.tag + ">")
				} else if (!b.id || !e.getElementById(b.id)) {
					var k = e.createElement(b.tag);
					delete b.tag;
					for (f in b) k.setAttribute(f, b[f]);
					k.onload = k.onreadystatechange = function() {
						if (!this.readyState || /loaded|complete/.test(this.readyState)) {
							g = d(e, b);
							if (0 < g.funs.length) {
								g.ready = 1;
								for (var a; a = g.funs.pop();) a()
							}
							k.onload = k.onreadystatechange = null
						}
					};
					k.onerror = function() {
						throw Error("The load " + (b.href || b.src) + " fails,check the url settings of file ueditor.config.js ");
					};
					e.getElementsByTagName("head")[0].appendChild(k)
				}
			}
		} (),
		isEmptyObject: function(d) {
			if (null == d) return ! 0;
			if (this.isArray(d) || this.isString(d)) return 0 === d.length;
			for (var a in d) if (d.hasOwnProperty(a)) return ! 1;
			return ! 0
		},
		fixColor: function(d, a) {
			if (/color/i.test(d) && /rgba?/.test(a)) {
				var e = a.split(",");
				if (3 < e.length) return "";
				a = "#";
				for (var b = 0,
				c; c = e[b++];) c = parseInt(c.replace(/[^\d]/gi, ""), 10).toString(16),
				a += 1 == c.length ? "0" + c: c;
				a = a.toUpperCase()
			}
			return a
		},
		optCss: function(d) {
			function a(a, b) {
				if (!a) return "";
				var f = a.top,
				k = a.bottom,
				e = a.left,
				d = a.right,
				n = "";
				if (f && e && k && d) n += ";" + b + ":" + (f == k && k == e && e == d ? f: f == k && e == d ? f + " " + e: e == d ? f + " " + e + " " + k: f + " " + d + " " + k + " " + e) + ";";
				else for (var h in a) n += ";" + b + "-" + h + ":" + a[h] + ";";
				return n
			}
			var e, b;
			d = d.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi,
			function(a, g, f, k) {
				if (1 == k.split(" ").length) switch (g) {
				case "padding":
					return ! e && (e = {}),
					e[f] = k,
					"";
				case "margin":
					return ! b && (b = {}),
					b[f] = k,
					"";
				case "border":
					return "initial" == k ? "": a
				}
				return a
			});
			d += a(e, "padding") + a(b, "margin");
			return d.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g,
			function(a, b) {
				return b ? b + ";;": ";"
			})
		},
		clone: function(d, a) {
			var e;
			a = a || {};
			for (var b in d) d.hasOwnProperty(b) && (e = d[b], "object" == typeof e ? (a[b] = p.isArray(e) ? [] : {},
			p.clone(d[b], a[b])) : a[b] = e);
			return a
		},
		transUnitToPx: function(d) {
			if (!/(pt|cm)/.test(d)) return d;
			var a;
			d.replace(/([\d.]+)(\w+)/,
			function(e, b, c) {
				d = b;
				a = c
			});
			switch (a) {
			case "cm":
				d = 25 * parseFloat(d);
				break;
			case "pt":
				d = Math.round(96 * parseFloat(d) / 72)
			}
			return d + (d ? "px": "")
		},
		domReady: function() {
			function d(e) {
				for (e.isReady = !0; e = a.pop(); e());
			}
			var a = [];
			return function(e, b) {
				b = b || window;
				var c = b.document;
				e && a.push(e);
				"complete" === c.readyState ? d(c) : (c.isReady && d(c), q.ie && 11 != q.version ? (function() {
					if (!c.isReady) {
						try {
							c.documentElement.doScroll("left")
						} catch(a) {
							setTimeout(arguments.callee, 0);
							return
						}
						d(c)
					}
				} (), b.attachEvent("onload",
				function() {
					d(c)
				})) : (c.addEventListener("DOMContentLoaded",
				function() {
					c.removeEventListener("DOMContentLoaded", arguments.callee, !1);
					d(c)
				},
				!1), b.addEventListener("load",
				function() {
					d(c)
				},
				!1)))
			}
		} (),
		cssRule: q.ie && 11 != q.version ?
		function(d, a, e) {
			var b, c;
			if (void 0 === a || a && a.nodeType && 9 == a.nodeType) {
				if (e = a && a.nodeType && 9 == a.nodeType ? a: e || document, b = e.indexList || (e.indexList = {}), c = b[d], void 0 !== c) return e.styleSheets[c].cssText
			} else {
				e = e || document;
				b = e.indexList || (e.indexList = {});
				c = b[d];
				if ("" === a) return void 0 !== c ? (e.styleSheets[c].cssText = "", delete b[d], !0) : !1;
				void 0 !== c ? sheetStyle = e.styleSheets[c] : (sheetStyle = e.createStyleSheet("", c = e.styleSheets.length), b[d] = c);
				sheetStyle.cssText = a
			}
		}: function(d, a, e) {
			var b;
			if (void 0 === a || a && a.nodeType && 9 == a.nodeType) return e = a && a.nodeType && 9 == a.nodeType ? a: e || document,
			(b = e.getElementById(d)) ? b.innerHTML: void 0;
			e = e || document;
			b = e.getElementById(d);
			if ("" === a) return b ? (b.parentNode.removeChild(b), !0) : !1;
			b ? b.innerHTML = a: (b = e.createElement("style"), b.id = d, b.innerHTML = a, e.getElementsByTagName("head")[0].appendChild(b))
		},
		sort: function(d, a) {
			a = a ||
			function(a, f) {
				return a.localeCompare(f)
			};
			for (var e = 0,
			b = d.length; e < b; e++) for (var c = e,
			g = d.length; c < g; c++) if (0 < a(d[e], d[c])) {
				var f = d[e];
				d[e] = d[c];
				d[c] = f
			}
			return d
		},
		clearEmptyAttrs: function(d) {
			for (var a in d)"" === d[a] && delete d[a];
			return d
		}
	};
	p.each("String Function Array Number RegExp Object".split(" "),
	function(d) {
		UE.utils["is" + d] = function(a) {
			return Object.prototype.toString.apply(a) == "[object " + d + "]"
		}
	});
	var V = UE.EventBase = function() {};
	V.prototype = {
		addListener: function(d, a) {
			d = p.trim(d).split(/\s+/);
			for (var e = 0,
			b; b = d[e++];) X(this, b, !0).push(a)
		},
		on: function(d, a) {
			return this.addListener(d, a)
		},
		off: function(d, a) {
			return this.removeListener(d, a)
		},
		trigger: function() {
			return this.fireEvent.apply(this, arguments)
		},
		removeListener: function(d, a) {
			d = p.trim(d).split(/\s+/);
			for (var e = 0,
			b; b = d[e++];) p.removeItem(X(this, b) || [], a)
		},
		fireEvent: function() {
			for (var d = arguments[0], d = p.trim(d).split(" "), a = 0, e; e = d[a++];) {
				var b = X(this, e),
				c,
				g,
				f;
				if (b) for (f = b.length; f--;) if (b[f]) {
					g = b[f].apply(this, arguments);
					if (!0 === g) return g;
					void 0 !== g && (c = g)
				}
				if (g = this["on" + e.toLowerCase()]) c = g.apply(this, arguments)
			}
			return c
		}
	};
	var v = I.dtd = function() {
		function d(a) {
			for (var f in a) a[f.toUpperCase()] = a[f];
			return a
		}
		var a = p.extend2,
		e = d({
			isindex: 1,
			fieldset: 1
		}),
		b = d({
			input: 1,
			button: 1,
			select: 1,
			textarea: 1,
			label: 1
		}),
		c = a(d({
			a: 1
		}), b),
		g = a({
			iframe: 1
		},
		c),
		f = d({
			hr: 1,
			ul: 1,
			menu: 1,
			div: 1,
			blockquote: 1,
			noscript: 1,
			table: 1,
			center: 1,
			address: 1,
			dir: 1,
			pre: 1,
			h5: 1,
			dl: 1,
			h4: 1,
			noframes: 1,
			h6: 1,
			ol: 1,
			h1: 1,
			h3: 1,
			h2: 1
		}),
		k = d({
			ins: 1,
			del: 1,
			script: 1,
			style: 1
		}),
		l = a(d({
			b: 1,
			acronym: 1,
			bdo: 1,
			"var": 1,
			"#": 1,
			abbr: 1,
			code: 1,
			br: 1,
			i: 1,
			cite: 1,
			kbd: 1,
			u: 1,
			strike: 1,
			s: 1,
			tt: 1,
			strong: 1,
			q: 1,
			samp: 1,
			em: 1,
			dfn: 1,
			span: 1
		}), k),
		m = a(d({
			sub: 1,
			img: 1,
			embed: 1,
			object: 1,
			sup: 1,
			basefont: 1,
			map: 1,
			applet: 1,
			font: 1,
			big: 1,
			small: 1
		}), l),
		n = a(d({
			p: 1
		}), m),
		b = a(d({
			iframe: 1
		}), m, b),
		m = d({
			img: 1,
			embed: 1,
			noscript: 1,
			br: 1,
			kbd: 1,
			center: 1,
			button: 1,
			basefont: 1,
			h5: 1,
			h4: 1,
			samp: 1,
			h6: 1,
			ol: 1,
			h1: 1,
			h3: 1,
			h2: 1,
			form: 1,
			font: 1,
			"#": 1,
			select: 1,
			menu: 1,
			ins: 1,
			abbr: 1,
			label: 1,
			code: 1,
			table: 1,
			script: 1,
			cite: 1,
			input: 1,
			iframe: 1,
			strong: 1,
			textarea: 1,
			noframes: 1,
			big: 1,
			small: 1,
			span: 1,
			hr: 1,
			sub: 1,
			bdo: 1,
			"var": 1,
			div: 1,
			object: 1,
			sup: 1,
			strike: 1,
			dir: 1,
			map: 1,
			dl: 1,
			applet: 1,
			del: 1,
			isindex: 1,
			fieldset: 1,
			ul: 1,
			b: 1,
			acronym: 1,
			a: 1,
			blockquote: 1,
			i: 1,
			u: 1,
			s: 1,
			tt: 1,
			address: 1,
			q: 1,
			pre: 1,
			p: 1,
			em: 1,
			dfn: 1
		}),
		r = a(d({
			a: 0
		}), b),
		t = d({
			tr: 1
		}),
		x = d({
			"#": 1
		}),
		w = a(d({
			param: 1
		}), m),
		u = a(d({
			form: 1
		}), e, g, f, n),
		P = d({
			li: 1,
			ol: 1,
			ul: 1
		}),
		F = d({
			style: 1,
			script: 1
		}),
		D = d({
			base: 1,
			link: 1,
			meta: 1,
			title: 1
		}),
		F = a(D, F),
		L = d({
			head: 1,
			body: 1
		}),
		W = d({
			html: 1
		}),
		q = d({
			address: 1,
			blockquote: 1,
			center: 1,
			dir: 1,
			div: 1,
			dl: 1,
			fieldset: 1,
			form: 1,
			h1: 1,
			h2: 1,
			h3: 1,
			h4: 1,
			h5: 1,
			h6: 1,
			hr: 1,
			isindex: 1,
			menu: 1,
			noframes: 1,
			ol: 1,
			p: 1,
			pre: 1,
			table: 1,
			ul: 1
		}),
		s = d({
			area: 1,
			base: 1,
			basefont: 1,
			br: 1,
			col: 1,
			command: 1,
			dialog: 1,
			embed: 1,
			hr: 1,
			img: 1,
			input: 1,
			isindex: 1,
			keygen: 1,
			link: 1,
			meta: 1,
			param: 1,
			source: 1,
			track: 1,
			wbr: 1
		});
		return d({
			$nonBodyContent: a(W, L, D),
			$block: q,
			$inline: r,
			$inlineWithA: a(d({
				a: 1
			}), r),
			$body: a(d({
				script: 1,
				style: 1
			}), q),
			$cdata: d({
				script: 1,
				style: 1
			}),
			$empty: s,
			$nonChild: d({
				iframe: 1,
				textarea: 1
			}),
			$listItem: d({
				dd: 1,
				dt: 1,
				li: 1
			}),
			$list: d({
				ul: 1,
				ol: 1,
				dl: 1
			}),
			$isNotEmpty: d({
				table: 1,
				ul: 1,
				ol: 1,
				dl: 1,
				iframe: 1,
				area: 1,
				base: 1,
				col: 1,
				hr: 1,
				img: 1,
				embed: 1,
				input: 1,
				link: 1,
				meta: 1,
				param: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1
			}),
			$removeEmpty: d({
				a: 1,
				abbr: 1,
				acronym: 1,
				address: 1,
				b: 1,
				bdo: 1,
				big: 1,
				cite: 1,
				code: 1,
				del: 1,
				dfn: 1,
				em: 1,
				font: 1,
				i: 1,
				ins: 1,
				label: 1,
				kbd: 1,
				q: 1,
				s: 1,
				samp: 1,
				small: 1,
				span: 1,
				strike: 1,
				strong: 1,
				sub: 1,
				sup: 1,
				tt: 1,
				u: 1,
				"var": 1
			}),
			$removeEmptyBlock: d({
				p: 1,
				div: 1
			}),
			$tableContent: d({
				caption: 1,
				col: 1,
				colgroup: 1,
				tbody: 1,
				td: 1,
				tfoot: 1,
				th: 1,
				thead: 1,
				tr: 1,
				table: 1
			}),
			$notTransContent: d({
				pre: 1,
				script: 1,
				style: 1,
				textarea: 1
			}),
			html: L,
			head: F,
			style: x,
			script: x,
			body: u,
			base: {},
			link: {},
			meta: {},
			title: x,
			col: {},
			tr: d({
				td: 1,
				th: 1
			}),
			img: {},
			embed: {},
			colgroup: d({
				thead: 1,
				col: 1,
				tbody: 1,
				tr: 1,
				tfoot: 1
			}),
			noscript: u,
			td: u,
			br: {},
			th: u,
			center: u,
			kbd: r,
			button: a(n, f),
			basefont: {},
			h5: r,
			h4: r,
			samp: r,
			h6: r,
			ol: P,
			h1: r,
			h3: r,
			option: x,
			h2: r,
			form: a(e, g, f, n),
			select: d({
				optgroup: 1,
				option: 1
			}),
			font: r,
			ins: r,
			menu: P,
			abbr: r,
			label: r,
			table: d({
				thead: 1,
				col: 1,
				tbody: 1,
				tr: 1,
				colgroup: 1,
				caption: 1,
				tfoot: 1
			}),
			code: r,
			tfoot: t,
			cite: r,
			li: u,
			input: {},
			iframe: u,
			strong: r,
			textarea: x,
			noframes: u,
			big: r,
			small: r,
			span: d({
				"#": 1,
				br: 1,
				b: 1,
				strong: 1,
				u: 1,
				i: 1,
				em: 1,
				sub: 1,
				sup: 1,
				strike: 1,
				span: 1
			}),
			hr: r,
			dt: r,
			sub: r,
			optgroup: d({
				option: 1
			}),
			param: {},
			bdo: r,
			"var": r,
			div: u,
			object: w,
			sup: r,
			dd: u,
			strike: r,
			area: {},
			dir: P,
			map: a(d({
				area: 1,
				form: 1,
				p: 1
			}), e, k, f),
			applet: w,
			dl: d({
				dt: 1,
				dd: 1
			}),
			del: r,
			isindex: {},
			fieldset: a(d({
				legend: 1
			}), m),
			thead: t,
			ul: P,
			acronym: r,
			b: r,
			a: a(d({
				a: 1
			}), b),
			blockquote: a(d({
				td: 1,
				tr: 1,
				tbody: 1,
				li: 1
			}), u),
			caption: r,
			i: r,
			u: r,
			tbody: t,
			s: r,
			address: a(g, n),
			tt: r,
			legend: r,
			q: r,
			pre: a(l, c),
			p: a(d({
				a: 1
			}), r),
			em: r,
			dfn: r
		})
	} (),
	da = H && 9 > q.version ? {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder"
	}: {
		tabindex: "tabIndex",
		readonly: "readOnly"
	},
	oa = p.listToMap("-webkit-box -moz-box block list-item table table-row-group table-header-group table-footer-group table-row table-column-group table-column table-cell table-caption".split(" ")),
	d = I.domUtils = {
		NODE_ELEMENT: 1,
		NODE_DOCUMENT: 9,
		NODE_TEXT: 3,
		NODE_COMMENT: 8,
		NODE_DOCUMENT_FRAGMENT: 11,
		POSITION_IDENTICAL: 0,
		POSITION_DISCONNECTED: 1,
		POSITION_FOLLOWING: 2,
		POSITION_PRECEDING: 4,
		POSITION_IS_CONTAINED: 8,
		POSITION_CONTAINS: 16,
		fillChar: H && "6" == q.version ? "\ufeff": "\u200b",
		keys: {
			8 : 1,
			46 : 1,
			16 : 1,
			17 : 1,
			18 : 1,
			37 : 1,
			38 : 1,
			39 : 1,
			40 : 1,
			13 : 1
		},
		getPosition: function(d, a) {
			if (d === a) return 0;
			var e, b = [d],
			c = [a];
			for (e = d; e = e.parentNode;) {
				if (e === a) return 10;
				b.push(e)
			}
			for (e = a; e = e.parentNode;) {
				if (e === d) return 20;
				c.push(e)
			}
			b.reverse();
			c.reverse();
			if (b[0] !== c[0]) return 1;
			for (e = -1; e++, b[e] === c[e];);
			d = b[e];
			for (a = c[e]; d = d.nextSibling;) if (d === a) return 4;
			return 2
		},
		getNodeIndex: function(d, a) {
			for (var e = d,
			b = 0; e = e.previousSibling;) a && 3 == e.nodeType ? e.nodeType != e.nextSibling.nodeType && b++:b++;
			return b
		},
		inDoc: function(h, a) {
			return 10 == d.getPosition(h, a)
		},
		findParent: function(h, a, e) {
			if (h && !d.isBody(h)) for (h = e ? h: h.parentNode; h;) {
				if (!a || a(h) || d.isBody(h)) return a && !a(h) && d.isBody(h) ? null: h;
				h = h.parentNode
			}
			return null
		},
		findParentByTagName: function(h, a, e, b) {
			a = p.listToMap(p.isArray(a) ? a: [a]);
			return d.findParent(h,
			function(c) {
				return a[c.tagName] && !(b && b(c))
			},
			e)
		},
		findParents: function(h, a, e, b) {
			for (a = a && (e && e(h) || !e) ? [h] : []; h = d.findParent(h, e);) a.push(h);
			return b ? a: a.reverse()
		},
		insertAfter: function(d, a) {
			return d.nextSibling ? d.parentNode.insertBefore(a, d.nextSibling) : d.parentNode.appendChild(a)
		},
		remove: function(d, a) {
			var e = d.parentNode,
			b;
			if (e) {
				if (a && d.hasChildNodes()) for (; b = d.firstChild;) e.insertBefore(b, d);
				e.removeChild(d)
			}
			return d
		},
		getNextDomNode: function(d, a, e, b) {
			return Y(d, "firstChild", "nextSibling", a, e, b)
		},
		getPreDomNode: function(d, a, e, b) {
			return Y(d, "lastChild", "previousSibling", a, e, b)
		},
		isBookmarkNode: function(d) {
			return 1 == d.nodeType && d.id && /^_baidu_bookmark_/i.test(d.id)
		},
		getWindow: function(d) {
			d = d.ownerDocument || d;
			return d.defaultView || d.parentWindow
		},
		getCommonAncestor: function(d, a) {
			if (d === a) return d;
			for (var e = [d], b = [a], c = d, g = -1; c = c.parentNode;) {
				if (c === a) return c;
				e.push(c)
			}
			for (c = a; c = c.parentNode;) {
				if (c === d) return c;
				b.push(c)
			}
			e.reverse();
			for (b.reverse(); g++, e[g] === b[g];);
			return 0 == g ? null: e[g - 1]
		},
		clearEmptySibling: function(h, a, e) {
			function b(a, b) {
				for (var f; a && !d.isBookmarkNode(a) && (d.isEmptyInlineElement(a) || !RegExp("[^\t\n\r" + d.fillChar + "]").test(a.nodeValue));) f = a[b],
				d.remove(a),
				a = f
			} ! a && b(h.nextSibling, "nextSibling"); ! e && b(h.previousSibling, "previousSibling")
		},
		split: function(h, a) {
			var e = h.ownerDocument;
			if (q.ie && a == h.nodeValue.length) {
				var b = e.createTextNode("");
				return d.insertAfter(h, b)
			}
			b = h.splitText(a);
			q.ie8 && (e = e.createTextNode(""), d.insertAfter(b, e), d.remove(e));
			return b
		},
		isWhitespace: function(h) {
			return ! RegExp("[^ \t\n\r" + d.fillChar + "]").test(h.nodeValue)
		},
		getXY: function(d) {
			for (var a = 0,
			e = 0; d.offsetParent;) e += d.offsetTop,
			a += d.offsetLeft,
			d = d.offsetParent;
			return {
				x: a,
				y: e
			}
		},
		on: function(d, a, e) {
			var b = p.isArray(a) ? a: p.trim(a).split(/\s+/),
			c = b.length;
			if (c) for (; c--;) if (a = b[c], d.addEventListener) d.addEventListener(a, e, !1);
			else {
				e._d || (e._d = {
					els: []
				});
				var g = a + e.toString(),
				f = p.indexOf(e._d.els, d);
				e._d[g] && -1 != f || ( - 1 == f && e._d.els.push(d), e._d[g] || (e._d[g] = function(a) {
					return e.call(a.srcElement, a || window.event)
				}), d.attachEvent("on" + a, e._d[g]))
			}
			d = null
		},
		un: function(d, a, e) {
			var b = p.isArray(a) ? a: p.trim(a).split(/\s+/),
			c = b.length;
			if (c) for (; c--;) if (a = b[c], d.removeEventListener) d.removeEventListener(a, e, !1);
			else {
				var g = a + e.toString();
				try {
					d.detachEvent("on" + a, e._d ? e._d[g] : e)
				} catch(f) {}
				e._d && e._d[g] && (a = p.indexOf(e._d.els, d), -1 != a && e._d.els.splice(a, 1), 0 == e._d.els.length && delete e._d[g])
			}
		},
		isSameElement: function(h, a) {
			if (h.tagName != a.tagName) return ! 1;
			var e = h.attributes,
			b = a.attributes;
			if (!H && e.length != b.length) return ! 1;
			for (var c, g, f = 0,
			k = 0,
			l = 0; c = e[l++];) {
				if ("style" == c.nodeName) if (c.specified && f++, d.isSameStyle(h, a)) continue;
				else return ! 1;
				if (H) if (c.specified) f++,
				g = b.getNamedItem(c.nodeName);
				else continue;
				else g = a.attributes[c.nodeName];
				if (!g.specified || c.nodeValue != g.nodeValue) return ! 1
			}
			if (H) {
				for (l = 0; g = b[l++];) g.specified && k++;
				if (f != k) return ! 1
			}
			return ! 0
		},
		isSameStyle: function(d, a) {
			var e = d.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"),
			b = a.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
			if (q.opera) {
				e = d.style;
				b = a.style;
				if (e.length != b.length) return ! 1;
				for (var c in e) if (!/^(\d+|csstext)$/i.test(c) && e[c] != b[c]) return ! 1;
				return ! 0
			}
			if (!e || !b) return e == b;
			e = e.split(";");
			b = b.split(";");
			if (e.length != b.length) return ! 1;
			c = 0;
			for (var g; g = e[c++];) if ( - 1 == p.indexOf(b, g)) return ! 1;
			return ! 0
		},
		isBlockElm: function(h) {
			return 1 == h.nodeType && (v.$block[h.tagName] || oa[d.getComputedStyle(h, "display")]) && !v.$nonChild[h.tagName]
		},
		isBody: function(d) {
			return d && 1 == d.nodeType && "body" == d.tagName.toLowerCase()
		},
		breakParent: function(h, a) {
			var e, b = h,
			c = h,
			g, f;
			do {
				b = b.parentNode;
				g ? (e = b.cloneNode(!1), e.appendChild(g), g = e, e = b.cloneNode(!1), e.appendChild(f), f = e) : (g = b.cloneNode(!1), f = g.cloneNode(!1));
				for (; e = c.previousSibling;) g.insertBefore(e, g.firstChild);
				for (; e = c.nextSibling;) f.appendChild(e);
				c = b
			} while ( a !== b );
			e = a.parentNode;
			e.insertBefore(g, a);
			e.insertBefore(f, a);
			e.insertBefore(h, f);
			d.remove(a);
			return h
		},
		isEmptyInlineElement: function(h) {
			if (1 != h.nodeType || !v.$removeEmpty[h.tagName]) return 0;
			for (h = h.firstChild; h;) {
				if (d.isBookmarkNode(h) || 1 == h.nodeType && !d.isEmptyInlineElement(h) || 3 == h.nodeType && !d.isWhitespace(h)) return 0;
				h = h.nextSibling
			}
			return 1
		},
		trimWhiteTextNode: function(h) {
			function a(a) {
				for (var b; (b = h[a]) && 3 == b.nodeType && d.isWhitespace(b);) h.removeChild(b)
			}
			a("firstChild");
			a("lastChild")
		},
		mergeChild: function(h, a, e) {
			a = d.getElementsByTagName(h, h.tagName.toLowerCase());
			for (var b = 0,
			c; c = a[b++];) if (c.parentNode && !d.isBookmarkNode(c)) if ("span" == c.tagName.toLowerCase()) {
				if (h === c.parentNode && (d.trimWhiteTextNode(h), 1 == h.childNodes.length)) {
					h.style.cssText = c.style.cssText + ";" + h.style.cssText;
					d.remove(c, !0);
					continue
				}
				c.style.cssText = h.style.cssText + ";" + c.style.cssText;
				if (e) {
					var g = e.style;
					if (g) for (var g = g.split(";"), f = 0, k; k = g[f++];) c.style[p.cssStyleToDomStyle(k.split(":")[0])] = k.split(":")[1]
				}
				d.isSameStyle(c, h) && d.remove(c, !0)
			} else d.isSameElement(h, c) && d.remove(c, !0)
		},
		getElementsByTagName: function(h, a, e) {
			if (e && p.isString(e)) {
				var b = e;
				e = function(a) {
					return d.hasClass(a, b)
				}
			}
			a = p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
			for (var c = [], g = 0, f; f = a[g++];) {
				f = h.getElementsByTagName(f);
				for (var k = 0,
				l; l = f[k++];) e && !e(l) || c.push(l)
			}
			return c
		},
		mergeToParent: function(h) {
			for (var a = h.parentNode; a && v.$removeEmpty[a.tagName];) {
				if (a.tagName == h.tagName || "A" == a.tagName) {
					d.trimWhiteTextNode(a);
					if ("SPAN" == a.tagName && !d.isSameStyle(a, h) || "A" == a.tagName && "SPAN" == h.tagName) if (1 < a.childNodes.length || a !== h.parentNode) {
						h.style.cssText = a.style.cssText + ";" + h.style.cssText;
						a = a.parentNode;
						continue
					} else a.style.cssText += ";" + h.style.cssText,
					"A" == a.tagName && (a.style.textDecoration = "underline");
					if ("A" != a.tagName) {
						a === h.parentNode && d.remove(h, !0);
						break
					}
				}
				a = a.parentNode
			}
		},
		mergeSibling: function(h, a, e) {
			function b(a, b, f) {
				var k;
				if ((k = f[a]) && !d.isBookmarkNode(k) && 1 == k.nodeType && d.isSameElement(f, k)) {
					for (; k.firstChild;)"firstChild" == b ? f.insertBefore(k.lastChild, f.firstChild) : f.appendChild(k.firstChild);
					d.remove(k)
				}
			} ! a && b("previousSibling", "firstChild", h); ! e && b("nextSibling", "lastChild", h)
		},
		unSelectable: H || q.opera ?
		function(d) {
			d.onselectstart = function() {
				return ! 1
			};
			d.onclick = d.onkeyup = d.onkeydown = function() {
				return ! 1
			};
			d.unselectable = "on";
			d.setAttribute("unselectable", "on");
			for (var a = 0,
			e; e = d.all[a++];) switch (e.tagName.toLowerCase()) {
			case "iframe":
			case "textarea":
			case "input":
			case "select":
				break;
			default:
				e.unselectable = "on",
				d.setAttribute("unselectable", "on")
			}
		}: function(d) {
			d.style.MozUserSelect = d.style.webkitUserSelect = d.style.KhtmlUserSelect = "none"
		},
		removeAttributes: function(d, a) {
			a = p.isArray(a) ? a: p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
			for (var e = 0,
			b; b = a[e++];) {
				b = da[b] || b;
				switch (b) {
				case "className":
					d[b] = "";
					break;
				case "style":
					d.style.cssText = "",
					!q.ie && d.removeAttributeNode(d.getAttributeNode("style"))
				}
				d.removeAttribute(b)
			}
		},
		createElement: function(h, a, e) {
			return d.setAttributes(h.createElement(a), e)
		},
		setAttributes: function(d, a) {
			for (var e in a) if (a.hasOwnProperty(e)) {
				var b = a[e];
				switch (e) {
				case "class":
					d.className = b;
					break;
				case "style":
					d.style.cssText = d.style.cssText + ";" + b;
					break;
				case "innerHTML":
					d[e] = b;
					break;
				case "value":
					d.value = b;
					break;
				default:
					d.setAttribute(da[e] || e, b)
				}
			}
			return d
		},
		getComputedStyle: function(h, a) {
			if ( - 1 < "width height top left".indexOf(a)) return h["offset" + a.replace(/^\w/,
			function(a) {
				return a.toUpperCase()
			})] + "px";
			3 == h.nodeType && (h = h.parentNode);
			if (q.ie && 9 > q.version && "font-size" == a && !h.style.fontSize && !v.$empty[h.tagName] && !v.$nonChild[h.tagName]) {
				var e = h.ownerDocument.createElement("span");
				e.style.cssText = "padding:0;border:0;font-family:simsun;";
				e.innerHTML = ".";
				h.appendChild(e);
				var b = e.offsetHeight;
				h.removeChild(e);
				e = null;
				return b + "px"
			}
			try {
				e = d.getStyle(h, a) || (window.getComputedStyle ? d.getWindow(h).getComputedStyle(h, "").getPropertyValue(a) : (h.currentStyle || h.style)[p.cssStyleToDomStyle(a)])
			} catch(c) {
				return ""
			}
			return p.transUnitToPx(p.fixColor(a, e))
		},
		removeClasses: function(h, a) {
			a = p.isArray(a) ? a: p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
			for (var e = 0,
			b, c = h.className; b = a[e++];) c = c.replace(RegExp("\\b" + b + "\\b"), ""); (c = p.trim(c).replace(/[ ]{2,}/g, " ")) ? h.className = c: d.removeAttributes(h, ["class"])
		},
		addClass: function(d, a) {
			if (d) {
				a = p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
				for (var e = 0,
				b, c = d.className; b = a[e++];) RegExp("\\b" + b + "\\b").test(c) || (c += " " + b);
				d.className = p.trim(c)
			}
		},
		hasClass: function(d, a) {
			if (p.isRegExp(a)) return a.test(d.className);
			a = p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
			for (var e = 0,
			b, c = d.className; b = a[e++];) if (!RegExp("\\b" + b + "\\b", "i").test(c)) return ! 1;
			return e - 1 == a.length
		},
		preventDefault: function(d) {
			d.preventDefault ? d.preventDefault() : d.returnValue = !1
		},
		removeStyle: function(h, a) {
			q.ie ? ("color" == a && (a = "(^|;)" + a), h.style.cssText = h.style.cssText.replace(RegExp(a + "[^:]*:[^;]+;?", "ig"), "")) : h.style.removeProperty ? h.style.removeProperty(a) : h.style.removeAttribute(p.cssStyleToDomStyle(a));
			h.style.cssText || d.removeAttributes(h, ["style"])
		},
		getStyle: function(d, a) {
			var e = d.style[p.cssStyleToDomStyle(a)];
			return p.fixColor(a, e)
		},
		setStyle: function(d, a, e) {
			d.style[p.cssStyleToDomStyle(a)] = e;
			p.trim(d.style.cssText) || this.removeAttributes(d, "style")
		},
		setStyles: function(h, a) {
			for (var e in a) a.hasOwnProperty(e) && d.setStyle(h, e, a[e])
		},
		removeDirtyAttr: function(d) {
			for (var a = 0,
			e, b = d.getElementsByTagName("*"); e = b[a++];) e.removeAttribute("_moz_dirty");
			d.removeAttribute("_moz_dirty")
		},
		getChildCount: function(d, a) {
			var e = 0,
			b = d.firstChild;
			for (a = a ||
			function() {
				return 1
			}; b;) a(b) && e++,
			b = b.nextSibling;
			return e
		},
		isEmptyNode: function(h) {
			return ! h.firstChild || 0 == d.getChildCount(h,
			function(a) {
				return ! d.isBr(a) && !d.isBookmarkNode(a) && !d.isWhitespace(a)
			})
		},
		clearSelectedArr: function(h) {
			for (var a; a = h.pop();) d.removeAttributes(a, ["class"])
		},
		scrollToView: function(h, a, e) {
			var b = function() {
				var b = a.document,
				d = "CSS1Compat" == b.compatMode;
				return {
					width: (d ? b.documentElement.clientWidth: b.body.clientWidth) || 0,
					height: (d ? b.documentElement.clientHeight: b.body.clientHeight) || 0
				}
			} ().height;
			e = -1 * b + e + (h.offsetHeight || 0);
			h = d.getXY(h);
			e += h.y;
			h = function(a) {
				if ("pageXOffset" in a) return {
					x: a.pageXOffset || 0,
					y: a.pageYOffset || 0
				};
				a = a.document;
				return {
					x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
					y: a.documentElement.scrollTop || a.body.scrollTop || 0
				}
			} (a).y; (e > h || e < h - b) && a.scrollTo(0, e + (0 > e ? -20 : 20))
		},
		isBr: function(d) {
			return 1 == d.nodeType && "BR" == d.tagName
		},
		isFillChar: function(h, a) {
			if (3 != h.nodeType) return ! 1;
			var e = h.nodeValue;
			return a ? RegExp("^" + d.fillChar).test(e) : !e.replace(RegExp(d.fillChar, "g"), "").length
		},
		isStartInblock: function(h) {
			h = h.cloneRange();
			var a = 0,
			e = h.startContainer,
			b;
			if (1 == e.nodeType && e.childNodes[h.startOffset]) for (var e = e.childNodes[h.startOffset], c = e.previousSibling; c && d.isFillChar(c);) e = c,
			c = c.previousSibling;
			this.isFillChar(e, !0) && 1 == h.startOffset && (h.setStartBefore(e), e = h.startContainer);
			for (; e && d.isFillChar(e);) b = e,
			e = e.previousSibling;
			b && (h.setStartBefore(b), e = h.startContainer);
			for (1 == e.nodeType && (d.isEmptyNode(e) && 1 == h.startOffset) && h.setStart(e, 0).collapse(!0); ! h.startOffset;) {
				e = h.startContainer;
				if (d.isBlockElm(e) || d.isBody(e)) {
					a = 1;
					break
				}
				var c = h.startContainer.previousSibling,
				g;
				if (c) {
					for (; c && d.isFillChar(c);) g = c,
					c = c.previousSibling;
					g ? h.setStartBefore(g) : h.setStartBefore(h.startContainer)
				} else h.setStartBefore(h.startContainer)
			}
			return a && !d.isBody(h.startContainer) ? 1 : 0
		},
		isEmptyBlock: function(h, a) {
			if (1 != h.nodeType) return 0;
			a = a || RegExp("[ \t\r\n" + d.fillChar + "]", "g");
			if (0 < h[q.ie ? "innerText": "textContent"].replace(a, "").length) return 0;
			for (var e in v.$isNotEmpty) if (h.getElementsByTagName(e).length) return 0;
			return 1
		},
		setViewportOffset: function(d, a) {
			var e = parseInt(d.style.left) | 0,
			b = parseInt(d.style.top) | 0,
			c = d.getBoundingClientRect(),
			g = a.left - c.left,
			c = a.top - c.top;
			g && (d.style.left = e + g + "px");
			c && (d.style.top = b + c + "px")
		},
		fillNode: function(h, a) {
			var e = q.ie ? h.createTextNode(d.fillChar) : h.createElement("br");
			a.innerHTML = "";
			a.appendChild(e)
		},
		moveChild: function(d, a, e) {
			for (; d.firstChild;) e && a.firstChild ? a.insertBefore(d.lastChild, a.firstChild) : a.appendChild(d.firstChild)
		},
		hasNoAttributes: function(d) {
			return q.ie ? /^<\w+\s*?>/.test(d.outerHTML) : 0 == d.attributes.length
		},
		isCustomeNode: function(d) {
			return 1 == d.nodeType && d.getAttribute("_ue_custom_node_")
		},
		isTagNode: function(d, a) {
			return 1 == d.nodeType && RegExp("\\b" + d.tagName + "\\b", "i").test(a)
		},
		filterNodeList: function(d, a, e) {
			var b = [];
			if (!p.isFunction(a)) {
				var c = a;
				a = function(a) {
					return - 1 != p.indexOf(p.isArray(c) ? c: c.split(" "), a.tagName.toLowerCase())
				}
			}
			p.each(d,
			function(d) {
				a(d) && b.push(d)
			});
			return 0 == b.length ? null: 1 != b.length && e ? b: b[0]
		},
		isInNodeEndBoundary: function(d, a) {
			var e = d.startContainer;
			if (3 == e.nodeType && d.startOffset != e.nodeValue.length || 1 == e.nodeType && d.startOffset != e.childNodes.length) return 0;
			for (; e !== a;) {
				if (e.nextSibling) return 0;
				e = e.parentNode
			}
			return 1
		},
		isBoundaryNode: function(h, a) {
			for (var e; ! d.isBody(h);) if (e = h, h = h.parentNode, e !== h[a]) return ! 1;
			return ! 0
		}
	},
	O = RegExp(d.fillChar, "g"); (function() {
		function h(a) {
			return ! a.collapsed && 1 == a.startContainer.nodeType && a.startContainer === a.endContainer && 1 == a.endOffset - a.startOffset
		}
		function a(a, f, b, c) {
			1 == f.nodeType && (v.$empty[f.tagName] || v.$nonChild[f.tagName]) && (b = d.getNodeIndex(f) + (a ? 0 : 1), f = f.parentNode);
			a ? (c.startContainer = f, c.startOffset = b, c.endContainer || c.collapse(!0)) : (c.endContainer = f, c.endOffset = b, c.startContainer || c.collapse(!1));
			c.collapsed = c.startContainer && c.endContainer && c.startContainer === c.endContainer && c.startOffset == c.endOffset;
			return c
		}
		function e(a, f) {
			var b = a.startContainer,
			c = a.endContainer,
			k = a.startOffset,
			e = a.endOffset,
			l = a.document,
			g = l.createDocumentFragment(),
			h,
			D;
			1 == b.nodeType && (b = b.childNodes[k] || (h = b.appendChild(l.createTextNode(""))));
			1 == c.nodeType && (c = c.childNodes[e] || (D = c.appendChild(l.createTextNode(""))));
			if (b === c && 3 == b.nodeType) return g.appendChild(l.createTextNode(b.substringData(k, e - k))),
			f && (b.deleteData(k, e - k), a.collapse(!0)),
			g;
			for (var p, q, s = g,
			J = d.findParents(b, !0), v = d.findParents(c, !0), z = 0; J[z] == v[z];) z++;
			for (var E = z,
			B; B = J[E]; E++) {
				p = B.nextSibling;
				B == b ? h || (3 == a.startContainer.nodeType ? (s.appendChild(l.createTextNode(b.nodeValue.slice(k))), f && b.deleteData(k, b.nodeValue.length - k)) : s.appendChild(f ? b: b.cloneNode(!0))) : (q = B.cloneNode(!1), s.appendChild(q));
				for (; p && p !== c && p !== v[E];) B = p.nextSibling,
				s.appendChild(f ? p: p.cloneNode(!0)),
				p = B;
				s = q
			}
			s = g;
			J[z] || (s.appendChild(J[z - 1].cloneNode(!1)), s = s.firstChild);
			for (E = z; k = v[E]; E++) {
				p = k.previousSibling;
				k == c ? D || 3 != a.endContainer.nodeType || (s.appendChild(l.createTextNode(c.substringData(0, e))), f && c.deleteData(0, e)) : (q = k.cloneNode(!1), s.appendChild(q));
				if (E != z || !J[z]) for (; p && p !== b;) k = p.previousSibling,
				s.insertBefore(f ? p: p.cloneNode(!0), s.firstChild),
				p = k;
				s = q
			}
			f && a.setStartBefore(v[z] ? J[z] ? v[z] : J[z - 1] : v[z - 1]).collapse(!0);
			h && d.remove(h);
			D && d.remove(D);
			return g
		}
		function b(a, f) {
			try {
				if (k && d.inDoc(k, a)) if (k.nodeValue.replace(O, "").length) k.nodeValue = k.nodeValue.replace(O, "");
				else {
					var b = k.parentNode;
					for (d.remove(k); b && d.isEmptyInlineElement(b) && (q.safari ? !(d.getPosition(b, f) & d.POSITION_CONTAINS) : !b.contains(f));) k = b.parentNode,
					d.remove(b),
					b = k
				}
			} catch(c) {}
		}
		function c(a, f) {
			var b;
			for (a = a[f]; a && d.isFillChar(a);) b = a[f],
			d.remove(a),
			a = b
		}
		var g = 0,
		f = d.fillChar,
		k, l = I.Range = function(a) {
			this.startContainer = this.startOffset = this.endContainer = this.endOffset = null;
			this.document = a;
			this.collapsed = !0
		};
		l.prototype = {
			cloneContents: function() {
				return this.collapsed ? null: e(this, 0)
			},
			deleteContents: function() {
				var a;
				this.collapsed || e(this, 1);
				q.webkit && (a = this.startContainer, 3 != a.nodeType || a.nodeValue.length || (this.setStartBefore(a).collapse(!0), d.remove(a)));
				return this
			},
			extractContents: function() {
				return this.collapsed ? null: e(this, 2)
			},
			setStart: function(f, b) {
				return a(!0, f, b, this)
			},
			setEnd: function(f, b) {
				return a(!1, f, b, this)
			},
			setStartAfter: function(a) {
				return this.setStart(a.parentNode, d.getNodeIndex(a) + 1)
			},
			setStartBefore: function(a) {
				return this.setStart(a.parentNode, d.getNodeIndex(a))
			},
			setEndAfter: function(a) {
				return this.setEnd(a.parentNode, d.getNodeIndex(a) + 1)
			},
			setEndBefore: function(a) {
				return this.setEnd(a.parentNode, d.getNodeIndex(a))
			},
			setStartAtFirst: function(a) {
				return this.setStart(a, 0)
			},
			setStartAtLast: function(a) {
				return this.setStart(a, 3 == a.nodeType ? a.nodeValue.length: a.childNodes.length)
			},
			setEndAtFirst: function(a) {
				return this.setEnd(a, 0)
			},
			setEndAtLast: function(a) {
				return this.setEnd(a, 3 == a.nodeType ? a.nodeValue.length: a.childNodes.length)
			},
			selectNode: function(a) {
				return this.setStartBefore(a).setEndAfter(a)
			},
			selectNodeContents: function(a) {
				return this.setStart(a, 0).setEndAtLast(a)
			},
			cloneRange: function() {
				return (new l(this.document)).setStart(this.startContainer, this.startOffset).setEnd(this.endContainer, this.endOffset)
			},
			collapse: function(a) {
				a ? (this.endContainer = this.startContainer, this.endOffset = this.startOffset) : (this.startContainer = this.endContainer, this.startOffset = this.endOffset);
				this.collapsed = !0;
				return this
			},
			shrinkBoundary: function(a) {
				function f(a) {
					return 1 == a.nodeType && !d.isBookmarkNode(a) && !v.$empty[a.tagName] && !v.$nonChild[a.tagName]
				}
				for (var b, c = this.collapsed; 1 == this.startContainer.nodeType && (b = this.startContainer.childNodes[this.startOffset]) && f(b);) this.setStart(b, 0);
				if (c) return this.collapse(!0);
				if (!a) for (; 1 == this.endContainer.nodeType && 0 < this.endOffset && (b = this.endContainer.childNodes[this.endOffset - 1]) && f(b);) this.setEnd(b, b.childNodes.length);
				return this
			},
			getCommonAncestor: function(a, b) {
				var f = this.startContainer,
				c = this.endContainer;
				return f === c ? a && h(this) && (f = f.childNodes[this.startOffset], 1 == f.nodeType) ? f: b && 3 == f.nodeType ? f.parentNode: f: d.getCommonAncestor(f, c)
			},
			trimBoundary: function(a) {
				this.txtToElmBoundary();
				var f = this.startContainer,
				b = this.startOffset,
				c = this.collapsed,
				k = this.endContainer;
				if (3 == f.nodeType) {
					if (0 == b) this.setStartBefore(f);
					else if (b >= f.nodeValue.length) this.setStartAfter(f);
					else {
						var e = d.split(f, b);
						f === k ? this.setEnd(e, this.endOffset - b) : f.parentNode === k && (this.endOffset += 1);
						this.setStartBefore(e)
					}
					if (c) return this.collapse(!0)
				}
				a || (b = this.endOffset, k = this.endContainer, 3 == k.nodeType && (0 == b ? this.setEndBefore(k) : (b < k.nodeValue.length && d.split(k, b), this.setEndAfter(k))));
				return this
			},
			txtToElmBoundary: function(a) {
				function f(a, b) {
					var c = a[b + "Container"],
					d = a[b + "Offset"];
					if (3 == c.nodeType) if (!d) a["set" + b.replace(/(\w)/,
					function(a) {
						return a.toUpperCase()
					}) + "Before"](c);
					else if (d >= c.nodeValue.length) a["set" + b.replace(/(\w)/,
					function(a) {
						return a.toUpperCase()
					}) + "After"](c)
				}
				if (a || !this.collapsed) f(this, "start"),
				f(this, "end");
				return this
			},
			insertNode: function(a) {
				var f = a,
				b = 1;
				11 == a.nodeType && (f = a.firstChild, b = a.childNodes.length);
				this.trimBoundary(!0);
				var c = this.startContainer,
				d = c.childNodes[this.startOffset];
				d ? c.insertBefore(a, d) : c.appendChild(a);
				f.parentNode === this.endContainer && (this.endOffset += b);
				return this.setStartBefore(f)
			},
			setCursor: function(a, f) {
				return this.collapse(!a).select(f)
			},
			createBookmark: function(a, f) {
				var b, c = this.document.createElement("span");
				c.style.cssText = "display:none;line-height:0px;";
				c.appendChild(this.document.createTextNode("\u200d"));
				c.id = "_baidu_bookmark_start_" + (f ? "": g++);
				this.collapsed || (b = c.cloneNode(!0), b.id = "_baidu_bookmark_end_" + (f ? "": g++));
				this.insertNode(c);
				b && this.collapse().insertNode(b).setEndBefore(b);
				this.setStartAfter(c);
				return {
					start: a ? c.id: c,
					end: b ? a ? b.id: b: null,
					id: a
				}
			},
			moveToBookmark: function(a) {
				var f = a.id ? this.document.getElementById(a.start) : a.start;
				a = a.end && a.id ? this.document.getElementById(a.end) : a.end;
				this.setStartBefore(f);
				d.remove(f);
				a ? (this.setEndBefore(a), d.remove(a)) : this.collapse(!0);
				return this
			},
			enlarge: function(a, f) {
				var b = d.isBody,
				c, k, e = this.document.createTextNode("");
				if (a) {
					k = this.startContainer;
					1 == k.nodeType ? k.childNodes[this.startOffset] ? c = k = k.childNodes[this.startOffset] : (k.appendChild(e), c = k = e) : c = k;
					for (;;) {
						if (d.isBlockElm(k)) {
							for (k = c; (c = k.previousSibling) && !d.isBlockElm(c);) k = c;
							this.setStartBefore(k);
							break
						}
						c = k;
						k = k.parentNode
					}
					k = this.endContainer;
					1 == k.nodeType ? ((c = k.childNodes[this.endOffset]) ? k.insertBefore(e, c) : k.appendChild(e), c = k = e) : c = k;
					for (;;) {
						if (d.isBlockElm(k)) {
							for (k = c; (c = k.nextSibling) && !d.isBlockElm(c);) k = c;
							this.setEndAfter(k);
							break
						}
						c = k;
						k = k.parentNode
					}
					e.parentNode === this.endContainer && this.endOffset--;
					d.remove(e)
				}
				if (!this.collapsed) {
					for (; ! (0 != this.startOffset || f && f(this.startContainer) || b(this.startContainer));) this.setStartBefore(this.startContainer);
					for (; ! (this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length: this.endContainer.nodeValue.length) || f && f(this.endContainer) || b(this.endContainer));) this.setEndAfter(this.endContainer)
				}
				return this
			},
			enlargeToBlockElm: function(a) {
				for (; ! d.isBlockElm(this.startContainer);) this.setStartBefore(this.startContainer);
				if (!a) for (; ! d.isBlockElm(this.endContainer);) this.setEndAfter(this.endContainer);
				return this
			},
			adjustmentBoundary: function() {
				if (!this.collapsed) {
					for (; ! d.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue": "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue": "childNodes"].length;) this.setStartAfter(this.startContainer);
					for (; ! d.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue": "childNodes"].length;) this.setEndBefore(this.endContainer)
				}
				return this
			},
			applyInlineStyle: function(a, f, b) {
				if (this.collapsed) return this;
				this.trimBoundary().enlarge(!1,
				function(a) {
					return 1 == a.nodeType && d.isBlockElm(a)
				}).adjustmentBoundary();
				for (var c = this.createBookmark(), k = c.end, e = function(a) {
					return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !d.isWhitespace(a)
				},
				l = d.getNextDomNode(c.start, !1, e), g, h, p = this.cloneRange(); l && d.getPosition(l, k) & d.POSITION_PRECEDING;) if (3 == l.nodeType || v[a][l.tagName]) {
					p.setStartBefore(l);
					for (g = l; g && (3 == g.nodeType || v[a][g.tagName]) && g !== k;) h = g,
					g = d.getNextDomNode(g, 1 == g.nodeType, null,
					function(f) {
						return v[a][f.tagName]
					});
					var l = p.setEndAfter(h).extractContents(),
					q;
					if (b && 0 < b.length) {
						var W;
						W = q = b[0].cloneNode(!1);
						for (var s = 1,
						J; J = b[s++];) q.appendChild(J.cloneNode(!1)),
						q = q.firstChild
					} else q = p.document.createElement(a);
					f && d.setAttributes(q, f);
					q.appendChild(l);
					p.insertNode(b ? W: q);
					var ca;
					"span" == a && f.style && /text\-decoration/.test(f.style) && (ca = d.findParentByTagName(q, "a", !0)) ? (d.setAttributes(ca, f), d.remove(q, !0), q = ca) : (d.mergeSibling(q), d.clearEmptySibling(q));
					d.mergeChild(q, f);
					l = d.getNextDomNode(q, !1, e);
					d.mergeToParent(q);
					if (g === k) break
				} else l = d.getNextDomNode(l, !0, e);
				return this.moveToBookmark(c)
			},
			removeInlineStyle: function(a) {
				if (this.collapsed) return this;
				a = p.isArray(a) ? a: [a];
				this.shrinkBoundary().adjustmentBoundary();
				for (var f = this.startContainer,
				b = this.endContainer;;) {
					if (1 == f.nodeType) {
						if ( - 1 < p.indexOf(a, f.tagName.toLowerCase())) break;
						if ("body" == f.tagName.toLowerCase()) {
							f = null;
							break
						}
					}
					f = f.parentNode
				}
				for (;;) {
					if (1 == b.nodeType) {
						if ( - 1 < p.indexOf(a, b.tagName.toLowerCase())) break;
						if ("body" == b.tagName.toLowerCase()) {
							b = null;
							break
						}
					}
					b = b.parentNode
				}
				var c = this.createBookmark(),
				k,
				e;
				f && (e = this.cloneRange().setEndBefore(c.start).setStartBefore(f), k = e.extractContents(), e.insertNode(k), d.clearEmptySibling(f, !0), f.parentNode.insertBefore(c.start, f));
				b && (e = this.cloneRange().setStartAfter(c.end).setEndAfter(b), k = e.extractContents(), e.insertNode(k), d.clearEmptySibling(b, !1, !0), b.parentNode.insertBefore(c.end, b.nextSibling));
				for (f = d.getNextDomNode(c.start, !1,
				function(a) {
					return 1 == a.nodeType
				}); f && f !== c.end;) b = d.getNextDomNode(f, !0,
				function(a) {
					return 1 == a.nodeType
				}),
				-1 < p.indexOf(a, f.tagName.toLowerCase()) && d.remove(f, !0),
				f = b;
				return this.moveToBookmark(c)
			},
			getClosedNode: function() {
				var a;
				if (!this.collapsed) {
					var f = this.cloneRange().adjustmentBoundary().shrinkBoundary();
					h(f) && (f = f.startContainer.childNodes[f.startOffset]) && (1 == f.nodeType && (v.$empty[f.tagName] || v.$nonChild[f.tagName])) && (a = f)
				}
				return a
			},
			select: q.ie ?
			function(a, e) {
				var l;
				this.collapsed || this.shrinkBoundary();
				var g = this.getClosedNode();
				if (g && !e) {
					try {
						l = this.document.body.createControlRange(),
						l.addElement(g),
						l.select()
					} catch(h) {}
					return this
				}
				var g = this.createBookmark(),
				w = g.start;
				l = this.document.body.createTextRange();
				l.moveToElementText(w);
				l.moveStart("character", 1);
				if (!this.collapsed) {
					var u = this.document.body.createTextRange(),
					w = g.end;
					u.moveToElementText(w);
					l.setEndPoint("EndToEnd", u)
				} else if (!a && 3 != this.startContainer.nodeType) {
					var u = this.document.createTextNode(f),
					P = this.document.createElement("span");
					P.appendChild(this.document.createTextNode(f));
					w.parentNode.insertBefore(P, w);
					w.parentNode.insertBefore(u, w);
					b(this.document, u);
					k = u;
					c(P, "previousSibling");
					c(w, "nextSibling");
					l.moveStart("character", -1);
					l.collapse(!0)
				}
				this.moveToBookmark(g);
				P && d.remove(P);
				try {
					l.select()
				} catch(F) {}
				return this
			}: function(a) {
				function e(a) {
					function f(b, c, k) {
						3 == b.nodeType && b.nodeValue.length < c && (a[k + "Offset"] = b.nodeValue.length)
					}
					f(a.startContainer, a.startOffset, "start");
					f(a.endContainer, a.endOffset, "end")
				}
				var l = d.getWindow(this.document),
				g = l.getSelection();
				q.gecko ? this.document.body.focus() : l.focus();
				if (g) {
					g.removeAllRanges();
					this.collapsed && !a && (a = l = this.startContainer, 1 == l.nodeType && (a = l.childNodes[this.startOffset]), 3 == l.nodeType && this.startOffset || (a ? a.previousSibling && 3 == a.previousSibling.nodeType: l.lastChild && 3 == l.lastChild.nodeType) || (a = this.document.createTextNode(f), this.insertNode(a), b(this.document, a), c(a, "previousSibling"), c(a, "nextSibling"), k = a, this.setStart(a, q.webkit ? 1 : 0).collapse(!0)));
					l = this.document.createRange();
					if (this.collapsed && q.opera && 1 == this.startContainer.nodeType) if (a = this.startContainer.childNodes[this.startOffset]) {
						for (; a && d.isBlockElm(a);) if (1 == a.nodeType && a.childNodes[0]) a = a.childNodes[0];
						else break;
						a && this.setStartBefore(a).collapse(!0)
					} else(a = this.startContainer.lastChild) && d.isBr(a) && this.setStartBefore(a).collapse(!0);
					e(this);
					l.setStart(this.startContainer, this.startOffset);
					l.setEnd(this.endContainer, this.endOffset);
					g.addRange(l)
				}
				return this
			},
			scrollToView: function(a, f) {
				a = a ? window: d.getWindow(this.document);
				var b = this.document.createElement("span");
				b.innerHTML = "&nbsp;";
				this.cloneRange().insertNode(b);
				d.scrollToView(b, a, f);
				d.remove(b);
				return this
			},
			inFillChar: function() {
				var a = this.startContainer;
				return this.collapsed && 3 == a.nodeType && a.nodeValue.replace(RegExp("^" + d.fillChar), "").length + 1 == a.nodeValue.length ? !0 : !1
			},
			createAddress: function(a, f) {
				function b(a) {
					for (var c = a ? k.startContainer: k.endContainer, e = d.findParents(c, !0,
					function(a) {
						return ! d.isBody(a)
					}), l = [], g = 0, m; m = e[g++];) l.push(d.getNodeIndex(m, f));
					e = 0;
					if (f) if (3 == c.nodeType) {
						for (c = c.previousSibling; c && 3 == c.nodeType;) e += c.nodeValue.replace(O, "").length,
						c = c.previousSibling;
						e += a ? k.startOffset: k.endOffset
					} else if (c = c.childNodes[a ? k.startOffset: k.endOffset]) e = d.getNodeIndex(c, f);
					else for (c = a ? k.startContainer: k.endContainer, a = c.firstChild; a;) if (d.isFillChar(a)) a = a.nextSibling;
					else if (e++, 3 == a.nodeType) for (; a && 3 == a.nodeType;) a = a.nextSibling;
					else a = a.nextSibling;
					else e = a ? d.isFillChar(c) ? 0 : k.startOffset: k.endOffset;
					0 > e && (e = 0);
					l.push(e);
					return l
				}
				var c = {},
				k = this;
				c.startAddress = b(!0);
				a || (c.endAddress = k.collapsed ? [].concat(c.startAddress) : b());
				return c
			},
			moveToAddress: function(a, f) {
				function b(a, f) {
					for (var k = c.document.body,
					d, e, l = 0,
					g, m = a.length; l < m; l++) if (g = a[l], d = k, k = k.childNodes[g], !k) {
						e = g;
						break
					}
					f ? k ? c.setStartBefore(k) : c.setStart(d, e) : k ? c.setEndBefore(k) : c.setEnd(d, e)
				}
				var c = this;
				b(a.startAddress, !0); ! f && a.endAddress && b(a.endAddress);
				return c
			},
			equals: function(a) {
				for (var f in this) if (this.hasOwnProperty(f) && this[f] !== a[f]) return ! 1;
				return ! 0
			},
			traversal: function(a, f) {
				if (this.collapsed) return this;
				for (var b = this.createBookmark(), c = b.end, k = d.getNextDomNode(b.start, !1, f); k && k !== c && d.getPosition(k, c) & d.POSITION_PRECEDING;) {
					var e = d.getNextDomNode(k, !1, f);
					a(k);
					k = e
				}
				return this.moveToBookmark(b)
			}
		}
	})(); (function() {
		function h(a, c) {
			var e = d.getNodeIndex;
			a = a.duplicate();
			a.collapse(c);
			var f = a.parentElement();
			if (!f.hasChildNodes()) return {
				container: f,
				offset: 0
			};
			for (var k = f.children,
			l, m = a.duplicate(), n = 0, h = k.length - 1, t = -1; n <= h;) {
				t = Math.floor((n + h) / 2);
				l = k[t];
				m.moveToElementText(l);
				var x = m.compareEndPoints("StartToStart", a);
				if (0 < x) h = t - 1;
				else if (0 > x) n = t + 1;
				else return {
					container: f,
					offset: e(l)
				}
			}
			if ( - 1 == t) {
				m.moveToElementText(f);
				m.setEndPoint("StartToStart", a);
				m = m.text.replace(/(\r\n|\r)/g, "\n").length;
				k = f.childNodes;
				if (!m) return l = k[k.length - 1],
				{
					container: l,
					offset: l.nodeValue.length
				};
				for (e = k.length; 0 < m;) m -= k[--e].nodeValue.length;
				return {
					container: k[e],
					offset: -m
				}
			}
			m.collapse(0 < x);
			m.setEndPoint(0 < x ? "StartToStart": "EndToStart", a);
			m = m.text.replace(/(\r\n|\r)/g, "\n").length;
			if (!m) return v.$empty[l.tagName] || v.$nonChild[l.tagName] ? {
				container: f,
				offset: e(l) + (0 < x ? 0 : 1)
			}: {
				container: l,
				offset: 0 < x ? 0 : l.childNodes.length
			};
			for (; 0 < m;) try {
				k = l,
				l = l[0 < x ? "previousSibling": "nextSibling"],
				m -= l.nodeValue.length
			} catch(w) {
				return {
					container: f,
					offset: e(k)
				}
			}
			return {
				container: l,
				offset: 0 < x ? -m: l.nodeValue.length + m
			}
		}
		function a(a, c) {
			if (a.item) c.selectNode(a.item(0));
			else {
				var d = h(a, !0);
				c.setStart(d.container, d.offset);
				0 != a.compareEndPoints("StartToEnd", a) && (d = h(a, !1), c.setEnd(d.container, d.offset))
			}
			return c
		}
		function e(a) {
			var c;
			try {
				c = a.getNative().createRange()
			} catch(d) {
				return null
			}
			var f = c.item ? c.item(0) : c.parentElement();
			return (f.ownerDocument || f) === a.document ? c: null
		} (I.Selection = function(a) {
			var c = this;
			c.document = a;
			q.ie9below && (a = d.getWindow(a).frameElement, d.on(a, "beforedeactivate",
			function() {
				c._bakIERange = c.getIERange()
			}), d.on(a, "activate",
			function() {
				try { ! e(c) && c._bakIERange && c._bakIERange.select()
				} catch(a) {}
				c._bakIERange = null
			}));
			a = a = null
		}).prototype = {
			rangeInBody: function(a, c) {
				var e = q.ie9below || c ? a.item ? a.item() : a.parentElement() : a.startContainer;
				return e === this.document.body || d.inDoc(e, this.document)
			},
			getNative: function() {
				var a = this.document;
				try {
					return a ? q.ie9below ? a.selection: d.getWindow(a).getSelection() : null
				} catch(c) {
					return null
				}
			},
			getIERange: function() {
				var a = e(this);
				return ! a && this._bakIERange ? this._bakIERange: a
			},
			cache: function() {
				this.clear();
				this._cachedRange = this.getRange();
				this._cachedStartElement = this.getStart();
				this._cachedStartElementPath = this.getStartElementPath()
			},
			getStartElementPath: function() {
				if (this._cachedStartElementPath) return this._cachedStartElementPath;
				var a = this.getStart();
				return a ? d.findParents(a, !0, null, !0) : []
			},
			clear: function() {
				this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
			},
			isFocus: function() {
				try {
					if (q.ie9below) {
						var a = e(this);
						return ! (!a || !this.rangeInBody(a))
					}
					return !! this.getNative().rangeCount
				} catch(c) {
					return ! 1
				}
			},
			getRange: function() {
				function b(a) {
					for (var f = c.document.body.firstChild,
					b = a.collapsed; f && f.firstChild;) a.setStart(f, 0),
					f = f.firstChild;
					a.startContainer || a.setStart(c.document.body, 0);
					b && a.collapse(!0)
				}
				var c = this;
				if (null != c._cachedRange) return this._cachedRange;
				var e = new s.editor.dom.Range(c.document);
				if (q.ie9below) {
					var f = c.getIERange();
					if (f) try {
						a(f, e)
					} catch(k) {
						b(e)
					} else b(e)
				} else {
					var l = c.getNative();
					if (l && l.rangeCount) f = l.getRangeAt(0),
					l = l.getRangeAt(l.rangeCount - 1),
					e.setStart(f.startContainer, f.startOffset).setEnd(l.endContainer, l.endOffset),
					e.collapsed && (d.isBody(e.startContainer) && !e.startOffset) && b(e);
					else {
						if (this._bakRange && d.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
						b(e)
					}
				}
				return this._bakRange = e
			},
			getStart: function() {
				if (this._cachedStartElement) return this._cachedStartElement;
				var a = q.ie9below ? this.getIERange() : this.getRange(),
				c,
				d;
				if (q.ie9below) {
					if (!a) return this.document.body.firstChild;
					if (a.item) return a.item(0);
					c = a.duplicate();
					0 < c.text.length && c.moveStart("character", 1);
					c.collapse(1);
					c = c.parentElement();
					for (d = a = a.parentElement(); a = a.parentNode;) if (a == c) {
						c = d;
						break
					}
				} else if (a.shrinkBoundary(), c = a.startContainer, 1 == c.nodeType && c.hasChildNodes() && (c = c.childNodes[Math.min(c.childNodes.length - 1, a.startOffset)]), 3 == c.nodeType) return c.parentNode;
				return c
			},
			getText: function() {
				var a;
				return this.isFocus() && (a = this.getNative()) ? (a = q.ie9below ? a.createRange() : a.getRangeAt(0), q.ie9below ? a.text: a.toString()) : ""
			},
			clearRange: function() {
				this.getNative()[q.ie9below ? "empty": "removeAllRanges"]()
			}
		}
	})(); (function() {
		function h(a, b) {
			var c;
			if (b.textarea) if (p.isString(b.textarea)) for (var e = 0,
			g, h = d.getElementsByTagName(a, "textarea"); g = h[e++];) {
				if (g.id == "ueditor_textarea_" + b.options.textarea) {
					c = g;
					break
				}
			} else c = b.textarea;
			c || (a.appendChild(c = d.createElement(document, "textarea", {
				name: b.options.textarea,
				id: "ueditor_textarea_" + b.options.textarea,
				style: "display:none"
			})), b.textarea = c);
			c.value = b.hasContents() ? b.options.allHtmlEnabled ? b.getAllHtml() : b.getContent(null, null, !0) : ""
		}
		function a(a) {
			for (var b in a) return b
		}
		function e(a) {
			a.langIsReady = !0;
			a.fireEvent("langReady")
		}
		var b = 0,
		c, g = UE.Editor = function(f) {
			var c = this;
			c.uid = b++;
			V.call(c);
			c.commands = {};
			c.options = p.extend(p.clone(f || {}), UEDITOR_CONFIG, !0);
			c.shortcutkeys = {};
			c.inputRules = [];
			c.outputRules = [];
			c.setOpt({
				isShow: !0,
				initialContent: "",
				initialStyle: "",
				autoClearinitialContent: !1,
				iframeCssUrl: c.options.UEDITOR_HOME_URL + "themes/iframe.css",
				textarea: "editorValue",
				focus: !1,
				focusInEnd: !0,
				autoClearEmptyNode: !0,
				fullscreen: !1,
				readonly: !1,
				zIndex: 999,
				imagePopup: !0,
				enterTag: "p",
				customDomain: !1,
				lang: "zh-cn",
				langPath: c.options.UEDITOR_HOME_URL + "lang/",
				theme: "default",
				themePath: c.options.UEDITOR_HOME_URL + "themes/",
				allHtmlEnabled: !1,
				scaleEnabled: !1,
				tableNativeEditInFF: !1,
				autoSyncData: !0,
				fileNameFormat: "{time}{rand:6}"
			});
			p.isEmptyObject(UE.I18N) ? p.loadFile(document, {
				src: c.options.langPath + c.options.lang + "/" + c.options.lang + ".js",
				tag: "script",
				type: "text/javascript",
				defer: "defer"
			},
			function() {
				UE.plugin.load(c);
				e(c)
			}) : (c.options.lang = a(UE.I18N), UE.plugin.load(c), e(c));
			UE.instants["ueditorInstant" + c.uid] = c
		};
		g.prototype = {
			ready: function(a) {
				a && (this.isReady ? a.apply(this) : this.addListener("ready", a))
			},
			setOpt: function(a, b) {
				var c = {};
				p.isString(a) ? c[a] = b: c = a;
				p.extend(this.options, c, !0)
			},
			destroy: function() {
				this.fireEvent("destroy");
				var a = this.container.parentNode,
				b = this.textarea;
				b ? b.style.display = "": (b = document.createElement("textarea"), a.parentNode.insertBefore(b, a));
				b.style.width = this.iframe.offsetWidth + "px";
				b.style.height = this.iframe.offsetHeight + "px";
				b.value = this.getContent();
				b.id = this.key;
				a.innerHTML = "";
				d.remove(a);
				var a = this.key,
				c;
				for (c in this) this.hasOwnProperty(c) && delete this[c];
				UE.delEditor(a)
			},
			render: function(a) {
				var b = this.options;
				p.isString(a) && (a = document.getElementById(a));
				if (a) {
					b.minFrameWidth = b.initialFrameWidth ? b.initialFrameWidth: b.initialFrameWidth = a.offsetWidth;
					b.initialFrameHeight ? b.minFrameHeight = b.initialFrameHeight: b.initialFrameHeight = b.minFrameHeight = a.offsetHeight;
					a.style.width = /%$/.test(b.initialFrameWidth) ? "100%": b.initialFrameWidth - parseInt(d.getComputedStyle(a, "padding-left")) - parseInt(d.getComputedStyle(a, "padding-right")) + "px";
					a.style.height = /%$/.test(b.initialFrameHeight) ? "100%": b.initialFrameHeight - parseInt(d.getComputedStyle(a, "padding-top")) - parseInt(d.getComputedStyle(a, "padding-bottom")) + "px";
					a.style.zIndex = b.zIndex;
					var c = (H && 9 > q.version ? "": "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>" + (b.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + p.unhtml(b.iframeCssUrl) + "'/>": "") + (b.initialStyle ? "<style>" + b.initialStyle + "</style>": "") + "</head><body class='view' ></body><script type='text/javascript' " + (H ? "defer='defer'": "") + " id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + this.uid + "'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);\x3c/script></html>";
					a.appendChild(d.createElement(document, "iframe", {
						id: "ueditor_" + this.uid,
						width: "100%",
						height: "100%",
						frameborder: "0",
						src: "javascript:void(function(){document.open();" + (b.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";': "") + 'document.write("' + c + '");document.close();}())'
					}));
					a.style.overflow = "hidden";
					setTimeout(function() { / %$ / .test(b.initialFrameWidth) && (b.minFrameWidth = b.initialFrameWidth = a.offsetWidth);
						/%$/.test(b.initialFrameHeight) && (b.minFrameHeight = b.initialFrameHeight = a.offsetHeight, a.style.height = b.initialFrameHeight + "px")
					})
				}
			},
			_setup: function(a) {
				var b = this,
				c = b.options;
				H ? (a.body.disabled = !0, a.body.contentEditable = !0, a.body.disabled = !1) : a.body.contentEditable = !0;
				a.body.spellcheck = !1;
				b.document = a;
				b.window = a.defaultView || a.parentWindow;
				b.iframe = b.window.frameElement;
				b.body = a.body;
				b.selection = new I.Selection(a);
				var e;
				q.gecko && (e = this.selection.getNative()) && e.removeAllRanges();
				this._initEvents();
				for (var g = this.iframe.parentNode; ! d.isBody(g); g = g.parentNode) if ("FORM" == g.tagName) {
					b.form = g;
					if (b.options.autoSyncData) d.on(b.window, "blur",
					function() {
						h(g, b)
					});
					else d.on(g, "submit",
					function() {
						h(this, b)
					});
					break
				}
				if (c.initialContent) if (c.autoClearinitialContent) {
					var r = b.execCommand;
					b.execCommand = function() {
						b.fireEvent("firstBeforeExecCommand");
						return r.apply(b, arguments)
					};
					this._setDefaultContent(c.initialContent)
				} else this.setContent(c.initialContent, !1, !0);
				d.isEmptyNode(b.body) && (b.body.innerHTML = "<p>" + (q.ie ? "": "<br/>") + "</p>");
				c.focus && setTimeout(function() {
					b.focus(b.options.focusInEnd); ! b.options.autoClearinitialContent && b._selectionChange()
				},
				0);
				b.container || (b.container = this.iframe.parentNode);
				c.fullscreen && b.ui && b.ui.setFullScreen(!0);
				try {
					b.document.execCommand("2D-position", !1, !1)
				} catch(t) {}
				try {
					b.document.execCommand("enableInlineTableEditing", !1, !1)
				} catch(x) {}
				try {
					b.document.execCommand("enableObjectResizing", !1, !1)
				} catch(w) {}
				b._bindshortcutKeys();
				b.isReady = 1;
				b.fireEvent("ready");
				c.onready && c.onready.call(b);
				if (!q.ie9below) d.on(b.window, ["blur", "focus"],
				function(a) {
					if ("blur" == a.type) {
						b._bakRange = b.selection.getRange();
						try {
							b._bakNativeRange = b.selection.getNative().getRangeAt(0),
							b.selection.getNative().removeAllRanges()
						} catch(f) {
							b._bakNativeRange = null
						}
					} else try {
						b._bakRange && b._bakRange.select()
					} catch(c) {}
				});
				q.gecko && 10902 >= q.version && (b.body.contentEditable = !1, setTimeout(function() {
					b.body.contentEditable = !0
				},
				100), setInterval(function() {
					b.body.style.height = b.iframe.offsetHeight - 20 + "px"
				},
				100)); ! c.isShow && b.setHide();
				c.readonly && b.setDisabled()
			},
			sync: function(a) { (a = a ? document.getElementById(a) : d.findParent(this.iframe.parentNode,
				function(a) {
					return "FORM" == a.tagName
				},
				!0)) && h(a, this)
			},
			setHeight: function(a, b) {
				a !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = a + "px"); ! b && (this.options.minFrameHeight = this.options.initialFrameHeight = a);
				this.body.style.height = a + "px"
			},
			addshortcutkey: function(a, b) {
				var c = {};
				b ? c[a] = b: c = a;
				p.extend(this.shortcutkeys, c)
			},
			_bindshortcutKeys: function() {
				var a = this,
				b = this.shortcutkeys;
				a.addListener("keydown",
				function(c, e) {
					var g = e.keyCode || e.which,
					h;
					for (h in b) for (var t = b[h].split(","), x = 0, w; w = t[x++];) {
						w = w.split(":");
						var u = w[0];
						w = w[1];
						if (/^(ctrl)(\+shift)?\+(\d+)$/.test(u.toLowerCase()) || /^(\d+)$/.test(u)) if ("ctrl" == RegExp.$1 && (e.ctrlKey || e.metaKey) && ("" != RegExp.$2 ? e[RegExp.$2.slice(1) + "Key"] : 1) && g == RegExp.$3 || g == RegExp.$1) - 1 != a.queryCommandState(h, w) && a.execCommand(h, w),
						d.preventDefault(e)
					}
				})
			},
			getContent: function(a, b, c, d, e) {
				a && p.isFunction(a) && (b = a, a = "");
				if (b ? !b() : !this.hasContents()) return "";
				this.fireEvent("beforegetcontent");
				b = UE.htmlparser(this.body.innerHTML, d);
				this.filterOutputRule(b);
				this.fireEvent("aftergetcontent", a, b);
				return b.toHtml(e)
			},
			getAllHtml: function() {
				var a = [];
				this.fireEvent("getAllHtml", a);
				if (q.ie && 8 < q.version) {
					var b = "";
					p.each(this.document.styleSheets,
					function(a) {
						b += a.href ? '<link rel="stylesheet" type="text/css" href="' + a.href + '" />': "<style>" + a.cssText + "</style>"
					});
					p.each(this.document.getElementsByTagName("script"),
					function(a) {
						b += a.outerHTML
					})
				}
				return "<html><head>" + (this.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + this.options.charset + '"/>': "") + (b || this.document.getElementsByTagName("head")[0].innerHTML) + a.join("\n") + "</head><body " + (H && 9 > q.version ? 'class="view"': "") + ">" + this.getContent(null, null, !0) + "</body></html>"
			},
			getPlainTxt: function() {
				var a = RegExp(d.fillChar, "g"),
				b = this.body.innerHTML.replace(/[\n\r]/g, ""),
				b = b.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/] + >/g,"").replace(/ (\n) ? <\ / ([ ^ >] + ) > /g,function(a,b,c){return v.$block[c]?"\n":b?b:""});return b.replace(a,
"").replace(/\u00a0 / g,
				" ").replace(/&nbsp;/g, " ")
			},
			getContentTxt: function() {
				return this.body[q.ie ? "innerText": "textContent"].replace(RegExp(d.fillChar, "g"), "").replace(/\u00a0/g, " ")
			},
			setContent: function(a, b, c) {
				this.fireEvent("beforesetcontent", a);
				a = UE.htmlparser(a);
				this.filterInputRule(a);
				a = a.toHtml();
				this.body.innerHTML = (b ? this.body.innerHTML: "") + a;
				if ("p" == this.options.enterTag) if (b = this.body.firstChild, !b || 1 == b.nodeType && (v.$cdata[b.tagName] || "DIV" == b.tagName && b.getAttribute("cdata_tag") || d.isCustomeNode(b)) && b === this.body.lastChild) this.body.innerHTML = "<p>" + (q.ie ? "&nbsp;": "<br/>") + "</p>" + this.body.innerHTML;
				else for (var e = this.document.createElement("p"); b;) {
					for (; b && (3 == b.nodeType || 1 == b.nodeType && v.p[b.tagName] && !v.$cdata[b.tagName]);) a = b.nextSibling,
					e.appendChild(b),
					b = a;
					if (e.firstChild) if (b) b.parentNode.insertBefore(e, b),
					e = this.document.createElement("p");
					else {
						this.body.appendChild(e);
						break
					}
					b = b.nextSibling
				}
				this.fireEvent("aftersetcontent");
				this.fireEvent("contentchange"); ! c && this._selectionChange();
				this._bakRange = this._bakIERange = this._bakNativeRange = null;
				var g;
				q.gecko && (g = this.selection.getNative()) && g.removeAllRanges();
				this.options.autoSyncData && this.form && h(this.form, this)
			},
			focus: function(a) {
				try {
					var b = this.selection.getRange();
					if (a) {
						var c = this.body.lastChild;
						c && (1 == c.nodeType && !v.$empty[c.tagName]) && (d.isEmptyBlock(c) ? b.setStartAtFirst(c) : b.setStartAtLast(c), b.collapse(!0));
						b.setCursor(!0)
					} else ! b.collapsed && d.isBody(b.startContainer) && 0 == b.startOffset && (c = this.body.firstChild) && (1 == c.nodeType && !v.$empty[c.tagName]) && b.setStartAtFirst(c).collapse(!0),
					b.select(!0);
					this.fireEvent("focus selectionchange")
				} catch(e) {}
			},
			isFocus: function() {
				return this.selection.isFocus()
			},
			blur: function() {
				var a = this.selection.getNative();
				if (a.empty && q.ie) {
					var b = document.body.createTextRange();
					b.moveToElementText(document.body);
					b.collapse(!0);
					b.select();
					a.empty()
				} else a.removeAllRanges()
			},
			_initEvents: function() {
				var a = this,
				b = a.document,
				c = a.window;
				a._proxyDomEvent = p.bind(a._proxyDomEvent, a);
				d.on(b, "click contextmenu mousedown keydown keyup keypress mouseup mouseover mouseout selectstart".split(" "), a._proxyDomEvent);
				d.on(c, ["focus", "blur"], a._proxyDomEvent);
				d.on(a.body, "drop",
				function(b) {
					q.gecko && b.stopPropagation && b.stopPropagation();
					a.fireEvent("contentchange")
				});
				d.on(b, ["mouseup", "keydown"],
				function(b) {
					"keydown" == b.type && (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) || 2 != b.button && a._selectionChange(250, b)
				})
			},
			_proxyDomEvent: function(a) {
				return ! 1 === this.fireEvent("before" + a.type.replace(/^on/, "").toLowerCase()) || !1 === this.fireEvent(a.type.replace(/^on/, ""), a) ? !1 : this.fireEvent("after" + a.type.replace(/^on/, "").toLowerCase())
			},
			_selectionChange: function(a, b) {
				var e = this,
				d = !1,
				g, h;
				q.ie && (9 > q.version && b && "mouseup" == b.type) && !this.selection.getRange().collapsed && (d = !0, g = b.clientX, h = b.clientY);
				clearTimeout(c);
				c = setTimeout(function() {
					if (e.selection && e.selection.getNative()) {
						var a;
						if (d && "None" == e.selection.getNative().type) {
							a = e.document.body.createTextRange();
							try {
								a.moveToPoint(g, h)
							} catch(c) {
								a = null
							}
						}
						var f;
						a && (f = e.selection.getIERange, e.selection.getIERange = function() {
							return a
						});
						e.selection.cache();
						f && (e.selection.getIERange = f);
						e.selection._cachedRange && e.selection._cachedStartElement && (e.fireEvent("beforeselectionchange"), e.fireEvent("selectionchange", !!b), e.fireEvent("afterselectionchange"), e.selection.clear())
					}
				},
				a || 50)
			},
			_callCmdFn: function(a, b) {
				var c = b[0].toLowerCase(),
				e;
				e = (c = this.commands[c] || UE.commands[c]) && c[a];
				if (! (c && e || "queryCommandState" != a)) return 0;
				if (e) return e.apply(this, b)
			},
			execCommand: function(a) {
				a = a.toLowerCase();
				var b, c = this.commands[a] || UE.commands[a];
				if (!c || !c.execCommand) return null;
				c.notNeedUndo || this.__hasEnterExecCommand ? (b = this._callCmdFn("execCommand", arguments), this.__hasEnterExecCommand || (c.ignoreContentChange || this._ignoreContentChange) || this.fireEvent("contentchange")) : (this.__hasEnterExecCommand = !0, -1 != this.queryCommandState.apply(this, arguments) && (this.fireEvent("saveScene"), this.fireEvent("beforeexeccommand", a), b = this._callCmdFn("execCommand", arguments), c.ignoreContentChange || this._ignoreContentChange || this.fireEvent("contentchange"), this.fireEvent("afterexeccommand", a), this.fireEvent("saveScene")), this.__hasEnterExecCommand = !1);
				this.__hasEnterExecCommand || (c.ignoreContentChange || this._ignoreContentChange) || this._selectionChange();
				return b
			},
			queryCommandState: function(a) {
				return this._callCmdFn("queryCommandState", arguments)
			},
			queryCommandValue: function(a) {
				return this._callCmdFn("queryCommandValue", arguments)
			},
			hasContents: function(a) {
				if (a) for (var b = 0,
				c; c = a[b++];) if (0 < this.document.getElementsByTagName(c).length) return ! 0;
				if (!d.isEmptyBlock(this.body)) return ! 0;
				a = ["div"];
				for (b = 0; c = a[b++];) {
					c = d.getElementsByTagName(this.document, c);
					for (var e = 0,
					g; g = c[e++];) if (d.isCustomeNode(g)) return ! 0
				}
				return ! 1
			},
			reset: function() {
				this.fireEvent("reset")
			},
			setEnabled: function() {
				var a;
				if ("false" == this.body.contentEditable) {
					this.body.contentEditable = !0;
					a = this.selection.getRange();
					try {
						a.moveToBookmark(this.lastBk),
						delete this.lastBk
					} catch(b) {
						a.setStartAtFirst(this.body).collapse(!0)
					}
					a.select(!0);
					this.bkqueryCommandState && (this.queryCommandState = this.bkqueryCommandState, delete this.bkqueryCommandState);
					this.fireEvent("selectionchange")
				}
			},
			enable: function() {
				return this.setEnabled()
			},
			setDisabled: function(a) {
				var b = this;
				a = a ? p.isArray(a) ? a: [a] : [];
				"true" == b.body.contentEditable && (b.lastBk || (b.lastBk = b.selection.getRange().createBookmark(!0)), b.body.contentEditable = !1, b.bkqueryCommandState = b.queryCommandState, b.queryCommandState = function(c) {
					return - 1 != p.indexOf(a, c) ? b.bkqueryCommandState.apply(b, arguments) : -1
				},
				b.fireEvent("selectionchange"))
			},
			disable: function(a) {
				return this.setDisabled(a)
			},
			_setDefaultContent: function() {
				function a() {
					var b = this;
					b.document.getElementById("initContent") && (b.body.innerHTML = "<p>" + (H ? "": "<br/>") + "</p>", b.removeListener("firstBeforeExecCommand focus", a), setTimeout(function() {
						b.focus();
						b._selectionChange()
					},
					0))
				}
				return function(b) {
					this.body.innerHTML = '<p id="initContent">' + b + "</p>";
					this.addListener("firstBeforeExecCommand focus", a)
				}
			} (),
			setShow: function() {
				var a = this.selection.getRange();
				if ("none" == this.container.style.display) {
					try {
						a.moveToBookmark(this.lastBk),
						delete this.lastBk
					} catch(b) {
						a.setStartAtFirst(this.body).collapse(!0)
					}
					setTimeout(function() {
						a.select(!0)
					},
					100);
					this.container.style.display = ""
				}
			},
			show: function() {
				return this.setShow()
			},
			setHide: function() {
				this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0));
				this.container.style.display = "none"
			},
			hide: function() {
				return this.setHide()
			},
			getLang: function(a) {
				var b = UE.I18N[this.options.lang];
				if (!b) throw Error("not import language file");
				a = (a || "").split(".");
				for (var c = 0,
				e; (e = a[c++]) && (b = b[e], b););
				return b
			},
			getContentLength: function(a, b) {
				var c = this.getContent(!1, !1, !0).length;
				if (a) {
					b = (b || []).concat(["hr", "img", "iframe"]);
					for (var c = this.getContentTxt().replace(/[\t\r\n]+/g, "").length, e = 0, d; d = b[e++];) c += this.document.getElementsByTagName(d).length
				}
				return c
			},
			addInputRule: function(a) {
				this.inputRules.push(a)
			},
			filterInputRule: function(a) {
				for (var b = 0,
				c; c = this.inputRules[b++];) c.call(this, a)
			},
			addOutputRule: function(a) {
				this.outputRules.push(a)
			},
			filterOutputRule: function(a) {
				for (var b = 0,
				c; c = this.outputRules[b++];) c.call(this, a)
			}
		}; p.inherits(g, V)
	})(); UE.ajax = function() {
		function d(a) {
			var b = [],
			c;
			for (c in a)"method" != c && "timeout" != c && "async" != c && "function" != (typeof a[c]).toLowerCase() && "object" != (typeof a[c]).toLowerCase() && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
			return b.join("&")
		}
		var a = "XMLHttpRequest()";
		try {
			new ActiveXObject("Msxml2.XMLHTTP"),
			a = "ActiveXObject('Msxml2.XMLHTTP')"
		} catch(e) {
			try {
				new ActiveXObject("Microsoft.XMLHTTP"),
				a = "ActiveXObject('Microsoft.XMLHTTP')"
			} catch(b) {}
		}
		var c = new Function("return new " + a);
		return {
			request: function(a, b) {
				var e = c(),
				l = !1,
				m = {
					method: "POST",
					timeout: 5E3,
					async: !0,
					data: {},
					onsuccess: function() {},
					onerror: function() {}
				};
				"object" === typeof a && (b = a, a = b.url);
				if (e && a) {
					var n = b ? p.extend(m, b) : m,
					m = d(n);
					p.isEmptyObject(n.data) || (m += (m ? "&": "") + d(n.data));
					var r = setTimeout(function() {
						4 != e.readyState && (l = !0, e.abort(), clearTimeout(r))
					},
					n.timeout),
					t = n.method.toUpperCase(),
					x = a + ( - 1 == a.indexOf("?") ? "?": "&") + ("POST" == t ? "": m + "&noCache=" + +new Date);
					e.open(t, x, n.async);
					e.onreadystatechange = function() {
						if (4 == e.readyState) if (l || 200 != e.status) n.onerror(e);
						else n.onsuccess(e)
					};
					"POST" == t ? (e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), e.send(m)) : e.send(null)
				}
			}
		}
	} (); UE.filterWord = function() {
		function d(a) {
			return a = a.replace(/[\d.]+\w+/g,
			function(a) {
				return p.transUnitToPx(a)
			})
		}
		function a(a) {
			return a.replace(/[\t\r\n]+/g, " ").replace(/\x3c!--[\s\S]*?--\x3e/ig, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi,
			function(a) {
				if (q.opera) return "";
				try {
					if (/Bitmap/i.test(a)) return "";
					var c = a.match(/width:([ \d.]*p[tx])/i)[1],
					e = a.match(/height:([ \d.]*p[tx])/i)[1],
					f = a.match(/src=\s*"([^"]*)"/i)[1];
					return '<img width="' + d(c) + '" height="' + d(e) + '" src="' + f + '" />'
				} catch(k) {
					return ""
				}
			}).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/ig,
			function(a, c, e, d) {
				return "class" == c && "MsoListParagraph" == d ? a: ""
			}).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi,
			function(a, c, e) {
				return e.replace(/[\t\r\n ]+/g, " ")
			}).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi,
			function(a, c, e, f) {
				a = [];
				f = f.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").split(/;\s*/g);
				e = 0;
				for (var k; k = f[e]; e++) {
					var l, m = k.split(":");
					if (2 == m.length && (k = m[0].toLowerCase(), l = m[1].toLowerCase(), !(/^(background)\w*/.test(k) && 0 == l.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(k) && /^0\w+$/.test(l)))) {
						switch (k) {
						case "mso-padding-alt":
						case "mso-padding-top-alt":
						case "mso-padding-right-alt":
						case "mso-padding-bottom-alt":
						case "mso-padding-left-alt":
						case "mso-margin-alt":
						case "mso-margin-top-alt":
						case "mso-margin-right-alt":
						case "mso-margin-bottom-alt":
						case "mso-margin-left-alt":
						case "mso-height":
						case "mso-width":
						case "mso-vertical-align-alt":
							/<table/.test(c) || (a[e] = k.replace(/^mso-|-alt$/g, "") + ":" + d(l));
							continue;
						case "horiz-align":
							a[e] = "text-align:" + l;
							continue;
						case "vert-align":
							a[e] = "vertical-align:" + l;
							continue;
						case "font-color":
						case "mso-foreground":
							a[e] = "color:" + l;
							continue;
						case "mso-background":
						case "mso-highlight":
							a[e] = "background:" + l;
							continue;
						case "mso-default-height":
							a[e] = "min-height:" + d(l);
							continue;
						case "mso-default-width":
							a[e] = "min-width:" + d(l);
							continue;
						case "mso-padding-between-alt":
							a[e] = "border-collapse:separate;border-spacing:" + d(l);
							continue;
						case "text-line-through":
							if ("single" == l || "double" == l) a[e] = "text-decoration:line-through";
							continue;
						case "mso-zero-height":
							"yes" == l && (a[e] = "display:none");
							continue;
						case "margin":
							if (!/[1-9]/.test(l)) continue
						}
						/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(k) || /text\-indent|padding|margin/.test(k) && /\-[\d.]+/.test(l) || (a[e] = k + ":" + m[1])
					}
				}
				return c + (a.length ? ' style="' + a.join(";").replace(/;{2,}/g, ";") + '"': "")
			}).replace(/[\d.]+(cm|pt)/g,
			function(a) {
				return p.transUnitToPx(a)
			})
		}
		return function(e) {
			return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/ig.test(e) ? a(e) : e
		}
	} (); (function() {
		function d(a, b, c) {
			a.push(r);
			return b + (c ? 1 : -1)
		}
		function a(a, b) {
			for (var c = 0; c < b; c++) a.push(n)
		}
		function e(c, f, l, g) {
			switch (c.type) {
			case "root":
				for (var k = 0,
				n; n = c.children[k++];) l && ("element" == n.type && !v.$inlineWithA[n.tagName] && 1 < k) && (d(f, g, !0), a(f, g)),
				e(n, f, l, g);
				break;
			case "text":
				"pre" == c.parentNode.tagName ? f.push(c.data) : f.push(m[c.parentNode.tagName] ? p.html(c.data) : c.data.replace(/[ ]{2}/g, " &nbsp;"));
				break;
			case "element":
				b(c, f, l, g);
				break;
			case "comment":
				f.push("\x3c!--" + c.data + "--\x3e")
			}
			return f
		}
		function b(b, c, f, g) {
			var k = "";
			if (b.attrs) {
				var k = [],
				m = b.attrs,
				n;
				for (n in m) k.push(n + (void 0 !== m[n] ? '="' + (l[n] ? p.html(m[n]).replace(/["]/g,
				function(a) {
					return "&quot;"
				}) : p.unhtml(m[n])) + '"': ""));
				k = k.join(" ")
			}
			c.push("<" + b.tagName + (k ? " " + k: "") + (v.$empty[b.tagName] ? "/": "") + ">");
			f && (!v.$inlineWithA[b.tagName] && "pre" != b.tagName) && (b.children && b.children.length) && (g = d(c, g, !0), a(c, g));
			if (b.children && b.children.length) for (k = 0; m = b.children[k++];) f && ("element" == m.type && !v.$inlineWithA[m.tagName] && 1 < k) && (d(c, g), a(c, g)),
			e(m, c, f, g);
			v.$empty[b.tagName] || (f && (!v.$inlineWithA[b.tagName] && "pre" != b.tagName) && (b.children && b.children.length) && (g = d(c, g), a(c, g)), c.push("</" + b.tagName + ">"))
		}
		function c(a, b) {
			var e;
			if ("element" == a.type && a.getAttr("id") == b) return a;
			if (a.children && a.children.length) for (var f = 0; e = a.children[f++];) if (e = c(e, b)) return e
		}
		function g(a, b, c) {
			"element" == a.type && a.tagName == b && c.push(a);
			if (a.children && a.children.length) for (var e = 0,
			f; f = a.children[e++];) g(f, b, c)
		}
		function f(a, b) {
			if (a.children && a.children.length) for (var c = 0,
			e; e = a.children[c];) f(e, b),
			e.parentNode && (e.children && e.children.length && b(e), e.parentNode && c++);
			else b(a)
		}
		var k = UE.uNode = function(a) {
			this.type = a.type;
			this.data = a.data;
			this.tagName = a.tagName;
			this.parentNode = a.parentNode;
			this.attrs = a.attrs || {};
			this.children = a.children
		},
		l = {
			href: 1,
			src: 1,
			_src: 1,
			_href: 1,
			cdata_data: 1
		},
		m = {
			style: 1,
			script: 1
		},
		n = "    ",
		r = "\n";
		k.createElement = function(a) {
			return /[<>]/.test(a) ? UE.htmlparser(a).children[0] : new k({
				type: "element",
				children: [],
				tagName: a
			})
		};
		k.createText = function(a, b) {
			return new UE.uNode({
				type: "text",
				data: b ? a: p.unhtml(a || "")
			})
		};
		k.prototype = {
			toHtml: function(a) {
				var b = [];
				e(this, b, a, 0);
				return b.join("")
			},
			innerHTML: function(a) {
				if ("element" != this.type || v.$empty[this.tagName]) return this;
				if (p.isString(a)) {
					if (this.children) for (var b = 0,
					c; c = this.children[b++];) c.parentNode = null;
					this.children = [];
					a = UE.htmlparser(a);
					for (b = 0; c = a.children[b++];) this.children.push(c),
					c.parentNode = this;
					return this
				}
				a = new UE.uNode({
					type: "root",
					children: this.children
				});
				return a.toHtml()
			},
			innerText: function(a, b) {
				if ("element" != this.type || v.$empty[this.tagName]) return this;
				if (a) {
					if (this.children) for (var c = 0,
					e; e = this.children[c++];) e.parentNode = null;
					this.children = [];
					this.appendChild(k.createText(a, b));
					return this
				}
				return this.toHtml().replace(/<[^>]+>/g, "")
			},
			getData: function() {
				return "element" == this.type ? "": this.data
			},
			firstChild: function() {
				return this.children ? this.children[0] : null
			},
			lastChild: function() {
				return this.children ? this.children[this.children.length - 1] : null
			},
			previousSibling: function() {
				for (var a = this.parentNode,
				b = 0,
				c; c = a.children[b]; b++) if (c === this) return 0 == b ? null: a.children[b - 1]
			},
			nextSibling: function() {
				for (var a = this.parentNode,
				b = 0,
				c; c = a.children[b++];) if (c === this) return a.children[b]
			},
			replaceChild: function(a, b) {
				if (this.children) {
					a.parentNode && a.parentNode.removeChild(a);
					for (var c = 0,
					e; e = this.children[c]; c++) if (e === b) return this.children.splice(c, 1, a),
					b.parentNode = null,
					a.parentNode = this,
					a
				}
			},
			appendChild: function(a) {
				if ("root" == this.type || "element" == this.type && !v.$empty[this.tagName]) {
					this.children || (this.children = []);
					a.parentNode && a.parentNode.removeChild(a);
					for (var b = 0,
					c; c = this.children[b]; b++) if (c === a) {
						this.children.splice(b, 1);
						break
					}
					this.children.push(a);
					a.parentNode = this;
					return a
				}
			},
			insertBefore: function(a, b) {
				if (this.children) {
					a.parentNode && a.parentNode.removeChild(a);
					for (var c = 0,
					e; e = this.children[c]; c++) if (e === b) return this.children.splice(c, 0, a),
					a.parentNode = this,
					a
				}
			},
			insertAfter: function(a, b) {
				if (this.children) {
					a.parentNode && a.parentNode.removeChild(a);
					for (var c = 0,
					e; e = this.children[c]; c++) if (e === b) return this.children.splice(c + 1, 0, a),
					a.parentNode = this,
					a
				}
			},
			removeChild: function(a, b) {
				if (this.children) for (var c = 0,
				e; e = this.children[c]; c++) if (e === a) {
					this.children.splice(c, 1);
					e.parentNode = null;
					if (b && e.children && e.children.length) for (var f = 0,
					d; d = e.children[f]; f++) this.children.splice(c + f, 0, d),
					d.parentNode = this;
					return e
				}
			},
			getAttr: function(a) {
				return this.attrs && this.attrs[a.toLowerCase()]
			},
			setAttr: function(a, b) {
				if (a) if (this.attrs || (this.attrs = {}), p.isObject(a)) for (var c in a) a[c] ? this.attrs[c.toLowerCase()] = a[c] : delete this.attrs[c];
				else b ? this.attrs[a.toLowerCase()] = b: delete this.attrs[a];
				else delete this.attrs
			},
			getIndex: function() {
				for (var a = this.parentNode,
				b = 0,
				c; c = a.children[b]; b++) if (c === this) return b;
				return - 1
			},
			getNodeById: function(a) {
				var b;
				if (this.children && this.children.length) for (var e = 0; b = this.children[e++];) if (b = c(b, a)) return b
			},
			getNodesByTagName: function(a) {
				a = p.trim(a).replace(/[ ]{2,}/g, " ").split(" ");
				var b = [],
				c = this;
				p.each(a,
				function(a) {
					if (c.children && c.children.length) for (var e = 0,
					f; f = c.children[e++];) g(f, a, b)
				});
				return b
			},
			getStyle: function(a) {
				var b = this.getAttr("style");
				return b ? (a = b.match(RegExp("(^|;)\\s*" + a + ":([^;]+)", "i"))) && a[0] ? a[2] : "": ""
			},
			setStyle: function(a, b) {
				function c(a, b) {
					e = e.replace(RegExp("(^|;)\\s*" + a + ":([^;]+;?)", "gi"), "$1");
					b && (e = a + ":" + p.unhtml(b) + ";" + e)
				}
				var e = this.getAttr("style");
				e || (e = "");
				if (p.isObject(a)) for (var f in a) c(f, a[f]);
				else c(a, b);
				this.setAttr("style", p.trim(e))
			},
			traversal: function(a) {
				this.children && this.children.length && f(this, a);
				return this
			}
		}
	})(); UE.htmlparser = function(h, a) {
		function e(a, b) {
			if (n[a.tagName]) {
				var c = l.createElement(n[a.tagName]);
				a.appendChild(c);
				c.appendChild(l.createText(b))
			} else a.appendChild(l.createText(b))
		}
		function b(a, c, e) {
			var f;
			if (f = m[c]) {
				for (var d = a,
				n;
				"root" != d.type;) {
					if (p.isArray(f) ? -1 != p.indexOf(f, d.tagName) : f == d.tagName) {
						a = d;
						n = !0;
						break
					}
					d = d.parentNode
				}
				n || (a = b(a, p.isArray(f) ? f[0] : f))
			}
			f = new l({
				parentNode: a,
				type: "element",
				tagName: c.toLowerCase(),
				children: v.$empty[c] ? null: []
			});
			if (e) {
				for (d = {}; n = g.exec(e);) d[n[1].toLowerCase()] = k[n[1].toLowerCase()] ? n[2] || n[3] || n[4] : p.unhtml(n[2] || n[3] || n[4]);
				f.attrs = d
			}
			a.children.push(f);
			return v.$empty[c] ? a: f
		}
		var c = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
		g = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
		f = {
			b: 1,
			code: 1,
			i: 1,
			u: 1,
			strike: 1,
			s: 1,
			tt: 1,
			strong: 1,
			q: 1,
			samp: 1,
			em: 1,
			span: 1,
			sub: 1,
			img: 1,
			sup: 1,
			font: 1,
			big: 1,
			small: 1,
			iframe: 1,
			a: 1,
			br: 1,
			pre: 1
		};
		h = h.replace(RegExp(d.fillChar, "g"), "");
		a || (h = h.replace(RegExp("[\\r\\t\\n" + (a ? "": " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (a ? "": " ") + "]*", "g"),
		function(b, c) {
			return c && f[c.toLowerCase()] ? b.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : b.replace(RegExp("^[\\r\\n" + (a ? "": " ") + "]+"), "").replace(RegExp("[\\r\\n" + (a ? "": " ") + "]+$"), "")
		}));
		for (var k = {
			href: 1,
			src: 1
		},
		l = UE.uNode, m = {
			td: "tr",
			tr: ["tbody", "thead", "tfoot"],
			tbody: "table",
			th: "tr",
			thead: "table",
			tfoot: "table",
			caption: "table",
			li: ["ul", "ol"],
			dt: "dl",
			dd: "dl",
			option: "select"
		},
		n = {
			ol: "li",
			ul: "li"
		},
		r, t = 0, x = 0, w = new l({
			type: "root",
			children: []
		}), u = w; r = c.exec(h);) {
			t = r.index;
			try {
				if (t > x && e(u, h.slice(x, t)), r[3]) v.$cdata[u.tagName] ? e(u, r[0]) : u = b(u, r[3].toLowerCase(), r[4]);
				else if (r[1]) {
					if ("root" != u.type) if (v.$cdata[u.tagName] && !v.$cdata[r[1]]) e(u, r[0]);
					else {
						for (t = u;
						"element" == u.type && u.tagName != r[1].toLowerCase();) if (u = u.parentNode, "root" == u.type) throw u = t,
						"break";
						u = u.parentNode
					}
				} else r[2] && u.children.push(new l({
					type: "comment",
					data: r[2],
					parentNode: u
				}))
			} catch(P) {}
			x = c.lastIndex
		}
		x < h.length && e(u, h.slice(x));
		return w
	}; UE.filterNode = function() {
		function d(a, e) {
			switch (a.type) {
			case "element":
				var b;
				if (b = e[a.tagName]) if ("-" === b) a.parentNode.removeChild(a);
				else if (p.isFunction(b)) {
					var c = a.parentNode,
					g = a.getIndex();
					b(a);
					if (a.parentNode) {
						if (a.children) for (b = 0; g = a.children[b];) d(g, e),
						g.parentNode && b++
					} else for (b = g; g = c.children[b];) d(g, e),
					g.parentNode && b++
				} else {
					if ((b = b.$) && a.attrs) {
						var g = {},
						f;
						for (c in b) {
							f = a.getAttr(c);
							if ("style" == c && p.isArray(b[c])) {
								var k = [];
								p.each(b[c],
								function(b) {
									var c; (c = a.getStyle(b)) && k.push(b + ":" + c)
								});
								f = k.join(";")
							}
							f && (g[c] = f)
						}
						a.attrs = g
					}
					if (a.children) for (b = 0; g = a.children[b];) d(g, e),
					g.parentNode && b++
				} else if (v.$cdata[a.tagName]) a.parentNode.removeChild(a);
				else for (c = a.parentNode, g = a.getIndex(), a.parentNode.removeChild(a, !0), b = g; g = c.children[b];) d(g, e),
				g.parentNode && b++;
				break;
			case "comment":
				a.parentNode.removeChild(a)
			}
		}
		return function(a, e) {
			if (p.isEmptyObject(e)) return a;
			var b; (b = e["-"]) && p.each(b.split(" "),
			function(a) {
				e[a] = "-"
			});
			b = 0;
			for (var c; c = a.children[b];) d(c, e),
			c.parentNode && b++;
			return a
		}
	} (); UE.plugin = function() {
		var d = {};
		return {
			register: function(a, e, b, c) {
				b && p.isFunction(b) && (c = b, b = null);
				d[a] = {
					optionName: b || a,
					execFn: e,
					afterDisabled: c
				}
			},
			load: function(a) {
				p.each(d,
				function(e) {
					var b = e.execFn.call(a); ! 1 !== a.options[e.optionName] ? b && p.each(b,
					function(b, e) {
						switch (e.toLowerCase()) {
						case "shortcutkey":
							a.addshortcutkey(b);
							break;
						case "bindevents":
							p.each(b,
							function(b, c) {
								a.addListener(c, b)
							});
							break;
						case "bindmultievents":
							p.each(p.isArray(b) ? b: [b],
							function(b) {
								var c = p.trim(b.type).split(/\s+/);
								p.each(c,
								function(c) {
									a.addListener(c, b.handler)
								})
							});
							break;
						case "commands":
							p.each(b,
							function(b, c) {
								a.commands[c] = b
							});
							break;
						case "outputrule":
							a.addOutputRule(b);
							break;
						case "inputrule":
							a.addInputRule(b);
							break;
						case "defaultoptions":
							a.setOpt(b)
						}
					}):
					e.afterDisabled && e.afterDisabled.call(a)
				});
				p.each(UE.plugins,
				function(e) {
					e.call(a)
				})
			},
			run: function(a, e) {
				var b = d[pluginName];
				b && b.exeFn.call(e)
			}
		}
	} (); UE.plugins.defaultfilter = function() {
		var d = this;
		d.setOpt({
			allowDivTransToP: !0,
			disabledTableInTable: !0
		});
		d.addInputRule(function(a) {
			function e(a) {
				for (; a && "element" == a.type;) {
					if ("td" == a.tagName) return ! 0;
					a = a.parentNode
				}
				return ! 1
			}
			var b = this.options.allowDivTransToP,
			c;
			a.traversal(function(a) {
				if ("element" == a.type) if (v.$cdata[a.tagName] || !d.options.autoClearEmptyNode || !v.$inline[a.tagName] || v.$empty[a.tagName] || a.attrs && !p.isEmptyObject(a.attrs)) switch (a.tagName) {
				case "style":
				case "script":
					a.setAttr({
						cdata_tag:
						a.tagName,
						cdata_data: a.innerHTML() || "",
						_ue_custom_node_: "true"
					});
					a.tagName = "div";
					a.innerHTML("");
					break;
				case "a":
					(c = a.getAttr("href")) && a.setAttr("_href", c);
					break;
				case "img":
					if ((c = a.getAttr("src")) && /^data:/.test(c)) {
						a.parentNode.removeChild(a);
						break
					}
					a.setAttr("_src", a.getAttr("src"));
					break;
				case "span":
					q.webkit && (c = a.getStyle("white-space")) && /nowrap|normal/.test(c) && (a.setStyle("white-space", ""), d.options.autoClearEmptyNode && p.isEmptyObject(a.attrs) && a.parentNode.removeChild(a, !0));
					break;
				case "p":
					if (c = a.getAttr("align")) a.setAttr("align"),
					a.setStyle("text-align", c);
					p.each(a.children,
					function(b) {
						if ("element" == b.type && "p" == b.tagName) {
							var c = b.nextSibling();
							for (a.parentNode.insertAfter(b, a); c;) {
								var e = c.nextSibling();
								a.parentNode.insertAfter(c, b);
								b = c;
								c = e
							}
							return ! 1
						}
					});
					a.firstChild() || a.innerHTML(q.ie ? "&nbsp;": "<br/>");
					break;
				case "div":
					if (a.getAttr("cdata_tag")) break;
					if ((c = a.getAttr("class")) && /^line number\d+/.test(c)) break;
					if (!b) break;
					for (var f, k = UE.uNode.createElement("p"); f = a.firstChild();)"text" != f.type && UE.dom.dtd.$block[f.tagName] ? k.firstChild() ? (a.parentNode.insertBefore(k, a), k = UE.uNode.createElement("p")) : a.parentNode.insertBefore(f, a) : k.appendChild(f);
					k.firstChild() && a.parentNode.insertBefore(k, a);
					a.parentNode.removeChild(a);
					break;
				case "dl":
					a.tagName = "ul";
					break;
				case "dt":
				case "dd":
					a.tagName = "li";
					break;
				case "li":
					(f = a.getAttr("class")) && /list\-/.test(f) || a.setAttr();
					f = a.getNodesByTagName("ol ul");
					UE.utils.each(f,
					function(b) {
						a.parentNode.insertAfter(b, a)
					});
					break;
				case "td":
				case "th":
				case "caption":
					a.children && a.children.length || a.appendChild(q.ie ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
					break;
				case "table":
					d.options.disabledTableInTable && e(a) && (a.parentNode.insertBefore(UE.uNode.createText(a.innerText()), a), a.parentNode.removeChild(a))
				} else a.firstChild() ? "span" != a.tagName || a.attrs && !p.isEmptyObject(a.attrs) || a.parentNode.removeChild(a, !0) : a.parentNode.removeChild(a)
			})
		});
		d.addOutputRule(function(a) {
			var e;
			a.traversal(function(a) {
				if ("element" == a.type) if (!d.options.autoClearEmptyNode || !v.$inline[a.tagName] || v.$empty[a.tagName] || a.attrs && !p.isEmptyObject(a.attrs)) switch (a.tagName) {
				case "div":
					if (e = a.getAttr("cdata_tag")) a.tagName = e,
					a.appendChild(UE.uNode.createText(a.getAttr("cdata_data"))),
					a.setAttr({
						cdata_tag: "",
						cdata_data: "",
						_ue_custom_node_: ""
					});
					break;
				case "a":
					(e = a.getAttr("_href")) && a.setAttr({
						href: p.html(e),
						_href: ""
					});
					break;
				case "img":
					(e = a.getAttr("_src")) && a.setAttr({
						src: a.getAttr("_src"),
						_src: ""
					})
				} else a.firstChild() ? "span" != a.tagName || a.attrs && !p.isEmptyObject(a.attrs) || a.parentNode.removeChild(a, !0) : a.parentNode.removeChild(a)
			})
		})
	}; UE.commands.inserthtml = {
		execCommand: function(h, a, e) {
			var b = this,
			c;
			if (a && !0 !== b.fireEvent("beforeinserthtml", a)) {
				c = b.selection.getRange();
				h = c.document.createElement("div");
				h.style.display = "inline";
				e || (a = UE.htmlparser(a), b.options.filterRules && UE.filterNode(a, b.options.filterRules), b.filterInputRule(a), a = a.toHtml());
				h.innerHTML = p.trim(a);
				if (!c.collapsed && (a = c.startContainer, d.isFillChar(a) && c.setStartBefore(a), a = c.endContainer, d.isFillChar(a) && c.setEndAfter(a), c.txtToElmBoundary(), c.endContainer && 1 == c.endContainer.nodeType && (a = c.endContainer.childNodes[c.endOffset]) && d.isBr(a) && c.setEndAfter(a), 0 == c.startOffset && (a = c.startContainer, d.isBoundaryNode(a, "firstChild") && (a = c.endContainer, c.endOffset == (3 == a.nodeType ? a.nodeValue.length: a.childNodes.length) && d.isBoundaryNode(a, "lastChild") && (b.body.innerHTML = "<p>" + (q.ie ? "": "<br/>") + "</p>", c.setStart(b.body.firstChild, 0).collapse(!0)))), !c.collapsed && c.deleteContents(), 1 == c.startContainer.nodeType)) {
					a = c.startContainer.childNodes[c.startOffset];
					var g;
					if (a && d.isBlockElm(a) && (g = a.previousSibling) && d.isBlockElm(g)) {
						for (c.setEnd(g, g.childNodes.length).collapse(); a.firstChild;) g.appendChild(a.firstChild);
						d.remove(a)
					}
				}
				var f, k;
				e = 0;
				var l;
				c.inFillChar() && (a = c.startContainer, d.isFillChar(a) ? (c.setStartBefore(a).collapse(!0), d.remove(a)) : d.isFillChar(a, !0) && (a.nodeValue = a.nodeValue.replace(O, ""), c.startOffset--, c.collapsed && c.collapse(!0)));
				var m = d.findParentByTagName(c.startContainer, "li", !0);
				if (m) {
					for (var n; a = h.firstChild;) {
						for (; a && (3 == a.nodeType || !d.isBlockElm(a) || "HR" == a.tagName);) n = a.nextSibling,
						c.insertNode(a).collapse(),
						f = a,
						a = n;
						if (a) if (/^(ol|ul)$/i.test(a.tagName)) {
							for (; a.firstChild;) f = a.firstChild,
							d.insertAfter(m, a.firstChild),
							m = m.nextSibling;
							d.remove(a)
						} else n = a.nextSibling,
						g = b.document.createElement("li"),
						d.insertAfter(m, g),
						g.appendChild(a),
						f = a,
						a = n,
						m = g
					}
					m = d.findParentByTagName(c.startContainer, "li", !0);
					d.isEmptyBlock(m) && d.remove(m);
					f && c.setStartAfter(f).collapse(!0).select(!0)
				} else {
					for (; a = h.firstChild;) {
						if (e) {
							for (f = b.document.createElement("p"); a && (3 == a.nodeType || !v.$block[a.tagName]);) l = a.nextSibling,
							f.appendChild(a),
							a = l;
							f.firstChild && (a = f)
						}
						c.insertNode(a);
						l = a.nextSibling;
						if (!e && a.nodeType == d.NODE_ELEMENT && d.isBlockElm(a) && (f = d.findParent(a,
						function(a) {
							return d.isBlockElm(a)
						})) && "body" != f.tagName.toLowerCase() && (!v[f.tagName][a.nodeName] || a.parentNode !== f)) {
							if (v[f.tagName][a.nodeName]) for (k = a.parentNode; k !== f;) g = k,
							k = k.parentNode;
							else g = f;
							d.breakParent(a, g || k);
							g = a.previousSibling;
							d.trimWhiteTextNode(g);
							g.childNodes.length || d.remove(g); ! q.ie && ((n = a.nextSibling) && d.isBlockElm(n) && n.lastChild && !d.isBr(n.lastChild)) && n.appendChild(b.document.createElement("br"));
							e = 1
						}
						n = a.nextSibling;
						if (!h.firstChild && n && d.isBlockElm(n)) {
							c.setStart(n, 0).collapse(!0);
							break
						}
						c.setEndAfter(a).collapse()
					}
					a = c.startContainer;
					l && d.isBr(l) && d.remove(l);
					if (d.isBlockElm(a) && d.isEmptyNode(a)) if (l = a.nextSibling) d.remove(a),
					1 == l.nodeType && v.$block[l.tagName] && c.setStart(l, 0).collapse(!0).shrinkBoundary();
					else try {
						a.innerHTML = q.ie ? d.fillChar: "<br/>"
					} catch(r) {
						c.setStartBefore(a),
						d.remove(a)
					}
					try {
						c.select(!0)
					} catch(t) {}
				}
				setTimeout(function() {
					c = b.selection.getRange();
					c.scrollToView(b.autoHeightEnabled, b.autoHeightEnabled ? d.getXY(b.iframe).y: 0);
					b.fireEvent("afterinserthtml")
				},
				200)
			}
		}
	}; UE.plugins.autotypeset = function() {
		function h(a, b) {
			if (!a || 3 == a.nodeType) return 0;
			if (d.isBr(a)) return 1;
			if (a && a.parentNode && k[a.tagName.toLowerCase()]) return l && l.contains(a) || a.getAttribute("pagebreak") ? 0 : b ? !d.isEmptyBlock(a) : d.isEmptyBlock(a, RegExp("[\\s" + d.fillChar + "]", "g"))
		}
		function a(a) {
			a.style.cssText || (d.removeAttributes(a, ["style"]), "span" == a.tagName.toLowerCase() && d.hasNoAttributes(a) && d.remove(a, !0))
		}
		function e(b, e) {
			var k;
			if (e) {
				if (!c.pasteFilter) return;
				k = this.document.createElement("div");
				k.innerHTML = e.html
			} else k = this.document.body;
			for (var t = d.getElementsByTagName(k, "*"), x = 0, w; w = t[x++];) if (!0 !== this.fireEvent("excludeNodeinautotype", w)) {
				c.clearFontSize && w.style.fontSize && (d.removeStyle(w, "font-size"), a(w));
				c.clearFontFamily && w.style.fontFamily && (d.removeStyle(w, "font-family"), a(w));
				if (h(w)) {
					if (c.mergeEmptyline) for (var u = w.nextSibling,
					p, F = d.isBr(w); h(u);) {
						p = u;
						u = p.nextSibling;
						if (F && (!u || u && !d.isBr(u))) break;
						d.remove(p)
					}
					if (c.removeEmptyline && d.inDoc(w, k) && !f[w.parentNode.tagName.toLowerCase()]) {
						if (d.isBr(w) && (u = w.nextSibling) && !d.isBr(u)) continue;
						d.remove(w);
						continue
					}
				}
				h(w, !0) && "SPAN" != w.tagName && (c.indent && (w.style.textIndent = c.indentValue), c.textAlign && (w.style.textAlign = c.textAlign));
				if (c.removeClass && w.className && !g[w.className.toLowerCase()]) {
					if (l && l.contains(w)) continue;
					d.removeAttributes(w, ["class"])
				}
				if (c.imageBlockLine && "img" == w.tagName.toLowerCase() && !w.getAttribute("emotion")) if (e) switch (F = w, c.imageBlockLine) {
				case "left":
				case "right":
				case "none":
					for (var u = F.parentNode,
					D; v.$inline[u.tagName] || "A" == u.tagName;) u = u.parentNode;
					p = u;
					if ("P" == p.tagName && "center" == d.getStyle(p, "text-align") && !d.isBody(p) && 1 == d.getChildCount(p,
					function(a) {
						return ! d.isBr(a) && !d.isWhitespace(a)
					})) if (D = p.previousSibling, u = p.nextSibling, D && u && 1 == D.nodeType && 1 == u.nodeType && D.tagName == u.tagName && d.isBlockElm(D)) {
						for (D.appendChild(p.firstChild); u.firstChild;) D.appendChild(u.firstChild);
						d.remove(p);
						d.remove(u)
					} else d.setStyle(p, "text-align", "");
					d.setStyle(F, "float", c.imageBlockLine);
					break;
				case "center":
					if ("center" != this.queryCommandValue("imagefloat")) {
						u = F.parentNode;
						d.setStyle(F, "float", "none");
						for (p = F; u && 1 == d.getChildCount(u,
						function(a) {
							return ! d.isBr(a) && !d.isWhitespace(a)
						}) && (v.$inline[u.tagName] || "A" == u.tagName);) p = u,
						u = u.parentNode;
						u = this.document.createElement("p");
						d.setAttributes(u, {
							style: "text-align:center"
						});
						p.parentNode.insertBefore(u, p);
						u.appendChild(p);
						d.setStyle(p, "float", "")
					}
				} else this.selection.getRange().selectNode(w).select(),
				this.execCommand("imagefloat", c.imageBlockLine);
				c.removeEmptyNode && c.removeTagNames[w.tagName.toLowerCase()] && (d.hasNoAttributes(w) && d.isEmptyBlock(w)) && d.remove(w)
			}
			e && (e.html = k.innerHTML)
		}
		this.setOpt({
			autotypeset: {
				mergeEmptyline: !0,
				removeClass: !0,
				removeEmptyline: !1,
				textAlign: "left",
				imageBlockLine: "center",
				pasteFilter: !1,
				clearFontSize: !1,
				clearFontFamily: !1,
				removeEmptyNode: !1,
				removeTagNames: p.extend({
					div: 1
				},
				v.$removeEmpty),
				indent: !1,
				indentValue: "2em"
			}
		});
		var b = this,
		c = b.options.autotypeset,
		g = {
			selectTdClass: 1,
			pagebreak: 1,
			anchorclass: 1
		},
		f = {
			li: 1
		},
		k = {
			div: 1,
			p: 1,
			blockquote: 1,
			center: 1,
			h1: 1,
			h2: 1,
			h3: 1,
			h4: 1,
			h5: 1,
			h6: 1,
			span: 1
		},
		l;
		c && (c.pasteFilter && b.addListener("beforepaste", e), b.commands.autotypeset = {
			execCommand: function() {
				b.removeListener("beforepaste", e);
				c.pasteFilter && b.addListener("beforepaste", e);
				e.call(b)
			}
		})
	}; UE.plugin.register("autosubmit",
	function() {
		return {
			shortcutkey: {
				autosubmit: "ctrl+13"
			},
			commands: {
				autosubmit: {
					execCommand: function() {
						var h = d.findParentByTagName(this.iframe, "form", !1);
						h && !1 !== this.fireEvent("beforesubmit") && (this.sync(), h.submit())
					}
				}
			}
		}
	}); UE.plugin.register("background",
	function() {
		function h(a) {
			var b = {};
			a = a.split(";");
			p.each(a,
			function(a) {
				var c = a.indexOf(":"),
				e = p.trim(a.substr(0, c)).toLowerCase();
				e && (b[e] = p.trim(a.substr(c + 1) || ""))
			});
			return b
		}
		function a(a) {
			if (a) {
				var c = [],
				d;
				for (d in a) a.hasOwnProperty(d) && c.push(d + ":" + a[d] + "; ");
				p.cssRule(b, c.length ? "body{" + c.join("") + "}": "", e.document)
			} else p.cssRule(b, "", e.document)
		}
		var e = this,
		b = "editor_background",
		c, g = /body[\s]*\{(.+)\}/i,
		f = e.hasContents;
		e.hasContents = function() {
			return e.queryCommandValue("background") ? !0 : f.apply(e, arguments)
		};
		return {
			bindEvents: {
				getAllHtml: function(a, b) {
					var c = this.body,
					f = d.getComputedStyle(c, "background-image"),
					g = "",
					g = 0 < f.indexOf(e.options.imagePath) ? f.substring(f.indexOf(e.options.imagePath), f.length - 1).replace(/"|\(|\)/ig, "") : "none" != f ? f.replace(/url\("?|"?\)/ig, "") : "",
					f = '<style type="text/css">body{',
					c = {
						"background-color": d.getComputedStyle(c, "background-color") || "#ffffff",
						"background-image": g ? "url(" + g + ")": "",
						"background-repeat": d.getComputedStyle(c, "background-repeat") || "",
						"background-position": q.ie ? d.getComputedStyle(c, "background-position-x") + " " + d.getComputedStyle(c, "background-position-y") : d.getComputedStyle(c, "background-position"),
						height: d.getComputedStyle(c, "height")
					},
					h;
					for (h in c) c.hasOwnProperty(h) && (f += h + ":" + c[h] + "; ");
					b.push(f + "}</style> ")
				},
				aftersetcontent: function() { ! 1 == c && a()
				}
			},
			inputRule: function(b) {
				c = !1;
				p.each(b.getNodesByTagName("p"),
				function(b) {
					var e = b.getAttr("data-background");
					e && (c = !0, a(h(e)), b.parentNode.removeChild(b))
				})
			},
			outputRule: function(a) {
				var c = (p.cssRule(b, this.document) || "").replace(/[\n\r]+/g, "").match(g);
				c && a.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + p.trim(c[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'))
			},
			commands: {
				background: {
					execCommand: function(b, c) {
						a(c)
					},
					queryCommandValue: function() {
						var a = (p.cssRule(b, this.document) || "").replace(/[\n\r]+/g, "").match(g);
						return a ? h(a[1]) : null
					},
					notNeedUndo: !0
				}
			}
		}
	}); UE.commands.imagefloat = {
		execCommand: function(h, a) {
			var e = this.selection.getRange();
			if (!e.collapsed) {
				var b = e.getClosedNode();
				if (b && "IMG" == b.tagName) switch (a) {
				case "left":
				case "right":
				case "none":
					for (var c = b.parentNode,
					g, f; v.$inline[c.tagName] || "A" == c.tagName;) c = c.parentNode;
					g = c;
					if ("P" == g.tagName && "center" == d.getStyle(g, "text-align")) {
						if (!d.isBody(g) && 1 == d.getChildCount(g,
						function(a) {
							return ! d.isBr(a) && !d.isWhitespace(a)
						})) if (c = g.previousSibling, f = g.nextSibling, c && f && 1 == c.nodeType && 1 == f.nodeType && c.tagName == f.tagName && d.isBlockElm(c)) {
							for (c.appendChild(g.firstChild); f.firstChild;) c.appendChild(f.firstChild);
							d.remove(g);
							d.remove(f)
						} else d.setStyle(g, "text-align", "");
						e.selectNode(b).select()
					}
					d.setStyle(b, "float", "none" == a ? "": a);
					"none" == a && d.removeAttributes(b, "align");
					break;
				case "center":
					if ("center" != this.queryCommandValue("imagefloat")) {
						c = b.parentNode;
						d.setStyle(b, "float", "");
						d.removeAttributes(b, "align");
						for (g = b; c && 1 == d.getChildCount(c,
						function(a) {
							return ! d.isBr(a) && !d.isWhitespace(a)
						}) && (v.$inline[c.tagName] || "A" == c.tagName);) g = c,
						c = c.parentNode;
						e.setStartBefore(g).setCursor(!1);
						c = this.document.createElement("div");
						c.appendChild(g);
						d.setStyle(g, "float", "");
						this.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + c.innerHTML + "</p>");
						g = this.document.getElementById("_img_parent_tmp");
						g.removeAttribute("id");
						g = g.firstChild;
						e.selectNode(g).select(); (f = g.parentNode.nextSibling) && d.isEmptyNode(f) && d.remove(f)
					}
				}
			}
		},
		queryCommandValue: function() {
			var h = this.selection.getRange(),
			a;
			return h.collapsed ? "none": (h = h.getClosedNode()) && 1 == h.nodeType && "IMG" == h.tagName ? (a = d.getComputedStyle(h, "float") || h.getAttribute("align"), "none" == a && (a = "center" == d.getComputedStyle(h.parentNode, "text-align") ? "center": a), {
				left: 1,
				right: 1,
				center: 1
			} [a] ? a: "none") : "none"
		},
		queryCommandState: function() {
			var d = this.selection.getRange();
			return d.collapsed ? -1 : (d = d.getClosedNode()) && 1 == d.nodeType && "IMG" == d.tagName ? 0 : -1
		}
	}; UE.commands.insertimage = {
		execCommand: function(h, a) {
			a = p.isArray(a) ? a: [a];
			if (a.length) {
				var e = this.selection.getRange(),
				b = e.getClosedNode();
				if (!b || !/img/i.test(b.tagName) || "edui-faked-video" == b.className && -1 == b.className.indexOf("edui-upload-video") || b.getAttribute("word_img")) {
					var e = [],
					b = "",
					c;
					c = a[0];
					if (1 == a.length) b = '<img src="' + c.src + '" ' + (c._src ? ' _src="' + c._src + '" ': "") + (c.width ? 'width="' + c.width + '" ': "") + (c.height ? ' height="' + c.height + '" ': "") + ("left" == c.floatStyle || "right" == c.floatStyle ? ' style="float:' + c.floatStyle + ';"': "") + (c.title && "" != c.title ? ' title="' + c.title + '"': "") + (c.border && "0" != c.border ? ' border="' + c.border + '"': "") + (c.alt && "" != c.alt ? ' alt="' + c.alt + '"': "") + (c.hspace && "0" != c.hspace ? ' hspace = "' + c.hspace + '"': "") + (c.vspace && "0" != c.vspace ? ' vspace = "' + c.vspace + '"': "") + "/>",
					"center" == c.floatStyle && (b = '<p style="text-align: center">' + b + "</p>"),
					e.push(b);
					else for (var g = 0; c = a[g++];) b = "<p " + ("center" == c.floatStyle ? 'style="text-align: center" ': "") + '><img src="' + c.src + '" ' + (c.width ? 'width="' + c.width + '" ': "") + (c._src ? ' _src="' + c._src + '" ': "") + (c.height ? ' height="' + c.height + '" ': "") + ' style="' + (c.floatStyle && "center" != c.floatStyle ? "float:" + c.floatStyle + ";": "") + (c.border || "") + '" ' + (c.title ? ' title="' + c.title + '"': "") + " /></p>",
					e.push(b);
					this.execCommand("insertHtml", e.join(""))
				} else c = a.shift(),
				g = c.floatStyle,
				delete c.floatStyle,
				d.setAttributes(b, c),
				this.execCommand("imagefloat", g),
				0 < a.length && (e.setStartAfter(b).setCursor(!1, !0), this.execCommand("insertimage", a))
			}
		}
	}; UE.plugins.justify = function() {
		var h = d.isBlockElm,
		a = {
			left: 1,
			right: 1,
			center: 1,
			justify: 1
		},
		e = function(a, c) {
			var e = a.createBookmark(),
			f = function(a) {
				return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !d.isBookmarkNode(a) : !d.isWhitespace(a)
			};
			a.enlarge(!0);
			for (var k = a.createBookmark(), l = d.getNextDomNode(k.start, !1, f), m = a.cloneRange(), n; l && !(d.getPosition(l, k.end) & d.POSITION_FOLLOWING);) if (3 != l.nodeType && h(l)) l = d.getNextDomNode(l, !0, f);
			else {
				for (m.setStartBefore(l); l && l !== k.end && !h(l);) n = l,
				l = d.getNextDomNode(l, !1, null,
				function(a) {
					return ! h(a)
				});
				m.setEndAfter(n);
				l = m.getCommonAncestor();
				if (!d.isBody(l) && h(l)) d.setStyles(l, p.isString(c) ? {
					"text-align": c
				}: c);
				else {
					l = a.document.createElement("p");
					d.setStyles(l, p.isString(c) ? {
						"text-align": c
					}: c);
					var r = m.extractContents();
					l.appendChild(r);
					m.insertNode(l)
				}
				l = d.getNextDomNode(l, !1, f)
			}
			return a.moveToBookmark(k).moveToBookmark(e)
		};
		UE.commands.justify = {
			execCommand: function(a, c) {
				var g = this.selection.getRange(),
				f;
				g.collapsed && (f = this.document.createTextNode("p"), g.insertNode(f));
				e(g, c);
				f && (g.setStartBefore(f).collapse(!0), d.remove(f));
				g.select();
				return ! 0
			},
			queryCommandValue: function() {
				var b = this.selection.getStart(),
				b = d.getComputedStyle(b, "text-align");
				return a[b] ? b: "left"
			},
			queryCommandState: function() {
				var a = this.selection.getStart();
				return a && d.findParentByTagName(a, ["td", "th", "caption"], !0) ? -1 : 0
			}
		}
	}; UE.plugins.font = function() {
		function h(a) {
			for (var b; b = a.parentNode;) if ("SPAN" == b.tagName && 1 == d.getChildCount(b,
			function(a) {
				return ! d.isBookmarkNode(a) && !d.isBr(a)
			})) b.style.cssText += a.style.cssText,
			d.remove(a, !0),
			a = b;
			else break
		}
		function a(a, b, c) {
			if (g[b] && (a.adjustmentBoundary(), !a.collapsed && 1 == a.startContainer.nodeType)) {
				var e = a.startContainer.childNodes[a.startOffset];
				if (e && d.isTagNode(e, "span")) {
					var f = a.createBookmark();
					p.each(d.getElementsByTagName(e, "span"),
					function(a) { ! a.parentNode || d.isBookmarkNode(a) || "backcolor" == b && d.getComputedStyle(a, "background-color").toLowerCase() === c || (d.removeStyle(a, g[b]), 0 == a.style.cssText.replace(/^\s+$/, "").length && d.remove(a, !0))
					});
					a.moveToBookmark(f)
				}
			}
		}
		function e(b, c, e) {
			var f = b.collapsed,
			g = b.createBookmark();
			if (f) for (f = g.start.parentNode; v.$inline[f.tagName];) f = f.parentNode;
			else f = d.getCommonAncestor(g.start, g.end);
			p.each(d.getElementsByTagName(f, "span"),
			function(a) {
				if (a.parentNode && !d.isBookmarkNode(a)) if (/\s*border\s*:\s*none;?\s*/i.test(a.style.cssText)) / ^\s * border\s * :\s * none; ? \s * $ / .test(a.style.cssText) ? d.remove(a, !0) : d.removeStyle(a, "border");
				else { / border / i.test(a.style.cssText) && ("SPAN" == a.parentNode.tagName && /border/i.test(a.parentNode.style.cssText)) && (a.style.cssText = a.style.cssText.replace(/border[^:]*:[^;]+;?/gi, ""));
					if ("fontborder" != c || "none" != e) for (var b = a.nextSibling; b && 1 == b.nodeType && "SPAN" == b.tagName;) {
						if (d.isBookmarkNode(b) && "fontborder" == c) a.appendChild(b);
						else if (b.style.cssText == a.style.cssText && (d.moveChild(b, a), d.remove(b)), a.nextSibling === b) break;
						b = a.nextSibling
					}
					h(a);
					q.ie && 8 < q.version && (b = d.findParent(a,
					function(a) {
						return "SPAN" == a.tagName && /background-color/.test(a.style.cssText)
					})) && !/background-color/.test(a.style.cssText) && (a.style.backgroundColor = b.style.backgroundColor)
				}
			});
			b.moveToBookmark(g);
			a(b, c, e)
		}
		var b = {
			forecolor: "color",
			backcolor: "background-color",
			fontsize: "font-size",
			fontfamily: "font-family",
			underline: "text-decoration",
			strikethrough: "text-decoration",
			fontborder: "border"
		},
		c = {
			underline: 1,
			strikethrough: 1,
			fontborder: 1
		},
		g = {
			forecolor: "color",
			backcolor: "background-color",
			fontsize: "font-size",
			fontfamily: "font-family"
		};
		this.setOpt({
			fontfamily: [{
				name: "songti",
				val: "\u5b8b\u4f53,SimSun"
			},
			{
				name: "yahei",
				val: "\u5fae\u8f6f\u96c5\u9ed1,Microsoft YaHei"
			},
			{
				name: "kaiti",
				val: "\u6977\u4f53,\u6977\u4f53_GB2312, SimKai"
			},
			{
				name: "heiti",
				val: "\u9ed1\u4f53, SimHei"
			},
			{
				name: "lishu",
				val: "\u96b6\u4e66, SimLi"
			},
			{
				name: "andaleMono",
				val: "andale mono"
			},
			{
				name: "arial",
				val: "arial, helvetica,sans-serif"
			},
			{
				name: "arialBlack",
				val: "arial black,avant garde"
			},
			{
				name: "comicSansMs",
				val: "comic sans ms"
			},
			{
				name: "impact",
				val: "impact,chicago"
			},
			{
				name: "timesNewRoman",
				val: "times new roman"
			}],
			fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
		});
		this.addInputRule(function(a) {
			p.each(a.getNodesByTagName("u s del font strike"),
			function(a) {
				if ("font" == a.tagName) {
					var b = [],
					c;
					for (c in a.attrs) switch (c) {
					case "size":
						b.push("font-size:" + ({
							1 : "10",
							2 : "12",
							3 : "16",
							4 : "18",
							5 : "24",
							6 : "32",
							7 : "48"
						} [a.attrs[c]] || a.attrs[c]) + "px");
						break;
					case "color":
						b.push("color:" + a.attrs[c]);
						break;
					case "face":
						b.push("font-family:" + a.attrs[c]);
						break;
					case "style":
						b.push(a.attrs[c])
					}
					a.attrs = {
						style: b.join(";")
					}
				} else b = "u" == a.tagName ? "underline": "line-through",
				a.attrs = {
					style: (a.getAttr("style") || "") + "text-decoration:" + b + ";"
				};
				a.tagName = "span"
			})
		});
		for (var f in b)(function(a, b) {
			UE.commands[a] = {
				execCommand: function(f, g) {
					g = g || (this.queryCommandState(f) ? "none": "underline" == f ? "underline": "fontborder" == f ? "1px solid #000": "line-through");
					var h = this.selection.getRange(),
					t;
					if ("default" == g) h.collapsed && (t = this.document.createTextNode("font"), h.insertNode(t).select()),
					this.execCommand("removeFormat", "span,a", b),
					t && (h.setStartBefore(t).collapse(!0), d.remove(t)),
					e(h, f, g),
					h.select();
					else if (h.collapsed) {
						var x = d.findParentByTagName(h.startContainer, "span", !0);
						t = this.document.createTextNode("font");
						if (!x || x.children.length || x[q.ie ? "innerText": "textContent"].replace(O, "").length) {
							h.insertNode(t);
							h.selectNode(t).select();
							x = h.document.createElement("span");
							if (c[a]) {
								if (d.findParentByTagName(t, "a", !0)) {
									h.setStartBefore(t).setCursor();
									d.remove(t);
									return
								}
								this.execCommand("removeFormat", "span,a", b)
							}
							x.style.cssText = b + ":" + g;
							t.parentNode.insertBefore(x, t);
							if (!q.ie || q.ie && 9 == q.version) for (var w = x.parentNode; ! d.isBlockElm(w);)"SPAN" == w.tagName && (x.style.cssText = w.style.cssText + ";" + x.style.cssText),
							w = w.parentNode;
							ka ? setTimeout(function() {
								h.setStart(x, 0).collapse(!0);
								e(h, f, g);
								h.select()
							}) : (h.setStart(x, 0).collapse(!0), e(h, f, g), h.select())
						} else h.insertNode(t),
						c[a] && (h.selectNode(t).select(), this.execCommand("removeFormat", "span,a", b, null), x = d.findParentByTagName(t, "span", !0), h.setStartBefore(t)),
						x && (x.style.cssText += ";" + b + ":" + g),
						h.collapse(!0).select();
						d.remove(t)
					} else c[a] && this.queryCommandValue(a) && this.execCommand("removeFormat", "span,a", b),
					h = this.selection.getRange(),
					h.applyInlineStyle("span", {
						style: b + ":" + g
					}),
					e(h, f, g),
					h.select();
					return ! 0
				},
				queryCommandValue: function(a) {
					var c = this.selection.getStart();
					if ("underline" == a || "strikethrough" == a) {
						for (var e = c; e && !d.isBlockElm(e) && !d.isBody(e);) {
							if (1 == e.nodeType && (a = d.getComputedStyle(e, b), "none" != a)) return a;
							e = e.parentNode
						}
						return "none"
					}
					if ("fontborder" == a) {
						for (a = c; a && v.$inline[a.tagName];) {
							if ((e = d.getComputedStyle(a, "border")) && /1px/.test(e) && /solid/.test(e)) return e;
							a = a.parentNode
						}
						return ""
					}
					return "FontSize" == a ? (e = d.getComputedStyle(c, b), (a = /^([\d\.]+)(\w+)$/.exec(e)) ? Math.floor(a[1]) + a[2] : e) : d.getComputedStyle(c, b)
				},
				queryCommandState: function(a) {
					if (!c[a]) return 0;
					var b = this.queryCommandValue(a);
					return "fontborder" == a ? /1px/.test(b) && /solid/.test(b) : "underline" == a ? /underline/.test(b) : /line\-through/.test(b)
				}
			}
		})(f, b[f])
	}; UE.plugins.link = function() {
		function h(a) {
			var e = a.startContainer,
			b = a.endContainer; (e = d.findParentByTagName(e, "a", !0)) && a.setStartBefore(e); (b = d.findParentByTagName(b, "a", !0)) && a.setEndAfter(b)
		}
		UE.commands.unlink = {
			execCommand: function() {
				var a = this.selection.getRange(),
				e;
				if (!a.collapsed || d.findParentByTagName(a.startContainer, "a", !0)) e = a.createBookmark(),
				h(a),
				a.removeInlineStyle("a").moveToBookmark(e).select()
			},
			queryCommandState: function() {
				return ! this.highlight && this.queryCommandValue("link") ? 0 : -1
			}
		};
		UE.commands.link = {
			execCommand: function(a, e) {
				var b;
				e._href && (e._href = p.unhtml(e._href, /[<">]/g));
				e.href && (e.href = p.unhtml(e.href, /[<">]/g));
				e.textValue && (e.textValue = p.unhtml(e.textValue, /[<">]/g));
				var c = b = this.selection.getRange(),
				g = c.cloneRange(),
				f = this.queryCommandValue("link");
				h(c = c.adjustmentBoundary());
				var k = c.startContainer;
				1 == k.nodeType && f && (k = k.childNodes[c.startOffset]) && (1 == k.nodeType && "A" == k.tagName && /^(?:https?|ftp|file)\s*:\s*\/\//.test(k[q.ie ? "innerText": "textContent"])) && (k[q.ie ? "innerText": "textContent"] = p.html(e.textValue || e.href));
				if (!g.collapsed || f) c.removeInlineStyle("a"),
				g = c.cloneRange();
				if (g.collapsed) {
					var f = c.document.createElement("a"),
					l = "";
					e.textValue ? (l = p.html(e.textValue), delete e.textValue) : l = p.html(e.href);
					d.setAttributes(f, e); (k = d.findParentByTagName(g.startContainer, "a", !0)) && d.isInNodeEndBoundary(g, k) && c.setStartAfter(k).collapse(!0);
					f[q.ie ? "innerText": "textContent"] = l;
					c.insertNode(f).selectNode(f)
				} else c.applyInlineStyle("a", e);
				b.collapse().select(!0)
			},
			queryCommandValue: function() {
				var a = this.selection.getRange(),
				e;
				if (a.collapsed) {
					if (e = a.startContainer, (e = 1 == e.nodeType ? e: e.parentNode) && (e = d.findParentByTagName(e, "a", !0)) && !d.isInNodeEndBoundary(a, e)) return e
				} else {
					a.shrinkBoundary();
					var b = 3 != a.startContainer.nodeType && a.startContainer.childNodes[a.startOffset] ? a.startContainer.childNodes[a.startOffset] : a.startContainer,
					c = 3 == a.endContainer.nodeType || 0 == a.endOffset ? a.endContainer: a.endContainer.childNodes[a.endOffset - 1],
					a = a.getCommonAncestor();
					e = d.findParentByTagName(a, "a", !0);
					if (!e && 1 == a.nodeType) for (var a = a.getElementsByTagName("a"), g, f, k = 0, l; l = a[k++];) if (g = d.getPosition(l, b), f = d.getPosition(l, c), (g & d.POSITION_FOLLOWING || g & d.POSITION_CONTAINS) && (f & d.POSITION_PRECEDING || f & d.POSITION_CONTAINS)) {
						e = l;
						break
					}
					return e
				}
			},
			queryCommandState: function() {
				var a = this.selection.getRange().getClosedNode();
				return ! a || "edui-faked-video" != a.className && -1 == a.className.indexOf("edui-upload-video") ? 0 : -1
			}
		}
	}; UE.plugins.insertframe = function() {
		var d = this;
		d.addListener("selectionchange",
		function() {
			d._iframe && delete d._iframe
		})
	}; UE.commands.scrawl = {
		queryCommandState: function() {
			return q.ie && 8 >= q.version ? -1 : 0
		}
	}; UE.plugins.removeformat = function() {
		this.setOpt({
			removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
			removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
		});
		this.commands.removeformat = {
			execCommand: function(h, a, e, b, c) {
				function g(a) {
					if (3 == a.nodeType || "span" != a.tagName.toLowerCase()) return 0;
					if (q.ie) {
						var b = a.attributes;
						if (b.length) {
							a = 0;
							for (var c = b.length; a < c; a++) if (b[a].specified) return 0;
							return 1
						}
					}
					return ! a.attributes.length
				}
				var f = RegExp("^(?:" + (a || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"),
				k = e ? [] : (b || this.options.removeFormatAttributes).split(",");
				h = new I.Range(this.document);
				var l, m, n = function(a) {
					return 1 == a.nodeType
				};
				h = this.selection.getRange(); (function(a) {
					var b = a.createBookmark();
					a.collapsed && a.enlarge(!0);
					if (!c) {
						var h = d.findParentByTagName(a.startContainer, "a", !0);
						h && a.setStartBefore(h); (h = d.findParentByTagName(a.endContainer, "a", !0)) && a.setEndAfter(h)
					}
					l = a.createBookmark();
					for (h = l.start; (m = h.parentNode) && !d.isBlockElm(m);) d.breakParent(h, m),
					d.clearEmptySibling(h);
					if (l.end) {
						for (h = l.end; (m = h.parentNode) && !d.isBlockElm(m);) d.breakParent(h, m),
						d.clearEmptySibling(h);
						for (var h = d.getNextDomNode(l.start, !1, n), w; h && h != l.end;) w = d.getNextDomNode(h, !0, n),
						v.$empty[h.tagName.toLowerCase()] || d.isBookmarkNode(h) || (f.test(h.tagName) ? e ? (d.removeStyle(h, e), g(h) && "text-decoration" != e && d.remove(h, !0)) : d.remove(h, !0) : v.$tableContent[h.tagName] || v.$list[h.tagName] || (d.removeAttributes(h, k), g(h) && d.remove(h, !0))),
						h = w
					}
					h = l.start.parentNode; ! d.isBlockElm(h) || (v.$tableContent[h.tagName] || v.$list[h.tagName]) || d.removeAttributes(h, k);
					h = l.end.parentNode;
					l.end && (d.isBlockElm(h) && !v.$tableContent[h.tagName] && !v.$list[h.tagName]) && d.removeAttributes(h, k);
					a.moveToBookmark(l).moveToBookmark(b);
					h = a.startContainer;
					for (w = a.collapsed; 1 == h.nodeType && d.isEmptyNode(h) && v.$removeEmpty[h.tagName];) b = h.parentNode,
					a.setStartBefore(h),
					a.startContainer === a.endContainer && a.endOffset--,
					d.remove(h),
					h = b;
					if (!w) for (h = a.endContainer; 1 == h.nodeType && d.isEmptyNode(h) && v.$removeEmpty[h.tagName];) b = h.parentNode,
					a.setEndBefore(h),
					d.remove(h),
					h = b
				})(h);
				h.select()
			}
		}
	}; UE.plugins.blockquote = function() {
		this.commands.blockquote = {
			execCommand: function(h, a) {
				var e = this.selection.getRange(),
				b = d.filterNodeList(this.selection.getStartElementPath(), "blockquote"),
				c = v.blockquote,
				g = e.createBookmark();
				if (b) {
					var c = e.startContainer,
					c = d.isBlockElm(c) ? c: d.findParent(c,
					function(a) {
						return d.isBlockElm(a)
					}),
					f = e.endContainer,
					f = d.isBlockElm(f) ? f: d.findParent(f,
					function(a) {
						return d.isBlockElm(a)
					}),
					c = d.findParentByTagName(c, "li", !0) || c,
					f = d.findParentByTagName(f, "li", !0) || f;
					"LI" == c.tagName || "TD" == c.tagName || c === b || d.isBody(c) ? d.remove(b, !0) : d.breakParent(c, b);
					c !== f && (b = d.findParentByTagName(f, "blockquote")) && ("LI" == f.tagName || "TD" == f.tagName || d.isBody(f) ? b.parentNode && d.remove(b, !0) : d.breakParent(f, b));
					for (var k = d.getElementsByTagName(this.document, "blockquote"), b = 0, l; l = k[b++];) l.childNodes.length ? d.getPosition(l, c) & d.POSITION_FOLLOWING && d.getPosition(l, f) & d.POSITION_PRECEDING && d.remove(l, !0) : d.remove(l)
				} else {
					b = e.cloneRange();
					k = f = 1 == b.startContainer.nodeType ? b.startContainer: b.startContainer.parentNode;
					for (l = 1;;) {
						if (d.isBody(f)) {
							k !== f ? e.collapsed ? (b.selectNode(k), l = 0) : b.setStartBefore(k) : b.setStart(f, 0);
							break
						}
						if (!c[f.tagName]) {
							e.collapsed ? b.selectNode(k) : b.setStartBefore(k);
							break
						}
						k = f;
						f = f.parentNode
					}
					if (l) for (k = f = f = 1 == b.endContainer.nodeType ? b.endContainer: b.endContainer.parentNode;;) {
						if (d.isBody(f)) {
							k !== f ? b.setEndAfter(k) : b.setEnd(f, f.childNodes.length);
							break
						}
						if (!c[f.tagName]) {
							b.setEndAfter(k);
							break
						}
						k = f;
						f = f.parentNode
					}
					f = e.document.createElement("blockquote");
					d.setAttributes(f, a);
					f.appendChild(b.extractContents());
					b.insertNode(f);
					c = d.getElementsByTagName(f, "blockquote");
					for (b = 0; f = c[b++];) f.parentNode && d.remove(f, !0)
				}
				e.moveToBookmark(g).select()
			},
			queryCommandState: function() {
				return d.filterNodeList(this.selection.getStartElementPath(), "blockquote") ? 1 : 0
			}
		}
	}; UE.commands.touppercase = UE.commands.tolowercase = {
		execCommand: function(h) {
			var a = this.selection.getRange();
			if (a.collapsed) return a;
			for (var e = a.createBookmark(), b = e.end, c = function(a) {
				return ! d.isBr(a) && !d.isWhitespace(a)
			},
			g = d.getNextDomNode(e.start, !1, c); g && d.getPosition(g, b) & d.POSITION_PRECEDING && (3 == g.nodeType && (g.nodeValue = g.nodeValue["touppercase" == h ? "toUpperCase": "toLowerCase"]()), g = d.getNextDomNode(g, !0, c), g !== b););
			a.moveToBookmark(e).select()
		}
	}; UE.commands.indent = {
		execCommand: function() {
			var d = this.queryCommandState("indent") ? "0em": this.options.indentValue || "2em";
			this.execCommand("Paragraph", "p", {
				style: "text-indent:" + d
			})
		},
		queryCommandState: function() {
			var h = d.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
			return h && h.style.textIndent && parseInt(h.style.textIndent) ? 1 : 0
		}
	}; UE.commands.print = {
		execCommand: function() {
			this.window.print()
		},
		notNeedUndo: 1
	}; UE.plugins.selectall = function() {
		this.commands.selectall = {
			execCommand: function() {
				var h = this.body,
				a = this.selection.getRange();
				a.selectNodeContents(h);
				d.isEmptyBlock(h) && (q.opera && (h.firstChild && 1 == h.firstChild.nodeType) && a.setStartAtFirst(h.firstChild), a.collapse(!0));
				a.select(!0)
			},
			notNeedUndo: 1
		};
		this.addshortcutkey({
			selectAll: "ctrl+65"
		})
	}; UE.plugins.paragraph = function() {
		var h = d.isBlockElm,
		a = ["TD", "LI", "PRE"],
		e = function(b, c, e, f) {
			var k = b.createBookmark(),
			l = function(a) {
				return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() && !d.isBookmarkNode(a) : !d.isWhitespace(a)
			},
			m;
			b.enlarge(!0);
			var n = b.createBookmark();
			m = d.getNextDomNode(n.start, !1, l);
			for (var r = b.cloneRange(), t; m && !(d.getPosition(m, n.end) & d.POSITION_FOLLOWING);) if (3 != m.nodeType && h(m)) m = d.getNextDomNode(m, !0, l);
			else {
				for (r.setStartBefore(m); m && m !== n.end && !h(m);) t = m,
				m = d.getNextDomNode(m, !1, null,
				function(a) {
					return ! h(a)
				});
				r.setEndAfter(t);
				m = b.document.createElement(c);
				e && (d.setAttributes(m, e), f && ("customstyle" == f && e.style) && (m.style.cssText = e.style));
				m.appendChild(r.extractContents());
				d.isEmptyNode(m) && d.fillChar(b.document, m);
				r.insertNode(m);
				var x = m.parentNode;
				h(x) && (!d.isBody(m.parentNode) && -1 == p.indexOf(a, x.tagName)) && (f && "customstyle" == f || (x.getAttribute("dir") && m.setAttribute("dir", x.getAttribute("dir")), x.style.cssText && (m.style.cssText = x.style.cssText + ";" + m.style.cssText), x.style.textAlign && !m.style.textAlign && (m.style.textAlign = x.style.textAlign), x.style.textIndent && !m.style.textIndent && (m.style.textIndent = x.style.textIndent), x.style.padding && !m.style.padding && (m.style.padding = x.style.padding)), e && /h\d/i.test(x.tagName) && !/h\d/i.test(m.tagName) ? (d.setAttributes(x, e), f && ("customstyle" == f && e.style) && (x.style.cssText = e.style), d.remove(m, !0), m = x) : d.remove(m.parentNode, !0));
				m = -1 != p.indexOf(a, x.tagName) ? x: m;
				m = d.getNextDomNode(m, !1, l)
			}
			return b.moveToBookmark(n).moveToBookmark(k)
		};
		this.setOpt("paragraph", {
			p: "",
			h1: "",
			h2: "",
			h3: "",
			h4: "",
			h5: "",
			h6: ""
		});
		this.commands.paragraph = {
			execCommand: function(a, c, g, f) {
				a = this.selection.getRange();
				if (a.collapsed) {
					var k = this.document.createTextNode("p");
					a.insertNode(k);
					if (q.ie) {
						var l = k.previousSibling;
						l && d.isWhitespace(l) && d.remove(l); (l = k.nextSibling) && d.isWhitespace(l) && d.remove(l)
					}
				}
				a = e(a, c, g, f);
				k && (a.setStartBefore(k).collapse(!0), pN = k.parentNode, d.remove(k), d.isBlockElm(pN) && d.isEmptyNode(pN) && d.fillNode(this.document, pN));
				q.gecko && a.collapsed && 1 == a.startContainer.nodeType && (g = a.startContainer.childNodes[a.startOffset]) && (1 == g.nodeType && g.tagName.toLowerCase() == c) && a.setStart(g, 0).collapse(!0);
				a.select();
				return ! 0
			},
			queryCommandValue: function() {
				var a = d.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
				return a ? a.tagName.toLowerCase() : ""
			}
		}
	}; (function() {
		var h = d.isBlockElm,
		a = function(a) {
			return d.filterNodeList(a.selection.getStartElementPath(),
			function(a) {
				return a.getAttribute("dir")
			})
		},
		e = function(b, c, e) {
			var f = function(a) {
				return 1 == a.nodeType ? !d.isBookmarkNode(a) : !d.isWhitespace(a)
			};
			if ((c = a(c)) && b.collapsed) return c.setAttribute("dir", e),
			b;
			c = b.createBookmark();
			b.enlarge(!0);
			for (var k = b.createBookmark(), l = d.getNextDomNode(k.start, !1, f), m = b.cloneRange(), n; l && !(d.getPosition(l, k.end) & d.POSITION_FOLLOWING);) if (3 != l.nodeType && h(l)) l = d.getNextDomNode(l, !0, f);
			else {
				for (m.setStartBefore(l); l && l !== k.end && !h(l);) n = l,
				l = d.getNextDomNode(l, !1, null,
				function(a) {
					return ! h(a)
				});
				m.setEndAfter(n);
				l = m.getCommonAncestor();
				if (!d.isBody(l) && h(l)) l.setAttribute("dir", e);
				else {
					l = b.document.createElement("p");
					l.setAttribute("dir", e);
					var r = m.extractContents();
					l.appendChild(r);
					m.insertNode(l)
				}
				l = d.getNextDomNode(l, !1, f)
			}
			return b.moveToBookmark(k).moveToBookmark(c)
		};
		UE.commands.directionality = {
			execCommand: function(a, c) {
				var g = this.selection.getRange();
				if (g.collapsed) {
					var f = this.document.createTextNode("d");
					g.insertNode(f)
				}
				e(g, this, c);
				f && (g.setStartBefore(f).collapse(!0), d.remove(f));
				g.select();
				return ! 0
			},
			queryCommandValue: function() {
				var b = a(this);
				return b ? b.getAttribute("dir") : "ltr"
			}
		}
	})(); UE.plugins.horizontal = function() {
		this.commands.horizontal = {
			execCommand: function(d) {
				if ( - 1 !== this.queryCommandState(d)) {
					this.execCommand("insertHtml", "<hr>");
					d = this.selection.getRange();
					var a = d.startContainer;
					if (1 == a.nodeType && !a.childNodes[d.startOffset]) {
						var e; (e = a.childNodes[d.startOffset - 1]) && (1 == e.nodeType && "HR" == e.tagName) && ("p" == this.options.enterTag ? (e = this.document.createElement("p"), d.insertNode(e), d.setStart(e, 0).setCursor()) : (e = this.document.createElement("br"), d.insertNode(e), d.setStartBefore(e).setCursor()))
					}
					return ! 0
				}
			},
			queryCommandState: function() {
				return d.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0
			}
		};
		this.addListener("delkeydown",
		function(h, a) {
			var e = this.selection.getRange();
			e.txtToElmBoundary(!0);
			if (d.isStartInblock(e)) {
				var b = e.startContainer.previousSibling;
				if (b && d.isTagNode(b, "hr")) return d.remove(b),
				e.select(),
				d.preventDefault(a),
				!0
			}
		})
	}; UE.commands.time = UE.commands.date = {
		execCommand: function(d, a) {
			function e(a, b) {
				var c = ("0" + a.getHours()).slice( - 2),
				e = ("0" + a.getMinutes()).slice( - 2),
				d = ("0" + a.getSeconds()).slice( - 2);
				return (b || "hh:ii:ss").replace(/hh/ig, c).replace(/ii/ig, e).replace(/ss/ig, d)
			}
			function b(a, b) {
				var c = ("000" + a.getFullYear()).slice( - 4),
				e = c.slice( - 2),
				d = ("0" + (a.getMonth() + 1)).slice( - 2),
				n = ("0" + a.getDate()).slice( - 2);
				return (b || "yyyy-mm-dd").replace(/yyyy/ig, c).replace(/yy/ig, e).replace(/mm/ig, d).replace(/dd/ig, n)
			}
			var c = new Date;
			this.execCommand("insertHtml", "time" == d ? e(c, a) : b(c, a))
		}
	}; UE.plugins.rowspacing = function() {
		this.setOpt({
			rowspacingtop: ["5", "10", "15", "20", "25"],
			rowspacingbottom: ["5", "10", "15", "20", "25"]
		});
		this.commands.rowspacing = {
			execCommand: function(d, a, e) {
				this.execCommand("paragraph", "p", {
					style: "margin-" + e + ":" + a + "px"
				});
				return ! 0
			},
			queryCommandValue: function(h, a) {
				var e = d.filterNodeList(this.selection.getStartElementPath(),
				function(a) {
					return d.isBlockElm(a)
				});
				return e ? (e = d.getComputedStyle(e, "margin-" + a).replace(/[^\d]/g, "")) ? e: 0 : 0
			}
		}
	}; UE.plugins.lineheight = function() {
		this.setOpt({
			lineheight: "1 1.5 1.75 2 3 4 5".split(" ")
		});
		this.commands.lineheight = {
			execCommand: function(d, a) {
				this.execCommand("paragraph", "p", {
					style: "line-height:" + ("1" == a ? "normal": a + "em")
				});
				return ! 0
			},
			queryCommandValue: function() {
				var h = d.filterNodeList(this.selection.getStartElementPath(),
				function(a) {
					return d.isBlockElm(a)
				});
				if (h) return h = d.getComputedStyle(h, "line-height"),
				"normal" == h ? 1 : h.replace(/[^\d.]*/ig, "")
			}
		}
	}; UE.plugins.insertcode = function() {
		var h = this;
		h.ready(function() {
			p.cssRule("pre", "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}", h.document)
		});
		h.setOpt("insertcode", {
			as3: "ActionScript3",
			bash: "Bash/Shell",
			cpp: "C/C++",
			css: "Css",
			cf: "CodeFunction",
			"c#": "C#",
			delphi: "Delphi",
			diff: "Diff",
			erlang: "Erlang",
			groovy: "Groovy",
			html: "Html",
			java: "Java",
			jfx: "JavaFx",
			js: "Javascript",
			pl: "Perl",
			php: "Php",
			plain: "Plain Text",
			ps: "PowerShell",
			python: "Python",
			ruby: "Ruby",
			scala: "Scala",
			sql: "Sql",
			vb: "Vb",
			xml: "Xml"
		});
		h.commands.insertcode = {
			execCommand: function(a, e) {
				var b = this.selection.getRange(),
				c = d.findParentByTagName(b.startContainer, "pre", !0);
				if (c) c.className = "brush:" + e + ";toolbar:false;";
				else {
					var g = "";
					b.collapsed ? g = q.ie ? 8 < q.version ? "": "&nbsp;": "<br/>": (c = b.extractContents(), b = this.document.createElement("div"), b.appendChild(c), p.each(UE.filterNode(UE.htmlparser(b.innerHTML.replace(/[\r\t]/g, "")), this.options.filterTxtRules).children,
					function(a) {
						q.ie && 8 < q.version ? ("element" == a.type ? "br" == a.tagName ? g += "\n": v.$empty[a.tagName] || (p.each(a.children,
						function(b) {
							"element" == b.type ? "br" == b.tagName ? g += "\n": v.$empty[a.tagName] || (g += b.innerText()) : g += b.data
						}), /\n$/.test(g) || (g += "\n")) : g += a.data + "\n", !a.nextSibling() && /\n$/.test(g) && (g = g.replace(/\n$/, ""))) : q.ie ? ("element" == a.type ? "br" == a.tagName ? g += "<br>": v.$empty[a.tagName] || (p.each(a.children,
						function(b) {
							"element" == b.type ? "br" == b.tagName ? g += "<br>": v.$empty[a.tagName] || (g += b.innerText()) : g += b.data
						}), /br>$/.test(g) || (g += "<br>")) : g += a.data + "<br>", !a.nextSibling() && /<br>$/.test(g) && (g = g.replace(/<br>$/, ""))) : (g += "element" == a.type ? v.$empty[a.tagName] ? "": a.innerText() : a.data, !/br\/?\s*>$/.test(g) && a.nextSibling() && (g += "<br>"))
					}));
					this.execCommand("inserthtml", '<pre id="coder"class="brush:' + e + ';toolbar:false">' + g + "</pre>", !0);
					c = this.document.getElementById("coder");
					d.removeAttributes(c, "id"); (b = c.previousSibling) && (3 == b.nodeType && 1 == b.nodeValue.length && q.ie && 6 == q.version || d.isEmptyBlock(b)) && d.remove(b);
					b = this.selection.getRange();
					d.isEmptyBlock(c) ? b.setStart(c, 0).setCursor(!1, !0) : b.selectNodeContents(c).select()
				}
			},
			queryCommandValue: function() {
				var a = this.selection.getStartElementPath(),
				e = "";
				p.each(a,
				function(a) {
					if ("PRE" == a.nodeName) return e = (a = a.className.match(/brush:([^;]+)/)) && a[1] ? a[1] : "",
					!1
				});
				return e
			}
		};
		h.addInputRule(function(a) {
			p.each(a.getNodesByTagName("pre"),
			function(a) {
				var b = a.getNodesByTagName("br");
				b.length ? q.ie && 8 < q.version && p.each(b,
				function(a) {
					var b = UE.uNode.createText("\n");
					a.parentNode.insertBefore(b, a);
					a.parentNode.removeChild(a)
				}) : q.ie && 8 < q.version || (b = a.innerText().split(/\n/), a.innerHTML(""), p.each(b,
				function(b) {
					b.length && a.appendChild(UE.uNode.createText(b));
					a.appendChild(UE.uNode.createElement("br"))
				}))
			})
		});
		h.addOutputRule(function(a) {
			p.each(a.getNodesByTagName("pre"),
			function(a) {
				var b = "";
				p.each(a.children,
				function(a) {
					b = "text" == a.type ? b + a.data.replace(/[ ]/g, "&nbsp;").replace(/\n$/, "") : "br" == a.tagName ? b + "\n": b + (v.$empty[a.tagName] ? a.innerText() : "")
				});
				a.innerText(b.replace(/(&nbsp;|\n)+$/, ""))
			})
		});
		h.notNeedCodeQuery = {
			help: 1,
			undo: 1,
			redo: 1,
			source: 1,
			print: 1,
			searchreplace: 1,
			fullscreen: 1,
			preview: 1,
			insertparagraph: 1,
			elementpath: 1,
			insertcode: 1,
			inserthtml: 1,
			selectall: 1
		};
		h.queryCommandState = function(a) {
			return ! this.notNeedCodeQuery[a.toLowerCase()] && this.selection && this.queryCommandValue("insertcode") ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments)
		};
		h.addListener("beforeenterkeydown",
		function() {
			var a = h.selection.getRange(),
			e = d.findParentByTagName(a.startContainer, "pre", !0);
			if (e) {
				h.fireEvent("saveScene");
				a.collapsed || a.deleteContents();
				if (!q.ie || q.ie9above) {
					e = h.document.createElement("br");
					a.insertNode(e).setStartAfter(e).collapse(!0);
					e.nextSibling || q.ie && !(10 < q.version) ? a.setStartAfter(e) : a.insertNode(e.cloneNode(!1));
					for (var e = e.previousSibling,
					b; e;) if (b = e, e = e.previousSibling, !e || "BR" == e.nodeName) {
						e = b;
						break
					}
					if (e) {
						for (b = ""; e && "BR" != e.nodeName && RegExp("^[\\s" + d.fillChar + "]*$").test(e.nodeValue);) b += e.nodeValue,
						e = e.nextSibling;
						"BR" != e.nodeName && (e = e.nodeValue.match(RegExp("^([\\s" + d.fillChar + "]+)"))) && e[1] && (b += e[1]);
						b && (b = h.document.createTextNode(b), a.insertNode(b).setStartAfter(b))
					}
					a.collapse(!0).select(!0)
				} else if (8 < q.version) if (e = h.document.createTextNode("\n"), b = a.startContainer, 0 == a.startOffset) {
					if (b.previousSibling) {
						a.insertNode(e);
						var c = h.document.createTextNode(" ");
						a.setStartAfter(e).insertNode(c).setStart(c, 0).collapse(!0).select(!0)
					}
				} else a.insertNode(e).setStartAfter(e),
				c = h.document.createTextNode(" "),
				(b = a.startContainer.childNodes[a.startOffset]) && !/^\n/.test(b.nodeValue) && a.setStartBefore(e),
				a.insertNode(c).setStart(c, 0).collapse(!0).select(!0);
				else {
					e = h.document.createElement("br");
					a.insertNode(e);
					a.insertNode(h.document.createTextNode(d.fillChar));
					a.setStartAfter(e);
					for (e = e.previousSibling; e;) if (b = e, e = e.previousSibling, !e || "BR" == e.nodeName) {
						e = b;
						break
					}
					if (e) {
						for (b = ""; e && "BR" != e.nodeName && RegExp("^[ " + d.fillChar + "]*$").test(e.nodeValue);) b += e.nodeValue,
						e = e.nextSibling;
						"BR" != e.nodeName && (e = e.nodeValue.match(RegExp("^([ " + d.fillChar + "]+)"))) && e[1] && (b += e[1]);
						b = h.document.createTextNode(b);
						a.insertNode(b).setStartAfter(b)
					}
					a.collapse(!0).select()
				}
				h.fireEvent("saveScene");
				return ! 0
			}
		});
		h.addListener("tabkeydown",
		function(a, e) {
			var b = h.selection.getRange(),
			c = d.findParentByTagName(b.startContainer, "pre", !0);
			if (c) {
				h.fireEvent("saveScene");
				if (!e.shiftKey) if (b.collapsed) c = h.document.createTextNode("    "),
				b.insertNode(c).setStartAfter(c).collapse(!0).select(!0);
				else {
					for (var g = b.createBookmark(), f = g.start.previousSibling; f;) {
						if (c.firstChild === f && !d.isBr(f)) {
							c.insertBefore(h.document.createTextNode("    "), f);
							break
						}
						if (d.isBr(f)) {
							c.insertBefore(h.document.createTextNode("    "), f.nextSibling);
							break
						}
						f = f.previousSibling
					}
					var k = g.end,
					f = g.start.nextSibling;
					for (c.firstChild === g.start && c.insertBefore(h.document.createTextNode("    "), f.nextSibling); f && f !== k;) {
						if (d.isBr(f) && f.nextSibling) {
							if (f.nextSibling === k) break;
							c.insertBefore(h.document.createTextNode("    "), f.nextSibling)
						}
						f = f.nextSibling
					}
					b.moveToBookmark(g).select()
				}
				h.fireEvent("saveScene");
				return ! 0
			}
		});
		h.addListener("beforeinserthtml",
		function(a, e) {
			var b = this,
			c = b.selection.getRange();
			if (d.findParentByTagName(c.startContainer, "pre", !0)) {
				c.collapsed || c.deleteContents();
				var g = "";
				if (q.ie && 8 < q.version) {
					p.each(UE.filterNode(UE.htmlparser(e), b.options.filterTxtRules).children,
					function(a) {
						"element" == a.type ? "br" == a.tagName ? g += "\n": v.$empty[a.tagName] || (p.each(a.children,
						function(b) {
							"element" == b.type ? "br" == b.tagName ? g += "\n": v.$empty[a.tagName] || (g += b.innerText()) : g += b.data
						}), /\n$/.test(g) || (g += "\n")) : g += a.data + "\n"; ! a.nextSibling() && /\n$/.test(g) && (g = g.replace(/\n$/, ""))
					});
					var f = b.document.createTextNode(p.html(g.replace(/&nbsp;/g, " ")));
					c.insertNode(f).selectNode(f).select()
				} else {
					var k = b.document.createDocumentFragment();
					p.each(UE.filterNode(UE.htmlparser(e), b.options.filterTxtRules).children,
					function(a) {
						"element" == a.type ? "br" == a.tagName ? k.appendChild(b.document.createElement("br")) : v.$empty[a.tagName] || (p.each(a.children,
						function(c) {
							"element" == c.type ? "br" == c.tagName ? k.appendChild(b.document.createElement("br")) : v.$empty[a.tagName] || k.appendChild(b.document.createTextNode(p.html(c.innerText().replace(/&nbsp;/g, " ")))) : k.appendChild(b.document.createTextNode(p.html(c.data.replace(/&nbsp;/g, " "))))
						}), "BR" != k.lastChild.nodeName && k.appendChild(b.document.createElement("br"))) : k.appendChild(b.document.createTextNode(p.html(a.data.replace(/&nbsp;/g, " "))));
						a.nextSibling() || "BR" != k.lastChild.nodeName || k.removeChild(k.lastChild)
					});
					c.insertNode(k).select()
				}
				return ! 0
			}
		});
		h.addListener("keydown",
		function(a, e) {
			if (40 == (e.keyCode || e.which)) {
				var b = this.selection.getRange(),
				c,
				g = b.startContainer;
				if (b.collapsed && (c = d.findParentByTagName(b.startContainer, "pre", !0)) && !c.nextSibling) {
					for (var f = c.lastChild; f && "BR" == f.nodeName;) f = f.previousSibling;
					if (f === g || b.startContainer === c && b.startOffset == c.childNodes.length) this.execCommand("insertparagraph"),
					d.preventDefault(e)
				}
			}
		});
		h.addListener("delkeydown",
		function(a, e) {
			var b = this.selection.getRange();
			b.txtToElmBoundary(!0);
			var c = b.startContainer;
			if (d.isTagNode(c, "pre") && b.collapsed && d.isStartInblock(b)) {
				var g = h.document.createElement("p");
				d.fillNode(h.document, g);
				c.parentNode.insertBefore(g, c);
				d.remove(c);
				b.setStart(g, 0).setCursor(!1, !0);
				d.preventDefault(e);
				return ! 0
			}
		})
	}; UE.commands.cleardoc = {
		execCommand: function(d) {
			var a = this;
			d = a.options.enterTag;
			var e = a.selection.getRange();
			"br" == d ? (a.body.innerHTML = "<br/>", e.setStart(a.body, 0).setCursor()) : (a.body.innerHTML = "<p>" + (H ? "": "<br/>") + "</p>", e.setStart(a.body.firstChild, 0).setCursor(!1, !0));
			setTimeout(function() {
				a.fireEvent("clearDoc")
			},
			0)
		}
	}; UE.plugin.register("anchor",
	function() {
		return {
			bindEvents: {
				ready: function() {
					p.cssRule("anchor", ".anchorclass{background: url('" + this.options.themePath + this.options.theme + "/images/anchor.gif') no-repeat scroll left center transparent;border: 1px dotted #0000FF;cursor: auto;display: inline-block;height: 16px;width: 15px;}", this.document)
				}
			},
			outputRule: function(d) {
				p.each(d.getNodesByTagName("img"),
				function(a) {
					var e;
					if (e = a.getAttr("anchorname")) a.tagName = "a",
					a.setAttr({
						anchorname: "",
						name: e,
						"class": ""
					})
				})
			},
			inputRule: function(d) {
				p.each(d.getNodesByTagName("a"),
				function(a) {
					a.getAttr("name") && !a.getAttr("href") && (a.tagName = "img", a.setAttr({
						anchorname: a.getAttr("name"),
						"class": "anchorclass"
					}), a.setAttr("name"))
				})
			},
			commands: {
				anchor: {
					execCommand: function(h, a) {
						var e = this.selection.getRange(),
						b = e.getClosedNode();
						b && b.getAttribute("anchorname") ? a ? b.setAttribute("anchorname", a) : (e.setStartBefore(b).setCursor(), d.remove(b)) : a && (b = this.document.createElement("img"), e.collapse(!0), d.setAttributes(b, {
							anchorname: a,
							"class": "anchorclass"
						}), e.insertNode(b).setStartAfter(b).setCursor(!1, !0))
					}
				}
			}
		}
	}); UE.plugins.wordcount = function() {
		var h = this;
		h.setOpt("wordCount", !0);
		h.addListener("contentchange",
		function() {
			h.fireEvent("wordcount")
		});
		var a;
		h.addListener("ready",
		function() {
			var e = this;
			d.on(e.body, "keyup",
			function(b) { (b.keyCode || b.which) in {
					16 : 1,
					18 : 1,
					20 : 1,
					37 : 1,
					38 : 1,
					39 : 1,
					40 : 1
				} || (clearTimeout(a), a = setTimeout(function() {
					e.fireEvent("wordcount")
				},
				200))
			})
		})
	}; UE.plugins.pagebreak = function() {
		function h(a) {
			if (d.isEmptyBlock(a)) {
				for (var b = a.firstChild,
				f; b && 1 == b.nodeType && d.isEmptyBlock(b);) f = b,
				b = b.firstChild; ! f && (f = a);
				d.fillNode(e.document, f)
			}
		}
		function a(a) {
			return a && 1 == a.nodeType && "HR" == a.tagName && "pagebreak" == a.className
		}
		var e = this,
		b = ["td"];
		e.setOpt("pageBreakTag", "_ueditor_page_break_tag_");
		e.ready(function() {
			p.cssRule("pagebreak", ".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}", e.document)
		});
		e.addInputRule(function(a) {
			a.traversal(function(a) {
				if ("text" == a.type && a.data == e.options.pageBreakTag) {
					var b = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
					a.parentNode.insertBefore(b, a);
					a.parentNode.removeChild(a)
				}
			})
		});
		e.addOutputRule(function(a) {
			p.each(a.getNodesByTagName("hr"),
			function(a) {
				if ("pagebreak" == a.getAttr("class")) {
					var b = UE.uNode.createText(e.options.pageBreakTag);
					a.parentNode.insertBefore(b, a);
					a.parentNode.removeChild(a)
				}
			})
		});
		e.commands.pagebreak = {
			execCommand: function() {
				var c = e.selection.getRange(),
				g = e.document.createElement("hr");
				d.setAttributes(g, {
					"class": "pagebreak",
					noshade: "noshade",
					size: "5"
				});
				d.unSelectable(g);
				var f = d.findParentByTagName(c.startContainer, b, !0),
				k = [];
				if (f) switch (f.tagName) {
				case "TD":
					f = f.parentNode,
					f.previousSibling ? (f.parentNode.insertBefore(g, f), k = d.findParents(g)) : (c = d.findParentByTagName(f, "table"), c.parentNode.insertBefore(g, c), k = d.findParents(g, !0)),
					f = k[1],
					g !== f && d.breakParent(g, f),
					e.fireEvent("afteradjusttable", e.document)
				} else {
					if (!c.collapsed) for (c.deleteContents(), f = c.startContainer; ! d.isBody(f) && d.isBlockElm(f) && d.isEmptyNode(f);) c.setStartBefore(f).collapse(!0),
					d.remove(f),
					f = c.startContainer;
					c.insertNode(g);
					for (f = g.parentNode; ! d.isBody(f);) d.breakParent(g, f),
					(f = g.nextSibling) && d.isEmptyBlock(f) && d.remove(f),
					f = g.parentNode;
					f = g.nextSibling;
					k = g.previousSibling;
					a(k) ? d.remove(k) : k && h(k);
					f ? (a(f) ? d.remove(f) : h(f), c.setEndAfter(g).collapse(!1)) : (f = e.document.createElement("p"), g.parentNode.appendChild(f), d.fillNode(e.document, f), c.setStart(f, 0).collapse(!0));
					c.select(!0)
				}
			}
		}
	}; UE.plugin.register("wordimage",
	function() {
		var h = this,
		a = [];
		return {
			commands: {
				wordimage: {
					execCommand: function() {
						for (var a = d.getElementsByTagName(h.body, "img"), b = [], c = 0, g; g = a[c++];)(g = g.getAttribute("word_img")) && b.push(g);
						return b
					},
					queryCommandState: function() {
						a = d.getElementsByTagName(h.body, "img");
						for (var e = 0,
						b; b = a[e++];) if (b.getAttribute("word_img")) return 1;
						return - 1
					},
					notNeedUndo: !0
				}
			},
			inputRule: function(a) {
				p.each(a.getNodesByTagName("img"),
				function(a) {
					var c = a.attrs,
					e = 128 > parseInt(c.width) || 43 > parseInt(c.height),
					d = h.options,
					k = d.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
					c.src && /^(?:(file:\/+))/.test(c.src) && a.setAttr({
						width: c.width,
						height: c.height,
						alt: c.alt,
						word_img: c.src,
						src: k,
						style: "background:url(" + (e ? d.themePath + d.theme + "/images/word.gif": d.langPath + d.lang + "/images/localimage.png") + ") no-repeat center center;border:1px solid #ddd"
					})
				})
			}
		}
	}); UE.plugins.dragdrop = function() {
		var h = this;
		h.ready(function() {
			d.on(this.body, "dragend",
			function() {
				var a = h.selection.getRange(),
				e = a.getClosedNode() || h.selection.getStart();
				if (e && "IMG" == e.tagName) {
					for (var b = e.previousSibling,
					c; (c = e.nextSibling) && 1 == c.nodeType && "SPAN" == c.tagName && !c.firstChild;) d.remove(c); (!b || 1 != b.nodeType || d.isEmptyBlock(b)) && b || c && (!c || d.isEmptyBlock(c)) || (b && "P" == b.tagName && !d.isEmptyBlock(b) ? (b.appendChild(e), d.moveChild(c, b), d.remove(c)) : c && ("P" == c.tagName && !d.isEmptyBlock(c)) && c.insertBefore(e, c.firstChild), b && ("P" == b.tagName && d.isEmptyBlock(b)) && d.remove(b), c && ("P" == c.tagName && d.isEmptyBlock(c)) && d.remove(c), a.selectNode(e).select(), h.fireEvent("saveScene"))
				}
			})
		});
		h.addListener("keyup",
		function(a, e) {
			if (13 == (e.keyCode || e.which)) {
				var b = h.selection.getRange(),
				c; (c = d.findParentByTagName(b.startContainer, "p", !0)) && "center" == d.getComputedStyle(c, "text-align") && d.removeStyle(c, "text-align")
			}
		})
	}; UE.plugins.undo = function() {
		function h(a, b) {
			if (a.length != b.length) return 0;
			for (var c = 0,
			e = a.length; c < e; c++) if (a[c] != b[c]) return 0;
			return 1
		}
		var a, e = this,
		b = e.options.maxUndoCount || 20,
		c = e.options.maxInputCount || 20,
		g = RegExp(d.fillChar + "|</hr>", "gi"),
		f = {
			ol: 1,
			ul: 1,
			table: 1,
			tbody: 1,
			tr: 1,
			body: 1
		},
		k = e.options.autoClearEmptyNode;
		e.undoManger = new
		function() {
			this.list = [];
			this.index = 0;
			this.hasRedo = this.hasUndo = !1;
			this.undo = function() {
				if (this.hasUndo) if (this.list[this.index - 1] || 1 != this.list.length) {
					for (; this.list[this.index].content == this.list[this.index - 1].content;) if (this.index--, 0 == this.index) return this.restore(0);
					this.restore(--this.index)
				} else this.reset()
			};
			this.redo = function() {
				if (this.hasRedo) {
					for (; this.list[this.index].content == this.list[this.index + 1].content;) if (this.index++, this.index == this.list.length - 1) return this.restore(this.index);
					this.restore(++this.index)
				}
			};
			this.restore = function() {
				var a = this.editor,
				b = this.list[this.index],
				c = UE.htmlparser(b.content.replace(g, ""));
				a.options.autoClearEmptyNode = !1;
				a.filterInputRule(c);
				a.options.autoClearEmptyNode = k;
				a.document.body.innerHTML = c.toHtml();
				a.fireEvent("afterscencerestore");
				q.ie && p.each(d.getElementsByTagName(a.document, "td th caption p"),
				function(b) {
					d.isEmptyNode(b) && d.fillNode(a.document, b)
				});
				try {
					var e = (new I.Range(a.document)).moveToAddress(b.address);
					e.select(f[e.startContainer.nodeName.toLowerCase()])
				} catch(l) {}
				this.update();
				this.clearKey();
				a.fireEvent("reset", !0)
			};
			this.getScene = function() {
				var a = this.editor,
				b = a.selection.getRange().createAddress(!1, !0);
				a.fireEvent("beforegetscene");
				var c = UE.htmlparser(a.body.innerHTML);
				a.options.autoClearEmptyNode = !1;
				a.filterOutputRule(c);
				a.options.autoClearEmptyNode = k;
				c = c.toHtml();
				a.fireEvent("aftergetscene");
				return {
					address: b,
					content: c
				}
			};
			this.save = function(c, e) {
				clearTimeout(a);
				var d = this.getScene(e),
				f = this.list[this.index],
				l;
				if (l = f) if (l = f.content == d.content) c ? f = 1 : (f = f.address, l = d.address, f = f.collapsed != l.collapsed ? 0 : h(f.startAddress, l.startAddress) && h(f.endAddress, l.endAddress) ? 1 : 0),
				l = f;
				l || (this.list = this.list.slice(0, this.index + 1), this.list.push(d), this.list.length > b && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
			};
			this.update = function() {
				this.hasRedo = !!this.list[this.index + 1];
				this.hasUndo = !!this.list[this.index - 1]
			};
			this.reset = function() {
				this.list = [];
				this.index = 0;
				this.hasRedo = this.hasUndo = !1;
				this.clearKey()
			};
			this.clearKey = function() {
				m = 0
			}
		};
		e.undoManger.editor = e;
		e.addListener("saveScene",
		function() {
			var a = Array.prototype.splice.call(arguments, 1);
			this.undoManger.save.apply(this.undoManger, a)
		});
		e.addListener("reset",
		function(a, b) {
			b || this.undoManger.reset()
		});
		e.commands.redo = e.commands.undo = {
			execCommand: function(a) {
				this.undoManger[a]()
			},
			queryCommandState: function(a) {
				return this.undoManger["has" + ("undo" == a.toLowerCase() ? "Undo": "Redo")] ? 0 : -1
			},
			notNeedUndo: 1
		};
		var l = {
			16 : 1,
			17 : 1,
			18 : 1,
			37 : 1,
			38 : 1,
			39 : 1,
			40 : 1
		},
		m = 0,
		n = !1;
		e.addListener("ready",
		function() {
			d.on(this.body, "compositionstart",
			function() {
				n = !0
			});
			d.on(this.body, "compositionend",
			function() {
				n = !1
			})
		});
		e.addshortcutkey({
			Undo: "ctrl+90",
			Redo: "ctrl+89"
		});
		var r = !0;
		e.addListener("keydown",
		function(b, e) {
			var d = this;
			if (! (l[e.keyCode || e.which] || (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) || n)) if (d.selection.getRange().collapsed) {
				0 == d.undoManger.list.length && d.undoManger.save(!0);
				clearTimeout(a);
				var f = function(a) {
					a.selection.getRange().collapsed && a.fireEvent("contentchange");
					a.undoManger.save(!1, !0);
					a.fireEvent("selectionchange")
				};
				a = setTimeout(function() {
					if (n) var a = setInterval(function() {
						n || (f(d), clearInterval(a))
					},
					300);
					else f(d)
				},
				200);
				m++;
				m >= c && f(d)
			} else d.undoManger.save(!1, !0),
			r = !1
		});
		e.addListener("keyup",
		function(a, b) {
			l[b.keyCode || b.which] || (b.ctrlKey || b.metaKey || b.shiftKey || b.altKey) || n || r || (this.undoManger.save(!1, !0), r = !0)
		});
		e.stopCmdUndo = function() {
			e.__hasEnterExecCommand = !0
		};
		e.startCmdUndo = function() {
			e.__hasEnterExecCommand = !1
		}
	}; UE.plugins.paste = function() {
		function h(a) {
			var b = this.document;
			if (!b.getElementById("baidu_pastebin")) {
				var c = this.selection.getRange(),
				e = c.createBookmark(),
				g = b.createElement("div");
				g.id = "baidu_pastebin";
				q.webkit && g.appendChild(b.createTextNode(d.fillChar + d.fillChar));
				b.body.appendChild(g);
				e.start.style.display = "";
				g.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + d.getXY(e.start).y + "px";
				c.selectNodeContents(g).select(!0);
				setTimeout(function() {
					if (q.webkit) for (var h = 0,
					t = b.querySelectorAll("#baidu_pastebin"), x; x = t[h++];) if (d.isEmptyNode(x)) d.remove(x);
					else {
						g = x;
						break
					}
					try {
						g.parentNode.removeChild(g)
					} catch(w) {}
					c.moveToBookmark(e).select(!0);
					a(g)
				},
				0)
			}
		}
		function a(a) {
			var k;
			if (a.firstChild) {
				var l = d.getElementsByTagName(a, "span");
				k = 0;
				for (var m; m = l[k++];)"_baidu_cut_start" != m.id && "_baidu_cut_end" != m.id || d.remove(m);
				if (q.webkit) {
					m = a.querySelectorAll("div br");
					for (k = 0; l = m[k++];) l = l.parentNode,
					"DIV" == l.tagName && 1 == l.childNodes.length && (l.innerHTML = "<p><br/></p>", d.remove(l));
					l = a.querySelectorAll("#baidu_pastebin");
					for (k = 0; m = l[k++];) {
						var n = e.document.createElement("p");
						for (m.parentNode.insertBefore(n, m); m.firstChild;) n.appendChild(m.firstChild);
						d.remove(m)
					}
					m = a.querySelectorAll("meta");
					for (k = 0; l = m[k++];) d.remove(l);
					m = a.querySelectorAll("br");
					for (k = 0; l = m[k++];) / ^apple - /i.test(l.className)&&d.remove(l)}if(q.gecko)for(m=a.querySelectorAll("[_moz_dirty]"),k=0;l=m[k++];)l.removeAttribute("_moz_dirty");if(!q.ie)for(m=a.querySelectorAll("span.Apple-style-span"),k=0;l=m[k++];)d.remove(l,!0);k=a.innerHTML;k=UE.filterWord(k);a=UE.htmlparser(k);e.options.filterRules&&UE.filterNode(a,e.options.filterRules);e.filterInputRule(a);q.webkit&&((k=a.lastChild())&&
("element"==k.type&&"br"==k.tagName)&&a.removeChild(k),p.each(e.body.querySelectorAll("div"),function(a){d.isEmptyBlock(a)&&d.remove(a,!0)}));k={html:a.toHtml()};e.fireEvent("beforepaste",k,a);k.html&&(a=UE.htmlparser(k.html,!0),1===e.queryCommandState("pasteplain")?e.execCommand("insertHtml",UE.filterNode(a,e.options.filterTxtRules).toHtml(),!0):(UE.filterNode(a,e.options.filterTxtRules),b=a.toHtml(),c=k.html,g=e.selection.getRange().createAddress(!0),e.execCommand("insertHtml",c,!0)),e.fireEvent("afterpaste",
k))}}var e=this,b,c,g;e.addListener("pasteTransfer",function(a,k){if(g&&b&&c&&b!=c){var l=e.selection.getRange();l.moveToAddress(g,!0);if(!l.collapsed){for(;!d.isBody(l.startContainer);){var m=l.startContainer;if(1==m.nodeType){m=m.childNodes[l.startOffset];if(!m){l.setStartBefore(l.startContainer);continue}(m=m.previousSibling)&&(3==m.nodeType&&RegExp("^[\n\r\t "+d.fillChar+"]*$").test(m.nodeValue))&&l.setStartBefore(m)}if(0==l.startOffset)l.setStartBefore(l.startContainer);else break}for(;!d.isBody(l.endContainer);){m=
l.endContainer;if(1==m.nodeType){m=m.childNodes[l.endOffset];if(!m){l.setEndAfter(l.endContainer);continue}(m=m.nextSibling)&&(3==m.nodeType&&RegExp("^[\n\r\t"+d.fillChar+"]*$").test(m.nodeValue))&&l.setEndAfter(m)}if(l.endOffset==l.endContainer[3==l.endContainer.nodeType?"nodeValue":"childNodes"].length)l.setEndAfter(l.endContainer);else break}}l.deleteContents();l.select(!0);e.__hasEnterExecCommand=!0;l=c;2===k?l=l.replace(/ < (\ / ?)([\w\ - ] + )([ ^ >] * ) > /gi,function(a,b,c,e){c=c.toLowerCase();if({img:1}[c])return a;
e=e.replace(/ ([\w\ - ] * ?)\s *= \s * (("([^"] * )")|('([^']*)')|([^\s>]+))/gi,function(a,b,c){return{src:1,href:1,name:1}[b.toLowerCase()]?b+" = "+c+"":""});return{span:1,div:1}[c]?"":" < "+b+c+""+p.trim(e)+" > "}):k&&(l=b);e.execCommand("inserthtml ",l,!0);e.__hasEnterExecCommand=!1;for(l=e.selection.getRange();!d.isBody(l.startContainer)&&!l.startOffset&&l.startContainer[3==l.startContainer.nodeType?"nodeValue ":"childNodes "].length;)l.setStartBefore(l.startContainer);l=l.createAddress(!0);g.endAddress=l.startAddress}});
e.addListener("ready ",function(){d.on(e.body,"cut ",function(){!e.selection.getRange().collapsed&&e.undoManger&&e.undoManger.save()});d.on(e.body,q.ie||q.opera?"keydown ":"paste ",function(b){(!q.ie&&!q.opera||(b.ctrlKey||b.metaKey)&&"86 "==b.keyCode)&&h.call(e,function(b){a(b)})})})};UE.plugins.list=function(){function h(a){var b=[],c;for(c in a)b.push(c);return b}function a(a){var b=a.className;return d.hasClass(a,/custom_/)?b.match(/custom_(\w+)/)[1]:d.getStyle(a,"list - style - type ")}function e(e,f){p.each(d.getElementsByTagName(e,
"ol ul "),function(l){if(d.inDoc(l,e)){var g=l.parentNode;if(g.tagName==l.tagName){var k=a(l)||("OL "==l.tagName?"decimal ":"disc "),h=a(g)||("OL "==g.tagName?"decimal ":"disc ");k==h&&(k=p.indexOf(n[l.tagName],k),k=k+1==n[l.tagName].length?0:k+1,c(l,n[l.tagName][k]))}var r=0,k=2;d.hasClass(l,/custom_/)?/[ou]l/i.test(g.tagName)&&d.hasClass(g,/custom_/)||(k=1):/[ou]l/i.test(g.tagName)&&d.hasClass(g,/custom_/)&&(k=3);(g=d.getStyle(l,"list - style - type "))&&(l.style.cssText="list - style - type: "+g);l.className=p.trim(l.className.replace(/list-paddingleft-\w+/,
""))+"list - paddingleft - "+k;p.each(d.getElementsByTagName(l,"li "),function(b){b.style.cssText&&(b.style.cssText="");if(!b.firstChild)d.remove(b);else if(b.parentNode===l){r++;if(d.hasClass(l,/custom_/)){var c=1,e=a(l);if("OL "==l.tagName){if(e)switch(e){case "cn ":case "cn1 ":case "cn2 ":10<r&&(0==r%10||10<r&&20>r)?c=2:20<r&&(c=3);break;case "num2 ":9<r&&(c=2)}b.className="list - "+m[e]+r+"list - "+e+" - paddingleft - "+c}else b.className="list - "+m[e]+"list - "+e+" - paddingleft "}else b.className=b.className.replace(/list-[\w\-]+/gi,
"");c=b.getAttribute("class ");null===c||c.replace(/\s/g,"")||d.removeAttributes(b,"class ")}});!f&&b(l,l.tagName.toLowerCase(),a(l)||d.getStyle(l,"list - style - type "),!0)}})}function b(b,c,f,l){var g=b.nextSibling;g&&(1==g.nodeType&&g.tagName.toLowerCase()==c&&(a(g)||d.getStyle(g,"list - style - type ")||("ol "==c?"decimal ":"disc "))==f)&&(d.moveChild(g,b),0==g.childNodes.length&&d.remove(g));g&&d.isFillChar(g)&&d.remove(g);(g=b.previousSibling)&&(1==g.nodeType&&g.tagName.toLowerCase()==c&&(a(g)||d.getStyle(g,
"list - style - type ")||("ol "==c?"decimal ":"disc "))==f)&&d.moveChild(b,g);g&&d.isFillChar(g)&&d.remove(g);!l&&d.isEmptyBlock(b)&&d.remove(b);a(b)&&e(b.ownerDocument,!0)}function c(a,b){m[b]&&(a.className="custom_ "+b);try{d.setStyle(a,"list - style - type ",b)}catch(c){}}function g(a){var b=a.previousSibling;b&&d.isEmptyBlock(b)&&d.remove(b);(b=a.nextSibling)&&d.isEmptyBlock(b)&&d.remove(b)}function f(a){for(;a&&!d.isBody(a);){if("TABLE "==a.nodeName)return null;if("LI "==a.nodeName)return a;a=a.parentNode}}
var k=this,l={TD:1,PRE:1,BLOCKQUOTE:1},m={cn:"cn - 1 - ",cn1:"cn - 2 - ",cn2:"cn - 3 - ",num:"num - 1 - ",num1:"num - 2 - ",num2:"num - 3 - ",dash:"dash ",dot:"dot "};k.setOpt({autoTransWordToList:!1,insertorderedlist:{num:"",num1:"",num2:"",cn:"",cn1:"",cn2:"",decimal:"","lower - alpha ":"","lower - roman ":"","upper - alpha ":"","upper - roman ":""},insertunorderedlist:{circle:"",disc:"",square:"",dash:"",dot:""},listDefaultPaddingLeft:"30 ",listiconpath:"http: //bs.baidu.com/listicon/",maxListLevel:-1});var n={OL:h(k.options.insertorderedlist),
					UL: h(k.options.insertunorderedlist)
				},
				r = k.options.listiconpath,
				t;
				for (t in m) k.options.insertorderedlist.hasOwnProperty(t) || k.options.insertunorderedlist.hasOwnProperty(t) || delete m[t];
				k.ready(function() {
					var a = [],
					b;
					for (b in m) {
						if ("dash" == b || "dot" == b) a.push("li.list-" + m[b] + "{background-image:url(" + r + m[b] + ".gif)}"),
						a.push("ul.custom_" + b + "{list-style:none;}ul.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}");
						else {
							for (var c = 0; 99 > c; c++) a.push("li.list-" + m[b] + c + "{background-image:url(" + r + "list-" + m[b] + c + ".gif)}");
							a.push("ol.custom_" + b + "{list-style:none;}ol.custom_" + b + " li{background-position:0 3px;background-repeat:no-repeat}")
						}
						switch (b) {
						case "cn":
							a.push("li.list-" + b + "-paddingleft-1{padding-left:25px}");
							a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
							a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
							break;
						case "cn1":
							a.push("li.list-" + b + "-paddingleft-1{padding-left:30px}");
							a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
							a.push("li.list-" + b + "-paddingleft-3{padding-left:55px}");
							break;
						case "cn2":
							a.push("li.list-" + b + "-paddingleft-1{padding-left:40px}");
							a.push("li.list-" + b + "-paddingleft-2{padding-left:55px}");
							a.push("li.list-" + b + "-paddingleft-3{padding-left:68px}");
							break;
						case "num":
						case "num1":
							a.push("li.list-" + b + "-paddingleft-1{padding-left:25px}");
							break;
						case "num2":
							a.push("li.list-" + b + "-paddingleft-1{padding-left:35px}");
							a.push("li.list-" + b + "-paddingleft-2{padding-left:40px}");
							break;
						case "dash":
							a.push("li.list-" + b + "-paddingleft{padding-left:35px}");
							break;
						case "dot":
							a.push("li.list-" + b + "-paddingleft{padding-left:20px}")
						}
					}
					a.push(".list-paddingleft-1{padding-left:0}");
					a.push(".list-paddingleft-2{padding-left:" + k.options.listDefaultPaddingLeft + "px}");
					a.push(".list-paddingleft-3{padding-left:" + 2 * k.options.listDefaultPaddingLeft + "px}");
					p.cssRule("list", "ol,ul{margin:0;pading:0;" + (q.ie ? "": "width:95%") + "}li{clear:both;}" + a.join("\n"), k.document)
				});
				k.ready(function() {
					d.on(k.body, "cut",
					function() {
						setTimeout(function() {
							var a = k.selection.getRange(),
							b;
							if (!a.collapsed && (b = d.findParentByTagName(a.startContainer, "li", !0)) && !b.nextSibling && d.isEmptyBlock(b)) {
								b = b.parentNode;
								var c; (c = b.previousSibling) ? (d.remove(b), a.setStartAtLast(c).collapse(!0)) : (c = b.nextSibling) ? (d.remove(b), a.setStartAtFirst(c).collapse(!0)) : (c = k.document.createElement("p"), d.fillNode(k.document, c), b.parentNode.insertBefore(c, b), d.remove(b), a.setStart(c, 0).collapse(!0));
								a.select(!0)
							}
						})
					})
				});
				k.addListener("beforepaste",
				function(b, c) {
					var e = this.selection.getRange(),
					f = UE.htmlparser(c.html, !0);
					if (e = d.findParentByTagName(e.startContainer, "li", !0)) {
						var g = e.parentNode;
						p.each(f.getNodesByTagName("OL" == g.tagName ? "ul": "ol"),
						function(c) {
							c.tagName = g.tagName;
							c.setAttr();
							if (c.parentNode === f) b = a(g) || ("OL" == g.tagName ? "decimal": "disc");
							else {
								var e = c.parentNode.getAttr("class"); (b = e && /custom_/.test(e) ? e.match(/custom_(\w+)/)[1] : c.parentNode.getStyle("list-style-type")) || (b = "OL" == g.tagName ? "decimal": "disc")
							}
							e = p.indexOf(n[g.tagName], b);
							c.parentNode !== f && (e = e + 1 == n[g.tagName].length ? 0 : e + 1);
							e = n[g.tagName][e];
							m[e] ? c.setAttr("class", "custom_" + e) : c.setStyle("list-style-type", e)
						})
					}
					c.html = f.toHtml()
				});
				k.addInputRule(function(a) {
					p.each(a.getNodesByTagName("li"),
					function(a) {
						for (var b = UE.uNode.createElement("p"), c = 0, e; e = a.children[c];)"text" == e.type || v.p[e.tagName] ? b.appendChild(e) : b.firstChild() ? (a.insertBefore(b, e), b = UE.uNode.createElement("p"), c += 2) : c++; (b.firstChild() && !b.parentNode || !a.firstChild()) && a.appendChild(b);
						b.firstChild() || b.innerHTML(q.ie ? "&nbsp;": "<br/>");
						a = a.firstChild(); (b = a.lastChild()) && ("text" == b.type && /^\s*$/.test(b.data)) && a.removeChild(b)
					});
					if (k.options.autoTransWordToList) {
						var b = {
							num1: /^\d+\)/,
							decimal: /^\d+\./,
							"lower-alpha": /^[a-z]+\)/,
							"upper-alpha": /^[A-Z]+\./,
							cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
							cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
						},
						c = {
							square: "n"
						},
						e = function(a, e) {
							var d = e.firstChild();
							if (d && "element" == d.type && "span" == d.tagName && /Wingdings|Symbol/.test(d.getStyle("font-family"))) {
								for (var f in c) if (c[f] == d.data) return f;
								return "disc"
							}
							for (f in b) if (b[f].test(a)) return f
						};
						p.each(a.getNodesByTagName("p"),
						function(a) {
							if ("MsoListParagraph" == a.getAttr("class")) {
								a.setStyle("margin", "");
								a.setStyle("margin-left", "");
								a.setAttr("class", "");
								var c = a,
								d, f = a;
								if ("li" != a.parentNode.tagName && (d = e(a.innerText(), a))) {
									var g = UE.uNode.createElement(k.options.insertorderedlist.hasOwnProperty(d) ? "ol": "ul");
									for (m[d] ? g.setAttr("class", "custom_" + d) : g.setStyle("list-style-type", d); a && "li" != a.parentNode.tagName && e(a.innerText(), a);) { (c = a.nextSibling()) || a.parentNode.insertBefore(g, a);
										var l = g,
										n = d;
										if ("ol" == l.tagName) if (q.ie) {
											var h = a.firstChild();
											"element" == h.type && ("span" == h.tagName && b[n].test(h.innerText())) && a.removeChild(h)
										} else a.innerHTML(a.innerHTML().replace(b[n], ""));
										else a.removeChild(a.firstChild());
										n = UE.uNode.createElement("li");
										n.appendChild(a);
										l.appendChild(n);
										a = c
									} ! g.parentNode && (a && a.parentNode) && a.parentNode.insertBefore(g, a)
								} (c = f.firstChild()) && ("element" == c.type && "span" == c.tagName && /^\s*(&nbsp;)+\s*$/.test(c.innerText())) && c.parentNode.removeChild(c)
							}
						})
					}
				});
				k.addListener("contentchange",
				function() {
					e(k.document)
				});
				k.addListener("keydown",
				function(a, b) {
					function c() {
						b.preventDefault ? b.preventDefault() : b.returnValue = !1;
						k.fireEvent("contentchange");
						k.undoManger && k.undoManger.save()
					}
					function e(a, b) {
						for (; a && !d.isBody(a) && !b(a);) {
							if (1 == a.nodeType && /[ou]l/i.test(a.tagName)) return a;
							a = a.parentNode
						}
						return null
					}
					var f = b.keyCode || b.which;
					if (13 == f && !b.shiftKey) {
						var l = k.selection.getRange(),
						n = d.findParent(l.startContainer,
						function(a) {
							return d.isBlockElm(a)
						},
						!0),
						m = d.findParentByTagName(l.startContainer, "li", !0);
						n && ("PRE" != n.tagName && !m) && (m = n.innerHTML.replace(RegExp(d.fillChar, "g"), ""), /^\s*1\s*\.[^\d]/.test(m) && (n.innerHTML = m.replace(/^\s*1\s*\./, ""), l.setStartAtLast(n).collapse(!0).select(), k.__hasEnterExecCommand = !0, k.execCommand("insertorderedlist"), k.__hasEnterExecCommand = !1));
						l = k.selection.getRange();
						n = e(l.startContainer,
						function(a) {
							return "TABLE" == a.tagName
						});
						m = l.collapsed ? n: e(l.endContainer,
						function(a) {
							return "TABLE" == a.tagName
						});
						if (n && m && n === m) {
							if (!l.collapsed) if (n = d.findParentByTagName(l.startContainer, "li", !0), m = d.findParentByTagName(l.endContainer, "li", !0), n && m && n === m) {
								if (l.deleteContents(), (m = d.findParentByTagName(l.startContainer, "li", !0)) && d.isEmptyBlock(m)) {
									t = m.previousSibling;
									next = m.nextSibling;
									n = k.document.createElement("p");
									d.fillNode(k.document, n);
									r = m.parentNode;
									t && next ? (l.setStart(next, 0).collapse(!0).select(!0), d.remove(m)) : ((t || next) && t ? m.parentNode.parentNode.insertBefore(n, r.nextSibling) : r.parentNode.insertBefore(n, r), d.remove(m), r.firstChild || d.remove(r), l.setStart(n, 0).setCursor());
									c();
									return
								}
							} else {
								var n = l.cloneRange(),
								h = n.collapse(!1).createBookmark();
								l.deleteContents();
								n.moveToBookmark(h);
								m = d.findParentByTagName(n.startContainer, "li", !0);
								g(m);
								n.select();
								c();
								return
							}
							if (m = d.findParentByTagName(l.startContainer, "li", !0)) {
								if (d.isEmptyBlock(m)) {
									var h = l.createBookmark(),
									r = m.parentNode;
									m !== r.lastChild ? (d.breakParent(m, r), g(m)) : (r.parentNode.insertBefore(m, r.nextSibling), d.isEmptyNode(r) && d.remove(r));
									if (!v.$list[m.parentNode.tagName]) if (d.isBlockElm(m.firstChild)) d.remove(m, !0);
									else {
										n = k.document.createElement("p");
										for (m.parentNode.insertBefore(n, m); m.firstChild;) n.appendChild(m.firstChild);
										d.remove(m)
									}
									l.moveToBookmark(h).select()
								} else {
									n = m.firstChild;
									if (!n || !d.isBlockElm(n)) {
										n = k.document.createElement("p");
										for (!m.firstChild && d.fillNode(k.document, n); m.firstChild;) n.appendChild(m.firstChild);
										m.appendChild(n)
									}
									h = k.document.createElement("span");
									l.insertNode(h);
									d.breakParent(h, m);
									t = h.nextSibling;
									n = t.firstChild;
									n || (n = k.document.createElement("p"), d.fillNode(k.document, n), t.appendChild(n));
									d.isEmptyNode(n) && (n.innerHTML = "", d.fillNode(k.document, n));
									l.setStart(n, 0).collapse(!0).shrinkBoundary().select();
									d.remove(h);
									var t = t.previousSibling;
									t && d.isEmptyBlock(t) && (t.innerHTML = "<p></p>", d.fillNode(k.document, t.firstChild))
								}
								c()
							}
						}
					}
					if (8 == f && (l = k.selection.getRange(), l.collapsed && d.isStartInblock(l) && (n = l.cloneRange().trimBoundary(), (m = d.findParentByTagName(l.startContainer, "li", !0)) && d.isStartInblock(n)))) if ((n = d.findParentByTagName(l.startContainer, "p", !0)) && n !== m.firstChild) r = d.findParentByTagName(n, ["ol", "ul"]),
					d.breakParent(n, r),
					g(n),
					k.fireEvent("contentchange"),
					l.setStart(n, 0).setCursor(!1, !0),
					k.fireEvent("saveScene"),
					d.preventDefault(b);
					else if (m && (t = m.previousSibling)) {
						if (46 != f || !m.childNodes.length) {
							v.$list[t.tagName] && (t = t.lastChild);
							k.undoManger && k.undoManger.save();
							n = m.firstChild;
							if (d.isBlockElm(n)) if (d.isEmptyNode(n)) for (t.appendChild(n), l.setStart(n, 0).setCursor(!1, !0); m.firstChild;) t.appendChild(m.firstChild);
							else h = k.document.createElement("span"),
							l.insertNode(h),
							d.isEmptyBlock(t) && (t.innerHTML = ""),
							d.moveChild(m, t),
							l.setStartBefore(h).collapse(!0).select(!0),
							d.remove(h);
							else if (d.isEmptyNode(m)) n = k.document.createElement("p"),
							t.appendChild(n),
							l.setStart(n, 0).setCursor();
							else for (l.setEnd(t, t.childNodes.length).collapse().select(!0); m.firstChild;) t.appendChild(m.firstChild);
							d.remove(m);
							k.fireEvent("contentchange");
							k.fireEvent("saveScene");
							d.preventDefault(b)
						}
					} else if (m && !m.previousSibling) {
						r = m.parentNode;
						h = l.createBookmark();
						if (d.isTagNode(r.parentNode, "ol ul")) r.parentNode.insertBefore(m, r);
						else {
							for (; m.firstChild;) r.parentNode.insertBefore(m.firstChild, r);
							d.remove(m)
						}
						d.isEmptyNode(r) && d.remove(r);
						l.moveToBookmark(h).setCursor(!1, !0);
						k.fireEvent("contentchange");
						k.fireEvent("saveScene");
						d.preventDefault(b)
					}
				});
				k.addListener("keyup",
				function(c, e) {
					if (8 == (e.keyCode || e.which)) {
						var f = k.selection.getRange(),
						l; (l = d.findParentByTagName(f.startContainer, ["ol", "ul"], !0)) && b(l, l.tagName.toLowerCase(), a(l) || d.getComputedStyle(l, "list-style-type"), !0)
					}
				});
				k.addListener("tabkeydown",
				function() {
					function e(a) {
						if ( - 1 != k.options.maxListLevel) {
							a = a.parentNode;
							for (var b = 0;
							/[ou]l/i.test(a.tagName);) b++,
							a = a.parentNode;
							if (b >= k.options.maxListLevel) return ! 0
						}
					}
					var f = k.selection.getRange(),
					l = d.findParentByTagName(f.startContainer, "li", !0);
					if (l) {
						var g;
						if (f.collapsed) {
							if (e(l)) return ! 0;
							var m = l.parentNode,
							h = k.document.createElement(m.tagName),
							r = p.indexOf(n[h.tagName], a(m) || d.getComputedStyle(m, "list-style-type")),
							r = r + 1 == n[h.tagName].length ? 0 : r + 1,
							r = n[h.tagName][r];
							c(h, r);
							if (d.isStartInblock(f)) return k.fireEvent("saveScene"),
							g = f.createBookmark(),
							m.insertBefore(h, l),
							h.appendChild(l),
							b(h, h.tagName.toLowerCase(), r),
							k.fireEvent("contentchange"),
							f.moveToBookmark(g).select(!0),
							!0
						} else {
							k.fireEvent("saveScene");
							g = f.createBookmark();
							for (var m = 0,
							t, h = d.findParents(l), q; q = h[m++];) if (d.isTagNode(q, "ol ul")) {
								t = q;
								break
							}
							q = l;
							if (g.end) for (; q && !(d.getPosition(q, g.end) & d.POSITION_FOLLOWING);) if (e(q)) q = d.getNextDomNode(q, !1, null,
							function(a) {
								return a !== t
							});
							else {
								m = q.parentNode;
								h = k.document.createElement(m.tagName);
								r = p.indexOf(n[h.tagName], a(m) || d.getComputedStyle(m, "list-style-type"));
								r = n[h.tagName][r + 1 == n[h.tagName].length ? 0 : r + 1];
								c(h, r);
								for (m.insertBefore(h, q); q && !(d.getPosition(q, g.end) & d.POSITION_FOLLOWING);) {
									l = q.nextSibling;
									h.appendChild(q);
									if (!l || d.isTagNode(l, "ol ul")) {
										if (l) for (; (l = l.firstChild) && "LI" != l.tagName;);
										else l = d.getNextDomNode(q, !1, null,
										function(a) {
											return a !== t
										});
										break
									}
									q = l
								}
								b(h, h.tagName.toLowerCase(), r);
								q = l
							}
							k.fireEvent("contentchange");
							f.moveToBookmark(g).select();
							return ! 0
						}
					}
				});
				k.commands.insertorderedlist = k.commands.insertunorderedlist = {
					execCommand: function(e, g) {
						g || (g = "insertorderedlist" == e.toLowerCase() ? "decimal": "disc");
						var k = this.selection.getRange(),
						n = function(a) {
							return 1 == a.nodeType ? "br" != a.tagName.toLowerCase() : !d.isWhitespace(a)
						},
						m = "insertorderedlist" == e.toLowerCase() ? "ol": "ul",
						h = this.document.createDocumentFragment();
						k.adjustmentBoundary().shrinkBoundary();
						var r = k.createBookmark(!0),
						t = f(this.document.getElementById(r.start)),
						p = 0,
						q = f(this.document.getElementById(r.end)),
						s = 0,
						z,
						E,
						B,
						A;
						if (t || q) {
							t && (z = t.parentNode);
							r.end || (q = t);
							q && (E = q.parentNode);
							if (z === E) {
								for (; t !== q;) {
									A = t;
									t = t.nextSibling;
									if (!d.isBlockElm(A.firstChild)) {
										for (n = this.document.createElement("p"); A.firstChild;) n.appendChild(A.firstChild);
										A.appendChild(n)
									}
									h.appendChild(A)
								}
								A = this.document.createElement("span");
								z.insertBefore(A, q);
								if (!d.isBlockElm(q.firstChild)) {
									for (n = this.document.createElement("p"); q.firstChild;) n.appendChild(q.firstChild);
									q.appendChild(n)
								}
								h.appendChild(q);
								d.breakParent(A, z);
								d.isEmptyNode(A.previousSibling) && d.remove(A.previousSibling);
								d.isEmptyNode(A.nextSibling) && d.remove(A.nextSibling);
								n = a(z) || d.getComputedStyle(z, "list-style-type") || ("insertorderedlist" == e.toLowerCase() ? "decimal": "disc");
								if (z.tagName.toLowerCase() == m && n == g) {
									q = 0;
									for (q = this.document.createDocumentFragment(); n = h.firstChild;) if (d.isTagNode(n, "ol ul")) q.appendChild(n);
									else for (; n.firstChild;) q.appendChild(n.firstChild),
									d.remove(n);
									A.parentNode.insertBefore(q, A)
								} else B = this.document.createElement(m),
								c(B, g),
								B.appendChild(h),
								A.parentNode.insertBefore(B, A);
								d.remove(A);
								B && b(B, m, g);
								k.moveToBookmark(r).select();
								return
							}
							if (t) {
								for (; t;) {
									A = t.nextSibling;
									if (d.isTagNode(t, "ol ul")) h.appendChild(t);
									else {
										B = this.document.createDocumentFragment();
										for (var N = 0; t.firstChild;) d.isBlockElm(t.firstChild) && (N = 1),
										B.appendChild(t.firstChild);
										N ? h.appendChild(B) : (N = this.document.createElement("p"), N.appendChild(B), h.appendChild(N));
										d.remove(t)
									}
									t = A
								}
								z.parentNode.insertBefore(h, z.nextSibling);
								d.isEmptyNode(z) ? (k.setStartBefore(z), d.remove(z)) : k.setStartAfter(z);
								p = 1
							}
							if (q && d.inDoc(E, this.document)) {
								for (t = E.firstChild; t && t !== q;) {
									A = t.nextSibling;
									if (d.isTagNode(t, "ol ul")) h.appendChild(t);
									else {
										B = this.document.createDocumentFragment();
										for (N = 0; t.firstChild;) d.isBlockElm(t.firstChild) && (N = 1),
										B.appendChild(t.firstChild);
										N ? h.appendChild(B) : (N = this.document.createElement("p"), N.appendChild(B), h.appendChild(N));
										d.remove(t)
									}
									t = A
								}
								A = d.createElement(this.document, "div", {
									tmpDiv: 1
								});
								d.moveChild(q, A);
								h.appendChild(A);
								d.remove(q);
								E.parentNode.insertBefore(h, E);
								k.setEndBefore(E);
								d.isEmptyNode(E) && d.remove(E);
								s = 1
							}
						}
						p || k.setStartBefore(this.document.getElementById(r.start));
						r.end && !s && k.setEndAfter(this.document.getElementById(r.end));
						k.enlarge(!0,
						function(a) {
							return l[a.tagName]
						});
						h = this.document.createDocumentFragment();
						q = k.createBookmark();
						z = d.getNextDomNode(q.start, !1, n);
						B = k.cloneRange();
						for (p = d.isBlockElm; z && z !== q.end && d.getPosition(z, q.end) & d.POSITION_PRECEDING;) if (3 == z.nodeType || v.li[z.tagName]) if (1 == z.nodeType && v.$list[z.tagName]) {
							for (; z.firstChild;) h.appendChild(z.firstChild);
							t = d.getNextDomNode(z, !1, n);
							d.remove(z);
							z = t
						} else {
							t = z;
							for (B.setStartBefore(z); z && z !== q.end && (!p(z) || d.isBookmarkNode(z));) t = z,
							z = d.getNextDomNode(z, !1, null,
							function(a) {
								return ! l[a.tagName]
							});
							z && p(z) && (A = d.getNextDomNode(t, !1, n)) && d.isBookmarkNode(A) && (z = d.getNextDomNode(A, !1, n), t = A);
							B.setEndAfter(t);
							z = d.getNextDomNode(t, !1, n);
							A = k.document.createElement("li");
							A.appendChild(B.extractContents());
							if (d.isEmptyNode(A)) {
								for (t = k.document.createElement("p"); A.firstChild;) t.appendChild(A.firstChild);
								A.appendChild(t)
							}
							h.appendChild(A)
						} else z = d.getNextDomNode(z, !0, n);
						k.moveToBookmark(q).collapse(!0);
						B = this.document.createElement(m);
						c(B, g);
						B.appendChild(h);
						k.insertNode(B);
						b(B, m, g);
						q = 0;
						for (m = d.getElementsByTagName(B, "div"); n = m[q++];) n.getAttribute("tmpDiv") && d.remove(n, !0);
						k.moveToBookmark(r).select()
					},
					queryCommandState: function(a) {
						a = "insertorderedlist" == a.toLowerCase() ? "ol": "ul";
						for (var b = this.selection.getStartElementPath(), c = 0, e; (e = b[c++]) && "TABLE" != e.nodeName;) if (a == e.nodeName.toLowerCase()) return 1;
						return 0
					},
					queryCommandValue: function(b) {
						b = "insertorderedlist" == b.toLowerCase() ? "ol": "ul";
						for (var c = this.selection.getStartElementPath(), e, f = 0, l; l = c[f++];) {
							if ("TABLE" == l.nodeName) {
								e = null;
								break
							}
							if (b == l.nodeName.toLowerCase()) {
								e = l;
								break
							}
						}
						return e ? a(e) || d.getComputedStyle(e, "list-style-type") : null
					}
				}
			}; (function() {
				var h = {
					textarea: function(a, e) {
						var b = e.ownerDocument.createElement("textarea");
						b.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;";
						q.ie && 8 > q.version && (b.style.width = e.offsetWidth + "px", b.style.height = e.offsetHeight + "px", e.onresize = function() {
							b.style.width = e.offsetWidth + "px";
							b.style.height = e.offsetHeight + "px"
						});
						e.appendChild(b);
						return {
							setContent: function(a) {
								b.value = a
							},
							getContent: function() {
								return b.value
							},
							select: function() {
								var a;
								q.ie ? (a = b.createTextRange(), a.collapse(!0), a.select()) : (b.setSelectionRange(0, 0), b.focus())
							},
							dispose: function() {
								e.removeChild(b);
								e = b = e.onresize = null
							}
						}
					},
					codemirror: function(a, e) {
						var b = window.CodeMirror(e, {
							mode: "text/html",
							tabMode: "indent",
							lineNumbers: !0,
							lineWrapping: !0
						}),
						c = b.getWrapperElement();
						c.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';
						b.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;";
						b.refresh();
						return {
							getCodeMirror: function() {
								return b
							},
							setContent: function(a) {
								b.setValue(a)
							},
							getContent: function() {
								return b.getValue()
							},
							select: function() {
								b.focus()
							},
							dispose: function() {
								e.removeChild(c);
								b = c = null
							}
						}
					}
				};
				UE.plugins.source = function() {
					var a = this,
					e = this.options,
					b = !1,
					c, g;
					e.sourceEditor = q.ie ? "textarea": e.sourceEditor || "codemirror";
					a.setOpt({
						sourceEditorFirst: !1
					});
					var f, k, l;
					a.commands.source = {
						execCommand: function() {
							if (b = !b) {
								l = a.selection.getRange().createAddress(!1, !0);
								a.undoManger && a.undoManger.save(!0);
								q.gecko && (a.body.contentEditable = !1);
								f = a.iframe.style.cssText;
								a.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;";
								a.fireEvent("beforegetcontent");
								var n = UE.htmlparser(a.body.innerHTML);
								a.filterOutputRule(n);
								n.traversal(function(a) {
									if ("element" == a.type) switch (a.tagName) {
									case "td":
									case "th":
									case "caption":
										a.children && 1 == a.children.length && "br" == a.firstChild().tagName && a.removeChild(a.firstChild());
										break;
									case "pre":
										a.innerText(a.innerText().replace(/&nbsp;/g, " "))
									}
								});
								a.fireEvent("aftergetcontent");
								n = n.toHtml(!0);
								c = h["codemirror" == e.sourceEditor && window.CodeMirror ? "codemirror": "textarea"](a, a.iframe.parentNode);
								c.setContent(n);
								g = a.setContent;
								a.setContent = function(b) {
									b = UE.htmlparser(b);
									a.filterInputRule(b);
									b = b.toHtml();
									c.setContent(b)
								};
								setTimeout(function() {
									c.select();
									a.addListener("fullscreenchanged",
									function() {
										try {
											c.getCodeMirror().refresh()
										} catch(a) {}
									})
								});
								k = a.getContent;
								a.getContent = function() {
									return c.getContent() || "<p>" + (q.ie ? "": "<br/>") + "</p>"
								}
							} else if (a.iframe.style.cssText = f, n = c.getContent() || "<p>" + (q.ie ? "": "<br/>") + "</p>", n = n.replace(RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"),
							function(a, b) {
								return b && !v.$inlineWithA[b.toLowerCase()] ? a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "")
							}), a.setContent = g, a.setContent(n), c.dispose(), c = null, a.getContent = k, n = a.body.firstChild, n || (a.body.innerHTML = "<p>" + (q.ie ? "": "<br/>") + "</p>", n = a.body.firstChild), a.undoManger && a.undoManger.save(!0), q.gecko) {
								var m = document.createElement("input");
								m.style.cssText = "position:absolute;left:0;top:-32768px";
								document.body.appendChild(m);
								a.body.contentEditable = !1;
								setTimeout(function() {
									d.setViewportOffset(m, {
										left: -32768,
										top: 0
									});
									m.focus();
									setTimeout(function() {
										a.body.contentEditable = !0;
										a.selection.getRange().moveToAddress(l).select(!0);
										d.remove(m)
									})
								})
							} else try {
								a.selection.getRange().moveToAddress(l).select(!0)
							} catch(t) {}
							this.fireEvent("sourcemodechanged", b)
						},
						queryCommandState: function() {
							return b | 0
						},
						notNeedUndo: 1
					};
					var m = a.queryCommandState;
					a.queryCommandState = function(a) {
						a = a.toLowerCase();
						return b ? a in {
							source: 1,
							fullscreen: 1
						} ? 1 : -1 : m.apply(this, arguments)
					};
					"codemirror" == e.sourceEditor && a.addListener("ready",
					function() {
						p.loadFile(document, {
							src: e.codeMirrorJsUrl || e.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.js",
							tag: "script",
							type: "text/javascript",
							defer: "defer"
						},
						function() {
							e.sourceEditorFirst && setTimeout(function() {
								a.execCommand("source")
							},
							0)
						});
						p.loadFile(document, {
							tag: "link",
							rel: "stylesheet",
							type: "text/css",
							href: e.codeMirrorCssUrl || e.UEDITOR_HOME_URL + "third-party/codemirror/codemirror.css"
						})
					})
				}
			})();
			UE.plugins.enterkey = function() {
				var h, a = this,
				e = a.options.enterTag;
				a.addListener("keyup",
				function(b, c) {
					if (13 == (c.keyCode || c.which)) {
						var e = a.selection.getRange(),
						f = e.startContainer,
						k;
						if (q.ie) a.fireEvent("saveScene", !0, !0);
						else {
							if (/h\d/i.test(h)) {
								if (q.gecko) d.findParentByTagName(f, "h1 h2 h3 h4 h5 h6 blockquote caption table".split(" "), !0) || (a.document.execCommand("formatBlock", !1, "<p>"), k = 1);
								else if (1 == f.nodeType) {
									var f = a.document.createTextNode(""),
									l;
									e.insertNode(f);
									if (l = d.findParentByTagName(f, "div", !0)) {
										for (k = a.document.createElement("p"); l.firstChild;) k.appendChild(l.firstChild);
										l.parentNode.insertBefore(k, l);
										d.remove(l);
										e.setStartBefore(f).setCursor();
										k = 1
									}
									d.remove(f)
								}
								a.undoManger && k && a.undoManger.save()
							}
							q.opera && e.select()
						}
					}
				});
				a.addListener("keydown",
				function(b, c) {
					if (13 == (c.keyCode || c.which)) if (a.fireEvent("beforeenterkeydown")) d.preventDefault(c);
					else {
						a.fireEvent("saveScene", !0, !0);
						h = "";
						var g = a.selection.getRange();
						if (!g.collapsed) {
							var f = g.startContainer,
							k = g.endContainer,
							f = d.findParentByTagName(f, "td", !0),
							k = d.findParentByTagName(k, "td", !0);
							if (f && k && f !== k || !f && k || f && !k) {
								c.preventDefault ? c.preventDefault() : c.returnValue = !1;
								return
							}
						}
						if ("p" == e) q.ie || ((f = d.findParentByTagName(g.startContainer, "ol ul p h1 h2 h3 h4 h5 h6 blockquote caption".split(" "), !0)) || q.opera ? (h = f.tagName, "p" == f.tagName.toLowerCase() && q.gecko && d.removeDirtyAttr(f)) : (a.document.execCommand("formatBlock", !1, "<p>"), q.gecko && (g = a.selection.getRange(), (f = d.findParentByTagName(g.startContainer, "p", !0)) && d.removeDirtyAttr(f))));
						else if (c.preventDefault ? c.preventDefault() : c.returnValue = !1, g.collapsed) k = g.document.createElement("br"),
						g.insertNode(k),
						k.parentNode.lastChild === k ? (k.parentNode.insertBefore(k.cloneNode(!0), k), g.setStartBefore(k)) : g.setStartAfter(k),
						g.setCursor();
						else if (g.deleteContents(), f = g.startContainer, 1 == f.nodeType && (f = f.childNodes[g.startOffset])) {
							for (; 1 == f.nodeType;) {
								if (v.$empty[f.tagName]) return g.setStartBefore(f).setCursor(),
								a.undoManger && a.undoManger.save(),
								!1;
								if (!f.firstChild) return k = g.document.createElement("br"),
								f.appendChild(k),
								g.setStart(f, 0).setCursor(),
								a.undoManger && a.undoManger.save(),
								!1;
								f = f.firstChild
							}
							f === g.startContainer.childNodes[g.startOffset] ? (k = g.document.createElement("br"), g.insertNode(k).setCursor()) : g.setStart(f, 0).setCursor()
						} else k = g.document.createElement("br"),
						g.insertNode(k).setStartAfter(k).setCursor()
					}
				})
			};
			UE.plugins.keystrokes = function() {
				var h = this,
				a = !0;
				h.addListener("keydown",
				function(e, b) {
					var c = b.keyCode || b.which,
					g = h.selection.getRange();
					if (!g.collapsed && !(b.ctrlKey || b.shiftKey || b.altKey || b.metaKey) && (65 <= c && 90 >= c || 48 <= c && 57 >= c || 96 <= c && 111 >= c || {
						13 : 1,
						8 : 1,
						46 : 1
					} [c])) {
						var f = g.startContainer;
						d.isFillChar(f) && g.setStartBefore(f);
						f = g.endContainer;
						d.isFillChar(f) && g.setEndAfter(f);
						g.txtToElmBoundary();
						g.endContainer && 1 == g.endContainer.nodeType && (f = g.endContainer.childNodes[g.endOffset]) && d.isBr(f) && g.setEndAfter(f);
						if (0 == g.startOffset && (f = g.startContainer, d.isBoundaryNode(f, "firstChild") && (f = g.endContainer, g.endOffset == (3 == f.nodeType ? f.nodeValue.length: f.childNodes.length) && d.isBoundaryNode(f, "lastChild")))) {
							h.fireEvent("saveScene");
							h.body.innerHTML = "<p>" + (q.ie ? "": "<br/>") + "</p>";
							g.setStart(h.body.firstChild, 0).setCursor(!1, !0);
							h._selectionChange();
							return
						}
					}
					if (8 == c) {
						g = h.selection.getRange();
						a = g.collapsed;
						if (h.fireEvent("delkeydown", b)) return;
						var k, l;
						g.collapsed && g.inFillChar() && (k = g.startContainer, d.isFillChar(k) ? (g.setStartBefore(k).shrinkBoundary(!0).collapse(!0), d.remove(k)) : (k.nodeValue = k.nodeValue.replace(RegExp("^" + d.fillChar), ""), g.startOffset--, g.collapse(!0).select(!0)));
						if (k = g.getClosedNode()) {
							h.fireEvent("saveScene");
							g.setStartBefore(k);
							d.remove(k);
							g.setCursor();
							h.fireEvent("saveScene");
							d.preventDefault(b);
							return
						}
						if (!q.ie && (k = d.findParentByTagName(g.startContainer, "table", !0), l = d.findParentByTagName(g.endContainer, "table", !0), k && !l || !k && l || k !== l)) {
							b.preventDefault();
							return
						}
					}
					if (9 == c) {
						var m = {
							ol: 1,
							ul: 1,
							table: 1
						};
						if (h.fireEvent("tabkeydown", b)) {
							d.preventDefault(b);
							return
						}
						g = h.selection.getRange();
						h.fireEvent("saveScene");
						var f = 0,
						n = "";
						k = h.options.tabSize || 4;
						for (l = h.options.tabNode || "&nbsp;"; f < k; f++) n += l;
						f = h.document.createElement("span");
						f.innerHTML = n + d.fillChar;
						if (g.collapsed) g.insertNode(f.cloneNode(!0).firstChild).setCursor(!0);
						else if (n = function(a) {
							return d.isBlockElm(a) && !m[a.tagName.toLowerCase()]
						},
						k = d.findParent(g.startContainer, n, !0), l = d.findParent(g.endContainer, n, !0), k && l && k === l) g.deleteContents(),
						g.insertNode(f.cloneNode(!0).firstChild).setCursor(!0);
						else {
							k = g.createBookmark();
							g.enlarge(!0);
							l = g.createBookmark();
							for (var r = d.getNextDomNode(l.start, !1, n); r && !(d.getPosition(r, l.end) & d.POSITION_FOLLOWING);) r.insertBefore(f.cloneNode(!0).firstChild, r.firstChild),
							r = d.getNextDomNode(r, !1, n);
							g.moveToBookmark(l).moveToBookmark(k).select()
						}
						d.preventDefault(b)
					}
					if (q.gecko && 46 == c && (g = h.selection.getRange(), g.collapsed && (k = g.startContainer, d.isEmptyBlock(k)))) {
						for (c = k.parentNode; 1 == d.getChildCount(c) && !d.isBody(c);) k = c,
						c = c.parentNode;
						k === c.lastChild && b.preventDefault()
					}
				});
				h.addListener("keyup",
				function(e, b) {
					var c;
					if (8 == (b.keyCode || b.which) && !this.fireEvent("delkeyup")) {
						c = this.selection.getRange();
						if (c.collapsed) {
							var g;
							if ((g = d.findParentByTagName(c.startContainer, "h1 h2 h3 h4 h5 h6".split(" "), !0)) && d.isEmptyBlock(g)) {
								var f = g.previousSibling;
								if (f && "TABLE" != f.nodeName) {
									d.remove(g);
									c.setStartAtLast(f).setCursor(!1, !0);
									return
								}
								if ((f = g.nextSibling) && "TABLE" != f.nodeName) {
									d.remove(g);
									c.setStartAtFirst(f).setCursor(!1, !0);
									return
								}
							}
							d.isBody(c.startContainer) && (g = d.createElement(this.document, "p", {
								innerHTML: q.ie ? d.fillChar: "<br/>"
							}), c.insertNode(g).setStart(g, 0).setCursor(!1, !0))
						} ! a && (3 == c.startContainer.nodeType || 1 == c.startContainer.nodeType && d.isEmptyBlock(c.startContainer)) && (q.ie ? (g = c.document.createElement("span"), c.insertNode(g).setStartBefore(g).collapse(!0), c.select(), d.remove(g)) : c.select())
					}
				})
			};
			UE.plugins.fiximgclick = function() {
				function h() {
					this.cover = this.resizer = this.editor = null;
					this.doc = document;
					this.prePos = {
						x: 0,
						y: 0
					};
					this.startPos = {
						x: 0,
						y: 0
					}
				} (function() {
					var a = [[0, 0, -1, -1], [0, 0, 0, -1], [0, 0, 1, -1], [0, 0, -1, 0], [0, 0, 1, 0], [0, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1]];
					h.prototype = {
						init: function(a) {
							var b = this;
							b.editor = a;
							b.startPos = this.prePos = {
								x: 0,
								y: 0
							};
							b.dragId = -1;
							a = [];
							var c = b.cover = document.createElement("div"),
							g = b.resizer = document.createElement("div");
							c.id = b.editor.ui.id + "_imagescale_cover";
							c.style.cssText = "position:absolute;display:none;z-index:" + b.editor.options.zIndex + ";filter:alpha(opacity=0); opacity:0;background:#CCC;";
							d.on(c, "mousedown click",
							function() {
								b.hide()
							});
							for (i = 0; 8 > i; i++) a.push('<span class="edui-editor-scale-hand' + i + '"></span>');
							g.id = b.editor.ui.id + "_imagescale";
							g.className = "edui-editor-scale";
							g.innerHTML = a.join("");
							g.style.cssText += ";display:none;border:1px solid #3b77ff;z-index:" + b.editor.options.zIndex + ";";
							b.editor.ui.getDom().appendChild(c);
							b.editor.ui.getDom().appendChild(g);
							b.initStyle();
							b.initEvents()
						},
						initStyle: function() {
							p.cssRule("imagescale", ".edui-editor-scale{position:absolute;border:1px solid #38B2CE;}.edui-editor-scale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-scale .edui-editor-scale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-scale .edui-editor-scale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-scale .edui-editor-scale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-scale .edui-editor-scale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}")
						},
						initEvents: function() {
							this.startPos.x = this.startPos.y = 0;
							this.isDraging = !1
						},
						_eventHandler: function(a) {
							switch (a.type) {
							case "mousedown":
								var b = a.target || a.srcElement; - 1 != b.className.indexOf("edui-editor-scale-hand") && -1 == this.dragId && (this.dragId = b.className.slice( - 1), this.startPos.x = this.prePos.x = a.clientX, this.startPos.y = this.prePos.y = a.clientY, d.on(this.doc, "mousemove", this.proxy(this._eventHandler, this)));
								break;
							case "mousemove":
								-1 != this.dragId && (this.updateContainerStyle(this.dragId, {
									x: a.clientX - this.prePos.x,
									y: a.clientY - this.prePos.y
								}), this.prePos.x = a.clientX, this.prePos.y = a.clientY, this.updateTargetElement());
								break;
							case "mouseup":
								-1 != this.dragId && (this.updateContainerStyle(this.dragId, {
									x: a.clientX - this.prePos.x,
									y: a.clientY - this.prePos.y
								}), this.updateTargetElement(), this.target.parentNode && this.attachTo(this.target), this.dragId = -1),
								d.un(this.doc, "mousemove", this.proxy(this._eventHandler, this)),
								this.editor.fireEvent("contentchange")
							}
						},
						updateTargetElement: function() {
							d.setStyles(this.target, {
								width: this.resizer.style.width,
								height: this.resizer.style.height
							});
							this.attachTo(this.target)
						},
						updateContainerStyle: function(e, b) {
							var c = this.resizer,
							d;
							0 != a[e][0] && (d = parseInt(c.style.left) + b.x, c.style.left = this._validScaledProp("left", d) + "px");
							0 != a[e][1] && (d = parseInt(c.style.top) + b.y, c.style.top = this._validScaledProp("top", d) + "px");
							0 != a[e][2] && (d = c.clientWidth + a[e][2] * b.x, c.style.width = this._validScaledProp("width", d) + "px");
							0 != a[e][3] && (d = c.clientHeight + a[e][3] * b.y, c.style.height = this._validScaledProp("height", d) + "px")
						},
						_validScaledProp: function(a, b) {
							var c = this.resizer,
							d = document;
							b = isNaN(b) ? 0 : b;
							switch (a) {
							case "left":
								return 0 > b ? 0 : b + c.clientWidth > d.clientWidth ? d.clientWidth - c.clientWidth: b;
							case "top":
								return 0 > b ? 0 : b + c.clientHeight > d.clientHeight ? d.clientHeight - c.clientHeight: b;
							case "width":
								return 0 >= b ? 1 : b + c.offsetLeft > d.clientWidth ? d.clientWidth - c.offsetLeft: b;
							case "height":
								return 0 >= b ? 1 : b + c.offsetTop > d.clientHeight ? d.clientHeight - c.offsetTop: b
							}
						},
						hideCover: function() {
							this.cover.style.display = "none"
						},
						showCover: function() {
							var a = d.getXY(this.editor.ui.getDom()),
							b = d.getXY(this.editor.iframe);
							d.setStyles(this.cover, {
								width: this.editor.iframe.offsetWidth + "px",
								height: this.editor.iframe.offsetHeight + "px",
								top: b.y - a.y + "px",
								left: b.x - a.x + "px",
								position: "absolute",
								display: ""
							})
						},
						show: function(a) {
							this.resizer.style.display = "block";
							a && this.attachTo(a);
							d.on(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
							d.on(this.doc, "mouseup", this.proxy(this._eventHandler, this));
							this.showCover();
							this.editor.fireEvent("afterscaleshow", this);
							this.editor.fireEvent("saveScene")
						},
						hide: function() {
							this.hideCover();
							this.resizer.style.display = "none";
							d.un(this.resizer, "mousedown", this.proxy(this._eventHandler, this));
							d.un(this.doc, "mouseup", this.proxy(this._eventHandler, this));
							this.editor.fireEvent("afterscalehide", this)
						},
						proxy: function(a, b) {
							return function(c) {
								return a.apply(b || this, arguments)
							}
						},
						attachTo: function(a) {
							a = this.target = a;
							var b = this.resizer,
							c = d.getXY(a),
							g = d.getXY(this.editor.iframe),
							f = d.getXY(b.parentNode);
							d.setStyles(b, {
								width: a.width + "px",
								height: a.height + "px",
								left: g.x + c.x - this.editor.document.body.scrollLeft - f.x - parseInt(b.style.borderLeftWidth) + "px",
								top: g.y + c.y - this.editor.document.body.scrollTop - f.y - parseInt(b.style.borderTopWidth) + "px"
							})
						}
					}
				})();
				return function() {
					var a = this,
					e;
					a.setOpt("imageScaleEnabled", !0); ! q.ie && a.options.imageScaleEnabled && a.addListener("click",
					function(b, c) {
						var g = a.selection.getRange().getClosedNode();
						if (g && "IMG" == g.tagName && "false" != a.body.contentEditable) {
							if (!e) {
								e = new h;
								e.init(a);
								a.ui.getDom().appendChild(e.resizer);
								var f = function(b) {
									e.hide();
									e.target && a.selection.getRange().selectNode(e.target).select()
								},
								k = function(a) {
									var b = a.target || a.srcElement; ! b || void 0 !== b.className && -1 != b.className.indexOf("edui-editor-scale") || f(a)
								},
								l;
								a.addListener("afterscaleshow",
								function(b) {
									a.addListener("beforekeydown", f);
									a.addListener("beforemousedown", k);
									d.on(document, "keydown", f);
									d.on(document, "mousedown", k);
									a.selection.getNative().removeAllRanges()
								});
								a.addListener("afterscalehide",
								function(b) {
									a.removeListener("beforekeydown", f);
									a.removeListener("beforemousedown", k);
									d.un(document, "keydown", f);
									d.un(document, "mousedown", k);
									b = e.target;
									b.parentNode && a.selection.getRange().selectNode(b).select()
								});
								d.on(e.resizer, "mousedown",
								function(b) {
									a.selection.getNative().removeAllRanges();
									var c = b.target || b.srcElement;
									c && -1 == c.className.indexOf("edui-editor-scale-hand") && (l = setTimeout(function() {
										e.hide();
										e.target && a.selection.getRange().selectNode(c).select()
									},
									200))
								});
								d.on(e.resizer, "mouseup",
								function(a) { (a = a.target || a.srcElement) && -1 == a.className.indexOf("edui-editor-scale-hand") && clearTimeout(l)
								})
							}
							e.show(g)
						} else e && "none" != e.resizer.style.display && e.hide()
					});
					q.webkit && a.addListener("click",
					function(b, c) {
						"IMG" == c.target.tagName && "false" != a.body.contentEditable && (new I.Range(a.document)).selectNode(c.target).select()
					})
				}
			} ();
			UE.plugin.register("autolink",
			function() {
				return q.ie ? {}: {
					bindEvents: {
						reset: function() {},
						keydown: function(h, a) {
							var e = a.keyCode || a.which;
							if (32 == e || 13 == e) {
								for (var e = this.selection.getNative(), b = e.getRangeAt(0).cloneRange(), c, g = b.startContainer; 1 == g.nodeType && 0 < b.startOffset;) {
									g = b.startContainer.childNodes[b.startOffset - 1];
									if (!g) break;
									b.setStart(g, 1 == g.nodeType ? g.childNodes.length: g.nodeValue.length);
									b.collapse(!0);
									g = b.startContainer
								}
								do {
									if (0 == b.startOffset) {
										for (g = b.startContainer.previousSibling; g && 1 == g.nodeType;) g = g.lastChild;
										if (!g || d.isFillChar(g)) break;
										c = g.nodeValue.length
									} else g = b.startContainer, c = b.startOffset;
									b.setStart(g, c - 1);
									c = b.toString().charCodeAt(0)
								} while ( 160 != c && 32 != c );
								if (b.toString().replace(RegExp(d.fillChar, "g"), "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
									for (; b.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(b.toString());) try {
										b.setStart(b.startContainer, b.startOffset + 1)
									} catch(f) {
										for (g = b.startContainer; ! (next = g.nextSibling);) {
											if (d.isBody(g)) return;
											g = g.parentNode
										}
										b.setStart(next, 0)
									}
									if (!d.findParentByTagName(b.startContainer, "a", !0)) {
										c = this.document.createElement("a");
										var g = this.document.createTextNode(" "),
										k;
										this.undoManger && this.undoManger.save();
										c.appendChild(b.extractContents());
										c.href = c.innerHTML = c.innerHTML.replace(/<[^>]+>/g, "");
										k = c.getAttribute("href").replace(RegExp(d.fillChar, "g"), "");
										k = /^(?:https?:\/\/)/ig.test(k) ? k: "http://" + k;
										c.setAttribute("_src", p.html(k));
										c.href = p.html(k);
										b.insertNode(c);
										c.parentNode.insertBefore(g, c.nextSibling);
										b.setStart(g, 0);
										b.collapse(!0);
										e.removeAllRanges();
										e.addRange(b);
										this.undoManger && this.undoManger.save()
									}
								}
							}
						}
					}
				}
			},
			function() {
				function h(a) {
					if (3 == a.nodeType) return null;
					if ("A" == a.nodeName) return a;
					for (a = a.lastChild; a;) {
						if ("A" == a.nodeName) return a;
						if (3 == a.nodeType) {
							if (d.isWhitespace(a)) {
								a = a.previousSibling;
								continue
							}
							return null
						}
						a = a.lastChild
					}
				}
				var a = {
					37 : 1,
					38 : 1,
					39 : 1,
					40 : 1,
					13 : 1,
					32 : 1
				};
				q.ie && this.addListener("keyup",
				function(e, b) {
					var c = b.keyCode;
					if (a[c]) {
						var g = this.selection.getRange(),
						f = g.startContainer;
						if (13 == c) {
							for (; f && !d.isBody(f) && !d.isBlockElm(f);) f = f.parentNode;
							f && !d.isBody(f) && "P" == f.nodeName && (g = f.previousSibling) && 1 == g.nodeType && (g = h(g)) && !g.getAttribute("_href") && d.remove(g, !0)
						} else 32 == c ? 3 == f.nodeType && /^\s$/.test(f.nodeValue) && (f = f.previousSibling) && ("A" == f.nodeName && !f.getAttribute("_href")) && d.remove(f, !0) : (f = d.findParentByTagName(f, "a", !0)) && !f.getAttribute("_href") && (c = g.createBookmark(), d.remove(f, !0), g.moveToBookmark(c).select(!0))
					}
				})
			});
			UE.plugins.autoheight = function() {
				function h() {
					var a = this;
					clearTimeout(f);
					k || a.queryCommandState && (!a.queryCommandState || 1 == a.queryCommandState("source")) || (f = setTimeout(function() {
						for (var e = a.body.lastChild; e && 1 != e.nodeType;) e = e.previousSibling;
						e && 1 == e.nodeType && (e.style.clear = "both", g = Math.max(d.getXY(e).y + e.offsetHeight + 25, Math.max(c.minFrameHeight, c.initialFrameHeight)), g != b && (a.setHeight(g, !0), b = g), d.removeStyle(e, "clear"))
					},
					50))
				}
				var a = this;
				a.autoHeightEnabled = !1 !== a.options.autoHeightEnabled;
				if (a.autoHeightEnabled) {
					var e, b = 0,
					c = a.options,
					g, f, k;
					a.addListener("fullscreenchanged",
					function(a, b) {
						k = b
					});
					a.addListener("destroy",
					function() {
						a.removeListener("contentchange afterinserthtml keyup mouseup", h)
					});
					a.enableAutoHeight = function() {
						var a = this;
						if (a.autoHeightEnabled) {
							var b = a.document;
							a.autoHeightEnabled = !0;
							e = b.body.style.overflowY;
							b.body.style.overflowY = "hidden";
							a.addListener("contentchange afterinserthtml keyup mouseup", h);
							setTimeout(function() {
								h.call(a)
							},
							q.gecko ? 100 : 0);
							a.fireEvent("autoheightchanged", a.autoHeightEnabled)
						}
					};
					a.disableAutoHeight = function() {
						a.body.style.overflowY = e || "";
						a.removeListener("contentchange", h);
						a.removeListener("keyup", h);
						a.removeListener("mouseup", h);
						a.autoHeightEnabled = !1;
						a.fireEvent("autoheightchanged", a.autoHeightEnabled)
					};
					a.addListener("ready",
					function() {
						a.enableAutoHeight();
						var b;
						d.on(q.ie ? a.body: a.document, q.webkit ? "dragover": "drop",
						function() {
							clearTimeout(b);
							b = setTimeout(function() {
								h.call(a)
							},
							100)
						})
					})
				}
			};
			UE.plugins.autofloat = function() {
				function h() {
					var a = document.body.style;
					a.backgroundImage = 'url("about:blank")';
					a.backgroundAttachment = "fixed"
				}
				function a() {
					w = !0;
					n.parentNode && n.parentNode.removeChild(n);
					r.style.cssText = m
				}
				function e() {
					var c = x(b.container),
					e = b.options.toolbarTopOffset || 0;
					if (0 > c.top && c.bottom - r.offsetHeight > e) {
						var c = d.getXY(r),
						e = d.getComputedStyle(r, "position"),
						f = d.getComputedStyle(r, "left");
						r.style.width = r.offsetWidth + "px";
						r.style.zIndex = 1 * b.options.zIndex + 1;
						r.parentNode.insertBefore(n, r);
						k || l && q.ie ? ("absolute" != r.style.position && (r.style.position = "absolute"), r.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - t + g + "px") : (q.ie7Compat && w && (w = !1, r.style.left = d.getXY(r).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), "fixed" != r.style.position && (r.style.position = "fixed", r.style.top = g + "px", ("absolute" == e || "relative" == e) && parseFloat(f) && (r.style.left = c.x + "px")))
					} else a()
				}
				var b = this,
				c = b.getLang();
				b.setOpt({
					topOffset: 0
				});
				var g = b.options.topOffset;
				if (!1 !== b.options.autoFloatEnabled) {
					var f = UE.ui.uiUtils,
					k = q.ie && 6 >= q.version,
					l = q.quirks,
					m, n = document.createElement("div"),
					r,
					t,
					x,
					w = !0,
					u = p.defer(function() {
						e()
					},
					q.ie ? 200 : 100, !0);
					b.addListener("destroy",
					function() {
						d.un(window, ["scroll", "resize"], e);
						b.removeListener("keydown", u)
					});
					b.addListener("ready",
					function() {
						var l;
						UE.ui ? l = 1 : (alert(c.autofloatMsg), l = 0);
						l && b.ui && (x = f.getClientRect, r = b.ui.getDom("toolbarbox"), t = x(r).top, m = r.style.cssText, n.style.height = r.offsetHeight + "px", k && h(), d.on(window, ["scroll", "resize"], e), b.addListener("keydown", u), b.addListener("beforefullscreenchange",
						function(b, c) {
							c && a()
						}), b.addListener("fullscreenchanged",
						function(a, b) {
							b || e()
						}), b.addListener("sourcemodechanged",
						function(a, b) {
							setTimeout(function() {
								e()
							},
							0)
						}), b.addListener("clearDoc",
						function() {
							setTimeout(function() {
								e()
							},
							0)
						}))
					})
				}
			};
			UE.plugins.pasteplain = function() {
				this.setOpt({
					pasteplain: !1,
					filterTxtRules: function() {
						function a(a) {
							a.tagName = "p";
							a.setStyle()
						}
						function e(a) {
							a.parentNode.removeChild(a, !0)
						}
						return {
							"-": "script style object iframe embed input select",
							p: {
								$: {}
							},
							br: {
								$: {}
							},
							div: function(a) {
								for (var c, e = UE.uNode.createElement("p"); c = a.firstChild();)"text" != c.type && UE.dom.dtd.$block[c.tagName] ? e.firstChild() ? (a.parentNode.insertBefore(e, a), e = UE.uNode.createElement("p")) : a.parentNode.insertBefore(c, a) : e.appendChild(c);
								e.firstChild() && a.parentNode.insertBefore(e, a);
								a.parentNode.removeChild(a)
							},
							ol: e,
							ul: e,
							dl: e,
							dt: e,
							dd: e,
							li: e,
							caption: a,
							th: a,
							tr: a,
							h1: a,
							h2: a,
							h3: a,
							h4: a,
							h5: a,
							h6: a,
							td: function(a) {
								a.innerText() && a.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), a);
								a.parentNode.removeChild(a, a.innerText())
							}
						}
					} ()
				});
				var d = this.options.pasteplain;
				this.commands.pasteplain = {
					queryCommandState: function() {
						return d ? 1 : 0
					},
					execCommand: function() {
						d = !d | 0
					},
					notNeedUndo: 1
				}
			};
			UE.plugins.video = function() {
				function h(a, c, d, f, k, l, m) {
					var n;
					switch (m) {
					case "image":
						n = "<img " + (f ? 'id="' + f + '"': "") + ' width="' + c + '" height="' + d + '" _url="' + a + '" class="' + l + '" src="' + e.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + e.options.UEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (k ? "float:" + k + ";": "") + '" />';
						break;
					case "embed":
						n = '<embed type="application/x-shockwave-flash" class="' + l + '" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + p.html(a) + '" width="' + c + '" height="' + d + '"' + (k ? ' style="float:' + k + '"': "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
						break;
					case "video":
						m = a.substr(a.lastIndexOf(".") + 1),
						"ogv" == m && (m = "ogg"),
						n = "<video" + (f ? ' id="' + f + '"': "") + ' class="' + l + '" ' + (k ? ' style="float:' + k + '"': "") + ' controls preload="none" width="' + c + '" height="' + d + '" src="' + a + '" data-setup="{}"><source src="' + a + '" type="video/' + m + '" /></video>'
					}
					return n
				}
				function a(a, c) {
					p.each(a.getNodesByTagName(c ? "img": "embed video"),
					function(a) {
						var b = a.getAttr("class");
						if (b && -1 != b.indexOf("edui-faked-video")) {
							var e = h(c ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", b, c ? "embed": "image");
							a.parentNode.replaceChild(UE.uNode.createElement(e), a)
						}
						b && -1 != b.indexOf("edui-upload-video") && (e = h(c ? a.getAttr("_url") : a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), null, a.getStyle("float") || "", b, c ? "video": "image"), a.parentNode.replaceChild(UE.uNode.createElement(e), a))
					})
				}
				var e = this;
				e.addOutputRule(function(b) {
					a(b, !0)
				});
				e.addInputRule(function(b) {
					a(b)
				});
				e.commands.insertvideo = {
					execCommand: function(a, c, g) {
						c = p.isArray(c) ? c: [c];
						var f = [],
						k;
						a = 0;
						for (var l, m = c.length; a < m; a++) l = c[a],
						k = "upload" == g ? "edui-upload-video video-js vjs-default-skin": "edui-faked-video",
						f.push(h(l.url, l.width || 420, l.height || 280, "tmpVedio" + a, null, k, "image"));
						e.execCommand("inserthtml", f.join(""), !0);
						g = this.selection.getRange();
						a = 0;
						for (m = c.length; a < m; a++) f = this.document.getElementById("tmpVedio" + a),
						d.removeAttributes(f, "id"),
						g.selectNode(f).select(),
						e.execCommand("imagefloat", c[a].align)
					},
					queryCommandState: function() {
						var a = e.selection.getRange().getClosedNode();
						return ! a || "edui-faked-video" != a.className && -1 == a.className.indexOf("edui-upload-video") ? 0 : 1
					}
				}
			}; (function() {
				var h = UE.UETable = function(a) {
					this.table = a;
					this.indexTable = [];
					this.selectedTds = [];
					this.cellsRange = {};
					this.update(a)
				};
				h.removeSelectedClass = function(a) {
					p.each(a,
					function(a) {
						d.removeClasses(a, "selectTdClass")
					})
				};
				h.addSelectedClass = function(a) {
					p.each(a,
					function(a) {
						d.addClass(a, "selectTdClass")
					})
				};
				h.isEmptyBlock = function(a) {
					var e = RegExp(d.fillChar, "g");
					if (0 < a[q.ie ? "innerText": "textContent"].replace(/^\s*$/, "").replace(e, "").length) return 0;
					for (var b in v.$isNotEmpty) if (v.$isNotEmpty.hasOwnProperty(b) && a.getElementsByTagName(b).length) return 0;
					return 1
				};
				h.getWidth = function(a) {
					return a ? parseInt(d.getComputedStyle(a, "width"), 10) : 0
				};
				h.getTableCellAlignState = function(a) { ! p.isArray(a) && (a = [a]);
					var e = {},
					b = ["align", "valign"],
					c = null,
					d = !0;
					p.each(a,
					function(a) {
						p.each(b,
						function(b) {
							c = a.getAttribute(b);
							if (!e[b] && c) e[b] = c;
							else if (!e[b] || c !== e[b]) return d = !1
						});
						return d
					});
					return d ? e: null
				};
				h.getTableItemsByRange = function(a) {
					var e = a.selection.getStart();
					e && (e.id && 0 === e.id.indexOf("_baidu_bookmark_start_")) && (e = e.nextSibling);
					var b = (a = e && d.findParentByTagName(e, ["td", "th"], !0)) && a.parentNode,
					e = e && d.findParentByTagName(e, "caption", !0);
					return {
						cell: a,
						tr: b,
						table: e ? e.parentNode: b && b.parentNode.parentNode,
						caption: e
					}
				};
				h.getUETableBySelected = function(a) {
					return (a = h.getTableItemsByRange(a).table) && a.ueTable && a.ueTable.selectedTds.length ? a.ueTable: null
				};
				h.getDefaultValue = function(a, e) {
					var b = {
						thin: "0px",
						medium: "1px",
						thick: "2px"
					},
					c,
					g,
					f;
					if (e) k = e.getElementsByTagName("td")[0],
					f = d.getComputedStyle(e, "border-left-width"),
					c = parseInt(b[f] || f, 10),
					f = d.getComputedStyle(k, "padding-left"),
					g = parseInt(b[f] || f, 10),
					f = d.getComputedStyle(k, "border-left-width"),
					b = parseInt(b[f] || f, 10);
					else {
						e = a.document.createElement("table");
						e.insertRow(0).insertCell(0).innerHTML = "xxx";
						a.body.appendChild(e);
						var k = e.getElementsByTagName("td")[0];
						f = d.getComputedStyle(e, "border-left-width");
						c = parseInt(b[f] || f, 10);
						f = d.getComputedStyle(k, "padding-left");
						g = parseInt(b[f] || f, 10);
						f = d.getComputedStyle(k, "border-left-width");
						b = parseInt(b[f] || f, 10);
						d.remove(e)
					}
					return {
						tableBorder: c,
						tdPadding: g,
						tdBorder: b
					}
				};
				h.getUETable = function(a) {
					var e = a.tagName.toLowerCase();
					a = "td" == e || "th" == e || "caption" == e ? d.findParentByTagName(a, "table", !0) : a;
					a.ueTable || (a.ueTable = new h(a));
					return a.ueTable
				};
				h.cloneCell = function(a, e, b) {
					if (!a || p.isString(a)) return this.table.ownerDocument.createElement(a || "td");
					var c = d.hasClass(a, "selectTdClass");
					c && d.removeClasses(a, "selectTdClass");
					var g = a.cloneNode(!0);
					e && (g.rowSpan = g.colSpan = 1); ! b && d.removeAttributes(g, "width height"); ! b && d.removeAttributes(g, "style");
					g.style.borderLeftStyle = "";
					g.style.borderTopStyle = "";
					g.style.borderLeftColor = a.style.borderRightColor;
					g.style.borderLeftWidth = a.style.borderRightWidth;
					g.style.borderTopColor = a.style.borderBottomColor;
					g.style.borderTopWidth = a.style.borderBottomWidth;
					c && d.addClass(a, "selectTdClass");
					return g
				};
				h.prototype = {
					getMaxRows: function() {
						for (var a = this.table.rows,
						e = 1,
						b = 0,
						c; c = a[b]; b++) {
							for (var d = 1,
							f = 0,
							k; k = c.cells[f++];) d = Math.max(k.rowSpan || 1, d);
							e = Math.max(d + b, e)
						}
						return e
					},
					getMaxCols: function() {
						for (var a = this.table.rows,
						e = 0,
						b = {},
						c = 0,
						d; d = a[c]; c++) {
							for (var f = 0,
							k = 0,
							l; l = d.cells[k++];) if (f += l.colSpan || 1, l.rowSpan && 1 < l.rowSpan) for (var m = 1; m < l.rowSpan; m++) b["row_" + (c + m)] ? b["row_" + (c + m)]++:b["row_" + (c + m)] = l.colSpan || 1;
							f += b["row_" + c] || 0;
							e = Math.max(f, e)
						}
						return e
					},
					getCellColIndex: function(a) {},
					getHSideCell: function(a, e) {
						try {
							var b = this.getCellInfo(a),
							c,
							d,
							f = this.selectedTds.length,
							k = this.cellsRange;
							if (!e && (f ? !k.beginColIndex: !b.colIndex) || e && (f ? k.endColIndex == this.colsNum - 1 : b.colIndex == this.colsNum - 1)) return null;
							c = f ? k.beginRowIndex: b.rowIndex;
							d = e ? f ? k.endColIndex + 1 : b.colIndex + 1 : f ? k.beginColIndex - 1 : 1 > b.colIndex ? 0 : b.colIndex - 1;
							return this.getCell(this.indexTable[c][d].rowIndex, this.indexTable[c][d].cellIndex)
						} catch(l) {}
					},
					getTabNextCell: function(a, e) {
						var b = this.getCellInfo(a),
						c = e || b.rowIndex,
						b = b.colIndex + 1 + (b.colSpan - 1),
						d;
						try {
							d = this.getCell(this.indexTable[c][b].rowIndex, this.indexTable[c][b].cellIndex)
						} catch(f) {
							try {
								c = 1 * c + 1,
								b = 0,
								d = this.getCell(this.indexTable[c][b].rowIndex, this.indexTable[c][b].cellIndex)
							} catch(k) {}
						}
						return d
					},
					getVSideCell: function(a, e, b) {
						try {
							var c = this.getCellInfo(a),
							d,
							f,
							k = this.selectedTds.length && !b,
							l = this.cellsRange;
							if (!e && 0 == c.rowIndex || e && (k ? l.endRowIndex == this.rowsNum - 1 : c.rowIndex + c.rowSpan > this.rowsNum - 1)) return null;
							d = e ? k ? l.endRowIndex + 1 : c.rowIndex + c.rowSpan: k ? l.beginRowIndex - 1 : c.rowIndex - 1;
							f = k ? l.beginColIndex: c.colIndex;
							return this.getCell(this.indexTable[d][f].rowIndex, this.indexTable[d][f].cellIndex)
						} catch(m) {}
					},
					getSameEndPosCells: function(a, e) {
						try {
							for (var b = "x" === e.toLowerCase(), c = d.getXY(a)[b ? "x": "y"] + a["offset" + (b ? "Width": "Height")], g = this.table.rows, f = null, k = [], l = 0; l < this.rowsNum; l++) for (var f = g[l].cells, m = 0, n; n = f[m++];) {
								var h = d.getXY(n)[b ? "x": "y"] + n["offset" + (b ? "Width": "Height")];
								if (h > c && b) break;
								if (a == n || c == h) if (1 == n[b ? "colSpan": "rowSpan"] && k.push(n), b) break
							}
							return k
						} catch(t) {}
					},
					setCellContent: function(a, e) {
						a.innerHTML = e || (q.ie ? d.fillChar: "<br />")
					},
					cloneCell: h.cloneCell,
					getSameStartPosXCells: function(a) {
						try {
							var e = d.getXY(a).x + a.offsetWidth,
							b = this.table.rows,
							c;
							a = [];
							for (var g = 0; g < this.rowsNum; g++) {
								c = b[g].cells;
								for (var f = 0,
								k; k = c[f++];) {
									var l = d.getXY(k).x;
									if (l > e) break;
									if (l == e && 1 == k.colSpan) {
										a.push(k);
										break
									}
								}
							}
							return a
						} catch(m) {}
					},
					update: function(a) {
						this.table = a || this.table;
						this.selectedTds = [];
						this.cellsRange = {};
						this.indexTable = [];
						a = this.table.rows;
						for (var e = this.getMaxRows(), b = e - a.length, c = this.getMaxCols(); b--;) this.table.insertRow(a.length);
						this.rowsNum = e;
						this.colsNum = c;
						for (var b = 0,
						g = a.length; b < g; b++) this.indexTable[b] = Array(c);
						for (var b = 0,
						f; f = a[b]; b++) {
							var g = 0,
							k;
							for (f = f.cells; k = f[g]; g++) {
								k.rowSpan > e && (k.rowSpan = e);
								var l = g,
								m = k.rowSpan || 1;
								for (k = k.colSpan || 1; this.indexTable[b][l];) l++;
								for (var n = 0; n < m; n++) for (var h = 0; h < k; h++) this.indexTable[b + n][l + h] = {
									rowIndex: b,
									cellIndex: g,
									colIndex: l,
									rowSpan: m,
									colSpan: k
								}
							}
						}
						for (n = 0; n < e; n++) for (h = 0; h < c; h++) void 0 === this.indexTable[n][h] && (f = a[n], k = (k = f.cells[f.cells.length - 1]) ? k.cloneNode(!0) : this.table.ownerDocument.createElement("td"), this.setCellContent(k), 1 !== k.colSpan && (k.colSpan = 1), 1 !== k.rowSpan && (k.rowSpan = 1), f.appendChild(k), this.indexTable[n][h] = {
							rowIndex: n,
							cellIndex: k.cellIndex,
							colIndex: h,
							rowSpan: 1,
							colSpan: 1
						});
						a = d.getElementsByTagName(this.table, "td");
						var t = [];
						p.each(a,
						function(a) {
							d.hasClass(a, "selectTdClass") && t.push(a)
						});
						t.length && (e = t[t.length - 1], a = this.getCellInfo(t[0]), e = this.getCellInfo(e), this.selectedTds = t, this.cellsRange = {
							beginRowIndex: a.rowIndex,
							beginColIndex: a.colIndex,
							endRowIndex: e.rowIndex + e.rowSpan - 1,
							endColIndex: e.colIndex + e.colSpan - 1
						});
						if (!d.hasClass(this.table.rows[0], "firstRow")) for (d.addClass(this.table.rows[0], "firstRow"), b = 1; b < this.table.rows.length; b++) d.removeClasses(this.table.rows[b], "firstRow")
					},
					getCellInfo: function(a) {
						if (a) {
							var e = a.cellIndex;
							a = a.parentNode.rowIndex;
							for (var b = this.indexTable[a], c = this.colsNum, d = e; d < c; d++) {
								var f = b[d];
								if (f.rowIndex === a && f.cellIndex === e) return f
							}
						}
					},
					getCell: function(a, e) {
						return a < this.rowsNum && this.table.rows[a].cells[e] || null
					},
					deleteCell: function(a, e) {
						e = "number" == typeof e ? e: a.parentNode.rowIndex;
						this.table.rows[e].deleteCell(a.cellIndex)
					},
					getCellsRange: function(a, e) {
						function b(a, e, d, f) {
							var l = a,
							k = e,
							g = d,
							n = f,
							m, h, r;
							if (0 < a) for (h = e; h < f; h++) m = c.indexTable[a][h],
							r = m.rowIndex,
							r < a && (l = Math.min(r, l));
							if (f < c.colsNum) for (r = a; r < d; r++) m = c.indexTable[r][f],
							h = m.colIndex + m.colSpan - 1,
							h > f && (n = Math.max(h, n));
							if (d < c.rowsNum) for (h = e; h < f; h++) m = c.indexTable[d][h],
							r = m.rowIndex + m.rowSpan - 1,
							r > d && (g = Math.max(r, g));
							if (0 < e) for (r = a; r < d; r++) m = c.indexTable[r][e],
							h = m.colIndex,
							h < e && (k = Math.min(m.colIndex, k));
							return l != a || k != e || g != d || n != f ? b(l, k, g, n) : {
								beginRowIndex: a,
								beginColIndex: e,
								endRowIndex: d,
								endColIndex: f
							}
						}
						try {
							var c = this,
							d = c.getCellInfo(a);
							if (a === e) return {
								beginRowIndex: d.rowIndex,
								beginColIndex: d.colIndex,
								endRowIndex: d.rowIndex + d.rowSpan - 1,
								endColIndex: d.colIndex + d.colSpan - 1
							};
							var f = c.getCellInfo(e),
							k = Math.min(d.rowIndex, f.rowIndex),
							l = Math.min(d.colIndex, f.colIndex),
							m = Math.max(d.rowIndex + d.rowSpan - 1, f.rowIndex + f.rowSpan - 1),
							n = Math.max(d.colIndex + d.colSpan - 1, f.colIndex + f.colSpan - 1);
							return b(k, l, m, n)
						} catch(h) {}
					},
					getCells: function(a) {
						this.clearSelected();
						for (var e = a.beginColIndex,
						b = a.endRowIndex,
						c = a.endColIndex,
						d, f, k = {},
						l = [], m = a.beginRowIndex; m <= b; m++) for (var n = e; n <= c; n++) {
							a = this.indexTable[m][n];
							d = a.rowIndex;
							f = a.colIndex;
							var h = d + "|" + f;
							if (!k[h]) {
								k[h] = 1;
								if (d < m || f < n || d + a.rowSpan - 1 > b || f + a.colSpan - 1 > c) return null;
								l.push(this.getCell(d, a.cellIndex))
							}
						}
						return l
					},
					clearSelected: function() {
						h.removeSelectedClass(this.selectedTds);
						this.selectedTds = [];
						this.cellsRange = {}
					},
					setSelected: function(a) {
						var e = this.getCells(a);
						h.addSelectedClass(e);
						this.selectedTds = e;
						this.cellsRange = a
					},
					isFullRow: function() {
						var a = this.cellsRange;
						return a.endColIndex - a.beginColIndex + 1 == this.colsNum
					},
					isFullCol: function() {
						var a = this.cellsRange,
						e = this.table.getElementsByTagName("th"),
						a = a.endRowIndex - a.beginRowIndex + 1;
						return e.length ? a == this.rowsNum || a == this.rowsNum - 1 : a == this.rowsNum
					},
					getNextCell: function(a, e, b) {
						try {
							var c = this.getCellInfo(a),
							d,
							f,
							k = this.selectedTds.length && !b,
							l = this.cellsRange;
							if (!e && 0 == c.rowIndex || e && (k ? l.endRowIndex == this.rowsNum - 1 : c.rowIndex + c.rowSpan > this.rowsNum - 1)) return null;
							d = e ? k ? l.endRowIndex + 1 : c.rowIndex + c.rowSpan: k ? l.beginRowIndex - 1 : c.rowIndex - 1;
							f = k ? l.beginColIndex: c.colIndex;
							return this.getCell(this.indexTable[d][f].rowIndex, this.indexTable[d][f].cellIndex)
						} catch(m) {}
					},
					getPreviewCell: function(a, e) {
						try {
							var b = this.getCellInfo(a),
							c,
							d,
							f = this.selectedTds.length,
							k = this.cellsRange;
							if (!e && (f ? !k.beginColIndex: !b.colIndex) || e && (f ? k.endColIndex == this.colsNum - 1 : b.rowIndex > this.colsNum - 1)) return null;
							c = e ? f ? k.beginRowIndex: 1 > b.rowIndex ? 0 : b.rowIndex - 1 : f ? k.beginRowIndex: b.rowIndex;
							d = e ? f ? k.endColIndex + 1 : b.colIndex: f ? k.beginColIndex - 1 : 1 > b.colIndex ? 0 : b.colIndex - 1;
							return this.getCell(this.indexTable[c][d].rowIndex, this.indexTable[c][d].cellIndex)
						} catch(l) {}
					},
					moveContent: function(a, e) {
						if (!h.isEmptyBlock(e)) if (h.isEmptyBlock(a)) a.innerHTML = e.innerHTML;
						else {
							var b = a.lastChild;
							for (3 != b.nodeType && v.$block[b.tagName] || a.appendChild(a.ownerDocument.createElement("br")); b = e.firstChild;) a.appendChild(b)
						}
					},
					mergeRight: function(a) {
						var e = this.getCellInfo(a),
						b = this.indexTable[e.rowIndex][e.colIndex + e.colSpan],
						c = this.getCell(b.rowIndex, b.cellIndex);
						a.colSpan = e.colSpan + b.colSpan;
						a.removeAttribute("width");
						this.moveContent(a, c);
						this.deleteCell(c, b.rowIndex);
						this.update()
					},
					mergeDown: function(a) {
						var e = this.getCellInfo(a),
						b = this.indexTable[e.rowIndex + e.rowSpan][e.colIndex],
						c = this.getCell(b.rowIndex, b.cellIndex);
						a.rowSpan = e.rowSpan + b.rowSpan;
						a.removeAttribute("height");
						this.moveContent(a, c);
						this.deleteCell(c, b.rowIndex);
						this.update()
					},
					mergeRange: function() {
						var a = this.cellsRange,
						e = this.getCell(a.beginRowIndex, this.indexTable[a.beginRowIndex][a.beginColIndex].cellIndex);
						if ("TH" == e.tagName && a.endRowIndex !== a.beginRowIndex) var b = this.indexTable,
						a = this.getCellInfo(e),
						e = this.getCell(1, b[1][a.colIndex].cellIndex),
						a = this.getCellsRange(e, this.getCell(b[this.rowsNum - 1][a.colIndex].rowIndex, b[this.rowsNum - 1][a.colIndex].cellIndex));
						for (var c = this.getCells(a), b = 0, d; d = c[b++];) d !== e && (this.moveContent(e, d), this.deleteCell(d));
						e.rowSpan = a.endRowIndex - a.beginRowIndex + 1;
						1 < e.rowSpan && e.removeAttribute("height");
						e.colSpan = a.endColIndex - a.beginColIndex + 1;
						1 < e.colSpan && e.removeAttribute("width");
						e.rowSpan == this.rowsNum && 1 != e.colSpan && (e.colSpan = 1);
						if (e.colSpan == this.colsNum && 1 != e.rowSpan) {
							c = e.parentNode.rowIndex;
							if (this.table.deleteRow) for (b = c + 1, c += 1, a = e.rowSpan; b < a; b++) this.table.deleteRow(c);
							else for (b = 0, a = e.rowSpan - 1; b < a; b++) d = this.table.rows[c + 1],
							d.parentNode.removeChild(d);
							e.rowSpan = 1
						}
						this.update()
					},
					insertRow: function(a, e) {
						function b(a, b, c) {
							0 == a ? (a = (c.nextSibling || c.previousSibling).cells[a], "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), c.insertBefore(a, b), d.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), c.insertBefore(a, b), d.remove(b))
						}
						var c = this.colsNum,
						g = this.table.insertRow(a),
						f,
						k = "string" == typeof e && "TH" == e.toUpperCase();
						if (0 == a || a == this.rowsNum) for (var l = 0; l < c; l++) f = this.cloneCell(e, !0),
						this.setCellContent(f),
						f.getAttribute("vAlign") && f.setAttribute("vAlign", f.getAttribute("vAlign")),
						g.appendChild(f),
						k || b(l, f, g);
						else for (var m = this.indexTable[a], l = 0; l < c; l++) {
							var n = m[l];
							n.rowIndex < a ? (f = this.getCell(n.rowIndex, n.cellIndex), f.rowSpan = n.rowSpan + 1) : (f = this.cloneCell(e, !0), this.setCellContent(f), g.appendChild(f));
							k || b(l, f, g)
						}
						this.update();
						return g
					},
					deleteRow: function(a) {
						for (var e = this.table.rows[a], b = this.indexTable[a], c = this.colsNum, g = 0, f = 0; f < c;) {
							var k = b[f],
							l = this.getCell(k.rowIndex, k.cellIndex);
							if (1 < l.rowSpan && k.rowIndex == a) {
								k = l.cloneNode(!0);
								k.rowSpan = l.rowSpan - 1;
								k.innerHTML = "";
								l.rowSpan = 1;
								var m = a + 1,
								n = this.table.rows[m],
								m = this.getPreviewMergedCellsNum(m, f) - g;
								m < f ? (m = f - m - 1, d.insertAfter(n.cells[m], k)) : n.cells.length && n.insertBefore(k, n.cells[0]);
								g += 1
							}
							f += l.colSpan || 1
						}
						a = [];
						g = {};
						for (f = 0; f < c; f++) l = b[f].rowIndex,
						k = b[f].cellIndex,
						n = l + "_" + k,
						g[n] || (g[n] = 1, l = this.getCell(l, k), a.push(l));
						var h = [];
						p.each(a,
						function(a) {
							1 == a.rowSpan ? a.parentNode.removeChild(a) : h.push(a)
						});
						p.each(h,
						function(a) {
							a.rowSpan--
						});
						e.parentNode.removeChild(e);
						this.update()
					},
					insertCol: function(a, e, b) {
						function c(a, b, c) {
							0 == a ? (a = b.nextSibling || b.previousSibling, "TH" == a.tagName && (a = b.ownerDocument.createElement("th"), a.appendChild(b.firstChild), c.insertBefore(a, b), d.remove(b))) : "TH" == b.tagName && (a = b.ownerDocument.createElement("td"), a.appendChild(b.firstChild), c.insertBefore(a, b), d.remove(b))
						}
						var g = this.rowsNum,
						f = 0,
						k, l, m = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum + 1)) / (this.colsNum + 1), 10),
						n = "string" == typeof e && "TH" == e.toUpperCase(),
						h;
						if (0 == a || a == this.colsNum) for (; f < g; f++) k = this.table.rows[f],
						h = k.cells[0 == a ? a: k.cells.length],
						l = this.cloneCell(e, !0),
						this.setCellContent(l),
						l.setAttribute("vAlign", l.getAttribute("vAlign")),
						h && l.setAttribute("width", h.getAttribute("width")),
						a ? d.insertAfter(k.cells[k.cells.length - 1], l) : k.insertBefore(l, k.cells[0]),
						n || c(f, l, k);
						else for (; f < g; f++) h = this.indexTable[f][a],
						h.colIndex < a ? (l = this.getCell(h.rowIndex, h.cellIndex), l.colSpan = h.colSpan + 1) : (k = this.table.rows[f], h = k.cells[h.cellIndex], l = this.cloneCell(e, !0), this.setCellContent(l), l.setAttribute("vAlign", l.getAttribute("vAlign")), h && l.setAttribute("width", h.getAttribute("width")), h ? k.insertBefore(l, h) : k.appendChild(l)),
						n || c(f, l, k);
						this.update();
						this.updateWidth(m, b || {
							tdPadding: 10,
							tdBorder: 1
						})
					},
					updateWidth: function(a, e) {
						var b = this.table,
						c = h.getWidth(b) - 2 * e.tdPadding - e.tdBorder + a;
						c < b.ownerDocument.body.offsetWidth ? b.setAttribute("width", c) : (b = d.getElementsByTagName(this.table, "td th"), p.each(b,
						function(b) {
							b.setAttribute("width", a)
						}))
					},
					deleteCol: function(a) {
						for (var e = this.indexTable,
						b = this.table.rows,
						c = this.table.getAttribute("width"), d = 0, f = this.rowsNum, k = {},
						l = 0; l < f;) {
							var h = e[l][a],
							n = h.rowIndex + "_" + h.colIndex;
							k[n] || (k[n] = 1, n = this.getCell(h.rowIndex, h.cellIndex), d || (d = n && parseInt(n.offsetWidth / n.colSpan, 10).toFixed(0)), 1 < n.colSpan ? n.colSpan--:b[l].deleteCell(h.cellIndex), l += h.rowSpan || 1)
						}
						this.table.setAttribute("width", c - d);
						this.update()
					},
					splitToCells: function(a) {
						var d = this;
						a = this.splitToRows(a);
						p.each(a,
						function(a) {
							d.splitToCols(a)
						})
					},
					splitToRows: function(a) {
						var d = this.getCellInfo(a),
						b = d.rowIndex,
						c = d.colIndex,
						g = [];
						a.rowSpan = 1;
						g.push(a);
						for (var f = b,
						k = b + d.rowSpan; f < k; f++) if (f != b) {
							var l = this.table.rows[f].insertCell(c - this.getPreviewMergedCellsNum(f, c));
							l.colSpan = d.colSpan;
							this.setCellContent(l);
							l.setAttribute("vAlign", a.getAttribute("vAlign"));
							l.setAttribute("align", a.getAttribute("align"));
							a.style.cssText && (l.style.cssText = a.style.cssText);
							g.push(l)
						}
						this.update();
						return g
					},
					getPreviewMergedCellsNum: function(a, d) {
						for (var b = this.indexTable[a], c = 0, g = 0; g < d;) var f = b[g].colSpan,
						c = c + (f - (b[g].rowIndex == a ? 1 : 0)),
						g = g + f;
						return c
					},
					splitToCols: function(a) {
						var e = (a.offsetWidth / a.colSpan - 22).toFixed(0),
						b = this.getCellInfo(a),
						c = b.rowIndex,
						g = b.colIndex,
						f = [];
						a.colSpan = 1;
						a.setAttribute("width", e);
						f.push(a);
						for (var k = g,
						l = g + b.colSpan; k < l; k++) if (k != g) {
							var h = this.table.rows[c],
							n = h.insertCell(this.indexTable[c][k].cellIndex + 1);
							n.rowSpan = b.rowSpan;
							this.setCellContent(n);
							n.setAttribute("vAlign", a.getAttribute("vAlign"));
							n.setAttribute("align", a.getAttribute("align"));
							n.setAttribute("width", e);
							a.style.cssText && (n.style.cssText = a.style.cssText);
							if ("TH" == a.tagName) {
								var r = a.ownerDocument.createElement("th");
								r.appendChild(n.firstChild);
								r.setAttribute("vAlign", a.getAttribute("vAlign"));
								r.rowSpan = n.rowSpan;
								h.insertBefore(r, n);
								d.remove(n)
							}
							f.push(n)
						}
						this.update();
						return f
					},
					isLastCell: function(a, d, b) {
						d = d || this.rowsNum;
						b = b || this.colsNum;
						a = this.getCellInfo(a);
						return a.rowIndex + a.rowSpan == d && a.colIndex + a.colSpan == b
					},
					getLastCell: function(a) {
						a = a || this.table.getElementsByTagName("td");
						this.getCellInfo(a[0]);
						var d = this,
						b = a[0],
						c = b.parentNode,
						g = 0,
						f = 0,
						k;
						p.each(a,
						function(a) {
							a.parentNode == c && (f += a.colSpan || 1);
							g += a.rowSpan * a.colSpan || 1
						});
						k = g / f;
						p.each(a,
						function(a) {
							if (d.isLastCell(a, k, f)) return b = a,
							!1
						});
						return b
					},
					selectRow: function(a) {
						var d = this.indexTable[a];
						a = this.getCell(d[0].rowIndex, d[0].cellIndex);
						d = this.getCell(d[this.colsNum - 1].rowIndex, d[this.colsNum - 1].cellIndex);
						a = this.getCellsRange(a, d);
						this.setSelected(a)
					},
					selectTable: function() {
						var a = this.table.getElementsByTagName("td"),
						a = this.getCellsRange(a[0], a[a.length - 1]);
						this.setSelected(a)
					},
					setBackground: function(a, d) {
						if ("string" === typeof d) p.each(a,
						function(a) {
							a.style.backgroundColor = d
						});
						else if ("object" === typeof d) {
							d = p.extend({
								repeat: !0,
								colorList: ["#ddd", "#fff"]
							},
							d);
							for (var b = this.getCellInfo(a[0]).rowIndex, c = 0, g = d.colorList, f = function(a, b, c) {
								return a[b] ? a[b] : c ? a[b % a.length] : ""
							},
							k = 0, l; l = a[k++];) {
								var h = this.getCellInfo(l);
								l.style.backgroundColor = f(g, b + c == h.rowIndex ? c: ++c, d.repeat)
							}
						}
					},
					removeBackground: function(a) {
						p.each(a,
						function(a) {
							a.style.backgroundColor = ""
						})
					}
				}
			})(); (function() {
				function h(c, e) {
					var l = d.getElementsByTagName(c, "td th");
					p.each(l,
					function(a) {
						a.removeAttribute("width")
					});
					c.setAttribute("width", a(e, !0, b.getDefaultValue(e, c)));
					var g = [];
					setTimeout(function() {
						p.each(l,
						function(a) {
							1 == a.colSpan && g.push(a.offsetWidth)
						});
						p.each(l,
						function(a, b) {
							1 == a.colSpan && a.setAttribute("width", g[b] + "")
						})
					},
					0)
				}
				function a(a, b, c) {
					var e = a.body;
					return e.offsetWidth - (b ? 2 * parseInt(d.getComputedStyle(e, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
				}
				function e(a) {
					if (a = c(a).cell) {
						var b = g(a);
						return b.selectedTds.length ? b.selectedTds: [a]
					}
					return []
				}
				var b = UE.UETable,
				c = function(a) {
					return b.getTableItemsByRange(a)
				},
				g = function(a) {
					return b.getUETable(a)
				};
				UE.commands.inserttable = {
					queryCommandState: function() {
						return c(this).table ? -1 : 0
					},
					execCommand: function(a, c) {
						c || (c = p.extend({},
						{
							numCols: this.options.defaultCols,
							numRows: this.options.defaultRows,
							tdvalign: this.options.tdvalign
						}));
						var e = this.selection.getRange().startContainer,
						e = d.findParent(e,
						function(a) {
							return d.isBlockElm(a)
						},
						!0) || this.body,
						g = b.getDefaultValue(this, void 0),
						e = Math.floor(e.offsetWidth / c.numCols - 2 * g.tdPadding - g.tdBorder); ! c.tdvalign && (c.tdvalign = this.options.tdvalign);
						this.execCommand("inserthtml",
						function(a, b) {
							for (var c = [], e = a.numRows, f = a.numCols, l = 0; l < e; l++) {
								c.push("<tr>");
								for (var k = 0; k < f; k++) c.push('<td width="' + b + '"  vAlign="' + a.tdvalign + '" >' + (q.ie ? d.fillChar: "<br/>") + "</td>");
								c.push("</tr>")
							}
							return "<table><tbody>" + c.join("") + "</tbody></table>"
						} (c, e))
					}
				};
				UE.commands.insertparagraphbeforetable = {
					queryCommandState: function() {
						return c(this).cell ? 0 : -1
					},
					execCommand: function() {
						var a = c(this).table;
						if (a) {
							var b = this.document.createElement("p");
							b.innerHTML = q.ie ? "&nbsp;": "<br />";
							a.parentNode.insertBefore(b, a);
							this.selection.getRange().setStart(b, 0).setCursor()
						}
					}
				};
				UE.commands.deletetable = {
					queryCommandState: function() {
						var a = this.selection.getRange();
						return d.findParentByTagName(a.startContainer, "table", !0) ? 0 : -1
					},
					execCommand: function(a, b) {
						var c = this.selection.getRange();
						if (b = b || d.findParentByTagName(c.startContainer, "table", !0)) {
							var e = b.nextSibling;
							e || (e = d.createElement(this.document, "p", {
								innerHTML: q.ie ? d.fillChar: "<br/>"
							}), b.parentNode.insertBefore(e, b));
							d.remove(b);
							c = this.selection.getRange();
							3 == e.nodeType ? c.setStartBefore(e) : c.setStart(e, 0);
							c.setCursor(!1, !0);
							this.fireEvent("tablehasdeleted")
						}
					}
				};
				UE.commands.cellalign = {
					queryCommandState: function() {
						return e(this).length ? 0 : -1
					},
					execCommand: function(a, b) {
						var c = e(this);
						if (c.length) for (var d = 0,
						g; g = c[d++];) g.setAttribute("align", b)
					}
				};
				UE.commands.cellvalign = {
					queryCommandState: function() {
						return e(this).length ? 0 : -1
					},
					execCommand: function(a, b) {
						var c = e(this);
						if (c.length) for (var d = 0,
						g; g = c[d++];) g.setAttribute("vAlign", b)
					}
				};
				UE.commands.insertcaption = {
					queryCommandState: function() {
						var a = c(this).table;
						return a ? 0 == a.getElementsByTagName("caption").length ? 1 : -1 : -1
					},
					execCommand: function() {
						var a = c(this).table;
						if (a) {
							var b = this.document.createElement("caption");
							b.innerHTML = q.ie ? d.fillChar: "<br/>";
							a.insertBefore(b, a.firstChild);
							this.selection.getRange().setStart(b, 0).setCursor()
						}
					}
				};
				UE.commands.deletecaption = {
					queryCommandState: function() {
						var a = this.selection.getRange();
						return (a = d.findParentByTagName(a.startContainer, "table")) ? 0 == a.getElementsByTagName("caption").length ? -1 : 1 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange();
						if (a = d.findParentByTagName(a.startContainer, "table")) d.remove(a.getElementsByTagName("caption")[0]),
						this.selection.getRange().setStart(a.rows[0].cells[0], 0).setCursor()
					}
				};
				UE.commands.inserttitle = {
					queryCommandState: function() {
						var a = c(this).table;
						return a ? (a = a.rows[0], "th" != a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
					},
					execCommand: function() {
						var a = c(this).table;
						a && g(a).insertRow(0, "th");
						a = a.getElementsByTagName("th")[0];
						this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
					}
				};
				UE.commands.deletetitle = {
					queryCommandState: function() {
						var a = c(this).table;
						return a ? (a = a.rows[0], "th" == a.cells[a.cells.length - 1].tagName.toLowerCase() ? 0 : -1) : -1
					},
					execCommand: function() {
						var a = c(this).table;
						a && d.remove(a.rows[0]);
						a = a.getElementsByTagName("td")[0];
						this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
					}
				};
				UE.commands.inserttitlecol = {
					queryCommandState: function() {
						var a = c(this).table;
						return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? -1 : 0 : -1
					},
					execCommand: function(a) { (a = c(this).table) && g(a).insertCol(0, "th");
						h(a, this);
						a = a.getElementsByTagName("th")[0];
						this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
					}
				};
				UE.commands.deletetitlecol = {
					queryCommandState: function() {
						var a = c(this).table;
						return a ? a.rows[a.rows.length - 1].getElementsByTagName("th").length ? 0 : -1 : -1
					},
					execCommand: function() {
						var a = c(this).table;
						if (a) for (var b = 0; b < a.rows.length; b++) d.remove(a.rows[b].children[0]);
						h(a, this);
						a = a.getElementsByTagName("td")[0];
						this.selection.getRange().setStart(a, 0).setCursor(!1, !0)
					}
				};
				UE.commands.mergeright = {
					queryCommandState: function(a) {
						var b = c(this);
						if (!b.cell) return - 1;
						a = g(b.table);
						if (a.selectedTds.length) return - 1;
						var b = a.getCellInfo(b.cell),
						d = b.colIndex + b.colSpan;
						if (d >= a.colsNum) return - 1;
						a = a.indexTable[b.rowIndex][d];
						return a.rowIndex == b.rowIndex && a.rowSpan == b.rowSpan ? 0 : -1
					},
					execCommand: function(a) {
						a = this.selection.getRange();
						var b = a.createBookmark(!0),
						d = c(this).cell;
						g(d).mergeRight(d);
						a.moveToBookmark(b).select()
					}
				};
				UE.commands.mergedown = {
					queryCommandState: function(a) {
						a = c(this);
						var b = a.cell;
						if (!b || "TH" == b.tagName) return - 1;
						var d = g(a.table);
						if (d.selectedTds.length) return - 1;
						var b = d.getCellInfo(a.cell),
						e = b.rowIndex + b.rowSpan;
						if (e >= d.rowsNum) return - 1;
						d = d.indexTable[e][b.colIndex];
						return d.colIndex == b.colIndex && d.colSpan == b.colSpan && "TH" !== a.cell.tagName ? 0 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						d = c(this).cell;
						g(d).mergeDown(d);
						a.moveToBookmark(b).select()
					}
				};
				UE.commands.mergecells = {
					queryCommandState: function() {
						return b.getUETableBySelected(this) ? 0 : -1
					},
					execCommand: function() {
						var a = b.getUETableBySelected(this);
						if (a && a.selectedTds.length) {
							var c = a.selectedTds[0];
							a.mergeRange();
							a = this.selection.getRange();
							d.isEmptyBlock(c) ? a.setStart(c, 0).collapse(!0) : a.selectNodeContents(c);
							a.select()
						}
					}
				};
				UE.commands.insertrow = {
					queryCommandState: function() {
						var a = c(this),
						b = a.cell;
						return b && ("TD" == b.tagName || "TH" == b.tagName && a.tr !== a.table.rows[0]) && g(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						d = c(this),
						e = d.cell,
						d = d.table,
						h = g(d),
						r = h.getCellInfo(e);
						if (h.selectedTds.length) for (var r = h.cellsRange,
						t = 0,
						p = r.endRowIndex - r.beginRowIndex + 1; t < p; t++) h.insertRow(r.beginRowIndex, e);
						else h.insertRow(r.rowIndex, e);
						a.moveToBookmark(b).select();
						"enabled" === d.getAttribute("interlaced") && this.fireEvent("interlacetable", d)
					}
				};
				UE.commands.insertrownext = {
					queryCommandState: function() {
						var a = c(this),
						b = a.cell;
						return b && "TD" == b.tagName && g(a.table).rowsNum < this.options.maxRowNum ? 0 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						d = c(this),
						e = d.cell,
						d = d.table,
						h = g(d),
						r = h.getCellInfo(e);
						if (h.selectedTds.length) for (var r = h.cellsRange,
						t = 0,
						p = r.endRowIndex - r.beginRowIndex + 1; t < p; t++) h.insertRow(r.endRowIndex + 1, e);
						else h.insertRow(r.rowIndex + r.rowSpan, e);
						a.moveToBookmark(b).select();
						"enabled" === d.getAttribute("interlaced") && this.fireEvent("interlacetable", d)
					}
				};
				UE.commands.deleterow = {
					queryCommandState: function() {
						if (!c(this).cell) return - 1
					},
					execCommand: function() {
						var a = c(this).cell,
						b = g(a),
						e = b.cellsRange,
						h = b.getCellInfo(a),
						n = b.getVSideCell(a),
						r = b.getVSideCell(a, !0),
						a = this.selection.getRange();
						if (p.isEmptyObject(e)) b.deleteRow(h.rowIndex);
						else for (var t = e.beginRowIndex; t < e.endRowIndex + 1; t++) b.deleteRow(e.beginRowIndex);
						t = b.table;
						t.getElementsByTagName("td").length ? 1 == h.rowSpan || h.rowSpan == e.endRowIndex - e.beginRowIndex + 1 ? (r || n) && a.selectNodeContents(r || n).setCursor(!1, !0) : (b = b.getCell(h.rowIndex, b.indexTable[h.rowIndex][h.colIndex].cellIndex)) && a.selectNodeContents(b).setCursor(!1, !0) : (b = t.nextSibling, d.remove(t), b && a.setStart(b, 0).setCursor(!1, !0));
						"enabled" === t.getAttribute("interlaced") && this.fireEvent("interlacetable", t)
					}
				};
				UE.commands.insertcol = {
					queryCommandState: function(a) {
						a = c(this);
						var b = a.cell;
						return b && ("TD" == b.tagName || "TH" == b.tagName && b !== a.tr.cells[0]) && g(a.table).colsNum < this.options.maxColNum ? 0 : -1
					},
					execCommand: function(a) {
						var b = this.selection.getRange(),
						d = b.createBookmark(!0);
						if ( - 1 != this.queryCommandState(a)) {
							a = c(this).cell;
							var e = g(a),
							h = e.getCellInfo(a);
							if (e.selectedTds.length) for (var h = e.cellsRange,
							r = 0,
							t = h.endColIndex - h.beginColIndex + 1; r < t; r++) e.insertCol(h.beginColIndex, a);
							else e.insertCol(h.colIndex, a);
							b.moveToBookmark(d).select(!0)
						}
					}
				};
				UE.commands.insertcolnext = {
					queryCommandState: function() {
						var a = c(this);
						return a.cell && g(a.table).colsNum < this.options.maxColNum ? 0 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						d = c(this).cell,
						e = g(d),
						h = e.getCellInfo(d);
						if (e.selectedTds.length) for (var h = e.cellsRange,
						r = 0,
						t = h.endColIndex - h.beginColIndex + 1; r < t; r++) e.insertCol(h.endColIndex + 1, d);
						else e.insertCol(h.colIndex + h.colSpan, d);
						a.moveToBookmark(b).select()
					}
				};
				UE.commands.deletecol = {
					queryCommandState: function() {
						if (!c(this).cell) return - 1
					},
					execCommand: function() {
						var a = c(this).cell,
						b = g(a),
						e = b.cellsRange,
						h = b.getCellInfo(a),
						n = b.getHSideCell(a),
						r = b.getHSideCell(a, !0);
						if (p.isEmptyObject(e)) b.deleteCol(h.colIndex);
						else for (h = e.beginColIndex; h < e.endColIndex + 1; h++) b.deleteCol(e.beginColIndex);
						b = b.table;
						e = this.selection.getRange();
						b.getElementsByTagName("td").length ? d.inDoc(a, this.document) ? e.setStart(a, 0).setCursor(!1, !0) : r && d.inDoc(r, this.document) ? e.selectNodeContents(r).setCursor(!1, !0) : n && d.inDoc(n, this.document) && e.selectNodeContents(n).setCursor(!0, !0) : (a = b.nextSibling, d.remove(b), a && e.setStart(a, 0).setCursor(!1, !0))
					}
				};
				UE.commands.splittocells = {
					queryCommandState: function() {
						var a = c(this),
						b = a.cell;
						return ! b || 0 < g(a.table).selectedTds.length ? -1 : b && (1 < b.colSpan || 1 < b.rowSpan) ? 0 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						d = c(this).cell;
						g(d).splitToCells(d);
						a.moveToBookmark(b).select()
					}
				};
				UE.commands.splittorows = {
					queryCommandState: function() {
						var a = c(this),
						b = a.cell;
						return ! b || 0 < g(a.table).selectedTds.length ? -1 : b && 1 < b.rowSpan ? 0 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						d = c(this).cell;
						g(d).splitToRows(d);
						a.moveToBookmark(b).select()
					}
				};
				UE.commands.splittocols = {
					queryCommandState: function() {
						var a = c(this),
						b = a.cell;
						return ! b || 0 < g(a.table).selectedTds.length ? -1 : b && 1 < b.colSpan ? 0 : -1
					},
					execCommand: function() {
						var a = this.selection.getRange(),
						b = a.createBookmark(!0),
						d = c(this).cell;
						g(d).splitToCols(d);
						a.moveToBookmark(b).select()
					}
				};
				UE.commands.adaptbytext = UE.commands.adaptbywindow = {
					queryCommandState: function() {
						return c(this).table ? 0 : -1
					},
					execCommand: function(a) {
						var b = c(this).table;
						b && ("adaptbywindow" == a ? h(b, this) : (a = d.getElementsByTagName(b, "td th"), p.each(a,
						function(a) {
							a.removeAttribute("width")
						}), b.removeAttribute("width")))
					}
				};
				UE.commands.averagedistributecol = {
					queryCommandState: function() {
						var a = b.getUETableBySelected(this);
						return a ? a.isFullRow() || a.isFullCol() ? 0 : -1 : -1
					},
					execCommand: function(a) {
						function c() {
							var a = h.table,
							d = 0,
							e = 0,
							f = b.getDefaultValue(g, a);
							if (h.isFullRow()) d = a.offsetWidth,
							e = h.colsNum;
							else for (var a = h.cellsRange.endColIndex,
							l, k = h.cellsRange.beginColIndex; k <= a;) l = h.selectedTds[k],
							d += l.offsetWidth,
							k += l.colSpan,
							e += 1;
							return Math.ceil(d / e) - 2 * f.tdBorder - 2 * f.tdPadding
						}
						function e(a) {
							p.each(d.getElementsByTagName(h.table, "th"),
							function(a) {
								a.setAttribute("width", "")
							});
							var b = h.isFullRow() ? d.getElementsByTagName(h.table, "td") : h.selectedTds;
							p.each(b,
							function(b) {
								1 == b.colSpan && b.setAttribute("width", a)
							})
						}
						var g = this,
						h = b.getUETableBySelected(g);
						h && h.selectedTds.length && e(c())
					}
				};
				UE.commands.averagedistributerow = {
					queryCommandState: function() {
						var a = b.getUETableBySelected(this);
						return ! a || a.selectedTds && /th/ig.test(a.selectedTds[0].tagName) ? -1 : a.isFullRow() || a.isFullCol() ? 0 : -1
					},
					execCommand: function(a) {
						function c() {
							var a, e = 0;
							a = h.table;
							var f = b.getDefaultValue(g, a),
							l = parseInt(d.getComputedStyle(a.getElementsByTagName("td")[0], "padding-top"));
							if (h.isFullCol()) {
								var e = d.getElementsByTagName(a, "caption"),
								k = d.getElementsByTagName(a, "th"),
								p,
								s;
								0 < e.length && (p = e[0].offsetHeight);
								0 < k.length && (s = k[0].offsetHeight);
								e = a.offsetHeight - (p || 0) - (s || 0);
								a = 0 == k.length ? h.rowsNum: h.rowsNum - 1
							} else {
								s = h.cellsRange.beginRowIndex;
								k = h.cellsRange.endRowIndex;
								p = 0;
								for (a = d.getElementsByTagName(a, "tr"); s <= k; s++) e += a[s].offsetHeight,
								p += 1;
								a = p
							}
							return q.ie && 9 > q.version ? Math.ceil(e / a) : Math.ceil(e / a) - 2 * f.tdBorder - 2 * l
						}
						function e(a) {
							var b = h.isFullCol() ? d.getElementsByTagName(h.table, "td") : h.selectedTds;
							p.each(b,
							function(b) {
								1 == b.rowSpan && b.setAttribute("height", a)
							})
						}
						var g = this,
						h = b.getUETableBySelected(g);
						h && h.selectedTds.length && e(c())
					}
				};
				UE.commands.cellalignment = {
					queryCommandState: function() {
						return c(this).table ? 0 : -1
					},
					execCommand: function(a, c) {
						var e = b.getUETableBySelected(this);
						e ? p.each(e.selectedTds,
						function(a) {
							d.setAttributes(a, c)
						}) : (e = (e = this.selection.getStart()) && d.findParentByTagName(e, ["td", "th", "caption"], !0), /caption/ig.test(e.tagName) ? (e.style.textAlign = c.align, e.style.verticalAlign = c.vAlign) : d.setAttributes(e, c), this.selection.getRange().setCursor(!0))
					},
					queryCommandValue: function(a) { (a = c(this).cell) || (a = e(this)[0]);
						if (a) {
							var b = UE.UETable.getUETable(a).selectedTds; ! b.length && (b = a);
							return UE.UETable.getTableCellAlignState(b)
						}
						return null
					}
				};
				UE.commands.tablealignment = {
					queryCommandState: function() {
						return q.ie && 8 > q.version ? -1 : c(this).table ? 0 : -1
					},
					execCommand: function(a, b) {
						var c = this.selection.getStart(); (c = c && d.findParentByTagName(c, ["table"], !0)) && c.setAttribute("align", b)
					}
				};
				UE.commands.edittable = {
					queryCommandState: function() {
						return c(this).table ? 0 : -1
					},
					execCommand: function(a, b) {
						var c = this.selection.getRange();
						if (c = d.findParentByTagName(c.startContainer, "table")) c = d.getElementsByTagName(c, "td").concat(d.getElementsByTagName(c, "th"), d.getElementsByTagName(c, "caption")),
						p.each(c,
						function(a) {
							a.style.borderColor = b
						})
					}
				};
				UE.commands.edittd = {
					queryCommandState: function() {
						return c(this).table ? 0 : -1
					},
					execCommand: function(a, c) {
						var e = b.getUETableBySelected(this);
						if (e) p.each(e.selectedTds,
						function(a) {
							a.style.backgroundColor = c
						});
						else if (e = (e = this.selection.getStart()) && d.findParentByTagName(e, ["td", "th", "caption"], !0)) e.style.backgroundColor = c
					}
				};
				UE.commands.settablebackground = {
					queryCommandState: function() {
						return 1 < e(this).length ? 0 : -1
					},
					execCommand: function(a, b) {
						var c;
						c = e(this);
						g(c[0]).setBackground(c, b)
					}
				};
				UE.commands.cleartablebackground = {
					queryCommandState: function() {
						var a = e(this);
						if (!a.length) return - 1;
						for (var b = 0,
						c; c = a[b++];) if ("" !== c.style.backgroundColor) return 0;
						return - 1
					},
					execCommand: function() {
						var a = e(this);
						g(a[0]).removeBackground(a)
					}
				};
				UE.commands.interlacetable = UE.commands.uninterlacetable = {
					queryCommandState: function(a) {
						var b = c(this).table;
						if (!b) return - 1;
						b = b.getAttribute("interlaced");
						return "interlacetable" == a ? "enabled" === b ? -1 : 0 : b && "disabled" !== b ? 0 : -1
					},
					execCommand: function(a, b) {
						var d = c(this).table;
						"interlacetable" == a ? (d.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", d, b)) : (d.setAttribute("interlaced", "disabled"), this.fireEvent("uninterlacetable", d))
					}
				};
				UE.commands.setbordervisible = {
					queryCommandState: function(a) {
						return c(this).table ? 0 : -1
					},
					execCommand: function() {
						var a = c(this).table;
						p.each(d.getElementsByTagName(a, "td"),
						function(a) {
							a.style.borderWidth = "1px";
							a.style.borderStyle = "solid"
						})
					}
				}
			})();
			UE.plugins.table = function() {
				function h(b, c) {
					a(b, "width", !0);
					a(b, "height", !0)
				}
				function a(a, b, c) {
					a.style[b] && (c && a.setAttribute(b, parseInt(a.style[b], 10)), a.style[b] = "")
				}
				function e(a) {
					if ("TD" == a.tagName || "TH" == a.tagName) return a;
					var b;
					return (b = d.findParentByTagName(a, "td", !0) || d.findParentByTagName(a, "th", !0)) ? b: null
				}
				function b(a) {
					var b = RegExp(d.fillChar, "g");
					if (0 < a[q.ie ? "innerText": "textContent"].replace(/^\s*$/, "").replace(b, "").length) return 0;
					for (var c in v.$isNotEmpty) if (a.getElementsByTagName(c).length) return 0;
					return 1
				}
				function c(a) {
					return a.pageX || a.pageY ? {
						x: a.pageX,
						y: a.pageY
					}: {
						x: a.clientX + y.document.body.scrollLeft - y.document.body.clientLeft,
						y: a.clientY + y.document.body.scrollTop - y.document.body.clientTop
					}
				}
				function g(a) {
					if (!J()) try {
						var b = e(a.target || a.srcElement),
						g;
						ea && (y.body.style.webkitUserSelect = "none", Math.abs($.x - a.clientX) > da || Math.abs($.y - a.clientY) > da) && (s(), ea = !1, Q = 0, D(a));
						if (T && R) if (Q = 0, y.body.style.webkitUserSelect = "none", y.selection.getNative()[q.ie9below ? "empty": "removeAllRanges"](), g = c(a), m(y, !0, T, g, b), "h" == T) {
							var k = S.style,
							h;
							var b = R,
							r = M(b);
							if (r) {
								var t = r.getSameEndPosCells(b, "x")[0],
								p = r.getSameStartPosXCells(b)[0],
								w = c(a).x,
								x = (t ? d.getXY(t).x: d.getXY(r.table).x) + 20,
								u = p ? d.getXY(p).x + p.offsetWidth - 20 : y.body.offsetWidth + 5 || parseInt(d.getComputedStyle(y.body, "width"), 10),
								x = x + V,
								u = u - V;
								h = w < x ? x: w > u ? u: w
							} else h = void 0;
							k.left = h + "px"
						} else {
							if ("v" == T) {
								var F = S.style,
								v;
								a: {
									try {
										var z = d.getXY(R).y,
										A = c(a).y;
										v = A < z ? z: A;
										break a
									} catch(B) {}
									v = void 0
								}
								F.top = v + "px"
							}
						} else if (b) {
							if (!0 !== y.fireEvent("excludetable", b)) {
								g = c(a);
								var aa = n(b, g),
								fa = d.findParentByTagName(b, "table", !0);
								l(fa, b, a, !0) ? !0 !== y.fireEvent("excludetable", fa) && (y.body.style.cursor = "url(" + y.options.cursorpath + "h.png),pointer") : l(fa, b, a) ? !0 !== y.fireEvent("excludetable", fa) && (y.body.style.cursor = "url(" + y.options.cursorpath + "v.png),pointer") : (y.body.style.cursor = "text", /\d/.test(aa) && (aa = aa.replace(/\d/, ""), b = M(b).getPreviewCell(b, "v" == aa)), m(y, b ? !!aa: !1, b ? aa: "", g, b))
							}
						} else f(!1, fa, y)
					} catch(L) {}
				}
				function f(a, b, c) {
					a ? k(b, c) : ga || setTimeout(function() { ! ga && G && G.parentNode && G.parentNode.removeChild(G)
					},
					2E3)
				}
				function k(a, b) {
					function c(d, e) {
						clearTimeout(g);
						g = setTimeout(function() {
							b.fireEvent("tableClicked", a, e)
						},
						300)
					}
					var e = d.getXY(a),
					f = a.ownerDocument;
					if (G && G.parentNode) return G;
					G = f.createElement("div");
					G.contentEditable = !1;
					G.innerHTML = "";
					G.style.cssText = "width:15px;height:15px;background-image:url(" + b.options.UEDITOR_HOME_URL + "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" + (e.y - 15) + "px;left:" + e.x + "px;";
					d.unSelectable(G);
					G.onmouseover = function(a) {
						ga = !0
					};
					G.onmouseout = function(a) {
						ga = !1
					};
					d.on(G, "click",
					function(a, b) {
						c(b, this)
					});
					d.on(G, "dblclick",
					function(c, d) {
						clearTimeout(g);
						var e = M(a),
						f = a.rows[0].cells[0],
						l = e.getLastCell(),
						l = e.getCellsRange(f, l);
						b.selection.getRange().setStart(f, 0).setCursor(!1, !0);
						e.setSelected(l)
					});
					d.on(G, "dragstart",
					function(a, b) {
						d.preventDefault(b)
					});
					var g;
					f.body.appendChild(G)
				}
				function l(a, b, e, f) {
					e = c(e);
					b = n(b, e);
					return f ? (f = (f = a.getElementsByTagName("caption")[0]) ? f.offsetHeight: 0, "v1" == b && 8 > e.y - d.getXY(a).y - f) : "h1" == b && 8 > e.x - d.getXY(a).x
				}
				function m(a, b, c, d, e) {
					try {
						a.body.style.cursor = "h" == c ? "col-resize": "v" == c ? "row-resize": "text",
						q.ie && (!c || ba || C.getUETableBySelected(a) ? Z(a) : (N(a, a.document), ma(c, e))),
						la = b
					} catch(f) {}
				}
				function n(a, b) {
					var c = d.getXY(a);
					return c ? c.x + a.offsetWidth - b.x < ha ? "h": b.x - c.x < ha ? "h1": c.y + a.offsetHeight - b.y < ha ? "v": b.y - c.y < ha ? "v1": "": ""
				}
				function r(a, b) {
					if (!J()) if ($ = {
						x: b.clientX,
						y: b.clientY
					},
					2 == b.button) {
						var c = C.getUETableBySelected(y),
						e = !1;
						if (c) {
							var f = X(y, b);
							p.each(c.selectedTds,
							function(a) {
								a === f && (e = !0)
							});
							e ? (f = c.selectedTds[0], setTimeout(function() {
								y.selection.getRange().setStart(f, 0).setCursor(!1, !0)
							},
							0)) : (ia(d.getElementsByTagName(y.body, "th td")), c.clearSelected())
						}
					} else x(b)
				}
				function t(a) {
					Q = 0;
					a = a || y.window.event;
					var b = e(a.target || a.srcElement);
					if (b) {
						var f;
						if (f = n(b, c(a))) if (Z(y), "h1" == f && (f = "h", l(d.findParentByTagName(b, "table"), b, a) ? y.execCommand("adaptbywindow") : (b = M(b).getPreviewCell(b)) && y.selection.getRange().selectNodeContents(b).setCursor(!0, !0)), "h" == f) {
							a = M(b);
							var g = z(b, a.table, !0),
							g = u(g, "left");
							a.width = a.offsetWidth;
							var k = [],
							h = [];
							p.each(g,
							function(a) {
								k.push(a.offsetWidth)
							});
							p.each(g,
							function(a) {
								a.removeAttribute("width")
							});
							window.setTimeout(function() {
								var a = !0;
								p.each(g,
								function(b, c) {
									var d = b.offsetWidth;
									if (d > k[c]) return a = !1;
									h.push(d)
								});
								var b = a ? h: k;
								p.each(g,
								function(a, c) {
									a.width = b[c] - A()
								})
							},
							0)
						}
					}
				}
				function x(a) {
					ia(d.getElementsByTagName(y.body, "td th"));
					p.each(y.document.getElementsByTagName("table"),
					function(a) {
						a.ueTable = null
					});
					if (K = X(y, a)) {
						var b = d.findParentByTagName(K, "table", !0); (ut = M(b)) && ut.clearSelected();
						la ? w(a) : (y.document.body.style.webkitUserSelect = "", ba = !0, y.addListener("mouseover", W))
					}
				}
				function w(a) {
					q.ie && (a = F(a));
					s();
					ea = !0;
					ja = setTimeout(function() {
						D(a)
					},
					na)
				}
				function u(a, b) {
					for (var c = [], d = null, e = 0, f = a.length; e < f; e++)(d = a[e][b]) && c.push(d);
					return c
				}
				function s() {
					ja && clearTimeout(ja);
					ja = null
				}
				function F(a) {
					var b = "pageX pageY clientX clientY srcElement target".split(" "),
					c = {};
					if (a) for (var d = 0,
					e, f; e = b[d]; d++)(f = a[e]) && (c[e] = f);
					return c
				}
				function D(a) {
					ea = !1;
					K && (a = Math.abs($.x - a.clientX) >= Math.abs($.y - a.clientY) ? "h": "v", /\d/.test(a) && (a = a.replace(/\d/, ""), K = M(K).getPreviewCell(K, "v" == a)), Z(y), N(y, y.document), y.fireEvent("saveScene"), ma(a, K), ba = !0, T = a, R = K)
				}
				function L(a, b) {
					if (!J()) {
						s();
						ea = !1;
						if (la && (Q = ++Q % 3, $ = {
							x: b.clientX,
							y: b.clientY
						},
						setTimeout(function() {
							0 < Q && Q--
						},
						na), 2 === Q)) {
							Q = 0;
							t(b);
							return
						}
						if (2 != b.button) {
							var c = this.selection.getRange(),
							e = d.findParentByTagName(c.startContainer, "table", !0),
							f = d.findParentByTagName(c.endContainer, "table", !0);
							if (e || f) e === f ? (e = d.findParentByTagName(c.startContainer, ["td", "th", "caption"], !0), f = d.findParentByTagName(c.endContainer, ["td", "th", "caption"], !0), e !== f && this.selection.clearRange()) : this.selection.clearRange();
							ba = !1;
							this.document.body.style.webkitUserSelect = "";
							if (T && R) {
								this.selection.getNative()[q.ie9below ? "empty": "removeAllRanges"]();
								Q = 0;
								S = this.document.getElementById("ue_tableDragLine");
								c = d.getXY(R);
								e = d.getXY(S);
								switch (T) {
								case "h":
									H(R, e.x - c.x);
									break;
								case "v":
									ca(R, e.y - c.y - R.offsetHeight)
								}
								T = "";
								R = null;
								Z(this);
								this.fireEvent("saveScene")
							} else {
								if (K)(e = (c = M(K)) ? c.selectedTds[0] : null) ? (c = new I.Range(this.document), d.isEmptyBlock(e) ? c.setStart(e, 0).setCursor(!1, !0) : c.selectNodeContents(e).shrinkBoundary().setCursor(!1, !0)) : (c = this.selection.getRange().shrinkBoundary(), c.collapsed || (e = d.findParentByTagName(c.startContainer, ["td", "th"], !0), f = d.findParentByTagName(c.endContainer, ["td", "th"], !0), (e && !f || !e && f || e && f && e !== f) && c.setCursor(!1, !0))),
								K = null,
								this.removeListener("mouseover", W);
								else if ((e = d.findParentByTagName(b.target || b.srcElement, "td", !0)) || (e = d.findParentByTagName(b.target || b.srcElement, "th", !0)), e && ("TD" == e.tagName || "TH" == e.tagName)) {
									if (!0 === this.fireEvent("excludetable", e)) return;
									c = new I.Range(this.document);
									c.setStart(e, 0).setCursor(!1, !0)
								}
								this._selectionChange(250, b)
							}
						}
					}
				}
				function W(a, b) {
					if (!J()) {
						var c = b.target || b.srcElement;
						U = d.findParentByTagName(c, "td", !0) || d.findParentByTagName(c, "th", !0);
						if (K && U && ("TD" == K.tagName && "TD" == U.tagName || "TH" == K.tagName && "TH" == U.tagName) && d.findParentByTagName(K, "table") == d.findParentByTagName(U, "table")) if (c = M(U), K != U) {
							this.document.body.style.webkitUserSelect = "none";
							this.selection.getNative()[q.ie9below ? "empty": "removeAllRanges"]();
							var e = c.getCellsRange(K, U);
							c.setSelected(e)
						} else this.document.body.style.webkitUserSelect = "",
						c.clearSelected();
						b.preventDefault ? b.preventDefault() : b.returnValue = !1
					}
				}
				function H(a, b) {
					var c = M(a);
					if (c) {
						var c = c.table,
						e = z(a, c);
						c.style.width = "";
						c.removeAttribute("width");
						b = E(b, a, e);
						a.nextSibling ? p.each(e,
						function(a) {
							a.left.width = +a.left.width + b;
							a.right && (a.right.width = +a.right.width - b)
						}) : p.each(e,
						function(a) {
							a.left.width -= -b
						})
					}
				}
				function J() {
					return "false" === y.body.contentEditable
				}
				function ca(a, b) {
					if (! (10 > Math.abs(b))) {
						var c = M(a);
						if (c) for (var c = c.getSameEndPosCells(a, "y"), e = c[0] ? c[0].offsetHeight: 0, f = 0, g; g = c[f++];) {
							var l = b,
							k = e,
							h = parseInt(d.getComputedStyle(g, "line-height"), 10),
							l = k + l,
							l = l < h ? h: l;
							g.style.height && (g.style.height = "");
							1 == g.rowSpan ? g.setAttribute("height", l) : g.removeAttribute && g.removeAttribute("height")
						}
					}
				}
				function z(a, b, c) {
					b || (b = d.findParentByTagName(a, "table"));
					if (!b) return null;
					d.getNodeIndex(a);
					b = b.rows;
					for (var e = 0; a;) 1 === a.nodeType && (e += a.colSpan || 1),
					a = a.previousSibling;
					a = null;
					var f = [];
					p.each(b,
					function(a) {
						var b = 0;
						p.each(a.cells,
						function(a) {
							b += a.colSpan || 1;
							if (b === e) return f.push({
								left: a,
								right: a.nextSibling || null
							}),
							!1;
							if (b > e) return c && f.push({
								left: a
							}),
							!1
						})
					});
					return f
				}
				function E(a, b, c) {
					a -= A();
					if (0 > a) return 0;
					a -= B(b);
					var e = 0 > a ? "left": "right";
					a = Math.abs(a);
					p.each(c,
					function(b) { (b = b[e]) && (a = Math.min(a, B(b) - V))
					});
					a = 0 > a ? 0 : a;
					return "left" === e ? -a: a
				}
				function B(a) {
					var b = 0,
					b = a.offsetWidth - A();
					if (!a.nextSibling) {
						tab = d.findParentByTagName(a, "table", !1);
						if (void 0 === tab.offsetVal) {
							var c = a.previousSibling;
							tab.offsetVal = c ? a.offsetWidth - c.offsetWidth === C.borderWidth ? C.borderWidth: 0 : 0
						}
						b -= tab.offsetVal
					}
					b = 0 > b ? 0 : b;
					try {
						a.width = b
					} catch(e) {}
					return b
				}
				function A() {
					if (void 0 === C.tabcellSpace) {
						var a = y.document.createElement("table"),
						b = y.document.createElement("tbody"),
						c = y.document.createElement("tr"),
						e = y.document.createElement("td"),
						d = null;
						e.style.cssText = "border: 0;";
						e.width = 1;
						c.appendChild(e);
						c.appendChild(d = e.cloneNode(!1));
						b.appendChild(c);
						a.appendChild(b);
						a.style.cssText = "visibility: hidden;";
						y.body.appendChild(a);
						C.paddingSpace = e.offsetWidth - 1;
						b = a.offsetWidth;
						e.style.cssText = "";
						d.style.cssText = "";
						C.borderWidth = (a.offsetWidth - b) / 3;
						C.tabcellSpace = C.paddingSpace + C.borderWidth;
						y.body.removeChild(a)
					}
					A = function() {
						return C.tabcellSpace
					};
					return C.tabcellSpace
				}
				function N(a, b) {
					ba || (S = a.document.createElement("div"), d.setAttributes(S, {
						id: "ue_tableDragLine",
						unselectable: "on",
						contenteditable: !1,
						onresizestart: "return false",
						ondragstart: "return false",
						onselectstart: "return false",
						style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
					}), a.body.appendChild(S))
				}
				function Z(a) {
					if (!ba) for (var b; b = a.document.getElementById("ue_tableDragLine");) d.remove(b)
				}
				function ma(a, b) {
					if (b) {
						var c = d.findParentByTagName(b, "table"),
						e = c.getElementsByTagName("caption"),
						f = c.offsetWidth,
						g = c.offsetHeight - (0 < e.length ? e[0].offsetHeight: 0),
						c = d.getXY(c),
						l = d.getXY(b);
						switch (a) {
						case "h":
							e = "height:" + g + "px;top:" + (c.y + (0 < e.length ? e[0].offsetHeight: 0)) + "px;left:" + (l.x + b.offsetWidth);
							S.style.cssText = e + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
							break;
						case "v":
							e = "width:" + f + "px;left:" + c.x + "px;top:" + (l.y + b.offsetHeight),
							S.style.cssText = e + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)"
						}
					}
				}
				function O(a, b) {
					for (var c = d.getElementsByTagName(a.body, "table"), e, f = 0, g; g = c[f++];) e = d.getElementsByTagName(g, "td"),
					e[0] && (b ? (e = e[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,255,255\))/ig.test(e) && d.addClass(g, "noBorderTable")) : d.removeClasses(g, "noBorderTable"))
				}
				function Y(a, b, c) {
					var e = a.body;
					return e.offsetWidth - (b ? 2 * parseInt(d.getComputedStyle(e, "margin-left"), 10) : 0) - 2 * c.tableBorder - (a.options.offsetWidth || 0)
				}
				function X(a, b) {
					var e = d.findParentByTagName(b.target || b.srcElement, ["td", "th"], !0),
					f = null;
					if (!e) return null;
					f = n(e, c(b));
					if (!e) return null;
					if ("h1" === f && e.previousSibling) {
						var f = d.getXY(e),
						g = e.offsetWidth;
						Math.abs(f.x + g - b.clientX) > g / 3 && (e = e.previousSibling)
					} else "v1" === f && e.parentNode.previousSibling && (f = d.getXY(e), g = e.offsetHeight, Math.abs(f.y + g - b.clientY) > g / 3 && (e = e.parentNode.previousSibling.firstChild));
					return e && !0 !== a.fireEvent("excludetable", e) ? e: null
				}
				var y = this,
				ja = null,
				V = 5,
				ea = !1,
				ha = 5,
				da = 10,
				Q = 0,
				$ = null,
				na = 360,
				C = UE.UETable,
				M = function(a) {
					return C.getUETable(a)
				},
				ia = function(a) {
					return C.removeSelectedClass(a)
				};
				y.ready(function() {
					var a = this,
					b = a.selection.getText;
					a.selection.getText = function() {
						var c = C.getUETableBySelected(a);
						if (c) {
							var e = "";
							p.each(c.selectedTds,
							function(a) {
								e += a[q.ie ? "innerText": "textContent"]
							});
							return e
						}
						return b.call(a.selection)
					}
				});
				var K = null,
				U = null,
				T = "",
				la = !1,
				G = null,
				ga = !1,
				S = null,
				R = null,
				ba = !1;
				y.setOpt({
					maxColNum: 20,
					maxRowNum: 100,
					defaultCols: 5,
					defaultRows: 5,
					tdvalign: "top",
					cursorpath: y.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
					tableDragable: !1,
					classList: ["ue-table-interlace-color-single", "ue-table-interlace-color-double"]
				});
				y.getUETable = M;
				var ka = {
					deletetable: 1,
					inserttable: 1,
					cellvalign: 1,
					insertcaption: 1,
					deletecaption: 1,
					inserttitle: 1,
					deletetitle: 1,
					mergeright: 1,
					mergedown: 1,
					mergecells: 1,
					insertrow: 1,
					insertrownext: 1,
					deleterow: 1,
					insertcol: 1,
					insertcolnext: 1,
					deletecol: 1,
					splittocells: 1,
					splittorows: 1,
					splittocols: 1,
					adaptbytext: 1,
					adaptbywindow: 1,
					adaptbycustomer: 1,
					insertparagraph: 1,
					insertparagraphbeforetable: 1,
					averagedistributecol: 1,
					averagedistributerow: 1
				};
				y.ready(function() {
					p.cssRule("table", ".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}", y.document);
					var a, c, k;
					y.addListener("keydown",
					function(e, f) {
						var g = f.keyCode || f.which;
						if (8 == g) {
							var l = C.getUETableBySelected(this);
							l && l.selectedTds.length && (l.isFullCol() ? this.execCommand("deletecol") : l.isFullRow() ? this.execCommand("deleterow") : this.fireEvent("delcells"), d.preventDefault(f));
							var h = d.findParentByTagName(this.selection.getStart(), "caption", !0),
							n = this.selection.getRange();
							n.collapsed && (h && b(h)) && (this.fireEvent("saveScene"), l = h.parentNode, d.remove(h), l && n.setStart(l.rows[0].cells[0], 0).setCursor(!1, !0), this.fireEvent("saveScene"))
						}
						if (46 == g && (l = C.getUETableBySelected(this))) {
							this.fireEvent("saveScene");
							for (h = 0; n = l.selectedTds[h++];) d.fillNode(this.document, n);
							this.fireEvent("saveScene");
							d.preventDefault(f)
						}
						if (13 == g) {
							g = this.selection.getRange();
							if (h = d.findParentByTagName(g.startContainer, "caption", !0)) {
								l = d.findParentByTagName(h, "table");
								g.collapsed ? h && g.setStart(l.rows[0].cells[0], 0).setCursor(!1, !0) : (g.deleteContents(), this.fireEvent("saveScene"));
								d.preventDefault(f);
								return
							}
							g.collapsed && (l = d.findParentByTagName(g.startContainer, "table")) && (n = l.rows[0].cells[0], h = d.findParentByTagName(this.selection.getStart(), ["td", "th"], !0), l = l.previousSibling, n === h && (!l || 1 == l.nodeType && "TABLE" == l.tagName) && d.isStartInblock(g) && (g = d.findParent(this.selection.getStart(),
							function(a) {
								return d.isBlockElm(a)
							},
							!0)) && (/t(h|d)/i.test(g.tagName) || g === h.firstChild) && (this.execCommand("insertparagraphbeforetable"), d.preventDefault(f)))
						}
						if ((f.ctrlKey || f.metaKey) && "67" == f.keyCode && (a = null, l = C.getUETableBySelected(this))) for (g = l.selectedTds, c = l.isFullCol(), k = l.isFullRow(), a = [[l.cloneCell(g[0], null, !0)]], h = 1; n = g[h]; h++) n.parentNode !== g[h - 1].parentNode ? a.push([l.cloneCell(n, null, !0)]) : a[a.length - 1].push(l.cloneCell(n, null, !0))
					});
					y.addListener("tablehasdeleted",
					function() {
						m(this, !1, "", null);
						G && d.remove(G)
					});
					y.addListener("beforepaste",
					function(e, f) {
						var g = this,
						l = g.selection.getRange();
						if (d.findParentByTagName(l.startContainer, "caption", !0)) l = g.document.createElement("div"),
						l.innerHTML = f.html,
						f.html = l[q.ie9below ? "innerText": "textContent"];
						else {
							var n = C.getUETableBySelected(g);
							if (a) {
								g.fireEvent("saveScene");
								var l = g.selection.getRange(),
								m = d.findParentByTagName(l.startContainer, ["td", "th"], !0),
								r,
								t;
								if (m) {
									n = M(m);
									if (k) {
										var w = n.getCellInfo(m).rowIndex;
										"TH" == m.tagName && w++;
										for (var l = 0,
										x; x = a[l++];) {
											t = n.insertRow(w++, "td");
											for (var u = 0,
											s; s = x[u]; u++)(m = t.cells[u]) || (m = t.insertCell(u)),
											m.innerHTML = s.innerHTML,
											s.getAttribute("width") && m.setAttribute("width", s.getAttribute("width")),
											s.getAttribute("vAlign") && m.setAttribute("vAlign", s.getAttribute("vAlign")),
											s.getAttribute("align") && m.setAttribute("align", s.getAttribute("align")),
											s.style.cssText && (m.style.cssText = s.style.cssText);
											for (u = 0; (s = t.cells[u]) && x[u]; u++) s.innerHTML = x[u].innerHTML,
											x[u].getAttribute("width") && s.setAttribute("width", x[u].getAttribute("width")),
											x[u].getAttribute("vAlign") && s.setAttribute("vAlign", x[u].getAttribute("vAlign")),
											x[u].getAttribute("align") && s.setAttribute("align", x[u].getAttribute("align")),
											x[u].style.cssText && (s.style.cssText = x[u].style.cssText)
										}
									} else {
										if (c) {
											w = n.getCellInfo(m);
											u = m = 0;
											for (x = a[0]; s = x[u++];) m += s.colSpan || 1;
											g.__hasEnterExecCommand = !0;
											for (l = 0; l < m; l++) g.execCommand("insertcol");
											g.__hasEnterExecCommand = !1;
											m = n.table.rows[0].cells[w.cellIndex];
											"TH" == m.tagName && (m = n.table.rows[1].cells[w.cellIndex])
										}
										for (l = 0; x = a[l++];) {
											r = m;
											for (u = 0; s = x[u++];) m ? (m.innerHTML = s.innerHTML, s.getAttribute("width") && m.setAttribute("width", s.getAttribute("width")), s.getAttribute("vAlign") && m.setAttribute("vAlign", s.getAttribute("vAlign")), s.getAttribute("align") && m.setAttribute("align", s.getAttribute("align")), s.style.cssText && (m.style.cssText = s.style.cssText), t = m, m = m.nextSibling) : (w = s.cloneNode(!0), d.removeAttributes(w, ["class", "rowSpan", "colSpan"]), t.parentNode.appendChild(w));
											m = n.getNextCell(r, !0, !0);
											if (!a[l]) break;
											m || (w = n.getCellInfo(r), n.table.insertRow(n.table.rows.length), n.update(), m = n.getVSideCell(r, !0))
										}
									}
									n.update()
								} else {
									n = g.document.createElement("table");
									for (l = 0; x = a[l++];) {
										t = n.insertRow(n.rows.length);
										for (u = 0; s = x[u++];) w = C.cloneCell(s, null, !0),
										d.removeAttributes(w, ["class"]),
										t.appendChild(w);
										2 == u && 1 < w.rowSpan && (w.rowSpan = 1)
									}
									l = C.getDefaultValue(g, void 0);
									l = g.body.offsetWidth - 2 * parseInt(d.getComputedStyle(g.body, "margin-left"), 10) - 2 * l.tableBorder - (g.options.offsetWidth || 0);
									g.execCommand("insertHTML", "<table  " + (c && k ? 'width="' + l + '"': "") + ">" + n.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>")
								}
								g.fireEvent("contentchange");
								g.fireEvent("saveScene");
								f.html = "";
								return ! 0
							}
							l = g.document.createElement("div");
							l.innerHTML = f.html;
							x = l.getElementsByTagName("table");
							d.findParentByTagName(g.selection.getStart(), "table") ? (p.each(x,
							function(a) {
								d.remove(a)
							}), d.findParentByTagName(g.selection.getStart(), "caption", !0) && (l.innerHTML = l[q.ie ? "innerText": "textContent"])) : p.each(x,
							function(a) {
								h(a, !0);
								d.removeAttributes(a, ["style", "border"]);
								p.each(d.getElementsByTagName(a, "td"),
								function(a) {
									b(a) && d.fillNode(g.document, a);
									h(a, !0)
								})
							});
							f.html = l.innerHTML
						}
					});
					y.addListener("afterpaste",
					function() {
						p.each(d.getElementsByTagName(y.body, "table"),
						function(a) {
							if (a.offsetWidth > y.body.offsetWidth) {
								var b = C.getDefaultValue(y, a);
								a.style.width = y.body.offsetWidth - 2 * parseInt(d.getComputedStyle(y.body, "margin-left"), 10) - 2 * b.tableBorder - (y.options.offsetWidth || 0) + "px"
							}
						})
					});
					y.addListener("blur",
					function() {
						a = null
					});
					var n;
					y.addListener("keydown",
					function() {
						clearTimeout(n);
						n = setTimeout(function() {
							var a = y.selection.getRange();
							if (a = d.findParentByTagName(a.startContainer, ["th", "td"], !0)) {
								var b = a.parentNode.parentNode.parentNode;
								b.offsetWidth > b.getAttribute("width") && (a.style.wordBreak = "break-all")
							}
						},
						100)
					});
					y.addListener("selectionchange",
					function() {
						m(y, !1, "", null)
					});
					y.addListener("contentchange",
					function() {
						var a = this;
						Z(a);
						if (!C.getUETableBySelected(a)) {
							var b = a.selection.getRange().startContainer,
							b = d.findParentByTagName(b, ["td", "th"], !0);
							p.each(d.getElementsByTagName(a.document, "table"),
							function(b) { ! 0 !== a.fireEvent("excludetable", b) && (b.ueTable = new C(b), b.onmouseover = function() {
									a.fireEvent("tablemouseover", b)
								},
								b.onmousemove = function() {
									a.fireEvent("tablemousemove", b);
									a.options.tableDragable && f(!0, this, a);
									p.defer(function() {
										a.fireEvent("contentchange", 50)
									},
									!0)
								},
								b.onmouseout = function() {
									a.fireEvent("tablemouseout", b);
									m(a, !1, "", null);
									Z(a)
								},
								b.onclick = function(b) {
									b = a.window.event || b;
									var c = e(b.target || b.srcElement);
									if (c) {
										var d = M(c),
										f = d.table,
										g = d.getCellInfo(c),
										k = a.selection.getRange();
										l(f, c, b, !0) ? (f = d.getCell(d.indexTable[d.rowsNum - 1][g.colIndex].rowIndex, d.indexTable[d.rowsNum - 1][g.colIndex].cellIndex), b.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== f ? (b = d.getCellsRange(d.selectedTds[0], f), d.setSelected(b)) : k && k.selectNodeContents(f).select() : c !== f ? (b = d.getCellsRange(c, f), d.setSelected(b)) : k && k.selectNodeContents(f).select()) : l(f, c, b) && (f = d.getCell(d.indexTable[g.rowIndex][d.colsNum - 1].rowIndex, d.indexTable[g.rowIndex][d.colsNum - 1].cellIndex), b.shiftKey && d.selectedTds.length ? d.selectedTds[0] !== f ? (b = d.getCellsRange(d.selectedTds[0], f), d.setSelected(b)) : k && k.selectNodeContents(f).select() : c !== f ? (b = d.getCellsRange(c, f), d.setSelected(b)) : k && k.selectNodeContents(f).select())
									}
								})
							});
							O(a, !0)
						}
					});
					d.on(y.document, "mousemove", g);
					d.on(y.document, "mouseout",
					function(a) {
						"TABLE" == (a.target || a.srcElement).tagName && m(y, !1, "", null)
					});
					y.addListener("interlacetable",
					function(a, b, c) {
						if (b) {
							a = b.rows;
							b = a.length;
							for (var e = 0; e < b; e++) a[e].className = (c || this.options.classList)[e] ? (c || this.options.classList)[e] : (c || this.options.classList)[e % (c || this.options.classList).length]
						}
					});
					y.addListener("uninterlacetable",
					function(a, b) {
						if (b) for (var c = b.rows,
						e = this.options.classList,
						f = c.length,
						g = 0; g < f; g++) d.removeClasses(c[g], e)
					});
					y.addListener("mousedown", r);
					y.addListener("mouseup", L);
					d.on(y.body, "dragstart",
					function(a) {
						L.call(y, "dragstart", a)
					});
					var t = 0;
					y.addListener("mousedown",
					function() {
						t = 0
					});
					y.addListener("tabkeydown",
					function() {
						var a = this.selection.getRange(),
						c = a.getCommonAncestor(!0, !0),
						e = d.findParentByTagName(c, "table");
						if (e) {
							if (d.findParentByTagName(c, "caption", !0))(c = d.getElementsByTagName(e, "th td")) && c.length && a.setStart(c[0], 0).setCursor(!1, !0);
							else {
								var c = d.findParentByTagName(c, ["td", "th"], !0),
								f = M(c);
								t = 1 < c.rowSpan ? t: f.getCellInfo(c).rowIndex; (c = f.getTabNextCell(c, t)) ? b(c) ? a.setStart(c, 0).setCursor(!1, !0) : a.selectNodeContents(c).select() : (y.fireEvent("saveScene"), y.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), y.__hasEnterExecCommand = !1, a = this.selection.getRange(), a.setStart(e.rows[e.rows.length - 1].cells[0], 0).setCursor(), y.fireEvent("saveScene"))
							}
							return ! 0
						}
					});
					q.ie && y.addListener("selectionchange",
					function() {
						m(this, !1, "", null)
					});
					y.addListener("keydown",
					function(a, b) {
						var c = b.keyCode || b.which;
						if (8 != c && 46 != c) { (c = !b.ctrlKey && !b.metaKey && !b.shiftKey && !b.altKey) && ia(d.getElementsByTagName(this.body, "td"));
							var e = C.getUETableBySelected(this);
							e && c && e.clearSelected()
						}
					});
					y.addListener("beforegetcontent",
					function() {
						O(this, !1);
						q.ie && p.each(this.document.getElementsByTagName("caption"),
						function(a) {
							d.isEmptyNode(a) && (a.innerHTML = "&nbsp;")
						})
					});
					y.addListener("aftergetcontent",
					function() {
						O(this, !0)
					});
					y.addListener("getAllHtml",
					function() {
						ia(y.document.getElementsByTagName("td"))
					});
					y.addListener("fullscreenchanged",
					function(a, b) {
						if (!b) {
							var c = this.body.offsetWidth / document.body.offsetWidth,
							e = d.getElementsByTagName(this.body, "table");
							p.each(e,
							function(a) {
								if (a.offsetWidth < y.body.offsetWidth) return ! 1;
								var b = d.getElementsByTagName(a, "td"),
								e = [];
								p.each(b,
								function(a) {
									e.push(a.offsetWidth)
								});
								for (var f = 0,
								g; g = b[f]; f++) g.setAttribute("width", Math.floor(e[f] * c));
								a.setAttribute("width", Math.floor(Y(y, !0, C.getDefaultValue(y, void 0))))
							})
						}
					});
					var w = y.execCommand;
					y.execCommand = function(a, c) {
						a = a.toLowerCase();
						var e = C.getUETableBySelected(this),
						f = new I.Range(this.document),
						g = this.commands[a] || UE.commands[a],
						l;
						if (g) {
							if (!e || ka[a] || g.notNeedUndo || this.__hasEnterExecCommand) l = w.apply(this, arguments);
							else {
								this.__hasEnterExecCommand = !0;
								this.fireEvent("beforeexeccommand", a);
								for (var e = e.selectedTds,
								k = g = -2,
								h, n, m = 0,
								r; r = e[m]; m++) if (b(r) ? f.setStart(r, 0).setCursor(!1, !0) : f.selectNode(r).select(!0), n = this.queryCommandState(a), h = this.queryCommandValue(a), -1 != n) {
									if (g !== n || k !== h) this._ignoreContentChange = !0,
									l = w.apply(this, arguments),
									this._ignoreContentChange = !1;
									g = this.queryCommandState(a);
									k = this.queryCommandValue(a);
									d.isEmptyBlock(r) && d.fillNode(this.document, r)
								}
								f.setStart(e[0], 0).shrinkBoundary(!0).setCursor(!1, !0);
								this.fireEvent("contentchange");
								this.fireEvent("afterexeccommand", a);
								this.__hasEnterExecCommand = !1;
								this._selectionChange()
							}
							return l
						}
					}
				})
			};
			UE.UETable.prototype.sortTable = function(d, a) {
				var e = this.table,
				b = e.rows,
				c = [],
				g = "TH" === b[0].cells[0].tagName,
				f = 0;
				if (this.selectedTds.length) {
					for (var k = this.cellsRange,
					l = k.endRowIndex + 1,
					m = k.beginRowIndex; m < l; m++) c[m] = b[m];
					c.splice(0, k.beginRowIndex);
					f = k.endRowIndex + 1 === this.rowsNum ? 0 : k.endRowIndex + 1
				} else for (m = 0, l = b.length; m < l; m++) c[m] = b[m];
				var n = {
					reversecurrent: function(a, b) {
						return 1
					},
					orderbyasc: function(a, b) {
						return (a.innerText || a.textContent).localeCompare(b.innerText || b.textContent)
					},
					reversebyasc: function(a, b) {
						return b.innerHTML.localeCompare(a.innerHTML)
					},
					orderbynum: function(a, b) {
						var c = a[q.ie ? "innerText": "textContent"].match(/\d+/),
						e = b[q.ie ? "innerText": "textContent"].match(/\d+/);
						c && (c = +c[0]);
						e && (e = +e[0]);
						return (c || 0) - (e || 0)
					},
					reversebynum: function(a, b) {
						var c = a[q.ie ? "innerText": "textContent"].match(/\d+/),
						e = b[q.ie ? "innerText": "textContent"].match(/\d+/);
						c && (c = +c[0]);
						e && (e = +e[0]);
						return (e || 0) - (c || 0)
					}
				};
				e.setAttribute("data-sort-type", a && "string" === typeof a && n[a] ? a: "");
				g && c.splice(0, 1);
				c = p.sort(c,
				function(b, c) {
					return a && "function" === typeof a ? a.call(this, b.cells[d], c.cells[d]) : a && "number" === typeof a ? 1 : a && "string" === typeof a && n[a] ? n[a].call(this, b.cells[d], c.cells[d]) : n.orderbyasc.call(this, b.cells[d], c.cells[d])
				});
				g = e.ownerDocument.createDocumentFragment();
				m = 0;
				for (l = c.length; m < l; m++) g.appendChild(c[m]);
				e = e.getElementsByTagName("tbody")[0];
				f ? e.insertBefore(g, b[f - k.endRowIndex + k.beginRowIndex - 1]) : e.appendChild(g)
			};
			UE.plugins.tablesort = function() {
				var h = this,
				a = UE.UETable;
				h.ready(function() {
					p.cssRule("tablesort", "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(" + h.options.themePath + h.options.theme + "/images/sortable.png);}", h.document);
					h.addListener("afterexeccommand",
					function(a, b) {
						"mergeright" != b && "mergedown" != b && "mergecells" != b || this.execCommand("disablesort")
					})
				});
				UE.commands.sorttable = {
					queryCommandState: function() {
						var e = a.getTableItemsByRange(this);
						if (!e.cell) return - 1;
						for (var e = e.table.getElementsByTagName("td"), b = 0, c; c = e[b++];) if (1 != c.rowSpan || 1 != c.colSpan) return - 1;
						return 0
					},
					execCommand: function(e, b) {
						var c = this.selection.getRange(),
						d = c.createBookmark(!0),
						f = a.getTableItemsByRange(this),
						k = f.cell,
						f = a.getUETable(f.table),
						k = f.getCellInfo(k);
						f.sortTable(k.cellIndex, b);
						c.moveToBookmark(d);
						try {
							c.select()
						} catch(l) {}
					}
				};
				UE.commands.enablesort = UE.commands.disablesort = {
					queryCommandState: function(e) {
						var b = a.getTableItemsByRange(this).table;
						if (b && "enablesort" == e) for (var c = d.getElementsByTagName(b, "th td"), g = 0; g < c.length; g++) if (1 < c[g].getAttribute("colspan") || 1 < c[g].getAttribute("rowspan")) return - 1;
						return b ? "enablesort" == e ^ "sortEnabled" != b.getAttribute("data-sort") ? -1 : 0 : -1
					},
					execCommand: function(e) {
						var b = a.getTableItemsByRange(this).table;
						b.setAttribute("data-sort", "enablesort" == e ? "sortEnabled": "sortDisabled");
						"enablesort" == e ? d.addClass(b, "sortEnabled") : d.removeClasses(b, "sortEnabled")
					}
				}
			};
			UE.plugins.contextmenu = function() {
				var h = this,
				a = h.getLang("contextMenu"),
				e,
				b = h.options.contextMenu || [{
					label: a.selectall,
					cmdName: "selectall"
				},
				{
					label: a.cleardoc,
					cmdName: "cleardoc",
					exec: function() {
						confirm(a.confirmclear) && this.execCommand("cleardoc")
					}
				},
				"-", {
					label: a.unlink,
					cmdName: "unlink"
				},
				"-", {
					group: a.paragraph,
					icon: "justifyjustify",
					subMenu: [{
						label: a.justifyleft,
						cmdName: "justify",
						value: "left"
					},
					{
						label: a.justifyright,
						cmdName: "justify",
						value: "right"
					},
					{
						label: a.justifycenter,
						cmdName: "justify",
						value: "center"
					},
					{
						label: a.justifyjustify,
						cmdName: "justify",
						value: "justify"
					}]
				},
				"-", {
					group: a.table,
					icon: "table",
					subMenu: [{
						label: a.inserttable,
						cmdName: "inserttable"
					},
					{
						label: a.deletetable,
						cmdName: "deletetable"
					},
					"-", {
						label: a.deleterow,
						cmdName: "deleterow"
					},
					{
						label: a.deletecol,
						cmdName: "deletecol"
					},
					{
						label: a.insertcol,
						cmdName: "insertcol"
					},
					{
						label: a.insertcolnext,
						cmdName: "insertcolnext"
					},
					{
						label: a.insertrow,
						cmdName: "insertrow"
					},
					{
						label: a.insertrownext,
						cmdName: "insertrownext"
					},
					"-", {
						label: a.insertcaption,
						cmdName: "insertcaption"
					},
					{
						label: a.deletecaption,
						cmdName: "deletecaption"
					},
					{
						label: a.inserttitle,
						cmdName: "inserttitle"
					},
					{
						label: a.deletetitle,
						cmdName: "deletetitle"
					},
					{
						label: a.inserttitlecol,
						cmdName: "inserttitlecol"
					},
					{
						label: a.deletetitlecol,
						cmdName: "deletetitlecol"
					},
					"-", {
						label: a.mergecells,
						cmdName: "mergecells"
					},
					{
						label: a.mergeright,
						cmdName: "mergeright"
					},
					{
						label: a.mergedown,
						cmdName: "mergedown"
					},
					"-", {
						label: a.splittorows,
						cmdName: "splittorows"
					},
					{
						label: a.splittocols,
						cmdName: "splittocols"
					},
					{
						label: a.splittocells,
						cmdName: "splittocells"
					},
					"-", {
						label: a.averageDiseRow,
						cmdName: "averagedistributerow"
					},
					{
						label: a.averageDisCol,
						cmdName: "averagedistributecol"
					},
					"-", {
						label: a.edittd,
						cmdName: "edittd",
						exec: function() {
							UE.ui.edittd && new UE.ui.edittd(this);
							this.getDialog("edittd").open()
						}
					},
					{
						label: a.edittable,
						cmdName: "edittable",
						exec: function() {
							UE.ui.edittable && new UE.ui.edittable(this);
							this.getDialog("edittable").open()
						}
					},
					{
						label: a.setbordervisible,
						cmdName: "setbordervisible"
					}]
				},
				{
					group: a.tablesort,
					icon: "tablesort",
					subMenu: [{
						label: a.enablesort,
						cmdName: "enablesort"
					},
					{
						label: a.disablesort,
						cmdName: "disablesort"
					},
					"-", {
						label: a.reversecurrent,
						cmdName: "sorttable",
						value: "reversecurrent"
					},
					{
						label: a.orderbyasc,
						cmdName: "sorttable",
						value: "orderbyasc"
					},
					{
						label: a.reversebyasc,
						cmdName: "sorttable",
						value: "reversebyasc"
					},
					{
						label: a.orderbynum,
						cmdName: "sorttable",
						value: "orderbynum"
					},
					{
						label: a.reversebynum,
						cmdName: "sorttable",
						value: "reversebynum"
					}]
				},
				{
					group: a.borderbk,
					icon: "borderBack",
					subMenu: [{
						label: a.setcolor,
						cmdName: "interlacetable",
						exec: function() {
							this.execCommand("interlacetable")
						}
					},
					{
						label: a.unsetcolor,
						cmdName: "uninterlacetable",
						exec: function() {
							this.execCommand("uninterlacetable")
						}
					},
					{
						label: a.setbackground,
						cmdName: "settablebackground",
						exec: function() {
							this.execCommand("settablebackground", {
								repeat: !0,
								colorList: ["#bbb", "#ccc"]
							})
						}
					},
					{
						label: a.unsetbackground,
						cmdName: "cleartablebackground",
						exec: function() {
							this.execCommand("cleartablebackground")
						}
					},
					{
						label: a.redandblue,
						cmdName: "settablebackground",
						exec: function() {
							this.execCommand("settablebackground", {
								repeat: !0,
								colorList: ["red", "blue"]
							})
						}
					},
					{
						label: a.threecolorgradient,
						cmdName: "settablebackground",
						exec: function() {
							this.execCommand("settablebackground", {
								repeat: !0,
								colorList: ["#aaa", "#bbb", "#ccc"]
							})
						}
					}]
				},
				{
					group: a.aligntd,
					icon: "aligntd",
					subMenu: [{
						cmdName: "cellalignment",
						value: {
							align: "left",
							vAlign: "top"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "center",
							vAlign: "top"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "right",
							vAlign: "top"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "left",
							vAlign: "middle"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "center",
							vAlign: "middle"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "right",
							vAlign: "middle"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "left",
							vAlign: "bottom"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "center",
							vAlign: "bottom"
						}
					},
					{
						cmdName: "cellalignment",
						value: {
							align: "right",
							vAlign: "bottom"
						}
					}]
				},
				{
					group: a.aligntable,
					icon: "aligntable",
					subMenu: [{
						cmdName: "tablealignment",
						className: "left",
						label: a.tableleft,
						value: "left"
					},
					{
						cmdName: "tablealignment",
						className: "center",
						label: a.tablecenter,
						value: "center"
					},
					{
						cmdName: "tablealignment",
						className: "right",
						label: a.tableright,
						value: "right"
					}]
				},
				"-", {
					label: a.insertparagraphbefore,
					cmdName: "insertparagraph",
					value: !0
				},
				{
					label: a.insertparagraphafter,
					cmdName: "insertparagraph"
				},
				{
					label: a.copy,
					cmdName: "copy",
					exec: function() {
						alert(a.copymsg)
					},
					query: function() {
						return 0
					}
				},
				{
					label: a.paste,
					cmdName: "paste",
					exec: function() {
						alert(a.pastemsg)
					},
					query: function() {
						return 0
					}
				}];
				if (b.length) {
					var c = UE.ui.uiUtils;
					h.addListener("contextmenu",
					function(g, f) {
						var k = c.getViewportOffsetByEvent(f);
						h.fireEvent("beforeselectionchange");
						e && e.destroy();
						for (var l = 0,
						m, n = []; m = b[l]; l++) {
							var r; (function(b) {
								if ("-" == b)(r = n[n.length - 1]) && "-" !== r && n.push("-");
								else if (b.hasOwnProperty("group")) {
									for (var c = 0,
									e, d = []; e = b.subMenu[c]; c++)(function(a) {
										"-" == a ? (r = d[d.length - 1]) && "-" !== r ? d.push("-") : d.splice(d.length - 1) : (h.commands[a.cmdName] || UE.commands[a.cmdName] || a.query) && -1 < (a.query ? a.query() : h.queryCommandState(a.cmdName)) && d.push({
											label: a.label || h.getLang("contextMenu." + a.cmdName + (a.value || "")) || "",
											className: "edui-for-" + a.cmdName + (a.className ? " edui-for-" + a.cmdName + "-" + a.className: ""),
											onclick: a.exec ?
											function() {
												a.exec.call(h)
											}: function() {
												h.execCommand(a.cmdName, a.value)
											}
										})
									})(e);
									d.length && n.push({
										label: function() {
											switch (b.icon) {
											case "table":
												return h.getLang("contextMenu.table");
											case "justifyjustify":
												return h.getLang("contextMenu.paragraph");
											case "aligntd":
												return h.getLang("contextMenu.aligntd");
											case "aligntable":
												return h.getLang("contextMenu.aligntable");
											case "tablesort":
												return a.tablesort;
											case "borderBack":
												return a.borderbk;
											default:
												return ""
											}
										} (),
										className: "edui-for-" + b.icon,
										subMenu: {
											items: d,
											editor: h
										}
									})
								} else(h.commands[b.cmdName] || UE.commands[b.cmdName] || b.query) && -1 < (b.query ? b.query.call(h) : h.queryCommandState(b.cmdName)) && n.push({
									label: b.label || h.getLang("contextMenu." + b.cmdName),
									className: "edui-for-" + (b.icon ? b.icon: b.cmdName + (b.value || "")),
									onclick: b.exec ?
									function() {
										b.exec.call(h)
									}: function() {
										h.execCommand(b.cmdName, b.value)
									}
								})
							})(m)
						}
						"-" == n[n.length - 1] && n.pop();
						e = new UE.ui.Menu({
							items: n,
							className: "edui-contextmenu",
							editor: h
						});
						e.render();
						e.showAt(k);
						h.fireEvent("aftershowcontextmenu", e);
						d.preventDefault(f);
						if (q.ie) {
							var t;
							try {
								t = h.selection.getNative().createRange()
							} catch(p) {
								return
							}
							t.item && (new I.Range(h.document)).selectNode(t.item(0)).select(!0, !0)
						}
					})
				}
			};
			UE.plugins.shortcutmenu = function() {
				var h, a = this.options.shortcutMenu || [];
				a.length && (this.addListener("contextmenu mouseup",
				function(e, b) {
					var c = this,
					g = {
						type: e,
						target: b.target || b.srcElement,
						screenX: b.screenX,
						screenY: b.screenY,
						clientX: b.clientX,
						clientY: b.clientY
					};
					setTimeout(function() {
						if (!1 === c.selection.getRange().collapsed || "contextmenu" == e) h || (h = new s.editor.ui.ShortCutMenu({
							editor: c,
							items: a,
							theme: c.options.theme,
							className: "edui-shortcutmenu"
						}), h.render(), c.fireEvent("afterrendershortcutmenu", h)),
						h.show(g, !!UE.plugins.contextmenu)
					});
					if ("contextmenu" == e && (d.preventDefault(b), q.ie9below)) {
						var f;
						try {
							f = c.selection.getNative().createRange()
						} catch(k) {
							return
						}
						f.item && (new I.Range(c.document)).selectNode(f.item(0)).select(!0, !0)
					}
				}), this.addListener("keydown",
				function(a) {
					"keydown" == a && h && !h.isHidden && h.hide()
				}))
			};
			UE.plugins.basestyle = function() {
				var h = {
					bold: ["strong", "b"],
					italic: ["em", "i"],
					subscript: ["sub"],
					superscript: ["sup"]
				},
				a = this;
				a.addshortcutkey({
					Bold: "ctrl+66",
					Italic: "ctrl+73",
					Underline: "ctrl+85"
				});
				a.addInputRule(function(a) {
					p.each(a.getNodesByTagName("b i"),
					function(a) {
						switch (a.tagName) {
						case "b":
							a.tagName = "strong";
							break;
						case "i":
							a.tagName = "em"
						}
					})
				});
				for (var e in h)(function(b, c) {
					a.commands[b] = {
						execCommand: function(b) {
							var e = a.selection.getRange(),
							k = d.filterNodeList(this.selection.getStartElementPath(), c);
							if (e.collapsed) {
								if (k) b = a.document.createTextNode(""),
								e.insertNode(b).removeInlineStyle(c),
								e.setStartBefore(b),
								d.remove(b);
								else {
									k = e.document.createElement(c[0]);
									if ("superscript" == b || "subscript" == b) b = a.document.createTextNode(""),
									e.insertNode(b).removeInlineStyle(["sub", "sup"]).setStartBefore(b).collapse(!0);
									e.insertNode(k).setStart(k, 0)
								}
								e.collapse(!0)
							} else {
								if ("superscript" == b || "subscript" == b) k && k.tagName.toLowerCase() == b || e.removeInlineStyle(["sub", "sup"]);
								k ? e.removeInlineStyle(c) : e.applyInlineStyle(c[0])
							}
							e.select()
						},
						queryCommandState: function() {
							return d.filterNodeList(this.selection.getStartElementPath(), c) ? 1 : 0
						}
					}
				})(e, h[e])
			};
			UE.plugins.elementpath = function() {
				var d, a, e = this;
				e.setOpt("elementPathEnabled", !0);
				e.options.elementPathEnabled && (e.commands.elementpath = {
					execCommand: function(b, c) {
						var g = a[c],
						f = e.selection.getRange();
						d = 1 * c;
						f.selectNode(g).select()
					},
					queryCommandValue: function() {
						var b = [].concat(this.selection.getStartElementPath()).reverse(),
						c = [];
						a = b;
						for (var e = 0,
						f; f = b[e]; e++) if (3 != f.nodeType) {
							var k = f.tagName.toLowerCase();
							"img" == k && f.getAttribute("anchorname") && (k = "anchor");
							c[e] = k;
							if (d == e) {
								d = -1;
								break
							}
						}
						return c
					}
				})
			};
			UE.plugins.formatmatch = function() {
				function h(g, f) {
					if (q.webkit) var k = "IMG" == f.target.tagName ? f.target: null;
					a.undoManger && a.undoManger.save();
					var l = a.selection.getRange(),
					k = k || l.getClosedNode();
					if (b && k && "IMG" == k.tagName) k.style.cssText += ";float:" + (b.style.cssFloat || b.style.styleFloat || "none") + ";display:" + (b.style.display || "inline"),
					b = null;
					else if (!b) {
						if (l.collapsed) {
							var m = a.document.createTextNode("match");
							l.insertNode(m).select()
						}
						a.__hasEnterExecCommand = !0;
						l = a.options.removeFormatAttributes;
						a.options.removeFormatAttributes = "";
						a.execCommand("removeformat");
						a.options.removeFormatAttributes = l;
						a.__hasEnterExecCommand = !1;
						l = a.selection.getRange();
						e.length && (k = l, m && k.selectNode(m), k.applyInlineStyle(e[e.length - 1].tagName, null, e));
						m && l.setStartBefore(m).collapse(!0);
						l.select();
						m && d.remove(m)
					}
					a.undoManger && a.undoManger.save();
					a.removeListener("mouseup", h);
					c = 0
				}
				var a = this,
				e = [],
				b,
				c = 0;
				a.addListener("reset",
				function() {
					e = [];
					c = 0
				});
				a.commands.formatmatch = {
					execCommand: function(g) {
						if (c) c = 0,
						e = [],
						a.removeListener("mouseup", h);
						else {
							g = a.selection.getRange();
							b = g.getClosedNode();
							if (!b || "IMG" != b.tagName) {
								g.collapse(!0).shrinkBoundary();
								e = d.findParents(g.startContainer, !0,
								function(a) {
									return ! d.isBlockElm(a) && 1 == a.nodeType
								});
								g = 0;
								for (var f; f = e[g]; g++) if ("A" == f.tagName) {
									e.splice(g, 1);
									break
								}
							}
							a.addListener("mouseup", h);
							c = 1
						}
					},
					queryCommandState: function() {
						return c
					},
					notNeedUndo: 1
				}
			};
			UE.plugin.register("searchreplace",
			function() {
				function h(a, b, e) {
					var k = 0;
					a = a.firstChild;
					for (var l = 0; a;) {
						if (3 == a.nodeType) {
							if (l = a.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, k += l, k >= b) return {
								node: a,
								index: l - (k - b)
							}
						} else if (!v.$empty[a.tagName] && (l = a[q.ie ? "innerText": "textContent"].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length, k += l, k >= b && (l = h(a, l - (k - b), e)))) return l;
						a = d.getNextDomNode(a)
					}
				}
				function a(a, b) {
					var f = a.selection.getRange(),
					k,
					l = b.searchStr,
					m = a.document.createElement("span");
					m.innerHTML = "$$ueditor_searchreplace_key$$";
					if (!f.collapsed) {
						f.select();
						var n = a.selection.getText();
						if (RegExp("^" + b.searchStr + "$", b.casesensitive ? "": "i").test(n)) {
							if (void 0 != b.replaceStr) return e(f, b.replaceStr),
							f.select(),
							!0;
							f.collapse( - 1 == b.dir)
						}
					}
					f.insertNode(m);
					f.enlargeToBlockElm(!0);
					k = f.startContainer;
					n = k[q.ie ? "innerText": "textContent"].indexOf("$$ueditor_searchreplace_key$$");
					f.setStartBefore(m);
					d.remove(m);
					a: {
						var m = k,
						r;
						k = b.all || 1 == b.dir ? "getNextDomNode": "getPreDomNode";
						d.isBody(m) && (m = m.firstChild);
						for (; m;) {
							r = 3 == m.nodeType ? m.nodeValue: m[q.ie ? "innerText": "textContent"];
							b: {
								var t = b,
								p = n,
								w = t.searchStr; - 1 == t.dir && (r = r.split("").reverse().join(""), w = w.split("").reverse().join(""), p = r.length - p);
								for (var w = RegExp(w, "g" + (t.casesensitive ? "": "i")), u = void 0; u = w.exec(r);) if (u.index >= p) {
									r = -1 == t.dir ? r.length - u.index - t.searchStr.length: u.index;
									break b
								}
								r = -1
							}
							if ( - 1 != r) {
								n = {
									node: m,
									index: r
								};
								break a
							} (m = d[k](m)) && (n = -1 == b.dir ? (3 == m.nodeType ? m.nodeValue: m[q.ie ? "innerText": "textContent"]).length: 0)
						}
						n = void 0
					}
					if (n) return m = h(n.node, n.index, l),
					l = h(n.node, n.index + l.length, l),
					f.setStart(m.node, m.index).setEnd(l.node, l.index),
					void 0 !== b.replaceStr && e(f, b.replaceStr),
					f.select(),
					!0;
					f.setCursor()
				}
				function e(a, e) {
					b.fireEvent("saveScene");
					e = b.document.createTextNode(e);
					a.deleteContents().insertNode(e);
					b.fireEvent("saveScene")
				}
				var b = this;
				return {
					commands: {
						searchreplace: {
							execCommand: function(c, e) {
								p.extend(e, {
									all: !1,
									casesensitive: !1,
									dir: 1
								},
								!0);
								var d = 0;
								if (e.all) {
									var k = b.selection.getRange(),
									l = b.body.firstChild;
									l && 1 == l.nodeType ? k.setStart(l, 0) : 3 == l.nodeType && k.setStartBefore(l);
									for (k.collapse(!0).select(!0); a(this, e);) d++
								} else a(this, e) && d++;
								return d
							},
							notNeedUndo: 1
						}
					}
				}
			});
			UE.plugins.customstyle = function() {
				var h = this;
				h.setOpt({
					customstyle: [{
						tag: "h1",
						name: "tc",
						style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"
					},
					{
						tag: "h1",
						name: "tl",
						style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"
					},
					{
						tag: "span",
						name: "im",
						style: "font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"
					},
					{
						tag: "span",
						name: "hi",
						style: "font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"
					}]
				});
				h.commands.customstyle = {
					execCommand: function(a, e) {
						var b = e.tag,
						c = d.findParent(this.selection.getStart(),
						function(a) {
							return a.getAttribute("label")
						},
						!0),
						g,
						f,
						k = {};
						for (g in e) void 0 !== e[g] && (k[g] = e[g]);
						delete k.tag;
						if (c && c.getAttribute("label") == e.label) {
							g = this.selection.getRange();
							f = g.createBookmark();
							if (g.collapsed) if (v.$block[c.tagName]) {
								var l = this.document.createElement("p");
								d.moveChild(c, l);
								c.parentNode.insertBefore(l, c);
								d.remove(c)
							} else d.remove(c, !0);
							else {
								c = d.getCommonAncestor(f.start, f.end);
								k = d.getElementsByTagName(c, b);
								RegExp(b, "i").test(c.tagName) && k.push(c);
								for (var h = 0,
								n; n = k[h++];) if (n.getAttribute("label") == e.label) {
									var l = d.getPosition(n, f.start),
									r = d.getPosition(n, f.end); (l & d.POSITION_FOLLOWING || l & d.POSITION_CONTAINS) && (r & d.POSITION_PRECEDING || r & d.POSITION_CONTAINS) && v.$block[b] && (l = this.document.createElement("p"), d.moveChild(n, l), n.parentNode.insertBefore(l, n));
									d.remove(n, !0)
								} (c = d.findParent(c,
								function(a) {
									return a.getAttribute("label") == e.label
								},
								!0)) && d.remove(c, !0)
							}
							g.moveToBookmark(f).select()
						} else v.$block[b] ? (this.execCommand("paragraph", b, k, "customstyle"), g = this.selection.getRange(), g.collapsed || (g.collapse(), c = d.findParent(this.selection.getStart(),
						function(a) {
							return a.getAttribute("label") == e.label
						},
						!0), b = this.document.createElement("p"), d.insertAfter(c, b), d.fillNode(this.document, b), g.setStart(b, 0).setCursor())) : (g = this.selection.getRange(), g.collapsed ? (c = this.document.createElement(b), d.setAttributes(c, k), g.insertNode(c).setStart(c, 0).setCursor()) : (f = g.createBookmark(), g.applyInlineStyle(b, k).moveToBookmark(f).select()))
					},
					queryCommandValue: function() {
						var a = d.filterNodeList(this.selection.getStartElementPath(),
						function(a) {
							return a.getAttribute("label")
						});
						return a ? a.getAttribute("label") : ""
					}
				};
				h.addListener("keyup",
				function(a, e) {
					var b = e.keyCode || e.which;
					if (32 == b || 13 == b) if (b = h.selection.getRange(), b.collapsed) {
						var c = d.findParent(h.selection.getStart(),
						function(a) {
							return a.getAttribute("label")
						},
						!0);
						if (c && v.$block[c.tagName] && d.isEmptyNode(c)) {
							var g = h.document.createElement("p");
							d.insertAfter(c, g);
							d.fillNode(h.document, g);
							d.remove(c);
							b.setStart(g, 0).setCursor()
						}
					}
				})
			};
			UE.plugins.catchremoteimage = function() {
				function h(b, d) {
					var l = b.join(g),
					h = {
						timeout: 6E4,
						onsuccess: d.success,
						onerror: d.error
					};
					h[a.options.catchFieldName] = l;
					e.request(c, h)
				}
				if (!1 !== this.options.catchRemoteImageEnable) {
					var a = this;
					this.setOpt({
						localDomain: ["127.0.0.1", "localhost", "img.baidu.com"],
						separater: "ue_separate_ue",
						catchFieldName: "upfile",
						catchRemoteImageEnable: !0
					});
					var e = UE.ajax,
					b = a.options.localDomain,
					c = a.options.catcherUrl,
					g = a.options.separater;
					a.addListener("afterpaste",
					function() {
						a.fireEvent("catchRemoteImage")
					});
					a.addListener("catchRemoteImage",
					function() {
						for (var c = [], e = d.getElementsByTagName(a.document, "img"), l = function(a, b) {
							for (var c = 0,
							e; e = b[c++];) if ( - 1 !== a.indexOf(e)) return ! 0;
							return ! 1
						},
						m = 0, n; n = e[m++];) n.getAttribute("word_img") || (n = n.getAttribute("_src") || n.src || "", /^(https?|ftp):/i.test(n) && !l(n, b) && c.push(n));
						c.length && h(c, {
							success: function(b) {
								try {
									var c = eval("(" + b.responseText + ")")
								} catch(f) {
									return
								}
								b = c.srcUrl.split(g);
								for (var c = c.url.split(g), l = 0, h; h = e[l++];) for (var n = h.getAttribute("_src") || h.src || "", m = 0, p; p = b[m++];) {
									var q = c[m - 1];
									if (n == p && "error" != q) {
										n = a.options.catcherPath + q;
										d.setAttributes(h, {
											src: n,
											_src: n
										});
										break
									}
								}
								a.fireEvent("catchremotesuccess")
							},
							error: function() {
								a.fireEvent("catchremoteerror")
							}
						})
					})
				}
			};
			UE.plugins.snapscreen = function() {
				var d, a;
				this.setOpt({
					snapscreenServerPort: location.port,
					snapscreenImgAlign: "",
					snapscreenHost: location.hostname
				});
				this.commands.snapscreen = {
					execCommand: function() {
						var e = this,
						b = e.getLang("snapScreen_plugin");
						if (!a) {
							var c = e.container;
							d = c.ownerDocument || c.document;
							a = d.createElement("object");
							try {
								a.type = "application/x-pluginbaidusnap"
							} catch(g) {
								return
							}
							a.style.cssText = "position:absolute;left:-9999px;";
							a.setAttribute("width", "0");
							a.setAttribute("height", "0");
							c.appendChild(a)
						}
						var f = e.options,
						c = function(a) {
							try {
								a = eval("(" + a + ")")
							} catch(c) {
								alert(b.callBackErrorMsg);
								return
							}
							"SUCCESS" != a.state ? alert(a.state) : e.execCommand("insertimage", {
								src: f.snapscreenPath + a.url,
								floatStyle: f.snapscreenImgAlign,
								_src: f.snapscreenPath + a.url
							})
						};
						try {
							var k = f.snapscreenServerPort + "";
							f.snapscreenServerUrl = f.snapscreenServerUrl.split(f.snapscreenHost);
							f.snapscreenServerUrl = f.snapscreenServerUrl[1] || f.snapscreenServerUrl[0];
							0 === f.snapscreenServerUrl.indexOf(":" + k) && (f.snapscreenServerUrl = f.snapscreenServerUrl.substring(k.length + 1));
							var l = a.saveSnapshot(f.snapscreenHost, f.snapscreenServerUrl, k);
							c(l)
						} catch(m) {
							e.ui._dialogs.snapscreenDialog.open()
						}
					}
				}
			};
			UE.commands.insertparagraph = {
				execCommand: function(h, a) {
					for (var e = this.selection.getRange(), b = e.startContainer, c; b && !d.isBody(b);) c = b,
					b = b.parentNode;
					c && (b = this.document.createElement("p"), a ? c.parentNode.insertBefore(b, c) : c.parentNode.insertBefore(b, c.nextSibling), d.fillNode(this.document, b), e.setStart(b, 0).setCursor(!1, !0))
				}
			};
			UE.plugin.register("webapp",
			function() {
				function d(e, b) {
					return b ? '<iframe class="edui-faked-webapp" title="' + e.title + '" ' + (e.align && !e.cssfloat ? 'align="' + e.align + '"': "") + (e.cssfloat ? 'style="float:' + e.cssfloat + '"': "") + 'width="' + e.width + '" height="' + e.height + '"  scrolling="no" frameborder="0" src="' + e.url + '" logo_url = "' + e.logo + '"></iframe>': '<img title="' + e.title + '" width="' + e.width + '" height="' + e.height + '" src="' + a.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" _logo_url="' + e.logo + '" style="background:url(' + e.logo + ') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="' + e.url + '" ' + (e.align && !e.cssfloat ? 'align="' + e.align + '"': "") + (e.cssfloat ? 'style="float:' + e.cssfloat + '"': "") + "/>"
				}
				var a = this;
				return {
					outputRule: function(a) {
						p.each(a.getNodesByTagName("img"),
						function(a) {
							var c;
							"edui-faked-webapp" == a.getAttr("class") && (c = d({
								title: a.getAttr("title"),
								width: a.getAttr("width"),
								height: a.getAttr("height"),
								align: a.getAttr("align"),
								cssfloat: a.getStyle("float"),
								url: a.getAttr("_url"),
								logo: a.getAttr("_logo_url")
							},
							!0), c = UE.uNode.createElement(c), a.parentNode.replaceChild(c, a))
						})
					},
					inputRule: function(a) {
						p.each(a.getNodesByTagName("iframe"),
						function(a) {
							if ("edui-faked-webapp" == a.getAttr("class")) {
								var c = UE.uNode.createElement(d({
									title: a.getAttr("title"),
									width: a.getAttr("width"),
									height: a.getAttr("height"),
									align: a.getAttr("align"),
									cssfloat: a.getStyle("float"),
									url: a.getAttr("src"),
									logo: a.getAttr("logo_url")
								}));
								a.parentNode.replaceChild(c, a)
							}
						})
					},
					commands: {
						webapp: {
							execCommand: function(a, b) {
								var c = d(p.extend(b, {
									align: "none"
								}), !1);
								this.execCommand("inserthtml", c)
							},
							queryCommandState: function() {
								var a = this.selection.getRange().getClosedNode();
								return a && "edui-faked-webapp" == a.className ? 1 : 0
							}
						}
					}
				}
			});
			UE.plugins.template = function() {
				UE.commands.template = {
					execCommand: function(d, a) {
						a.html && this.execCommand("inserthtml", a.html)
					}
				};
				this.addListener("click",
				function(h, a) {
					var e = a.target || a.srcElement,
					b = this.selection.getRange(); (e = d.findParent(e,
					function(a) {
						if (a.className && d.hasClass(a, "ue_t")) return a
					},
					!0)) && b.selectNode(e).shrinkBoundary().select()
				});
				this.addListener("keydown",
				function(h, a) {
					var e = this.selection.getRange();
					e.collapsed || (a.ctrlKey || a.metaKey || a.shiftKey || a.altKey) || (e = d.findParent(e.startContainer,
					function(a) {
						if (a.className && d.hasClass(a, "ue_t")) return a
					},
					!0)) && d.removeClasses(e, ["ue_t"])
				})
			};
			UE.plugin.register("music",
			function() {
				function d(e, b, c, g, f, k) {
					return k ? '<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + e + '" width="' + b + '" height="' + c + '" ' + (g && !f ? 'align="' + g + '"': "") + (f ? 'style="float:' + f + '"': "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >': "<img " + (g && !f ? 'align="' + g + '"': "") + (f ? 'style="float:' + f + '"': "") + ' width="' + b + '" height="' + c + '" _url="' + e + '" class="edui-faked-music" src="' + a.options.langPath + a.options.lang + '/images/music.png" />'
				}
				var a = this;
				return {
					outputRule: function(a) {
						p.each(a.getNodesByTagName("img"),
						function(a) {
							var c;
							if ("edui-faked-music" == a.getAttr("class")) {
								c = a.getStyle("float");
								var e = a.getAttr("align");
								c = d(a.getAttr("_url"), a.getAttr("width"), a.getAttr("height"), e, c, !0);
								c = UE.uNode.createElement(c);
								a.parentNode.replaceChild(c, a)
							}
						})
					},
					inputRule: function(a) {
						p.each(a.getNodesByTagName("embed"),
						function(a) {
							if ("edui-faked-music" == a.getAttr("class")) {
								var c = a.getStyle("float"),
								e = a.getAttr("align");
								html = d(a.getAttr("src"), a.getAttr("width"), a.getAttr("height"), e, c, !1);
								c = UE.uNode.createElement(html);
								a.parentNode.replaceChild(c, a)
							}
						})
					},
					commands: {
						music: {
							execCommand: function(a, b) {
								var c = d(b.url, b.width || 400, b.height || 95, "none", !1);
								this.execCommand("inserthtml", c)
							},
							queryCommandState: function() {
								var a = this.selection.getRange().getClosedNode();
								return a && "edui-faked-music" == a.className ? 1 : 0
							}
						}
					}
				}
			});
			UE.plugin.register("autoupload",
			function() {
				var h = this,
				a = function(a, b) {
					var c = new FormData;
					c.append(b.options.imageFieldName || "upfile", a, a.name || "blob." + a.type.substr(6));
					c.append("type", "ajax");
					var d = new XMLHttpRequest;
					d.open("post", h.options.imageUrl, !0);
					d.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					d.addEventListener("load",
					function(a) {
						try {
							var c = (new Function("return " + a.target.response))(),
							e = h.options.imagePath + c.url;
							b.execCommand("insertimage", {
								src: e,
								_src: e
							})
						} catch(d) {}
					});
					d.send(c)
				};
				return {
					bindEvents: {
						ready: function(e) {
							window.FormData && window.FileReader && (d.on(h.body, "paste drop",
							function(b) {
								var c = !1,
								e;
								if (e = "paste" == b.type ? b.clipboardData && b.clipboardData.items && 1 == b.clipboardData.items.length && /^image\//.test(b.clipboardData.items[0].type) ? b.clipboardData.items: null: b.dataTransfer && b.dataTransfer.files ? b.dataTransfer.files: null) {
									for (var d = e.length,
									k; d--;) k = e[d],
									k.getAsFile && (k = k.getAsFile()),
									k && (0 < k.size && /image\/\w+/i.test(k.type)) && (a(k, h), c = !0);
									c && b.preventDefault()
								}
							}), d.on(h.body, "dragover",
							function(a) {
								"Files" == a.dataTransfer.types[0] && a.preventDefault()
							}))
						}
					}
				}
			});
			UE.plugin.register("autosave",
			function() {
				function d(f) {
					var k = null;
					new Date - e < b || (f.hasContents() ? (e = new Date, f._saveFlag = null, k = a.body.innerHTML, !1 !== f.fireEvent("beforeautosave", {
						content: k
					}) && (g.saveLocalData(c, k), f.fireEvent("afterautosave", {
						content: k
					}))) : c && g.removeItem(c))
				}
				var a = this,
				e = new Date,
				b = 20,
				c = null,
				g = UE.LocalStorage = function() {
					function a() {
						var b = document.createElement("div");
						b.style.display = "none";
						if (!b.addBehavior) return null;
						b.addBehavior("#default#userdata");
						return {
							getItem: function(a) {
								var e = null;
								try {
									document.body.appendChild(b),
									b.load(c),
									e = b.getAttribute(a),
									document.body.removeChild(b)
								} catch(d) {}
								return e
							},
							setItem: function(a, e) {
								document.body.appendChild(b);
								b.setAttribute(a, e);
								b.save(c);
								document.body.removeChild(b)
							},
							removeItem: function(a) {
								document.body.appendChild(b);
								b.removeAttribute(a);
								b.save(c);
								document.body.removeChild(b)
							}
						}
					}
					var b = window.localStorage || a() || null,
					c = "localStorage";
					return {
						saveLocalData: function(a, c) {
							return b && c ? (b.setItem(a, c), !0) : !1
						},
						getLocalData: function(a) {
							return b ? b.getItem(a) : null
						},
						removeItem: function(a) {
							b && b.removeItem(a)
						}
					}
				} ();
				return {
					defaultOptions: {
						saveInterval: 500
					},
					bindEvents: {
						ready: function() {
							var b = null,
							b = a.key ? a.key + "-drafts-data": (a.container.parentNode.id || "ue-common") + "-drafts-data";
							c = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + b
						},
						contentchange: function() {
							c && (a._saveFlag && window.clearTimeout(a._saveFlag), 0 < a.options.saveInterval ? a._saveFlag = window.setTimeout(function() {
								d(a)
							},
							a.options.saveInterval) : d(a))
						}
					},
					commands: {
						clearlocaldata: {
							execCommand: function(a, b) {
								c && g.getLocalData(c) && g.removeItem(c)
							},
							notNeedUndo: !0,
							ignoreContentChange: !0
						},
						getlocaldata: {
							execCommand: function(a, b) {
								return c ? g.getLocalData(c) || "": ""
							},
							notNeedUndo: !0,
							ignoreContentChange: !0
						},
						drafts: {
							execCommand: function(b, e) {
								c && (a.body.innerHTML = g.getLocalData(c) || "<p>" + (q.ie ? "&nbsp;": "<br/>") + "</p>", a.focus(!0))
							},
							queryCommandState: function() {
								return c ? null === g.getLocalData(c) ? -1 : 0 : -1
							},
							notNeedUndo: !0,
							ignoreContentChange: !0
						}
					}
				}
			});
			UE.plugin.register("charts",
			function() {
				function h(a) {
					var b = null,
					c = 0;
					if (2 > a.rows.length || 2 > a.rows[0].cells.length) return ! 1;
					for (var b = a.rows[0].cells, c = b.length, d = 0, f; f = b[d]; d++) if ("th" !== f.tagName.toLowerCase()) return ! 1;
					for (d = 1; b = a.rows[d]; d++) {
						if (b.cells.length != c || "th" !== b.cells[0].tagName.toLowerCase()) return ! 1;
						for (var k = 1; f = b.cells[k]; k++) if (f = p.trim(f.innerText || f.textContent || ""), f = f.replace(RegExp(UE.dom.domUtils.fillChar, "g"), "").replace(/^\s+|\s+$/g, ""), !/^\d*\.?\d+$/.test(f)) return ! 1
					}
					return ! 0
				}
				var a = this;
				return {
					bindEvents: {
						chartserror: function() {}
					},
					commands: {
						charts: {
							execCommand: function(e, b) {
								var c = d.findParentByTagName(this.selection.getRange().startContainer, "table", !0),
								g = [],
								f = {};
								if (!c) return ! 1;
								if (!h(c)) return a.fireEvent("chartserror"),
								!1;
								f.title = b.title || "";
								f.subTitle = b.subTitle || "";
								f.xTitle = b.xTitle || "";
								f.yTitle = b.yTitle || "";
								f.suffix = b.suffix || "";
								f.tip = b.tip || "";
								f.dataFormat = b.tableDataFormat || "";
								f.chartType = b.chartType || 0;
								for (var k in f) f.hasOwnProperty(k) && g.push(k + ":" + f[k]);
								c.setAttribute("data-chart", g.join(";"));
								d.addClass(c, "edui-charts-table")
							},
							queryCommandState: function(a, b) {
								var c = d.findParentByTagName(this.selection.getRange().startContainer, "table", !0);
								return c && h(c) ? 0 : -1
							}
						}
					},
					inputRule: function(a) {
						p.each(a.getNodesByTagName("table"),
						function(a) {
							void 0 !== a.getAttr("data-chart") && a.setAttr("style")
						})
					},
					outputRule: function(a) {
						p.each(a.getNodesByTagName("table"),
						function(a) {
							void 0 !== a.getAttr("data-chart") && a.setAttr("style", "display: none;")
						})
					}
				}
			});
			UE.plugin.register("section",
			function() {
				function h(a) {
					this.tag = "";
					this.level = -1;
					this.parentSection = this.previousSection = this.nextSection = this.dom = null;
					this.startAddress = [];
					this.endAddress = [];
					this.children = []
				}
				function a(a) {
					var b = new h;
					return p.extend(b, a)
				}
				function e(a, b) {
					for (var e = b,
					d = 0; d < a.length; d++) {
						if (!e.childNodes) return null;
						e = e.childNodes[a[d]]
					}
					return e
				}
				var b = this;
				return {
					bindMultiEvents: {
						type: "aftersetcontent afterscencerestore",
						handler: function() {
							b.fireEvent("updateSections")
						}
					},
					bindEvents: {
						ready: function() {
							b.fireEvent("updateSections");
							d.on(b.body, "drop paste",
							function() {
								b.fireEvent("updateSections")
							})
						},
						afterexeccommand: function(a, e) {
							"paragraph" == e && b.fireEvent("updateSections")
						},
						keyup: function(a, b) {
							if (!0 != this.selection.getRange().collapsed) this.fireEvent("updateSections");
							else {
								var e = b.keyCode || b.which;
								13 != e && 8 != e && 46 != e || this.fireEvent("updateSections")
							}
						}
					},
					commands: {
						getsections: {
							execCommand: function(b, e) {
								function d(b, c) {
									for (var e, l = null,
									g, q = b.childNodes,
									s = 0,
									v = q.length; s < v; s++) {
										g = q[s];
										a: {
											e = g;
											for (var L = 0; L < k.length; L++) if (k[L](e)) {
												e = L;
												break a
											}
											e = -1
										}
										if (0 <= e) {
											l = h.selection.getRange().selectNode(g).createAddress(!0).startAddress;
											l = a({
												tag: g.tagName,
												title: g.innerText || g.textContent || "",
												level: e,
												dom: g,
												startAddress: p.clone(l, []),
												endAddress: p.clone(l, []),
												children: []
											});
											n.nextSection = l;
											for (g = l.previousSection = n; e <= g.level;) g = g.parentSection;
											l.parentSection = g;
											g.children.push(l);
											l = n = l
										} else 1 === g.nodeType && d(g, c),
										l && l.endAddress[l.endAddress.length - 1]++
									}
								}
								for (var k = e || "h1 h2 h3 h4 h5 h6".split(" "), l = 0; l < k.length; l++)"string" == typeof k[l] ? k[l] = function(a) {
									return function(b) {
										return b.tagName == a.toUpperCase()
									}
								} (k[l]) : "function" != typeof k[l] && (k[l] = function(a) {
									return null
								});
								var h = this,
								n = l = a({
									level: -1,
									title: "root"
								});
								d(h.body, l);
								return l
							},
							notNeedUndo: !0
						},
						movesection: {
							execCommand: function(a, b, f, k) {
								if (b && f && -1 != f.level) {
									f = k ? f.endAddress: f.startAddress;
									a = e(f, this.body);
									var l;
									if (! (l = !f) && !(l = !a)) {
										l = b.startAddress;
										for (var h = !1,
										n = !1,
										r = 0; r < l.length && !(r >= f.length); r++) if (f[r] > l[r]) {
											h = !0;
											break
										} else if (f[r] < l[r]) break;
										for (r = 0; r < b.endAddress.length && !(r >= f.length); r++) if (f[r] < l[r]) {
											n = !0;
											break
										} else if (f[r] > l[r]) break;
										l = h && n
									}
									if (!l) {
										f = e(b.startAddress, this.body);
										b = e(b.endAddress, this.body);
										if (k) for (k = b; k && !(d.getPosition(f, k) & d.POSITION_FOLLOWING);) {
											l = k.previousSibling;
											d.insertAfter(a, k);
											if (k == f) break;
											k = l
										} else for (k = f; k && !(d.getPosition(k, b) & d.POSITION_FOLLOWING);) {
											l = k.nextSibling;
											a.parentNode.insertBefore(k, a);
											if (k == b) break;
											k = l
										}
										this.fireEvent("updateSections")
									}
								}
							}
						},
						deletesection: {
							execCommand: function(a, b, e) {
								function k(a) {
									for (var b = l.body,
									c = 0; c < a.length; c++) {
										if (!b.childNodes) return null;
										b = b.childNodes[a[c]]
									}
									return b
								}
								var l = this;
								if (b) {
									a = k(b.startAddress);
									b = k(b.endAddress);
									if (e) d.remove(a);
									else for (; a && d.inDoc(b, l.document) && !(d.getPosition(a, b) & d.POSITION_FOLLOWING);) e = a.nextSibling,
									d.remove(a),
									a = e;
									l.fireEvent("updateSections")
								}
							}
						},
						selectsection: {
							execCommand: function(a, b) {
								if (!b && !b.dom) return ! 1;
								var e = this.selection.getRange(),
								d = {
									startAddress: p.clone(b.startAddress, []),
									endAddress: p.clone(b.endAddress, [])
								};
								d.endAddress[d.endAddress.length - 1]++;
								e.moveToAddress(d).select().scrollToView();
								return ! 0
							},
							notNeedUndo: !0
						},
						scrolltosection: {
							execCommand: function(a, b) {
								if (!b && !b.dom) return ! 1;
								var e = this.selection.getRange(),
								d = {
									startAddress: b.startAddress,
									endAddress: b.endAddress
								};
								d.endAddress[d.endAddress.length - 1]++;
								e.moveToAddress(d).scrollToView();
								return ! 0
							},
							notNeedUndo: !0
						}
					}
				}
			});
			s = s || {};
			s.editor = s.editor || {};
			s.editor.ui = {}; (function() {
				function d() {
					var a = document.getElementById("edui_fixedlayer");
					g.setViewportOffset(a, {
						left: 0,
						top: 0
					})
				}
				var a = s.editor.browser,
				e = s.editor.dom.domUtils,
				b = window.$EDITORUI = {},
				c = 0,
				g = s.editor.ui.uiUtils = {
					uid: function(a) {
						return a ? a.ID$EDITORUI || (a.ID$EDITORUI = ++c) : ++c
					},
					hook: function(a, b) {
						var c;
						a && a._callbacks ? c = a: (c = function() {
							var b;
							a && (b = a.apply(this, arguments));
							for (var e = c._callbacks,
							d = e.length; d--;) {
								var g = e[d].apply(this, arguments);
								void 0 === b && (b = g)
							}
							return b
						},
						c._callbacks = []);
						c._callbacks.push(b);
						return c
					},
					createElementByHtml: function(a) {
						var b = document.createElement("div");
						b.innerHTML = a;
						b = b.firstChild;
						b.parentNode.removeChild(b);
						return b
					},
					getViewportElement: function() {
						return a.ie && a.quirks ? document.body: document.documentElement
					},
					getClientRect: function(a) {
						var b;
						try {
							b = a.getBoundingClientRect()
						} catch(c) {
							b = {
								left: 0,
								top: 0,
								height: 0,
								width: 0
							}
						}
						for (var d = {
							left: Math.round(b.left),
							top: Math.round(b.top),
							height: Math.round(b.bottom - b.top),
							width: Math.round(b.right - b.left)
						},
						g; (g = a.ownerDocument) !== document && (a = e.getWindow(g).frameElement);) b = a.getBoundingClientRect(),
						d.left += b.left,
						d.top += b.top;
						d.bottom = d.top + d.height;
						d.right = d.left + d.width;
						return d
					},
					getViewportRect: function() {
						var a = g.getViewportElement(),
						b = (window.innerWidth || a.clientWidth) | 0,
						a = (window.innerHeight || a.clientHeight) | 0;
						return {
							left: 0,
							top: 0,
							height: a,
							width: b,
							bottom: a,
							right: b
						}
					},
					setViewportOffset: function(a, b) {
						var c = g.getFixedLayer();
						a.parentNode === c ? (a.style.left = b.left + "px", a.style.top = b.top + "px") : e.setViewportOffset(a, b)
					},
					getEventOffset: function(a) {
						var b = g.getClientRect(a.target || a.srcElement);
						a = g.getViewportOffsetByEvent(a);
						return {
							left: a.left - b.left,
							top: a.top - b.top
						}
					},
					getViewportOffsetByEvent: function(a) {
						var b = a.target || a.srcElement,
						c = e.getWindow(b).frameElement;
						a = {
							left: a.clientX,
							top: a.clientY
						};
						c && b.ownerDocument !== document && (b = g.getClientRect(c), a.left += b.left, a.top += b.top);
						return a
					},
					setGlobal: function(a, c) {
						b[a] = c;
						return '$EDITORUI["' + a + '"]'
					},
					unsetGlobal: function(a) {
						delete b[a]
					},
					copyAttributes: function(b, c) {
						for (var d = c.attributes,
						g = d.length; g--;) {
							var h = d[g];
							"style" == h.nodeName || ("class" == h.nodeName || a.ie && !h.specified) || b.setAttribute(h.nodeName, h.nodeValue)
						}
						c.className && e.addClass(b, c.className);
						c.style.cssText && (b.style.cssText += ";" + c.style.cssText)
					},
					removeStyle: function(a, b) {
						if (a.style.removeProperty) a.style.removeProperty(b);
						else if (a.style.removeAttribute) a.style.removeAttribute(b);
						else throw "";
					},
					contains: function(a, b) {
						return a && b && (a === b ? !1 : a.contains ? a.contains(b) : a.compareDocumentPosition(b) & 16)
					},
					startDrag: function(a, b, c) {
						function e(a) {
							b.ondragmove(a.clientX - d, a.clientY - g, a);
							a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
						}
						c = c || document;
						var d = a.clientX,
						g = a.clientY;
						if (c.addEventListener) {
							var h = function(a) {
								c.removeEventListener("mousemove", e, !0);
								c.removeEventListener("mouseup", h, !0);
								window.removeEventListener("mouseup", h, !0);
								b.ondragstop()
							};
							c.addEventListener("mousemove", e, !0);
							c.addEventListener("mouseup", h, !0);
							window.addEventListener("mouseup", h, !0);
							a.preventDefault()
						} else {
							var p = a.srcElement;
							p.setCapture();
							var q = function() {
								p.releaseCapture();
								p.detachEvent("onmousemove", e);
								p.detachEvent("onmouseup", q);
								p.detachEvent("onlosecaptrue", q);
								b.ondragstop()
							};
							p.attachEvent("onmousemove", e);
							p.attachEvent("onmouseup", q);
							p.attachEvent("onlosecaptrue", q);
							a.returnValue = !1
						}
						b.ondragstart()
					},
					getFixedLayer: function() {
						var b = document.getElementById("edui_fixedlayer");
						null == b && (b = document.createElement("div"), b.id = "edui_fixedlayer", document.body.appendChild(b), a.ie && 8 >= a.version ? (b.style.position = "absolute", e.on(window, "scroll", d), e.on(window, "resize", s.editor.utils.defer(d, 0, !0)), setTimeout(d)) : b.style.position = "fixed", b.style.left = "0", b.style.top = "0", b.style.width = "0", b.style.height = "0");
						return b
					},
					makeUnselectable: function(b) {
						if (a.opera || a.ie && 9 > a.version) {
							if (b.unselectable = "on", b.hasChildNodes()) for (var c = 0; c < b.childNodes.length; c++) 1 == b.childNodes[c].nodeType && g.makeUnselectable(b.childNodes[c])
						} else void 0 !== b.style.MozUserSelect ? b.style.MozUserSelect = "none": void 0 !== b.style.WebkitUserSelect ? b.style.WebkitUserSelect = "none": void 0 !== b.style.KhtmlUserSelect && (b.style.KhtmlUserSelect = "none")
					}
				}
			})(); (function() {
				var h = s.editor.utils,
				a = s.editor.ui.uiUtils,
				e = s.editor.EventBase,
				b = s.editor.ui.UIBase = function() {};
				b.prototype = {
					className: "",
					uiName: "",
					initOptions: function(b) {
						for (var e in b) this[e] = b[e];
						this.id = this.id || "edui" + a.uid()
					},
					initUIBase: function() {
						this._globalKey = h.unhtml(a.setGlobal(this.id, this))
					},
					render: function(b) {
						for (var e = this.renderHtml(), e = a.createElementByHtml(e), f = d.getElementsByTagName(e, "*"), k = "edui-" + (this.theme || this.editor.options.theme), l = document.getElementById("edui_fixedlayer"), h = 0, n; n = f[h++];) d.addClass(n, k);
						d.addClass(e, k);
						l && (l.className = "", d.addClass(l, k));
						f = this.getDom();
						null != f ? (f.parentNode.replaceChild(e, f), a.copyAttributes(e, f)) : ("string" == typeof b && (b = document.getElementById(b)), b = b || a.getFixedLayer(), d.addClass(b, k), b.appendChild(e));
						this.postRender()
					},
					getDom: function(a) {
						return a ? document.getElementById(this.id + "_" + a) : document.getElementById(this.id)
					},
					postRender: function() {
						this.fireEvent("postrender")
					},
					getHtmlTpl: function() {
						return ""
					},
					formatHtml: function(a) {
						var b = "edui-" + this.uiName;
						return a.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? b + "-": "").replace(/%%/g, (this.uiName ? b: "") + " " + this.className).replace(/\$\$/g, this._globalKey)
					},
					renderHtml: function() {
						return this.formatHtml(this.getHtmlTpl())
					},
					dispose: function() {
						var b = this.getDom();
						b && s.editor.dom.domUtils.remove(b);
						a.unsetGlobal(this.id)
					}
				};
				h.inherits(b, e)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.UIBase,
				e = s.editor.ui.Separator = function(a) {
					this.initOptions(a);
					this.initSeparator()
				};
				e.prototype = {
					uiName: "separator",
					initSeparator: function() {
						this.initUIBase()
					},
					getHtmlTpl: function() {
						return '<div id="##" class="edui-box %%"></div>'
					}
				};
				d.inherits(e, a)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.dom.domUtils,
				e = s.editor.ui.UIBase,
				b = s.editor.ui.uiUtils,
				c = s.editor.ui.Mask = function(a) {
					this.initOptions(a);
					this.initUIBase()
				};
				c.prototype = {
					getHtmlTpl: function() {
						return '<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>'
					},
					postRender: function() {
						var b = this;
						a.on(window, "resize",
						function() {
							setTimeout(function() {
								b.isHidden() || b._fill()
							})
						})
					},
					show: function(a) {
						this._fill();
						this.getDom().style.display = "";
						this.getDom().style.zIndex = a
					},
					hide: function() {
						this.getDom().style.display = "none";
						this.getDom().style.zIndex = ""
					},
					isHidden: function() {
						return "none" == this.getDom().style.display
					},
					_onMouseDown: function() {
						return ! 1
					},
					_fill: function() {
						var a = this.getDom(),
						c = b.getViewportRect();
						a.style.width = c.width + "px";
						a.style.height = c.height + "px"
					}
				};
				d.inherits(c, e)
			})(); (function() {
				function d(a, b) {
					for (var c = 0; c < f.length; c++) {
						var e = f[c];
						if (!e.isHidden() && !1 !== e.queryAutoHide(b)) {
							if (a && /scroll/ig.test(a.type) && "edui-wordpastepop" == e.className) return;
							e.hide()
						}
					}
					f.length && e.editor.fireEvent("afterhidepop")
				}
				var a = s.editor.utils,
				e = s.editor.ui.uiUtils,
				b = s.editor.dom.domUtils,
				c = s.editor.ui.UIBase,
				g = s.editor.ui.Popup = function(a) {
					this.initOptions(a);
					this.initPopup()
				},
				f = [];
				g.postHide = d;
				var k = ["edui-anchor-topleft", "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright"];
				g.prototype = {
					SHADOW_RADIUS: 5,
					content: null,
					_hidden: !1,
					autoRender: !0,
					canSideLeft: !0,
					canSideUp: !0,
					initPopup: function() {
						this.initUIBase();
						f.push(this)
					},
					getHtmlTpl: function() {
						return '<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div> </div></div>"
					},
					getContentHtmlTpl: function() {
						return this.content ? "string" == typeof this.content ? this.content: this.content.renderHtml() : ""
					},
					_UIBase_postRender: c.prototype.postRender,
					postRender: function() {
						this.content instanceof c && this.content.postRender();
						if (this.captureWheel && !this.captured) {
							this.captured = !0;
							var a = (document.documentElement.clientHeight || document.body.clientHeight) - 80,
							d = this.getDom().offsetHeight,
							f = e.getClientRect(this.combox.getDom()).top,
							g = this.getDom("content"),
							k = this.getDom("body").getElementsByTagName("iframe"),
							h = this;
							for (k.length && (k = k[0]); f + d > a;) d -= 30,
							g.style.height = d + "px",
							k && (k.style.height = d + "px");
							if (window.XMLHttpRequest) b.on(g, "onmousewheel" in document.body ? "mousewheel": "DOMMouseScroll",
							function(a) {
								a.preventDefault ? a.preventDefault() : a.returnValue = !1;
								g.scrollTop = a.wheelDelta ? g.scrollTop - 60 * (a.wheelDelta / 120) : g.scrollTop - 60 * (a.detail / -3)
							});
							else b.on(this.getDom(), "mousewheel",
							function(a) {
								a.returnValue = !1;
								h.getDom("content").scrollTop -= 60 * (a.wheelDelta / 120)
							})
						}
						this.fireEvent("postRenderAfter");
						this.hide(!0);
						this._UIBase_postRender()
					},
					_doAutoRender: function() { ! this.getDom() && this.autoRender && this.render()
					},
					mesureSize: function() {
						var a = this.getDom("content");
						return e.getClientRect(a)
					},
					fitSize: function() {
						if (this.captureWheel && this.sized) return this.__size;
						this.sized = !0;
						var a = this.getDom("body");
						a.style.width = "";
						a.style.height = "";
						var b = this.mesureSize();
						if (this.captureWheel) {
							a.style.width = -( - 20 - b.width) + "px";
							var c = parseInt(this.getDom("content").style.height, 10); ! window.isNaN(c) && (b.height = c)
						} else a.style.width = b.width + "px";
						a.style.height = b.height + "px";
						this.__size = b;
						this.captureWheel && (this.getDom("content").style.overflow = "auto");
						return b
					},
					showAnchor: function(a, b) {
						this.showAnchorRect(e.getClientRect(a), b)
					},
					showAnchorRect: function(a, c, d) {
						this._doAutoRender();
						var f = e.getViewportRect();
						this._show();
						d = this.fitSize();
						var g;
						c ? (c = this.canSideLeft && a.right + d.width > f.right && a.left > d.width, f = this.canSideUp && a.top + d.height > f.bottom && a.bottom > d.height, g = c ? a.left - d.width: a.right, a = f ? a.bottom - d.height: a.top) : (c = this.canSideLeft && a.right + d.width > f.right && a.left > d.width, f = this.canSideUp && a.top + d.height > f.bottom && a.bottom > d.height, g = c ? a.right - d.width: a.left, a = f ? a.top - d.height: a.bottom);
						d = this.getDom();
						e.setViewportOffset(d, {
							left: g,
							top: a
						});
						b.removeClasses(d, k);
						d.className += " " + k[2 * (f ? 1 : 0) + (c ? 1 : 0)];
						this.editor && (d.style.zIndex = 1 * this.editor.container.style.zIndex + 10, s.editor.ui.uiUtils.getFixedLayer().style.zIndex = d.style.zIndex - 1)
					},
					showAt: function(a) {
						var b = a.left;
						a = a.top;
						this.showAnchorRect({
							left: b,
							top: a,
							right: b,
							bottom: a,
							height: 0,
							width: 0
						},
						!1, !0)
					},
					_show: function() {
						this._hidden && (this.getDom().style.display = "", this._hidden = !1, this.fireEvent("show"))
					},
					isHidden: function() {
						return this._hidden
					},
					show: function() {
						this._doAutoRender();
						this._show()
					},
					hide: function(a) { ! this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, a || this.fireEvent("hide"))
					},
					queryAutoHide: function(a) {
						return ! a || !e.contains(this.getDom(), a)
					}
				};
				a.inherits(g, c);
				b.on(document, "mousedown",
				function(a) {
					d(a, a.target || a.srcElement)
				});
				b.on(window, "scroll",
				function(a, b) {
					d(a, b)
				})
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.UIBase,
				e = s.editor.ui.ColorPicker = function(a) {
					this.initOptions(a);
					this.noColorText = this.noColorText || this.editor.getLang("clearColor");
					this.initUIBase()
				};
				e.prototype = {
					getHtmlTpl: function() {
						for (var a = this.editor,
						e = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' + this.noColorText + '</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">' + a.getLang("themeColor") + '</td> </tr><tr class="edui-colorpicker-tablefirstrow" >', d = 0; d < b.length; d++) d && 0 === d % 10 && (e += "</tr>" + (60 == d ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">' + a.getLang("standardColor") + "</td></tr>": "") + "<tr" + (60 == d ? ' class="edui-colorpicker-tablefirstrow"': "") + ">"),
						e += 70 > d ? '<td style="padding: 0 2px;"><a hidefocus title="' + b[d] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#' + b[d] + '" style="background-color:#' + b[d] + ";border:solid #ccc;" + (10 > d || 60 <= d ? "border-width:1px;": 10 <= d && 20 > d ? "border-width:1px 1px 0 1px;": "border-width:0 1px 0 1px;") + '"></a></td>': "";
						return e + "</tr></table></div>"
					},
					_onTableClick: function(a) { (a = (a.target || a.srcElement).getAttribute("data-color")) && this.fireEvent("pickcolor", a)
					},
					_onTableOver: function(a) {
						if (a = (a.target || a.srcElement).getAttribute("data-color")) this.getDom("preview").style.backgroundColor = a
					},
					_onTableOut: function() {
						this.getDom("preview").style.backgroundColor = ""
					},
					_onPickNoColor: function() {
						this.fireEvent("picknocolor")
					}
				};
				d.inherits(e, a);
				var b = "ffffff 000000 eeece1 1f497d 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 f2f2f2 7f7f7f ddd9c3 c6d9f0 dbe5f1 f2dcdb ebf1dd e5e0ec dbeef3 fdeada d8d8d8 595959 c4bd97 8db3e2 b8cce4 e5b9b7 d7e3bc ccc1d9 b7dde8 fbd5b5 bfbfbf 3f3f3f 938953 548dd4 95b3d7 d99694 c3d69b b2a2c7 92cddc fac08f a5a5a5 262626 494429 17365d 366092 953734 76923c 5f497a 31859b e36c09 7f7f7f 0c0c0c 1d1b10 0f243e 244061 632423 4f6128 3f3151 205867 974806 c00000 ff0000 ffc000 ffff00 92d050 00b050 00b0f0 0070c0 002060 7030a0 ".split(" ")
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.uiUtils,
				e = s.editor.ui.UIBase,
				b = s.editor.ui.TablePicker = function(a) {
					this.initOptions(a);
					this.initTablePicker()
				};
				b.prototype = {
					defaultNumRows: 10,
					defaultNumCols: 10,
					maxNumRows: 20,
					maxNumCols: 20,
					numRows: 10,
					numCols: 10,
					lengthOfCellSide: 22,
					initTablePicker: function() {
						this.initUIBase()
					},
					getHtmlTpl: function() {
						return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
					},
					_UIBase_render: e.prototype.render,
					render: function(a) {
						this._UIBase_render(a);
						this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col")
					},
					_track: function(a, b) {
						var e = this.getDom("overlay").style,
						d = this.lengthOfCellSide;
						e.width = a * d + "px";
						e.height = b * d + "px";
						this.getDom("label").innerHTML = a + this.editor.getLang("t_col") + " x " + b + this.editor.getLang("t_row");
						this.numCols = a;
						this.numRows = b
					},
					_onMouseOver: function(b, e) {
						var d = b.relatedTarget || b.fromElement;
						a.contains(e, d) || e === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "")
					},
					_onMouseOut: function(b, e) {
						var d = b.relatedTarget || b.toElement;
						a.contains(e, d) || e === d || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), this.getDom("overlay").style.visibility = "hidden")
					},
					_onMouseMove: function(b, e) {
						this.getDom("overlay");
						var d = a.getEventOffset(b),
						k = this.lengthOfCellSide,
						l = Math.ceil(d.left / k),
						d = Math.ceil(d.top / k);
						this._track(l, d)
					},
					_onClick: function() {
						this.fireEvent("picktable", this.numCols, this.numRows)
					}
				};
				d.inherits(b, e)
			})(); (function() {
				var d = s.editor.dom.domUtils,
				a = s.editor.ui.uiUtils,
				e = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (s.editor.browser.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"': ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"');
				s.editor.ui.Stateful = {
					alwalysHoverable: !1,
					target: null,
					Stateful_init: function() {
						this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
						this.getHtmlTpl = this.Stateful_getHtmlTpl
					},
					Stateful_getHtmlTpl: function() {
						return this._Stateful_dGetHtmlTpl().replace(/stateful/g,
						function() {
							return e
						})
					},
					Stateful_onMouseEnter: function(a, c) {
						this.target = c;
						if (!this.isDisabled() || this.alwalysHoverable) this.addState("hover"),
						this.fireEvent("over")
					},
					Stateful_onMouseLeave: function(a, c) {
						if (!this.isDisabled() || this.alwalysHoverable) this.removeState("hover"),
						this.removeState("active"),
						this.fireEvent("out")
					},
					Stateful_onMouseOver: function(b, c) {
						var e = b.relatedTarget;
						a.contains(c, e) || c === e || this.Stateful_onMouseEnter(b, c)
					},
					Stateful_onMouseOut: function(b, c) {
						var e = b.relatedTarget;
						a.contains(c, e) || c === e || this.Stateful_onMouseLeave(b, c)
					},
					Stateful_onMouseDown: function(a, c) {
						this.isDisabled() || this.addState("active")
					},
					Stateful_onMouseUp: function(a, c) {
						this.isDisabled() || this.removeState("active")
					},
					Stateful_postRender: function() {
						this.disabled && !this.hasState("disabled") && this.addState("disabled")
					},
					hasState: function(a) {
						return d.hasClass(this.getStateDom(), "edui-state-" + a)
					},
					addState: function(a) {
						this.hasState(a) || (this.getStateDom().className += " edui-state-" + a)
					},
					removeState: function(a) {
						this.hasState(a) && d.removeClasses(this.getStateDom(), ["edui-state-" + a])
					},
					getStateDom: function() {
						return this.getDom("state")
					},
					isChecked: function() {
						return this.hasState("checked")
					},
					setChecked: function(a) { ! this.isDisabled() && a ? this.addState("checked") : this.removeState("checked")
					},
					isDisabled: function() {
						return this.hasState("disabled")
					},
					setDisabled: function(a) {
						a ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), this.addState("disabled")) : this.removeState("disabled")
					}
				}
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.UIBase,
				e = s.editor.ui.Stateful,
				b = s.editor.ui.Button = function(a) {
					this.initOptions(a);
					this.initButton()
				};
				b.prototype = {
					uiName: "button",
					label: "",
					title: "",
					showIcon: !0,
					showText: !0,
					initButton: function() {
						this.initUIBase();
						this.Stateful_init()
					},
					getHtmlTpl: function() {
						return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"': "") + ' class="%%-body" onmousedown="return false;" onclick="return $$._onClick();">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>': "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>": "") + "</div></div></div></div>"
					},
					postRender: function() {
						this.Stateful_postRender();
						this.setDisabled(this.disabled)
					},
					_onClick: function() {
						this.isDisabled() || this.fireEvent("click")
					}
				};
				d.inherits(b, a);
				d.extend(b.prototype, e)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.uiUtils,
				e = s.editor.ui.UIBase,
				b = s.editor.ui.Stateful,
				c = s.editor.ui.SplitButton = function(a) {
					this.initOptions(a);
					this.initSplitButton()
				};
				c.prototype = {
					popup: null,
					uiName: "splitbutton",
					title: "",
					initSplitButton: function() {
						this.initUIBase();
						this.Stateful_init();
						if (null != this.popup) {
							var a = this.popup;
							this.popup = null;
							this.setPopup(a)
						}
					},
					_UIBase_postRender: e.prototype.postRender,
					postRender: function() {
						this.Stateful_postRender();
						this._UIBase_postRender()
					},
					setPopup: function(b) {
						this.popup !== b && (null != this.popup && this.popup.dispose(), b.addListener("show", d.bind(this._onPopupShow, this)), b.addListener("hide", d.bind(this._onPopupHide, this)), b.addListener("postrender", d.bind(function() {
							b.getDom("body").appendChild(a.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (a.getClientRect(this.getDom()).width + 20) + 'px"></div>'));
							b.getDom().className += " " + this.className
						},
						this)), this.popup = b)
					},
					_onPopupShow: function() {
						this.addState("opened")
					},
					_onPopupHide: function() {
						this.removeState("opened")
					},
					getHtmlTpl: function() {
						return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'title="' + this.title + '"': "") + ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
					},
					showPopup: function() {
						var b = a.getClientRect(this.getDom());
						b.top -= this.popup.SHADOW_RADIUS;
						b.height += this.popup.SHADOW_RADIUS;
						this.popup.showAnchorRect(b)
					},
					_onArrowClick: function(a, b) {
						this.isDisabled() || this.showPopup()
					},
					_onButtonClick: function() {
						this.isDisabled() || this.fireEvent("buttonclick")
					}
				};
				d.inherits(c, e);
				d.extend(c.prototype, b, !0)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.uiUtils,
				e = s.editor.ui.ColorPicker,
				b = s.editor.ui.Popup,
				c = s.editor.ui.SplitButton,
				g = s.editor.ui.ColorButton = function(a) {
					this.initOptions(a);
					this.initColorButton()
				};
				g.prototype = {
					initColorButton: function() {
						var a = this;
						this.popup = new b({
							content: new e({
								noColorText: a.editor.getLang("clearColor"),
								editor: a.editor,
								onpickcolor: function(b, c) {
									a._onPickColor(c)
								},
								onpicknocolor: function(b, c) {
									a._onPickNoColor(c)
								}
							}),
							editor: a.editor
						});
						this.initSplitButton()
					},
					_SplitButton_postRender: c.prototype.postRender,
					postRender: function() {
						this._SplitButton_postRender();
						this.getDom("button_body").appendChild(a.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>'));
						this.getDom().className += " edui-colorbutton"
					},
					setColor: function(a) {
						this.color = this.getDom("colorlump").style.backgroundColor = a
					},
					_onPickColor: function(a) { ! 1 !== this.fireEvent("pickcolor", a) && (this.setColor(a), this.popup.hide())
					},
					_onPickNoColor: function(a) { ! 1 !== this.fireEvent("picknocolor") && this.popup.hide()
					}
				};
				d.inherits(g, c)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.Popup,
				e = s.editor.ui.TablePicker,
				b = s.editor.ui.SplitButton,
				c = s.editor.ui.TableButton = function(a) {
					this.initOptions(a);
					this.initTableButton()
				};
				c.prototype = {
					initTableButton: function() {
						var b = this;
						this.popup = new a({
							content: new e({
								editor: b.editor,
								onpicktable: function(a, c, d) {
									b._onPickTable(c, d)
								}
							}),
							editor: b.editor
						});
						this.initSplitButton()
					},
					_onPickTable: function(a, b) { ! 1 !== this.fireEvent("picktable", a, b) && this.popup.hide()
					}
				};
				d.inherits(c, b)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.UIBase,
				e = s.editor.ui.AutoTypeSetPicker = function(a) {
					this.initOptions(a);
					this.initAutoTypeSetPicker()
				};
				e.prototype = {
					initAutoTypeSetPicker: function() {
						this.initUIBase()
					},
					getHtmlTpl: function() {
						var a = this.editor,
						c = a.options.autotypeset,
						d = a.getLang("autoTypeSet"),
						e = "textAlignValue" + a.uid,
						k = "imageBlockLineValue" + a.uid;
						return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap colspan="2"><input type="checkbox" name="mergeEmptyline" ' + (c.mergeEmptyline ? "checked": "") + ">" + d.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (c.removeEmptyline ? "checked": "") + ">" + d.delLine + '</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="removeClass" ' + (c.removeClass ? "checked": "") + ">" + d.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (c.indent ? "checked": "") + ">" + d.indent + '</td></tr><tr><td nowrap colspan="2"><input type="checkbox" name="textAlign" ' + (c.textAlign ? "checked": "") + ">" + d.alignment + '</td><td colspan="2" id="' + e + '"><input type="radio" name="' + e + '" value="left" ' + (c.textAlign && "left" == c.textAlign ? "checked": "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + e + '" value="center" ' + (c.textAlign && "center" == c.textAlign ? "checked": "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + e + '" value="right" ' + (c.textAlign && "right" == c.textAlign ? "checked": "") + ">" + a.getLang("justifyright") + ' </tr><tr><td nowrap colspan="2"><input type="checkbox" name="imageBlockLine" ' + (c.imageBlockLine ? "checked": "") + ">" + d.imageFloat + '</td><td nowrap colspan="2" id="' + k + '"><input type="radio" name="' + k + '" value="none" ' + (c.imageBlockLine && "none" == c.imageBlockLine ? "checked": "") + ">" + a.getLang("default") + '<input type="radio" name="' + k + '" value="left" ' + (c.imageBlockLine && "left" == c.imageBlockLine ? "checked": "") + ">" + a.getLang("justifyleft") + '<input type="radio" name="' + k + '" value="center" ' + (c.imageBlockLine && "center" == c.imageBlockLine ? "checked": "") + ">" + a.getLang("justifycenter") + '<input type="radio" name="' + k + '" value="right" ' + (c.imageBlockLine && "right" == c.imageBlockLine ? "checked": "") + ">" + a.getLang("justifyright") + '</tr><tr><td nowrap colspan="2"><input type="checkbox" name="clearFontSize" ' + (c.clearFontSize ? "checked": "") + ">" + d.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (c.clearFontFamily ? "checked": "") + ">" + d.removeFontFamily + '</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="removeEmptyNode" ' + (c.removeEmptyNode ? "checked": "") + ">" + d.removeHtml + '</td></tr><tr><td nowrap colspan="4"><input type="checkbox" name="pasteFilter" ' + (c.pasteFilter ? "checked": "") + ">" + d.pasteFilter + '</td></tr><tr><td nowrap colspan="4" align="right"><button >' + d.run + "</button></td></tr></table></div></div>"
					},
					_UIBase_render: a.prototype.render
				};
				d.inherits(e, a)
			})(); (function() {
				function h(a) {
					for (var b = a.editor.options.autotypeset,
					c = a.getDom(), e = a.editor.uid, g = null, g = null, h = d.getElementsByTagName(c, "input"), t = h.length - 1, p; p = h[t--];) if (g = p.getAttribute("type"), "checkbox" == g && (g = p.getAttribute("name"), b[g] && delete b[g], p.checked)) if (p = document.getElementById(g + "Value" + e)) if (/input/ig.test(p.tagName)) b[g] = p.value;
					else {
						p = p.getElementsByTagName("input");
						for (var q = p.length - 1,
						u; u = p[q--];) if (u.checked) {
							b[g] = u.value;
							break
						}
					} else b[g] = !0;
					c = d.getElementsByTagName(c, "select");
					for (t = 0; e = c[t++];) h = e.getAttribute("name"),
					b[h] = b[h] ? e.value: "";
					a.editor.options.autotypeset = b
				}
				var a = s.editor.utils,
				e = s.editor.ui.Popup,
				b = s.editor.ui.AutoTypeSetPicker,
				c = s.editor.ui.SplitButton,
				g = s.editor.ui.AutoTypeSetButton = function(a) {
					this.initOptions(a);
					this.initAutoTypeSetButton()
				};
				g.prototype = {
					initAutoTypeSetButton: function() {
						var a = this;
						this.popup = new e({
							content: new b({
								editor: a.editor
							}),
							editor: a.editor,
							hide: function() { ! this._hidden && this.getDom() && (h(this), this.getDom().style.display = "none", this._hidden = !0, this.fireEvent("hide"))
							}
						});
						var c = 0;
						this.popup.addListener("postRenderAfter",
						function() {
							var b = this;
							c || (this.getDom().getElementsByTagName("button")[0].onclick = function() {
								h(b);
								a.editor.execCommand("autotypeset");
								b.hide()
							},
							c = 1)
						});
						this.initSplitButton()
					}
				};
				a.inherits(g, c)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.Popup,
				e = s.editor.ui.Stateful,
				b = s.editor.ui.UIBase,
				c = s.editor.ui.CellAlignPicker = function(a) {
					this.initOptions(a);
					this.initSelected();
					this.initCellAlignPicker()
				};
				c.prototype = {
					initSelected: function() {
						var a = {
							top: 0,
							middle: 1,
							bottom: 2
						},
						b = {
							left: 0,
							center: 1,
							right: 2
						};
						this.selected && (this.selectedIndex = 3 * a[this.selected.valign] + b[this.selected.align])
					},
					initCellAlignPicker: function() {
						this.initUIBase();
						this.Stateful_init()
					},
					getHtmlTpl: function() {
						for (var a = ["left", "center", "right"], b = null, c = -1, d = [], e = 0; 9 > e; e++) b = this.selectedIndex === e ? ' class="edui-cellalign-selected" ': "",
						c = e % 3,
						0 === c && d.push("<tr>"),
						d.push('<td index="' + e + '" ' + b + ' stateful><div class="edui-icon edui-' + a[c] + '"></div></td>'),
						2 === c && d.push("</tr>");
						return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + d.join("") + "</table></div></div>"
					},
					getStateDom: function() {
						return this.target
					},
					_onClick: function(b) {
						var c = b.target || b.srcElement;
						/icon/.test(c.className) && (this.items[c.parentNode.getAttribute("index")].onclick(), a.postHide(b))
					},
					_UIBase_render: b.prototype.render
				};
				d.inherits(c, b);
				d.extend(c.prototype, e, !0)
			})(); (function() {
				var h = s.editor.utils,
				a = s.editor.ui.Stateful,
				e = s.editor.ui.uiUtils,
				b = s.editor.ui.UIBase,
				c = s.editor.ui.PastePicker = function(a) {
					this.initOptions(a);
					this.initPastePicker()
				};
				c.prototype = {
					initPastePicker: function() {
						this.initUIBase();
						this.Stateful_init()
					},
					getHtmlTpl: function() {
						return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div><div class="edui-button"><div title="' + this.editor.getLang("pasteSourceFormat") + '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'
					},
					getStateDom: function() {
						return this.target
					},
					format: function(a) {
						this.editor.ui._isTransfer = !0;
						this.editor.fireEvent("pasteTransfer", a)
					},
					_onClick: function(a) {
						var b = d.getNextDomNode(a),
						c = e.getViewportRect().height,
						l = e.getClientRect(b);
						b.style.top = l.top + l.height > c ? -l.height - a.offsetHeight + "px": "";
						/hidden/ig.test(d.getComputedStyle(b, "visibility")) ? (b.style.visibility = "visible", d.addClass(a, "edui-state-opened")) : (b.style.visibility = "hidden", d.removeClasses(a, "edui-state-opened"))
					},
					_UIBase_render: b.prototype.render
				};
				h.inherits(c, b);
				h.extend(c.prototype, a, !0)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.uiUtils,
				e = s.editor.ui.UIBase,
				b = s.editor.ui.Toolbar = function(a) {
					this.initOptions(a);
					this.initToolbar()
				};
				b.prototype = {
					items: null,
					initToolbar: function() {
						this.items = this.items || [];
						this.initUIBase()
					},
					add: function(a) {
						this.items.push(a)
					},
					getHtmlTpl: function() {
						for (var a = [], b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
						return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + a.join("") + "</div>"
					},
					postRender: function() {
						for (var b = this.getDom(), d = 0; d < this.items.length; d++) this.items[d].postRender();
						a.makeUnselectable(b)
					},
					_onMouseDown: function() {
						return ! 1
					}
				};
				d.inherits(b, e)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.dom.domUtils,
				e = s.editor.ui.uiUtils,
				b = s.editor.ui.UIBase,
				c = s.editor.ui.Popup,
				g = s.editor.ui.Stateful,
				f = s.editor.ui.CellAlignPicker,
				k = s.editor.ui.Menu = function(a) {
					this.initOptions(a);
					this.initMenu()
				},
				l = {
					renderHtml: function() {
						return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
					},
					postRender: function() {},
					queryAutoHide: function() {
						return ! 0
					}
				};
				k.prototype = {
					items: null,
					uiName: "menu",
					initMenu: function() {
						this.items = this.items || [];
						this.initPopup();
						this.initItems()
					},
					initItems: function() {
						for (var a = 0; a < this.items.length; a++) {
							var b = this.items[a];
							"-" == b ? this.items[a] = this.getSeparator() : b instanceof m || (b.editor = this.editor, b.theme = this.editor.options.theme, this.items[a] = this.createItem(b))
						}
					},
					getSeparator: function() {
						return l
					},
					createItem: function(a) {
						a.menu = this;
						return new m(a)
					},
					_Popup_getContentHtmlTpl: c.prototype.getContentHtmlTpl,
					getContentHtmlTpl: function() {
						if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
						for (var a = [], b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
						return '<div class="%%-body">' + a.join("") + "</div>"
					},
					_Popup_postRender: c.prototype.postRender,
					postRender: function() {
						for (var b = this,
						c = 0; c < this.items.length; c++) {
							var d = this.items[c];
							d.ownerMenu = this;
							d.postRender()
						}
						a.on(this.getDom(), "mouseover",
						function(a) {
							a = a || event;
							a = a.relatedTarget || a.fromElement;
							var c = b.getDom();
							e.contains(c, a) || c === a || b.fireEvent("over")
						});
						this._Popup_postRender()
					},
					queryAutoHide: function(a) {
						if (a) {
							if (e.contains(this.getDom(), a)) return ! 1;
							for (var b = 0; b < this.items.length; b++) if (!1 === this.items[b].queryAutoHide(a)) return ! 1
						}
					},
					clearItems: function() {
						for (var a = 0; a < this.items.length; a++) {
							var b = this.items[a];
							clearTimeout(b._showingTimer);
							clearTimeout(b._closingTimer);
							b.subMenu && b.subMenu.destroy()
						}
						this.items = []
					},
					destroy: function() {
						this.getDom() && a.remove(this.getDom());
						this.clearItems()
					},
					dispose: function() {
						this.destroy()
					}
				};
				d.inherits(k, c);
				var m = s.editor.ui.MenuItem = function(b) {
					this.initOptions(b);
					this.initUIBase();
					this.Stateful_init();
					if (this.subMenu && !(this.subMenu instanceof k)) if (b.className && -1 != b.className.indexOf("aligntd")) {
						var d = this;
						this.subMenu.selected = this.editor.queryCommandValue("cellalignment");
						this.subMenu = new c({
							content: new f(this.subMenu),
							parentMenu: d,
							editor: d.editor,
							destroy: function() {
								this.getDom() && a.remove(this.getDom())
							}
						});
						this.subMenu.addListener("postRenderAfter",
						function() {
							a.on(this.getDom(), "mouseover",
							function() {
								d.addState("opened")
							})
						})
					} else this.subMenu = new k(this.subMenu)
				};
				m.prototype = {
					label: "",
					subMenu: null,
					ownerMenu: null,
					uiName: "menuitem",
					alwalysHoverable: !0,
					getHtmlTpl: function() {
						return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>"
					},
					postRender: function() {
						var a = this;
						this.addListener("over",
						function() {
							a.ownerMenu.fireEvent("submenuover", a);
							a.subMenu && a.delayShowSubMenu()
						});
						this.subMenu && (this.getDom().className += " edui-hassubmenu", this.subMenu.render(), this.addListener("out",
						function() {
							a.delayHideSubMenu()
						}), this.subMenu.addListener("over",
						function() {
							clearTimeout(a._closingTimer);
							a._closingTimer = null;
							a.addState("opened")
						}), this.ownerMenu.addListener("hide",
						function() {
							a.hideSubMenu()
						}), this.ownerMenu.addListener("submenuover",
						function(b, c) {
							c !== a && a.delayHideSubMenu()
						}), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function(b) {
							return b && e.contains(a.getDom(), b) ? !1 : this._bakQueryAutoHide(b)
						});
						this.getDom().style.tabIndex = "-1";
						e.makeUnselectable(this.getDom());
						this.Stateful_postRender()
					},
					delayShowSubMenu: function() {
						var a = this;
						a.isDisabled() || (a.addState("opened"), clearTimeout(a._showingTimer), clearTimeout(a._closingTimer), a._closingTimer = null, a._showingTimer = setTimeout(function() {
							a.showSubMenu()
						},
						250))
					},
					delayHideSubMenu: function() {
						var a = this;
						a.isDisabled() || (a.removeState("opened"), clearTimeout(a._showingTimer), a._closingTimer || (a._closingTimer = setTimeout(function() {
							a.hasState("opened") || a.hideSubMenu();
							a._closingTimer = null
						},
						400)))
					},
					renderLabelHtml: function() {
						return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>"
					},
					getStateDom: function() {
						return this.getDom()
					},
					queryAutoHide: function(a) {
						if (this.subMenu && this.hasState("opened")) return this.subMenu.queryAutoHide(a)
					},
					_onClick: function(a, b) {
						this.hasState("disabled") || !1 !== this.fireEvent("click", a, b) && (this.subMenu ? this.showSubMenu() : c.postHide(a))
					},
					showSubMenu: function() {
						var a = e.getClientRect(this.getDom());
						a.right -= 5;
						a.left += 2;
						a.width -= 7;
						a.top -= 4;
						a.bottom += 4;
						a.height += 8;
						this.subMenu.showAnchorRect(a, !0, !0)
					},
					hideSubMenu: function() {
						this.subMenu.hide()
					}
				};
				d.inherits(m, b);
				d.extend(m.prototype, g, !0)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.uiUtils,
				e = s.editor.ui.Menu,
				b = s.editor.ui.SplitButton,
				c = s.editor.ui.Combox = function(a) {
					this.initOptions(a);
					this.initCombox()
				};
				c.prototype = {
					uiName: "combox",
					initCombox: function() {
						var a = this;
						this.items = this.items || [];
						for (var b = 0; b < this.items.length; b++) {
							var c = this.items[b];
							c.uiName = "listitem";
							c.index = b;
							c.onclick = function() {
								a.selectByIndex(this.index)
							}
						}
						this.popup = new e({
							items: this.items,
							uiName: "list",
							editor: this.editor,
							captureWheel: !0,
							combox: this
						});
						this.initSplitButton()
					},
					_SplitButton_postRender: b.prototype.postRender,
					postRender: function() {
						this._SplitButton_postRender();
						this.setLabel(this.label || "");
						this.setValue(this.initValue || "")
					},
					showPopup: function() {
						var b = a.getClientRect(this.getDom());
						b.top += 1;
						b.bottom -= 1;
						b.height -= 2;
						this.popup.showAnchorRect(b)
					},
					getValue: function() {
						return this.value
					},
					setValue: function(a) {
						var b = this.indexByValue(a); - 1 != b ? (this.selectedIndex = b, this.setLabel(this.items[b].label), this.value = this.items[b].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(a)), this.value = a)
					},
					setLabel: function(a) {
						this.label = this.getDom("button_body").innerHTML = a
					},
					getLabelForUnknowValue: function(a) {
						return a
					},
					indexByValue: function(a) {
						for (var b = 0; b < this.items.length; b++) if (a == this.items[b].value) return b;
						return - 1
					},
					getItem: function(a) {
						return this.items[a]
					},
					selectByIndex: function(a) {
						a < this.items.length && !1 !== this.fireEvent("select", a) && (this.selectedIndex = a, this.value = this.items[a].value, this.setLabel(this.items[a].label))
					}
				};
				d.inherits(c, b)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.dom.domUtils,
				e = s.editor.ui.uiUtils,
				b = s.editor.ui.Mask,
				c = s.editor.ui.UIBase,
				g = s.editor.ui.Button,
				f = s.editor.ui.Dialog = function(a) {
					this.initOptions(d.extend({
						autoReset: !0,
						draggable: !0,
						onok: function() {},
						oncancel: function() {},
						onclose: function(a, b) {
							return b ? this.onok() : this.oncancel()
						},
						holdScroll: !1
					},
					a));
					this.initDialog()
				},
				k,
				l;
				f.prototype = {
					draggable: !1,
					uiName: "dialog",
					initDialog: function() {
						var a = this,
						c = this.editor.options.theme;
						this.initUIBase();
						this.modalMask = k || (k = new b({
							className: "edui-dialog-modalmask",
							theme: c
						}));
						this.dragMask = l || (l = new b({
							className: "edui-dialog-dragmask",
							theme: c
						}));
						this.closeButton = new g({
							className: "edui-dialog-closebutton",
							title: a.closeDialog,
							theme: c,
							onclick: function() {
								a.close(!1)
							}
						});
						this.fullscreen && this.initResizeEvent();
						if (this.buttons) for (c = 0; c < this.buttons.length; c++) this.buttons[c] instanceof g || (this.buttons[c] = new g(this.buttons[c]))
					},
					initResizeEvent: function() {
						var b = this;
						a.on(window, "resize",
						function() {
							b._hidden || void 0 === b._hidden || (b.__resizeTimer && window.clearTimeout(b.__resizeTimer), b.__resizeTimer = window.setTimeout(function() {
								b.__resizeTimer = null;
								var a = b.getDom(),
								c = b.getDom("content"),
								d = UE.ui.uiUtils.getClientRect(a),
								f = UE.ui.uiUtils.getClientRect(c),
								l = e.getViewportRect();
								c.style.width = l.width - d.width + f.width + "px";
								c.style.height = l.height - d.height + f.height + "px";
								a.style.width = l.width + "px";
								a.style.height = l.height + "px";
								b.fireEvent("resize")
							},
							100))
						})
					},
					fitSize: function() {
						var a = this.getDom("body"),
						b = this.mesureSize();
						a.style.width = b.width + "px";
						a.style.height = b.height + "px";
						return b
					},
					safeSetOffset: function(a) {
						var b = this.getDom(),
						c = e.getViewportRect(),
						d = e.getClientRect(b),
						f = a.left;
						f + d.width > c.right && (f = c.right - d.width);
						a = a.top;
						a + d.height > c.bottom && (a = c.bottom - d.height);
						b.style.left = Math.max(f, 0) + "px";
						b.style.top = Math.max(a, 0) + "px"
					},
					showAtCenter: function() {
						var b = e.getViewportRect();
						if (this.fullscreen) {
							var c = this.getDom(),
							d = this.getDom("content");
							c.style.display = "block";
							var f = UE.ui.uiUtils.getClientRect(c),
							l = UE.ui.uiUtils.getClientRect(d);
							c.style.left = "-100000px";
							d.style.width = b.width - f.width + l.width + "px";
							d.style.height = b.height - f.height + l.height + "px";
							c.style.width = b.width + "px";
							c.style.height = b.height + "px";
							c.style.left = 0;
							this._originalContext = {
								html: {
									overflowX: document.documentElement.style.overflowX,
									overflowY: document.documentElement.style.overflowY
								},
								body: {
									overflowX: document.body.style.overflowX,
									overflowY: document.body.style.overflowY
								}
							};
							document.documentElement.style.overflowX = "hidden";
							document.documentElement.style.overflowY = "hidden";
							document.body.style.overflowX = "hidden";
							document.body.style.overflowY = "hidden"
						} else this.getDom().style.display = "",
						d = this.fitSize(),
						f = this.getDom("titlebar").offsetHeight | 0,
						c = b.width / 2 - d.width / 2,
						b = b.height / 2 - (d.height - f) / 2 - f,
						d = this.getDom(),
						this.safeSetOffset({
							left: Math.max(c | 0, 0),
							top: Math.max(b | 0, 0)
						}),
						a.hasClass(d, "edui-state-centered") || (d.className += " edui-state-centered");
						this._show()
					},
					getContentHtml: function() {
						var a = "";
						"string" == typeof this.content ? a = this.content: this.iframeUrl && (a = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>');
						return a
					},
					getHtmlTpl: function() {
						var a = "";
						if (this.buttons) {
							for (var a = [], b = 0; b < this.buttons.length; b++) a[b] = this.buttons[b].renderHtml();
							a = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + a.join("") + "</div></div>"
						}
						return '<div id="##" class="%%"><div ' + (this.fullscreen ? 'class="%%-wrap edui-dialog-fullscreen-flag"': 'class="%%"') + '><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || "") + "</span></div>" + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? "": this.getContentHtml()) + "</div>" + a + "</div></div></div>"
					},
					postRender: function() {
						this.modalMask.getDom() || (this.modalMask.render(), this.modalMask.hide());
						this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide());
						var b = this;
						this.addListener("show",
						function() {
							b.modalMask.show(this.getDom().style.zIndex - 2)
						});
						this.addListener("hide",
						function() {
							b.modalMask.hide()
						});
						if (this.buttons) for (var c = 0; c < this.buttons.length; c++) this.buttons[c].postRender();
						a.on(window, "resize",
						function() {
							setTimeout(function() {
								b.isHidden() || b.safeSetOffset(e.getClientRect(b.getDom()))
							})
						});
						if (this.holdScroll) if (b.iframeUrl) b.addListener("dialogafterreset",
						function() {
							window.setTimeout(function() {
								var c = document.getElementById(b.id + "_iframe").contentWindow;
								if (q.ie) var d = window.setInterval(function() {
									c.document && c.document.body && (window.clearInterval(d), d = null, a.on(c.document.body, q.gecko ? "DOMMouseScroll": "mousewheel",
									function(b) {
										a.preventDefault(b)
									}))
								},
								100);
								else a.on(c, q.gecko ? "DOMMouseScroll": "mousewheel",
								function(b) {
									a.preventDefault(b)
								})
							},
							1)
						});
						else a.on(document.getElementById(b.id + "_iframe"), q.gecko ? "DOMMouseScroll": "mousewheel",
						function(b) {
							a.preventDefault(b)
						});
						this._hide()
					},
					mesureSize: function() {
						var a = this.getDom("body"),
						b = e.getClientRect(this.getDom("content")).width;
						a.style.width = b;
						return e.getClientRect(a)
					},
					_onTitlebarMouseDown: function(b, c) {
						if (this.draggable) {
							var d;
							e.getViewportRect();
							var f = this;
							e.startDrag(b, {
								ondragstart: function() {
									d = e.getClientRect(f.getDom());
									f.getDom("contmask").style.visibility = "visible";
									f.dragMask.show(f.getDom().style.zIndex - 1)
								},
								ondragmove: function(a, b) {
									f.safeSetOffset({
										left: d.left + a,
										top: d.top + b
									})
								},
								ondragstop: function() {
									f.getDom("contmask").style.visibility = "hidden";
									a.removeClasses(f.getDom(), ["edui-state-centered"]);
									f.dragMask.hide()
								}
							})
						}
					},
					reset: function() {
						this.getDom("content").innerHTML = this.getContentHtml();
						this.fireEvent("dialogafterreset")
					},
					_show: function() {
						this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent("show"), s.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4)
					},
					isHidden: function() {
						return this._hidden
					},
					_hide: function() {
						if (!this._hidden) {
							var a = this.getDom();
							a.style.display = "none";
							a.style.zIndex = "";
							a.style.width = "";
							a.style.height = "";
							this._hidden = !0;
							this.fireEvent("hide")
						}
					},
					open: function() {
						if (this.autoReset) try {
							this.reset()
						} catch(a) {
							this.render(),
							this.open()
						}
						this.showAtCenter();
						if (this.iframeUrl) try {
							this.getDom("iframe").focus()
						} catch(b) {}
					},
					_onCloseButtonClick: function(a, b) {
						this.close(!1)
					},
					close: function(a) { ! 1 !== this.fireEvent("close", a) && (this.fullscreen && (document.documentElement.style.overflowX = this._originalContext.html.overflowX, document.documentElement.style.overflowY = this._originalContext.html.overflowY, document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, delete this._originalContext), this._hide())
					}
				};
				d.inherits(f, c)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.Menu,
				e = s.editor.ui.SplitButton,
				b = s.editor.ui.MenuButton = function(a) {
					this.initOptions(a);
					this.initMenuButton()
				};
				b.prototype = {
					initMenuButton: function() {
						var b = this;
						this.uiName = "menubutton";
						this.popup = new a({
							items: b.items,
							className: b.className,
							editor: b.editor
						});
						this.popup.addListener("show",
						function() {
							for (var a = 0; a < this.items.length; a++) this.items[a].removeState("checked"),
							this.items[a].value == b._value && (this.items[a].addState("checked"), this.value = b._value)
						});
						this.initSplitButton()
					},
					setValue: function(a) {
						this._value = a
					}
				};
				d.inherits(b, e)
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui,
				e = a.Dialog;
				a.buttons = {};
				a.Dialog = function(a) {
					var b = new e(a);
					b.addListener("hide",
					function() {
						if (b.editor) {
							var a = b.editor;
							try {
								if (q.gecko) {
									var c = a.window.scrollY,
									d = a.window.scrollX;
									a.body.focus();
									a.window.scrollTo(d, c)
								} else a.focus()
							} catch(e) {}
						}
					});
					return b
				};
				for (var b = {
					anchor: "~/dialogs/anchor/anchor.html",
					insertimage: "~/dialogs/image/image.html",
					link: "~/dialogs/link/link.html",
					spechars: "~/dialogs/spechars/spechars.html",
					searchreplace: "~/dialogs/searchreplace/searchreplace.html",
					map: "~/dialogs/map/map.html",
					gmap: "~/dialogs/gmap/gmap.html",
					insertvideo: "~/dialogs/video/video.html",
					help: "~/dialogs/help/help.html",
					preview: "~/dialogs/preview/preview.html",
					emotion: "~/dialogs/emotion/emotion.html",
					wordimage: "~/dialogs/wordimage/wordimage.html",
					attachment: "~/dialogs/attachment/attachment.html",
					insertframe: "~/dialogs/insertframe/insertframe.html",
					edittip: "~/dialogs/table/edittip.html",
					edittable: "~/dialogs/table/edittable.html",
					edittd: "~/dialogs/table/edittd.html",
					webapp: "~/dialogs/webapp/webapp.html",
					snapscreen: "~/dialogs/snapscreen/snapscreen.html",
					scrawl: "~/dialogs/scrawl/scrawl.html",
					music: "~/dialogs/music/music.html",
					template: "~/dialogs/template/template.html",
					background: "~/dialogs/background/background.html",
					charts: "~/dialogs/charts/charts.html"
				},
				c = "undo redo formatmatch bold italic underline fontborder touppercase tolowercase strikethrough subscript superscript source indent outdent blockquote pasteplain pagebreak selectall print horizontal removeformat time date unlink insertparagraphbeforetable insertrow insertcol mergeright mergedown deleterow deletecol splittorows splittocols splittocells mergecells deletetable drafts".split(" "), g = 0, f; f = c[g++];) f = f.toLowerCase(),
				a[f] = function(b) {
					return function(c) {
						var d = new a.Button({
							className: "edui-for-" + b,
							title: c.options.labelMap[b] || c.getLang("labelMap." + b) || "",
							onclick: function() {
								c.execCommand(b)
							},
							theme: c.options.theme,
							showText: !1
						});
						a.buttons[b] = d;
						c.addListener("selectionchange",
						function(a, e, f) {
							a = c.queryCommandState(b); - 1 == a ? (d.setDisabled(!0), d.setChecked(!1)) : f || (d.setDisabled(!1), d.setChecked(a))
						});
						return d
					}
				} (f);
				a.cleardoc = function(b) {
					var c = new a.Button({
						className: "edui-for-cleardoc",
						title: b.options.labelMap.cleardoc || b.getLang("labelMap.cleardoc") || "",
						theme: b.options.theme,
						onclick: function() {
							confirm(b.getLang("confirmClear")) && b.execCommand("cleardoc")
						}
					});
					a.buttons.cleardoc = c;
					b.addListener("selectionchange",
					function() {
						c.setDisabled( - 1 == b.queryCommandState("cleardoc"))
					});
					return c
				};
				var c = {
					justify: ["left", "right", "center", "justify"],
					imagefloat: ["none", "left", "center", "right"],
					directionality: ["ltr", "rtl"]
				},
				k;
				for (k in c)(function(b, c) {
					for (var d = 0,
					e; e = c[d++];)(function(c) {
						a[b.replace("float", "") + c] = function(d) {
							var e = new a.Button({
								className: "edui-for-" + b.replace("float", "") + c,
								title: d.options.labelMap[b.replace("float", "") + c] || d.getLang("labelMap." + b.replace("float", "") + c) || "",
								theme: d.options.theme,
								onclick: function() {
									d.execCommand(b, c)
								}
							});
							a.buttons[b] = e;
							d.addListener("selectionchange",
							function(a, f, g) {
								e.setDisabled( - 1 == d.queryCommandState(b));
								e.setChecked(d.queryCommandValue(b) == c && !g)
							});
							return e
						}
					})(e)
				})(k, c[k]);
				for (g = 0; f = ["backcolor", "forecolor"][g++];) a[f] = function(b) {
					return function(c) {
						var d = new a.ColorButton({
							className: "edui-for-" + b,
							color: "default",
							title: c.options.labelMap[b] || c.getLang("labelMap." + b) || "",
							editor: c,
							onpickcolor: function(a, d) {
								c.execCommand(b, d)
							},
							onpicknocolor: function() {
								c.execCommand(b, "default");
								this.setColor("transparent");
								this.color = "default"
							},
							onbuttonclick: function() {
								c.execCommand(b, this.color)
							}
						});
						a.buttons[b] = d;
						c.addListener("selectionchange",
						function() {
							d.setDisabled( - 1 == c.queryCommandState(b))
						});
						return d
					}
				} (f);
				c = {
					noOk: ["searchreplace", "help", "spechars", "webapp", "preview"],
					ok: "attachment anchor link insertimage map gmap insertframe wordimage insertvideo insertframe edittip edittable edittd scrawl template music background charts".split(" ")
				};
				for (k in c)(function(c, e) {
					for (var f = 0,
					g; g = e[f++];) q.opera && "searchreplace" === g ||
					function(e) {
						a[e] = function(f, g, k) {
							g = g || (f.options.iframeUrlMap || {})[e] || b[e];
							k = f.options.labelMap[e] || f.getLang("labelMap." + e) || "";
							var n;
							g && (n = new a.Dialog(d.extend({
								iframeUrl: f.ui.mapUrl(g),
								editor: f,
								className: "edui-for-" + e,
								title: k,
								holdScroll: "insertimage" === e,
								fullscreen: /charts|preview/.test(e),
								closeDialog: f.getLang("closeDialog")
							},
							"ok" == c ? {
								buttons: [{
									className: "edui-okbutton",
									label: f.getLang("ok"),
									editor: f,
									onclick: function() {
										n.close(!0)
									}
								},
								{
									className: "edui-cancelbutton",
									label: f.getLang("cancel"),
									editor: f,
									onclick: function() {
										n.close(!1)
									}
								}]
							}: {})), f.ui._dialogs[e + "Dialog"] = n);
							var m = new a.Button({
								className: "edui-for-" + e,
								title: k,
								onclick: function() {
									if (n) switch (e) {
									case "wordimage":
										var a = f.execCommand("wordimage");
										a && a.length && (n.render(), n.open());
										break;
									case "scrawl":
										-1 != f.queryCommandState("scrawl") && (n.render(), n.open());
										break;
									default:
										n.render(),
										n.open()
									}
								},
								theme: f.options.theme,
								disabled: "scrawl" == e && -1 == f.queryCommandState("scrawl") || "charts" == e
							});
							a.buttons[e] = m;
							f.addListener("selectionchange",
							function() {
								if (! (e in {
									edittable: 1
								})) {
									var a = f.queryCommandState(e);
									m.getDom() && (m.setDisabled( - 1 == a), m.setChecked(a))
								}
							});
							return m
						}
					} (g.toLowerCase())
				})(k, c[k]);
				a.snapscreen = function(c, d, e) {
					e = c.options.labelMap.snapscreen || c.getLang("labelMap.snapscreen") || "";
					var f = new a.Button({
						className: "edui-for-snapscreen",
						title: e,
						onclick: function() {
							c.execCommand("snapscreen")
						},
						theme: c.options.theme
					});
					a.buttons.snapscreen = f;
					if (d = d || (c.options.iframeUrlMap || {}).snapscreen || b.snapscreen) {
						var g = new a.Dialog({
							iframeUrl: c.ui.mapUrl(d),
							editor: c,
							className: "edui-for-snapscreen",
							title: e,
							buttons: [{
								className: "edui-okbutton",
								label: c.getLang("ok"),
								editor: c,
								onclick: function() {
									g.close(!0)
								}
							},
							{
								className: "edui-cancelbutton",
								label: c.getLang("cancel"),
								editor: c,
								onclick: function() {
									g.close(!1)
								}
							}]
						});
						g.render();
						c.ui._dialogs.snapscreenDialog = g
					}
					c.addListener("selectionchange",
					function() {
						f.setDisabled( - 1 == c.queryCommandState("snapscreen"))
					});
					return f
				};
				a.insertcode = function(b, c, e) {
					c = b.options.insertcode || [];
					e = b.options.labelMap.insertcode || b.getLang("labelMap.insertcode") || "";
					var f = [];
					d.each(c,
					function(a, c) {
						f.push({
							label: a,
							value: c,
							theme: b.options.theme,
							renderLabelHtml: function() {
								return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>"
							}
						})
					});
					var g = new a.Combox({
						editor: b,
						items: f,
						onselect: function(a, c) {
							b.execCommand("insertcode", this.items[c].value)
						},
						onbuttonclick: function() {
							this.showPopup()
						},
						title: e,
						initValue: e,
						className: "edui-for-insertcode",
						indexByValue: function(a) {
							if (a) for (var b = 0,
							c; c = this.items[b]; b++) if ( - 1 != c.value.indexOf(a)) return b;
							return - 1
						}
					});
					a.buttons.insertcode = g;
					b.addListener("selectionchange",
					function(a, c, d) {
						d || ( - 1 == b.queryCommandState("insertcode") ? g.setDisabled(!0) : (g.setDisabled(!1), (a = b.queryCommandValue("insertcode")) ? (a && (a = a.replace(/['"]/g, "").split(",")[0]), g.setValue(a)) : g.setValue(e)))
					});
					return g
				};
				a.fontfamily = function(b, c, e) {
					c = b.options.fontfamily || [];
					e = b.options.labelMap.fontfamily || b.getLang("labelMap.fontfamily") || "";
					if (c.length) {
						for (var f = 0,
						g, k = []; g = c[f]; f++) {
							var p = b.getLang("fontfamily")[g.name] || ""; (function(a, c) {
								k.push({
									label: a,
									value: c,
									theme: b.options.theme,
									renderLabelHtml: function() {
										return '<div class="edui-label %%-label" style="font-family:' + d.unhtml(this.value) + '">' + (this.label || "") + "</div>"
									}
								})
							})(g.label || p, g.val)
						}
						var q = new a.Combox({
							editor: b,
							items: k,
							onselect: function(a, c) {
								b.execCommand("FontFamily", this.items[c].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							},
							title: e,
							initValue: e,
							className: "edui-for-fontfamily",
							indexByValue: function(a) {
								if (a) for (var b = 0,
								c; c = this.items[b]; b++) if ( - 1 != c.value.indexOf(a)) return b;
								return - 1
							}
						});
						a.buttons.fontfamily = q;
						b.addListener("selectionchange",
						function(a, c, d) {
							d || ( - 1 == b.queryCommandState("FontFamily") ? q.setDisabled(!0) : (q.setDisabled(!1), (a = b.queryCommandValue("FontFamily")) && (a = a.replace(/['"]/g, "").split(",")[0]), q.setValue(a)))
						});
						return q
					}
				};
				a.fontsize = function(b, c, d) {
					d = b.options.labelMap.fontsize || b.getLang("labelMap.fontsize") || "";
					c = c || b.options.fontsize || [];
					if (c.length) {
						for (var e = [], f = 0; f < c.length; f++) {
							var g = c[f] + "px";
							e.push({
								label: g,
								value: g,
								theme: b.options.theme,
								renderLabelHtml: function() {
									return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>"
								}
							})
						}
						var k = new a.Combox({
							editor: b,
							items: e,
							title: d,
							initValue: d,
							onselect: function(a, c) {
								b.execCommand("FontSize", this.items[c].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							},
							className: "edui-for-fontsize"
						});
						a.buttons.fontsize = k;
						b.addListener("selectionchange",
						function(a, c, d) {
							d || ( - 1 == b.queryCommandState("FontSize") ? k.setDisabled(!0) : (k.setDisabled(!1), k.setValue(b.queryCommandValue("FontSize"))))
						});
						return k
					}
				};
				a.paragraph = function(b, c, e) {
					e = b.options.labelMap.paragraph || b.getLang("labelMap.paragraph") || "";
					c = b.options.paragraph || [];
					if (!d.isEmptyObject(c)) {
						var f = [],
						g;
						for (g in c) f.push({
							value: g,
							label: c[g] || b.getLang("paragraph")[g],
							theme: b.options.theme,
							renderLabelHtml: function() {
								return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || "") + "</span></div>"
							}
						});
						var k = new a.Combox({
							editor: b,
							items: f,
							title: e,
							initValue: e,
							className: "edui-for-paragraph",
							onselect: function(a, c) {
								b.execCommand("Paragraph", this.items[c].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							}
						});
						a.buttons.paragraph = k;
						b.addListener("selectionchange",
						function(a, c, d) {
							d || ( - 1 == b.queryCommandState("Paragraph") ? k.setDisabled(!0) : (k.setDisabled(!1), a = b.queryCommandValue("Paragraph"), -1 != k.indexByValue(a) ? k.setValue(a) : k.setValue(k.initValue)))
						});
						return k
					}
				};
				a.customstyle = function(b) {
					var c = b.options.customstyle || [],
					d = b.options.labelMap.customstyle || b.getLang("labelMap.customstyle") || "";
					if (c.length) {
						for (var e = b.getLang("customstyle"), f = 0, g = [], k; k = c[f++];)(function(a) {
							var c = {};
							c.label = a.label ? a.label: e[a.name];
							c.style = a.style;
							c.className = a.className;
							c.tag = a.tag;
							g.push({
								label: c.label,
								value: c,
								theme: b.options.theme,
								renderLabelHtml: function() {
									return '<div class="edui-label %%-label"><' + c.tag + " " + (c.className ? ' class="' + c.className + '"': "") + (c.style ? ' style="' + c.style + '"': "") + ">" + c.label + "</" + c.tag + "></div>"
								}
							})
						})(k);
						var h = new a.Combox({
							editor: b,
							items: g,
							title: d,
							initValue: d,
							className: "edui-for-customstyle",
							onselect: function(a, c) {
								b.execCommand("customstyle", this.items[c].value)
							},
							onbuttonclick: function() {
								this.showPopup()
							},
							indexByValue: function(a) {
								for (var b = 0,
								c; c = this.items[b++];) if (c.label == a) return b - 1;
								return - 1
							}
						});
						a.buttons.customstyle = h;
						b.addListener("selectionchange",
						function(a, c, d) {
							d || ( - 1 == b.queryCommandState("customstyle") ? h.setDisabled(!0) : (h.setDisabled(!1), a = b.queryCommandValue("customstyle"), -1 != h.indexByValue(a) ? h.setValue(a) : h.setValue(h.initValue)))
						});
						return h
					}
				};
				a.inserttable = function(b, c, d) {
					d = b.options.labelMap.inserttable || b.getLang("labelMap.inserttable") || "";
					var e = new a.TableButton({
						editor: b,
						title: d,
						className: "edui-for-inserttable",
						onpicktable: function(a, c, d) {
							b.execCommand("InsertTable", {
								numRows: d,
								numCols: c,
								border: 1
							})
						},
						onbuttonclick: function() {
							this.showPopup()
						}
					});
					a.buttons.inserttable = e;
					b.addListener("selectionchange",
					function() {
						e.setDisabled( - 1 == b.queryCommandState("inserttable"))
					});
					return e
				};
				a.lineheight = function(b) {
					var c = b.options.lineheight || [];
					if (c.length) {
						for (var d = 0,
						e, f = []; e = c[d++];) f.push({
							label: e,
							value: e,
							theme: b.options.theme,
							onclick: function() {
								b.execCommand("lineheight", this.value)
							}
						});
						var g = new a.MenuButton({
							editor: b,
							className: "edui-for-lineheight",
							title: b.options.labelMap.lineheight || b.getLang("labelMap.lineheight") || "",
							items: f,
							onbuttonclick: function() {
								var a = b.queryCommandValue("LineHeight") || this.value;
								b.execCommand("LineHeight", a)
							}
						});
						a.buttons.lineheight = g;
						b.addListener("selectionchange",
						function() {
							var a = b.queryCommandState("LineHeight");
							if ( - 1 == a) g.setDisabled(!0);
							else {
								g.setDisabled(!1);
								var c = b.queryCommandValue("LineHeight");
								c && g.setValue((c + "").replace(/cm/, ""));
								g.setChecked(a)
							}
						});
						return g
					}
				};
				k = ["top", "bottom"];
				for (c = 0; g = k[c++];)(function(b) {
					a["rowspacing" + b] = function(c) {
						var d = c.options["rowspacing" + b] || [];
						if (!d.length) return null;
						for (var e = 0,
						f, g = []; f = d[e++];) g.push({
							label: f,
							value: f,
							theme: c.options.theme,
							onclick: function() {
								c.execCommand("rowspacing", this.value, b)
							}
						});
						var k = new a.MenuButton({
							editor: c,
							className: "edui-for-rowspacing" + b,
							title: c.options.labelMap["rowspacing" + b] || c.getLang("labelMap.rowspacing" + b) || "",
							items: g,
							onbuttonclick: function() {
								var a = c.queryCommandValue("rowspacing", b) || this.value;
								c.execCommand("rowspacing", a, b)
							}
						});
						a.buttons[b] = k;
						c.addListener("selectionchange",
						function() {
							var a = c.queryCommandState("rowspacing", b);
							if ( - 1 == a) k.setDisabled(!0);
							else {
								k.setDisabled(!1);
								var d = c.queryCommandValue("rowspacing", b);
								d && k.setValue((d + "").replace(/%/, ""));
								k.setChecked(a)
							}
						});
						return k
					}
				})(g);
				k = ["insertorderedlist", "insertunorderedlist"];
				for (c = 0; g = k[c++];)(function(b) {
					a[b] = function(c) {
						var d = c.options[b],
						e = function() {
							c.execCommand(b, this.value)
						},
						f = [],
						g;
						for (g in d) f.push({
							label: d[g] || c.getLang()[b][g] || "",
							value: g,
							theme: c.options.theme,
							onclick: e
						});
						var k = new a.MenuButton({
							editor: c,
							className: "edui-for-" + b,
							title: c.getLang("labelMap." + b) || "",
							items: f,
							onbuttonclick: function() {
								var a = c.queryCommandValue(b) || this.value;
								c.execCommand(b, a)
							}
						});
						a.buttons[b] = k;
						c.addListener("selectionchange",
						function() {
							var a = c.queryCommandState(b);
							if ( - 1 == a) k.setDisabled(!0);
							else {
								k.setDisabled(!1);
								var d = c.queryCommandValue(b);
								k.setValue(d);
								k.setChecked(a)
							}
						});
						return k
					}
				})(g);
				a.fullscreen = function(b, c) {
					c = b.options.labelMap.fullscreen || b.getLang("labelMap.fullscreen") || "";
					var d = new a.Button({
						className: "edui-for-fullscreen",
						title: c,
						theme: b.options.theme,
						onclick: function() {
							b.ui && b.ui.setFullScreen(!b.ui.isFullScreen());
							this.setChecked(b.ui.isFullScreen())
						}
					});
					a.buttons.fullscreen = d;
					b.addListener("selectionchange",
					function() {
						var a = b.queryCommandState("fullscreen");
						d.setDisabled( - 1 == a);
						d.setChecked(b.ui.isFullScreen())
					});
					return d
				};
				a.emotion = function(c, d) {
					var e = new a.MultiMenuPop({
						title: c.options.labelMap.emotion || c.getLang("labelMap.emotion") || "",
						editor: c,
						className: "edui-for-emotion",
						iframeUrl: c.ui.mapUrl(d || (c.options.iframeUrlMap || {}).emotion || b.emotion)
					});
					a.buttons.emotion = e;
					c.addListener("selectionchange",
					function() {
						e.setDisabled( - 1 == c.queryCommandState("emotion"))
					});
					return e
				};
				a.autotypeset = function(b) {
					var c = new a.AutoTypeSetButton({
						editor: b,
						title: b.options.labelMap.autotypeset || b.getLang("labelMap.autotypeset") || "",
						className: "edui-for-autotypeset",
						onbuttonclick: function() {
							b.execCommand("autotypeset")
						}
					});
					a.buttons.autotypeset = c;
					b.addListener("selectionchange",
					function() {
						c.setDisabled( - 1 == b.queryCommandState("autotypeset"))
					});
					return c
				}
			})(); (function() {
				function d(a) {
					this.initOptions(a);
					this.initEditorUI()
				}
				var a = s.editor.utils,
				e = s.editor.ui.uiUtils,
				b = s.editor.ui.UIBase,
				c = s.editor.dom.domUtils,
				g = [];
				d.prototype = {
					uiName: "editor",
					initEditorUI: function() {
						function a(b, c) {
							b.setOpt({
								wordCount: !0,
								maximumWords: 1E4,
								wordCountMsg: b.options.wordCountMsg || b.getLang("wordCountMsg"),
								wordOverFlowMsg: b.options.wordOverFlowMsg || b.getLang("wordOverFlowMsg")
							});
							var d = b.options,
							e = d.maximumWords,
							f = d.wordCountMsg,
							g = d.wordOverFlowMsg,
							k = c.getDom("wordcount");
							d.wordCount && (d = b.getContentLength(!0), d > e ? (k.innerHTML = g, b.fireEvent("wordcountoverflow")) : k.innerHTML = f.replace("{#leave}", e - d).replace("{#count}", d))
						}
						this.editor.ui = this;
						this._dialogs = {};
						this.initUIBase();
						this._initToolbars();
						var b = this.editor,
						d = this;
						b.addListener("ready",
						function() {
							b.getDialog = function(a) {
								return b.ui._dialogs[a + "Dialog"]
							};
							c.on(b.window, "scroll",
							function(a) {
								s.editor.ui.Popup.postHide(a)
							});
							b.ui._actualFrameWidth = b.options.initialFrameWidth;
							UE.browser.ie && 6 === UE.browser.version && b.container.ownerDocument.execCommand("BackgroundImageCache", !1, !0);
							b.options.elementPathEnabled && (b.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' + b.getLang("elementPathTip") + ":</div>");
							b.options.wordCount && (c.on(b.document, "click",
							function() {
								a(b, d);
								c.un(b.document, "click", arguments.callee)
							}), b.ui.getDom("wordcount").innerHTML = b.getLang("wordCountTip"));
							b.ui._scale();
							b.options.scaleEnabled ? (b.autoHeightEnabled && b.disableAutoHeight(), d.enableScale()) : d.disableScale();
							b.options.elementPathEnabled || (b.options.wordCount || b.options.scaleEnabled) || (b.ui.getDom("elementpath").style.display = "none", b.ui.getDom("wordcount").style.display = "none", b.ui.getDom("scale").style.display = "none");
							b.selection.isFocus() && b.fireEvent("selectionchange", !1, !0)
						});
						b.addListener("mousedown",
						function(a, b) {
							s.editor.ui.Popup.postHide(b, b.target || b.srcElement);
							s.editor.ui.ShortCutMenu.postHide(b)
						});
						b.addListener("delcells",
						function() {
							UE.ui.edittip && new UE.ui.edittip(b);
							b.getDialog("edittip").open()
						});
						var e, f = !1,
						g;
						b.addListener("afterpaste",
						function() {
							b.queryCommandState("pasteplain") || (s.editor.ui.PastePicker && (e = new s.editor.ui.Popup({
								content: new s.editor.ui.PastePicker({
									editor: b
								}),
								editor: b,
								className: "edui-wordpastepop"
							}), e.render()), f = !0)
						});
						b.addListener("afterinserthtml",
						function() {
							clearTimeout(g);
							g = setTimeout(function() {
								if (e && (f || b.ui._isTransfer)) {
									if (e.isHidden()) {
										var a = c.createElement(b.document, "span", {
											style: "line-height:0px;",
											innerHTML: "\ufeff"
										});
										b.selection.getRange().insertNode(a);
										var d = Y(a, "firstChild", "previousSibling");
										e.showAnchor(3 == d.nodeType ? d.parentNode: d);
										c.remove(a)
									} else e.show();
									delete b.ui._isTransfer;
									f = !1
								}
							},
							200)
						});
						b.addListener("contextmenu",
						function(a, b) {
							s.editor.ui.Popup.postHide(b)
						});
						b.addListener("keydown",
						function(a, b) {
							e && e.dispose(b);
							var c = b.keyCode || b.which;
							if (b.altKey && 90 == c) UE.ui.buttons.fullscreen.onclick()
						});
						b.addListener("wordcount",
						function(b) {
							a(this, d)
						});
						b.addListener("selectionchange",
						function() {
							if (b.options.elementPathEnabled) d[( - 1 == b.queryCommandState("elementpath") ? "dis": "en") + "ableElementPath"]();
							if (b.options.scaleEnabled) d[( - 1 == b.queryCommandState("scale") ? "dis": "en") + "ableScale"]()
						});
						var h = new s.editor.ui.Popup({
							editor: b,
							content: "",
							className: "edui-bubble",
							_onEditButtonClick: function() {
								this.hide();
								b.ui._dialogs.linkDialog.open()
							},
							_onImgEditButtonClick: function(a) {
								this.hide();
								b.ui._dialogs[a] && b.ui._dialogs[a].open()
							},
							_onImgSetFloat: function(a) {
								this.hide();
								b.execCommand("imagefloat", a)
							},
							_setIframeAlign: function(a) {
								var b = h.anchorEl,
								d = b.cloneNode(!0);
								switch (a) {
								case - 2 : d.setAttribute("align", "");
									break;
								case - 1 : d.setAttribute("align", "left");
									break;
								case 1:
									d.setAttribute("align", "right")
								}
								b.parentNode.insertBefore(d, b);
								c.remove(b);
								h.anchorEl = d;
								h.showAnchor(h.anchorEl)
							},
							_updateIframe: function() {
								var a = b._iframe = h.anchorEl;
								c.hasClass(a, "ueditor_baidumap") ? (b.selection.getRange().selectNode(a).select(), b.ui._dialogs.mapDialog.open()) : b.ui._dialogs.insertframeDialog.open();
								h.hide()
							},
							_onRemoveButtonClick: function(a) {
								b.execCommand(a);
								this.hide()
							},
							queryAutoHide: function(a) {
								return a && a.ownerDocument == b.document && ("img" == a.tagName.toLowerCase() || c.findParentByTagName(a, "a", !0)) ? a !== h.anchorEl: s.editor.ui.Popup.prototype.queryAutoHide.call(this, a)
							}
						});
						h.render();
						b.options.imagePopup && (b.addListener("mouseover",
						function(a, c) {
							c = c || window.event;
							var d = c.target || c.srcElement;
							if (b.ui._dialogs.insertframeDialog && /iframe/ig.test(d.tagName)) {
								var e = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' + b.getLang("modify") + "</span></nobr>");
								e ? (h.getDom("content").innerHTML = e, h.anchorEl = d, h.showAnchor(h.anchorEl)) : h.hide()
							}
						}), b.addListener("selectionchange",
						function(a, c) {
							if (c) {
								var d = "",
								e = "",
								f = b.selection.getRange().getClosedNode(),
								e = b.ui._dialogs;
								if (f && "IMG" == f.tagName) {
									var g = "insertimageDialog";
									if ( - 1 != f.className.indexOf("edui-faked-video") || -1 != f.className.indexOf("edui-upload-video")) g = "insertvideoDialog"; - 1 != f.className.indexOf("edui-faked-webapp") && (g = "webappDialog"); - 1 != f.src.indexOf("http://api.map.baidu.com") && (g = "mapDialog"); - 1 != f.className.indexOf("edui-faked-music") && (g = "musicDialog"); - 1 != f.src.indexOf("http://maps.google.com/maps/api/staticmap") && (g = "gmapDialog");
									f.getAttribute("anchorname") && (g = "anchorDialog", d = h.formatHtml("<nobr>" + b.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + b.getLang("modify") + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + b.getLang("delete") + "</span></nobr>"));
									f.getAttribute("word_img") && (b.word_img = [f.getAttribute("word_img")], g = "wordimageDialog");
									if (!e[g]) return;
									e = "<nobr>" + b.getLang("property") + ': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + b.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + b.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + b.getLang("justifyright") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + b.getLang("justifycenter") + "</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + g + '\');" class="edui-clickable">' + b.getLang("modify") + "</span></nobr>"; ! d && (d = h.formatHtml(e))
								}
								if (b.ui._dialogs.linkDialog) {
									var k = b.queryCommandValue("link"),
									n;
									k && (n = k.getAttribute("_href") || k.getAttribute("href", 2)) && (e = n, 30 < n.length && (e = n.substring(0, 20) + "..."), d && (d += '<div style="height:5px;"></div>'), d += h.formatHtml("<nobr>" + b.getLang("anthorMsg") + ': <a target="_blank" href="' + n + '" title="' + n + '" >' + e + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + b.getLang("modify") + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + b.getLang("clear") + "</span></nobr>"), h.showAnchor(k))
								}
								d ? (h.getDom("content").innerHTML = d, h.anchorEl = f || k, h.showAnchor(h.anchorEl)) : h.hide()
							}
						}))
					},
					_initToolbars: function() {
						for (var a = this.editor,
						b = this.toolbars || [], c = [], d = 0; d < b.length; d++) {
							for (var e = b[d], f = new s.editor.ui.Toolbar({
								theme: a.options.theme
							}), g = 0; g < e.length; g++) {
								var h = e[g],
								p = null;
								if ("string" == typeof h) {
									if (h = h.toLowerCase(), "|" == h && (h = "Separator"), "||" == h && (h = "Breakline"), s.editor.ui[h] && (p = new s.editor.ui[h](a)), "fullscreen" == h) {
										c && c[0] ? c[0].items.splice(0, 0, p) : p && f.items.splice(0, 0, p);
										continue
									}
								} else p = h;
								p && p.id && f.add(p)
							}
							c[d] = f
						}
						this.toolbars = c
					},
					getHtmlTpl: function() {
						return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' + this.renderToolbarBoxHtml() + "</div></div>": "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>'
					},
					showWordImageDialog: function() {
						this._dialogs.wordimageDialog.open()
					},
					renderToolbarBoxHtml: function() {
						for (var a = [], b = 0; b < this.toolbars.length; b++) a.push(this.toolbars[b].renderHtml());
						return a.join("")
					},
					setFullScreen: function(a) {
						var b = this.editor,
						c = b.container.parentNode.parentNode;
						if (this._fullscreen != a) {
							this._fullscreen = a;
							this.editor.fireEvent("beforefullscreenchange", a);
							if (s.editor.browser.gecko) var d = b.selection.getRange().createBookmark();
							if (a) {
								for (;
								"BODY" != c.tagName;) {
									var e = s.editor.dom.domUtils.getComputedStyle(c, "position");
									g.push(e);
									c.style.position = "static";
									c = c.parentNode
								}
								this._bakHtmlOverflow = document.documentElement.style.overflow;
								this._bakBodyOverflow = document.body.style.overflow;
								this._bakAutoHeight = this.editor.autoHeightEnabled;
								this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
								this._bakEditorContaninerWidth = b.iframe.parentNode.offsetWidth;
								this._bakAutoHeight && (b.autoHeightEnabled = !1, this.editor.disableAutoHeight());
								document.documentElement.style.overflow = "hidden";
								window.scrollTo(0, window.scrollY);
								this._bakCssText = this.getDom().style.cssText;
								this._bakCssText1 = this.getDom("iframeholder").style.cssText;
								b.iframe.parentNode.style.width = "";
								this._updateFullScreen()
							} else {
								for (;
								"BODY" != c.tagName;) c.style.position = g.shift(),
								c = c.parentNode;
								this.getDom().style.cssText = this._bakCssText;
								this.getDom("iframeholder").style.cssText = this._bakCssText1;
								this._bakAutoHeight && (b.autoHeightEnabled = !0, this.editor.enableAutoHeight());
								document.documentElement.style.overflow = this._bakHtmlOverflow;
								document.body.style.overflow = this._bakBodyOverflow;
								b.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px";
								window.scrollTo(0, this._bakScrollTop)
							}
							if (q.gecko && "true" === b.body.contentEditable) {
								var f = document.createElement("input");
								document.body.appendChild(f);
								b.body.contentEditable = !1;
								setTimeout(function() {
									f.focus();
									setTimeout(function() {
										b.body.contentEditable = !0;
										b.fireEvent("fullscreenchanged", a);
										b.selection.getRange().moveToBookmark(d).select(!0);
										s.editor.dom.domUtils.remove(f);
										a && window.scroll(0, 0)
									},
									0)
								},
								0)
							}
							"true" === b.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", a), this.triggerLayout())
						}
					},
					_updateFullScreen: function() {
						if (this._fullscreen) {
							var a = e.getViewportRect();
							this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + a.width + "px;height:" + a.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100);
							e.setViewportOffset(this.getDom(), {
								left: 0,
								top: this.editor.options.topOffset || 0
							});
							this.editor.setHeight(a.height - this.getDom("toolbarbox").offsetHeight - this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0));
							if (q.gecko) try {
								window.onresize()
							} catch(b) {}
						}
					},
					_updateElementPath: function() {
						var a = this.getDom("elementpath"),
						b;
						if (this.elementPathEnabled && (b = this.editor.queryCommandValue("elementpath"))) {
							for (var c = [], d = 0, e; e = b[d]; d++) c[d] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + d + '&quot;);">' + e + "</span>");
							a.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ": " + c.join(" &gt; ") + "</div>"
						} else a.style.display = "none"
					},
					disableElementPath: function() {
						var a = this.getDom("elementpath");
						a.innerHTML = "";
						a.style.display = "none";
						this.elementPathEnabled = !1
					},
					enableElementPath: function() {
						this.getDom("elementpath").style.display = "";
						this.elementPathEnabled = !0;
						this._updateElementPath()
					},
					_scale: function() {
						function a() {
							H = c.getXY(h);
							I || (I = g.options.minFrameHeight + s.offsetHeight + v.offsetHeight);
							D.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + h.offsetWidth + "px;height:" + h.offsetHeight + "px;z-index:" + (g.options.zIndex + 1);
							c.on(f, "mousemove", b);
							c.on(p, "mouseup", d);
							c.on(f, "mouseup", d)
						}
						function b(a) {
							e();
							a = a || window.event;
							O = a.pageX || f.documentElement.scrollLeft + a.clientX;
							z = a.pageY || f.documentElement.scrollTop + a.clientY;
							E = O - H.x;
							B = z - H.y;
							E >= J && (L = !0, D.style.width = E + "px");
							B >= I && (L = !0, D.style.height = B + "px")
						}
						function d() {
							L && (L = !1, g.ui._actualFrameWidth = D.offsetWidth - 2, h.style.width = g.ui._actualFrameWidth + "px", g.setHeight(D.offsetHeight - v.offsetHeight - s.offsetHeight - 2));
							D && (D.style.display = "none");
							e();
							c.un(f, "mousemove", b);
							c.un(p, "mouseup", d);
							c.un(f, "mouseup", d)
						}
						function e() {
							q.ie ? f.selection.clear() : window.getSelection().removeAllRanges()
						}
						var f = document,
						g = this.editor,
						h = g.container,
						p = g.document,
						s = this.getDom("toolbarbox"),
						v = this.getDom("bottombar"),
						F = this.getDom("scale"),
						D = this.getDom("scalelayer"),
						L = !1,
						H = null,
						I = 0,
						J = g.options.minFrameWidth,
						O = 0,
						z = 0,
						E = 0,
						B = 0,
						A = this;
						this.editor.addListener("fullscreenchanged",
						function(a, b) {
							if (b) A.disableScale();
							else if (A.editor.options.scaleEnabled) {
								A.enableScale();
								var d = A.editor.document.createElement("span");
								A.editor.body.appendChild(d);
								A.editor.body.style.height = Math.max(c.getXY(d).y, A.editor.iframe.offsetHeight - 20) + "px";
								c.remove(d)
							}
						});
						this.enableScale = function() {
							1 != g.queryCommandState("source") && (F.style.display = "", this.scaleEnabled = !0, c.on(F, "mousedown", a))
						};
						this.disableScale = function() {
							F.style.display = "none";
							this.scaleEnabled = !1;
							c.un(F, "mousedown", a)
						}
					},
					isFullScreen: function() {
						return this._fullscreen
					},
					postRender: function() {
						b.prototype.postRender.call(this);
						for (var a = 0; a < this.toolbars.length; a++) this.toolbars[a].postRender();
						var c = this,
						d, e = s.editor.dom.domUtils,
						f = function() {
							clearTimeout(d);
							d = setTimeout(function() {
								c._updateFullScreen()
							})
						};
						e.on(window, "resize", f);
						c.addListener("destroy",
						function() {
							e.un(window, "resize", f);
							clearTimeout(d)
						})
					},
					showToolbarMsg: function(a, b) {
						this.getDom("toolbarmsg_label").innerHTML = a;
						this.getDom("toolbarmsg").style.display = "";
						b || (this.getDom("upload_dialog").style.display = "none")
					},
					hideToolbarMsg: function() {
						this.getDom("toolbarmsg").style.display = "none"
					},
					mapUrl: function(a) {
						return a ? a.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : ""
					},
					triggerLayout: function() {
						var a = this.getDom();
						a.style.zoom = "1" == a.style.zoom ? "100%": "1"
					}
				};
				a.inherits(d, s.editor.ui.UIBase);
				var f = {};
				UE.ui.Editor = function(b) {
					var e = new UE.Editor(b);
					e.options.editor = e;
					a.loadFile(document, {
						href: e.options.themePath + e.options.theme + "/css/ueditor.css",
						tag: "link",
						type: "text/css",
						rel: "stylesheet"
					});
					var g = e.render;
					e.render = function(b) {
						b.constructor === String && (e.key = b, f[b] = e);
						a.domReady(function() {
							function a() {
								e.setOpt({
									labelMap: e.options.labelMap || e.getLang("labelMap")
								});
								new d(e.options);
								if (b && (b.constructor === String && (b = document.getElementById(b)), b && b.getAttribute("name") && (e.options.textarea = b.getAttribute("name")), b && /script|textarea/ig.test(b.tagName))) {
									var f = document.createElement("div");
									b.parentNode.insertBefore(f, b);
									var k = b.value || b.innerHTML;
									e.options.initialContent = /^[\t\r\n ]*$/.test(k) ? e.options.initialContent: k.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><");
									b.className && (f.className = b.className);
									b.style.cssText && (f.style.cssText = b.style.cssText);
									/textarea/i.test(b.tagName) ? (e.textarea = b, e.textarea.style.display = "none") : (b.parentNode.removeChild(b), b.id && (f.id = b.id));
									b = f;
									b.innerHTML = ""
								}
								c.addClass(b, "edui-" + e.options.theme);
								e.ui.render(b);
								f = e.options;
								e.container = e.ui.getDom();
								for (var k = c.findParents(b, !0), p = [], r = 0, q; q = k[r]; r++) p[r] = q.style.display,
								q.style.display = "block";
								f.minFrameWidth = f.initialFrameWidth ? f.initialFrameWidth: f.initialFrameWidth = b.offsetWidth;
								f.initialFrameHeight ? f.minFrameHeight = f.initialFrameHeight: f.initialFrameHeight = f.minFrameHeight = b.offsetHeight;
								for (r = 0; q = k[r]; r++) q.style.display = p[r];
								b.style.height && (b.style.height = "");
								e.container.style.width = f.initialFrameWidth + (/%$/.test(f.initialFrameWidth) ? "": "px");
								e.container.style.zIndex = f.zIndex;
								g.call(e, e.ui.getDom("iframeholder"));
								e.fireEvent("afteruiready")
							}
							e.langIsReady ? a() : e.addListener("langReady", a)
						})
					};
					return e
				};
				UE.getEditor = function(a, b) {
					var c = f[a];
					c || (c = f[a] = new UE.ui.Editor(b), c.render(a));
					return c
				};
				UE.delEditor = function(a) {
					var b;
					if (b = f[a]) b.key && b.destroy(),
					delete f[a]
				}
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.Popup,
				e = s.editor.ui.SplitButton,
				b = s.editor.ui.MultiMenuPop = function(a) {
					this.initOptions(a);
					this.initMultiMenu()
				};
				b.prototype = {
					initMultiMenu: function() {
						var b = this;
						this.popup = new a({
							content: "",
							editor: b.editor,
							iframe_rendered: !1,
							onshow: function() {
								this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + b.id + '_iframe" src="' + b.iframeUrl + '" frameborder="0"></iframe>', b.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * b.editor.container.style.zIndex + 1))
							}
						});
						this.onbuttonclick = function() {
							this.showPopup()
						};
						this.initSplitButton()
					}
				};
				d.inherits(b, e)
			})(); (function() {
				function d(a) {
					if (!g.findParent(a.target || a.srcElement,
					function(a) {
						return g.hasClass(a, "edui-shortcutmenu") || g.hasClass(a, "edui-popup")
					},
					!0)) {
						a = 0;
						for (var b; b = f[a++];) b.hide()
					}
				}
				var a = s.editor.ui,
				e = a.UIBase,
				b = a.uiUtils,
				c = s.editor.utils,
				g = s.editor.dom.domUtils,
				f = [],
				k,
				l = !1,
				m = a.ShortCutMenu = function(a) {
					this.initOptions(a);
					this.initShortCutMenu()
				};
				m.postHide = d;
				m.prototype = {
					isHidden: !0,
					SPACE: 5,
					initShortCutMenu: function() {
						this.items = this.items || [];
						this.initUIBase();
						this.initItems();
						this.initEvent();
						f.push(this)
					},
					initEvent: function() {
						var a = this,
						b = a.editor.document;
						g.on(b, "mousemove",
						function(b) {
							if (!1 === a.isHidden && !a.getSubMenuMark() && "contextmenu" != a.eventType) {
								var c = !0,
								d = a.getDom(),
								e = d.offsetWidth / 2 + a.SPACE,
								f = d.offsetHeight / 2,
								g = Math.abs(b.screenX - a.left),
								h = Math.abs(b.screenY - a.top);
								clearTimeout(k);
								k = setTimeout(function() {
									0 < h && h < f ? a.setOpacity(d, "1") : h > f && h < f + 70 ? (a.setOpacity(d, "0.5"), c = !1) : h > f + 70 && h < f + 140 && a.hide();
									c && 0 < g && g < e ? a.setOpacity(d, "1") : g > e && g < e + 70 ? a.setOpacity(d, "0.5") : g > e + 70 && g < e + 140 && a.hide()
								})
							}
						});
						if (q.chrome) g.on(b, "mouseout",
						function(b) {
							b = b.relatedTarget || b.toElement;
							null != b && "HTML" != b.tagName || a.hide()
						});
						a.editor.addListener("afterhidepop",
						function() {
							a.isHidden || (l = !0)
						})
					},
					initItems: function() {
						if (c.isArray(this.items)) for (var b = 0,
						d = this.items.length; b < d; b++) {
							var e = this.items[b].toLowerCase();
							a[e] && (this.items[b] = new a[e](this.editor), this.items[b].className += " edui-shortcutsubmenu ")
						}
					},
					setOpacity: function(a, b) {
						q.ie && 9 > q.version ? a.style.filter = "alpha(opacity = " + 100 * parseFloat(b) + ");": a.style.opacity = b
					},
					getSubMenuMark: function() {
						l = !1;
						for (var a = b.getFixedLayer(), a = g.getElementsByTagName(a, "div",
						function(a) {
							return g.hasClass(a, "edui-shortcutsubmenu edui-popup")
						}), c = 0, d; d = a[c++];)"none" != d.style.display && (l = !0);
						return l
					},
					show: function(a, c) {
						function d(a) {
							0 > a.left && (a.left = 0);
							0 > a.top && (a.top = 0);
							h.style.cssText = "position:absolute;left:" + a.left + "px;top:" + a.top + "px;"
						}
						function e(a) {
							a.tagName || (a = a.getDom());
							f.left = parseInt(a.style.left);
							f.top = parseInt(a.style.top);
							f.top -= h.offsetHeight + 15;
							d(f)
						}
						var f = {},
						h = this.getDom(),
						k = b.getFixedLayer();
						this.eventType = a.type;
						h.style.cssText = "display:block;left:-9999px";
						if ("contextmenu" == a.type && c) {
							var l = g.getElementsByTagName(k, "div", "edui-contextmenu")[0];
							l ? e(l) : this.editor.addListener("aftershowcontextmenu",
							function(a, b) {
								e(b)
							})
						} else f = b.getViewportOffsetByEvent(a),
						f.top -= h.offsetHeight + this.SPACE,
						f.left += this.SPACE + 20,
						d(f),
						this.setOpacity(h, 0.2);
						this.isHidden = !1;
						this.left = a.screenX + h.offsetWidth / 2 - this.SPACE;
						this.top = a.screenY - h.offsetHeight / 2 - this.SPACE;
						this.editor && (h.style.zIndex = 1 * this.editor.container.style.zIndex + 10, k.style.zIndex = h.style.zIndex - 1)
					},
					hide: function() {
						this.getDom() && (this.getDom().style.display = "none");
						this.isHidden = !0
					},
					postRender: function() {
						if (c.isArray(this.items)) for (var a = 0,
						b; b = this.items[a++];) b.postRender()
					},
					getHtmlTpl: function() {
						var a;
						if (c.isArray(this.items)) {
							a = [];
							for (var b = 0; b < this.items.length; b++) a[b] = this.items[b].renderHtml();
							a = a.join("")
						} else a = this.items;
						return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + a + "</div>"
					}
				};
				c.inherits(m, e);
				g.on(document, "mousedown",
				function(a) {
					d(a)
				});
				g.on(window, "scroll",
				function(a) {
					d(a)
				})
			})(); (function() {
				var d = s.editor.utils,
				a = s.editor.ui.UIBase,
				e = s.editor.ui.Breakline = function(a) {
					this.initOptions(a);
					this.initSeparator()
				};
				e.prototype = {
					uiName: "Breakline",
					initSeparator: function() {
						this.initUIBase()
					},
					getHtmlTpl: function() {
						return "<br/>"
					}
				};
				d.inherits(e, a)
			})()
		})();