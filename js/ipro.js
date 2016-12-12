/**
 * Created by Administrator on 2016/9/4.
 */
$(function () {
    if(window.screen.width<768){
        $("div.container-box").css('paddingTop','20px');
        $('div.container-box div.lf h2').css({'font-size':'2em','margin-left':'50px',"margin-bottom":"20px"});
        $('div.container-box div.lf h3').css({'font-size':'3em'});
    }
    var li = $('.products-body-ul>li');
    var vHeight = document.documentElement.clientHeight;
    var scrollH = li[0].offsetTop - vHeight, top3 = li[3].offsetTop + vHeight, timer = false;
    var a_index=$.cookie('a_index');
    //设置li的高度
    (function () {
        li.height(vHeight).css('background', '#eee').next().css('background', '#313131').next().css('background', '#eee').next().css('background', '#313131');
    })();

    //点击动画移动到相应的色块
    $('div.products-number a').click(function (e) {
        e.preventDefault();
        scrollH = li[0].offsetTop + vHeight * this.dataset.i;
        scrollFun(scrollH);
    });

    //添加滚动事件，当滚动高度>li[0].offsetTop时，鼠标滚动即触发整屏滚动
    //滚动函数
    function scrollFun(scrollH) {
        if (!timer) {
            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = false;
            }, 1000);
            $('body,html').animate({scrollTop: scrollH}, 1000);
        }
        // return;
    }
    //鼠标滚轮滚动控制函数
    function wheelControl(delta) {
        delta.preventDefault();
        if (delta.deltaY>0||delta.detail>0) {
            !timer && scrollH < vHeight * 5 && (scrollH += vHeight);
            scrollFun(scrollH);
        } else {
            !timer && scrollH >= 0 && (scrollH -= vHeight);
            scrollFun(scrollH);
        }
    }

    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (scrollTop >= 0 && scrollTop < top3-vHeight) {
        if(!!a_index){
            scrollH = li[0].offsetTop + vHeight * a_index;
            scrollFun(scrollH);
        }
        if(isNaN(scrollH)){
            scrollH=li[0].offsetTop - vHeight;
        }
        // window.onmousewheel = wheelControl;
        //为页面添加鼠标滚轮事件
        // window.onmousewheel=wheelControl; //todo onmousewheel事件有浏览器兼容性问题
        if(document.addEventListener){ document.addEventListener('DOMMouseScroll',wheelControl,false); }      //W3C
        window.onmousewheel=document.onmousewheel=wheelControl;            //IE/Opera/Chrome
    }

    window.onscroll=function(){
        scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var sT0=li[0].offsetTop;
        var sT1=li[1].offsetTop;
        var sT2=li[2].offsetTop;
        var sT3=li[3].offsetTop;
        if(scrollTop>=(sT0-20)){
            $('.products-body-ul>li:nth-child(1) div.container-box>div.rf').addClass("wow fadeInLeft animated").next().addClass("wow fadeInRight animated");
        }
        if(scrollTop>=(sT1-20)){
            $('.products-body-ul>li:nth-child(2) div.container-box>div.lf').addClass("wow fadeInRight animated").next().addClass("wow fadeInLeft animated");
        }
        if(scrollTop>=(sT2-20)){
            $('.products-body-ul>li:nth-child(3) div.container-box>div.rf').addClass("wow fadeInLeft animated").next().addClass("wow fadeInRight animated");
        }
        if(scrollTop>=(sT3-20)){
            $('.products-body-ul>li:nth-child(4) div.container-box>div.lf').addClass("wow fadeInRight animated").next().addClass("wow fadeInLeft animated");
        }
        // if(scrollTop>=(sT3+sT0)){
        //     $('.products-bottom-grids div[data-wow-delay]').addClass("wow bounceIn animated");
        //     // $('.products-bottom-grids>div:nth-child(2)>div[class*=gallery-grid]').addClass("wow bounceIn animated");
        // }
    }
});
