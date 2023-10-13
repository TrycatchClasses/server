import  express  from "express";
import { deleteUser, getUsers, loginUser, newUser } from "../controller/User.controller";

const router = express.Router();

router.post("/add",newUser);
router.post("/login",loginUser);
router.get("/all",getUsers);
router.delete("/delete/:id",deleteUser);

export default router;