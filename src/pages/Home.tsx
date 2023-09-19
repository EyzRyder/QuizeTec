import { Link } from 'react-router-dom';
import { useUserStore } from '../lib/store';
import PhoneGirl from "../assets/PhoneGirl.png";

const Home: React.FC = () => {
  const { isUserAuthenticated } = useUserStore()

  return (
    <div className="flex flex-col flex-1 items-center px-5 py-0 justify-around overflow-y-scroll">
      <div className="flex justify-center items-center pr-14">
        <img
          src={PhoneGirl}
          alt='phonegirl'
          width={600}
          height={700}
        />
      </div>
      <div className="flex flex-col items-center w-full gap-3 pb-40">
        <p className="text-center font-title text-[25px] leading-tight font-semibold text-[#2A416F] py-4">
          Hora de começar a se {"\n"} aventurar no aprendizado!
        </p>
        <Link
          to={isUserAuthenticated ? "/base" : "/login"}
          className="w-full items-center flex justify-center rounded-[20px] bg-[#4A92FF] py-4 text-white font-medium text-lg">
          Começar
        </Link>
        <Link
          to="/sobre"
          className="w-full flex items-center justify-center rounded-lg py-2 text-[#2A416F] text-lg"
        >
          Sobre Nós
        </Link>
      </div>
    </div>
  );
};

export default Home;
