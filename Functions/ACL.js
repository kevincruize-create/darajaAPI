const express = require('express');
//const app = express();


const process = (app) => {
app.use(express.json());
//const myID = 38
//const user_ID = 0
//const amount = 0

  const fetchData = async (f_name, sec_name, f_phone, alt_phones, f_email, f_gender, f_IYF_course, f_location, f_day, f_time, f_accom, f_fac) => {
    try {

      const response = await fetch("http://advenware.atwebpages.com/backend/Upload_details.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
             firstName:f_name,
              secondtName: sec_name,
              phone: f_phone,
              alt_phone: alt_phones,
              email: f_email,
              gender: f_gender,
              IYF_course: f_IYF_course,
              location: f_location,
               day: f_day,
              time: f_time,
              accom: f_accom,
              fac: f_fac
        }),
      });

      const data = await response.json();

      return data;

    } catch (error) {
      console.error(error);
    }
  };

  app.post("/Pay_markter", async (req, res) => {
  
    const { firstName,secondtName,phone,alt_phone,email,gender,IYF_course,location,day,time,accom,fac } = req.body;
   
  const f_name  = firstName.toString();
  const sec_name = secondtName.toString();
  const f_phone = phone.toString();
  const alt_phones  = alt_phone.toString();
  const f_email = email.toString();
  const f_gender = gender.toString();
  const f_IYF_course  = IYF_course.toString();
  const f_location = location.toString();
  const f_day = day.toString();
  const f_time = time.toString();
  const f_accom = accom.toString();
  const f_fac = fac.toString();
    
  const data = await fetchData(f_name, sec_name, f_phone, alt_phones, f_email, f_gender, f_IYF_course, f_location, f_day, f_time, f_accom, f_fac);   // call your function

    res.json(data);                   // send to browser

  });


}


module.exports = process;
