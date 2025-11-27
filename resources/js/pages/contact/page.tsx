"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Clock, Send, CheckCircle } from "lucide-react"
import useBlog from "@/hooks/use-blog"

export default function ContactPage() {
  const { cardBg, borderClass } = useBlog()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Lagos, Nigeria", "Ikeja Business District"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+234 800 123 4567", "+234 901 234 5678"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm"],
    },
  ]

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, feedback, or want to collaborate? We would love to hear from you.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className={`${cardBg} rounded-xl p-6 border ${borderClass}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 ${cardBg} rounded-xl p-8 border ${borderClass}`}>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. We will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Write your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
