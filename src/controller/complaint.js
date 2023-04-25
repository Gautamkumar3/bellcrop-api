const complaintModal = require("../modal/Complaint");
const UserModal = require("../modal/user");
require("dotenv").config();
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gksingh341998@gmail.com",
    pass: "afaoqauzbohhdxov",
  },
});

const sendMail = (name, email, password) => {
  transport
    .sendMail({
      to: email,
      from: "gksingh341998@gmail.com",
      subject: "Legal Notice",
      html: `<p>Dear Sir</p>
           
         <p>I am writing to serve you with a legal notice.</p>
       
         <p>This notice is being sent to you as a formal notification to rectify the situation and prevent any further legal action.</p>

      
         <p>Your can go and check the more details. Your login cridential are</p>

         <p>Email : ${email}</p>
          <p>Password : ${password}</p>


         <p>Regards</p>
         <p>${name}</p>`,
    })
    .catch((e) => {
      console.log(e.message, "error");
    });
};

const createComplaint = async (req, res) => {
  let password = Math.floor(Math.random() * 900000) + 100000;
  try {
    const newComplaint = new complaintModal({ ...req.body });
    await newComplaint.save();

    const existUser = await UserModal.findOne({ email: req.body.email });

    if (!existUser) {
      const user = new UserModal({ email: req.body.email, password });
      await user.save();
      sendMail(req.body.created_by, req.body.email, password);
    }

    return res.status(200).send({
      status: "success",
      message: "Complaint create successfully",
      data: newComplaint,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const getComplaint = async (req, res) => {
  try {
    const allComplaint = await complaintModal.find({ email: req.email });
    return res.status(200).send({
      status: "success",
      message: "Complaints get successfully",
      data: allComplaint,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const getComplaintDetails = async (req, res) => {
  let { id } = req.params;

  try {
    let complaint = await complaintModal.findById(id);
    return res.status(200).send({
      status: "success",
      message: "Complaints get successfully",
      data: complaint,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

module.exports = {
  createComplaint,
  getComplaint,
  getComplaintDetails,
};
