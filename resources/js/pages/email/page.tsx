'use client';

import type React from 'react';

import useBlog from '@/hooks/use-blog';
import { useForm } from '@inertiajs/react';
import {
    Building,
    CheckCircle,
    Mail,
    Mic2,
    Newspaper,
    Send,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function EmailPage() {
    const { cardBg, borderClass } = useBlog();
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        to: '',
        subject: '',
        message: '',
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setData({ name: '', email: '', to: '', subject: '', message: '' });
        }, 5000);
        post(route('contact.store'));
    }

    const emailCategories = [
        {
            icon: Newspaper,
            value: 'editorial',
            label: 'Editorial',
            email: 'editorial@voicetrendz.com',
            description: 'News tips, corrections, guest writing',
        },
        {
            icon: Building,
            value: 'business',
            label: 'Business',
            email: 'business@voicetrendz.com',
            description: 'Partnerships, sponsorships, advertising',
        },
        {
            icon: Mic2,
            value: 'artists',
            label: 'Artist Relations',
            email: 'artists@voicetrendz.com',
            description: 'Music submissions, interviews, features',
        },
        {
            icon: User,
            value: 'support',
            label: 'Support',
            email: 'support@voicetrendz.com',
            description: 'Account help, technical issues',
        },
    ];

    return (
        <main className="min-h-screen py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <section className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
                        <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                        Email Us
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                        Choose the right department to ensure your message
                        reaches the right team.
                    </p>
                </section>

                {/* Email Categories */}
                <section className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {emailCategories.map((category, index) => (
                        <div
                            key={index}
                            className={`${cardBg} rounded-xl border p-6 ${borderClass} transition-shadow hover:shadow-lg`}
                        >
                            <category.icon className="mb-4 h-8 w-8 text-primary" />
                            <h3 className="mb-1 font-semibold">
                                {category.label}
                            </h3>
                            <p className="mb-2 text-sm font-medium text-primary">
                                {category.email}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Email Form */}
                <section
                    className={`mx-auto max-w-2xl ${cardBg} rounded-xl border p-8 ${borderClass}`}
                >
                    <h2 className="mb-6 text-center text-2xl font-bold">
                        Send an Email
                    </h2>
                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                            <h3 className="mb-2 text-xl font-semibold">
                                Email Sent!
                            </h3>
                            <p className="text-muted-foreground">
                                We have received your message and will respond
                                within 24-48 hours.
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
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                        placeholder="Your name"
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
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                        placeholder="you@example.com"
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
                                    onChange={(e) =>
                                        setData('subject', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholder="How can we help?"
                                />
                                {errors.subject && (
                                    <p className="text-red-600">
                                        {errors.subject}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Department
                                </label>
                                <select
                                    required
                                    value={data.to}
                                    onChange={(e) =>
                                        setData('to', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    <option value="">
                                        Select a department
                                    </option>
                                    {emailCategories.map((cat) => (
                                        <option
                                            key={cat.value}
                                            value={cat.email}
                                        >
                                            {cat.label} - {cat.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Your Message
                                </label>
                                <textarea
                                    required
                                    rows={6}
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                    className="w-full resize-none rounded-lg border border-border bg-input px-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                                    placeholder="How can we help you?"
                                />
                                {errors.message && <p className="text-red-600">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                            >
                                <Send className="h-5 w-5" />
                                Send Email
                            </button>
                        </form>
                    )}
                </section>
            </div>
        </main>
    );
}
