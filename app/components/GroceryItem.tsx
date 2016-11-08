import * as React from "react";
import { GroceryItemActionCreator } from "../actions/GroceryItemActionCreator";
//import * as style from "./styles/grocery-item.scss";

export class GroceryItem extends React.Component<any, {}>{
    delete = (e: any) => {
        e.preventDefault();
        GroceryItemActionCreator.delete(this.props.item);
    }
    togglePurchased = (e:any) => {
        e.preventDefault();
        switch(this.props.item.purchased){
            case true:
                GroceryItemActionCreator.unbuy(this.props.item);
                break;
            default:
                GroceryItemActionCreator.buy(this.props.item);
                break;
        }
    }
    render(){
        return (
            <div className="grocery-item row">
                <div className="six columns">
                    <h4 className={this.props.item.purchased ? "strikethrough" : ""}>
                        {this.props.item.name}
                    </h4>
                </div>
                <form className="three columns" onSubmit={this.togglePurchased}>
                 <button className={this.props.item.purchased ? "" : "button-primary"}>
                    {this.props.item.purchased ? "Unbuy" : "Buy" }
                 </button>
                </form>
                <form className="three columns" onSubmit={this.delete}>
                    <button>&times;</button>
                </form>
            </div>
        )
    }
} 