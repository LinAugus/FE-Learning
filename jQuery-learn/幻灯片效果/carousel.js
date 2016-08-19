;(function($){


var Carousel = function(poster){
	//保存单个旋转木马参数
	this.poster = poster;
	//默认配置参数
	this.setting = {
		"width":1000,
		"height":270,
		"posterWidth":640,
		"posterHeight":270,
		"scale":0.9,
		"speed":500,
		"verticalAlign":"middle"
	};
	$.extend(this.setting,{"width":900});
	console.log(this.setting);
}

Carousel.prorotype = {
	//获取人工配置参数

};

Carousel.init = function(posters){
	var _this = this;
	posters.each(function(){
		new _this($(this));
	});
}

window["Carousel"] = Carousel;

})(jQuery);