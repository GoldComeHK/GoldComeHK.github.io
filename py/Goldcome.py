
















'''
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
            _\|/_
            (o o)
    +----oOO--U--OOo-------------+
    |                            |
        # All rights reserved by -------------------|       
    |                            |                  |
    +----------------------------+                  |
                                                    V
        :::   :::       ::::::::       :::    :::           :::        :::    :::       :::::::::::
      :+:+: :+:+:     :+:    :+:      :+:   :+:          :+: :+:      :+:   :+:            :+:
    +:+ +:+:+ +:+    +:+    +:+      +:+  +:+          +:+   +:+     +:+  +:+             +:+
   +#+  +:+  +#+    +#+    +:+      +#++:++          +#++:++#++:    +#++:++              +#+
  +#+       +#+    +#+    +#+      +#+  +#+         +#+     +#+    +#+  +#+             +#+
 #+#       #+#    #+#    #+#      #+#   #+#        #+#     #+#    #+#   #+#            #+#
###       ###     ########       ###    ###       ###     ###    ###    ###       ###########

https://wa.me/85264071181/?text=莫生我要查詢Goldcome系統
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
'''
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException, StaleElementReferenceException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

from bs4 import BeautifulSoup
from lxml import html

import os
import time
from datetime import datetime
import sys
import re

import traceback #準確捕捉錯誤的具體行號和代碼位置
import requests
import subprocess
import random
import ctypes   # Windows API 阻止系统休眠
import pyperclip    # 剪贴板
import shutil   # 下載Chrome用
import hashlib  # SHA-256 
import base64   # AES 對稱加密
from cryptography.fernet import Fernet

# 自動 send mail
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# 檢查郵件7天已發
# 【Share Link: Sending Email with Python - Monica AI Chat】https://monica.im/share/chat?shareId=zeELHJyoXXQOjfpY
import imaplib
from email.header import decode_header
from datetime import datetime, timedelta







































'''
      ::::::::       :::    :::       :::::::::       ::::::::         :::   :::       ::::::::::
    :+:    :+:      :+:    :+:       :+:    :+:     :+:    :+:       :+:+: :+:+:      :+:
   +:+             +:+    +:+       +:+    +:+     +:+    +:+      +:+ +:+:+ +:+     +:+
  +#+             +#++:++#++       +#++:++#:      +#+    +:+      +#+  +:+  +#+     +#++:++#
 +#+             +#+    +#+       +#+    +#+     +#+    +#+      +#+       +#+     +#+
#+#    #+#      #+#    #+#       #+#    #+#     #+#    #+#      #+#       #+#     #+#
########       ###    ###       ###    ###      ########       ###       ###     ##########
'''

