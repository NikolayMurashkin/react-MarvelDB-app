import RandomChar from "./randomChar/RandomChar";
import CharList from "./charList/CharList";
import {useState} from "react";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import CharInfo from "./charInfo/CharInfo";
import decoration from "../../../resources/img/vision.png";

const MainPage = () => {
    const [selectedItem, setItem] = useState(0);

    const onItemSelected = (itemId) => {
        setItem(itemId);
    }

    return (
        <div>
            <>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char">
                    <ErrorBoundary>
                        <CharList onCharSelected={onItemSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedItem}/>
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration"
                     src={decoration}
                     alt="vision"/>
            </>
        </div>
    );
};

export default MainPage;
