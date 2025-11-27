"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Send, CheckCircle, User, Building, Mic2, Newspaper } from "lucide-react"
import useBlog from "@/hooks/use-blog"

export default function EmailPage() {
  const { cardBg, borderClass } = useBlog()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", category: "", message: "" })
    }, 3000)
  }

  const emailCategories = [
    {
      icon: Newspaper,
      value: "editorial",
      label: "Editorial",
      email: "editorial@voicetrendz.com",
      description: "News tips, corrections, guest writing",
    },
    {
      icon: Building,
      value: "business",
      label: "Business",
      email: "business@voicetrendz.com",
      description: "Partnerships, sponsorships, advertising",
    },
    {
      icon: Mic2,
      value: "artists",
      label: "Artist Relations",
      email: "artists@voicetrendz.com",
      description: "Music submissions, interviews, features",
    },
    {
      icon: User,
      value: "support",
      label: "Support",
      email: "support@voicetrendz.com",
      description: "Account help, technical issues",
    },
  ]

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Email Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the right department to ensure your message reaches the right team.
          </p>
        </section>

        {/* Email Categories */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {emailCategories.map((category, index) => (
            <div
              key={index}
              className={`${cardBg} rounded-xl p-6 border ${borderClass} hover:shadow-lg transition-shadow`}
            >
              <category.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-1">{category.label}</h3>
              <p className="text-primary text-sm font-medium mb-2">{category.email}</p>
              <p className="text-muted-foreground text-sm">{category.description}</p>
            </div>
          ))}
        </section>

        {/* Email Form */}
        <section className={`max-w-2xl mx-auto ${cardBg} rounded-xl p-8 border ${borderClass}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">Send an Email</h2>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Sent!</h3>
              <p className="text-muted-foreground">
                We have received your message and will respond within 24-48 hours.
              </p>
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
                    placeholder="Your name"
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
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a department</option>
                  {emailCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label} - {cat.email}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
                Send Email
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
