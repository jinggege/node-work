/**
 * Created by mj on 16/6/18.
 * 路由
 */

var url = require("url");
var fs = require("fs");
var path = require("path");
var mime = require(global.RootPath+"/src/config/mime.js").types;
var config = require(global.RootPath+"/src/config/appconfig.js");

var Route = function(){};

Route.prototype = {
    onRequest:function(request,response){
        var pathname = url.parse(request.url).pathname;
        var realpath = global.RootPath+pathname;
        var extname = path.extname(pathname);
        extname = extname? extname.slice(1) : "unknown";
        console.log("extname=",extname);

        fs.stat(realpath,function(err,stat){
            if(err){
                response.writeHead(
                    404,
                    {'Content-Type': 'text/plain'}
                );
                response.write("this request url:"+pathname+" not found!");
                response.end();
                return;
            }

            var lastModified = stat.mtime.toUTCString();
            response.setHeader("Last-Modified",lastModified);

            var ifModifiedSince = "If-Modified-Since".toLowerCase();

            if(request.headers[ifModifiedSince]&&lastModified == request.headers[ifModifiedSince]){
                response.writeHead(304, "Not Modified");
                response.end();
                return;
            }

            fs.readFile(realpath,"binary",function(err,file){
                if(err){
                    response.writeHead(
                        500,
                        {"Content-Type":"text/plain"}
                    );
                    response.end(err);
                }else{
                    var contentType = mime[extname] || "text/plain";
                    if(extname.match(config.expires.fileMatch)){
                        var expires = new Date();
                        expires.setTime(expires.getTime()+config.expires.maxAge*1000);
                        response.setHeader("Expries",expires.toUTCString());
                    }
                    response.writeHead(
                        200,
                        {"Content-Type":contentType}
                    );
                    response.write(file,"binary");
                    response.end();
                }
            });

        });





    }

};



module.exports = new Route();



