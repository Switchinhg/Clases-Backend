const { json } = require('body-parser');
const fs = require('fs')

class Contenedor{
    constructor(archivo){
        this.archivo=archivo
    }

        async isAdmin(usuarioKEY){
                await fs.promises.readFile(this.archivo, 'utf-8')
                .then(data=>JSON.parse(data))
                .then(data=>{
                    
                    data.forEach(usuario => {
                        if(usuario.key === usuarioKEY){
                            if(usuario.rol==='Admin'){
                                console.log('yes')
                                return {"permitido":true}
                            }
                            else{
                                console.log('n0')
                                return {"permitido":false}

                            }
                        }
                    });
                })
            
        }
    
    }


module.exports = Contenedor