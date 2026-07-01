type Customer = {
  id: number;
  name: string;
  email: string;
  orderId: string;
  product: string;
  purchaseDate: string;
  status: string;
  price: number;
  refunded: boolean;
};

export function checkRefundEligibility(customer: Customer) {
  const purchaseDate = new Date(customer.purchaseDate);
  const today = new Date();

  const days =
    Math.floor(
      (today.getTime() - purchaseDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

  if (customer.status !== "Delivered") {
    return {
      approved: false,
      reason: "Order has not been delivered.",
    };
  }

  if (customer.refunded) {
    return {
      approved: false,
      reason: "Refund has already been processed.",
    };
  }

  if (days > 30) {
    return {
      approved: false,
      reason: `Purchase was ${days} days ago. Refund period is 30 days.`,
    };
  }

  return {
    approved: true,
    reason: `Purchase was ${days} days ago and is within the refund period.`,
  };
}