import express, { Response, Request, NextFunction } from "express";

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  console.log(req);
  return res.send("Hello world shubham");
});

app.post("/api/user", (req: Request, res: Response) => {
  console.log("shuhbam", req.query.id);
  if (req.body) {
    if (req.query.id === "6") {
      return res.send("admin login");
    }
    if (!req.body.name) {
      res.sendStatus(400);
      return res.send("please send 'name' key");
    } else if (!req.body.age) {
      res.sendStatus(400);

      return res.send("please send 'age' key");
    }
    return res.send("getData");
  } else {
    res.sendStatus(200);

    return res.send("please send body");
  }
});

const getData1 = (req: Request, res: Response, next: NextFunction) => {
  console.log("getData1");
  next();
};

const getData2 = (req: Request, res: Response, next: NextFunction) => {
  console.log("getData2");
  console.log("id-->", req.params.id);
  console.log("name-->", req.params.name);
  return res.json({ sucess: true, data: req.params.name });
};

app.get("/api/data/:id/:name", [getData1, getData2]);
let books: any = [
  {
    id: 1,
    name: "shubham",
    age: "27",
  },
];
// Crud
// app
//   .route("/api/books")
//   .get((req: Request, res: Response) => {
//     console.log("id", req.body);
//     return res.json(books);
//   })
//   .post((req: Request, res: Response) => {
//     console.log("add", req.body);
//     console.log("books added", [...books, req.body]);

//     return res.send("books add successfully");
//   })
//   .put((req: Request, res: Response) => {
//     console.log("update", req.body);
//     console.log("books added", [...books, req.body]);

//     return res.send("update add successfully");
//   })
//   .delete((req: Request, res: Response) => {
//     console.log("id", req.body);

//     return res.send("You make a DELETE request");
//   });

//Crud

app.listen(3005, () => {
  console.log("Application listing at http://localhost:3005");
});
