import { fetchDreamsById } from "@/lib/data";
import DreamForm from "./DreamForm";

const EditDream = async ({ params }: { params: { id: string } }) => {
  const dream = await fetchDreamsById(params.id);

  console.log(dream);

  return <DreamForm dream={dream} />;
};

export default EditDream;
