import "dotenv/config";
import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const port = process.env.PORT;
const db = new pg.Client({
  connectionString: process.env.EXTRENAL_DB_URL,
  ssl: { rejectUnauthorized: false },
});
db.connect();

const createTable = async () => {
  await db.query(
    "CREATE TABLE IF NOT EXISTS LIST( id serial primary key, task text NOT NULL, done boolean default false);",
    (err, res) => {
      if (err) console.error("Error execution of query failed", err.stack);
      else {
      }
    }
  );
};

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  createTable();
  const result = await db.query("SELECT * FROM LIST", (err, response) => {
    if (err) console.error("Error execujting query", err.stack);
    else {
      res.json(response.rows);
    }
  });
});

app.post("/add", async (req, res) => {
  const data = req.body.task;
  if (data.length === 0) console.log("empty");
  else {
    const result = await db.query(
      "INSERT INTO LIST (task) VALUES($1)",
      [data],
      (err, response) => {
        if (err) console.error("Error execujting query", err.stack);
        else {
          res.json(response.rows);
        }
      }
    );
  }
});

app.patch("/update/:id/:done", async (req, res) => {
  const id = req.params.id;
  let done = req.params.done;
  if (done === "true") done = "false";
  else done = "true";
  const result = await db.query(
    "UPDATE LIST SET done = $1 WHERE id = $2",
    [done, id],
    (err, response) => {
      if (err) console.error("Error execujting query", err.stack);
      else {
        res.json(response.rows);
        console.log(response.rows);
      }
    }
  );
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.query(
    "DELETE FROM LIST WHERE id = $1;",
    [id],
    (err, response) => {
      if (err) console.error("Error execujting query", err.stack);
      else {
        res.json(response.rows);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
