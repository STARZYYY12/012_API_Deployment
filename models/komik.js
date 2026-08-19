module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define("Komik", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sinopsis: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tahun_terbit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        penulis_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "komik",
        timestamps: true
    });
    Komik.associate = (models) => {
        Komik.belongsTo(models.Penulis, {
          through: "komik_genre",
          foreignKey: "komik_id",
          otherKey: "genre_id",
            as: "genre"
        });
      }

    return Komik;
};