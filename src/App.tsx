import React, {useState} from 'react';
import './App.css';
import RedirectContainer from './redirectDemo/RedirectContainer'
import CrossTabContainer from './crossTab/CrossTabContainer'

const selectedStyle = {borderBottom: '2px rgb(1, 174, 233) solid'}

function App() {

    const [currentTab, setCurrentTab] = useState(window.location.pathname.indexOf('/redirect') === 0 ? 0 : 1)

    return (
        <div className="App">
            <header className="App-header">
                <div className='tab-container'>
                    <span onClick={()=>setCurrentTab(0)} className='tab' style={currentTab === 0 ? selectedStyle : {}}>Redirect</span>
                    <span onClick={()=>setCurrentTab(1)} className='tab' style={currentTab === 1 ? selectedStyle : {}}>Cross tab</span>
                </div>
                {currentTab === 0 && <RedirectContainer/>}
                {currentTab === 1 && <CrossTabContainer/>}
            </header>
        </div>
    );
}

export default App;
