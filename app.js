//primero importar los paquetes de terceros, luego las nuestras
require('colors');

// const {mostrarMenu, pausa} = require('./helpers/mensaje');
const {inquireMenu, inquirePausa, leerImput} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    let opt = '';

    const tareas = new Tareas();

    do {
        opt = await inquireMenu();

        switch (opt.opcion) {
            case '1':
                const desc = await leerImput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas._listado)
            default:
                break;
        }

        if (opt.opcion !== '0') await inquirePausa();

    } while (opt.opcion !== '0');
    
};

main();