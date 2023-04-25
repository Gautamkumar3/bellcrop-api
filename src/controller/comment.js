const commentModal = require("../modal/Comment");

const createComment = async (req, res) => {
  const { complaintId } = req.headers;
  try {
    const comment = new commentModal({
      ...req.body,
      userId: req.userId,
      complaintId: complaintId,
    });
    await comment.save();
    return res.status(200).send({
      status: "success",
      message: "Comment created successfully",
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

module.exports = { createComment };
