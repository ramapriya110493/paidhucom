import React, { useState, useEffect } from 'react';

function App() {
  const [brands, setBrands] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState({});
  
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('purity');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mega Menu Hover State
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  
  // Modals & Navigation State
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Innovation & Future Labs State
  const [activeInnovationTab, setActiveInnovationTab] = useState(0);

  const innovationLabs = [
    {
      id: 'botanical',
      num: '01',
      tabLabel: 'Botanical Bio-Science',
      kicker: 'BIO-EXTRACTION & MOLECULAR BOTANY',
      title: 'Advanced Saffron Crocin Extraction & Botanical Science',
      subtitle: 'Pure Kashmiri Grade-A Molecular Isolation',
      desc: 'At the Paidhu Botanical Research Institute in Srinagar, our scientists have engineered clean cold-press bio-extraction methods that preserve delicate carotenoids, safranal, and crocin without chemical solvents. The result is 100% active botanical potency certified for international high-end wellness and ethical luxury applications.',
      image: '/assets/hero_saffron.jpg',
      metrics: [
        { label: 'Crocin Purity Rating', value: 'Grade-A 280+' },
        { label: 'Synthetic Additives', value: '0.0%' },
        { label: 'Ethical Valley Yield', value: '100% Organic' }
      ],
      highlights: [
        'Supercritical cold-temperature stabilization preserving volatile aroma compounds',
        'Direct farmer-level botanical traceability with verified origin certification',
        'Zero heat degradation safeguarding antioxidant polyphenol density'
      ],
      linkText: 'Explore Saffron Science',
      linkUrl: 'https://paidhusaffron.com'
    },
    {
      id: 'culinary',
      num: '02',
      tabLabel: 'Culinary Food Lab',
      kicker: 'ARTISANAL CONFECTIONERY & FLORAL FOODS',
      title: 'Floffi Clean Culinary Food Labs',
      subtitle: 'Micro-Infused Edible Flora & Preservative-Free Gastronomy',
      desc: 'Floffi Labs bridges artisanal European confectionery traditions with ancient Kashmiri floral wisdom. We pioneer molecular encapsulation of fresh organic Damask Rose, Calendula, and Blue Pea blossoms into shelf-stable luxury confections and petal confitures without artificial colors, preservatives, or chemical emulsifiers.',
      image: '/assets/hero_flower_food.jpg',
      metrics: [
        { label: 'Edible Flora Varieties', value: '18+ Handpicked' },
        { label: 'Artificial Preservatives', value: 'Zero (0.0%)' },
        { label: 'Shelf-Life Stability', value: '100% Natural' }
      ],
      highlights: [
        'Proprietary cold-crystallization preserving vibrant natural flower pigmentation',
        'Zero hydrogenated fats—pure A2 clarified butter and unrefined raw sweetness',
        'Clinical food-grade hygiene tested to exceed international food safety benchmarks'
      ],
      linkText: 'Discover Floffi Culinary Arts',
      linkUrl: 'https://paidhuethicalfoods.com'
    },
    {
      id: 'digital',
      num: '03',
      tabLabel: 'Creative Digital & AI',
      kicker: 'CREATIVE EDUCATION & DIGITAL ECOSYSTEMS',
      title: 'KalikaSphere & VIYARA Enterprise Tech',
      subtitle: 'Decentralized Innovation & Next-Gen Collaborative Learning',
      desc: 'KalikaSphere Labs engineers transformative learning platforms and enterprise digital architectures. We combine immersive design thinking with high-performance cloud frameworks, enabling ambitious students, creative professionals, and scalable enterprises to lead in an AI-accelerated global economy.',
      image: '/assets/hero_tech.jpg',
      metrics: [
        { label: 'Learners Empowered', value: '10,000+' },
        { label: 'Enterprise Uptime', value: '99.99%' },
        { label: 'Global Client Growth', value: '3.4x ARR' }
      ],
      highlights: [
        'Modular learning ecosystems integrating practical creative workshops & industry mentorship',
        'Next-gen digital infrastructure powered by scalable edge architecture via VIYARA',
        'Human-centric design frameworks bridging creative culture with enterprise scalability'
      ],
      linkText: 'Explore KalikaSphere',
      linkUrl: 'https://kalikasphere.com'
    }
  ];

  // News & Dispatches State
  const [featuredNewsSlide, setFeaturedNewsSlide] = useState(0);
  const [companyNewsIndex, setCompanyNewsIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  const featuredStories = [
    {
      image: '/assets/hero_flower_food.jpg',
      tag: 'PRESS RELEASE',
      title: 'Paidhu Expands Organic Edible Flower Cultivation & Global Saffron Distribution',
      summary: 'The strategic expansion marks an ethical milestone in organic culinary wellness, connecting handpicked botanicals with international fine-dining and wellness connoisseurs.',
      link: 'https://paidhuethicalfoods.com'
    },
    {
      image: '/assets/hero_saffron.jpg',
      tag: 'GLOBAL CERTIFICATION',
      title: 'Paidhu Saffron Achieves 100% Grade-A Mongra International Purity Benchmark',
      summary: 'Independent botanical laboratory testing confirms record crocin levels, deep crimson color, and authentic aroma direct from the Kashmir valley.',
      link: 'https://paidhusaffron.com'
    },
    {
      image: '/assets/hero_tech.jpg',
      tag: 'ENTERPRISE MILESTONE',
      title: 'VIYARA Launches Scalable Next-Gen Enterprise Cloud & Marketing Infrastructure',
      summary: 'Deploying high-performance digital transformation platforms, predictive analytics, and enterprise web solutions that accelerate measurable business growth.',
      link: 'https://viyara.co.in'
    }
  ];

  const companyDispatches = [
    {
      category: 'COMPANY NEWS',
      entity: 'Paidhu Saffron',
      headline: 'Paidhu Saffron breaks ground on climate-controlled artisanal processing center in Kashmir, boosting pure Grade-A Mongra export',
      date: '28 Oct 2026',
      link: 'https://paidhusaffron.com'
    },
    {
      category: 'COMPANY NEWS',
      entity: 'Floffi Gourmet',
      headline: 'Floffi introduces new collection of handcrafted floral preserves and artisanal pantry essentials crafted without artificial pectin',
      date: '25 Oct 2026',
      link: 'https://floffi.in'
    },
    {
      category: 'COMPANY NEWS',
      entity: 'KalikaSphere',
      headline: 'KalikaSphere partners with premier creative design studios to mentor next-generation digital creators and software innovators',
      date: '22 Oct 2026',
      link: 'https://kalikasphere.com'
    }
  ];

  const paidhuFacts = [
    {
      title: 'Did you know',
      fact: "Paidhu's edible flower cookies and petal jams are 100% preservative-free, utilizing organic damask rose, calendula, and blue pea botanicals.",
      footnote: 'The Standard of Purity'
    },
    {
      title: 'Did you know',
      fact: 'Grade-A Mongra Saffron consists exclusively of the deep-crimson stigmas, requiring over 150,000 handpicked flowers for a single kilogram.',
      footnote: 'Royal Kashmiri Heritage'
    },
    {
      title: 'Did you know',
      fact: "VIYARA's cloud architectures power high-frequency transactional platforms with guaranteed 99.99% operational uptime.",
      footnote: 'Engineering Excellence'
    }
  ];

  const cycleCompanyNews = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCompanyNewsIndex(prev => (prev + 1) % companyDispatches.length);
  };

  const cycleFact = () => {
    setFactIndex(prev => (prev + 1) % paidhuFacts.length);
  };

  const heroSlides = [
    {
      id: 'purity',
      badge: 'PAIDHU ECOSYSTEM · HERITAGE',
      title: 'Crafting Purity. Defining Luxury.',
      subtitle: 'Pioneering ethical excellence across organic edible botanicals, grade-A Kashmiri saffron, enterprise software, and creative innovation.',
      buttonText: 'Explore Ecosystem',
      secondaryText: 'Our Philosophy',
      bgImage: '/assets/paidhu_hero_luxury.jpg',
      sectionId: 'brands',
      secondarySectionId: 'philosophy',
      metrics: ['100% Certified Organic', 'Grade-A Mongra Kashmir Saffron', '4 Global Verticals']
    },
    {
      id: 'food',
      badge: 'FLORAL GASTRONOMY',
      title: 'The Art of Edible Botanicals. Handcrafted Daily.',
      subtitle: 'Handcrafted Bloom Cookies, petal-infused jams, and flower teas created with 100% natural, preservative-free ingredients for daily wellness.',
      buttonText: 'Discover Floral Foods',
      secondaryText: 'View Brand',
      bgImage: '/assets/hero_flower_food.jpg',
      sectionId: 'brands',
      secondarySectionId: 'brands',
      metrics: ['Zero Additives', 'Handcrafted Bloom Cookies', 'Organic Petal Infusions']
    },
    {
      id: 'saffron',
      badge: 'GRADE-A KASHMIRI SAFFRON',
      title: 'The Crimson Gold of Kashmir. Pure Harvest.',
      subtitle: 'Ethically handpicked Grade-A Mongra Kashmiri Saffron delivering authentic aroma, vibrant natural color, and unmatched culinary purity.',
      buttonText: 'Discover Paidhu Saffron',
      secondaryText: 'Purity Standards',
      bgImage: '/assets/hero_saffron.jpg',
      sectionId: 'brands',
      secondarySectionId: 'philosophy',
      metrics: ['Grade-A Mongra Certified', '280+ High Crocin Reading', 'Pampore Valley Origin']
    },
    {
      id: 'tech',
      badge: 'ENTERPRISE TECH & DIGITAL',
      title: 'Next-Gen Transformation. Scalable Architecture.',
      subtitle: 'VIYARA delivers scalable enterprise software, cloud infrastructure, and data-driven marketing to power modern business success.',
      buttonText: 'Discover Viyara Tech',
      secondaryText: 'Solutions',
      bgImage: '/assets/hero_tech.jpg',
      sectionId: 'brands',
      secondarySectionId: 'brands',
      metrics: ['Enterprise Architecture', 'Cloud Infrastructure', 'Data & AI Strategies']
    },
    {
      id: 'education',
      badge: 'CREATIVE LEARNING PLATFORM',
      title: 'Empowering Creators. Shaping Tomorrow.',
      subtitle: 'KalikaSphere bridges creativity, innovation, and digital learning through hands-on workshops and collaborative community programs.',
      buttonText: 'Explore KalikaSphere',
      secondaryText: 'Programs',
      bgImage: '/assets/hero_education.jpg',
      sectionId: 'brands',
      secondarySectionId: 'brands',
      metrics: ['10,000+ Learners Guided', 'Design Thinking Workshops', 'Collaborative Innovation Labs']
    }
  ];

  const rightTabs = [
    { id: 'purity', label: 'Overview', slideIndex: 0 },
    { id: 'food', label: 'Floral Foods', slideIndex: 1 },
    { id: 'saffron', label: 'Pure Saffron', slideIndex: 2 },
    { id: 'tech', label: 'Technology', slideIndex: 3 },
    { id: 'education', label: 'Education', slideIndex: 4 }
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
            tagline: 'The Edible Flower Co.',
            description: "Paidhu – The Edible Flower Co. offers premium edible flower-based foods, including Bloom Cookies, Petal Jams, Medley Teas, Brew Flora, and Saffron, crafted with natural ingredients. We are committed to healthy, preservative-free, and ethically made products that bring wellness and floral goodness to everyday life.",
            url: 'https://paidhuethicalfoods.com',
            logo: '/assets/paidhu_official_logo.png'
          },
          {
            id: 'paidhusaffron',
            name: 'Paidhu Saffron',
            category: 'food',
            tagline: 'Grade-A Kashmiri Mongra Saffron',
            description: "Paidhu Saffron offers the world's finest, ethically sourced grade-A Kashmiri Saffron, handpicked for its rich aroma, deep crimson color, and unparalleled purity. We are committed to delivering authentic, premium saffron that brings natural wellness, gourmet flavor, and exquisite quality to everyday life.",
            url: 'https://paidhusaffron.com',
            logo: '/assets/paidhu_saffron_logo.png'
          },
          {
            id: 'floffi',
            name: 'Floffi',
            category: 'food',
            tagline: 'Artisanal Pantry & Spreads',
            description: "Floffi offers a delightful range of jams, sauces, spreads, and everyday food products made with carefully selected quality ingredients. We are committed to delivering great taste, freshness, and trusted quality in every product for you and your family.",
            url: 'https://floffi.in',
            logo: '/assets/fluffy_logo.png'
          },
          {
            id: 'viyara',
            name: 'Viyara',
            category: 'tech',
            tagline: 'Software & Growth Marketing',
            description: "VIYARA is a tech-enabled software and marketing agency helping businesses grow through innovative technology and data-driven strategies. We deliver scalable software, impactful digital experiences, and performance-focused marketing solutions that drive growth, improve efficiency, and create lasting business success.",
            url: 'https://viyara.co.in',
            logo: '/assets/viyara_logo.png'
          },
          {
            id: 'kalikasphere',
            name: 'KalikaSphere',
            category: 'education',
            tagline: 'Creative Innovation & Learning',
            description: "Kalikasphere is a creative learning and innovation platform focused on empowering individuals and businesses through education, creativity, technology, and community-driven experiences. We provide workshops, digital solutions, strategic consulting, and innovative programs that inspire growth, collaboration, and lifelong learning.",
            url: 'https://kalikasphere.com',
            logo: '/assets/collegebear_logo.png'
          }
        ]);
      });

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

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setActiveTab(heroSlides[index].id);
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % heroSlides.length;
    handleSlideChange(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    handleSlideChange(prev);
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
    <div className="paidhu-luxury-app">
      {/* Top Navbar */}
      <header 
        className={`paidhu-navbar ${scrolled ? 'scrolled' : ''} ${activeMegaMenu ? 'mega-open' : ''}`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="navbar-inner">
          <div className="navbar-brand-col">
            <a href="#home" className="brand-link" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
              <img src="/assets/paidhu_official_logo.png" alt="Paidhu Group" className="paidhu-brand-logo" />
            </a>
          </div>

          <nav className="navbar-nav-links">
            <ul className="nav-menu">
              <li onMouseEnter={() => setActiveMegaMenu('ventures')}>
                <a 
                  href="#brands" 
                  className={activeMegaMenu === 'ventures' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); scrollToSection('brands'); }}
                >
                  Ventures
                  <span className="gold-indicator" />
                </a>
              </li>
              <li onMouseEnter={() => setActiveMegaMenu('innovation')}>
                <a 
                  href="#innovation" 
                  className={activeMegaMenu === 'innovation' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); scrollToSection('innovation'); }}
                >
                  Innovation
                  <span className="gold-indicator" />
                </a>
              </li>
              <li onMouseEnter={() => setActiveMegaMenu('news')}>
                <a 
                  href="#news" 
                  className={activeMegaMenu === 'news' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); scrollToSection('news'); }}
                >
                  Newsroom
                  <span className="gold-indicator" />
                </a>
              </li>
              <li onMouseEnter={() => setActiveMegaMenu('philosophy')}>
                <a 
                  href="#philosophy" 
                  className={activeMegaMenu === 'philosophy' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}
                >
                  Philosophy
                  <span className="gold-indicator" />
                </a>
              </li>
              <li onMouseEnter={() => setActiveMegaMenu('about')}>
                <a 
                  href="#about" 
                  className={activeMegaMenu === 'about' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                >
                  About Paidhu
                  <span className="gold-indicator" />
                </a>
              </li>
              <li onMouseEnter={() => setActiveMegaMenu('careers')}>
                <a 
                  href="#careers" 
                  className={activeMegaMenu === 'careers' ? 'active' : ''} 
                  onClick={(e) => { e.preventDefault(); scrollToSection('careers'); }}
                >
                  Careers
                  <span className="gold-indicator" />
                </a>
              </li>
            </ul>
          </nav>

          <div className="navbar-actions">
            <button 
              className="action-icon-btn" 
              title="Search brands or stories" 
              aria-label="Search"
              onClick={() => setShowSearchModal(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            <button 
              className="action-icon-btn" 
              title="Contact Paidhu" 
              aria-label="Contact"
              onClick={() => setShowContactModal(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </button>

            <button 
              className="navbar-connect-btn"
              onClick={() => setShowContactModal(true)}
            >
              Connect
            </button>

            {/* Mobile Toggle */}
            <button 
              className="mobile-hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`paidhu-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-links-container">
            <a 
              href="#brands" 
              className="mobile-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('brands'); setMobileMenuOpen(false); }}
            >
              Our Ventures
            </a>
            <a 
              href="#innovation" 
              className="mobile-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('innovation'); setMobileMenuOpen(false); }}
            >
              Innovation Labs
            </a>
            <a 
              href="#news" 
              className="mobile-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('news'); setMobileMenuOpen(false); }}
            >
              In the News
            </a>
            <a 
              href="#philosophy" 
              className="mobile-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); setMobileMenuOpen(false); }}
            >
              The Paidhu Philosophy
            </a>
            <a 
              href="#about" 
              className="mobile-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); setMobileMenuOpen(false); }}
            >
              About Paidhu Group
            </a>
            <a 
              href="#careers" 
              className="mobile-link"
              onClick={(e) => { e.preventDefault(); scrollToSection('careers'); setMobileMenuOpen(false); }}
            >
              Careers & Culture
            </a>
            <button 
              className="mobile-drawer-btn"
              onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }}
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Ventures Mega Menu (2026 Luxury Conglomerate UI) */}
        {activeMegaMenu === 'ventures' && (
          <div 
            className="paidhu-mega-dropdown"
            onMouseEnter={() => setActiveMegaMenu('ventures')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-dropdown-grid">
              {/* Column 1: Gastronomy */}
              <div className="mega-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-badge">
                    <span className="pillar-glyph">✦</span>
                    <span className="pillar-tag">GASTRONOMY</span>
                  </div>
                  <h4>Floral & Ethical Foods</h4>
                  <p className="pillar-desc">Artisanal edible petals, herbal teas, and Kashmir Mongra saffron.</p>
                </div>
                <div className="pillar-links-list">
                  <a href="#brands" className="pillar-link-item" onClick={(e) => { e.preventDefault(); handleVerticalClick('food'); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Paidhu Floral Confections</span>
                      <span className="link-subtitle">Bloom cookies & edible petal infusions</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                  <a href="#brands" className="pillar-link-item" onClick={(e) => { e.preventDefault(); handleVerticalClick('food'); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Grade-A Kashmiri Saffron</span>
                      <span className="link-subtitle">Certified 280+ Crocin natural potency</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                  <a href="#brands" className="pillar-link-item" onClick={(e) => { e.preventDefault(); handleVerticalClick('food'); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Floffi Artisanal Spreads</span>
                      <span className="link-subtitle">100% preservative-free gourmet petal jams</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                </div>
              </div>

              {/* Column 2: Technology */}
              <div className="mega-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-badge">
                    <span className="pillar-glyph">⚡</span>
                    <span className="pillar-tag">TECHNOLOGY</span>
                  </div>
                  <h4>Software & Digital Growth</h4>
                  <p className="pillar-desc">Scalable cloud architectures and enterprise software platforms.</p>
                </div>
                <div className="pillar-links-list">
                  <a href="#brands" className="pillar-link-item" onClick={(e) => { e.preventDefault(); handleVerticalClick('tech'); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">VIYARA Software Platform</span>
                      <span className="link-subtitle">Modern high-throughput SaaS engines</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                  <a href="#brands" className="pillar-link-item" onClick={(e) => { e.preventDefault(); handleVerticalClick('tech'); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Enterprise Cloud & Data</span>
                      <span className="link-subtitle">AI-driven marketing & secure infrastructure</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                </div>
              </div>

              {/* Column 3: Education */}
              <div className="mega-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-badge">
                    <span className="pillar-glyph">◈</span>
                    <span className="pillar-tag">EDUCATION</span>
                  </div>
                  <h4>Creative & Tech Academy</h4>
                  <p className="pillar-desc">Empowering next-generation builders through interactive learning.</p>
                </div>
                <div className="pillar-links-list">
                  <a href="#brands" className="pillar-link-item" onClick={(e) => { e.preventDefault(); handleVerticalClick('education'); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">KalikaSphere Learning Hub</span>
                      <span className="link-subtitle">Creative design & technology workshops</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                  <a href="#brands" className="pillar-link-item" onClick={(e) => { e.preventDefault(); handleVerticalClick('education'); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Mentorship & Community</span>
                      <span className="link-subtitle">Cohort-based learning & industry skills</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                </div>
              </div>

              {/* Column 4: Conglomerate Showcase Card */}
              <div className="mega-pillar-card mega-portfolio-spotlight">
                <div className="portfolio-spotlight-content">
                  <div className="spotlight-badge">
                    <span className="spotlight-spark">✦</span>
                    <span>PAIDHU PORTFOLIO</span>
                  </div>
                  <h4 className="spotlight-title">Curated Conglomerate</h4>
                  <p className="spotlight-desc">Uncompromising excellence across gourmet botanicals, deep cloud tech, and creative education.</p>
                  
                  <div className="spotlight-meta-tags">
                    <span className="spotlight-tag">4 Verticals</span>
                    <span className="spotlight-tag">100% Ethical</span>
                    <span className="spotlight-tag">Grade-A Certified</span>
                  </div>

                  <a 
                    href="#brands" 
                    className="spotlight-cta-btn"
                    onClick={(e) => { e.preventDefault(); handleVerticalClick('all'); setActiveMegaMenu(null); }}
                  >
                    <span>View All Ventures</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Innovation Mega Menu */}
        {activeMegaMenu === 'innovation' && (
          <div 
            className="paidhu-mega-dropdown"
            onMouseEnter={() => setActiveMegaMenu('innovation')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-dropdown-grid simple">
              <div className="mega-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-badge">
                    <span className="pillar-glyph">🔬</span>
                    <span className="pillar-tag">LAB 01</span>
                  </div>
                  <h4>Botanical Bio-Science</h4>
                  <p className="pillar-desc">Cryogenic extraction of Kashmiri Crocin and bio-active flower petals.</p>
                </div>
                <div className="pillar-links-list">
                  <a href="#innovation" className="pillar-link-item" onClick={(e) => { e.preventDefault(); scrollToSection('innovation'); setActiveInnovationTab(0); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Crocin Bio-Potency Standards</span>
                      <span className="link-subtitle">Pure Grade-A Mongra laboratory validation</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                </div>
              </div>

              <div className="mega-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-badge">
                    <span className="pillar-glyph">🌸</span>
                    <span className="pillar-tag">LAB 02</span>
                  </div>
                  <h4>Floffi Clean Culinary</h4>
                  <p className="pillar-desc">Preservative-free floral gastronomy and sustainable shelf-life preservation.</p>
                </div>
                <div className="pillar-links-list">
                  <a href="#innovation" className="pillar-link-item" onClick={(e) => { e.preventDefault(); scrollToSection('innovation'); setActiveInnovationTab(1); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Micro-Baking Formulation</span>
                      <span className="link-subtitle">Damask rose & calendula bloom cookies</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                </div>
              </div>

              <div className="mega-pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon-badge">
                    <span className="pillar-glyph">⚡</span>
                    <span className="pillar-tag">LAB 03</span>
                  </div>
                  <h4>KalikaSphere & VIYARA Tech</h4>
                  <p className="pillar-desc">Next-generation enterprise software, telemetry, and interactive creative learning tools.</p>
                </div>
                <div className="pillar-links-list">
                  <a href="#innovation" className="pillar-link-item" onClick={(e) => { e.preventDefault(); scrollToSection('innovation'); setActiveInnovationTab(2); setActiveMegaMenu(null); }}>
                    <div className="link-text-group">
                      <span className="link-title">Explore Future Labs</span>
                      <span className="link-subtitle">Interactive research demos & metrics</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Philosophy Mega Menu */}
        {activeMegaMenu === 'philosophy' && (
          <div 
            className="paidhu-mega-dropdown"
            onMouseEnter={() => setActiveMegaMenu('philosophy')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-dropdown-grid simple">
              <div className="mega-pillar">
                <span className="pillar-tag">ETHICAL SOURCING</span>
                <h4>Purity Without Compromise</h4>
                <p>100% natural, chemical-free and preservative-free ingredients direct from verified ethical growers.</p>
              </div>
              <div className="mega-pillar">
                <span className="pillar-tag">INNOVATION</span>
                <h4>Modern Craftsmanship</h4>
                <p>Combining time-honored artisanal botanicals with scalable enterprise digital platforms.</p>
              </div>
              <div className="mega-pillar">
                <span className="pillar-tag">COMMUNITY</span>
                <h4>Empowering Generations</h4>
                <p>Investing in education, creative skill development, and sustainable economic impact.</p>
              </div>
            </div>
          </div>
        )}

        {/* About Mega Menu */}
        {activeMegaMenu === 'about' && (
          <div 
            className="paidhu-mega-dropdown"
            onMouseEnter={() => setActiveMegaMenu('about')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-dropdown-grid simple">
              <div className="mega-pillar">
                <span className="pillar-tag">CORPORATE</span>
                <h4>The Paidhu Vision</h4>
                <p>An ethical modern enterprise advancing conscious living, technology, and luxury wellness.</p>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); setActiveMegaMenu(null); }} className="mega-cta-link">
                  Learn More →
                </a>
              </div>
              <div className="mega-pillar">
                <span className="pillar-tag">STANDARDS</span>
                <h4>Governance & Quality</h4>
                <p>Committed to transparency, rigorous testing, and premium ethical certifications.</p>
              </div>
            </div>
          </div>
        )}

        {/* Careers Mega Menu */}
        {activeMegaMenu === 'careers' && (
          <div 
            className="paidhu-mega-dropdown"
            onMouseEnter={() => setActiveMegaMenu('careers')}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="mega-dropdown-grid simple">
              <div className="mega-pillar">
                <span className="pillar-tag">PEOPLE</span>
                <h4>Life at Paidhu</h4>
                <p>Collaborate with ambitious founders, chefs, software engineers, and creative thinkers.</p>
                <a href="#careers" onClick={(e) => { e.preventDefault(); scrollToSection('careers'); setActiveMegaMenu(null); }} className="mega-cta-link">
                  Explore Opportunities →
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Showcase (Black, White & Gold Luxury Experience) */}
      <section id="home" className="paidhu-hero-stage">
        {/* Natural Photography Backgrounds */}
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`hero-slide-layer ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          />
        ))}

        {/* Atmospheric Gradient & Vignette (Guarantees zero ghosting & pristine contrast) */}
        <div className="hero-atmosphere-vignette" />
        <div className="hero-gold-ambient-spot" />

        {/* Hero Narrative Block (Modern Luxury 2026 UI) */}
        <div className="hero-narrative-container">
          <div className="hero-badge-pill">
            <span className="gold-spark-pulse" />
            <span>{heroSlides[currentSlide].badge}</span>
          </div>
          
          <h1 className="hero-luxury-title">
            {heroSlides[currentSlide].title.includes('.') ? (
              <>
                <span className="title-lead">{heroSlides[currentSlide].title.split('.')[0]}.</span>
                <span className="title-gold-accent">{heroSlides[currentSlide].title.split('.')[1]}</span>
              </>
            ) : (
              <span>{heroSlides[currentSlide].title}</span>
            )}
          </h1>
          
          <div className="hero-editorial-quote">
            <div className="gold-accent-rail" />
            <p className="hero-editorial-text">
              {heroSlides[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="hero-action-cluster">
            <button 
              className="hero-primary-btn"
              onClick={() => scrollToSection(heroSlides[currentSlide].sectionId)}
            >
              <span>{heroSlides[currentSlide].buttonText}</span>
              <span className="arrow-glyph">→</span>
            </button>

            <button 
              className="hero-secondary-btn"
              onClick={() => scrollToSection(heroSlides[currentSlide].secondarySectionId)}
            >
              <span>{heroSlides[currentSlide].secondaryText}</span>
            </button>
          </div>

          {/* Micro-Metrics Live Ribbon */}
          <div className="hero-metrics-strip">
            {(heroSlides[currentSlide].metrics || ['100% Certified Organic', 'Grade-A Mongra Kashmir Saffron', '4 Global Verticals']).map((metric, mIdx, arr) => (
              <React.Fragment key={mIdx}>
                <div className="hero-metric-chip">
                  <span className="metric-chip-dot" />
                  <span className="metric-chip-label">{metric}</span>
                </div>
                {mIdx < arr.length - 1 && <div className="hero-metric-divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Vertical Navigation Rail */}
        <div className="hero-vertical-navigation">
          <div className="vertical-nav-track">
            {rightTabs.map((tab, idx) => {
              const isSelected = currentSlide === idx;
              return (
                <button
                  key={tab.id}
                  className={`vertical-nav-tab ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSlideChange(idx)}
                  title={tab.label}
                >
                  <span className="tab-text">{tab.label}</span>
                  <span className="tab-pill" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination & Progress Dock */}
        <div className="hero-pagination-dock">
          <div className="dock-left-controls">
            <button 
              className="dock-icon-btn" 
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause auto-slider" : "Play auto-slider"}
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

            <div className="dock-slide-counter">
              <span className="current-num">0{currentSlide + 1}</span>
              <span className="divider">/</span>
              <span className="total-num">0{heroSlides.length}</span>
            </div>

            <div className="dock-progress-tracks">
              {heroSlides.map((slide, idx) => (
                <button 
                  key={slide.id} 
                  className={`progress-bar-slot ${idx === currentSlide ? 'active' : idx < currentSlide ? 'done' : ''}`}
                  onClick={() => handleSlideChange(idx)}
                  title={slide.title}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className="progress-fill" />
                </button>
              ))}
            </div>
          </div>

          <div className="dock-right-arrows">
            <button className="dock-arrow-btn" onClick={prevSlide} title="Previous Slide" aria-label="Previous Slide">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className="dock-arrow-btn" onClick={nextSlide} title="Next Slide" aria-label="Next Slide">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <div 
              className="scroll-down-invitation"
              onClick={() => scrollToSection('brands')}
              title="Scroll down to ecosystem"
            >
              <span className="scroll-caption">EXPLORE</span>
              <div className="scroll-chevrons">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Metrics Ribbon (Black & Gold) */}
      <section className="paidhu-metrics-ribbon">
        <div className="metrics-container">
          <div className="metric-cell">
            <span className="metric-figure">5+</span>
            <span className="metric-title">PREMIER BRANDS</span>
            <span className="metric-desc">Curated corporate ecosystem</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-cell">
            <span className="metric-figure">100%</span>
            <span className="metric-title">ETHICAL & NATURAL</span>
            <span className="metric-desc">Preservative & chemical free</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-cell">
            <span className="metric-figure">GRADE-A</span>
            <span className="metric-title">KASHMIRI SAFFRON</span>
            <span className="metric-desc">World's highest purity benchmark</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-cell">
            <span className="metric-figure">GLOBAL</span>
            <span className="metric-title">DIGITAL FOOTPRINT</span>
            <span className="metric-desc">Scalable software & commerce</span>
          </div>
        </div>
      </section>

      {/* In the News / Editorial Bento Section (Matching Reference Page) */}
      <section id="news" className="paidhu-news-section">
        {/* Floating Protruding Section Flag */}
        <div className="news-floating-tab-anchor">
          <div className="news-floating-tab">
            <span>In the News</span>
          </div>
        </div>

        <div className="news-bento-container">
          {/* Top Row: Left Wide Card (Featured Story) & Right Company News Card */}
          <div className="news-row news-row-top">
            {/* Card 1: Wide Featured Press Release / Story */}
            <div className="news-card news-card-featured">
              <div className="featured-media-side">
                <img 
                  src={featuredStories[featuredNewsSlide].image} 
                  alt={featuredStories[featuredNewsSlide].title} 
                  className="featured-media-img"
                />
                <div className="featured-dots-nav">
                  {featuredStories.map((_, i) => (
                    <button
                      key={i}
                      className={`carousel-dot ${i === featuredNewsSlide ? 'active' : ''}`}
                      onClick={() => setFeaturedNewsSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="featured-text-side">
                <span className="news-category-kicker">
                  {featuredStories[featuredNewsSlide].tag}
                </span>
                
                <h3 className="featured-story-title">
                  {featuredStories[featuredNewsSlide].title}
                </h3>
                
                <div className="news-quote-rail">
                  <div className="news-vertical-accent" />
                  <p className="news-summary-text">
                    {featuredStories[featuredNewsSlide].summary}
                  </p>
                </div>

                <a 
                  href={featuredStories[featuredNewsSlide].link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="news-read-link"
                >
                  <span>Read full dispatch</span>
                  <span className="arrow">→</span>
                </a>
              </div>
            </div>

            {/* Card 2: Company News Spotlight */}
            <div className="news-card news-card-company">
              <div className="company-card-header">
                <span className="company-category-tag">
                  {companyDispatches[companyNewsIndex].category}
                </span>
                <h3 className="company-entity-title">
                  {companyDispatches[companyNewsIndex].entity}
                </h3>
              </div>

              <div className="news-quote-rail company-quote-rail">
                <div className="news-vertical-accent gold" />
                <a 
                  href={companyDispatches[companyNewsIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-headline-link"
                >
                  <p className="company-headline-text">
                    {companyDispatches[companyNewsIndex].headline}
                    <span className="link-glyph">↗</span>
                  </p>
                </a>
              </div>

              <div className="company-card-footer">
                <span className="company-date">
                  {companyDispatches[companyNewsIndex].date}
                </span>
                <button 
                  className="company-cycle-btn" 
                  onClick={cycleCompanyNews}
                  title="Next Company Dispatch"
                  aria-label="Next Company Dispatch"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row: Left Did You Know & Right Social Media Spotlight */}
          <div className="news-row news-row-bottom">
            {/* Card 3: Facts & Origins ("Did You Know") */}
            <div className="news-card news-card-facts" onClick={cycleFact} title="Click to view more facts">
              <div className="facts-card-header">
                <span className="facts-category-tag">FACTS</span>
                <h3 className="facts-title">{paidhuFacts[factIndex].title}</h3>
              </div>

              <div className="news-quote-rail facts-quote-rail">
                <div className="news-vertical-accent gold" />
                <p className="facts-text">
                  {paidhuFacts[factIndex].fact}
                </p>
              </div>

              <div className="facts-card-footer">
                <span className="facts-footnote">
                  {paidhuFacts[factIndex].footnote}
                </span>
                <button 
                  className="facts-cycle-btn" 
                  onClick={(e) => { e.stopPropagation(); cycleFact(); }}
                  title="Next Fact"
                  aria-label="Next Fact"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 4: Social Media Spotlight */}
            <div className="news-card news-card-social">
              <div className="social-card-header">
                <div className="social-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </div>
              </div>

              <div className="news-quote-rail social-quote-rail">
                <div className="news-vertical-accent white" />
                <p className="social-quote-text">
                  The wait is over. The excitement returns. Welcome back to a new season of pure culinary wellness. Experience the rich aroma of Grade-A Mongra Saffron. #Paidhu #OrganicLiving #PureSaffron #EthicalCraftsmanship
                </p>
              </div>

              <div className="social-card-footer">
                <span className="social-timestamp">Recent update</span>
                <a 
                  href="https://paidhuethicalfoods.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-view-icon-link"
                  aria-label="View social post"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ventures & Brands Section */}
      {/* Paidhu Innovation & Future Labs Section */}
      <section id="innovation" className="paidhu-innovation-section">
        <div className="innovation-ambient-glow glow-top-left" />
        <div className="innovation-ambient-glow glow-bottom-right" />

        <div className="innovation-container">
          {/* Section Header */}
          <div className="innovation-header">
            <div className="innovation-kicker-badge">
              <span className="kicker-pulse-dot" />
              <span>RESEARCH & DEVELOPMENT</span>
            </div>
            <h2 className="innovation-headline">Paidhu Innovation & Future Labs</h2>
            <p className="innovation-subtext">
              Where Kashmiri botanical heritage converges with advanced bio-extraction, clean food science, and transformative digital architectures.
            </p>

            {/* Interactive Lab Tabs */}
            <div className="innovation-tabs-dock">
              {innovationLabs.map((lab, idx) => (
                <button
                  key={lab.id}
                  className={`innovation-tab-pill ${activeInnovationTab === idx ? 'active' : ''}`}
                  onClick={() => setActiveInnovationTab(idx)}
                >
                  <span className="tab-pill-num">{lab.num}</span>
                  <span className="tab-pill-label">{lab.tabLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Lab Showcase Stage */}
          <div className="innovation-showcase-card">
            {/* Visual Column */}
            <div className="innovation-media-col">
              <div className="media-frame">
                <img 
                  src={innovationLabs[activeInnovationTab].image} 
                  alt={innovationLabs[activeInnovationTab].title} 
                  className="innovation-media-img"
                />
                <div className="media-overlay-gradient" />
                <span className="media-kicker-tag">
                  {innovationLabs[activeInnovationTab].kicker}
                </span>

                {/* Floating Metric Chips */}
                <div className="media-metric-chips">
                  {innovationLabs[activeInnovationTab].metrics.map((m, i) => (
                    <div key={i} className="metric-chip">
                      <span className="chip-value">{m.value}</span>
                      <span className="chip-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="innovation-details-col">
              <div className="details-header">
                <span className="details-num-tag">
                  LAB {innovationLabs[activeInnovationTab].num}
                </span>
                <span className="details-subhead">
                  {innovationLabs[activeInnovationTab].subtitle}
                </span>
              </div>

              <h3 className="details-title">
                {innovationLabs[activeInnovationTab].title}
              </h3>

              <p className="details-desc">
                {innovationLabs[activeInnovationTab].desc}
              </p>

              {/* Research Highlights List */}
              <div className="details-highlights-box">
                <h4 className="highlights-title">Core Breakthroughs & Benchmarks</h4>
                <ul className="highlights-list">
                  {innovationLabs[activeInnovationTab].highlights.map((h, i) => (
                    <li key={i} className="highlight-item">
                      <span className="highlight-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="details-action-row">
                <a 
                  href={innovationLabs[activeInnovationTab].linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="innovation-action-btn"
                >
                  <span>{innovationLabs[activeInnovationTab].linkText}</span>
                  <span className="btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="brands" className="paidhu-ventures-section">
        <div className="ventures-header">
          <div className="header-kicker">
            <span className="gold-dash" />
            <span>PAIDHU BRAND PORTFOLIO</span>
            <span className="gold-dash" />
          </div>
          <h2 className="header-headline">Curated Excellence Across Industries</h2>
          <p className="header-subtext">
            From artisanal edible botanicals to enterprise technology and creative education, each Paidhu venture is anchored in uncompromising quality.
          </p>
          
          <div className="category-filter-bar">
            <button 
              className={`filter-pill ${categoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('all')}
            >
              All Ventures
            </button>
            <button 
              className={`filter-pill ${categoryFilter === 'food' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('food')}
            >
              Floral Foods & Saffron
            </button>
            <button 
              className={`filter-pill ${categoryFilter === 'tech' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('tech')}
            >
              Software & Tech
            </button>
            <button 
              className={`filter-pill ${categoryFilter === 'education' ? 'active' : ''}`}
              onClick={() => setCategoryFilter('education')}
            >
              Education & Creative
            </button>
          </div>
        </div>

        <div className="ventures-card-grid">
          {filteredBrands.map(brand => (
            <div 
              key={brand.id} 
              className={`venture-card ${brand.id}`}
            >
              <div className="card-ambient-glow" />
              <div className="venture-card-inner">
                <div className="venture-card-header">
                  <span className="venture-category-tag">
                    {brand.id.includes('food') || brand.id.includes('saffron') || brand.id.includes('floffi') 
                      ? 'Floral & Gourmet' 
                      : brand.id === 'viyara' 
                      ? 'Tech & Marketing' 
                      : 'Creative Academy'}
                  </span>
                  <span className="brand-dot-status" />
                </div>

                <div className="venture-logo-display">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} Logo`} 
                    className="venture-logo-img"
                  />
                </div>

                <div className="venture-card-body">
                  <h3 className="venture-name">{brand.name}</h3>
                  {brand.tagline && <span className="venture-tagline">{brand.tagline}</span>}
                  <p className="venture-description">
                    {expandedBrands[brand.id] 
                      ? brand.description 
                      : `${brand.description.slice(0, 130)}...`}
                  </p>
                  <button 
                    onClick={(e) => toggleExpand(e, brand.id)}
                    className="venture-expand-toggle"
                  >
                    {expandedBrands[brand.id] ? 'Show Less ↑' : 'Read Full Story ↓'}
                  </button>
                </div>

                <div className="venture-card-footer">
                  <a 
                    href={brand.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="venture-visit-link"
                  >
                    <span>Visit Official Website</span>
                    <span className="external-arrow">↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Paidhu Philosophy & Heritage */}
      <section id="philosophy" className="paidhu-philosophy-section">
        <div className="philosophy-container">
          <div className="philosophy-content-col">
            <span className="philosophy-badge">THE PAIDHU STANDARD</span>
            <h2 className="philosophy-title">Where Ancient Purity Meets Contemporary Craft</h2>
            <p className="philosophy-lead">
              At Paidhu, our purpose is simple yet uncompromising: to craft products and digital platforms that enrich everyday life without cutting corners.
            </p>
            
            <div className="philosophy-pillars">
              <div className="pillar-item">
                <div className="pillar-icon">01</div>
                <div className="pillar-text">
                  <h4>Botanical Integrity</h4>
                  <p>Our floral foods and saffron are hand-harvested, pesticide-free, and crafted with complete transparency.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">02</div>
                <div className="pillar-text">
                  <h4>Technological Scalability</h4>
                  <p>Through VIYARA, we engineer enterprise software architectures and digital experiences that build enduring business value.</p>
                </div>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon">03</div>
                <div className="pillar-text">
                  <h4>Creative Community</h4>
                  <p>With KalikaSphere, we mentor creators, designers, and thinkers with tools to thrive in the modern knowledge economy.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="philosophy-visual-col">
            <div className="philosophy-image-frame">
              <img src="/assets/hero_flower_food.jpg" alt="Botanical Excellence" className="frame-img" />
              <div className="frame-gold-border" />
              <div className="frame-caption-box">
                <span className="caption-gold">100% ORGANIC INGREDIENTS</span>
                <p>Curated botanicals crafted for modern discerning palates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Corporate Overview */}
      <section id="about" className="paidhu-corporate-about">
        <div className="about-inner">
          <div className="about-headline-center">
            <span className="section-label">ABOUT THE CONGLOMERATE</span>
            <h2>A Growing Modern Group Dedicated to Ethical Enterprise</h2>
            <p>
              Founded on the belief that luxury and ethics belong together, Paidhu operates an interconnected family of ventures spanning gourmet food craftsmanship, high-grade spices, technology consulting, and future-ready education.
            </p>
          </div>

          <div className="about-features-row">
            <div className="feature-block">
              <div className="feature-num">I</div>
              <h3>Ethical Transparency</h3>
              <p>Every ingredient, process, and supplier adheres to rigorous ethical benchmarks that respect our growers and customers.</p>
            </div>
            <div className="feature-block">
              <div className="feature-num">II</div>
              <h3>Artisanal Precision</h3>
              <p>Small-batch handcrafted edible flower recipes, authentic Kashmiri saffron curation, and meticulous code craftsmanship.</p>
            </div>
            <div className="feature-block">
              <div className="feature-num">III</div>
              <h3>Sustainable Growth</h3>
              <p>Long-term value creation prioritizing sustainability, organic wellness, and empowerment over short-term expediency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Banner */}
      <section id="careers" className="paidhu-careers-banner">
        <div className="careers-ambient-spot" />
        <div className="careers-content-box">
          <span className="careers-kicker">CAREERS & PARTNERSHIPS</span>
          <h2>Build What Matters With Paidhu</h2>
          <p>
            Whether you are a chef, botanist, software engineer, designer, or commercial partner, we welcome visionaries who share our obsession with quality and ethical impact.
          </p>
          <button className="careers-cta-btn" onClick={() => setShowContactModal(true)}>
            <span>Join Our Journey</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* Contact Modal Drawer */}
      {showContactModal && (
        <div className="paidhu-modal-backdrop" onClick={() => setShowContactModal(false)}>
          <div className="paidhu-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">CONNECT WITH US</span>
                <h3 className="modal-title">Partner with Paidhu Group</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowContactModal(false)}>✕</button>
            </div>
            {formStatus && (
              <div className={`modal-status-alert ${formStatus.type}`}>
                {formStatus.text}
              </div>
            )}
            <form onSubmit={handleContactSubmit} className="paidhu-contact-form">
              <div className="input-field-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Enter your full name"
                />
              </div>
              <div className="input-field-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="name@company.com"
                />
              </div>
              <div className="input-field-group">
                <label>Your Inquiry or Message</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="How can we assist or collaborate with you?"
                ></textarea>
              </div>
              <button type="submit" className="modal-submit-btn" disabled={submitting}>
                {submitting ? 'Sending Transmission...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="paidhu-modal-backdrop" onClick={() => setShowSearchModal(false)}>
          <div className="paidhu-search-card" onClick={(e) => e.stopPropagation()}>
            <div className="search-bar-row">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search Paidhu brands, products, or philosophy..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input-field"
              />
              <button className="modal-close-btn" onClick={() => setShowSearchModal(false)}>✕</button>
            </div>
            <div className="search-results-list">
              {searchedBrands.length > 0 ? (
                searchedBrands.map(b => (
                  <a key={b.id} href={b.url} target="_blank" rel="noopener noreferrer" className="search-result-row">
                    <img src={b.logo} alt={b.name} className="search-thumb" />
                    <div className="search-meta">
                      <h4>{b.name}</h4>
                      <p>{b.description.slice(0, 90)}...</p>
                    </div>
                    <span className="search-link-arrow">↗</span>
                  </a>
                ))
              ) : (
                <div className="no-results-msg">No matching Paidhu brands found for "{searchQuery}".</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ultra-Luxury Footer */}
      <footer className="paidhu-luxury-footer">
        <div className="footer-container">
          <div className="footer-top-grid">
            <div className="footer-brand-summary">
              <img src="/assets/paidhu_official_logo.png" alt="Paidhu Group" className="footer-brand-logo" />
              <p className="footer-lead-text">
                An ethical luxury enterprise uniting botanical craftsmanship, high-grade spices, scalable technology, and creative education.
              </p>
              <div className="footer-cert-tags">
                <span className="cert-tag">100% Preservative Free</span>
                <span className="cert-tag">Grade-A Kashmiri Saffron</span>
                <span className="cert-tag">Enterprise Software</span>
              </div>
            </div>

            <div className="footer-nav-column">
              <span className="footer-nav-heading">GASTRONOMY</span>
              <ul>
                <li><a href="https://paidhuethicalfoods.com" target="_blank" rel="noreferrer">Paidhu Ethical Foods</a></li>
                <li><a href="https://paidhusaffron.com" target="_blank" rel="noreferrer">Paidhu Kashmiri Saffron</a></li>
                <li><a href="https://floffi.in" target="_blank" rel="noreferrer">Floffi Everyday Foods</a></li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <span className="footer-nav-heading">INNOVATION & TECH</span>
              <ul>
                <li><a href="https://viyara.co.in" target="_blank" rel="noreferrer">VIYARA Software & Growth</a></li>
                <li><a href="https://kalikasphere.com" target="_blank" rel="noreferrer">KalikaSphere Learning Hub</a></li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <span className="footer-nav-heading">CONNECT</span>
              <ul>
                <li><a href="#about" onClick={() => setShowContactModal(true)}>Direct Inquiries</a></li>
                <li><a href="#careers" onClick={(e) => { e.preventDefault(); scrollToSection('careers'); }}>Careers at Paidhu</a></li>
                <li><a href="#philosophy" onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}>Our Philosophy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="copyright-claim">
              &copy; {new Date().getFullYear()} Paidhu Group. All rights reserved.
            </div>
            <div className="footer-legal-links">
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <span className="dot">•</span>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <span className="dot">•</span>
              <a href="#governance" onClick={(e) => e.preventDefault()}>Ethical Standards</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
