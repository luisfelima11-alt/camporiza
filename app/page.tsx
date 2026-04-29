import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppBubble from '@/components/WhatsAppBubble'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <WhyUs />
      <Contact />
      <Footer />
      <WhatsAppBubble />
    </main>
  )
}
