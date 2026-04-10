import { Camera, Send, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-black font-display font-bold text-xs">LKP</span>
              </div>
              <span className="font-display font-medium text-xl tracking-tight">LKP.</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Curating humanity's most extraordinary encounters with our home world. 
              Beyond maps, beyond boundaries, beyond ordinary.
            </p>
            <div className="flex gap-4">
              {[Camera, Send, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                  <Icon size={18} className="text-white/60" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-medium mb-8">Platform</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/40">
              {['Experiences', 'Private Journeys', 'Corporate', 'Sustainability'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium mb-8">Resources</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/40">
              {['Journal', 'Gallery', 'Safety Protocols', 'FAQ'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium mb-8">Newsletter</h4>
            <p className="text-sm text-white/40 mb-6">Enter the unknown. Curated stories delivered monthly.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-white/40"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-white rounded-full text-black hover:scale-110 transition-transform">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 text-[10px] uppercase tracking-widest font-bold text-white/20">
          <p>© 2026 Little Known Planet • All Rights Reserved</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white/60">Privacy Policy</a>
            <a href="#" className="hover:text-white/60">Terms & Conditions</a>
            <a href="#" className="hover:text-white/60">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
