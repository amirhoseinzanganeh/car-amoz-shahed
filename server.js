const http = require("http");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "public");
const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".ico":"image/x-icon"};
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname); } catch { pathname="/"; }
  if (pathname === "/") pathname="/index.html";
  const file = path.resolve(root, "." + pathname);
  if (!file.startsWith(root + path.sep) && file !== path.join(root,"index.html")) {
    res.writeHead(403); return res.end("Forbidden");
  }
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});return res.end("<h2 style='font-family:sans-serif'>این صفحه هنوز ساخته نشده است.</h2><a href='/'>بازگشت به صفحه اصلی</a>");}
    res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream","Cache-Control":"no-store"});
    res.end(data);
  });
}).listen(process.env.PORT||3000,"0.0.0.0",()=>console.log("MadreseOnline آماده است: http://localhost:"+(process.env.PORT||3000)));
