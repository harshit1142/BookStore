import { Provider } from "react-redux";
import Main from "./Screens/Main";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayFav from "./Components/DisplayFav";

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Favorite" element={<DisplayFav />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
