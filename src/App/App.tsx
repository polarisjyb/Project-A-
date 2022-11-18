import { Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "@/components/youngbin/Layout/Header";
import Main from "@/components/youngbin/Layout/Main";
import ResultList from "@/components/yeonju/ResultList";

const App = () => {
  return (
    <Routes>
      <Route element={<Header></Header>}>
        <Route path="/" element={<Main></Main>} />
        <Route path="/Header" element={<Header></Header>} />
        <Route path="/yeonju" element={<ResultList></ResultList>} />
      </Route>
    </Routes>
  );
};
export default App;
