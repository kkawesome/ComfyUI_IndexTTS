/**
 * Quantumult X Mock - 最终完美版
 * Fix: 使用 response 字段包裹，确保不连接服务器，直接本地返回。
 */

// 1. 构造 Mock 数据
const mockId = 88888888;
const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const timeString = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

const responseBody = {
    "status": 1,
    "script": {
        "id": mockId,
        "title": "Final Mock Script",
        "script": "Saved successfully via Quantumult X",
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
    "Access-Control-Allow-Origin": "*"
};

console.log("✅ Mock 拦截成功：已构造虚拟响应返回 App");

// 2. 核心修正：必须用 response 包裹！
// 这样 QX 才知道这是“回信”，而不是“去信”
$done({
    response: {
        status: 200,
        headers: headers,
        body: JSON.stringify(responseBody)
    }
});
