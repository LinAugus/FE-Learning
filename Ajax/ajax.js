var request;

if(window.XMLHttpRequest){

      request = new XMLHttpRequest(); //ie7/webkit/opera/Gecko

}else{

      request = new ActiveXOject("Microsoft.XMLHTTP");//IE6

}

// 一个ajax的请求过程

var request = new XMLHttpRequest(); //实例化对象

request.open("GET","get.php",true); //建立请求

request.send(); // 发送请求

//监听服务器响应

request.onreadystatechange = function(){
	if(request.readyState === 4 & request.status === 200){
		// do something 
		request.responseText
	}
}