const service = {
    getPageBg: function(nowIndex,callback){
        $.ajax({
            url: '/getPageBg?page='+nowIndex,
            type:'get',
            success:function(data){
                callback(data);
            }
        })
    },
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
};