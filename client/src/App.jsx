import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ColorSearch from './components/ColorSearch.jsx';
import Products from './components/Products.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <ColorSearch />
        <Products />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
