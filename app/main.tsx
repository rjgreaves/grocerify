import * as React from "react";
import * as ReactDOM  from "react-dom";
import { GroceryItemList } from "./components/GroceryItemList";
import { GroceryItemStore } from "./stores/GroceryItemStore";

console.log("Hello from TSX!");

let groceryItemStore = new GroceryItemStore();

let initial = groceryItemStore.getItems();

function render() {
    ReactDOM.render(
        <GroceryItemList items={initial} />
        , document.getElementById("app")
    );
}

console.log("Add onchange listener");
groceryItemStore.onChange((items: any) => {
    initial = items;
    render();
});

render();