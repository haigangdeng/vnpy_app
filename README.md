# vnpy_app
vnpy手机端App - 基于Python的开源量化交易平台开发框架

![image](https://static.vnpy.com/upload/temp/3b2a6dad-e537-4a73-beac-3ab9066321b9.jpg)
![image](https://static.vnpy.com/upload/temp/9b1ba192-4ff9-4222-a649-53b3eb15267b.jpg)
![image](https://static.vnpy.com/upload/temp/bf79b88a-4538-47c5-aaa5-cea5c12c8ea8.jpg)
![image](https://static.vnpy.com/upload/temp/b8e26798-d584-44ff-bfc6-41e878a7eba8.jpg)
![image](https://static.vnpy.com/upload/temp/fb5d3cbc-a40d-4296-bcd0-e7da5d0d4546.jpg)

使用步骤：
需要在服务器端添加跨域许可  
C:\veighna_studio\Lib\site-packages\vnpy_webtrader\web.py  
添加引用  
from fastapi.middleware.cors import CORSMiddleware  
第133行 app = FastAPI() 之后添加  
app.add_middleware(  
CORSMiddleware,  
allow_origins=[""],  
allow_credentials=True,  
allow_methods=[""],  
allow_headers=["*"],  
)  
  
用HBuilder开直接编辑，其中UI皮肤使用的是GraceUI 3.0版，可自行购买使用。  
如果嫌麻烦，可以直接扫码安装安卓版  

![image](https://static.vnpy.com/upload/temp/331c6254-9642-45c2-9462-84879d456da8.png)

