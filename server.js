const express = require("express");
const cors = require("cors");

const clienteRoutes = require("./routes/clienteRoutes");
const authRoutes = require("./routes/authRoutes");
const companyRoutes = require("./routes/companyRoutes");
const autenticarToken = require("./middleware");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

// 🔓 registro das rotas
app.use("/api/clientes", clienteRoutes);
app.use("/auth", authRoutes);
app.use("/api/admin", companyRoutes);

// 🔒 rota protegida de teste
app.get("/clientes-protegido", autenticarToken, (req, res) => {
    res.json({
        mensagem: "Acesso autorizado",
        usuario: req.usuario
    });
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})
