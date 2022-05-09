let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let router = require("./controller");
let session = require('express-session');
//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
//设置模版引擎
// app.set("view engine","ejs");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//路由中间件，静态页面
app.use(express.static('./public'));
app.use(express.static("./uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/*首页*/
app.get('/', function(req, res) {
    console.log(req.session);
    if(req.session.login=="1"){
        res.render('index', { helloWorld: 'hello,world' });
    }else{
        res.render('login');
    }
});

/*登录页*/
app.get('/login', function(req, res) {
    res.render('login', { helloWorld: 'hello,world' })
});

/*数据库页*/
app.get('/databaseOperatingPlatform', function(req, res) {
    console.log(req.session);
    if(req.session.login!=="1"){
        res.render('databaseOperatingPlatform');
    }else{
        res.render('login');
    }
});

/*登录*/
app.post("/doLogin",router.doLogin);

/*获取一级页面数据*/
app.get('/getFirstPageData',router.getFirstPageData);

/*获取二级页面数据*/
app.get('/getSecondPageData',router.getSecondPageData);

/*获取三级页面数据*/
app.get('/getThirdPageData',router.getThirdPageData);

/*获取页面背景*/
app.get('/getPageBg',router.getPageBg);

/*添加页面一按钮*/
app.post("/addFirstPageBtn",router.addFirstPageBtn);

/*添加页面二按钮*/
app.post("/addSecondPageBtn",router.addSecondPageBtn);

/*添加页面二按钮*/
app.post("/addThirdPageBtn",router.addThirdPageBtn);

/*添加页面二下媒体按钮*/
app.post("/addSecondMediaPageBtn",router.addSecondMediaPageBtn);

/*添加页面二下设备按钮*/
app.post("/addSecondDevicePageBtn",router.addSecondDevicePageBtn);

/*修改页面一按钮*/
app.post("/modifyFirstPageBtn/:id",router.modifyFirstPageBtn);

/*修改页面二按钮*/
app.post("/modifySecondPageBtn/:id",router.modifySecondPageBtn);

/*修改页面二媒体按钮*/
app.post("/modifySecondMediaPageBtn/:pid/:id",router.modifySecondMediaPageBtn);

/*修改页面二设备按钮*/
app.post("/modifySecondDevicePageBtn/:pid/:id",router.modifySecondDevicePageBtn);

/*修改页面三按钮*/
app.post("/modifyThirdPageBtn/:id",router.modifyThirdPageBtn);

/*删除页面一按钮*/
app.get("/deleteBtn",router.deleteBtn);

/*保存页面一下按钮位置*/
app.post("/setFirstPageBtnPositions",router.setFirstPageBtnPositions);

/*保存页面二下按钮位置*/
app.post("/setSecondPageBtnPositions",router.setSecondPageBtnPositions);

/*保存页面二媒体下按钮位置*/
app.post("/setSecondMediaPageBtnPositions/:id",router.setSecondMediaPageBtnPositions);

/*保存页面二设备下按钮位置*/
app.post("/setSecondDevicePageBtnPositions/:id",router.setSecondDevicePageBtnPositions);

/*保存页面三下按钮位置*/
app.post("/setThirdPageBtnPositions",router.setThirdPageBtnPositions);

/*修改序号*/
app.get("/modifySequence",router.modifySequence);

/*背景上传*/
app.post("/setBg/:nowIndex",router.setBackground);



/*
*
* @指令操作平台
* */

/*查找数据*/
app.post('/getPlatformData/:nowPlatform',router.getPlatformData);

/*新增数据*/
app.post('/addPlatformData/:nowPlatform',router.addPlatformData);

/*修改数据*/
app.post('/modifyPlatformData/:nowPlatform/:id',router.modifyPlatformData);

/*删除数据*/
app.delete('/deletePlatformData/:nowPlatform/:ids',router.deletePlatformData);

// app.listen(3300);
module.exports = app;

require('./udpClient/eventController');