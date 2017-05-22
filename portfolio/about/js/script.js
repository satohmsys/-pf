var controller = new ScrollMagic.Controller();    

/**
* SPANで囲む
*/
spaning( document.getElementsByClassName('pagevisual_copy_pagename')[0] ); 




/**
* scrollMagic 
*/

// //mainvisualのスクロールアイコン消す
// (function(){
//     var scene = new ScrollMagic.Scene({
//         triggerElement: '.icon-mouse',
//         duration: 300
//     })
//     .setTween(
//         TweenMax.to( '.icon-mouse', 1, {
//             opacity: 0
//         }) )
//     .addTo( controller );
// })();
    
$scene =  new ScrollMagic.Scene({
	triggerElement: document.getElementsByClassName('pagevisual')[0],
	triggetHook: 'onEnter'
})
.setClassToggle( document.getElementsByClassName('pagevisual')[0], "inview" )
.addTo(controller);