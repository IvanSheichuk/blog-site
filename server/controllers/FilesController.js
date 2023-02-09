import fs from "fs";


const upload = async (req, res) => {
    try {
        res.json({url: `/uploads/${req.file.originalname}`});
    } catch (e) {
        console.warn(e.message)
        res.status(500).json({ message: "Не вдалося завантажити" });
    }
};


const remove = async (req, res) => {
    try {
        const pic = req.params.pic;
        await fs.unlinkSync(`uploads/${pic}`);
        res.json({message: "Видалено успішно!"});
    } catch (e) {
        res.status(500).json({ message: "Не вдалося видалити" });
    }
}

export {
    upload,
    remove
}
