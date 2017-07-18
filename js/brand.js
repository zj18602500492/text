/**
 * Created by szch9 on 2017/7/14.
 */
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

    var brandTitleId = Number(getUrlParam('brandtitleid'));

    //生成 那个牌子好
    var brandtitle = getUrlParam('brandtitle');
    // console.log(brandtitle);
    var titleArr = brandtitle.split('');
    titleArr.splice(brandtitle.length - 4);
    $('.hotBrand>span').html(titleArr.join(''));

    //动态生成 nav 中最后a标签内容
    // $('.nav_a>a:last-child').html(data.result[0].productName)
    $('.nav_a').append('<a href="' + window.location.href + '">' + titleArr.join('') + '</a>')


   


    //动态加载菜单栏数据
    $.ajax({
        type: 'get',
        dataType: 'json',
        data: {'brandtitleid': brandTitleId},
        url: 'http://127.0.0.1:3000/api/getbrand',
        success: function (data) {
            console.log(data)
            //先实现动态加载
            var html = template('getbrand', data);
            // console.log(html)
            $('.menu_ul').html(html);

            //动态生成b标签中数字
            $('.menu_ul>li').each(function () {
                $(this).find('b').html($(this).index() + 1)
            })


        }
    })
    //动态加载产品栏
    $.ajax({
        type: 'get',
        dataType: 'json',
        data: {'brandtitleid': brandTitleId,'pagesize':4},
        url: 'http://127.0.0.1:3000/api/getbrandproductlist',
        success: function (data) {
            console.log(data)
            //先实现动态加载
            var html = template('getbrandproductlist', data);
            // console.log(html)
            $('.menu_pro').html(html);

            //动态加载评论
            //先加载评论上区内容图片
            $('.menv_comPic .pic_left').html(data.result[0].productImg);
            $('.menv_comPic .txt_right').html(data.result[0].productName);

            var productId = Number(data.result[0].productId);
            console.log(productId)
            $.ajax({
                type: 'get',
                dataType: 'json',
                data: {'productid':productId},
                url: 'http://127.0.0.1:3000/api/getproductcom',
                success: function (data) {
                    console.log(data)
                    //先实现动态加载
                    var html = template('getproductcom', data);
                    // console.log(html)
                    $('.menu_com').html(html);
                }
            })
        }
    })
})

