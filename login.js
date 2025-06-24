




/*  規則

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /users/{userId} {
// 允许用户读写自己的数据
allow read, write: if request.auth != null &&
request.auth.uid == userId;


  // 允许管理员读写所有用户数据（测试阶段暂不强制MFA）
  allow read, write: if isAdmin(request.auth.uid);
  
  match /{subCollection}/{docId} {
    allow read, write: if request.auth != null && 
                       (request.auth.uid == userId || isAdmin(request.auth.uid));
  }
}

match /admins/{adminId} {
  allow read: if isAdmin(request.auth.uid);
  allow write: if false;
}

function isAdmin(uid) {
  return exists(/databases/$(database)/documents/admins/$(uid));
}


}
}

*/ 



































const 新用戶送分 = 100; //202505152140
const 推廣送分 = 25; //202505152140























/*
          :::        :::::::::       :::::::::::
       :+: :+:      :+:    :+:          :+:
     +:+   +:+     +:+    +:+          +:+
   +#++:++#++:    +#++:++#+           +#+
  +#+     +#+    +#+                 +#+
 #+#     #+#    #+#                 #+#
###     ###    ###             ###########

*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc,
    updateDoc,
    increment 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
// 记录登入
import { 
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyDsfMDe0faS58jTTrd8iefsUF66bd1mnzA",
    authDomain: "goldcomehk20250561544qqq.firebaseapp.com",
    projectId: "goldcomehk20250561544qqq",
    storageBucket: "goldcomehk20250561544qqq.appspot.com",
    messagingSenderId: "690441786277",
    appId: "1:690441786277:web:1e79f68b2c906ac9428e4c",
    measurementId: "G-Q62XJZ5THV"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);






























/*
     :::    :::       ::::::::       ::::::::::       :::::::::                       :::::::::       ::::::::       :::    :::
    :+:    :+:      :+:    :+:      :+:              :+:    :+:                      :+:    :+:     :+:    :+:      :+:    :+:
   +:+    +:+      +:+             +:+              +:+    +:+                      +:+    +:+     +:+    +:+       +:+  +:+
  +#+    +:+      +#++:++#++      +#++:++#         +#++:++#:                       +#++:++#+      +#+    +:+        +#++:+
 +#+    +#+             +#+      +#+              +#+    +#+                      +#+    +#+     +#+    +#+       +#+  +#+
#+#    #+#      #+#    #+#      #+#              #+#    #+#                      #+#    #+#     #+#    #+#      #+#    #+#
########        ########       ##########       ###    ###      ##########      #########       ########       ###    ###

*/
// 監聽登入狀態
onAuthStateChanged(auth, async (user) => {
    if (user) {

        document.getElementById('login-form').style.display = 'none';
        // 選取所有具有 class="user-email" 的元素
        document.querySelectorAll('.user-email').forEach(element => {
            element.textContent = user.email;
        });

        document.querySelectorAll('.userId').forEach(element => {
            element.textContent = user.uid;
        });
        
        
        // 检查是否是管理员
        const isAdmin = await checkAdmin();
        if (isAdmin) {
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';
        await loadAllUsers(); // 加载所有用户数据
        showSuccess("管理员登录成功");
        } else {
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('admin-panel').style.display = 'none';
        }
        
        // 公共加载部分
        await loadUserScore(user.uid);
        await recordLogin(user.uid);
        await loadLoginHistory(user.uid);

        


    } else {
        // 用户未登录状态
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'none';
    }
    });






























/*
       #                    #             #            #    #       
       #            ##########         #  #         #  #  # #       
      # #           #       #          #   #         # # #  #       
     #   #          #       #         #    #           #   #    #   
    #     #         #########         #     #      ###############  
   #       #                 #       #       #        ##  #    #    
  # ####### ###    ############     #         #      # ##  #   #    
##           #     #         #     #  ####### ###   #  # # #   #    
           #       #    #    #    #    #    #  #      #    #   #    
  ###########      #    #    #         #    #      ####### #  #     
      #            #    #    #         #    #        #   #  # #     
      #            #    #    #         #    #        #   #   #      
     #   #         #   #     #         #    #         # #   # #     
    #     #           #   ##          #     #         ##   #   #    
   #########        ##      ##       #   # #         #  # #    ###  
           #      ##          #     #     #         #    #      #   

*/
// 載入用戶分數 (修改為使用「會員分數」字段)
async function loadUserScore(userId) {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            document.querySelectorAll('.user-score').forEach(element => {
                element.textContent = userSnap.data().會員分數 || 0;
            });
        } else {
            // 新用戶初始化
            await setDoc(userRef, {
                email: auth.currentUser.email,
                會員分數: 新用戶送分  // 新用戶送100分
            });
            document.querySelectorAll('.user-score').forEach(element => {
                element.textContent = 0;
            });
        }
    } catch (error) {
        showDbError("載入分數失敗: " + error.message);
    }
}

