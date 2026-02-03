/**
 * @fileoverview Teleprompter App Mock
 * @description 修复网络请求，欺骗 App 保存成功
 */

let req = {};
let title = "Draft Script";
let text = "Content saved via QX Mock";
let userId = 0;

// 1. 安全解析 Body
try {
    if ($request.body) {
        req = JSON.parse($request.body);
        title = req.title || title;
        text = req.text || text;
        userId = req.user_id || userId;
    }
} catch (e) {
    console.log("⚠️ Mock Error: " + e);
}

// 2. 生成随机 ID
const mockId = Math.floor(Math.random() * 90000000) + 10000000;
const now = new Date();
const timeString = now.toISOString().replace('T', ' ').substring(0, 19);

// 3. 构造响应
const responseBody = {
    "status": 1,
    "script": {
        "id": mockId,
        "title": title,
        "script": text,
        "user_id": userId,
        "created_at": timeString,
        "updated_at": null
    }
};

$done({
    status: 200,
    headers: {
        "Content-Type": "application/json",
        "Date": now.toUTCString(),
        "Server": "QuantumultX-Mock"
    },
    body: JSON.stringify(responseBody)
});
