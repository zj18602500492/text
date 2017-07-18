$(function(){
    $.ajax({
        url:'http://127.0.0.1:3000/api/getcategorytitle',
        dataType:'json',
        success:function(data){
            var i,
                c;
            console.log(data)
            $('#con2').html(template('category',data));
            $(".panel-title>a").click(function(){
                var titleId=this.dataset.id;
                // console.log(this.attr("data-id"));
                titleId=Number(this.dataset.id);
                console.log(titleId);
                //请求表格里数据
                $.ajax({
                    url:'http://127.0.0.1:3000/api/getcategory',
                    dataType:'json',
                    data:{"titleid":titleId},
                    success:function(data){
                        console.log(data);
                        // console.log(template('category1',data));
                        $('.panel-body>ul').html(template('category1',data))
                    }
                })
            })

        }
    })

});


