function logger(value){
    const dateTime = new Date().toISOString(); // Get current date and time in ISO format
    console.log(`${dateTime}:: INFO :: ${value}`);
}

module.exports = {
    logger
}