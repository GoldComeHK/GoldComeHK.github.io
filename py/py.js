

/**
 * \ n 轉  @換行@
 * 
 */



更新日期 = '202505040127'







/*
      ::::::::       ::::::::::           :::        :::::::::       ::::::::       :::    :::
    :+:    :+:      :+:                :+: :+:      :+:    :+:     :+:    :+:      :+:    :+:
   +:+             +:+               +:+   +:+     +:+    +:+     +:+             +:+    +:+
  +#++:++#++      +#++:++#         +#++:++#++:    +#++:++#:      +#+             +#++:++#++
        +#+      +#+              +#+     +#+    +#+    +#+     +#+             +#+    +#+
#+#    #+#      #+#              #+#     #+#    #+#    #+#     #+#    #+#      #+#    #+#
########       ##########       ###     ###    ###    ###      ########       ###    ###
*/

搜HK = `
### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
def _搵客鍠B(keyword=''):

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
        搵客鍠_driver = _chrome_雜項._Chrome設定('搵客鍠')
        搵客鍠_driver.maximize_window() # 最大化窗口

        公司名xpath = 勞工處XPATH['公司名xpath']
        表格xpath = 勞工處XPATH['表格xpath']
        電話開頭 = '4569'
        電話位數 = 7
        最多找資料數 = @找幾料@

        _金come_VIP._獲取帳號資料(@帳號1181@)

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
        _雜項._執行中說明('執行中說明',f'*** 正在搜尋[{keyword}]有{顯總料數}個公司資料 @ 香港勞工處 ***')

        找頁數 = 1
        _每頁量 = 20
        while True:
            
            if int(顯總料數) == 0:
                _雜項._執行中說明('執行中說明',"沒有資料，搜尋結束...")
                break

            _雜項._執行中說明('執行中說明',f"獲取第{找頁數}頁...")
            # 6. 擷取工作列表中的所有 href 連結
            WebDriverWait(搵客鍠_driver, 10).until(
                EC.presence_of_element_located((By.XPATH, 勞工處XPATH['工作列表']))
            )
            rows = 搵客鍠_driver.find_elements(By.XPATH, 勞工處XPATH['工作列表中的所有href'])
            # 遍历每行提取链接
            for row in rows:
                網址 = row.get_attribute('href')
                客的真聯 = _搵客鍠._提取聯絡方式(網址,公司名xpath,表格xpath,[電話開頭,電話位數])
                if 客的真聯:
                    all_Boss料.append(客的真聯)
                    _雜項._執行中說明('執行中說明',f'{客的真聯}')
                    if len(all_Boss料) >= 最多找資料數 :
                        _雜項._執行中說明('執行中說明',f"已找{最多找資料數}個資料，結束搜尋")
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
            真all_Boss料 = _搵客鍠._西選重聯(all_Boss料)    #['利嘉閣地產有限公司=65340006',]
            _搵客鍠._聯Po網(真all_Boss料,'香港','@關鍵字@')
        driver.refresh()
        ######### Boss料PoHtml #########
        
    except Exception as e:
        _雜項._獲取詳細錯誤堆棧(*sys.exc_info())

_搵客鍠B('@關鍵字@')


## ${更新日期} ##
#########結束#########
`


















