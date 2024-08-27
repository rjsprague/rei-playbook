"use client";
import Image from "next/image";
import { FaCheck, FaChevronCircleDown } from "react-icons/fa";
import reiaLogo from "@/public/REIAlogoWebP.webp"
import m4m from "@/public/M4MwebP.webp"
import tcMockup from "@/public/TriageCallWebP.webp"
import ppMockup from "@/public/PerfectPresentationWebP.webp"
import dsdMockup from "@/public/DSDwebP.webp"
import adaMockup from "@/public/ADAwebP.webp"
import psaMockup from "@/public/PSAwebP.webp"
import ffMockup from "@/public/FundingFormulaWebP.webp"
import acqdisMockup from "@/public/acq-dis-webp.webp"
import ckmMockup from "@/public/CKMwebP.webp"
import reiPlaybookMockup from "@/public/REIPlaybookMockup.webp"
import juneKPIs from "@/public/juneKPIs.avif"
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import FreeTrialButton from "@/app/components/FreeTrialButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const courses = [
    { id: 'M4M', name: 'Marketing for Motivation' },
    { id: 'TCPP', name: 'Triage Call & Perfect Presentation' },
    { id: 'DSD', name: 'Deal Structure Dictionary' },
    { id: 'ADA', name: 'AutoDeal Analyzer' },
    { id: 'PSA', name: 'The Strongest PSA' },
    { id: 'FF', name: 'Funding Formula' },
    { id: 'AcqDis', name: 'Acquisitions & Dispositions' },
    { id: 'CKM', name: 'Conversion KPIs Masterclass' }
]


