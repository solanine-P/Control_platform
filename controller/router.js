let formidable = require('formidable');
let path = require("path");
let fs = require("fs");
let sd = require("silly-datetime");
let db = require("../models/db.js");
let ObjectID = require('mongodb').ObjectID;
let md5 = require("../models/md5.js");

/*登录*/
exports.doLogin = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;
        // console.log(fields);
        var jiamihou = md5(md5(password)+'彭志成');
        console.log(jiamihou);
        // console.log(jiamihou);
        //查询数据库，看看有没有个这个人
        db.find("users", {"username": username}, function (err, result) {
            if (err) {
                res.send("-5");
                return;
            }
            //没有这个人
            if (result.length == 0) {
                res.send("-1"); //用户名不存在
                return;
            }
            //有的话，进一步看看这个人的密码是否匹配
            if (jiamihou == result[0].password) {
                req.session.login = "1";
                req.session.username = username;
                res.send("1");  //登陆成功
                return;
            } else {
                res.send("-2");  //密码错误
                return;
            }
        });
    });
};

/*查找一级页面数据*/
exports.getFirstPageData = function(req,res){
    db.find('page1',{},{sort:{"sequence":1}},function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    })
};

/*查找二级页面数据*/
exports.getSecondPageData = function(req,res){
    db.find('page2',{},{sort:{"sequence":1}},function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    })
};

/*查找三级页面数据*/
exports.getThirdPageData = function(req,res){
    db.find('page3',{},{sort:{"sequence":1}},function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    })
};

/*查找页面背景*/
exports.getPageBg = function(req,res){
    let page = req.query.page;
    db.find('bg',{"page":page},function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result);
    })
};

/*添加页面一按钮*/
exports.addFirstPageBtn = function(req,res){
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
       for(let what in fields){
           fields[what]=decodeURI(fields[what]);
       }
        fields.position = {x:0,y:0};
       if(Object.keys(files).length){
           let t = sd.format(new Date(),'YYYYMMDDHHmmss');
           let r = parseInt(Math.random()*89999 + 10000);
           let extname = path.extname(files.btnBg.name);
           let oldpath = files.btnBg.path;
           let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
           fs.rename(oldpath,newpath,function(err){
               if(err){
                   res.send("添加失败");
                   return
               }
               fields.btnBg = '/btnBg/'+t+r+extname;
               db.insertOne('page1',fields,function(err,result){
                   res.send({
                       data:result.ops[0],
                       resultCode: "200",
                       resultMessage: "请求成功"
                   });
               });
           });
       }else{
           db.insertOne('page1',fields,function(err,result){
               res.send({
                   data:result.ops[0],
                   resultCode: "200",
                   resultMessage: "请求成功"
               });
           });
       }
    });
};

/*添加页面二按钮*/
exports.addSecondPageBtn = function(req,res){
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        fields.media = new Array();
        fields.device = new Array();
        fields.position = {x:0,y:0};
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                db.find('page2',{},{"sequence":1},function(err,result){
                    if(!result.length){
                        fields.sequence = 0;
                        db.insertOne('page2',fields,function(err,result){
                            res.send({
                                data:result.ops[0],
                                resultCode: "200",
                                resultMessage: "请求成功"
                            });
                        });
                    }else{
                        fields.sequence = result[result.length-1].sequence+1;
                        db.insertOne('page2',fields,function(err,result){
                            res.send({
                                data:result.ops[0],
                                resultCode: "200",
                                resultMessage: "请求成功"
                            });
                        });
                    }
                });
            });
        }else{
            db.find('page2',{},{"sequence":1},function(err,result){
                if(!result.length){
                    fields.sequence = 0;
                    db.insertOne('page2',fields,function(err,result){
                        res.send({
                            data:result.ops[0],
                            resultCode: "200",
                            resultMessage: "请求成功"
                        });
                    });
                }else{
                    fields.sequence = result[result.length-1].sequence+1;
                    db.insertOne('page2',fields,function(err,result){
                        res.send({
                            data:result.ops[0],
                            resultCode: "200",
                            resultMessage: "请求成功"
                        });
                    });
                }
            });
        }
    });
};

