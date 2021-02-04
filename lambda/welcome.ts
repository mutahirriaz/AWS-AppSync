import { info } from "console"

type AppSyncEvent = {
    info: {
        fieldName: String
    },
    arguments: {
        product: Product
    }
}

type Product = {
    name: String,
    age: Number
}


exports.handler = async (event: AppSyncEvent) => {

    if(event.info.fieldName=="welcome"){
        return "Welcome from AppSync Lambda"
    }

    else if(event.info.fieldName=="hello"){
        return "Hello from AppSync Lambda"
    }

    else if(event.info.fieldName=="addProduct"){
        return "Product Data"+ event.arguments.product
    }

    else {
        return "Not Found"
    }

}