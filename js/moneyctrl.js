$(function(){
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://127.0.0.1:3000/api/getmoneyctrl',
        success: function (data) {
            console.log(data)
            var html = template('getmoneyctrl', data);
            $('.big_box').html(html);


            //动态创建 pro_select 中page栏select内容，更具data中商品总数

            
            var numCode = Math.ceil(data.totalCount / data.pagesize);
            console.log(numCode)
            for (var i = 1;i <= numCode; i++){
                $('#page_code').append('<option value="' + i + '">' + i + '/' + numCode + '</option>');
            }

            // 实现selet点击跳转对应页面
            var pageId = 1;
            $('#page_code').change(function () {
                pageId = Number($(this).val());
                // 传入pageId重新载入页面
                $.ajax({
                    type: 'get',
                    data: {'pageid':pageId},
                    dataType: 'json',
                    url: 'http://127.0.0.1:3000/api/getmoneyctrl',
                    success: function (data) {
                        console.log(data)
                        var html = template('getmoneyctrl', data);
                        $('.big_box').html(html);
                    }
                })
            })

            // 实现点击前后一页跳转
            $('#prev_page').click(function () {
                pageId--;
                if(pageId<=0){
                    pageId = 1;
                }
                //点击前一页，同时改变select中selected属性
                $.each($('#page_code>option'),function (i,v) {
                    $(v).removeAttr("selected");
                    if(i == pageId-1){
                        $(v).attr("selected","selected");
                    }
                })
                $.ajax({
                    type: 'get',
                    data: {'pageid':pageId},
                    dataType: 'json',
                    url: 'http://127.0.0.1:3000/api/getmoneyctrl',
                    success: function (data) {
                        var html = template('getmoneyctrl', data);
                        $('.big_box').html(html);
                    }
                })
            })

            $('#next_page').click(function () {
                pageId++;
                if(pageId>=numCode){
                    pageId = numCode;
                }
                $.each($('#page_code>option'),function (i,v) {
                    $(v).removeAttr("selected");
                    if(i == pageId-1){
                        $(v).attr("selected","selected");
                    }
                })
                $.ajax({
                    type: 'get',
                    data: {'pageid':pageId},
                    dataType: 'json',
                    url: 'http://127.0.0.1:3000/api/getmoneyctrl',
                    success: function (data) {
                        var html = template('getmoneyctrl', data);
                        $('.big_box').html(html);
                    }
                })
            })


        }
    })
})