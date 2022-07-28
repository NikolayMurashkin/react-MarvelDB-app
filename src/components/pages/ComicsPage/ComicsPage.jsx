import React from 'react';
import {useState} from "react";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import ComicsHeader from "./comicsHeader/ComicsHeader";
import ComicsList from "./comicsList/ComicsList";

const ComicsPage = () => {
    const [selectedItem, setItem] = useState(0);

    const onItemSelected = (itemId) => {
        setItem(itemId);
    }

    return (
        <div>
            <>
                <ComicsHeader/>
                <ErrorBoundary>
                    <ComicsList onComicSelected={onItemSelected}/>
                </ErrorBoundary>
            </>
        </div>
    );
};

export default ComicsPage;
