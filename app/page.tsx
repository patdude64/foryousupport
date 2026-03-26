"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

// Logo Component using actual image
function Logo({ size = 200, showText = false }: { size?: number; showText?: boolean }) {
  if (showText) {
    // Full horizontal logo with text
    return (
      <Image
        src="/logo-full.jpg"
        alt="For You Support Coordination"
        width={size * 2.5}
        height={size}
        className={styles.logoImageFull}
        priority
      />
    );
  }
  // Icon only logo
  return (
    <Image
      src="/logo.png"
      alt="For You Support Coordination Logo"
      width={size}
      height={size}
      className={styles.logoImage}
      priority
    />
  );
}

// Service Icons
const serviceIcons = {
  plan: (
    <svg viewBox="0 0 24 24">
      <path
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  navigation: (
    <svg viewBox="0 0 24 24">
      <path
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24">
      <path
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  specialist: (
    <svg viewBox="0 0 24 24">
      <path
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  housing: (
    <svg viewBox="0 0 24 24">
      <path
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  capacity: (
    <svg viewBox="0 0 24 24">
      <path
        d="M13 10V3L4 14h7v7l9-11h-7z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const services = [
  {
    icon: serviceIcons.plan,
    title: "Plan Management",
    description:
      "Plan management to help you understand your budgets, track spending, and ensure your funding is used effectively throughout the plan period.",
  },
  {
    icon: serviceIcons.navigation,
    title: "NDIS Navigation",
    description:
      "Expert guidance to help you navigate the NDIS system, understand your plan, connect with providers, and access the supports you need.",
  },
  {
    icon: serviceIcons.community,
    title: "Community Access",
    description:
      "Building meaningful community connections and access to social, recreational, and vocational opportunities tailored to your interests and goals.",
  },
  {
    icon: serviceIcons.specialist,
    title: "Specialist Support Coordination",
    description:
      "For participants with complex needs, we provide specialised coordination to manage challenges and ensure consistent, high-quality care.",
  },
  {
    icon: serviceIcons.housing,
    title: "Housing & Accommodation",
    description:
      "Assistance finding suitable housing options including SDA, SIL, and other supported living arrangements tailored to your needs.",
  },
  {
    icon: serviceIcons.capacity,
    title: "Capacity Building",
    description:
      "Empowering you to build skills and confidence to manage your own supports over time, promoting independence and self-advocacy.",
  },
];

const testimonials = [
  {
    text: "For You Support completely changed how I experience the NDIS. They listened to what I actually needed and connected me with amazing providers. I finally feel in control of my plan.",
    name: "Michael R.",
    role: "NDIS Participant",
    initials: "MR",
  },
  {
    text: "As a parent, navigating the NDIS was overwhelming. The team made it simple and stress-free. They care about our family and our community. Support coordination at its best.",
    name: "Lisa T.",
    role: "Parent & Carer",
    initials: "LT",
  },
];

const faqs = [
  {
    question: "What is Support Coordination?",
    answer:
      "Support Coordination helps NDIS participants understand and use their NDIS plan. A Support Coordinator works with you to connect with providers, build your confidence in managing supports, and ensure you're getting the most from your funding.",
  },
  {
    question: "How do I get Support Coordination in my NDIS plan?",
    answer:
      "Support Coordination funding is included in your NDIS plan under the Capacity Building budget. If it's not currently in your plan, you can request it during your plan review or reassessment. We can help guide you through this process.",
  },
  {
    question:
      "What's the difference between Support Coordination and Plan Management?",
    answer:
      "Support Coordination focuses on helping you connect with and coordinate your providers, build skills, and navigate the NDIS. Plan Management handles the financial administration — paying invoices, tracking budgets, and managing claims. They work hand-in-hand to support you.",
  },
  {
    question: "How much does Support Coordination cost?",
    answer:
      "Support Coordination is funded through your NDIS plan, so there is no out-of-pocket cost to you. We charge in accordance with the NDIS Pricing Arrangements and Price Limits set by the NDIA.",
  },
  {
    question: "Can I change my Support Coordinator?",
    answer:
      "Yes! You have the right to choose and change your Support Coordinator at any time. If you'd like to transfer to For You Support Coordination, we'll make the transition as smooth as possible and take care of the paperwork.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We provide services across Australia. With both in-person and remote support options, we can work with participants wherever they are. Contact us to discuss how we can best support you in your area.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.navContainer}>
          <a href="#" className={styles.navLogo}>
            <Logo size={45} showText={true} />
          </a>
          <ul className={styles.navLinks}>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul
            className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}
          >
            <li>
              <a href="#home" onClick={() => setMobileMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setMobileMenuOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </a>
            </li>
            <li>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero} id="home">
        <div className={styles.heroBackground}>
          <Image
            src="/hero-family.jpg"
            alt="Diverse family smiling together"
            fill
            className={styles.heroBackgroundImage}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroLogoContainer}>
            <Logo size={120} showText={true} />
          </div>
          <p className={styles.heroTagline}>
            Helping NDIS participants navigate their plans, connect with the
            right providers, and build the life they choose.
          </p>
          <a href="#contact" className={styles.heroCta}>
            Get Started
          </a>
        </div>
      </section>

      {/* Services */}
      <section className={styles.section} id="services">
        <div className={styles.container}>
          <div className={styles.servicesHeader}>
            <div className={styles.tealLine}></div>
            <h2 className={styles.sectionTitle}>
              Our Support Coordination Services
            </h2>
            <p className={styles.sectionSubtitle}>
              We provide comprehensive NDIS support coordination to help you
              make the most of your plan.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Stories */}
      <section className={`${styles.section} ${styles.stories}`} id="stories">
        <div className={styles.container}>
          <div className={styles.storiesContainer}>
            <div className={styles.storiesContent}>
              <div className={styles.tealLine}></div>
              <h2 className={styles.sectionTitle}>Client Stories</h2>
              <p className={styles.sectionSubtitle}>
                See how we&apos;ve helped NDIS participants and their families
                achieve their goals.
              </p>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <p className={styles.testimonialText}>
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className={styles.testimonialName}>
                        {testimonial.name}
                      </div>
                      <div className={styles.testimonialRole}>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.storiesVisual}>
              <div className={styles.storiesLogoWrap}>
                <Logo size={200} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className={styles.section} id="about">
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <div className={styles.tealLine}></div>
              <h2 className={styles.sectionTitle}>About Us</h2>
              <p>
                Our mission is to serve at the centre of community, caring, and
                family. At For You Support Coordination, we believe everyone
                deserves the opportunity to live their best life.
              </p>
              <p>
                Our experienced team works alongside NDIS participants to
                understand their unique goals, navigate the complexities of the
                NDIS, and connect them with quality services and supports in a
                caring and family-oriented environment.
              </p>
              <div className={styles.aboutQuote}>
                <p>
                  &ldquo;We also seek to help you feel part of the community and
                  ensure our process is streamlined over every part of your plan
                  and responsibilities with current access.&rdquo;
                </p>
              </div>
            </div>
            <div className={styles.aboutVisual}>
              <div className={styles.aboutFeatureGrid}>
                <div className={styles.aboutFeature}>
                  <div className={styles.aboutFeatureIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0d9488" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8M8 12h8" />
                    </svg>
                  </div>
                  <h4>Person-Centred</h4>
                  <p>Tailored to your individual goals and preferences</p>
                </div>
                <div className={styles.aboutFeature}>
                  <div className={styles.aboutFeatureIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0d9488" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h4>Strong Network</h4>
                  <p>Trusted providers across all support categories</p>
                </div>
                <div className={styles.aboutFeature}>
                  <div className={styles.aboutFeatureIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0d9488" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h4>Communication</h4>
                  <p>Regular check-ins and transparent updates</p>
                </div>
                <div className={styles.aboutFeature}>
                  <div className={styles.aboutFeatureIcon}>
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#0d9488" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <h4>Empowerment</h4>
                  <p>Building skills for independence and self-advocacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.faqSection}`} id="faq">
        <div className={styles.container}>
          <div className={styles.faqHeader}>
            <div className={styles.tealLine}></div>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Got questions? We&apos;ve got answers. Here are some of the most
              common questions about our services.
            </p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openFaq === index ? styles.open : ""}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <button className={styles.faqQuestion}>
                  {faq.question}
                  <svg
                    className={styles.arrow}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={styles.faqAnswer}>
                  <div className={styles.faqAnswerInner}>{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.section} id="contact">
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={styles.tealLine}></div>
              <h2 className={styles.sectionTitle}>Get in Touch</h2>
              <p>
                Ready to start your NDIS journey or have questions about our
                services? We&apos;d love to hear from you.
              </p>

              <div className={styles.contactDetail}>
                <div className={styles.contactDetailIcon}>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>admin@foryou.au</p>
                </div>
              </div>

              <div className={styles.contactDetail}>
                <div className={styles.contactDetailIcon}>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
<h4>Phone</h4>
                  <p>0721 18648</p>
                </div>
              </div>

              <div className={styles.contactDetail}>
                <div className={styles.contactDetailIcon}>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h4>Website</h4>
                  <p>www.foryousupport.co</p>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" placeholder="Your phone number" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service">
                    <option value="">Select a service</option>
                    <option value="support-coordination">
                      Support Coordination
                    </option>
                    <option value="specialist-sc">
                      Specialist Support Coordination
                    </option>
                    <option value="plan-management">Plan Management</option>
                    <option value="ndis-navigation">NDIS Navigation</option>
                    <option value="community-access">Community Access</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`${styles.formSubmit} ${formSubmitted ? styles.submitted : ""}`}
                >
                  {formSubmitted ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <Logo size={46} />
                <div>
                  <div className={styles.footerLogoText}>FOR YOU</div>
                  <div className={styles.footerLogoSub}>Support Coordination</div>
                </div>
              </div>
              <p>
                Professional NDIS Support Coordination services helping
                participants connect with the right providers and achieve their
                goals.
              </p>
              <div className={styles.footerSocial}>
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24">
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h4>Services</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <a href="#services">Support Coordination</a>
                </li>
                <li>
                  <a href="#services">NDIS Navigation</a>
                </li>
                <li>
                  <a href="#services">Plan Management</a>
                </li>
                <li>
                  <a href="#services">Community Access</a>
                </li>
                <li>
                  <a href="#services">Capacity Building</a>
                </li>
              </ul>
            </div>

            <div>
              <h4>Contact Us</h4>
              <div className={styles.footerContactItem}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>admin@foryou.au</span>
              </div>
              <div className={styles.footerContactItem}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>0721 18648</span>
              </div>
              <div className={styles.footerContactItem}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>www.foryousupport.co</span>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2026 For You Support Coordination. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
