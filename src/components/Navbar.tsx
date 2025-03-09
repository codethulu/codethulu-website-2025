import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black/20 backdrop-blur-md z-50 p-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-white font-druk">CODETHULU</Link>
                <div className="flex space-x-4">
                    <Link to="/" className="text-white font-bold transition-colors uppercase">Home</Link>
                    <Link to="/blog" className="text-white font-bold transition-colors uppercase">Blog</Link>
                    <Link to="/projects" className="text-white font-bold transition-colors uppercase">Projects</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;