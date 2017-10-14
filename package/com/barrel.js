define(
     ()=> 
function WaterFallCreator(Parent){
    let wf
    function WaterFall(){
        wf = this.WaterFallElement = document.createElement('div');
        wf.classList.add('WaterFullWraper')
        wf.innerHTML=`
            <ul class="pic-ct"></ul>
            <div id="load">不想看广告？看会新闻吧....</div>
        `
       Parent.appendChild(wf)
        this.init()
    }
  WaterFall.prototype.init = function(){
    var PicCt = $(this.WaterFallElement.querySelector('.pic-ct')),
    currentPostion = 0, 
    loaded,
    imgesLodedStatus = 0,
    liarr = [],
    columNumber =  Math.floor(Parent.offsetWidth / (292)),
    colums = [];
    currentPate=1;

    while (columNumber>0) {
        colums.push(0)
        columNumber--;
    }
    function loadElements() {
        loaded = false;
        $.ajax({
            url: 'http://platform.sina.com.cn/slide/album_tech',
            dataType: 'jsonp',   //这里使用了新浪新闻的 jsonp 接口，大家可以直接看数据， 如： http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4
            jsonp: "jsoncallback",
            data: {
                app_key: '1271687855',
                num: 15,
                page: currentPate++
            }
        }).done(function (ret) {
            imgesLodedStatus = parseInt(ret.count);
            if (ret.status.code == 0) {
                ret.data.forEach(function (element) {
                    let li = document.createElement('li'),
                        img = document.createElement('img'),
                        link = document.createElement('a'),
                        card_title = document.createElement('h3'),
                        card_content = document.createElement('p');
                    img.src = `${element.img_url}`
                    img.alt = `${element.name}`
                    link.href = `${element.url}`
                    card_title.innerHTML = `${element.short_name}`
                    card_content.innerHTML = `${element.short_intro}`
                    $(link).append(img)
                    $(li).append(link).append(card_title).append(card_content)
                    li.draggable=true
                    liarr.push($(li))
                    PicCt.append(li)
                });
                PicCt.find('img').load(function (e) {
                    if (--imgesLodedStatus) return;
                    layout()
                    loaded = true;
                })
            }
        })
    }
    function layout() {
        while (liarr.length) {
            let templi,
                min;
            templi = liarr.pop()
            templi.css({ top:colums[currentPostion], left:25+ (currentPostion * 292),opacity:1})
            colums[currentPostion] += templi.outerHeight(true)
            min =   colums[0]
            currentPostion = 0;
            for (let i = 0; i < colums.length; i++) {
                if(colums[i] < min) {
                    min =   colums[i]
                    currentPostion = i
                    }
                }       
            }
        PicCt.height(Math.max.apply(null,colums))
    }
    // $(Parent).scroll(function () {
    //     if (isVisible($('#load'))) {
    //         if (loaded) {
    //             loadElements()
    //         }
    //     }
    //     else{
            
    //     }
    // })
    document.getElementById('load').onclick=function(){
        loadElements()
    }
    function isVisible($el) {
        var scrollH = $(Parent).scrollTop(),
            winH = $(Parent).height(),
            top = $el.offset().top;

        if (top < winH + scrollH) {
            return true;
        } else {
            return false;
        }
        }
    }
    return new WaterFall()
})
