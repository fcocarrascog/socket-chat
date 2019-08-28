class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    }


    obtenerPersona(id) {
        let persona = this.personas.filter(person => {
            return person.id === id
        })[0];

        return persona;
    }

    obtenerPersonas() {
        return this.personas;
    }

    obtenerPersonasPorSalas(sala) {
        // ......
        let usuariosEnSalas = this.personas.filter(per => per.sala === sala);
        return usuariosEnSalas;
    }

    eliminarPersona(id) {
        let personaBorrada = this.obtenerPersona(id);
        this.personas = this.personas.filter(person => {
            return person.id != id;
        });

        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}