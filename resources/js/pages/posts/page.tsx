"use client"

import { usePage, router } from '@inertiajs/react';
import { ChevronLeft, Share2, Heart, Clock, Eye, User, Calendar } from "lucide-react"
import useBlog from "@/hooks/use-blog"
import { useState } from "react"
import { PageProps } from '@inertiajs/core'
import DOMPurify from 'dompurify';

// Sample post data - in a real app, this would come from a database
const allPosts = [
  {
    id: 1,
    title: "Burna Boy's Secret Collaboration Leaked",
    image: "/burna-boy-music-studio.jpg",
    views: "45K",
    time: "2h ago",
    category: "Hot Stories",
    content: `Burna Boy has been secretly working on a groundbreaking collaboration that's set to shake the music industry. Sources close to the artist reveal that the project involves some of the biggest names in international music.

The collaboration, which was supposed to remain under wraps until next month, has been leaked online, causing a frenzy among fans and industry insiders. The track reportedly features production from Grammy-winning producers and showcases Burna Boy's versatility as an artist.

"This is one of the most ambitious projects I've ever worked on," a source close to Burna Boy revealed. "The chemistry between the artists is incredible, and we believe this will be a game-changer for African music on the global stage."

The leaked snippet has already garnered millions of views across social media platforms, with fans expressing their excitement about the potential collaboration. Industry analysts predict this could be one of the biggest releases of the year.

Burna Boy's management has not yet issued an official statement regarding the leak, but insiders suggest an official announcement could come within the next few weeks.`,
    author: "Music Correspondent",
    date: "October 20, 2025",
  },
  {
    id: 2,
    title: "Wizkid Spotted in Lagos Studio",
    image: "/wizkid-recording-studio.jpg",
    views: "32K",
    time: "5h ago",
    category: "Hot Stories",
    content: `Wizkid was spotted entering a top-secret recording studio in Lagos, sparking speculation about new music. The Afrobeats superstar has been relatively quiet on the music front, leading fans to wonder what he's been working on.

Multiple sources confirm that Wizkid spent over 8 hours in the studio, working with some of the industry's most sought-after producers. The session was kept under tight security, with only a select few allowed access to the facility.

"Wizkid is working on something special," one studio insider revealed. "The energy in the studio was incredible, and everyone involved is sworn to secrecy about the project."

This studio session comes after months of speculation about Wizkid's next move. The artist has been focusing on his business ventures and international collaborations, but this latest development suggests he's ready to return to the studio with fresh material.

Fans are eagerly awaiting any official announcement from Wizkid's camp about upcoming releases.`,
    author: "Entertainment Editor",
    date: "October 20, 2025",
  },
  {
    id: 3,
    title: "Davido Announces New Album Drop",
    image: "/davido-album-announcement.jpg",
    views: "28K",
    time: "8h ago",
    category: "Hot Stories",
    content: `Davido has officially announced the release of his highly anticipated new album, set to drop next month. The announcement was made during an exclusive interview, sending shockwaves through the music industry.

The album, which has been in the works for over a year, features collaborations with some of the biggest names in music. Davido revealed that the project represents a new chapter in his artistic journey, showcasing his growth and evolution as an artist.

"This album is my most personal work yet," Davido stated. "I've poured my heart and soul into every track, and I can't wait for the world to hear what I've created."

The album will feature 16 tracks, with production from renowned producers including Timbaland, The Weeknd's collaborators, and top African producers. Early previews suggest a diverse sound that blends Afrobeats with international influences.

Pre-orders are expected to open next week, with exclusive merchandise bundles available for early supporters.`,
    author: "Music News Desk",
    date: "October 20, 2025",
  },
  {
    id: 4,
    title: "Tems Wins International Award",
    image: "/tems-award-ceremony.jpg",
    views: "21K",
    time: "12h ago",
    category: "Hot Stories",
    content: `Tems has won a prestigious international award, cementing her status as one of Africa's biggest music exports. The award was presented at a glamorous ceremony attended by industry leaders and celebrities from around the world.

The award recognizes Tems' outstanding contribution to music and her role in bringing African music to the global stage. Her acceptance speech was emotional and inspiring, thanking her fans, family, and collaborators for their support.

"This award is not just for me, it's for every African artist who dared to dream big," Tems said during her acceptance speech. "We've shown the world that African music is not just a trend, it's a movement."

Tems' win comes after a series of successful collaborations and performances on international platforms. She has become a symbol of African excellence in the global music industry.

The award is expected to open more doors for Tems internationally, with several major brands and platforms already expressing interest in collaborations.`,
    author: "Awards Correspondent",
    date: "October 20, 2025",
  },
  {
    id: 5,
    title: "New Afrobeats Festival Announced for December",
    image: "/afrobeats-festival-stage.jpg",
    views: "18K",
    time: "1h ago",
    category: "News",
    content: `A major new Afrobeats festival has been announced for December, promising to be the biggest music event of the year. The festival will take place in Lagos and will feature performances from over 50 artists.

Organizers have confirmed that some of the biggest names in Afrobeats will be performing, including Burna Boy, Wizkid, Davido, and Tems. The festival will also feature emerging artists, giving them a platform to showcase their talent to a global audience.

"This festival is about celebrating African music and culture," said the festival director. "We want to create an unforgettable experience for music lovers from around the world."

The festival will span three days and will include not just musical performances but also cultural exhibitions, food festivals, and interactive experiences. Tickets are expected to go on sale next month.

Early bird packages are being offered at discounted rates for those who register their interest now.`,
    author: "Events Editor",
    date: "October 20, 2025",
  },
  {
    id: 6,
    title: "Nigerian Music Streams Hit All-Time High",
    image: "/music-streaming-analytics.jpg",
    views: "15K",
    time: "3h ago",
    category: "News",
    content: `Nigerian music has reached an all-time high in streaming numbers, with a 200% increase in digital consumption over the past year. The surge reflects the growing global appetite for African music and the success of Nigerian artists on international platforms.

Major streaming platforms have reported record-breaking numbers for Nigerian artists, with several breaking into the global top 10 charts. The growth has been driven by a combination of factors, including increased internet penetration, affordable data plans, and the global success of Afrobeats.

"Nigerian music is no longer just a local phenomenon," said a spokesperson for a major streaming platform. "It's a global force that's reshaping the music industry."

The streaming surge has also benefited independent artists and producers, who now have direct access to global audiences. This democratization of music distribution has led to a more diverse and vibrant music ecosystem.

Industry experts predict that this growth trajectory will continue, with Nigerian music expected to become even more dominant in the global music landscape.`,
    author: "Industry Analyst",
    date: "October 20, 2025",
  },
]

