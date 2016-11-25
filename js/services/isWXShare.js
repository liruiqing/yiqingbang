/**
 * Created by _Lotus on 2015/11/10 0010.
 */
//if(!is_weixin()){
//    document.write(' <script src="../android/cordova.js"> <\/script>')
//    //document.write(' <script src="../../cordova_plugins.js"> <\/script>')
//}else{
//
//}
 if(is_weixin()){


 }else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
         document.write('<script type="text/javascript" src="../ios/cordova.js"><\/script>');

 }else if(/(Android)/i.test(navigator.userAgent)) {
         document.write('<script type="text/javascript" src="../android/cordova.js"><\/script>');

 }



