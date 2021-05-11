const Tarea = require('./tarea');
const inquirer = require('inquirer');

const colors = require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray ( tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea; 
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        const listaDeTareas = [
            {
                type: 'list',
                name: 'lista de tareas',
                message: 'Lista de tarea(s):',
                choices: []
            }
        ]

        const listado = this.listadoArr;

        for (let i = 1; i <= listado.length; i++) {
            if (listado[i-1].completadoEn) {
                listaDeTareas[0].choices.push(
                    {
                        value:`${i}`,
                        name: `${colors.green(i)} ${listado[i-1].desc} :: ${'Completado'.green}`
                    }
                )
            } else {
                listaDeTareas[0].choices.push(
                    {
                        value:`${i}`,
                        name: `${colors.red(i)} ${listado[i-1].desc} :: ${'Pendiente'.red}`
                    }
                )
            }
        }

        inquirer.prompt(listaDeTareas);
    }
}

module.exports = Tareas;