// 兌換獎勵 (修改為檢查「會員分數」字段)
// const result = await redeemPoints(最多找資料數);
window.redeemPoints = async (pointsToRedeem) => {
    const userId = auth.currentUser.uid;

    pointsToRedeem = Number(pointsToRedeem);
    
    // 檢查傳入的 pointsToRedeem 是否有效
    if (typeof pointsToRedeem !== 'number' || isNaN(pointsToRedeem) || pointsToRedeem <= 0) {
        showDbError("請輸入有效的正整數分數");
        return { success: false, message: "無效的分數" };
    }

    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        const currentScore = userSnap.data().會員分數 || 0;  // 使用中文字段
        
        if (currentScore < pointsToRedeem) {
            showDbError(`分數不足 (需要 ${pointsToRedeem} 分)`);
            return { success: false, message: "分數不足" };
        }
        
        if (pointsToRedeem <= 0) {
            showDbError("使用分數必須大於 0");
            return { success: false, message: "使用分數必須大於 0" };
        }
        
        await updateDoc(userRef, {
            "會員分數": increment(-pointsToRedeem)  // 使用中文字段
        });
        await loadUserScore(userId);
        showSuccess(`已使用 ${pointsToRedeem} 分`);

        // 返回成功狀態及相關數據
        return { 
            success: true, 
            pointsUsed: pointsToRedeem, 
            remainingPoints: currentScore - pointsToRedeem 
        };
    } catch (error) {
        showDbError("使用失敗: " + error.message);
        return { success: false, error: error.message }; // 返回錯誤訊息
    }
};






























/*
        #             #                                       #     
  ##### #  #           #            #         #      ###########    
      # # #             #            # #########              #     
   #  #  #  #           #            #        #               #     
    ##   # #            #                     #       #########     
    #     #            # #                    #               #     
   #########           # #        ####        #               # #   
  #       # ###        # #           #  #######    ###############  
##  ######## #        #   #          #  #     #           #    #    
    #     #           #   #          #  #             #   #   #     
    #     #          #     #         #  #              #  ## #      
    #######          #     #         #  #       #       # # #       
     #   #          #       #        # ##       #      #  #  #      
      # #   #      #        #        ## #       #     #   #   ####  
 #############    #          ###     #   ########   ##  # #     #   
                 #            #                          #          

*/

// 新增：记录登入信息
async function recordLogin(userId) {
    try {
        const historyRef = collection(db, "users", userId, "loginHistory");
        
        // 获取客户端信息
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        
        await addDoc(historyRef, {
            登入時間: new Date(),
            ipAddress: ipData.ip || '未知',
            userAgent: navigator.userAgent,
            deviceType: getDeviceType()
        });
    } catch (error) {
        console.error("记录登入失败:", error);
    }
}

