const bcrypt = require("bcrypt");
const db = require("../database/database");

exports.cadastrarCliente = async (req, res) => {
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
            erro: "Campos obrigatórios não preenchidos"
        });
    }

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
                mensagem: "Cliente cadastrado com sucesso",
                idcliente: this.lastID
            });
        }
    );
};
// LOGIN
exports.login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: "Informe email e senha" });
    }

    db.get(
        "SELECT * FROM clientes WHERE email = ?",
        [email],
        async (err, cliente) => {
            if (err || !cliente) {
                return res.status(401).json({ erro: "Credenciais inválidas" });
            }

            const senhaValida = await bcrypt.compare(senha, cliente.senha);

            if (!senhaValida) {
                return res.status(401).json({ erro: "Credenciais inválidas" });
            }

            res.json({
                mensagem: "Login realizado com sucesso",
                cliente: {
                    idcliente: cliente.idcliente,
                    nome: cliente.nome,
                    email: cliente.email
                }
            });
        }
    );
};

// LOGOUT
exports.logout = (req, res) => {
    res.json({ mensagem: "Logout realizado com sucesso" });
};

// TESTE
exports.teste = (req, res) => {
    res.json({ mensagem: "API funcionando" });
}