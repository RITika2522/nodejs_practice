const fs = require('fs');
const os = require('os');

console.log("CPU size : ",os.cpus().length);

//Write file 
//Syncronous call ----BLocking request --------
//fs.writeFileSync('./test.txt',"Hey there!");

//Asyncronous call --------Non Blocking request--------
// fs.writeFile('./test.txt', "HELLO WORLD!", (err) =>{});

//Read file
//Syncronous call
// const contact = fs.readFileSync("./contact.txt", "utf-8");
// console.log(contact);

//Asyncronous call
// fs.readFile("./contact.txt", "utf-8", (err, data) => {
//     if(err){
//         console.log('Error',err);
//     }else{
//         console.log(data);
//     }
// });

//Append File
//Syncronous call
//fs.appendFileSync('./test.txt',`This is the appended text in file\n`);

//Copy File
// fs.copyFileSync('./test.txt', './test_copy.txt');

//Delete File
//fs.unlinkSync('./test_copy.txt');

//Checking stats of a file
// console.log(fs.statSync('./test.txt').isFile());

//Make Directory
// fs.mkdirSync("myDocss/a/b", { recursive: true });
 