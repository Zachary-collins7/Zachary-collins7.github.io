import '../scss/app.scss';
// import * as popper from "popper";
import * as $ from 'jquery';
import 'jquery-scrollify';
import 'bootstrap';
import * as moment from "moment";
import barba from '@barba/core';

/* Your JS Code goes here */

/* Demo JS */
// import './demo.js';

const demo = () => moment("20111031", "YYYYMMDD").fromNow();



barba.init({
    views: [{
        namespace: "index"
    }, {
        namespace: "contact"
    }],
    transitions: [{
        name: "opacity-transition",
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0
            });
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0
            });
        }
    }]
});

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
    })
        .append(ul)
        .appendTo('body');
}

function onScrollSectionChange() {
    var sectionTag = $.scrollify.current().attr("data-section-name")//window.location.hash.slice(1);
    $(".f-nav ul li a").each(function() {
        $(this).removeClass("active");
    })
    $(`.f-nav ul li a[href$=${sectionTag}]`).addClass("active")
}

$(function () {
    createFloatingNav();
    $.scrollify({
        section: ".full-page-section",
        easing: "easeOutExpo",
        scrollSpeed: 1100,
        offset: 0,
        scrollbars: false,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        updateHash: true,
        touchScroll: true,
        before: function () { onScrollSectionChange() },
        after: function () { },
        afterResize: function () { },
        afterRender: function () { onScrollSectionChange() }
    });
});


