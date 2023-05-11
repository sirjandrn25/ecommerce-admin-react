export class SubOrderController {
  static list() {
    const api = `sub-orders`;

    return api;
  }
  static retrieve(id: number) {
    return `sub-orders/${id}`;
  }
  static orderItems(id: number) {
    return `sub-orders/${id}/items`;
  }
}
