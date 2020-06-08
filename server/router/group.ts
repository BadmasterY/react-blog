import Router from 'koa-router';

import { getDate } from '../utils/util';
import { groups } from '../db/index';
import { Response } from '../interfaces/response';
import { Groups } from '../interfaces/models';
import {
    GetGroupsRequest as getRequest,
    ResponseGroupList,
    DeleteGroupRequest,
    UpdateGroupRequest,
    AddGroupRequest,
    GetGroupListResult,
} from '../interfaces/groups';

const router = new Router();

router.post('/getGroups', async (ctx, next) => {
    const data: getRequest = ctx.request.body;
    const { page, pageSize, query } = data;
    const skipSize = (page - 1) * pageSize;

    console.log(`[Groups] ${getDate()} getGroups`);

    const response: Response = { error: 1 };

    const groupList = await groups.findAll({ removed: 0, ...query });
    if (Array.isArray(groupList)) {
        response.content = {
            maxLength: groupList.length,
        }

        await groups.findAll(
            { removed: 0, ...query },
            null,
            { skip: skipSize, limit: pageSize }
        ).then(result => {
            const data: Groups[] = result;
            const tempArr: ResponseGroupList[] = [];

            for (let i = 0; i < data.length; i++) {
                tempArr.push({
                    id: data[i]._id || '',
                    name: data[i].name,
                    useState: data[i].useState,
                });
            }

            response.error = 0;
            response.content = {
                ...response.content,
                groups: tempArr,
            };

        }).catch(err => {
            response.msg = '未找到相关数据!';
            console.log(`[Groups] ${getDate()} getGroups Error:`, err);
        })
    } else {
        response.msg = '服务器异常, 请稍后重试!';
        console.log(`[Groups] ${getDate()} getGroups Error:`, response.msg);
    }

    ctx.response.body = response;
});

router.post('/deleteGroup', async (ctx, next) => {
    const data: DeleteGroupRequest = ctx.request.body;
    const { id } = data;

    console.log(`[Groups] ${getDate()} deletGroup: ${id}`);

    const response: Response = { error: 1 };

    await groups.updateOne({ _id: id }, { removed: 1 }).then(result => {
        if (result.ok === 1) {
            response.error = 0;
        } else {
            response.msg = '删除失败!';
        }
    }).catch(err => {
        response.msg = '服务器异常, 请稍后重试!';
        console.log(`[Groups] ${getDate()} deleteGroup Error:`, err);
    })

    ctx.response.body = response;
});

router.post('/updateGroup', async (ctx, next) => {
    const data: UpdateGroupRequest = ctx.request.body;
    const { id, name, useState } = data;

    console.log(`[Groups] ${getDate()} updateGroup: ${id}`);

    const response: Response = { error: 1 };

    await groups.updateOne({ _id: id }, { name, useState }).then(result => {
        if (result.ok === 1) {
            response.error = 0;
        } else {
            response.msg = '更新失败!';
        }
    }).catch(err => {
        response.msg = '服务器异常, 请稍后重试!';
        console.log(`[Groups] ${getDate()} updateGroup Error:`, err);
    });

    ctx.response.body = response;
});

router.post('/addGroup', async (ctx, next) => {
    const data: AddGroupRequest = ctx.request.body;
    const { name, useState } = data;

    console.log(`[Groups] ${getDate()} addGroup: ${name}`);

    const response: Response = { error: 1 };

    await groups.save({ name, useState, removed: 0 }).then(result => {
        if (result) {
            response.error = 0;
        } else {
            response.msg = '添加失败!';
        }
    }).catch(err => {
        response.msg = '服务器异常, 请稍后重试!';
        console.log(`[Groups] ${getDate()} addGroup Error:`, err);
    });

    ctx.response.body = response;
});

router.post('/getGroupList', async (ctx, next) => {
    console.log(`[Groups] ${getDate()} getGroupList`);

    const response: Response = { error: 1 };

    await groups.findAll({ removed: 0, useState: 1 }, 'name')
        .then((result: GetGroupListResult[]) => {
            const grouplist = [];

            for(let i = 0; i < result.length; i++) {
                const { _id, name } = result[i];

                grouplist.push({
                    id: _id,
                    name,
                });
            }

            response.error = 0;
            response.content = {
                grouplist,
            };
        }).catch(err => {
            console.log(`[Groups] ${getDate()} getGroupList Error:`, err);
            response.msg = '服务器异常, 请稍后重试!';
        });

    ctx.response.body = response;
});

export default router.routes();