import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "@/components/youngbin/Layout/Header";
import Main from "@/components/youngbin/Layout/Main";
import ResultList from "@/components/yeonju/ResultList";
import ResultPage from "@/components/hwayeon/ResultPage";
import Hwayeon from "@/components/hwayeon/Hwayeon";

const App = () => {
  return (
    <Routes>
      <Route element={<Header></Header>}>
        <Route path="/" element={<Main></Main>} />
          <Route path="/yeonju" element={<ResultList></ResultList>} />
          <Route path="/code" element={<ResultPage></ResultPage>}>
            <Route path="/code/hwayeon" element={<Hwayeon></Hwayeon>} />
          </Route>
      </Route>
    </Routes>
  );
};
export default App;
