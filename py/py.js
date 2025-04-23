






搜HK = `### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
### 勞工處 ###### 勞工處 ###### 勞工處 ###### 勞工處 ###
def _自動獲取香港勞工處工作資料(keyword=''):

    _金come_VIP._獲取帳號資料(@帳號1181@)
    

    搵客鍠_driver = _chrome_雜項._Chrome設定('搵客鍠')
    #print("搵客鍠_driver id =", id(搵客鍠_driver))

    公司名xpath = '//*[@id="empName"]/text()'
    表格xpath = '//*[@id="jobOrderTable"]'
    電話開頭 = '4569'
    電話位數 = 7
    最多找幾頁 = 10
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

    #print(f'正確勞工處ul={勞工處ulr}')

    搵客鍠_driver.get(勞工處ulr)
    # 填寫關鍵字並點擊搜尋按鈕
    search_box = 搵客鍠_driver.find_element(By.ID, "simp_searchKeyword")
    search_box.send_keys(keyword)
    search_button = 搵客鍠_driver.find_element(By.ID, "btnSearch")
    search_button.click()
    
    找頁數 = 0
    顯總料數 = 0
    _每頁量 = 20
    while True:
    # 等待搜尋結果加載完成
        WebDriverWait(搵客鍠_driver, 10).until(EC.url_changes(勞工處ulr))

        # 獲取搜尋結果的HTML
        page_source = 搵客鍠_driver.page_source

        # 解析HTML並提取工作資料
        soup = BeautifulSoup(page_source, "html.parser")
        content_div = soup.find("div", id="content-innerdiv")
        job_listings = content_div.find_all("tr", class_="bg-white")

        # 取得資料總數
        if 顯總料數 == 0:
            total_jobs = soup.find("div", class_="py-2 d-lg-none").strong.text.strip()
            print(f'*** {total_jobs}個公司資料 @ 香港勞工處 ***')
            顯總料數 = 1

        勞工處ulB = 勞工處ulr.replace('0/tc/jobseeker/jobsearch/joblist/', '')
        for job in job_listings:
            網址 = 勞工處ulB + job.find_next("a")["href"]

            客的真聯 = _搵客鍠_雜項._提取聯絡方式(網址,公司名xpath,表格xpath,[電話開頭,電話位數])
            if 客的真聯:
                all_Boss料.append(客的真聯)
                print(f'{客的真聯}')

        if isinstance(最多找幾頁, (int)):  # 检查是否是数字
            if 找頁數 >= 最多找幾頁 :
                print(f"第{找頁數}頁，結束搜尋")
                break

        # 點擊下一頁按鈕
        if int(total_jobs) > _每頁量:
            # 點擊下一頁按鈕
            next_page_button = 搵客鍠_driver.find_element(By.XPATH, '//*[@id="content-innerdiv"]/div[4]/div/a[3]')
            next_page_button.click()
            _每頁量 += 20
            找頁數 +=1
        else:
            break
    # 關閉瀏覽器
    搵客鍠_driver.quit()

    #################
    真all_Boss料 = _搵客鍠_雜項._西選重聯(all_Boss料)
    #print(f'真all_Boss料={真all_Boss料}') # ['基督教家庭服務中心:recruit@cfsc.org.hk', 'ZOE COMPANY LIMITED:98489878']
    print(f'==========')
    #################

    # 時間生成
    now = datetime.now()
    現在時間 = now.strftime("[%Y-%m-%d|%H:%M:%S]")
    
    # 转换为带换行的字符串（每条记录占一行）
    真all_Boss料_print到html = f"{現在時間}<br>" + "<br>".join(真all_Boss料) + "<br>---------<br>"  # 最后加两个换行保证分隔

    driver.execute_script(
    """
    const tempResult = document.getElementById('臨時結果');
    // 将内容写入臨時結果（使用innerHTML以支持<br>换行）
    let newContent = arguments[0];
    
    // 如果臨時結果已有内容，在前面添加新内容（保持原有内容）
    if (tempResult.innerHTML) {
        tempResult.innerHTML = newContent + '<br>' + tempResult.innerHTML;
    } else {
        tempResult.innerHTML = newContent;
    }
    """,
    真all_Boss料_print到html.strip()  # 移除末尾多余换行
    driver.refresh()
)

_自動獲取香港勞工處工作資料('@關鍵字@')
#########結束#########
`