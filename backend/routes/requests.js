const express = require("express");

const requireAdminAuth = require("../middleware/requireAdminAuth");
const requireAuth = require("../middleware/requireAuth");
const { requestList, generateReq, delReq } = require("../controllers/animalRequestsController");

const requestsRouter = express.Router();

requestsRouter.get("/",requireAdminAuth, requestList);

requestsRouter.post("/:postID",requireAuth, generateReq);
requestsRouter.delete("/:postID",requireAdminAuth, delReq);



module.exports = requestsRouter;

