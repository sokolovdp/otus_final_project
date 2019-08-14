import React from 'react';

import MainHeader from './components/main_header'
import PageTitle from './components/page_title'
import PageContent from './components/page_content'


function Main() {
    return (
        <div className="Main">
            <MainHeader/>
            <PageTitle
                color='secondary'
                text='Main page'
            />
            <PageContent/>
        </div>
    );
}

export default Main;
