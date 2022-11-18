import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "@/components/youngbin/Header";
import Main from "@/components/youngbin/Main";
import Header2 from "@/components/youngbin/Header2";
import ResultListfrom "@/components/yeonju/ResultList";

const App = () => {
  return (
    <>
      <Reset />
      <Routes>
        <Route element={<Header2></Header2>}>
          <Route path="/" element={<Main></Main>} />
          <Route path="/Header" element={<Header></Header>} />
          <Route path="/yeonju" element={<ResultList></ResultList>} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
