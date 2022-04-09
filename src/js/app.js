import '../scss/app.scss';
import * as $ from 'jquery';
import 'jquery-scrollify';
import 'bootstrap';
import * as moment from "moment";
import barba from '@barba/core';
import anime from 'animejs/lib/anime.es.js';

/* Your JS Code goes here */

/* Demo JS */
// import './demo.js';

const demo = () => moment("20111031", "YYYYMMDD").fromNow();

barba.hooks.enter((data) => {
    window.scrollTo(0, 0);
    location.reload();
    // $.scrollify.update();
});

barba.init({
    timeout: 5000,
    // views: [{
    //     namespace: "index",
    //     leave(data) {

    //     }
    // }, {
    //     namespace: "about"
    // }],
    transitions: [{
        name: 'from-index',
        from: {
            namespace: [
                'index'
            ]
        },
        leave(data) {
            var tl = anime.timeline({
                duration: 800,
            })

            $.scrollify.current().find(".container").css('position', 'unset').css('overflow', 'visible');
            var offset = $.scrollify.current().find(".container .about").position().left - $(window).width() * 0.08
            console.log(offset);
            tl.add({
                targets: [$.scrollify.current().find(".container")[0]],
                height: ['70%', '100%'],
                padding: 0,
                marginRight: 0
            }, 0)
            .add({
                targets: [$.scrollify.current().find(".container .about")[0]],
                translateX: [-offset, 0]
            }, 0);
            return tl.finished;
        },
        afterLeave(data){
            $.scrollify.destroy();
        },
        enter(data) {
 
        }
    }]

//     height: 100 %;
//     width: 100 %;
//     margin- right: 0;
// padding: 0;
// position: unset;
});
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
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
    }).append(ul).appendTo('div[data-barba=""]');
}

function onMenuClick(sectionTag) {
    $.scrollify.move(`#${sectionTag}`);
}

function updateMenu() {
    var sectionTag = $.scrollify.current().attr("data-section-name")//window.location.hash.slice(1);
    $(".f-nav ul li a").each(function() {
        $(this).removeClass("active");
    })
    $(`.f-nav ul li a[href$=${sectionTag}]`).addClass("active")
}

function sectionBefore(index, sections) {
    updateMenu();
    var s = sections[index];
    var sharedEasing = "easeInOutCubic";
    if (window.location.pathname == "/" || window.location.pathname.includes("index")) {
        anime({
            easing: sharedEasing,
            duration: 1200,
            targets: [s.find(".image .c1")[0]],
            width: ['100%', '0%'],
        }, 300)
        anime({
            easing: sharedEasing,
            duration: 1200,
            targets: [s.find(".image .c2")[0]],
            width: ['0%', '100%'],
            left: ['0%', '100%'],
        }, 300)

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
            translateX: [-300, 0]
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

function sectionAfter(index, sections) {

}

$(function () {    
    if (window.location.pathname == "/" || window.location.pathname.includes("index")) {
        createFloatingNav();
        $(".f-nav a").on("click", function () {
            onMenuClick($(this).attr("href").substring(1));
        })

        $.scrollify({
            section: ".full-page-section",
            // interstitialSection: ".scroll-section",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: false,
            // standardScrollElements: ".scroll-section",
            setHeights: true,
            overflowScroll: true,
            updateHash: true,
            touchScroll: true,
            before: sectionBefore,
            after: sectionAfter,
            afterResize: function () { },
            afterRender: function () {
                sectionBefore(0, $(".full-page-section").map(function () { return $(this) }))
            }
        });
    }
});
function test() {
    console.log("a");
}

export default test;