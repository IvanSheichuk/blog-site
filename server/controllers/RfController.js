import RFModel from "../models/RF.js";

const createRF = async (req, res) => {
    try {
        const doc = new RFModel({
            title: req.body.title,
            downloadLink: req.body.downloadLink,
            parseLink: req.body.parseLink,
        });

        const rf = await doc.save();

        res.json(rf);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Помилка створення н-п посту",
        });
    }
};

const getRF = async (req, res) => {
    try {
        const rf = await RFModel.find().sort({ _id: -1 });

        res.json(rf);
    } catch (e) {
        res.status(500).json({ message: "Не вдалося отримати н-п пости" });
    }
};

const getOneRF = async (req, res) => {
    try {
        const rfId = req.params.id;
        const rf = await RFModel.findById(rfId);

        res.json(rf);
    } catch (e) {
        res.status(500).json({ message: "Не вдалося отримати н-п пост" });
    }
};

const updateRF = async (req, res) => {
    try {
        const rfId = req.params.id;
        await RFModel.updateOne(
            { _id: rfId },
            {
                title: req.body.title,
                downloadLink: req.body.downloadLink,
                parseLink: req.body.parseLink,
            }
        );

        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ message: "Не вдалося оновити н-п пост" });
    }
};

const removeRF = async (req, res) => {
    try {
        const rfId = req.params.id;
        RFModel.findOneAndDelete({ _id: rfId }, (e, doc) => {
            if (e) {
                return res.status(500).json({ message: "Не вдалося отримати н-п пост" });
            }

            if (!doc) {
                return res.status(404).json({ message: "Н-п пост відсутній" });
            }

            res.json({ success: true });
        });
    } catch (e) {
        res.status(500).json({ message: "Не вдалося отримати н-п пост" });
    }
};


export {
    createRF,
    getRF,
    getOneRF,
    updateRF,
    removeRF
}