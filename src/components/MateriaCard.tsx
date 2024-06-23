import { materiaImages } from "@/lib/data";
import { useQuizStore } from "@/lib/store";
import { useParams } from "react-router";

<<<<<<< HEAD
export default function MateriaCard({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  const { materia } = useParams();

  const { quizes } = useQuizStore();
  const quizMateria = quizes.filter((quiz) => quiz.materia == materia);
=======
export default function MateriaCard({ name }: { name: string }) {
>>>>>>> 431af27 (style: fix resposivity)
  return (
    <div className="bg-slate-50 px-6 pt-2.5 pb-6 flex flex-col justify-center items-center rounded-3xl min-h-[9rem] h-[10rem] max-h-[10rem] w-full border border-white/0 hover:border-[#3B82F6] transition-all ease-in-out duration-300 relative">
      <img
        src={materiaImages(name)}
        alt={"Materia - " + name}
        className="sm:w-[128px] sm:h-[128px] w-[115px] h-[115px] "
        loading="lazy"
      />
      {/* <p className="text-blue-400 font-body font-semibold text-base">
        {quizMateria.length} Questões
      </p> */}
      <span className="w-full font-extrabold text-blue-800 text-center">
        {name}
      </span>
    </div>
  );
}
