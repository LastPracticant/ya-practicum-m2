from node:
    14
    copy package*.json ./
    run npm install
    copy . .
    run npm run build
    expose 8000
    cmd npm run start;node
