import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="page underwork">
            <h1 style={{textAlign:"center",color:"var(--primary)"}}>404 | Not Found</h1>
      </div>
      <Footer />
    </div>
  );
}
