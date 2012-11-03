/**
 * SWFObject v1.4.1: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2006 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * **SWFObject is the SWF embed script formerly known as FlashObject. The name was changed for
 *   legal reasons.
 */
if (typeof deconcept == "undefined") {
    var deconcept = new Object();
}
if (typeof deconcept.util == "undefined") {
    deconcept.util = new Object();
}
if (typeof deconcept.SWFObjectUtil == "undefined") {
    deconcept.SWFObjectUtil = new Object();
}
deconcept.SWFObject = function(viewerUrl, id, w, h, flashVersion, bgColor, useExpressInstall, qualityLevel, xiRedirectUrl, redirectUrl, detectFlashKey)
{
    if (!document.createElement || !document.getElementById) {
		return;
    }
    this.DETECT_KEY = detectFlashKey ? detectFlashKey : "detectflash";
    this.skipDetect = deconcept.util.getRequestParameter(this.DETECT_KEY);
    this.params = new Object();
    this.variables = new Object();
    this.attributes = new Array();
    if (viewerUrl) {
		this.setAttribute("swf", viewerUrl);
    }
    if (id) {
	this.setAttribute("id", id);
    }
    if (w) {
	this.setAttribute("width", w);
    }
    if (h) {
	this.setAttribute("height", h);
    }
    if (flashVersion) {
		this.setAttribute("version",
			  new deconcept.PlayerVersion(flashVersion.toString().
						      split(".")));
    }
    this.installedVer =
	deconcept.SWFObjectUtil.getPlayerVersion(this.
						 getAttribute("version"),
						 useExpressInstall);
    if (bgColor) {
		this.addParam("bgcolor", bgColor);
    }
    var q = qualityLevel ? qualityLevel : "high";
    this.addParam("quality", q);
    this.setAttribute("useExpressInstall", useExpressInstall);
    this.setAttribute("doExpressInstall", false);
    var _d = (xiRedirectUrl) ? xiRedirectUrl : window.location;
    this.setAttribute("xiRedirectUrl", _d);
    this.setAttribute("redirectUrl", "");
    if (redirectUrl) {
		this.setAttribute("redirectUrl", redirectUrl);
    }
};

deconcept.SWFObject.prototype = {
  setAttribute:function(_e, _f) {
	this.attributes[_e] = _f;
    }
  , getAttribute:function(_10) {
	return this.attributes[_10];
    }
  , addParam:function(_11, _12) {
	this.params[_11] = _12;
    }
  , getParams:function() {
	return this.params;
    }
  , addVariable:function(_13, _14) {
	this.variables[_13] = _14;
    }
  , getVariable:function(_15) {
	return this.variables[_15];
    }
  , getVariables:function() {
	return this.variables;
    }
  , getVariablePairs:function() {
	var _16 = new Array();
	var key;
	var _18 = this.getVariables();
	for (key in _18) {
	    _16.push(key + "=" + _18[key]);
	}
	return _16;
    }
  , getSWFHTML:function() {
	var _19 = "";
	if (navigator.plugins && navigator.mimeTypes
	    && navigator.mimeTypes.length) {
	    if (this.getAttribute("doExpressInstall")) {
		this.addVariable("MMplayerType", "PlugIn");
	    }
	    _19 =
		"<embed type=\"application/x-shockwave-flash\" src=\"" +
		this.getAttribute("swf") + "\" width=\"" +
		this.getAttribute("width") + "\" height=\"" +
		this.getAttribute("height") + "\"";
	    _19 +=
		" id=\"" + this.getAttribute("id") + "\" name=\"" +
		this.getAttribute("id") + "\" ";
	    var _1a = this.getParams();
	    for (var key in _1a) {
		_19 +=[key] + "=\"" + _1a[key] + "\" ";
	    }
	    var _1c = this.getVariablePairs().join("&");
	    if (_1c.length > 0) {
		_19 += "flashvars=\"" + _1c + "\"";
	    }
	    _19 += "/>";
	} else {
	    if (this.getAttribute("doExpressInstall")) {
		this.addVariable("MMplayerType", "ActiveX");
	    }
	    _19 =
		"<object id=\"" + this.getAttribute("id") +
		"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""
		+ this.getAttribute("width") + "\" height=\"" +
		this.getAttribute("height") + "\">";
	    _19 +=
		"<param name=\"movie\" value=\"" +
		this.getAttribute("swf") + "\" />";
	    var _1d = this.getParams();
	    for (var key in _1d) {
		_19 +=
		    "<param name=\"" + key + "\" value=\"" + _1d[key] +
		    "\" />";
	    }
	    var _1f = this.getVariablePairs().join("&");
	    if (_1f.length > 0) {
		_19 +=
		    "<param name=\"flashvars\" value=\"" + _1f + "\" />";
	    }
	    _19 += "</object>";
	}
	return _19;
    }
  , write:function(_20) {
	if (this.getAttribute("useExpressInstall")) {
	    var _21 = new deconcept.PlayerVersion([6, 0, 65]);
	    if (this.installedVer.versionIsValid(_21)
		&& !this.installedVer.versionIsValid(this.
						     getAttribute
						     ("version"))) {
		this.setAttribute("doExpressInstall", true);
		this.addVariable("MMredirectURL",
				 escape(this.
					getAttribute("xiRedirectUrl")));
		document.title =
		    document.title.slice(0,
					 47) +
		    " - Flash Player Installation";
		this.addVariable("MMdoctitle", document.title);
	    }
	}
	if (this.skipDetect || this.getAttribute("doExpressInstall")
	    || this.installedVer.versionIsValid(this.
						getAttribute("version"))) {
	    var n =
		(typeof _20 ==
		 "string") ? document.getElementById(_20) : _20;
	    n.innerHTML = this.getSWFHTML();
	    return true;
	} else {
	    if (this.getAttribute("redirectUrl") != "") {
		document.location.replace(this.
					  getAttribute("redirectUrl"));
	    }
	}
	return false;
    }
};