/*添加页面二下媒体按钮*/
exports.addSecondMediaPageBtn = function(req,res){
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        let pid = fields.parentID;
        fields._id = new ObjectID(new Date().getTime());
        fields.position = {x:0,y:0};
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                db.update('page2',{_id:ObjectID(pid)},{$push:{'media':fields}},false,function(err,result){
                    res.send({
                        data:fields,
                        resultCode: "200",
                        resultMessage: "请求成功"
                    });
                });
            });
        }else{
            db.update('page2',{_id:ObjectID(pid)},{$push:{'media':fields}},false,function(err,result){
                res.send({
                    data:fields,
                    resultCode: "200",
                    resultMessage: "请求成功"
                });
            });
        }
    });
};

/*添加页面二下设备按钮*/
exports.addSecondDevicePageBtn = function(req,res){
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        let pid = fields.parentID;
        fields._id = new ObjectID(new Date().getTime());
        fields.position = {x:0,y:0};
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                db.update('page2',{_id:ObjectID(pid)},{$push:{'device':fields}},false,function(err,result){
                    res.send({
                        data:fields,
                        resultCode: "200",
                        resultMessage: "请求成功"
                    });
                });
            });
        }else{
            db.update('page2',{_id:ObjectID(pid)},{$push:{'device':fields}},false,function(err,result){
                res.send({
                    data:fields,
                    resultCode: "200",
                    resultMessage: "请求成功"
                });
            });
        }
    });
};

/*添加页面三按钮*/
exports.addThirdPageBtn = function(req,res){
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        fields.position = {x:0,y:0};
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                db.insertOne('page3',fields,function(err,result){
                    res.send({
                        data:result.ops[0],
                        resultCode: "200",
                        resultMessage: "请求成功"
                    });
                });
            });
        }else{
            db.insertOne('page3',fields,function(err,result){
                res.send({
                    data:result.ops[0],
                    resultCode: "200",
                    resultMessage: "请求成功"
                });
            });
        }
    });
};

/*修改页面一按钮*/
exports.modifyFirstPageBtn = function(req,res){
    let id = req.params.id;
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                db.update('page1',{_id:ObjectID(id)},{$set:fields},false,function(err,result){
                    res.send({
                        data:fields,
                        resultCode: "200",
                        resultMessage: "请求成功"
                    });
                });
            });
        }else{
            db.update('page1',{_id:ObjectID(id)},{$set:fields},false,function(err,result){
                res.send({
                    data:fields,
                    resultCode: "200",
                    resultMessage: "请求成功"
                });
            });
        }
    });
};

/*修改页面二按钮*/
exports.modifySecondPageBtn = function(req,res){
    let id = req.params.id;
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                db.update('page2',{_id:ObjectID(id)},{$set:fields},false,function(err,result){
                    res.send({
                        data:fields,
                        resultCode: "200",
                        resultMessage: "请求成功"
                    });
                });
            });
        }else{
            db.update('page2',{_id:ObjectID(id)},{$set:fields},false,function(err,result){
                res.send({
                    data:fields,
                    resultCode: "200",
                    resultMessage: "请求成功"
                });
            });
        }
    });
};

/*修改页面二媒体按钮*/
exports.modifySecondMediaPageBtn = function(req,res){
    let id = req.params.id;
    let pid = req.params.pid;
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                let modifyData = [];
                let keys = Object.keys(fields);
                for(let i=0;i<keys.length;i++){
                    modifyData.push(new Object());
                    modifyData[i].$set = new Object();
                    modifyData[i].$set["media.$."+keys[i]] = fields[keys[i]];
                }
                (function iterator(i){
                    /*{$set:{"media.$.name":'value'}}*/
                    db.update('page2',{_id:ObjectID(pid),"media._id":ObjectID(id)},modifyData[i],false,function(err,result){
                        if(i==modifyData.length-1){
                            res.send({
                                data:result,
                                resultCode: "200",
                                resultMessage: "修改成功"
                            });
                            return
                        }else{
                            i++;
                            iterator(i);
                        }
                    });
                }(0))
            });
        }else{
            let modifyData = [];
            let keys = Object.keys(fields);
            for(let i=0;i<keys.length;i++){
                modifyData.push(new Object());
                modifyData[i].$set = new Object();
                modifyData[i].$set["media.$."+keys[i]] = fields[keys[i]];
            }
            console.log(modifyData);
            (function iterator(i){
                /*{$set:{"media.$.name":'value'}}*/
                db.update('page2',{_id:ObjectID(pid),"media._id":ObjectID(id)},modifyData[i],false,function(err,result){
                    if(i==modifyData.length-1){
                        res.send({
                            data:result,
                            resultCode: "200",
                            resultMessage: "修改成功"
                        });
                        return
                    }else{
                        i++;
                        iterator(i);
                    }
                });
            }(0))
        }
    });
};

