const fs = require('fs');
const path = require('path');

function removeSpaces(filePath){
    let content;
    fs.readFile(filePath, 'utf-8', (err, data) => {
        console.log(`Reading file => ${data}`);
        content = data;
        let contentArr = content.split(' ');
        console.log(contentArr);
    
        let result = '';
        for(let i = 0; i<contentArr.length; i++){
            if(contentArr[i]!=''){
                result+=contentArr[i];
                result+=' ';
            }
        }
        fs.writeFile(filePath, result, {encoding: 'utf-8'}, (err) => {
            if(err){
                console.log(err);
            } else {
                console.log("Done👍🏻!! Edited file =>");
                console.log(fs.readFileSync(filePath,'utf8'));
            }
        });
    })
}

const filePath = path.join(__dirname, './a.txt');
removeSpaces(filePath);