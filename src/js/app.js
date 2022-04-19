import '../scss/app.scss';
import * as $ from 'jquery';
import 'bootstrap';
import * as moment from "moment";
import barba from '@barba/core';
import gsap from "gsap";
import Parallax from 'parallax-js'
import { FlipBook } from "./flipbook";

const demo = () => moment("20111031", "YYYYMMDD").fromNow();

var MAX_SCROLL_HEIGHT = 0;

//fix scroll
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

barba.hooks.after((data) => {
    init();
});

function atBarbaNamespace() {
    return window.location.pathname == "/"
        || window.location.href.indexOf("index") > -1
        || window.location.href.indexOf("about") > -1
        || window.location.href.indexOf("contact") > -1;
}

if (screen.width > 1000 && atBarbaNamespace()) {
    barba.init({
        // debug: true,
        preventRunning: true,
        // cacheIgnore: true,
        // logLevel: 'debug',
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
                    return leaveHomeAnimation(next);
                },
                enter: ({ next }) => {
                    return leaveHomeHelper(next);
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
                    return returnHomeAnimation(data);
                },
                enter(data) {
                    return returnHomeHelper(data)
                }
            },
        ]
    });
}

async function _helperGetNextUrlPath(next) {
    return next.url.path.split('/')[1].split('.')[0];
}

function getOffset(s) {
    return $(s).position().left - $(window).width() * 0.08
}

async function leaveHomeHelper(next) {
    window.scrollTo(0, 0);
}

async function leaveHomeAnimation(next) {
    var hash = await _helperGetNextUrlPath(next);
    var ss = document.querySelector(`div[data-section-name=${hash}]`);
    var ssBackground = ss.parentElement.querySelector(".background");
    var offset = getOffset(ss);

    var c = $(ss.querySelector(".container"));
    $(c).css({
        overflow: 'visible',
        position: 'unset',
    })
    // var marginOffset = $(window).width() - (c.position().left + c.width())
    
    var scrollOffset = $(ss).offset().top - $(document).scrollTop();

    return gsap.timeline({
        duration: 2
    }).add(
        gsap.to(ssBackground, {
            ease: "power1.out",
            width: "100%",
            duration: 1
        }), 0
    ).add(
        gsap.to(document.querySelector(".main"), {
            translateY: -scrollOffset,
            ease: "power1.inOut",
        }), 0
    ).add(
        gsap.to(ss.querySelector(".container"), {
            height: "100%",
            padding: 0,
            marginRight: 0,
            duration: 1
        }), 0
    )
    .add(
        gsap.fromTo(ss.querySelector(".container .about"), {
            translateX: -offset
        }, {
            translateX: 0,
            duration: 1
        }), 0
    )
}

async function returnHomeHelper(data) {
    
    var section = $(`div[data-section-name=${data.current.namespace}]`)
    section.first().each(function() {
        var sTop = $(this).offset().top;
        var offset = $('.main').first().height();
        var dist = sTop - offset;
        $(this).data("animated", true);
        window.scrollTo(0, dist);
    });
}

async function returnHomeAnimation(data) {

    var s = $(".full-page-section").first();
    var ssBackground = s[0].parentElement.querySelector(".background");
    s.find(".container")
        .css({
            position: "relative",
            overflow: "visible"
        })
        .removeClass("postAnimate");

    $("#scene").css("display", "block");
    
    var offset = $(window).width() * 0.08
    var imgOffset = $(window).width() - (s.find(".image").offset().left + s.find(".image").width())


    var scrollOffset = s.offset().top - $(document).scrollTop();

    return gsap.timeline({
        duration: 2
    }).add(
        gsap.to(ssBackground, {
            ease: "power1.out",
            width: "0%",
            duration: 1
        }), 0
    ).add(
        gsap.fromTo(s.find(".container")[0], {
            height: "100%",
            translateX: imgOffset,
        }, {
            height: "70%",
            translateX: 0,
            duration: 1
        }), 0
    ).add(
        gsap.fromTo(s.find(".container .about")[0], {
            translateX: -offset - imgOffset
        }, {
            translateX: 0,
            duration: 1
        }), 0
    ).add(
        gsap.to(document.querySelector(".main"), {
            ease: "power1.inOut",
            translateY: -scrollOffset
        }), 0   
    )
}

async function removeFloatingNav() {
    if ($("#f-nav").length) {
        $("#f-nav").first().attr('id', 'f-nav-old');
        gsap.to("#f-nav-old", {
            ease: "sine.out",
            opacity: 0,
            duration: 0.5,
            onComplete: function() {
                $("#f-nav-old").remove();
            }
        });
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
        class: "f-nav scroll",
        css: {
            "opacity" : 0
        }
    }).append(ul).appendTo("body");

    gsap.fromTo("#f-nav", {
        ease: "sine.out",
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5
    });
}

