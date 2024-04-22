import PasswordGenerator from "./components/PasswordGenerator";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <PasswordGenerator defaultLength={16} />
    </div>
  );
}

export default App;
