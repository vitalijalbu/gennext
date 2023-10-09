import { NextApiHandler } from "next";
import { ContactFormServerData } from "types";
import axios from "axios";
import FormData from "form-data";

const secret = process.env.RECAPTCHA_SECRET_KEY;
const userId = process.env.CRM_USER_ID;
const webformId = process.env.CRM_WEBFORM_ID;

const handler: NextApiHandler = async (req, res) => {
  const data: ContactFormServerData = JSON.parse(req.body);

  const recaptchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${data.token}`,
    { method: "POST" }
  );
  const recaptchaJson = await recaptchaRes.json();

  if (recaptchaJson.score < 0.5 || !recaptchaJson.success) {
    // fake success without sending email and log on server
    return res.status(200).json({
      success: true
    });
  }

  const formData = new FormData();

  const infoObj: { [key: string]: string | undefined } = {
    name_2: data.name,
    phone_cell: data.phone,
    email: data.email,
    "4195173": data.state,
    "4195280": data.message,
    added_source: "GenNext_Website_ContactUs_Form",
    USERID: userId,
    GROUPID: "1",
    SEQUENCEID: "1",
    WEBFORMID: webformId,
    PROCESSTYPE: "mortgage"
  };

  for (var key in infoObj) {
    formData.append(key, infoObj[key]);
  }

  const postRes = await axios.post(
    "https://www.bntouchmortgage.net/api/webform/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        ...formData.getHeaders()
      }
    }
  );

  res.status(200).json({ success: postRes.status === 200 });
};

export default handler;
