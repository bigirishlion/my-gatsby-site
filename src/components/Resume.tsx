import React, { useRef } from 'react'

const Resume: React.FC = () => {
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
            image: { type: 'jpeg' as const, quality: 0.98 },
            html2canvas: { scale: 2, logging: false },
            jsPDF: { orientation: 'portrait' as const, unit: 'mm', format: 'a4' },
        }

        html2pdf().set(opt).from(element).save()
    }

    return (
        <div id="resume-container">
            <div id="resume-content" ref={resumeContentRef}>
                <article id="resume" className="panel">
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
                            <p className="resume-company">Korolabs LLC, <span className="resume-date">March 2021 - Present</span></p>
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

            <div className="resume-actions">
                <button
                    className="button primary"
                    onClick={handleDownloadPDF}
                    title="Download your resume as PDF"
                >
                    Download PDF
                </button>
                <button
                    className="button secondary"
                    onClick={() => window.print()}
                    title="Print your resume"
                >
                    Print
                </button>
            </div>

            <button
                className=""
                onClick={handleDownloadPDF}
                title="Download your resume as PDF"
            >
                Download PDF
            </button>
        </div>
    )
}

export default Resume
