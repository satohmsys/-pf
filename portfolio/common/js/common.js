var $w = $( window )


/**
* （ スマートフォン用 ）ナビゲーション開閉
**/
$( function(){

    // alert( window.outerHeight );

    /**
    * ウィンドウ幅取得
    */
    $w.on( 'resize', function(){
        $wWidth = $w.width();
    });


    /**
    * 処理スタート
    */
    $w.on( 'load', function(){

        var $menu = $( '.nav' ); //navigation
        var $button = $( '.navToggle' ); //button
        var $slideType = $button.data( 'navtype' ); //ナビゲーションのエフェクト判別
        var $body = $( 'body' );
        var $wWidth = $w.width();

        if( $wWidth < 780 ){
            // $menu.hide();

            $button.on( 'click', function( e ){
                e.preventDefault();
                e.stopPropagation();

                if( $slideType == 'fade'){
                    //オーバーレイ生成
                    doOverlay( $body, 'menuOpening', $button, $menu );
                    //bodyのクラスを着脱
                    $body.toggleClass( 'menuOpening' );                    
                } else {
                    $menu.stop().slideToggle();                
                }

            } );
        }
    } );


    /**
    * オーバーレイを生成する
    * @param $targetObj {jQuery Obj} クラスの操作をするオブジェクト
    * @param $class {string} $targetObjの切り替わりクラス    
    * @param $button {jQuery} オーバーレイをフェードアウトさせるボタン    
    * @param $fadeSpeed { int } エフェクトのスピード    
    * @see  fadeOutOverlay
    * @see  menuAction
    */
    function doOverlay( $targetObj, $class, $button, $menu, $fadeSpeed ){
        if(! $fadeSpeed ) $fadeSpeed = 200;        
        typeof $button == 'undefined' || $button.length == 0 ? $button = '' : '';
        $overlay = '<div class="overlay"><div class="overlay_close"><i class="overlay_close_icon"></i>close</div></div>';
        $targetObj.append( $overlay );
        $ovl = $( '.overlay' );

        $ovl.hide();

        if( ! $targetObj.hasClass( $class ) ){
            $ovl.stop(true,true).fadeIn();
            //メニューを開く
            menuAction( $targetObj, 'menuOpening' ,$menu );            
        } else {
            //メニューを閉じる
            menuAction( $targetObj, 'menuOpening' ,$menu );           
            fadeOutOverlay( $ovl, {obj:$targetObj,class:$class} );   
        }
        $ovl.on( 'click', function( e ){
            e.stopPropagation();
            menuAction( $targetObj, 'menuOpening' ,$menu );  
            fadeOutOverlay( $ovl, {obj:$targetObj,class:$class} );                        
        } );              
    }


    /**
    * メニューを操作する
    * @param $targetObj {jQuery Obj} ラッパー要素
    * @param $class {string} $targetObjにこのクラスがあるか照合    
    * @param $menu {jQuery Obj} 操作するメニュー   
    * @param $fadeSpeed { int } エフェクトのスピード    
    */
    function menuAction( $targetObj, $class, $menu, $fadeSpeed ){
        if(! $fadeSpeed ) $fadeSpeed = 200;

        if( ! $targetObj.hasClass( $class ) ){
            $menu.addClass('open').delay( 400 ).fadeIn( $fadeSpeed );
        } else { 
            $menu.stop(true,true).fadeOut( $fadeSpeed ).removeClass('open');
        }        
    }


    /**
    * オーバーレイをフェードアウト , 消去させる
    * @param $ovl {jQuery Obj} オーバーレイのオブジェクト
    * @param $targetObj {Obj} cssクラスの操作をするオブジェクト
    *               obj { jQuery Obj } 対象の要素
    *               class { string } objに着脱するcssクラス
    */
    function fadeOutOverlay( $ovl, $targetObj, $bodyObj ){
        $ovl.fadeOut().queue( function(){
            $( this ).remove();
            $targetObj.obj.toggleClass( $targetObj.class );  
        } );                        
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


