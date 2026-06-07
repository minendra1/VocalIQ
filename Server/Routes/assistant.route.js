import express from "express"
import { getAssistantConfig, askAssistant } from "../Controllers/assistant.controller.js"

const router = express.Router()

router.get("/config/:userId", getAssistantConfig)
router.post("/ask", askAssistant)

export default router