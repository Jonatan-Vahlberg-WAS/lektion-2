"use client";

import BookKit from "@/utils/bookKit";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type BookState = {
    books: Book[];

    getBooks: (query:string) => void
}

const defaultState: BookState = {
    books: [],
    getBooks: () => {}
}

const BookContext = createContext<BookState>(defaultState)

function BookProvider({children}: PropsWithChildren) {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        getBooks("alice in wonder")
    },[])

    // async function getBooks(query: string) {
    //     try {
    //         const response = await BookKit.getBooksFromQuery(query)
    //         setBooks(response.docs)
    //         console.log(response)
    //         return response.docs
    //     } catch(error) {
    //         console.warn("Error: fetching books in context", error)
    //         return []
    //     }
    // }

    function getBooks(query: string) {
        BookKit.getBooksFromQuery(query)
        .then(res => setBooks(res.docs))
        .catch(error => console.warn(error))
    }

    return <BookContext.Provider value={{
        books,
        getBooks
    }}>
        {children}
    </BookContext.Provider>
}

function useBooks() {
    const books = useContext(BookContext);
    if(!books) {
        throw new Error("Book context useed outside of provider")
    }

    return books
}

export { BookProvider, useBooks }