class _chrome_雜項:

    def launch_chrome_with_debug_port(port=9222, user_data_dir=None):
        # 自动识别系统路径
        if os.name == 'nt':
            chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        elif os.name == 'posix':
            chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        else:
            raise OSError("Unsupported OS")

        # 设置临时用户数据目录
        if not user_data_dir:
            user_data_dir = os.path.join(os.getcwd(), "temp_chrome_data")
            os.makedirs(user_data_dir, exist_ok=True)

        # 启动命令
        args = [
            chrome_path,
            f"--remote-debugging-port={port}",
            f"--user-data-dir={user_data_dir}",
            "--no-first-run",
            "--no-default-browser-check",
        ]

        # 启动进程
        process = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        time.sleep(5)  # 确保 Chrome 完全启动
        return process



    @staticmethod
    def _Chrome設定(set=''):

        chrome_proc = None
        初始化浏览器 = None
        try:
            # 使用 set 名稱產生唯一的 user_data_dir
            user_data_dir = os.path.join(os.getcwd(), f"temp_chrome_data_{set or 'default'}")

            # 啟動 Chrome，傳入 user_data_dir
            chrome_proc = _chrome_雜項.launch_chrome_with_debug_port(
                port=9222 if not set else 9223,  # 不同視窗使用不同 port
                user_data_dir=user_data_dir
            )

            # 配置 Chrome options
            chrome_options = webdriver.ChromeOptions()
            chrome_options.add_experimental_option("debuggerAddress", f"127.0.0.1:{9222 if not set else 9223}")

            # 啟用無頭模式（若指定）
            if set:
                chrome_options.add_argument("--headless=new")
                chrome_options.add_argument("--disable-gpu")
            
            初始化浏览器 = webdriver.Chrome(options=chrome_options)
            return 初始化浏览器,chrome_proc

        except Exception as e:
            if 初始化浏览器 is not None:
                初始化浏览器.quit()
            if chrome_proc is not None:
                chrome_proc.terminate()
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())
            return None


    檢元 = 0
    def _檢查元素存在(driver,位置,xpath, timeout=20):
        try:
            元素 = WebDriverWait(driver, timeout).until(
                EC.element_to_be_clickable((By.XPATH, xpath))
            )
            return 元素
        except Exception as e:
            _chrome_雜項.檢元 += 1
            if _chrome_雜項.檢元 > 3:
                _chrome_雜項.檢元 = 0
                _雜項._請告知作者更新(位置, xpath)
            return False



    查點 = 0
    def _檢查點擊(driver,位置,xpath, timeout=10):
        try:
            element = WebDriverWait(driver, timeout).until(
                EC.element_to_be_clickable((By.XPATH, xpath))
            )
            element.click()
            return True
        except Exception as e:
            _chrome_雜項.查點 += 1
            if _chrome_雜項.查點 > 3:
                _chrome_雜項.查點 = 0
                _雜項._請告知作者更新(位置, xpath)
            return False



    檢字 = 0
    def _檢查文字輸入(driver,位置,xpath, text, timeout=10):
        if _chrome_雜項._檢查元素存在(driver,位置,xpath):
            element = WebDriverWait(driver, timeout).until(
                EC.visibility_of_element_located((By.XPATH, xpath))
            )
            element.clear() 
            element.send_keys(text)
            return True
        else:
            _chrome_雜項.檢字 += 1
            if _chrome_雜項.檢字 > 3:
                _chrome_雜項.檢字 = 0
                _雜項._請告知作者更新(位置, xpath)
            return False

















































'''
      ::::::::   :::::::::::       :::    :::       ::::::::::       :::::::::
    :+:    :+:      :+:           :+:    :+:       :+:              :+:    :+:
   +:+    +:+      +:+           +:+    +:+       +:+              +:+    +:+
  +#+    +:+      +#+           +#++:++#++       +#++:++#         +#++:++#:
 +#+    +#+      +#+           +#+    +#+       +#+              +#+    +#+
#+#    #+#      #+#           #+#    #+#       #+#              #+#    #+#
########       ###           ###    ###       ##########       ###    ###
'''


class _ReloadPageException(Exception):
    """自定义异常用于触发页面重载"""
    pass






class _雜項:

    def _請告知作者更新(位置名, xpath):
        print(f'''請告知作者更新:
            https://api.whatsapp.com/send/?phone={官Ws}&text=找不到{位置名}元素[{xpath}]
            ''')

    def _WindowsAPI阻止系统休眠():
        # 定义常量
        ES_CONTINUOUS = 0x80000000
        ES_SYSTEM_REQUIRED = 0x00000001
        ES_DISPLAY_REQUIRED = 0x00000002
        # 阻止系统休眠和关闭显示器
        ctypes.windll.kernel32.SetThreadExecutionState(
            ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_DISPLAY_REQUIRED
        )


    def _獲取詳細錯誤堆棧(exc_type, exc_value, exc_traceback):
        """接收異常信息並打印詳細堆棧"""
        # 提取具體出錯行號和代碼
        tb = traceback.extract_tb(exc_traceback)[-1]  # 最後一層堆棧
        filename = tb.filename        # 文件名
        line_no = tb.lineno           # 行號
        code_line = tb.line           # 錯誤行的代碼內容
        
        # 打印精確錯誤位置
        error_msg = (
            f"錯誤類型: {exc_type.__name__}\n"
            f"錯誤信息: {exc_value}\n"
            f"文件路徑: {filename}\n"
            f"錯誤行號: {line_no}\n"
            f"錯誤代碼: {code_line.strip()}"
        )
        print("=== 錯誤詳情 ===")
        print(error_msg)
        
        # 打印完整堆棧追蹤
        print("\n=== 完整堆棧追蹤 ===")
        traceback.print_exception(exc_type, exc_value, exc_traceback)




    def _執行中說明(id,po文):
        位 = f"""
                const 網位 = document.getElementById('{id}');
                網位.innerHTML = arguments[0];
        """
        driver.execute_script(位, po文)
        







































