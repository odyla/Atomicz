/*
 * Console CANVAS animation 
 * Created by Gabriel C. (WoodenBell)
 */


(function(document, window, global) {
	
	var typeBarX = 20;
	var typeBarY = 20;
	var el;
	var cnv;
	var drawOrClearTypeBarFlag = true;
	var shouldDrawTypeBar = true;
	
	var nextLineTyping = function() {
		clearTypeBar();
		typeBarX = 20;
		typeBarY += 40;
	}
	
	var doInstantTyping = function(string, nextLine, recall) {
		
		shouldDrawTypeBar = false;
		
		doTyping(string);
		
		shouldDrawTypeBar = true;
		
		if(nextLine) nextLineTyping();
		
		recall();
	}
	
	var doTypingSequence = function(string, nextLine, recall) {
		
		shouldDrawTypeBar = false;
		
		var i = 0
		var interval = setInterval(function() {
			if(i >= string.length) {
				clearInterval(interval);
				if(nextLine) nextLineTyping();
				recall();
				return;
			}
			doTyping(string[i]);
			i++;
		}, 200);
		
		
		shouldDrawTypeBar = true;
	}
	
	var doTyping = function(str) {
		
		clearTypeBar();
		
		cnv.font = "16pt Lucida Console";
		cnv.textAlign = "left";
		cnv.fillStyle = "#ffffff";
		cnv.fillText(str, typeBarX, typeBarY + 20);
		
		typeBarX += str.length * 20;
		drawTypeBar();
	}
	
	var drawTypeBar = function() {
		cnv.fillStyle = "#2c3e50";
		cnv.fillRect(typeBarX, typeBarY, 7, 28);
	}
	
	var clearTypeBar = function() {
		cnv.fillStyle = "#000000";
		cnv.fillRect(typeBarX, typeBarY, 7, 28);
	}
	
	var setup = function() {
		cnv.fillRect(0, 0, el.width, el.height);
		cnv.strokeStyle = "#2c3e50";
		cnv.lineWidth = 10;
		cnv.strokeRect(0, 0, el.width, el.height);
		
		setInterval(function() {
			
				if(shouldDrawTypeBar) {
			
				if(drawOrClearTypeBarFlag) {
					drawTypeBar();
				} else {
					clearTypeBar();
				}
			
				drawOrClearTypeBarFlag = !drawOrClearTypeBarFlag;
			}
		}, 700);
		
		setTimeout(function() {
			
	/*---*/		doTypingSequence("Bem ", false, function() {
					setTimeout(function() {
			/*---*/		doTypingSequence("vindo ", false, function() {
							setTimeout(function() {
					/*---*/		doTypingSequence("ao ", false, function() { 
									setTimeout(function() {
							/*---*/		doTypingSequence("CLIMB!", true, function() { 
											setTimeout(function() {
									/*---*/		doInstantTyping("", true, function() { 
														setTimeout(function() {
															doTypingSequence("help", false, function() {
																	setTimeout(function() {
																		doInstantTyping("", true, function() {
																			doInstantTyping(">> CLIMB v1.0 Atomicz 2017", true, function() {
																			});
																		});
																}, 2000);
															});
														}, 1700)
													});
											}, 900);
										});
									}, 600);
								}, 500);
							});
						}, 500);
					});
				}, 700);
			}, 500);
			
			
		
		
	}
	
	global.startIntroAnimation = function() {
		el = document.getElementById("main-animation-intro");
		cnv = el.getContext("2d");
		setup();
	}
} (document, window, this));