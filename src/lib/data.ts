interface OptionsType {
  id: string;
  nome: string;
}

const materia = {
  Biologia: "Biologia",
  Portuguese: "Português",
  Fisica: "Física",
  Quimica: "Química",
  Matematica: "Matemática",
  Art: "Artes",
  Historia: "História",
  Geografia: "Geografia",
};

let idMateria: number = 0;
const materiaOptions: OptionsType[] = [];

for (let key in materia) {
  if (materia.hasOwnProperty(key)) {
    idMateria++;
    materiaOptions.push({
      id: idMateria.toString(),
      nome: materia[key as keyof typeof materia],
    });
  }
}

const levelsOptions: OptionsType[] = [
  {
    id: "1",
    nome: "1",
  },
  {
    id: "2",
    nome: "2",
  },
  {
    id: "3",
    nome: "3",
  },
];

export function getBGColorByMateria(subject: string): string {
  if (subject === materia.Biologia) return "#FD746C";
  if (subject === materia.Fisica) return "#FC67FA";
  if (subject === materia.Portuguese) return "#0083FE";
  return "#4A92FF";
}

export function getBGLinearGradientByMateria(subject: string): string {
  if (subject === materia.Matematica)
    return "bg-gradient-to-r from-amber-500 to-rose-300";
  if (subject === materia.Biologia)
    return "bg-gradient-to-r from-[#FD746C] via-[#FE846A] to-[#FF9068]";
  if (subject === materia.Fisica)
    return "bg-gradient-to-r from-[#FC67FA] to-[#F4C4F3]";
  if (subject === materia.Portuguese)
    return "bg-gradient-to-r from-[#0C79DF] to-[#97BEFA]";
  if (subject === materia.Art)
    return "bg-gradient-to-r from-[#FF9068] via-[#EE9CA7] to-[#FFDDE1]";
  if (subject === materia.Quimica)
    return "bg-gradient-to-r from-[#32C665] to-[#73E49A]";
  if (subject === materia.Historia)
    return "bg-gradient-to-r from-[#A95CEC] to-[#DA22FF]";
  if (subject === materia.Geografia)
    return "bg-gradient-to-r from-[#4CB8C4] to-[#3CD3AD]";
  return "bg-indigo-500";
}

import MathImg from "../assets/mathHero.png";
import ArtImg from "../assets/artHero.png";
import BioImg from "../assets/bioHero.png";
import FisicaImg from "../assets/fisicaHero.png";
import HistoriaImg from "../assets/historiaHero.png";
import PortuguesImg from "../assets/portuguesHero.png";

export function materiaImages(subject: string): string {
  if (subject === materia.Matematica) return MathImg; //Ok
  if (subject === materia.Biologia) return BioImg; // Ok
  if (subject === materia.Fisica) return FisicaImg; // Ok
  if (subject === materia.Portuguese) return PortuguesImg; // Ok
  if (subject === materia.Art) return ArtImg; // OK
  if (subject === materia.Quimica)
    return "https://cdn3d.iconscout.com/3d/premium/thumb/sketchbook-3981409-3297347.png"; // Ok
  if (subject === materia.Historia) return HistoriaImg; // Ok
  if (subject === materia.Geografia)
    return "https://cdn3d.iconscout.com/3d/premium/thumb/sketchbook-3981409-3297347.png";
  return "https://i.postimg.cc/mD5Nftx0/Book.png"; // Ok
}

export { materiaOptions, levelsOptions };