'''
      ::::::::       ::::::::::           :::        :::::::::       ::::::::       :::    :::
    :+:    :+:      :+:                :+: :+:      :+:    :+:     :+:    :+:      :+:    :+:
   +:+             +:+               +:+   +:+     +:+    +:+     +:+             +:+    +:+
  +#++:++#++      +#++:++#         +#++:++#++:    +#++:++#:      +#+             +#++:++#++
        +#+      +#+              +#+     +#+    +#+    +#+     +#+             +#+    +#+
#+#    #+#      #+#              #+#     #+#    #+#    #+#     #+#    #+#      #+#    #+#
########       ##########       ###     ###    ###    ###      ########       ###    ###
'''
class _搵客鍠:
    def _篩選聯絡(表格內文, 電話篩選):
        # 全形數字轉半形
        表格內文 = ''.join(
            chr(ord(c) - 65248) if '０' <= c <= '９' else c
            for c in 表格內文
        )

        # 去除換行與異常空格（包含全形空格、\xa0、不斷行空格等等）
        表格內文 = re.sub(r'[\n\r\u3000\xa0]+', ' ', 表格內文)
        表格內文 = re.sub(r'\s+', ' ', 表格內文)

        # 印出處理後的內容
        #print(f"=============\n[清理後的表格內文]：{表格內文}")

        # 電話篩選[0] = 電話開頭 4569 | 電話篩選[1] = 電話位數 8
        phone_pattern = fr'(?<!\d)([{電話篩選[0]}]\d{{{電話篩選[1]}}})(?!\d)'        
        phones = re.findall(phone_pattern, 表格內文)

        # 抓 email
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, 表格內文, flags=re.IGNORECASE)

        #print(f"[篩選結果] phones={phones}, emails={emails}\n")
        return phones, emails






    def _西選重聯(聯):
        #print(f'_西損重聯={聯}')

        # 使用集合來追蹤已出現的聯絡方式
        seen_contacts = set()
        filtered_data = []

        for entry in 聯:
            # 提取聯絡方式
            contact = entry.split('=')[1] # 欣貫有限公司:55472829

            # 如果聯絡方式不在 seen_contacts 中，加入 filtered_data 並添加至 seen_contacts
            if contact not in seen_contacts:
                filtered_data.append(entry)
                seen_contacts.add(contact)

        # 輸出篩選後的列表
        return filtered_data






    def _提取聯絡方式(url,公司名xpath,表格xpath,電話篩選):
        try:
            # 獲取網頁內容
            response = requests.get(url)
            response.raise_for_status()  # 檢查請求是否成功

            # 解析HTML
            tree = html.fromstring(response.content)

            # 1. 提取公司名稱、廣告整頁內容
            company_name = tree.xpath(公司名xpath)[0]

            # 將空格替換為_刪除所有非中文、英文、數字
            company_name = re.sub(r'\s', '_', company_name)
            company_name = re.sub(
                r'[^a-zA-Z0-9_'
                r'\u4e00-\u9fff'    # 基本中文
                r'\u3400-\u4dbf'    # 扩展A
                r'\uf900-\ufaff'    # 兼容象形字
                r'\U00020000-\U0002a6df'  # 扩展B（需确保Python3环境）
                r'-]',  # 连字符放在最后，避免被解析为范围符号
                '', 
                company_name,
                flags=re.UNICODE
            )

            #print(f"company_name",company_name)
            job_table = tree.xpath(表格xpath)[0]
            table_text = job_table.text_content()
            #print(f"廣告整頁內容",table_text)

            # 提取聯絡方式
            phones, emails = _搵客鍠._篩選聯絡(table_text,電話篩選)

            # 優先找ws
            if phones:
                for phone in phones:
                    return f'{company_name}={phone}'
            else:
                if emails:
                    for email in emails:
                        return f'{company_name}={email}'
                else:
                    return False
        except Exception as e:
            print(f"_提取聯絡方式錯誤（URL: {url}）: {str(e)}")
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())








    def _聯Po網(Boss料list,地區,關鍵字=''):

        # 時間生成
        now = datetime.now()
        現在時間 = now.strftime("[%Y-%m-%d|%H:%M:%S]")

        # 转换为带换行的字符串（每条记录占一行）
        Boss料PoHtml = f"{現在時間}[{地區}|{關鍵字}]\n" +"\n".join(Boss料list) +"\n---------\n"
        print(Boss料PoHtml)

        driver.execute_script(
            """
                const textarea = document.getElementById('搵客鍠結果');
                let newContent = arguments[0];
                
                // 保留原有内容并添加新内容在顶部
                textarea.value = newContent + '\\n' + textarea.value;
                
                // 保持自动滚动到顶部
                textarea.scrollTop = 0;
            """,
            Boss料PoHtml.strip()  # 移除末尾多余换行
        )
        







































































