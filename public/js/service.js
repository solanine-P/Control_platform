let service = {
   /*获取页面一数据*/
   getFirstPageData: function(callback) {
       $.ajax({
           url:'/getFirstPageData',
           type:'get',
           success:function(data){
               callback(data);
           }
       });
   },
    /*获取页面二数据*/
    getSecondPageData: function(callback) {
        $.ajax({
            url:'/getSecondPageData',
            type:'get',
            success:function(data){
                callback(data);
            }
        });
    },
    /*获取页面三数据*/
    getThirdPageData: function(callback) {
        $.ajax({
            url:'/getThirdPageData',
            type:'get',
            success:function(data){
                callback(data);
            }
        });
    },
   /*获取页面背景图*/
    getPageBg: function(nowIndex,callback){
        $.ajax({
            url: '/getPageBg?page='+nowIndex,
            type:'get',
            success:function(data){
                callback(data);
            }
        })
    },
    /*添加页面一按钮*/
    addFirstPageBtn: function(formData,callback){
        $.ajax({
            url:'/addFirstPageBtn',
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*添加页面二按钮*/
    addSecondPageBtn: function(formData,callback){
        $.ajax({
            url:'/addSecondPageBtn',
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*添加页面二媒体按钮*/
    addSecondMediaPageBtn: function(formData,callback){
        $.ajax({
            url:'/addSecondMediaPageBtn',
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*添加页面二媒体按钮*/
    addSecondDevicePageBtn: function(formData,callback){
        $.ajax({
            url:'/addSecondDevicePageBtn',
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*添加页面三按钮*/
    addThirdPageBtn: function(formData,callback){
        $.ajax({
            url:'/addThirdPageBtn',
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*修改页面一按钮*/
    modifyFirstPageBtn: function(id,formData,callback){
        $.ajax({
            url:'/modifyFirstPageBtn/'+id,
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*修改页面二按钮*/
    modifySecondPageBtn: function(id,formData,callback){
        $.ajax({
            url:'/modifySecondPageBtn/'+id,
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*修改页面二媒体按钮*/
    modifySecondMediaPageBtn: function(thisID,id,formData,callback){
        $.ajax({
            url:'/modifySecondMediaPageBtn/'+thisID+'/'+id,
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*修改页面二设备按钮*/
    modifySecondDevicePageBtn: function(thisID,id,formData,callback){
        $.ajax({
            url:'/modifySecondDevicePageBtn/'+thisID+'/'+id,
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*修改页面三按钮*/
    modifyThirdPageBtn: function(thisID,formData,callback){
        $.ajax({
            url:'/modifyThirdPageBtn/'+thisID,
            type:'post',
            data:formData,
            contentType:false,
            processData:false,
            success:function(data){
                callback(data);
            }
        })
    },
    /*删除一级界面按钮*/
    deleteBtn: function(nowPage,id,thisID,callback){
        $.ajax({
            url:'/deleteBtn?nowPage='+nowPage+'&id='+id+'&thisID='+thisID,
            type:'get',
            success:function(data){
                callback(data);
            }
        })
    },



    /*保存页面一位置信息*/
    setFirstPageBtnPositions: function(data,callback){
        $.ajax({
            url:'/setFirstPageBtnPositions',
            dataType: 'json',
            type:'post',
            data:JSON.stringify(data),
            success:function(data){
                callback(data);
            }
        })
    },
    /*保存页面二位置信息*/
    setSecondPageBtnPositions: function(data,callback){
        $.ajax({
            url:'/setSecondPageBtnPositions',
            dataType: 'json',
            type:'post',
            data:JSON.stringify(data),
            success:function(data){
                callback(data);
            }
        })
    },
    /*保存页面二媒体位置信息*/
    setSecondMediaPageBtnPositions: function(id,data,callback){
        $.ajax({
            url:'/setSecondMediaPageBtnPositions/'+id,
            dataType: 'json',
            type:'post',
            data:JSON.stringify(data),
            success:function(data){
                callback(data);
            }
        })
    },
    /*保存页面二设备位置信息*/
    setSecondDevicePageBtnPositions: function(id,data,callback){
        $.ajax({
            url:'/setSecondDevicePageBtnPositions/'+id,
            dataType: 'json',
            type:'post',
            data:JSON.stringify(data),
            success:function(data){
                callback(data);
            }
        })
    },
    /*保存页面三位置信息*/
    setThirdPageBtnPositions: function(data,callback){
        $.ajax({
            url:'/setThirdPageBtnPositions',
            dataType: 'json',
            type:'post',
            data:JSON.stringify(data),
            success:function(data){
                callback(data);
            }
        })
    },
    modifySequence:function(thisId,thisSequence,preId,preSequence,callback){
        $.ajax({
            url:'/modifySequence?thisId='+thisId+'&thisSequence='+thisSequence+'&preId='+preId+'&preSequence='+preSequence,
            type:'get',
            success:function(data){
                callback(data);
            }
        })
    }
};