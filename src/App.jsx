import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="bg-charcoal">
      <Navbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
