$(function(){
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcoupon',
        dataType:'json',
        success:function(data){
             console.log(data)  
            var tag = template('getcoupon',data);
            $('.main_sma').html(tag);

            // $('.main_sma>li').click(function(){
            //     window.location.href='couponproduct.html'
            // })

        }
    })
})