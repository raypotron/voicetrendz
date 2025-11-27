"use client"

import { Target, Heart, Music, Award, Globe } from "lucide-react"
import useBlog from "@/hooks/use-blog"

export default function AboutPage() {
  const { cardBg, borderClass } = useBlog()

//   const teamMembers = [
//     {
//       name: "Adaeze Okonkwo",
//       role: "Founder & CEO",
//       image: "/african-woman-professional-headshot.png",
//     },
//     {
//       name: "Emeka Nwosu",
//       role: "Head of Content",
//       image: "/african-man-professional-headshot.png",
//     },
//     {
//       name: "Fatima Bello",
//       role: "Community Manager",
//       image: "/african-woman-hijab-professional.jpg",
//     },
//     {
//       name: "Kwame Asante",
//       role: "Technical Director",
//       image: "/african-man-professional.png",
//     },
//   ]

  const values = [
    {
      icon: Music,
      title: "Passion for Music",
      description: "We live and breathe African music, celebrating its diversity and global impact.",
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Our community of fans, artists, and creators are at the heart of everything we do.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting African music to the world while honoring its roots and traditions.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering quality content and experiences to our audience.",
    },
  ]

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About VoiceTrendz</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            VoiceTrendz is the premier destination for African music news, artist spotlights, and community engagement. We
            connect fans with the sounds, stories, and stars shaping the African music landscape.
          </p>
        </section>

        {/* Mission Section */}
        <section className={`${cardBg} rounded-2xl p-8 md:p-12 mb-16 border ${borderClass}`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                To amplify African voices in the global music industry by providing comprehensive coverage, authentic
                storytelling, and a platform for artists and fans to connect and thrive together.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that African music deserves a world stage, and we are committed to making that happen through
                quality journalism, community building, and innovative digital experiences.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img
                src="/afro-celebration.jpg"
                alt="African music celebration"
                className="rounded-xl shadow-lg w-full max-w-md"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${cardBg} rounded-xl p-6 border ${borderClass} hover:shadow-lg transition-shadow`}
              >
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        {/* <section className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${cardBg} rounded-xl overflow-hidden border ${borderClass} hover:shadow-lg transition-shadow text-center`}
              >
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Stats Section */}
        <section className={`${cardBg} rounded-2xl p-8 border ${borderClass}`}>
          <h2 className="text-3xl font-bold text-center mb-8">VoiceTrendz by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">500K+</p>
              <p className="text-muted-foreground">Monthly Readers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">1,200+</p>
              <p className="text-muted-foreground">Artist Profiles</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">50K+</p>
              <p className="text-muted-foreground">Community Members</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">30+</p>
              <p className="text-muted-foreground">Countries Reached</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
