"use client"

import { useState } from "react"
import { HelpCircle, MessageCircle, FileText, ChevronDown, ChevronUp, Search, Headphones,} from "lucide-react"
import useBlog from "@/hooks/use-blog"
import { Link } from "@inertiajs/react"

export default function SupportPage() {
  const { cardBg, borderClass } = useBlog()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "How do I submit my music to VoiceTrendz?",
      answer:
        "You can submit your music through our Artist Portal. Create an account, fill out your artist profile, and upload your tracks. Our editorial team reviews all submissions within 5-7 business days.",
    },
    {
      question: "How can I advertise on VoiceTrendz?",
      answer:
        "Visit our Advertise page to explore advertising options. We offer banner ads, sponsored content, and newsletter placements. Contact our sales team for custom packages.",
    },
    {
      question: "Can I write for VoiceTrendz?",
      answer:
        "Yes! We welcome guest contributors. Send your portfolio and writing samples to our editorial team via the Email Us page. We are particularly interested in music journalists and industry experts.",
    },
    {
      question: "How do I report incorrect information?",
      answer:
        "If you spot any errors in our content, please use the Contact Us form or email us directly. We take accuracy seriously and will review and correct any verified errors promptly.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, go to your profile settings and select 'Delete Account'. Alternatively, contact our support team and we will process your request within 48 hours.",
    },
    {
      question: "How can I participate in Fan Polls?",
      answer:
        "Fan Polls are open to all registered users. Simply create a free account and visit the Polls page to vote on active polls. Each user can vote once per poll.",
    },
  ]

  const supportCategories = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Browse our guides and tutorials",
      link: "#",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      link: "#",
    },
    {
      icon: Headphones,
      title: "Call Support",
      description: "Speak with a representative",
      link: "#",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </section>

        {/* Support Categories */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportCategories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              className={`${cardBg} rounded-xl p-6 border ${borderClass} hover:shadow-lg transition-shadow flex items-center gap-4`}
            >
              <div className="p-3 bg-primary/10 rounded-lg">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className={`${cardBg} rounded-xl p-8 border ${borderClass} text-center`}>
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div key={index} className={`${cardBg} rounded-xl border ${borderClass} overflow-hidden`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold pr-4">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className={`${cardBg} rounded-2xl p-8 mt-16 border ${borderClass} text-center`}>
          <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Cannot find what you are looking for? Our support team is here to help you.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </Link>
        </section>
      </div>
    </main>
  )
}
