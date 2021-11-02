import { Router } from "express";
import mongoose from "mongoose";
const router = Router();

router.route("/Exercise").get((req, res) => {
    let id = req.query.id;

    
});

export default router