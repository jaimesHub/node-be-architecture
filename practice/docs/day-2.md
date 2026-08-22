# DAY 2: Những folders và packages cần thiết khi khởi tạo Project

NOTES

- Init project 
  - node version: `v19.1.0`, npm version: `v8.19.3` (using `nvm` install &amp; manage &amp; switch versions)
  - npm init -y
  - packages.json
  - docs/
  - src/
    - controllers/
    - models/
    - services/
    - utils/
    - configs/
  - server.js
  - .gitignore
- {root_project}/packages-lock.json: tracking installed packages' versions
- node_modules: add to .gitignore
- .env: add to .gitignore
- Installing packages (npm i `x_package` --save / --save-dev)
  - express (--save)
  - morgan (--save-dev): logging in terminal
  - helmet (--save-dev)
  - compression (--save-dev)
- Start server: (cd ./practice/)
  - node server.js
  - real time: node --watch server.js (node version &gt;= 19)
  - stop: Ctrl + C

