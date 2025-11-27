import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import { BlogProvider } from '@/context/blog-context';
import { usePage } from '@inertiajs/react';
import React from 'react';
import { PageProps } from '@inertiajs/core';

interface User {
    id: number;
    name: string;
}

interface Props extends PageProps {
    user: User | null;
}

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { props } = usePage<Props>();

    return (
        <BlogProvider>
            <Navbar user={props.user} />
            {children}
            <Footer />
        </BlogProvider>
    );
};

export default AppLayout;
