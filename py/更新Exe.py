
import subprocess
import sys
import os
import traceback
import requests
from datetime import datetime

# 加密
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from pathlib import Path




'''
# 範用版
import os
if __name__ == "__main__":

  print("0.ico必須與.py檔同一個資料夾")
  exe名 = input("請輸入.py檔名(不需要.py)：")
  封裝exe指令 = f'pyinstaller -F -i 0.ico {exe名}.py -n {exe名}'
  process = os.popen(封裝exe指令)

'''




































def _顯示說明(說明):

      say = f'''
                _\|/_
                (o o)
        +----oOO--U--OOo--------------------------------------+
        |                                                     |
            {說明}                 
        |                                                     | 
        |                                                     |
        +-----------------------------------------------------+
        '''
      return say


def _檢查Admin模式(文件路径,找的值):
    try:
        with open(文件路径, 'r', encoding='utf-8') as f:
            for 行 in f:
                if 找的值 in 行:
                    # 分割等号后的内容并去除首尾空格/换行符
                    结果值 = 行.split('=', 1)[1].strip()
                    return 结果值
        print(f"未找到包含 {找的值} 的行")
        return None
    except FileNotFoundError:
        print(f"請在 {文件路径} 同層執行此程式")
        return None


def _封裝前檢查ALL():
  版本 = ''
  # 確認Admin模式關閉
  admin模式值 = ['遠端鍠_colab.py','Goldcome.py']
  for 文件名 in admin模式值:
    if _檢查Admin模式(文件名,'Admin模式 =') != 'False':
        input(_顯示說明(f"請先關掉 {文件名} admin模式，再執行"))
        sys.exit()
    else:
        print(f"Admin模式已關 = {文件名}")
  print('-'*18)

  # 確認版本號
  版本號值 = ['遠端鍠_colab.py','Goldcome.py','py.js']
  版本列表 = []

  for 文件版本 in 版本號值:
    版號 = _檢查Admin模式(文件版本,"更新日期 =")
    版本列表.append(版號.strip("'"))
    print(f"{版號} = {文件版本}") 
  if not len(set(版本列表)) <= 1:# 使用 set 去重对比 檢查元素一致性
    input(_顯示說明(f"請先修改版本號，再執行"))
    sys.exit()
  else:
    print("版本號一致")
    版本 = 版本列表[0]

  print('-'*18)

  # 檔存在检查
  for 檔名 in 檔值:
    if not os.path.exists(檔名):
      input(_顯示說明(f"請先將{檔名}放在本層資料夾，再執行"))
      sys.exit()
    else:
      print(f"檔案存在 = {檔名}")
  print('-'*18)

  return 版本






































class _自動更新GitHub:
    # 初始設定
    def __init__(self, token, repo_owner, repo_name, branch="main"):
        self.token = token
        self.repo_owner = repo_owner
        self.repo_name = repo_name
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json"
        }
        # up文件用


    # 自動生成更新內容(可自定義規則)
    def _get_changelog(self):
        # 獲取最近 5 次提交對象列表
        commits = list(self.repo.iter_commits(max_count=5))
        changelog = "本次更新包含以下提交：\n"
        # 將每個提交的摘要轉換為條目
        changelog += "\n".join([f"- {commit.summary}" for commit in commits])
        return changelog

    # 自動生成版本信息
    def create_release(self, exe_path, 說明=None): 
        tag_name = f"v{現在版本號}"
        release_name = f"版本 {現在版本號} 自動發布"
        
        # 準備發布內容
        data = {
            "tag_name": tag_name,
            "name": release_name,
            "body": 說明 if 說明 else f"自動發布版本 {現在版本號}",  # 優先使用手動內容
            "draft": False,
            "prerelease": False
        }

        # 創建 Release
        create_url = f"https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/releases"
        response = requests.post(create_url, headers=self.headers, json=data)
        
        if response.status_code != 201:
            raise Exception(f"創建 Release 失敗: {response.text}")

        upload_url = response.json()["upload_url"].split("{")[0]

        # 上傳 EXE 文件
        with open(exe_path, "rb") as f:
            file_name = os.path.basename(exe_path)
            params = {"name": file_name}
            headers = self.headers.copy()
            headers["Content-Type"] = "application/octet-stream"
            
            upload_response = requests.post(
                upload_url,
                headers=headers,
                params=params,
                data=f.read()
            )

            if upload_response.status_code not in [201, 200]:
                raise Exception(f"上傳文件失敗: {upload_response.text}")

        print(f"成功發布 [ {exe名}.exe ] 版本 {現在版本號} ！")
        print(f"下載連結: {response.json()['html_url']}")
        print('-'*18)

    # ------------- up文件用 ------------- $
    def _up文件用(self,FILE_PATH,TARGET_PATH,時間): 
        # === GitHub API ===
        API_URL = f'https://api.github.com/repos/{self.repo_owner}/{self.repo_name}/contents/{TARGET_PATH}'
        headers = {
            'Authorization': f'token {GITHUB_TOKEN}',
            'Accept': 'application/vnd.github+json'
        }

        # 讀取檔案並進行 base64 編碼
        with open(FILE_PATH, 'rb') as f:
            content = base64.b64encode(f.read()).decode('utf-8')

        # 先嘗試取得檔案的 SHA（判斷是更新還是新增）
        response = requests.get(API_URL, headers=headers)
        if response.status_code == 200:
            sha = response.json()['sha']
            action = "更新"
        else:
            sha = None
            action = "新增"

        # 建立 payload
        data = {
            'message': f'{時間} {action} {FILE_PATH}',
            'content': content,
            'branch': 'main'
        }
        if sha:
            data['sha'] = sha

        # 發送 PUT 請求上傳
        response = requests.put(API_URL, headers=headers, json=data)

        # 顯示結果
        if response.status_code in [200, 201]:
            print(f'✅ {TARGET_PATH}已成功{action}到 GitHub。')
        else:
            print(f'❌ {TARGET_PATH} 上傳失敗: {response.status_code}\n{response.text}')




































































