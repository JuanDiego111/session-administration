const express = require('express')
const fun = express()
const bodyParse = require('body-parser')
const session=require('express-session')


fun.use(bodyParse.json())
fun.use(bodyParse.urlencoded({extended:true}))
fun.set('view engine','ejs')

fun.get("/home",(pet,res)=>{
    res.sendFile(__dirname+'/home.html',{usuario:pet.session.usuario})
})

fun.listen(8080, function(){
    console.log("Iniciado")
})