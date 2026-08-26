# eCommerce Backend - NodeJS Architecture

Project thực hành kiến trúc Backend với NodeJS, đi theo series **Tips Javascript** trên Youtube.

---

## Yêu cầu môi trường


| Tool    | Version                                                |
| ------- | ------------------------------------------------------ |
| Node.js | `v19.1.0` (khuyến nghị `>= 19` để dùng `node --watch`) |
| npm     | `v8.19.3`                                              |
| MongoDB | `7.x` (chạy tại `127.0.0.1:27017`)                     |


Nên dùng [`nvm`](https://github.com/nvm-sh/nvm) để cài và switch giữa các version Node:

```bash
nvm install 19.1.0
nvm use 19.1.0
```

### MongoDB (local)

Máy dev (Mac Intel) không dùng Docker Desktop mà chạy [Colima](https://github.com/abiosoft/colima) làm runtime cho Docker. Setup một lần:

```bash
colima start --vm-type=vz --cpu 2 --memory 4 --disk 20

docker run -d --name mongo7 \
  --restart unless-stopped \
  -p 27017:27017 \
  -v mongo7-data:/data/db \
  mongo:7
```

Data nằm ở volume `mongo7-data` nên không mất khi xoá container. Container có `--restart unless-stopped` nên tự chạy lại mỗi lần `colima start`.

> Connection string trong `src/dbs/` phải dùng `127.0.0.1`, **không** dùng `localhost`: Node 19 phân giải `localhost` ra `::1` trước, mà Colima chỉ forward cổng qua IPv4 → sẽ dính `ECONNREFUSED ::1:27017`.

Chi tiết thêm tại [`docs/day-3.md`](./docs/day-3.md).

## Cài đặt &amp; chạy

```bash
cd practice
npm install
```

Bật MongoDB trước khi chạy server (nếu chưa chạy):

```bash
colima start                          # bật VM (sau khi khởi động lại máy)
docker ps                             # kiểm tra container mongo7 đã lên chưa
docker exec -it mongo7 mongosh        # mở mongosh (không cần cài mongosh trên máy)
```

Chạy server:

```bash
node server.js              # chạy bình thường
node --watch server.js      # auto reload khi đổi code (node >= 19)
npm start                   # tương đương: node server.js
```

Dừng server: `Ctrl + C` (server có xử lý `SIGINT` để đóng gọn gàng).

Dừng MongoDB khi không dùng nữa: `colima stop` (giải phóng RAM).

Kiểm tra nhanh:

```bash
curl http://localhost:3052
# {"message":"Welcome to BE NodeJS Architecture Project!"}
```

## Cấu trúc thư mục

```
practice/
├── docs/                          # notes theo từng DAY + workflow
│   ├── day-2.md
│   ├── day-3.md
│   ├── day-4.md
│   ├── day-5.md
│   └── manual-workflow.md         # quy trình thủ công khi bắt đầu một DAY mới
├── src/
│   ├── app.js                     # khởi tạo express app, middlewares, init db, routes
│   ├── auth/                      # xử lý xác thực
│   │   └── authUtils.js           # createTokenPair (JWT access token & refresh token)
│   ├── configs/                   # config, biến môi trường
│   │   └── config.mongodb.js      # config theo môi trường (dev / prod)
│   ├── controllers/               # nhận request, trả response
│   │   └── access.controller.js   # signUp (login, logout... sẽ bổ sung sau)
│   ├── dbs/                       # khởi tạo kết nối database
│   │   ├── init.mongodb.js        # connect MongoDB theo Singleton (đang dùng ở app.js)
│   │   ├── init.mongodb.lv0.js    # bản level 0 (chỉ để tham khảo)
│   │   └── poolSize.mongodb.js    # thử nghiệm pool size
│   ├── helpers/                   # hàm "uỷ quyền", tần suất dùng nhiều trong hệ thống
│   │   └── check.connect.js       # countConnect, checkOverload
│   ├── models/                    # schema / model tầng dữ liệu
│   │   ├── keyToken.model.js      # lưu publicKey / privateKey / refreshToken theo shop
│   │   └── shop.model.js          # schema Shop
│   ├── postman/                   # file .http để test API (REST Client)
│   │   └── access.post.http
│   ├── routes/                    # định tuyến
│   │   ├── index.js               # main route, mount các route con vào /v1/api
│   │   ├── access/index.js        # signup, login, refresh token...
│   │   └── shop/index.js
│   ├── services/                  # business logic
│   │   ├── access.service.js      # signUp: check email, hash password, tạo key + token
│   │   └── keyToken.service.js    # createKeyToken: lưu key vào collection Keys
│   └── utils/                     # hàm tiện ích thuần, khi nào cần mới gọi
│       └── index.js               # getInfoData (lodash pick)
├── server.js                      # entry point: listen PORT, graceful shutdown
├── package.json
├── package-lock.json              # tracking chính xác version của packages
├── .env                           # biến môi trường (local; đang ignore, không commit)
├── .env.example                   # mẫu biến môi trường để copy thành .env
├── .gitignore
└── STATUS.md                      # tiến độ theo DAY
```

Thư mục chưa có code được giữ chỗ bằng `.gitkeep` để commit lên git (hiện chỉ còn `configs/`).

## Tiến độ

Chi tiết tại [`STATUS.md`](./STATUS.md).

## Tham khảo

- [The Node Book](https://www.thenodebook.com/browse)

