import '../scss/app.scss';
import * as $ from 'jquery';
import 'bootstrap';
import barba from '@barba/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Parallax from 'parallax-js'

gsap.registerPlugin(ScrollTrigger);

//fix scroll
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

barba.hooks.after((data) => {
    init();
});

function atHome() {
    return window.location.pathname == "/" || window.location.pathname.includes("index")
}

function atBarbaNamespace() {
    return window.location.pathname == "/"
        || window.location.href.indexOf("index") > -1
        || window.location.href.indexOf("about") > -1
        || window.location.href.indexOf("projects") > -1
        || window.location.href.indexOf("contact") > -1;
}

if (screen.width > 1000 && atBarbaNamespace()) {
    barba.init({
        // debug: true,
        preventRunning: true,
        cacheIgnore: true,
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
                        'projects',
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

async function leaveHomeHelper(next) {
    window.scrollTo(0, 0);
    $(".scene").css("display", "none");
    $(".scene .stars").remove();
}

async function leaveHomeAnimation(next) {
    var hash = await _helperGetNextUrlPath(next);
    var ss = document.querySelector(`[data-section-name=${hash}]`);
    var ssBackground = ss.parentElement.querySelector(".background");
    var offset = $(ss).position().left - $(window).width() * 0.08;

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
            ease: "power1.inOut",
            translateY: -scrollOffset
        }), 0
    ).add(
        gsap.to(ss.querySelector(".container"), {
            ease: "power1.out",
            height: "100%",
            padding: 0,
            marginRight: 0,
            duration: 1
        }), 0
    )
    .add(
        gsap.fromTo(ss.querySelector(".container .about"), {
            ease: "power1.inOut",
            translateX: -offset
        }, {
            translateX: 0,
            duration: 1
        }), 0
    )
}

async function returnHomeHelper(data) {
    
    var section = $(`[data-section-name=${data.current.namespace}]`)
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

    $(".scene").css("display", "block");
    
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
        }), scrollOffset > $(window).height() ? scrollOffset / $(window).height() : 0.25
    ).add(
        gsap.fromTo(s.find(".container")[0], {
            height: "100%",
            translateX: imgOffset,
        }, {
            height: "70%",
            translateX: 0,
            duration: 1
        }), scrollOffset > $(window).height() ? scrollOffset / $(window).height() : 0.25
    ).add(
        gsap.fromTo(s.find(".container .about")[0], {
            translateX: -offset - imgOffset
        }, {
            translateX: 0,
            duration: 1
        }), scrollOffset > $(window).height() ? scrollOffset / $(window).height() : 0.25
    ).add(
        gsap.to(document.querySelector(".main"), {
            ease: "power1.inOut",
            translateY: -scrollOffset,
            duration: scrollOffset > $(window).height() ? scrollOffset / $(window).height() : 0.5
        }), 0   
    )
}




