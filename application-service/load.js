const util = require('util')
const exec = util.promisify(require('child_process').exec);
const http = require('http')
const path = require('path');
const fs = require('fs');

const domain = process.env.domain || 'http://localhost:8000/loadDb';
const main = async () => {
    // await exec(`echo 'kaka'`);
    console.log('starting import data from')
    const a = await getAllRepos().then(e => {
        if(e)
            console.log(e);
            console.log('SUCCESSFULL!!!')
            return e;
    }).catch(e => {
        if(e) console.log('url incorrect', e);
        fs.appendFileSync(path.resolve('application.log'), `\n ${new Date()}: ERROR ${e}`, 'UTF8')
    });
};
function getAllRepos() {
    
    let stringbuilder = '';
    process.argv.slice(2).map(e => {
        stringbuilder += e;
    });
    const url = stringbuilder.trim().split(',').filter(filename => /^http/.test(filename));
    fs.appendFileSync(path.resolve('application.log'), `\n ${new Date()}: starting import data from`, 'UTF8')
    //url.filter(e => \^http$/\w\g.test(url));
    // console.log(url);
    return new Promise((resolve, reject) => {
        http.get(`${domain}?url=${encodeURI(JSON.stringify(url))}`, res => {
            let data = '';
            // A chunk of data has been recieved.
            res.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            console.log('err...');
            reject(err);
        });
    });
}

main();