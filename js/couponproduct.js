$(function(){
    function getUrlParam(key) {
        // 获取参数
        var url = window.location.search;
        // 正则筛选地址栏
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        // 匹配目标参数
        var result = url.substr(1).match(reg);
        //返回参数值
        return result ? decodeURIComponent(result[2]) : null;
    }

   var id = Number(getUrlParam('id'));
     console.log(id);

    $.ajax({
        url:'http://127.0.0.1:3000/api/getcouponproduct',
        dataType:'json',
        data:{'couponid':id},
        success:function(data){
            console.log(data)
             var tag = template('getcouponproduct',data)
            $('.men_box').html(tag)

           /*轮播图*/
            

            var index = 0;
            var $modal = $('.men_box>li');
            $modal.on('click', function () {
                alert(1)
                index = $(this).index();
                //放出模态框
                $('.modal,.dialog').css('display', 'block')

                //插入图片
                $('.dialog').html(data.result[index].couponProductImg);
               

            })
            //点击模态框消失
            $('.modal').click(function () {
                $('.modal,.dialog').css('display', 'none')
            })
            //阻止 子元素冒泡事件
            $('.dialog,.dialog>img').click(function () {
                event.stopPropagation();
            })
        }
    })
})