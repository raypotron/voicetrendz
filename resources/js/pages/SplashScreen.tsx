import { router } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { useEffect } from 'react';
// import logo from "@/images/logo_3.jpg";

const SplashScreen = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.visit('/home');
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    const text: string[] = 'VOICETRENDZ'.split('');

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
        <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#050515] via-[#0A102A] to-[#00001a]">
            {/* Logo */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex justify-center"
            >
                <img
                    src="/logo_3.jpg"
                    alt="VoiceTrendz Logo"
                    className="h-44 w-44 rounded-full drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]"
                />
            </motion.div>

            {/* Shimmering Gradient Text */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="mt-16 flex font-[Space_Grotesk] text-4xl tracking-[0.3em] text-yellow-200 sm:text-5xl"
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
                className="mt-4 font-[Manrope] text-sm tracking-wide text-gray-400 sm:text-base"
            >
                Discover • Create • Inspire
            </motion.p>
        </div>
    );
}

export default SplashScreen;

SplashScreen.layout = (page: React.ReactNode) => page;
