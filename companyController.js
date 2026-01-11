const db = require("../database/database");

// GET consultar dados da empresa
exports.profile = (req, res) => {
    const sql = `
        SELECT 
            nome,
            cnpj,
            contato,
            endereco
        FROM empresa
        LIMIT 1
    `;

    db.get(sql, [], (erro, empresa) => {
        if (erro) {
            return res.status(500).json({
                erro: "Erro ao buscar dados da empresa"
            });
        }

        if (!empresa) {
            return res.status(404).json({
                erro: "Empresa não encontrada"
            });
        }

        res.json({
            empresa
        });
    });
};


// ATUALIZAR dados da empresa
exports.update = (req, res) => {
    const { nome, cnpj, contato, endereco } = req.body;

    if (!nome || !cnpj || !contato || !endereco) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    db.run(
        `
        UPDATE empresa 
        SET nome = ?, cnpj = ?, contato = ?, endereco = ?
        WHERE idempresa = 1
        `,
        [nome, cnpj, contato, endereco],
        function (err) {
            if (err) {
                return res.status(500).json({
                    erro: "Erro ao atualizar dados da empresa"
                });
            }

            res.json({
                mensagem: "Dados da empresa atualizados com sucesso"
            });
        }
    );
};
