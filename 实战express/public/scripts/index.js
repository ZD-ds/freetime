$(function(arg){
    $("#btnsubmit").click(function(event){
        event.preventDefault();
        $.ajax({
            url:'/receive',
            type:'get',
            dataType:'json',
            data:{
                username:$('#username').val(),
            },
            success:function (data) {
                console.log(data);
            },
            err:function(){
                alert(err);
            }
        });
    });

});