let currTime = Date.now();
while (true){
    let passedTime = Date.now();
    let seconds = passedTime-currTime;
    if(seconds>=1000){
        const date = new Date().toLocaleTimeString();
        console.log(date);
        currTime = Date.now();
    }
}
