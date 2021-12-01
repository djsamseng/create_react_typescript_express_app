import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";
import enableWs from "express-ws";

const { app } = enableWs(express());
const PORT = process.env.PORT || 4000;
const jsonParser = bodyParser.json();
const routes = Router();

app.use(cors());
app.use(routes);

const server = app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
routes.post("/goto", jsonParser, async (req, resp) => {
   console.log("Req:", req.body);
   resp.send({ success: true });
});

app.ws("/ws", (ws, request) => {
    console.log("Got ws open");
    ws.on("message", msg => {
      console.log("Got ws message:", msg);
      ws.send(JSON.stringify({ test: "test!" }));
    });
  });