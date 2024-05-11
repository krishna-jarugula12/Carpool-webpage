const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "127.0.0.1",
    port:'3306',
    user: "root",
    password: "123",
    database: "carpool"
});


// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jarugulabalakrishna08@gmail.com',
        pass: 'hwrq euzb sabz emgl'
    }
});

app.post('/Signup', (req, res) => {
    const sql = "INSERT INTO Login (name, email, password) VALUES (?,?,?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ error: "An error occurred while inserting data into the database" });
        }
        return res.json(data);
    });
});


app.post('/login', (req, res) => {
    const sql = "select * from  login where email=? and password = ?";
    db.query(sql,[req.body.email,req.body.password], (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ error: "An error occurred " });
        }
        if(data.length>0){
            return res.json("Success");
        }
        else {
            return res.json("Failed");
        }
    });
});

app.post('/Bookride', (req,res) => {

    const sql = "SELECT * FROM registerride WHERE startingpoint =? AND endpoint =? AND status =? and vacancies>0";
    db.query(sql,[req.body.source,req.body.destination,'open'], (err, data) => {
        if(err) {
            console.error(err);
        }
        else{
            return res.json(data);
        }
});
});
app.post('/Registerride', (req, res) => {
    const username = req.body.Username;
    console.log(username);
    const sql = "SELECT kyc FROM login WHERE email = ?";
    const sql2 = "INSERT INTO registerride(email,username,phnnum,startingpoint,endpoint,departuredate,departuretime,vacancies,fare,vehiclenumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.Username,
        req.body.name,
        req.body.mobileNumber,
        req.body.startPoint,
        req.body.endPoint,
        req.body.departureDate,
        req.body.departureTime,
        req.body.vacancies,
        req.body.fare,
        req.body.vehicleNumber
    ];

    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred while fetching data " });
        }
        
        const kycStatus = data[0].kyc;
        if (kycStatus === 'yes') {
            db.query(sql2, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "An error occurred while inserting data" });
                }
                return res.json({ success: true });
            });
        } else {
            // Instead of returning a 403 status code, return false to the frontend
            return res.json({ success: false });
        }
    });
});

app.post('/Payementpage',(req,res) => {
    const  email = req.body.usermail;
    const rideDetails=req.body.ride;
    console.log(email);
    console.log(rideDetails);
    const sql='UPDATE registerride SET vacancies = vacancies - 1 WHERE rideid = ?';
    const insertSql = 'INSERT INTO bookeddetails (Passenger_mail, rideid, departure_date, departure_time, starting_point, ending_point, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [rideDetails.rideid];
    const insertvalues = [email,rideDetails.rideid, rideDetails.departuredate, rideDetails.departuretime, rideDetails.startingpoint, rideDetails.endpoint, rideDetails.username];
   
    const mailOptions = {
        from: 'jarugulabalakrishna08@gmail.com',
        to: email,
        subject: 'Your Ride Details',
        html: `<p>Here are the details of your ride:</p>
               <p>username: ${rideDetails.username}</p>
               <p>Departure: ${rideDetails.departuredate}</p>
               <p>Time: ${rideDetails.departuretime}</p>
               <p>startingPoint: ${rideDetails.startingpoint}</p>
               <p>endpoint: ${rideDetails.endpoint}</p>
               <p>vehicleNumber: ${rideDetails.vehiclenumber}</p>
               <p>Contact: ${rideDetails.phnnum}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: "An error occurred while sending email" });
        } else {
            console.log('Email sent:', info.response);
            // Update vacancies
            db.query(sql, values, (error, result) => {
                if (error) {
                    console.error('Error updating vacancies:', error);
                    return res.status(500).json({ error: "An error occurred while updating vacancies" });
                } else {
                    console.log('Vacancies updated successfully');
                    // Insert into bookeddetails table
                    const insertValues = [email, rideDetails.rideid];
                    db.query(insertSql, insertvalues, (insertError, insertResult) => {
                        if (insertError) {
                            console.error('Error inserting into bookeddetails:', insertError);
                            return res.status(500).json({ error: "An error occurred while inserting into bookeddetails" });
                        } else {
                            console.log('Inserted into bookeddetails successfully');
                            return res.json({ success: true });
                        }
                    });
                }
            });
        }
    });
});

// Add a new endpoint to fetch profile information based on username
app.post('/Profile', (req, res) => {
    const username = req.body.username;
    console.log(username);
    const sql = "SELECT id, name, email, kyc FROM login WHERE email = ?";
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred while fetching profile" });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: "Profile not found" });
        }
        const profile = {
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
            kycStatus: data[0].kyc === 'yes'
        };
        return res.json(profile);
    });
});

app.post('/Yourride', (req, res) => {
    const username = req.body.username;
    console.log(username);
    const sql = "SELECT * FROM bookeddetails WHERE Passenger_mail = ?";
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error('Error fetching booked rides:', err);
            res.status(500).json({ error: 'An error occurred while fetching booked rides' });
        } else {
           
            res.json(data);
        }
    });
});

app.post('/Book', (req, res) => {
    const username = req.body.username;
    const sql = "SELECT rideid FROM bookeddetails WHERE Passenger_mail = ?";
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error("Error fetching ride IDs:", err);
            res.status(500).json({ error: "An error occurred while fetching ride IDs" });
        } else {
            const rideIds = data.map((row) => row.rideid);
            console.log(rideIds);
            res.json({ rideIds });
        }
    });
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
}); 