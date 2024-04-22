import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <div className="App">
      <PasswordGenerator defaultLength={16} />
    </div>
  );
}

export default App;
