const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../database/database");
const clienteController = require("../controllers/clienteController");

// 🔎 rota de teste
router.get("/teste", (req, res) => {
    res.json({ mensagem: "rota clientes funcionando" });
});

// 📝 CADASTRO DE CLIENTE
router.post("/clientes", async (req, res) => {
    const {
        nome,
        email,
        senha,
        tipo_pessoa,
        documento,
        telefone
    } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            erro: "Preencha os campos obrigatórios"
        });
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO clientes
            (nome, email, senha, tipo_pessoa, documento, telefone)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(
            sql,
            [
                nome,
                email,
                senhaCriptografada,
                tipo_pessoa,
                documento,
                telefone
            ],
            function (erro) {
                if (erro) {
                    return res.status(500).json({
                        erro: "Erro ao cadastrar cliente"
                    });
                }

                res.status(201).json({
                    mensagem: "Cliente cadastrado com sucesso!",
                    idcliente: this.lastID
                });
            }
        );
    } catch (erro) {
        res.status(500).json({ erro: "Erro interno" });
    }
});

router.post("/clientes", clienteController.cadastrarCliente);

module.exports = router
