import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import pulse from "./common/preloader/Pulse.gif";
import { Img, PreloaderContainer } from "./common/styles/styles";
import { Login } from "./components/auth/login/Login";
import { SignUp } from "./components/auth/registration/SignUp";
import { Header } from "./components/header/Header";
import { HomePage } from "./components/home/HomePage";
import { NotFoundPage } from "./components/not-found-page/NotFoundPage";
import { RootState } from "./redux/store";

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