class TokenEncryptor:
    @staticmethod
    def generate_key(password: str, salt: bytes = None) -> bytes:
        """通过密码生成加密密钥"""
        # 生成新盐值（当salt为None时）
        if salt is None:
            salt = os.urandom(16)
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=480000,
        )
        return base64.urlsafe_b64encode(kdf.derive(password.encode()))

    @classmethod
    def encrypt_token(cls, token: str, password: str) -> bytes:
        """加密 GitHub Token"""
        # 生成随机盐值
        salt = os.urandom(16)
        key = cls.generate_key(password, salt)
        cipher = Fernet(key)
        encrypted_data = cipher.encrypt(token.encode())
        # 将盐值与加密数据合并存储
        return salt + encrypted_data  # 前16字节为salt，后面为加密数据

    @classmethod
    def decrypt_token(cls, encrypted: bytes, password: str) -> str:
        """解密 GitHub Token"""
        try:
            # 从加密数据中提取盐值
            salt = encrypted[:16]       # 前16字节
            encrypted_data = encrypted[16:]  # 实际加密数据
            key = cls.generate_key(password, salt)
            cipher = Fernet(key)
            return cipher.decrypt(encrypted_data).decode()
        except Exception as e:
            raise ValueError("解密失败，请检查密码或文件完整性") from e
        

    def _TOKEN文件():
        # 首次使用時生成加密文件（獨立運行）
        if not Path("00.enc").exists():
            token = input("請輸入原始 GitHub Token: ")
            password = input("設置加密密碼: ")
            # 生成含盐值的加密数据
            encrypted = TokenEncryptor.encrypt_token(token, password)
            # 保存到单个文件
            with open("00.enc", "wb") as f:
                f.write(encrypted)
            print(f"加密文件已生成，請將密碼存入環境變量：")

    def _讀取github_token(加密密碼):
        """安全讀取加密的 GitHub Token"""
        try:
            # 從環境變量獲取密碼
            加密密碼 = 加密密碼 or os.getenv("GITHUB_TOKEN_KEY")
            # 讀取完整加密數據（含盐值）
            with open("00.enc", "rb") as f:
                encrypted_data = f.read()
                
            if len(encrypted_data) < 16:
                raise ValueError("加密文件已損壞")
            # 解密（自动提取盐值）
            return TokenEncryptor.decrypt_token(encrypted_data, 加密密碼)
        except FileNotFoundError:
            raise RuntimeError(f"加密 Token 文件不存在") from None
        except Exception as e:
            raise RuntimeError(f"讀取 Token 失敗：{str(e)}") from e






































if __name__ == "__main__":

  try:
    TokenEncryptor._TOKEN文件()

    檔值 = ['Goldcome.py','0.ico']
    exe名 = 檔值[0].replace('.py', '')
    現在版本號 = _封裝前檢查ALL()

    # 封裝exe
    加密密碼 = input('始封裝並更新...')  
    print('封裝中...請不要關閉此視窗')
    GITHUB_TOKEN = TokenEncryptor._讀取github_token(加密密碼)
    封裝exe指令 = f'pyinstaller -F -i {檔值[1]} {檔值[0]} -n {exe名}'
    process = subprocess.run(
        封裝exe指令,
        shell=True,
        check=True,
        creationflags=subprocess.CREATE_NO_WINDOW if sys.platform == 'win32' else 0
    )
    print(f"{exe名}.exe 封裝完成！")
    print('-'*18)

    # 發布到GitHub Release
    EXE_PATH = f"dist/{exe名}.exe"  # EXE文件路徑
    更新說明 = None # 若為空則使用自動生成內容
    try:
        manager = _自動更新GitHub(GITHUB_TOKEN, "GoldComeHK", "GoldComeHK.github.io")
        manager.create_release(EXE_PATH, 說明=更新說明)
    except Exception as e:
        traceback.print_exc()

    # 時間生成
    now = datetime.now()
    現在時間 = now.strftime("[%Y-%m-%d|%H:%M:%S]")
    # up其他文件用
    files_to_upload = [
        (("Goldcome.py"), "py/Goldcome.py"),
        (("遠端鍠_colab.py"), "py/遠端鍠_colab.py"),
        (("更新Exe.py"), "py/更新Exe.py"),
        (("py.js"), "py/py.js"),
        (("../index.html"), "index.html"),
        (("../set.html"), "set.html"),
        (("../0.html"), "0.html"),
        (("../1.html"), "1.html"),
        (("../2.html"), "2.html"),
        (("../3.html"), "3.html"),
        (("../4.html"), "4.html"),
        (("../html.js"), "html.js"),
        (("../html.css"), "html.css")
    ]
    for 本地文件路径, 仓库目标路径 in files_to_upload:
        manager._up文件用(本地文件路径, 仓库目标路径, 現在時間)
        

  except Exception as e:
      # 打印完整錯誤堆棧
      traceback.print_exc()
      sys.exit(1)

  input("成功發布，按任意鍵退出...")
  sys.exit(1)
        

