const fs = require('fs');

const readableStream = fs.createReadStream('./lorem.txt', {encoding: 'utf-8'});
const writeableStream = fs.createWriteStream('./lorem-copy.txt', {encoding: 'utf-8'});


/*
readableStream.on('data', (chunk) => {
    writeableStream.write(chunk);
});

readableStream.on('end', () => {
    writeableStream.end();
});
*/

readableStream.pipe(writeableStream);
