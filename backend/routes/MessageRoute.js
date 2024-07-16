import express from "express";

import {
    createMessage,
    getMessagesByUserId, 
    getMessageByMessageId
} from "../controllers/MessagesController.js";
const router = express.Router();

router.get("/getmessagesbyuserid/:id", getMessagesByUserId);
router.get("/getmessagebymessageid/:id", getMessageByMessageId);
router.post("/createmessage", createMessage);


export default router;
