/*
 * ConsoleCNV animation small lib
 * Created by Gabriel C. (https://github.com/WoodenBell)
 */


(function(document, window, global) {
	
	global.consoleCNV = {
		author: "WoodenBell",
		version: "1.0"
	}
	
	
	var nextLineTyping = function(self) {
		
		if(!self.running) return;
		
		clearTypeBar(self);
		self.typeBarX = self.config.charWidth;
		self.typeBarY += self.config.charHeight * 2;
	}
	
	consoleCNV.doInstantTyping = function(self, string, nextLine, recall) {
		
		if(!self.running) return;
		
		self.shouldDrawTypeBar = false;
		
		doTyping(self, string);
		
		self.shouldDrawTypeBar = true;
		
		if(nextLine) nextLineTyping(self);
		
		recall();
	}
	
	consoleCNV.doTypingSequence = function(self, string, nextLine, recall) {
		
		if(!self.running) return;
		
		self.shouldDrawTypeBar = false;
		
		var i = 0
		var interval = setInterval(function() {
			if(i >= string.length) {
				clearInterval(interval);
				if(nextLine) nextLineTyping(self);
				recall();
				return;
			}
			doTyping(self, string[i]);
			i++;
		}, 200);
		
		
		self.shouldDrawTypeBar = true;
	}
	
	var doTyping = function(self, str) {
		
		if(!self.running) return;
		
		clearTypeBar(self);
		
		self.cnv.font = self.config.font;
		self.cnv.textAlign = "left";
		self.cnv.fillStyle = self.config.charColor
		self.cnv.fillText(str, self.typeBarX, self.typeBarY + self.config.charHeight);
		
		self.typeBarX += str.length * self.config.charWidth;
		drawTypeBar(self);
	}
	
	var drawTypeBar = function(self) {
		
		if(!self.running || !self.shouldDrawTypeBar) return;

		self.cnv.fillStyle = self.config.typeBarColor;
		self.cnv.fillRect(self.typeBarX, self.typeBarY, self.config.typeBarWidth, self.config.typeBarHeight);
		self.drawOrClearTypeBarFlag = false;
	}
	
	var clearTypeBar = function(self) {
		
		if(!self.running || !self.shouldDrawTypeBar) return;

		self.cnv.fillStyle = self.config.consoleBackgroundColor;
		self.cnv.fillRect(self.typeBarX, self.typeBarY, self.config.typeBarWidth, self.config.typeBarHeight);
		
		self.drawOrClearTypeBarFlag = true;
	}
	
	consoleCNV.create = function(elm, config) {
		
		if(elm == null
			|| elm == undefined
			|| config == null
			|| config == undefined) return;
		
		var canvas = elm.getContext("2d");
		
		if(canvas == null) return;
		
		canvas.fillRect(0, 0, elm.width, elm.height);
		canvas.strokeStyle = config.consoleBorderColor;
		canvas.lineWidth = config.consoleBorder;
		canvas.strokeRect(0, 0, elm.width, elm.height);
		
		consoleCNVObj = {
				el: elm,
				cnv: canvas,
				config: config,
				typeBarX: 20,
				typeBarY: 20,
				drawOrClearTypeBarFlag: true,
				shouldDrawTypeBar: true,
				running: false
		}
		
		return consoleCNVObj;
	}
	
	consoleCNV.start = function(consoleCNVObj) {
		
		consoleCNVObj.running = true;
		
		setInterval(function() {
			
		
			if(consoleCNVObj.drawOrClearTypeBarFlag) {
				
				drawTypeBar(consoleCNVObj);
				
			} else {
				
				clearTypeBar(consoleCNVObj);
				
			}
	}, 700);
}
	
	consoleCNV.pause = function(consoleCNVObj) {
		consoleCNVObj.running = false;
	}
	
} (document, window, this));