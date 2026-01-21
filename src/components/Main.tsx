import * as React from "react"
import { useRef } from 'react'

import family from '../images/family2.jpg';
import pic01 from '../images/pic01.jpg';
import pic02 from '../images/pic02.jpg';
import pic03 from '../images/pic03.jpg';

interface Props {
    onCloseArticle: () => void;
    article: string;
    articleTimeout: boolean;
    timeout: boolean;
}

export const Main = ({ onCloseArticle, article, timeout, articleTimeout }: Props) => {

    const resumeContentRef = useRef<HTMLDivElement>(null)

    const handleDownloadPDF = async () => {
        if (!resumeContentRef.current) return

        // Dynamically import html2pdf to avoid SSR issues
        const html2pdf = (await import('html2pdf.js')).default

        // Clone the element to avoid modifying the DOM
        const element = resumeContentRef.current.cloneNode(true) as HTMLElement

        const opt = {
            margin: 10,
            filename: 'resume.pdf',
            image: { type: 'png' as const, quality: 0.98 },
            html2canvas: { scale: 2, logging: false },
            jsPDF: { orientation: 'portrait' as const, unit: 'mm', format: 'a4' },
        }

        html2pdf().set(opt).from(element).save()
    }

    let close = (
        <div
            className="close"
            onClick={() => {
                onCloseArticle()
            }}
        ></div>
    )

    return (
        <div
            id="main"
            style={timeout ? { display: 'flex' } : { display: 'none' }}
        >
            <article
                id="intro"
                className={`${article === 'intro' ? 'active' : ''} ${articleTimeout ? 'timeout' : ''
                    }`}
                style={{ display: 'none' }}
            >
                <h2 className="major">Intro</h2>
                <span className="image main">
                    <img src={family} alt="" />
                </span>
                <p>
                    I'm a husband and dad in an amazing family of six. My home is always full of noise, laughter, and the occasional sibling negotiation, and I honestly would not trade it for anything. My faith is a big part of who I am because it keeps me steady, reminds me what matters, and helps me show up the way I want to for the people I love. Family time is my anchor and the place where everything makes the most sense.
                </p>
                <p>
                    On the professional side, I’m a software engineer and crypto founder who enjoys building things that last. I’ve spent many years working on software in different environments, learning how systems grow, where they break, and what it takes to keep them reliable over time. Starting and running a company has taught me a lot about ownership, patience, and responsibility, and it’s shaped how I think about work and problem solving.
                </p>
                <p>I care deeply about doing good work, staying curious, and continuing to learn, especially in a field that never stands still.</p>
                <p>Outside of work, I like making pizza, exploring ideas, and spending time with my family. Life feels best when it’s simple, honest, and shared with the people who matter most.</p>
                {close}
            </article>

            <article
                id="intro"
                className={`${article === 'work' ? 'active' : ''} ${articleTimeout ? 'timeout' : ''
                    }`}
                style={{ display: 'none' }}
            >
                <h2 className="major">Work</h2>
                <span className="image main">
                    <img src={pic01} alt="" />
                </span>
                <div className="grid">
                    <div className="box">
                        <h3>HANDLES</h3>
                        <p>Blockchain-based identity and naming system on Cardano.</p>
                        <a href="https://handle.me" target="_blank" rel="noreferrer">handle.me</a>
                    </div>
                    <div className="box">
                        <h3>Archery Guru</h3>
                        <p>Comprehensive archery training and tracking web application.</p>
                        <a href="https://archery.guru" target="_blank" rel="noreferrer">archery.guru</a>
                    </div>
                    <div className="box">
                        <h3>Visual Clock</h3>
                        <p>A visual clock that let's you set a timer</p>
                        <a href="https://visualclock.com" target="_blank" rel="noreferrer">visualclock.com</a>
                    </div>
                    <div className="box">
                        <h3>BossCheatSheets</h3>
                        <p>A World of Warcraft addon and website with user-submitted strategies</p>
                        <a href="https://www.curseforge.com/wow/addons/bosscheatsheets" target="_blank" rel="noreferrer">https://www.curseforge.com/wow/addons/bosscheatsheets</a>
                    </div>
                </div>
                {close}
            </article>

            <article
                id="resume"
                className={`${article === 'resume' ? 'active' : ''} ${articleTimeout ? 'timeout' : ''
                    }`}
                style={article === 'resume' ? { opacity: 1 } : { opacity: 0 }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 className="major">Resume</h2>
                    <div className="resume-actions" style={{ opacity: 1, margin: 0, gap: '1.5rem' }}>
                        <button
                            onClick={handleDownloadPDF}
                            title="Download your resume as PDF"
                            className="resume-button"
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '0.5rem 0',
                                cursor: 'pointer',
                                opacity: 1
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'underline', fontSize: '0.9rem' }}>
                                <i className="fa fa-download"></i>
                                Download
                            </span>
                        </button>
                    </div>
                </div>
                <div id="resume-content" ref={resumeContentRef} style={{ opacity: 1 }}>
                    <article id="resume" className="panel" style={{ opacity: 1, background: 'white' }}>
                        <div className="resume-header">
                            <h1>Aaron McKinney</h1>
                            <p className="resume-title">Senior Software Engineer</p>
                            <div className="resume-contact-badges">
                                <span className="contact-badge">
                                    <span className="icon">✉</span>
                                    afmckinney@gmail.com
                                </span>
                                <span className="contact-badge">
                                    <svg className="icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                        <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                                    </svg>
                                    Redmond, Oregon
                                </span>
                            </div>
                        </div>

                        <section className="resume-section">
                            <h2>Professional Summary</h2>
                            <p>
                                Senior Software Engineer and Technical Leader with over 18 years of experience building scalable, reliable cloud and web applications. Skilled across the full stack with expertise in AWS serverless architecture, blockchain development on Cardano, and modern JavaScript frameworks. Adept at leading small engineering teams, mentoring developers, and delivering high-impact solutions from concept to deployment.
                            </p>
                        </section>

                        <section className="resume-section">
                            <h2>Experience</h2>
                            <div className="resume-item">
                                <div className="resume-item-header">
                                    <h3>Chief Technology Officer</h3>
                                </div>
                                <p className="resume-company">Kora Labs LLC, <span className="resume-date">March 2021 - Present</span></p>
                                <ul>
                                    <li>Lead engineering and architecture for blockchain-powered products in the Cardano ecosystem.</li>
                                    <li>Launched ADA Handles, a naming protocol with over 250,000 NFTs issued, and built personalization tools for user customization.</li>
                                    <li>Designed and deployed scalable serverless systems using AWS Lambda, Firestore, Node.js, and React.</li>
                                    <li>Integrated on-chain smart contracts with off-chain logic to enable complex personalization workflows.</li>
                                    <li>Manage and mentor a team of 3 developers, overseeing architecture, reviews, and product releases.</li>
                                </ul>
                            </div>

                            <div className="resume-item">
                                <div className="resume-item-header">
                                    <h3>Senior Software Engineer & Manager</h3>
                                </div>
                                <p className="resume-company">CBT Nuggets, <span className="resume-date">June 2018 - March 2021</span></p>
                                <ul>
                                    <li>Built and maintained microservices supporting leaderboards and reporting using Node.js, PostgreSQL, Redis, and AWS.</li>
                                    <li>Introduced containerized CI/CD pipelines through Jenkins and AWS ECS to improve deployment reliability.</li>
                                    <li>Promoted to team manager, leading 4 members across engineering, frontend, and QA roles.</li>
                                    <li>Improved report performance and user experience through refactoring and testing practices.</li>
                                </ul>
                            </div>

                            <div className="resume-item">
                                <div className="resume-item-header">
                                    <h3>Software Developer</h3>
                                </div>
                                <p className="resume-company">5Talent, <span className="resume-date">January 2015 - January 2018</span></p>
                                <ul>
                                    <li>Delivered dozens of projects ranging from WordPress plugins to full-featured web applications built in C#/.NET.</li>
                                    <li>Developed applications using Angular and Node.js with the AWS Serverless Framework.</li>
                                    <li>Built infrastructure using AWS S3, Lambda, RDS, DynamoDB, API Gateway, and CloudFormation templates.</li>
                                    <li>Collaborated with clients to design, build, and deliver custom software solutions.</li>
                                </ul>
                            </div>

                            <div className="resume-item">
                                <div className="resume-item-header">
                                    <h3>Web Developer</h3>
                                </div>
                                <p className="resume-company">Smartz, <span className="resume-date">March 2010 - September 2015</span></p>
                                <ul>
                                    <li>Migrated hundreds of client websites into a unified CMS platform while maintaining SEO integrity.</li>
                                    <li>Built custom front-end components with HTML5, CSS3, jQuery, AJAX, and Flash.</li>
                                    <li>Developed backend systems using C#, PHP, MySQL, and MSSQL to enhance customer functionality.</li>
                                    <li>Worked with Magento, BV Commerce, WordPress, CSMS, and Pixelsilk to deliver optimized, high-performing sites.</li>
                                    <li>Focused heavily on SEO best practices, improving client site performance and discoverability.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="resume-section">
                            <h2>Certifications</h2>
                            <div className="resume-certifications">
                                <div className="cert-column">
                                    <ul>
                                        <li>AWS Certified Solutions Architect - Professional</li>
                                        <li>AWS Certified Developer - Associate</li>
                                    </ul>
                                </div>
                                <div className="cert-column">
                                    <ul>
                                        <li>AWS Certified Solutions Architect - Associate</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
                {close}
            </article>

            {/* <article
                id="about"
                className={`${article === 'about' ? 'active' : ''} ${articleTimeout ? 'timeout' : ''
                    }`}
                style={{ display: 'none' }}
            >
                <h2 className="major">About</h2>
                <span className="image main">
                    <img src={pic03} alt="" />
                </span>
                <p>
                    Lorem ipsum dolor sit amet, consectetur et adipiscing elit. Praesent
                    eleifend dignissim arcu, at eleifend sapien imperdiet ac. Aliquam
                    erat volutpat. Praesent urna nisi, fringila lorem et vehicula
                    lacinia quam. Integer sollicitudin mauris nec lorem luctus ultrices.
                    Aliquam libero et malesuada fames ac ante ipsum primis in faucibus.
                    Cras viverra ligula sit amet ex mollis mattis lorem ipsum dolor sit
                    amet.
                </p>
                {close}
            </article> */}

            <article
                id="contact"
                className={`${article === 'contact' ? 'active' : ''} ${articleTimeout ? 'timeout' : ''
                    }`}
                style={{ display: 'none' }}
            >
                <h2 className="major">Contact</h2>
                <form
                    name="contact"
                    method="post"
                    action="/success"
                    data-netlify="true"
                    data-netlify-honeypot="b-f"
                >
                    <input type="hidden" name="b-f" />
                    <div className="field half first">
                        <label htmlFor="name">Name</label>
                        <input type="text" required name="name" id="name" />
                    </div>
                    <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input type="email" required name="email" id="email" />
                    </div>
                    <div className="field">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows={4}></textarea>
                    </div>
                    <ul className="actions">
                        <li>
                            <input type="submit" value="Send Message" className="special" />
                        </li>
                        <li>
                            <input type="reset" value="Reset" />
                        </li>
                    </ul>
                </form>
                <ul className="icons">
                    <li>
                        <a href="#" className="icon fa-github">
                            <span className="label">GitHub</span>
                        </a>
                    </li>
                </ul>
                {close}
            </article>
        </div>
    )
}

export default Main
