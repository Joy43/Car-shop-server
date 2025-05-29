import { Router } from "express";
import { ControllerBlogpost } from "./blog.controller";
const router = Router();

router.post("/",ControllerBlogpost.CreateBlogPost );
router.get("/",);

export const blogsRoute= router;
