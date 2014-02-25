function createArr(L) {
    var arr = new Array(L);
    var i = 0;
    do {
        arr[i] = i++;
    }
    while (i < L);
    return arr;
}
function ParseA(A, B, I) {
    var Bl = B.length;
    if ((Bl + A.length) > I) {
        var C = [];
        for (var j = 0; j < A.length; j++) {
            C[j] = A[j];
        }
        A.length = 0;
        var r = parseInt(Math.random() * Bl);
        var i = 0;
        do {
            A.push(B[r]);
            B.splice(r, 1);
            r = parseInt(Math.random() * --Bl);
            i++;
        }
        while (i < I && Bl > 0);
        if (i < I) {
            for (; i < I; i++) {
                r = parseInt(Math.random() * C.length);
                A.push(C[r]);
                C.splice(r, 1);
            }
            return C;
        } else {
            for (var i = 0; i < C.length; i++) {
                B.push(C[i]);
            }
            return B;
        }

    }
}
function ser(A, B, C) {
    arrind = ParseA(arrhtml, arrind, VV);
    for (var i = 0; i < B.length; i++) {
        A.eq(i).attr("i", i);
        A.eq(i).delay(i * 200).fadeOut(350, function () {
            $(this).html(C[B[$(this).attr("i")]]);
            $(this).fadeIn(350);
        });
    }
}
function serviceA(A, B, C, T) {
    setA = setTimeout(function () {
        ser(A, B, C);
        setB = setInterval(function () { ser(A, B, C) }, 5000);
    }, T);
}
function arrpush(Obj) {
    var arr = [];
    for (var i = 0; i < Obj.length; i++) {
        arr.push(Obj.eq(i).html());
    }
    return arr;
}
var LL = 0, VV = 3, setA = setB = null, arrhtml =null , arrind =null, K = [];

function indexEnter() {
    $(".bg_img").animate({ top: ["0", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 450, function () {
        $(".lf_space").animate({ top: ["0", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 250);
        $(".rt_space").animate({ top: ["0", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 250);
        $(".bg_picture").css("background", "url(Newimages/ad_picture_top.jpg) no-repeat left top");
    });
    $(".service").delay(450).animate({ top: ["-60px", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 450, function () {
        $(this).delay(400).animate({ top: ["0px", 'easeOutBack'] }, 450);
        $(".space01").delay(450).animate({ opacity: [1, "easeOutBack"] }, 450);
        $(".space02").delay(450).animate({ opacity: [1, "easeOutBack"] }, 450);
    });
    $("#out_pic_div").delay(550).animate({ top: ["-60px", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 450, function () {
        $(this).delay(300).animate({ top: ["0px", 'easeOutBack'] }, 450);
    });
    $(".bgnews").delay(450).animate({ top: ["-60px", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 450, function () {
        $(this).delay(400).animate({ top: ["0px", 'easeOutBack'] }, 450);
        $(".space01").delay(450).animate({ opacity: [1, "easeOutBack"] }, 450);
        $(".space02").delay(450).animate({ opacity: [1, "easeOutBack"] }, 450);
    });
    $(".snews").delay(450).animate({ top: ["-60px", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 450, function () {
        $(this).delay(400).animate({ top: ["0px", 'easeOutBack'] }, 450);
        $(".space01").delay(450).animate({ opacity: [1, "easeOutBack"] }, 450);
        $(".space02").delay(450).animate({ opacity: [1, "easeOutBack"] }, 450);
    });
    $(".news").delay(550).animate({ top: ["-60px", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 450, function () {
        $(this).delay(300).animate({ top: ["0px", 'easeOutBack'] }, 450);
    });
    $(".biaoyu").delay(1300).animate({ top: ["0", 'easeOutBack'], opacity: [1, "easeOutBack"] }, 450, function () {
        $(".bo_space").fadeIn(450);
    });
}
function serviceEnter() {
    $("#service_list ul li").each(function (index) {
        $(this).delay(index * 150).animate({ top: "0px", opacity: 1 }, { duration: 450, easing: "easeOutBack" });
    });
    $(".dingdan_submit").delay(700).animate({ top: "0px", opacity: 1 }, { duration: 450, easing: "easeOutBack" });
    $("#service_list ul li").hover(function () {
        $(this).find(".service_libg").animate({ bottom: ["0px", "easeOutQuart"] }, { duration: 250, queue: false });
        $(this).find("span").css("color", "#fff");
        $(this).find("span a").css("color", "#fff");
    }, function () {
        $(this).find(".service_libg").animate({ bottom: ["-97px", 'easeOutQuart'] }, { duration: 250, queue: false });
        $(this).find("span").css("color", "#5B5B5B");
        $(this).find("span a").css("color", "#2F2F2F");
    });
}
function aboutEnter() {
    $("#marqueediv8").animate({ top: "0px", opacity: 1 }, { duration: 350, easing: "easeOutQuart" });
    $(".big_title").delay(200).animate({ left: "0px", opacity: 1 }, { duration: 450, easing: "easeOutQuart" });
    $(".small_txt p").eq(0).delay(350).animate({ left: "0px", opacity: 1 }, { duration: 450, easing: "easeOutQuart" });
    $(".small_txt p").eq(1).delay(400).animate({ left: "0px", opacity: 1 }, { duration: 450, easing: "easeOutQuart" });
    $("div.about_text_rt").delay(500).animate({ top: "0px", opacity: 1 }, { duration: 450, easing: "easeOutQuart" });
}
function addJavasriptFile(srcStr){
    var g = document.createElement('script');
    g.type = 'text/javascript';
    g.async = true;
    g.src = srcStr;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(g, s);
}
function lazyloadF($Obj,N){
    if (N == "undefined") { N = 300; }
    $Obj.lazyload({ skip_invisible: false, threshold: N, effect: "fadeIn", event: "sporty"});
}
$(document).ready(function () {
    if (document.getElementById("service_box_ul")) {
        indexEnter();
        indexA();
    }
    if(document.getElementById("MItop")){
        mobileEnter();
    }
    if (document.getElementById("conmidul")) {
        newcaseEnter();
    }
    if (document.getElementById("service_list")) {
        serviceEnter();
    }
    if (document.getElementById("logos_box")) {
        $("#logos_box li").each(function (index) {
            $(this).delay(index * 80).animate({ top: "0px", opacity: 1 }, { duration: 450, easing: "easeOutQuart" });
        });
    }
    if (document.getElementById("n1")) {
        aboutEnter();
    }
    if (document.getElementById("map_canvas")) {
        $("div.contact_lf .opacityLeft").each(function (index) {
            $(this).delay(index * 60).animate({ left: "0px", opacity: 1 }, { duration: 450, easing: "easeOutQuart" });
        });
        $("div.contact_rt .opacityRight").each(function (index) {
            $(this).delay(index * 150).animate({ left: "0px", opacity: 1 }, { duration: 450, easing: "easeOutQuart" });
        });
    }
});