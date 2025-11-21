import React from 'react'

interface Props {
    timeout: boolean;
}

const Footer = ({ timeout }: Props) => (
    <footer id="footer" style={timeout ? { display: 'none' } : {}}>
        <p className="copyright">&copy; Aaron McKinney {new Date().getFullYear()}</p>
    </footer>
)

export default Footer
