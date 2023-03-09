import mysql from "mysql";
export const connectionn = mysql.createConnection({
  host: "localhost",
  database: "mylearning",
  user: "root",
  password: "",
});

export const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    connectionn.connect((error: any) => {
      if (error) {
        reject(error);
        console.log("error occurred while connecting");
        return;
      } else {
        resolve(connectionn);
        console.log("Db connected successfully");
      }
    });
  });
