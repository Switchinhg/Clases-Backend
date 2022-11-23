const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo=archivo
    }

        async isAdmin(usuarioKEY){
                const data= await fs.promises.readFile(this.archivo, 'utf-8')
                .then(data=>JSON.parse(data))
                .then(data=>{return data.some(e=> e.key === usuarioKEY && e.rol === "Admin")})
                return data
            
        }
    
    }


module.exports = Contenedor