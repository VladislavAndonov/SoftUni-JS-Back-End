const fs = require('fs');

const readableStream = fs.createReadStream('./lorem.txt', {encoding: 'utf-8'});

readableStream.on('data', (chunk) => {
    console.log("-----NEW CHUNK-----");
    console.log(chunk);
});

readableStream.on('end', () => {
    console.log('STREAM ENDED');
})