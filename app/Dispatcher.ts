import * as uuid from 'node-uuid';

export class Dispatcher {

    static listeners: any = {};

    static register (cb: Function){
        var id = uuid.v1();
        this.listeners[id] = cb;
        return id;
    }

    static dispatch (payload: any){
        console.info("Dispatching....", payload);
        for(var id in this.listeners){
            console.log(`Telling listener..${id}`)
            let listener = this.listeners[id];
            listener(payload);
        }
    }
}