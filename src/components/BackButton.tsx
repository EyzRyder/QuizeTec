import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      className="absolute left-10 top-3 h-12 w-12"
      variant="outline"
    >
      <ChevronLeft className="text-blue-600 " />
    </Button>
  );
}
