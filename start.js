const app = require('./server.js');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;

const mongoUri = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_NAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});