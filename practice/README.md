# eCommerce Backend - NodeJS Architecture

Project thực hành kiến trúc Backend với NodeJS, đi theo series **Tips Javascript** trên Youtube.

---

## Yêu cầu môi trường


| Tool    | Version                                                |
| ------- | ------------------------------------------------------ |
| Node.js | `v19.1.0` (khuyến nghị `>= 19` để dùng `node --watch`) |
| npm     | `v8.19.3`                                              |


Nên dùng [`nvm`](https://github.com/nvm-sh/nvm) để cài và switch giữa các version Node:

```bash
nvm install 19.1.0
nvm use 19.1.0
```

## Cài đặt &amp; chạy

```bash
cd practice
npm install

node server.js              # chạy bình thường
node --watch server.js      # auto reload khi đổi code (node >= 19)
npm start                   # tương đương: node server.js
```

Dừng server: `Ctrl + C` (server có xử lý `SIGINT` để đóng gọn gàng).

Kiểm tra nhanh:

```bash
curl http://localhost:3000
# {"message":"Welcome to BE NodeJS Architecture Project!"}
```

## Cấu trúc thư mục

```
practice/
├── docs/                  # notes theo từng DAY
│   └── day-2.md
├── src/
│   ├── app.js             # khởi tạo express app, middlewares, routes
│   ├── configs/           # config, biến môi trường
│   ├── controllers/       # nhận request, trả response
│   ├── models/            # schema / model tầng dữ liệu
│   ├── services/          # business logic
│   └── utils/             # hàm dùng chung
├── server.js              # entry point: listen PORT, graceful shutdown
├── package.json
├── package-lock.json      # tracking chính xác version của packages
├── .env                   # biến môi trường (đã ignore, không commit)
├── .gitignore
└── STATUS.md              # tiến độ theo DAY
```

Các thư mục chưa có code được giữ chỗ bằng `.gitkeep` để commit lên git.

## Tiến độ

Chi tiết tại [`STATUS.md`](./STATUS.md).

## Tham khảo

- [The Node Book](https://www.thenodebook.com/browse)

