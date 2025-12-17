import { useMemo, useState, useEffect, useRef } from 'react'

type Service = {
  name: string
  headline: string
  description: string
  list: string[]
}

type ProcessStep = {
  title: string
  copy: string
}

type Testimonial = {
  name: string
  location: string
  quote: string
}

const services: Service[] = [
  {
    name: 'Signature Reset',
    headline: 'Weekly or bi-weekly upkeep',
    description:
      'Our regular visit that keeps your main rooms picked up, wiped down, and feeling calm between deeper cleans.',
    list: ['Kitchen + bath sanitizing', 'Hotel fold laundry session', 'Smart home dust + polish', 'Scent + mood reset'],
  },
  {
    name: 'Deep Detox',
    headline: 'Detailed deep clean',
    description:
      'A slower, more detailed clean for the spots that get skipped on busy days—baseboards, appliances, corners, and built-up dust.',
    list: ['Baseboard + trim detailing', 'Inside fridge + oven cleanse', 'High dust + vents reset', 'Mineral-free shower glass'],
  },
  {
    name: 'Move-In Serenity',
    headline: 'Move-in / move-out clean',
    description:
      "For when you're moving in, moving out, or getting ready to list. We scrub the empty spaces so they feel ready for the next chapter.",
    list: ['Wall-to-wall dust extraction', 'Floor reconditioning pass', 'Cabinet + closet wipeout', 'Handwritten entry note'],
  },
]

const process: ProcessStep[] = [
  {
    title: 'We chat about your needs',
    copy: "Call or message us and tell us a bit about your home and routines. We'll talk through options and give you clear pricing before anything is booked.",
  },
  {
    title: 'Our team arrives',
    copy: "Your cleaner shows up on time with supplies and a simple plan, then quietly works through the list you've agreed on.",
  },
  {
    title: 'You enjoy your clean home',
    copy: "You come back to a home that feels lighter. If we ever miss something, just tell us and we'll make it right or adjust for next time.",
  },
]

const stats = [
  { value: 'Safe', label: 'Non-toxic products', detail: 'Safe for kids, pets, and our team' },
  { value: 'Same', label: 'Consistent teams', detail: 'Same trusted cleaner every visit' },
  { value: '50+', label: 'Happy families', detail: 'Trusted by families across the metro area' },
  { value: '100%', label: 'Satisfaction guarantee', detail: 'We make it right if something isn\'t perfect' },
]

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    location: 'Redding, CA',
    quote: 'Andie and her team have been cleaning our home for over a year now. We love seeing the same friendly faces, and knowing our kids and dog are safe around the products they use. It\'s one less thing to worry about.',
  },
  {
    name: 'Michael & Jennifer T.',
    location: 'Shasta Lake, CA',
    quote: 'We\'ve tried other cleaning services before, but Simple & Clean is different. They actually listen to what we need and follow through every time. The communication is fantastic—we never feel left in the dark.',
  },
  {
    name: 'Rachel K.',
    location: 'Anderson, CA',
    quote: 'As a busy mom of three, having Simple & Clean come weekly has been a game changer. They treat our home with such care and respect. I can\'t recommend them enough to other families.',
  },
]

const logoAssetWhite = '/S&C Horiz White.png' as const
const logoAssetBlue = '/S&C Horiz Blue.png' as const
const logoIcon = '/House with circle and leaf.png' as const
const heroImage = '/Hero.jpg' as const
const bioImage = '/Andie.jpeg' as const

// Custom hook for scroll animations
function useScrollAnimation<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return ref
}

