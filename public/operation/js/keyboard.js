let routineUpperKeyPanel= [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['lower', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'del'],
    ['?123','space','return']
];
let routineLowerKeyPanel= [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['upper', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'del'],
    ['?123','space','return']
];
let routineSymbolKeyPanel=[
    ['1', '2', '3', '4', '5', '6', '7', '8', '9','0'],
    ['$', '|', '%', '&', '*', '^', '/', '?', '!','<'],
    ['>','+', ':', ';', '"', "'", '.', '#','(', ')'],
    ['back','@', '=', '~', '_', '-', ',','。', 'del']
];
let thisPanel;
loadKeyboard(routineUpperKeyPanel);
function loadKeyboard(data){
     if(data == routineUpperKeyPanel||data == routineLowerKeyPanel){
        thisPanel = data;
     }
     $('.keyboard').html('');
     for(let x = 0; x<data.length;x++){
         $('.keyboard').append(`<div></div>`);
         for(let y = 0; y<data[x].length; y++){
             let a;
             if(data[x][y] == 'lower'||data[x][y] == 'upper'||data[x][y] == 'back'){
                 a = `<button class="btn btn-default ${data[x][y]}">${data[x][y]}</button>`;
             }else if(data[x][y] == '?123'){
                 a = `<button class="btn btn-default number" data-i="${data[x][y]}">${data[x][y]}</button>`;
             }else{
                 a = `<a class="btn btn-default" data-i="${data[x][y]}">${data[x][y]}</a>`;
             }
             $($('.keyboard>div')[x]).append(a);
         }
     }
}
$('.keyboard').on('click','.lower',function(){
   loadKeyboard(routineLowerKeyPanel);
});
$('.keyboard').on('click','.upper',function(){
    loadKeyboard(routineUpperKeyPanel);
});
$('.keyboard').on('click','.number',function(){
    loadKeyboard(routineSymbolKeyPanel);
});
$('.keyboard').on('click','.back',function(){
    loadKeyboard(thisPanel);
});
$('.keyboard').on('click','a',function(){
    let command = $('.openKeyMouse').attr('data-c')+'_'+$(this).html();
    sendMes(command);
});
