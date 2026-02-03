/**
 * Teleprompter App - Mock 响应脚本
 * 用于 Quantumult X / Surge / Loon
 */

const mockId = 88888888;
const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const timeString = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

// 构造 Mock 数据
const mockData = {
    "status": 1,
    "script": {
        "id": mockId,
        "title": "Premium Unlocked",
        "script": "Saved successfully via Quantumult X Mock",
        "user_id": 0,
        "created_at": timeString,
        "updated_at": timeString,
        "is_premium": true,
        "expires_at": "2099-12-31 23:59:59"
    }
};

// 标准响应头
const headers = {
    "Content-Type": "application/json",
    "Connection": "keep-alive",
    "Date": now.toUTCString(),
    "Server": "QX-Mock-Server",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "X-Mocked-By": "Quantumult-X"
};

console.log(`[Mock] 拦截请求: ${$request.url}`);
console.log(`[Mock] 返回虚拟数据，ID: ${mockId}`);

// Quantumult X 标准响应格式
$done({
    response: {
        status: 200,
        headers: headers,
        body: JSON.stringify(mockData)
    }
});
