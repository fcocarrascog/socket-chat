var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
} else if (params.get('nombre').trim() === '' || params.get('sala').trim() === '') {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
} else {
    var usuario = {
        nombre: params.get('nombre'),
        sala: params.get('sala')
    };

    socket.on('connect', function() {
        console.log('Conectado al servidor');

        socket.emit('entrarChat', usuario, function(resp) {
            console.log('Usuarios conectados:', resp);
        });
    });

    socket.on('disconnect', function() {
        console.log('Se perdió la conexión al servidor');
    });

    // socket.emit('crearMensaje', {
    //     usuario: 'Francisco',
    //     mensaje: 'Hola mundo'
    // }, function(resp) {
    //     console.log('Respuesta servidor:', resp);
    // });

    socket.on('crearMensaje', function(mensaje) {
        console.log('Servidor:', mensaje);
    });

    /* ESCUCHAR CAMBIOS DE USUARIOS
       CUANDO UN USUARIO ENTRA O SALE DEL CHAT
    */
    socket.on('listaUsuarios', function(usuarios) {
        console.log(usuarios);
    })


    /* MENSAJES PRIVADOS */
    socket.on('mensajePrivado', function(mensaje) {
        console.log('Mensaje privado', mensaje);
    });
}