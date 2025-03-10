import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

/* ROUTES IMPORT */
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes)

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
