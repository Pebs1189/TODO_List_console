const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tarea'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            }
        ]
    }
];

const pulseEnter = [
    {
        type: 'input',
        name: 'ENTER',
        message: `Pulse ${'ENTER'.green} para seguir.`,
    }
];

const inquireMenu = async () => {
    console.clear();

    console.log('========================='.green);
    console.log('  Seleccione una opción  '.green);
    console.log('=========================\n'.green);

    const opt = await inquirer.prompt(preguntas);

    return opt;
}

const inquirePausa = async () => {
    console.log('\n');
    await inquirer.prompt(pulseEnter);
}

const leerImput = async (message) => {
    const question = [
        {
            type: 'input',
            name:'desc',
            message,
            validate( value ) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;
}

module.exports = {
    inquireMenu,
    inquirePausa,
    leerImput
}