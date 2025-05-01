import os



if __name__ == "__main__":

  print("0.ico必須與.py檔同一個資料夾")
  exe名 = input("請輸入.py檔名(不需要.py)：")

  封裝exe指令 = f'pyinstaller -F -i 0.ico {exe名}.py -n {exe名}'

  process = os.popen(封裝exe指令)

  input('''
1.更新日期=
  py/
    py.js
    Goldcome.py

2.https://github.com/GoldComeHK/GoldComeHK.github.io/releases/new
        
3.Choosea tag = v更新日期
  title = v更新日期金come
  Write = 
更新日期

This is a pytohn and html program
Function:
Search company information
AI Tool Collection
Send email
WhatsApp Auto Reply
        
新內容
        
4.up exe檔
        
5.Publish release

===============
        
任意鍵關閉視窗...
''')
  