













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

https://wa.me/85264071181/?text=莫生我要查詢金come遠端系統
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
💰💰💰💰💰💰💰💰💰
'''








'''
Telegram端步驟 https://pixnashpython.pixnet.net/blog/post/32391757-%E3%80%90telegram-api%E3%80%91python

步驟一：在Telegram搜尋欄輸入BotFather並打開

步驟二：輸入 /newbot

步驟三：輸入機器人顯示名稱

步驟四：輸入機器人可搜尋名稱

步驟五：取得TOKEN複製起來(PYTHON用)

https://www.freecodecamp.org/chinese/news/how-to-create-a-telegram-bot-using-python/
'''

''' colab用 '''
# 機器人
!pip install pyTelegramBotAPI

# AES 加密/解密
!apt-get install -y nodejs
!npm install crypto-js

# UpGithub
!pip install PyGithub

# 自動獲取工作資料
!apt-get update
!apt install chromium-chromedriver
!pip install selenium

# 檢查郵件7天已發
!pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib

!pip install line_profiler
%load_ext line_profiler






# 爬jetsoclub廣告網 调用UptimeRobot
import requests

# https://chatgpt.com/share/ebfd449c-14c5-4dcc-a669-40d8f16f30c1

# 自動獲取工作資料
# chatgpt monica
# https://chat.openai.com/share/57c5b600-4c6a-40d2-b140-dd4761d6e5cd

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from bs4 import BeautifulSoup
from lxml import html
import time  # 新增此行，用於控制請求間的等待時間
import os
import re

# 搵老闆用
from selenium.common.exceptions import ElementNotInteractableException, NoSuchElementException

# 自動 send mail
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random

# 檢查郵件7天已發
# 【Share Link: Sending Email with Python - Monica AI Chat】https://monica.im/share/chat?shareId=zeELHJyoXXQOjfpY
import imaplib
import email
from email.header import decode_header
from datetime import datetime, timedelta

# TG
import telebot
# 白名單
from telebot import TeleBot, apihelper

# AES 加密/解密
import subprocess
import json

# UpGithub
from github import Github


# api token
from google.colab import userdata
from google.colab.userdata import TimeoutException







































'''
      ::::::::       ::::    :::                       ::::::::         :::   :::           :::        :::::::::::       :::
    :+:    :+:      :+:+:   :+:                      :+:    :+:       :+:+: :+:+:        :+: :+:          :+:           :+:
   +:+             :+:+:+  +:+                      +:+             +:+ +:+:+ +:+      +:+   +:+         +:+           +:+
  +#++:++#++      +#+ +:+ +#+                      :#:             +#+  +:+  +#+     +#++:++#++:        +#+           +#+
        +#+      +#+  +#+#+#                      +#+   +#+#      +#+       +#+     +#+     +#+        +#+           +#+
#+#    #+#      #+#   #+#+#                      #+#    #+#      #+#       #+#     #+#     #+#        #+#           #+#
########       ###    ####       ##########      ########       ###       ###     ###     ###    ###########       ##########

