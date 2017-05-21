var $w = $( window );

var $button = document.getElementsByClassName('navToggle');

/**
* modenizr
*/
Modernizr.addTest( 'usefirefox', function( e ){
    console.log( e );
    return 0 < navigator.userAgent.indexOf('Firefox');
});



/**
* （ スマートフォン用 ）ナビゲーション開閉
*/

$button[0].addEventListener( 'click', function( e ){
    e.stopPropagation();
    e.preventDefault();

    var $body = document.body;
        $status = document.body.getAttribute('data-navopen');

    if( $status == 'open' ){
        $body.classList.remove( 'navOpen');
        $body.setAttribute( 'data-navopen', '');
    } else {
        $body.classList.add( 'navOpen');
        $body.setAttribute( 'data-navopen', 'open');
    }
} );




$(function(){
    $('a[href^="#"]').click(function(){
        var speed = 300;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});



// /**
// * scrollDepth
// */
// $(function() {
//     $.scrollDepth();
// });

/***
*　back to top スクロール
*/

$( function(){

    var $timer = null;
    var $icon = $( '.backToTop' ); //icon

     $(window).on( 'scroll', function(){

         if( $timer == null ){

             $timer = setTimeout( function(){
                    
                clearTimeout( $timer );
                
                 var $visible = $icon.is( ':visible' );
                 var $scrollVal = $( window ).scrollTop(); //スクロール値
                 var $under = $( 'body' ).height() - ( $scrollVal + $( window ).height() ); //ページの残りの長さ

                 if( $scrollVal > 500 && 300 > $under ){
                     if(! $visible ){
                         $icon.fadeIn( 'slow' );
                     }
                 } else {
                     $icon.fadeOut( 'slow' );
                 }

                 $timer = null;

             }, 1000 );
         }

     } );


     $( '.backToTop' ).on( 'click', function(){
         var $icon = $( this );
         $icon.addClass( 'moving' );
         $( 'html,body' ).animate({ scrollTop: 0 }, 'slow', function(){
             $icon.removeClass( 'moving' );
         } );
     } );

});



/**
* テキスト一文字ずつ区切ってspanで囲む
* @param eml { obj } html element テキストノードの親
*/
function spaning( elm ){ 
    var text = elm.innerText, //innerTextは改行コードも取る, textContentはタブも取る
        l = text.length,
        newText = '',
        textArg = new Array();

    for( var $i=0; $i<l; $i++ ){
        moji = text.substr( $i, 1 );

        if( moji !== ' ' && typeof moji !== undefined && typeof moji !== null && 
            moji !== "\r\n" && moji !=="\r" && moji !== "\n"){
            // textArg[$i] = text.substr( $i, 1 ); 
            newText +=  '<span>' + moji + '</span>';
        }        
    }
    elm.innerHTML = newText;
}



/**
* cookie判断でイントロを出すかどうか。出す場合はアニメ後Removechild
*/

(function(){
    var $doc = document,
        $body = $doc.body;
        $intro = document.getElementById('myIntroduction');
    
    ///////// 初回訪問（cookieなし
    if( ! $doc.cookie.match('visited') ){

        $body.classList.add( 'hello' );

         setTimeout( function(){
            $body.classList.add( 'letsTalk' );
            TweenMax.to( $intro, 2, {
                backGroundColor: '#fafafa'
            });
         }, 800 );

        $doc.addEventListener( 'DOMContentLoaded', function(){

             $doc.getElementById('just').addEventListener('transitionend', function(){
                TweenMax.fromTo( $intro, 4,
                    {
                        opacity: 1,
                        filter: 'blur(0)'
                    },
                    {
                         opacity: 0,
                         filter: 'blur(200px)',

                         delay: 1,

                         onComplete:function( e ){
                            $body.classList.remove('hello','helloAfter','letsTalk')
                            $body.classList.add( 'introEnd' );
                            $intro.parentNode.removeChild( $intro );
                            
                            $expire = new Date();
                            $expire.setTime( $expire.getTime() + 1000 * 3600 * 48 );                            
                            $doc.cookie = 'visit=visited; expires=' . $expire.toUTCString() ;
                            console.log( document.cookie )
                        }
                    }

                );               
             });
        });
    } else {
        $body.classList.add( 'noHello', 'introEnd' );

        if( $intro ){
            $intro.parentNode.removeChild( $intro );
        }
    }

})();



