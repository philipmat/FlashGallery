function SimplePhoto() {
	this.album = "";
}

SimplePhoto.viewerBaseLocation = "./";
SimplePhoto.galleryBaseLocation = "./";
SimplePhoto.albumDataFileName = "gallery.xml";
SimplePhoto.flashContentElement = "flashcontent";

SimplePhoto.prototype.setAlbum = function(albumName) {
	this.album = albumName;
}

SimplePhoto.prototype.updateUrl = function() {
	document.location.hash = "#" + this.album;
}

SimplePhoto.prototype.parseUrl = function() {
	this.album = document.location.hash.toString().substring(1);
}

SimplePhoto.prototype.loadAlbum = function() {
	if (this.album != "") {
		var fo = new SWFObject(SimplePhoto.viewerBaseLocation + "viewer.swf", "viewer", "100%", "100%", "8", "#0", true);	
		fo.addParam("wmode", "transparent");
		fo.addVariable("preloaderColor", "0xf1f1c6");
		var albumDataUrl = SimplePhoto.galleryBaseLocation;
		if (this.album.startsWith('http://')) {
			// absolute path to albumDataFileName
			albumDataUrl = this.album;
		} else {
			// append / if needed
			albumDataUrl += (SimplePhoto.galleryBaseLocation.endsWith('/') ? '' : '/') + this.album;
		}
		albumDataUrl += (this.album.endsWith('/') ? '' : '/');
		var xmlDataPath = albumDataUrl + SimplePhoto.albumDataFileName;
		//~ xmlDataPath = prompt('xmlDataPath', albumDataUrl + SimplePhoto.albumDataFileName);
		fo.addVariable("xmlDataPath", xmlDataPath);	
		fo.write(SimplePhoto.flashContentElement);
	}
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(prefix) {
//    return (this.substr(0, prefix.length) == prefix);
    return (this.indexOf(prefix) === 0);
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(suffix) {
    var startPos = this.length - suffix.length;
    if (startPos < 0) {
      return false;
    }
    return (this.lastIndexOf(suffix, startPos) == startPos);
  };
}



var photoManager = new SimplePhoto();

function selectAlbum(albumName) {
	//~ debugger;
	if (albumName == null || albumName == "") return;
	
	photoManager.setAlbum(albumName);
	photoManager.updateUrl();
	photoManager.loadAlbum();
}


function loadAlbum() {
	photoManager.parseUrl();
	if (photoManager.album != "") {
		photoManager.loadAlbum();
	}
}


if (typeof window.onload == "function") {
    var oldload = window.onload;
    window.onload = function() {
		//~ alert('loadAlbum');
		loadAlbum();
		oldload();
    };
} else {
	//~ alert('single loadAlbum');
    window.onload = function() {
		window.setTimeout(loadAlbum, 1000);
	}
}