/*修改页面二设备按钮*/
exports.modifySecondDevicePageBtn = function(req,res){
    let id = req.params.id;
    let pid = req.params.pid;
    console.log(id,pid);
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                let modifyData = [];
                let keys = Object.keys(fields);
                for(let i=0;i<keys.length;i++){
                    modifyData.push(new Object());
                    modifyData[i].$set = new Object();
                    modifyData[i].$set["device.$."+keys[i]] = fields[keys[i]];
                }
                (function iterator(i){
                    /*{$set:{"media.$.name":'value'}}*/
                    db.update('page2',{_id:ObjectID(pid),"device._id":ObjectID(id)},modifyData[i],false,function(err,result){
                        if(i==modifyData.length-1){
                            res.send({
                                data:result,
                                resultCode: "200",
                                resultMessage: "修改成功"
                            });
                            return
                        }else{
                            i++;
                            iterator(i);
                        }
                    });
                }(0))
            });
        }else{
            let modifyData = [];
            let keys = Object.keys(fields);
            for(let i=0;i<keys.length;i++){
                modifyData.push(new Object());
                modifyData[i].$set = new Object();
                modifyData[i].$set["device.$."+keys[i]] = fields[keys[i]];
            }
            console.log(modifyData);
            (function iterator(i){
                /*{$set:{"media.$.name":'value'}}*/
                db.update('page2',{_id:ObjectID(pid),"device._id":ObjectID(id)},modifyData[i],false,function(err,result){
                    if(i==modifyData.length-1){
                        res.send({
                            data:result,
                            resultCode: "200",
                            resultMessage: "修改成功"
                        });
                        return
                    }else{
                        i++;
                        iterator(i);
                    }
                });
            }(0))
        }
    });
};

/*修改页面三按钮*/
exports.modifyThirdPageBtn = function(req,res){
    let id = req.params.id;
    let form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../tempup');
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        if(Object.keys(files).length){
            let t = sd.format(new Date(),'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.btnBg.name);
            let oldpath = files.btnBg.path;
            let newpath = path.normalize(__dirname+'/../uploads/btnBg/'+t+r+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("添加失败");
                    return
                }
                fields.btnBg = '/btnBg/'+t+r+extname;
                db.update('page3',{_id:ObjectID(id)},{$set:fields},false,function(err,result){
                    res.send({
                        data:fields,
                        resultCode: "200",
                        resultMessage: "请求成功"
                    });
                });
            });
        }else{
            db.update('page3',{_id:ObjectID(id)},{$set:fields},false,function(err,result){
                res.send({
                    data:fields,
                    resultCode: "200",
                    resultMessage: "请求成功"
                });
            });
        }
    });
};

/*删除页面一*/
exports.deleteBtn = function(req,res){
    let nowPage = req.query.nowPage;
    let id =req.query.id;
    let thisID = req.query.thisID;
    if(!thisID){
        db.deleteMany(nowPage,{_id:ObjectID(id)},function(err,result){
            res.send({
                data:result,
                resultCode:200,
                resultMessage: "请求成功"
            })
        });
    }else{
        if(nowPage=='page2_1'){
            /*{$set:{"media.$.name":'value'}}*/
            db.update('page2',{_id:ObjectID(thisID)},{$pull:{media:{_id:id}}},false,function(err,result){
                res.send({
                    data:result,
                    resultCode: "200",
                    resultMessage: "修改成功"
                });
            });
        }
        if(nowPage=='page2_2'){
            /*{$set:{"media.$.name":'value'}}*/
            db.update('page2',{_id:ObjectID(thisID)},{$pull:{device:{_id:id}}},false,function(err,result){
                res.send({
                    data:result,
                    resultCode: "200",
                    resultMessage: "修改成功"
                });
            });
        }
    }
};

