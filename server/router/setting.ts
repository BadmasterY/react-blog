import Router from 'koa-router';

import { settings } from '../db';

import { Response } from '../interfaces/response';
import { Settings } from '../interfaces/models';
import { getDate } from '../utils/util';
import { 
    GetSettingsRequest,
    UpdateSettingRequest,
} from '../interfaces/setting';

const router = new Router();

router.post('/getSetting', async (ctx, next) => {
    const request: GetSettingsRequest = ctx.request.body;
    const { id } = request;
    
    console.log(`[System] ${getDate()} getSetting, get user id: ${id}`);

    const response: Response = { error: 1 };

    await settings.findAll<Settings>().then(result => {
        if(result.length === 1) {
            const setting: Settings = result[0];
            const { isUseRegister, _id } = setting;

            response.error = 0;
            response.content = {
                id: _id,
                isUseRegister 
            };
        }else {
            response.msg = '服务器异常!';
            console.log(`[System] ${getDate()} getSetting Error: setting length is ${result.length}`);
        }
    }).catch(err => {
        response.msg = '服务器异常!';
        console.log(`[System] ${getDate()} getSetting Error:`, err);
    });

    ctx.response.body = response;
});

router.post('/updateSetting', async (ctx, next) => {
    const update: UpdateSettingRequest = ctx.request.body;
    const { isUseRegister, updateUserId, id } = update;

    console.log(`[System] ${getDate()} updateSetting, update user id: ${updateUserId}`);

    const response: Response = { error: 1 };

    await settings.updateOne({_id: id}, {
        isUseRegister,
        updateUserId,
    }).then(result => {
        const { ok } = result;

        if(ok === 1) {
            response.error = 0;
        }else {
            response.msg = '更新失败!';
        }
    }).catch(err => {
        response.msg = '服务器异常!';
        console.log(`[System] ${getDate()} updateSetting Error:`, err);
    });

    ctx.response.body = response;
});

export default router.routes();