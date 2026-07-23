export interface CreateRoom{
    title:string;
    price:number;
    capacity:number;

}
export interface UpdateRoom{
    title?:string;
    price?:number;
    capacity?:number;

}
export interface QueryRoom{
    page?:number;
    limit?:number;
    sortBy?:string;
    order?:"asc"|"desc";
    search?:string;
}