import * as React from "react"

interface Props {
    timeout: boolean;
    onOpenArticle: (article: string) => void;
}

export const Header = ({ timeout, onOpenArticle }: Props) => {
    return (
        <header id="header" style={timeout ? { display: 'none' } : {}}>
            <div className="logo">
            </div>
            <div className="content">
                <div className="inner">
                    <h1>Aaron McKinney</h1>
                    <p>Husband & Father · Crypto Founder · Software Engineer · Pizza Chef</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="javascript:;" onClick={() => { onOpenArticle('intro') }}>Intro</a></li>
                    <li><a href="javascript:;" onClick={() => { onOpenArticle('resume') }}>Resume</a></li>
                    <li><a href="javascript:;" onClick={() => { onOpenArticle('work') }}>Portfolio</a></li>
                    <li><a href="javascript:;" onClick={() => { onOpenArticle('contact') }}>Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}