/**
 * Created by mj on 16/6/18.
 * 路由
 */

var url = require("url");
var routes = require(global.RootPath+"/src/config/routeconfig.js");

var Route = function(){};
var routeCatch = {};



Route.prototype = {


	init:function () {

		for(var ite in routes){
			routeCatch.controlName = item.controlName;
			routeCatch.instaince = require(global.RootPath+item.control_path);
		};
		
	},

    onRequest:function(request,response){

        var pathname = url.parse(request.url).pathname;


        if(routeCatch[pathname]){

        };


        response.writeHead(
            200
        );

        response.write(pathname);

        response.end();

    }

}



module.exports = new Route();