deconcept.SWFObjectUtil.getPlayerVersion = function(_23, _24)
{
    var playerVersion = new deconcept.PlayerVersion([0, 0, 0]);
    if (navigator.plugins && navigator.mimeTypes.length) {
		var x = navigator.plugins["Shockwave Flash"];
		if (x && x.description) {
			playerVersion =
			new deconcept.PlayerVersion(x.description.replace(/([a-z]|[A-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));
		}
    } else {
		try {
			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			for (var i = 3; axo != null; i++) {
			axo =
				new ActiveXObject("ShockwaveFlash.ShockwaveFlash." +
						  i);
			playerVersion = new deconcept.PlayerVersion([i, 0, 0]);
			}
		}
		catch(e) {
		}
		if (_23 && playerVersion.major > _23.major) {
			return playerVersion;
		}
		if (!_23
			|| ((_23.minor != 0 || _23.rev != 0) && playerVersion.major == _23.major)
			|| playerVersion.major != 6 || _24) {
			try {
			playerVersion =
				new deconcept.PlayerVersion(axo.
							GetVariable("$version").
							split(" ")[1].split(","));
			}
			catch(e) {
			}
		}
    }
    return playerVersion;
};

deconcept.PlayerVersion = function(_29)
{
    this.major = parseInt(_29[0]) != null ? parseInt(_29[0]) : 0;
    this.minor = parseInt(_29[1]) || 0;
    this.rev = parseInt(_29[2]) || 0;
};

deconcept.PlayerVersion.prototype.versionIsValid = function(fv)
{
    if (this.major < fv.major) {
	return false;
    }
    if (this.major > fv.major) {
	return true;
    }
    if (this.minor < fv.minor) {
	return false;
    }
    if (this.minor > fv.minor) {
	return true;
    }
    if (this.rev < fv.rev) {
	return false;
    }
    return true;
};

deconcept.util = {
  getRequestParameter:function(_2b) {
	var q = document.location.search || document.location.hash;
	if (q) {
	    var _2d = q.indexOf(_2b + "=");
	    var _2e =
		(q.indexOf("&", _2d) > -1) ? q.indexOf("&",
						       _2d) : q.length;
	    if (q.length > 1 && _2d > -1) {
		return q.substring(q.indexOf("=", _2d) + 1, _2e);
	    }
	}
	return "";
    }
};

deconcept.SWFObjectUtil.cleanupSWFs = function()
{
    var _2f = document.getElementsByTagName("OBJECT");
    for (var i = 0; i < _2f.length; i++) {
	for (var x in _2f[i]) {
	    if (typeof _2f[i][x] == "function") {
		_2f[i][x] = null;
	    }
	}
    }
};

if (typeof window.onunload == "function") {
    var oldunload = window.onunload;
    window.onunload = function() {
		deconcept.SWFObjectUtil.cleanupSWFs();
		oldunload();
    };
} else {
    window.onunload = deconcept.SWFObjectUtil.cleanupSWFs;
}

if (Array.prototype.push == null) {
    Array.prototype.push = function(_32) {
	this[this.length] = _32;
	return this.length;
    };
}

var getQueryParamValue = deconcept.util.getRequestParameter;
var FlashObject = deconcept.SWFObject;	// for backwards compatibility
var SWFObject = deconcept.SWFObject;