搜TW = `
### 台灣就業通 ###### 台灣就業通 ###### 台灣就業通 ###
def _搵客鍠B(keyword=''):

    電話開頭 = '0'
    電話位數 = 9
    最多找資料數 = @找幾料@
    
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
        _金come_VIP._獲取帳號資料(@帳號1181@)

        搵客鍠_driver = _chrome_雜項._Chrome設定('搵客鍠')
        搵客鍠_driver.maximize_window() # 最大化窗口

        # 去首頁
        while True:
            搵客鍠_driver.get("https://job.taiwanjobs.gov.tw/Internet/index/job_search_list.aspx?")
            if _chrome_雜項._檢查元素存在(搵客鍠_driver,'關鍵字輸入框',就業通XPATH['關鍵字輸入框']):
                break
            else:
                _雜項._執行中說明('執行中說明','等待載入首頁')

        # 输入关键字（等待输入框加载并输入内容）
        _chrome_雜項._檢查文字輸入(搵客鍠_driver,'關鍵字輸入框', 就業通XPATH['關鍵字輸入框'], keyword)

        # 点击搜索按钮（等待按钮可点击）
        _chrome_雜項._檢查點擊(搵客鍠_driver,'搜尋空缺按鈕',就業通XPATH['搜尋空缺按鈕'])

        # 取得資料總數
        顯總料數 = 0
        顯總料數 = _chrome_雜項._檢查元素存在(搵客鍠_driver,'顯總料數',就業通XPATH['顯總料數'])
        顯總料數 = 顯總料數.text.strip("()")
        _雜項._執行中說明('執行中說明',f'*** 正在搜尋[{keyword}]有{顯總料數}個公司資料 @ 台灣就業通 ***')
        if int(顯總料數) == 0:
            _雜項._執行中說明('執行中說明',"沒有資料，搜尋結束...")
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
            客的真聯 = _搵客鍠._提取聯絡方式(href,就業通XPATH['公司名xpath'],就業通XPATH['表格xpath'],[電話開頭,電話位數])
            if 客的真聯:
                all_Boss料.append(客的真聯)
                _雜項._執行中說明('執行中說明',f'{客的真聯}')

            if idx == 最多找資料數:
                _雜項._執行中說明('執行中說明',f"已找{最多找資料數}個資料，結束搜尋")
                break
        # 關閉瀏覽器
        搵客鍠_driver.quit()

        ######### Boss料PoHtml #########
        if all_Boss料:
            真all_Boss料 = _搵客鍠._西選重聯(all_Boss料)    #['盛棠企業行=0907690858',]
            _搵客鍠._聯Po網(真all_Boss料,'台灣','@關鍵字@')
        driver.refresh()
        ######### Boss料PoHtml #########

    except Exception as e:
        _雜項._獲取詳細錯誤堆棧(*sys.exc_info())

_搵客鍠B('@關鍵字@')

## ${更新日期} ##

#########結束#########
`
























































