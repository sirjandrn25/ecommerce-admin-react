import { SubOrderController } from "./Order/suborder.controller";
import ProductController from "./Product/product.controller";

const routers: any = {
  sub_orders: SubOrderController,
  products: ProductController,
};

export default routers;
