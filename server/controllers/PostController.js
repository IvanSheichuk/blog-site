import PostModel from "../models/Post.js";

const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ _id: -1 }).limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 7);
    res.json(tags);
  } catch (e) {
    res.status(500).json({ message: "Не вдалося отримати теги" });
  }
};

const getByTag = async (req, res) => {
  try {
    const tag = req.params.tag;

    const posts = await PostModel.find({ tags: tag });

    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Не вдалося отримати статті" });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ _id: -1 });

    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Не вдалося отримати статті" });
  }
};

const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" },
      (e, doc) => {
        if (e) {
          return res
            .status(500)
            .json({ message: "Не вдалося отримати статтю" });
        }

        if (!doc) {
          return res.status(404).json({ message: "Стаття відсутня" });
        }

        res.json(doc);
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Не вдалося отримати статтю" });
  }
};

const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      previewUrl: req.body.previewUrl,
      tags: req.body.tags,
      videoUrl: req.body.videoUrl,
      fileUrl: req.body.fileUrl,
      photoUrl: req.body.photoUrl,
    });

    const post = await doc.save();

    res.json(post);
  } catch (e) {
    res.status(500).json({
      message: "Помилка створення статті",
    });
  }
};

const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        previewUrl: req.body.previewUrl,
        tags: req.body.tags,
        videoUrl: req.body.videoUrl,
        fileUrl: req.body.fileUrl,
        photoUrl: req.body.photoUrl,
      }
    );

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Не вдалося оновити статтю" });
  }
};

const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({ _id: postId }, (e, doc) => {
      if (e) {
        return res.status(500).json({ message: "Не вдалося отримати статтю" });
      }

      if (!doc) {
        return res.status(404).json({ message: "Стаття відсутня" });
      }

      res.json({ success: true });
    });
  } catch (e) {
    res.status(500).json({ message: "Не вдалося отримати статтю" });
  }
};

export {
  getLastTags,
  getByTag,
  getAll,
  getOne,
  create,
  update,
  remove
}