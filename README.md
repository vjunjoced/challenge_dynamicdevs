# Dynamicdevs Challenge

### Descripción
-   Para el cálculo de la posición de la nave se está usando el método de trilateración 2D, utilizaremos una librería externa disponible en Node.Js [trilateración](https://www.npmjs.com/package/trilateration), a la cual se le hicieron algunos ajustes. Esto nos permitirá desligarnos de los cálculos matemáticos involucrados. Todo el proceso y las validaciones quedarán a cargo de este módulo. Si no es posible obtener la posición del emisor del mensaje se enviará una respuesta de error como se indica.
- Para la decodificación del mensaje recibido utilizaremos un algoritmo propio. Asumiremos que el mensaje que cada satélite envía, tendrá la misma longitud (misma cantidad de elementos dentro del array). Si la longitud del mensaje en cada satélite es diferente se notificará un error. Si en una posición dada dentro de cada array no encontramos ningún valor (string vació), no se terminará de procesar el mensaje y se notificará un error. Las validaciones relacionadas con este proceso serán controladas por nosotros.

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

**Para las pruebas en la carpeta postman se encuentra una collection para hacer llamadas al endpoint**
### Requisitos

- Node.js and npm
- Serverless Framework (**Solo para producción**)

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
Tenga en cuenta que necesitará tener configurado serverles framework ya que el servicio está desarrollado para correr en funciones lambda de aws
[# Serverless Framework](https://www.serverless.com/framework/docs/getting-started)