'''
class 自動send野:


    def _檢查郵件7天已發(to_email):
        start_time = time.time()

        有冇semd = '有'
        # 连接到 Gmail 的 IMAP 服务器
        mail = imaplib.IMAP4_SSL('imap.gmail.com')

        # 登录
        mail.login(由這mail, 由這mail的key)
        '''
        # 列出所有文件夹
        status, folders = mail.list()
        print("可用文件夹:")
        for folder in folders:
            print(folder)
        '''
        # 选择已发送邮件文件夹
        mail.select('"[Gmail]/&W8RO9lCZTv0-"')  # 寄件備份

        # 计算7天前的日期
        date_since = (datetime.now() - timedelta(days=促銷間隔天數)).strftime("%d-%b-%Y")

        # 搜索发件人和收件人，限制为7天内的邮件
        status, messages = mail.search(None, f'TO "{to_email}" SINCE {date_since}')

        # 获取邮件ID列表
        email_ids = messages[0].split()
        if not email_ids:
            有冇semd = '冇'

        # 关闭连接
        mail.logout()

        end_time = time.time()
        print(f"[_檢查郵件7天已發] 花費了 {雜項._計算花費了的時間(start_time,end_time)} 秒")

        return 有冇semd



    # 在 Gmail 帳戶中，您可以前往 Google 帳戶設定 > "安全性" > "應用程式密碼" 來生成應用程式專用密碼。
    # https://myaccount.google.com/u/1/apppasswords?pli=1&rapt=AEjHL4NB4hK6Th7KGvq8QXmew8zX6e0Q0vg_Ruwjaxi6rHdyqR9HRAen2ocS95fglp1iHWQ2zcuydfYf4-aeUc4F2sJBPQ0s7iayeTEjdPFPKUTS0UILi60
    def _自動sendGmail(subject, body, to_email):
        start_time = time.time()

        # 创建邮件对象
        msg = MIMEMultipart()
        msg['From'] = 由這mail
        msg['To'] = to_email
        msg['Subject'] = subject

        # 添加邮件内容
        msg.attach(MIMEText(body, 'html', 'utf-8'))
        try:
            # 连接到 Gmail 的 SMTP 服务器
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()  # 启动 TLS 加密
            server.login(由這mail, 由這mail的key)

            # 发送邮件
            server.send_message(msg)

            發成點 = f'成功發送郵件'
        except Exception as e:
            發成點 = f'邮件发送失败: {e}'
        finally:
            server.quit()

        end_time = time.time()
        print(f"[_自動sendGmail] 花費了 {雜項._計算花費了的時間(start_time,end_time)} 秒")

        return 發成點
    





# all 自動send野系列 \









































'''
      ::::::::   :::::::::::       :::    :::       ::::::::::       :::::::::
    :+:    :+:      :+:           :+:    :+:       :+:              :+:    :+:
   +:+    +:+      +:+           +:+    +:+       +:+              +:+    +:+
  +#+    +:+      +#+           +#++:++#++       +#++:++#         +#++:++#:
 +#+    +#+      +#+           +#+    +#+       +#+              +#+    +#+
