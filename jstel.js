/**
 * Quantumult X Mock - 盲人拦截版
 * 修复：遇到大文件上传导致 JSON 解析失败时，不再放行，而是依旧强制返回成功。
 */

const mockId = 99999999;
const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
// 构造 App 喜欢的时间格式
const timeString = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

// 构造一个“万能”的成功响应
// 不管 App 发什么，我们都回这一段
const responseBody = {
    "status": 1,
    "script": {
        "id": mockId,
        "title": "Local Mock Script", // 甚至懒得读取原来的标题
        "script": "Content saved locally (Mock)", 
        "user_id": 0,
        "created_at": timeString,
        "updated_at": null
    }
};

const headers = {
    "Content-Type": "application/json",
    "Connection": "keep-alive",
    "Date": now.toUTCString(),
    "Server": "QX-Mock",
    "Content-Length": JSON.stringify(responseBody).length.toString()
};

// 【核心修改】
// 没有任何 if 判断，没有任何 JSON.parse
// 只要请求撞到枪口上，直接拦截，返回 200 OK
console.log("🛑 Mock 拦截生效：已阻止上传，直接返回成功。");

$done({
    status: 200,
    headers: headers,
    body: JSON.stringify(responseBody)
});
