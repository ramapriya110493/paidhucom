export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json([
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
}
