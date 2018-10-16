function setCookie(a, b, c, d, e, f) {
	document.cookie = a + "=" + escape(b) + (c ? "; expires=" + c : "") + (d ? "; path=" + d : "") + (e ? "; domain=" + e : "") + (f ? "; secure" : "")
}

function replace_specialChar(a) {
	var b, c;
	for (b = 0; b < spChars.length; b++) c = new RegExp("(\\" + spChars[b] + ")", "g"), a = a.replace(c, spToChars[b]);
	return /^[A-Za-z\s\.,]+$/.test(a) && (a = a.replace(/\s+/g, " ")), a = a.replace(/[^\x09\x0A\x0D\x20-\uD7FF\uE000-\uFFFD\u10000-\u10FFFF]/gi, ""), $.trim(a)
}

function pushHistory() {
	if ("miniprogram" !== window.__wxjs_environment && !window.IsPar) {
		var a = {
			title: "title",
			url: "#"
		};
		window.history.pushState(a, "title", "")
	}
}

function clickJp(a) {
	window._czc && _czc.push(["_trackEvent", "未完成填写", "点击"]);
	var b = a.getAttribute("vhref");
	return alertNew("提示：此活动仅限新用户领取，请按页面提示进行操作！", function() {
		window.location = b
	}), !0
}

function show_zhezhao_tip(a) {
	var b, c, d, e, f, g, h;
	if (a) {
		if ($("#zhezhaotip")[0]) return;
		b = "", c = window.notFinishTip.split(";"), 2 == c.length && 0 == c[0].indexOf("http") && (b = "<div style='width: 100%;height:80px; background-color: #e9f7ff; float: left;'><div style='float:left;margin-left:110px;font-size:14px; color: #6a696b; margin-top: 17px; line-height: 1.5;'>先领取<a href='javascript:' onclick='return clickJp(this);' vhref='" + c[0] + "' style='text-decoration: underline; font-weight: bold;'>" + c[1] + "</a><br/>注满能量，再来填写吧！</div>" + "</div>"), d = "<div style='width:100%; height:100px; background-color: #ffffff;float: left;'><div style='float: right; height: 100%; padding:15px;'><h1 style='font-size: 16px; color: #840615; line-height: 2.5;'>亲，你的意见很重要哦！</h1><div style='padding: 0 10px; background-color: #2c87f7; font-size: 16px; color: #fff; line-height: 2; float: left; border-radius: 6px;' onclick='show_zhezhao_tip(false);'>继续填写</div><div style='padding: 0 10px; background-color: #ababab; font-size: 16px; color: #fff; line-height: 2; float: left; border-radius: 6px; margin-left: 30px;' onclick='closeTipWindow(true);'>放弃</div></div></div>", e = "<div class='popuptip' style='width:300px;background:#fff;border-radius: 4px;margin: auto;position: absolute; z-index: 9999;overflow: hidden;height:180px;'>" + d + b + "<img src='/images/wjx/smile.png' alt='' width='80' style='position: absolute; top:20px; left:10px;'>", $("body").append('<div style="z-index:999;top: 0px;left: 0px;position: fixed;width: 100%;height: 100%;" id="zhezhaotip"><div style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;opacity: 0.5;background-color: #000;"></div>' + e + "</div>"), f = $("html").height(), g = $(window).height(), h = 100, h = g > f ? g : f, $("#zhezhaotip").height(h), $(".popuptip").css("left", ($(window).width() - $(".popuptip").width()) / 2), $(".popuptip").css("top", ($(window).height() - $(".popuptip").height()) / 2), hasShowTip || window._czc && _czc.push(["_trackEvent", "未完成填写", "加载"]), setLastPop(), hasShowTip = !0
	} else $("#zhezhaotip").remove()
}

function closeTipWindow(a) {
	var b = "确认不再填写问卷吗？";
	1 == langVer && (b = "Would you like to leave?"), window.WeixinJSBridge ? a ? WeixinJSBridge.call("closeWindow") : confirmnew(b, function() {
		WeixinJSBridge.call("closeWindow")
	}) : (needGoOut = !0, show_zhezhao_tip(!1), window.close && window.close(), window.history.back())
}

function setLastPop() {
	window.localStorage && localStorage.setItem("wjxlastpoptime", (new Date).getTime())
}

function checkCanPop() {
	var a, b, c;
	return window.localStorage ? localStorage["wjxuserpub"] ? !1 : window.location.href.indexOf("?pvw=1") > -1 || window.location.href.indexOf("&pvw=1") > -1 ? !1 : window.isVip ? !1 : 1 == langVer ? !1 : window.notFinishTip ? (a = localStorage["wjxlastpoptime"]) ? (b = (new Date).getTime(), c = (b - a) / 864e5, c > 7 ? !0 : !1) : !0 : !1 : !1
}

function setMatrixFill() {
	(!curMatrixError || curMatrixFill.fillvalue) && $("#divMatrixRel").hide()
}

function setChoice(a) {
	$(a.parentNode).find("span").html(a.options[a.selectedIndex].text);
	var b = $(a.parentNode).prev("input");
	b.val(a.value), b.trigger("change")
}

function showMatrixHeader(a, b) {
	var c, d, e, g, i, j, k, l, m, n, p, q, r;
	if (("6" == $(b).attr("type") || "5" == $(b).attr("type")) && !window.IsPar) {
		if (c = $(a).offset(), d = c.top - 9, e = c.left, g = $(a).width(), "6" == $(b).attr("type")) {
			if ("6" == $(a).attr("mode")) return;
			d = c.top - 9, $(window).width(), i = $(a).parent().parent(), j = $("td", i).index($(a).parent()), k = $("table.matrix-rating", b)[0], l = k.rows[0].cells[j], m = $(l).text(), n = 12 * m.length, (n - $(a).width()) / 2, e = c.left + g / 2
		} else !$(a).attr("mode") || "2" != $(a).attr("mode") && "3" != $(a).attr("mode") && "4" != $(a).attr("mode") ? $(a).attr("mode") && "6" == $(a).attr("mode") ? ($(window).width(), c = $(a).offset(), d = c.top - 9, m = $(a).attr("title"), n = 12 * m.length, e = c.left + g / 2) : (p = $(a).height(), 19 == p && (p = 24), d = c.top - 9, m = $(a).attr("title"), n = 12 * m.length, e = c.left + g / 2) : ($(window).width(), c = $(a).offset(), d = c.top - 9, m = $(a).attr("title"), n = 12 * m.length, e = c.left + g / 2);
		$("#divMatrixHeader").html(m), q = $("#divMatrixHeader").outerHeight(), r = $("#divMatrixHeader").outerWidth(), d -= q, e -= r / 2, $("#divMatrixHeader").css("top", d + "px").css("left", e + "px").show()
	}
}

function showMatrixFill(a, b) {
	var c, d, e, f, g;
	if (b) {
		if (curMatrixError) return;
		curMatrixError = a
	}
	curMatrixFill = a, c = a.fillvalue || "", $("#matrixinput").val(c), d = $(a).attr("req"), e = "请注明...", d = a.getAttribute("req"), d && (e = "请注明...[必填]"), 1 == langVer && (e = "Please specify"), matrixinput.setAttribute("placeholder", e), f = $(a).offset(), g = f.top - $(a).height() + 45, $("#divMatrixRel").css("top", g + "px").css("left", "0").show()
}

function refresh_validate() {
	imgCode && "none" != tCode.style.display && "none" != imgCode.style.display && (imgCode.src = "/wjx/join/AntiSpamImageGen.aspx?q=" + activityId + "&t=" + (new Date).valueOf()), submit_text && (submit_text.value = ""), imgVerify && imgVerify.onclick(), window.useAliVerify && (isCaptchaValid = !1, captchaOjb && captchaOjb.reload())
}

function processRadioInput(a, b) {
	a.prevRadio && a.prevRadio.itemText && a.prevRadio != b && (a.prevRadio.itemText.pvalue = a.prevRadio.itemText.value, a.prevRadio.itemText.value = ""), b.itemText && b != a.prevRadio && (b.itemText.value = b.itemText.pvalue || ""), a.prevRadio = b
}

function addClearHref(a) {return 1;
	if (!window.isKaoShi) {
		if (a.hasClearHref) return a.clearHref.style.display = "", void 0;
		var b = document.createElement("a");
		b.title = validate_info_submit_title2, b.style.color = "#999999", b.style.marginLeft = "25px", b.innerHTML = "[" + type_radio_clear + "]", b.href = "javascript:void(0);", a.hasClearHref = !0, $(".field-label", a).append(b), a.clearHref = b, b.onclick = function() {
			clearFieldValue(a), referTitle(a), this.style.display = "none", jumpAny(!1, a), saveAnswer(a)
		}
	}
}

function referTitle(a, b) {
	var c, d, e, f;
	if (a[0]._titleTopic)
		for (c = "", void 0 == b ? $("input:checked", a).each(function() {
			var b = $(this).parent().next().html();
			c && (c += "&nbsp;"), c += b
		}) : c = b, d = 0; d < a[0]._titleTopic.length; d++) e = a[0]._titleTopic[d], f = document.getElementById("spanTitleTopic" + e), f && (f.innerHTML = c)
}

function emptyTitle() {
	var a, b;
	needTip() || (a = window.location.host, b = a.indexOf(".wjx.cn") > -1 || a.indexOf(".wjx.top") > -1, b && (isWeiXin || window.top != window) && $("title").text(""))
}

function checkPeiE(a, b) {
	var c, d, e;
	hasPeiEFull || (b && "1" == a.attr("req") && "1" == a.attr("peie") && "" == a[0].style.display && (c = !0, $(b, a).each(function() {
		var a = this.disabled;
		return a ? void 0 : (c = !1, !1)
	}), c && (hasPeiEFull = !0)), d = 0, "1" == a.attr("qingjing") && "" == a[0].style.display && "1" == a.attr("full") && (hasPeiEFull = !0, d = 1), hasPeiEFull && (e = "此问卷配额已满，暂时不能填写！", d && (e = "此问卷情景题配额已满，不能填写。"), $(divTip).html(e).show()))
}

function adjustVideoHeight(a) {
	var b, c, d, e, f;
	if (!a.hasAdjust)
		for (a.hasAdjust = !0, b = a.getElementsByTagName("iframe"), c = 0; c < b.length; c++) "2" == b[c].getAttribute("video") && (b[c].style.width = "100%", d = b[c].clientWidth, e = b[c].parentNode, e && "none" == e.style.display && (d = Math.min($(window).width(), 400) - 50), f = parseInt(d) / 640 * parseInt(b[c].height) + 15, f > 15 && b[c].setAttribute("style", "height:" + parseInt(f) + "px !important"))
}

function replaceImg(a) {
	var b = "http://pubimageqiniu.paperol.cn",
		c = "//pubnewfr.paperol.cn";
	0 == a.src.indexOf("http://pubssl.sojump.com") || 0 == a.src.indexOf("https://pubssl.sojump.com") || 0 == a.src.indexOf("http://pubimage.sojump.com") || 0 == a.src.indexOf("http://pubimage.sojump.cn") || 0 == a.src.indexOf("http://pubssl.sojump.cn") ? a.src = a.src.replace("http://pubssl.sojump.com", b).replace("https://pubssl.sojump.com", b).replace("http://pubimage.sojump.com", b).replace("http://pubimage.sojump.cn", b).replace("http://pubssl.sojump.cn", b) : (0 == a.src.indexOf("http://pubalifr.sojump.com") || 0 == a.src.indexOf("https://pubalifr.sojump.com") || 0 == a.src.indexOf("https://pubali.sojump.com") || 0 == a.src.indexOf("http://pubali.sojump.com") || 0 == a.src.indexOf("http://pubali.sojump.cn") || 0 == a.src.indexOf("http://pubalifr.sojump.cn") || 0 == a.src.indexOf("https://pubali.sojump.cn") || 0 == a.src.indexOf("https://pubalifr.sojump.cn")) && (a.src = a.src.replace("http://pubalifr.sojump.com", c).replace("https://pubalifr.sojump.com", c).replace("http://pubali.sojump.com", c).replace("https://pubali.sojump.com", c).replace("http://pubali.sojump.cn", c).replace("https://pubali.sojump.cn", c).replace("http://pubalifr.sojump.cn", c).replace("https://pubalifr.sojump.cn", c))
}

function showAnswer(a, b) {
	var c, d;
	if (window.isChuangGuan && "1" == a.attr("ceshi")) {
		if (2 == window.isChuangGuan) return canNext(a, b), void 0;
		c = $(a)[0], c.confirmButton || (d = document.createElement("a"), d.style.marginTop = "5px", d.className = "sumitbutton cancle", c.insertBefore(d, c.lastChild), c.confirmButton = d, d.innerHTML = "确认", fixBottom(), d.onclick = function() {
			var a, d, e, f, g;
			(hasConfirmBtn || confirm("确认后答案将无法修改，确认吗？")) && (c.hasConfirm = !0, hasConfirmBtn = !0, a = !0, d = "", b.each(function() {
				var e, b = "1" == this.getAttribute("ans"),
					c = $("input", this)[0];
				b ? (c.checked || (a = !1), e = $(".label", this).html(), /^[A-Z][\.、．\s]/.test(e) && (e = e.substring(0, 1)), d && (d += ","), d += e) : c.checked && (a = !1)
			}), c.correctAnswer || (e = document.createElement("div"), e.style.marginTop = "10px", c.insertBefore(e, c.lastChild), c.correctAnswer = e), f = a ? "<span style='color:green;'>回答正确</span>" : "<span style='color:red;'>回答错误，正确答案为：" + d + "</span>", c.correctAnswer.innerHTML = f, g = document.getElementById("divjx" + c.id.replace("div", "")), g && (g.style.display = ""), fixBottom())
		})
	}
}

function restoreAnswer() {
	var a, b, c, d, e, f, g, h, i, j;
	if (!window.localStorage) return null;
	if (a = localStorage["wjxtempanswerid"], a != activityId) return null;
	if (!window.randomMode) {
		if (b = "wjxtempanswer", c = localStorage[b], !c) return null;
		if (d = localStorage["wjxtempanswerdat"], !d) return null;
		if (e = window.qBeginDate || 0, 0 > d - e) return null;
		for (f = c.split(spChars[1]), g = new Array, h = 0; h < f.length; h++) i = f[h].split(spChars[0]), j = new Object, j._value = i[1], j._topic = i[0], g.push(j);
		return g
	}
}

function saveAnswer(a) {
	var b, d, e, f, g, h, i, j;
	if (window.localStorage && window.needSaveJoin && !window.randomMode) try {
		for (b = "wjxtempanswer", localStorage[b], d = restoreAnswer(), null == d && (d = new Array), e = getTopic(a), f = new Object, g = $(a).attr("type"), f._topic = e, f._value = "", getAnswer(a, f, g, !0), h = !1, i = 0; i < d.length; i++)
			if (d[i]._topic == f._topic) {
				h = !0, d[i]._value = f._value;
				break
			}
		for (h || d.push(f), d.sort(function(a, b) {
			return a._topic - b._topic
		}), j = "", i = 0; i < d.length; i++) i > 0 && (j += spChars[1]), j += d[i]._topic, j += spChars[0], j += d[i]._value;
		saveSubmitAnswer(j)
	} catch (k) {}
}

function saveSubmitAnswer(a) {
	window.localStorage && (localStorage.setItem("wjxtempanswer", a), localStorage.setItem("wjxtempanswerid", activityId), localStorage.setItem("wjxtempanswerdat", (new Date).getTime()), localStorage.setItem("wjxfirstloadtime", fisrtLoadTime), localStorage.setItem("wjxsavepage", cur_page))
}

function clearAnswer() {
	if (window.localStorage) {
		var a = localStorage["wjxtempanswerid"];
		a == activityId && (localStorage.removeItem("wjxtempanswer"), localStorage.removeItem("wjxtempanswerid"), localStorage.removeItem("wjxtempanswerdat"), localStorage.removeItem("wjxfirstloadtime"), localStorage.removeItem("wjxlastcosttime"))
	}
}

