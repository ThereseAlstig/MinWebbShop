export class Porducts{
constructor(
    public id: string,
public object: string,
public name: string,
public description: string,
public default_price: {
    unit_amount: number,
    id: string
},
public images: string,
public quantity: number,



){}
}

    
