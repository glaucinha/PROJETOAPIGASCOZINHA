const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database/database");

const SECRET_KEY = "chave_super_secreta_gas";

// LOGIN
exports.login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const sql = "SELECT * FROM clientes WHERE email = ?";

    db.get(sql, [email], async (erro, cliente) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }

        if (!cliente) {
            return res.status(401).json({ erro: "Usuário não encontrado" });
        }

        const senhaValida = await bcrypt.compare(senha, cliente.senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: "Senha inválida" });
        }

        const token = jwt.sign(
            { idcliente: cliente.idcliente, email: cliente.email },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            mensagem: "Login realizado com sucesso",
            token
        });
    });
};

// LOGOUT
exports.logout = (req, res) => {
    res.json({ mensagem: "Logout realizado com sucesso" });
};

