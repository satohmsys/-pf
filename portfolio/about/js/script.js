var $sections = document.getElementsByClassName( 'section' );    
    controller = new ScrollMagic.Controller();
/**
* SPANで囲む
*/
spaning( document.getElementsByClassName('pagevisual_copy_pagename')[0] ); 




/**
* scrollMagic 
*/
// first view   
new ScrollMagic.Scene({
	triggerElement: document.getElementsByClassName('pagevisual')[0],
	triggetHook: 'onEnter'
})
.setClassToggle( document.getElementsByClassName('pagevisual')[0], "inview" )
.addTo(controller);

//section
Array.prototype.forEach.call( $sections, function( e ){
    var $section =  e ,
        $sectionClassName = '.' + $section.className.match( 'section-.*' )[0],
        $scene =  new ScrollMagic.Scene({
            triggerElement: $sectionClassName,
            triggetHook: 'onEnter'
        })
        // trigger animation by adding a css class
        .setClassToggle( $sectionClassName, "inview" )
        .on("enter", function (event) {  // シーンの状態が"DURING"に入る際に発火する
            console.log("Scene entered.",event);
        })
        .on("leave", function (event) { // シーンの状態が"DURING"から"BEFORE"か"AFTER"に移る際に発火する
            this.setClassToggle( $sectionClassName, "outview" )
        })
        .on("progress", function (event) { // シーン変化の度に呼ばれる
            console.log("Scene progress changed to " + event.progress)
        })
        .addTo(controller);
} );