/*
    :::       :::       ::::::::
   :+:       :+:      :+:    :+:
  +:+       +:+      +:+
 +#+  +:+  +#+      +#++:++#++
+#+ +#+#+ +#+             +#+
#+#+# #+#+#       #+#    #+#
###   ###         ########

*/
客服 = `
class _客服鍠:

    国家代码 = '@国家代码@'
    电话号码 = '@电话号码@'
    回覆內容 = @回覆內容@    

    登入流程_xpaths = {
        # 必須按此排列
        '使用手機號碼登入':'//*[@id="app"]/div/div[2]/div[2]/div[2]/div/div[*]/div[*]/div[1]/div[5]/span/div',
        '国家选择':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[3]/div[1]/div[1]/button/div/div/div',
        '国家代码':'//*[@id="wa-popovers-bucket"]/div/div[2]/div/div[1]/div/div[2]/div/div/p',
        '地区选择':'//*[@id="wa-popovers-bucket"]/div/div[2]/div/div[2]/div/div/div/div/div/div/button/div/div/div[2]/div/div/div',
        '电话号码':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[3]/div[1]/div[2]/div/div/div/form/input',
        '登入按钮':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[3]/div[3]/button/div/div',
    }

    其他_xpaths = {
        '验证成功使用QR碼登入消失':'//*[@id="app"]/div/div[2]/div[2]/div[2]/div/div/div[7]/span/div',
        '验证字符頭':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[4]/div/div/div/div[',
        '验证字符尾':']/span',
        '對話列表':'//*[@id="pane-side"]/div[*]/div/div',
        '客戶信息位':'.//div/div/div/div[2]/div[2]/div[1]/span/span',

        'wsB發送按鈕':'//*[@id="main"]/footer/div[1]/div/span/div/div[2]/div/button',
        'ws發送按鈕':'//*[@id="main"]/footer/div[1]/div/span/div/div[2]/div/div[4]/button',

        '繼續前往對話':'//*[@id="action-button"]',
        '使用WhatsApp網頁版':'//*[@id="fallback_block"]/div/div/h4[2]/a',
        'Ws網頁版新功能':'//*[@id="app"]/div/span[2]/div/div/div/div/div/div/div[2]/div/button/div/div',
    }

    # Chrome設定
    _driver = None  # 預設為 None

    @classmethod
    def _取得driver(cls):
        if cls._driver is None:
            cls._driver = _chrome_雜項._Chrome設定('客服鍠')
        return cls._driver

    @classmethod
    def _登入ws(cls):
        客服鍠_driver = cls._取得driver()
        try:
            _金come_VIP._獲取帳號資料(@帳號1181@)

            while True:
                try:
                    # 打开WhatsApp网页版
                    客服鍠_driver.get("https://web.whatsapp.com/")
                    time.sleep(random.uniform(3, 20))

                    if _客服鍠._登入ws_等待對話列表出現():
                        _雜項._執行中說明('執行中說明',f"已登入WhatsApp，如需登入其他帳號，請登出再重新執行程式。")
                        break

                    # 段2 = 填寫手機號碼
                    try:
                        for 鍵, 值 in _客服鍠.登入流程_xpaths.items():
                            if 鍵 in ("国家代码", "电话号码"):
                                # 使用字典映射對應參數
                                參數映射 = {"国家代码": _客服鍠.国家代码, "电话号码": _客服鍠.电话号码}
                                if not _chrome_雜項._檢查文字輸入(客服鍠_driver,鍵, 值, 參數映射[鍵]):
                                    raise _ReloadPageException()
                            else:
                                if not _chrome_雜項._檢查點擊(客服鍠_driver,鍵,值):
                                    raise _ReloadPageException()
                            time.sleep(random.uniform(0.8, 4.8))
                    except _ReloadPageException:
                        continue

                    # 段3 = 等待验证码加载
                    time.sleep(5)
                    verification_code = []
                    for i in range(1, 9):
                        验证码字符XPATH = _客服鍠.其他_xpaths['验证字符頭'] + str(i) + _客服鍠.其他_xpaths['验证字符尾']
                        try:
                            code_element = WebDriverWait(客服鍠_driver, 30).until(
                                EC.visibility_of_element_located((
                                    By.XPATH,
                                    验证码字符XPATH))
                            )
                            verification_code.append(code_element.text)
                        except _ReloadPageException:
                            _雜項._執行中說明('執行中說明',f"无法获取验证码字符:")
                            continue
                    _雜項._執行中說明('執行中說明',f"驗證碼為:@換行@{''.join(verification_code)}@換行@等待手機端填寫驗證碼...")

                    # 段4 = 等待验证成功後 使用QR碼登入 消失
                    WebDriverWait(客服鍠_driver, 180).until_not(
                        EC.presence_of_element_located((
                            By.XPATH,
                            _客服鍠.其他_xpaths['验证成功使用QR碼登入消失']
                        ))
                    )

                    # Ws網頁版新功能
                    try:
                        _chrome_雜項._檢查點擊(客服鍠_driver,'Ws網頁版新功能', _客服鍠.其他_xpaths['Ws網頁版新功能'])
                    except:
                        pass

                    # 段5 = 验证成功 等待對話列表出現
                    time.sleep(random.uniform(3.8, 5.8))
                    _客服鍠._登入ws_等待對話列表出現()

                except Exception as e:
                    _雜項._獲取詳細錯誤堆棧(*sys.exc_info())
                    continue

            # 段6 = send登入信息比admin
            _客服鍠._send登入信息比admin()
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





    @classmethod
    def _send登入信息比admin(cls):
        客服鍠_driver = cls._取得driver()

        send料 = f"https://api.whatsapp.com/send/?phone={官Ws}&text={月費用戶}%0D%0A{本程式名}%0D%0A{帳號1181}"
        發成功 = '成功登入WhatsApp'
        try:
            客服鍠_driver.get(send料)
            while True:
                try:
                    try:
                        _chrome_雜項._檢查點擊(客服鍠_driver,' 繼續前往對話 ', _客服鍠.其他_xpaths['繼續前往對話'])
                        _chrome_雜項._檢查點擊(客服鍠_driver,' 使用WhatsApp網頁版 ', _客服鍠.其他_xpaths['使用WhatsApp網頁版'])
                    except:
                        pass

                    # 等待輸入框出現並輸入回覆
                    try:
                        if _chrome_雜項._檢查點擊(客服鍠_driver,' wsB發送按鈕 ', _客服鍠.其他_xpaths['wsB發送按鈕']):
                            _雜項._執行中說明('執行中說明',f'{發成功} business')
                            break
                        if _chrome_雜項._檢查點擊(客服鍠_driver,' ws發送按鈕 ', _客服鍠.其他_xpaths['ws發送按鈕']):
                            _雜項._執行中說明('執行中說明',發成功)
                            break
                    except:
                        pass
                except:
                    continue
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





    計等錢 = 0
    @classmethod
    def _ws自動客服(cls):
        客服鍠_driver = cls._取得driver()
        try:
            while True:
                try:
                    _客服鍠._登入ws_等待對話列表出現()
                    break
                except:
                    continue

            while True:
                _客服鍠.計等錢 +=1
                _雜項._執行中說明('執行中說明',f"你已收到{_客服鍠.計等錢}萬元")

                try:
                    # 每次迭代時重新獲取 chat_list
                    chat_list = WebDriverWait(客服鍠_driver, 30).until(
                        EC.presence_of_all_elements_located((By.XPATH, _客服鍠.其他_xpaths['對話列表']))
                    )
                    
                    for chat in chat_list:
                        try:
                            # 每次點擊前重新獲取 chat 元素
                            chat = _chrome_雜項._檢查元素存在(客服鍠_driver,'客戶信息位',_客服鍠.其他_xpaths['客戶信息位'])
                            客來詢 = chat.text

                            # 判斷是否需回覆
                            if 客來詢 in _客服鍠.回覆內容:
                                chat.click()  # 點擊進入對話
                                _客服鍠._ws自動回覆(客來詢)

                            if 客來詢[0:4] == '#遠端鍠':
                                _遠端鍠(客來詢)

                        except StaleElementReferenceException:
                            _雜項._執行中說明('執行中說明',"元素已過期，重新取得 chat 元素...")
                            continue
                        except TimeoutException:
                            _雜項._執行中說明('執行中說明',"等待訊息載入超時，跳過此聊天...")
                            continue
                except TimeoutException:
                    continue
                time.sleep(3)
                continue
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





    @classmethod
    def _ws自動回覆(cls,來):
        客服鍠_driver = cls._取得driver()
        try:
            if not 月費用戶:
                _金come_VIP._檢查使用次數(客服鍠_driver)

            try:
                # 使用 ActionChains 替换所有 @換行@ 为 Shift+Enter
                actions = ActionChains(客服鍠_driver)
                處理後內容 = _客服鍠.回覆內容[來].split('@換行@')
                for i, 處理後內容 in enumerate(處理後內容):
                    if i > 0:  # 从第二行开始换行
                        actions.key_down(Keys.SHIFT).send_keys(Keys.ENTER).key_up(Keys.SHIFT)
                    actions.send_keys(處理後內容)

                actions.send_keys(Keys.RETURN)  # 最后提交
                actions.perform()

                _雜項._執行中說明('執行中說明',f"客戶: {來}，已自動回覆@換行@{_客服鍠.回覆內容[來]}@換行@")
                _客服鍠.計等錢 = 0  # 回覆成功，重置_客服鍠.計等錢

            except TimeoutException as e:
                _雜項._執行中說明('執行中說明',f"操作超时: {str(e)}")
            except Exception as e:
                _雜項._執行中說明('執行中說明',f"发生错误: {str(e)}")
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())




    檢列 = 0
    @classmethod
    def _登入ws_等待對話列表出現(cls):
        客服鍠_driver = cls._取得driver()
        try:
            try:
                WebDriverWait(客服鍠_driver, 5).until(
                EC.presence_of_element_located((
                    By.XPATH,
                    _客服鍠.其他_xpaths['對話列表']  # 同时验证属性
                ))
                )
                return True
            except TimeoutException:
                _客服鍠.檢列 += 1
                if _客服鍠.檢列 > 3:
                    _客服鍠.檢列 = 0
                    _雜項._請告知作者更新('對話列表', _客服鍠.其他_xpaths['對話列表'])
                return False
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())

_客服鍠._登入ws()
_客服鍠._ws自動客服()


## ${更新日期} ##

#########結束#########
`



























































