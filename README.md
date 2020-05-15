# Project MORO

MORO is a key name for the API in MaterCity project

## Config the enviroment variables
Before we the start, your must config enviroment variables

#### Intructions:
- Create a new folder call `uploads`
- Can to save images and videos in mode production you need an account of [Cloudinary](https://cloudinary.com/), it add environment variable that cloudinary provide
- Copy the file `.env.example`
- Change the name `.env.example` to `.env`
- Open file and complete the variables

Example
```
// Environment
NODE_ENV=development
PORT=8080
LOG_PREFIX=app

// MongoDB
DB_HOST=host.mongodb.net
DB_USER=db_user
DB_PASSWORD=12345
DB_NAME=db_name

// Cloudinary
CLOUDINARY_URL=
```

## Start
Install dependencies
```bash
npm install
```

Run development mode
```bash
npm run dev
```

Run production mode
```bash
npm start
```

Run linter and auto fix files
```bash
npm run lint
npm run lint -- --fix
```