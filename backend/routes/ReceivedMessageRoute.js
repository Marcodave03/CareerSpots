import express from "express";

import {
    getReceivedMessagesByUserId,
    getReceivedMessagesByMessageId
} from "../controllers/ReceivedMessagesController.js";
const router = express.Router();

router.get("/getreceivedmessagesbyuserid/:id", getReceivedMessagesByUserId);
router.get("/getreceivedmessagesbymessageid/:id", getReceivedMessagesByMessageId);


export default router;
