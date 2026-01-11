const express = require("express");
const router = express.Router();

const companyController = require("c:/PROJETOAPIGAS/backend/controllers/companyController");

// GET consultar empresa
router.get("/admin/company/profile", companyController.profile);

// Put/ atualizar empresa
router.put("/admin/company/profile", companyController.updateProfile);

// PATCH atualizar empresa
router.patch("/admin/company/profile", companyController.updatePartialProfile);

module.exports = router