// 新增：加载登入历史
async function loadLoginHistory(userId) {
    try {
        const historyRef = collection(db, "users", userId, "loginHistory");
        const q = query(historyRef, orderBy("登入時間", "desc"), limit(5));
        const querySnapshot = await getDocs(q);
        
        const historyContainer = document.getElementById('login-history');
        historyContainer.innerHTML = '';
        
        if (querySnapshot.empty) {
            historyContainer.innerHTML = '<p>暂无登入记录</p>';
            return;
        }
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const time = data.登入時間.toDate().toLocaleString();
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <strong>${time}</strong><br>
                设备: ${data.deviceType || '未知'} | 
                IP: ${data.ipAddress || '未知'}
            `;
            historyContainer.appendChild(item);
        });
    } catch (error) {
        console.error("加载历史失败:", error);
        document.getElementById('login-history').innerHTML = 
            '<p class="error">加载记录失败</p>';
    }
}

// 辅助函数：检测设备类型
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "平板";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "手机";
    }
    return "电脑";
}






























/*
          :::        :::::::::         :::   :::       :::::::::::       ::::    :::
       :+: :+:      :+:    :+:       :+:+: :+:+:          :+:           :+:+:   :+:
     +:+   +:+     +:+    +:+      +:+ +:+:+ +:+         +:+           :+:+:+  +:+
   +#++:++#++:    +#+    +:+      +#+  +:+  +#+         +#+           +#+ +:+ +#+
  +#+     +#+    +#+    +#+      +#+       +#+         +#+           +#+  +#+#+#
 #+#     #+#    #+#    #+#      #+#       #+#         #+#           #+#   #+#+#
###     ###    #########       ###       ###     ###########       ###    ####

*/








// 检查管理员权限
async function checkAdmin() {
try {
const adminRef = doc(db, "admins", auth.currentUser.uid);
const snapshot = await getDoc(adminRef);
console.log("Admin check:", {
uid: auth.currentUser.uid,
isAdmin: snapshot.exists(),
data: snapshot.data()
});
return snapshot.exists();
} catch (error) {
console.error("Admin check failed:", error);
return false;
}
}

// 加载所有用户数据
async function loadAllUsers() {
const usersSnapshot = await getDocs(collection(db, "users"));
const tableBody = document.querySelector("#users-table tbody");
tableBody.innerHTML = "";

usersSnapshot.forEach(async (userDoc) => {
const userData = userDoc.data();
const loginHistoryRef = collection(db, "users", userDoc.id, "loginHistory");
const lastLogin = await getLastLogin(loginHistoryRef);

const row = `
<tr>
  <td>${userData.email || userEmail || '未提供'}<br>${userDoc.id}</td>
  <td>
    <span id="score-${userDoc.id || userId}">${userData.會員分數 || 0}</span>
    <br>
    <input type="number" id="score-input-${userDoc.id || userId}" placeholder="分數" style="width: 50px;">
    <button onclick="changeScore('${userDoc.id || userId}', document.getElementById('score-input-${userDoc.id || userId}').value)">改</button>
  </td>
  <td>${lastLogin || '无记录'}</td>
</tr>
`;
tableBody.innerHTML += row;
});
}

// 修改用户分数
async function changeScore(userId, delta) {
if (!(await checkAdmin())) {
showDbError("权限不足：需要管理员权限");
return;
}

try {
const userRef = doc(db, "users", userId);
await updateDoc(userRef, {
"會員分數": increment(delta)
});
showSuccess(`已成功修改用户 ${userId} 的分数`);
await loadAllUsers(); // 刷新列表
} catch (error) {
showDbError("修改分数失败: " + error.message);
}
}
// 将函数绑定到window对象
window.changeScore = changeScore;





// 获取最后登录时间
async function getLastLogin(historyRef) {
const q = query(historyRef, orderBy("登入時間", "desc"), limit(1));
const snapshot = await getDocs(q);
return snapshot.empty ? null : snapshot.docs[0].data().登入時間.toDate().toLocaleString();
}

// 搜索用户功能
window.searchUsers = async () => {
if (!(await checkAdmin())) {
showDbError("权限不足：需要管理员权限");
return;
}

const searchTerm = document.getElementById('search-user').value.trim();
if (!searchTerm) {
showDbError("请输入搜索内容");
return;
}

try {
const usersSnapshot = await getDocs(collection(db, "users"));
const tableBody = document.querySelector("#users-table tbody");
tableBody.innerHTML = "";

let foundUsers = 0;

// 遍历所有用户进行筛选
for (const userDoc of usersSnapshot.docs) {
const userData = userDoc.data();
const userId = userDoc.id;
const userEmail = userData.email || '';

// 检查是否匹配ID或邮箱
if (userId.includes(searchTerm) || userEmail.includes(searchTerm)) {
const loginHistoryRef = collection(db, "users", userId, "loginHistory");
const lastLogin = await getLastLogin(loginHistoryRef);

const row = `
<tr>
  <td>${userData.email || userEmail || '未提供'}<br>${userId}</td>
  <td>
    <span id="score-${userDoc.id || userId}">${userData.會員分數 || 0}</span>
    <br>
    <input type="number" id="score-input-${userDoc.id || userId}" placeholder="分數" style="width: 50px;">
    <button onclick="changeScore('${userDoc.id || userId}', document.getElementById('score-input-${userDoc.id || userId}').value)">改</button>
  </td>
  <td>${lastLogin || '无记录'}</td>
</tr>
`;
tableBody.innerHTML += row;
foundUsers++;
}
}

if (foundUsers === 0) {
tableBody.innerHTML = '<tr><td colspan="5">未找到匹配的用户</td></tr>';
} else {
showSuccess(`找到 ${foundUsers} 个匹配用户`);
}
} catch (error) {
showDbError("搜索失败: " + error.message);
}
};



































/*
      :::        ::::::::       ::::::::       :::::::::::       ::::    :::
     :+:       :+:    :+:     :+:    :+:          :+:           :+:+:   :+:
    +:+       +:+    +:+     +:+                 +:+           :+:+:+  +:+
   +#+       +#+    +:+     :#:                 +#+           +#+ +:+ +#+
  +#+       +#+    +#+     +#+   +#+#          +#+           +#+  +#+#+#
 #+#       #+#    #+#     #+#    #+#          #+#           #+#   #+#+#
########## ########       ########       ###########       ###    ####

*/
window.loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        showError(translateError(error.code));
    }
};

window.logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        showError(translateError(error.code));
    }
};

// 錯誤處理函數保持不變
function translateError(code) {
    const errors = {
        "auth/invalid-credential": "帳號或密碼錯誤",
        "auth/network-request-failed": "網路連線失敗",
        "auth/operation-not-allowed": "此登入方式未啟用"
    };
    return errors[code] || "發生未知錯誤";
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    setTimeout(() => document.getElementById('error-message').textContent = '', 5000);
}

function showDbError(message) {
    document.getElementById('db-error-message').textContent = message;
    setTimeout(() => document.getElementById('db-error-message').textContent = '', 5000);
}

function showSuccess(message) {
    document.getElementById('success-message').textContent = message;
    setTimeout(() => document.getElementById('success-message').textContent = '', 5000);
}