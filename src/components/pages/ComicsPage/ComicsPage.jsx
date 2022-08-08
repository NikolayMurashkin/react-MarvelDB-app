import React from 'react';
import {useState} from "react";
import ErrorBoundary from "../../errorBoundary/ErrorBoundary";
import ComicsHeader from "./comicsHeader/ComicsHeader";
import ComicsList from "./comicsList/ComicsList";
import {Helmet} from "react-helmet";

const ComicsPage = () => {
    const [selectedItem, setItem] = useState(0);

    const onItemSelected = (itemId) => {
        setItem(itemId);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />
                <title>Comics page</title>
            </Helmet>
            <ComicsHeader/>
            <ErrorBoundary>
                <ComicsList onComicSelected={onItemSelected}/>
            </ErrorBoundary>
        </>
    );
};

export default ComicsPage;
