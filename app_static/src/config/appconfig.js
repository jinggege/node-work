/**
 * Created by Administrator on 2016/6/20.
 */

module.exports = {
    port:8000,
    expires:{
        fileMatch:/^(gif|png|jpg|js|css)$/ig,
        maxAge:60*60*24*365
    }
};