export default function Page() {
    const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;
    const currentYear = new Date().getFullYear();

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "" as string,
        email: "" as string,
        phone: "" as string,
        course: {} as { id: string, name: string },
        utm_source: "" as string,
        utm_campaign: "" as string,
        utm_term: "" as string,
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get("utm_source") || "";
        const campaign = urlParams.get("utm_campaign") || "";
        const term = urlParams.get("utm_term") || "";

        setFormData(prevFormData => ({
            ...prevFormData,
            utm_source: source,
            utm_campaign: campaign,
            utm_term: term,
        }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-tertiary">
                {/* Above the fold */}
                <section className="flex flex-col justify-start items-center overflow-hidden w-full bg-white">
                    {/* logo */}
                    <div className="relative flex justify-center w-full bg-tertiary">
                        <div className="flex flex-row items-center py-4 px-2">
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
                    <div className="flex flex-col gap-5 sm:gap-10 text-primary py-10 px-2 items-center">
                        <h1 className="text-4xl sm:text-6xl text-center font-bold px-2">
                            Congratulations!
                        </h1>
                        <h2 className="text-2xl sm:text-3xl font-semibold">
                            Your email is now confirmed and you have access to your course!
                        </h2>
                        <ol className="list-decimal list-inside space-y-4 sm:w-3/4">
                            <h3 className="text-xl font-medium">NEXT STEPS:</h3>
                            <li className="text-md sm:text-lg">
                                <strong>CHECK</strong> your email for an email with the subject &quot;Welcome to REI Automated Training and Tutorials Site&quot;
                            </li>
                            <li className="text-md sm:text-lg">
                                <strong>CLICK</strong> the &quot;Login Here&quot; link in the email
                            </li>
                            <li className="text-md sm:text-lg">
                                <strong>SET</strong> a password for your account.
                            </li>
                            <li className="text-md sm:text-lg">
                                <strong>LOGIN</strong> to your account and start learning!
                            </li>
                        </ol>
                        <p className="text-md sm:text-lg sm:w-3/4">
                            If for some reason you can&apos;t find the email then you can go here to login. Use the &quot;Forgot Password&quot; link to set a password for your account. Be sure to enter the same email address you used to sign up for the course. If you made a mistake when signing up you can try to sign up again. If all else fails you can email support@reiautomated.io and we will help you. Thanks for giving us the opportunity to help you in your REI business!
                        </p>
                    </div>
                </section>

                {/* REI Playbook Mastermind membership */}
                <section id="specialOffer" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-tertiary text-white pb-10">
                    <Link href="#specialOffer">
                        <div className="flex flex-row justify-center items-center">
                            <FaChevronCircleDown className="text-5xl text-white animate-bounce" />
                            <h1 className="md:text-5xl lg:text-6xl text-2xl font-bold text-center px-2 animate-bounce">
                                SPECIAL OFFER
                            </h1>
                            <FaChevronCircleDown className="text-5xl text-white animate-bounce" />
                        </div>
                    </Link>
                    <div className="flex flex-col gap-6 w-full sm:w-8/12 text-lg">
                        <Image src={reiPlaybookMockup} alt="REI Playbook Mastermind membership" />
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center">
                            The REI Playbook and Mastermind
                        </h2>
                        <p className="text-lg font-semibold">
                            Dear wholesaler/flipper/landlord/real estate investor,
                        </p>
                        <p>
                            The REI Playbook and REI Playbook Mastermind is my solution to providing as much as I possibly can for the most reasonable price.
                        </p>
                        <p>
                            There is a lot of fluff out there in the REI guru space. I know, I&apos;ve bought most of it. And after spending literally hundreds of thousands on courses, events, mentorships, coaching and applying it to my own business, I know what works and what doesn&apos;t. As a former Marine, I am only interested in keeping what works. The REI Playbook is almost everything I use in my own business (minus my CRM, phone service, and a few other things I show you in the courses) to do deals every month.
                        </p>
                        <p>
                            Here are my some of my KPIs for June, 2024
                        </p>
                        <Image src={juneKPIs} alt="June 2024 KPIs" className="self-center" quality={100} width={1280} />
                        <p>
                            My team was able to use the $1855 we spent on ads to generate 32 leads, connect with 25, complete 14 triage calls, qualify 9 seller leads, analyze 8 deals, pitch 7 perfect presentations, and put 6 properties under contract worth about $120k. Some of those contracts might not work out, but at the end of the day I know we did pretty well and we had a great month.
                        </p>
                        <p>
                            And while I can&apos;t guarantee you will get these results, or even anywhere close to them, I can provide you everything my team and I use to crush it every month. And I can provide it to you for a fraction of the cost of what I paid for it.
                        </p>
                        <p>
                            If you haven&apos;t had the chance yet to look through each of the course descriptions below I encourage you to do so.
                        </p>
                        <p>
                            If, after reading through everything, you feel like this isn&apos;t worth the price tag, then just close the browser tab and enjoy your free course.
                        </p>
                        <p>
                            But if you feel like you are getting everything you need for a fraction of the price of what most others are charging, then just click the one of the buttons like the one below to start your 14-DAY FREE TRIAL to the REI Playbook and REI Playbook Mastermind. After test driving it I think you will agree that it&apos;s worth way more than $97 per month.
                        </p>
                        <p>
                            To your success,<br />
                            Keith Gillispie and Team REI Automated
                        </p>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* Marketing for Motivation */}
                <section className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-white text-primary pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        Marketing for Motivation
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">
                        <Image src={m4m} alt="Marketing for Motivation" />
                        <p>
                            Are you struggling to get motivated seller leads? Tired of talking to tire-kickers who say they might buy if &quot;the price is right&quot;? Uncover the art of attracting motivated seller leads into your REI business with Marketing for Motivation...
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">Discover</span> the BIG 5 Motivators that make up 80% of the most motivated sellers in the market and how to talk to each type based on their motivations</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">Learn</span> Inbound VS Outbound marketing, Sweat Marketing vs Paid Marketing, and how 12 different marketing channels stack up in terms of lead quality, scalability, call volume, cost per contract, and cost per lead.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">Choose</span> the best marketing strategy for you based on your monthly marketing budget and available time</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">Deep Dive</span> into Pay Per Click (PPC), Pay Per Lead (PPL), and Sweat Marketing</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">Optimize</span> your PPC campaigns with our guide, including our proprietary weekly marketing report template. Did you know that your leads can actually get better AND cheaper over time? We&apos;ll teach you the secret in this guide.</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* Triage Call & Perfect Presentation */}
                <section id="TCPP" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-tertiary text-white pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        Triage Call & Perfect Presentation Call Scripts
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">

                        {/* The Triage Call */}
                        <Image src={tcMockup} alt="Triage Call" />
                        <p>
                            Qualifying seller leads is a crucial step in papering deals. With the Triage Call course you get a dynamic call script that changes based on the answers your seller lead gives you. It guides you through the conversation, making sure you don&apos;t miss anything, increases your chance of properly qualifying seller leads, so you can STOP wasting time on bad leads and start FOCUSING your time on the good ones.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">USE</span> our proprietary dynamic call script to qualify your leads. Get the results emailed to you on submission.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">LEARN</span> how to use the Triage Call script with 90 minutes of training specifically teaching how to use it to talk to seller leads.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">UNDERSTAND</span> the Triage Call at a high level with the Triage Call Results and Conditions flow charts so you know exactly how it works.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">QUICKLY</span> estimate repairs with our Dirty Repair Estimator tool so you can get a reliable ballpark for repairs on every call.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PRACTICE</span> your Triage Call skills by using real call recordings of qualified sellers, unqualified sellers, and qualified sellers with creative financing pitches.</p>
                            </li>
                        </ol>

                        {/* The Perfect Presentation */}
                        <Image src={ppMockup} alt="Perfect Presentation" />
                        <p>
                            The Perfect Presentation is the 2nd call in a 2-call close. This is where numbers from your desktop deal analysis come into play, along with your sales, pitching and negotiation skills. When done right profit margins can be increased significantly on a potential deal.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">USE</span> our proprietary dynamic call script to qualify your leads. Get the results emailed to you on submission.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">DISCOVER</span> why we NEVER make offers and how by doing this we are able to gain a significant advantage in negotiations, and how to pitch your preferred deal structure to increase your chances of papering a deal your mother would be proud of.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">DEEP DIVE</span> into creative financing closing scripts so you can tap into deal structures with the significant profit potential.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PRACTICE</span> your Perfect Presentation skills by using real call recordings of my Perfect Presentations.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">GO</span> to contract with confidence after learning when to go to contract, and how to use data to make better decisions</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* Deal Structure Dictionary */}
                <section id="DSD" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-white text-primary pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        Deal Structure Dictionary
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">
                        <Image src={dsdMockup} alt="Deal Structure Dictionary" />
                        <p>
                            What if you had the knowledge and skills to turn more of your leads into cash? What would that be worth to you? The Deal Structure Dictionary will do exactly that by teaching you multiple entrance and exit strategies on both a high level, and how to pitch the more advanced deal structures to increase you chances of successfully acquiring properties using your preferred structure. It also gives you the rules of engagement I use in my business to reduce my risk on every deal because one bad deal can do massive damage to your business. Avoid bad deals and get more profit with the Deal Structure Dictionary.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">REFRESH</span> on essential real estate investing terms. This foundational course is meant to be beginner friendly while also providing a depth of knowledge that has left even veterans in the industry feeling surprised.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PROTECT</span> your business with my 8 Rules of Deal Structure. These rules are going to help you make more money while taking on less risk. Ignore them at your own risk.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">LEARN</span> entrance strategies like Cash, Subject-To, Owner Finance, Hybrid, and exit strategies like Wholetail, Rehab to Retail, Rentals, BRRRR, Lease Option, Owner Finance, and Wholesale and New Construction. You will ALWAYS have the right to tool for the job so you can maximize your chances to doing a deal with every lead.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PITCH</span> advanced deal structures like a pro with my in-depth training on Sub-To (with Retail and Wrap exits),  Creating 0% Owner Financing, and &quot;The Hybrid&quot;. I don&apos;t just explain how it works, I give you the script and show you how I talk to sellers using it.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">USE</span> my dynamic scripts for pitching advanced deal structures. These are built into the Perfect Presentation dynamic script as well.</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* AutoDeal Analyzer */}
                <section id="ADA" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-tertiary text-white pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        AutoDeal Analyzer
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">
                        <Image src={adaMockup} alt="AutoDeal Analyzer" />
                        <p>
                            There are lots of deal analysis tools out there, but most of them probably don&apos;t calculate all of the potential exits and show profitability to you with the click of a button. Well, that&apos;s just ONE of the features of the AutoDeal Analyzer. Cut your desktop deal analysis down from hours to minutes so that you can get back on the phone with your sellers and pitch them on your preferred deal structure, using the Numbers in Depth to gain significant leverage in the negotiations process.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PULL</span> comparable properties quickly and reliably for any property in the United States. This highly repeatable process is so simple my 7-year old could do it.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">FIND</span> the After Repair Value (ARV) to within 5% for any property in the US using the ARV Finder tool. An accurate ARV is the foundation of negotiations. Getting this right is the difference between a profitable deal and working for free, or worse, a business destroying deal.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">ANALYZE</span> your deals with the click of a button so you can STOP wasting time calculating different exit strategies and START making decisions quickly about how you want to structure your deals.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">ESTIMATE</span> repairs accurately with the Repair Estimator.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PREPARE</span> your deals to be funded by having all of the numbers that lenders want to see. The level of detail will make lending to you a no-brainer for any lender.</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* The Strongest PSA */}
                <section id="PSA" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-white text-primary pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        The Strongest PSA
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">
                        <Image src={psaMockup} alt="The Strongest PSA" />
                        <p>
                            The lynchpin of your business is your contract. Regardless of your exit strategy, your contract needs to be an ironclad agreement that sellers can&apos;t walk away from easily. A poorly written contract will cost you deals that would have otherwise results in tens or even hundreds of thousands in profit. So why re-invent the wheel? With my contract plus training and supporting documents you can go to contract with confidence knowing that there is a contingency for basically every scenario you will face as a real estate investor.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">LEARN</span> how to talk about the purchase and sale agreement with sellers, how to fill it out with a cash entrance, an creative finance entrance, a hybrid entrance, and what to do with arrears.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">REVIEW</span> examples of the PSA and gain confidence to fill it out the right way every time.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">CHEAT</span> your way through the Strongest PSA with the my PSA Cheat Sheet. This step-by-step training and document makes going over the PSA super easy.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">GET</span> sellers to sign on the phone by using DocuSign to send the contract and get a digital signature. This will increase the number of contracts you get by A LOT. Includes DocuSign templates and instructions on how to add a template and work with a template in DocuSign.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">DOCUMENTS</span> like a memorandum of contract, wholesale assignment contract, joint venture agreement, and more will ensure you are ready to rock &apos;n roll as a real estate investor.</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* Funding Formula */}
                <section id="FF" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-tertiary text-white pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        Funding Formula
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">
                        <Image src={ffMockup} alt="Funding Formula" />
                        <p>
                            Have you ever had deals that you couldn&apos;t handle because you didn&apos;t have enough money to fund them? Yeah, me too. In Funding Formula I give you the exact blueprint I developed and use in my own business to get people to line up to lend me their money. I personally have (as of July 2024) never put more than $1 into my deals. I borrow everything I need from private money lenders and in some (rare cases) hard money lenders. I have already borrowed over $10 million dollars from my list of over 100 lenders. And you can do this too.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">LEARN</span> the basics of private money, the hard money lenders I have personally vetted and why you need to start leveraging other people&apos;s money, like yesterday.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">SHIFT</span> your mindset with my most important lesson... and why when you find the deals, the money will come.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PREPARE</span> the silver platter that you will serve up to your private money lenders to get them drooling over your lucrative deals.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">DEEP DIVE</span> into securities like a mortgage note, a deed of trust, a promissory note, your personal guarantee, and insurance. Includes templates to make the process super simple.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">FIND</span> private money lenders with ease in my &quot;How to FIND PMLs&quot; guide.  Includes how to talk to friends and family, Facebook Groups, in-person REIA events, converting cash buyers into PMLs, an RVM script, a cold calling script, an SMS blast template, and email templates.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PRESENT</span> your offer in a way that will almost guarantee they will be excited to lend you their money.  Includes how to prepare for the presentation, topics to cover, overcoming objections, and getting them to commit.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p>And a lot more... (like logistics, cleaning up the books, standard rates to borrow at, our own PML CRM, and FAQs)</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* Acquisitions & Dispositions */}
                <section id="AcqDis" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-white text-primary pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        Acquisitions & Dispositions
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">
                        <Image src={acqdisMockup} alt="Acquisitions & Dispositions" />
                        <p>
                            You&apos;ve got your property under contract, now what? Well, if you are planning on taking title to the property there are a bunch of things you need to do. And this is why we created very simple, step-by-step checklists and supporting documents to make the process of acquiring properties as easy as possible. And we didn&apos;t stop there, we did it for the dispositions side as well. This is our Acquisitions & Dispositions project management system. You will get access to all of the templates, bring them into Asana, and manage all of your projects that are under contract.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">DO</span> your Due Diligence to make sure that the property you have under contract is worth buying, and if it is that you acquire in a timely manner, get an even more accurate understanding of the condition of the property, and renegotiate if needed.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">CLOSE</span> with confidence with my Closing Checklist. Everything you need to do to make sure that nothing gets skipped. Keeps the process smooth and efficient.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">PROCESSES</span> for every kind of exit strategy. Wholesale? Check. Novation? Check. Rental? Check. Wrap? Check. Wholetail/Retail? Check. Never find yourself lost again trying to figure out what you did or didn&apos;t do on your deals. Follow the process.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">DEEP DIVE</span> into how we use Asana to manage projects with &quot;Setting Up Asana&quot;, &quot;Asana: Deep Dive&quot; and &quot;How to Transition to Asana&quot; trainings.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">DON&apos;T</span> lose sleep over lost deals anymore with my Deal Lost Checklist. Wrap it up and move on to the next one without any regrets.</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* Conversion KPIs Masterclass */}
                <section id="CKM" className="flex flex-col gap-8 px-4 py-10 items-center w-full bg-tertiary text-white pb-10">
                    <h1 className="md:text-4xl lg:text-5xl text-3xl font-bold text-center px-2 mt-6 sm:m-10">
                        Conversion KPIs Masterclass
                    </h1>
                    <div className="flex flex-col gap-12 w-full sm:w-8/12">
                        <Image src={ckmMockup} alt="Conversion KPIs Masterclass" />
                        <p>
                            If you don&apos;t know your numbers you don&apos;t have a business. One of the most powerful tools we have to optimize a business are key performance indicators (KPIs). By tracking these numbers over time you can find the bottlenecks in your business and begin to make targeted adjustments. This allows you to focus energy in the places where it is going to have the biggest impact. It has made a massive impact in my real estate investing business and I strongly encourage you to take this very seriously. It will take you from struggling real estate investor to consistently profitable real estate investor. And in Conversion KPIs Masterclass, I don&apos;t just teach you the KPIs that convert and how to track them, I teach you how to implement best business practices into your business so you can optimize these KPIs and ultimately become a successful real estate investor.
                        </p>
                        <ol className="list-item list-inside space-y-4">
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">KNOW</span> the KPIs to track and why. Stop tracking vanity metrics and start tracking the numbers that matter most in your business.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">TRACK</span> your KPIs using the Basic KPI Tracker. This simple tool will help you turn your business around by giving you the exact same KPIs that I track in my business, and when your KPIs fall below the bar, it will give you some hints on how to improve them.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">SEND</span> the exact same initial automated messages that I do to improve your connection rate and start the ball rolling with seller leads even when you&apos;re sleeping.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">FOLLOW UP</span> with your leads using automated follow up messages so are top of mind when the seller is ready to move forward.</p>
                            </li>
                            <li className="flex items-start space-x-2">
                                <FaCheck className="text-secondary flex-shrink-0 size-5" />
                                <p><span className="font-bold">OPTIMIZE</span> your KPIS like connection rate, call rate, qualification rate, contract rate and acquisition rate. Don&apos;t just know your numbers. Optimize them. Soon you could be achieving an 88% connection like I do.</p>
                            </li>
                        </ol>
                        <FreeTrialButton setIsOpen={setIsOpen} />
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex flex-col gap-4 px-4 w-full text-gray-100">
                    <hr className="border-gray-300 w-full" />
                    <div className="flex flex-row justify-center space-x-4">
                        <p>© {`${currentYear} ${businessName}`}</p>
                        <Link href={"/privacy"}>Privacy Policy</Link>
                        <Link href={"/terms"}>Terms and Conditions</Link>
                    </div>
                </footer>
                <Suspense fallback={<div>Loading...</div>}>
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-70">
                            <DialogPanel className="items-center max-w-2xl space-y-8 text-white bg-blue-600 shadow-super border-t-2 border-t-gray-300 px-12 py-8 rounded-lg flex flex-col justify-between">
                                <DialogTitle className="font-bold text-6xl text-center">3 Great Options</DialogTitle>
                                <div className="line"></div>
                                <Description className="font-semibold text-xl text-center">
                                    Choose the billing cycle that works best with your budget:
                                </Description>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                    <Link href="https://knowledge.reiautomated.io/enroll/3073231?price_id=3940839" className="w-full">
                                        <div className="bg-blue-700 hover:bg-primary text-white text-center text-xl font-semibold px-6 py-3 rounded-lg shadow-super flex flex-col justify-between h-48">
                                            <p className="text-2xl mb-4">Monthly</p>
                                            <p className="text-3xl font-bold">$97</p>
                                            <p className="mt-4 italic">per month</p>
                                        </div>
                                    </Link>

                                    <Link href="https://knowledge.reiautomated.io/enroll/3073231?price_id=3940846" className="w-full">
                                        <div className="bg-blue-800 hover:bg-primary text-white text-center text-xl font-semibold px-6 py-3 rounded-lg shadow-super flex flex-col justify-between h-48">
                                            <p className="text-2xl">Quarterly</p>
                                            <p className="text-lg mb-4 text-green-600 font-semibold italic drop-shadow">Save 15%</p>
                                            <p className="text-3xl font-bold">$247</p>
                                            <p className="mt-4 italic">per quarter</p>
                                        </div>
                                    </Link>

                                    <Link href="https://knowledge.reiautomated.io/enroll/3073231?price_id=3940845" className="w-full">
                                        <div className="bg-tertiary hover:bg-primary text-white text-center text-xl font-semibold px-6 py-3 rounded-lg shadow-super flex flex-col justify-between h-48">
                                            <p className="text-2xl">Annual</p>
                                            <p className="text-lg mb-4 text-green-600 font-bold italic drop-shadow">Save 32%</p>
                                            <p className="text-3xl font-bold">$797</p>
                                            <p className="mt-4 italic">per year</p>
                                        </div>
                                    </Link>

                                </div>
                                <p className="text-lg font-medium">All plans come with a 14-Day FREE TRIAL</p>
                            </DialogPanel>
                        </div>
                    </Dialog>

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
                </Suspense >
            </main >

        </>
    );
}
