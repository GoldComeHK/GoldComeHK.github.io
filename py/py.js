

/**
 * \n 轉  @換行@
 * 
 */




搜HK = `
### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
##################  202504241656  ####################
def _自動獲取香港勞工處工作資料(keyword=''):

    勞工處XPATH = {
        '左上資料數':'//*[@id="content-innerdiv"]/div[1]/div[1]/strong[1]',
        '勞工處點擊下一頁按鈕':'//*[@id="swapNextPage"]',
        '列表顯示':'//*[@id="content-innerdiv"]/div[1]/div/div[2]/a',
        '公司名xpath':'//*[@id="empName"]/text()',
        '表格xpath':'//*[@id="jobOrderTable"]',

        '工作列表':'//*[@id="job_list_table"]/tbody',
        '工作列表中的所有href':'//*[@id="job_list_table"]//a[contains(@id, "_orderNo_hyper")]'
    }

    try:
        最多找幾頁 = _金come_VIP._獲取帳號資料(@帳號1181@)

        搵客鍠_driver = _chrome_雜項._Chrome設定('搵客鍠')
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
        search_box = 搵客鍠_driver.find_element(By.ID, "simp_searchKeyword")
        search_box.send_keys(keyword)
        search_button = 搵客鍠_driver.find_element(By.ID, "btnSearch")
        search_button.click()

        列表顯示 = 搵客鍠_driver.find_element(By.XPATH, 勞工處XPATH['列表顯示'])
        列表顯示.click()

        #print("目前網址:", 搵客鍠_driver.current_url)

        找頁數 = 0
        顯總料數 = 0
        _每頁量 = 20
        while True:

            # 取得資料總數
            顯總料數 = WebDriverWait(搵客鍠_driver, 9).until(
                EC.visibility_of_element_located((By.XPATH, 勞工處XPATH['左上資料數']))
            )
            顯總料數 = 顯總料數.text.strip()
            print(f'*** 正在搜尋[{keyword}]有{顯總料數}個公司資料 @ 香港勞工處 ***')

            print(f"type(顯總料數)...{type(顯總料數)}")
            if int(顯總料數) == 0:
                print("沒有資料，搜尋結束...")
                break

            print(f"獲取第{找頁數+1}頁...")

            # 6. 擷取工作列表中的所有 href 連結
            WebDriverWait(搵客鍠_driver, 10).until(
                EC.presence_of_element_located((By.XPATH, 勞工處XPATH['工作列表']))
            )
            rows = 搵客鍠_driver.find_elements(By.XPATH, 勞工處XPATH['工作列表中的所有href'])

            print(f'結果列表中每行')
            # 遍历每行提取链接
            for row in rows:
                網址 = row.get_attribute('href')
                客的真聯 = _提取聯絡方式(網址,公司名xpath,表格xpath,[電話開頭,電話位數])
                if 客的真聯:
                    all_Boss料.append(客的真聯)
                    print(f'{客的真聯}')

            if 找頁數 >= 最多找幾頁 :
                print(f"第{找頁數}頁，結束搜尋")
                break

            # 點擊下一頁按鈕
            if int(顯總料數) > _每頁量:
                # 點擊下一頁按鈕
                _chrome_雜項._檢查點擊('勞工處點擊下一頁按鈕',勞工處XPATH['勞工處點擊下一頁按鈕'])
                _每頁量 += 20
                找頁數 +=1
            else:
                break
        # 關閉瀏覽器
        搵客鍠_driver.quit()

        ######### Boss料PoHtml #########
        真all_Boss料 = _搵客鍠._西選重聯(all_Boss料)
        _搵客鍠._聯Po網(真all_Boss料,'@關鍵字@')
        ######### Boss料PoHtml #########
        
    except Exception as e:
        print(f"_自動獲取香港勞工處工作資料-執行錯誤: {e}")
        _雜項._獲取詳細錯誤堆棧(*sys.exc_info())




def _提取聯絡方式(url,公司名xpath,表格xpath,電話篩選):
    try:
        # 獲取網頁內容
        response = requests.get(url)
        response.raise_for_status()  # 檢查請求是否成功

        # 解析HTML
        tree = html.fromstring(response.content)

        # 1. 提取公司名稱、廣告整頁內容
        company_name = tree.xpath(公司名xpath)[0]   #qqqq
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

_自動獲取香港勞工處工作資料('@關鍵字@')
#########結束#########
`






























































