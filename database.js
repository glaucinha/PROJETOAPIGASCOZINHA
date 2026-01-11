const sqlite3 = require("sqlite3").verbose();
const path= require("path");

// caminho absoluto do banco
const dbPath = path.resolve(__dirname, "clientes.db");

const db = new sqlite3.Database(dbPath, (erro) => {
    if (erro) {
        console.error("❌ Erro ao conectar no banco:", erro.message);
    } else {
        console.log("✅ Banco SQLite conectado com sucesso!");
    }
});

// tabela clientes
db.run(`
CREATE TABLE IF NOT EXISTS clientes (
    idcliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    tipo_pessoa TEXT NOT NULL,
    documento TEXT NOT NULL,
    telefone TEXT NOT NULL
)
`, (erro) => {
    if (erro) console.error("Erro ao criar tabela clientes:", erro.message);
});

// tabela empresa
db.run(`
CREATE TABLE IF NOT EXISTS empresa (
    idempresa INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cnpj TEXT NOT NULL UNIQUE,
    contato TEXT NOT NULL,
    endereco TEXT NOT NULL
)
`, (erro) => {
    if (erro) console.error("Erro ao criar tabela empresa:", erro.message);
});

// dado inicial (somente para teste)
db.run(`
INSERT OR IGNORE INTO empresa 
(idempresa, nome, cnpj, contato, endereco)
VALUES (1, 'Gás Central', '12345678000199', '11999999999', 'Rua Central, 100')
`);

module.exports = db;




