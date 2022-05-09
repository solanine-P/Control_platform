let operateEvents = {
    'click .RoleOfdelete': function (e, value, row, index) {
        $('#deletedModal .modal-title>span').html(Columns[nowPlatform].name);
        $('#deletedModal .modal-body>span').html(row.hasOwnProperty('name')?row.name:row.alink);
        ids = row._id;
    },
    'click .RoleOfedit': function (e, value, row, index) {
        console.log(row, index);
        thisId = row._id;
        rowsId = index;
        for(let what in row){
            $('#modal_'+nowPlatform+' .form-control[name='+what+']').val(row[what]);
        }
        formType = 'modify';
        $('#modal_'+nowPlatform+' .modal-title>span>span').html('-修改');
        $("#modal_"+nowPlatform).modal('show');
    }
};
function operateFormatter(value, row, index) {
    return [
        '<button type="button" class="RoleOfdelete btn btn-primary  btn-sm" data-toggle="modal" data-target="#deletedModal" style="margin-right:15px;">删除</button>',

        '<button type="button" class="RoleOfedit btn btn-primary  btn-sm">修改</button>'
    ].join('');
}
let Columns = {
    pptPlatform:{
        name:'PPT管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'name',
                title: '设备名称',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                formatter: function (value, row, index) {
                   return ['否','是'][value];
                },
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    },
    videoPlatform:{
        name:'视频管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'name',
                title: '设备名称',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    },
    urlPlatform:{
        name:'平台连接管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'alink',
                title: '链接地址',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    },
    otherMediaPlatform:{
        name:'其他多媒体管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'name',
                title: '设备名称',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                sortable: false
            },
            {
                field: 'command',
                title: '命令',
                sortable: false
            },
            {
                field: 'protocols',
                title: '命令协议',
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    },
    computerPlatform:{
        name:'计算机开关机管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'name',
                title: '设备名称',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                sortable: false
            },
            {
                field: 'oncommand',
                title: '开机命令',
                sortable: false
            },
            {
                field: 'offcommand',
                title: '关机命令',
                sortable: false
            },
            {
                field: 'protocols',
                title: '命令协议',
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    },
    serialDevicePlatform:{
        name:'串口设备管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'name',
                title: '设备名称',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                sortable: false
            },
            {
                field: 'oncommand',
                title: '开机命令',
                sortable: false
            },
            {
                field: 'offcommand',
                title: '关机命令',
                sortable: false
            },
            {
                field: 'protocols',
                title: '命令协议',
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    },
    lightPlatform:{
        name:'灯光开关管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'name',
                title: '设备名称',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                sortable: false
            },
            {
                field: 'oncommand',
                title: '开灯命令',
                sortable: false
            },
            {
                field: 'offcommand',
                title: '关灯命令',
                sortable: false
            },
            {
                field: 'protocols',
                title: '命令协议',
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    },
    otherDevicePlatform:{
        name:'其他设备管理',
        columns:[
            {
                field: 'state',
                checkbox: true
            },
            {
                field: 'no',
                title: '序号',
                sortable: false,
                align: "center",
                width: 40,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize=$('#table').bootstrapTable('getOptions').pageSize=='All'?20:$('#table').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber=$('#table').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return pageSize * (pageNumber - 1) + index + 1;
                }
            },
            {
                field: 'name',
                title: '设备名称',
                sortable: false
            },
            {
                field: 'ip',
                title: '设备IP地址',
                sortable: false
            },
            {
                field: 'protocol',
                title: '通信协议',
                sortable: false
            },
            {
                field: 'localport',
                title: '本地端口',
                sortable: false
            },
            {
                field: 'teleport',
                title: '远程端口',
                sortable: false
            },
            {
                field: 'isenter',
                title: '是否换行',
                sortable: false
            },
            {
                field: 'oncommand',
                title: '开命令',
                sortable: false
            },
            {
                field: 'offcommand',
                title: '关命令',
                sortable: false
            },
            {
                field: 'protocols',
                title: '命令协议',
                sortable: false
            },
            {
                field: 'remark',
                title: '备注',
                sortable: false
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                width : 150,
                events: operateEvents,
                formatter: operateFormatter
            }
        ]
    }
};