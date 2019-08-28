const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala  es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaUsuarios', usuarios.obtenerPersonasPorSalas(data.sala));

        callback(usuarios.obtenerPersonasPorSalas(data.sala));
    });

    client.on('crearMensaje', (data) => {

        let usuario = usuarios.obtenerPersona(client.id);
        let mensaje = crearMensaje(usuario.nombre, data.mensaje);

        client.broadcast.to(usuario.sala).emit('crearMensaje', mensaje);
    })


    client.on('disconnect', () => {
        let usuarioEliminado = usuarios.eliminarPersona(client.id);
        client.broadcast.to(usuarioEliminado.sala).emit('crearMensaje', crearMensaje('Administrador', `${usuarioEliminado.nombre} dejó la conversación.`));
        client.broadcast.to(usuarioEliminado.sala).emit('listaUsuarios', usuarios.obtenerPersonasPorSalas(usuarioEliminado.sala));
    });


    /* MENSAJES PRIVADOS */
    client.on('mensajePrivado', data => {
        let usuario = usuarios.obtenerPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(usuario.nombre, data.mensaje));
    });
});