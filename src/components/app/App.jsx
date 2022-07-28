import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import {useState} from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import ComicsHeader from "../comicsHeader/ComicsHeader";

const App = () => {
    const [selectedChar, setChar] = useState(0);
    const [selectedComic, setComic] = useState(0);

    const onCharSelected = (charId) => {
        setChar(charId);
    }
    const onComicSelected = (comicId) => {
        setComic(comicId);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char">*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharList onCharSelected={onCharSelected}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo charId={selectedChar}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                {/*<img className="bg-decoration"*/}
                {/*     src={decoration}*/}
                {/*     alt="vision"/>*/}
                <ComicsHeader/>
                <ErrorBoundary>
                    <ComicsList onComicSelected={onComicSelected}/>
                </ErrorBoundary>

            </main>
        </div>
    )
}

export default App;