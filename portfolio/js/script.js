var $mainvisual = $('.mainvisual'),
    $mainvisual_wrap = $mainvisual.find( '.wrap' ),
    // $mainvisual_myImg = $mainvisual.find( '.mainvisual_img' ),
    $timer = null;

$w.on( 'resize', function(){

    $timer = setTimeout( function() {
        clearTimeout( $timer );

        var $windowHeight = $w.height();
        $mainvisual_wrap.height( $windowHeight );


    }, 300 );

} );