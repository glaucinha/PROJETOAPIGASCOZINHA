const jwt = require("jsonwebtoken");

const SECRET_KEY = "chave_super_secreta_gas";

function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            erro: "Token não fornecido"
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (erro, usuario) => {
        if (erro) {
            return res.status(403).json({
                erro: "Token inválido ou expirado"
            });
        }

        req.usuario = usuario;
        next();
    });
}

module.exports = autenticarToken;