客服 = `
class _客服鍠:


    国家代码 = '@国家代码@'
    电话号码 = '@电话号码@'
    回覆內容 = @回覆內容@    


    登入流程_xpaths = {
        # 必須按此排列
        '使用手機號碼登入':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[2]/div[1]/div[5]/span/div',
        '国家选择':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[3]/div[1]/div[1]/button/div/div/div',
        '国家代码':'//*[@id="wa-popovers-bucket"]/div/div[2]/div/div[1]/div/div[2]/div/div/p',
        '地区选择':'//*[@id="wa-popovers-bucket"]/div/div[2]/div/div[2]/div/div/div/div/div/div/button/div/div/div[2]/div/div/div',
        '电话号码':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[3]/div[1]/div[2]/div/div/div/form/input',
        '登入按钮':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[3]/div[3]/button/div/div'
    }

    其他_xpaths = {
        '验证成功使用QR碼登入消失':'//*[@id="app"]/div/div[2]/div[2]/div[2]/div/div/div[7]/span/div',
        '验证字符頭':'//*[@id="app"]/div/div[2]/div[2]/div[*]/div/div/div[4]/div/div/div/div[',
        '验证字符尾':']/span',
        '對話列表':'//*[@id="pane-side"]/div[*]/div/div',
        '客戶信息位':'.//div/div/div/div[2]/div[2]/div[1]/span/span',
        '對話輸入框':'//*[@id="main"]/footer/div[1]/div/span/div/div[2]/div[1]/div[2]/div[*]/p'
    }

    客服鍠_driver = _chrome_雜項._Chrome設定('客服鍠')


    def _登入ws():
        try:
            _金come_VIP._獲取帳號資料(@帳號1181@)

            while True:
                try:
                    # 打开WhatsApp网页版
                    _客服鍠.客服鍠_driver.get("https://web.whatsapp.com/")
                    time.sleep(random.uniform(3, 6))

                    if _客服鍠._登入ws_等待對話列表出現():
                        print(f"已登入WhatsApp,如需登入其他帳號，請登出再重新執行程式。")
                        break

                    # 段2 = 填寫手機號碼
                    try:
                        for 鍵, 值 in _客服鍠.登入流程_xpaths.items():
                            if 鍵 in ("国家代码", "电话号码"):
                                # 使用字典映射對應參數
                                參數映射 = {"国家代码": _客服鍠.国家代码, "电话号码": _客服鍠.电话号码}
                                if not _chrome_雜項._檢查文字輸入(鍵, 值, 參數映射[鍵]):
                                    raise _ReloadPageException()
                            else:
                                if not _chrome_雜項._檢查點擊(鍵,值):
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
                            code_element = WebDriverWait(_客服鍠.客服鍠_driver, 30).until(
                                EC.visibility_of_element_located((
                                    By.XPATH, 
                                    验证码字符XPATH))
                            )
                            verification_code.append(code_element.text)
                        except _ReloadPageException:
                            print(f"无法获取验证码字符:")
                            continue
                    print("@換行@验证码为:", ''.join(verification_code))

                    # 段4 = 等待验证成功後 使用QR碼登入 消失
                    print("等待手機端填寫验证碼...")
                    WebDriverWait(_客服鍠.客服鍠_driver, 180).until_not(
                        EC.presence_of_element_located((
                            By.XPATH, 
                            _客服鍠.其他_xpaths['验证成功使用QR碼登入消失']
                        ))
                    )
                    
                    # 段5 = 验证成功 等待對話列表出現
                    time.sleep(random.uniform(3.8, 5.8))
                    _客服鍠._登入ws_等待對話列表出現()

                except Exception as e:
                    print(f"主程序出错: {str(e)}")
                    print(f"登入WhatsApp超时，刷新页面...")
                    continue

            # 段6 = send登入信息比admin
            _客服鍠._send登入信息比admin()
        except Exception as e:
            print(f"_登入ws-執行錯誤: {e}")
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info()) 






    def _send登入信息比admin():
        try:
            _客服鍠.客服鍠_driver.get(f"https://api.whatsapp.com/send/?phone={官Ws}&text={月費用戶}%0D%0A{本程式名}%0D%0A{帳號1181}")

            while True:
                try:
                    _chrome_雜項._檢查點擊('繼續前往對話','//*[@id="action-button"]')
                    _chrome_雜項._檢查點擊('使用 WhatsApp 網頁版','//*[@id="fallback_block"]/div/div/h4[2]/a')

                    # 等待輸入框出現並輸入回覆
                    對話輸入框 = WebDriverWait(_客服鍠.客服鍠_driver, 10).until(
                        EC.presence_of_element_located((By.XPATH, _客服鍠.其他_xpaths['對話輸入框']))
                    )

                    對話輸入框.send_keys(Keys.RETURN)
                    print("成功登入WhatsApp")
                    break
                except:
                    continue
        except Exception as e:
            print(f"_登入ws-執行錯誤: {e}")
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info()) 





    計等錢 = 0
    def _ws自動客服():
        try:
            while True:
                try:
                    _客服鍠._登入ws_等待對話列表出現()
                    break
                except:
                    continue
            
            while True:
                _客服鍠.計等錢 +=1
                print(f"你已收到{_客服鍠.計等錢}萬元")

                try:
                    # 每次迭代時重新獲取 chat_list
                    chat_list = WebDriverWait(_客服鍠.客服鍠_driver, 30).until(
                        EC.presence_of_all_elements_located((By.XPATH, _客服鍠.其他_xpaths['對話列表']))
                    )

                    for chat in chat_list:
                        try:
                            # 每次點擊前重新獲取 chat 元素
                            chat = WebDriverWait(_客服鍠.客服鍠_driver, 10).until(
                                EC.presence_of_element_located((By.XPATH,_客服鍠.其他_xpaths['客戶信息位']))
                            )
                            客來詢 = chat.text

                            # 判斷是否需回覆
                            if 客來詢 in _客服鍠.回覆內容:
                                chat.click()  # 點擊進入對話
                                _客服鍠._ws自動回覆(客來詢)
                        except StaleElementReferenceException:
                            print("元素已過期，重新取得 chat 元素...")
                            continue
                        except TimeoutException:
                            print("等待訊息載入超時，跳過此聊天...")
                            continue
                except TimeoutException:
                    continue
                time.sleep(3)
                continue
        except Exception as e:
            print(f"_ws自動客服-執行錯誤: {e}")
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info()) 





    def _ws自動回覆(來):
        try:
            if not 月費用戶:
                _金come_VIP._檢查使用次數()

            try:
                # 等待輸入框出現並輸入回覆
                WebDriverWait(_客服鍠.客服鍠_driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, _客服鍠.其他_xpaths['對話輸入框']))
                )

                # 使用 ActionChains 替换所有 @換行@ 为 Shift+Enter
                actions = ActionChains(_客服鍠.客服鍠_driver)
                處理後內容 = _客服鍠.回覆內容[來].split('@換行@')
                for i, 處理後內容 in enumerate(處理後內容):
                    if i > 0:  # 从第二行开始换行
                        actions.key_down(Keys.SHIFT).send_keys(Keys.ENTER).key_up(Keys.SHIFT)
                    actions.send_keys(處理後內容)

                actions.send_keys(Keys.RETURN)  # 最后提交
                actions.perform()

                print(f"客戶: {來}, 已自動回覆@換行@{_客服鍠.回覆內容[來]}@換行@")
                _客服鍠.計等錢 = 0  # 回覆成功，重置_客服鍠.計等錢

            except TimeoutException as e:
                print(f"操作超时: {str(e)}")
            except Exception as e:
                print(f"发生错误: {str(e)}")
        except Exception as e:
            print(f"_ws自動回覆-執行錯誤: {e}")
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info()) 




    檢列 = 0
    def _登入ws_等待對話列表出現():
        try:
            try:
                WebDriverWait(_客服鍠.客服鍠_driver, 5).until(
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
            print(f"_登入ws_等待對話列表出現-執行錯誤: {e}")
            _雜項._獲取詳細錯誤堆棧(*sys.exc_info()) 


_客服鍠._登入ws()
_客服鍠._ws自動客服()
#########結束#########
`