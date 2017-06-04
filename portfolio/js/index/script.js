var $timer = null,
	$sections = document.getElementsByClassName( 'section' ),
	controller = new ScrollMagic.Controller();    


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

visualMover( 'mainvisual', '.mainvisual_img' );

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
	var $section =  e ,
		$sectionClassName = '.' + $section.className.match( 'section-.*' )[0],
		$scene =  new ScrollMagic.Scene({
			triggerElement: $sectionClassName,
			triggetHook: 'onEnter'
		})
		// trigger animation by adding a css class
		.setClassToggle( $sectionClassName, "inview" )
        .on("enter", function (event) {  // シーンの状態が"DURING"に入る際に発火する
            // console.log("Scene entered.",event);
            visualMover( $sectionClassName.substr( 1 ), '.section_bg' );
        })
        .on("leave", function (event) { // シーンの状態が"DURING"から"BEFORE"か"AFTER"に移る際に発火する
            // console.log("Scene left.", event);
        })
        .on("progress", function (event) { // シーン変化の度に呼ばれる
            // console.log("Scene progress changed to " + event.progress)
        })
        // .addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
		.addTo(controller);
} );



/**
* （mobile）スマホの傾きで画像を動かす
*/

function visualMover( $areaClass, $targetClassName, xmove, ymove, zmove ){
    if( window.DeviceOrientationEvent ){
        if( $ua == 'mobile'){ 
            var $target = document.getElementsByClassName( $areaClass ),
                $target = $target[0].querySelector( $targetClassName ),
                xmove = xmove || 0.25,
                ymove = ymove || 0.25,
                zmove = zmove || 0.4;

            if( $target ){
                // beta X軸の傾き
                // gamma　Y軸の傾き
                window.addEventListener( 'deviceorientation', function( e ){
                    var x = Math.round( event.gamma || 0 ) * xmove,
                        y = Math.round( event.beta || 0 ) * ymove,
                        z = Math.round( event.alpha || 0 ) * zmove;

                        $target.setAttribute('style', 'will-change:transform; transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px )'  );

                }, false );
            }
        }
    }
}