function loadAnswer() {
	var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, a = restoreAnswer();
	if (null != a) {
		for (localStorage["wjxfirstloadtime"] && (lastCostTime = localStorage["wjxtempanswerdat"] - localStorage["wjxfirstloadtime"], localStorage["wjxlastcosttime"] && (lastCostTime += parseInt(localStorage["wjxlastcosttime"])), localStorage.setItem("wjxlastcosttime", lastCostTime)), isLoadingAnswer = !0, b = localStorage["wjxsavepage"], c = 0; c < a.length; c++)
			if (d = a[c]._topic, e = a[c]._value, e && (f = $("#div" + d), "none" != f[0].style.display)) switch (cur_page = f[0].pageIndex || 0, g = $(f).attr("type")) {
				case "1":
					h = $("input", f), h.val(e).trigger("blur"), h.parent().hasClass("getLocalBtn") && h.parent().prev().text(e).show();
					break;
				case "2":
					$("textarea", f).val(e).trigger("blur");
					break;
				case "3":
					i = e.split(spChars[2]), $("input", f).each(function() {
						if ("radio" == this.type && this.value == i[0]) {
							if (i[1]) {
								var a = $(this).attr("rel");
								a && $("#" + a).val(i[1])
							}
							f[0].prevRadio = this, $(this.parentNode.parentNode).trigger("click")
						}
					});
					break;
				case "4":
					j = e.split(spChars[3]), $("input", f).each(function() {
						var a, b, c, d;
						if ("checkbox" != this.type) return !0;
						for (a = this.value, b = 0; b < j.length; b++)
							if (c = j[b].split(spChars[2]), c[0] == a) {
								c[1] && (d = $(this).attr("rel"), d && ($("#" + d).val(c[1])[0].pvalue = c[1])), $(this.parentNode.parentNode).trigger("click");
								break
							}
					});
					break;
				case "5":
					$(".rate-off", f).each(function() {
						this.getAttribute("val") == e && $(this).parent().trigger("click")
					});
					break;
				case "7":
					$("select", f).val(e).trigger("change");
					break;
				case "11":
					j = e.split(","), $("input", f).each(function() {
						var a, b, c, d;
						if ("hidden" != this.type) return !0;
						for (a = this.value, b = 0; b < j.length; b++)
							if (c = j[b].split(spChars[2]), c[0] == a) {
								c[1] && (d = $(this).attr("rel"), d && ($("#" + d).val(c[1])[0].pvalue = c[1])), $(this.parentNode).trigger("click");
								break
							}
					});
					break;
				case "8":
					k = $("input", f), k.val(e), l = f.attr("hasjump"), l && $(k).trigger("change");
					break;
				case "21":
					for (j = e.split(spChars[3]), m = $("input", f), n = 0; n < j.length; n++) o = j[n].split(spChars[2]), p = parseInt(o[0]) - 1, $(m[p]).val(o[1]);
					updateCart(f);
					break;
				case "12":
				case "9":
					for (q = e.split(spChars[2]), r = new Object, n = 0; n < q.length; n++) s = q[n].split(spChars[4]), 2 == s.length && (r[s[0]] = s[1]);
					l = f.attr("hasjump"), $("input", f).each(function(a) {
						var c, d, e, b = $(this);
						return "12" == g && window.hasReferClient && (c = this.parentNode.parentNode.parentNode, c && "none" == c.style.display) ? !0 : (d = b.attr("rowid"), d ? (e = r[d], b.val(e)) : b.val(q[a]), "指定选项" == b.attr("verify") && b.val() && b.next().find("select").val(b.val()).trigger("change"), $(b).trigger("change"), void 0)
					});
					break;
				case "13":
					f[0].fileName = e || "", e && $(".uploadmsg", f).html("文件已经成功上传！");
					break;
				case "10":
					for (q = e.split(spChars[2]), r = new Object, n = 0; n < q.length; n++) s = q[n].split(spChars[4]), 2 == s.length && (r[s[0]] = s[1]);
					t = "input", u = !1, "1" == f.attr("select") && (t = "select", u = !0), l = f.attr("hasjump"), $("table", f).each(function() {
						var b, c, d, e, g, a = this;
						return (window.hasReferClient || f.attr("zizeng")) && (b = a.parentNode, b && "none" == b.style.display) ? !0 : (c = a.parentNode.getAttribute("rowid"), d = r[c], e = d.split(spChars[3]), g = 0, $(t, this).each(function() {
							this.value = e[g] || "", u ? $(this).trigger("change") : l && $(this).trigger("change"), g++
						}), void 0)
					});
					break;
				case "6":
					for (q = e.split(","), r = new Object, n = 0; n < q.length; n++) s = q[n].split(spChars[4]), 2 == s.length && (r[s[0]] = s[1]);
					for (v = $(f).attr("ischeck"), w = $("table.matrix-rating", f), x = w[0].rows, n = 0; n < x.length; n++) y = x[n], z = y.getAttribute("tp"), "d" == z && (window.hasReferClient && "none" == y.style.display || (A = parseInt(y.getAttribute("rowindex")) + 1, s = q[A], $(".rate-off", y).each(function() {
						var b, c, d, a = $(this).attr("dval");
						if (v)
							for (b = r[A].split(";"), c = 0; c < b.length; c++) d = b[c].split(spChars[2]), a == d[0] && (d[1] && (this.fillvalue = d[1]), $(this).trigger("click"));
						else b = r[A].split(spChars[2]), a == b[0] && (b[1] && (this.fillvalue = b[1]), $(this).trigger("click"))
					})))
			}
			cur_page = 0, b && b >= cur_page + 1 && (pageHolder[0].style.display = "none", cur_page = b - 1, localStorage.setItem("wjxsavepage", b), show_next_page()), isLoadingAnswer = !1
	}
}

function needTip() {
	if (window.divTip && "" == divTip.style.display) {
		$("img", divTip)[0] && (divTip.style.background = "none", divTip.style.color = "#333");
		var a = $.trim($(divTip).text());
		if (a) return !0
	}
	return !1
}

function checkAnswer() {
	if (window.needSaveJoin) loadAnswer();
	else if (window.localStorage && !needTip()) {
		var a = restoreAnswer();
		a && $("#divLoadAnswer").show()
	}
}

function hideAward() {
	confirmnew("确认不再领取吗？", function() {
		window.localStorage && (vkey = "award_" + activityId, localStorage.removeItem(vkey), localStorage.removeItem(vkey + "name"), localStorage.removeItem(vkey + "tip")), $("#divContent").show().prev().hide(), initSlider()
	})
}

function processAward() {
	var b, c, d, e, f, a = "join_" + activityId;
	document.cookie && -1 != document.cookie.indexOf(a + "=") && (a = "award_" + activityId, b = "", c = "", window.localStorage && (b = localStorage[a], c = localStorage[a + "name"]), b && 0 == b.indexOf("http") && (d = localStorage[a + "tip"], e = "", d && (e = " onclick='alert(\"" + d + "\");return true;' "), f = "<div style='margin:10px 12px;'>恭喜您抽中了" + c + "，如已领取请忽略！<br/><div style='text-align:center;'><a href='" + b + "'" + e + " class='button white' target='_blank' style='color:#fff; background:#e87814;'>立即领取</a></div><div style='margin-top:18px;text-align:center;'><a href='javascript:' onclick='hideAward();' style='color:#666;font-size:14px;'>不领取，重新填写问卷</a></div></div>", $("#divContent").before(f), $("#divContent").hide()))
}

function postHeight() {
	var a, b;
	if (window != window.top) try {
		if (a = parent.postMessage ? parent : parent.document.postMessage ? parent.document : null, null != a) return b = $("body").height(), a.postMessage("heightChanged," + b, "*")
	} catch (c) {}
}

function saveMatrixFill(a, b) {
	var c, d, e, f;
	window.needSaveJoin && (c = a.parentNode.parentNode, d = c.getAttribute("fid"), d && (e = "", b ? $(".rate-on", c).each(function() {
		if (e && (e += ";"), e += $(this).attr("dval"), this.fillvalue) {
			var a = replace_specialChar(this.fillvalue).replace(/;/g, "；").replace(/,/g, "，");
			e += spChars[2] + a
		}
	}) : (e = $(a).attr("dval"), a.fillvalue && (f = replace_specialChar(a.fillvalue).replace(/;/g, "；").replace(/,/g, "，"), e += spChars[2] + f)), $("#" + d).val(e)))
}

function saveLikert(a) {
	var b = $("a.rate-on", a);
	0 == b.length ? $("input:hidden", a).val("") : $("input:hidden", a).attr("value", $(b[b.length - 1]).attr("val"))
}

function setTableWidth(a) {
	var b, c, d, e;
	"none" != $(a)[0].style.display && "6" == $(a).attr("type") && (b = $("table.matrix-rating", a), 1 != langVer && b[0] && b[0].rows[0] && b[0].rows[0].cells.length <= 11 || (c = b.outerWidth(), d = parseInt($(a).css("marginLeft")) + parseInt($(a).css("paddingLeft")), e = $("#divContent").outerWidth() - 2 * d, c > e && (b.parent("div").css({
		width: e,
		"overflow-x": "auto",
		"-webkit-overflow-scrolling": "touch"
	}), b.find("th").css("padding", "5px 8px"), b[0].addEventListener("touchmove", function() {
		$("#divMatrixHeader").hide()
	}, !1))))
}

function initRate(a, b) {
	$(".rate-off", a).parent().bind("click", function(c) {
		var f, g, h, i, j, k, l, d = $(a).attr("ischeck"),
			e = $("a", this)[0];
		d ? (f = !0, g = $(a).attr("maxvalue"), g && !$(e).hasClass("rate-on") && (h = $("a.rate-on", this.parentNode), g - h.length <= 0 && (f = !1)), f && ($(e).toggleClass("rate-on"), $(e).toggleClass("rate-onchk"), $(e).trigger("change"))) : CheckMax(e, b) && (i = $(this.parentNode).find("a.rate-off"), i.removeClass("rate-on"), j = $(e).attr("mode"), j ? (i.removeClass("rate-on" + j), k = e, i.each(function() {
			return $(this).toggleClass("rate-on"), $(this).toggleClass("rate-on" + j), this == k ? !1 : void 0
		})) : ($(e).toggleClass("rate-on"), $(e).text() || (i.removeClass("rate-ontxt"), $(e).toggleClass("rate-ontxt"))), $(e).trigger("change")), $(e).hasClass("rate-on") && (j = $(e).attr("mode"), j || (l = $(e).attr("needfill"), l && !isLoadingAnswer && (showMatrixFill(e), c.stopPropagation())), showMatrixHeader(e, a)), "5" == a.attr("type") && displayRelationByType(a, "a.rate-off", 4), jump(a, e), "1" == a.attr("req") || d || addClearHref(a), $("span.error", a).is(":visible") && validateQ(a), b ? saveMatrixFill(e, d) : saveLikert(a, this), saveAnswer(a), ("6" == a.attr("type") && !d && 0 == popUpindex || "5" == a.attr("type") && 0 == itempopUpindex) && processSamecount(a, this), c.preventDefault()
	})
}

function processSamecount(a, b) {
	var c, d, e, f, g, h, i;
	if (window.IsSampleService)
		if (c = $("a.rate-off", b), "6" == a.attr("type")) {
			for (d = c.eq(0).attr("dval"), e = $("a.rate-off", a), f = 0, g = 0; g < e.length; g++)
				if (e.eq(g).attr("dval") == d && e.eq(g).hasClass("rate-on") && f++, f > 4) {
					popUpindex++, alertNew("你有连续多个答案相同，如果你是随意答题，请返回修改，以免答卷提交后无法通过审核");
					break
				}
		} else
	if ("5" == a.attr("type"))
		for (d = c.eq(0).attr("val"), h = parseInt(a.attr("id").replace("div", "")) - 1, f = 0, g = h; g >= 1 && (i = $("#div" + g), "5" == i.attr("type")); g--)
			if (e = $("a.rate-off", i), e.eq(d - 1).attr("val") == d && e.eq(d - 1).hasClass("rate-on") && f++, f > 3) {
				itempopUpindex++, alertNew("你有连续多个答案相同，如果你是随意答题，请返回修改，以免答卷提交后无法通过审核");
				break
			}
}

function updateCart(a) {
	var g, h, i, j, k, l, m, b = $("#divQuestion"),
		c = "",
		d = 0,
		e = 0,
		f = null;
	if (shopArray.length > 0) {
		for (g = "", h = 0; h < shopArray.length; h++) "none" != shopArray[h].style.display && (i = $(shopArray[h]).attr("id"), g && (g += ","), g += "#" + i);
		g && (j = $(g), f = $(".shop-item", j))
	} else f = $(".shop-item", b);
	f && (f.each(function() {
		var h, i, j, k, f = $(".itemnum", this),
			g = parseInt(f.val());
		return 0 == g ? !0 : (h = $(".item_name", this).html(), i = $(".item_price", this).attr("price"), j = g * parseFloat(i), k = '<li class="productitem"><span class="fpname">' + h + '</span><span class="fpnum">' + g + '</span><span class="fpprice">￥' + toFixed0d(j) + "</span></li>", c += k, d += j, e += g, void 0)
	}), k = 0, l = $(a).find(".shop-item"), m = l.length, l.each(function(a) {
		var f, g, h, c = $(".itemnum", this),
			d = parseInt(c.val());
		$(".item_name", this).html(), f = $(".item_price", this).attr("price"), g = d * parseFloat(f), k += g, m == a + 1 && (h = toFixed0d(k, 2), $(this).nextAll(".li_price").find(".theTotalPrice").html("￥" + h))
	}), c = "<ul class='productslist'><li><span class='fpname' style='font-weight:bold; font-size:14px; padding-bottom:16px;'>结算清单</span></li>" + c + '<li class="productitem"><span class="fpname"></span><span class="fpnum" style="color:#333">总金额</span><span class="fpprice" style="color:#de6752;font-size:19px">￥' + toFixed0d(d, 2) + "</span></li>" + "</ul>", $("#shopcart").html(c), d > 0 ? $("#shopcart").show() : $("#shopcart").hide(), saveAnswer(a))
}

function toFixed0d(a) {
	return a.toFixed(2).replace(".00", "")
}

function setVerifyCode() {
	tCode && "none" != tCode.style.display && (submit_text.value = validate_info_submit_title3, submit_text.onblur = function() {
		"" == submit_text.value && (submit_text.value = validate_info_submit_title3)
	}, submit_text.onfocus = function() {
		submit_text.value == validate_info_submit_title3 && (submit_text.value = "")
	}, imgCode.style.display = "none", submit_text.onclick = function() {
		var a, b, c;
		needAvoidCrack || "none" != imgCode.style.display ? needAvoidCrack && !imgVerify && (a = $("#divCaptcha")[0], a.style.display = "", imgVerify = a.getElementsByTagName("img")[0], imgVerify.style.cursor = "pointer", imgVerify.onclick = function() {
			var a = new Date,
				b = a.getTime() + 6e4 * a.getTimezoneOffset(),
				c = window.location.host || "www.sojump.com",
				d = "//" + c + "/botdetect/" + activityId + ".aspx?get=image&c=" + this.captchaId + "&t=" + this.instanceId + "&d=" + b;
			this.src = d
		}, b = imgVerify.getAttribute("captchaid"), c = imgVerify.getAttribute("instanceid"), imgVerify.captchaId = b, imgVerify.instanceId = c, imgVerify.onclick()) : (imgCode.style.display = "", imgCode.onclick = refresh_validate, imgCode.onclick(), imgCode.title = validate_info_submit_title1)
	})
}

function fixBottom() {
	var a, b, c, d, e;
	$("#spanPower").click(function() {
		window.location.href = "https://www.wjx.cn/mobile/index.aspx"
	}), postHeight(), a = $("body").outerHeight(), b = document.documentElement.clientHeight, c = $("#divPowerBy"), d = c.height(), c.hasClass("fixedbottom") || (d = 0), e = a + d - b, 0 > e ? c.addClass("fixedbottom") : c.removeClass("fixedbottom")
}

function validate(a) {return 1;
	function d(a, b) {
		var c;
		return function() {
			var e = this,
				f = arguments,
				g = function() {
					a.apply(e, f)
				};
			clearTimeout(c), c = setTimeout(g, b)
		}
	}
	var c, b = !0;
	return firstError = null, firstMatrixError = null, curMatrixError = null, isValidating = !0, $(".field:visible").each(function() {
		var c, d, a = pageHolder[cur_page].hasExceedTime;
		return a ? !0 : (c = $(this), d = validateQ(c), d || (b = !1), void 0)
	}), hlv = "1", b ? ($(a).removeClass("fixed-style"), $(window).unbind("scroll"), lastFixedObj = null) : firstError && ($("html, body").animate({
		scrollTop: $(firstError).offset().top
	}, 600), c = d(function() {
		var b = $(this).scrollTop(),
			c = $(document).height(),
			d = $(this).height(),
			e = parseInt(b) + parseInt(d);
		e > c - 100 ? $(a).removeClass("fixed-style") : $(a).addClass("fixed-style")
	}, 300), $("body").height() > $(window).height() + 100 && ($(window).on("scroll", c), lastFixedObj = a)), isValidating = !1, b
}