#+#    #+#      #+#           #+#    #+#       #+#              #+#    #+#
########       ###           ###    ###       ##########       ###    ###
'''
class 雜項:

    def _計算花費了的時間(始,終):
        # 取小數點後兩位
        花費了 = round(終 - 始, 2)
        return 花費了



    # api token 處理超時問題
    def _ApiToken處理超時問題(key, max_retries=3, delay=5):
        start_time = time.time()
        retries = 0
        while retries < max_retries:
            try:
                secret_value = userdata.get(key)
                return secret_value
            except TimeoutException:
                retries += 1
                print(f"第 {retries} 次嘗試失敗，等待 {delay} 秒後重試...")
                time.sleep(delay)
        end_time = time.time()
        print(f"[_ApiToken處理超時問題] 花費了 {雜項._計算花費了的時間(start_time,end_time)} 秒")
        raise TimeoutException(f"無法取得 {key}，超過最大重試次數。")





# all 雜項系列 \

























class _chrome_雜項:
    def _Chrome設定():
        start_time = time.time()
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        driver = webdriver.Chrome(options=chrome_options)
        end_time = time.time()
        print(f"[_Chrome_雜項] 花費了 {雜項._計算花費了的時間(start_time,end_time)} 秒")
        return driver   


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
                print(f'_請告知作者更新{位置}|{xpath}')
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
                print(f'_請告知作者更新{位置}|{xpath}')
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
                print(f'_請告知作者更新{位置}|{xpath}')
            return False



































class _遠端鍠_雜項:
#########################

    # https://chatgpt.com/share/67173d2b-3144-8002-a532-a787de35643e
    def _西選重聯(data):
        start_time = time.time()

        print(f'data={data}')   # ['公司=68991888', '公司=hr@canvest.com.hk', 

        # 使用集合來追蹤已出現的聯絡方式
        seen_contacts = set()
        filtered_data = []

        for entry in data:
            # 提取聯絡方式 '利嘉閣地產有限公司=65340006'
            contact = entry.split('=')[1] 

            #print(f'contact@@@={contact}') 

            # 如果聯絡方式不在 seen_contacts 中，加入 filtered_data 並添加至 seen_contacts
            if contact not in seen_contacts:
                filtered_data.append(entry)
                seen_contacts.add(contact)

        end_time = time.time()
        print(f"[_西選重聯] 花費了 {雜項._計算花費了的時間(start_time,end_time)} 秒")

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
            phones, emails = _遠端鍠_雜項._篩選聯絡(table_text,電話篩選)

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
            print(f"錯誤={e}...")





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







    def _整字雜項(公司名稱,聯絡方式):
        start_time = time.time()

        # 分類聯絡並加字
        聯絡方式B = ''
        宣傳文B = 宣傳文
        if '@' in 聯絡方式:
            聯絡方式B = f"mailto:{聯絡方式}?subject=尊敬的{公司名稱}{信標隨}&body="
            #sell客文 = f"{聯絡方式B}{公司名稱}{宣傳文B}"
        else:
            聯絡方式B = f'https://wa.me/{聯絡方式}?text='

            # 取我wsLink
            我wsLink = re.findall(r'href="([^"]+)"', 宣傳文)[-1]

            # 取得宣傳文中的圖片
            src_list1 = re.findall(r'src="([^"]+)"', 宣傳文)
            # 整合圖片url
            圖all = ''
            for 圖 in src_list1:
                圖all += f'%0A%0A{圖}'

            # 刪除all 圖片 wsLink html
            宣傳文B = re.sub(
                r'<br style="display: none;">.*?(?=<br style="display: none;">|$)',  
                '', 
                宣傳文,
                flags=re.DOTALL
            )
            宣傳文B = 宣傳文B.replace('<br>', '%0A').replace('&nbsp;', '%20').replace('=', '%3D')
            宣傳文B = f'{宣傳文B}%0A%0A{我wsLink}%0A%0A{圖all}'
            

        sell客文 = f"{聯絡方式B}尊敬的{公司名稱}{宣傳文B}"
        end_time = time.time()
        print(f"[_整字雜項] 花費了 {雜項._計算花費了的時間(start_time,end_time)} 秒")
        return sell客文




#########################



































































'''
######################################
######################################
######################################
######################################
######################################
######################################
######################################
######################################
######################################
'''

'''
      ::::::::       ::::::::::           :::        :::::::::       ::::::::       :::    :::
    :+:    :+:      :+:                :+: :+:      :+:    :+:     :+:    :+:      :+:    :+:
   +:+             +:+               +:+   +:+     +:+    +:+     +:+             +:+    +:+
  +#++:++#++      +#++:++#         +#++:++#++:    +#++:++#:      +#+             +#++:++#++
        +#+      +#+              +#+     +#+    +#+    +#+     +#+             +#+    +#+
