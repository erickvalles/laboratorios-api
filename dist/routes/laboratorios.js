"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const laboratorios_1 = require("../controller/laboratorios");
const verify_token_1 = require("../middleware/verify_token");
const router = (0, express_1.Router)();
router.post("/", laboratorios_1.crearLaboratorio);
router.get("/porNombre", laboratorios_1.obtenerLaboratoriosPorNombre);
router.get("/", verify_token_1.autorizar, laboratorios_1.obtenerTodosLaboratorios);
router.get("/buscar/:usuario_codigo", laboratorios_1.buscarLaboratoriosPorEncargado);
router.get("/buscarPorNombre/:nombre", laboratorios_1.buscarLaboratoriosPorNombre);
router.put("/:id", laboratorios_1.actualizarLaboratorio);
router.get("/:id", laboratorios_1.getLabPorId);
router.delete("/:id", laboratorios_1.borrarLaboratorio);
exports.default = router;
