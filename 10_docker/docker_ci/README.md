# docker_ci

测试使用 Docker / Github Webhook 实现 CI 持续集成

- docker-compose
- gitlab webhooks

## 示例代码运行

- NodeJS 8.0 need https://nodejs.org/en/
- Clone or download this repository
  Enter your local directory, and
- start webhooks watcher

````bash
npm install
npx ## 示例代码运行
- NodeJS 10 need https://nodejs.org/en/
- Clone or download this repository
Enter your local directory, and
- install dependencies:
``` bash
npm install
npm install pm2 -g
pm2 start webhooks.js --watch

````

# 1. 配置 nginx

目录：nginx/conf.d 下.conf 文件

```javascript
server {
  listen 80;
  location / {
    root /var/www/html;
    index index.html index.htm;
  }
  location ~ \.(gif|jpg|png)$ {
    root /static;
    index index.html index.htm;
  }
  location /api {
    proxy_pass http://app-pm2:3000;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

```

# 2.配置 docker-compose

目录:docker-compose.yml

```javascript
version: "3.1"
services:
  nginx:
    restart: always
    image: nginx
    ports:
      - 8091:80
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d
      - ./frontend/dist:/var/www/html/
      - ./static/:/static/
```

# 3.配置 pm2

目录:backend/process.yml

```javescript
apps:
  - script : server.js
    instances: 2
    watch  : true
    env    :
      NODE_ENV: production
```

# 4.忽略文件

目录:backend/.dockerignore

```javascript
node_modules;
```

# 5.配置 docker build 定制镜像

目录:backend/Dockerfile

```javascript
FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org/ && \
    npm i
# RUN npm i
EXPOSE 3000
#pm2在docker中使用命令为pm2-docker
# CMD ["pm2-runtime", "start", "--json", "process.json"]
CMD ["pm2-runtime", "start",  "process.yml"]
```

# 6. mongo 数据库配置

目录:backend/models/conf.js

```javascript
module.exports = {
  url: "mongodb://mongo:27017",
  dbName: "taro",
};
```

# 7.nginx 反向代理后端

目录:nginx.conf.d/docker.conf

```javascript
location /api {
  proxy_pass http://app-pm2:3000;
  proxy_redirect off;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

# 8.配置 docker-compose 后端镜像

目录:docker-compose.yml

```javascript
app-pm2:
    #域名 http://app-pm2:3000
    container_name: app-pm2
    #构建容器
    #backend目录下执行 docker build,执行Dockerfile,启动PM2
    build: ./backend
    ports:
      - "3000:3000"
  mongo:
    image: mongo
    restart: always
    ports:
      - 27017:27017
```

设置 Webhooks
