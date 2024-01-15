import { Button } from "@/components/ui/button";
import { deleteDream } from "@/lib/actions";
import React from "react";

interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  return <Button onClick={async () => await deleteDream(id)}>Delete</Button>;
};

export default DeleteButton;
