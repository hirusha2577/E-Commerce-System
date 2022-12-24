import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: "itp2022",
    api_key: "287411647238895",
    api_secret: "lmh2OzX88woZSTdtJZ4jWI3ot4Y",
});

export const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'SPM',
        allowedFormats: ['jpeg', 'png', 'jpg']
    } 
});

