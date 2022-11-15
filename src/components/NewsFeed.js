import { useEffect, useState } from "react"
import axios from "axios";

const  NewsFeed = () => {
    const [articles, setArticles] = useState(null)
     
    useEffect(() => {


        const options = {
          method: 'GET',
          url: 'https://crypto-news-live3.p.rapidapi.com/news',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com'
          }
        };
        
        axios.request(options).then( (response) => {

            setArticles(response.data)
            console.log(articles);
        }).catch((error) => {
            console.error(error)
        });
    }, [])




    const first7Articles = articles?.slice(0, 5)

  return (
    <div className="news-feed"> 
      <h2>NewsFeed</h2>
      {first7Articles?.map((article, _index) => (<div key={_index}>
        <a href={article.url}><p>{article.title} <br></br> <span>Source {article.source}</span></p></a>
      </div>))}
    </div>
  )
}

export default NewsFeed
