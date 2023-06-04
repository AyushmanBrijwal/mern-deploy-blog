import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url : `mongodb://${username}:${password}@ac-ljljlfs-shard-00-00.yls9xki.mongodb.net:27017,ac-ljljlfs-shard-00-01.yls9xki.mongodb.net:27017,ac-ljljlfs-shard-00-02.yls9xki.mongodb.net:27017/?ssl=true&replicaSet=atlas-b4gx3r-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["img/png", "img/jpg"];

        if(match.indexOf(file.memetype) === -1 ){
            return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

export default multer({ storage });