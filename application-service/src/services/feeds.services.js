import axios from 'axios';
import Redis from 'ioredis';
import xml from 'xml2js';
import db from '../models';
import fs from 'fs';
import path from 'path';

export async function create(payload) {
    const {
        title, description, link, comments, pubdate, category
    } = payload.params;
    return db.Crawler.create({
        title, description, link, comments, pubdate, category
    });
}

export async function update(payload) {
    const {
        title, description, link, comments, pubdate, category, id
    } = payload.params;
    const item = await db.Crawler.findOne({
        where: {
            id
        }
    });
    if (!item) throw new Error('id is not existed');
    return db.Crawler.update({ title, description, link, comments, pubdate, category },
        {
            where: {
                id
            }
        });
}

export async function destroy(payload) {
    const { id } = payload.query;
    const res = await db.Crawler.destroy({
        where: {
            id
        }
    }).then(e => {
        if(e !== 0 ) return e;
        throw new Error('id is not existed');
    });
    return 'successful';
}

export async function list(params) {
    const { limit, offset } = params.query;
    let pagination = {};
    if(limit && offset) {
        pagination = { limit, offset };
    }
    return db.Crawler.findAll({
        ...pagination,
        order: [
            ['id', 'DESC']
        ]
    });
}

export async function loadDb(params) {
    try{
        const pureUrls = JSON.parse(params?.query?.url);
        const urls = [...new Set(pureUrls)];
        await db.Crawler.destroy({
            truncate: true
          })
        fs.appendFileSync(path.resolve('application.log'), `\n ${new Date()}:from ${urls}`, 'UTF8')
        for (const [i, url] of urls.entries()) {
        fs.appendFileSync(path.resolve('application.log'), `\n ${new Date()}:------ with url${i}`, 'UTF8')
           await crawlerData(url);
        }
        fs.appendFileSync(path.resolve('application.log'), `\n ${new Date()}: SUCCESSFUL!!!`, 'UTF8')
        return urls;
    }catch(e){
        fs.appendFileSync(path.resolve('application.log'), `\n ${new Date()}: INTERNAL SERVICE ERROR!!!-- ${e}`, 'UTF8')
    }
}

async function crawlerData(url) {
    const response = await axios.get(url, { method: 'GET' }).catch(e => {
        if(e) throw e;
    });
    xml.parseString(response.data, async (err, datas) => {
        if(err) return;
        const items = datas.rss['channel'][0].item;
            const transform = items.map(p => ({
                title: p.title?.[0] || '',
                description: p.description?.[0] || '',
                comments: p.comments?.[0] || '' || '',
                pubdate: p.pubDate?.[0] || '',
                category: p.category?.[0]._ || datas.rss['channel'][0].category?.[0]._ || 'other',
                link: p.link?.[0],
                hashtable: 'hihi'
            }));
            await db.Crawler.bulkCreate(transform);
    });
}

export async function producer({ redis }) {
    const publisher = new Redis({
        port: '6379',
        host: 'redis-service',
        password: ''
    });
    const firstdata = {
        title: 'queue1',
        description: 'queue1',
        comments: 'comment',
        pubdate: 'pubdate',
        category: 'gate',
        link: 'linksda',
        hashtable: 'craw'
    };
    publisher.defineCommand('testcommand', {
        numberOfKeys: 0,
         lua: `local rcall = redis.call
         rcall("PUBLISH", "crawler", "convert string")
         return ARGV[1] .. ""`,
      });
      publisher.testcommand("linkedlist for queue", (err, e) => {
          console.log(e, 'Ss', err);
      });
    // publisher.publish('crawler', JSON.stringify(firstdata));
    return 'redis';
}
