var port = process.env.PORT || 5000;
var http = require('http');
var fs = require('fs');
var url = require('url');
//var mime = require('mime');

http.createServer(function(req,res) {
    var request = url.parse(req.url,true);
    var file = request.pathname;
    
    var lastChar = file.substr(file.length - 1);
    if (lastChar == '/'){
	file += 'index.htm';
    }
    
    file = '.'+file;
    
    fs.exists(file, function(exists) {
	if (!exists) {
	    file = './404.html';
	}
    });
    
//    var mimetype = mime.lookup(file);
    
    var mimetype = file.substr(file.length - 3);
    var mimetypes = new Array();
    mimetypes['htm'] = 'text/html';
    mimetypes['css'] = 'text/css';
    mimetypes['gif'] = 'image/gif';
    mimetypes['jpg'] = 'image/jpg';
    mimetypes['png'] = 'image/png';
    mimetypes['bmp'] = 'image/bmp';
    
    mimetype = mimetypes[mimetype];
    
    if (mimetype == 'text/html' && !(file == './jro/index.htm' || file == './jro/testtwo/index.htm')){
	fs.readFile('./header.htm', function (err, html) {
	    res.writeHeader(200, {"Content-Type": mimetype});
	    res.write(html);
	    fs.readFile(file, function (err, html) {
		res.write(html);
		fs.readFile('./footer.htm', function (err, html) {
		    res.write(html);
		    res.end();
		});
	    });
	});
    }else{
	fs.readFile(file, function (err, html) {
	    res.writeHeader(200, {"Content-Type": mimetype});
	    res.write(html);
	    res.end();
	});
    }
}).listen(port);

console.log('Server running at http://127.0.0.1:'+port+'/');