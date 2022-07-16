const { app } = require('./app');
const { relationModel } = require('./Models/relations.model');

const { db, DataTypes } = require('./utils/connectDb');

db.authenticate()
  .then(() => console.log('DataBase authenticate'))
  .catch((err) => console.log(err));

app.use(relationModel);

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server this rinning on port: ${PORT}`);
});
