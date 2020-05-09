import mongoose from 'mongoose';
import { Dao } from './Dao'
import { Users, Settings } from '../../interfaces/models';
import { md5 } from '../../utils/md5';

import config from 'config';

import { InitDB, Setting } from '../../interfaces/config';

const initConfig: InitDB = config.get('initDB');
const settingConfig: Setting = config.get('systemSetting');

/**
 * 转换为 objectId
 * @param str 需要转换的字符串或者数字
 */
function toObjectId(str: string | number) {
    return mongoose.Types.ObjectId(str);
}

/**
 * 初始化连接方法  
 * 用于创建初始账号/配置
 * @param users 用户实例
 */
async function onConectedFn(users: Dao, settings: Dao) {
    const userResult = (await users.findAll() as Users[]);
    const settingResult = (await settings.findAll() as Settings[]);

    if (userResult.length === 0) {
        const {
            username,
            password,
        } = initConfig;

        await users.save(Object.assign({}, initConfig, { password: md5(password) }));

        console.log(`[DB] Init username: ${username}`);
        console.log(`[DB] Init password: ${password}`);
    }

    if(settingResult.length === 0) {
        const {
            isUseRegister,
        } = settingConfig;

        await settings.save({ isUseRegister });

        console.log(`[DB] Init setting config...`, settingConfig);
    }
}

export {
    toObjectId,
    onConectedFn,
};