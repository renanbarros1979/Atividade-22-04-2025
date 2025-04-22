const express = require('express');
const router = express.Router();
const { Componente } = require('../models');

router.get("/", async (req, res) => {
    const componentes = await Componente.findAll();
    res.render("base", {
        title: "Listar Componentes",
        view: "componentes/show",
        componentes,
    });
});

router.get("/add", async (req, res) => {
    res.render("base", {
        title: "Adicionar Componente",
        view: "componentes/add",
    });
});

router.post("/add", async (req, res) => {
    await Componente.create({
        nome: req.body.nome,
        disciplina: req.body.disciplina,
        carga_horaria: req.body.carga_horaria
    });
    res.redirect("/componentes");
});

router.get("/edit/:id", async (req, res) => {
    const componente = await Componente.findByPk(req.params.id);
    res.render("base", {
        title: "Editar Componente",
        view: "componentes/edit",
        componente,
    });
});

router.post("/edit/:id", async (req, res) => {
    await Componente.update(
        {
            nome: req.body.nome,
            disciplina: req.body.disciplina,
            carga_horaria: req.body.carga_horaria
        },
        { where: { id: req.params.id } }
    );
    res.redirect("/componentes");
});

router.post("/delete/:id", async (req, res) => {
    await Componente.destroy({ where: { id: req.params.id } });
    res.redirect("/componentes");
});

module.exports = router;
