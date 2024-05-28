"use client";
import Image from "next/image";
import logoIcon from "../public/MovedByMillerLogoIcon.webp";
import underline from "../public/underline.svg"
import step1Image from "../public/online-survey.png"
import step2Image from "../public/conversation.png";
import step3Image from "../public/celebration.png";
import why1Image from "../public/why1.webp";
import why2Image from "../public/why2.webp";
import why3Image from "../public/why3.webp";
import why4Image from "../public/why4.webp";
import ZachMiller from "../public/ZachMiller.webp";
import { GoStarFill } from "react-icons/go";

import Link from "next/link";
import { useEffect, useState, lazy, Suspense } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Dancing_Script } from 'next/font/google'
const dancingScript = Dancing_Script({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-dancing-script'
})


const MapModal = lazy(() => import('./Components/MapModal'));
const PlacesAutocomplete = lazy(() => import('./Components/PlacesAutocomplete'));

const libraries: ("places")[] = ["places"];



export default function Home() {
    const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;
    const currentYear = new Date().getFullYear();

    const [isOpen, setIsOpen] = useState(false);
    const [addressLatLng, setAddressLatLng] = useState({ lat: 0, lng: 0 });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");

    const [loadMap, setLoadMap] = useState(false);
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
                {/* Above the fold */}
                <section className="h-screen flex flex-col justify-start min-h-600:justify-between items-center px-2 overflow-hidden w-full relative -mb-1">
                    {/* logo */}
                    <div className="relative flex justify-center w-[400px] sm:w-[600px] lg:w-[800px] h-80">
                        <svg width="100%" height="100%" className="absolute overflow-visible hidden min-h-800:sm:flex">
                            <circle cx="23.5%" cy="45%" r="130px" fill="none" stroke="#9C7945" strokeWidth="1" />
                        </svg>
                        <div className="flex flex-row items-center h-20 bg-secondary relative min-h-400:sm:top-10 min-h-800:top-25">
                            {logoIcon ?
                                <div>
                                    <Image
                                        priority
                                        src={logoIcon}
                                        alt="logo"
                                        quality={100}
                                        width={80}
                                        height={80}
                                        className=""
                                    />
                                </div>
                                : <div></div>}
                            <div className="flex flex-col">
                                <h1 className="uppercase text-primary text-3xl md:text-4xl lg:text-5xl font-medium leading-9 text-nowrap">{businessName}</h1>
                                <h2
                                    className={`${dancingScript.variable} text-xl text-nowrap tracking-[11px] md:tracking-[15px] lg:tracking-[21px] lg:text-2xl`}
                                    style={{
                                        fontFamily: "var(--font-dancing-script)",
                                        fontWeight: "400",
                                        fontStyle: "normal",
                                        color: "#124d18",
                                        // fontSize: "1.5rem",
                                        // letterSpacing: "11px",
                                    }}
                                >Trust Tomorrow</h2>
                            </div>
                        </div>
                    </div>
                    {/* form */}
                    <div className=" p-1 lg:p-3 max-w-[1280px] flex flex-col lg:gap-4 relative justify-center backdrop-blur-sm z-10">
                        <h1 className="md:text-4xl lg:text-5xl text-3xl uppercase md:normal-case font-bold text-center text-primary px-2">
                            Sell your house fast for the best price
                        </h1>
                        <h2 className="relative md:text-2xl text-xl md:normal-case flex font-normal text-center text-primary px-2 text-nowrap whitespace-nowrap flex-wrap justify-center">
                            Complete this 6-step form to receive a
                            <span className=" md:text-2xl text-xl md:normal-case font-normal flex text-center text-primary px-2 flex-col justify-end items-end text-nowrap whitespace-nowrap">
                                <span><strong>CASH</strong> offer</span>
                                <Image src={underline} alt="underline" loading="lazy" className="w-30 -mt-1" />
                            </span>
                            for your home.
                        </h2>
                        <div className="h-14 px-2">
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
                        <p className="text-primary px-6 mt-3">
                            Enter the property address above to get started
                        </p>
                    </div>
                    {/* Transition to next section ellipse */}
                    <div className="w-screen flex h-40 -mb-1">
                        <span style={{
                            "clipPath": "ellipse(60% 85% at 50% 100%)",
                            "height": "100%",
                            "width": "100%",
                            "background": "#5E6D5A",
                        }}></span>
                    </div>
                </section>

                {/* 3 Step Process */}
                <section className="flex flex-col gap-8 px-4 items-center w-full bg-[#5E6D5A] text-white pb-10">
                    <h2 className="text-3xl font-semibold text-center">
                        Sell to <span className="font-bold uppercase italic">{`${businessName}`}</span> and Skip the Hassle of Listing
                    </h2>
                    <div className="flex sm:flex-row flex-col gap-12">
                        <div className="flex flex-col justify-center items-center gap-2 text-left max-w-[250px] sm:w-1/3">
                            <div className="flex">
                                <Image src={step1Image} alt="Step 1" loading="lazy" height={200} width={150} />
                            </div>
                            <h3 className="text-xl text-gray-100 font-light uppercase">
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
                        <div className="flex flex-col justify-center items-center gap-2 text-left max-w-[250px] sm:w-1/3">
                            <div className="">
                                <Image src={step2Image} alt="Step 2" loading="lazy" height={200} width={150} />
                            </div>
                            <h3 className="text-xl text-gray-100 font-light uppercase">
                                Step 2
                            </h3>
                            <p className="text-left font-semibold">
                                Meet with us in-person to build your offer.
                            </p>
                            <p className="text-md font-light">
                                There&rsquo;s no financing fall-through risk so you can confidently
                                buy your next home.
                            </p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 text-left max-w-[250px] sm:w-1/3">
                            <div className="">
                                <Image src={step3Image} alt="Step 3" loading="lazy" height={200} width={150} />
                            </div>
                            <h3 className="text-xl text-gray-100 font-light uppercase">
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

                {/* Comparison Section */}
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

                {/* Testimonials Section */}
                <section className="flex flex-col gap-8 px-4 items-center w-full bg-[#5E6D5A] text-white py-10">
                    <h2 className="text-3xl font-semibold text-center">
                        What Our Customers are Saying About Us
                    </h2>
                    <div className="flex flex-row flex-wrap sm:w-10/12 md:w-8/12 lg:w-6/12 gap-10">
                        <div className="flex flex-col gap-4 shadow-border-shadow p-4">
                            <div className="flex flex-col gap-2">
                                <p>
                                    &ldquo;I recently used Moved by Miller to sell a home I inherited. The home needed to go through probate, and I was completely unfamiliar with that process. Additionally, the home was in pretty rough shape, and I wasn&apos;t sure it would sell. Realtors I had spoken to previously told me I needed to fix many of the problems and repair the home, but I didn&apos;t have the money to do so.
                                </p>
                                <p>
                                    Initially, it felt very overwhelming, but Zach from Moved by Miller was a lifesaver. He answered all my questions, connected me with a reliable probate attorney, and guided me through every step of the process. Zach went above and beyond by showing me exactly how he arrived at his offer. We actually built the offer together, which made me feel much more confident and involved in the process.
                                </p>
                                <p>
                                    His expertise and support made what could have been a daunting experience surprisingly smooth. After probate was completed, we closed on the house in just about two days. I am confident that if I had used a regular realtor, the process wouldn&apos;t have been as seamless.
                                </p>
                                <p>
                                    I cannot recommend Moved by Miller highly enough. Zach was a godsend with his professionalism, knowledge, and dedication to his clients truly setting him apart.&quot;
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row text-yellow-500">
                                    <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                                </div>
                                <h3 className="text-md text-gray-100 font-semibold">Richard F - Irondale</h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 shadow-border-shadow p-4">
                            <div className="flex flex-col gap-2">
                                <p>
                                    &ldquo;Going through a divorce after 16 years of marriage was tough enough, but having to sell our home on top of that was heartbreaking. The judge ordered us to sell the home where we had built so many memories, and the whole idea of letting go was overwhelming.
                                </p>
                                <p>
                                    That&apos;s when we met Zach from Moved by Miller. From the moment he stepped into our home, I knew we were in good hands. He asked about our timeline, gave us a fair offer, and immediately got to work. We ended up selling the home faster than expected, but Zach made sure we could stay for an extra two weeks while we got everything packed up.
                                </p>
                                <p>
                                    Zach and the Moved by Miller team were a godsend during such a difficult time. Their professionalism and compassion made the process so much easier. I can&apos;t thank Zach enough and highly recommend Moved by Miller. Five stars all the way!&quot;
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row text-yellow-500">
                                    <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                                </div>
                                <h3 className="text-md text-gray-100 font-semibold">
                                    Amanda T - Vestavia Hills
                                </h3>
                            </div>

                        </div>
                        <div className="flex flex-col gap-4 shadow-border-shadow p-4">
                            <div className="flex flex-col gap-2">
                                <p>
                                    &quot;My wife and I were fed up with the shootings in Ensley. We knew we needed to move, but the realtor we picked said we had to do a ton of work on our house first. It sat on the market for over 130 days, and we only got a couple of lowball offers.
                                </p>
                                <p>
                                    Then we met Zach from Moved by Miller, and he was an answered prayer. Such a kind young man who really cares about his customers. He sold our home, and we didn&apos;t have to do anything! The offer he gave us was exactly what we got no strings attached.
                                </p>
                                <p>
                                    On top of that, Zach helped us find our dream home. He was selling another home for a different client, told us about it, and we went to see it. We fell in love and bought that home. The whole process took about two weeks.
                                </p>
                                <p>
                                    I don&apos;t know where we&apos;d be without Zach. If you&apos;re thinking about selling, call Zach. He came in, listened to us, and took the weight off our shoulders. He met us where we were and made everything so much easier.&quot;
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row text-yellow-500">
                                    <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                                </div>
                                <h3 className="text-md text-gray-100 font-semibold">
                                    Daryl and Debbie F - Ensley
                                </h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 shadow-border-shadow p-4">
                            <div className="flex flex-col gap-2">
                                <p>
                                    &quot;I inherited a home that needed a lot of repairs I couldn&apos;t afford and was unsure about selling. Working with Zach from Moved by Miller turned out to be a wonderful experience. He was kind, compassionate, and listened well. He wasn&apos;t pushy and helped me build an offer that fit my schedule perfectly.
                                </p>
                                <p>
                                    Zach showed me different ways to sell or get out of the situation and asked which option I thought was best. His option was by far the best. The whole process was smooth and stress-free. I highly recommend Moved by Miller!&quot;
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row text-yellow-500">
                                    <GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill />
                                </div>
                                <h3 className="text-md text-gray-100 font-semibold">
                                    Douglas G - Birmingham
                                </h3>
                            </div>
                        </div>

                    </div>
                </section>

                {/* About Moved By Miller */}
                <section className="flex flex-col gap-4 px-4 py-20 w-full items-center">
                    <h2 className="text-3xl font-semibold text-center">
                        About <span className="text-primary font-bold uppercase italic">{`${businessName}`}</span>
                    </h2>
                    <div className="flex flex-col items-center sm:flex-row gap-8 sm:w-4/5">
                        <Image src={ZachMiller} alt="Zach Miller" loading="lazy" width={250} height={500} className="flex rounded-lg shadow-xl shadow-gray-400 sm:self-start" />
                        <div className="flex flex-col gap-4 text-left ">
                            <p>
                                At <span className="font-bold italic">{`${businessName}`}</span>, we recognize that life can bring unexpected challenges requiring swift real estate solutions. Serving the greater Birmingham area, our mission is to provide families with the support they need during difficult times. With 4 years of experience and over 300 transactions, I specialize in off-market homes that need to be sold quickly and efficiently.
                            </p>
                            <p>
                                Transparency is at the core of our approach. We build your offer together, leveraging our expertise as licensed real estate agents to conduct a thorough comparative market analysis. This ensures that you receive a fair and competitive offer tailored to your unique situation. Unlike others, we prioritize personal connections over virtual appointments. By meeting in person, we ensure that our clients never feel like just another number.
                            </p>
                            <p>
                                Our goal is to help families &lsquo;trust tomorrow&rsquo; by offering compassionate, expert guidance throughout the entire process. We handle the complexities of real estate transactions, allowing you to focus on moving forward to the next phase of your life. At Moved by Miller, we are dedicated to truly assisting our clients in overcoming challenges and achieving a fresh start.
                            </p>
                        </div>
                    </div>

                </section>

                {/* Reasons Section */}
                <section className="flex flex-col gap-8 px-4 items-center w-full bg-[#5E6D5A] text-white py-10">
                    <h2 className="text-3xl font-semibold text-center">
                        Reasons Homeowners Sell with <span className="font-bold italic">{`${businessName}`}</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why1Image} alt="Why 1" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 text-center font-semibold">Sell Fast</h3>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why2Image} alt="Why 2" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 text-center font-semibold">
                                Avoid Costly Repairs
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why3Image} alt="Why 3" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 text-center font-semibold">
                                Inherited Property
                            </h3>
                        </div>
                        <div className="flex flex-col gap-2 text-left max-w-[380px] sm:w-1/4">
                            <div className="aspect-w-16 aspect-h-9">
                                <Image src={why4Image} alt="Why 4" loading="lazy" />
                            </div>
                            <h3 className="text-md text-gray-100 text-center font-semibold">
                                Avoid Foreclosure
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Footer */}
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
            </main >

        </>
    );
}
