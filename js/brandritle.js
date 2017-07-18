$(function(){
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://127.0.0.1:3000/api/getbrandtitle',
        success: function (data) {
            console.log(data)
            //先实现动态加载
            var html = template('getbrandtitle', data);
            // console.log(html)
            $('.menu_ul').html(html);



        }
    })
})


