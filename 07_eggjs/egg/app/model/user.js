module.exports = app => {
  const { STRING } = app.Sequelize;
  const User = app.model.define(
    "user",
    { name: STRING(30) },
    { timestamps: true },
  );
  User.sync({ force: true }); //数据库同步
  return User;
};
