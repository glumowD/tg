var arr = [];
var health = 10000;
// Панель управления и индикаторы
function Bar(indicator,time) {
	this.indicator = indicator;
	this.time = time;
	this.val = indicator.offsetWidth;
	this.counter;
	this.initEvents();
	this.progress();
	this.character();
}
Bar.prototype.progress = function() {
	var self = this;
	setInterval(function() {
		self.counter = self.val -= 20;
		if(self.counter < 0) self.counter = 0; 
		self.indicator.style.transition = 'all .5s';
		self.indicator.style.width = self.counter + 'px' ;
	},self.time);

};
Bar.prototype.initEvents = function() {
	var btn = document.getElementsByClassName('btn-action');
	var safe = this;
	for(var i = 0; i<btn.length; i++){
		btn[i].addEventListener('click', function(e) {
			if(safe.counter == 200) return false;
		const curBtn = e.currentTarget;
		if(curBtn.classList[0] == safe.indicator.dataset.indicator ){
				safe.indicator.style.transition = 'all 1s';
				safe.indicator.style.width = 200 + 'px';
				safe.val = 200;
			}
	}, false);
	}
};
	
// Персонаж на канвасе

Bar.prototype.character = function() {
	var scale = 0;
	var safe = this;
	var canvas = document.getElementById("character");
	var ctx = canvas.getContext("2d");
	var y = 240;
	var r = 20;
	var indic = document.getElementsByClassName('progreess-bar')
	setInterval(function() {
		for(var i = 0; i<indic.length; i++){
			arr[i] = indic[i].offsetWidth;
			if(arr[i] == 0){
				health--;
				if(health <= -1000) health = -1000;
			}
		}
		if(health == -1000){
			setTimeout(function() {
				var wasted = document.getElementById('wasted');
				wasted.style.zIndex = '1';
				wasted.style.opacity = '1';
			},60000)
		}
		if(arr[0] > 0 && arr[1] > 0 && arr[2] > 0  && arr[3] > 0  && arr[4] > 0  && arr[5] > 0){
			health++;
			if(health >= 10000) health = 10000;
		}
		if(health <= 1000){
			if(r < 5) r = 5;
			if(y < 200) y = 200;
            		y -=0.3;
            		r-=0.1;
            	}else if(health > 0 && health < 5000){
            		if(r > 20) r = 20;
					if(y > 240) y = 240;
            		y +=0.3;
            		r +=0.1;
            	}else if(health > 5000){
					if(y > 280) y = 280;
            		y +=0.3;
            	}
		ctx.beginPath();
  			// туловище
            ctx.moveTo(450,200);
		    ctx.quadraticCurveTo(450,100,520,100);
		    ctx.quadraticCurveTo(580,100,580,200);
		    ctx.quadraticCurveTo(580,300,520,300);
		    ctx.quadraticCurveTo(450,300,450,200);
		    ctx.fillStyle = '#00A89C';
		    ctx.fill();
             
            // рот
            ctx.beginPath();
            ctx.moveTo(470, 240);
            ctx.quadraticCurveTo(515, y, 560, 240);
            ctx.strokeStyle = '#7C1C23';
            ctx.lineWidth = '5';
          	ctx.stroke()
 
            //глаза
            ctx.beginPath();
            ctx.arc(515, 150, 30, 0, 2 * Math.PI);
            ctx.fillStyle = "#F2F2F2";
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(515, 150, r, 0, 2 * Math.PI);
            ctx.fillStyle = "#000";
            ctx.fill();
            ctx.closePath();
	},1);
}

const indicator1 = document.querySelector('.thirst .progreess-bar');
const indicator2 = document.querySelector('.hunger .progreess-bar');
const indicator3 =  document.querySelector('.boredom .progreess-bar');
const indicator4 = document.querySelector('.indicator-toilet .progreess-bar');
const indicator5 = document.querySelector('.pollution .progreess-bar');
const indicator6 =  document.querySelector('.fatigue .progreess-bar');
const thirst = new Bar(indicator1, 30000);
const hunger = new Bar(indicator2, 40000);
const boredom = new Bar(indicator3, 50000);
const toilet = new Bar(indicator4, 30000);
const pollution = new Bar(indicator5, 50000);
const fatigue = new Bar(indicator6, 60000);
