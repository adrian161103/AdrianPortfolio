import Header from "../core/components/layout/header"

function Home() {
    const isDarkBg = true;
  return (
    <div className=" dark:bg-black min-h-screen">
        
        {/* Aquí puedes añadir más contenido o componentes */}
        <Header isDarkBg={isDarkBg} />

        
        </div>
  )
}

export default Home