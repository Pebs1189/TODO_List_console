//primero importar los paquetes de terceros, luego las nuestras
require('colors');

// const {mostrarMenu, pausa} = require('./helpers/mensaje');
const {inquireMenu, inquirePausa, leerImput, listadoTareasBorrar, confirmar, mostradoCheckList} = require('./helpers/inquirer');
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
                tareas.listadoCompleto(); 
                //  listadoCompletoConPrompt();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostradoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== 0) {
                    const ok = await confirmar('¿Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente.'.green);
                    }
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await inquirePausa();

    } while (opt !== '0');
    
};

main();