import { Provider } from "react-redux";
import Main from "./Screens/Main";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayFav from "./Components/DisplayFav";
import BackToTop from "./Components/BackToTop";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          {/* Your existing app content */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Favorite" element={<DisplayFav />} />
          </Routes>
          <BackToTop /> {/* Add the BackToTop component here */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
