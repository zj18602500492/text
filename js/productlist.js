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

    var id = Number(getUrlParam('categoryId'));
    console.log(id);

    $.ajax({
        url: 'http://127.0.0.1:3000/api/getproductlist',
        dataType: 'json',
        data:{'categoryid':id},
        success: function (data) {
            console.log(data);
            var tag = template('getproductlist', data)
            $('.nan').html(tag);



            //动态创建 pro_select 中page栏select内容，更具data中商品总数
            //获取总页数
            var numCode = Math.ceil(data.totalCount / data.pagesize);
            console.log(numCode)
            //动态添加select内容
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
                    data: {'categoryid': id,'pageid':pageId},
                    dataType: 'json',
                    url: 'http://127.0.0.1:3000/api/getproductlist',
                    success: function (data) {
                        console.log(data)
                        var html = template('getproductlist', data);
                        $('.nan').html(html);
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
                    data: {'categoryid': id,'pageid':pageId},
                    dataType: 'json',
                    url: 'http://127.0.0.1:3000/api/getproductlist',
                    success: function (data) {
                        var html = template('getproductlist', data);
                        $('.nan').html(html);
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
                    data: {'categoryid': id,'pageid':pageId},
                    dataType: 'json',
                    url: 'http://127.0.0.1:3000/api/getproductlist',
                    success: function (data) {
                        var html = template('getproductlist', data);
                        $('.nan').html(html);
                    }
                })
            })



        }

    });



});