import multer from "multer";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        file.originalname =
            file.originalname.slice(0, file.originalname.length - 4) +
            Date.now() +
            "." +
            file.mimetype.slice(6, file.mimetype.length);
        cb(null, file.originalname);
    },
});


const uploadFile = multer({ storage });


export {uploadFile}