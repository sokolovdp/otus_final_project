import React from 'react';
import './App.css';

import MainHeader from './components/main_header'
import PageTitle from './components/page_title'
import PageContent from './components/page_content'


function App() {
    return (
        <div className="App">
            <MainHeader/>
            <PageTitle/>
            <PageContent/>
        </div>
    );
}

export default App;
