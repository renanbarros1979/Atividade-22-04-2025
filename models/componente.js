module.exports = (sequelize, DataTypes) => {
    const Componente = sequelize.define("Componente", {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        disciplina: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carga_horaria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Componente.associate = (models) => {
        Componente.belongsTo(models.Matricula, {
            foreignKey: 'matriculaID',
            as: 'matricula'
        });
    };

    return Componente;
};
