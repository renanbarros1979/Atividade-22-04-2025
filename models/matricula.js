
module.exports = (sequelize, DataTypes) => {
    const Matricula = sequelize.define("Matricula", {
        data_matricula: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Matricula.associate = (models) => {
        Matricula.hasMany(models.Atribuicao, {
            foreignKey: 'atribuicaoID',
            as: 'atribuicao'
        });
    };

    return Matricula;
};
