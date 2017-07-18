$(function () {
    $.ajax({
        url: 'http://127.0.0.1:3000/api/getinlanddiscount',
        type: 'get',
        dataType: 'json',
        /*滚动加载事件*/
        success: function (data) {
            console.log(data)
            // var tag = template('bottom_on', data)
            // $('.mean_b').html(tag)

            var arr = {
                data: data.result.splice(0, 6)
            }
            $('.mean_b').html(template('getinlanddiscount', arr));

            console.log(arr);
            console.log(data);

            $(window).scroll(function () {
                if ($('html').height() - $(this).height() <= 2 * $(this).scrollTop()) {
                    arr = {
                        data: data.result.splice(0, 6)
                    }
                    $('.mean_b').append(template('getinlanddiscount', arr));
                }
            })
        }
    })
})