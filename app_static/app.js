/**
 * Created by sn on 16/6/18.
 */

 global.RootPath = __dirname;

var http = require("http");
var route = require("./src/control/route.js");

route.init();

var app = http.createServer(route.onRequest);


app.listen(8000);