#+#    #+#      #+#              #+#     #+#    #+#    #+#     #+#    #+#      #+#    #+#
########       ##########       ###     ###    ###    ###      ########       ###    ###
'''


### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
##################  202504241656  ####################
def _香港勞工處(keyword=''):

    勞工處XPATH = {
        '左上資料數':'//*[@id="content-innerdiv"]/div[1]/div[1]/strong[1]',
        '勞工處點擊下一頁按鈕':'//*[@id="swapNextPage"]',
        '列表顯示':'//*[@id="content-innerdiv"]/div[1]/div/div[2]/a',
        '公司名xpath':'//*[@id="empName"]/text()',
        '表格xpath':'//*[@id="jobOrderTable"]',

        '工作列表':'//*[@id="job_list_table"]/tbody',
        '工作列表中的所有href':'//*[@id="job_list_table"]//a[contains(@id, "_orderNo_hyper")]',
        '關鍵字輸入框':'//*[@id="simp_searchKeyword"]',
        '搜尋空缺按鈕':'//*[@id="btnSearch"]',
    }

    try:
        搵客鍠_driver = _chrome_雜項._Chrome設定()
        搵客鍠_driver.maximize_window() # 最大化窗口

        公司名xpath = 勞工處XPATH['公司名xpath']
        表格xpath = 勞工處XPATH['表格xpath']
        電話開頭 = '4569'
        電話位數 = 7



        all_Boss料 = []
        # 勞工處網分流
        勞工處ulr = ''
        子域名清單 = ["www","www1", "www2", "www3", "www4"]

        for 子域名 in 子域名清單:
            勞工處ulr = f"https://{子域名}.jobs.gov.hk/0/tc/jobseeker/jobsearch/joblist/"  # 替換子域名
            try:
                搵客鍠_driver.get(勞工處ulr)
                break
            except:
                continue

        搵客鍠_driver.get(勞工處ulr)
        # 填寫關鍵字並點擊搜尋按鈕
        _chrome_雜項._檢查文字輸入(搵客鍠_driver,'關鍵字輸入框', 勞工處XPATH['關鍵字輸入框'], keyword)
        _chrome_雜項._檢查點擊(搵客鍠_driver,'搜尋空缺按鈕',勞工處XPATH['搜尋空缺按鈕'])
        _chrome_雜項._檢查點擊(搵客鍠_driver,'列表顯示',勞工處XPATH['列表顯示'])

        目前網址 = 搵客鍠_driver.current_url

        # 取得資料總數
        顯總料數 = 0
        顯總料數 = WebDriverWait(搵客鍠_driver, 9).until(
            EC.visibility_of_element_located((By.XPATH, 勞工處XPATH['左上資料數']))
        )
        顯總料數 = 顯總料數.text.strip()
        print(f'*** 正在搜尋[{keyword}]有{顯總料數}個公司資料 @ 香港勞工處 ***')

        找頁數 = 1
        _每頁量 = 20
        while True:
            
            if int(顯總料數) == 0:
                print("沒有資料，搜尋結束...")
                break

            print(f"獲取第{找頁數}頁...")
            # 6. 擷取工作列表中的所有 href 連結
            WebDriverWait(搵客鍠_driver, 10).until(
                EC.presence_of_element_located((By.XPATH, 勞工處XPATH['工作列表']))
            )
            rows = 搵客鍠_driver.find_elements(By.XPATH, 勞工處XPATH['工作列表中的所有href'])
            # 遍历每行提取链接
            for row in rows:
                網址 = row.get_attribute('href')
                客的真聯 = _遠端鍠_雜項._提取聯絡方式(網址,公司名xpath,表格xpath,[電話開頭,電話位數])
                if 客的真聯:
                    all_Boss料.append(客的真聯)
                    print(f'{客的真聯}')
                    if len(all_Boss料) >= 最多找資料數 :
                        print(f"已找{最多找資料數}個資料，結束搜尋")
                        break

            # 點擊下一頁按鈕
            if len(all_Boss料) >= 最多找資料數 : break
            if int(顯總料數) > _每頁量:
                # 點擊下一頁按鈕
                _每頁量 += 20
                找頁數 +=1
                搵客鍠_driver.get(f'{目前網址}&page={找頁數}')
            else:
                break
        # 關閉瀏覽器
        搵客鍠_driver.quit()

        ######### Boss料PoHtml #########
        if all_Boss料:
            真all_Boss料 = _遠端鍠_雜項._西選重聯(all_Boss料)    #['利嘉閣地產有限公司=65340006',]
            return 真all_Boss料 
        ######### Boss料PoHtml #########
        
    except Exception as e:
        print(f"錯誤={e}...")


























### 台灣就業通 ###### 台灣就業通 ###### 台灣就業通 ###
def _台灣就業通(keyword=''):

    電話開頭 = '0'
    電話位數 = 9
    
    就業通XPATH = {
        '關鍵字輸入框':'//*[@id="CPH1_SearchBar_txtKeyword"]',
        '搜尋空缺按鈕':'//*[@id="btnSearchJob"]',
        '顯總料數':'//*[@id="tuJobFilter"]/ul/li[1]/strong',
        '移至頁數':'//*[@id="tuJobList"]/li[21]/span[2]/select/option[last()]',
        '等待載入更多消失':'//*[@id="plPageLinkRight"]/a',
        '所职hire':'//*[starts-with(@id, "hire_")]//a[@class="t-card-title text-inherit"]',
        '公司名xpath':'//*[@id="CPH1_hlkcomp_Header"]/text()',
        '表格xpath':'//*[@id="detailContent"]/div[1]/article[5]',
    }

    all_Boss料 = []
    try:

        搵客鍠_driver = _chrome_雜項._Chrome設定()
        搵客鍠_driver.maximize_window() # 最大化窗口

        # 去首頁
        while True:
            搵客鍠_driver.get("https://job.taiwanjobs.gov.tw/Internet/index/job_search_list.aspx?")
            if _chrome_雜項._檢查元素存在(搵客鍠_driver,'關鍵字輸入框',就業通XPATH['關鍵字輸入框']):
                break
            else:
                print('等待載入首頁')

        # 输入关键字（等待输入框加载并输入内容）
        _chrome_雜項._檢查文字輸入(搵客鍠_driver,'關鍵字輸入框', 就業通XPATH['關鍵字輸入框'], keyword)

        # 点击搜索按钮（等待按钮可点击）
        _chrome_雜項._檢查點擊(搵客鍠_driver,'搜尋空缺按鈕',就業通XPATH['搜尋空缺按鈕'])

        # 取得資料總數
        顯總料數 = 0
        顯總料數 = _chrome_雜項._檢查元素存在(搵客鍠_driver,'顯總料數',就業通XPATH['顯總料數'])
        顯總料數 = 顯總料數.text.strip("()")
        print(f'*** 正在搜尋[{keyword}]有{顯總料數}個公司資料 @ 台灣就業通 ***')
        if int(顯總料數) == 0:
            print("沒有資料，搜尋結束...")
            return

        # 列出所有工作
        _chrome_雜項._檢查點擊(搵客鍠_driver,'移至頁數',就業通XPATH['移至頁數'])

        # 等待 載入更多消失
        WebDriverWait(搵客鍠_driver, 180).until_not(
            EC.presence_of_element_located((
                By.XPATH,
                就業通XPATH['等待載入更多消失']
            ))
        )

        # 定位所有职位链接元素
        job_links = WebDriverWait(搵客鍠_driver, 20).until(
            lambda d: d.find_elements(By.XPATH, 就業通XPATH['所职hire'])
        )
        for idx, link in enumerate(job_links, 1):
            href = link.get_attribute('href')

            # _提取聯絡方式
            客的真聯 = _遠端鍠_雜項._提取聯絡方式(href,就業通XPATH['公司名xpath'],就業通XPATH['表格xpath'],[電話開頭,電話位數])
            if 客的真聯:
                all_Boss料.append(客的真聯)
                print(f'{客的真聯}')

            if idx == 最多找資料數:
                print(f"已找{最多找資料數}個資料，結束搜尋")
                break
        # 關閉瀏覽器
        搵客鍠_driver.quit()

        ######### Boss料PoHtml #########
        if all_Boss料:
            真all_Boss料 = _遠端鍠_雜項._西選重聯(all_Boss料)    #['盛棠企業行=0907690858',]
            return 真all_Boss料
        ######### Boss料PoHtml #########

    except Exception as e:
        print(f"錯誤={e}...")









































'''
  :::::::::::       ::::::::
     :+:          :+:    :+:
    +:+          +:+
   +#+          :#:
  +#+          +#+   +#+#
 #+#          #+#    #+#
