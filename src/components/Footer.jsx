import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="text-3xl font-bold text-white tracking-wider mb-6 flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-[var(--color-mango)]">FreshSip</span> Café
            </Link>
            <p className="text-gray-400 font-light leading-relaxed mb-6 text-sm">
              Crafting premium beverage experiences with authentic recipes and the finest ingredients since 2018.
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholders */}
              {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--color-mango)] text-white hover:text-black transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-[3px]"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Menu</h4>
            <ul className="space-y-4">
              <li><Link to="/menu" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Signature Lassis</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Premium Shakes</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Traditional Coolers</Link></li>
              <li><Link to="/menu" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Seasonal Specials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="/#about" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Our Story</a></li>
              <li><Link to="/locations" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Locations</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Careers</Link></li>
              <li><a href="#contact" className="text-gray-400 hover:text-[var(--color-mango)] transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Visit Us</h4>
            <address className="text-gray-400 not-italic space-y-4 text-sm font-light">
              <p>123 Luxury Avenue, Suite 100<br />New York, NY 10001</p>
              <p>Mon - Fri: 8am - 10pm<br />Sat - Sun: 9am - 11pm</p>
              <p className="pt-2">
                <a href="mailto:hello@freshsip.com" className="hover:text-[var(--color-mango)] transition-colors">hello@freshsip.com</a><br />
                <a href="tel:+1234567890" className="hover:text-[var(--color-mango)] transition-colors">+1 (234) 567-890</a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-light">
            © {new Date().getFullYear()} FreshSip Café. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
