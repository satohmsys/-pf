var $timer = null,
    $windowH = null,
    $ua = window.innerWidth < 580 ? 'mobile' : 'desktop',
    $button = document.getElementsByClassName('navToggle'),
    $contact = document.getElementsByClassName('nav_contact'),
    $contact = $contact[0].querySelector('a'),
    controller = new ScrollMagic.Controller();

var userAgent = window.navigator.userAgent.toLowerCase();

if (userAgent.indexOf("msie") != -1) {
  location.href = 'wp-content/themes/satohmsysPortfolio17/ie.html';
} 
window.onload = window.onresize = function(){
    // $windowH = window.innerHeight;
    // console.log( $windowH )

    $timer = setTimeout( function() {
        clearTimeout( $timer );
        $ua = window.innerWidth < 580 ? 'mobile' : 'desktop';
    }, 600 );    
};



/**
* cookie判断でイントロを出すかどうか。出す場合はアニメ後Removechild
* 出さない場合はローディングアニメ
*/

(function(){
    var $doc = document,
        $body = $doc.body;
        $intro = document.getElementById('myIntroduction'),
        $loadingAnim = document.getElementById('loadingAnim');

    // if(! $intro ) return;
    
    ///////// 初回訪問（cookieなし
    if( ! $doc.cookie.match('visited') ){

        $body.classList.add( 'loading' ); //ロード開始

         setTimeout( function(){
            $body.classList.add( 'letsTalk' );
            TweenMax.to( $intro, 2, {
                backgroundColor: '#fdfdfd'
            });
         }, 800 );

        $doc.addEventListener( 'DOMContentLoaded', function(){
            
             animRemover( $loadingAnim );

             $doc.getElementById('just').addEventListener('transitionend', function( ){
               
                $body.classList.add( 'introEndAnim' );

                TweenMax.staggerTo( document.getElementsByClassName('myIntroduction_overlay'), 0.25, {
                    top: 0,
                    delay: 0.75,

                     onComplete:function( e ){
                        TweenMax.fromTo( $intro, 0.25, {
                            y:0
                        },
                        {
                            y:'-105%',

                            delay:0.5,

                            onComplete: function(){
                                $body.classList.remove('loading','letsTalk', 'introEndAnim');
                                $body.classList.add( 'loaded' );

                                  // animRemover( $intro );                                

                                $expire = new Date();
                                $expire.setTime( $expire.getTime() + 1000 * 3600 * 48 );
                                $expire = $expire.toUTCString();              
                                $doc.cookie = 'visit=visited; expires=' + $expire;
                            }
                        });
                    }                    
                }, 0.25 );              
             });
        });
    } else {

        animRemover( $intro );
        $body.classList.add( 'noIntro' );

        var $loadingAnim = document.getElementById('loadingAnim');
      
        $doc.addEventListener( 'DOMContentLoaded', function(){
            TweenMax.to( $loadingAnim, 0.5, {
                opacity:0,
                delay: 1,
                onComplete:function( e ){
                    animRemover( $loadingAnim );
                    $body.classList.add('loaded');
                }
            });
        });
    }

    function animRemover( $obj ){
        if( $obj ){
            $obj.parentNode.removeChild( $obj ); 
        }
    }

})();



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

// if( $ua == 'mobile' && $button.length ){
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
// }

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



jQuery(function( $ ){
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

jQuery( function( $ ){

    var $timer = null,
        $icon = $( '.backToTop' ); //icon
        $window = $( 'window' )

     $window.on( 'scroll', function(){

         if( $timer == null ){

             $timer = setTimeout( function(){
                    
                clearTimeout( $timer );
                
                 var $visible = $icon.is( ':visible' );
                 var $scrollVal = $window.scrollTop(); //スクロール値
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


     $icon.on( 'click', function(){
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
* contact form 7 送信後リダイレクト
*/

document.addEventListener( 'wpcf7mailsent', function( event ) {
    location.href = 'thankyou/';
}, false );


/**
* google analytics
*/

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-40118061-6', 'auto');
  ga('send', 'pageview');