import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import '../assets/scss/main.scss'
import '../assets/scss/resume.scss'
import Resume from "../components/Resume"

const ResumePage: React.FC<PageProps> = () => {
    return (
        <div style={{ width: '100%', minHeight: '100vh', background: '#fff' }}>
            <Resume />
        </div>
    )
}

export default ResumePage

export const Head: HeadFC = () => <title>Resume</title>
