import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Unlimited from "./Unlimited";
import { GeneralProvider } from "./context/GeneralContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <GeneralProvider>
      <Router>
        <AuthProvider>
          <Unlimited />
        </AuthProvider>
      </Router>
    </GeneralProvider>
  );
}

export default App;
