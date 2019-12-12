const Express = require("express");
const router = Express.Router();
const User = require("../models/User")


router.post("/new", async(req, res)=>{
    try{
        const body = req.body; 
        const user = new User(body);
        const userDB = await user.save() //comando de mongoose para guardar
        res.status(200).json({userDB})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error})
    }
})

router.post("/update/:id", async(req, res)=>{
    const {id}=req.params;
    const {name, password, role, email} = req.body;
    const userData = {name, password, role, email}
    try{
        const options = {
            new: true,
            runValidators: true
        }
        const userDB=await User.findByIdAndUpdate(id,  userData, options);  //función de mongo que permite buscar por Id y actualizar true es para que devuelva el valor actualizado
        res.status(200).json({userDB})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error})
    }
})

router.get("/get/:name", async (req,res)=>{
    const {name} = req.params;
    try{
        const userDB = await User.find({$and:[{name}, {_id: id}]}, {password:0}) //reproduce todo lo del find, asi qeu podemos usar varios parametros. 
        const userCount = await User.count({})
        .skip(3) //Se le pueden pasar funciones de mongo parecidas a as busquedas que hicimos pasando los mismo parametros. Reproduce el finde
        .limit(2) 
        res.status(200).json({userDB, userCount}); 
    }catch(error){
        console.log(error)
        res.status(400).json({error})

    }
})

router.delete("/delete/:id", async (req,res)=>{ //Esto sería borrar
    const{id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id); //con esto lo borra entero
        res.json({deletedUser})
    }
    catch(error){
        console.log(error)
        res.status(404).json({error})    
    }
})

router.delete("/deleteFake/:id", async (req,res)=>{ //Lo que se hace hoy en dia no es borrar, es cambiar el estado y con ese estado no usarlo, para guardar los datos.
    const{id} = req.params;
    try{
        const deletedUser = await User.findByIdAndUpdate(id, {state:false}); //con esto lo borra entero
        res.json({deletedUser})
    }
    catch(error){
        console.log(error)
        res.status(404).json({error})    
    }
})



module.exports = router