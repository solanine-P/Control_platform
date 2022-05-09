window.onload = function(){
    let nowPage = 1;/*当前页面*/
    let pages = {
        "1":"YM001",
        "2":"YM002",
        "2_1":"YM002_exhibition",
        "2_2":"YM002_device",
        "3":"YM003"
    };
    let firstPageBtns = [];
    let secondPageBtns = [];
    let thirdPageBtns = [];
    let thisID ;/*页面二当前按钮组ID*/
    let _id;
    let submitStatus = 'add';
    service.getFirstPageData(function (data) {
        firstPageBtns = data;
        setDynamicAddition(data);
    });
    service.getPageBg(nowPage,function(data){
       if(data.length){
           $('.dynamicAdditionView>img')[0].src = data[0].bg;
       }else{
           $('.dynamicAdditionView>img')[0].src = '';
       }
    });
    /*加载页面数据*/
    $('.openEditBox').on('click',function(){
        nowPage = Number($(this).html().substr(4,1));//根据按钮名称获取获取当前页面
        $('.dynamicAdditionZone>h2 i').html($(this).html());//更改右侧编辑区域标题
        $('#addBtn').attr('data-target','#formModal_'+pages[nowPage]);//根据当前页面修改按钮弹出对应表单
        if(nowPage == 1){
            $('.ExhibitionAreaNav').animate({'height':'0px','opacity':'0'},200,function () {
                $('.nav>li:nth-of-type(2)>span:nth-of-type(2)').css({'display':'none'});
            });
            service.getFirstPageData(function (data) {
                firstPageBtns = data;
                setDynamicAddition(data);
            });
            service.getPageBg(nowPage,function(data){
                if(data.length){
                    $('.dynamicAdditionView>img')[0].src = data[0].bg;
                }else{
                    $('.dynamicAdditionView>img')[0].src = '';
                }
            });
        }
        if(nowPage == 2){
            service.getSecondPageData(function(data){
                secondPageBtns = data;
                setDynamicAddition(data);
                $('.ExhibitionAreaNav').html('');
                for(let x=0;x<data.length;x++){
                    let li = `
                    <li data-i="${data[x]._id}">
                        <p>
                            <a class="btn btn-primary exhibitionArea">${data[x].name}-媒体</a>
                            <a class="btn btn-primary device">${data[x].name}-设备</a>
                        </p>
                        <span>
                            <button type="button" class="btn btn-info goTop" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDown" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goModify" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDelete" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </span>
                    </li>`;
                    $('.ExhibitionAreaNav').append(li);
                }
            });
            service.getPageBg(nowPage,function(data){
                if(data.length){
                    $('.dynamicAdditionView>img')[0].src = data[0].bg;
                }else{
                    $('.dynamicAdditionView>img')[0].src = '';
                }
            });
           if($('.ExhibitionAreaNav').height()<516){
               $('.ExhibitionAreaNav').animate({'height':'520px','opacity':'1'},200,function () {
                   $('.nav>li:nth-of-type(2)>span:nth-of-type(2)').css({'display':'flex'});
               })
           } else{
                $('.ExhibitionAreaNav').animate({'height':'0px','opacity':'0'},200,function () {
                    $('.nav>li:nth-of-type(2)>span:nth-of-type(2)').css({'display':'none'});
                })
            }
        }
        if(nowPage ==3){
            $('.ExhibitionAreaNav').animate({'height':'0px','opacity':'0'},200,function () {
                $('.nav>li:nth-of-type(2)>span:nth-of-type(2)').css({'display':'none'});
            });
            service.getThirdPageData(function (data) {
                thirdPageBtns = data;
                setDynamicAddition(data);
            });
            service.getPageBg(nowPage,function(data){
                if(data.length){
                    $('.dynamicAdditionView>img')[0].src = data[0].bg;
                }else{
                    $('.dynamicAdditionView>img')[0].src = '';
                }
            });
        }
    });

    /*加载页面二媒体按钮*/
    $('.ExhibitionAreaNav').on('click','.exhibitionArea',function(){
        nowPage = '2_1';
        thisID = $(this.parentNode.parentNode).attr('data-i');
        let data;
        for(let i=0; i<secondPageBtns.length; i++){
            if(secondPageBtns[i]._id == thisID){
                data = secondPageBtns[i].media;
            }
        }
        $('.dynamicAdditionZone>h2 i').html($(this).html());
        $('#addBtn').attr('data-target','#formModal_'+pages[nowPage]);
        $('#dynamicAddition').html('');
        setDynamicAddition(data);
        service.getPageBg(nowPage+'_'+thisID,function(data){
            if(data.length){
                $('.dynamicAdditionView>img')[0].src = data[0].bg;
            }else{
                $('.dynamicAdditionView>img')[0].src = '';
            }
        });
    });

    /*加载页面二设备按钮*/
    $('.ExhibitionAreaNav').on('click','.device',function(){
        nowPage = '2_2';
        thisID = $(this.parentNode.parentNode).attr('data-i');
        let data;
        for(let i=0; i<secondPageBtns.length; i++){
            if(secondPageBtns[i]._id == thisID){
                data = secondPageBtns[i].device;
            }
        }
        $('.dynamicAdditionZone>h2 i').html($(this).html());
        $('#addBtn').attr('data-target','#formModal_'+pages[nowPage]);
        $('#dynamicAddition').html('');
        setDynamicAddition(data);
        service.getPageBg(nowPage+'_'+thisID,function(data){
            if(data.length){
                $('.dynamicAdditionView>img')[0].src = data[0].bg;
            }else{
                $('.dynamicAdditionView>img')[0].src = '';
            }
        });
    });

    /*点击添加展区加载页面二按钮*/
    $('#addExhibition').on('click',function () {
        $('.modify').hide();
        $('.isDelete').hide();
        $('.submit').show();
        submitStatus='add';
        $('.dynamicAdditionZone>h2 i').html('YM002页面二');
        $('#dynamicAddition').html('');
        service.getSecondPageData(function(data){
            setDynamicAddition(data);
        });
    });

    /*点击添加按钮隐藏修改*/
    $('#addBtn').on('click',function(){
        $('.modify').hide();
        $('.isDelete').hide();
        $('.submit').show();
        submitStatus='add';
    });

    /*添加编辑区按钮*/
    function setDynamicAddition(data){
        if(!data){
            return
        }
        console.log(data);
        $('#dynamicAddition').html('');
        for(var i=0,btn;i<data.length;i++){
            btn = `<button class="btn btn-success" data-i="${data[i]._id}">${data[i].name}</button>`;
            $('#dynamicAddition').append(btn);
            $(`button[data-i*=${data[i]._id}]`).css({
                'left':data[i].position.x,
                'top':data[i].position.y,
                'background': data[i].btnBg!=undefined?'url('+data[i].btnBg+')':'none',
                'background-size':'100% 100%',
                'height':data[i].btnHeight,
                'width':data[i].btnWidth,
                'fontSize':data[i].fontSize?data[i].fontSize+'px':'14px',
                'color':data[i].fontColor?data[i].fontColor:'#ffffff'
            });
        }
    }

    /*页面一新增修改按钮*/
    $('#firstLevelForm').on('submit',function(){
        if(submitStatus == 'add'){
            let formData = new FormData();
            let formStr = $('#firstLevelForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            let file = $('#btnBg_1')[0].files[0];
            formData.append('btnBg',file);
            service.addFirstPageBtn(formData,function(data){
                if(data.resultCode==200){
                    $('#formModal_YM001').modal('hide');
                    let btn = `<button data-i="${data.data._id}" class="btn btn-success">${data.data.name}</button>`;
                    $('#dynamicAddition').append(btn);
                    $(`#dynamicAddition button[data-i*=${data.data._id}]`).css({
                        'background': 'url('+data.data.btnBg+')',
                        'background-size':'100% 100%',
                        'height':data.data.btnHeight,
                        'width':data.data.btnWidth
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        else{
            let formData = new FormData();
            let formStr = $('#firstLevelForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            let file = $('#btnBg_1')[0].files[0];
            if(file){
                formData.append('btnBg',file);
            }
            service.modifyFirstPageBtn(_id,formData,function(data){
                if(data.resultCode==200){
                    service.getFirstPageData(function (data) {
                        $('#formModal_'+pages[nowPage]).modal('hide');
                        firstPageBtns = data;
                        setDynamicAddition(data);
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        event.preventDefault();
    });

    /*页面二新增修改展区按钮*/
    $('#secondLevelForm').on('submit',function(){
        if(submitStatus == 'add'){
            let formData = new FormData();
            let formStr = $('#secondLevelForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            formData.append('media',[]);
            formData.append('device',[]);
            let file = $('#btnBg_2')[0].files[0];
            formData.append('btnBg',file);
            service.addSecondPageBtn(formData,function(data){
                if(data.resultCode==200){
                    $('#formModal_YM002').modal('hide');
                    secondPageBtns.push(data.data);
                    let li = `
                    <li data-i="${data.data._id}">
                        <p>
                            <a class="btn btn-primary exhibitionArea">${data.data.name}-媒体</a>
                            <a class="btn btn-primary device">${data.data.name}-设备</a>
                        </p>
                        <span>
                            <button type="button" class="btn btn-info goTop" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDown" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goModify aria-label="Left Align">
                                    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDelete" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </span>
                    </li>`;
                    $('.ExhibitionAreaNav').append(li);
                    let btn = `<button data-i="${data.data._id}" class="btn btn-success">${data.data.name}</button>`;
                    $('#dynamicAddition').append(btn);
                    $(`#dynamicAddition button[data-i*=${data.data._id}]`).css({
                        'background': 'url('+data.data.btnBg+')',
                        'background-size':'100% 100%',
                        'height':data.data.btnHeight,
                        'width':data.data.btnWidth
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        else{
            let formData = new FormData();
            let formStr = $('#secondLevelForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            let file = $('#btnBg_2')[0].files[0];
            if(file){
                formData.append('btnBg',file);
            }
            service.modifySecondPageBtn(_id,formData,function(data){
                if(data.resultCode==200){
                    service.getSecondPageData(function (data) {
                        $('#formModal_'+pages[nowPage]).modal('hide');
                        secondPageBtns = data;
                        setDynamicAddition(data);
                        $('.ExhibitionAreaNav').html('');
                        for(let x=0;x<data.length;x++){
                            let li = `
                    <li data-i="${data[x]._id}">
                        <p>
                            <a class="btn btn-primary exhibitionArea">${data[x].name}-媒体</a>
                            <a class="btn btn-primary device">${data[x].name}-设备</a>
                        </p>
                        <span>
                            <button type="button" class="btn btn-info goTop" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDown" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goModify" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDelete" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </span>
                    </li>`;
                            $('.ExhibitionAreaNav').append(li);
                        }
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        event.preventDefault();
    });

    /*页面二新增修改媒体按钮*/
    $('#formModal_YM002_exhibition').on('submit',function(){
        if(submitStatus=='add'){
            let formData = new FormData();
            let formStr = $('#secondMediaForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1]);
            }
            formData.append('parentID',thisID);
            let file = $('#btnBg_2_exhibition')[0].files[0];
            formData.append('btnBg',file);
            service.addSecondMediaPageBtn(formData,function(data){
                if(data.resultCode==200){
                    console.log(data);
                    $('#formModal_YM002_exhibition').modal('hide');
                    for(let i=0; i<secondPageBtns.length; i++){
                        if(secondPageBtns[i]._id == thisID){
                            console.log(secondPageBtns[i].media);
                            secondPageBtns[i].media.push(data.data);
                        }
                    }
                    let btn = `<button data-i="${data.data._id}" class="btn btn-success">${data.data.name}</button>`;
                    $('#dynamicAddition').append(btn);
                    $(`#dynamicAddition button[data-i*=${data.data._id}]`).css({
                        'background': 'url('+data.data.btnBg+')',
                        'background-size':'100% 100%',
                        'height':data.data.btnHeight,
                        'width':data.data.btnWidth,
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        else{
            let formData = new FormData();
            let formStr = $('#secondMediaForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            let file = $('#btnBg_2_exhibition')[0].files[0];
            if(file){
                formData.append('btnBg',file);
            }
            service.modifySecondMediaPageBtn(thisID,_id,formData,function(data){
                if(data.resultCode==200){
                    console.log(data);
                    service.getSecondPageData(function (data) {
                        $('#formModal_'+pages[nowPage]).modal('hide');
                        secondPageBtns = data;
                        let mediaData;
                        for(let i=0; i<secondPageBtns.length; i++){
                            if(secondPageBtns[i]._id == thisID){
                                mediaData = secondPageBtns[i].media;
                            }
                        }
                        setDynamicAddition(mediaData);
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        event.preventDefault();
    });

    /*页面二新增修改设备按钮*/
    $('#formModal_YM002_device').on('submit',function(){
        if(submitStatus == 'add'){
            let formData = new FormData();
            let formStr = $('#secondDeviceForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1]);
            }
            formData.append('parentID',thisID);
            let file = $('#btnBg_2_device')[0].files[0];
            formData.append('btnBg',file);
            service.addSecondDevicePageBtn(formData,function(data){
                if(data.resultCode==200){
                    console.log(data);
                    $('#formModal_YM002_device').modal('hide');
                    for(let i=0; i<secondPageBtns.length; i++){
                        if(secondPageBtns[i]._id == thisID){
                            console.log(secondPageBtns[i]);
                            secondPageBtns[i].device.push(data.data);
                        }
                    }
                    let btn = `<button data-i="${data.data._id}" class="btn btn-success">${data.data.name}</button>`;
                    $('#dynamicAddition').append(btn);
                    $(`#dynamicAddition button[data-i*=${data.data._id}]`).css({
                        'background': 'url('+data.data.btnBg+')',
                        'background-size':'100% 100%',
                        'height':data.data.btnHeight,
                        'width':data.data.btnWidth
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        else{
            let formData = new FormData();
            let formStr = $('#secondDeviceForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            let file = $('#btnBg_2_device')[0].files[0];
            if(file){
                formData.append('btnBg',file);
            }
            console.log(thisID,_id,formData);
            service.modifySecondDevicePageBtn(thisID,_id,formData,function(data){
                if(data.resultCode==200){
                    console.log(data);
                    service.getSecondPageData(function (data) {
                        $('#formModal_'+pages[nowPage]).modal('hide');
                        secondPageBtns = data;
                        let deviceData;
                        for(let i=0; i<secondPageBtns.length; i++){
                            if(secondPageBtns[i]._id == thisID){
                                deviceData = secondPageBtns[i].device;
                            }
                        }
                        setDynamicAddition(deviceData);
                    });
                }else{
                    alert('上传失败');
                }
            });
        }
        event.preventDefault();
    });

    /*页面三新增修改按钮*/
    $('#thirdLevelForm').on('submit',function(){
        console.log(submitStatus);
        if(submitStatus == 'add'){
            console.log('--');
            let formData = new FormData();
            let formStr = $('#thirdLevelForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            let file = $('#btnBg_3')[0].files[0];
            formData.append('btnBg',file);
            service.addThirdPageBtn(formData,function(data){
                if(data.resultCode==200){
                    $('#formModal_YM003').modal('hide');
                    let btn = `<button data-i="${data.data._id}" class="btn btn-success">${data.data.name}</button>`;
                    $('#dynamicAddition').append(btn);
                    $(`#dynamicAddition button[data-i*=${data.data._id}]`).css({
                        'background': 'url('+data.data.btnBg+')',
                        'background-size':'100% 100%',
                        'height':data.data.btnHeight,
                        'width':data.data.btnWidth
                    });
                }else{
                    alert('上传失败');
                }
            });
        }else{
            let formData = new FormData();
            let formStr = $('#thirdLevelForm').serialize().split('&');
            for(let x=0;x<formStr.length;x++){
                formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
            }
            let file = $('#btnBg_3')[0].files[0];
            if(file){
                formData.append('btnBg',file);
            }
            service.modifyThirdPageBtn(_id,formData,function(data){
                if(data.resultCode==200){
                    // alert(data.resultMessage);
                    service.getThirdPageData(function (data) {
                        $('#formModal_'+pages[nowPage]).modal('hide');
                        thirdPageBtns = data;
                        setDynamicAddition(data);
                    });
                }else{
                    alert('上传失败');
                }
            });
            event.preventDefault();
        }
        event.preventDefault();
    });

    /*保存页面按钮位置*/
    $('.commit').on('click',function(){
        var btns = $('#dynamicAddition>button');
        if(nowPage==1){
            let data = {"data":[]};
            for(var x=0;x<btns.length;x++){
                for(var y=0;y<firstPageBtns.length;y++){
                    if($(btns[x]).attr('data-i') == firstPageBtns[y]._id){
                        firstPageBtns[y].position.x = $(btns[x]).css('left');
                        firstPageBtns[y].position.y = $(btns[y]).css('top');
                        data.data.push({_id:firstPageBtns[y]._id,position:{x:firstPageBtns[y].position.x,y:firstPageBtns[y].position.y}});
                    }
                }
            }
            service.setFirstPageBtnPositions(data,function(data){
                alert(data.resultMessage);
            });
        }
        if(nowPage==2){
            let data = {"data":[]};
            for(var x=0;x<btns.length;x++){
                for(var y=0;y<secondPageBtns.length;y++){
                    if($(btns[x]).attr('data-i') == secondPageBtns[y]._id){
                        secondPageBtns[y].position.x = $(btns[x]).css('left');
                        secondPageBtns[y].position.y = $(btns[y]).css('top');
                        data.data.push({_id:secondPageBtns[y]._id,position:{x:secondPageBtns[y].position.x,y:secondPageBtns[y].position.y}});
                    }
                }
            }
            service.setSecondPageBtnPositions(data,function(data){
                alert(data.resultMessage);
            });
        }
        if(nowPage=='2_1'){
            let secondMediaPageBtns = {};
            for(var i=0;i<secondPageBtns.length;i++){
                if(secondPageBtns[i]._id == thisID){
                    secondMediaPageBtns.data = secondPageBtns[i].media;
                }
            }
            for(var x=0;x<btns.length;x++){
                for(var y=0;y<secondMediaPageBtns.data.length;y++){
                    if($(btns[x]).attr('data-i') == secondMediaPageBtns.data[y]._id){
                        secondMediaPageBtns.data[y].position.x = $(btns[x]).css('left');
                        secondMediaPageBtns.data[y].position.y = $(btns[y]).css('top');
                    }
                }
            }
            service.setSecondMediaPageBtnPositions(thisID,secondMediaPageBtns,function(data){
                alert(data.resultMessage);
            });
        }
        if(nowPage=='2_2'){
            let secondDevicePageBtns = {};
            for(var i=0;i<secondPageBtns.length;i++){
                if(secondPageBtns[i]._id == thisID){
                    secondDevicePageBtns.data = secondPageBtns[i].device;
                }
            }
            for(var x=0;x<btns.length;x++){
                for(var y=0;y<secondDevicePageBtns.data.length;y++){
                    if($(btns[x]).attr('data-i') == secondDevicePageBtns.data[y]._id){
                        secondDevicePageBtns.data[y].position.x = $(btns[x]).css('left');
                        secondDevicePageBtns.data[y].position.y = $(btns[y]).css('top');
                    }
                }
            }
            service.setSecondDevicePageBtnPositions(thisID,secondDevicePageBtns,function(data){
                alert(data.resultMessage);
            });
        }
        if(nowPage==3){
            let data = {"data":[]};
            for(var x=0;x<btns.length;x++){
                for(var y=0;y<thirdPageBtns.length;y++){
                    if($(btns[x]).attr('data-i') == thirdPageBtns[y]._id){
                        thirdPageBtns[y].position.x = $(btns[x]).css('left');
                        thirdPageBtns[y].position.y = $(btns[y]).css('top');
                        data.data.push({_id:thirdPageBtns[y]._id,position:{x:thirdPageBtns[y].position.x,y:thirdPageBtns[y].position.y}});
                    }
                }
            }
            service.setThirdPageBtnPositions(data,function(data){
                alert(data.resultMessage);
            });
        }
    });

    /*表单赋值*/
    $('#dynamicAddition').on('dblclick','button',function(){
        $('.modify').show();
        $('.isDelete').show();
        $('.submit').hide();
        submitStatus = 'modify';
        let pageData = {
            "1" : firstPageBtns,
            "2" : secondPageBtns,
            "2_1" : secondPageBtns,
            "2_2" : secondPageBtns,
            "3" : thirdPageBtns
        };
        _id = $(this).attr('data-i');
        $('#formModal_'+pages[nowPage]).modal('show');
        if(nowPage == '2_1'){
            let media,data;
            for(let i=0;i<pageData[nowPage].length;i++){
                if(thisID == pageData[nowPage][i]._id){
                    media = pageData[nowPage][i].media;
                }
            }
            for(let i=0;i<media.length;i++){
                if(_id == media[i]._id){
                    data = media[i];
                }
            }
            for(var what in data){
                if($('#'+what+'_2_exhibition')&&what!='btnBg'){
                    $('#'+what+'_2_exhibition').val(data[what]);
                }
            }
        }
        if(nowPage == '2_2'){
            let media,data;
            for(let i=0;i<pageData[nowPage].length;i++){
                if(thisID == pageData[nowPage][i]._id){
                    media = pageData[nowPage][i].device;
                }
            }
            for(let i=0;i<media.length;i++){
                if(_id == media[i]._id){
                    data = media[i];
                }
            }
            for(var what in data){
                if($('#'+what+'_2_device')&&what!='btnBg'){
                    $('#'+what+'_2_device').val(data[what]);
                }
            }
        }
        else{
           let data;
           for(var i=0;i<pageData[nowPage].length;i++){
               if(_id == pageData[nowPage][i]._id){
                   data = pageData[nowPage][i];
               }
           }
           for(var what in data){
               if($('#'+what+'_'+nowPage)&&what!='btnBg'){
                   $('#'+what+'_'+nowPage).val(data[what]);
               }
           }
       }
    });

    /*修改页面一按钮*/
    // $('#firstLevelForm .modify').on('click',function(){
    //     let formData = new FormData();
    //     let formStr = $('#firstLevelForm').serialize().split('&');
    //     for(let x=0;x<formStr.length;x++){
    //         formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
    //     }
    //     let file = $('#btnBg_1')[0].files[0];
    //     if(file){
    //         formData.append('btnBg',file);
    //     }
    //     service.modifyFirstPageBtn(_id,formData,function(data){
    //         if(data.resultCode==200){
    //             service.getFirstPageData(function (data) {
    //                 $('#formModal_'+pages[nowPage]).modal('hide');
    //                 firstPageBtns = data;
    //                 setDynamicAddition(data);
    //             });
    //         }else{
    //             alert('上传失败');
    //         }
    //     });
    //     event.preventDefault();
    // });

    /*修改页面二按钮*/
    // $('#secondLevelForm .modify').on('click',function(){
    //     let formData = new FormData();
    //     let formStr = $('#secondLevelForm').serialize().split('&');
    //     for(let x=0;x<formStr.length;x++){
    //         formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
    //     }
    //     let file = $('#btnBg_2')[0].files[0];
    //     if(file){
    //         formData.append('btnBg',file);
    //     }
    //     service.modifySecondPageBtn(_id,formData,function(data){
    //         if(data.resultCode==200){
    //             service.getSecondPageData(function (data) {
    //                 $('#formModal_'+pages[nowPage]).modal('hide');
    //                 secondPageBtns = data;
    //                 setDynamicAddition(data);
    //                 $('.ExhibitionAreaNav').html('');
    //                 for(let x=0;x<data.length;x++){
    //                     let li = `
    //                 <li data-i="${data[x]._id}">
    //                     <p>
    //                         <a class="btn btn-primary exhibitionArea">${data[x].name}-媒体</a>
    //                         <a class="btn btn-primary device">${data[x].name}-设备</a>
    //                     </p>
    //                     <span>
    //                         <button type="button" class="btn btn-info goTop" aria-label="Left Align">
    //                                 <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
    //                         </button>
    //                         <button type="button" class="btn btn-info goDown" aria-label="Left Align">
    //                                 <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
    //                         </button>
    //                         <button type="button" class="btn btn-info goModify" aria-label="Left Align">
    //                                 <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
    //                         </button>
    //                         <button type="button" class="btn btn-info goDelete" aria-label="Left Align">
    //                                 <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
    //                         </button>
    //                     </span>
    //                 </li>`;
    //                     $('.ExhibitionAreaNav').append(li);
    //                 }
    //             });
    //         }else{
    //             alert('上传失败');
    //         }
    //     });
    //     event.preventDefault();
    // });

    /*修改页面二媒体按钮*/
    // $('#secondMediaForm .modify').on('click',function(){
    //     let formData = new FormData();
    //     let formStr = $('#secondMediaForm').serialize().split('&');
    //     for(let x=0;x<formStr.length;x++){
    //         formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
    //     }
    //     let file = $('#btnBg_2_exhibition')[0].files[0];
    //     if(file){
    //         formData.append('btnBg',file);
    //     }
    //     service.modifySecondMediaPageBtn(thisID,_id,formData,function(data){
    //         if(data.resultCode==200){
    //             console.log(data);
    //             service.getSecondPageData(function (data) {
    //                 $('#formModal_'+pages[nowPage]).modal('hide');
    //                 secondPageBtns = data;
    //                 let mediaData;
    //                 for(let i=0; i<secondPageBtns.length; i++){
    //                     if(secondPageBtns[i]._id == thisID){
    //                         mediaData = secondPageBtns[i].media;
    //                     }
    //                 }
    //                 setDynamicAddition(mediaData);
    //             });
    //         }else{
    //             alert('上传失败');
    //         }
    //     });
    //     event.preventDefault();
    // });

    /*修改页面二设备按钮*/
    // $('#secondDeviceForm .modify').on('click',function(){
    //     let formData = new FormData();
    //     let formStr = $('#secondDeviceForm').serialize().split('&');
    //     for(let x=0;x<formStr.length;x++){
    //         formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
    //     }
    //     let file = $('#btnBg_2_device')[0].files[0];
    //     if(file){
    //         formData.append('btnBg',file);
    //     }
    //     service.modifySecondDevicePageBtn(thisID,_id,formData,function(data){
    //         if(data.resultCode==200){
    //             console.log(data);
    //             service.getSecondPageData(function (data) {
    //                 $('#formModal_'+pages[nowPage]).modal('hide');
    //                 secondPageBtns = data;
    //                 let deviceData;
    //                 for(let i=0; i<secondPageBtns.length; i++){
    //                     if(secondPageBtns[i]._id == thisID){
    //                         deviceData = secondPageBtns[i].device;
    //                     }
    //                 }
    //                 setDynamicAddition(deviceData);
    //             });
    //         }else{
    //             alert('上传失败');
    //         }
    //     });
    //     event.preventDefault();
    // });

    /*修改页面三按钮*/
    // $('#thirdLevelForm .modify').on('click',function(){
    //     let formData = new FormData();
    //     let formStr = $('#thirdLevelForm').serialize().split('&');
    //     for(let x=0;x<formStr.length;x++){
    //         formData.append(formStr[x].split('=')[0].split('_')[0],formStr[x].split('=')[1])
    //     }
    //     let file = $('#btnBg_3')[0].files[0];
    //     if(file){
    //         formData.append('btnBg',file);
    //     }
    //     service.modifyThirdPageBtn(_id,formData,function(data){
    //         if(data.resultCode==200){
    //             alert(data.resultMessage);
    //             service.getThirdPageData(function (data) {
    //                 $('#formModal_'+pages[nowPage]).modal('hide');
    //                 thirdPageBtns = data;
    //                 setDynamicAddition(data);
    //             });
    //         }else{
    //             alert('上传失败');
    //         }
    //     });
    //     event.preventDefault();
    // });

    /*左侧设置功能*/
    $('.ExhibitionAreaNav').on('click','.goModify',function(){
        $('.modify').show();
        $('.isDelete').show();
        $('.submit').hide();
        submitStatus = 'modify';
        let pageData = {
            "1" : firstPageBtns,
            "2" : secondPageBtns,
            "2_1" : secondPageBtns,
            "2_2" : secondPageBtns,
            "3" : thirdPageBtns
        };
        _id = $(this.parentNode.parentNode).attr('data-i');
        console.log(_id);
        $('#formModal_'+pages[2]).modal('show');
        let data;
        for(var i=0;i<pageData[nowPage].length;i++){
            if(_id == pageData[nowPage][i]._id){
                data = pageData[nowPage][i];
            }
        }
        for(var what in data){
            if($('#'+what+'_'+nowPage)&&what!='btnBg'){
                $('#'+what+'_'+nowPage).val(data[what]);
            }
        }
    });

    /*左侧删除功能*/
    $('.ExhibitionAreaNav').on('click','.goDelete',function(){
        _id = $(this.parentNode.parentNode).attr('data-i');
        $('.modal').modal('hide');
        $('#isDeletedModal').modal('show');
    });

    /*上移功能*/
    $('.ExhibitionAreaNav').on('click','.goTop',function(){
        let id = $(this.parentNode.parentNode).attr('data-i');
        let thisSequence;
        console.log(secondPageBtns);
        for(let i=0;i<secondPageBtns.length;i++){
            if(id == secondPageBtns[i]._id){
                thisSequence = secondPageBtns[i].sequence;
            }
        }
        if(thisSequence == 0){
            return
        }
        let preId,preSequence;
        for(let i=0;i<secondPageBtns.length;i++){
            if(id == secondPageBtns[i]._id){
                preId = secondPageBtns[i-1]._id;
                preSequence = secondPageBtns[i-1].sequence;
            }
        }
        service.modifySequence(id,Number(thisSequence),preId,Number(preSequence),function(data){
            if(data){
                service.getSecondPageData(function(data){
                    secondPageBtns = data;
                    setDynamicAddition(data);
                    $('.ExhibitionAreaNav').html('');
                    for(let x=0;x<data.length;x++){
                        let li = `
                    <li data-i="${data[x]._id}">
                        <p>
                            <a class="btn btn-primary exhibitionArea">${data[x].name}-媒体</a>
                            <a class="btn btn-primary device">${data[x].name}-设备</a>
                        </p>
                        <span>
                            <button type="button" class="btn btn-info goTop" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDown" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goModify" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDelete" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </span>
                    </li>`;
                        $('.ExhibitionAreaNav').append(li);
                    }
                });
            }
        })
    });
    /*下移功能*/
    $('.ExhibitionAreaNav').on('click','.goDown',function(){
        let id = $(this.parentNode.parentNode).attr('data-i');
        let thisSequence;
        console.log(secondPageBtns);
        for(let i=0;i<secondPageBtns.length;i++){
            if(id == secondPageBtns[i]._id){
                thisSequence = secondPageBtns[i].sequence;
                if(i==secondPageBtns.length-1){
                    return
                }
            }
        }
        let preId,preSequence;
        for(let i=0;i<secondPageBtns.length;i++){
            if(id == secondPageBtns[i]._id){
                preId = secondPageBtns[i+1]._id;
                preSequence = secondPageBtns[i+1].sequence;
            }
        }
        service.modifySequence(id,Number(thisSequence),preId,Number(preSequence),function(data){
            if(data){
                service.getSecondPageData(function(data){
                    secondPageBtns = data;
                    setDynamicAddition(data);
                    $('.ExhibitionAreaNav').html('');
                    for(let x=0;x<data.length;x++){
                        let li = `
                    <li data-i="${data[x]._id}">
                        <p>
                            <a class="btn btn-primary exhibitionArea">${data[x].name}-媒体</a>
                            <a class="btn btn-primary device">${data[x].name}-设备</a>
                        </p>
                        <span>
                            <button type="button" class="btn btn-info goTop" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDown" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goModify" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-info goDelete" aria-label="Left Align">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </span>
                    </li>`;
                        $('.ExhibitionAreaNav').append(li);
                    }
                });
            }
        })
    });
    /*确认删除弹框*/
    $('.isDelete').on('click',function(){
       $('.modal').modal('hide');
       $('#isDeletedModal').modal('show');
    });

    /*删除按钮操作*/
    $('.delete').on('click',function(){
        if(nowPage == '1'){
            service.deleteBtn('page1',_id,'',function(data){
                if(data.resultCode == 200){
                    service.getFirstPageData(function (data) {
                        firstPageBtns = data;
                        setDynamicAddition(data);
                    });
                }else{
                    alert('删除失败');
                }
            })
        }
        if(nowPage == '2'){
            service.deleteBtn('page2',_id,'',function(data){
                console.log(data);
                if(data.resultCode == 200){
                    service.getSecondPageData(function (data) {
                        secondPageBtns = data;
                        setDynamicAddition(data);
                        $('.ExhibitionAreaNav').html('');
                        for(let x=0;x<data.length;x++){
                            let li = `
                                    <li data-i="${data[x]._id}">
                                        <p>
                                            <a class="btn btn-primary exhibitionArea">${data[x].name}-媒体</a>
                                            <a class="btn btn-primary device">${data[x].name}-设备</a>
                                        </p>
                                        <span>
                                            <button type="button" class="btn btn-info goTop" aria-label="Left Align">
                                                    <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-info goDown" aria-label="Left Align">
                                                    <span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-info goModify" aria-label="Left Align">
                                                    <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-info goDelete" aria-label="Left Align">
                                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                            </button>
                                        </span>
                                    </li>`;
                            $('.ExhibitionAreaNav').append(li);
                        }
                    });
                }else{
                    alert('删除失败');
                }
            })
        }
        if(nowPage == '2_1'){
            console.log(_id,thisID);
            service.deleteBtn('page2_1',_id,thisID,function(data){
                console.log(data);
                if(data.resultCode == 200){
                    service.getSecondPageData(function (data) {
                        secondPageBtns = data;
                        let mediaData;
                        for(let i=0; i<secondPageBtns.length; i++){
                            if(secondPageBtns[i]._id == thisID){
                                mediaData = secondPageBtns[i].media;
                            }
                        }
                        setDynamicAddition(mediaData);
                    });
                }else{
                    alert('删除失败');
                }
            })
        }
        if(nowPage == '2_2'){
            console.log(_id,thisID);
            service.deleteBtn('page2_2',_id,thisID,function(data){
                console.log(data);
                if(data.resultCode == 200){
                    service.getSecondPageData(function (data) {
                        secondPageBtns = data;
                        let deviceData;
                        for(let i=0; i<secondPageBtns.length; i++){
                            if(secondPageBtns[i]._id == thisID){
                                deviceData = secondPageBtns[i].device;
                            }
                        }
                        setDynamicAddition(deviceData);
                    });
                }else{
                    alert('删除失败');
                }
            })
        }
        if(nowPage == '3'){
            service.deleteBtn('page3',_id,'',function(data){
                console.log(data);
                if(data.resultCode == 200){
                    service.getThirdPageData(function (data) {
                        thirdPageBtns = data;
                        setDynamicAddition(data);
                    });
                }else{
                    alert('删除失败');
                }
            })
        }
    });

    /*更换背景*/
    $('#bg').on('change',function(){
        let file = this.files[0];
        if(file.type.indexOf('image') == 0){
            let formData = new FormData();
            formData.append('backgroundImage',file);
            let src;
            if(nowPage=='2_1'||nowPage=='2_2'){
                src = '/setBg/'+nowPage+'_'+thisID;
            }else {
                src = '/setBg/'+nowPage;
            }
            console.log(nowPage);
            $.ajax({
                url:src,
                type:"post",
                data:formData,
                contentType:false,
                processData:false,
                success:function(data){
                    console.log(data);
                    $('.dynamicAdditionView>img').attr('src',data.data[0].path);
                }
            })
        }
    });

    /*
    * 编辑按钮位置
    * */
    let button;
    let flag = false;//是否按下鼠标的标记
    let cur = {x:0,y:0}//记录鼠标按下时的坐标
    let nx,ny,bx,by,x,y,bh,bw;
    //鼠标按下时的函数
    function down(e){
        flag = true; //确认鼠标按下
        cur.x = event.clientX ;//记录当前鼠标的X坐标
        cur.y = event.clientY;//记录当前鼠标的y坐标
        bx = button.offsetLeft;//记录button当时的左偏移量
        by = button.offsetTop;//记录button的上偏移量
        bh = $(e.target).height();
        bw = $(e.target).width();
        console.log(bh,bw);
    }
    //鼠标移动时的函数
    function move(){
        if(flag){//如果是鼠标按下则继续执行
            nx = event.clientX - cur.x;  //记录鼠标在x轴移动的数据
            ny = event.clientY - cur.y;  //记录鼠标在y轴移动的数据
            x = bx+nx;                   //div在x轴的偏移量加上鼠标在x轴移动的距离
            y = by+ny;                   //div在y轴的偏移量加上鼠标在y轴移动的距离
            if(x<0){
                x=0;
            }
            if(y<0){
                y=0;
            }
            if(x>(1024-bw)){
                x=1024-bw;
            }
            if(y>(768-bh)){
                y=768-bh;
            }
            button.style.left = x+"px";
            button.style.top = y +"px";
        }
    }
    //鼠标释放时候的函数
    function end(){
        flag = false;//鼠标释放
    }

    $('#dynamicAddition').on("mousedown",'.btn',function(e)
    {
        button = e.target;
        down(e);
    });
    $('#dynamicAddition').on("mousemove",'.btn',function(e)
    {
        move();
    });
    $('#dynamicAddition').on("mouseup",'.btn',function(e)
    {
        end();
    });

    /*
    * 生成
    * */
    $('.build').on('click',function(){
        window.open('http://127.0.0.1:3000/operation');
    })
};