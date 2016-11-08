import { Dispatcher } from "../dispatcher";

export class GroceryItemActionCreator{

    static add(item: any) {
        Dispatcher.dispatch({
            payload: item,
            type: "grocery-item:add"
        });
    }

    static delete(item: any){
        Dispatcher.dispatch({
            payload: item,
            type: "grocery-item:delete"
        });
    }

    static buy(item: any) {
        Dispatcher.dispatch({
            payload: item,
            type: "grocery-item:buy"
        });
    }

    static unbuy(item: any) {
        Dispatcher.dispatch({
            payload: item,
            type: "grocery-item:unbuy"
        });

    }

}
