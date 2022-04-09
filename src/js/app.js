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
        namespace: 'index'
    }, {
        namespace: 'contact'
    }],
    transitions: [{
        name: 'opacity-transition',
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

$(function () {
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
        before: function () { },
        after: function () { },
        afterResize: function () { },
        afterRender: function () { }
    });

    // floating Nav
    let fNav = $('<div>', {
        id: 'f-nav',
        class: 'nav',
    }).appendTo('body');

    $('.section').each(function() {
        
    })
});

