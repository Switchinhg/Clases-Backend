# **{Name Pending} - Backend**

### Ruta `/api/productos`


### **GET:**
` /productos/{id}` id es opcional
**respuesta:**

```
   { 
        name:"Minecraft",
        price: 29.99,
        description: "Minecraft is a 3-D computer game where players can build anything.",
        thumbnail: "https://www.minecraft.net/content/dam/games/minecraft/key-art/MC_One-Vanilla_285x380px.jpg",
        id: 1,
    }
```


### **POST:**
` api/productos/` 
POST necesita la key del usuario admin en el body

**ej:** 
```
async function postData(){

    const response = await fetch('localhost:8080/api/productos',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: {
            "key": "Key",
            "name": "prodName",
            "price": 0,
            "description": "lorem Ipsum",
            "thumbnail": "lorem Ipsum"
        }
    })
}
```
**respuesta:**

Admin

```
{
  "success": "Producto agregado correctamente"
}
```

No admin:
```
{
  "error": "usuario no permitido"
}
```

### **PUT:**
` api/productos/` 
post necesita la key del usuario admin y el id del producto a cambiar en el body

**ej:** 
```
async function putData(){

    const response = await fetch('localhost:8080/api/productos',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: {
            "key": "Key",
            "id": 2,
            "name": "prodName",
            "price": 0,
            "description": "lorem Ipsum",
            "thumbnail": "lorem Ipsum"
        }
    })
}
```
**respuesta:**

Admin

```
{
  "success": "producto editado"
}
```

No admin:
```
{
  "error": "usuario no permitido"
}
```
### **DELETE:**
` api/productos/` 
DELETE necesita la key del usuario admin y el id del producto a borrar en el body

**ej:** 
```
async function delData(){

    const response = await fetch('localhost:8080/api/productos',{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: {
            "key": "Key",
            "id": 2,
        }
    })
}
```
**respuesta:**

Admin

```
{
  "success": "producto borrado"
}
```

No admin:
```
{
  "error": "usuario no permitido"
}
```
### Ruta `/api/cart`






