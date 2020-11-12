module.exports = function(sequelize, Datatypes) {
    const Dog = sequelize.define("Dog", {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        lastFed: {
            type: Datatypes.STRING,
            allowNull: false,
        }
    });

    return Dog;
}