'''
     :::    :::       :::::::::       :::::::::           :::    :::::::::::           :::                        ::::::::::       :::    :::       ::::::::::
    :+:    :+:       :+:    :+:      :+:    :+:        :+: :+:      :+:             :+: :+:                      :+:              :+:    :+:       :+:
   +:+    +:+       +:+    +:+      +:+    +:+       +:+   +:+     +:+            +:+   +:+                     +:+               +:+  +:+        +:+
  +#+    +:+       +#++:++#+       +#+    +:+      +#++:++#++:    +#+           +#++:++#++:                    +#++:++#           +#++:+         +#++:++#
 +#+    +#+       +#+             +#+    +#+      +#+     +#+    +#+           +#+     +#+                    +#+               +#+  +#+        +#+
#+#    #+#       #+#             #+#    #+#      #+#     #+#    #+#           #+#     #+#                    #+#              #+#    #+#       #+#
########        ###             #########       ###     ###    ###           ###     ###    ##########      ##########       ###    ###       ##########
'''

class _Exe_Set():


    def _UpData本程式():
        最新版本, 下載Url = _Exe_Set._檢查最新版()
        print(f'本機版本：{更新日期}，最新版本：{最新版本}')
        if _Exe_Set._比較版本時間(更新日期, 最新版本):
            _Exe_Set._下載更新檔(下載Url, 最新版本)
        else:
            print(f"\n🥳目前[{本程式名}_{更新日期}.exe]已是最新版本🥳\n")


    def _檢查最新版():
        url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/releases/latest'
        response = requests.get(url)
        if response.status_code != 200:
            raise Exception('無法取得 GitHub Release 資訊')
        data = response.json()
        tag = data['tag_name'].lstrip('v')  # 移除前面的 v
        assets = data['assets']
        for asset in assets:
            if asset['name'] == 檔名:
                download_url = asset['browser_download_url']
                return tag, download_url
        raise Exception(f'找不到 {檔名} 檔案於 GitHub Release 中')


    def _比較版本時間(local, remote):
        def to_tuple(v): return tuple(map(int, v.split('.')))
        return to_tuple(remote) > to_tuple(local)


    def _下載更新檔(url ,新版):
        new_filename = f'{本程式名}_{新版}.exe'
        print(f'正在下載 {url} ...')
        print('-'*18)
        response = requests.get(url)
        with open(new_filename, 'wb') as f:
            f.write(response.content)
        full_path = os.path.abspath(new_filename)
        print(f'🥳 {new_filename} 已儲存至： {full_path} 🥳')
        _Exe_Set._以管理員權限執行新版本(full_path)
        sys.exit()


    def _以管理員權限執行新版本(path):
        print(f'準備以系統管理員權限執行：{path}')
        try:
            # 使用 ShellExecuteEx 執行，觸發 UAC 提示
            ctypes.windll.shell32.ShellExecuteW(
                None, "runas", path, None, None, 1
            )
        except Exception as e:
            print(f'執行失敗：{e}')










































