var fs = require('fs')
var src = require('path').resolve('src','logos')
    
fs.readdirSync(src).forEach((file,index) => {
    if (index == 0) {
        console.log(fs.readFileSync(src + '/' + file).toString())
    } 
    setTimeout( () => {
        if (index == 1) 
        console.clear()
        console.log(fs.readFileSync(src + '/' + file).toString())
    }, 1000)


})