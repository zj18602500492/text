$(function(){
      $.ajax({
          url: 'http://127.0.0.1:3000/api/getsitenav',
          dataType: 'json',
          success:function(data){
               console.log(data)
               var tag = template('getsitenav',data)
              $('#recommen').html(template('getsitenav',data));
          }
      })

})