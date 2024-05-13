"use client";
import Image from "next/image";
import underline from "../public/underline.svg"
import step1Image from "../public/step1.webp"
import step2Image from "../public/step2.webp";
import step3Image from "../public/step3.webp";
import why1Image from "../public/why1.webp";
import why2Image from "../public/why2.webp";
import why3Image from "../public/why3.webp";
import why4Image from "../public/why4.webp";
import mobileHouseImage from "../public/mobileHouse.webp";
import houseImage from "../public/HouseImage.webp";

import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useState, lazy, Suspense } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MapModal = lazy(() => import('./Components/MapModal'));
const PlacesAutocomplete = lazy(() => import('./Components/PlacesAutocomplete'));

const libraries: ("places")[] = ["places"];



export default function Home() {
    const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;
    const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE;
    const businessLogo = process.env.NEXT_PUBLIC_BUSINESS_LOGO;
    const formattedPhone = businessPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    const currentYear = new Date().getFullYear();

    const [isOpen, setIsOpen] = useState(false);
    const [addressLatLng, setAddressLatLng] = useState({ lat: 0, lng: 0 });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [loadMap, setLoadMap] = useState(false);
    const [imageSrc, setImageSrc] = useState(mobileHouseImage);

    const [utmSource, setUtmSource] = useState("");
    const [utmCampaign, setUtmCampaign] = useState("");
    const [utmTerm, setUtmTerm] = useState("");

    // console.log(address)
    // console.log(zipCode)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get("utm_source");
        const campaign = urlParams.get("utm_campaign");
        const term = urlParams.get("utm_term");

        // Set UTM parameters if they exist, otherwise reset or set a default
        setUtmSource(source || ""); // Sets to empty string if parameter is not found
        setUtmCampaign(campaign || "");
        setUtmTerm(term || "");
    }, []);

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

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    // Load the map only when needed
    const handleLoadMap = () => {
        setLoadMap(true);
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-secondary">
                {/* <section className="flex w-full flex-row justify-center py-2 items-center px-3 sm:px-6 md:px-9 lg:px-16 xl:px-36 relative overflow-hidden"> */}

                {/* <h1 className="hidden lg:block text-2xl md:text-4xl lg:text-5xl font-semibold text-primary text-center text-wrap w-32 sm:w-full drop-shadow-lg">{`${businessName}`}</h1> */}
                {/* <Link
                        href={`tel:${businessPhone}`}
                        className="text-4xl font-bold text-center"
                        aria-label="Call Us"
                    >
                        <div className="flex flex-row gap-2 items-center">
                            {<div className="text-2xl text-nowrap text-primary drop-shadow-md hidden sm:block">{formattedPhone}</div>}
                            <FiPhoneCall className=" bg-primary text-secondary rounded-lg p-2 -rotate-90 size-12 drop-shadow" />
                        </div>
                    </Link> */}
                {/* </section> */}
                <section className="absolute top-2 flex justify-start items-start w-2/3 h-80 overflow-hidden">
                    {businessLogo ? <Image
                        priority
                        src={`${businessLogo}`}
                        alt="logo"
                        // width={600}
                        // height={400}
                        // quality={50}
                        sizes="(max-width: 320px) 280px, 
                        (max-width: 480px) 440px, 
                        (max-width: 768px) 720px, 
                        (max-width: 1024px) 960px, 
                        (max-width: 1280px) 1200px,
                        (max-width: 1536px) 1440px,
                        2000px"    
                        fill
                        className="object-cover absolute w-full h-full"
                    /> : <div></div>}
                </section>

                <section className=" h-screen flex flex-col justify-end items-center px-2 sm:px-10 overflow-hidden w-full relative">

                    <div className="backdrop-blur-md rounded-md p-4 max-w-[1280px] flex flex-col gap-6 relative mb-30">
                        <h1 className="md:text-5xl text-3xl uppercase md:normal-case font-bold text-center text-primary px-2">
                            Sell your house fast for the best price
                        </h1>
                        <h2 className="relative md:text-2xl text-xl md:normal-case flex font-normal text-center text-primary px-2 text-nowrap whitespace-nowrap flex-wrap justify-center">
                            Complete this five-step form and receive a
                            <span className=" md:text-2xl text-xl md:normal-case font-normal flex text-center text-primary px-2 flex-col justify-end items-end text-nowrap whitespace-nowrap">
                                <span><strong>CASH</strong> offer</span>
                                <Image src={underline} alt="underline" loading="lazy" className="w-30 -mt-1" />
                            </span>
                            for your home.
                        </h2>
                        <div className="h-14">
                            <Suspense fallback={<div className="pl-4 text-left text-gray-400 text-md sm:text-xl animate-pulse bg-white shadow-md w-full h-[53px] sm:h-[59px] rounded-lg relative mt-2 py-4">Address of property for sale</div>}>
                                {isLoaded ? (
                                    <PlacesAutocomplete
                                        setAddressLatLng={setAddressLatLng}
                                        setIsOpen={setIsOpen}
                                        setAddress={setAddress}
                                        setZipCode={setZipCode}
                                        handleLoadMap={handleLoadMap}
                                    />
                                ) : <div className="pl-4 text-left text-gray-400 text-md sm:text-xl animate-pulse bg-white shadow-md w-full h-[53px] sm:h-[59px] rounded-lg relative mt-2 py-4">Address of property for sale</div>}
                            </Suspense>
                        </div>
                        <p className="text-primary px-6">
                            We Buy Houses in All 50 States
                        </p>
                    </div>
                    {/* <Image
                        src={imageSrc}
                        alt="House"
                        quality={50}
                        sizes="(max-width: 320px) 280px, 
                        (max-width: 480px) 440px, 
                        (max-width: 768px) 720px, 
                        (max-width: 1024px) 960px, 
                        (max-width: 1280px) 1200px,
                        (max-width: 1536px) 1440px,
                        2000px"
                        priority
                        fill
                        className="absolute -z-50 brightness-75 object-cover overflow-hidden w-full"
                    /> */}
                    <div className="w-screen flex h-40">
                        <span style={{
                            "clipPath": "ellipse(60% 85% at 50% 100%)",
                            "height": "100%",
                            "width": "100%",
                            "background": "#5E6D5A",
                        }}></span>
                    </div>
                </section>

                <section className="flex flex-col gap-8 px-4 items-center w-full bg-[#5E6D5A] text-white pb-10">

                    <h2 className="text-3xl font-semibold text-center">
                        Sell to <span className="font-bold uppercase italic">{`${businessName}`}</span> and Skip the Hassle of Listing
                    </h2>
                    <div className="flex sm:flex-row flex-col gap-4">
                        <div className="flex flex-col gap-2 text-left max-w-[385px] sm:w-1/3">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={step1Image} alt="Step 1" loading="lazy" />
                            </div>
                            <h3 className="text-lg text-gray-100 font-light uppercase">
                                Step 1
                            </h3>
                            <p className="text-left font-semibold">
                                Request your offer online, no prep work or showings.
                            </p>
                            <p className="text-md font-light">
                                Tell us about your home&rsquo;s features and upgrades - it only takes
                                minutes.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[385px] sm:w-1/3">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={step2Image} alt="Step 2" loading="lazy" />
                            </div>
                            <h3 className="text-lg text-gray-100 font-light uppercase">
                                Step 2
                            </h3>
                            <p className="text-left font-semibold">
                                Get a competitive cash offer within 7 minutes.
                            </p>
                            <p className="text-md font-light">
                                There&rsquo;s no financing fall-through risk so you can confidently
                                buy your next home.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[385px] sm:w-1/3">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={step3Image} alt="Step 3" loading="lazy" />
                            </div>
                            <h3 className="text-lg text-gray-100 font-light uppercase">
                                Step 3
                            </h3>
                            <p className="text-left font-semibold">
                                Schedule your hassle free, quick closing, get paid in as little
                                as 7 days!
                            </p>
                            <p className="text-md font-light">
                                Line up your close dates so you avoid double-moves and
                                double-mortgages.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4 px-4 py-20 w-full items-center">
                    <h2 className="text-3xl font-semibold text-center">
                        Why Selling to <span className="text-primary font-bold uppercase italic">{`${businessName}`}</span> is Better
                    </h2>

                    <div className="flex flex-row">
                        <div className="flex flex-col sm:justify-end text-right gap-4">
                            <p className="text-primary font-bold">
                                Selling to {`${businessName}`}
                            </p>
                            <p className="">Competitive cash offer in 24 hours ✅</p>
                            <p className="">No listing, prep work or showings ✅</p>
                            <p className="">Skip the repair work ✅</p>
                            <p className="">Choose any close date from 10-60 days ✅</p>
                        </div>

                        <div className="flex flex-col sm:gap-4 text-center justify-center sm:justify-start">
                            <p className="mx-2 bg-gray-200 rounded-full p-1 uppercase">vs</p>
                        </div>

                        <div className="flex flex-col justify-start gap-4 text-left">
                            <p>Selling with a Traditional Agent</p>
                            <p className="">❌ Risk of buyer financing falling through</p>
                            <p className="">❌ Hours of prep work and home showings</p>
                            <p className="">❌ Managing repairs yourself</p>
                            <p className="">❌ Uncertain closing timeline</p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-8 px-4 items-center w-full bg-[#5E6D5A] text-white py-10">
                    <h2 className="text-3xl font-semibold text-center">
                        Reasons Homeowners Sell with {`${businessName}`}
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why1Image} alt="Why 1" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 font-semibold">Sell Fast</h3>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why2Image} alt="Why 2" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 font-semibold">
                                Avoid Costly Repairs
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why3Image} alt="Why 3" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 font-semibold">
                                Inherited Property
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why4Image} alt="Why 4" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 font-semibold">
                                Avoid Foreclosure
                            </h3>
                        </div>
                    </div>
                    <h2 className="text-3xl font-semibold text-center">
                        We Buy Houses in All 50 States
                    </h2>
                </section>
                <footer className="flex flex-col gap-4 px-4 w-full">
                    <hr className="border-gray-300 w-full" />
                    <div className="flex flex-row justify-center space-x-4">
                        <p>© {`${currentYear} ${businessName}`}</p>
                        <Link href={"/privacy"}>Privacy Policy</Link>
                        <Link href={"/terms"}>Terms and Conditions</Link>
                    </div>
                </footer>
                <Suspense fallback={<div>Loading...</div>}>
                    {loadMap &&
                        <MapModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            addressLatLng={addressLatLng}
                            name={name}
                            email={email}
                            phone={phone}
                            address={address}
                            zipCode={zipCode}
                            utmSource={utmSource}
                            utmCampaign={utmCampaign}
                            utmTerm={utmTerm}
                            setName={setName}
                            setEmail={setEmail}
                            setPhone={setPhone}
                        />
                    }
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </Suspense>
            </main>

        </>
    );
}
