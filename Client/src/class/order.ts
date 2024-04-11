
export class OrderProducts{
    constructor(
    public orderNumber: string,
    public date: string,
    public total: string,
    
    public products: {
        amount_total: number,
        quantity: string,
        description: string
    }
   
    ){}
    }