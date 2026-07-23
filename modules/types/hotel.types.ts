export interface CreateHotelDto{
    name:string;
    address:string;
    description?:string
}
export interface UpdateHotelDto{
    name?:string;
    address?:string;
    description?:string
}


export interface HotelQuery{
    page?:number;
    limit?:number;
    sortBy?:string;
    order?:"asc"|"desc";
    search?:string
}