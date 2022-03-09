const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require ('colors');


console.clear();

const main = async () => {
    console.log('Hola mundo!');

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch(opt){
            case '1': // Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.creaTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== 0 && await confirmar('¿Desea realmente eliminar esa tarea?')){
                    tareas.borrarTarea(id);
                    console.log('Tarea eliminada correctamente');
                } 
            break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while ( opt !== '0' );

}

main();