import { Router } from "express";
import controller from "../controllers/index.js";
import { db } from "../app/models/index.js";

export const router = Router();

router.post('/', controller.addList);
router.put('/:id/closed', controller.archiveList);
router.get('/:id/cards', controller.getCards);