
/**
 * _listado
 *      { 'uuid-1212121-112121-2': { id:12, desc: qwerty, completadoEn: 112233 } },
 */
require('colors');
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    } 

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    creaTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const { desc, completadoEn } = tarea;
            console.log(`${(i+1).toString().green}. ${desc} :: ${(completadoEn)?'Completada'.green:'Pendiente'.red}`);
        });
    }

    listarPendientesCompletadas( completadas = true ){
        console.log();
        let cont = 0;
        this.listadoArr.forEach( (tarea) => {
            const { desc, completadoEn } = tarea;
            if(completadoEn && completadas) {
                cont++;
                console.log(`${cont.toString().green}. ${desc} :: ${completadoEn.green}`);
            }
            if(!completadoEn && !completadas){
                cont++;
                console.log(`${cont.toString().green}. ${desc} :: ${'Pendiente'.red}`);
            }
        });
    }

    toggleCompletadas ( ids = [] ){
        this.listadoArr.forEach( tarea => this._listado[tarea.id].completadoEn = null);
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
    }

}

module.exports = Tareas;