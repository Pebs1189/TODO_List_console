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
        let listaCompleta = '\n';

        this.listadoArr.forEach((tarea, i) => {
            const {desc, completadoEn} = tarea;
            let estado = '';
            let inc = '';

            if (completadoEn) {
                estado = `${'Completado'.green}`;
                inc += `${colors.green(++i)}`;
            } else {
                estado = `${'Pendiente'.red}`;
                inc += `${colors.red(++i)}`;
            }

            listaCompleta += `${inc} ${desc} :: ${estado} \n`;
        });

        console.log(listaCompleta);
    }

    listarPendientesCompletadas ( completadas = true ) {
        let listaPendiente = '\n';
        let inc = '';
        let i = 1;

        this.listadoArr.forEach(tarea => {
            const {desc, completadoEn} = tarea;
            let estado = '';
            
            if (completadoEn && completadas) {
                estado = `${'Completado'.green}`;
                inc = `${colors.green(i++)}${'.'.green}`;
                listaPendiente += `${inc} ${desc} :: ${estado} \n`;
            } else if (!completadoEn && !completadas) {
                estado = `${'Pendiente'.red}`;
                inc = `${colors.red(i++)}${'.'.red}`;
                listaPendiente += `${inc} ${desc} :: ${estado} \n`;
            }            
        });

        console.log(listaPendiente);
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    // listadoCompletoConPrompt() {
    //     const listaDeTareas = [
    //         {
    //             type: 'list',
    //             name: 'lista de tareas',
    //             message: 'Lista de tarea(s):',
    //             choices
    //         }
    //     ]

    //     const listado = this.listadoArr;

    //     for (let i = 1; i <= listado.length; i++) {
    //         if (listado[i-1].completadoEn) {
    //             listaDeTareas[0].choices.push(
    //                 {
    //                     value:`${i}`,
    //                     name: `${colors.green(i)} ${listado[i-1].desc} :: ${'Completado'.green}`
    //                 }
    //             )
    //         } else {
    //             listaDeTareas[0].choices.push(
    //                 {
    //                     value:`${i}`,
    //                     name: `${colors.red(i)} ${listado[i-1].desc} :: ${'Pendiente'.red}`
    //                 }
    //             )
    //         }
    //     }

    //     const id = inquirer.prompt(listaDeTareas);
    //     return id;
    // }
}

module.exports = Tareas;