'''
      ::::::::   :::::::::::           :::        :::::::::   :::::::::::
    :+:    :+:      :+:             :+: :+:      :+:    :+:      :+:
   +:+             +:+            +:+   +:+     +:+    +:+      +:+
  +#++:++#++      +#+           +#++:++#++:    +#++:++#:       +#+
        +#+      +#+           +#+     +#+    +#+    +#+      +#+
#+#    #+#      #+#           #+#     #+#    #+#    #+#      #+#
########       ###           ###     ###    ###    ###      ###
'''
class _Start:

    def _動態執行代碼():

        # 初始執行
        if Admin模式:
            # 轉不用登google的試 qqq 0614
            driver.get('C:/Users/mokaki/Desktop/金/金come(2025)/GoldComeHK.github.io/set.html')
        else:
            driver.get(f'{我官網}set.html')

        while True:
            code標籤 = "#########結束#########"
                
            # 写入空内容覆盖剪贴板
            pyperclip.copy('')
            # 点击前的剪贴板内容（用于检测变化）
            original_clipboard = pyperclip.paste()
            while True:
                current_clipboard = pyperclip.paste()
                if current_clipboard != original_clipboard and code標籤 in current_clipboard:
                    break
                print(f"設置完成後， 請按 執行{本程式名}...")
                time.sleep(1)  # 避免过高频率检查
            
            # 提取代碼部分
            user_code = current_clipboard.split(code標籤)[0].strip()
            # 用取到的碼轉成py碼
            user_code_lines = []
            for line in user_code.split('\n'):
                if line.strip() == code標籤:
                    break
                user_code_lines.append(line)
            user_code = '\n'.join(user_code_lines)

            if Admin模式:
                print(f'\n----2-----\n{user_code}\n----2-----\n')
                input('按任意鍵執行...')
            else:
                pyperclip.copy('')

            # 將特殊標記轉回\n轉義字符
            user_code = user_code.replace('@換行@', r'\n')

            try:
                exec(user_code, globals())
            except:
                _雜項._獲取詳細錯誤堆棧(*sys.exc_info()) 































    def _歡迎登入(国家代码,电话号码,功能):

        # 加到 html 執行中請不要關閉網頁
        歡迎 = f'''
                _\|/_
                (o o)
        +----oOO--U--OOo-------------------------{更新日期}-+
        |                                                     |
            {本程式名} 歡迎您 !                                      
        |                                                     |                    
            國家代碼 = {国家代码}      
            手機號碼 = {电话号码}                  
        |                                                     | 
            官網 = {我官網}                 
            聯絡我們 = {我官網}ContactAKI.html                 
        |                                                     | 
            *****************************************          
        |                                                     |
            [{功能}] 執行中請不要關閉網頁
        |                                                     |
        +-----------------------------------------------------+
        '''
        print(歡迎)
        
        歡迎Op網 = f'''
            <h1>{本程式名}</h1>
            <p>{国家代码} {电话号码}</p>
            <p><a href="{我官網}ContactAKI.html" target="_blank">聯絡我們</a></p>
            <br>
            <h2>[{功能}] 執行中....</h2>
        '''

        _雜項._執行中說明('執行中說明',歡迎Op網)
































if __name__ == "__main__":

    Admin模式 = False

    更新日期 = '202506292327'
    本程式名 = 'Goldcome'
    賺錢鍠瀏覽器位 = 本程式名

    官Ws = '85264071181'
    我官網 = 'https://www.金come.com/'

    REPO_OWNER = 'GoldComeHK'
    REPO_NAME = 'GoldComeHK.github.io'
    檔名 = f'{本程式名}.exe'

    遠端鍠 = False
    客服鍠試用次數 = 10
    用次數 = 0
    帳號1181 = None

    _Exe_Set._UpData本程式()
    #_chrome_雜項._下載賺錢王Chrome()
    driver = _chrome_雜項._Chrome設定()[0]
    _雜項._WindowsAPI阻止系统休眠()

    _Start._動態執行代碼()

# 執行本程式系列 \

































































