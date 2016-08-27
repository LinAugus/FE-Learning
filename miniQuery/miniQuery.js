// 实现一个迷你的jQuery类库

// 创建一个闭包，避免全局变量的泛滥
(function(window, document){
    var w = window,
        doc = document;
    var Query = function(selector){
        return new Query.prototype.init(selector);
    }
    Query.prototype = {
        contructor : Query,
        length: 0,
        splice: [].splice,
        selector: '',
        init: function(selector){
            // dom选择的一些判断
        }
    }
    Query.prototype.init.prototype = Query.prototype;
    Query.ajax = function(){
        console.log(this);
    }
    window.ii = Query;
})(window, document);
