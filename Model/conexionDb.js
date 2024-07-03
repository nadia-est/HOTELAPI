import mysql2 from "mysql2/promise";
const dbconfig = {
host:"localhost",
user:"root",
port: 3306,
database:"dbhotel",
}

export const db = await mysql2.createConnection(dbconfig)