# Quizetec
![img](./.github/Banner.png)
Quizetec é uma plataforma online que permite aos professores criar quizzes interativos e personalizados para avaliar o aprendizado dos seus alunos.
Quizetec também é uma ferramenta divertida e eficaz para os alunos que querem revisar os conteúdos estudados.
Quizetec é uma plataforma gratuita e fácil de usar, que se adapta a qualquer dispositivo e sistema operacional. Para começar a usar, basta se cadastrar com seu e-mail. Experimente hoje mesmo e descubra como ele pode transformar sua experiência de ensino e aprendizagem.

## Tecnologias
- Typescript: Linguagem
- React: Biblioteca de Javascript
- Ionic: FrameWork de Javascript
- Tailwindcss: FrameWork de CSS
- Framer Motion: Biblioteca de Animações
- Shadcn: Coleção de componentes
- Firebase: Banco de Dados NoSql
- Zustand: Biblioteca de gerenciamento de estado para React
- Zod: Biblioteca de declaração e validação de esquemas TypeScript

Inicialmente usamos React Native mas fizemos a troca para Ionic React porque o Native não era tão compativel com Firebase.
Usamos o Typescript e Zod ajudava melhorar a qualidade do código, facilitar a detecção de erros, aumentar a produtividade e a legibilidade do código, e oferecer suporte a ferramentas de edição e depuração. Typescript também permite usar recursos mais modernos do Javascript, como classes, módulos e decoradores.
Para estilização usamos Tailwindcss , Shadcn e o Framer Motionpor garantir melhor controle, facilidade, velocidade e customizável.

## Pré-requisitos

Antes de iniciar, certifique-se de que você tenha o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
Use o gerenciador de pacotes da sua preferencia, mas para ter o mesmo resultados que da gente use [npm](https://www.npmjs.com)

## Instalação
1. Clone este repositório em sua máquina local:
```bash
  git clone https://github.com/EyzRyder/Quizetec.git
```
2. Navegue até o diretório do projeto:
```bash
cd Quizetec
```
3. Execute o seguinte comando para instalar as dependências:
```bash
npm i
```
4. Execute o codigo:

```bash
npm run dev
```

## Configuração
1. Crie um arquivo `.env` na raiz do projeto.

2. Abra o arquivo `.env` com um editor de texto e adicione as seguintes variáveis de ambiente:
```
VITE_FIREBASE_apiKey=""
VITE_FIREBASE_authDomain=""
VITE_FIREBASE_projectId=""
VITE_FIREBASE_storageBucket=""
VITE_FIREBASE_messagingSenderId=""
VITE_FIREBASE_appId=""
```
## Planos de Atualizações

- Escolher entre diferentes tipos de perguntas, como múltipla escolha, verdadeiro ou falso, resposta curta, etc.
- Adicionar imagens, vídeos, áudios e links para enriquecer os quizzes
- Definir o tempo limite, o número de tentativas e o feedback para cada questão
- Acompanhar o desempenho dos alunos em tempo real, com gráficos e relatórios detalhados
- Exportar os resultados para planilhas ou outros formatos
- Compartilhar os quizzes com outros professores ou alunos por e-mail, redes sociais ou QR code

## Autores
<a href="https://github.com/EyzRyder">
<img src="https://avatars.githubusercontent.com/u/85580011?v=4" alt="Gabriel" width="90" height="90"/>
</a>


<a href="https://github.com/Kc1t">
<img src="https://avatars.githubusercontent.com/u/98243777?v=4" alt="Kaua" width="90" height="90"/>
</a>

