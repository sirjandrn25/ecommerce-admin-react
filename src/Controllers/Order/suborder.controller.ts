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
  static statusChange(id: number) {
    return `sub-orders/${id}/status`;
  }
  static paymentStatusChange(id: number) {
    return `sub-orders/${id}/payment_status`;
  }
}
