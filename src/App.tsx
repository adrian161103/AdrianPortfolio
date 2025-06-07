import { BrowserRouter as Router  } from "react-router-dom";
import AppRoutes from "./route/Index";
import AnimatedCursor from "./components/AnimatedCursor";

function App() {

 
  return (
    <Router>
      <AnimatedCursor />
        <AppRoutes />
    </Router>
  )
}

export default App