###           ########

'''
class _TG機器人系列:

    def _TG多工機器人():
        # Telegram bot配置
        bot = telebot.TeleBot(userdata.get('TG找老闆api'))
        # https://chatgpt.com/share/09fa7b01-798e-47d4-b0a3-4e6738e4ba55
        白名單 = userdata.get('tg白名單') # ['mokaki', ''] 白名單列表，將被屏蔽的使用者ID添加到這裡

        def _TG白名單(msg):
            # 檢查用戶是否在白名單中
            if msg.from_user.username in 白名單:
                return True

        # 使用正則表達式 r'^/\$|^/%|^/\@|^/\?' 同時匹配指令開頭  /$、/%、/@、/？
        #@bot.message_handler(func=lambda message: re.match(r'^/\$|^/%|^/\@|^/\?', message.text))
        @bot.message_handler(func=lambda message: re.match(r'^/[$%@?]', message.text))
        def handle_commands(message):
            
            if not _TG白名單(message): return  # 如果不在白名單中，則停止處理

            # 獲取指令和關鍵字
            指令 = message.text[:2]  # 指令標記，例如 /$, /%, /@ 或 /?
            keyword = message.text[2:]  # 去除指令部分後的關鍵字

            回答 = f'''
                自動找老闆TG機器人之王 {更新日期}
                🐣🛎️💰 說明 🐣🛎️💰

                遠端鍠  = https://金come.com/0

                🐣🛎️💰 說明 🐣🛎️💰
            '''
            ### 說明 /? ###
            if 指令 == "/?":
                bot.reply_to(message, 回答)
                print(回答)

            ### 遠端鍠 找老闆 在 https://金come.com/0  執行 ###
            elif 指令 == "/%":
                aki指令內容 = keyword.split('@////////@')
                if len(aki指令內容) < 8:
                    bot.reply_to(message, '恭喜發財!')
                    print('遠端鍠 code 錯誤')
                    return

                回答 = f'🐣🛎️💰 遠端鍠 找老闆 請稍候(約20分鐘)... 🐣🛎️💰'
                bot.reply_to(message, 回答)
                print(回答)

                # 回覆結果
                for 結果 in  _執行遠端鍠(aki指令內容):
                    _回覆對話(結果, message, 'paragraph')

                '''
                ######################################
                ######################################
                ######################################
                ######################################
                ######################################
                ######################################
                ######################################
                ######################################
                ######################################
                '''

        ### all用回覆 ###
        def _回覆對話(內容, msg, mode):
            """
            mode:
            - 'chunk'：按消息長度分割並發送。搜尋工作
            - 'paragraph'：按段落分開並發送。找老闆的聯絡
            """
            MAX_MESSAGE_LENGTH = 4096

            if mode == 'chunk':
                # 分割消息：將消息分割成更小的塊，每個塊的長度不超過Telegram API的限制
                chunks = []
                chunk = ''
                for data in 內容:
                    if len(chunk) + len(data) + 1 < MAX_MESSAGE_LENGTH:
                        chunk += data + '\n'
                    else:
                        chunks.append(chunk)
                        chunk = data + '\n'
                if chunk:
                    chunks.append(chunk)
                for chunk in chunks:
                    try:
                        print(chunk)
                        bot.reply_to(msg, chunk)
                        time.sleep(1)  # 每發送一個訊息後等待 1 秒，避免觸發 API 限制
                    except telebot.apihelper.ApiTelegramException as e:
                        if e.result_json['error_code'] == 429:
                            retry_after = int(e.result_json['parameters']['retry_after'])
                            print(f"觸發 API 限制，需等待 {retry_after} 秒...")
                            time.sleep(retry_after)
                            bot.reply_to(msg, chunk)
                        else:
                            print(f"發送訊息時出現錯誤: {e}")

            elif mode == 'paragraph':
                # 確保內容是一個字串，如果是列表，則將其轉換為字串
                if isinstance(內容, list):
                    內容 = "\n".join(內容)  # 將列表中的項目合併為一個字串，每個項目用換行符分隔
                # 將內容按段落拆分
                lines = 內容.split("************************")  # 根據兩個換行符分割段落
                for line in lines:
                    if line.strip():  # 確保行不是空的
                        try:
                            print(line.strip())
                            bot.reply_to(msg, line.strip())
                            time.sleep(1)  # 每發送一段後等待 1 秒，避免觸發 API 限制
                        except telebot.apihelper.ApiTelegramException as e:
                            if e.result_json['error_code'] == 429:
                                retry_after = int(e.result_json['parameters']['retry_after'])
                                print(f"觸發 API 限制，需等待 {retry_after} 秒...")
                                time.sleep(retry_after)
                                print(line.strip())
                                bot.reply_to(msg, line.strip())
                            else:
                                print(f"發送訊息時出現錯誤: {e}")

        bot.infinity_polling()
# _TG機器人系列 \



























'''
      ::::::::   :::::::::::           :::        :::::::::   :::::::::::
    :+:    :+:      :+:             :+: :+:      :+:    :+:      :+:
   +:+             +:+            +:+   +:+     +:+    +:+      +:+
  +#++:++#++      +#+           +#++:++#++:    +#++:++#:       +#+
        +#+      +#+           +#+     +#+    +#+    +#+      +#+
