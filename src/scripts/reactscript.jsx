import Header from './common/header.jsx';
import Footer from './common/footer.jsx';
import Main from './homeModule/main.jsx';


ReactDOM.render(
    (
        <div className="base-template">
            <Header/>
            <Main/>
            <Footer/>
        </div>
    ), 
    document.getElementById('content')
);