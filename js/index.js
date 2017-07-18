$(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getindexmenu',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var html = template('template', data);
            $('.row').html(html);
            $('.row>div:eq(7)').nextAll().hide();
            $('.row>div:eq(7)').click(function(){
                $(this).nextAll().toggle(200);

            })
            //页面跳转到比价页面
            // $('.row>div:eq(0)').click(function(){
            //     // alert(1)
            //   window.location.href='category.html'
            // })
            //页面跳转到比价页面
        }

    });

    $.ajax({
        url: 'http://127.0.0.1:3000/api/getmoneyctrl',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            console.log(data)
            var tag = template('bottom_on', data);
            $('.big_box').html(tag);
        }
    
    })
})