import './App.css';
import Row from './components/Row';
import categories from './api';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      
       <Nav/>
       <Banner/>
       {categories.map((category) => {
          return(
          <Row 
            key={category.name} 
            title={category.title} 
            path={category.path}
            isLarge={category.isLarge}
          />
        ); 
       })}
       <Footer></Footer>
    </div>
  );
}

export default App;
