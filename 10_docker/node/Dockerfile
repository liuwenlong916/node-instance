#d指定node镜像版本
FROM node:10-alpine
# . ->当前目录，移动当前目录下面的文件到app目录下
ADD . /app/
# 进入app目录，类似cd
WORKDIR /app
# 安装j依赖
RUN npm install
# 对外暴露的端口
EXPOSE 3000
# 程序启动脚本
CMD ["node","app.js"]

