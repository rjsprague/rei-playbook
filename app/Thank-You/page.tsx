"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import mobileHouseImage from "../../public/mobileHouse.webp";
import houseImage from "../../public/HouseImage.webp";
import Link from 'next/link';
import { FiPhoneCall } from 'react-icons/fi';


const ThankYouPage: React.FC = () => {
    const [imageSrc, setImageSrc] = useState(mobileHouseImage);

    const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;
    const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE;
    const businessLogo = process.env.NEXT_PUBLIC_LOGO_URL;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        // This function runs when the component mounts, and whenever the dependencies change
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setImageSrc(mobileHouseImage);
            } else {
                setImageSrc(houseImage);
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden">
                {/* <section className="flex w-full flex-row justify-between py-2 items-center bg-white px-3 sm:px-6 md:px-9 lg:px-16 xl:px-36 h-24">
                    {businessLogo ? <Image src={`${businessLogo}`} alt="logo" loading="lazy" width={150} height={70} /> : <div></div>}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary text-center text-wrap w-32 sm:w-full">{`${businessName}`}</h1>
                    <Link
                        href={`tel:${businessPhone}`}
                        className="text-4xl font-bold text-center"
                        aria-label="Call Us"
                    >
                        <FiPhoneCall className=" bg-primary text-secondary rounded-lg p-2 -rotate-90 h-12 w-12" />
                    </Link>
                </section> */}
                <section className="w-screen h-screen flex flex-col justify-center items-center px-10 relative">
                    <div className="backdrop-blur-md rounded-md p-4 max-w-[1280px] flex flex-col gap-4">
                        <h1 className=" md:text-4xl text-xl uppercase md:normal-case font-bold text-center text-white px-2">
                            Thank you! We will be in touch soon.
                        </h1>
                    </div>
                    <Image
                        src={imageSrc}
                        quality={100}
                        alt="House"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                        priority
                        fill
                        className="absolute -z-50 brightness-75 object-cover overflow-hidden w-screen"
                    />
                </section>
                <footer className="flex flex-col gap-4 px-4 py-4 w-full">
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

export default ThankYouPage;