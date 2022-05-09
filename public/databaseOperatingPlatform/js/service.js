let service = {
    add:function(nowPlatform,data,callback) {
        $.ajax({
            url:'/addPlatformData/'+nowPlatform,
            type:'post',
            data:data,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    modify:function(nowPlatform,id,data,callback) {
        $.ajax({
            url:'/modifyPlatformData/'+nowPlatform+'/'+id,
            type:'post',
            data:data,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    del:function(nowPlatform,ids,callback) {
        $.ajax({
            url:'/deletePlatformData/'+nowPlatform+'/'+ids,
            type:'delete',
            success:function(data){
                callback(data);
            }
        })
    }
};