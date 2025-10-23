import express from "express";
import bodyParser from "body-parser";
import { RestClient } from "@signalwire/compatibility-api";
import "dotenv/config";

const app = express();
const port = 3000;
const token= process.env.SW_TOKEN;
const space= process.env.SW_SPACE;
const projectID= process.env.SW_PROJECT;
const number = process.env.SW_NUMBER;
const personalNum = process.env.PERSONAL_NUMBER;

const client = RestClient(
    projectID,
    token,
    {signalwireSpaceUrl: space}
)
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

async function sendMessage(from, body, to) {
    try {
        const message = await client.messages.create({
        from: from,
        body: body,
        to: to,
    }); 
    console.log(message);
    return message;


    } catch (error) {
        console.log(error);
        console.log(error.response?.data)
    }
    
}


app.get("/", (req, res) => {
    res.render("index.ejs");
    
})
app.get("/thank-you", (req,res) => {
    res.send("✅ Your appointment resquest has been sent successfully!")
})
app.post("/submit", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address= req.body.address;
    const appt= req.body.date;

    const formData = `Name: ${name}\n Email: ${email}\n Phone Number: ${phone} \n Address: ${address}\n Appointment Request Date: ${appt} \n`
    console.log(formData);
    try {
        await sendMessage(number, formData, personalNum)
        res.redirect("/thank-you");

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "❌ Failed to send message. Try Again."
        })
    }
    
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})