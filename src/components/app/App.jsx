import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {lazy, Suspense} from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/page404/Page404').then(({default: Page404}) => ({default: Page404})));
const MainPage = lazy(() => import('../pages/MainPage/MainPage').then(({default: MainPage}) => ({default: MainPage})));
const ComicsPage = lazy(() => import('../pages/ComicsPage/ComicsPage').then(({default: ComicsPage}) => ({default: ComicsPage})));
const SingleComic = lazy(() => import('../pages/singleComicPage/singleComic/SingleComic').then(({default: SingleComic}) => ({default: SingleComic})));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route exact path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicId" element={<SingleComic/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;