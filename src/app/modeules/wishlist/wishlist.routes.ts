import express from "express";

import auth from "../middlewates/Auth";
import { USER_ROLE } from "../user/user.contant";
import { WishListController } from "./wishlist.controller";


const router = express.Router();

router.post("/", auth(USER_ROLE.admin,USER_ROLE.user),WishListController.createWishlist);
router.get("/",auth(USER_ROLE.admin,USER_ROLE.user),WishListController.createWishlist);

export const Wishlistrouter=router;
