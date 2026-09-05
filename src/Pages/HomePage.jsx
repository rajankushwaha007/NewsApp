import React, { useEffect, useState } from 'react'
import NewsItem from '../Components/NewsItem'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function HomePage() {

    let [q, setQ] = useState("All")
    let [language, setLanguage] = useState("en")
    let [searchParams] = useSearchParams()

    let [articles, setArticles] = useState([])
    let [page, setPage] = useState(1)
    let [hasMore, setHasMore] = useState(true)


    async function getAPIData(searchQuery, selectedLanguage) {

        try {

            let endpoint =
                searchQuery && searchQuery !== "All"
                    ? `https://backend-newsapp-3gek.onrender.com/api/news/search?q=${encodeURIComponent(searchQuery)}&language=${selectedLanguage}&page=1&pageSize=20`
                    : `https://backend-newsapp-3gek.onrender.com/api/news?language=${selectedLanguage}&page=1&pageSize=20`

            let response = await fetch(endpoint)

            response = await response.json()

            if (response.status === "ok") {

                let news = response.news || []

                setArticles(news)
                setPage(1)

                setHasMore(news.length === 20)

            } else {

                console.log("API Error:", response)

                setArticles([])
                setHasMore(false)

            }

        } catch (error) {

            console.log("Fetch Error:", error)

            setArticles([])
            setHasMore(false)

        }

    }


    async function fetchMore() {

        let nextPage = page + 1

        try {

            let endpoint =
                q && q !== "All"
                    ? `https://backend-newsapp-3gek.onrender.com/api/news/search?q=${encodeURIComponent(q)}&language=${language}&page=${nextPage}&pageSize=20`
                    : `https://backend-newsapp-3gek.onrender.com/api/news?language=${language}&page=${nextPage}&pageSize=20`

            let response = await fetch(endpoint)

            response = await response.json()

            if (response.status === "ok") {

                let newArticles = response.news || []

                setArticles(prevArticles => [
                    ...prevArticles,
                    ...newArticles
                ])

                setPage(nextPage)

                setHasMore(newArticles.length === 20)

            } else {

                console.log("API Error:", response)

                setHasMore(false)

            }

        } catch (error) {

            console.log("Fetch More Error:", error)

            setHasMore(false)

        }

    }


    useEffect(() => {

        let searchQuery = searchParams.get("q") ?? "All"
        let selectedLanguage = searchParams.get("language") ?? "en"

        setQ(searchQuery)
        setLanguage(selectedLanguage)

        getAPIData(searchQuery, selectedLanguage)

    }, [searchParams])


    return (

        <div className='container-fluid my-3'>

            <h3 className='bg-success p-2 text-light text-center'>
                News Articles Related to {q}
            </h3>


            <InfiniteScroll

                dataLength={articles.length}

                next={fetchMore}

                hasMore={hasMore}

                loader={
                    <div className='my-5 text-center'>

                        <div
                            className="spinner-border"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                    </div>
                }

                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        All items loaded.
                    </p>
                }

            >

                <div className="row">

                    {articles.map((item, index) => {

                        return (

                            <div
                                className='col-xl-2 col-lg-3 col-md-4 col-sm-6'
                                key={item.id || index}
                            >

                                <NewsItem

                                    source={item.author ?? ""}

                                    title={item.title}

                                    description={item.description}

                                    pic={item.image ?? ""}

                                    date={item.published ?? ""}

                                    url={item.url}

                                />

                            </div>

                        )

                    })}

                </div>

            </InfiniteScroll>

        </div>

    )
}