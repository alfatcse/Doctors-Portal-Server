const { MongoClient,ServerApiVersion } = require("mongodb");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connectionString = process.env.DB;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
try {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },()=>console.log("Connected to Mongodb"));
} catch (e) {
  console.log("Could not connected");
}
const dbConnection=mongoose.connection;
dbConnection.on('error',()=>console.log(`Connection Error ${err}`))
dbConnection.once("open",()=>console.log('Connected to DB'))
module.exports={client,dbConnection};
