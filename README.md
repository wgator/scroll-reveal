##ScrollReveal

scroll-reveal.js just adds a observer layer over the awesome [cbpScroller.js](http://tympanus.net/codrops/2013/07/18/on-scroll-effect-layout/) by [Mary Lou](https://twitter.com/crnacura) (Copyright © 2014 [Codrops](http://tympanus.net/codrops/)), so you can listen do `reveal` and `hide` events, and handle the animations yourself (rather than relying on HTML class changes and CSS animations).

It also gives some options, like whether or not reveal events must recur, or the classNames used to change the elements state.

```javascript
// Your can start the constructor with a new object
var scoller = new ScrollReveal(wrapperEl, options);

// Or directly call the class, jQuery style
ScrollReveal({
    /* options */    
}).on('reveal', function(el) {
    // Do something with revealed elements
}).on('hide', function(el) {
    // Do something with the hidden elements
});
```

###Options

| Param         | Default&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     | Description  |
|:--------------|:-------------|:-------------|
| **viewportFactor:**| `.2` | Defines how much of the appearing item has to be visible in order to trigger the animation
| **reset:**        | `true` | Set false to ensure that the animations occour only once |
| **sectionClass:** | `'scroll-section'` | Class scaned to mark scrollable elements | 
| **initClass:**    | `'scroll-init'`    | Class set on hidden elements |
| **animateClass:** | `'scroll-animate'` | Class set on revealed elements |


License
-------

The MIT License (MIT)

Copyright © 2014 [Rafael Correia](https://github.com/wgator)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.