const path = require('path');

// 获取当前工作目录，从相对路径中解析绝对路径
const resolvePath = relativePath => path.join(process.cwd(), relativePath);

module.exports = {
	resolvePath,
};
