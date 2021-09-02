import React, {useState} from 'react';
import './App.css';
import RedirectContainer from './redirectDemo/RedirectContainer'
import CrossTabContainer from './crossTab/CrossTabContainer'
import IFrameContainer from './iFrame/IFrameContainer'


const isRedirect = window.location.pathname.indexOf('/redirect') === 0

const selectedStyle = {borderBottom: '2px rgb(1, 174, 233) solid'}

function App() {
    const [currentTab, setCurrentTab] = useState(isRedirect ? 0 : 2)

    return (
        <div className="App">
            <header className="App-header">
                <div className='tab-container'>
                    <span onClick={()=>setCurrentTab(0)} className='tab' style={currentTab === 0 ? selectedStyle : {}}>Redirect</span>
                    <span onClick={()=>setCurrentTab(1)} className='tab' style={currentTab === 1 ? selectedStyle : {}}>Cross Tab</span>
                    <span onClick={()=>setCurrentTab(2)} className='tab' style={currentTab === 2 ? selectedStyle : {}}>IFrame</span>
                </div>
                {currentTab === 0 && <RedirectContainer/>}
                {currentTab === 1 && <CrossTabContainer/>}
                {currentTab === 2 && <IFrameContainer/>}
            </header>
        </div>
    );
}

export default App;
