// създава елемент и го прикачва към друг елемент
function createElement(type, id, parrent) {
	var e = document.createElement(type);
	e.setAttribute("id", id);
	parrent.appendChild(e);
}

// премахва елемент по id
function removeElement(id) {
    var e = document.getElementById(id);
    e.parentNode.removeChild(e);
}

// progress bar
var ProgressBar = function(width, barColor, textColor, parrent) {
	
	// създава progress bar-а
	this.create = function() {
		createElement("div", "progressBar", parrent);
			var divProgressBar = document.getElementById("progressBar");
			divProgressBar.style.width = width + "%";
			divProgressBar.style.height = "30px";
			divProgressBar.style.border = "2px solid";

		createElement("div", "currentProgress", divProgressBar);
			currentProgress.style.height = "100%";
			currentProgress.style.backgroundColor = barColor;
			
		createElement("div", "progressPercents", currentProgress);
			var progressPercents = document.getElementById("progressPercents");
			progressPercents.style.width = "100%";
			progressPercents.style.height = "100%";
			progressPercents.style.textAlign = "center";
			progressPercents.style.fontSize = "25px";
			progressPercents.style.color = textColor;
			progressPercents.style.overflow = "hidden";
	}
	this.create(); // създаваме го
	
	// унищожава progress bar-а
	this.destroy = function() {
		removeElement("progressBar");
	}
	
	// запълва прогреса
	this.fill = function(percents, speed) {
		switch (speed) {
			case "fast" : speed = 10; break;
			case "medium" : speed = 30; break;
			case "slow" : speed = 50; break;
		}
		var interval = setInterval(fill, speed);
		var i = 0;
		function fill(){
			i++;
			if(document.getElementById("currentProgress")!=null) document.getElementById("currentProgress").style.width = i + "%";
			if(document.getElementById("progressPercents")!= null) document.getElementById("progressPercents").innerHTML = i + " %";
			if(i == percents) clearInterval(interval); // когато се запълни до определените проценти, спираме
		}
	}
}

var CircleProgressBar = function(width, barColor, textColor, parrent) {		

	// създава progress bar-а
	this.create = function() {
		createElement("canvas", "circleProgressBar", parrent);
			var circleProgressBar = document.getElementById("circleProgressBar");
			circleProgressBar.setAttribute("width", width+"px");
			circleProgressBar.setAttribute("height", width+"px");
	}
	this.create(); // създаваме го
	
	// унищожава progress bar-а
	this.destroy = function() {
		removeElement("circleProgressBar");
	}
	
	// запълва прогреса
	this.fill = function(percents, speed) {
		switch (speed) {
			case "fast" : speed = 20; break;
			case "medium" : speed = 40; break;
			case "slow" : speed = 60; break;
		}
		var interval = setInterval(fill, speed);
		var i = 1.5;
		function fill(){	
			// изчисляваме в проценти
			PI2 = Math.PI *2;
			var inPercents = parseInt(i*Math.PI / PI2 * 100)-75;
			if(inPercents == Math.ceil(percents/5)*5) { // когато се запълни до определените проценти, спираме
				clearInterval(interval);
				return;
			}
		
			var canvas = document.getElementById("circleProgressBar");
			if (canvas == null) return;
			var ctx = canvas.getContext("2d");
			i = +(i+0.1).toFixed(1);
			ctx.beginPath();
			ctx.lineWidth = 20;
			ctx.arc(canvas.width/2,canvas.height/2,canvas.width/2.5,1.5*Math.PI,i*Math.PI); // 1.5 до 3.5
			ctx.stroke();
			ctx.strokeStyle = barColor;
			
			// закриваме процентите
			ctx.beginPath();
			ctx.arc(canvas.width/2,canvas.height/2,canvas.width/3, 0, 2 * Math.PI);
			ctx.fillStyle = "white";
			ctx.fill();
			
			// изписваме процентите
			ctx.font = canvas.width/5 + "px Arial";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			
			ctx.fillStyle = textColor;
			ctx.fillText(inPercents+5 + " %",canvas.width/2,canvas.height/2);
		}
	}
}