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

### **GET:**
` /{id}/productos` 
**respuesta:**
devuelve el id de los productos en el carrito

```
        [
          2,
          6,
          3,
          1,
          7,
          7
        ]
```


### **POST:** (crear carrito)
` api/cart/` 
POST necesita el objeto del carrito en el body

**ej:** 
```
{
  "userId": 1,
  "productsIds": [2, 5, 87, 6, 3, 1]
}
```
**respuesta:**

```
{
 "cartID": 5
}
```

### **POST:** (agregar producto al carrito)
` api/cart/{id}/productos` 
POST necesita el id del carrito en el parametro y el id dle producto a agregar en el body

**ej:** 
```
{
  "prod": 8
}
```
**respuesta:**

```
{
"success": "carrito editado con exito"
}
```
Error:

```
{
"error": "producto no editado"
}
```

### **DELETE:**
` api/cart/{id}/productos/{id_prod}` 
DELETE necesita el id del carrito y el id del producto a agregar de parametro

**ej:** 
```
http://localhost:8080/api/cart/2/productos/7
```
**respuesta:**

Editado correctamente:
```
{
  "success": "carrito editado"
}
```

Error:
```
{
"error": "No se pudo editar el carrito"
}
```






