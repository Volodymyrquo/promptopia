'use client';

import { useEffect, useState } from 'react';

import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Nav = () => {
    const isUserLoggedIn = false;
    const [providers, setProviders] = useState(null);
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setProviders();
    }, []);
    return (
        <nav className="flex-between mb-16 w-full pt-3">
            <Link href="/" className="flex-center flex gap-2">
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="Promptopia Logo"
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* Desktop navigation */}

            <div className="hidden sm:flex">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button
                            type="button"
                            onClick={signOut}
                            className="outline_btn"
                        >
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src="/assets/images/logo.svg"
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