function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs for scroll animations
  const heroContentRef = useScrollAnimation<HTMLDivElement>()
  const statBandRef = useScrollAnimation<HTMLElement>()
  const splitSectionRef = useScrollAnimation<HTMLElement>()
  const whySectionRef = useScrollAnimation<HTMLElement>()
  const servicesRef = useScrollAnimation<HTMLElement>()
  const processRef = useScrollAnimation<HTMLDivElement>()
  const guaranteeRef = useScrollAnimation<HTMLElement>()
  const testimonialsRef = useScrollAnimation<HTMLElement>()
  const contactRef = useScrollAnimation<HTMLElement>()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMobileMenuOpen && !target.closest('.nav')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Animate hero content on mount since it's visible immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      if (heroContentRef.current) {
        heroContentRef.current.classList.add('animate-in')
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Close mobile menu when clicking on a link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''} ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
        <div className="logo">
          <img src={isScrolled ? logoAssetBlue : logoAssetWhite} alt="SimpleClean logo" loading="lazy" />
        </div>
        <button 
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${isMobileMenuOpen ? 'nav-links-open' : ''}`}>
          <a href="#about" onClick={handleNavLinkClick}>About</a>
          <a href="#services" onClick={handleNavLinkClick}>Services</a>
          <a href="#process" onClick={handleNavLinkClick}>Process</a>
          <a href="#testimonials" onClick={handleNavLinkClick}>Reviews</a>
          <a href="#contact" onClick={handleNavLinkClick}>Contact</a>
          <a className="nav-call" href="tel:+15551234567" onClick={handleNavLinkClick}>
            (555) 123-4567
          </a>
          <button className="primary-btn" onClick={handleNavLinkClick}>Book A Clean</button>
        </div>
      </nav>
      <header className="hero-full" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <div className="hero-content scroll-animate" ref={heroContentRef}>
            <p className="eyebrow">Family owned · Same trusted team</p>
            <h1>
              Your Home, Cared For By People You Trust.
              <span> Every Time.</span>
            </h1>
            <p className="hero-lead">
              Family-owned and operated, we bring the same trusted cleaner to your home every time. 
              Using only non-toxic products that are safe for your family, we focus on the details that make your space feel truly cared for.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">Get A Free Quote</button>
              <button className="ghost-btn">Call Us Today</button>
            </div>
          </div>
        </div>
      </header>

      <section className="stat-band scroll-animate" ref={statBandRef}>
        {stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
            <span>{stat.detail}</span>
          </article>
        ))}
      </section>

      <section className="section-about scroll-animate" id="about" ref={splitSectionRef}>
        <div className="about-wrapper">
          <div className="about-image">
            <img src={bioImage} alt="Andie from SimpleClean" loading="lazy" />
          </div>
          <div className="about-content">
            <p className="eyebrow">About us</p>
            <h2>A family business built on trust</h2>
            <div className="about-text">
              <p>
                Simple &amp; Clean started the way a lot of good things do — with a few neighbors who needed help and kept telling their friends. Andie and Devon saw how much calmer a home could feel when someone you trust takes the cleaning off your plate.
              </p>
              <p>
                These days Andie is the one you&apos;ll see with the team, paying attention to the little things you mention in passing. Devon keeps the schedule and messages organized so you always know who&apos;s coming and when. It still feels small and personal on purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-why scroll-animate" ref={whySectionRef}>
        <div className="why-wrapper">
          <div className="why-header">
            <p className="eyebrow">Why choose us</p>
            <h2>Why people keep us around</h2>
            <p className="why-intro">
              Simple &amp; Clean has grown mostly through word of mouth. Folks stay with us because it&apos;s easy to work together and they feel good about who&apos;s in their home.
            </p>
          </div>
          <div className="why-features">
            <div className="why-feature">
              <div className="why-feature-icon">✓</div>
              <div className="why-feature-content">
                <h3>Safe for everyone</h3>
                <p>We stick to non-toxic products that are gentle on surfaces and safe around kids, pets, and our team.</p>
              </div>
            </div>
            <div className="why-feature">
              <div className="why-feature-icon">✓</div>
              <div className="why-feature-content">
                <h3>Same trusted cleaner every time</h3>
                <p>You get the same cleaner most visits, so we actually learn how you like things done and you always know who&apos;s coming over.</p>
              </div>
            </div>
            <div className="why-feature">
              <div className="why-feature-icon">✓</div>
              <div className="why-feature-content">
                <h3>We show up, and we respond</h3>
                <p>If you call or text, you hear back from us. If we&apos;re running behind or need to adjust something, we&apos;ll let you know instead of leaving you guessing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wide service-panels scroll-animate" id="services" ref={servicesRef}>
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Cleaning plans that fit your life</h2>
        </div>
        <div className="panel-grid">
          {services.map((service) => (
            <article key={service.name} className="panel-card">
              <div className="panel-top">
                <span>{service.name}</span>
                <h3>{service.headline}</h3>
              </div>
              <ul>
                {service.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button className="ghost-btn">Learn More</button>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wide process-section" id="process">
        <div className="process-section-inner scroll-animate" ref={processRef}>
          <div className="process-header">
            <h2>
              A Simple Process, <span className="highlight">Start to Finish</span>
            </h2>
            <p className="process-subtitle">
              Reaching out is easy. Here&apos;s what working with Simple &amp; Clean usually looks like:
            </p>
          </div>
          <div className="process-steps">
            {process.map((step, index) => (
              <div key={step.title} className="process-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="process-cta">
            <button className="primary-btn">Get Started Today</button>
            <p className="process-note">Most quotes provided within a few hours</p>
          </div>
        </div>
      </section>

      <section className="section-commitment scroll-animate" id="guarantee" ref={guaranteeRef}>
        <div className="commitment-wrapper">
          <div className="commitment-header">
            <p className="eyebrow">Guarantee</p>
            <h2>We stand behind our work</h2>
          </div>
          <div className="commitment-content">
            <p className="commitment-intro">
              If we miss a spot or something doesn&apos;t feel right after a visit, we genuinely want to hear about it. We&apos;ll come back to fix it or talk through what needs to change next time.
            </p>
            <p className="commitment-intro">
              Letting someone into your home is a big deal. We show up when we say we will, communicate clearly, and follow through—that&apos;s how we&apos;ve slowly built up a group of regulars who stick with us.
            </p>
          </div>
          <div className="commitment-features">
            <div className="commitment-feature">
              <div className="commitment-feature-icon">💬</div>
              <div className="commitment-feature-content">
                <h3>Easy communication</h3>
                <p>We're here when you need us, and we respond quickly.</p>
              </div>
            </div>
            <div className="commitment-feature">
              <div className="commitment-feature-icon">✓</div>
              <div className="commitment-feature-content">
                <h3>Honest follow-up</h3>
                <p>If something needs attention, we take care of it.</p>
              </div>
            </div>
            <div className="commitment-feature">
              <div className="commitment-feature-icon">🏠</div>
              <div className="commitment-feature-content">
                <h3>Respect for your home</h3>
                <p>We treat your space like we'd want ours treated.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-testimonials scroll-animate" id="testimonials" ref={testimonialsRef}>
        <div className="testimonials-wrapper">
          <div className="testimonials-header">
            <p className="eyebrow">Kind words from families</p>
            <h2>What our clients are saying</h2>
            <p className="testimonials-intro">
              A few notes people have sent after their cleans.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <div className="testimonial-quote-mark">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-meta">
                  <strong className="testimonial-name">{testimonial.name}</strong>
                  <span className="testimonial-location">{testimonial.location}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section scroll-animate" id="contact" ref={contactRef}>
        <div className="contact-inner">
          <div className="contact-glass-container">
            <div className="contact-header">
              <h2>Ready to get started?</h2>
              <p className="contact-subtitle">
                Have a question or want to check availability? Send a note here or give us a call and we&apos;ll get back to you soon.
              </p>
            </div>
            <div className="contact-content">
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="your.email@example.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Tell us about your cleaning needs..." required></textarea>
                </div>
                <button type="submit" className="primary-btn">Send Message</button>
              </form>
            </div>
            <div className="contact-info">
              <div className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <strong>Email</strong>
                  <a href="mailto:hello@simpleclean.com">hello@simpleclean.com</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2126 21.3528 21.3979C21.1482 21.5832 20.9071 21.7212 20.6447 21.8024C20.3822 21.8836 20.1045 21.9059 19.83 21.87C16.7432 21.5856 13.787 20.5341 11.19 18.79C8.77382 17.2401 6.72533 15.0079 5.19 12.32C3.77497 9.84537 2.79929 7.08762 2.32 4.2C2.28262 3.92879 2.30658 3.65399 2.39015 3.39499C2.47372 3.13599 2.61478 2.89939 2.80279 2.70237C2.9908 2.50535 3.22098 2.35269 3.47619 2.25526C3.7314 2.15783 4.00533 2.11808 4.28 2.12H7.28C7.63991 2.11581 7.99575 2.2047 8.31438 2.37887C8.63301 2.55304 8.90424 2.80688 9.104 3.12L11.104 6.62C11.3038 6.93312 11.4249 7.29359 11.4562 7.66778C11.4875 8.04197 11.428 8.41778 11.284 8.76L9.684 11.36C11.1279 13.8134 13.1866 15.8721 15.64 17.316L18.24 15.716C18.5822 15.572 18.958 15.5125 19.3322 15.5438C19.7064 15.5751 20.0669 15.6962 20.38 15.896L23.88 17.896C24.1931 18.0958 24.447 18.367 24.6211 18.6856C24.7953 19.0042 24.8842 19.3601 24.88 19.72L24.88 19.72Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <strong>Phone</strong>
                  <a href="tel:+15551234567">(555) 123-4567</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <strong>Service Area</strong>
                  <span>Redding, CA area and surrounding</span>
                </div>
              </div>
              <div className="contact-hours">
                <strong>Business Hours</strong>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <footer className="footer-wide">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src={logoIcon} alt="SimpleClean logo" loading="lazy" />
            </div>
            <p className="footer-tagline">Polished homes, peaceful routines.</p>
          </div>
          <div className="footer-info">
            <div className="footer-nav">
              <strong>Navigation</strong>
              <nav className="footer-nav-links">
                <a href="#about" className="footer-nav-link">About</a>
                <a href="#services" className="footer-nav-link">Services</a>
                <a href="#process" className="footer-nav-link">Process</a>
                <a href="#testimonials" className="footer-nav-link">Reviews</a>
                <a href="#contact" className="footer-nav-link">Contact</a>
              </nav>
            </div>
            <div className="footer-contact">
              <a href="mailto:hello@simpleclean.com" className="footer-link">
                <strong>Email</strong>
                <span>hello@simpleclean.com</span>
              </a>
              <a href="tel:+15551234567" className="footer-link">
                <strong>Phone</strong>
                <span>(555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© {currentYear} SimpleClean. All rights reserved.</small>
        </div>
      </footer>
    </div>
  )
}

export default App

