import React from 'react';

import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'; 
import logo from "../assets/imgs/logo-power.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';

// مكون فرعي لعمود الروابط
const FooterLinkColumn = ({ title, links, onLinkClick }) => (
    <div className="flex flex-col space-y-3">
        <h4 className="text-[#d90a14] font-bold text-lg mb-2 uppercase tracking-wide">
            {title}
        </h4>
        {links.map((link, index) => (
            <Link 
                key={index} 
                to={link.href} 
                onClick={(e) => onLinkClick && onLinkClick(e, link)}
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
                {link.label}
            </Link>
        ))}
    </div>
);

// المكون الرئيسي للـ Footer
const Footer = () => {
    const currentYear = new Date().getFullYear();
    const ownerName = "Marwan";
    const ownerFacebookLink = "https://www.facebook.com/share/1GRNNnVnC9/"; // حط لينك الفيسبوك بتاعك هنا
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const handleNavClick = (e, link) => {
        if (link.href.includes('#')) {
            e.preventDefault();
            const sectionId = link.href.split('#')[1];

            // If not on home page, navigate to home first
            if (currentPath !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else {
                // Already on home page, just scroll
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
    };
    
    // بيانات الروابط (مطابقة للـ Navbar)
    const companyLinks = [
        { label: "Plans", href: "/#plans" },
        { label: "Coaching", href: "/#trainers" },
        { label: "Testimonials", href: "/#testimonials" },
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
    ];

    const resourcesLinks = [
        { label: "Fitness Tools", href: "#tools" },
        { label: "Workout Videos", href: "#videos" },
        { label: "Nutrition Guides", href: "#nutrition" },
        { label: "FAQ", href: "#faq" },
        { label: "Success Stories", href: "#stories" },
        { label: "Membership", href: "#membership" },
    ];


    return (
        // الخلفية سوداء داكنة كما في الصورة المرجعية
        <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 border-t border-gray-800">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* الجزء العلوي - شبكة الأعمدة */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
                    
                    {/* العمود 1: العلامة التجارية والمعلومات */}
                    <div className="md:col-span-2 flex flex-col space-y-4">
                        {/* الشعار */}
                        <div className="flex items-center space-x-2">
                                   <Link to="/" className="flex items-center">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="h-12 w-auto"
                        />
                    </Link>
                        </div>
                        <p className="text-gray-400 text-sm italic -mt-2">
                            Transform Your Body
                        </p>

                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transform Your Body with FitMaker, Your Trusted Partner in Fitness. With <span className="text-[#d90a14]">Over 5 Years of Experience</span>, We Offer Expert Coaching, Tailored Workout Plans, and Comprehensive Nutritional Guidance. <span className="text-[#d90a14]">Join Our Community</span> and Start Your Journey Towards a Healthier, Stronger You. Ready to Make a Change?
                        </p>

                        {/* أيقونات التواصل الاجتماعي */}
                        <div className="flex space-x-5 pt-2">
                            <a href="#" className="text-white hover:text-[#d90a14] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-white hover:text-[#d90a14] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-white hover:text-[#d90a14] transition-colors">
                                {/* أيقونة X (تويتر) - سنستخدم SVG هنا لعدم توفرها في Lucide */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.684l-8.683 9.471 9.432 12.376h-7.662l-6.529-8.583-8.835 8.583H.397l9.284-9.986L.883 1.153h8.312l5.485 7.747 4.221-7.747zm-2.029 19.34L7.545 3.398H5.97L17.971 20.495h1.758z"/></svg>
                            </a>
                            <a href="#" className="text-white hover:text-[#d90a14] transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Mobile: Company and Resources side by side */}
                    <div className="grid grid-cols-2 gap-8 md:hidden">
                        {/* العمود 2: Company */}
                        <FooterLinkColumn title="Company" links={companyLinks} onLinkClick={handleNavClick} />
                        
                        {/* العمود 3: Resources */}
                        <FooterLinkColumn title="Resources" links={resourcesLinks} />
                    </div>

                    {/* Desktop: Company and Resources in separate columns */}
                    <div className="hidden md:block">
                        <FooterLinkColumn title="Company" links={companyLinks} onLinkClick={handleNavClick} />
                    </div>
                    
                    <div className="hidden md:block">
                        <FooterLinkColumn title="Resources" links={resourcesLinks} />
                    </div>

                    {/* العمود 5: Contact Us */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="text-[#d90a14] font-bold text-lg mb-2 uppercase tracking-wide">
                            Contact Us
                        </h4>
                        
                        <div className="flex items-center space-x-3 text-gray-400 text-sm">
                            <MapPin size={16} className="text-[#d90a14]" />
                            <span>Cairo, Egypt</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-400 text-sm">
                            <Phone size={16} className="text-[#d90a14]" />
                            <span>+20 123 456 7890</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-400 text-sm">
                            <Mail size={16} className="text-[#d90a14]" />
                            <span>info@fitmaker.com</span>
                        </div>
                    </div>

                </div>

               {/* الجزء السفلي: إشعار حقوق النشر (Copyright) */}
                <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
                    <p>
                        &copy; {currentYear} All Rights Reserved by{' '}
                        <a 
                            href={ownerFacebookLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#d90a14] hover:text-[#ff6b00] transition-colors duration-200 font-semibold"
                        >
                            {ownerName}
                        </a>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;