/**
 * Created by Administrator on 2017/7/24 0024.
 */
export default {
    makeText(str,time){
        $("#toast").show();
        $("#toast").html(str);

        setTimeout(function(){
            $("#toast").hide()
        },time)
    }
}
