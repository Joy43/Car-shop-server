import express from "express";

import auth from "../middlewates/Auth";
import { USER_ROLE } from "../user/user.contant";
import { WishListController } from "./wishlist.controller";


const router = express.Router();

router.post("/", auth(USER_ROLE.admin,USER_ROLE.user),WishListController.createWishlist);
// router.get("/",auth(USER_ROLE.user),WishListController.getWishlist);
router.get("/",auth(USER_ROLE.user,USER_ROLE.admin),WishListController.getAllWishlist);
router.delete("/:id",  WishListController.DeleteWishlist);
export const Wishlistrouter=router;
 