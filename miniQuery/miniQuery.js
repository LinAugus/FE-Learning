// 实现一个迷你的jQuery类库

// 创建一个闭包，避免全局变量的泛滥
(function(window, document) {
    var w = window,
        doc = document;
    var Query = function(selector) {
        return new Query.prototype.init(selector);
    }
    Query.prototype = {
        contructor : Query,
        length: 0,
        splice: [].splice,
        selector: '',
        init: function(selector){
            // dom选择的一些判断
            if(!selector) { return this; }
            if(typeof selector == 'object'){
                var selector = [selector];
                for (var i = 0; i < selector.length; i++) {
                    this[i] = selector[i];
                }
                this.length = selector.length;
                return this;
            }else if(typeof selector == 'function') {
                Query.ready(selector);
                return;
            }

        }
    }
    Query.prototype.init.prototype = Query.prototype;
    Query.ready = function(fn){
        document.addEventListener('DOMContentLoaded', function() {
            fn && fn();
        },false);
        document.removeEventListener('DOMContentLoaded', fn, true);
    }
    Query.each = function(obj, callback) {
        var len = obj.length,
            constru = obj.constructor,
            i = 0;
        // 判断是否是 Query 对象
        if (constru === window.Q_) {
            for(; i < len; i++) {
                var val = callback.call(obj[i], i, obj[i]);
                if(val === false) break;
            }
        // 判断是否是个数组
        }else if (isArray(obj)) {
            for(; i < len; i++) {
                var val = callback.call(obj[i], i, obj[i]);
                if(val === false) break;
            }
        // 判断一个普通对象
        }else{
            for(i in obj) {
                var val = callback.call(obj[i], i, obj[i]);
                if(val === false) break;
            }
        }
    }
    Query.ajax = function() {
        console.log(this);
    }
    window.Q_ = Query;
})(window, document);


hasClasss: function(cls) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)';
    var arr = [];
    for(var i = 0; i< this.length; i++) {
        if(this[i].className.match(reg)) return true;
    }
    return false;
}

addClass: function(cls) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    for (var i = 0; i < this.length; i++) {
        if (!this[i].className.match(reg)) {
            this[i].className += ' '+ cls;
        }
    }
    return this;
}

removeClass: function(cls) {
    var reg = new RegExp('(\\s)|^' + cls + '(\\s|$)');
    for (var i = 0; i < this.length; i++) {
        if(this[i].className.match(reg)){
            this[i].className = this[i].className.replace(cls, '');
        }
    }
}
css: function(attr, val) {
    for (var i = 0; i < this.length; i++) {
        if(typeof attr == 'string') {
            if(argument.length == 1){
                return getComputedStyle(this[i], null)[attr];
            }
            this[i].style[attr] = val;
        }else {
            var _this = this[i];
            Q_.each(attr, function(attr, val) {
                _this.style.cssText += '' + attr + ':' + val + ';';
            });
        }
    }
    return this;
}


function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType != 1) {}
    return cur;
}

next: function() {
    return sibling(this[0], "nextSibling");
}
prev: function() {
    return sibling(this[0], "previousSibling");
}
parent: function() {
    var parent = this[0].parentNode;
    parent && parent.nodeType !== 11 ? prent : null;
    var a = Query();
    a[0] = parent;
    a.selector = parent.tagName.toLocaleLowerCase
}
parents: function() {
    var a = Query(),
        i = 0;
    while ((this[0] = this[0]['parentNode']) && this[0].nodeType !== 9) {
        if( this[0].nodeType === 1) {
            a[i] = this[0];
            i++;
        }
    }
    a.length = i;
    return a;
}
function isArray(obj) {
    return Array.isArray(obj);
}

