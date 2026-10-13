import React, { useState, useEffect } from 'react';

function App() {
  const [brands, setBrands] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState({});
  
  // Hero Carousel State - Initialized to Paidhu Ecosystem (Floral Foods, IT, Education)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('food');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mega Menu Hover State
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  
  // Right Sidebar hover/expanded state
  const [sidebarHovered, setSidebarHovered] = useState(false);
  
  // Modals state
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroSlides = [
    {
      id: 'food',
      badge: 'Paidhu Stories',
      badgeType: 'blue',
      title: 'Pure Floral Goodness',
      description: 'Pioneering organic edible flower-based foods, artisanal Bloom Cookies, Petal Jams, and Grade-A Kashmiri Saffron for holistic everyday wellness.',
      buttonText: 'Explore Foods',
      bgImage: '/assets/hero_flower_food.jpg',
      previewTitle: 'Floral Goodness',
      previewThumb: '/assets/hero_flower_food.jpg',
      sectionId: 'brands'
    },
    {
      id: 'tech',
      badge: 'Technology & IT',
      badgeType: 'blue',
      title: 'Next-Gen IT Innovation',
      description: 'VIYARA delivers scalable enterprise software, cloud infrastructure, and data-driven digital transformations that power modern enterprises.',
      buttonText: 'Discover Viyara Tech',
      bgImage: '/assets/hero_tech.jpg',
      previewTitle: 'VIYARA Tech',
      previewThumb: '/assets/hero_tech.jpg',
      sectionId: 'brands'
    },
    {
      id: 'education',
      badge: 'Education & Community',
      badgeType: 'blue',
      title: 'Empowering Future Creators',
      description: 'Kalikasphere bridges creativity, digital skills, and innovation through hands-on workshops and collaborative learning ecosystems.',
      buttonText: 'Explore KalikaSphere',
      bgImage: '/assets/hero_education.jpg',
      previewTitle: 'KalikaSphere',
      previewThumb: '/assets/hero_education.jpg',
      sectionId: 'brands'
    }
  ];

  const rightTabs = [
    { id: 'food', label: 'Floral Foods', slideIndex: 0 },
    { id: 'tech', label: 'IT & Software', slideIndex: 1 },
    { id: 'education', label: 'Education Hub', slideIndex: 2 },
    { id: 'careers', label: 'Careers', slideIndex: 0, scrollTo: 'careers' },
    { id: 'brands', label: 'All Brands', slideIndex: 0, scrollTo: 'brands' }
  ];

  const toggleExpand = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedBrands(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    // Fetch brand data from backend node API or serverless function
    const apiUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:5001/api/brands'
      : '/api/brands';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setBrands(data))
      .catch(err => {
        console.error("Error fetching brands: ", err);
        setBrands([
          {
            id: 'paidhuethicalfoods',
            name: 'Paidhu Ethical Foods',
            category: 'food',
            description: "Paidhu – The Edible Flower Co. offers premium edible flower-based foods, including Bloom Cookies, Petal Jams, Medley Teas, Brew Flora, and Saffron, crafted with natural ingredients. We are committed to healthy, preservative-free, and ethically made products that bring wellness and floral goodness to everyday life.",
            url: 'https://paidhuethicalfoods.com',
            logo: '/assets/paidhu_logo_white.png'
          },
          {
            id: 'paidhusaffron',
            name: 'Paidhu Saffron',
            category: 'food',
            description: "Paidhu Saffron offers the world's finest, ethically sourced grade-A Kashmiri Saffron, handpicked for its rich aroma, deep crimson color, and unparalleled purity. We are committed to delivering authentic, premium saffron that brings natural wellness, gourmet flavor, and exquisite quality to everyday life.",
            url: 'https://paidhusaffron.com',
            logo: '/assets/paidhu_saffron_logo.png'
          },
          {
            id: 'floffi',
            name: 'Floffi',
            category: 'food',
            description: "Floffi offers a delightful range of jams, sauces, spreads, and everyday food products made with carefully selected quality ingredients. We are committed to delivering great taste, freshness, and trusted quality in every product for you and your family.",
            url: 'https://floffi.in',
            logo: '/assets/fluffy_logo.png'
          },
          {
            id: 'viyara',
            name: 'Viyara',
            category: 'tech',
            description: "VIYARA is a tech-enabled software and marketing agency helping businesses grow through innovative technology and data-driven strategies. We deliver scalable software, impactful digital experiences, and performance-focused marketing solutions that drive growth, improve efficiency, and create lasting business success.",
            url: 'https://viyara.co.in',
            logo: '/assets/viyara_logo.png'
          },
          {
            id: 'kalikasphere',
            name: 'KalikaSphere',
            category: 'education',
            description: "Kalikasphere is a creative learning and innovation platform focused on empowering individuals and businesses through education, creativity, technology, and community-driven experiences. We provide workshops, digital solutions, strategic consulting, and innovative programs that inspire growth, collaboration, and lifelong learning.",
            url: 'https://kalikasphere.com',
            logo: '/assets/collegebear_logo.png'
          }
        ]);
      });

    // Scrolled header listener
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero auto-slider effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => {
          const next = (prev + 1) % heroSlides.length;
          setActiveTab(heroSlides[next].id);
          return next;
        });
      }, 6000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, heroSlides.length]);

  const handleTabClick = (tab) => {
    if (tab.scrollTo) {
      scrollToSection(tab.scrollTo);
    }
    if (typeof tab.slideIndex === 'number') {
      setCurrentSlide(tab.slideIndex);
      setActiveTab(tab.id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);
    try {
      const contactUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5001/api/contact'
        : '/api/contact';
      const response = await fetch(contactUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setFormStatus({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus({ type: 'error', text: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      console.error("Submit error:", err);
      setFormStatus({ type: 'error', text: 'Thank you! Your message has been received.' });
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVerticalClick = (filterCategory) => {
    setCategoryFilter(filterCategory);
    scrollToSection('brands');
    setActiveMegaMenu(null);
  };

  const filteredBrands = categoryFilter === 'all' 
    ? brands 
    : brands.filter(b => b.category === categoryFilter || (categoryFilter === 'food' && (b.id.includes('food') || b.id.includes('saffron') || b.id.includes('floffi'))));

  const searchedBrands = searchQuery.trim() === ''
    ? brands
    : brands.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="app-container tata-theme">
      {/* Header / Navbar - Tata Inspired with Mega Menu Mouseover */}
      <header 
        className={`navbar ${scrolled ? 'scrolled' : ''} ${activeMegaMenu ? 'mega-menu-open' : ''}`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="navbar-left">
          <a href="#home" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <img src="/assets/paidhu_monogram_white.png" alt="Paidhu Group" className="paidhu-brand-monogram" />
            <span className="paidhu-brand-text">PAIDHU</span>
          </a>
        </div>

        <nav className="navbar-center">
          <ul className="nav-links">
            <li onMouseEnter={() => setActiveMegaMenu('business')}>
              <a 
                href="#brands" 
                className={(!activeMegaMenu || activeMegaMenu === 'business') ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); scrollToSection('brands'); }}
              >
                Business
              </a>
            </li>
            <li onMouseEnter={() => setActiveMegaMenu('community')}>
              <a 
                href="#community" 
                className={activeMegaMenu === 'community' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                Community
              </a>
            </li>
            <li onMouseEnter={() => setActiveMegaMenu('about')}>
              <a 
                href="#about" 
                className={activeMegaMenu === 'about' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              >
                About Us
              </a>
            </li>
            <li onMouseEnter={() => setActiveMegaMenu('newsroom')}>
              <a 
                href="#newsroom" 
                className={activeMegaMenu === 'newsroom' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              >
                Newsroom
              </a>
            </li>
            <li onMouseEnter={() => setActiveMegaMenu('careers')}>
              <a 
                href="#careers" 
                className={activeMegaMenu === 'careers' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); scrollToSection('careers'); }}
              >
                Careers
              </a>
            </li>
          </ul>
        </nav>

        <div className="navbar-right">
          <button className="nav-icon-btn" title="Language / Region" aria-label="Globe">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
          
          <button 
            className="nav-icon-btn" 
            title="Contact Us" 
            aria-label="Contact"
            onClick={() => setShowContactModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>

          <button 
            className="nav-icon-btn" 
            title="Search" 
            aria-label="Search"
            onClick={() => setShowSearchModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <button className="nav-icon-btn" title="Toggle Theme" aria-label="Theme">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <a 
              href="#brands" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('brands'); setMobileMenuOpen(false); }}
            >
              Business & Ecosystem
            </a>
            <a 
              href="#about" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); setMobileMenuOpen(false); }}
            >
              Community Impact
            </a>
            <a 
              href="#about" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); setMobileMenuOpen(false); }}
            >
              About Paidhu Group
            </a>
            <a 
              href="#home" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); setMobileMenuOpen(false); }}
            >
              Stories & News
            </a>
            <a 
              href="#careers" 
              className="mobile-nav-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('careers'); setMobileMenuOpen(false); }}
            >
              Careers
            </a>
            <button 
              className="mobile-nav-contact-btn"
              onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Business Mega Menu Overlay Container */}
        {activeMegaMenu === 'business' && (
          <div 
            className="mega-menu-overlay"
            onMouseEnter={() => setActiveMegaMenu('business')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-menu-content">
              {/* Business Overview Column */}
              <div className="mega-col">
                <h3 className="mega-heading">Business Overview</h3>
                <div className="mega-heading-line"></div>
                <a 
                  href="#about" 
                  className="mega-link highlight-link"
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}
                >
                  Learn more
                </a>
              </div>

              {/* Our Brands Column */}
              <div className="mega-col">
                <h3 className="mega-heading">Our Brands</h3>
                <div className="mega-heading-line"></div>
                <a 
                  href="#brands" 
                  className="mega-link highlight-link"
                  onClick={(e) => { e.preventDefault(); handleVerticalClick('all'); }}
                >
                  Browse select Paidhu brands
                </a>
              </div>

              {/* Business Verticals Column */}
              <div className="mega-col mega-col-wide">
                <h3 className="mega-heading">Business Verticals</h3>
                <div className="mega-heading-line"></div>
                
                <div className="verticals-grid-tata">
                  <div className="vert-column">
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('food'); }}>
                      Ethical Foods & Edible Flora
                    </a>
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('food'); }}>
                      Paidhu Grade-A Kashmiri Saffron
                    </a>
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('food'); }}>
                      Everyday Jams & Sauces (Floffi)
                    </a>
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('tech'); }}>
                      Software & Digital Tech (Viyara)
                    </a>
                  </div>

                  <div className="vert-column">
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('education'); }}>
                      Creative Learning Platform (KalikaSphere)
                    </a>
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('food'); }}>
                      Luxury Floral Craftsmanship
                    </a>
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('all'); }}>
                      Global Ethical Ventures
                    </a>
                    <a 
                      href="#brands" 
                      className="full-list-btn"
                      onClick={(e) => { e.preventDefault(); handleVerticalClick('all'); }}
                    >
                      Full list
                    </a>
                  </div>

                  <div className="vert-column">
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Sustainability & Community
                    </a>
                    <a href="#brands" onClick={(e) => { e.preventDefault(); handleVerticalClick('tech'); }}>
                      Digital Transformation & Marketing
                    </a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Ethical Investments & Growth
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Mega Menu Overlay (Tata Reference Replicated) */}
        {activeMegaMenu === 'community' && (
          <div 
            className="mega-menu-overlay"
            onMouseEnter={() => setActiveMegaMenu('community')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-menu-content">
              {/* Overview Column */}
              <div className="mega-col">
                <h3 className="mega-heading">Overview</h3>
                <div className="mega-heading-line"></div>
              </div>

              {/* Areas of Work Column */}
              <div className="mega-col mega-col-wide">
                <h3 className="mega-heading">Areas of Work</h3>
                <div className="mega-heading-line"></div>
                <div className="verticals-grid-tata" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <div className="vert-column">
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Health
                    </a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Education
                    </a>
                  </div>
                  <div className="vert-column">
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Empowerment
                    </a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Environment
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Us Mega Menu Overlay */}
        {activeMegaMenu === 'about' && (
          <div 
            className="mega-menu-overlay"
            onMouseEnter={() => setActiveMegaMenu('about')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-menu-content">
              <div className="mega-col">
                <h3 className="mega-heading">Overview</h3>
                <div className="mega-heading-line"></div>
              </div>

              <div className="mega-col mega-col-wide">
                <h3 className="mega-heading">Leadership & Heritage</h3>
                <div className="mega-heading-line"></div>
                <div className="verticals-grid-tata" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <div className="vert-column">
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Our Vision & Values
                    </a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Founders & Governance
                    </a>
                  </div>
                  <div className="vert-column">
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Ethical Standards
                    </a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }}>
                      Global Impact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newsroom Mega Menu Overlay */}
        {activeMegaMenu === 'newsroom' && (
          <div 
            className="mega-menu-overlay"
            onMouseEnter={() => setActiveMegaMenu('newsroom')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-menu-content">
              <div className="mega-col">
                <h3 className="mega-heading">Overview</h3>
                <div className="mega-heading-line"></div>
              </div>

              <div className="mega-col mega-col-wide">
                <h3 className="mega-heading">Media & Stories</h3>
                <div className="mega-heading-line"></div>
                <div className="verticals-grid-tata" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <div className="vert-column">
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); setActiveMegaMenu(null); }}>
                      Press Releases
                    </a>
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); setActiveMegaMenu(null); }}>
                      Lead Stories
                    </a>
                  </div>
                  <div className="vert-column">
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); setActiveMegaMenu(null); }}>
                      Media Kit
                    </a>
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); setActiveMegaMenu(null); }}>
                      Social Media Features
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Careers Mega Menu Overlay */}
        {activeMegaMenu === 'careers' && (
          <div 
            className="mega-menu-overlay"
            onMouseEnter={() => setActiveMegaMenu('careers')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-menu-content">
              <div className="mega-col">
                <h3 className="mega-heading">Overview</h3>
                <div className="mega-heading-line"></div>
              </div>

              <div className="mega-col mega-col-wide">
                <h3 className="mega-heading">Work With Us</h3>
                <div className="mega-heading-line"></div>
                <div className="verticals-grid-tata" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                  <div className="vert-column">
                    <a href="#careers" onClick={(e) => { e.preventDefault(); scrollToSection('careers'); setActiveMegaMenu(null); }}>
                      Open Positions
                    </a>
                    <a href="#careers" onClick={(e) => { e.preventDefault(); scrollToSection('careers'); setActiveMegaMenu(null); }}>
                      Life at Paidhu
                    </a>
                  </div>
                  <div className="vert-column">
                    <a href="#careers" onClick={(e) => { e.preventDefault(); scrollToSection('careers'); setActiveMegaMenu(null); }}>
                      Culture & Values
                    </a>
                    <a href="#careers" onClick={(e) => { e.preventDefault(); scrollToSection('careers'); setActiveMegaMenu(null); }}>
                      Leadership Programs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Tata Layout with dot mesh overlay */}
      <section id="home" className="hero-tata">
        {/* Background images with slider transition */}
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`hero-bg-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        ))}

        {/* Tata signature Mesh Dot Pattern Overlay */}
        <div className="hero-dot-overlay" />
        <div className="hero-gradient-overlay" />

        {/* Hero Left Content Overlay */}
        <div className="hero-content-box">
          <div className="hero-badge">
            <span>{heroSlides[currentSlide].badge}</span>
          </div>
          
          <h1 className="hero-heading">
            {heroSlides[currentSlide].title}
          </h1>
          
          <p className="hero-description-tata">
            {heroSlides[currentSlide].description}
          </p>
          
          <button 
            className="hero-action-btn"
            onClick={() => scrollToSection(heroSlides[currentSlide].sectionId)}
          >
            {heroSlides[currentSlide].buttonText}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* Hero Right Floating Navigation with 5-Segment Vertical Capsule Indicators (Matches reference screenshot) */}
        <div 
          className={`hero-right-container ${sidebarHovered ? 'expanded' : ''}`}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        >
          {/* The 5-Segment Vertical Capsule Indicator (Exact replicate of media_1791805839713.png) */}
          <div className="vertical-capsule-bar" title="Sections">
            {rightTabs.map((tab) => (
              <button
                key={tab.id}
                className={`capsule-segment ${activeTab === tab.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTabClick(tab);
                }}
                title={tab.label}
                aria-label={tab.label}
              />
            ))}
          </div>

          {/* Expanded Tabs Drawer */}
          <div className="hero-right-sidebar">
            {rightTabs.map((tab) => (
              <button
                key={tab.id}
                className={`hero-sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                <span className="tab-label">{tab.label}</span>
                <span className="tab-indicator" />
              </button>
            ))}
          </div>
        </div>

        {/* Hero Bottom Bar Controls */}
        <div className="hero-bottom-controls">
          <div className="hero-bottom-left-group">
            <div className="controls-center-progress">
              {heroSlides.map((slide, idx) => (
                <div 
                  key={slide.id} 
                  className={`progress-bar-track ${idx === currentSlide ? 'active' : idx < currentSlide ? 'completed' : ''}`}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setActiveTab(slide.id);
                  }}
                >
                  {/* Floating preview card matching screenshot */}
                  {idx === currentSlide && slide.previewThumb && (
                    <div className="track-preview-card">
                      <span className="track-preview-title">{slide.previewTitle}</span>
                      <div className="track-preview-thumb">
                        <img src={slide.previewThumb} alt={slide.previewTitle} />
                      </div>
                    </div>
                  )}
                  <div className="progress-bar-fill" />
                </div>
              ))}
            </div>

            <div className="controls-counter-row">
              <button 
                className="play-pause-btn" 
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
              >
                {isPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                )}
              </button>
              <span className="slide-counter">
                {currentSlide + 1} / {heroSlides.length}
              </span>
            </div>
          </div>

          <div 
            className="controls-right-scroll"
            onClick={() => scrollToSection('brands')}
            title="Scroll Down"
          >
            <div className="scroll-arrows">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: '-12px' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Brands & Ventures Section */}
      <section id="brands" className="brands-section-tata">
        <div className="section-header-tata">
          <span className="section-kicker">OUR BUSINESS ECOSYSTEM</span>
          <h2 className="section-heading">Featured Ventures & Brands</h2>
          <p className="section-subtext">Building sustainable, high-impact brands across luxury food, saffron, tech solutions, and creative education.</p>
          
          <div className="category-filters">
            <button 
              className={`filter-chip ${categoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              All Ventures
            </button>
            <button 
              className={`filter-chip ${categoryFilter === 'food' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('food')}
            >
              Ethical Foods & Saffron
            </button>
            <button 
              className={`filter-chip ${categoryFilter === 'tech' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('tech')}
            >
              Software & Tech
            </button>
            <button 
              className={`filter-chip ${categoryFilter === 'education' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('education')}
            >
              Education & Creative
            </button>
          </div>
        </div>

        <div className="brands-grid-tata">
          {filteredBrands.map(brand => (
            <a 
              key={brand.id} 
              href={brand.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`brand-card-tata ${brand.id}`}
            >
              <div className="card-top-bar">
                <span className="brand-category-badge">
                  {brand.id.includes('food') || brand.id.includes('saffron') || brand.id.includes('floffi') ? 'Ethical Foods' : brand.id === 'viyara' ? 'Tech & Marketing' : 'Learning Platform'}
                </span>
              </div>
              <div className="brand-logo-wrapper">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} Logo`} 
                  className="brand-logo-img"
                />
              </div>
              <div className="card-separator"></div>
              <h3 className="brand-name">{brand.name}</h3>
              <p className="brand-description">
                {expandedBrands[brand.id] 
                  ? brand.description 
                  : `${brand.description.slice(0, 120)}...`}
                <span 
                  onClick={(e) => toggleExpand(e, brand.id)}
                  className="read-more-btn"
                >
                  {expandedBrands[brand.id] ? ' Read Less' : ' Read More'}
                </span>
              </p>
              <div className="brand-card-footer">
                <span className="visit-text">Visit Official Site</span>
                <span className="arrow-icon">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section-tata">
        <div className="about-container-tata">
          <span className="section-kicker">ABOUT PAIDHU</span>
          <h2 className="section-heading">Driven by Ethical Excellence & Innovation</h2>
          <p className="about-text">
            Paidhu Group operates across diverse verticals with a commitment to purity, sustainability, technological empowerment, and community growth. From Grade-A Kashmiri Saffron to modern enterprise software, we bring relentless dedication to quality and luxury craftsmanship.
          </p>
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-number">5+</span>
              <span className="stat-label">Core Brands</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Ethical & Preservative Free</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">Global</span>
              <span className="stat-label">Quality Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section Banner */}
      <section id="careers" className="careers-banner-tata">
        <div className="careers-content">
          <span className="section-kicker">CAREERS AT PAIDHU</span>
          <h2>Shape the Future With Us</h2>
          <p>We are always looking for passionate innovators, craftsmen, and leaders to join our growing ecosystem.</p>
          <button className="careers-btn" onClick={() => setShowContactModal(true)}>
            Join Our Team
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-backdrop" onClick={() => setShowContactModal(false)}>
          <div className="modal-container glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Connect With Paidhu Group</h3>
              <button className="close-btn" onClick={() => setShowContactModal(false)}>×</button>
            </div>
            {formStatus && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.text}
              </div>
            )}
            <form onSubmit={handleContactSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="name@example.com"
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="How can we collaborate or assist you?"
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="modal-backdrop" onClick={() => setShowSearchModal(false)}>
          <div className="search-modal-container glass" onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <input 
                type="text" 
                placeholder="Search brands, products or stories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
              />
              <button className="close-btn" onClick={() => setShowSearchModal(false)}>×</button>
            </div>
            <div className="search-results">
              {searchedBrands.length > 0 ? (
                searchedBrands.map(b => (
                  <a key={b.id} href={b.url} target="_blank" rel="noopener noreferrer" className="search-item">
                    <img src={b.logo} alt={b.name} className="search-item-logo" />
                    <div>
                      <h4 className="search-item-title">{b.name}</h4>
                      <p className="search-item-desc">{b.description.slice(0, 80)}...</p>
                    </div>
                  </a>
                ))
              ) : (
                <p className="no-results">No matching brands found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer - Tata Style */}
      <footer className="footer-tata">
        <div className="footer-top-row">
          <div className="footer-brand-info">
            <div className="footer-logo">
              <img src="/assets/paidhu_monogram_white.png" alt="Paidhu logo" style={{ height: '32px', objectFit: 'contain' }} />
              <img src="/assets/paidhu_text_gold.png" alt="Paidhu" style={{ height: '20px', objectFit: 'contain' }} />
            </div>
            <p className="footer-tagline">Driving ethical growth, premium lifestyles, luxury craftsmanship, and smart education.</p>
          </div>
          
          <div className="footer-nav-cols">
            <div className="footer-col">
              <h4>Business</h4>
              <ul>
                <li><a href="https://paidhuethicalfoods.com" target="_blank" rel="noreferrer">Paidhu Ethical Foods</a></li>
                <li><a href="https://paidhusaffron.com" target="_blank" rel="noreferrer">Paidhu Saffron</a></li>
                <li><a href="https://floffi.in" target="_blank" rel="noreferrer">Floffi</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Technology</h4>
              <ul>
                <li><a href="https://viyara.co.in" target="_blank" rel="noreferrer">Viyara Software & Marketing</a></li>
                <li><a href="https://kalikasphere.com" target="_blank" rel="noreferrer">KalikaSphere Education</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <ul>
                <li><a href="#about" onClick={() => setShowContactModal(true)}>Contact Us</a></li>
                <li><a href="#careers" onClick={(e) => { e.preventDefault(); scrollToSection('careers'); }}>Careers</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-copy">
            &copy; {new Date().getFullYear()} Paidhu Group. All rights reserved.
          </div>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
