/**
 * Created by sn on 16/6/18.
 */
 global.RootPath = __dirname;
var http = require("http");
var appconfig = require("./src/config/appconfig.js");
var route = require("./src/control/route.js");
var app = http.createServer(route.onRequest);

app.listen(appconfig.port);
console.log("server start on "+appconfig.port);
