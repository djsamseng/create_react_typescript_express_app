import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";

const app = express();
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