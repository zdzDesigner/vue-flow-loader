var fs = require('fs')
var path = require('path')
var url = require('url')

//递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback()  
        } else {  
            //console.log(path.dirname(dirname))  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback)  
            })  
        }  
    })  
}


module.exports = function (content, map, meta) {
   
    var callback = this.async()
    var type = url.parse(this.query,true).query.type
    var filePath = this.resourcePath.replace('/src/app', '/dist/app')
    var dirPathChunk = filePath.split('/')
    var fileName = dirPathChunk.pop()
    
    // 目标文件名
    var dirPath = dirPathChunk.join('/')
    this.addDependency(dirPath)
    // console.log({dirPath, fileName})
    // 创建文件
    mkdirs(dirPath,function(){
        var filePath = [].concat(dirPath,fileName).join('/')
        if(~content.indexOf('@flow')){
            // console.log({dirPath,fileName,filePath})
            fs.writeFileSync(filePath,'/* @flow */'+content,'utf8')    
        }
        callback(null,content)
    })
    
    
  
    
}
