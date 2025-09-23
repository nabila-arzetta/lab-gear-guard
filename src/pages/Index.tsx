// Update this page (the content is just a fallback if you fail to update the page)

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col">
      {/* Header */}
      <header className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/api/placeholder/48/48" 
            alt="Logo Politeknik STTT Bandung" 
            className="w-12 h-12 rounded-full bg-white/20"
          />
          <span className="text-white font-bold text-xl">Politeknik STTT Bandung</span>
        </div>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/login')}
          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
        >
          Masuk
        </Button>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Kelola Inventaris Laboratorium
              <br />
              <span className="text-primary-accent">Politeknik STTT Bandung</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Inventaris Politeknik STTT Bandung merupakan platform untuk membantu 
              pemantauan peralatan laboratorium agar terkendali dengan baik.
            </p>
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate('/login')}
              className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg"
            >
              Masuk untuk melanjutkan
            </Button>
          </div>

          {/* Right Content - Building Image */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <img
                src="/api/placeholder/600/400"
                alt="Gedung Politeknik STTT Bandung"
                className="w-full h-auto rounded-lg shadow-elevated"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 border-t border-white/20">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-white/80">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">Phone: +62-22-7272580</p>
          </div>
          <div className="text-center">
            <p className="text-sm">Jl. Jakarta No. 31, Bandung 40272</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm">Email: info@sttekstil.ac.id</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
