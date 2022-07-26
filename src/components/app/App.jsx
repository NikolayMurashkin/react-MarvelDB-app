import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (charId) => {
        setChar(charId);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration"
                     src={decoration}
                     alt="vision"/>
            </main>
        </div>
    )
}

export default App;