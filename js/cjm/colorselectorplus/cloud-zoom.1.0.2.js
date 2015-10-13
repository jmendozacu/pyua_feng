! function($) {
    function format(t) {
        for (var e = 1; e < arguments.length; e++) t = t.replace("%" + (e - 1), arguments[e]);
        return t
    }

    function CloudZoom(t, e) {
        var o, i, a, r, s, n, l, d, u = $("img", t),
            c = null,
            p = null,
            h = null,
            m = null,
            g = null,
            f = null,
            v = 0,
            y = 0,
            b = 0,
            x = 0,
            w = 0,
            k = 0,
            z = this;
        setTimeout(function() {
            if (null === p) {
                var e = t.width();
                t.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>', e / 3, e / 2 - e / 6)).find(":last").css("opacity", .5)
            }
        }, 200);
        var O = function() {
            null !== f && (f.remove(), f = null)
        };
        this.removeBits = function() {
            h && (h.remove(), h = null), m && (m.remove(), m = null), g && (g.remove(), g = null), O(), $(".cloud-zoom-loading", t.parent()).remove()
        }, this.destroy = function() {
            t.data("zoom", null), p && (p.unbind(), p.remove(), p = null), c && (c.remove(), c = null), this.removeBits()
        }, this.fadedOut = function() {
            c && (c.remove(), c = null), this.removeBits()
        }, this.controlLoop = function() {
            if (h) {
                var t = n - u.offset().left - .5 * r >> 0,
                    o = l - u.offset().top - .5 * s >> 0;
                0 > t ? t = 0 : t > u.outerWidth() - r && (t = u.outerWidth() - r), 0 > o ? o = 0 : o > u.outerHeight() - s && (o = u.outerHeight() - s), h.css({
                    left: t,
                    top: o
                }), h.css("background-position", -t + "px " + -o + "px"), y = t / u.outerWidth() * a.width >> 0, b = o / u.outerHeight() * a.height >> 0, w += (y - w) / e.smoothMove, x += (b - x) / e.smoothMove, c.css("background-position", -(w >> 0) + "px " + (-(x >> 0) + "px"))
            }
            v = setTimeout(function() {
                z.controlLoop()
            }, 30)
        }, this.init2 = function(t, e) {
            k++, 1 === e && (a = t), 2 === k && this.init()
        }, this.init = function() {
            $(".cloud-zoom-loading", t.parent()).remove(), p = t.parent().append(format("<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;'></div>", u.outerWidth(), u.outerHeight(), 0, 0)).find(":last"), p.bind("mousemove", this, function(t) {
                n = t.pageX, l = t.pageY
            }), p.bind("mouseleave", this, function() {
                return clearTimeout(v), h && h.fadeOut(299), m && m.fadeOut(299), g && g.fadeOut(299), c.fadeOut(300, function() {
                    z.fadedOut()
                }), !1
            }), p.bind("mouseenter", this, function(o) {
                n = o.pageX, l = o.pageY, d = o.data, c && (c.stop(!0, !1), c.remove());
                var i = e.adjustX,
                    v = e.adjustY,
                    y = u.outerWidth(),
                    b = u.outerHeight(),
                    x = e.zoomWidth,
                    w = e.zoomHeight;
                "auto" == e.zoomWidth && (x = y), "auto" == e.zoomHeight && (w = b);
                var k = t.parent();
                switch (e.position) {
                    case "top":
                        v -= w;
                        break;
                    case "right":
                        i += y;
                        break;
                    case "bottom":
                        v += b;
                        break;
                    case "left":
                        i -= x;
                        break;
                    case "inside":
                        x = y, w = b;
                        break;
                    default:
                        k = $("#" + e.position), k.length ? (x = k.innerWidth(), w = k.innerHeight()) : (k = t, i += y, v += b)
                }
                c = k.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>', i, v, x, w, a.src)).find(":last"), u.attr("title") && e.showTitle && c.append(format('<div class="cloud-zoom-title">%0</div>', u.attr("title"))).find(":last").css("opacity", e.titleOpacity), $.browser.msie && $.browser.version < 7 && (f = $('<iframe frameborder="0" src="#"></iframe>').css({
                    position: "absolute",
                    left: i,
                    top: v,
                    zIndex: 99,
                    width: x,
                    height: w
                }).insertBefore(c)), c.fadeIn(500), h && (h.remove(), h = null), r = u.outerWidth() / a.width * parseInt(c.css("width")), s = u.outerHeight() / a.height * c.height(), h = t.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>", r, s)).find(":last"), p.css("cursor", h.css("cursor")), p.unbind("click").bind("click", function() {
                    var t = $(this).prev("a").attr("gallery");
                    if ("" != t) {
                        var e = $(this).prev("a").attr("href"),
                            o = "<img width=456 height=622 src='" + e + "'>",
                            i = new Array;
                        $("#ul-moreviews li:visible a").each(function() {
                            i.push($(this).attr("href"))
                        }), $(".overlay-gallery-img img").remove(), $(".overlay-gallery").css("display", "block"), $(".overlay-gallery-img").append(o).hide().fadeIn(300), $(".overlay-gallery-img .gallery-close").click(function() {
                            $(".overlay-gallery").css("display", "none");
                        }), $(".overlay-gallery").click(function(e) {
                            if( e.target != this )
                                return;
                            $(this).css("display", "none");
                        }),$(".gallery-prev").unbind("click").bind("click",function() {
                            for (var t = 0; t < i.length; t++)
                                if (i[t] == $(".overlay-gallery-img img").attr("src")) {
                                    $(".overlay-gallery-img img").remove(), $(".overlay-gallery-img").append(0 == t ? "<img width=456 height=622 src='" + i[i.length - 1] + "'>" : "<img width=456 height=622 src='" + i[t - 1] + "'>").hide().fadeIn(300);
                                    break
                                }
                        }), $(".gallery-next").unbind("click").bind("click",function() {
                            for (var t = 0; t < i.length; t++)
                                if (i[t] == $(".overlay-gallery-img img").attr("src")) {
                                    $(".overlay-gallery-img img").remove(), $(".overlay-gallery-img").append(t == i.length - 1 ? "<img width=456 height=622 src='" + i[0] + "'>" : "<img width=456 height=622 src='" + i[t + 1] + "'>").hide().fadeIn(300);
                                    break
                                }
                        });
                    }
                });
                var z = !1;
                e.tint && (h.css("background", 'url("' + u.attr("src") + '")'), m = t.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />', u.outerWidth(), u.outerHeight(), e.tint)).find(":last"), m.css("opacity", e.tintOpacity), z = !0, m.fadeIn(500)), e.softFocus && (h.css("background", 'url("' + u.attr("src") + '")'), g = t.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />', u.outerWidth() - 2, u.outerHeight() - 2, e.tint)).find(":last"), g.css("background", 'url("' + u.attr("src") + '")'), g.css("opacity", .5), z = !0, g.fadeIn(500)), z || h.css("opacity", e.lensOpacity), "inside" !== e.position && h.fadeIn(500), d.controlLoop(), $(".cloud-zoom-lens").append("<span>Hier klicken für vergrößerten Darstellung.</span>")
            });
        }, o = new Image, $(o).load(function() {
            z.init2(this, 0)
        }), o.src = u.attr("src"), i = new Image, $(i).load(function() {
            z.init2(this, 1)
        }), i.src = t.attr("href")
    }
    jQuery(function() {
        jQuery(".cloud-zoom, .cloud-zoom-gallery").CloudZoom()
    }), $.fn.CloudZoom = function(options) {
        try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch (e) {}
        return this.each(function() {
            var relOpts, opts;
            eval("var	a = {" + $(this).attr("rel") + "}"), relOpts = a, $(this).is(".cloud-zoom") ? ($(this).css({
                position: "relative",
                display: "block"
            }), $("img", $(this)).css({
                display: "block"
            }), "wrap" != $(this).parent().attr("id") && $(this).wrap('<div id="wrap" style="top:0px;z-index:9999;position:relative;"></div>'), opts = $.extend({}, $.fn.CloudZoom.defaults, options), opts = $.extend({}, opts, relOpts), $(this).data("zoom", new CloudZoom($(this), opts))) : $(this).is(".cloud-zoom-gallery") && (opts = $.extend({}, relOpts, options), $(this).data("relOpts", opts), $(this).bind("click", $(this), function(t) {
                var e = t.data.data("relOpts");
                $("#" + e.useZoom).data("zoom").destroy(), $("#" + e.useZoom).attr("href", t.data.attr("href"));
                var o = t.data.attr("title"),
                    i = $("#" + e.useZoom + " img").attr("src", t.data.data("relOpts").smallImage);
                return "" != o && i.attr("title", o), i.parent().attr("gallery", t.data.data("relOpts").popupWin), $("#" + t.data.data("relOpts").useZoom).CloudZoom(), !1
            }))
        }), this
    }, $.fn.CloudZoom.defaults = {
        zoomWidth: "auto",
        zoomHeight: "auto",
        position: "right",
        tint: !1,
        tintOpacity: .5,
        lensOpacity: .5,
        softFocus: !1,
        smoothMove: 3,
        showTitle: !0,
        titleOpacity: .5,
        adjustX: 0,
        adjustY: 0
    }
}(jQuery);