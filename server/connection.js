const {MongoClient} = require('mongodb');

const url = "mongodb+srv://Delivery:12345@cluster0.onyws.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

let dbConnection;
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("Delivery");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};