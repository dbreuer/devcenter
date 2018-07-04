// require('babel-polyfill');
// require('dotenv').config();
// const fs = require('fs');
// const path = require('path');
// const markdown = require('markdown-js');
// const SiteClient = require('datocms-client').SiteClient;
// const client = new SiteClient(process.env.DATO_API_IMPORT_TOKEN);
// const YAML = require('yamljs');
// const _ = require('lodash');

// const nativeObject = YAML.load('mkdocs.yml');

// const findDeep = (data, searchString, callback) => {
//   for (var e of data) {
//     if (e[Object.keys(e)] === searchString) {
//       callback(Object.keys(e)[0]);
//     }
//     if (e[Object.keys(e)] instanceof Array) {
//       output = findDeep(e[Object.keys(e)], searchString, callback);
//     }
//   }
// };

// const getAllFiles = dir =>
//   fs
//     .readdirSync(dir)
//     .reduce((files, file) => {
//       const name = path.join(dir, file);
//       const isDirectory = fs.statSync(name).isDirectory();
//       return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
//     }, [])
//     .filter(item => {
//       return item.indexOf('.md') > 0;
//     });

// let docsList = getAllFiles('./docs');
// let promisechain = [];
// docsList.forEach(element => {
//   const elempath = element.split('/');
//   let PageObject = {
//     itemType: '36945',
//     title: null,
//     content: null,
//     slug: null
//   };
//   for (let e of elempath) {
//     if (e === 'index.md') {
//       // console.log('INDEX', e);
//     }
//     if (e !== 'index.md' && e.indexOf('.md') > 0) {
//       const str = fs.readFileSync(element, 'utf8');
//       const filePath = element.replace('docs/', '');
//       PageObject.slug = elempath[elempath.length-1].replace('.md', '');
//       findDeep(nativeObject.pages, filePath, (data) => {
//         PageObject.title = data;
//         // PageObject.content = markdown.makeHtml(str);
//         // console.log('Page', PageObject);
//         promisechain.push(client.items.create(PageObject));

//       });

//     }
//   }
// });

//     Promise.all(promisechain)
//       .then((record) => console.log(record))
//       .catch( hasError => console.warn('hasError', JSON.stringify(hasError)));

import { SiteClient } from 'datocms-client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import * as markdown from 'markdown-js';
import * as YAML from 'yamljs';
import * as _ from 'lodash';

dotenv.config();

(async () => {
  const client = new SiteClient(process.env.DATO_API_IMPORT_TOKEN);
  const nativeObject = YAML.load('mkdocs.yml');

  const findDeep = async (data, searchString, callback) => {
    for (var e of data) {
      if (e[Object.keys(e)[0]] === searchString) {
        await callback(Object.keys(e)[0]);
      }
      if (e[Object.keys(e)[0]] instanceof Array) {
        findDeep(e[Object.keys(e)[0]], searchString, callback);
      }
    }
  };

  const getAllFiles = dir =>
    fs
      .readdirSync(dir)
      .reduce((files, file) => {
        const name = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        return isDirectory
          ? [...files, ...getAllFiles(name)]
          : [...files, name];
      }, [])
      .filter(item => {
        return item.indexOf('.md') > 0;
      });

  let docsList = getAllFiles('./docs');
  let foundAll = [];
  (async () => {
    await docsList.forEach(element => {
      const elempath = element.split('/');
      let PageObject = {
        itemType: '37100',
        title: null,
        content: null,
        slug: null
      };
      for (let e of elempath) {
        if (e === 'index.md') {
          // console.log('INDEX', e);
        }
        if (e !== 'index.md' && e.indexOf('.md') > 0) {
          const str = fs.readFileSync(element, 'utf8');
          const filePath = element.replace('docs/', '');
          PageObject.slug = elempath[elempath.length - 1]
            .replace('.md', '')
            .replace('.', '_');
          if (PageObject.title === 'Android Code Signing') {
            PageObject.slug = 'android-code-sign';
          }
          findDeep(nativeObject.pages, filePath, data => {
            PageObject.title = data;
            PageObject.content = markdown.makeHtml(str);
            foundAll.push(PageObject);
          });
        }
      }
    });

    client.items
      .all(
        {},
        {
          allPages: true
        }
      )
      .then(items => {
        foundAll.forEach((item, index) => {
          const t = setTimeout(async () => {
            const nextItem = await _.find(items, { slug: item.slug });
            // console.log(nextItem.id);
            await client.items
              .update(nextItem.id, item)
              .then(success =>
                console.log(`[id: ${index}] res: ${success} item: ${item}`)
              )
              .catch(hasError =>
                console.log(`Has error [id ${index} ${hasError}]`)
              );
          }, index * 2000);
        });
      });
  })();

  // const article = await client.items.find('325356');

  // await client.items.update('325356', { ...article, title: 'New title' });
})();
