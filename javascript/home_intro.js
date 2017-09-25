(function(document, window, global) {
	
	var setup = function(el, cnv) {
		cnv.fillRect(0, 0, el.width, el.height);
		cnv.strokeStyle="#2c3e50";
		cnv.lineWidth = 10;
		cnv.strokeRect(0, 0, el.width, el.height);
	}
	
	global.startIntroAnimation = function() {
		var cnvEl = document.getElementById("main-animation-intro");
		var cnv = cnvEl.getContext("2d");
		setup(cnvEl, cnv);
	}
} (document, window, this));