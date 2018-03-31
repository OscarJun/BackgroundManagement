var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, {
        "Content-Type" : "text/plain" // 输出类型
    });
    response.write("this is before;Hello World");// 页面输出
    response.end();
}).listen(8100); // 监听端口号
console.log("this is after;nodejs start listen 8100 port!");