var $mainvisual = $('.mainvisual'),
    $mainvisual_wrap = $mainvisual.find( '.wrap' ),
    // $mainvisual_myImg = $mainvisual.find( '.mainvisual_img' ),
    $timer = null,
	$sections = document.getElementsByClassName( 'section' ),
	controller = new ScrollMagic.Controller();    

$w.on( 'resize', function(){

    $timer = setTimeout( function() {
        clearTimeout( $timer );

        var $windowHeight = $w.height();
        $mainvisual_wrap.height( $windowHeight );


    }, 300 );

} );



/**
* SPANで囲む
*/

Array.prototype.forEach.call( $sections, function( e ){
	var $sectionIndex = e.querySelector( '.section_index' );

	spaning( $sectionIndex ); 
});



/**
* scrollMagic 
*/

//mainvisualのスクロールアイコン消す
(function(){
    var scene = new ScrollMagic.Scene({
        triggerElement: '.icon-mouse',
        duration: 300
    })
    .setTween(
        TweenMax.to( '.icon-mouse', 1, {
            opacity: 0
        }) )
    .addTo( controller );
})();

Array.prototype.forEach.call( $sections, function( e ){
	console.log( e, e.className );
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
            console.log("Scene left.", event);
        })
        .on("progress", function (event) { // シーン変化の度に呼ばれる
            console.log("Scene progress changed to " + event.progress)
        })
        // .addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
		.addTo(controller);
} );