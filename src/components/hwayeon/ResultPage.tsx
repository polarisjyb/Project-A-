import { useParams } from 'react-router-dom';
import Categories from './Categories';
import ResultList from './ResultList';

const ReusultPage = () => {
  const params = useParams();
  const category = params.category || 'all';

  return(
    <>
      <Categories />
      <ResultList category={category}/>
    </>
  )
}

export default ReusultPage;