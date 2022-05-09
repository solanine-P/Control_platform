let thisId = '';
let rowsId;
let ids;
let nowPlatform = 'pptPlatform';
let url = 'http://127.0.0.1:3000/getPlatformData';
let formType = '';
$('.nav li').on('click',function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
    nowPlatform = $(this).attr('data-base');
    $('.openAddModal').attr('data-target','#modal_'+nowPlatform);
    $('#table').bootstrapTable('refreshOptions', {
        columns:Columns[nowPlatform].columns,
        url:url+'/'+nowPlatform
    });
});

/*初始化header*/
$('#table').bootstrapTable({
    columns:Columns[nowPlatform].columns
});

/*获取参数*/
function queryParams(params){
    params.columns = Columns[nowPlatform].columns.slice(2,Columns[nowPlatform].columns.length-1).map(function (column) {
        return column.field;
    });
    params.nowPlatform = nowPlatform;
    console.log(params);
    return params;
}

/*新增修改提交*/
$('.cmxform').on('submit',function(){
    let formData = new FormData();
    let $form = $('#'+nowPlatform);
    let formList = $form.serialize().split('&');
    for(let x=0;x<formList.length;x++){
        console.log(formList);
        formData.append(formList[x].split('=')[0].split('_')[0],decodeURI(formList[x].split('=')[1]))
    }
    if(formType == 'add'){
        service.add(nowPlatform,formData,function(data){
            if(data.resultCode=="200"){
                $('#table').bootstrapTable('append',data.data);
                alert(data.resultMessage);
            }else{
                alert(data.resultMessage);
            }
        });
    }
    if(formType == 'modify'){
        service.modify(nowPlatform,thisId,formData,function(data){
            console.log(data);
            if(data.resultCode==200){
                $('#table').bootstrapTable('updateRow',{
                    index:rowsId,
                    row:data.data
                })
            }
        })
    }
    $("#modal_"+nowPlatform).modal('hide');
    event.preventDefault();
});

/*删除提交*/
$('.delete').on('click',function () {
    service.del(nowPlatform,ids,function(data){
        if(data.resultCode==200){
            $('#table').bootstrapTable('remove',{
                field:'_id',
                values: ids.split(',')
            });
        }else{
            alert(data.resultMessage);
        }
    });
});

/*新增按钮*/
$('.openAddModal').on('click',function(){
    $('input').val('');
    formType = 'add';
    $('#modal_'+nowPlatform+' .modal-title>span>span').html('-新增');
});
/*批量删除按钮*/
$('.openDeleteModal').on('click',function(){
    let _ids = $.map($('#table').bootstrapTable('getAllSelections'),function(rows){
                return rows._id;
            });
    let fieldsName = $.map($('#table').bootstrapTable('getAllSelections'),function(rows){
       return rows.hasOwnProperty('name')?rows.name:rows.alink
    });
    if(!_ids.length){
        ids = '';
        return
    }
    $('#deletedModal .modal-title>span').html(Columns[nowPlatform].name);
    $('#deletedModal .modal-body>span').html(fieldsName.join(','));
    $('#deletedModal').modal('show');
    ids = _ids.join();

});

