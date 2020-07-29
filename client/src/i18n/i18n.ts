import i18n from 'i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            'zh-CN': {
                translations: {
                    'HOME': '首页',
                    'ABOUT': '简介',
                    'LOGIN': '登录',
                    'Setting': '设置',
                    'Logout': '登出',
                    'Powered by': '技术支持',
                    'Created by': '作者',
                    'CreateTime': '创建时间',
                    'UpdatedAt': '更新时间',
                    'Please check network!': '请检查网络是否畅通!',
                    'Content': '内容',
                    'Author': '作者',
                    'UserName': '用户名',
                    'NickName': '昵称',
                    'Name': '名称',
                    'Position': '权限',
                    'State': '状态',
                    'Title': '标题',
                    'Comment!': '评论成功!',
                    'Please check input!': '请检查输入!',
                    'Do you want to delete this item?': '是否删除这一项?',
                    'Are you sure you want to delete it? It will not be recovered after deletion!': '确定要删除么? 删除之后将无法恢复!',
                    'Yes': '是',
                    'No': '否',
                    'Created': '创建时间',
                    'Add': '添加',
                    'Loading...': '加载中...',
                    'Please input username!': '请检查用户名是否已输入!',
                    'Input username...': '输入用户名...',
                    'Password': '密码',
                    'Please input password!': '请检查密码是否已输入!',
                    'Input password...': '输入密码...',
                    'Group': '分组',
                    'Please select group!': '请检查分组是否已选择!',
                    'Deleted!': '删除成功!',
                    'Delete': '删除',
                    'Refresh': '刷新',
                    'Please input comment!': '请检查评论是否已输入!',
                    'Add Comment': '发表评论',
                    'replies': '回复',
                    'reply': '回复',
                    'Login success!': '登录成功!',
                    'Please input username and password!': '请输入用户名和密码!',
                    'Login': '登录',
                    'Logging...': '登录中...',
                    'Empty...': '暂无内容...',
                    'Read More...': '查看更多...',
                    'register now!': '注册',
                    'Please input ': '请输入',
                    'Added!': '添加成功!',
                    'Updated!': '更新成功!',
                    'Disable': '禁用',
                    'Enable': '启用',
                    'Update': '更新',
                    'Edit': '编辑',
                    'Welcome!': '欢迎!',
                    'Thanks for using, created by': '感谢使用',
                    'Start': '开始',
                    'coming soon...': '马上就来...',
                    'Custom theme': '自定义主题',
                    'More': '更多',
                    'Others': '其他',
                    'Overview': '总览',
                    'Articles': '文章',
                    'Comments': '评论',
                    'version': '版本',
                    'Upgrade': '更新至',
                    'Events': '事件',
                    'News': '新闻',
                    'Loadding...': '加载中...',
                    'Login and register': '登录与注册',
                    'Use register': '启用注册',
                    'If you close, you will not be able to register on the web page.': '如果关闭, 当前网站将无法使用注册功能。',
                    'Home': '首页',
                    'Users': '用户',
                    'Groups': '分组',
                    'Error! Check network!': '请检查网络是否畅通!',
                    'Please input something!': '请检查输入信息是否正确!',
                    'username': '用户名',
                    'search by username...': '通过用户名搜索...',
                    'Clear': '重置',
                    'Lost page in the universe.': '页面丢失在宇宙中。',
                    'It may have been captured by': '这个页面可能被',
                    'E.T.': '外星人劫走了',
                    'or killed by a passing': '或者被路过的',
                    'Thanos': '灭霸杀掉了',
                    'Run': '快跑',
                    'Do you want to recover?': '需要恢复么?',
                    'You have some uncommitted content. Do you need to restore it?': '您有一些尚未提交的内容, 是否需要恢复它?',
                    'Published!': '发表成功!',
                    'Cancel': '取消',
                    'Submit': '发表',
                    'Please input title!': '请检查标题是否输入!',
                    'Please input title...': '请输入标题...',
                    'Please input content!': '请检查文章内容是否输入!',
                    'Register success!': '注册成功!',
                    'Uh-oh! Something is bad...': '注册失败...',
                    'Register': '注册',
                    'Must input your username!': '请检查用户名是否输入!',
                    'Input your username...': '请输入用户名...',
                    'Must input your nickname!': '请检查昵称是否输入!',
                    'Input your nickname...': '请输入昵称...',
                    'Must input your password!': '请检查密码是否输入!',
                    'Input your password...': '请输入密码...',
                    'Password is same! Please input other password!': '请重新输入新密码! 确保新老密码不同!',
                    'Reset success!': '重置成功!',
                    'Please try again later!': '请稍后重试!',
                    'Please check whether the two passwords are the same!': '请检查两次输入的新密码是否相同!',
                    'Old password': '旧密码',
                    'Please input your password!': '请检查密码是否输入!',
                    'New password': '新密码',
                    'Please input your new password!': '请检查新密码是否输入!',
                    'Input your new password...': '请输入新密码...',
                    'Please input your new password, agin!': '请再次输入新密码!',
                    'Input agin..': '请再次输入新密码...',
                    'Resetting': '重置中...',
                    'Reset': '重置',
                    'Update error!': '更新失败!',
                    'You can only upload JPG/PNG file!': '您只能上传 JPG/PNG 格式的图片!',
                    'Image must smaller than ': '图片必须小于',
                    'Avatar uploading...': '头像上传中...',
                    'Upload success!': '上传成功!',
                    'Avatar': '头像',
                    'Bio': '简介',
                    'Username': '用户名',
                    'Input your name, like\'s your nickname. Does not change the \'username\' used to login.': '请输入您昵称, 这不会更改用于登录的用户名。',
                    'Input something you like. This will be shown on your home page.': '请输入一些您喜欢的话。这将在您的首页进行展示。',
                    'Input your name...': '请输入名称...',
                    'Input something you like...': '请输入一些喜欢的话...',
                    'URL': '社交主页',
                    'Input your homepage url...': '请输入社交首页的url地址....',
                    'System': '后台管理',
                    'Background management system': '后台管理系统',
                    'You haven\'t signed in yet, ': '您需要登录后访问, ',
                    'to login': '登录',
                    'change avatar': '修改头像',
                    'Reset Password': '重置密码',
                    'Publish articles': '发表文章',
                    'Manage users and articles.': '管理用户与文章。',
                }
            },
            'en': {
                translations: {

                }
            }
        },
        fallbackLng: 'en',
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;