async function createStars(starsPerLayer, layers) {
    $(".scene").each(function () {
        for (let i = 0; i < layers; i++) {
            var depth = $(this).find(".scene-layer").first()?.data("depth") ?? 0.1
            var scene = $("<div>", {
                class: "scene-layer stars"
            })
            var layer = $("<div>", {
                "data-depth": depth * 0.7
            })

            for (let j = 0; j < starsPerLayer; j++) {
                layer.append($("<div>", {
                    class: "star"
                }))
            }
            scene.append(layer);
            $(this).prepend(scene);
        }
    });

    gsap.fromTo(".stars", {
        opacity: 0
    }, {
        opacity: 1,
        duration: 1,
        delay: 1
    });
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
    removeFloatingNav()
    var ul = $("<ul>").append(
        $("[data-section-name]").map(function () {
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

async function updateMenu() {
    //update hash
    var sectionTag = getShownSections().last().data("section-name");
    if (sectionTag != undefined) {
        if (sectionTag === "hello") {
            if (window.location.hash) {
                removeHash();
            }
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

async function updateColors() {
    $("[data-section-name]:not(.dSection), .dSection [data-section-name] .c:first-child").each(function () {
        const sTop = $(this).offset().top - $(document).scrollTop();
        const sBottom = sTop + $(this).height();
        const sLeft = $(this).offset().left;
        const sRight = sLeft + $(this).width();
        const sectionColor = $(this).css("color");
        if ($("#f-nav")) {
            $("#f-nav a, a.back i, nav.navbar .navbar-brand").each(function () {
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
    });
}

function scrollToHash(hash, time) {
    if (hash === undefined) { return }
    if ($(`[data-section-name=${hash}]`).length) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(`[data-section-name=${hash}]`).offset().top
        }, time);
    }
}

function getShownSections() {
    let triggerConst = 0.5 // include when % of section shows
    return $(`[data-section-name]`).map(function () {
        var top = $(this).offset().top - $(document).scrollTop();
        var bottom = top + $(this).height();
        var a = Math.max(top, bottom);
        if (a >= 0 && a <= (1 + triggerConst) * $(window).height()) {
            return $(this)[0]
        }
    });
}

async function registerSectionAnimation(s) {
    const sharedDelay = 0.5;
    var s1 = gsap.timeline({
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
            trigger: s.find(".container")[0],
            start: "top bottom",
            end: "120%, top",
            toggleActions: "restart none restart none",
        }
    });

    if (s.find(".image").length) {
        s1.fromTo(s.find(".image .c1")[0], {
            width: "100%"
        }, {
            delay: sharedDelay,
            width: "0%",
            duration: 1
        }, 0);

        s1.fromTo(s.find(".image .c2")[0], {
            width: "0%",
            left: "0%"
        }, {
            delay: sharedDelay,
            width: "100%",
            left: "100%",
            duration: 1
        }, 0);

        s1.fromTo(s.find(".image")[0], {
            scale: 0.8
        }, {
            delay: sharedDelay + 0.7,
            scale: 1,
            duration: 0.8
        }, 0);
    }

    s1.fromTo([
        // s.querySelector(".title")
        s.find(".title")[0],
        s.find(".divider")[0],
        s.find(".desc")[0],
        s.find(".btn")[0]
    ], {
        translateX: -600
    }, {
        delay: sharedDelay,
        translateX: 0,
        stagger: 0.1,
        duration: 1
    }, 0);
}

async function init(data) {
    createFloatingNav();
    // updateMenu();
    
    $(".f-nav a").on("click", function () {
        scrollToHash($(this).attr("href").substring(1), 2000);
    });

    if (atHome()) {
        // createStars(100, 3);
        // parallax effect
        // $(".scene-layer").each(function () {
        //     var layer = new Parallax($(this).get(0), {
        //         // invertX: true,
        //         // invertY: true,
        //         // calibrateX: true,
        //         // calibrateY: true,
        //         // scalarX: 10.0,
        //         // scalarY: 10.0,
        //         relativeInput: false
        //     });
        //     layer.origin(0, 0);
        // });

        $(".full-page-section-wrapper").last().each(function() {
            $(this).addClass("no-scroll-padding");
        });
        
        //play animation for hash or current section
        const hash = window.location.hash ? window.location.hash.substring(1) : "hello";
        var otherUnregistered = true; 
        var ignore = true;
        setTimeout(function() {
            $(`[data-section-name=${hash}`).each(function () {
                var a = ScrollTrigger.create({
                    trigger: $(this)[0],
                    start: "top bottom",
                    end: "bottom, top",
                    onLeave: () => {
                        if (ignore) { 
                            ignore = false;
                        }
                        else {
                            if (otherUnregistered) {
                                registerSectionAnimation($(this));
                                otherUnregistered = false;
                            }
                        }
                    },
                    onLeaveBack: () => {
                        console.log("R2")
                        if (otherUnregistered) {
                            registerSectionAnimation($(this));
                            otherUnregistered = false;
                        }
                    }
                });
            });
        }, 100)
        

        $(`[data-section-name]:not([data-section-name=${hash}])`).each(function () {
            console.log($(this).attr("data-section-name"))
            registerSectionAnimation($(this));
        });      

        //button
        $("#moreButton").on("click", function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#moreDestination").offset().top
            }, 1000);
        });
    }
    else {
        //not at home
    }

    

    $(".project-wrapper").each(function () {
        let pt = gsap.timeline({
            ease: "power1.out",
            scrollTrigger: {
                trigger: $(this)[0],
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
        })

        
        pt.fromTo($(this).find(".subtitle"), {
            translateY: "3rem",
            opacity: 0
        }, {
            translateY: 0,
            opacity: 1
        }, 0)
        
        pt.fromTo($(this).find(".details-label"), {
            translateY: "1.1rem"
        }, {
            ease: "none",
            duration: 0.1,
            translateY: 0,
            opacity: 1
        }, ">")
        pt.fromTo($(this).find(".detail"), {
            translateY: "1.1rem"
        }, {
            ease: "none",
            duration: 0.1,
            stagger: 0.1,
            translateY: 0,
            opacity: 1
        }, ">-0.1")
        pt.to($(this).find(".detail"), {
            ease: "none",
            delay: 0.1,
            duration: 0.1,
            stagger: 0.1,
            translateY: "-1.1rem",
            opacity: 0
        }, "<")
        pt.to($(this).find(".details-label"), {
            ease: "none",
            duration: 0.1,
            translateY: "-1.1rem",
            opacity: 0
        }, ">-0.1")
        
        pt.fromTo($(this).find(".header"), {
            top: "50%",
        }, {
            top: "3rem",
            transform: "none"
        }, ">")
        pt.to($(this).find(".container"), {
            scale: 1
        }, "<0.05")
        
        //animation space
        pt.to($(this).find(".container"), {
            scale: 1
        }, ">")
        // .to($(this).find(".container"), {
        //     scale: 1
        // }, ">")

    })
}

$(function () {
    if (window.location.hash) {
        $(`[data-section-name=${window.location.hash.replace("#", "")}]`).first().each(function () {
            window.scrollTo(0, $(this).offset().top);
        })
    }
    
    //on first load
    init();

    //binding
    var last = Date.now();
    var dt = 100;
    $(window).scroll(function () {
        if (last + dt <= Date.now()) {
            last = Date.now();

            //updates 
            updateMenu();
            updateColors();
        }
    });
});

