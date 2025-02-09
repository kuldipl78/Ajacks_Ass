const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    "user" : "root",
    "host" : "localhost",
    "password" : "Kuldip@9764",
    "database": "user_management",
})

app.get("/", (req, res) => {
    return res.json("successfull...")
}) 

app.get("/users", (req, res) => {
    const sql = "select * from user"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json(err)
        }else{
            return res.json(data)
        }
    })
}) 
app.get("/getuser/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM user WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.json(result[0]); // Send only the user object
    });
});
app.post("/addUser", (req, res) => {
    const { First_Name, Last_Name, Email, Department } = req.body;
    const insertQuery = "INSERT INTO user (First_Name, Last_Name, Email, Department) VALUES (?, ?, ?, ?)";
    db.query(insertQuery, [First_Name, Last_Name, Email, Department], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.status(200).json("User Added Successfully...");
    });
});
app.delete("/deleteuser/:id", (req, res) => {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM user WHERE id = ?";
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: `User with ID ${id} deleted successfully` });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    });
});

app.put("/edituser/:id", (req, res) => {
    const { id } = req.params;
    const { First_Name, Last_Name, Email, Department } = req.body;
    
    const updateQuery = "UPDATE user SET First_Name=?, Last_Name=?, Email=?, Department=? WHERE id=?";
    
    db.query(updateQuery, [First_Name, Last_Name, Email, Department, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User Not Found..." });
        } else {
            return res.status(200).json({ message: "User Updated Successfully..." });
        }
    });
});

app.listen(2000, () => {console.log("Server Running At http://localhost:2000")})