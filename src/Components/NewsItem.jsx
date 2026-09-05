import React from 'react'

export default function NewsItem(props) {
    return (
        <>
            <div className="card">
                <img src={props.pic??"images/nopic.avif"} height={150} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <div className='source'>
                        <p>{props.source?.slice(0,15)}</p>
                        <p>{new Date(props.date).toLocaleDateString()}</p>
                    </div>
                    <p className="card-text">{props.description}</p>
                    <a href={props.url} target='_blank' className="btn btn-primary w-100">Read Full Article</a>
                </div>
            </div>
        </>
    )
}
