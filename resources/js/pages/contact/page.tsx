'use client';

import type React from 'react';

import useBlog from '@/hooks/use-blog';
import { useForm } from '@inertiajs/react';
import { CheckCircle, Clock, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function ContactPage() {
    const { cardBg, borderClass } = useBlog();
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     subject: '',
    //     message: '',
    // });
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        to: 'contact@voicetrendz.com',
        subject: '',
        message: '',
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);
         setTimeout(() => {
            setSubmitted(false);
                setData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
        post(route('contact.store'));
    }

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setSubmitted(true);
    //     setTimeout(() => {
    //         setSubmitted(false);
    //         setFormData({ name: '', email: '', subject: '', message: '' });
    //     }, 3000);
    // };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Our Location',
            details: ['Lagos, Nigeria', 'Ikeja Business District'],
        },
        {
            icon: Phone,
            title: 'Phone',
            details: ['+234 800 123 4567', '+234 901 234 5678'],
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm'],
        },
    ];

    return (
        <main className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                        Contact Us
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        Have questions, feedback, or want to collaborate? We
                        would love to hear from you.
                    </p>
                </section>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className={`${cardBg} rounded-xl border p-6 ${borderClass}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-primary/10 p-3">
                                        <info.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-semibold">
                                            {info.title}
                                        </h3>
                                        {info.details.map((detail, i) => (
                                            <p
                                                key={i}
                                                className="text-sm text-muted-foreground"
                                            >
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div
                        className={`lg:col-span-2 ${cardBg} rounded-xl border p-8 ${borderClass}`}
                    >
                        <h2 className="mb-6 text-2xl font-bold">
                            Send us a Message
                        </h2>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                                <h3 className="mb-2 text-xl font-semibold">
                                    Message Sent!
                                </h3>
                                <p className="text-muted-foreground">
                                    Thank you for reaching out. We will get back
                                    to you soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <p className="text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-600">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                        placeholder="How can we help?"
                                    />
                                    {errors.subject && <p className="text-red-600">{errors.subject}</p>}
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                        placeholder="Write your message here..."
                                    />
                                    {errors.message && <p className="text-red-600">{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:w-auto"
                                >
                                    <Send className="h-5 w-5" />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
