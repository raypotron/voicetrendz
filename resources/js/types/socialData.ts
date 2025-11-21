
import { Facebook, Twitter, Instagram, Youtube, } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface SocialLink {
  name: string;
  url: string;
  Icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://facebook.com/VoiceTrendz",
    Icon: Facebook,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/VoiceTrendz",
    Icon: Twitter,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/VoiceTrendz",
    Icon: Instagram,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/VoiceTrendz",
    Icon: Youtube,
  },

];
