/**
 * Quantumult X Echo Mock - 修正版
 * 修复：移除 response 包裹，确保 Echo 模式生效，强制断网。
 */

const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const timeStr = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

// 1. 解析请求
let realBody = {};
let action = "unknown";
try {
    if ($request.body) {
        realBody = JSON.parse($request.body);
        action = realBody.script || "unknown";
    }
} catch (e) {}

console.log(`🛡️ [Echo] 拦截生效: ${action} | 标题: ${realBody.title || "N/A"}`);

// 2. 构造数据
const mockId = 88888888;
const responseBody = {
    "status": 1,
    "success": true,
    "script": {
        "id": mockId,
        "title": realBody.title || "Local Mock",
        "script": realBody.text || realBody.script || "Saved locally (No Upload)",
        "user_id": realBody.user_id || 0,
        "created_at": timeStr,
        "updated_at": timeStr,
        "is_premium": true,
        "sync_status": "synced"
    },
    "scripts": [
        {
            "id": mockId,
            "title": "Local Mock",
            "script": "Saved locally",
            "user_id": 0,
            "created_at": timeStr
        }
    ]
};

const headers = {
    "Content-Type": "application/json",
    "Connection": "keep-alive",
    "Date": now.toUTCString(),
    "Server": "QX-Mock-Blocker",
    "Access-Control-Allow-Origin": "*"
};

// 3. 直接返回 (关键修正：去掉 response 外壳)
$done({
    status: 200,
    headers: headers,
    body: JSON.stringify(responseBody)
});
