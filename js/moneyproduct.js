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

    var id = getUrlParam('id');
    console.log(id)
    
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getmoneyctrlproduct',
        dataType: 'json',
        data: {'productid': id},
        success: function (data) {
            console.log(data)
            //动态生成menu中最后a标签内容
            // $('.menu_a>a:last-child').html(data.result[0].productName)
            $('.menu_a').append('<a href="' + window.location.href + '">' + data.result[0].productName + '</a>')

            var html = template('getmoneyctrlproduct', data);
            $('#recommen').html(html);

            //生成评论区内容
            $('#comContent').html(data.result[0].productComment);

        }
    })

})