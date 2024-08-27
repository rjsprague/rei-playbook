"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import reiaLogo from '@/public/REIAlogoWebP.webp';

const NextSteps: React.FC = () => {

    const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;
    const currentYear = new Date().getFullYear();


    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
                {/* Above the fold */}
                <section className="flex flex-col justify-start items-center w-full ">
                    {/* logo */}
                    <div className="relative flex justify-center w-full bg-tertiary py-10">
                        <div className="flex flex-row items-center">
                            <Image
                                priority
                                src={reiaLogo}
                                alt="REI Automated logo"
                                quality={80}
                                className=""
                            />
                        </div>
                    </div>
                    {/* Hero */}
                    <div className="flex flex-col gap-5 sm:gap-10 w-full items-center text-primary bg-gray-100 py-10">
                        <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6">
                            You&apos;re almost there!
                        </h1>
                        <div className="flex flex-col px-2 gap-5 sm:gap-10 w-full sm:w-1/2 lg:w-1/3">
                            <ol className="list-decimal list-inside space-y-3">
                                <h2 className="md:text-4xl lg:text-4xl text-2xl font-bold text-center px-2 mb-4">
                                    Important Next Steps
                                </h2>
                                <li className="text-lg font-normal">
                                    <strong>CHECK</strong> your email for message that starts with [Course Access].
                                </li>
                                <li className="text-lg font-normal">
                                    <strong>ADD</strong> our email address to your contacts to ensure you receive our emails.
                                </li>
                                <li className="text-lg font-normal">
                                    <strong>CLICK</strong> the link in the email to confirm your email address and enroll in the course.
                                </li>
                                <li className="text-lg font-normal">
                                    <strong>ENJOY</strong> the special offer we have for you in the email or go <Link href={'/rei-playbook'} className="underline italic text-xl text-secondary">here</Link>.
                                </li>

                            </ol>
                            <ul className="list-disc list-inside mt-10">
                                <h2 className="text-2xl">Just in case you have a problem:</h2>
                                <li className="text-lg">
                                    If you don&apos;t see the email in your inbox, check your spam folder.
                                </li>
                                <li className="text-lg ">
                                    If you still can&apos;t find it, please contact us at <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`} className="text-secondary">{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a>.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex flex-col gap-4 px-4 py-4 w-full text-white h-10 bg-tertiary">
                    <div className="flex flex-row justify-center space-x-4">
                        <p>© {`${currentYear} ${businessName}`}</p>
                        <Link href={"/privacy"}>Privacy Policy</Link>
                        <Link href={"/terms"}>Terms and Conditions</Link>
                    </div>
                </footer>

            </main>

        </>
    );
};

export default NextSteps;