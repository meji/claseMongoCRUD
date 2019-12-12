const mongoose = require("mongoose");
const Schema = mongoose.Schema //Para aplicar la clase squema
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name es obligatorio"] //Pasamos un booleano si es requerido y el mensaje que le pasamos al user si no lo metemos
    },
    email:{
        type: String,
        required: [true, "Email es obligatorio"],
        unique: true //Para uqe solo haya uno
    },
    password:{
        type: String,
        required: [true, "password es obligatorio"]     
    },
    state:{
        type: Boolean,
        required: [true, "state es obligatorio"],     
        default: true,
    },
    role:{
        type: String,
        default: "USER_ROLE",
        enum: { 
            values:    ["USER_ROLE", "ADMIN_ROLE"],
            message: "{VALUE} no es el correcto en {PATH}"
        }
    }

})




userSchema.plugin(uniqueValidator, {message: "{PATH} debe ser único"})
module.exports = mongoose.model("User", userSchema)  //Este nombre nos relaciona con otros modelos, el segundo parámetro