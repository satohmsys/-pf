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
		// trigger animation by adding a css class
		.setClassToggle( document.getElementsByClassName('pagevisual')[0], "inview" )
        .on("enter", function (event) {  // シーンの状態が"DURING"に入る際に発火する
        })
        .on("leave", function (event) { // シーンの状態が"DURING"から"BEFORE"か"AFTER"に移る際に発火する
        })
        .on("progress", function (event) { // シーン変化の度に呼ばれる
        })
        // .addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
		.addTo(controller);