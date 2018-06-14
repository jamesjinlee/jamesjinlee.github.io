var RENDERER = {
	LANTERN_COUNT: 300,
	LANTERN_SIZE : 40,
	LAUNCH_INTERVAL : 30,
	THETA_RANGE : {min : 20 * Math.PI / 180, max : 70 * Math.PI / 180},
	SHADOW_SCALE : 1.5,
	DELTA_THETA : Math.PI / 1000,
	
	init : function(){
		this.setParameters();
		this.reconstructMethod();
		this.createImage();
		
		for(var i = 0; i < this.LANTERN_COUNT; i++){
			this.createController(true);
		}
		this.render();
	},
	setParameters : function(){
		this.$container = $('#jsi-lantern-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.distance = Math.sqrt(this.width * this.width + this.height * this.height);
		this.canvas = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container).get(0);
		this.context = this.canvas.getContext('2d');
		
		this.backgroundGradient = this.context.createRadialGradient(this.width, 0, 0, this.width, 0, this.distance);
		this.backgroundGradient.addColorStop(0, 'hsl(200, 100%, 0%)');
		this.backgroundGradient.addColorStop(1, 'hsl(200, 100%, 20%)');
		
		this.theta = Math.PI;
		
		this.riverX = this.width - this.height * Math.tan(this.THETA_RANGE.min) + this.LANTERN_SIZE;
		this.riverY = this.width / Math.tan(this.THETA_RANGE.max);
		this.lanterns = [];
	},
	reconstructMethod : function(){
		this.render = this.render.bind(this);
	},
	createImage : function(){
		this.lantern = $('<canvas />').attr({width : this.LANTERN_SIZE, height : this.LANTERN_SIZE}).get(0);
		this.createLanternImage(this.lantern, 2, 1);
		
		this.shadow = $('<canvas />').attr({width : this.LANTERN_SIZE, height : this.LANTERN_SIZE * this.SHADOW_SCALE}).get(0);
		this.createLanternImage(this.shadow, 0.5, this.SHADOW_SCALE);
		this.applyEffect(this.shadow);
	},
	createLanternImage : function(canvas, lineWidth, scale){
		var context = canvas.getContext('2d'),
			size = this.LANTERN_SIZE / 2,
			gradient = context.createRadialGradient(size, size, 0, size, size, size * Math.sqrt(2));
		
		gradient.addColorStop(0, 'hsl(50, 100%, 60%)');
		gradient.addColorStop(0.5, 'hsl(40, 100%, 60%)');
		gradient.addColorStop(1, 'hsl(30, 100%, 60%)');
		
		context.save();
		context.scale(1, scale);
		context.strokeStyle = '#333333';
		context.lineWidth = lineWidth;
		context.fillStyle = gradient;
		context.fillRect(0, 0, this.LANTERN_SIZE, this.LANTERN_SIZE);
		context.rect(0, 0, this.LANTERN_SIZE, this.LANTERN_SIZE);
		context.stroke();
		
		context.beginPath();
		context.moveTo(this.LANTERN_SIZE / 3, 0);
		context.lineTo(this.LANTERN_SIZE / 3, this.LANTERN_SIZE);
		context.stroke();
		
		context.beginPath();
		context.moveTo(this.LANTERN_SIZE * 2 / 3, 0);
		context.lineTo(this.LANTERN_SIZE * 2 / 3, this.LANTERN_SIZE);
		context.stroke();
		context.restore();
	},
	applyEffect : function(canvas){
		var context = canvas.getContext('2d'),
			source = context.getImageData(0, 0, canvas.width, canvas.height),
			sourceData = source.data,
			destination = context.createImageData(canvas.width, canvas.height),
			destinationData = destination.data;
			
		for(var y = 1, lengthy = source.height; y < lengthy - 1; y++){
			for(var x = 1, lengthx = source.width; x < lengthx - 1; x++){
				var currentIndex = (y * lengthx + x) * 4,
					upperIndex = currentIndex - lengthx * 4,
					lowerIndex = currentIndex + lengthx * 4;
				
				for(var c = 0; c < 3; c++){
					destinationData[currentIndex + c]
						= (sourceData[upperIndex + c - 4] + sourceData[upperIndex + c] + sourceData[upperIndex + c + 4]
						+ sourceData[currentIndex + c - 4] + sourceData[currentIndex + c] + sourceData[currentIndex + c + 4]
						+ sourceData[lowerIndex + c - 4] + sourceData[lowerIndex + c] + sourceData[lowerIndex + c + 4]) / 9;
				}
				destinationData[currentIndex + 3] = sourceData[upperIndex + 3];
			}
		}
		var ridge = this.LANTERN_SIZE / 8;
		
		for(var y = 0, lengthy = destination.height; y < lengthy; y++){
			for(var x = 0, lengthx = destination.width; x < lengthx; x++){
				var currentIndex = (y * lengthx + x) * 4,
					opacity = 255 * Math.pow(lengthy - y, 3) / Math.pow(lengthy, 3) | 0;
					
				if(y % 2 == 0 && (x < ridge || x >= lengthx - ridge)){
					opacity = 0;
				}
				destinationData[currentIndex + 3] = opacity;
			}
		}
		context.putImageData(destination, 0, 0);
	},
	createController : function(toInit){
		this.launch = this.LAUNCH_INTERVAL;
		this.lanterns.push(new LANTERN(this.width, this.height, this.lantern, this.shadow, this.LANTERN_SIZE, toInit));
	},
	render : function(){
		requestAnimationFrame(this.render);
		
		this.lanterns.sort(function(lantern1, lantern2){
			return lantern1.theta > lantern2.theta ? 1 : -1;
		});
		this.context.fillStyle = this.backgroundGradient;
		this.context.fillRect(0, 0, this.width, this.height);
		
		var luminance = 2 * Math.cos(this.theta),
			riverGradient = this.context.createRadialGradient(this.width, 0, 0, this.width, 0, this.distance);
			
		riverGradient.addColorStop(0, 'hsl(200, 100%, ' + (2 + luminance) + '%)');
		riverGradient.addColorStop(1, 'hsl(200, 100%, ' + (22 + luminance) + '%)');
		
		this.context.fillStyle = riverGradient;
		this.context.beginPath();
		this.context.moveTo(this.width, 0);
		this.context.lineTo(this.width, this.LANTERN_SIZE * 2);
		this.context.lineTo(this.riverX, this.height);
		this.context.lineTo(0, this.height);
		this.context.lineTo(0, this.riverY);
		this.context.closePath();
		this.context.fill();
		
		for(var i = this.lanterns.length - 1; i >= 0; i--){
			this.lanterns[i].renderShadow(this.context);
		}
		for(var i = this.lanterns.length - 1; i >= 0; i--){
			if(this.lanterns[i].renderLantern(this.context)){
				this.lanterns.splice(i, 1);
			}
		}
		if(this.lanterns.length < this.LANTERN_COUNT && --this.launch == 0){
			this.createController(false);
		}
		this.theta += this.DELTA_THETA;
		this.theta %= Math.PI * 2;
	}
};
var LANTERN = function(width, height, lantern, shadow, lanternSize, toInit){
	this.width = width;
	this.height = height;
	this.lantern = lantern;
	this.shadow = shadow;
	this.lanternSize = lanternSize;
	
	this.init(toInit);
};
LANTERN.prototype = {
	SHADOW_OFFSET : 10,
	VELOCITY : 0.5,
	MIN_SCALE : 0.5,
	THETA_RANGE : {min : 20 * Math.PI / 180, max : 70 * Math.PI / 180},
	COUNT_RANGE : {min : 0, max : 8000},
	DELTA_PHI : Math.PI / 100,
	
	init : function(toInit){
		this.setParameters();
		
		if(toInit){
			this.setup();
		}
	},
	setParameters : function(){
		this.x = this.width;
		this.y = 0;
		
		this.theta = this.getRandomValue(this.THETA_RANGE);
		this.phi = this.getRandomValue({min : 0, max : Math.PI * 2});
		
		this.vx = -this.VELOCITY * Math.sin(this.theta);
		this.vy = this.VELOCITY * Math.cos(this.theta);
	},
	setup : function(){
		for(var i = 0, count = this.getRandomValue(this.COUNT_RANGE); i < count; i++){
			var scale = Math.pow(this.MIN_SCALE + (1 - this.MIN_SCALE) * this.y / this.height, 2);
			this.x += this.vx * scale;
			this.y += this.vy * scale;
			
			this.phi += this.DELTA_PHI
			this.phi %= 360;
		}
	},
	getRandomValue : function(range){
		return range.min + (range.max - range.min) * Math.random();
	},
	renderLantern : function(context){
		var scale = this.render(this.lantern, context, Math.sin(this.phi) * this.SHADOW_OFFSET / 4);
		
		this.x += this.vx * scale;
		this.y += this.vy * scale;
		
		this.phi += this.DELTA_PHI
		this.phi %= 360;
		
		return this.x < -this.LANTERN_SIZE || this.y > this.height + this.lanternSize;
	},
	renderShadow : function(context){
		this.render(this.shadow, context, this.lanternSize + this.SHADOW_OFFSET - Math.sin(this.phi) * this.SHADOW_OFFSET / 4);
	},
	render : function(canvas, context, y){
		var scale = Math.pow(this.MIN_SCALE + (1 - this.MIN_SCALE) * this.y / this.height, 2);
		
		context.save();
		context.translate(this.x, this.y);
		context.scale(scale, scale);
		context.drawImage(canvas, -this.lanternSize / 2, y);
		context.restore();
		
		return scale;
	}
};
$(function(){
	RENDERER.init();
});