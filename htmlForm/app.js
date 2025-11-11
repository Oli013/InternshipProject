const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path=require('path');
const session = require('express-session');
//router=express.Router();
//const pdf=require('pdfkit');

// Create an express app
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
// app.use(express.session);
app.use(session({
  secret: 'yoursecretkey', // change this to something strong
  resave: false,
  saveUninitialized: true
}));


//connecting database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'studentDB',
    waitForConnections: true,
    connectionLimit: 10
});

// db.connect((err) => {
//     if (err) {
//         console.error('error connecting to MySQL: ' + err.stack);
//         return;
//     }
//     console.log('connected to MySQL as id ' + db.threadId);
// });



app.get('/home',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','home.html'));
});

app.get('/add',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','addStudent.html'));
});

app.post('/add', (req, res) => {
    const { name, enrolNo, course,programme , month,year} = req.body;

    const query = 'INSERT INTO student(name, enrolNo, course,programme, month,year) VALUES (?, ?, ?, ? ,?,?)';
    db.query(query, [name, enrolNo, course,programme, month,year], (err, result) => {
        if (err) {
            console.log('Error inserting data in database',err);
            return res.status(500).send('Error inserting data');
        }
       res.send(`<script>
                    alert("Student data added successfully!");
                    window.location.href = "/add";
                  </script>`);
    });
});

app.get('/displayPage',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','printGradeList.html'));
});
app.get('/display', (req, res) => {
    const { course, month, year, programme } = req.query;

    if (!course || !month || !year || !programme) {
        return res.status(400).json({ error: "Missing course, month ,year or programme !!" });
    }

    const query = 'SELECT * FROM student WHERE course=? AND month=? AND year=? AND programme=?';

    db.query(query, [course, month,year,programme], (err, rows) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Database error, please try again later." });
        }

        res.json(rows.length ? rows : []); // Always return an array to prevent frontend errors
    });
});

app.delete('/delete', (req, res) => {
    const { course, month, year } = req.query;

    if (!course || !month || !year) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const query = "DELETE FROM student WHERE course=? AND month=? AND year=?";
    db.query(query, [course, month, year], (err, result) => {
        if (err) {
            console.error("Couldn't delete data:", err);
            return res.status(500).json({ error: "Error occurred while deleting data" });
        }

        res.json({ success: true, message: "Record deleted successfully !!" });
    });
});


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','loginNew.html'));
});

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','loginNew.html'));
});


app.post('/signup', (req, res) => {
  const { userName, email, pass, Contact, role } = req.body;

  
  if (!userName || !email || !pass || !Contact || !role) {
    return res.send(`<script>
      alert("All fields are required!");
      window.location.href="/signup";
    </script>`);
  }

  
  const query = `INSERT INTO loginDtls (userName, email, pass, Contact, role) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [userName, email, pass, Contact, role], (err, results) => {
    if (err) {
      console.error('Sign up failed ', err);

      if (err.code === 'ER_DUP_ENTRY') {
        return res.send(`<script>
          alert("This email is already registered. Please log in.");
          window.location.href="/";
        </script>`);
      }


      return res.send(`<script>
        alert("Database error: ${err.sqlMessage}");
        window.location.href="/signup";
      </script>`);
    }

    
    res.send(`<script>
      alert("Account created successfully! Log in to explore.");
      window.location.href = "/";
    </script>`);
  });

});//details to create an account by signing up.


app.post('/', (req, res) => {
  const { email, pass,role } = req.body;

  if (!email || !pass) {
    return res.send(`<script>alert("Please enter both email and password."); window.location.href = "/";</script>`);
  }

  const query = 'SELECT * FROM loginDtls WHERE email = ? ';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Login error", err);
      return res.status(500).send("Email not found please sign up first !");
    }

    if (results.length === 0) {
      return res.send(`<script>alert("Email not found. Please sign up first."); window.location.href = "/signup";</script>`);
    }

    const user = results[0];

    if (user.pass !== pass) {
      return res.send(`<script>alert("Incorrect password. Try again."); window.location.href = "/";</script>`);
    }

    //req.session.user=user;
    if(user.role==='student'){
      return res.send(`<script>alert("Login Successful !!");window.location.href="/add";</script>`);
    }
    else{
      return res.send(`<script>alert("Login successful !!");window.location.href="/home";</script>`);
    }
  
 
  //  res.send(`<script>alert("Login successful!"); window.location.href = "/home";</script>`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
