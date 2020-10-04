module.exports = function (sequelize, DataTypes) {
    return sequelize.define("Test", {
        idtests: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        message: {
            type: DataTypes.STRING(100)
        }
    }, {
        //disabled created colums 'createdAt' and 'updatedAt'
        timestamps: false,
        tableName: "mytesttable"
    });
}