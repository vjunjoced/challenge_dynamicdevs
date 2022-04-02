# Dynamicdevs Challenge

### Descripción
-   Para el cálculo de la posición de la nave se está usando el método de trilateración 2D, utilizaremos una librería externa disponible en Node.Js [trilateración](https://www.npmjs.com/package/trilateration), a la cual se le hicieron algunos ajustes. Esto nos permitirá desligarnos de los cálculos matemáticos involucrados. Todo el proceso y las validaciones quedarán a cargo de este módulo. Si no es posible obtener la posición del emisor del mensaje se enviará una respuesta de error como se indica.
- Para la decodificación del mensaje recibido utilizaremos un algoritmo propio. Asumiremos que el mensaje que cada satélite envía, tendrá la misma longitud (misma cantidad de elementos dentro del array). Si la longitud del mensaje en cada satélite es diferente se notificará un error. Si en una posición dada dentro de cada array no encontramos ningún valor (string vació), no se terminará de procesar el mensaje y se notificará un error. Las validaciones relacionadas con este proceso serán controladas por nosotros.
- Para las solicitudes que se hacen al endpoint /topsecret_split/:satellite_name, cuando se hace el post para guardar la distancia y mensajes del satélite se están guardando en una base de datos MongoDB(se está usando MongoDB y no la memoria ya que las funciones Lambda no guardan estado), cuando se hace el get se obtienen los satélites de MongoDB y se procede hacer los cálculos requeridos para obtener la posición y mensajes de la nave.



Se está utilizando node.js y express para correr un servidor http el cual nos servirá para exponer los endpoint donde llegan las solicitudes. Para la implementación en producción se está utilizando funciones lambdas de aws implementadas con serverless-framework.

### Endpoints
##### - Obtener el mensaje y la posición de la nave
```
Method: POST
URL: https://8iurlsxxc9.execute-api.us-east-1.amazonaws.com/topsecret/
Body: 
{
  "satellites": [
    {
      "name": "kenobi",
      "distance": 100.0,
      "message": [ "this", "", "", "message", "" ]
    },
    {
      "name": "skywalker",
      "distance": 115.5,
      "message": [ "", "is", "", "", "secret" ]
    },
    {
      "name": "sato",
      "distance": 142.7,
      "message": [ "this", "", "a", "", "" ]
    }
  ]
}
```
##### Respuesta esperada
```
200 - Ok
{
    "position": {
        "x": -487.28591250000005,
        "y": 1557.0142250000004
    },
    "message": "this is a message secret"
}
```
Si ocurre algún error ya sea porque no se puede obtener la posición o no se puede descifrar el mensaje, el servidor retorna un 404 con una respuesta.

- **No se puede descifrar el mensaje**
```
404 - Not Found
{
    "error": "No message found",
    "code": "resource_not_found"
}
```
- **No se puede obtener la posición**
```
404 - Not Found
{
    "error": "No position found",
    "code": "resource_not_found"
}
```

##### - Enviar información de un satélite a /topsecret_split
```
Method: POST
URL: https://8iurlsxxc9.execute-api.us-east-1.amazonaws.com/topsecret_split/:satellite_name
Body: 
{
  "distance": 100.0,
  "message": ["this", "", "", "message", ""]
}
```

##### - Obtener posición y mensaje llamando a /topsecret_split
```
Method: GET
URL: https://8iurlsxxc9.execute-api.us-east-1.amazonaws.com/topsecret_split/:satellite_name
```Lambda

##### Respuesta esperada
```
200 - Ok
{
    "position": {
        "x": -487.28591250000005,
        "y": 1557.0142250000004
    },
    "message": "this is a message secret"
}
```
Si ocurre algún error ya sea porque no se puede obtener la posición o no se puede descifrar el mensaje, el servidor retorna un 404 con una respuesta.

- **No se puede descifrar el mensaje**
```
404 - Not Found
{
    "error": "No message found",
    "code": "resource_not_found"
}
```
- **No se puede obtener la posición**
```
404 - Not Found
{
    "error": "No position found",
    "code": "resource_not_found"
}
```

**Para las pruebas en la carpeta postman se encuentra una collection para hacer llamadas al endpoints**
### Requisitos

- Node.js and npm
- Serverless Framework - Lambda (**Solo para producción**)
- Postman

### Empezando

Ejecute el siguiente comando en su entorno local::

```
git clone git@github.com:vjunjoced/challenge_dynamicdevs.git
cd challenge_dynamicdevs
npm install
```

Luego, puede ejecutar localmente en modo de desarrollo con recarga en vivo::

```
npm run dev
```

El servidor local estará escuchando en http://localhost:4000

### Implementar en producción

Puede implementar en producción con el siguiente comando:
```
npm run deploy-prod
```
Tenga en cuenta que necesitará tener configurado serverles framework ya que el servicio está desarrollado para ejecutarse en funciones lambda de aws
[# Serverless Framework](https://www.serverless.com/framework/docs/getting-started)

### Eliminar lambda de aws
Para eliminar el proyecto de aws  lambda ejecutamos el siguiente comando.
```
npm run remove-prod
```