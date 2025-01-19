const fs = require('fs');


// create a file 

// fs.writeFileSync('hey.txt', 'Hey there!',function(err){
//     if(err) console.log(err);
//     else console.log('File written successfully');

// })


//appendFile aage jod na
// fs.appendFile('hey.txt', 'Hey there i am kartik!',function(err){
//     if(err) console.log(err);
//     else console.log('File written successfully');

// })

//rename file
// fs.rename('hey.txt','hello.txt',function(err){
//     if(err) console.log(err);
//     else console.log('File renamed successfully');

// })

//copy file
// fs.copyFile('hello.txt','copy.txt',function(err){
//     if(err) console.log(err.message);
//     else console.log('File copyFile successfully');

// })

//unlink file
// fs.unlink("hello.txt",function(err){
//     if(err) console.log(err.message);
//     else console.log('File unlinked successfully');
// })

// removve directory rmdir

// fs.rm('./copy',{recursive:true},function(err){
//     if(err) console.log(err.message);
//     else console.log('Directory removed successfully');
// })

// create directory mkdir
// fs.mkdirSync('./copy', function(err){
//     if(err) console.log(err.message);
//     else console.log('Directory created successfully');
// })
// read file
fs.readFile("./copy.txt","utf-8",function(err,data){
    if(err) console.log(err.message);
    else console.log(data.toString());
})
