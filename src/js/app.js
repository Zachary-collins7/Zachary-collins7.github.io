import '../scss/app.scss';
import * as $ from 'jquery';
import 'bootstrap';
import * as moment from "moment";
import barba from '@barba/core';
import anime from 'animejs/lib/anime.es.js';
import { current } from 'jquery-scrollify';

const demo = () => moment("20111031", "YYYYMMDD").fromNow();

//fix scroll
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

barba.hooks.after((data) => {
    init(data)
});

barba.hooks.leave((data) => {
    removeFloatingNav()
});

function barbaScrollTimer(s) {
    return Math.max(
        Math.abs(s.offset().top - $(document).scrollTop()) / 300 * 1000,
        200
    )
}

barba.init({
    timeout: 5000,
    cacheIgnore: true,
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
            beforeLeave(data) {
                var s = $(data.trigger).parentsUntil(".full-page-section").parent();
                return $([document.documentElement, document.body]).animate({
                    scrollTop: s.offset().top
                }, barbaScrollTimer(s)).promise();
            },
            leave(data) {
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
            beforeLeave(data) {
                var s = $(".full-page-section").first();
                return $([document.documentElement, document.body]).animate({
                    scrollTop: s.offset().top
                }, barbaScrollTimer(s)).promise();
            },
            leave(data) {
                var s = $(".full-page-section").first();

                var tl = anime.timeline({
                    easing: "easeInOutCubic",
                    duration: 1000,
                })

                s.find(".container")
                    .css('position','relative'
                    ).css('overflow', 'hidden')
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

//     height: 100 %;
//     width: 100 %;
//     margin- right: 0;
// padding: 0;
// position: unset;
});

function removeFloatingNav() {
    $("#f-nav").first().attr('id', 'f-nav-old');
    anime({
        targets: '#f-nav-old',
        opacity: 0,
        duration: 300,
        delay: 400,
        complete: function () {
            $("#f-nav-old").remove();
        }
    })
}

function createFloatingNav() {
    var ul = $("<ul>").append(
        $(".full-page-section").map(function () {
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
    var sectionTag = getShownSections().last().data("section-name")
    window.location.hash = sectionTag
    $(".f-nav ul li a").each(function() {
        $(this).removeClass("active");
    });
    $(`.f-nav ul li a[href$=${sectionTag}]`).addClass("active")
}

function scrollToHash(hash, time) {
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
    console.log(s.data("animated"));
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

//called on every page load
function init(data) {
    if (data) {
        console.log(data.current.namespace);
    }
    createFloatingNav();
    updateMenu();
    $(".f-nav a").on("click", function () {
        scrollToHash($(this).attr("href").substring(1), 1000);
    })
}

$(function () {
    //on first load
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        scrollToHash(hash, 0);
    }
    init()

    //home 
    if (window.location.pathname == "/" || window.location.pathname.includes("index")) {
        sectionAnimation($("div[data-section-name]").first());
        $("div[data-section-name]").each(function () {
            prepSectionAnimation($(this))
        })
    }

    //binding
    $(window).scroll(function () {
        updateMenu();

        //home
        if (window.location.pathname == "/" || window.location.pathname.includes("index")) {
            sectionAnimation(getShownSections().last());
        }
    });
});


