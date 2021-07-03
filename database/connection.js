const mysql = require("mysql")

const DB = mysql.createConnection ({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog"
})


DB.connect(( error ) => {
  if(!error)
  {
    DB.query(`SELECT 1 FROM blogs`, ( error , result ) => {
      if(error)
      {
        DB.query( `CREATE TABLE blogs (
          ID INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
          TITLE VARCHAR(60) NOT NULL,
          AUTHOR VARCHAR(150) NOT NULL,
          ABSTRACT MEDIUMTEXT NOT NULL,
          IMAGE VARCHAR(255) NOT NULL,
          CATEGORIES VARCHAR(200) NOT NULL,
          DESCRIPTION LONGTEXT NOT NULL,
          CREATED_DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP )` )
      }
      else
      {
        console.log("Table already exists!")
      }
    })
  }
  else
  {
    console.log(error)
  }

})

module.exports = DB