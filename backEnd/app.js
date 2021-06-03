const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 8000;
const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect("mongodb://localhost:27017/BookManagerDB",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.catch(err => {
  console.error(err.stack)
  process.exit(1)
});

mongoose.connection.once("open", () => {
  console.log("Connected to database!");
});

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql : true
}));

app.listen(PORT,()=>{
  console.log("Server listening at port ", PORT);
});
