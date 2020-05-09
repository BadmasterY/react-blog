import mongoose from 'mongoose';
import { Dao } from './Dao'
import { Groups } from '../../interfaces/models';
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
async function onConectedFn(users: Dao, settings: Dao, groups: Dao) {
    const userResult = await users.findAll();
    const settingResult = await settings.findAll();
    const groupResult = await groups.findAll();

    if (groupResult.length === 0) {
        await groups.save({
            name: '管理员',
            removed: 0,
            useState: 0,
        });

        await groups.save({
            name: '游客',
            removed: 0,
            useState: 1,
        });
    }

    if (userResult.length === 0) {
        const {
            username,
            password,
            position,
        } = initConfig;

        const { _id } = await groups.findOne({ name: position });

        await users.save(Object.assign({}, initConfig, { password: md5(password), position: _id }));

        console.log(`[DB] Init username: ${username}`);
        console.log(`[DB] Init password: ${password}`);
    }

    if (settingResult.length === 0) {
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