function removeHash() {
    history.pushState("", document.title, window.location.pathname
        + window.location.search);
}

function updateMenu() {
    //update hash
    var sectionTag = getShownSections().last().data("section-name");
    if (sectionTag != undefined) {
        if (sectionTag === "hello" && window.location.hash) {
            removeHash();
        }
        else {
            window.location.hash = sectionTag;
        }
    }
    
    $("#f-nav ul li a").each(function() {
        $(this).removeClass("active");
    });

    $(`#f-nav ul li a[href$=${sectionTag}]`).addClass("active");

    if (sectionTag != "hello") {
        $("#f-nav").removeClass("scroll");
    }
    else {
        $("#f-nav").addClass("scroll");
    }
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
        
        if (s.find(".image").length) {
            gsap.to(s.find(".image .c1")[0], {
                width: "0%",
                duration: 1
            })

            gsap.to(s.find(".image .c2")[0], {
                width: "100%",
                left: "100%",
                duration: 1
            })

            gsap.to(s.find(".image")[0], {
                scale: 1,
                delay: 0.7,
                duration: 0.8
            })
        }

        gsap.to([
            s.find(".title")[0],
            s.find(".divider")[0],
            s.find(".desc")[0],
            s.find(".btn")[0]
        ], {
            translateX: 0,
            stagger: 0.1,
            duration: 1
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
    
    $(".f-nav a").on("click", function () {
        scrollToHash($(this).attr("href").substring(1), 1000);
    });

    if (atHome()) {
        
        // $("#scene").each(function() {
        //     const starsPerLayer = 200;
        //     const layers = 3;

        //     for (let i = 0; i < layers; i++) {
        //         var depth = $(this).find(".scene-layer").first()?.data("depth") ?? 0.1
        //         var scene = $("<div>", {
        //             class: "scene-layer stars"
        //         })
        //         var layer = $("<div>", {
        //             "data-depth": depth * 0.7
        //         })

        //         for (let j = 0; j < starsPerLayer; j++) {
        //             layer.append($("<div>", {
        //                 class: "star"
        //             }))
        //         }
        //         scene.append(layer);
        //         $(this).prepend(scene);
        //     }  
        // });

        // gsap.fromTo(".stars", {
        //     opacity: 0
        // }, {
        //     opacity: 1,
        //     duration: 1,
        //     delay: 1
        // });
        //parallax effect
        $(".scene-layer").each(function () {
            var layer = new Parallax($(this).get(0), {
                // invertX: true,
                // invertY: true,
                // calibrateX: true,
                // calibrateY: true,
                // scalarX: 10.0,
                // scalarY: 10.0,
                relativeInput: false
            });
            layer.origin(0, 0);
        });

        
        //play animation for hash or current section
        const hash = window.location.hash.substring(1);
        if (window.location.hash && $(`div[data-section-name=${hash}]`).length) {
            $(`div[data-section-name=${hash}]`).each(function () {
                sectionAnimation($(this));
            })
        }
        else {
            sectionAnimation($("div[data-section-name]").first());
        }

        //prep all other sections
        $("div[data-section-name]").each(function () {
            if (!$(this).data("animated")) {
                prepSectionAnimation($(this));
            }
        });

        //button
        $("#moreButton").on("click", function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#moreDestination").offset().top
            }, 1000);
        });

        $(function () {
            $(".flip_book").each(function () {
                new FlipBook($(this));
            })
        })
    }
}

$(function () {
    if (window.location.hash) {
        $(`div[data-section-name=${window.location.hash.replace("#", "")}]`).first().each(function () {
            window.scrollTo(0, $(this).offset().top);
        })
    }
    
    //on first load
    init();

    //binding
    $(window).scroll(function () {
        updateMenu();

        //updates 

        //update color
        $("div[data-section-name]:not(.dSection), .dSection div[data-section-name] .c:first-child").each(function() {
            const sTop = $(this).offset().top - $(document).scrollTop();
            const sBottom = sTop + $(this).height();
            const sLeft = $(this).offset().left;
            const sRight = sLeft + $(this).width();
            const sectionColor = $(this).css("color");
            if ($("#f-nav")) {
                $("#f-nav a, a.back i, nav.navbar .navbar-brand").each(function() {
                    const midYPos = $(this).offset().top - $(document).scrollTop() + $(this).height() / 2;
                    const midXPos = $(this).offset().left + $(this).width() / 2;
                    if (midYPos >= sTop && midYPos <= sBottom && midXPos >= sLeft && midXPos <= sRight) { // if in section
                        if ($(this).is("i, span")) {
                            $(this).css("color", sectionColor);
                        }
                        else {
                            $(this).css("background-color", sectionColor);
                        }
                    }
                })
            }
        })
        //home
        if (atHome()) {
            sectionAnimation(getShownSections().last());
        }
    });
});

