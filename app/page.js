import Header from './components/Header';
import Converter from './components/Converter';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center p-4 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">The Only Converter You'll Ever Need</h2>
        <p className="text-lg text-[var(--secondary)] mb-8 text-center">Fast, simple, and powerful. For everything.</p>
        
        <Converter />
      </div>
       <footer className="text-center p-4 text-sm text-[var(--secondary)]">
        <p>Built for Oskar200442 by your friendly AI assistant.</p>
      </footer>
    </main>
  );
}
