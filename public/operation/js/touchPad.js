/*
    * 编辑按钮位置
    * */
let flag = false;//是否按下鼠标的标记
let cur = {x:0,y:0}//记录鼠标按下时的坐标
//鼠标按下时的函数
function down(e){
    flag = true; //确认鼠标按下
    cur.x = e.pageX-287;//记录当前鼠标的X坐标
    cur.y = e.pageY-42;//记录当前鼠标的y坐标
}
//鼠标移动时的函数
function move(e){
    if(flag){//如果是鼠标按下则继续执行
        cur.x = e.pageX-287;//记录当前鼠标的X坐标
        cur.y = e.pageY-42;//记录当前鼠标的y坐标
        sendMes($('.openKeyMouse').attr('data-c')+'_'+parseInt(cur.x)+','+parseInt(cur.y));
    }
}
//鼠标释放时候的函数
function end(){
    flag = false;//鼠标释放
}
$('.touchArea').on("touchstart",function(e)
{
    down(e.changedTouches[0]);
});
$('.touchArea').on("touchmove",function(e)
{
    move(e.changedTouches[0]);
});
$('.touchArea').on("mouseup",function(e)
{
    end();
});
$('.touchPad span').on('click',function(){
   sendMes($('.openKeyMouse').attr('data-c')+'_'+$(this).attr('data-i'));
});