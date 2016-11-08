import * as React from "react";
require('../styles/main.scss');
require('../styles/grocery-item.scss');

import { GroceryItemActionCreator } from "../actions/GroceryItemActionCreator";

export class GroceryAddItem extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.handleInputName = this.handleInputName.bind(this);
        this.addItem = this.addItem.bind(this);
        this.state = { input: "" }
    }
    handleInputName(e: any) {
        this.setState({input : e.target.value});
    }
    addItem(e: any){
        e.preventDefault();
        GroceryItemActionCreator.add({
            name: this.state.input
        });
        this.setState({
            input: ""
        });
    }
    render() {
        return (
            <div className="grocery-addItem">
                <form onSubmit={this.addItem}>
                    <input type="text" value={this.state.input} onChange={this.handleInputName} />
                    <button>Add Item</button>
                </form>
            </div>
        );
    }
}