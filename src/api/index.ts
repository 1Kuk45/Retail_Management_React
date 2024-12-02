import * as stock from "./stock";
// import * as order from "./order";

class API {
  stock: typeof stock;
  // order: typeof order;

  constructor() {
    this.stock = stock;
    // this.order= order;
  }
}

const api = new API();
export default api;
