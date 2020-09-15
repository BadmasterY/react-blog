import { 
    DB as DBConfig,
    InitDB,
    Http,
    Server,
    Setting,
    configSchema as Schema,
} from '../interfaces/config';

const config = require('../package.json');

export const CLINET_VERSION = '0.1.0';

export const SERVER_VERSION: string = config.version;

export const HTTP: Http = {
    host: "0.0.0.0",
    port: 3333,
    exclusive: false,
    readableAll: false,
    writableAll: false,
    ipv6Only: false,
};

export const SERVER: Server = {
    jsonLimit: "30mb",
    formLimit: "5mb",
};

export const INIT_DB: InitDB = {
    username: "admin",
    password: "admin666",
    position: "管理员",
    removed: 0,
    useState: 1,
};

export const DB: DBConfig = {
    dbname: "react-blog",
    user: "",
    pass: "",
    host: "0.0.0.0",
    port: "27017",
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    poolSize: 10,
    replicaSet: {
        // name: "react-blog",
        // members: [
        //     {
        //         host: "127.0.0.1",
        //         port: "27017"
        //     }
        // ]
    },
};

export const SCHEMA: Schema = {
    // runSetterOnQuery: true,
    timestamps: {
        createdAt: "createTime",
        updateAt: "updateTime"
    },
};

export const AVATAR_DIR = 'avatars';

export const INIT_SYSTEM: Setting = {
    isUseRegister: true,
};