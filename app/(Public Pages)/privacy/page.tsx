import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;

    return (


        <main className="p-4">
            <section className='px-10 space-y-4 mb-12'>
                <a href="/" className="underline">Home</a>
                <hr className="border-gray-300 w-full" />
                <h1 className="text-3xl text-center">Privacy Policy</h1>
                <hr className="border-gray-300 w-full" />
                <p>This privacy notice discloses the privacy practices for this website. This privacy notice applies solely to information collected by this website. In a nutshell, the goal of this website is to gather leads from people interested in selling their home. The main way this occurs is if you fill out our contact form, call us or email us. We also serve retargeting ads via a number of services including but not limited to Facebook, Google, adroll and Bing. In addition we may use third-party analytics suites including but not limited to Google analytics. We only use this to analyze aggregate visitor data. If you have any questions about this privacy policy you can contact us by filling out our contact form. We encourage you to read this entire privacy policy. It will notify you of the following:</p>
                <ol className=" list-decimal list-inside px-10">
                    <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
                    <li>What choices are available to you regarding the use of your data.</li>
                    <li>The security procedures in place to protect the misuse of your information.</li>
                    <li>How you can correct any inaccuracies in the information.</li>
                </ol>
            </section>

            <section className='px-10 space-y-4 mb-12'>
                <hr className="border-gray-300 w-full" />
                <h1 className="text-3xl  text-center">Information Collection, Use, and Sharing</h1>
                <hr className="border-gray-300 w-full" />
                <p>We are the sole owners of the information collected on this site. We only have access to collect information that you voluntarily give us via email, if you fill out our contact form, call us, or other direct contact from you. We may maintain this information forever unless you ask us to delete it. We will immediately stop contacting you if you request so. We also use Google analytics which collects data about you and your visit to our website.</p>

                <p>This website does use cookies for the purpose of serving retargeting ads. As of March 2023 Google allows us to retarget visitors for up to 540 days after their last visit to our site and we may choose to retarget site visitors for up to that length of time. We do not show retargeting ads to members of the European Union. If you are not comfortable with this we encourage you to leave this site now and clear your cookies. You can also visit in anonymous mode depending on the browser you are using.</p>

                <p>We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization.</p>

                <p>Text opt-in consent data will not be sold or shared with third parties for promotional or marketing purposes.</p>

                <p>Unless you ask us not to, we may contact you via email or phone in the future. when you visit our site a cookie will be placed on your computer by Google and will allow us to serve you ads when you visit Google AdSense sites (this is called retargeting or remarketing). If you clear your cookies and do not visit our site again then you will no longer see these ads. If you come back to our site you will need to clear your cookies again to stop seeing our remarketing ads.</p>
            </section>

            <section className='px-10 space-y-4 mb-12'>
                <hr className="border-gray-300 w-full" />
                <h1 className="text-3xl  text-center">Your Access to and Control Over Information</h1>
                <hr className="border-gray-300 w-full" />
                <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the contact form given on our website:</p>
                <ol className="list-disc list-inside px-10">
                    <li>See what data we have about you, if any.</li>
                    <li>Change/correct any data we have about you.</li>
                    <li>Have us delete any data we have about you.</li>
                    <li>Express any concern you have about our use of your data.</li>
                </ol>
            </section>

            <section className='px-10 space-y-4 mb-12'>
                <hr className="border-gray-300 w-full" />
                <h2 className="text-3xl  text-center">California Online Privacy Protection Act Compliance</h2>
                <hr className="border-gray-300 w-full" />
                <p>Because we value your privacy we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act. We therefore will not distribute your personal information to outside parties without your consent.</p>
            </section>

            <section className='px-10 space-y-4 mb-12'>
                <hr className="border-gray-300 w-full" />
                <h2 className="text-3xl  text-center">Childrens Online Privacy Protection Act Compliance</h2>
                <hr className="border-gray-300 w-full" />
                <p>We are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act), we do not collect any information from anyone under 13 years of age. Our website, products and services are all directed to people who are at least 13 years old or older.</p>
            </section>

            <section className='px-10 space-y-4 mb-4'>
                <p>If you feel that we are not abiding by this privacy policy, you should contact us immediately by filling out our contact form.  If you are a citizen of the EU you also have the right to lodge a complaint with the Information Commissioner’s Office.</p>
            </section>

            {/* <hr className="border-gray-300 w-full" />
            <h2 className="font-bold text-center py-4">Policy Summary</h2>
            <hr className="border-gray-300 w-full" />
            <h3 className="text-left font-semibold py-4">Personal Data processed for the following purposes and using the following services:</h3> */}

            {/* <section className="flex flex-col gap-4 text-sm">
                <div>
                    <p className="font-semibold">Access to third-party accounts</p>
                    <p>Facebook account access</p>
                    <p>Permissions: About Me; Email</p>
                </div>
                <div>
                    <p className="font-semibold">Analytics</p>
                    <p>Google Analytics, MixPanel, Facebook Ads conversion tracking (Facebook pixel), LinkedIn conversion tracking, Twitter Ads conversion tracking and Google Ads conversion tracking</p>
                    <p>Personal Data: Cookies; Usage Data</p>
                </div>
                <div>
                    <p className="font-semibold">Commercial affiliation</p>
                    <p>Contacting the User</p>
                    <p>Phone contact</p>
                    <p>Personal Data: phone number</p>
                </div>
                <div>
                    <p className="font-semibold">Contact form</p>
                    <p>Personal Data: email address; first name; last name; phone number</p>
                </div>
                <div>
                    <p className="font-semibold">Mailing list or newsletter</p>
                    <p>Personal Data: city; company name; country; county; email address; first name; last name; phone number; Usage Data</p>
                </div>
                <div>
                    <p className="font-semibold">Content performance and features testing (A/B testing)</p>
                    <p>Google Optimize</p>
                    <p>Personal Data: Cookies; Usage Data</p>
                </div>
                <div>
                    <p className="font-semibold">Displaying content from external platforms</p>
                    <p>Google Maps widget</p>
                    <p>Personal Data: Cookies; Usage Data</p>
                </div>
                <div>
                    <p className="font-semibold">Hosting and backend infrastructure</p>
                    <p>Amazon Web Services (AWS) and Cloudinary</p>
                    <p>Personal Data: various types of Data as specified in the privacy policy of the service</p>
                </div>
                <div>
                    <p className="font-semibold">Interaction with external social networks and platforms</p>
                    <p>Facebook Like button and social widgets</p>
                    <p>Personal Data: Cookies; Usage Data</p>
                </div>
                <div>
                    <p className="font-semibold">Location-based interactions</p>
                    <p>Geolocation</p>
                    <p>Personal Data: geographic position</p>
                </div>
                <div>
                    <p className="font-semibold">Managing contacts and sending messages</p>
                    <p>Sendgrid</p>
                    <p>Personal Data: company name; email address; first name; last name; phone number; Usage Data</p>
                </div>
                <div>
                    <p className="font-semibold">Twilio</p>
                    <p>Personal Data: phone number</p>
                </div>
                <div>
                    <p className="font-semibold">Managing support and contact requests</p>
                    <p>Zendesk</p>
                    <p>Personal Data: various types of Data as specified in the privacy policy of the service</p>
                </div>
                <div>
                    <p className="font-semibold">Registration and authentication</p>
                    <p>Facebook Authentication and Google OAuth</p>
                    <p>Personal Data: various types of Data as specified in the privacy policy of the service</p>
                </div>
                <div>
                    <p className="font-semibold">Remarketing and behavioral targeting</p>
                    <p>Facebook Custom Audience</p>
                    <p>Personal Data: Cookies; email address</p>
                </div>
                <div>
                    <p className="font-semibold">Facebook Remarketing, Google Ad Manager Audience Extension, Google Ads Remarketing, LinkedIn Website Retargeting and Twitter Remarketing</p>
                    <p>Personal Data: Cookies; Usage Data</p>
                </div>
                <div>
                    <p className="font-semibold">Tag Management</p>
                    <p>Google Tag Manager</p>
                    <p>Personal Data: Usage Data</p>
                </div>

                <hr className="border-gray-300 w-full" />
                <h3 className="text-lg font-semibold">Information on opting out of interest-based advertising</h3>

                <div className="flex flex-col gap-2">
                    <p>In addition to any opt-out feature provided by any of the services listed in this document, Users may follow the instructions provided by YourOnlineChoices (EU), the Network Advertising Initiative (US) and the Digital Advertising Alliance (US), DAAC (Canada), DDAI (Japan) or other similar initiatives. Such initiatives allow Users to select their tracking preferences for most of the advertising tools. The Owner thus recommends that Users make use of these resources in addition to the information provided in this document.</p>
                    <p>The Digital Advertising Alliance offers an application called AppChoices that helps Users to control interest-based advertising on mobile apps.</p>
                    <p>Users may also opt out of certain advertising features through applicable device settings, such as the device advertising settings for mobile phones or ads settings in general.</p>
                </div>

                <h3 className="text-lg font-semibold">Further information about the processing of Personal Data</h3>

                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Push notifications</p>
                    <p>This Application may send push notifications to the User to achieve the purposes outlined in this privacy policy.</p>
                    <p>Users may in most cases opt-out of receiving push notifications by visiting their device settings, such as the notification settings for mobile phones, and then change those settings for this Application, some or all of the apps on the particular device.
                        Users must be aware that disabling push notifications may negatively affect the utility of this Application.</p>
                </div>


            </section> */}

            {/* <section className="mt-10">
                <hr className="border-gray-300 w-full my-4" />
                <h2 className="font-bold text-center">Full Policy</h2>
                <hr className="border-gray-300 w-full my-4" />

                <h3 className="text-lg font-semibold py-2">Types of Data collected</h3>

                <div className="flex flex-col gap-2 text-xs">
                    <p>Among the types of Personal Data that this Application collects, by itself or through third parties, there are: Cookies; Usage Data; email address; first name; last name; phone number; company name; geographic position; county; country; city.</p>
                    <p>Complete details on each type of Personal Data collected are provided in the dedicated sections of this privacy policy or by specific explanation texts displayed prior to the Data collection.</p>
                    <p>Personal Data may be freely provided by the User, or, in case of Usage Data, collected automatically when using this Application.
                        Unless specified otherwise, all Data requested by this Application is mandatory and failure to provide this Data may make it impossible for this Application to provide its services. In cases where this Application specifically states that some Data is not mandatory, Users are free not to communicate this Data without consequences to the availability or the functioning of the Service.
                        Users who are uncertain about which Personal Data is mandatory are welcome to contact the Owner.
                        Any use of Cookies – or of other tracking tools — by this Application or by the owners of third-party services used by this Application serves the purpose of providing the Service required by the User, in addition to any other purposes described in the present document.</p>
                    <p>Users are responsible for any third-party Personal Data obtained, published or shared through this Application.</p>
                </div>

                <hr className="border-gray-300 w-full my-4" />
                <h3 className="text-lg font-semibold py-2">Mode and place of processing the Data</h3>
                <div className="flex flex-col gap-2 text-xs">
                    <h4 className="font-semibold">Methods of processing</h4>
                    <p>The Owner takes appropriate security measures to prevent unauthorized access, disclosure, modification, or unauthorized destruction of the Data.
                        The Data processing is carried out using computers and/or IT enabled tools, following organizational procedures and modes strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to certain types of persons in charge, involved with the operation of this Application (administration, sales, marketing, legal, system administration) or external parties (such as third-party technical service providers, mail carriers, hosting providers, IT companies, communications agencies) appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be requested from the Owner at any time.</p>
                    <h4 className="font-semibold">Place</h4>
                    <p>The Data is processed at the Owner's operating offices and in any other places where the parties involved in the processing are located.</p>
                    <p>Depending on the User's location, data transfers may involve transferring the User's Data to a country other than their own. To find out more about the place of processing of such transferred Data, Users can check the section containing details about the processing of Personal Data.</p>
                    <h4 className="font-semibold">Retention time</h4>
                    <p>Unless specified otherwise in this document, Personal Data shall be processed and stored for as long as required by the purpose they have been collected for and may be retained for longer due to applicable legal obligation or based on the Users’ consent.</p>
                </div>

                <hr className="border-gray-300 w-full my-4" />
                <h3 className="text-lg font-semibold py-2">The purposes of processing</h3>
                <div className="flex flex-col gap-2 text-xs">
                    <p>The Data concerning the User is collected to allow the Owner to provide its Service, comply with its legal obligations, respond to enforcement requests, protect its rights and interests (or those of its Users or third parties), detect any malicious or fraudulent activity, as well as the following: Access to third-party accounts, Analytics, Interaction with external social networks and platforms, Managing contacts and sending messages, Contacting the User, Content performance and features testing (A/B testing), Tag Management, Remarketing and behavioral targeting, Registration and authentication, Managing support and contact requests, Location-based interactions, Displaying content from external platforms, Hosting and backend infrastructure and Commercial affiliation.</p>
                    <p>For specific information about the Personal Data used for each purpose, the User may refer to the section “Detailed information on the processing of Personal Data”.</p>
                </div>

                <hr className="border-gray-300 w-full my-4" />
                <h3 className="text-lg font-semibold py-2">Facebook permissions asked by this Application</h3>
                <div className="flex flex-col gap-2 text-xs">
                    <p>This Application may ask for some Facebook permissions allowing it to perform actions with the User's Facebook account and to retrieve information, including Personal Data, from it. This service allows this Application to connect with the User's account on the Facebook social network, provided by Facebook Inc.</p>
                    <p>For more information about the following permissions, refer to the Facebook permissions documentation and to the <a className="underline" href="https://www.facebook.com/about/privacy/">Facebook privacy policy.</a></p>
                    <p>The permissions asked are the following:</p>
                    <h4 className="font-semibold">Basic information</h4>
                    <p>By default, this includes certain User’s Data such as id, name, picture, gender, and their locale. Certain connections of the User, such as the Friends, are also available. If the User has made more of their Data public, more information will be available.</p>
                    <h4 className="font-semibold">About Me</h4>
                    <p>Provides access to the 'About Me' section of the profile.</p>
                    <h4 className="font-semibold">Email</h4>
                    <p>Provides access to the User's primary email address.</p>
                </div>

            </section> */}
        </main>
    );
};

export default PrivacyPolicyPage;
