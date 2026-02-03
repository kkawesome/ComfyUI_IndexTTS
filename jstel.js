/**
 * Teleprompter - 彻底阻断上传 Mock 脚本
 * 模式：script-echo-response (必须)
 */

const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');
const timeStr = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

// 1. 解析 App 发出的真实数据（为了“骗”得更像）
// 比如 App 想保存标题为 "Demo"，我们就回给它 "Demo"，这样它才不会报错
let realBody = {};
let action = "unknown";

try {
    if ($request.body) {
        realBody = JSON.parse($request.body);
        action = realBody.script || "unknown"; // 获取操作类型 (add/update/get)
    }
} catch (e) {
    console.log("[Mock] Body 解析失败，使用默认值");
}

console.log(`🛡️ [Echo] 拦截操作: ${action} | 标题: ${realBody.title || "N/A"}`);

// 2. 构造通用 ID
// 如果请求里有 ID (更新操作)，就返回原来的 ID；如果是新增，就造一个
const finalId = realBody.id || 88888888;

// 3. 构造 Mock 响应
// 融合了你方案二的优点：针对性返回
const responseBody = {
    "status": 1,
    "success": true, // 额外加的，有些 App 喜欢看这个
    "script": {
        "id": finalId,
        "title": realBody.title || "Local Mock Script",
        "script": realBody.text || realBody.script || "Content saved locally",
        "user_id": realBody.user_id || realBody.userID || 0,
        "created_at": timeStr,
        "updated_at": timeStr,
        "is_premium": true,
        "sync_status": "synced"
    },
    // 针对 GET 请求，返回列表结构
    "scripts": [
        {
            "id": finalId,
            "title": realBody.title || "Local Mock Script",
            "script": "Content saved locally",
            "user_id": 0,
            "created_at": timeStr
        }
    ]
};

const headers = {
    "Content-Type": "application/json",
    "Connection": "keep-alive",
    "Date": now.toUTCString(),
    "Server": "QX-Echo-Blocker",
    "Access-Control-Allow-Origin": "*"
};

// 4. 直接返回 (Echo 模式)
// QX 看到这个 $done({response:...}) 就会直接回复 App，不连网
$done({
    response: {
        status: 200,
        headers: headers,
        body: JSON.stringify(responseBody)
    }
});
