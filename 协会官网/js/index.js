/**
 * 2017 8 12
 * by zd
 */
FormValidate.vaidate(document.getElementById("myForm"),{
				rules:{
					Name:{
						required: true,
						maxlength:8,
						minlength:2
						
					},
					Phone:{
						required: true,
						maxlength:11,
						minlength:7,
						pattern:/^\d{7,11}$/
					},
					QQ:{
						required: true,
						minlength:6,
						pattern:/^\d+$/
					},
					Class:{
						required: true,
						maxlength:18,
						minlength:6,
						pattern:/^\W+|d+$/
					},
					Info:{
						required: true,
						maxlength:200,
						minlength:8
					}
				},
				msg:{
					msg:{
	                   required:"这是必填项",
					   maxlength:"要小于10",
					   minlength:"要小于4",
					   pattern:"输入正确格式"
	 			    },
					Name:{
						maxlength:"名字至要小于八个",
						minlength:"名字至少有两个"
					},
					Phone:{
						maxlength:"要小于12位",
						minlength:"要大于6位",
						pattern:"输入正确格式电话号码"
					},
					QQ:{
					    minlength:"要大于6位",
						pattern:"输入正确的格式QQ"
					},
					Class:{
						required: true,
						maxlength:"要小于18个字",
						minlength:"要大于6个字",
						pattern:"输入正确的格式专业"
					},
					Info:{
						maxlength:"要小于200个字",
						minlength:"要大于8个字"
					}
				}
	});
	EventUtil.addHandler(document.getElementById("submit"),"click",function(e){
	/*提交的拦截*/

if(document.getElementsByClassName("error")[0]){EventUtil.preventDefault(e);
	document.getElementsByClassName("error")[0].previousSibling.focus();
  return;};if(!document.getElementById("name").value||!document.getElementById("phone").value||!document.getElementById("QQ").value||!document.getElementById("info").value){alert("您还有未填完的内容");EventUtil.preventDefault(e);return;};
  /*生成json数据*/
	var myForm={};
	myForm.name=document.getElementById("name").value;
	myForm.phone=document.getElementById("phone").value;
	myForm.QQ=document.getElementById("QQ").value;
	myForm.Class=document.getElementById("class").value;
	myForm.info=document.getElementById("info").value;
	var data=JSON.stringify(myForm); 
	/*这是数据提交部分*/
	Ajax.post("servlet/actionInfo",data,function(text){
		 alert(text); 
		 if(text=="报名成功"){window.location.reload();};
	});
	EventUtil.stopPropagation(e);
});		