import fs from 'fs';
import path from 'path';
import {flattenObject, unflattenObject} from './object'

const patternFiles = /\.(js|vue)$/;
const patternKey = /\$t\(((?:"[^"]*")|(?:`[^`]*`)|(?:'[^']*'))/igm;
let dir = path.resolve('D:/GIT/iceuk.backend.ui/src')

export const getFiles = (dir, pattern, calback) => {
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let name = path.resolve(dir, files[i]);
    let fStatus = fs.statSync(name);
    if (fStatus.isDirectory()) {
      getFiles(name, pattern, calback);
    }
    else if (fStatus.isFile()) {
      if (pattern.test(name)) {
        calback(name);
      }
    }
  }
};
export const readAllFiles = (files) => {
  return files.map(file => {
    const content = fs.readFileSync(file, "UTF-8")
    return {
      file: file,
      content: content
    }
  })
}

export const findPattern = (str, pattern) => {
  let res = [];
  let exec;
  while (exec = pattern.exec(str)) {
    res.push({
      full: exec[0],
      groups: exec[1],
      index: exec.index
    })
    // console.log(`Find result: ${exec[1]} in ${exec[0]} position: ${exec.index}`);
  }
  return res;
}

export const loadLangs = (dir) => {
  let res = {};
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let fileName = files[i];
    let lang = path.basename(fileName, path.extname(fileName))
    let file = path.resolve(dir, fileName)
    let fStatus = fs.statSync(file);
    if (fStatus.isFile()) {
      if (/.json$/.test(file)) {
        const content = fs.readFileSync(file, "UTF-8");
        res[lang] = flattenObject(JSON.parse(content))
      }
    }
  }
  return res;
}

export const saveLangs = (dir, data) => {
  let files = fs.readdirSync(dir);
  for (let i in data) {
    try {
      fs.writeFileSync(path.resolve(dir, i + '.json'), JSON.stringify(data[i]));
    } catch (err) {
      console.error(err)
    }
  }
}

export default () => {
  let files = []
  getFiles(dir, patternFiles, (file) => {
    files.push(file);
  });
  let contents = readAllFiles(files)
// console.log(contents);
  contents.forEach(el => {
    el.finded = findPattern(el.content, patternKey)
  })
  return contents;
}

