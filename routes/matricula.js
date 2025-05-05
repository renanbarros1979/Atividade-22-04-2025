const express = require("express");
const router = express.Router();
const { Matricula, Componente } = require("../models"); 

router.get("/", async (req, res) => {
  try {
    const matriculas = await Matricula.findAll({
      include: [{ model: Componente, as: "Componente" }],
    });

    res.render("base", {
      title: "Matrículas",
      view: "matriculas/show",
      matriculas,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar matrículas");
  }
});

router.get("/add", async (req, res) => {
  try {
    const componentes = await Componente.findAll();
    res.render("base", {
      title: "Add Matrícula",
      view: "matriculas/add",
      componentes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar atribuições");
  }
});

router.post("/add", async (req, res) => {
  try {
    const { data_matricula, status } = req.body;
    await Matricula.create({
      data_matricula,
      status
    });
    res.redirect("/matriculas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar matrícula");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const matricula = await Matricula.findByPk(id, {
      include: [{ model: Componente, as: "Componente" }],
    });
    const componentes = await Componente.findAll();
    if (matricula) {
      res.render("base", {
        title: "Edit Matrícula",
        view: "matriculas/edit",
        matricula,
        componentes,
      });
    } else {
      res.status(404).send("Matrícula não encontrada");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar matrícula");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data_matricula, status } = req.body;
    const matricula = await Matricula.findByPk(id);
    if (matricula) {
      await matricula.update({ data_matricula, status });
      res.redirect("/matriculas");
    } else {
      res.status(404).send("Matrícula não encontrada");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar a matrícula");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const matricula = await Matricula.findByPk(id);
    if (matricula) {
      await matricula.destroy();
      res.redirect("/matriculas");
    } else {
      res.status(404).send("Matrícula não encontrada");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir matrícula");
  }
});

module.exports = router;
