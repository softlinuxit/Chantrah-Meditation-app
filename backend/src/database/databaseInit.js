const mongoose = require('./database');
const config = require('../../config')();


const init = async () => {

  if (mongoose.connection.readyState) {
    return mongoose;
  }


  return mongoose
    .connect(config.database.connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log('MongoDB connected'))
    .then(() => mongoose);
};


const middleware = async (req, res, next) => {
  try {
    await init();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }
  return next();
};

exports.init = init;
exports.middleware = middleware;
