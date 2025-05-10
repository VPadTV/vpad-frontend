import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface TierHeaderProps {
  title: string;
}

export default function TierHeader({ title }: TierHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      
      <Button 
        color="primary" 
        startContent={<FaPlus />}
        onClick={() => router.push('/tier/create')}
      >
        Create New Tier
      </Button>
    </div>
  );
}
