import { Img, PreloaderContainer } from "./common/styles/styles";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./components/not-found-page/NotFoundPage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { SignUp } from "./components/auth/registration/SignUp";
import { Login } from "./components/auth/login/Login";
import pulse from "./common/preloader/Pulse.gif";
import "./App.css";
import { HomePage } from "./components/home/HomePage";
import { Header } from "./components/header/Header";

function App() {
  const isLoading: boolean = useSelector(
    (state: RootState) => state.preloader.isLoading
  );

  return (
    <div>
      {isLoading && (
        <PreloaderContainer>
          <Img src={pulse} alt="Loading..." />
        </PreloaderContainer>
      )}
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/sign-in" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
export default App;
