//primero importar los paquetes de terceros, luego las nuestras
require('colors');

// const {mostrarMenu, pausa} = require('./helpers/mensaje');
const {inquireMenu, inquirePausa, leerImput} = require('./helpers/inquirer');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');

const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquireMenu();

        switch (opt) {
            case '1':
                const desc = await leerImput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas.listadoArr);
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await inquirePausa();

    } while (opt !== '0');
    
};

main();