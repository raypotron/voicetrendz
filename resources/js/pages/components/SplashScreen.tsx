import { motion, Variants } from "framer-motion";
// import logo from "@/images/logo_3.jpg";

export default function SplashScreen() {
  const text: string[] = "VOICETRENDZ".split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 1, staggerChildren: 0.1 },
    },
  };

  const letter: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center
        bg-gradient-to-br from-[#050515] via-[#0A102A] to-[#00001a] overflow-hidden">

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex justify-center"
      >
        <img
          src='/logo_3.jpg'
          alt="VoiceTrendz Logo"
          className="w-44 h-44 rounded-full drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]"
        />
      </motion.div>

      {/* Shimmering Gradient Text */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex mt-16 text-4xl sm:text-5xl font-[Space_Grotesk]
        tracking-[0.3em] text-yellow-200"
      >
        {text.map((char: string, index: number) => (
          <motion.span
            key={index}
            variants={letter}
            className="drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]"
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="mt-4 text-sm sm:text-base text-gray-400 tracking-wide font-[Manrope]"
      >
        Discover • Create • Inspire
      </motion.p>
    </div>
  );
}
