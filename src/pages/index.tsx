import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import '../assets/scss/main.scss'
import Main from "../components/Main"
import { Header } from "../components/Header"
import Footer from "../components/Footer"

const IndexPage: React.FC<PageProps> = (props) => {
  const [article, setArticle] = React.useState<string>('');
  const [articleTimeout, setArticleTimeout] = React.useState<boolean>(false);
  const [isArticleVisible, setIsArticleVisible] = React.useState(false)
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState('is-loading');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading('');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenArticle = (articleId: string) => {
    setArticle(articleId);
    setIsArticleVisible(prev => !prev)

    setTimeout(() => {
      setToggle(prev => !prev)
    }, 325)

    setTimeout(() => {
      setArticleTimeout(prev => !prev)
    }, 350)
  }

  const handleCloseArticle = () => {
    setArticleTimeout(prev => !prev)

    setTimeout(() => {
      setToggle(prev => !prev)
    }, 325)

    setTimeout(() => {
      setArticle('');
      setIsArticleVisible(prev => !prev)
    }, 350)
  }

  return (
    <div className={`body ${loading} ${isArticleVisible ? 'is-article-visible' : ''}`}>
      <div id="wrapper">
        <Header onOpenArticle={handleOpenArticle} timeout={toggle} />
        <Main timeout={toggle} articleTimeout={articleTimeout} article={article} onCloseArticle={handleCloseArticle} />
        <Footer timeout={toggle} />
      </div>
      <div id="bg"></div>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Aaron McKinney</title>
