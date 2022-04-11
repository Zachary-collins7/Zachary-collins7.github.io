import '../scss/app.scss';
import * as $ from 'jquery';
import 'bootstrap';
import * as moment from "moment";
import barba from '@barba/core';
import anime from 'animejs/lib/anime.es.js';

const demo = () => moment("20111031", "YYYYMMDD").fromNow();

//fix scroll
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

barba.hooks.after((data) => {
    init()
});

function barbaScrollTimer(s) {
    return Math.max(
        Math.abs(s.offset().top - $(document).scrollTop()) / 300 * 1000,
        200
    )
}

barba.init({
    debug: true,
    sync: true,
    preventRunning: true,
    logLevel: 'debug',
    // timeout: 5000,
    // views: [{
    //     namespace: "index",
    //     leave(data) {

    //     }
    // }, {
    //     namespace: "about"
    // }],
    transitions: [
        {
            name: 'from-index',
            from: {
                namespace: [
                    'index'
                ]
            },
            before(data) {
                var s = $(data.trigger).parentsUntil(".full-page-section").parent();
                return $([document.documentElement, document.body]).animate({
                    scrollTop: s.offset().top
                }, barbaScrollTimer(s)).promise();
            },
            beforeLeave(data) {
                var s = $(data.trigger).parentsUntil(".full-page-section").parent();
                var tl = anime.timeline({
                    easing: "easeInOutCubic",
                    duration: 1000,
                    begin: function() {
                        s.find(".container").css('overflow', 'visible').css('position', 'unset');
                    }
                })

                var offset = s.find(".container .about").position().left - $(window).width() * 0.08
                
                tl.add({
                    targets: [s.find(".container")[0]],
                    height: ['70%', '100%'],
                    padding: 0,
                    marginRight: 0
                }, 0)
                .add({
                    targets: [s.find(".container .about")[0]],
                    translateX: [-offset, 0]
                }, 0);
                return tl.finished;
            },
            enter(data) {
                window.scrollTo(0, 0);
            }
        },
        {
            name: 'to-index',
            from: {
                namespace: [
                    'about',
                    'contact'
                ]
            },
            before(data) {
                var s = $(".full-page-section").first();
                return $([document.documentElement, document.body]).animate({
                    scrollTop: s.offset().top
                }, barbaScrollTimer(s)).promise();
            },
            beforeLeave(data) {
                var s = $(".full-page-section").first();

                var tl = anime.timeline({
                    easing: "easeInOutCubic",
                    duration: 1000,
                })

                s.find(".container")
                    .css('position','relative')
                    .css('overflow', 'hidden')
                    .removeClass('postAnimate');
                var offset = $(window).width() * 0.08

                tl.add({
                    targets: [s.find(".container")[0]],
                    height: ['100%', '70%']
                }, 0)
                    .add({
                        targets: [s.find(".container .about")[0]],
                        translateX: [-offset, 0]
                    }, 0);
                return tl.finished;
            },
            after(data) {
                $(`div[data-section-name=${data.current.namespace}]`).data("animated", true);
                scrollToHash(data.current.namespace, 0);
            }
        },
    ]
});

function removeFloatingNav() {
    if ($("#f-nav").length) {
        $("#f-nav").first().attr('id', 'f-nav-old');
        anime({
            targets: '#f-nav-old',
            opacity: 0,
            duration: 300,
            complete: function () {
                $("#f-nav-old").remove();
            }
        })
    }
    
}

function createFloatingNav() {
    var ul = $("<ul>").append(
        $("div[data-section-name]").map(function () {
            return $("<li>").append(
                $("<a>", {
                    href: "#" + $(this).attr("data-section-name")
                })
            )[0]
        })
    )
    $("<div>", {
        id: "f-nav",
        class: "f-nav",
        css: {
            "opacity" : 0
        }
    }).append(ul).appendTo("body");

    anime({
        targets: '#f-nav',
        opacity: [0, 1],
        easing: "easeInSine",
        duration: 300,
        delay: 200
    })
}


