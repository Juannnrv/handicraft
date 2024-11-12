# Documentación de Endpoints de Autenticación

## Endpoints

### Autenticación con Google

- **URL para inicio de sesión**: `/auth/google`
- **Método**: `GET`
- **Descripción**: Redirecciona al usuario a la pantalla de inicio de sesión de Google. La autenticación se maneja usando el perfil y el correo electrónico del usuario.
- **Uso**: 
  ```http
  GET /auth/google
  ```
- **Callback URL**: 
  ```http
  GET /auth/google/callback
  ```
    - **Descripción**: URL de retorno de Google después de la autenticación.
    - **Uso**: GET /auth/google/callback
    - **Parámetros de URL**: Ninguno
    - **Redirección en caso de éxito**: Muestra un mensaje en laconsola logeado con exito.
    - **Redirección en caso de falla**: Redirecciona a /

### Autenticación con Discord

- **URL para inicio de sesión**: `/auth/discord`
- **Método**: `GET`
- **Descripción**: Redirecciona al usuario a la pantalla de inicio de sesión de Discord. Requiere permisos para obtener la identidad y el correo electrónico del usuario.

- **Uso**: 
  ```http
  GET /auth/discord
  ```
- **Callback URL**: 
  ```http
  GET /auth/discord/callback
  ```
    - **Descripción**: URL de retorno de discord después de la autenticación.
    - **Uso**: GET /auth/discord/callback
    - **Parámetros de URL**: Ninguno
    - **Redirección en caso de éxito**: Muestra un mensaje en laconsola logeado con exito.
    - **Redirección en caso de falla**: Redirecciona a /

### Autenticación con Facebook

- **URL para inicio de sesión**: `/auth/facebook`
- **Método**: `GET`
- **Descripción**: Redirecciona al usuario a la pantalla de inicio de sesión de facebook. Requiere permisos para obtener la identidad y el correo electrónico del usuario.

- **Uso**: 
  ```http
  GET /auth/facebook
  ```
- **Callback URL**: 
  ```http
  GET /auth/facebook/callback
  ```
    - **Descripción**: URL de retorno de facebook después de la autenticación.
    - **Uso**: GET /auth/facebook/callback
    - **Parámetros de URL**: Ninguno
    - **Redirección en caso de éxito**: Muestra un mensaje en laconsola logeado con exito.
    - **Redirección en caso de falla**: Redirecciona a /

### Obtención de Datos del Usuario

- **URL para inicio de sesión**: `/auth/user`
- **Método**: `GET`
- **Descripción**: Retorna los datos del usuario autenticado.
- **Respuesta Exitosa**: 
  ```json
    {
        "displayName": "Nombre del Usuario"
    }

  ```
- **Respuesta Fallida**: 
  ```json
    {
    "message": "No estás autenticado"
    }
  ```