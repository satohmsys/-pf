var $timelineEvents = document.getElementsByClassName( 'timeline_event' );    
    controller = new ScrollMagic.Controller(),
    $line = document.getElementsByClassName('timeline_line')[0],
    $heightOfLine = $line.clientHeight;

    console.log( $heightOfLine )
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
Array.prototype.forEach.call( $timelineEvents, function( e ){

    var $section =  e ,
        $sectionClassName = '.' + $section.className.match( 'tl[0-9].*' )[0],
        $scene =  new ScrollMagic.Scene({
            triggerElement: $sectionClassName,
            triggetHook: 'onEnter'
        })
        // trigger animation by adding a css class
        .setClassToggle( $sectionClassName, "inview" )
        .on("enter", function (event) {  // シーンの状態が"DURING"に入る際に発火する
            console.log("Scene entered.",event);
            // console.log( this );
            // var barheight = document.getElementsByClassName( $section.className.match( 'tl[0-9].*' ) )[0].offsetHeight;
            // $line.setAttribute('style', 'height:' + $heightOfLine + barheight + 'px');
            // console.log( document.getElementsByClassName( $section.className.match( 'tl[0-9].*' ) )[0].style )
        })
        .on("leave", function (event) { // シーンの状態が"DURING"から"BEFORE"か"AFTER"に移る際に発火する
            this.setClassToggle( $sectionClassName, "outview" )
        })
        .on("progress", function (event) { // シーン変化の度に呼ばれる
            console.log("Scene progress changed to " + event.progress)
        })
        .addTo(controller);
} );