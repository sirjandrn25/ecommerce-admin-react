import Card from "@Components/Card/card.component";
import Container from "@Components/Container/container.component";
import React from "react";
import useOrderDetail from "./Hooks/useOrderDetail.hook";
import useNavigation from "@Hooks/useNavigation.hook";

const OrderDetailModule = () => {
  const { id } = useNavigation();

  const { details, isLoading } = useOrderDetail(id);
  return (
    <Container>
      <div className="w-full gap-4 row-flex">
        <Card title="Order Information" className="w-3/4 ">
          Order Detail
        </Card>
        <Card title="Order Items" className="flex-1">
          Product Detail
        </Card>
      </div>
    </Container>
  );
};

export default OrderDetailModule;
