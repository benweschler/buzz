import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';


function Layout (props) {
    return (
        <>
            <Header />
            <div>
                {/* <Navigation /> */}
                <main>{props.children}</main>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
