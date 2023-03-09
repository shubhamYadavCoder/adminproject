import express, { Response, Request, NextFunction } from "express";
import config from "config";
import { Connect, connectionn } from "./utils/connect";
import routes from "./routes";

const app = express();
app.use(express.json());
const port = config.get<string>("port");
app.get("/user", (req: Request, res: Response, next: NextFunction) => {
  connectionn.query("SELECT * FROM `userList`", (err: any, rows: any) => {
    console.log(rows);
    if (!err) {
      res.send(rows);
      res.sendStatus(200);
      next();
    } else {
      res.send(err);
      next();
    }
  });
});

app.post("/user", (req: Request, res: Response, next: NextFunction) => {
  const { name, email, des } = req.body;
  connectionn.query(
    `INSERT INTO userlist (name, email, des) VALUES ('${name}','${email}','${des}')`,
    (err: any, rows: any) => {
      if (!err) {
        return res.json({
          data: { message: "User add successfuly" },
          status: 200,
        });
        // res.sendStatus(200);
        // next();
      } else {
        console.log("Errored ->", err);
        res.send(err);
        next();
      }
    }
  );
});

// Crud
app
  .route("/api/books")
  .get((req: Request, res: Response, next: NextFunction) => {
    connectionn.query("SELECT * FROM `userList`", (err: any, rows: any) => {
      console.log(rows);
      if (!err) {
        res.send(rows);
        res.sendStatus(200);
        next();
      } else {
        res.send(err);
        next();
      }
    });
  })
  .post((req: Request, res: Response) => {
    return res.send("books add successfully");
  })
  .put((req: Request, res: Response) => {
    console.log("update", req.body);

    return res.send("update add successfully");
  })
  .delete((req: Request, res: Response) => {
    const { email } = req.body;
    connectionn.query(
      `DELETE FROM Customers WHERE CustomerName='${email}'`,
      (err: any, rows: any, next: NextFunction) => {
        if (!err) {
          res.json({ data: { message: "User add successfuly" }, status: 200 });
          res.sendStatus(200);
          next();
        } else {
          console.log("Errored ->", err);
          res.send(err);
          next();
        }
      }
    );
    return res.send("You make a DELETE request");
  });

//Crud
app.listen(port, async () => {
  console.log(`Application listing at http://localhost:${port}`);
  await Connect();
  routes(app);
});
