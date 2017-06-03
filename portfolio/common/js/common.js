var $w = $( window ),
    $timer = null,
    $windowH = null,
    $ua = window.innerWidth < 580 ? 'mobile' : 'desktop',
    $button = document.getElementsByClassName('navToggle'),
    $contact = document.getElementsByClassName('nav_contact'),
    $contact = $contact[0].querySelector('a'),
    controller = new ScrollMagic.Controller();


var userAgent = window.navigator.userAgent.toLowerCase();

if (userAgent.indexOf("msie") != -1) {
  location.href = 'ie.html';
} 
window.onload = window.onresize = function(){
    $windowH = window.innerHeight;
    // console.log( $windowH )

    $timer = setTimeout( function() {
        clearTimeout( $timer );
        $ua = window.innerWidth < 580 ? 'mobile' : 'desktop';

        console.log( $ua )
    }, 600 );    
};

/**
* modenizr
*/
Modernizr.addTest( 'mobile', function( e ){
    return $ua == 'mobile';
});
Modernizr.addTest( 'usefirefox', function( e ){
    return 0 < navigator.userAgent.indexOf('Firefox');
});
Modernizr.addTest( 'useie', function( e ){
    return 0 < navigator.userAgent.indexOf('MSIE');
});

/////// IE10以下の場合転送
if( Modernizr.useie ){
    window.location = 'sorry_im_not_support_ie.html';
}



/**
* （ スマートフォン用 ）ナビゲーション開閉
*/

if( $ua == 'mobile' && $button.length ){
    $button[0].onclick = $contact.onclick = function( e ){

        e.stopPropagation();
        e.preventDefault();

        var $body = document.body;
            $status = document.body.getAttribute('data-navopen'),
            $toggleAction = new Toggle( $body );

        if( $status == 'open' ){
            $toggleAction.close();
        } else {
            $toggleAction.open();
        }
    }
}

function Toggle( $body ){
    this.body = $body;
}
Toggle.prototype.close = function (){
    this.body.classList.remove( 'navOpen');
    this.body.setAttribute( 'data-navopen', '');
}
Toggle.prototype.open = function (){
    this.body.classList.add( 'navOpen');
    this.body.setAttribute( 'data-navopen', 'open');
}


/**
* scrollMagic 
*/

var $inquirySection =  document.getElementsByClassName('inquiry')[0];
    $scene =  new ScrollMagic.Scene({
        triggerElement: $inquirySection,
        triggetHook: 'onEnter'
    })
    .setClassToggle( $inquirySection, "inview" )
    .addTo(controller);

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

    if(! $intro ) return;
    
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
                TweenMax.fromTo( $intro, 2.5,
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
                            $expire = $expire.toUTCString();              
                            // $doc.cookie = 'visit=visited;';
                            $doc.cookie = 'visit=visited; expires=' + $expire;
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