function openCityBox(a, b, c, d) {
	var e, f, g, h;
	if (txtCurCity = a, e = "", d = d || "", f = 400, 3 == b) g = a.getAttribute("province"), h = "", g && (h = "&pv=" + encodeURIComponent(g)), e = "/joinnew/setcitycountymobo2.aspx?activityid=" + activityId + "&ct=" + b + h + "&pos=" + d, f = 300;
	else if (4 == b) g = a.getAttribute("province"), h = "", g && (h = "&pv=" + encodeURIComponent(g)), e = "/joinnew/school.aspx?activityid=" + activityId + "&ct=" + b + h + "&pos=" + d;
	else if (5 == b) e = "/joinnew/setmenusel.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d;
	else if (6 == b) {
		if (e = "/wjx/join/amap.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, "1" == $(a).attr("needonly") && (e += "&nc=1", a.value)) return $(a.parentNode.parentNode).find(".errorMessage").html("提示：定位后无法修改。"), void 0
	} else e = "/joinnew/setcitymobo2.aspx?activityid=" + activityId + "&ct=" + b + "&pos=" + d, f = 250;
	a.blur(), openDialogByIframe(400, f, e)
}

function showItemDesc(a, b, c) {
	var g, h, i, e = document.getElementById(c),
		f = $.trim(e.innerHTML);
	0 == f.indexOf("http") ? openDialogByIframe(a, b, f, !0) : (e.style.display = "", e.style.width = Math.min($(window).width(), 400) - 50 + "px", g = e.offsetHeight + 20, e.style.display = "none", h = $(window).height() - 30, i = !0, h > g && g > 30 && (b = g, i = !1), openDialogByIframe(a, b, c, i))
}

function setCityBox(a, b) {
	if (txtCurCity.value = a, b && a && $(txtCurCity).parent().hasClass("getLocalBtn") && $(txtCurCity).parent().prev().text(a).show(), $("#yz_popTanChuClose").click(), window.needSaveJoin) {
		var c = $(txtCurCity).parents(".field");
		saveAnswer(c)
	}
}

function getRname(a, b, c) {
	var d, e, f, g, h, i, j, k, l, m, n;
	if (!rName && !$(b).attr("ceshi"))
		if ("9" != a) - 1 != c.indexOf("姓名") && ("1" == a ? rName = $("input", b).val() : "2" == a && c.length <= 5 && (rName = $("textarea", b).val()));
	else if (d = b[0].getElementsByTagName("td"), d.length > 0) {
		for (e = 0; e < d.length; e++)
			if (d[e].innerHTML.indexOf("姓名") > -1 || d[e].innerHTML.indexOf("姓") > -1 && d[e].innerHTML.indexOf("名") > -1) {
				f = d[e].parentNode.id, g = "t" == f.charAt(f.length - 1), h = null, h = g ? $(d[e].parentNode).next().find("input") : d[e].parentNode.getElementsByTagName("input"), h[0] && (rName = h[0].value);
				break
			}
	} else if (i = b[0].innerHTML.indexOf("姓名"), j = b[0].innerHTML.indexOf("姓"), k = b[0].innerHTML.indexOf("名"), i > -1 || j > -1 && k > -1)
		for (-1 == i && (i = k), l = b[0].getElementsByTagName("input"), e = 0; e < l.length; e++)
			if (m = l[e].id, n = b[0].innerHTML.indexOf(m), n > i) {
				rName = l[e].value;
				break
			}
}

function getM(a, b, c) {
	var d, e;
	1 == cqType && "1" == a && (modata || (-1 != c.indexOf("手机") || -1 != c.indexOf("联系方式")) && (d = $("input", b).val(), e = /^\d{11}$/, e.exec(d) && (modata = d)))
}

function getGender(a, b, c, d) {
	"3" == a && -1 != c.indexOf("性别") && d.each(function() {
		if (this.checked) {
			var b = $(this.parentNode.parentNode).find(".label").html();
			return b.indexOf("男") > -1 ? gender = 1 : b.indexOf("女") > -1 && (gender = 2), !1
		}
	})
}

function getMarriage(a, b, c, d) {
	"3" == a && -1 != c.indexOf("婚姻") && (marriage || d.each(function() {
		if (this.checked) {
			var b = $(this.parentNode.parentNode).find(".label").html();
			return b.indexOf("未婚") > -1 ? marriage = 1 : (b.indexOf("已婚") > -1 || b.indexOf("离异") > -1) && (marriage = 2), !1
		}
	}))
}

function getEducation(a, b, c, d) {
	"3" == a && (-1 != c.indexOf("学历") || -1 != c.indexOf("学位")) && (education || d.each(function() {
		if (this.checked) {
			var b = $(this.parentNode.parentNode).find(".label").html();
			return b.indexOf("硕士") > -1 || b.indexOf("博士") > -1 || b.indexOf("研究生") > -1 ? education = 5 : b.indexOf("本科") > -1 ? education = 4 : b.indexOf("大专") > -1 || b.indexOf("专科") > -1 ? education = 3 : b.indexOf("高中") > -1 || b.indexOf("中专") > -1 || b.indexOf("职高") > -1 ? education = 2 : (b.indexOf("初中") > -1 || b.indexOf("小学") > -1) && (education = 1), !1
		}
	}))
}

function checkJpMatch(a, b) {
	var c, d, e;
	if (!jpmatch && !b.hasCheck) return b.hasCheck = !0, c = $("div.field-label", b).html(), (d = matchJp(c)) ? (jpmatch = d, void 0) : (("3" == a || "4" == a) && (e = $("div.label", b), e.each(function() {
		var b = this.innerHTML;
		return d = matchJp(b), d ? (jpmatch = d, !1) : void 0
	})), void 0)
}

function checkTitleDescMatch() {
	var a = document.title || "",
		b = $("#divDesc").text(),
		c = matchJp(a + b);
	return c ? (jpmatch = c, void 0) : void 0
}

function matchJp(a) {
	var b, c;
	for (b = 0; b < jpkeyword.length; b++)
		if (c = jpkeyword[b], a && a.indexOf(c) > -1) return 1;
	for (b = 0; b < enkeyword.length; b++)
		if (c = enkeyword[b], a && a.indexOf(c) > -1) return 2;
	for (b = 0; b < enhighkeyword.length; b++)
		if (c = enhighkeyword[b], a && a.indexOf(c) > -1) return 3;
	for (b = 0; b < enmiddlekeyword.length; b++)
		if (c = enmiddlekeyword[b], a && a.indexOf(c) > -1) return 4;
	for (b = 0; b < enmiddlexiaokeyword.length; b++)
		if (c = enmiddlexiaokeyword[b], a && a.indexOf(c) > -1) return 5;
	for (b = 0; b < enxiaokeyword.length; b++)
		if (c = enxiaokeyword[b], a && a.indexOf(c) > -1) return 6;
	for (b = 0; b < enyouerkeyword.length; b++)
		if (c = enyouerkeyword[b], a && a.indexOf(c) > -1) return 7;
	for (b = 0; b < enforeinkeyword.length; b++)
		if (c = enforeinkeyword[b], a && a.indexOf(c) > -1) return 8;
	for (b = 0; b < enninekeyword.length; b++)
		if (c = enninekeyword[b], a && a.indexOf(c) > -1) return 9;
	for (b = 0; b < entenkeyword.length; b++)
		if (c = entenkeyword[b], a && a.indexOf(c) > -1) return 10;
	for (b = 0; b < en11keyword.length; b++)
		if (c = en11keyword[b], a && a.indexOf(c) > -1) return 11;
	for (b = 0; b < en12keyword.length; b++)
		if (c = en12keyword[b], a && a.indexOf(c) > -1) return 12;
	for (b = 0; b < en13keyword.length; b++)
		if (c = en13keyword[b], a && a.indexOf(c) > -1) return 13;
	for (b = 0; b < en14keyword.length; b++)
		if (c = en14keyword[b], a && a.indexOf(c) > -1) return 14;
	for (b = 0; b < en15keyword.length; b++)
		if (c = en15keyword[b], a && a.indexOf(c) > -1) return 15;
	for (b = 0; b < en16keyword.length; b++)
		if (c = en16keyword[b], a && a.indexOf(c) > -1) return 16;
	return 0
}

function getAge(a, b, c, d) {
	var e, f, g, h, i;
	("3" == a || "7" == a) && -1 != c.indexOf("年龄") && (e = "", f = 0, 3 == a ? d.each(function(a) {
		return this.checked ? (e = $(this.parentNode.parentNode).find(".label").html(), f = a, !1) : void 0
	}) : 7 == a && (g = $("select", b)[0], e = g.options[g.selectedIndex].text, f = g.selectedIndex - 1), e && (h = /[1-9][0-9]*/g, i = e.match(h), i && 0 != i.length && (i.length > 2 || (2 == i.length ? (startAge = i[0], endAge = i[1]) : 1 == i.length && (0 == f ? endAge = i[0] : startAge = i[0])))))
}

function getAnswer(a, b, c, d) {
	var f, g, h, i, j, k, l, m, n, e = 0;
	switch (c) {
		case "1":
			if (!d) {
				b._value = "(跳过)", "1" == a.attr("hrq") && (b._value = "Ⅳ");
				break
			}
			f = $("input", a), g = $.trim(f.val()), !g && "1" == a.attr("req") && f[0] && f[0].svalue && (g = f[0].svalue), g && f[0].lnglat && (g = g + "[" + f[0].lnglat + "]"), b._value = replace_specialChar(g);
			break;
		case "2":
			if (!d) {
				b._value = "(跳过)", "1" == a.attr("hrq") && (b._value = "Ⅳ");
				break
			}
			f = $("textarea", a), g = $.trim(f.val()), !g && "1" == a.attr("req") && f[0] && f[0].svalue && (g = f[0].svalue), g && f[0].lnglat && (g = g + "[" + f[0].lnglat + "]"), b._value = replace_specialChar(g);
			break;
		case "3":
			if (!d) {
				b._value = "-3", "1" == a.attr("hrq") && (b._value = "-4");
				break
			}
			$("input[type='radio']:checked", a).each(function() {
				b._value = $(this).val();
				var c = $(this).attr("rel");
				return c && $("#" + c).val().length > 0 && (b._value += spChars[2] + replace_specialChar($("#" + c).val().substring(0, 3e3))), !1
			});
			break;
		case "4":
			if (!d) {
				b._value = "-3", "1" == a.attr("hrq") && (b._value = "-4");
				break
			}
			h = 0, $("input:checked", a).each(function() {
				var c, a = "none" == this.parentNode.parentNode.style.display;
				a || (h > 0 && (b._value += spChars[3]), b._value += $(this).val(), c = $(this).attr("rel"), c && $("#" + c).val().length > 0 && (b._value += spChars[2] + replace_specialChar($("#" + c).val().substring(0, 3e3))), h++)
			}), 0 == h && (b._value = "-2");
			break;
		case "21":
			if (!d) {
				b._value = "-3";
				break
			}
			h = 0, $(".shop-item .itemnum", a).each(function(a) {
				var c = $(this).val();
				"0" != c && (h > 0 && (b._value += spChars[3]), b._value += a + 1, b._value += spChars[2] + c, h++)
			}), 0 == h && (b._value = "-2");
			break;
		case "11":
			for (i = new Array, $("li.ui-li-static", a).each(function() {
				var b, c, e, a = $(this).find("span.sortnum").html();
				"none" == this.style.display && (a = ""), b = new Object, b.sIndex = a, c = $(this).find("input:hidden").val(), e = $(this).find("input.OtherText"), e.length > 0 && e.val().length > 0 && (c += spChars[2] + replace_specialChar(e.val().substring(0, 3e3))), d ? a || (c = "-2") : c = "-3", b.val = c, b.sIndex || (b.sIndex = 1e4), i.push(b)
			}), i.sort(function(a, b) {
				return a.sIndex - b.sIndex
			}), j = 0; j < i.length; j++) j > 0 && (b._value += ","), b._value += i[j].val;
			break;
		case "5":
			if (!d) {
				b._value = "-3";
				break
			}
			b._value = $("input:hidden", a).val();
			break;
		case "6":
			e = 0, $("input:hidden", a).each(function(c) {
				var f, g, h, i, j, k, l;
				e > 0 && (b._value += ","), f = !1, g = c + 1, window.hasReferClient && (h = $(a).attr("id"), i = b._topic, h && (j = h.replace("div", ""), parseInt(j) == j && i != j && (i = j)), k = document.getElementById("drv" + i + "_" + (c + 1)), k && "none" == k.style.display ? f = !0 : !k && questionsObject[b._topic] && (f = !0)), b._value += g + spChars[4], d ? (l = $(this).val(), l || (l = "-2"), f && (l = "-4"), b._value += l) : b._value += "-3", e++
			});
			break;
		case "7":
			if (!d) {
				b._value = "-3";
				break
			}
			b._value = $("select", a).val();
			break;
		case "8":
			if (!d) {
				b._value = "(跳过)";
				break
			}
			b._value = $("input.ui-slider-input", a).val();
			break;
		case "9":
			if (e = 0, !d && "1" == a.attr("hrq")) {
				b._value = "Ⅳ";
				break
			}
			k = $("input", a), "1" == a.attr("randomrow") && (l = a.attr("topic"), k = k.toArray().sort(function(a, b) {
				var c = $(a).attr("id").replace("q" + l + "_", ""),
					d = $(b).attr("id").replace("q" + l + "_", "");
				return c - d
			})), $(k).each(function() {
				var c, f, g, h;
				e > 0 && (b._value += spChars[2]), c = this.getAttribute("rowid"), c && (b._value += c + spChars[4]), f = $.trim($(this).val()), !f && "1" == a.attr("req") && this.svalue && (f = this.svalue), g = !1, window.hasReferClient && (h = this.parentNode.parentNode.parentNode, h && "TR" == h.tagName && "none" == h.style.display && (g = !0)), d ? g && (f = "Ⅳ") : f = "(跳过)", f && this.lnglat && (f = f + "[" + this.lnglat + "]"), b._value += replace_specialChar(f), e++
			});
			break;
		case "12":
			e = 0, $("input", a).each(function() {
				var a, c, f, g;
				e > 0 && (b._value += spChars[2]), a = !1, window.hasReferClient && (c = this.parentNode.parentNode.parentNode, c && "none" == c.style.display && (a = !0)), f = this.getAttribute("rowid"), f && (b._value += f + spChars[4]), g = $(this).val(), d ? a && (g = "Ⅳ") : g = "(跳过)", b._value += g, e++
			});
			break;
		case "13":
			if (!d) {
				b._value = "(跳过)";
				break
			}
			b._value = $(a)[0].fileName || "";
			break;
		case "10":
			e = 0, m = "input", n = "(跳过)", "1" == a.attr("select") && (m = "select", n = "-3"), $("table", a).each(function() {
				var f, g, h, i, c = this;
				e > 0 && (b._value += spChars[2]), f = 0, g = !1, (window.hasReferClient || a.attr("zizeng")) && (h = c.parentNode, h && "none" == h.style.display && (g = !0)), i = c.parentNode.getAttribute("rowid"), i && (b._value += i + spChars[4]), $(m, this).each(function() {
					var a, c;
					f > 0 && (b._value += spChars[3]), a = this, c = a.value, d ? g && (c = "Ⅳ") : c = n, c && a.lnglat && (c = c + "[" + a.lnglat + "]"), b._value += replace_specialChar(c), f++
				}), e++
			})
	}
}

function debugLog(a) {
	window.debug && window.debug.log && debug.log(a)
}

function groupAnswer(a) {
	var f, g, h, i, j, k, l, m, o, p, q, r, s, v, w, x, y, z, A, B, b = new Array,
		c = 0,
		d = new Object,
		e = 1;
	if (debugLog("获取题目答案"), allQArray.each(function() {
		var i, j, a = $(this),
			f = new Object,
			g = a.attr("type"),
			h = "none" != this.style.display;
		h && hasSkipPage && this.pageParent && this.pageParent.skipPage && (h = !1), this.isCepingQ && (h = !0), this.isChuangGuanQ && (h = !0), f._value = "", f._topic = getTopic(a), window.isKaoShi && window.randomMode && "1" != a.attr("nc") && (d[f._topic] = e, e++), b[c++] = f;
		try {
			i = $("div.field-label", a).html(), ("3" == g || "7" == g) && (j = null, "3" == g && (j = $("input[type='radio']", a)), getAge(g, a, i, j), "3" == g && (getGender(g, a, i, j), getMarriage(g, a, i, j), getEducation(g, a, i, j))), getRname(g, a, i), getM(g, a, i)
		} catch (k) {}
		getAnswer(a, f, g, h)
	}), 0 == b.length) return alertNew("提示：此问卷没有添加题目，不能提交！"), void 0;
	for (b.sort(function(a, b) {
		return a._topic - b._topic
	}), f = "", k = 0; k < b.length; k++) k > 0 && (f += spChars[1]), f += b[k]._topic, f += spChars[0], f += b[k]._value;
	debugLog("获取提交参数");
	try {
		if (window.isKaoShi && window.randomMode && d && window.localStorage && window.JSON) {
			if (g = localStorage.getItem("sortactivity"), g ? g += "," + activityId : g = activityId, g += "", h = g.split(","), i = 2, h.length > i) {
				for (j = h.length, k = 0; j - i > k; k++) l = h[0], h.splice(0, 1), localStorage.removeItem("sortorder_" + l);
				g = h.join(",")
			}
			localStorage.setItem("sortactivity", g), m = "sortorder_" + activityId, localStorage.setItem(m, JSON.stringify(d))
		}
	} catch (n) {}
	if (o = $("#form1").attr("action"), (o.indexOf("aliyun.wjx.cn") > -1 || o.indexOf("temp.wjx.cn") > -1) && (o = o.replace("aliyun.wjx.cn", window.location.host).replace("temp.wjx.cn", window.location.host)), p = o + "&starttime=" + encodeURIComponent($("#starttime").val()), q = window.sojumpParm, window.hasEncode || (q = encodeURIComponent(q)), window.sojumpParm && (p += "&sojumpparm=" + q), window.tparam && (p += "&tparam=1&sojumpparmext=" + encodeURIComponent(window.sojumpparmext)), window.Password && (p += "&psd=" + encodeURIComponent(Password)), window.PasswordExt && (p += "&pwdext=" + encodeURIComponent(PasswordExt)), window.hasMaxtime && (p += "&hmt=1"), window.initMaxSurveyTime && (p += "&mst=" + window.initMaxSurveyTime), tCode && "none" != tCode.style.display && "" != submit_text.value && (p += "&validate_text=" + encodeURIComponent(submit_text.value)), window.useAliVerify && (p += "&nc_csessionid=" + encodeURIComponent(nc_csessionid) + "&nc_sig=" + encodeURIComponent(nc_sig) + "&nc_token=" + encodeURIComponent(nc_token) + "&nc_scene=" + nc_scene + "&validate_text=geet"), window.cpid && (p += "&cpid=" + cpid), window.guid && (p += "&emailguid=" + guid), window.udsid && (p += "&udsid=" + window.udsid), window.fromsour && (p += "&fromsour=" + window.fromsour), window.isDingDing && (p += "&isdd=1", window.ddnickname && (p += "&ddnn=" + encodeURIComponent(window.ddnickname))), nvvv && (p += "&nvvv=1"), window.sjUser && (p += "&sjUser=" + encodeURIComponent(sjUser)), window.sjts && (p += "&sjts=" + sjts), window.sjsign && (p += "&sjsign=" + encodeURIComponent(sjsign)), window.FromSj && (p += "&fromsj=1"), window.outuser && (p += "&outuser=" + encodeURIComponent(outuser), window.outsign && (p += "&outsign=" + encodeURIComponent(outsign))), p += window.sourceurl ? "&source=" + encodeURIComponent(sourceurl) : "&source=directphone", r = window.alipayAccount || window.cAlipayAccount, r && (p += "&alac=" + encodeURIComponent(r)), window.SJBack && (p += "&sjback=1"), window.jiFen && jiFen > 0 && (p += "&jf=" + jiFen), a && (p += "&submittype=" + a), window.isChuangGuan && (hlv = "1"), 3 == a && (p += "&zbp=" + (cur_page + 1), needSubmitNotValid && (p += "&nsnv=1")), 2 == window.isChuangGuan && 1 == a && (hasChuGuanSuc || (p += "&hmt=1"), 0 == window.totalUseTime && (totalUseTime = 1), p += "&icg=1&tuti=" + totalUseTime), p += "&hlv=" + hlv, window.rndnum && (p += "&rn=" + encodeURIComponent(rndnum)), imgVerify && (p += "&btuserinput=" + encodeURIComponent(submit_text.value), p += "&btcaptchaId=" + encodeURIComponent(imgVerify.captchaId), p += "&btinstanceId=" + encodeURIComponent(imgVerify.instanceId)), window.inviteid && (p += "&inviteid=" + encodeURIComponent(inviteid)), window.access_token && window.openid && (p += "&access_token=" + encodeURIComponent(access_token), p += window.isQQLogin ? "&qqopenid=" + encodeURIComponent(openid) : "&openid=" + encodeURIComponent(openid)), window.wxUserId && (p += "&wxUserId=" + window.wxUserId), window.wxthird && (p += "&wxthird=1"), window.parterts && (p += "&parterts=" + parterts), window.parterjoiner && (p += "&parterjoiner=" + encodeURIComponent(parterjoiner)), window.partersign && (p += "&partersign=" + encodeURIComponent(partersign)), window.parterrealname && (p += "&parterrealname=" + encodeURIComponent(parterrealname)), window.parterextf && (p += "&parterextf=" + encodeURIComponent(parterextf)), window.parterdept && (p += "&parterdept=" + encodeURIComponent(parterdept)), window.isKaoShi && rName && (p += "&rname=" + encodeURIComponent(rName.replace("(", "（").replace(")", "）"))), window.relts && (p += "&relts=" + relts), window.relusername && (p += "&relusername=" + encodeURIComponent(relusername)), window.relsign && (p += "&relsign=" + encodeURIComponent(relsign)), window.relrealname && (p += "&relrealname=" + encodeURIComponent(relrealname)), window.reldept && (p += "&reldept=" + encodeURIComponent(reldept)), window.relext && (p += "&relext=" + encodeURIComponent(relext)), window.corpId && (p += "&corpId=" + encodeURIComponent(corpId)), lastCostTime && lastCostTime / 1e3 && (p += "&lct=" + parseInt(lastCostTime / 1e3)), window.isWeiXin && (p += "&iwx=1"), p += "&t=" + (new Date).valueOf(), $("#shopcart")[0] && "none" != $("#shopcart")[0].style.display && (p += "&ishop=1"), window.cProvince) {
		p += "&cp=" + encodeURIComponent(cProvince.replace("'", "")) + "&cc=" + encodeURIComponent(cCity.replace("'", "")) + "&ci=" + escape(cIp), s = cProvince + "," + cCity, window.location.host || "sojump.com";
		try {
			setCookie("ip_" + cIp, s, null, "/", "", null)
		} catch (u) {}
	}
	debugLog("准备提交到服务器"), $("#ctlNext").hide(), v = "处理中......", v = '<img src = "/images/wjxMobile/wait.gif" alt="">', $("#ValError").html(v), 3 == a && (v = "正在验证，请稍候...", 1 == langVer && (v = "Validating......"), $("#ValError").html(v)), clientAnswerSend = f, window.jqnonce && (p += "&ktimes=" + ktimes, p += "&jqnonce=" + encodeURIComponent(window.jqnonce), w = dataenc(window.jqnonce), p += "&jqsign=" + encodeURIComponent(w)), x = {
		submitdata: f
	}, y = !1, z = window.getMaxWidth || 1800, A = encodeURIComponent(f), window.submitWithGet && A.length <= z && (y = !0), debugLog("开始提交"), y ? (p += "&submitdata=" + A, p += "&useget=1") : window.submitWithGet && (window.postIframe = 1), B = "很抱歉，网络连接异常，请重新尝试提交！", 1 == langVer && (B = "Sorry,network error,please retry later."), window.postIframe ? (debugLog("postIframe"), postWithIframe(p, f)) : y ? (debugLog("ajaxget"), $.ajax({
		type: "GET",
		url: p,
		success: function(b) {
			afterSubmit(b, a)
		},
		error: function() {
			$("#ValError").html(B), $("#ctlNext").show()
		}
	})) : (debugLog("ajaxpost"), debugLog(p), debugLog(x), $.ajax({
		type: "POST",
		url: p,
		data: x,
		dataType: "text",
		success: function(b) {
			afterSubmit(b, a)
		},
		error: function(a) {
			$("#ValError").html(B), debugLog(JSON.stringify(a)), $("#ctlNext").show()
		}
	}))
}

function postWithIframe(a, b) {
	var d, c = document.createElement("div");
	c.style.display = "none", c.innerHTML = "<iframe id='mainframe' name='mainframe' style='display:none;' > </iframe><form target='mainframe' data-ajax='false' id='frameform' action='' method='post' enctype='application/x-www-form-urlencoded'><input  value='' id='submitdata' name='submitdata' type='hidden'><input type='submit' value='提交' ></form>", document.body.appendChild(c), document.getElementById("submitdata").value = b, d = document.getElementById("frameform"), d.action = a + "&iframe=1", d.submit()
}

function processError() {
	havereturn || (havereturn = !0, $("#ValError").html("提交超时，请检查网络是否异常！"), $("#ctlNext").show()), timeoutTimer && clearTimeout(timeoutTimer)
}

function addtolog() {
	var g, b = document.createElement("img"),
		c = window.isWeiXin ? 1 : 0,
		d = window.isVip ? 1 : 0,
		e = window.isQywx ? 1 : 0,
		f = window.LogStoreLocal ? "activityfinishtest" : "activityfinish";
	b.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/" + f + "/track.gif?APIVersion=0.6.0&activity=" + activityId + "&source=1&weixin=" + c + "&vip=" + d + "&qtype=" + cqType + "&qw=" + e, modata && (g = document.createElement("img"), modata = modata.substring(0, 3) + "****" + modata.substring(7, 11), g.src = "//sojump.cn-hangzhou.log.aliyuncs.com/logstores/sampledata/track.gif?APIVersion=0.6.0&activity=" + activityId + "&mob=" + modata + "&weixin=" + c + "&vip=" + d + "&qtype=" + cqType)
}

function afterSubmit(a, b) {
	var c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;
	if ($("#ValError").html(""), havereturn = !0, debugLog("提交成功"), c = a.split("〒"), d = c[0], clientAnswerSend && 10 != d && 11 != d && 3 != b) try {
		saveSubmitAnswer(clientAnswerSend)
	} catch (e) {}
	if (10 == d) return maxCheatTimes > 0 && (f = new Date, f.setTime(f.getTime() - 864e5), setCookie(activityId + "_" + "cheatTimes", 0, f.toUTCString(), "/", "", null)), g = c[1], h = g.replace("complete.aspx", "completemobile2.aspx").replace("?q=", "?activity=").replace("&joinid=", "&joinactivity=").replace("&JoinID=", "&joinactivity="), window.isDingDing && (h += "&dd_nav_bgcolor=FF5E97F6", window.ddcorpid && (h += "&ddpid=" + encodeURIComponent(ddcorpid))), window.isYdb && (h += "&ydb=1"), window.isPvw && (h += "&pvw=1"), window.isQywx && (h += "&qw=1"), "miniprogram" === window.__wxjs_environment && (h += "&minip=1"), window.corpId && (h += "&corpId=" + encodeURIComponent(corpId)), window.flist && (h += "&flist=1"), 2 == window.isChuangGuan && (h += window.hasChuGuanSuc ? "&hcgs=1" : "&hcgs=0"), startAge && (h += "&sa=" + encodeURIComponent(startAge)), endAge && (h += "&ea=" + encodeURIComponent(endAge)), gender && (h += "&ge=" + gender), marriage && (h += "&marr=" + marriage), education && (h += "&educ=" + education), jpmatch && (h += "&jpm=" + jpmatch), rName && (h += "&rname=" + encodeURIComponent(rName.replace("(", "（").replace(")", "）"))), window.parterrealname && (h += "&parterrealname=" + encodeURIComponent(window.parterrealname) + "&rname=" + encodeURIComponent(window.parterrealname)), window.parterdept && (h += "&parterdept=" + encodeURIComponent(parterdept)), window.parterextf && (h += "&parterextf=" + encodeURIComponent(parterextf)), window.wxUserId && $("#hrefGoBack2")[0] && (h += "&wxuserid=" + encodeURIComponent(window.wxUserId)), inviteid && (h += "&inviteid=" + encodeURIComponent(inviteid)), window.jbkid && (h += "&jbkid=" + jbkid), window.sourceurl && (h += "&source=" + encodeURIComponent(sourceurl)), window.sjUser && (h += "&sjUser=" + encodeURIComponent(sjUser)), window.sjts && (h += "&sjts=" + sjts), window.sjsign && (h += "&sjsign=" + encodeURIComponent(sjsign)), window.FromSj && (h += "&fromsj=1"), window.parterjoiner && (h += "&parterjoiner=" + encodeURIComponent(parterjoiner)), window.needHideShare && (h += "&nhs=1"), (window.isSimple || window.top != window) && (h += "&s=t"), window.sourcename && (h += "&souname=" + encodeURIComponent(sourcename)), window.user_token && (h += "&user_token=" + encodeURIComponent(window.user_token)), !window.wxthird && window.access_token && window.hashb && (h += "&access_token=" + encodeURIComponent(access_token) + "&openid=" + encodeURIComponent(openid)), window.isWeiXin && (f = new Date, f.setTime(f.getTime() + 18e5), setCookie("join_" + activityId, "1", f.toUTCString(), "/", "", null)), $("#shopcart")[0] && "none" != $("#shopcart")[0].style.display && (h += "&ishop=1"), clearAnswer(), addtolog(h), i = "提交成功！", 1 == langVer && (i = "Submitted successfully"), $("#ValError").html(i), setTimeout(function() {
		location.replace(h)
	}, 1500), void 0;
	if (11 == d) return j = c[1], j ? -1 == j.toLowerCase().indexOf("http://") && -1 == j.toLowerCase().indexOf("https://") && (j = "http://" + j) : j = window.location.href, k = c[3] || "", l = c[4] || "", m = !1, j.indexOf("{output}") > -1 && (window.sojumpParm ? j = j.replace("{output}", window.sojumpParm) : l && (j = j.replace("{output}", l)), m = !0), debugLog(j), (window.sojumpParm || l) && (n = k.split(","), o = "sojumpindex=" + n[0], o = j.indexOf("?") > -1 ? "&" + o : "?" + o, n[1] && (o += "&totalvalue=" + n[1]), n[2] && (o += "&valuesign=" + encodeURIComponent(n[2])), -1 == j.toLowerCase().indexOf("sojumpparm=") && !m && window.sojumpParm && (o += "&sojumpparm=" + window.sojumpParm), -1 == j.toLowerCase().indexOf("pingzheng=") && !m && l && (o += "&pingzheng=" + l), j += o), window.wxthird && window.openid && (j += j.indexOf("?") > -1 ? "&" : "?", j += "openid=" + encodeURIComponent(openid)), window.access_token && window.openid && j.toLowerCase().indexOf("ksres.aspx") > -1 && (n = k.split(","), o = "sojumpindex=" + n[0], o = j.indexOf("?") > -1 ? "&" + o : "?" + o, n[1] && (o += "&totalvalue=" + n[1]), n[2] && (o += "&valuesign=" + encodeURIComponent(n[2])), o += "&access_token=" + encodeURIComponent(access_token), o += "&openid=" + encodeURIComponent(openid), j += o), window.parterjoiner && (j += j.indexOf("?") > -1 ? "&" : "?", j += "parterjoiner=" + encodeURIComponent(parterjoiner)), j.indexOf("www.sojump.com") > -1 && (j = j.replace("/jq/", "/m/")), p = c[2], q = 1e3, p && 0 == window.jiFenBao && "不提示" != p && !window.sojumpParm && ($("#ValError").html(p), q = 2e3), debugLog(p), clearAnswer(), addtolog(j), setTimeout(function() {
		location.replace(j)
	}, q), debugLog("准备跳转"), void 0;
	if (3 == b) {
		if (12 == d) return to_next_page(), $("#ctlNext").show(), void 0;
		if (13 == d) return r = c[1], s = c[2] || "0", g = "/wjx/join/completemobile2.aspx?activity=" + activityId + "&joinactivity=" + r, g += "&v=" + s, window.isWeiXin && setCookie("join_" + activityId, "1", null, "/", "", null), window.sjUser && (g += "&sjUser=" + encodeURIComponent(sjUser)), window.sjts && (g += "&sjts=" + sjts), window.sjsign && (g += "&sjsign=" + encodeURIComponent(sjsign)), window.FromSj && (g += "&fromsj=1"), window.sourceurl && (g += "&source=" + encodeURIComponent(sourceurl)), window.u && (g += "&u=" + encodeURIComponent(window.u)), window.userSystem && (g += "&userSystem=" + encodeURIComponent(window.userSystem)), window.systemId && (g += "&systemId=" + encodeURIComponent(window.systemId)), clearAnswer(), location.replace(g), void 0;
		if (11 == d) return;
		if (5 == d) return alertNew(c[1]), void 0;
		if (c[2]) return alertNew(c[2]), $("#divNext").show(), void 0
	} else if (9 == d || 16 == d || 23 == d) t = parseInt(c[1]), u = t + 1 + "", v = c[2] || "您提交的数据有误，请检查！", alertNew(v), 23 == d && -1 == t || (questionsObject[u] && (writeError(questionsObject[u], v, 3e3), $(questionsObject[u])[0].scrollIntoView()), $("#ctlNext").show());
	else if (2 == d || 21 == d) alertNew(c[1]), window.submitWithGet = 1, $("#ctlNext").show();
	else {
		if (4 == d) return alertNew(c[1]), $("#ctlNext").show(), void 0;
		if (19 == d || 5 == d) return alertNew(c[1]), $("#ValError").html(c[1]), void 0;
		if (17 == d || 34 == d) return alertNew("密码冲突！在您提交答卷之前，此密码已经被另外一个用户使用了，请更换密码重新填写问卷！"), void 0;
		if (22 == d) return alertNew("提交有误，请输入验证码重新提交！"), needAvoidCrack || (tCode.style.display = "", imgCode.style.display = "", imgCode.onclick = refresh_validate, imgCode.onclick()), nvvv = 1, $("#ctlNext").show(), void 0;
		if (7 == d) return alertNew(c[1]), needAvoidCrack ? refresh_validate() : (tCode.style.display = "", imgCode.onclick || (imgCode.style.display = "", imgCode.onclick = refresh_validate), imgCode.onclick()), $("#ctlNext").show(), void 0;
		w = c[1] || a, alertNew(w), $("#ctlNext").show()
	}
	refresh_validate()
}

function clearFieldValue(a) {
	var b, c;
	if (!isLoadingAnswer)
		if (b = $(a).attr("type"), "3" == b) {
			if ("1" == $(a).attr("qingjing")) return;
			$("input[type='radio']:checked", $(a)).each(function() {
				this.checked = !1, $(this).parent().parent().find("a.jqradio").removeClass("jqchecked")
			}), $("input.OtherRadioText", $(a)).each(function() {
				this.value && $(this).val("").blur()
			})
		} else "4" == b ? $("input:checked", $(a)).each(function() {
			this.checked = !1, $(this).parent().parent().find("a.jqcheck").removeClass("jqchecked")
		}) : "6" == b || "5" == b ? ($("a.rate-off", $(a)).each(function() {
			$(this).removeClass("rate-on");
			var a = $(this).attr("mode");
			a ? $(this).removeClass("rate-on" + a) : $(this).removeClass("rate-ontxt")
		}), $("#divMatrixHeader").hide(), "5" == b && saveLikert(a)) : "7" == b ? "-2" != $("select", $(a)).val() && $("select", $(a)).val("-2").trigger("change") : "8" == b ? (c = $("input", $(a)), c.val() && c.val("").change()) : "9" == b ? $("input.ui-slider-input", $(a)).each(function() {
			this.value && $(this).val("").change()
		}) : "11" == b && $("li.ui-li-static", $(a)).each(function() {
			$(this).find("span.sortnum").html("").removeClass("sortnum-sel"), $(this).attr("check", "")
		})
}

function validateQ(a) {return 1;
	var h, i, j, k, l, m, n, o, p, q, b = $(a).attr("req"),
		c = $(a).attr("type"),
		d = !0,
		e = $(a)[0],
		f = "";
	if ($(a).attr("hasjump"), "1" == c) h = $("input", $(a)), i = replace_specialChar($.trim(h.val())), d = 0 == i.length ? !1 : !0, "密码" == $(h[0]).attr("verify") && (h[0].needCheckConfirm = !0), f = verifyTxt(a, h), !f && i && (h[0].svalue = i);
	else if ("21" == c && "1" == b) j = 0, $(".shop-item .itemnum", a).each(function() {
		var b = $(this).val();
		b && "0" != b && j++
	}), 0 == j && (d = !1);
	else if ("2" == c) h = $("textarea", $(a)), i = replace_specialChar($.trim(h.val())), d = 0 == i.length ? !1 : !0, f = verifyTxt(a, h), !f && i && (h[0].svalue = i);
	else if ("3" == c) d = !1, $(a).find("input:checked").each(function() {
		var b, c;
		return d = !0, -1 == this.getAttribute("jumpto") && (needSubmitNotValid = !0), b = $(this).attr("rel"), b && (c = $("#" + b), c.attr("required") && 0 == c.val().length) ? (f = "文本框内容必须填写！", 1 == langVer && (f = "Please enter a value."), writeError(a, f, 3e3), !1) : void 0
	});
	else if ("4" == c) d = !1, k = !1, $(a).find("input:checked").each(function() {
		var b, c;
		return d = !0, b = $(this).attr("rel"), b && (c = $("#" + b), c.attr("required") && 0 == c.val().length) ? (f = "文本框内容必须填写！", 1 == langVer && (f = "Please enter a value."), c.focus(), writeError(a, f, 3e3), k = !0, !1) : void 0
	}), k || (f = verifyCheckMinMax($(a), !0));
	else if ("11" == c) d = 0 == $("li.ui-li-static[check='1']", $(a)).length ? !1 : !0, k = !1, $("li.ui-li-static[check='1']", $(a)).each(function() {
		var b, c;
		return d = !0, b = $("input[type='hidden']", $(this)).eq(0).attr("id"), b && (c = $("#tq" + b), c.attr("required") && 0 == c.val().length) ? (f = "文本框内容必须填写！", 1 == langVer && (f = "Please enter a value."), c.focus(), writeError(a, f, 3e3), k = !0, !1) : void 0
	}), k || (f = verifyCheckMinMax($(a), !0, !0));
	else if ("5" == c) d = validateScaleRating($(a));
	else if ("6" == c) {
		if (f = validateMatrix($(a), b)) return writeError(a, f, 1e3), !1
	} else if ("7" == c) l = $("select", $(a))[0], d = 0 == l.selectedIndex ? !1 : !0, d && l.options[l.selectedIndex] && -1 == l.options[l.selectedIndex].getAttribute("jumpto") && (needSubmitNotValid = !0);
	else if ("8" == c) d = 0 == $("input", $(a)).val().length ? !1 : !0;
	else if ("9" == c) $("input", $(a)).each(function() {
		var e, b = $(this),
			c = replace_specialChar($.trim(b.val()));
		if (window.hasReferClient && (e = this.parentNode.parentNode.parentNode, e && "none" == e.style.display)) return !0;
		if (0 == c.length) {
			if (d = !1, "0" != b.attr("isrequir")) return !1;
			d = !0
		}
		return (f = verifyTxt(a, b, !0)) ? !1 : (f = checkOnly(a, b)) ? !1 : (b[0].svalue = c, void 0)
	});
	else if ("12" == c) {
		if (m = $(a).attr("total"), n = m, $("input", $(a)).each(function() {
			var b, c, a = $(this);
			return window.hasReferClient && (b = this.parentNode.parentNode.parentNode, b && "none" == b.style.display) ? !0 : (c = a.val(), 0 == c.length && (d = !1), c && (n -= c), void 0)
		}), 0 != n && (o = !1, n != m || b || (o = !0), !o)) return writeError(a, "", 3e3), !1
	} else "13" == c ? $(a)[0].fileName || (d = !1) : "10" == c && (p = "input", "1" == $(a).attr("select") && (p = "select"), q = !0, $("table", $(a)).each(function() {
		var e, c = $(this);
		return (window.hasReferClient || $(a).attr("zizeng")) && (e = this.parentNode, e && "none" == e.style.display) ? !0 : ($(p, c).each(function() {
			var c = $(this),
				e = c.val(),
				g = this.parentNode.parentNode;
			if (g && "none" != g.style.display) {
				if ((0 == e.length || "select" == p && "-2" == e) && "1" == b) return d = !1, a.errorControl = this, !1;
				if (f = verifyTxt(a, c, !0)) return a.errorControl = this, q = !1, !1
			}
		}), q ? void 0 : !1)
	}));
	return d || "1" != b ? ($("span.error", $(a)).hide(), $("div.field-label", $(a)).css("background", "")) : (f = "请回答此题", "1" == c || "2" == c ? f = "请输入内容" : "3" == c || "4" == c || "7" == c ? f = "请选择选项" : "13" == c ? f = "请上传文件" : "21" == c && (f = "请选择"), "6" == c && $(a)[0].isMatrixFillError && (f = "请注明原因"), 1 == langVer && (f = "required"), writeError(a, f, 1e3)), f ? !1 : (e.removeError && e.removeError(), !0)
}

function dataenc(a) {
	var c, d, e, b = ktimes % 100;
	for (ktimes >= 1e3 && (b = ktimes % 1e3), 0 == b && (b = 1), c = [], d = 0; d < a.length; d++) e = a.charCodeAt(d) ^ b, c.push(String.fromCharCode(e));
	return c.join("")
}

function show_prev_page() {
	var a, b, c, e, f, g, h, i, j;
	if (cur_page > 0 && pageHolder[cur_page - 1].hasExceedTime) return alertNew("上一页填写超时，不能返回上一页"), void 0;
	for (a = $("#divNext")[0], b = $("#divPrev")[0], pageHolder[cur_page].style.display = "none", a.style.display = "", $("#divSubmit").hide(), cur_page--, c = cur_page; c >= 0 && pageHolder[c].skipPage; c--) cur_page--;
	for (window.isKaoShi, c = cur_page; c >= 0; c--) {
		for (e = pageHolder[c].questions, f = !1, g = 0; g < e.length; g++)
			if (h = e[g], "none" != h.style.display) {
				f = !0;
				break
			}
		if (i = !1, !f && pageHolder[c].childNodes && pageHolder[c].childNodes.length > 0)
			for (j = pageHolder[c].cuts, j || (j = pageHolder[c].cuts = $(".cutfield", pageHolder[c])), g = 0; g < j.length; g++)
				if ("none" != j[g].style.display) {
					i = !0;
					break
				}
		if (f || i || !(cur_page > 0)) break;
		cur_page--
	}
	0 == cur_page && (b.style.display = "none"), pageHolder[cur_page].style.display = "", pageHolder[cur_page].scrollIntoView(), showProgress()
}

function show_next_page() {
	var b, a = $("#divNext a")[0];
	a && a.disabled && !isLoadingAnswer || validate($("#divNext")) && (b = "true" == $(pageHolder[cur_page]).attr("iszhenbie"), needSubmitNotValid && window.isRunning ? ($("#divNext").hide(), groupAnswer(3)) : b && window.isRunning ? ($("#divNext").hide(), groupAnswer(3)) : to_next_page())
}

function to_next_page() {
	var c, e, f, g, h, i, j, k, l, a = $("#divNext")[0],
		b = $("#divPrev")[0];
	for (b.style.display = displayPrevPage, pageHolder[cur_page].style.display = "none", cur_page++, 1 == cur_page && ($("#divDesc").hide(), $("#divPromote").hide()), c = cur_page; c < pageHolder.length && pageHolder[c].skipPage; c++) cur_page++;
	for (window.isKaoShi, c = cur_page; c < pageHolder.length; c++) {
		for (e = pageHolder[c].questions, f = !1, g = 0; g < e.length; g++)
			if (h = e[g], "none" != h.style.display) {
				f = !0;
				break
			}
		if (i = !1, !f && pageHolder[c].childNodes && pageHolder[c].childNodes.length > 0)
			for (j = pageHolder[c].cuts, j || (j = pageHolder[c].cuts = $(".cutfield", pageHolder[c])), g = 0; g < j.length; g++)
				if ("none" != j[g].style.display) {
					i = !0;
					break
				}
		if (f || i || !(cur_page < pageHolder.length - 1)) break;
		cur_page++
	}
	for (k = !0, c = cur_page + 1; c < pageHolder.length; c++) pageHolder[c].skipPage || (k = !1);
	cur_page >= pageHolder.length - 1 || k ? (a.style.display = "none", $("#divSubmit").show()) : cur_page < pageHolder.length - 1 && (a.style.display = ""), pageHolder[cur_page].style.display = "", initSlider(), l = document.getElementById("divMaxTime"), l && "" == l.style.display ? $("body,html").animate({
		scrollTop: 0
	}, 100) : pageHolder[cur_page].scrollIntoView(), showProgress(), window.hasPageTime && processMinMax(), 2 == window.isChuangGuan && ($("#divSubmit").hide(), timeLimit()), fixBottom(), $("#divMatrixHeader").hide(), adjustVideoHeight(pageHolder[cur_page])
}

function processSearch() {
	var a, b;
	document.referrer && (a = document.referrer, b = !1, (a.indexOf("baidu.com") > -1 || a.indexOf("google.com") > -1 || a.indexOf("so.360.cn") > -1 || a.indexOf(".so.com") > -1 || a.indexOf(".sogou.com") > -1 || a.indexOf(".soso.com") > -1 || a.indexOf(".haoso.com") > -1 || a.indexOf(".sm.cn") > -1) && (b = !0), b && $("#divSearch").show().html('<a href="https://www.wjx.cn/mobile/publicsurveys.aspx" style="color:#66beff;">搜索更多相关问卷模板</a>'))
}

function initSlider() {
	window.hasSlider && $(pageHolder[cur_page].questions).each(function() {
		var c, d, e, a = $(this),
			b = a.attr("type");
		("8" == b || "12" == b || "9" == b || "10" == b) && (c = getTopic(a), d = document.getElementById("divRef" + c), e = d && "" == d.style.display, e || setTimeout(function() {
				var b = $("input.ui-slider-input:visible", a);
				b.rangeslider({
					polyfill: !1
				})
			}, 10))
	})
}

function initqSlider(a) {
	var b, c, d;
	window.hasSlider && (b = $(a), c = b.attr("type"), d = "8" == c || "12" == c || "9" == c || "10" == c, d && initEleSlider(a))
}

function initEleSlider(a) {
	if (!a.hasInitSlider) {
		var b = $("input.ui-slider-input:visible", a);
		b.rangeslider && (b.rangeslider({
			polyfill: !1
		}), a.hasInitSlider = !0)
	}
}

function showProgress() {
	var a, b, c, d;
	1 != totalPage && (a = cur_page + 1, a > totalPage && (a = totalPage), b = a + "/" + totalPage, c = "页", 1 == langVer && (c = " Page"), $(".pagepercent").html(b + c), d = 100 * a / totalPage, $(".pagebar").width(d + "%"))
}

function verifyCheckMinMax(a, b, c, d) {
	var h, i, j, e = a.attr("minvalue"),
		f = a.attr("maxvalue"),
		g = a[0];
	if (0 == e && 0 == f) return "";
	if (h = 0, h = c ? $("li.ui-li-static[check='1']", a).length : $("input:checked", a).length, 0 != h || a.attr("req")) {
		if (i = "", 0 == langVer && (i = "&nbsp;&nbsp;&nbsp;您已经选择了" + h + "项"), j = !0, f > 0 && h > f) {
			if (d) return 0 == langVer && alertNew("此题最多只能选择" + f + "项"), 11 == a.attr("type") && "text" == $(d)[0].type ? $(d).parent().parent().trigger("click") : $(d).trigger("click"), "";
			0 == langVer ? i += ",<span style='color:red;'>多选择了" + (h - f) + "项</span>" : i = validate_info + validate_info_check4 + f + type_check_limit5, j = !1
		} else e > 0 && e > h && (0 == langVer ? i += ",<span style='color:red;'>少选择了" + (e - h) + "项</span>" : i = validate_info + validate_info_check5 + e + type_check_limit5, j = !1, !c && 1 == h && $("input:checked", a).parents(".ui-checkbox").hasClass("huchi") && (j = !0));
		return g.errorMessage || (g.errorMessage = $(".errorMessage", a)[0]), j ? (g.errorMessage.innerHTML = "", "") : (b ? writeError(a[0], i, 3e3) : g.errorMessage.innerHTML = i, i)
	}
}

function checkOnly(a, b) {
	var f, g, h, i, j, k, l, c = $(b),
		d = c[0],
		e = c.attr("needonly");
	return e ? "地图" == c.attr("verify") ? "" : (f = c.val()) ? f.length > 50 ? "" : (g = getTopic(a), h = c.attr("rowid"), h ? g = 1e4 * parseInt(g) + parseInt(h) : (i = c.attr("gapindex"), i && (g = 1e4 * parseInt(g) + parseInt(i))), j = "/joinnew/AnswerOnlyHandler.ashx?q=" + activityId + "&at=" + encodeURIComponent(f) + "&qI=" + g + "&o=true&t=" + (new Date).valueOf(), k = $(a)[0], l = "", d.errorOnly || (d.errorOnly = new Object), d.errorOnly[f] ? (l = validate_only, k.verifycodeinput && (k.verifycodeinput.parentNode.style.display = "none"), !k.errorControl && g - 1e4 > 0 && (k.errorControl = d), writeError(k, l, 3e3), l) : ($.ajax({
		type: "GET",
		url: j,
		async: !1,
		success: function(a) {
			return "false1" == a ? (l = validate_only, d.errorOnly[f] = 1, k.verifycodeinput && (k.verifycodeinput.parentNode.style.display = "none"), !k.errorControl && g - 1e4 > 0 && (k.errorControl = d), writeError(k, l, 3e3), l) : ""
		}
	}), void 0)) : "" : ""
}

function verifyTxt(a, b, c) {
	var d = $.trim($(b).val()),
		e = $(b).attr("verify"),
		f = $(b).attr("minword"),
		g = $(b).attr("maxword"),
		h = $(a)[0],
		i = "";
	return d ? (h.removeError && h.removeError(), i = verifyMinMax(d, e, f, g), i || (i = verifydata(d, e, $(b)[0])), i ? (!h.errorControl && c && (h.errorControl = $(b)[0]), writeError(h, i, 3e3), i) : (i || !h.needsms || h.issmsvalid || (i = "提示：您的手机号码没有通过验证，请先验证", writeError(h, i, 3e3)), i)) : i
}

function validateMatrix(a, b) {
	var d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, c = $("table.matrix-rating", $(a)),
		e = "";
	for ($(a)[0].isMatrixFillError = !1, f = c[0].rows, g = 0; g < f.length; g++)
		if (h = f[g], i = h.getAttribute("tp"), "d" == i && (!window.hasReferClient || "none" != h.style.display))
			if (j = $(h).attr("fid"), k = $("a.rate-on", $(h)), d = "", 0 != k.length) {
				if (d = $(k[k.length - 1]).attr("dval"), l = $(a).attr("ischeck")) {
					if (d = "", m = $(a).attr("minvalue"), n = $(a).attr("maxvalue"), m && k.length - m < 0) {
						e = validate_info + validate_info_check5 + m + type_check_limit5, $(a)[0].errorControl = $(h).prev("tr")[0];
						break
					}
					if (n && k.length - n > 0) {
						e = validate_info + validate_info_check4 + n + type_check_limit5, $(a)[0].errorControl = $(h).prev("tr")[0];
						break
					}
					if (o = !0, $(k).each(function() {
						var b, c, f;
						return d && (d += ";"), d += $(this).attr("dval"), b = $(this).attr("needfill"), b && (c = this.fillvalue || "", c = replace_specialChar(c).replace(/;/g, "；").replace(/,/g, "，"), d += spChars[2] + c, f = $(this).attr("req"), f && !c) ? (e = "请回答此题", 1 == langVer && (e = "required"), $(a)[0].isMatrixFillError = !0, showMatrixFill(this, 1), o = !1, !1) : void 0
					}), !o) break
				} else if (p = $(k[k.length - 1]).attr("mode"), !p && (q = $(k[k.length - 1]).attr("needfill"), q && (r = k[k.length - 1].fillvalue || "", r = replace_specialChar(r).replace(/;/g, "；").replace(/,/g, "，"), d += spChars[2] + r, s = $(k[k.length - 1]).attr("req"), s && !r))) {
					e = "请回答此题", 1 == langVer && (e = "required"), $(a)[0].isMatrixFillError = !0, showMatrixFill(k[k.length - 1], 1);
					break
				}
				$("#" + j, $(a)).attr("value", d)
			} else
	if ($("#" + j, $(a)).val(""), "1" == b) {
		e = "请回答此题", 1 == langVer && (e = "required"), $(a)[0].errorControl = $(h).prev("tr")[0];
		break
	}
	return e
}

function validateScaleRating(a) {
	var b = !0,
		c = $("table.scale-rating", $(a));
	return c = $("a.rate-on", c), 0 == c.length ? (b = !1, $("input:hidden", $(a)).val("")) : ($("input:hidden", $(a)).attr("value", $(c[c.length - 1]).attr("val")), -1 == c.attr("jumpto") && (needSubmitNotValid = !0)), b
}

function jump(a, b) {
	var e, f, c = $(a),
		d = c.attr("hasjump");
	d && (e = c.attr("type"), f = c.attr("anyjump"), f > 0 ? jumpAnyChoice(a) : 0 == f && "3" != e && "5" != e && "7" != e ? jumpAnyChoice(a) : jumpByChoice(a, b))
}

function jumpAnyChoice(a, b) {
	var f, c = $(a),
		d = c.attr("type"),
		e = !1;
	"1" == d ? e = $("input", c).val().length > 0 : "2" == d ? e = $("textarea", c).val().length > 0 : "3" == d ? e = $("input[type='radio']:checked", c).length > 0 : "4" == d ? e = $("input[type='checkbox']:checked", c).length > 0 : "5" == d ? e = $("a.rate-on", c).length > 0 : "6" == d ? e = $("a.rate-on", c).length > 0 : "7" == d ? e = -2 != $("select", c).val() : "8" == d ? e = $("input", c).val().length > 0 : "9" == d || "12" == d ? $("input", c).each(function() {
		var a = $(this).val();
		a.length > 0 && (e = !0)
	}) : "10" == d ? (f = "1" == c.attr("select"), f ? $("select", c).each(function() {
		var a = $(this).val(); - 2 != a && (e = !0)
	}) : $("input", c).each(function() {
		var a = $(this).val();
		a.length > 0 && (e = !0)
	})) : "11" == d ? e = $("li[check='1']", c).length > 0 : "13" == d && (e = c[0].fileName ? !0 : !1), jumpAny(e, a, b)
}

function jumpByChoice(a, b) {
	var e, f, g, c = $(a).attr("type"),
		d = $(a)[0];
	"-2" == b.value ? processJ(d.indexInPage - 0, 0) : "-1" == b.value || "" == b.value ? processJ(d.indexInPage - 0, 0) : ("3" == c || "5" == c || "7" == c) && (e = b.value || $(b).attr("val"), parseInt(e) == e && (f = $(b).attr("jumpto"), f || (f = 0), g = f - 0, processJ(d.indexInPage - 0, g)))
}

function jumpAny(a, b, c) {
	var f, g, h, d = $(b);
	d.attr("type"), f = d.attr("hasjump"), g = d.attr("anyjump") - 0, h = d[0], f && (a ? processJ(h.indexInPage - 0, g, c) : processJ(h.indexInPage - 0, 0, c))
}

function processJ(a, b, c) {
	var h, i, j, k, m, n, o, d = a + 1,
		e = cur_page,
		f = 1 == b || -1 == b,
		g = 0;
	for (h = cur_page; h < pageHolder.length; h++) {
		for (i = pageHolder[h].questions, f && (e = h), !g && i[a] && (g = parseInt(getTopic(i[a]))), j = d; j < i.length; j++) k = getTopic(i[j]), (k == b || f) && (e = h), "1" != $(i[j]).attr("nhide") && (b > k || f ? i[j].style.display = "none" : (relationNotDisplayQ[k] || (i[j].style.display = ""), m = $(i[j]).attr("hasjump"), m && !c && clearFieldValue(i[j])));
		for (pageHolder[h].cuts || (pageHolder[h].cuts = $(".cutfield", pageHolder[h])), j = 0; j < pageHolder[h].cuts.length; j++) n = pageHolder[h].cuts[j], f && (n.style.display = "none"), k = n.getAttribute("qtopic"), k && (n.getAttribute("relation") || g && g >= k || d >= k || (b > k || f ? n.style.display = "none" : (o = n.getAttribute("topic"), relationNotDisplayQ[o] || (n.style.display = ""))));
		d = 0
	}
	fixBottom()
}

function GetBacktoServer() {
	str = window.location.pathname, index = str.lastIndexOf("/"), page = str.substr(index + 1, str.length - index), data = readCookie("history"), null != data && data.toLowerCase() != page.toLowerCase() && (window.location.href = window.location.href)
}

function readCookie(a) {
	var b, c, d, e;
	for (b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
		for (e = c[d];
			" " == e.charAt(0);) e = e.substring(1, e.length);
		if (0 == e.indexOf(b)) return e.substring(b.length, e.length)
	}
	return null
}

function removeError() {
	this.errorMessage && (this.errorMessage.innerHTML = "", this.removeError = null, 2 != window.isChuangGuan && (this.style.border = "solid 1px #fff"), this.errorControl && (this.errorControl.style.background = "", this.errorControl = null), fixBottom())
}

function writeError(a, b) {
	if (a = $(a)[0], 2 != window.isChuangGuan && (a.style.border = "dashed 1px #de6752"), a.errorMessage) a.errorMessage.innerHTML = b;
	else {
		var d = $(".errorMessage", $(a));
		a.errorMessage = d[0], !firstError && isValidating && (d.css("left", "50%"), d.animate({
			left: 0
		}, 200)), a.errorMessage.innerHTML = b
	}
	return a.errorMessage.style.lineHeight = $(a.errorMessage).height() > 38 ? "24px" : "38px", a.removeError = removeError, a.errorControl && (a.errorControl.style.background = "#FBD5B5"), firstError || (firstError = a), fixBottom(), !1
}

function verifydata(a, b, c) {
	var d, e;
	if (!b) return "";
	if (d = null, "email" == b.toLowerCase() || "msn" == b.toLowerCase()) return d = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i, d.exec(a) ? "" : validate_email;
	if ("日期" == b || "生日" == b || "入学时间" == b) return "";
	if ("固话" == b) return d = /^((\d{4}-\d{7})|(\d{3,4}-\d{8}))(-\d{1,4})?$/, d.exec(a) ? "" : validate_phone.replace("，请注意使用英文字符格式", "");
	if ("手机" == b) return d = /^\d{11}$/, d.exec(a) ? "" : validate_mobile.replace("，请注意使用英文字符格式", "");
	if ("密码" == b) return checkPassword(a, c);
	if ("确认密码" == b) {
		if (c && c.firstPwd && c.firstPwd.value != a) return "两次密码输入不一致！"
	} else {
		if ("电话" == b) return d = /(^\d{11}$)|(^((\d{4}-\d{7})|(\d{3,4}-\d{8}))(-\d{1,4})?$)/, d.exec(a) ? "" : validate_mo_phone.replace("，请注意使用英文字符格式", "");
		if ("汉字" == b) return d = /^[\u4e00-\u9fa5·]+$/, d.exec(a) ? "" : validate_chinese;
		if ("姓名" == b) return d = /^[\u4e00-\u9fa5·]{2,10}$/, d.exec(a) ? "" : "姓名必须为2到10个汉字";
		if ("英文" == b) return d = /^[A-Za-z]+$/, d.exec(a) ? "" : validate_english;
		if ("网址" == b || "公司网址" == b) return d = /^https?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, e = /^www.[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/, d.exec(a) || e.exec(a) ? "" : validate_reticulation;
		if ("身份证号" == b) return d = /^\d{15}(\d{2}[A-Za-z0-9])?$/, d.exec(a) ? "" : validate_idcardNum;
		if ("学号" == b) {
			if (d = /^\d+$/, !d.exec(a)) return validate_num.replace("，请注意使用英文字符格式", "")
		} else if ("数字" == b) {
			if (d = /^(\-)?\d+$/, !d.exec(a)) return validate_num.replace("，请注意使用英文字符格式", "")
		} else if ("小数" == b) {
			if (d = /^(\-)?\d+(\.\d+)?$/, !d.exec(a)) return validate_decnum
		} else if ("qq" == b.toLowerCase()) return d = /^\d+$/, e = /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/, d.exec(a) || e.exec(a) ? "" : validate_qq
	}
	return ""
}

function checkPassword(a, b) {
	var f, c = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){8,20}/,
		d = /[a-zA-Z]+/,
		e = /[0-9]+/;
	return b && b.confirmPwd && b.needCheckConfirm && (f = b.confirmPwd.value, f != a) ? "两次密码输入不一致！" : c.test(a) && d.test(a) && e.test(a) ? "" : c.test(a) ? d.test(a) ? e.test(a) ? "" : "密码中必须包含数字" : "密码中必须包含字母" : "密码长度在8-20位"
}

function verifyMinMax(a, b, c, d) {
	if ("数字" == b || "小数" == b) {
		var e = /^(\-)?\d+$/;
		if ("小数" == b && (e = /^(\-)?\d+(\.\d+)?$/), !e.exec(a)) return "小数" == b ? validate_decnum : validate_num.replace("，请注意使用英文字符格式", "");
		if (0 != a && (a = a.replace(/^0+/, "")), "" != c) {
			if ("数字" == b && parseInt(a) - parseInt(c) < 0) return validate_num2 + c;
			if ("小数" == b && parseFloat(a) - parseFloat(c) < 0) return validate_num2 + c
		}
		if ("" != d) {
			if ("数字" == b && parseInt(a) - parseInt(d) > 0) return validate_num1 + d;
			if ("小数" == b && parseFloat(a) - parseFloat(d) > 0) return validate_num1 + d
		}
	} else {
		if ("" != d && a.length - d > 0) return validate_info_wd3.format(d, a.length);
		if ("" != c && a.length - c < 0) return validate_info_wd4.format(c, a.length)
	}
	return ""
}

function getTopic(a) {
	return $(a).attr("topic")
}

function relationJoin(a) {
	var b, c;
	"none" != a.style.display && (b = $(a), c = b.attr("type"), "3" == c ? $("input:checked", b).length > 0 && displayRelationByType(b, "input[type=radio]", 1) : "4" == c ? $("input:checked", b).length > 0 && displayRelationByType(b, "input[type=checkbox]", 2) : "7" == c && $("select", b)[0].selectedIndex > 0 && displayRelationByType(b, "option", 5))
}

function displayRelationByType(a, b, c) {
	var e, f, d = getTopic(a);
	relationQs[d] && (a.hasDisplayByRelation = new Object, e = -1, 4 == c && (f = $("a.rate-on", a), f[0] && $(f[0]).attr("mode") && (e = f.length - 1)), $(b, a).each(function(f) {
		var i, j, g = !1,
			h = "";
		1 == c || 2 == c || 5 == c ? h = this.value : 3 == c ? h = $("input[type=hidden]", this).val() : 4 == c && (h = $(this).attr("val")), i = d + "," + h, 3 == c && $(this).attr("check") ? g = !0 : 4 == c ? -1 == e && $(this).hasClass("rate-on") ? g = !0 : f == e && (g = !0) : 1 != c && 2 != c || !this.checked ? 5 == c && this.selected && (g = !0) : g = !0, displayByRelation(a, i, g), j = d + ",-" + h, -1 != relationGroup.indexOf(d) && (relationGroupHT[j] || relationGroupHT[j.replace(",", ",-")], displayByRelation(a, j, g, !0)), relationHT[j] && displayByRelationNotSelect(a, j, g, b, c)
	}), fixBottom())
}

function checkDisplay(a) {
	var c, d, e, f, g, h, i, j, k, l, b = !1;
	for (c in a)
		for (d = 0; d < a[c].length; d++) {
			if (e = a[c][d].replace("-", ""), f = a[c][d].replace("q", "").split("_"), g = document.getElementById(e), h = document.getElementById("q" + f[0]), i = document.getElementById("div" + f[0]), j = $(i).attr("type"), g && "11" != j && f[1] > 0 == g.checked) {
				b = !0;
				break
			}
			if (g && "11" == j && "1" == (f[1] > 0 == g.parentNode.parentNode.getAttribute("check"))) {
				b = !0;
				break
			}
			if (g || 5 != j) {
				if (!g && h && f[1] == h.value) {
					b = !0;
					break
				}
			} else if (k = $("a.rate-on", i), l = "", k.length > 0 && (l = $(k[k.length - 1]).attr("val")), f[1] == l) {
				b = !0;
				break
			}
		}
	return b
}

function displayByRelation(a, b, c, d) {
	var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, e = getTopic(a);
	if (-1 != relationGroup.indexOf(e) && (f = "", g = relationGroupHT[b] || relationGroupHT[b.replace(",", ",-")]))
		for (h in g) {
			i = new Object, j = getTopic(g[h]), k = g[h].getAttribute("relation"), k && (f = -1 != k.indexOf("|") ? "|" : "$");
			for (l in relationGroupHT)
				for (m in relationGroupHT[l]) j == getTopic(relationGroupHT[l][m]) && (n = l.split(",")[0], i[n] || (i[n] = new Array), i[n].push("q" + l.replace(",", "_")));
			if (o = !1, "$" == f) o = checkDisplay(i);
			else {
				o = !0;
				for (p in i) {
					for (q = !1, m = 0; m < i[p].length; m++)
						if (r = i[p][m].replace("-", ""), s = i[p][m].replace("q", "").split("_"), t = document.getElementById(r), u = !1, v = document.getElementById("div" + s[0]), w = $(v).attr("type"), s[1] < 0 && (u = "11" == w ? $(v).find("li[check='1']").length > 0 : $(v).find("input:checked").length > 0), x = document.getElementById("q" + s[0]), t && ("11" == w && "1" == (s[1] > 0 == t.parentNode.parentNode.getAttribute("check")) ? q = !0 : "11" != w && s[1] > 0 == t.checked && (q = !0)), q) {
							if (!(s[1] < 0) || u) break;
							q = !1
						} else
					if (t || 5 != w) {
						if (!t && x && s[1] == x.value) {
							q = !0;
							break
						}
					} else if (y = $("a.rate-on", v), z = "", y.length > 0 && (z = $(y[y.length - 1]).attr("val")), s[1] == z) {
						q = !0;
						break
					}
					if (!q) {
						o = !1;
						break
					}
				}
			}
			A = questionsObject[j], A ? (A[0].style.display = o ? "" : "none", o ? (initqSlider(A[0]), setTableWidth(A[0])) : loopHideRelation(A)) : (B = document.getElementById("divCut" + j.replace("c", "")), B && (B.style.display = o ? "" : "none"))
		}
	if (C = relationHT[b])
		for (D = 0; D < C.length; D++) E = getTopic(C[D]), a.hasDisplayByRelation[E] || (c || "none" == C[D].style.display ? c && (C[D].style.display = "", "1" == C[D].getAttribute("qingjing") && displayRelationByType($(C[D]), "input[type=radio]", 1), "1" == C[D].getAttribute("isshop") && updateCart(C[D]), initqSlider(C[D]), setTableWidth(C[D]), d || (a.hasDisplayByRelation[E] = "1"), relationNotDisplayQ[E] && (relationNotDisplayQ[E] = "")) : loopHideRelation(C[D]))
}

function displayByRelationNotSelect(a, b, c, d, e) {
	var g, h, i, j, k, l, m, n, o, p, q, r, s, f = relationHT[b];
	if (f)
		for (g = 0; g < f.length; g++)
			if (h = c, i = getTopic(f[g]), !a.hasDisplayByRelation[i]) {
				if (j = f[g].getAttribute("relation"), j.indexOf(";") > -1 && (k = !1, l = j.split(","), 2 == l.length)) {
					for (m = l[1].split(";"), n = new Object, o = 0; o < m.length; o++) p = m[o].replace("-", ""), n[p] = "1";
					for (q = $(d, a), o = 0; o < q.length; o++)
						if (r = !1, s = "", (1 == e || 2 == e || 5 == e) && (s = q[o].value), 3 == e && (s = $("input[type=hidden]", q[o]).val()), 3 == e && $(q[o]).attr("check") ? r = !0 : 1 != e && 2 != e || !q[o].checked || (r = !0), n[s] && r) {
							k = !0;
							break
						}
					h = k ? !0 : !1
				}
				h && "none" != f[g].style.display ? loopHideRelation(f[g]) : h || (f[g].style.display = "", initqSlider(f[g]), setTableWidth(f[g]), a.hasDisplayByRelation[i] = "1", relationNotDisplayQ[i] && (relationNotDisplayQ[i] = ""))
			}
}

function loopHideRelation(a) {
	var d, e, f, g, h, i, j, k, l, b = getTopic(a),
		c = relationQs[b];
	if (c)
		for (d = 0; d < c.length; d++) loopHideRelation(c[d], !1);
	if (clearFieldValue(a), e = $(a)[0]) {
		if (f = !0, g = $(a).attr("relation"), g && "0" != g && -1 != g.indexOf("$")) {
			h = new Object;
			for (i in relationGroupHT)
				for (j in relationGroupHT[i]) b == getTopic(relationGroupHT[i][j]) && (k = i.split(",")[0], h[k] || (h[k] = new Array), h[k].push("q" + i.replace(",", "_")));
			l = checkDisplay(h), l && (f = !1)
		}
		f && (e.style.display = "none", "1" == e.getAttribute("isshop") && updateCart(e), "" == relationNotDisplayQ[b] && (relationNotDisplayQ[b] = "1"))
	}
}

function checkHuChi(a, b) {
	var d, e, f, c = $(".huchi", a)[0];
	c && (d = $(b), $("input:checked", d)[0] && (e = $(".ui-checkbox", a), f = d.hasClass("huchi"), e.each(function() {
		var a, c;
		return this == b ? !0 : (a = $(this), $("input:checked", a)[0] ? (f ? a.trigger("click") : (c = a.hasClass("huchi"), c && a.trigger("click")), void 0) : !0)
	})))
}

function autoSubmit(a) {
	var b, c;
	if (needTip()) return alertNew($(divTip).text()), void 0;
	if (window.hasSurveyTime)
		for (; totalPage - 1 > cur_page;) pageHolder[cur_page].hasExceedTime = !0, show_next_page();
	divMaxTime.style.display = "none", $("body").css("padding-top", "0px"), pageHolder[cur_page].hasExceedTime = !0, b = $("#divNext a")[0], b && (b.disabled = !1), totalPage - 1 > cur_page ? show_next_page() : (pageHolder[cur_page].style.display = "none", b && b.initVal && (b.innerHTML = b.initVal), !window.hasSurveyTime && 2 != window.isChuangGuan || "none" != tCode.style.display || window.useAliVerify || !window.hasAnswer || a ? (c = "提示：您的作答时间已经超过最长时间限制，请直接提交答卷！", 1 == langVer && (c = "Time is up,please submit!"), 2 == window.isChuangGuan && ((window.useAliVerify || "none" != tCode.style.display) && ($("#divSubmit").show().css("padding-top", "30px").parent().css("background", "#fff").css("margin", "0 2px"), $("#divQuestion").css("border", "none").css("margin", "0 2px").css("border-radius", "0")), c = hasChuGuanSuc ? "恭喜您闯关成功" : "提示：闯关失败！"), a && (c = a), $("#ValError").html(c)) : (hlv = "1", groupAnswer(1)))
}

function CheckMax(a, b) {
	var c, d, e, f, g, h, i, j, k, l;
	if (!b) return !0;
	if (c = $(a).attr("dval"), d = $(a).parent().parent().parent(), "tbody" != d[0].tagName.toLocaleLowerCase()) return !0;
	if (e = d.find("tr.trlabel").eq(0), f = e.find("th"), !f.eq(c - 1)) return !0;
	if (g = f.eq(c - 1).attr("itemmax"), g && g > 0) {
		for (h = d.find("a.rate-off"), i = 0, j = 0; j < h.length && (h.eq(j).hasClass("rate-on") && h.eq(j).attr("dval") == c && i++, !(i >= g)); j++);
		if (i >= g) return k = f.eq(c - 1).text(), l = "提示：列选项“" + k + "”最多只允许选择" + g + "次", 1 == langVer && (l = 'Column "' + k + '" can choose at most ' + g + " times."), alertNew(l), !1
	}
	return !0
}

function elagerImg(a, b) {
	var c, d, e, f, g, h, i, j, k;
	a = a || window.event, a.stopPropagation && a.stopPropagation(), c = $(b).parent().attr("pimg"), c || (c = $(b).parent().find("img").attr("src")), d = "#outdiv", e = "#indiv", f = "#bigimg", g = "#preView_wrap", h = d, i = document.documentElement.clientWidth || document.body.clientWidth, j = document.documentElement.clientHeight || document.body.clientHeight, k = $(document).scrollTop(), $(f).unbind("load"), $(f).attr("src", c).load(function() {
		var l, m, a = this.width,
			b = this.height,
			c = a / b;
		h = b > j ? ".icon_close" : d, $(g).addClass("flex"), a > i ? (l = "2%", b = i / c, a = .96 * i, m = (j - b) / 2, 0 > m && (m = 10, $(g).removeClass("flex"), b = .96 * j)) : (.8 * i > a && (a = .8 * i), .4 * j > b && (b = .4 * j), l = (i - a) / 2, m = (j - b) / 2, 0 > m && (b = .96 * j, m = "2%", $(g).removeClass("flex"))), $(e).css({
			left: l,
			top: m
		}), $(g).css({
			width: a,
			height: b
		}), $(d).fadeIn("fast"), $("body").addClass("noscorrl"), $(h).click(function() {
			$(d).fadeOut("fast"), $("body").removeClass("noscorrl"), $(document).scrollTop(k), $(f).attr("src", ""), $(h).unbind("click")
		})
	})
}

function openDialogByIframe(a, b, c, d) {
	var f, g, h, i, j, k, l, e = "absolute";
	window.IsPar && (e = "fixed"), f = $(window).width(), g = $(document).height(), "divImgPop" == c || c.indexOf("divVCode") > -1 || "divTimeUp" == c ? b += 30 : (a = Math.min(f, 400) - 30, 0 == c.indexOf("divDesc_") ? b += 30 : -1 == c.indexOf("setcity") && (b = Math.min($(window).height(), 400) - 20), (c.indexOf("amap.aspx") > -1 || c.indexOf("school.aspx") > -1 || d) && (b = $(window).height() - 30, a = $(window).width() - 20)), $("body").append("<div id='yz_popIframeDiv'></div>"), h = document.getElementById(c), i = "<div id='yz_popTanChu' style='border-radius: 8px;'><div style='position:relative;'><a id='yz_popTanChuClose' style='background:url(/images/bt_closed.gif) no-repeat;width:30px;height:30px;margin:-15px -18px 0 0;display:inline;float:right;cursor:pointer;position:absolute;right:0;'></a></div>", i += h ? "<div id='yz_popdivData' style='padding:10px;height:" + (b - 30) + "px;overflow:auto;width:" + a + "px;'></div>" : "<iframe id='yz_popwinIframe' frameborder='0' hspace='0' src=" + c + " style='border-radius:8px;'></iframe>", i += "</div>", $("body").append(i), $("#yz_popIframeDiv").css({
		width: f,
		height: g,
		background: "#000",
		position: e,
		zIndex: "100",
		left: "0",
		top: "0"
	}), $("#yz_popIframeDiv").fadeTo(0, .5), j = $(window).width() / 2 - a / 2, k = $(window).height() / 2 - b / 2 + $(window).scrollTop(), $("#yz_popTanChu").css({
		width: a,
		height: b,
		left: j,
		top: k,
		background: "#fff",
		position: e,
		zIndex: 200
	}), h && $("#yz_popdivData").html(h.innerHTML), l = b, $("#yz_popwinIframe").css({
		width: a,
		height: l,
		"border-bottom": "1px #ccc solid",
		background: "#ffffff"
	}), $("#yz_popTanChuClose,#yz_popIframeDiv").click(function() {
		$("#yz_popIframeDiv").remove(), $("#yz_popTanChu").remove()
	})
}

function closeAlert() {
	var a = document.getElementById("alert_box");
	a.style.display = "none", a.callback && a.callback()
}

function alertNew(a, b) {
	var c = document.getElementById("alert_box");
	c ? document.getElementById("pop_box_msg").innerHTML = a : (c = document.createElement("div"), c.id = "alert_box", alertHtml = "<div style='position:fixed;*position: absolute;width:100%;height:100%;opacity:0.5;filter:alpha(opacity=50);background-color:black;z-index:99998;top:0px;left:0px;'></div><div style='min-height: 160px;width:320px;margin-left:-160px;margin-top: -80px;position:fixed;*position: absolute;z-index:99999;top:50%;left:50%;background-color:white;border-radius:4px;'><div style='font-size:18px;color:#000;font-weight:600;padding: 26px 0px 10px;width:100%;text-align:center;border-radius:8px 8px 0 0;vertical-align: middle;z-index: 1;'><div>系统提示</div></div><div style='width: 100%;border-radius: 0 0 8px 8px; z-index: 1;'><div style='min-height: 50px;padding:6px 10px 10px;font-size: 15px;line-height: 22px;text-align: center;' id='pop_box_msg'>" + a + "</div>" + "<div style='width:100%;height: 50px;text-align:center;border-top:1px solid #D2D3D5;'><button style='display:inline-block;width:100%;font-size:18px;height:50px;box-sizing:border-box;line-height:50px;color:#3296FA;text-align: center;text-decoration: none;border: none;background: none;outline:none;cursor:pointer;' onclick='closeAlert();'>确定</button></div>" + "</div></div>", c.innerHTML = alertHtml, document.body.appendChild(c)), c.style.display = "", c.callback = b || ""
}

function closeConfirm() {
	var a = document.getElementById("confirm_box");
	a.style.display = "none", a.callback && a.callback()
}

function closeNo() {
	var a = document.getElementById("confirm_box");
	a.style.display = "none", a.callback2 && a.callback2()
}
var curfilediv, isUploadingFile, cur_page, hasSkipPage, prevControl, pageHolder, curMatrixFill, curMatrixError, imgVerify, questionsObject, allQArray, shopArray, hasPeiEFull, hasConfirmBtn, itempopUpindex, popUpindex, firstError, firstMatrixError, needSubmitNotValid, lastFixedObj, isValidating, txtCurCity, prevScrollTop, startAge, endAge, rName, gender, marriage, education, modata, clientAnswerSend, havereturn, timeoutTimer, nvvv, ktimes, curField = null,
	relationHT = new Array,
	relationQs = new Object,
	relationGroup = new Array,
	relationGroupHT = new Object,
	relationNotDisplayQ = new Object,
	spChars = ["$", "}", "^", "|", "!", "<"],
	spToChars = ["ξ", "｝", "ˆ", "¦", "！", "&lt;"],
	prevInputControl = null,
	isLoadingAnswer = !1,
	lastCostTime = 0,
	hasClickQ = !1,
	needGoOut = !1,
	hasShowTip = !1,
	jpkeyword = "",
	enkeyword = "",
	enhighkeyword = "",
	enmiddlexiaokeyword = "",
	enmiddlekeyword = "",
	enxiaokeyword = "",
	enyouerkeyword = "",
	enforeinkeyword = "",
	enninekeyword = "",
	entenkeyword = "",
	en11keyword = "",
	en12keyword = "",
	en13keyword = "",
	en14keyword = "",
	en15keyword = "",
	en16keyword = "",
	hlv = "1",
	jpmatch = 0;
$(function() {return 1;
	$.support.leadingWhitespace || (window.location.href = window.location.href.replace("/m/", "/jq/")), window.addEventListener && (window.IsPar || window.addEventListener("load", function() {
		setTimeout(function() {
			window.addEventListener("popstate", function() {
				if (hasClickQ) {
					if (needGoOut) return window.history.back(), void 0;
					pushHistory();
					var b = checkCanPop();
					window.notFinishTip && b ? show_zhezhao_tip(!0) : closeTipWindow()
				}
			}, !1)
		}, 500)
	}))
}), String.prototype.format = function() {
	var a = arguments;
	return this.replace(/\{(\d+)\}/g, function(b, c) {
		return a[c]
	})
}, curfilediv = null, isUploadingFile = !1, cur_page = 0, hasSkipPage = !1, prevControl = null, pageHolder = null, curMatrixFill = null, curMatrixError = null, imgVerify = null, questionsObject = new Object, allQArray = null, shopArray = new Array, hasPeiEFull = !1, $(function() {
	var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I;
	for ($("#htitle").height() > 40 && $("#htitle").css("font-size", "20px"), a = document.title, $(window).scroll(function() {
		var c = $("#toptitle").offset().top + 48,
			d = $(this).scrollTop();
		d > c ? $("title").text(a) : emptyTitle()
	}), emptyTitle(), pageHolder = $("fieldset.fieldset"), b = 0; b < pageHolder.length; b++)
		for (c = "true" == $(pageHolder[b]).attr("skip"), c && (pageHolder[b].skipPage = !0, hasSkipPage = !0), d = $(".field", pageHolder[b]), pageHolder[b].questions = d, e = 0, f = 0; f < d.length; f++) d[f].indexInPage = e, d[f].pageIndex = b, hasSkipPage && (d[f].pageParent = pageHolder[b]), e++;
	if ($("#divMatrixRel").bind("click", function(a) {
		a.stopPropagation()
	}), $(document).bind("click", function() {
		setMatrixFill(), postHeight()
	}), $("#matrixinput").on("keyup blur focus", function() {
		var a, b, c;
		curMatrixFill && (a = $("#matrixinput").val(), curMatrixFill.fillvalue = a, window.needSaveJoin && (b = $(curMatrixFill).parents(".field"), c = b.attr("ischeck"), saveMatrixFill(curMatrixFill, c), saveAnswer(b)))
	}), jpkeyword = (window.jpkeylist || "").split(/[,，]/), enkeyword = (window.enkeylist || "").split(/[,，]/), enhighkeyword = (window.enhighkeylist || "").split(/[,，]/), enmiddlekeyword = (window.enmiddlekeylist || "").split(/[,，]/), enmiddlexiaokeyword = (window.enmiddlexiaokeylist || "").split(/[,，]/), enxiaokeyword = (window.enxiaokeylist || "").split(/[,，]/), enyouerkeyword = (window.enyouerkeylist || "").split(/[,，]/), enforeinkeyword = (window.enforeinkeylist || "").split(/[,，]/), window.enninekeylist && (enninekeyword = (window.enninekeylist || "").split(/[,，]/)), window.entenkeylist && (entenkeyword = (window.entenkeylist || "").split(/[,，]/)), window.en11keylist && (en11keyword = (window.en11keylist || "").split(/[,，]/)), window.en12keylist && (en12keyword = (window.en12keylist || "").split(/[,，]/)), window.en13keylist && (en13keyword = (window.en13keylist || "").split(/[,，]/)), window.en14keylist && (en14keyword = (window.en14keylist || "").split(/[,，]/)), window.en15keylist && (en15keyword = (window.en15keylist || "").split(/[,，]/)), window.en16keylist && (en16keyword = (window.en16keylist || "").split(/[,，]/)), checkTitleDescMatch(), g = !1, h = new Array, allQArray = $(".field"), allQArray.each(function() {
		var b, c, d, e, f, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, a = $(this);
		if (this.onmouseover = function() {
			ktimes++
		}, b = a.attr("type"), a.bind("click", function() {
			this.removeError && this.removeError(), hasClickQ || pushHistory(), hasClickQ = !0;
			try {
				checkJpMatch(b, this)
			} catch (a) {}
			window.loadGeetest && window.loadGeetest(), window.scrollup && scrollup.Stop()
		}), c = getTopic(a), questionsObject[c] = a, d = a.attr("isshop"), d && shopArray.push(this), e = a.attr("relation"), f = "", e && "0" != e) {
			if (f = -1 != e.indexOf("|") ? "|" : "$", -1 != e.indexOf(f)) {
				i = e.split(f);
				for (j in i)
					if (k = i[j], k && -1 != k.indexOf(",")) {
						for (l = k.split(","), m = l[0], n = l[1].split(";"), o = 0; o < n.length; o++) p = m + "," + n[o], relationGroupHT[p] || (relationGroupHT[p] = new Array), relationGroupHT[p].push(this);
						relationQs[m] || (relationQs[m] = new Array), relationQs[m].push(this), relationGroup.push(m)
					}
			} else {
				for (l = e.split(","), m = l[0], n = l[1].split(";"), o = 0; o < n.length; o++) p = m + "," + n[o], relationHT[p] || (relationHT[p] = new Array), relationHT[p].push(this);
				relationQs[m] || (relationQs[m] = new Array), relationQs[m].push(this)
			}
			relationNotDisplayQ[c] = "1"
		} else "0" == e && (relationNotDisplayQ[c] = "1");
		return q = a.attr("titletopic"), q && (r = questionsObject[q], r && (r[0]._titleTopic || (r[0]._titleTopic = new Array), r[0]._titleTopic.push(c), s = a.find(".field-label")[0], s && (s.innerHTML = s.innerHTML.replace("[q" + q + "]", "<span id='spanTitleTopic" + c + "' style='text-decoration:underline;'></span>")))), "1" == a.attr("hrq") ? !0 : ("1" == b ? (t = $("input", a), t[1] && (t[0].confirmPwd = t[1], t[1].firstPwd = t[0], $(t[1]).on("keyup", function() {
			this.firstPwd.needCheckConfirm = !0, verifyTxt(a, $(this))
		}), t = $(t[0])), t.on("keyup blur click", function() {
			verifyTxt(a, t), prevInputControl = this, window.hasAnswer = !0, jump(a, this), referTitle(a, this.value), saveAnswer(a)
		}), window.needSaveJoin && t.change(function() {
			saveAnswer(a)
		}), t.blur(function() {
			checkOnly(a, t), lastFixedObj && $(lastFixedObj).addClass("fixed-style")
		}), t.focus(function() {
			lastFixedObj && $(lastFixedObj).removeClass("fixed-style")
		}), u = $("textarea", a), u[0] && (v = u.prev("a")[0], v.par = a[0], u[0].par = a[0], a[0].needsms = !0, w = u.parent().parent().find(".errorMessage")[0], a[0].mobileinput = t[0], a[0].verifycodeinput = u[0], v.onclick = function() {
			var a, b, d, e, f;
			if (!this.disabled) {
				if (a = this.par, a.mobileinput.value = $.trim(a.mobileinput.value), !/^\d{11}$/.test(a.mobileinput.value)) return alertNew("请输入正确的手机号码"), void 0;
				if (!(a.issmsvalid && a.mobile == a.mobileinput.value || this.isSending || !u[1] || this.repeat && !confirm("您输入的手机号码“" + a.mobileinput.value + "”确认准确无误吗？"))) {
					if ("1" == this.getAttribute("nocode")) return v.sendActivitySms("0000"), void 0;
					b = "divVCode" + c, openDialogByIframe(300, 70, b), d = document.getElementById("yz_popdivData"), e = d.getElementsByTagName("textarea")[0], f = d.getElementsByTagName("img")[0], "none" == f.style.display && (f.onclick = function() {
						this.src = "/wjx/join/AntiSpamImageGen.aspx?t=" + (new Date).valueOf()
					}, f.style.display = "", f.onclick()), $(e).on("keyup blur", function() {
						var a = /^[0-9a-zA-Z]{4}$/g;
						a.test(this.value) && (v.sendActivitySms(this.value), this.value = "", $("#yz_popTanChuClose").click())
					}), e.focus()
				}
			}
		}, v.sendActivitySms = function(a) {
			var b, c, d;
			this.isSending = !0, this.disabled = !0, b = this.par, c = this, d = "/joinnew/AnswerSmsHandler.ashx?q=" + activityId + "&mob=" + escape(b.mobileinput.value) + "&valcode=" + a + "&t=" + (new Date).valueOf(), $.ajax({
				type: "GET",
				url: d,
				async: !1,
				success: function(a) {
					var b = "";
					"true" == a ? (b = "成功发送。如未收到，请检查手机号是否正确！", c.repeat = 1, c.resent(), u[0].readOnly = !1) : "fast" == a ? (b = "发送频率过快", c.resent()) : b = "no" == a ? "发布者短信数量不够" : "fail" == a ? "短信发送失败，每天最多发送5次！" : "error" == a ? "手机号码不正确" : "nopub" == a ? "问卷未运行，不能填写" : a, b.indexOf("图形验证码") > -1 && (c.disabled = !1), w.innerHTML = b, c.isSending = !1
				}
			})
		}, v.resent = function() {
			var a = this,
				b = 60,
				c = setInterval(function() {
					b--, 57 > b && (a.isSending = !1), b > 0 ? a.innerHTML = "重发(" + b + "秒)" : (a.innerHTML = "发送验证码", a.disabled = !1, clearInterval(c))
				}, 1e3)
		}, u[0].onchange = u[0].onblur = function() {
			var b, c, a = $.trim(this.value);
			return 6 != a.length ? (w.innerHTML = "提示：请输入6位数字！", void 0) : /^\d+$/.exec(a) ? (b = this.par, b.issmsvalid && b.mobile == b.mobileinput.value || b.prevcode != a && (b.prevcode = a, c = "/joinnew/AnswerSmsValidateHandler.ashx?q=" + activityId + "&mob=" + escape(b.mobileinput.value) + "&code=" + escape(a) + "&t=" + (new Date).valueOf(), $.ajax({
				type: "GET",
				url: c,
				async: !1,
				success: function(a) {
					b.issmsvalid = !1;
					var c = "";
					"true" == a ? (b.issmsvalid = !0, b.mobile = b.mobileinput.value, c = "成功通过验证", writeError(b, "", 1e3)) : "send" == a ? c = "请先发送验证码，每天最多发送5次！" : "no" == a ? c = "验证码输入错误超过5次，无法再提交" : "error" == a && (c = "验证码输入错误，连续输错5次将无法提交"), w.innerHTML = c
				}
			})), void 0) : (w.innerHTML = "提示：请输入6位数字！", void 0)
		})) : "2" == b ? (t = $("textarea", a), t.on("keyup blur click", function() {
			verifyTxt(a, t), prevInputControl = this, window.hasAnswer = !0, jump(a, this), referTitle(a, this.value), saveAnswer(a)
		}), t.blur(function() {
			checkOnly(a, t), lastFixedObj && $(lastFixedObj).addClass("fixed-style")
		}), t.focus(function() {
			lastFixedObj && $(lastFixedObj).removeClass("fixed-style")
		})) : "9" == b ? (x = $("input", a), x.on("keyup blur change", function() {
			$(this), prevInputControl = this, msg = verifyTxt(a, $(this), !0), jump(a, this), referTitle(a, this.value), saveAnswer(a), fixBottom()
		}), x.blur(function() {
			checkOnly(a, $(this)), lastFixedObj && $(lastFixedObj).addClass("fixed-style")
		}), x.focus(function() {
			lastFixedObj && $(lastFixedObj).removeClass("fixed-style")
		})) : "8" == b ? $("input", a).change(function() {
			jump(a, this), saveAnswer(a)
		}) : "12" == b ? $("input", a).change(function() {
			var h, i, b = null,
				c = $(a).attr("total"),
				d = $("input:visible", a),
				e = count = d.length,
				f = c,
				g = this;
			d.each(function() {
				$(this).val() ? (count--, f -= $(this).val()) : g != this && (b = this)
			}), b || d.each(function(a) {
				return a == e - 1 ? (b = this, !1) : void 0
			}), 1 == count && b && f > 0 && ($(b).val(f).change(), f = 0), msg = "", 0 != f && 0 == count && (h = parseInt($(b).val()) + f, h >= 0 ? b != this ? ($(b).val(h).change(), f = 0) : 2 == d.length && (i = c - $(b).val(), $(d[0]).val(i).change(), f = 0) : msg = "，<span style='color:red;'>" + sum_warn + "</span>"), 0 == f && d.each(function() {
				$(this).val() || $(this).val("0").change()
			}), $(".relsum", a).html(sum_total + "<img src=\"/images/wjxmobile/prompt@2x.png\" alt=''><b>" + c + "</b>" + sum_left + "<span style='color:red;font-bold:true;'>" + (c - f) + "</span>" + msg), jump(a, this), saveAnswer(a)
		}) : "13" == b ? g = !0 : "3" == b ? (y = $("div.ui-radio", a), y.each(function() {
			var a, b;
			window.hasTouPiao && (a = this.getAttribute("htp"), a && (b = document.getElementById("spanPiao" + c + "_" + a), b && !b.needHide && (b.style.display = "")))
		}), checkPeiE(a, "input[type='radio']"), y.bind("click", function(b) {
			var d, e, c = $(this);
			a[0] && a[0].hasConfirm || (d = c.find("input[type='radio']")[0], d.disabled || (window.hasAnswer = !0, $(a).find("div.ui-radio").each(function() {
				var a = $(this);
				a.find("input[type='radio']")[0].checked = !1, a.find("a.jqradio").removeClass("jqchecked")
			}), d.checked = !0, e = c.find("input.OtherRadioText")[0], e && (d.itemText = e), processRadioInput(a[0], d), c.find("a.jqradio").addClass("jqchecked"), displayRelationByType(a, "input[type=radio]", 1), referTitle(a), jump(a, d), "1" != a.attr("req") && addClearHref(a), showAnswer(a, y, !0), saveAnswer(a), 1 != c.attr("desc") && b.preventDefault()))
		}), z = a.attr("qingjing"), z && h.push(a), $("input.OtherRadioText", a).bind("click", function(a) {
			var b, c, d, e;
			$(this.parentNode.parentNode.parentNode).find("div.ui-radio").each(function() {
				$(this).find("input[type='radio']")[0].checked = !1, $(this).find("a.jqradio").removeClass("jqchecked")
			}), prevInputControl = this, b = $(this).attr("rel"), c = $("#" + b)[0], c.checked = !0, d = $("#" + b).parent().parent(), d.find("a.jqradio").addClass("jqchecked"), c.itemText = this, e = $(this).parents("div.field"), processRadioInput(e[0], c), displayRelationByType(e, "input[type=radio]", 1), jump(e, c), saveAnswer(e), a.stopPropagation(), a.preventDefault()
		}), window.needSaveJoin && $("input.OtherRadioText", a).bind("blur", function() {
			saveAnswer(a)
		})) : "7" == b ? (A = $("select", a), A.bind("change", function(b) {
			$("span", this.parentNode).html(this.options[this.selectedIndex].text), displayRelationByType(a, "option", 5), jump(a, this.options[this.selectedIndex]);
			var c = this.options[this.selectedIndex].text; - 2 == this.value && (c = ""), referTitle(a, c), saveAnswer(a), b.preventDefault()
		}), A[0].selectedIndex > 0 && $("span", A[0].parentNode).html(A[0].options[A[0].selectedIndex].text)) : "10" == b ? (B = "1" == a.attr("select"), C = a.attr("zizeng"), D = a.attr("maxvalue"), E = a.attr("minvalue"), C && (F = a.find(".mdivtable"), G = a.find(".select_title"), H = a.find(".mdivtable:last"), I = "", F.each(function(a) {
			a >= E && $(this).hide(), I = "<div style='display: none;' class='delete-icon'></div>", $(this).addClass("zizeng").append(I)
		}), G.each(function(a) {
			a >= E && $(this).hide()
		}), H.after("<div class='increase-btn'><i class='increase-icon'></i>增加</div>"), F.find(".delete-icon").on("click", function() {
			var a = $(this).parent(".mdivtable"),
				b = a.attr("rowid");
			b == D && $(this).parents(".field").find(".increase-btn").removeClass("disable-style"), a.hide().prev().hide(), b - E > 1 && a.prev().prev().find(".delete-icon").show()
		}), $(".increase-btn", a).on("click", function() {
			var b = a.find(".mdivtable:visible"),
				c = b.next().show().next().show();
			c.last().find(".delete-icon").show().parent().prev().prev().find(".delete-icon").hide(), c.last().attr("rowid") == D && $(this).addClass("disable-style")
		})), B && $("select", a).bind("change", function() {
			$("span", this.parentNode).html(this.options[this.selectedIndex].text), jump(a, this), saveAnswer(a)
		}), $("input", a).bind("focus", function() {
			lastFixedObj && $(lastFixedObj).removeClass("fixed-style")
		}).bind("change blur", function() {
			var d, e, f, g, b = $(this),
				c = b.val();
			prevInputControl = this, d = b.attr("isdigit"), e = "1" == d || "2" == d, e ? "1" == d && parseInt(c) != c ? b.val("") : "2" == d && parseFloat(c) != c ? b.val("") : (f = b.attr("min"), f && 0 > c - f && b.val(""), g = b.attr("max"), g && c - g > 0 && b.val("")) : msg = verifyTxt(a, $(this), !0), jump(a, this), saveAnswer(a)
		})) : "5" == b ? initRate(a) : "6" == b ? (initRate(a, !0), setTableWidth(a)) : "4" == b ? (J = $("div.ui-checkbox", a), J.each(function() {
			var a, b;
			window.hasTouPiao && (a = this.getAttribute("htp"), a && (b = document.getElementById("spanPiao" + c + "_" + a), b && (b.style.display = "")))
		}), checkPeiE(a, "input[type='checkbox']"), J.bind("click", function(b) {
			var d, e, c = $(this);
			a[0] && a[0].hasConfirm || (d = c.find("input[type='checkbox']")[0], d.disabled || (d.checked = !d.checked, window.hasAnswer = !0, d.checked ? c.find("a.jqcheck").addClass("jqchecked") : c.find("a.jqcheck").removeClass("jqchecked"), checkHuChi(a, this), displayRelationByType(a, "input[type='checkbox']", 2), verifyCheckMinMax(a, !1, !1, this), jump(a, d), window.createItem && createItem(a), e = c.find("input.OtherText")[0], e && (d.checked ? e.value = e.pvalue || "" : (e.pvalue = e.value, e.value = "")), referTitle(a), showAnswer(a, J), saveAnswer(a), b.preventDefault()))
		}), $("input.OtherText", a).bind("click", function(a) {
			var d, e, f, g, b = $(this).attr("rel"),
				c = $("#" + b)[0];
			return prevInputControl = this, d = $(this).parents("div.field"), e = d.attr("maxvalue"), e && (f = $("input:checked", d).length, f > e || f == e && !c.checked) ? ($(this).blur(), a.stopPropagation(), a.preventDefault(), void 0) : (c.checked = !0, c.itemText = this, g = $("#" + b).parents(".ui-checkbox"), g.find("a.jqcheck").addClass("jqchecked"), this.pvalue && !this.value && (this.value = this.pvalue), checkHuChi(d, g[0]), displayRelationByType(d, "input[type=checkbox]", 2), jump(d, c), verifyCheckMinMax(d, !1), window.createItem && createItem(d), saveAnswer(d), a.stopPropagation(), a.preventDefault(), void 0)
		}), window.needSaveJoin && $("input.OtherText", a).bind("blur", function() {
			saveAnswer(a)
		})) : "21" == b ? $(".shop-item", a).each(function() {
			var b = $(".itemnum", this),
				c = $(".item_left", this);
			$(".add", this).bind("click", function(d) {
				var g, h, e = !1,
					f = 0;
				c[0] && (e = !0, f = parseInt(c.attr("num"))), g = parseInt(b.val()), e && g >= f ? (h = "库存只剩" + f + "件，不能再增加！", 0 >= f && (h = "已售完，无法添加"), alertNew(h)) : (b.val(g + 1), updateCart(a)), d.preventDefault()
			}), b.bind("focus", function() {
				"0" == b.val() && b.val("")
			}), b.bind("blur change", function(d) {
				var e, f, g, h, i;
				return b.val() || b.val("0"), e = parseInt(b.val()), !e || 0 > e ? (b.val("0"), updateCart(a), void 0) : (f = !1, g = 0, c[0] && (f = !0, g = parseInt(c.attr("num"))), f && e > g && (h = "库存只剩" + g + "件，不能超过库存！", 0 >= g && (h = "已售完，无法添加"), alertNew(h), i = g, 0 > i && (i = 0), b.val(i)), updateCart(a), d.preventDefault(), void 0)
			}), $(".remove", this).bind("click", function(c) {
				var d = parseInt(b.val());
				d > 0 && (b.val(d - 1), updateCart(a)), c.preventDefault()
			})
		}) : "11" == b && ($("li.ui-li-static", a).bind("click", function(b) {
			var d, c = $(this).find("input.OtherText")[0];
			$(this).attr("check") ? (d = $(this).find("span").html(), $(this.parentNode).find("li[check='1']").each(function() {
				var a = $(this).find("span.sortnum").html();
				a - d > 0 && $(this).find("span.sortnum").html(a - 1)
			}), $(this).find("span.sortnum").html("").removeClass("sortnum-sel"), $(this).attr("check", ""), c && (c.pvalue = c.value, c.value = "")) : (d = $(this.parentNode).find("li[check='1']").length + 1, $(this).find("span.sortnum").html(d).addClass("sortnum-sel"), $(this).attr("check", "1"), c && c.pvalue && (c.value = c.pvalue || "")), displayRelationByType(a, "li.ui-li-static", 3), verifyCheckMinMax(a, !1, !0, this), jump(a, this), window.createItem && createItem(a, !0), saveAnswer(a), b.preventDefault()
		}), $("input.OtherText", a).bind("click", function(b) {
			var c, d, e, f;
			b.stopPropagation(), b.preventDefault(), c = $(this).attr("rel"), d = $("#" + c).eq(0).parent("li.ui-li-static"), e = d.eq(0).parent("ul.ui-controlgroup"), 1 != d.attr("check") && (f = e.find("li[check='1']").length + 1, d.find("span.sortnum").html(f).addClass("sortnum-sel"), d.attr("check", "1")), displayRelationByType(a, "li.ui-li-static", 3), verifyCheckMinMax(a, !1, !0, this), jump(a, this), window.createItem && createItem(a, !0), saveAnswer(a), b.preventDefault()
		}), window.needSaveJoin && $("input.OtherText", a).bind("blur", function() {
			saveAnswer(a)
		})), void 0)
	}), window.totalCut && window.totalCut > 0)
		for (f = 0; f < window.totalCut; f++) {
			if (i = "divCut" + (f + 1), j = $("#" + i), k = j.attr("relation"), l = "", k && "0" != k)
				if (l = -1 != k.indexOf("|") ? "|" : "$", -1 != k.indexOf(l)) {
					m = k.split(l);
					for (b in m)
						if (n = m[b], n && -1 != n.indexOf(",")) {
							for (o = n.split(","), p = o[0], q = o[1].split(";"), r = 0; r < q.length; r++) s = p + "," + q[r], relationGroupHT[s] || (relationGroupHT[s] = new Array), relationGroupHT[s].push(j[0]);
							relationQs[p] || (relationQs[p] = new Array), relationQs[p].push(j[0]), relationGroup.push(p)
						}
				} else {
					for (o = k.split(","), p = o[0], q = o[1].split(";"), relationNotDisplayQ[j.attr("topic")] = "1", r = 0; r < q.length; r++) s = p + "," + q[r], relationHT[s] || (relationHT[s] = new Array), relationHT[s].push(j[0]);
					relationQs[p] || (relationQs[p] = new Array), relationQs[p].push(j[0])
				}
			t = j.attr("titletopic"), t && (u = questionsObject[t], u && (u[0]._titleTopic || (u[0]._titleTopic = new Array), v = j.attr("topic"), u[0]._titleTopic.push(v), w = j[0].childNodes[0], w && (w.innerHTML = w.innerHTML.replace("[q" + t + "]", "<span id='spanTitleTopic" + v + "' style='text-decoration:underline;'></span>"))))
		}
	for (x = 0; x < pageHolder.length; x++)
		for (d = pageHolder[x].questions, f = 0; f < d.length; f++) v = getTopic(d[f]), relationQs[v] && relationJoin(d[f]), y = $(d[f]).attr("refered"), y && window.createItem && createItem(d[f]);
	for (z = 0; z < h.length; z++) A = h[z], "" == A[0].style.display && displayRelationByType(A, "input[type=radio]", 1);
	for (x = 0; x < pageHolder.length; x++)
		for (d = pageHolder[x].questions, f = 0; f < d.length; f++) checkPeiE($(d[f]));
	if (null != $("#ctlNext") && $("#ctlNext").on("click", function() {
		var a, b;
		if (debugLog("准备提交答卷"), !this.disabled) {
			if (window.IsPar) return a = window.parent.document.getElementById("skin-peeler-panel"), a && (a.style.display = "none"), alertNew("此问卷为预览状态，不能提交", function() {
				a && (a.style.display = "block")
			}), void 0;
			if (needTip()) return alertNew($(divTip).text()), void 0;
			if ($("#action").val("1"), debugLog("验证提交数据"), b = validate($(this).parent())) {
				if ($("html, body").animate({
					scrollTop: $(document).height()
				}, 600), debugLog("判断是否需要验证码"), window.useAliVerify) {
					if (!isCaptchaValid) return $("#captcha").fadeIn("fast"), void 0
				} else if (tCode && "none" != tCode.style.display && ("" == submit_text.value || submit_text.value == validate_info_submit_title3)) return alertNew(validate_info_submit1, function() {
					try {
						submit_text.focus(), submit_text.click()
					} catch (a) {}
				}), void 0;
				debugLog("进入提交函数"), groupAnswer(1)
			}
		}
	}), setVerifyCode(), initSlider(), totalPage > 1 ? ($("#divSubmit").hide(), $("#divNext")[0].style.display = "", showProgress()) : $("#divSubmit").show(), window.hasPageTime && (window.divFengMian || processMinMax()), 2 == window.isChuangGuan && ($("#divSubmit").hide(), window.divFengMian || startChuangGuan(!1)), fixBottom(), $(window).load(function() {
		fixBottom()
	}), window.cepingCandidate) {
		for (B = cepingCandidate.split("&nbsp;&nbsp;&nbsp;"), C = new Object, D = 0; D < B.length; D++) E = B[D].replace(/(\s*)/g, "").replace(/&/g, "").replace(/\\/g, "").replace("&nbsp;", "").toLowerCase(), C[E] = "1";
		F = $("#div1"), $("input[type=checkbox]", F).each(function() {
			var c, a = $(this).parent().parent(),
				b = a.find(".label")[0];
			return b ? (c = b.innerHTML, c = c.replace(/(\s*)/g, "").replace(/&amp;/g, "").replace(/\\/g, "").replace("&nbsp;", "").toLowerCase(), C[c] && (this.checked = !0), void 0) : !0
		}), F[0] && (createItem(F, !1), F[0].style.display = "none", F[0].isCepingQ = "1")
	}
	for (processAward(), checkAnswer(), G = document.getElementsByTagName("img"), f = 0; f < G.length; f++) G[f].onerror = function() {
		this.onerror = null, replaceImg(this)
	}, replaceImg(G[f]);
	processSearch(), pageHolder[0] && divContent && "none" != divContent.style.display && adjustVideoHeight(pageHolder[0]), H = document.getElementById("divContent"), !H && needTip() && ($("img", divTip)[0] || ($("#divWorkError").show(), I = '<div style="padding-top: 66px; text-align: center;"><div style="margin-bottom: 20px;"><i style="width: 85px; height: 85px;display: inline-block;position: static;background-image: url(/images/weixin/new-mobile/failure@2x.png?v=1); background-size: 85px 85px;"></i></div><div style="margin-bottom: 25px; padding: 0 20px;"><h2 style="margin-bottom: 5px; font-weight: 400; font-size: 20px;">提示信息</h2><p style="font-size: 14px; color: #999999;">' + window.divTip.innerHTML + "</p>" + "</div>" + "</div>", $("#divWorkError").html(I)))
}), hasConfirmBtn = !1, itempopUpindex = 0, popUpindex = 0, firstError = null, firstMatrixError = null, needSubmitNotValid = !1, lastFixedObj = null, isValidating = !1, txtCurCity = null, prevScrollTop = 0, startAge = 0, endAge = 0, rName = "", gender = 0, marriage = 0, education = "", modata = "", clientAnswerSend = "", havereturn = !1, timeoutTimer = null, nvvv = 0, ktimes = 0, $(function() {
	function a() {
		var a, b, c;
		for (document.oncontextmenu = document.ondragstart = document.onselectstart = function() {
			return !1
		}, a = document.getElementsByTagName("input"), b = document.getElementsByTagName("textarea"), c = 0; c < a.length; c++) a[c].onpaste = function() {
			return !1
		};
		for (c = 0; c < b.length; c++) b[c].onpaste = function() {
			return !1
		}
	}

	function b() {
		window.localStorage && localStorage.setItem("wjxlastanswer" + activityId, (new Date).getTime())
	}

	function c() {
		hasSurveyTime = !0, hasMaxtime = !0;
		var a = document.getElementById("yz_popdivData");
		a && "none" != a.style.display && $("#yz_popTanChuClose").click(), autoSubmit("由于您超过" + maxOpTime + "秒没有任何操作，系统为防止作弊不允许再作答！")
	}
	var d, e, f, g, i, j;
	window.isKaoShi && (a(), window.maxOpTime && (d = !1, window.localStorage && (e = localStorage["wjxlastanswer" + activityId], e && (f = (new Date).getTime(), g = (f - e) / 6e4, 10 > g && (d = !0, c(), $("#divSubmit").hide()))), d || (document.onclick = document.onkeyup = document.onmousemove = document.onscroll = function() {
		i = new Date
	}, i = new Date, j = setInterval(function() {
		var a = new Date,
			d = parseInt((a - i) / 1e3),
			e = maxOpTime + 5 - d,
			f = document.getElementById("divTimeUp");
		0 >= e ? (clearInterval(j), b(), c()) : 5 >= e && f && ("none" == f.style.display && openDialogByIframe(300, 20, "divTimeUp"), document.getElementById("divTimeUpTip").innerHTML = "<span style='color:red;'>" + e + "</span>秒后无操作，将不允许再作答！")
	}, 1e3))))
}), window.confirmnew = function(a, b, c) {
	var e, d = document.getElementById("confirm_box");
	return d ? document.getElementById("pop_box_msg2").innerHTML = a : (d = document.createElement("div"), d.id = "confirm_box", e = "<div style='position:fixed;*position: absolute;width: 100%;height: 100%;opacity: 0.5;filter: alpha(opacity=50);background-color: black;z-index: 99998;top: 0px;left: 0px;'></div><div style='min-height: 180px;width:90%;transform: translateX(-50%);margin-top: -90px;position: fixed;z-index: 99999;top: 50%;left: 50%;background-color: white;border-radius: 8px;'><div style='font-size:18px;color:#000;font-weight:600;padding:26px 20px 10px;width:100%;text-align:center;border-radius:8px 8px 0 0;vertical-align: middle;z-index: 1;'><div>系统提示</div></div><div style='width: 100%;border-radius: 0 0 8px 8px; z-index: 1;'><div style='min-height:66px;padding:6px 20px 10px;font-size: 15px;line-height: 22px;text-align: center;' id='pop_box_msg2'>" + a + "</div>" + "<div style='width:100%;height:50px;text-align:center;border-top:1px solid #D2D3D5;'>" + "<button style='background:none;display:inline-block;width: 50%;height:50px;font-size:18px;line-height:50px;color:#313233;text-align: center;text-decoration: none;border: none;' onclick='closeNo();'>取消</button><button style='display:inline-block;width: 50%;font-size:18px;height:50px;box-sizing:border-box;line-height:50px;color:#3296FA;text-align: center;text-decoration: none;border: none;border-left:1px solid #D2D3D5;background: none;' onclick='closeConfirm();'>确定</button></div>" + "</div></div>", d.innerHTML = e, document.body.appendChild(d)), d.style.display = "", d.callback = b || "", d.callback2 = c || "", d
};