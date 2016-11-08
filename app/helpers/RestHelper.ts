import * as $ from "jquery";
import * as Promise from "bluebird";

export class RestHelper{

    static get(url: string): Promise<any>{
        return Promise.resolve(
            $.ajax({
                url: url,
                dataType: "json",
            })
        );
    }

    static post(url: string, data: string): Promise<any>{
        return Promise.resolve(
                $.ajax({
                    method: "post",
                    data: data,
                    url: url,
                    dataType: "json"
                })
        );
    }
}