const fs = require('fs');
const path = require('path');

function readFile(filePath) {

    // synchronously
    // const newPath = path.resolve(__dirname, './b.txt')
    // fs.writeFileSync(newPath, fs.readFileSync(filePath, 'utf8'), {encoding: 'utf8'});
    // fs.readFileSync(filePath, {encoding: 'utf8'});

    
    // asynchronously
    // fs.readFile(filePath, 'utf-8', (err, data) => {
    //     const con = data;

    //     console.log("Inga pinga pode");
    // })

}


const filePath = path.resolve(__dirname, './a.txt');

readFile(filePath);