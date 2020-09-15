import fs from 'fs';
import path from 'path';

const dataType = (data: any) => {

    let typeStr = Object.prototype.toString.call(data);
    let regexp = new RegExp('(\\w+)(?=])', 'g');

    if (!typeStr.match(regexp)) return '';

    return (typeStr.match(regexp) as RegExpMatchArray)[0];
}

const getDate = (date = Date.now()) => {
    return new Date(date).toLocaleString();
}

/**
 * 自动创建目录
 * @param dirname 目录
 */
const mkdirsSync = (dirname: string) => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 删除当前目录下所有文件(不删除当前目录)
 * @param path 目录
 */
const delDirSync = (path: string) => {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        console.log(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDirSync(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
    }
}

export {
    dataType,
    getDate,
    mkdirsSync,
    delDirSync,
}