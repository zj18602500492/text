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

    /*var productId = getUrlParam('id');
     console.log(productId)*/

    //实现点击header返回键返回上一页面
    $('.h_back').click(function () {
        window.history.back();
    })



    //点击search 切换searchbox
    $('.search').click(function () {
        $('#searchbox').toggleClass('display')
    })


    //发送ajax请求获得后台数据
    //上部商品详情
    $.ajax({
        type: 'get',
        dataType: 'json',
        // data: {'productid': productId},
        url: 'http://127.0.0.1:3000/api/getgsshop',
        success: function (dataShop) {
            console.log(dataShop)
            //模板生成商品详情列表
            $('.shop').html(template('getgsshop', dataShop));
            $('#dLabel').html(dataShop.result[0].shopName);

            var shopId = dataShop.result[0].shopId;
            //地区列表
            $.ajax({
                type: 'get',
                dataType: 'json',
                // data: {'productid': productId},
                url: 'http://127.0.0.1:3000/api/getgsshoparea',
                success: function (dataArea) {
                    console.log(dataArea)
                    //模板生成商品详情列表
                    $('.shoparea').html(template('getgsshoparea', dataArea));
                    $('#dLabe2').html(dataArea.result[0].areaName.split('').splice(0, 2).join(''));

                    var areaId = dataArea.result[0].areaId;
                    //（静态时）加载
                    $.ajax({
                        type: 'get',
                        dataType: 'json',
                        data: {'shopid': shopId, 'areaid': areaId},
                        url: 'http://127.0.0.1:3000/api/getgsproduct',
                        success: function (data) {
                            console.log(data)
                            $('#recommen').html(template('getgsproduct', data))
                        }
                    })

                    //实现点击态加载
                    var shopName='京东', areaName = '华北';
                    //点击 shop
                    $('.nav_bar .dropdown .shop li').click(function () {
                        $(this).find('i').css('display', 'block');
                        $(this).siblings('li').find('i').css('display', 'none');
                        var index = $(this).index();
                        $('#dLabel').html(dataShop.result[index].shopName);
                        shopName = dataShop.result[index].shopName;
                        shopId = dataShop.result[index].shopId;
                        // shop 点击加载
                        $.ajax({
                            type: 'get',
                            dataType: 'json',
                            data: {'shopid': shopId, 'areaid': areaId},
                            url: 'http://127.0.0.1:3000/api/getgsproduct',
                            success: function (data) {
                                console.log(data)
                                $('#recommen').html(template('getgsproduct', data))
                            }
                        })

                    })

                    //点击 area
                    $('.nav_bar .dropdown .shoparea li').click(function () {
                        $(this).find('i').css('display', 'block');
                        $(this).siblings('li').find('i').css('display', 'none');
                        var index = $(this).index();
                        $('#dLabe2').html(dataArea.result[index].areaName.split('').splice(0, 2).join(''));
                        areaId = dataArea.result[index].areaId;

                        areaName = dataArea.result[index].areaName.split('').splice(0, 2).join('');

                        // shop 点击加载
                        $.ajax({
                            type: 'get',
                            dataType: 'json',
                            data: {'shopid': shopId, 'areaid': areaId},
                            url: 'http://127.0.0.1:3000/api/getgsproduct',
                            success: function (data) {
                                console.log(data)
                                $('#recommen').html(template('getgsproduct', data))
                            }
                        })

                    })
                    //纯粹多余
                    $('.menu_a').append('<a href="javascript:;">' + shopName + ' - ' + areaName + '</a>');
                    //$('.menu_a').append('<i>' + shopName + ' - ' + areaName + '</i>');

                }
            })


        }
    })
  

})