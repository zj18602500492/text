var html = document.getElementsByTagName('html')[0];
console.log(html);
/*取到屏幕的宽度*/
var width = window.innerWidth;
console.log(width);
/* 640 100  320 50 */
var fontSize = 100/640*width;
console.log(fontSize);
/*设置fontsize*/
html.style.fontSize = fontSize +'px';
window.onresize = function(){
    var html = document.getElementsByTagName('html')[0];
    console.log(html);
    /*取到屏幕的宽度*/
    var width = window.innerWidth;
    console.log(width);
    /* 640 100  320 50 */
    var fontSize = 100/640 * width;
    console.log(fontSize);
    /*设置fontsize*/
    html.style.fontSize = fontSize +'px';
};