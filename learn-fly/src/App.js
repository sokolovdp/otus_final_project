import React from 'react';
import './App.css';

import MainHeader from './components/main_header'
import PageTitle from './components/page_title'
import PageContent from './components/page_content'

let color = 'secondary';
let text = 'Main page';

function App() {
    return (
        <div className="App">
            <MainHeader/>
            <PageTitle color={color} text={text}/>
            <PageContent/>
        </div>
    );
}

export default App;
