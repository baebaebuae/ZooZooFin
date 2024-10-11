# Porting Manual
- [Porting Manual](#porting-manual)
  - [프로젝트 아키텍처](#프로젝트-아키텍처)
  - [1. 사용 도구](#1-사용-도구)
  - [2. 개발 도구](#2-개발-도구)
    - [IDE](#ide)
  - [3. 개발 환경](#3-개발-환경)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Infra](#infra)
    - [AI](#ai)
    - [Crawler](#crawler)
  - [4. 환경변수](#4-환경변수)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [5. CI/CD 구축](#5-cicd-구축)
  - [6. 빌드 및 실행](#6-빌드-및-실행)
    - [(1) Jenkins 컨테이너 실행](#1-jenkins-컨테이너-실행)
    - [(2) Jenkins Backend Pipeline 실행](#2-jenkins-backend-pipeline-실행)
    - [(3) Jenkins Frontend Pipeline 실행](#3-jenkins-frontend-pipeline-실행)
    - [(4) Jenkins AI Pipeline 실행](#4-jenkins-ai-pipeline-실행)
  - [7. 외부 서비스](#7-외부-서비스)

## 프로젝트 아키텍처
![img](./architecture.png)

## 1. 사용 도구
- 이슈 관리: Jira
- 형상 관리: GitLab
- 커뮤니케이션: Notion, MatterMost
- 디자인: Figma, Blender
- CI/CD: Jenkins
  
## 2. 개발 도구
### IDE
- Intellij IDEA Ultimate
- Visual Studio Code

## 3. 개발 환경
### Backend
|사용 기술|버전|
|---|---|
|Java|21|
|Spring Boot|3.3.3|
|Gradle|8.10|

기타 정보는 `/backend/build.gradle` 확인

### Frontend
|사용 기술|버전|
|---|---|
|React|18.3.1|
|Node|20.17.0|
|npm|10.8.2|

기타 정보는 `/frontend/zoozoofin/package.json` 확인

### Infra
|사용 기술|버전|
|---|---|
|AWS||
|MySql|8.4.2|
|MongoDB|7|
|Redis|7.4.0|
|Nginx|1.26.2-perl|
|Ubuntu|20.04.6|
|Jenkins|2.462.2|
|Docker|27.2.1|

### AI
|사용 기술|버전|
|---|---|
|python|3.12.4|
|flask|3.0.3|
|google-pasta|0.2.0|
|huggingface|0.25.1|
|keras|3.5.0|
|konlpy|0.6.0|
|numpy|1.26.4|
|pandas|2.2.3|
|scikit-learn|1.5.2|
|tensorflow|2.17.0|
|tf_keras|2.17.0|
|torch|2.4.1|
|transformers|4.45.1|

### Crawler
|사용 기술|버전|
|---|---|
|python|3.8.10|
|beautifulsoup4|4.12.3|
|selenium|4.25.0|

## 4. 환경변수
### Backend
- `.env`
```
# OAuth API Key
OAUTH_KAKAO_ID=4957ef4fe0a13b500409f182a72744b7
OAUTH_NAVER_ID=kEnQpWOwtvUYWDeaMN3w
OAUTH_GOOGLE_ID=752251214291-i658l43sdaopbnitecjgk34bnu07pj74.apps.googleusercontent.com
OAUTH_NAVER_SECRET=3bSm_dvtjt
OAUTH_GOOGLE_SECRET=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
LOCAL_OAUTH_KAKAO_REDIRECT=http://localhost:8080/api/v1/login/oauth/kakao
LOCAL_OAUTH_NAVER_REDIRECT=http://localhost:8080/api/v1/login/oauth/naver
LOCAL_OAUTH_GOOGLE_REDIRECT=http://localhost:8080/api/v1/login/oauth/google
OAUTH_KAKAO_REDIRECT=https://j11a705.p.ssafy.io/api/v1/login/oauth/kakao
OAUTH_NAVER_REDIRECT=https://j11a705.p.ssafy.io/api/v1/login/oauth/naver
OAUTH_GOOGLE_REDIRECT=https://j11a705.p.ssafy.io/api/v1/login/oauth/google

# JWT
# ACCESS_EXPIRATION=18000
REFRESH_EXPIRATION=180000
ACCESS_EXPIRATION=18000
SECRET_KEY=VjJ4amQwNVhVblJXYmxKUVYwWndhRmxzWkRSTlVUMDk=

# Database
LOCAL_RDB_DRIVER=com.mysql.cj.jdbc.Driver
LOCAL_RDB_URL=jdbc:mysql://localhost:3306/zzfdb
LOCAL_RDB_USERNAME=root
LOCAL_RDB_PASSWORD=ssafy
RDB_DRIVER=com.mysql.cj.jdbc.Driver
RDB_URL=jdbc:mysql://mysql:3306/zzfDB
RDB_USERNAME=zoozoofin
RDB_PASSWORD=zzfa705
SHOW_SQL=false

# Redis
LOCAL_REDIS_HOST=j11a705.p.ssafy.io
LOCAL_REDIS_PORT=6379
REDIS_HOST=redis
REDIS_PORT=6379

# Mongo
LOCAL_MONGO_URI=mongodb://zoozoofin:zzfa705@j11a705.p.ssafy.io:27017/zzfDB?authSource=admin
MONGO_URI=mongodb://zoozoofin:zzfa705@mongo:27017/zzfDB?authSource=admin

# DDL
LOCAL_DDL_AUTO=update
DDL_AUTO=none

# URL
LOCAL_CALLBACK_URI=http://localhost:8080/callback
CALLBACK_URI=https://zoozoofin.site/callback

# LOG
LOCAL_LOGGING_LEVEL=info
LOGGING_LEVEL=warn
```
- `application.yml`
```
spring:
  application:
    name: backend
  mvc:
    static-path-pattern: /static/**
  web:
    resources:
      add-mappings: false

  security:
    oauth2:
      client:
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
          naver:
            authorization-uri: https://nid.naver.com/oauth2.0/authorize
            token-uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user-name-attribute: response

  jpa:
    show-sql: ${SHOW_SQL}

jwt:
  access-expiration: ${ACCESS_EXPIRATION}
  refresh-expiration: ${REFRESH_EXPIRATION}
  secret-key: ${SECRET_KEY}

ai-server:
  uri: ${AI_SERVER_URI}
  path: ${AI_SERVER_PATH}

--- # 로컬 설정
spring:
  config:
    activate:
      on-profile: local

  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: ${OAUTH_KAKAO_ID}
            client-secret: none
            client-name: kakao
            redirect-uri: ${LOCAL_OAUTH_KAKAO_REDIRECT}
            authorization-grant-type: authorization_code
            client-authentication-method: none
          naver:
            client-id: ${OAUTH_NAVER_ID}
            client-secret: ${OAUTH_NAVER_SECRET}
            client-name: naver
            redirect-uri: ${LOCAL_OAUTH_NAVER_REDIRECT}
            authorization-grant-type: authorization_code
            client-authentication-method: client_secret_basic
          google:
            client-id: ${OAUTH_GOOGLE_ID}
            client-secret: ${OAUTH_GOOGLE_SECRET}
            client-name: google
            redirect-uri: ${LOCAL_OAUTH_GOOGLE_REDIRECT}
            scope:
              - email
              - profile

  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test;MODE=MySQL
    username: sa
  h2:
    console:
      enabled: true
      path: /h2-console

  data:
    redis:
      host: ${LOCAL_REDIS_HOST}
      port: ${LOCAL_REDIS_PORT}
    mongodb:
      uri: ${LOCAL_MONGO_URI}

  jpa:
    hibernate:
      ddl-auto: ${LOCAL_DDL_AUTO}

callback: ${LOCAL_CALLBACK_URI}

logging:
  level:
    root: ${LOCAL_LOGGING_LEVEL}

--- # 개발 서버 설정
spring:
  config:
    activate:
      on-profile: dev

  security:
    oauth2:
      client:
        registration:
          kakao:
            client-id: ${OAUTH_KAKAO_ID}
            client-secret: none
            client-name: kakao
            redirect-uri: ${OAUTH_KAKAO_REDIRECT}
            authorization-grant-type: authorization_code
            client-authentication-method: none
          naver:
            client-id: ${OAUTH_NAVER_ID}
            client-secret: ${OAUTH_NAVER_SECRET}
            client-name: naver
            redirect-uri: ${OAUTH_NAVER_REDIRECT}
            authorization-grant-type: authorization_code
            client-authentication-method: client_secret_basic
          google:
            client-id: ${OAUTH_GOOGLE_ID}
            client-secret: ${OAUTH_GOOGLE_SECRET}
            client-name: google
            redirect-uri: ${OAUTH_GOOGLE_REDIRECT}
            scope:
              - email
              - profile

  datasource:
    driver-class-name: ${RDB_DRIVER}
    url: ${RDB_URL}
    username: ${RDB_USERNAME}
    password: ${RDB_PASSWORD}
  data:
    redis:
      host: ${REDIS_HOST}
      port: ${REDIS_PORT}
    mongodb:
      uri: ${MONGO_URI}

  jpa:
    hibernate:
      ddl-auto: ${DDL_AUTO}

callback: ${CALLBACK_URI}

logging:
  level:
    root: ${LOGGING_LEVEL}
```
### Frontend
- `.env`
```
VITE_URL="https://j11a705.p.ssafy.io/api/v1"
```
## 5. CI/CD 구축
1. Docker 설치
2. Jenkins 컨테이너 생성
3. nginx 컨테이너 생성
   
## 6. 빌드 및 실행
### (1) Jenkins 컨테이너 실행
### (2) Jenkins Backend Pipeline 실행
```
git checkout ${BRANCH}
cd backend
chmod +x gradlew
cp ${SCRIPT_PATH}/${REPO}/.env .
./gradlew clean build

cp ./build/libs/*.jar ${SCRIPT_PATH}
rm -rf ${SCRIPT_PATH}/${REPO}/swagger/*
cp -rvf ./src/main/resources/static/* ${SCRIPT_PATH}/${REPO}/swagger

docker build -t ${DOCKER_ID}/${REPO}:${GIT_COMMIT} -t ${DOCKER_ID}/${REPO}:latest ${SCRIPT_PATH}
docker login -u ${DOCKER_ID} -p ${DOCKER_PW}
docker push ${DOCKER_ID}/${REPO}:${GIT_COMMIT}
docker push ${DOCKER_ID}/${REPO}:latest

${SCRIPT_PATH}/deploy.sh
```
### (3) Jenkins Frontend Pipeline 실행
```
git checkout ${BRANCH}
cd frontend/zoozoofin
cp ${SCRIPT_PATH}/${REPO}/.env .
npm install
npm run build
rm -rf ${SCRIPT_PATH}/${REPO}/dist/*
cp -rvf ./dist/* ${SCRIPT_PATH}/${REPO}/dist
docker exec nginx /bin/bash -c "nginx -s reload"
```
### (4) Jenkins AI Pipeline 실행
```
git checkout ${BRANCH}
cp -rvf FLASK/* ${SCRIPT_PATH}/${REPO}/FLASK
cd ${SCRIPT_PATH}/${REPO}
cp Dockerfile FLASK
cd FLASK
ls -al
docker build -t ${DOCKER_ID}/${REPO}:${GIT_COMMIT} -t ${DOCKER_ID}/${REPO}:latest ${SCRIPT_PATH}/${REPO}/FLASK
docker login -u ${DOCKER_ID} -p ${DOCKER_PW}
docker push ${DOCKER_ID}/${REPO}:${GIT_COMMIT}
docker push ${DOCKER_ID}/${REPO}:latest
docker compose down
docker compose up -d --build
```


## 7. 외부 서비스
- google, naver, kakao oauth
- Finance Data Reader