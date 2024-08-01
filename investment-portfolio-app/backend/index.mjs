import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import stocks from "./routes/stocks/stocks.mjs";
import cds from "./routes/cds/cds.mjs";
import futures from "./routes/futures/futures.mjs";
import stockvalue from "./routes/stocks/stockvalue.mjs";
import futurevalue from "./routes/futures/futurevalue.mjs";
import cdvalue from "./routes/cds/cdvalue.mjs";
import total from "./routes/total.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /investments routes
app.use("/investments", stocks);
app.use("/investments", stockvalue);
app.use("/investments", futures);
app.use("/investments", futurevalue);
app.use("/investments", cds);
app.use("/investments", cdvalue);
app.use("/investments", total);


// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;