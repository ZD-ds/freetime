/* 鎿嶄綔浜嬩欢*/
var EventUtil={
		  addHandler:function(element,type,handler){
			  if(element.addEventListener){
				  element.addEventListener(type,handler,false);
			  }else if(element.attachEvent){
				  element.attachEvent("on"+type,handler);
			  }else{
				  element["on"+type]=handler;
			  }
		  },
		  removeHandler:function(element,type,handler){
			   if(element.removeEventListener){
				  element.removeEventListener(type,handler,false);
			  }else if(element.detachEvent){
				  element.detachEvent("on"+type,handler);
			  }else{
				  element["on"+type]=handler;
			  }
		  },
		  getEvent:function(e){
			  return e ? e:window.event;
		  },
		  getTarget:function(e){
			return e.target||e.srcElement;  
		  },
		  preventDefault:function(e){
		     if(e.preventDefault){
				 e.preventDefault();
			 }else{
				 e.returnValue=false;
			 }   
	      },
		  stopPropagation:function(e){
			  if(e.stopPropagation){
				  e.stopPropagation();
			  }else{
				  e.cancelBubble=true;	
			  }
		  }
	  };
/*鎿嶄綔Class*/
var Opclass={
	 addClass: function (obj, cls) {
		      
		    if(obj.className.indexOf(cls)>=0)return;/*闃叉閲嶅*/
		  
	 		var obj_class = obj.className, 
	 			blank = (obj_class != '') ? ' ' : ''; 
	 		added = obj_class + blank + cls; 
	 		obj.className = added;
	 	},

	 	removeClass: function (obj, cls) {
	 		var obj_class = ' ' + obj.className + ' ';
	 		obj_class = obj_class.replace(/(\s+)/gi, ' '), 
	 			removed = obj_class.replace(' ' + cls + ' ', ' '); 
	 		removed = removed.replace(/(^\s+)|(\s+$)/g, ''); 
	 		obj.className = removed; 
	 	},

	 	hasClass: function (obj, cls) {
	 		var obj_class = obj.className,
	 			obj_class_lst = obj_class.split(/\s+/); 
	 		x = 0;
	 		for (x in obj_class_lst) {
	 			if (obj_class_lst[x] == cls) {
	 				return true;
	 			}
	 		}
	 		return false;
	 	}
};
var Model={
	outoutMask:function(e){
		 e=EventUtil.getEvent(e);
		 Opclass.removeClass(document.getElementById("cover"),"none");
		 Opclass.removeClass(document.getElementById("cover-body"),"none");
		 EventUtil.stopPropagation(e);
	},
	disapperMask:function(){
		 Opclass.addClass( document.getElementById("cover"),"none");
		 Opclass.addClass( document.getElementById("cover-body"),"none");
	},
	fillMask:function(title,desc){
	    document.getElementsByClassName("panel-heading")[0].innerHTML=title;
		document.getElementsByClassName("panel-body")[0].innerHTML=desc;
    }
};
var Ajax={
    get: function(url, fn) {
        var obj = new XMLHttpRequest();  // XMLHttpRequest瀵硅薄鐢ㄤ簬鍦ㄥ悗鍙颁笌鏈嶅姟鍣ㄤ氦鎹㈡暟鎹�         
        obj.open('GET', url, true);
        obj.onreadystatechange = function() {
            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4璇存槑璇锋眰宸插畬鎴�
                fn.call(this, obj.responseText);  //浠庢湇鍔″櫒鑾峰緱鏁版嵁
            }
        };
        obj.send();
    },
    post: function (url, data, fn) {         // datat搴斾负'a=a1&b=b1'杩欑瀛楃涓叉牸寮忥紝鍦╦q閲屽鏋渄ata涓哄璞′細鑷姩灏嗗璞¤浆鎴愯繖绉嶅瓧绗︿覆鏍煎紡
        var obj = new XMLHttpRequest();
        obj.open("POST", url, true);
        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // 娣诲姞http澶达紝鍙戦�淇℃伅鑷虫湇鍔″櫒鏃跺唴瀹圭紪鐮佺被鍨�
        obj.onreadystatechange=function(e) {
        	if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304鏈慨鏀�
                fn.call(this, obj.responseText);
            }
        };
        obj.send(data);
    }
};
var globleResult=null;
/*杩欐槸鍒嗛〉鎻掍欢*/
/*var Page={
	pageNumber:0,
	selectIndex:0,
	dataNumber:0,
	initPage:function(data){},
}*/
//姝ゅ璞′负model闆嗗悎
/*var doc=document;
var Model={
	outMask:function(e){
		 e=EventUtil.getEvent(e);
		 doc.getElementById("cover").className="block";
		 EventUtil.stopPropagation(e);
	}
	
};*/
