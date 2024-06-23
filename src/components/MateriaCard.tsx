import { materiaImages } from "@/lib/data";

export default function MateriaCard({ name }: { name: string }) {
  return (
    <div className="bg-slate-50 px-6 pt-2.5 pb-6 flex flex-col justify-center items-center  rounded-3xl">
      <img
        src={materiaImages(name)}
        alt={"Materia - " + name}
        className="sm:w-[128px] sm:h-[128px] w-[115px] h-[115px] "
        loading="lazy"
      />
      <span className="w-full font-extrabold text-blue-800">{name}</span>
    </div>
  );
}
