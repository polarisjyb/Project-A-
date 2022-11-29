import { Route, Routes } from "react-router-dom";
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

        <Route path="/code" element={<ResultPage></ResultPage>}>
          <Route path="/code/yeongbin" element={<Hwayeon></Hwayeon>} />
          <Route path="/code/yeonju" element={<Hwayeon></Hwayeon>} />
          <Route path="/code/minho" element={<Hwayeon></Hwayeon>} />
          <Route path="/code/hwayeon" element={<Hwayeon></Hwayeon>} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
