import { Router } from "express";
import { ControllerBlogpost } from "./blog.controller";
const router = Router();

router.post("/", ControllerBlogpost.CreateBlogPost);
router.get("/", ControllerBlogpost.GetAllBlogPost);
router.get("/:id", ControllerBlogpost.GetSingleBlogById);
router.put("/:id", ControllerBlogpost.UpdateBlogById);
router.delete("/:blogId", ControllerBlogpost.DeleteBlogsByID);
export const blogsRoute = router;