/*保存页面一位置信息*/
exports.setFirstPageBtnPositions = function(req,res){
    var data = JSON.parse(Object.keys(req.body)[0]).data;
    var j = 0;
    (function iterator(i){
        if(i==data.length){
            res.send({
                data:'',
                resultCode: "200",
                resultMessage: "保存成功"
            });
            return
        }
       db.update('page1',{_id: ObjectID(data[i]._id)},{$set:{position:data[i].position}},true,function(err,data){
           if(err){
               console.log(err);
           }
           if(data){
               i++;
               iterator(i);
           }
       });
    }(j));
};

/*保存页面二位置信息*/
exports.setSecondPageBtnPositions = function(req,res){
    var data = JSON.parse(Object.keys(req.body)[0]).data;
    var j = 0;
    (function iterator(i){
        if(i==data.length){
            res.send({
                data:'',
                resultCode: "200",
                resultMessage: "保存成功"
            });
            return
        }
        db.update('page2',{_id: ObjectID(data[i]._id)},{$set:{position:data[i].position}},true,function(err,data){
            if(err){
                console.log(err);
            }
            if(data){
                i++;
                iterator(i);
            }
        });
    }(j));
};

/*保存页面二媒体位置信息*/
exports.setSecondMediaPageBtnPositions = function(req,res){
    let data = JSON.parse(Object.keys(req.body)[0]).data;
    let pid = req.params.id;
    db.update('page2',{_id:ObjectID(pid)},{$set:{'media':data}},false,function(err,result){
        res.send({
            data:data,
            resultCode: "200",
            resultMessage: "保存成功"
        });
    });
};

/*保存页面二设备位置信息*/
exports.setSecondDevicePageBtnPositions = function(req,res){
    let data = JSON.parse(Object.keys(req.body)[0]).data;
    let pid = req.params.id;
    db.update('page2',{_id:ObjectID(pid)},{$set:{'device':data}},false,function(err,result){
        res.send({
            data:data,
            resultCode: "200",
            resultMessage: "保存成功"
        });
    });
};

/*保存页面三位置信息*/
exports.setThirdPageBtnPositions = function(req,res){
    let data = JSON.parse(Object.keys(req.body)[0]).data;
    let j = 0;
    (function iterator(i){
        if(i==data.length){
            res.send({
                data:'',
                resultCode: "200",
                resultMessage: "保存成功"
            });
            return
        }
        db.update('page3',{_id: ObjectID(data[i]._id)},{$set:{position:data[i].position}},true,function(err,data){
            if(err){
                console.log(err);
            }
            if(data){
                i++;
                iterator(i);
            }
        });
    }(j));
};

/*修改排序*/
exports.modifySequence = function(req,res){
    let thisId = req.query.thisId;
    let thisSequence = req.query.thisSequence;
    let preId = req.query.preId;
    let preSequence = req.query.preSequence;
    console.log(thisId,thisSequence,preId,preSequence);
    db.update('page2',{_id: ObjectID(thisId)},{$set:{sequence:Number(preSequence)}},true,function(err,data){
        if(err){
            console.log(err);
        }
        if(data){
            db.update('page2',{_id: ObjectID(preId)},{$set:{sequence:Number(thisSequence)}},true,function(err,data){
                if(err){
                    console.log(err);
                }
                if(data){
                    res.send({
                        resultCode: "200",
                        resultMessage: "保存成功"
                    });
                }
            });
        }
    });
};

