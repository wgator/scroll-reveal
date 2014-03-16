/**
 * Scroll Reveal 
 * scroll-reveal.js v1.0.0
 *
 * Heavily inspired on Mary Lou's cbpScroller.js v1.0.0
 * http://www.codrops.com (Copyright © 2014 Codrops)
 * 
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */
;( function(window) {
    
    'use strict';

    var docElem = window.document.documentElement;

    function getViewportH() {
        var client = docElem['clientHeight'],
            inner = window['innerHeight'];
        
        if( client < inner )
            return inner;
        else
            return client;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    // http://stackoverflow.com/a/5598797/989439
    function getOffset( el ) {
        var offsetTop = 0, offsetLeft = 0;
        do {
            if ( !isNaN( el.offsetTop ) ) {
                offsetTop += el.offsetTop;
            }
            if ( !isNaN( el.offsetLeft ) ) {
                offsetLeft += el.offsetLeft;
            }
        } while( el = el.offsetParent )

        return {
            top : offsetTop,
            left : offsetLeft
        }
    }

    function inViewport( el, h ) {
        var elH = el.offsetHeight,
            scrolled = scrollY(),
            viewed = scrolled + getViewportH(),
            elTop = getOffset(el).top,
            elBottom = elTop + elH,
            // if 0, the element is considered in the viewport as soon as it enters.
            // if 1, the element is considered in the viewport only when it's fully inside
            // value in percentage (1 >= h >= 0)
            h = h || 0;

        return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
    }

    function isElement(obj) {
        try {
            // Using W3 DOM2 (works for FF, Opera and Chrom)
            return obj instanceof HTMLElement;
        } catch(e) {
            // That "other" vendor
            return (typeof obj==='object') &&
                (obj.nodeType===1) && (typeof obj.style === 'object') &&
                (typeof obj.ownerDocument ==='object');
        }
    }

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function ScrollReveal(el, options) {
        if (!(this instanceof ScrollReveal)) {
            return new ScrollReveal(el, options);
        }
        if(el && !isElement(el)) {
            options = el;
            el = null;
        }
        this.el = el || document.body;
        this.options = extend(this.defaults, options);
        this._init();
    }

    ScrollReveal.prototype = {
        defaults : {
            // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
            viewportFactor : 0.2,

            reset: true,

            sectionClass: 'scroll-section',

            initClass: 'scroll-init',

            animateClass: 'scroll-animate'

        },

        _init : function() {
            if(window.Modernizr && Modernizr.touch) return;
            this.sections = Array.prototype.slice.call(this.el.querySelectorAll('.' + this.defaults.sectionClass));
            this.didScroll = false;

            var self = this;
            this.observers = {};
            this._setInitClass();

            var scrollHandler = function() {
                    if( !self.didScroll ) {
                        self.didScroll = true;
                        setTimeout( function() { self._scrollPage(); }, 60 );
                    }
                },
                resizeHandler = function() {
                    function delayed() {
                        self._scrollPage();
                        self.resizeTimeout = null;
                    }
                    if ( self.resizeTimeout ) {
                        clearTimeout( self.resizeTimeout );
                    }
                    self.resizeTimeout = setTimeout( delayed, 200 );
                };

            window.addEventListener( 'scroll', scrollHandler, false );
            window.addEventListener( 'resize', resizeHandler, false );

            return this;
        },

        _scrollPage : function() {
            var self = this;

            this.sections.forEach( function(el, i) {
                if(inViewport(el, self.options.viewportFactor)) {
                    if(classie.hasClass(el, self.defaults.initClass)) {
                        self._trigger('reveal', el);
                        classie.remove(el, self.defaults.initClass);
                        if(!classie.hasClass(el, self.defaults.animateClass)) {
                            classie.add(el, self.defaults.animateClass);
                        }
                    }

                } else if(!classie.hasClass(el, self.defaults.initClass)) {
                    self._trigger('hide', el);
                    // this add class init if it doesn't have it. This will ensure that the items initially in the viewport will also animate on scroll
                    classie.add( el, self.defaults.initClass);
                    if(self.defaults.reset) {
                        classie.remove(el, self.defaults.animateClass);
                    }
                }
            });
            this.didScroll = false;
        },

        _setInitClass: function() {
            var self = this;
            // the sections already shown...
            this.sections.forEach(function(el, i) {
                if(!inViewport(el)) {
                    classie.add(el, self.defaults.initClass);
                }
            });
        },

        add: function(els) {
            var self = this;
            Array.prototype.slice.call(els)
            .forEach(function(el) {
                if(self.sections.indexOf(el) === -1) {
                    self.sections.push(el);
                }
            });
            this._setInitClass();

            return this;
        },

        // Subscribe listeners do reveal and hide Event
        on: function(type, f) {
            if(['reveal', 'hide'].indexOf(type) === -1) return;
            (this.observers[type] || (this.observers[type] = [])) &&
            this.observers[type].push(f);
            return this;
        },

        _trigger: function(type, el) {
            if(!this.observers[type]) return;
            this.observers[type].forEach(function(f) {
                f(el);
            });
        }
    }

    // add to global namespace
    window.ScrollReveal = ScrollReveal;

} )(window);