function updateMenu() {
    //update hash
    var sectionTag = getShownSections().last().data("section-name");
    window.location.hash = sectionTag;
    $(".f-nav ul li a").each(function() {
        $(this).removeClass("active");
    });

    $(`.f-nav ul li a[href$=${sectionTag}]`).addClass("active");
}

function scrollToHash(hash, time) {
    if (hash === undefined) { return }
    $([document.documentElement, document.body]).animate({
        scrollTop: $(`div[data-section-name=${hash}]`).offset().top
    }, time);
}

function getShownSections() {
    let triggerConst = 0.5 //trigger animations when % of section shows
    return $(`div[data-section-name]`).map(function () {
        var top = $(this).offset().top - $(document).scrollTop();
        var bottom = top + $(this).height();
        var a = Math.max(top, bottom);
        if (a >= 0 && a <= (1 + triggerConst) * $(window).height()) {
            return $(this)[0]
        }
    });
}

function prepSectionAnimation(s) {
    s.find(".image .c1").css('width', '100%');
    s.find(".image .c2").css('width', '0%').css('left', '0%');
    s.find(".title").css('transform', `translateX(${-600}px)`);
    s.find(".divider").css('transform', `translateX(${-600}px)`);
    s.find(".desc").css('transform', `translateX(${-600}px)`);
    s.find(".btn").css('transform', `translateX(${-600}px)`);
    s.find(".image").css('transform', `scale(${0.9})`);
}

function sectionAnimation(s) {
    if (s.data("animated") === undefined || s.data("animated") === false) {
        s.data("animated", true);
        var sharedEasing = "easeInOutCubic";
        anime({
            easing: sharedEasing,
            duration: 1200,
            targets: [s.find(".image .c1")[0]],
            width: ['100%', '0%'],
        })
        anime({
            easing: sharedEasing,
            duration: 1200,
            targets: [s.find(".image .c2")[0]],
            width: ['0%', '100%'],
            left: ['0%', '100%'],
        })

        anime({
            targets: [
                s.find(".title")[0],
                s.find(".divider")[0],
                s.find(".desc")[0],
                s.find(".btn")[0]
            ],
            easing: sharedEasing,
            duration: 1200,
            delay: anime.stagger(100),
            translateX: [-600, 0]
        })

        anime({
            targets: [s.find(".image")[0]],
            easing: sharedEasing,
            scale: [0.9, 1],
            duration: 1000,
            delay: 700
        })
    }
}

function atHome() {
    return window.location.pathname == "/" || window.location.pathname.includes("index")
}

function init(data) {
    removeFloatingNav();
    createFloatingNav();
    // updateMenu();
    
    var _ = $(".f-nav a").on("click", function () {
        scrollToHash($(this).attr("href").substring(1), 1000);
    });
    return true;
}

$(function () {
    //on first load
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        scrollToHash(hash, 0);
    }
    init()

    //home 
    if (atHome()) {
        sectionAnimation($("div[data-section-name]").first());
        $("div[data-section-name]").each(function () {
            prepSectionAnimation($(this))
        })
    }

    //binding
    $(window).scroll(function () {
        updateMenu();

        //updates 
        $("div[data-section-name]").each(function() {
            var sTop = $(this).offset().top - $(document).scrollTop();
            var sBottom = sTop + $(this).height();
            var sectionColor = $(this).css("color");
            if ($("#f-nav")) {
                $("#f-nav a").each(function() {
                    var midPos = $(this).offset().top - $(document).scrollTop() + $(this).height() / 2;
                    if (midPos >= sTop && midPos <= sBottom) { // if in section
                        $(this).css("background-color", sectionColor);
                    }
                })
            }
        })
        //home
        if (atHome()) {
            sectionAnimation(getShownSections().last());
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key == 'q' && !atHome()) {
            barba.go('/')
        }
    })
});