#+#    #+#      #+#           #+#     #+#    #+#    #+#      #+#
########       ###           ###     ###    ###    ###      ###
'''


def _執行遠端鍠(指令):
    global 最多找資料數,akiWs,信標隨,宣傳文,由這mail,由這mail的key            

    # 遠端鍠
    '''
    const 執行碼 = `
        /*${分隔符}
        ${搵客鍠py}${分隔符}
        ${最多找資料數}${分隔符}
        ${區號}${WhatsApp號}${分隔符}
        ${信件標題}${分隔符}
        ${促銷信草稿}${分隔符}
        ${發出促銷信的gmail}${分隔符}
        ${gmail的應用程式密碼}${分隔符}
    `
    '''

    遠端鍠py = 指令[1]  
    最多找資料數 = int(指令[2])

    akiWs = 指令[3]
    信標隨 = 指令[4] 
    宣傳文 = 指令[5]

    由這mail = 指令[6]
    由這mail的key = 指令[7]

    發送促銷信件數 = int(指令[8])
    all成功發送 = 0

    all_data = []

    比客睇 = []

    if Admin模式:

        for 睇 in 指令:
            print(f'----------\n{睇}')
        
        測料 = ['Admin模式測料1=98672794','Admin模式測料2=moksurky@gmail.com','Admin模式測料3=lamelle1995@gmail.com','Admin模式測料4=wongcyres@gmail.com',]
        for 結果 in 測料:
            if all成功發送 >= 發送促銷信件數:
                print(f'已成功發送{發送促銷信件數}封,促銷鍠結束')
                break
            
            公司名稱,聯絡方式 = 結果.split('=')
            sell客文 = _遠端鍠_雜項._整字雜項(公司名稱,聯絡方式)

            if '@' in 聯絡方式: #mail
                標題 = sell客文.split('?subject=')[1].split('&body=')[0]
                內文 = sell客文.split('&body=')[1]
                發成點 = 自動send野._自動sendGmail(標題, 內文, 聯絡方式)
                睇結果 = f'[ {公司名稱}:{聯絡方式} ]={發成點}'
            #ws
            else:
                睇結果 = sell客文

            all成功發送 += 1
            all_data.append(睇結果)
        return all_data


    for 結果 in eval(遠端鍠py): # _香港勞工處('${關鍵字}') / _台灣就業通('${關鍵字}')
        if all成功發送 >= 發送促銷信件數:
            #print(f'已成功發送{發送促銷信件數}封,促銷鍠結束')
            all_data.append(f'已成功發送{發送促銷信件數}封,促銷鍠結束')
            break

        # 結果 = ['利嘉閣地產有限公司=65340006',]
        公司名稱,聯絡方式 = 結果.split('=')

        # 生成sell客文
        sell客文 = _遠端鍠_雜項._整字雜項(公司名稱,聯絡方式)
        
        # 篩選 mail
        if '@' in 聯絡方式:
            if 自動send野._檢查郵件7天已發(聯絡方式) == '冇':
                標題 = sell客文.split('?subject=')[1].split('&body=')[0]
                內文 = sell客文.split('&body=')[1]
                發成點 = 自動send野._自動sendGmail(標題, 內文, 聯絡方式)
                睇結果 = f'[ {公司名稱}:{聯絡方式} ]={發成點}'
                比客睇.append(結果)
                all成功發送 += 1
            else:
                睇結果 = f'[ {公司名稱}:{聯絡方式} ]={促銷間隔天數}天內已發過'
        #ws
        else:
            睇結果 = sell客文  
            比客睇.append(結果) 
            all成功發送 += 1

        all_data.append(睇結果)
    
    # 將比客睇結果加到all_data後面
    all_data.append('-'*18)
    all_data.extend(比客睇)

    return all_data





























if __name__ == "__main__":

    '''
    用法=
        遠端鍠 在 https://金come.com/0  set
        tg
            找老闆  = 貼上
    '''

    Admin模式 = False
    
    分隔號 = '$'*18

    # 遠端鍠 在 https://金come.com/0  set _執行遠端鍠 global 不可刪
    最多找資料數 = 10
    akiWs = ''
    促銷間隔天數 = 7
    信標隨 = ''
    宣傳文 = ''
    由這mail = ''
    由這mail的key = ''

    now = datetime.now()
    更新日期 = '202505080339'
    print(f'$$$ 遠端鍠 {更新日期} 版 {now} 已執行 $$$')
    _TG機器人系列._TG多工機器人()

# 執行本程式系列 \