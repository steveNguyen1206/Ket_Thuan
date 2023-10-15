const dbConfig = require("../config/db.config.js");
const { DataTypes } = require("sequelize"); 
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ad post
db.tutorials = require("./tu.model.js")(sequelize, Sequelize);


// login
db.user = require("../models/user.model.js")(sequelize, DataTypes);
db.role = require("../models/role.model.js")(sequelize, DataTypes);
db.post = require("../models/post.model.js")(sequelize, DataTypes);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.user.hasMany(db.post, {
  foreignKey: 'userId'
})

db.post.belongsTo(db.user);

db.ROLES = ["user", "admin", "moderator"];


module.exports = db;