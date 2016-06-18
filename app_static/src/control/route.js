/**
 * Created by mj on 16/6/18.
 * 路由
 */

var url = require("url");
var fs = require("fs");
var path = require("path");
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
        var realpath = global.RootPath+pathname;
        console.log("pathname=",pathname);

        console.log(path);
        return;

        path.exists(realpath,function(exists){
            if(!exists){
                response.wirteHead(
                        404,
                        {'Content-Type': 'text/plain'}
                    );
                response.write("this request url:"+pathname+" not found!");
                response.end();
            }


        });



        /*

        if(routeCatch[pathname]){
            

        }else{
            response.writeHead(
                200
            );
            response.write(pathname);
            response.end();
        }
        */


        

    }

}



module.exports = new Route();