find: function(selector) {
    if(!selector) return;
    var context = this.selector;
    return new Query(context + ' ' + selector);
},
first: function() {
    return new Query(this[0]);
},
last: function() {
    var num = this.length -1;
    return new Query(this[num]);
},
eq: function() {
    var num = num < 0 ? (this.length - 1) : num;
    return new Query(this[num]);
},
get: function() {
    var num = num < 0 ? (this.length - 1) : num;
    return this[num];
}


// ajax
Query.get = function(url, sucBack, complete) {
    var options = {
        url : url,
        success : sucBack,
        complete : complete
    };
    ajax(options);
}
Query.post = function(url, data, sucBack, complete) {
    var options = {
        url : url,
        type: "POST",
        data : data,
        sucBack : sucBack,
        complete : complete
    };
    ajax(options);
}
function ajax(options) {
    var defaultOptions = {
        url : false, // ajax 请求地址
        type : "GET",
        data: false,
        success : false, // 数据成功返回后的回调方法
        complete : false  // ajax完成后的回调方法
    };
    for(var i in defaultOptions) {
        if(options[i] === undefined) {
            options[i] = defaultOptions[i];
        }
    }
    var xhr = new XMLHttpRequest(),
        url = options.url;
    xhr.open(options.type, url);
    xhr.onreadystatechande = onStateChage;
    if(options.type === "POST") {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.send(options.data ? options.data : null);
    function onStateChage() {
        if(xhr.readyState == 4) {
            var result,
                status = xhr.status;
            if((status >= 200 && status < 300) || status == 304){
                result = xhr.responseText;
                if(window.JSON){
                    result = JSON.parse(result);
                }else {
                    result = eval('(' + result + ')');
                }
                ajaxSuccess (result, xhr);
            }else {
                console.log("ERR", xhr.status);
            }
        }
    }
    function ajaxSuccess(data, xhr) {
        var status = 'success';
        options.success && options.success(data, options, status, xhr);
        ajaxComplete(status);
    }
    function ajaxComplete(status){
        options.complete && options.complete(status);
    }
}

attr : function(attr, val) {
    for(var i = 0; i < this.length; i++) {
        if(typeof attr == 'string') {
            if(arguments.length == 1) {
                return this[i].getAttribute(attr);
            }
        }else {
            var _this = this[i];
            Q_.each(attr, function(attr, val) {
                _this.setAttribute(attr, val);
            });
        }
    }
    return this;
},
data : function(attr, val) {
    for(var i = 0; i < this.length; i++) {
        if(typeof attr =='string') {
            if(arguments.length === 1) {
                return this[i].getAttribute('data-' + attr);
            }
        }else {
            var _this = this[i];
            Q_.each(attr, function(attr, val) {
                _this.setAttribute('data-' + attr, val);
            });
        }
    }
},

html: function(value) {
    if(value === undefined && this[0].nodeType ===1) {
        return this[0].innerHTML;
    }else {
        for(var i = 0; i < this.length; i++) {
            this[i].innerHTML = value;
        }
    }
    return this;
},

text : function(val) {
    if(val === undefined && this.nodeType === 1) {
        return this[0].innerText;
    }else {
        for(var i =0; i < this.length; i++) {
            this[i].innerText = val;
        }
    }
},

function domAppend(elm, type, str) {
    elm.insertAdjacentHTML(type, str);
}

append: function(str) {
    for(var i = 0; i < this.length; i++){
        domAppend(this[i], 'beforeend', str);
    }
    return this;
},
before: function(str) {
    for(var i = 0; i < this.length; i++) {
        domAppend(this[i], 'beforeBegin', str);
    }
    return this;
},
after: function(str) {
    for(var i = 0; i < this.length; i++) {
        domAppend(this[i],'aferEnd',str);
    }
    return this;
},
remove: function() {
    for(var i = 0; i < this.length; i++) {
        this[i].parentNode.removeChild(this[i]);
    }
    return this;
}


// 事件委托
function delegate(agent, type, selector) {
    var id = agent.deleId; //先获取被委托元素的deleId
    agent.addEventListener(type, function(e) {
        var target = e.target,
            ctarget = e.currentTarget,
            bubble = true;
        while (bubble && target != ctarget) {
            if(filiter(agent, selector, target)) {
                for (var i = 0; i < Query.deleEvents[id][selector][type].length; i++) {
                    bubble = Query.deleEvents[id][selector][type][i].call(target, e);
                }
            }
            target = target.parentNode;
            return bubble;
        }
    }, false);
    function filiter(agent, selector, target) {
        var nodes = agent.querySelectorAll(selector);
        for( var i = 0; i < nodes.length; i++) {
            if(nodes[i] == target) {
                return true;
            }
        }
    }
}


Query.Events = []; // 事件绑定存放的事件
Query.guid = 0; // 事件绑定的唯一标识
Query.deleEvents = []; // 事件委托存放的事件
Query.deleId = 0; // 事件委托的唯一标识

on: function(type, selector, fn) {
    if(typeof selector == 'function') {
        fn = selector;
        for (var i = 0; i < this.length; i++) {
            if(!this[i].guid) {
                // guid 不存在，给当前dom一个guid
                this[i].guid = ++Query.guid;

                /*
                * 给Events[guid]开辟一个新对象
                * 用于存储这个dom上的所有事件方法
                */
                Query.Events[Query.guid] = {};

                Query.Events[Quert.quid][type] = [fn]
                //每个方法都是一个数组
                //给这个新对象，赋予事件数组 "click" : [fn1,fn2,...]
                bind(this[i], type, this[i].guid); //绑定事件

            }else { // guid存在的情况
                var id = this[i].guid;
                if(Query.Events[id][type]) {
                    // 如果当前事件已经存过，不用绑定事件，直接放入方法数组即可
                    Query.Events[id][type].push(fn);
                }else {
                    // 否则，是新事件就重新绑定一次
                    Query.Events[id][type] = [fn];
                    bind(this[i], type, id);
                }
            }
        }
    }
}

function bind(dom, type, guid) {
    dom.addEventListener(type, function(e) {
        for( var i = 0; i < Query.Events[guid][type].length; i++) {
            // 循环执行方法数组即可
            Query.Events[guid][type][i].call(dom, e);
        }
    }, false);
}

off: function(type, selector) {
    if(arguments.length == 0) {
        for (var i = 0; i < this.length; i++) {
            var id = this[i].guid;
            for( var j in Query.Events[id]) {
                delete Query.Events[id][j];
            }
        }
    }else if(arguments.length == 1) {
        for (var i = 0; i < this.length; i++) {
            var id = this[i].guid;
            delete Query.Events[id][type];
        }
    }else {
        //直接根据dom上存有的deleId，找到对应的deleEvents里的位置
        //删除委托元素上的type事件数组即可
        for (var i = 0; i < this.length; i++) {
            var id = this[i].deleId;
            delete Kodo.deleEvents[id][selector][type];
        }
    }
}

width: function(w) {
    if(arguments.length == 1) {
        for (var i = 0; i < this.length; i++) {
            this[i].style.width = w + 'px';
        }
    }else {
        if(this[0].docuemnt === doc) {
            return this[0].innerWidth;
        }else if(this[0].nodeType === 9) {
            return docuemnt.documentElement.clientWidth;
        }else {
            return parseInt(getComputedStyle(this[0],null)['width']);
        }
    }
},

height : function(h) {
    if(arguments.length == 1) {
        for (var i = 0; i < this.length; i++) {
            this[i].style.height = h + 'px';
        }
    } else {
        if(this[0].document === doc ) {
            return this[0].innerHeight;
        } else if (this[0].nodeType === 9 ){
            return document.documentElement.clientHeight;
        } else {
            return parseInt(getComputedStyle(this[0],null)['height']);
        }
    }
},
Query.prototype.extend = Query.extend = function() {
    var options = arguments[0];
    for( var i in options) {
        this[i] = options[i];
    }
};
