const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;
const app = express();
require('dotenv').config();
const Port = process.env.PORT || 8080;
const hbs = require('hbs');
const mysql = require('mysql2'); 
const path = require('path');
const nodemailer = require('nodemailer');
const { dirname } = require('path');
const { use } = require('passport');


//Conectamos la app a una Base de Datos
const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORTDB,
    database: process.env.DATABASE,
});     
  
const conectar = (
    conexion.connect((err) =>{
        if(err) throw err;
        console.log('Base de Datos Conectada!!');
    })
);          
   
//Configuración de Middelwares
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser('lealmafor'));
app.use(session({
    secret: 'lealmafor', 
    resave: true,    
    saveUninitialized: true
}));    
app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done){
    //admin colocado de prueba sin base de datos
    if(username === "admin" && password === "12345678")
        return done(null,{id:1,name:"admin"});
    done(null,false);
}));
 
passport.serializeUser(function(user,done){
done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null, {id:1,name:"admin"});
});
//Configurar la vista de la Aplicación
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) =>{
    res.render('index')
});   

app.get('/ingresar', (req,res)=>{
    res.render('ingresar', {titulo:'Panel Administrador'});
});

app.post('/ingresar',(req,res,next) =>{
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
 },(req,res)=>{
    console.log(req.body);
    const{nombre,desarrollador,ano,plataforma,categoria,precio,cantidad}= req.body;
 
                let data ={
                    gm_name:nombre,
                    gm_dev:desarrollador,
                    gm_release:ano,
                    gm_device:plataforma,
                    gm_category:categoria,
                    gm_price:precio,
                    gm_amount:cantidad
                    
                } 

                let sql="INSERT INTO db_games SET ?";
                

                let query=conexion.query(sql,data,(err, results)=>{
                    if(err) throw err;
                    res.redirect('admin')
            });
            
    });  

//catalogo  
app.get('/catalogo', (req, res) =>{
     let sql = "SELECT * FROM db_games";

    let query=conexion.query(sql,(err, results) => {
        if(err) throw err;

        res.render('catalogo', {
            titulo:'Catálogo de Juegos disponibles',
            results
    })
    }); 
});   

app.get('/pc', (req, res) =>{
    let sql = "SELECT * FROM db_games WHERE gm_device = 'PC'";

   let query=conexion.query(sql,(err, results) => {
       if(err) throw err;

       res.render('catalogo', {
           titulo:'Catálogo de Juegos PC disponibles',
           results
   }) 
   }); 
});   

app.get('/xbox', (req, res) =>{
    let sql = "SELECT * FROM db_games WHERE gm_device = 'Xbox'";

   let query=conexion.query(sql,(err, results) => {
       if(err) throw err;

       res.render('catalogo', {
           titulo:'Catálogo de Juegos Xbox disponibles',
           results
   })
   }); 
});   

app.get('/playstation', (req, res) =>{
    let sql = "SELECT * FROM db_games WHERE gm_device = 'PlayStation'";

   let query=conexion.query(sql,(err, results) => {
       if(err) throw err;

       res.render('catalogo', {
           titulo:'Catálogo de Juegos Playstation disponibles',
           results
   })
   }); 
});   

app.get('/admin', (req,res,next) =>{
   if(req.isAuthenticated()) return next();
   res.redirect("/login");
},(req, res) =>{
    let sql = "SELECT * FROM db_games";

    let query=conexion.query(sql,(err, results) => {
        if(err) throw err;

        res.render('admin', {
        titulo:'Panel Administrador',
        results})
    }); 
}); 
 
//update
app.post ('/update', (req,res) =>{

let sql="UPDATE db_games SET gm_name='" + req.body.nombre + "', gm_dev='" + req.body.desarrollador + "', gm_release='" + req.body.ano +"', gm_device='" + req.body.plataforma +"', gm_category='" + req.body.categoria +"', gm_price='" + req.body.precio +"', gm_amount='" + req.body.cantidad +"' WHERE gm_id=" + req.body.id;

let query=conexion.query(sql,(err, results) => {
if(err) throw err;

res.redirect('admin')
}); 
});  

app.post ('/delete', (req,res) =>{

    let sql = "DELETE FROM db_games WHERE gm_id=" + req.body.id;

    let query=conexion.query(sql,(err, results) => {
        if(err) throw err;

        res.redirect('admin')
    });
});


 
app.get('/login', (req,res)=>{
    res.render('login', {titulo:'Ingrese sus datos para el Login'});
});

app.post('/login',passport.authenticate('local',{
    successRedirect:"/admin",
    failureRedirect: "/loginerror"}));

app.get('/loginerror', (req,res)=>{
        res.render('login', {titulo:'Ingrese sus datos correctos'});
    });
    
app.post('/loginerror',passport.authenticate('local',{
        successRedirect:"/admin",
        failureRedirect: "/loginerror"}));

app.get('/contacto', (req, res) =>{
    res.render('contacto', {titulo:'Escríbenos'})
});

app.post('/contacto',(req,res)=>{
    console.log(req.body);
    const{nombre,email,asunto,descripcion}= req.body;
    //validacion basica
    if(nombre ==""|| email==""|| descripcion==""){
        let validacion='Faltan datos para ingresar, todos los campos son obligatorios'
        res.render('contacto',{
            titulo: 'Formulario para completar',
            validacion
        })  
            }else{    

                let data ={
                    c_name: nombre,
                    c_mail: email,
                    c_subject: asunto,
                    c_description: descripcion
                }

                let sql="INSERT INTO db_contacto SET ?";

                let query=conexion.query(sql,data,(err, results)=>{
                    if(err) throw err;
                    let validacion='Sus datos fueron recibidos, nos estaremos comunicando por mail a la brevedad posible'
        res.render('contacto',{
            titulo: 'Formulario para completar',
            validacion
        })
            });
        }     
    });  
 


    app.get('/mensajes', (req, res) =>{
        let sql = "SELECT * FROM db_contacto";
   
       let query=conexion.query(sql,(err, results) => {
           if(err) throw err;
   
           res.render('mensajes', {
               titulo:'Panel Administrador',
               results
       })
       }); 
   });  


   app.post ('/delete2', (req,res) =>{

    let sql = "DELETE FROM db_contacto WHERE c_id=" + req.body.id;

    let query=conexion.query(sql,(err, results) => {
        if(err) throw err;

        res.redirect('mensajes')
    });
});
 

app.listen(Port, ()=>{
     
});  
 
app.on('error',(error) =>{
    console.log(`Tenemos un error ${error}`);
}); 
    