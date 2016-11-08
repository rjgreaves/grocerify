import * as React from "react";
import { GroceryItem } from "./GroceryItem";
import { GroceryAddItem } from "./GroceryAddItem";
//import * as style from "../styles/main.scss";

export class GroceryItemList extends React.Component<any, {}>{
    constructor(props: any){
        super(props);
    }
    render() {
        return (<div>
                <h1>Grocery Listify</h1>
                <div>
                    {this.props.items.map(function(item: any, index: any){
                        return(
                            <GroceryItem key={"item"+index} item={item} />
                        )
                    })}
                    <GroceryAddItem />
                </div>
            </div>
        );
    }
}
