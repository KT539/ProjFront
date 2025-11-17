import { Router } from "express";
import { listMovies, getOneMovie, search } from "../controllers/movieController.js";


const router = Router();


router.get("/", listMovies);
router.get("/search", search);
router.get("/:id", getOneMovie);


export default router;
