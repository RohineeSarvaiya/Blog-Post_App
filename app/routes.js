const express = require("express")
const router = express.Router()
const DB = require("../database/connection.js")
const prevention = require("sqlstring")



router.get ("/", ( request , response ) => {
    DB.query(`SELECT * FROM blogs` , ( error , result ) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            response.render("home.ejs" , {result} )
        }
    })
})



router.get("/create", ( request , response ) => {
   response.render("create.ejs")
})

router.post("/create" , ( request , response ) => {
    const newBlog = request.body
    DB.query(`INSERT INTO  
    blogs(TITLE , AUTHOR , ABSTRACT ,IMAGE , CATEGORIES , DESCRIPTION ) 
    VALUES ( ${prevention.escape(newBlog.title)},
             ${prevention.escape(newBlog.author)},
             ${prevention.escape(newBlog.abstract)},
             ${prevention.escape(newBlog.image)},
             ${prevention.escape(newBlog.categories)},
             ${prevention.escape(newBlog.description)}
     ) ` , (error , result ) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            response.redirect("/")
        }
    })
})



router.get("/show/:id" , ( request , response ) => {
    const id = request.params.id
    DB.query(`SELECT * FROM blogs WHERE id ="${id}" ` , ( error , result ) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            response.render("show.ejs" , {result} )
        }
    })
})



router.get("/edit/:id" , ( request , response ) => {
    const id = request.params.id
    DB.query(`SELECT * FROM blogs WHERE id ="${id}" ` , ( error , result ) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            response.render("edit.ejs" , {result} )
        }
    })
})

router.put("/edit/:id" , ( request , response ) => {
    const id = request.params.id
    const updatedBlog = request.body
    DB.query(`UPDATE blogs
    SET TITLE = ${prevention.escape(updatedBlog.title)},
    AUTHOR =  ${prevention.escape(updatedBlog.author)},
    ABSTRACT =  ${prevention.escape(updatedBlog.abstract)},
    IMAGE =  ${prevention.escape(updatedBlog.image)},
    CATEGORIES =  ${prevention.escape(updatedBlog.categories)},
    DESCRIPTION =  ${prevention.escape(updatedBlog.description)}
    WHERE id ="${id}" ` , ( error , result ) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            response.redirect("/")
        }
    })
})



router.get("/delete/:id" , ( request , response ) => {
    const id = request.params.id
    DB.query(`DELETE FROM blogs WHERE id ="${id}" ` , ( error , result ) => {
        if(error)
        {
            console.log(error)
        }
        else
        {
            response.redirect("/")
        }
    })
}) 


module.exports = router