interface Post {
  id: number
  title: string
  content: string
  thumbnail_url: string
  created_at: string
  user: { id: number; name: string }
  category: { id: number; name: string }
}

interface Props extends PageProps {
  post: Post
}

export default function PostPage({ post }: Props) {
    console.log(post);
//   const { props } = usePage();

//   const item = props?.post ?? {};
//   console.log(post)

  const { isDarkMode } = useBlog();
  const [liked, setLiked] = useState(false);

//   // ✅ Safer conversion: avoid parsing undefined
  const postId = Number(post?.id) || 1;
//   const post = allPosts.find((p) => p.id === postId);

  // ✅ Handle missing post
  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => router?.back?.()}
            className="flex items-center gap-2 text-primary hover:text-accent mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Post not found</h1>
            <p className="text-muted-foreground text-lg">
              The post you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <article className="w-full">
        {/* Hero Image */}
        <div className="relative w-full h-96 sm:h-[500px] overflow-hidden bg-muted">
          <img
            src={post.thumbnail_url || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => router?.back?.()}
            className="flex items-center gap-2 text-primary hover:text-accent mt-8 mb-8 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to articles
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full">
                {post.category.name}
              </span>
            </div>

            <h1 className="blog-title mb-6">{post.title}</h1>

            <div className="blog-meta border-b border-border pb-6 space-y-1">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{post.user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{post.created_at}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span>100 views</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{post.created_at}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {post.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 py-8 border-t border-b border-border">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                liked
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              {liked ? "Liked" : "Like this article"}
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>

          {/* Related Posts */}
          <div className="py-12">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPosts
                .filter(
                  (p) => p.id !== postId && p.category === post.category.name
                )
                .slice(0, 2)
                .map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    onClick={() => router.visit(`/posts/${relatedPost.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden rounded-lg mb-4 bg-muted">
                      <img
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {relatedPost.time}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
