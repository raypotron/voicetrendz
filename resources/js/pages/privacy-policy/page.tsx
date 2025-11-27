"use client"

import { Shield } from "lucide-react"
import useBlog from "@/hooks/use-blog"

export default function PrivacyPolicyPage() {
  const { cardBg, borderClass } = useBlog()

  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, participate in polls, submit content, or contact us. This may include:

• Name and email address
• Account credentials
• Profile information
• Content you submit (comments, votes, etc.)
• Communications with us

We also automatically collect certain information when you use our platform, including your IP address, browser type, device information, and browsing behavior through cookies and similar technologies.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send promotional communications (with your consent)
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions and abuse
• Personalize and improve your experience
• Comply with legal obligations`,
    },
    {
      title: "3. Information Sharing",
      content: `We do not sell your personal information. We may share your information in the following circumstances:

• With service providers who assist in our operations
• To comply with legal obligations
• To protect our rights, privacy, safety, or property
• In connection with a merger, acquisition, or sale of assets
• With your consent or at your direction

We may also share aggregated or de-identified information that cannot reasonably be used to identify you.`,
    },
    {
      title: "4. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.

We regularly review our security practices and update them as necessary to maintain the safety of your data.`,
    },
    {
      title: "5. Your Rights and Choices",
      content: `Depending on your location, you may have certain rights regarding your personal information:

• Access: Request a copy of your personal data
• Correction: Request correction of inaccurate data
• Deletion: Request deletion of your data
• Portability: Request transfer of your data
• Opt-out: Unsubscribe from marketing communications

To exercise these rights, please contact us using the information provided below.`,
    },
    {
      title: "6. Cookies and Tracking",
      content: `We use cookies and similar tracking technologies to collect information about your browsing activities. You can manage your cookie preferences through your browser settings. Note that disabling certain cookies may affect the functionality of our platform.

We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted).`,
    },
    {
      title: "7. Third-Party Links",
      content: `Our platform may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information.`,
    },
    {
      title: "8. Children's Privacy",
      content: `Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will take steps to delete it promptly.`,
    },
    {
      title: "9. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes your acceptance of the updated policy.`,
    },
    {
      title: "10. Contact Us",
      content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us at:

Email: privacy@voicetrendz.com
Address: VoiceTrendz Media, Lagos, Nigeria

We will respond to your inquiry within 30 days.`,
    },
  ]

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: January 15, 2025</p>
        </section>

        {/* Introduction */}
        <section className={`${cardBg} rounded-xl p-8 border ${borderClass} mb-8`}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            At VoiceTrendz, we are committed to protecting your privacy and ensuring the security of your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website and use our services.
          </p>
        </section>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <section key={index} className={`${cardBg} rounded-xl p-6 border ${borderClass}`}>
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
