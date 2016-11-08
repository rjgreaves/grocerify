import { Dispatcher } from "../dispatcher";
import { RestHelper } from "../helpers/RestHelper";

export class GroceryItemStore {

    constructor() {
        Dispatcher.register((event: any) => {
            let split = event.type.split(":");
            if (split[0] === "grocery-item") {
                switch (split[1]) {
                    case "add":
                        this.addGroceryItem(event.payload);
                        break;
                    case "delete":
                        this.deleteGroceryItem(event.payload);
                        break;
                    case "buy":
                        this.buy(event.payload);
                        break;
                    case "unbuy":
                        this.unbuy(event.payload);
                        break;
                }
            }
        });
        console.log("Calling get items...");
        RestHelper.get("api/items")
            .then((response: any) => {
                console.log("Returned items...");
                this.items = response;
                this.triggerListeners();
            })
            .catch((err) => {
                console.log(err);
            });

    }

    items: Array<any>;

    listeners: Array<any> = [];

    addGroceryItem(item: any) {
        this.items.push(item);
        RestHelper.post("api/items", item)
            .then((response: any) => {
                console.log("Post successfull, triggering listeners...")
                this.triggerListeners();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteGroceryItem(item: any) {
        let listItem = this.items.filter(
            (i: any) => {
                return i.name === item.name;
            }
        )[0];
        let index = this.items.indexOf(listItem);
        if(index >= 0){
            this.items.splice(index, 1);
        }
        this.triggerListeners()
    }

    buy(item: any) {
        let itemToUpdate = this.getItem(item);
        if(itemToUpdate != null){
            itemToUpdate.purchased = true;
            this.triggerListeners();
        }
    }

    unbuy(item: any) {
        let itemToUpdate = this.getItem(item);
        if(itemToUpdate != null){
            itemToUpdate.purchased = false;
            this.triggerListeners();
        }
    }

    getItems() {
        return this.items;
    }

    onChange(listener: any) {
        console.log("Adding Listener");
        this.listeners.push(listener);
    }

    triggerListeners() {
        this.listeners.forEach((listener) => {
            listener(this.items);
        });
    }

    private getItem(itemToFind: any): any{
        return this.items.filter(
            (i: any) => {
                return i.name === itemToFind.name;
            }
        )[0];
    }
}