import * as express from "express";

import { authorized } from "../authz";
import ProjectModel from "../project";
import UserModel from "../user";
import { MultichainClient } from "../multichain";
import { TruBudgetError } from "../error";

export const createRouter = (
  multichainClient: MultichainClient,
  jwtSecret: string,
  rootSecret: string
) => {
  const userModel = new UserModel(multichainClient, jwtSecret, rootSecret);
  const projectModel = new ProjectModel(multichainClient);

  const router = express.Router();

  router.get("/health", (req, res) => res.status(200).send("OK"));

  router.post("/user.create", async (req, res) => {
    const intent = req.path.substring(1);
    const body = req.body;
    console.log(`body: ${JSON.stringify(body)}`);
    if (body.apiVersion !== "1.0") {
      res.status(412).send(`API version ${body.apiVersion} not implemented.`);
      return;
    }
    if (!body.data) {
      res.status(400).send(`Expected "data" in body.`);
      return;
    }

    try {
      const createdUser = await userModel.create(body.data, authorized(req.token, intent));
      res.status(201).json(createdUser);
    } catch (err) {
      switch (err.kind) {
        case "NotAuthorized":
          console.log(err);
          res.status(403).send(`User ${req.token.userId} is not authorized to execute ${intent}`);
          break;
        case "UserAlreadyExists":
          console.log(err);
          res.status(409).send(`The user already exists.`);
          break;
        case "ParseError":
          console.log(err);
          res.status(400).send(`Missing keys: ${err.badKeys.join(", ")}`);
          break;
        default:
          console.log(err);
          res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  });

  router.post("/user.authenticate", async (req, res) => {
    const intent = req.path.substring(1);
    const body = req.body;
    console.log(`body: ${JSON.stringify(body)}`);
    if (body.apiVersion !== "1.0") {
      res.status(412).send(`API version ${body.apiVersion} not implemented.`);
      return;
    }
    if (!body.data) {
      res.status(400).send(`Expected "data" in body.`);
      return;
    }

    try {
      const jwt = await userModel.authenticate(body.data);
      res.status(200).send(jwt);
    } catch (err) {
      switch (err.kind) {
        case "ParseError":
          console.log(err);
          res.status(400).send(`Missing keys: ${err.badKeys.join(", ")}`);
          break;
        case "AuthenticationError":
          console.log(err);
          res.status(401).send(`Authentication failed.`);
          break;
        default:
          console.log(err);
          res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  });

  router.get("/project.list", async (req, res) => {
    // Returns all projects the user is allowed to see
    const intent = req.path.substring(1);
    try {
      const projects = await projectModel.list(authorized(req.token, intent));
      res.json({
        apiVersion: "1.0",
        data: {
          items: projects
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  });

  router.post("/project.create", async (req, res) => {
    const intent = req.path.substring(1);
    const body = req.body;
    console.log(`body: ${JSON.stringify(body)}`);
    if (body.apiVersion !== "1.0") {
      res.status(412).send(`API version ${body.apiVersion} not implemented.`);
      return;
    }
    if (!body.data) {
      res.status(400).send(`Expected "data" in body.`);
      return;
    }

    try {
      const id = await projectModel.createProject(body.data, authorized(req.token, intent));
      res.status(201).send(id);
    } catch (err) {
      if (err.kind === "NotAuthorized") {
        console.log(err);
        res.status(403).send(`User ${req.token.userId} is not authorized to execute ${intent}`);
      } else {
        console.log(err);
        res.status(500).send("INTERNAL SERVER ERROR");
      }
    }
  });

  return router;
};