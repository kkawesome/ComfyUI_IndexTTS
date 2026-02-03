// Quantumult X Mock for Teleprompter Save API
// 拦截 POST https://api.teleprompterapp.com/

// 1. 确保只处理POST请求
if ($request.method !== 'POST') {
    console.log(`⚠️ Mock skipped: Not a POST request (${$request.method})`);
    $done($request);
    return;
}

// 2. 默认值
let req = {};
let title = "Draft Script";
let text = "Content saved via QX Mock";
let userId = 0;

// 3. 安全解析Body
try {
    if ($request.body) {
        req = JSON.parse($request.body);
        console.log(`📝 Parsed request: script="${req.script}", user_id=${req.user_id}`);
        
        if (req.script === 'add') {
            title = req.title || title;
            text = req.text || text;
            userId = req.user_id || userId;
        } else {
            console.log(`⚠️ Not a script add request: ${JSON.stringify(req)}`);
            $done($request);
            return;
        }
    } else {
        console.log('⚠️ No body in request');
        $done($request);
        return;
    }
} catch (e) {
    console.log(`❌ Parse error: ${e.message}`);
    $done($request);
    return;
}

// 4. 生成模拟数据
const mockId = Math.floor(Math.random() * 90000000) + 10000000;
const now = new Date();

// 重要！使用原响应完全相同的格式: "2026-02-03 04:48:17"
const pad = (n) => n.toString().padStart(2, '0');
const timeString = `${now.getUTCFullYear()}-${pad(now.getUTCMonth() + 1)}-${pad(now.getUTCDate())} ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;

// 5. 构造响应（尽量接近原始格式）
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

console.log(`✅ Mock response generated: ID=${mockId}, Title="${title}"`);

// 6. 返回响应（注意：原响应头很关键）
$done({
    status: 200,
    headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(responseBody).length.toString(),
        "Connection": "keep-alive",
        "Date": now.toUTCString(),
        "Server": "nginx/1.18.0",  // 猜测服务器类型，原响应没显示
        "X-Powered-By": "QuantumultX Mock"
    },
    body: JSON.stringify(responseBody)
});
