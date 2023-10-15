const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

var corsOptions = {
  origin: "http://localhost:8081"
};

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

// multer middleware
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// upload a file use multer middleware and cloudinary
app.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// in development progress, sync by force
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });
  
  // force: true will drop the table if it already exists
  db.sequelize.sync({force: true}).then(() => {
      console.log('Drop and Resync Database with { force: true }');
      initial();
    });
    
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// route
require("./app/routes/tu.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/post.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

