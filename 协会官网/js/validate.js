
/*琛ㄥ崟楠岃瘉瀵硅薄*/
var FormValidate={
	$error:{
		required:false,
		maxlength:false,
		minlength:false,
		pattern:false
	},
	errorNotice:function(ele,msg){
		 ele.style.border="1px solid #FF0000";
		 if(ele.nextSibling.className=="error")this.removeError(ele.nextSibling);
		 var newele=document.createElement("div"); // 鍒涘缓涓�釜鍏冪礌鑺傜偣 
		 newele.className="error"; 
         var msgText=document.createTextNode(msg);  
		 newele.appendChild(msgText);
         var parent=ele.parentNode; // 鎵惧埌鎸囧畾鍏冪礌鐨勭埗鑺傜偣 
           if(parent.lastChild==ele){ // 鍒ゆ柇鎸囧畾鍏冪礌鐨勬槸鍚︽槸鑺傜偣涓殑鏈�悗涓�釜浣嶇疆 濡傛灉鏄殑璇濆氨鐩存帴浣跨敤appendChild鏂规硶 
               parent.appendChild(newele); 
              }else{ 
              parent.insertBefore(newele,ele.nextSibling); 
           }
    },
	/*绉婚櫎閿欒鑺傜偣*/
	removeError:function(removeObj){
		removeObj.parentNode.removeChild(removeObj); 
    },
	vaidate:function(form,args){
		for(var name in args['rules']){
			/*澶卞幓鐒︾偣杩涜鍒ゆ柇*/
			(function(name){
				EventUtil.addHandler(form.elements[name],"blur",function(e){
					
				e=EventUtil.getEvent(e);
				if(args['rules'][name].required){
				
					if(form.elements[name].value.length<=0){
					FormValidate.errorNotice(form.elements[name],args['msg'][name].required||args['msg']['msg'].required);
					  FormValidate.$error.required=true;
					  return false;
				   }else{
					  if(form.elements[name].nextSibling.className=="error"){
						 form.elements[name].style.border="1px solid #999";
						 FormValidate.removeError(form.elements[name].nextSibling);}
					  FormValidate.$error.required=false; 
				   }
				 
				}
				if(args['rules'][name].maxlength){
					var max=args['rules'][name].maxlength;
				   if(form.elements[name].value.length>max){
				      FormValidate.errorNotice(form.elements[name],args['msg'][name].maxlength||args['msg']['msg'].maxlength);
					  FormValidate.$error.maxlength=true;
					  return false;
				   }else{
					  if(form.elements[name].nextSibling.className=="error"){
						 form.elements[name].style.border="1px solid #999";
						 FormValidate.removeError(form.elements[name].nextSibling);}
					  FormValidate.$error.maxlength=false; 
				   }
				}
				if(args['rules'][name].minlength){
					var min=args['rules'][name].minlength;
				   if(form.elements[name].value.length<min){
				      FormValidate.errorNotice(form.elements[name],args['msg'][name].minlength||args['msg']['msg'].minlength);
					  FormValidate.$error.minlength=true;
					  return false;
				   }else{
					  if(form.elements[name].nextSibling.className=="error"){
						 form.elements[name].style.border="1px solid #999";
						 FormValidate.removeError(form.elements[name].nextSibling);}
					  FormValidate.$error.minlength=false; 
				   }
				}
				if(args['rules'][name].pattern){
					var reg=args['rules'][name].pattern;
				   if(!reg.test(form.elements[name].value)){
					  
				      FormValidate.errorNotice(form.elements[name],args['msg'][name].pattern||args['msg']['msg'].pattern);
					  FormValidate.$error.pattern=true;
					  return false;
				   }else{
					   
					 if(form.elements[name].nextSibling.className=="error"){
						 form.elements[name].style.border="1px solid #999";
						 FormValidate.removeError(form.elements[name].nextSibling);}
					  FormValidate.$error.pattern=false; 
				   }
				}
			}); 
			})(name);
			
		}
	},
};

