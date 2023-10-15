module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("post", {
      title: {
        type: DataTypes.STRING
      },
      postBody: {
        type: DataTypes.TEXT('medium')
      },
      hashtag: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.STRING
      },
      heartValue: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      heartCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    });
  
    return Post;
  };