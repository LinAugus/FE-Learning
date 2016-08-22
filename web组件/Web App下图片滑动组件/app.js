;(function(){
	// 定义数据
	var list=[{
		height: 950,
		width: 800,
		img: "imgs/1.jpg"
	},{
		height: 1187,
		width: 900,
		img: "imgs/2.jpg"
	},{
		height: 766,
		width: 980,
		img: "imgs/3.jpg"
	},{
		height: 754,
		width: 980,
		img: "imgs/4.jpg"
	},{
		height: 493,
		width: 750,
		img: "imgs/5.jpg"
	},{
		height: 500,
		width: 750,
		img: "imgs/6.jpg"
	},{
		height: 600,
		width: 400,
		img: "imgs/7.jpg"
	}];

	// 构造函数
var Slider = function (opts){
	// 构造函数需要的参数
	this.wrap = opts;
	this.list = list;
	// 设定窗口比例
	this.radio = window.innerHeight / window.innerWidth;
	// 设定一页的宽度
	this.scaleW = window.innerWidth;
	// 设定初始的索引值
	this.idx = 0;
	// console.log(this.radio+','+this.scaleW+','+this.idx);
	// 构造三部曲
	// this.init();
	this.renderDOM();
	this.bindDOM();
	// console.log(this.wrap);
}

// 第一步：初始化 
Slider.init = function(opts){

	// 初始化Slider实例
	var _this = this;
	// console.log(opts);
	new _this(opts);
};
// 第二步：根据数据渲染DOM
Slider.prototype.renderDOM = function(){
	var wrap = this.wrap;
	var data = this.list;
	var len = data.length;

	this.outer = document.createElement('ul');
	for( var i=0; i< len; i++){
		var li = document.createElement('li');
		var item = data[i];
		li.style.width = window.innerWidth + 'px';
		li.style.webkitTransform = 'translate3d('+ i*this.scaleW +'px,0,0)';
		if (item) {
			// 根据窗口的比例与图片的比例来确定
			// 图片是根据宽度来等比缩放还是根据高度来等比缩放
			if(item['height']/item['width'] > this.radio){
				li.innerHTML = '<img height="'+ window.innerHeight +'" src="'+ item['img']+'" >';
			}else{
				li.innerHTML = '<img width="'+ window.innerWidth +'" src="'+ item['img']+'" >';
			}
		};
		this.outer.appendChild(li);
	}
	// ul的宽度和画布的宽度一致
	this.outer.style.width = this.scaleW + 'px';
	wrap.style.height = window.innerHeight + 'px';
	wrap.appendChild(this.outer);
};

Slider.prototype.goIndex = function(n){
	var idx = this.idx;
	var lis = this.outer.getElementsByTagName('li');
	var len = lis.length;
	var cidx;

	// 如果传数字可以直接滑动到索引
	if( typeof n == 'number'){
		cidx = idx;
	}else if(typeof n == 'string'){
		cidx = idx +n*1;
	}

	// 当索引右超出

	if(cidx > len -1){
		cidx = len -1;
	}else if(cidx < 0){
		cidx = 0;
	}
	// 保留当前索引值

	this.idx = cidx;

	//改变过渡的方式，从无动画变为有动画
	lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out';
	lis[cidx-1] && (lis[cidx-1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
	lis[cidx+1] && (lis[cidx+1].style.webkitTransition = '-webkit-transform 0.2s ease-out');

	//改变位移值
	lis[cidx].style.webkitTransform = 'translate3d(0,0,0)';
	lis[cidx-1] && (lis[cidx-1].style.webkitTransform = 'translate3d(-'+ this.scaleW+'px,0,0)');
	lis[cidx+1] && (lis[cidx+1].style.webkitTransform = 'translate3d('+ this.scaleW+'px,0,0)');

}
// 第三步：绑定DOM事件
Slider.prototype.bindDOM = function(){
	var self = this;
	var scaleW = self.scaleW;
	var outer = self.outer;
	var len = self.list.length;
	// 手指按下的处理事件
	var startHandler = function(evt){
		// 记录刚刚开始按下的时间
		self.startTime = new Date() * 1;

		// 记录手指按下的坐标
		self.startX = evt.touches[0].pageX;
		// console.log(self.startX);

		// 清除手指滑动的偏移量
		self.offsetX = 0;

		// 事件对象

		var target = evt.target;
		// console.log(target);

		while(target.nodeName != 'LI' && target.nodeName != 'BODY'){
			target = target.parentNode;
		}
		self.target = target;
	};
	// 手指移动的处理事件
	var moveHandler = function(evt){
		// 兼容 chrome android,阻止浏览器默认行为
		evt.preventDefault();

		// 计算手指的偏移量
		self.offsetX = evt.touches[0].pageX - self.startX;

		var lis = outer.getElementsByTagName('li');

		// console.log(self.offsetX);

		// 起始索引
		var i = self.idx - 1;
		// 结束索引
		var m = i + 3;
		// console.log(i + ' ' + m +' '+self.idx);

		// 最小化改变DOM属性
		for(i; i < m; i++){
			lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
			lis[i] && (lis[i].style.webkitTransform = 'translate3d('+ ((i-self.idx)*self.scaleW+self.offsetX)+'px,0,0)');
		}

	};
	var endHandler = function(evt){
		evt.preventDefault();

		// 边界值
		var boundary = scaleW / 6;

		// 手指拾起的时间值
		var endTime = new Date() * 1;

		// 所有列表项
		var lis = outer.getElementsByTagName('li');
		// 当手指移动时间超过300ms的时候，按位移算
		if(endTime - self.startTime > 300){
			if(self.offsetX >= boundary){
				self.goIndex('-1');
			}else if(self.offsetX < 0 && self.offsetX < -boundary){
				self.goIndex('+1');
			}else{
				self.goIndex('0');
			}
		}else{
			// 优化快速移动
			if(self.offsetX > 50){
				self.goIndex('-1');
			}else if(self.offsetX < -50){
				self.goIndex('+1');
			}else{
				self.goIndex('0');
			}
		}
	};
	// 绑定事件

	outer.addEventListener('touchstart', startHandler);
	outer.addEventListener('touchmove', moveHandler);
	outer.addEventListener('touchend', endHandler);
};


window['Slider'] = Slider;

})();