/*更改背景*/
exports.setBackground = function(req,res){
    let nowIndex = req.params['nowIndex'];
    db.find('bg',{"page":nowIndex},function(err,result){
        console.log(result);
        if(result.length){
            fs.unlink("./uploads"+result[0].bg,function (err) {
                if(err){
                    res.send('更换背景失败');
                }
            });
        }
        let form = new formidable.IncomingForm();
        form.uploadDir = path.normalize(__dirname+'/../tempup');
        form.parse(req,function(err,fields,files,next){
            /*fields:表单字段，files:上传的文件*/
            let t = sd.format(new Date(), 'YYYYMMDDHHmmss');
            let r = parseInt(Math.random()*89999 + 10000);
            let extname = path.extname(files.backgroundImage.name);
            let oldpath = files.backgroundImage.path;
            let newpath = path.normalize(__dirname+'/../uploads/backgroundImages/'+t+r+extname);
            fs.rename(oldpath,newpath,function (err) {
                if(err){
                    res.send("改名失败");
                    return
                }
                let obj = {"page":nowIndex,"bg":'/backgroundImages/'+t+r+extname};
                db.update('bg',{"page":nowIndex},obj,true,function (err,results) {
                    if(err){
                        res.send({
                            data:err,
                            resultCode: "200",
                            resultMessage: "更换背景失败，请检查网络"
                        });
                    }
                    res.send({
                        data:[
                            {path:'/backgroundImages/'+t+r+extname}
                        ],
                        resultCode: "200",
                        resultMessage: "请求成功"
                    });
                });
            })
        });
    });
};



/*
* @指令操作平台
* */

/*查找数据*/
exports.getPlatformData = function(req,res){
    let nowPlatform = req.params['nowPlatform'];
    let order = req.body.order=='asc'?1:0;
    let searchList = req.body.columns.map(function(val,idx,arr){
       let obj = new Object();
       obj[val] = {$regex:new RegExp(req.body.search,'i')};
       return obj;
    });
    if(!req.body.search){
        searchList = [{}];
    }
    let result = {
        total:'',
        rows:[]
    };
    let j = 0;
    (function iterator(i){
        if(i==searchList.length){
            res.send(result);
            return
        }
        db.connectDB(function(err,db){
            console.log(searchList[i]);
            let cursor = db.collection(nowPlatform).find(searchList[i]);
            cursor.skip(req.body.offset).limit(req.body.limit?req.body.limit:20).sort({}).each(function (err, doc) {
                if (err) {
                    res.send({
                        err:err
                    });
                    db.close(); //关闭数据库
                    return;
                }
                if (doc != null) {
                    result.rows.push(doc);   //放入结果数组
                } else {
                    cursor.count(false,function(err,count){
                        result.total=count;
                        j++;
                        db.close();
                        iterator(j);
                    });
                }
            });
        });
    })(j);
};
/*新增*/
exports.addPlatformData = function(req,res){
    let nowPlatform = req.params.nowPlatform;
    let form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what]=decodeURI(fields[what]);
        }
        db.connectDB(function(err,db){
            db.collection(nowPlatform).insertOne(fields, function (err, result) {
                if(err){
                    res.send({
                        resultCode: 500,
                        resultMessage: "新增失败"
                    });
                }else{
                    res.send({
                        data:result.ops[0],
                        resultCode: 200,
                        resultMessage: "新增成功"
                    });
                }
                db.close();
            })
        });
    });
};
/*修改*/
exports.modifyPlatformData = function(req,res){
    let nowPlatform = req.params.nowPlatform;
    let id = req.params.id;
    let form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        for(let what in fields){
            fields[what] = decodeURI(fields[what]);
        }
        db.connectDB(function(err,db){
            if(err){
                res.send({
                    data:err,
                    resultCode:500,
                    resultMessage:'修改失败'
                })
            }else{
                db.collection(nowPlatform).update({_id:ObjectID(id)},{$set:fields},false,function(err,results){
                    if(err){
                        res.send({
                            data:err,
                            resultCode:500,
                            resultMessage:'修改失败'
                        })
                    }else{
                        res.send({
                            data:fields,
                            resultCode:200,
                            resultMessage:'修改成功'
                        })
                    }
                    db.close();
                })
            }
        })
    });
};
/*删除数据*/
exports.deletePlatformData = function(req,res){
    let nowPlatform = req.params['nowPlatform'];
    let ids = req.params['ids'].split(',').map(ObjectID);
    db.connectDB(function(err,db){
        if(err){
            res.send({
                data:err,
                resultCode:500,
                resultMessage:'删除失败'
            })
        }else{
            db.collection(nowPlatform).deleteMany({_id:{$in:ids}},function(err,result){
                if(err){
                    res.send({
                        data:err,
                        resultCode:500,
                        resultMessage:'删除失败'
                    })
                }else{
                    console.log(result);
                    res.send({
                        data:result,
                        resultCode:200,
                        resultMessage:'删除成功'
                    })
                }
                db.close();
            })
        }
    })
};