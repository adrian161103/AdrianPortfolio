import { LavaLampMetaballs } from "../components/Presentation/LavaLampMetaballs";
    import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
 
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden">
<LavaLampMetaballs/>
      <div className="bg-black/90 shadow-lg rounded-2xl p-10 max-w-lg w-full text-center border border-white relative z-10">
        <h1 className="text-7xl font-extrabold mb-4 text-white">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4 text-white">
          Página no encontrada
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <button
          onClick={() => navigate(-1)}
        
          className=" cursor-pointer inline-block bg-white hover:bg-gray-200 text-black font-bold py-2 px-6 rounded-lg shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Volver Atrás
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;