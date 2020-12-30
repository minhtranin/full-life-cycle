import db from '../models';

const queue = [];
export function importDb(message) {
    queue.push(JSON.parse(message));
}
export function workerLoop(){
    if(queue.length === 0){
        console.log('loop queue');
      setTimeout(workerLoop, 1000);
    } else {
      const record = queue.shift();
      console.log('trying to import...');
    //   console.log(record);
      db.Crawler.create(record).then(e => {
        if(e.get({ nest: true })){
            console.log('import success');
        };
      }).catch(e => {
          queue.push(record);
          console.log('import fail', record);
      });
      setTimeout(workerLoop, 1000);
    }
}