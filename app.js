const express = require('express')
const fun = express()
const bodyParse = require('body-parser')
const session = require('express-session')
const flash = require('express-flash')

fun.use(bodyParse.json())
fun.use(bodyParse.urlencoded({extended:true}))
fun.set('view engine','ejs')
fun.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }))
fun.use(flash())
const cookieParser = require('cookie-parser')
fun.use(cookieParser())

fun.get("/leer",(pet,res)=>{
    res.render('details/form',{error:pet.flash('error')})
})

fun.get("/vistas",function (pet,res){
    let visitas = pet.session.visitas
    console.log(visitas);
    if (visitas == undefined){
      visitas = 0
    }
    visitas +=1
    pet.session.visitas = visitas
    res.send(`Visitas ${visitas}`);
    
})

fun.get("/",(pet,res)=>{
    
    res.cookie('nombre',pet.query.nombre).send('Cookie is set');
    console.log(pet.query.nombre)
})

fun.get("/publicar",(pet,res)=>{
    res.send(`Bienvenido: ${pet.cookies['nombre']}` )
})

fun.get("/home",(pet,res)=>{
    res.render("details/home",{usuario: pet.session.Usuario})
})
fun.post("/autenticar",(pet,res)=>{
    if (pet.body.Usuario=="Luis" && pet.body.Password==123456){
        pet.session.Usuario=pet.body.Usuario

        res.redirect("/home")
    }
    else{
        pet.flash('error','Datos incorrectos');
        res.redirect("/")
    }
})

fun.get("/library",(pet,res)=>{
    res.render("details/library",{usuario: pet.session.Usuario})
})

fun.get("/out",(pet,res)=>{
    pet.session.destroy();
    res.redirect("/")
})
fun.listen(8080, function(){
    console.log("Iniciado")
})