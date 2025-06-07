import Header from './core/components/layout/header';

function App() {

 const isDarkBg = true;
  return (
    <>
<Header isDarkBg={isDarkBg} />    
  <main className="pt-16 bg-black flex flex-col items-center justify-start min-h-screen ">
        {/* Aquí va tu contenido principal */}
        {/* ...más contenido... */}
      </main>
    </>
  )
}

export default App
