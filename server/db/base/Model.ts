// 模型
import mongoose from 'mongoose';

// schema 相关配置
// 详细查看 https://mongoosejs.com/docs/guide.html#options
import { SCHEMA } from '../../config/config';

const { Schema } = mongoose;

/**
 * 创建 model
 * @param name model名
 * @param opts schema definition
 */
function createModel(name: string, opts: mongoose.SchemaDefinition) {
    // 创建 schema
    const schema = new Schema(opts, SCHEMA);
    // 创建 model
    const model = mongoose.model(name, schema);

    return model;
}

export {
    createModel,
}