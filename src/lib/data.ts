interface OptionsType {
  id: string
  nome: string
}

const materia = {
  Biologia: "Biologia",
  Portuguese: 'Portuguese',
  Fisica: 'Física',
  Quimica: 'Química',
  Matematica: 'Matemática',
  Art: 'Art',
  Historia: 'Historia',
  Geografia: 'Geografia'
}

let idMateria: number = 0;
const materiaOptions: OptionsType[] = [];

for (let key in materia) {
  if (materia.hasOwnProperty(key)) {
    idMateria++;
    materiaOptions.push({
      id: idMateria.toString(),
      nome: materia[key as keyof typeof materia]
    });
  }
}

const levelsOptions: OptionsType[] = [
  {
    id: '1',
    nome: "1"
  },
  {
    id: '2',
    nome: "2"
  },
  {
    id: '3',
    nome: "3"
  },
]

export function getBGColorByMateria(subject: string): string {
  if (subject === materia.Biologia) return '#FD746C';
  if (subject === materia.Fisica) return '#FC67FA';
  if (subject === materia.Portuguese) return '#0083FE';
  return '#4A92FF';
}
export function getBGLinearGradientByMateria(subject: string): string[] {
  if (subject === materia.Biologia) return ['#FD746C', '#FE846A', '#FF9068'];
  if (subject === materia.Fisica) return ['#FC67FA', '#F4C4F3'];
  if (subject === materia.Portuguese) return ['#0083FE', '#00FFF0'];
  if (subject === materia.Art) return ['#A95CEC', '#DA22FF']
  return ['#0083FE', '#00FFF0'];
}

export { materiaOptions, levelsOptions };