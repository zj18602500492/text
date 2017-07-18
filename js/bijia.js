$(function () {
    //通过传入key，获取地址栏中 value的值
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

    var id = getUrlParam('productid');
    var brandName = getUrlParam('brandName');
    console.log(id)
    $('.menu_a>a:eq(2)').html(brandName);

    $('#history_back').click(function () {
        window.history.back();
    })

    $.ajax({
        type: 'get',
        data: {'productid': id},
        dataType: 'json',
        url: 'http://127.0.0.1:3000/api/getproduct',
        success: function (data) {
            console.log(data)
            
            $('.recommen_pic').html(data.result[0].productImg+'<p>'+data.result[0].productName+'</p>');
            $('.recommen_price').html(data.result[0].bjShop);

            //加载商品评论
            $.ajax({
                type: 'get',
                data: {'productid': id},
                dataType: 'json',
                url: 'http://127.0.0.1:3000/api/getproductcom',
                success: function (data) {
                    console.log(data)
                    $('.comContent').append(template('getproductcom',data))
                }
            })
        }
    })

})