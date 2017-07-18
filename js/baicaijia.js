$(function () {

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

    // 生成ul列表内容   头部滑动块
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getbaicaijiatitle',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            $('.navBar').html(template('getbaicaijiatitle', data));

            //动态生成li宽度
            var width = 0;
            $('.navBar>li').each(function () {
                width += $(this).width();
                // width = width + $(this).width();
            })
            // $.each(array,function(i,value){})
            $('.navBar').width(width);

            $('.navBar>li').click(function () {
                //点击高亮
                $(this).addClass('current_b');
                $(this).siblings().removeClass('current_b')

                //点击重新发送ajax请求，生成页面内容
                var index = $(this).index();
                 console.log(index);
                var titleid = data.result[index].titleId;
                $.ajax({
                    url: 'http://127.0.0.1:3000/api/getbaicaijiaproduct',
                    dataType: 'json',
                    data: {'titleid': titleid},
                    success: function (data) {
                       console.log(data);
                        var tag = template('getbaicaijiaproduct', data);
                        $('.main_box').html(tag);
                    }

                })


            });

            //获取data中titleId 并作为下一次ajax请求的参数传递
            var titleid = data.result[0].titleId;
            console.log(titleid)
            $.ajax({
                url: 'http://127.0.0.1:3000/api/getbaicaijiaproduct',
                dataType: 'json',
                data: {'titleid': titleid},
                success: function (data) {
                   console.log(data)
                     var tag = template('getbaicaijiaproduct', data);
                     $('.main_box').html(tag);
                }

            })

        }
    })


})


