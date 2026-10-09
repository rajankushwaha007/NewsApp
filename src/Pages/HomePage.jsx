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
    let [aiQuestion, setAiQuestion] = useState("")
    let [aiAnswer, setAiAnswer] = useState("")
    let [aiArticles, setAiArticles] = useState([])
    let [aiLoading, setAiLoading] = useState(false)
    let [explanation, setExplanation] = useState("")
    let [explainLoading, setExplainLoading] = useState(false)

    let [translationLoading, setTranslationLoading] = useState(false)
    let [explanationLanguage, setExplanationLanguage] = useState("English")
    let [originalExplanation, setOriginalExplanation] = useState("")

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
    async function askAI() {
        if (!aiQuestion.trim()) {
            return
        }
        try {
            setAiLoading(true)
            setAiAnswer("")
            setAiArticles([])
            let response = await fetch(
                "https://backend-newsapp-3gek.onrender.com/api/ai/assistant",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: aiQuestion
                    })
                }
            )
            let data = await response.json()
            console.log("AI Response:", data)
            if (data.success) {
                setAiAnswer(data.answer || "")
                setAiArticles(data.articles || [])

            } else {
                setAiAnswer(
                    data.message || "AI response generate nahi ho paya."
                )
            }
        } catch (error) {
            console.log("AI Error:", error)
            setAiAnswer(
                "AI service is not connected."
            )
        } finally {
            setAiLoading(false)
        }
    }
    async function explainNews(article) {
        try {
            setExplainLoading(true)
            setExplanation("")
            let response = await fetch(
                "https://backend-newsapp-3gek.onrender.com/api/ai/explain",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: article.title,
                        description: article.description
                    })
                }
            )
            let data = await response.json()
            console.log("AI Explanation:", data)
            if (data.success) {
                setExplanation(data.explanation || "")
                setOriginalExplanation(data.explanation || "")
                setExplanationLanguage("English")

            } else {
                setExplanation(
                    data.message || "Explanation generate nahi ho paya."
                )
            }
        } catch (error) {
            console.log("AI Explanation Error:", error)
            setExplanation(
                "AI explanation service is not connected."
            )
        } finally {
            setExplainLoading(false)
        }
    }
    async function translateExplanation(targetLanguage) {

        if (!originalExplanation) {
            return
        }

        if (targetLanguage === explanationLanguage) {
            return
        }
        try {
            setTranslationLoading(true)
            let response = await fetch(
                "https://backend-newsapp-3gek.onrender.com/api/ai/translate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        text: originalExplanation,
                        targetLanguage: targetLanguage
                    })
                }
            )

            let data = await response.json()

            console.log("AI Translation:", data)

            if (data.success) {

                setExplanation(data.translation || "")
                setExplanationLanguage(targetLanguage)

            } else {

                console.log(
                    data.message || "Translation failed"
                )

            }

        } catch (error) {

            console.log(
                "AI Translation Error:",
                error
            )

        } finally {

            setTranslationLoading(false)

        }
    }
    useEffect(() => {
        // CATEGORY / LANGUAGE CHANGE PAR PAGE TOP PAR JAYEGA
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        })

        let searchQuery = searchParams.get("q") ?? "All"
        let selectedLanguage = searchParams.get("language") ?? "en"

        setQ(searchQuery)
        setLanguage(selectedLanguage)

        getAPIData(searchQuery, selectedLanguage)

    }, [searchParams])
    return (
        <div className='container-fluid my-3'>
            <div className="card shadow-sm mb-4">

                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">
                        🤖 AI News Assistant
                    </h4>
                </div>

                <div className="card-body">

                    <div className="input-group">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ask anything about the news..."
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    askAI()
                                }
                            }}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={askAI}
                            disabled={aiLoading}
                        >
                            {aiLoading ? "Asking..." : "Ask AI"}
                        </button>

                    </div>
                    {aiLoading && (

                        <div className="text-center my-3">

                            <div
                                className="spinner-border"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>

                            <p className="mt-2">
                                AI is analyzing the news...
                            </p>

                        </div>

                    )}
                    {aiAnswer && !aiLoading && (

                        <div className="alert alert-info mt-3">

                            <h5>🤖 AI Answer</h5>

                            <p
                                className="mb-0"
                                style={{
                                    whiteSpace: "pre-line",
                                    lineHeight: "1.8"
                                }}
                            >
                                {aiAnswer}
                            </p>

                        </div>

                    )}
                    {aiArticles.length > 0 && !aiLoading && (

                        <div className="mt-4">

                            <h5>
                                📰 Related News
                            </h5>{explanation && !explainLoading && (
                                <div className="alert alert-light border shadow-sm mt-4">

                                    <h5 className="mb-3">
                                        🤖 AI Explanation
                                    </h5>

                                    <p
                                        className="mb-0"
                                        style={{
                                            whiteSpace: "pre-line",
                                            lineHeight: "1.8"
                                        }}
                                    >
                                        {explanation}
                                    </p>

                                </div>

                            )}
                            <div className="mb-3">

                                <button
                                    className={`btn btn-sm me-2 ${explanationLanguage === "English"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() => translateExplanation("English")}
                                    disabled={
                                        translationLoading ||
                                        explanationLanguage === "English"
                                    }
                                >
                                    English
                                </button>
                                <button
                                    className={`btn btn-sm ${explanationLanguage === "Hindi"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() => translateExplanation("Hindi")}
                                    disabled={
                                        translationLoading ||
                                        explanationLanguage === "Hindi"
                                    }
                                >
                                    Hindi
                                </button>

                            </div>
                            {explainLoading && (
                                <div className="text-center my-3">

                                    <div
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>

                                    <span className="ms-2">
                                        AI is explaining this news...
                                    </span>

                                </div>
                            )}

                            <div className="row">

                                {aiArticles.map((article, index) => (

                                    <div
                                        className="col-md-6 mb-3"
                                        key={article.id || index}
                                    >
                                        <div className="card h-100">

                                            {article.image &&
                                                article.image !== "None" && (

                                                    <img
                                                        src={article.image}
                                                        className="card-img-top"
                                                        style={{
                                                            height: "180px",
                                                            objectFit: "cover"
                                                        }}
                                                        alt={article.title}
                                                    />
                                                )}
                                            <div className="card-body">

                                                <h6>
                                                    {article.title}
                                                </h6>

                                                <p className="small text-muted">
                                                    {article.description}
                                                </p>
                                                <a
                                                    href={article.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Read Full News
                                                </a>
                                                <button
                                                    className="btn btn-sm btn-outline-dark ms-2"
                                                    onClick={() => explainNews(article)}
                                                    disabled={explainLoading}
                                                >
                                                    ✨ Explain with AI
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
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