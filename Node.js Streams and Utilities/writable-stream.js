const fs = require('fs');

const writableStream = fs.createWriteStream('./output.txt', {flags: 'a'});

writableStream.write('Hello there!\n');
writableStream.write('This is Pesho.\n');

writableStream.end();