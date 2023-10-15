import logo from "./logo.svg";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifcations from "./components/Notifcations";

function App() {
  return (
    <div className="App">
      Video Chat APP
      {/* Video Player */}
      <VideoPlayer />
      {/* Options */}
      <Options>
        <Notifcations />
      </Options>
    </div>
  );
}

export default App;
