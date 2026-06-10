import express from "express"
import { authorization } from "../middleware/auth.middleware.js"
import { createAccount } from "../controller/account.controller.js"

const router= express.Router()

/**
 * - POST/api/account/
 * - create a new account
 * - protected route
 */
router.post("/",authorization,createAccount)
export default router