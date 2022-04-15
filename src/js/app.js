import '../scss/app.scss';
import * as $ from 'jquery';
import 'bootstrap';
import * as moment from "moment";
import barba from '@barba/core';
import anime from 'animejs/lib/anime.es.js';
import gsap from "gsap";

const demo = () => moment("20111031", "YYYYMMDD").fromNow();

//fix scroll
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

barba.hooks.after((data) => {
    init()
});

barba.init({
    debug: true,
    preventRunning: true,
    cacheIgnore: true,
    logLevel: 'debug',
    prevent: ({ el }) => el.classList && el.classList.contains('disable-barba'),
    timeout: 5000,
    transitions: [
        {
            name: 'from-index',
            from: {
                namespace: [
                    'index'
                ]
            },
            leave: ({ next }) => {
                return leaveAnimation(next);
            },
            enter: ({ next }) => {
                return leaveHelper(next);
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
            leave: ({ data }) => {
                return returnAnimation(data);
            },
            enter(data) {
                return returnHelper(data)
            }
        },
    ]
});

function barbaScrollTimer(offset) {
    return Math.max(
        Math.abs(offset) / 300 * 1000,
        300
    )
}

async function _helperGetNextUrlPath(next) {
    return next.url.path.split('/')[1].split('.')[0];
}

function getOffset(s) {
    return $(s).position().left - $(window).width() * 0.08
}

async function leaveHelper(next) {
    window.scrollTo(0, 0);
}

async function leaveAnimation(next) {
    var hash = await _helperGetNextUrlPath(next);
    var ss = document.querySelector(`div[data-section-name=${hash}]`);
    var offset = getOffset(ss);

    var c = $(ss.querySelector(".container"));
    $(c).css({
        overflow: 'visible',
        position: 'unset',
    })
    var marginOffset = $(window).width() - (c.position().left + c.width())
    // ss.parentElement.classList.add("lockFullScreen");
    
    // var scrollOffset = $(ss).offset().top - $(document).scrollTop();
    // var scrollTime = barbaScrollTimer(scrollOffset);

    return gsap.timeline({
        duration: 1
    }).add(
        gsap.to(ss.querySelector(".container"), {
            height: "100%",
            padding: 0,
            marginRight: 0
        }), 0
    )
    .add(
        gsap.fromTo(ss.querySelector(".container .about"), {
            translateX: -offset
        }, {
            translateX: 0
        }), 0
    )
}

async function returnHelper(data) {
    var section = $(`div[data-section-name=${data.current.namespace}]`)
    var sTop = section.offset().top;
    var offset = $('.main').first().height();
    var dist = sTop - offset;
    section.data("animated", true);
    window.scrollTo(0, dist);
}

async function returnAnimation(data) {
    var s = $(".full-page-section").first();
    s.find(".container")
        .css('position', 'relative')
        .css('overflow', 'visible')
        .removeClass('postAnimate');
    var offset = $(window).width() * 0.08
    var imgOffset = $(window).width() - (s.find(".image").offset().left + s.find(".image").width())

    return gsap.timeline({
        duration: 1
    }).add(
        gsap.fromTo(s.find(".container")[0], {
            height: "100%",
            translateX: imgOffset
        }, {
            height: "70%",
            translateX: 0
        }), 0
    ).add(
        gsap.fromTo(s.find(".container .about")[0], {
            translateX: -offset - imgOffset
        }, {
            translateX: 0
        }), 0
    )
}

async function removeFloatingNav() {
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

async function createFloatingNav() {
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
    if ($(`div[data-section-name=${hash}]`).length) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(`div[data-section-name=${hash}]`).offset().top
        }, time);
    }
}

function getShownSections() {
    let triggerConst = 0.5 // trigger animations when % of section shows
    return $(`div[data-section-name]`).map(function () {
        var top = $(this).offset().top - $(document).scrollTop();
        var bottom = top + $(this).height();
        var a = Math.max(top, bottom);
        if (a >= 0 && a <= (1 + triggerConst) * $(window).height()) {
            return $(this)[0]
        }
    });
}

async function prepSectionAnimation(s) {
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

async function init(data) {
    removeFloatingNav();
    createFloatingNav();
    // updateMenu();
    
    var _ = $(".f-nav a").on("click", function () {
        scrollToHash($(this).attr("href").substring(1), 1000);
    });

    if (atHome()) {
        sectionAnimation($("div[data-section-name]").first());
        $("div[data-section-name]").each(function () {
            if (!$(this).data("animated")) {
                prepSectionAnimation($(this))
            }
        })
    }
    
    return true;
}

$(function () {
    //on first load
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        scrollToHash(hash, 0);
    }
    init();

    //binding
    $(window).scroll(function () {
        updateMenu();

        //updates 
        $("div[data-section-name]:not(.dSection), .dSection div[data-section-name] .c:first-child").each(function() {
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
            $(".back").each(function () {
                var midPos = $(this).offset().top - $(document).scrollTop() + $(this).height() / 2;
                if (midPos >= sTop && midPos <= sBottom) { // if in section
                    $(this).css("color", sectionColor);
                }
            })
        })
        //home
        if (atHome()) {
            sectionAnimation(getShownSections().last());
        }
    });
    
    $("#moreButton").on("click", function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".full-page-section-wrapper:nth-child(2)").offset().top
        }, 1000);
    })

    $(document).on('keydown', function (e) {
        if (e.key == 'q' && !atHome()) {
            barba.go('/')
        }
    })
});


