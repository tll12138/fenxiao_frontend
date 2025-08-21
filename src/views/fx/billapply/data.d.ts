export  interface BillGoods {
  id: number,
  vareName: string,
  wareSpec: string,
  wareUnit?: number,
  num:number,
  amount: string,
  price:number,
  priceAmount?: number,
  returnCount?: number,
  returnPrice?: number,
  returnAmount?: number,
  saleOrderId?: number
}
