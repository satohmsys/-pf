////////////////////////////////

//child page

////////////////////////////////

var $pageVisualHeight = document.getElementsByClassName('pagevisual')[0].clientHeight,
    $body = document.body
    $timer = null ;

/**
* 下層ページでメインヴィジュアルをスクロールで超過したときに切り替えクラス着脱
*/
window.onresize = window.onscroll = function( e ){

    clearTimeout( $timer );
    
    $timer = setTimeout( function(){
        var $pageVisualHeight = document.getElementsByClassName('pagevisual')[0].clientHeight,
            $scrollVal = window.pageYOffset;

        if( $pageVisualHeight < $scrollVal ){
            $body.classList.add( 'scrollOverVisual' )
        } else {
            $body.classList.remove( 'scrollOverVisual' )            
        }

    }, 500 )

}



if( window.DeviceOrientationEvent ){

    if( $ua == 'mobile'){ 
        var $pageVisual = document.getElementsByClassName('pagevisual_img'),
            $pageVisual = $pageVisual[0];

        if( $pageVisual ){
            // beta X軸の傾き
            // gamma　Y軸の傾き
            window.addEventListener( 'deviceorientation', function( e ){
                var x = Math.round( event.gamma || 0 ) * 0.25,
                    y = Math.round( event.beta || 0 ) * 0.25,
                    z = Math.round( event.alpha || 0 ) * 0.4;

                    $pageVisual.setAttribute('style', 'transform: translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px )'  );

            }, false );
        }
    }
}