/*
      ::::::::       ::::::::::       :::        :::
    :+:    :+:      :+:              :+:        :+:
   +:+             +:+              +:+        +:+
  +#++:++#++      +#++:++#         +#+        +#+
        +#+      +#+              +#+        +#+
#+#    #+#      #+#              #+#        #+#
########       ##########       ########## ##########

*/

促銷 = `
############# 促銷鍠 #
class _促銷鍠:

    def _執行_自動send野(all客聯=''):
        try:
            _金come_VIP._獲取帳號資料(@帳號1181@)

            由這mail = '@促銷gmail@'
            由這mail的key = '@gmail應密@'
            促銷間隔天數 = @間隔天@
            信件標題 = '@標題@'
            宣傳文 = f'''@促銷信@'''

            all客聯 = '''@搵客鍠結果@'''
            all客聯B = _促銷鍠._整all客聯(all客聯)

            all結果睇 = []
            all結果Save = []

            if Admin模式: 
                測料 = ['Ad測料1=98672794','Ad測料2=moksurky@gmail.com','Ad測料3=lamelle1995@gmail.com','Ad測料4=wongcyres@gmail.com',]
                for index, 結果 in enumerate(測料):
                    # 非vip限制每次只發5封
                    if (not 月費用戶) and (index == 2):
                        _雜項._執行中說明('執行中說明','非vip限制每次只發5封')
                        break
                    公司名稱,老闆聯絡 = 結果.split('=')
                    老闆信 = _促銷鍠._整字雜項(信件標題, 老闆聯絡, 公司名稱, 宣傳文)
                    # 是ws
                    結果 = f'<a href="{老闆信[0]}" class="臨時結果" target="_blank">手動 whatsapp to[{公司名稱}:{老闆聯絡}]</a>'
                    # 是email
                    if 老闆信[1] == True:
                        標題 = 老闆信[0].split('?subject=')[1].split('&body=')[0]
                        內文 = 老闆信[0].split('&body=')[1]
                        發成點 = _促銷鍠._自動sendGmail(標題, 內文, 老闆聯絡, [由這mail,由這mail的key])
                        if 發成點:
                            結果 = f'[ {公司名稱}:{老闆聯絡} ]=成功發送郵件'
                        else:
                            結果 = f'[ {公司名稱}:{老闆聯絡} ]={發成點}'

                        _雜項._執行中說明('執行中說明',結果)
                    all結果睇.append(結果)
                    all結果Save.append(結果)
                _促銷鍠._促銷鍠Po網(all結果睇,all結果Save)
                return

            for index, (公司名稱, 老闆聯絡) in enumerate(all客聯B.items(), start=1):  # 添加枚举器
                # 非vip限制每次只發5封
                if (not 月費用戶) and (index == 5):
                    _雜項._執行中說明('執行中說明','非vip限制每次只發5封')
                    break

                老闆信 = _促銷鍠._整字雜項(信件標題, 老闆聯絡, 公司名稱, 宣傳文)

                # 是ws
                結果 = f'<a href="{老闆信[0]}" class="臨時結果" target="_blank">手動 whatsapp to[{公司名稱}:{老闆聯絡}]</a>'
                結果Save = f'[ {公司名稱}:{老闆聯絡} ]=手動 whatsapp 發出'

                # 是email
                if 老闆信[1] == True:
                    if _促銷鍠._檢查郵件7天已發(老闆聯絡, 促銷間隔天數,[由這mail,  由這mail的key]) == '冇':
                        標題 = 老闆信[0].split('?subject=')[1].split('&body=')[0]
                        內文 = 老闆信[0].split('&body=')[1]
                        發成點 = _促銷鍠._自動sendGmail(標題, 內文, 老闆聯絡, [由這mail,由這mail的key])
                        if 發成點:
                            結果 = f'[ {公司名稱}:{老闆聯絡} ]=成功發送郵件'
                        else:
                            結果 = f'[ {公司名稱}:{老闆聯絡} ]={發成點}'
                    else:
                        結果 = f'[ {公司名稱}:{老闆聯絡} ]={促銷間隔天數}天內已發過'
                    結果Save = 結果

                    _雜項._執行中說明('執行中說明',結果)
                all結果睇.append(結果)
                all結果Save.append(結果Save)

            # ==== html ====
            _促銷鍠._促銷鍠Po網(all結果睇,all結果Save)
            
            # ==== html ====
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





            
    def _檢查郵件7天已發(to_email, 間隔, 由這):
        try:
            有冇semd = '有'
            # 连接到 Gmail 的 IMAP 服务器
            mail = imaplib.IMAP4_SSL('imap.gmail.com')

            # 登录
            mail.login(由這[0], 由這[1])
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
            date_since = (datetime.now() - timedelta(days=間隔)).strftime("%d-%b-%Y")

            # 搜索发件人和收件人，限制为7天内的邮件
            status, messages = mail.search(None, f'TO "{to_email}" SINCE {date_since}')

            # 获取邮件ID列表
            email_ids = messages[0].split()
            if not email_ids:
                有冇semd = '冇'

            # 关闭连接
            mail.logout()

            #_雜項._執行中說明('執行中說明',f"7天內 [{有冇semd}] 發過郵件給[{to_email}] ")
            return 有冇semd
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





            
    # 在 Gmail 帳戶中，您可以前往 Google 帳戶設定 > "安全性" > "應用程式密碼" 來生成應用程式專用密碼。
    # https://myaccount.google.com/u/1/apppasswords?pli=1&rapt=AEjHL4NB4hK6Th7KGvq8QXmew8zX6e0Q0vg_Ruwjaxi6rHdyqR9HRAen2ocS95fglp1iHWQ2zcuydfYf4-aeUc4F2sJBPQ0s7iayeTEjdPFPKUTS0UILi60
    def _自動sendGmail(subject, body, to_email, 由這):
        try:
            # 创建邮件对象
            msg = MIMEMultipart()
            msg['From'] = 由這[0]
            msg['To'] = to_email
            msg['Subject'] = subject

            # 添加邮件内容
            msg.attach(MIMEText(body, 'html', 'utf-8'))

            try:
                # 连接到 Gmail 的 SMTP 服务器
                server = smtplib.SMTP('smtp.gmail.com', 587)
                server.starttls()  # 启动 TLS 加密
                server.login(由這[0], 由這[1])

                # 发送邮件
                server.send_message(msg)

                發成點 = True
            except Exception as e:
                發成點 = f'郵件發送失敗: {e}'
            finally:
                server.quit()

            return 發成點
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





            
    def _整字雜項(信件標題, 聯絡方式, 公司名稱, 宣傳文):
        try:
            是email = True

            # 刪空格及符號
            公司名稱 = re.sub(r'[^\w\u4e00-\u9fff]', '', 公司名稱)
            聯絡方式 = 聯絡方式.replace(' ', '')

            # 分類聯絡並加字
            聯絡方式B = ''
            if '@' in 聯絡方式:
                聯絡方式B = f"mailto:{聯絡方式}?subject=尊敬的{公司名稱}{信件標題}&body="
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
                宣傳文 = re.sub(
                    r'<br style="display: none;">.*?(?=<br style="display: none;">|$)',  
                    '', 
                    宣傳文,
                    flags=re.DOTALL
                )

                宣傳文 = f'{宣傳文}%0A%0A{我wsLink}%0A%0A{圖all}'

                宣傳文 = 宣傳文.replace('<br>', '%0A').replace('&nbsp;', '%20').replace('=', '%3D')
                是email = False

            sell客文 = f"{聯絡方式B}尊敬的{公司名稱}{宣傳文}"
            return sell客文,是email
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





            
    def _整all客聯(客聯):
        try:
            # 初始化字典
            all客聯B = {}

            # 按行分割
            lines = 客聯.split('@換行@')

            for line in lines:
                line = line.strip()  # 去除首尾空格
                if not line or line.startswith('[') or line.startswith('---'):
                    continue  # 跳過空行、日期行和分隔線
                if '=' in line:
                    company, contact = line.split('=', 1)  # 分割公司名和聯繫方式
                    all客聯B[company.strip()] = contact.strip()

            return all客聯B
        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())






    def _促銷鍠Po網(結果睇, 結果Save):
        try:
            # 取得當前時間
            now = datetime.now()
            現在時間 = now.strftime("[%Y-%m-%d|%H:%M:%S]")

            # 確保輸入是列表（如果不是，轉成列表）
            if not isinstance(結果睇, (list, tuple)):
                結果睇 = [結果睇]
            if not isinstance(結果Save, (list, tuple)):
                結果Save = [結果Save]

            # (1) 處理「顯示用」的內容（HTML格式，用 <br> 換行）
            html_content = f"{現在時間}[促銷鍠結果|{vip}]<br>"
            html_content += "<br>".join(str(item) for item in 結果睇)  # 用 <br> 連接每一條結果
            html_content += "<br>---------<br>"  # 加入分隔線

            # (2) 處理「儲存用」的內容（純文字格式，用 @換行@ 換行）
            text_content = f"{現在時間}[促銷鍠結果|{vip}]@換行@"
            text_content += "@換行@".join(str(item) for item in 結果Save)  # 用 @換行@ 連接每一條結果
            text_content += "@換行@---------@換行@"  # 加入分隔線

            # 更新 HTML 元素（臨時結果）
            driver.execute_script("""
                const tempResult = document.getElementById('臨時結果');
                tempResult.innerHTML = arguments[0] + (tempResult.innerHTML || "");
            """, html_content)

            # 更新 textarea（促銷鍠結果）
            driver.execute_script("""
                const textarea = document.getElementById('促銷鍠結果');
                textarea.value = arguments[0] + (textarea.value || "");
            """, text_content)

        except Exception as e:
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info())





_促銷鍠._執行_自動send野()

## ${更新日期} ##

#########結束#########
`