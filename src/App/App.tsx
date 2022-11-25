import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "@/components/youngbin/Layout/Header";
import Main from "@/components/youngbin/Layout/Main";
import ResultPage from "@/components/hwayeon/ResultPage";
import Hwayeon from "@/components/Strategy/Hwayeon";
import MainStrategy from "@/components/Strategy/MainStrategy";
import Yeonju from "@/components/Strategy/Yeonju";
import Youngbin from "@/components/Strategy/Youngbin";
import Minho from "@/components/Strategy/Minho";

const App = () => {
  return (
    <Routes>
      <Route element={<Header></Header>}>
        <Route path="/" element={<Main></Main>} />
        <Route path="/code/:key" element={<ResultPage />}>
          <Route path="/code/:key/" element={<MainStrategy></MainStrategy>} />
          <Route path="/code/:key/yeongbin" element={<Youngbin></Youngbin>} />
          <Route path="/code/:key/yeonju" element={<Yeonju></Yeonju>} />
          <Route path="/code/:key/minho" element={<Minho></Minho>} />
          <Route path="/code/:key/hwayeon" element={<Hwayeon></Hwayeon>} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
