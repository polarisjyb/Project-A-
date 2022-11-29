import { createContext, useContext, useMemo, useState } from "react";

const CategoriesContext = createContext();

function Categories({ children, activeId, onSelect }) {
  const value = useMemo(
    () => ({
      activeId,
      onSelect
    }),
    [activeId, onSelect]
  );
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

// useContext 실행하는 커스텀 Hook
function useCategories() {
  const value = useContext(CategoriesContext);
  if (value === undefined) {
    throw new Error('Category component should be used within Categories');
  }
  return value;
}

function Category({ children, id }) {
  const activeStyle = {
    backgroundColor: '#333',
    color: '#fff'
  };
  const style = {
    cursor: 'ponter',
    fontfamily: 'GmarketSansMedium',
    fontSize: '1.125rem',
    textDecoration: 'none',
    color: '#333'
  };
  const { activeId, onSelect } = useCategories();
  const active = activeId === id;
  const onClick = () => onSelect(id);
  return (
    <div  
      style={active ? { ...style, ...activeStyle } : style }
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function ResultCategories() {
  const [activeId, setActiveId] = useState(1);

  return (
    <div>
      <Categories activeId={activeId} onSelect={setActiveId}>
        <Category id={1}>종합결과</Category>
        <Category id={2}>전략별</Category>
        <Category id={3}>전략별</Category>
        <Category id={4}>전략별</Category>
        <Category id={5}>전략별</Category>
      </Categories>
    </div>
  );
}

export default ResultCategories;