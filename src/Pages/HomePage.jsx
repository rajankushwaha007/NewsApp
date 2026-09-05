import React, { useEffect, useState } from 'react'
import NewsItem from '../Components/NewsItem'
import { useSearchParams } from 'react-router-dom'

import InfiniteScroll from 'react-infinite-scroll-component'


export default function HomePage() {
    let [q, setQ] = useState("All")
    let [language, setLanguage] = useState("hi")
    let [searchParams] = useSearchParams()

    let [articles, setArticles] = useState([])
    let [totalResults, setTotalResults] = useState(0)

    let [page, setPage] = useState(1)

    async function getAPIData(q, language) {
        let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=24&pages=1&sortBy=publishedAt&apiKey=84961cd16d204c458dfb860a369b6380`)
        response = await response.json()
        if (response.status === "ok") {
            setArticles(response.articles)
            setTotalResults(response.totalResults)
        }
    }

    async function fetchMore() {
        setPage(page + 1)
        let response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${language}&pageSize=24&pages=${page}&sortBy=publishedAt&apiKey=84961cd16d204c458dfb860a369b6380`)
        response = await response.json()
        if (response.status === "ok") {
            setArticles(response.articles)
            setTotalResults(articles.concat(response.articles))
        }
    }
    useEffect(() => {
        (() => {
            let q = searchParams.get("q") ?? "All"
            let language = searchParams.get("language") ?? ("hi")
            setQ(q)
            setLanguage(language)
            getAPIData(q, language)
        })()
    }, [searchParams])
    return (
        <div className='container-fluid my-3'>
            <h3 className='bg-success p-2 text-light text-center'>News Articles Related to {q}</h3>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMore}
                hasMore={articles.length < totalResults}
                loader={<div className='my-5 text-center'>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                endMessage={<p p style={{ textAlign: 'center' }}> All items loaded.</p>}
            >

                <div className="row">
                    {articles.map((item, index) => {
                        return <div className='col-xl-2 col-lg-3 col-md-4 col-sm-6' key={index}>
                            <NewsItem
                                source={item.source?.name ?? ""}
                                title={item.title}
                                description={item.description}
                                pic={item.urlToImage}
                                date={item.publishedAt}
                                url={item.url}
                            />
                        </div>
                    })}
                </div>
            </InfiniteScroll >
        </div >
    )
}