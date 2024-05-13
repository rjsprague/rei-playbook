import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { FiUser, FiPhone, FiMail } from 'react-icons/fi';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface MapModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    addressLatLng: any;
    name: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    utmSource: string;
    utmCampaign: string;
    utmTerm: string;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, setIsOpen, addressLatLng, name, email, phone, address, zipCode, utmSource, utmCampaign, utmTerm, setName, setEmail, setPhone }) => {
    const [viewState, setViewState] = useState('map')
    const [emailError, setEmailError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [nameError, setNameError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [motivation, setMotivation] = useState('');
    const [ownership, setOwnership] = useState('');
    const [timeframe, setTimeframe] = useState('');

    const router = useRouter();

    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [submissionWarning, setSubmissionWarning] = useState('');
    const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME
    const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL

    const validatePhone = process.env.NEXT_PUBLIC_VALIDATE_PHONE;

    const closeModal = () => {
        setIsOpen(false);
        setViewState('map');
    };

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const confirmAddress = () => {
        setViewState('timeframe');
    };

    const confirmTimeframe = (timeframe: string) => {
        setTimeframe(timeframe);
        setViewState('ownership');
    };

    const confirmOwnership = (ownership: string) => {
        setOwnership(ownership);
        setViewState('motivation');
    };

    const confirmMotivation = (motivation: string) => {
        setMotivation(motivation);
        setViewState('form')
    }

    // validate name, give error if not valid
    useEffect(() => {
        if (!name.trim()) {
            setNameError('Name is required');
        } else {
            setNameError('');
        }
    }, [name]);

    // validate email address, give error if not valid with useEffect hook
    useEffect(() => {
        if (email) {
            const regex = /\S+@\S+\.\S+/;
            if (!regex.test(email)) {
                setEmailError('Please enter a valid email address')
            }
            else {
                setEmailError('')
            }
        }
    }, [email])

    // validate phone number, give error if not valid with useEffect hook
    useEffect(() => {
        if (phone) {
            const regex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
            if (!regex.test(phone)) {
                setPhoneError('Please enter a valid phone number')
            }
            else {
                setPhoneError('')
            }
        }
    }, [phone])

    // form submission loader
    useEffect(() => {
        if (submitting) {
            toast.info('Submitting your information...')
        }
    }, [submitting])

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // Show loader while form is submitting
        setSubmitting(true);

        // Check if all fields are filled out
        if (!nameError && !emailError && !phoneError && termsChecked && privacyChecked) {

            // Only validate phone number if validatePhone is true
            if (validatePhone === 'true') {
                try {
                    console.log('Validating phone number...');
                    // Validate phone number
                    const phoneResponse = await axios.post('/api/phone', {
                        phoneNumber: phone
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (phoneResponse.data === 404) {
                        // If the API returns 404, set the error and return early
                        const errorMessage = 'Please enter a valid phone number'
                        setSubmitting(false);
                        setPhoneError(errorMessage);
                        toast.error(errorMessage);
                        return; // Stop execution if phone number is invalid
                    }
                } catch (error) {
                    console.error('Error validating phone number:', error);
                    setPhoneError('There was an unexpected error validating your phone number.');
                    toast.error('There was an unexpected error. Please try again.');
                    setSubmitting(false);
                    return; // Stop execution if there was an error during the request
                }
            } else {
                console.log('Skipping phone number validation...');
            }


            // console.log("Your information has been submitted")
            // send data to webhook via axios
            axios.post('/api/email', {
                businessName,
                businessEmail,
                name,
                email,
                phone,
                address,
                zipCode,
                timeframe,
                ownership,
                motivation,
                utmSource,
                utmCampaign,
                utmTerm,
                addressLatLng,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });

            // Reset the form fields
            setName('');
            setEmail('');
            setPhone('');
            setTermsChecked(false);
            setPrivacyChecked(false);
            setSubmissionWarning('');
            setSubmitting(false);

            // Close the modal and redirect to the thank you page
            closeModal()
            window.location.href = '/Thank-You';

        } else {
            setSubmissionWarning('Please fill out all required fields.')
            setSubmitting(false);
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl text-center mb-4 font-medium leading-6 text-gray-900">
                                    {viewState === 'map' ? 'Is this the correct address?' 
                                    : viewState === 'timeframe' ? 'How soon are you looking to sell?'
                                    : viewState === 'ownership' ? 'Do you own the property?'
                                    : viewState === 'motivation' ? 'Why are you selling?'
                                    : viewState === 'form' ? 'Enter Your Details'                      
                                    : 'Hmmmm... Something went wrong.'}
                                </Dialog.Title>
                                <hr className='mb-4' />

                                {viewState === 'map' ? (
                                    <GoogleMap
                                        mapContainerStyle={mapContainerStyle}
                                        zoom={15}
                                        center={addressLatLng}
                                    >
                                        <Marker position={addressLatLng} />
                                    </GoogleMap>
                                ) : viewState === 'timeframe' ? (
                                    <div className="flex flex-col gap-4 text-white brightness-100">
                                        <button
                                            className="rounded-xl bg-primary py-4 font-semibold text-xl hover:brightness-125"
                                            onClick={() => confirmTimeframe('As soon as possible')}
                                        >
                                            As soon as possible
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 font-semibold text-xl hover:brightness-125"
                                            onClick={() => confirmTimeframe('Within 30 days')}
                                        >
                                            Within 30 days
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 font-semibold text-xl hover:brightness-125"
                                            onClick={() => confirmTimeframe('Within 3 months')}
                                        >
                                            Within 3 months
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 font-semibold text-xl hover:brightness-125"
                                            onClick={() => confirmTimeframe('Not urgent')}
                                        >
                                            Not urgent
                                        </button>
                                    </div>
                                ) : viewState === 'ownership' ? (
                                    <div className="flex flex-col gap-4 text-white">
                                        <button
                                            className="rounded-xl bg-primary py-4 font-semibold text-xl hover:brightness-125"
                                            onClick={() => confirmOwnership('Yes, I am the owner.')}
                                        >
                                            Yes, I am the owner.
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 font-semibold text-xl hover:brightness-125"
                                            onClick={() => confirmOwnership('No, someone else is the owner.')}
                                        >
                                            No, someone else is the owner.
                                        </button>
                                    </div>
                                ) : viewState === 'motivation' ? (
                                    <div className="flex flex-col gap-4 text-white font-semibold text-xl">
                                        <button
                                            className="rounded-xl bg-primary py-4 hover:brightness-125"
                                            onClick={() => confirmMotivation('Needs repairs')}
                                        >
                                            Needs repairs
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 hover:brightness-125"
                                            onClick={() => confirmMotivation('Change in income')}
                                        >
                                            Change in income
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 hover:brightness-125"
                                            onClick={() => confirmMotivation('Relocation')}
                                        >
                                            Relocation
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 hover:brightness-125"
                                            onClick={() => confirmMotivation('Divorce')}
                                        >
                                            Divorce
                                        </button>
                                        <button
                                            className="rounded-xl bg-primary py-4 hover:brightness-125"
                                            onClick={() => confirmMotivation('Other')}
                                        >
                                            Other
                                        </button>
                                    </div>
                                ) : viewState === 'form' ? (
                                    // Form for user details
                                    <form id='form_contact-form' className="flex flex-col gap-4">
                                        <div className="flex items-center border rounded-md border-gray-300 bg-gray-100 shadow-inner p-2">
                                            <FiUser className="text-lg text-gray-700 mr-2" />
                                            <input
                                                aria-label='name'
                                                name="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="flex-1 bg-transparent"
                                                type="text"
                                                placeholder="Name"
                                                required
                                            />

                                        </div>

                                        <div className="flex items-center border rounded-md border-gray-300 bg-gray-100 shadow-inner p-2">
                                            <FiMail className="text-lg text-gray-700 mr-2" />
                                            <input
                                                aria-label='email'
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="flex-1 bg-transparent"
                                                type="email"
                                                placeholder="Email"
                                                required
                                            />
                                            {<p className='text-red-500'>{emailError}</p>}
                                        </div>

                                        <div className="flex items-center border rounded-md border-gray-300 bg-gray-100 shadow-inner p-2">
                                            <FiPhone className="text-lg text-gray-700 mr-2" />
                                            <input
                                                aria-label='phone'
                                                name="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="flex-1 bg-transparent"
                                                type="tel"
                                                placeholder="Phone Number"
                                                required
                                            />
                                            {<p className='text-red-500'>{phoneError}</p>}
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="address"
                                                name="address"
                                                value={address}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="zipCode"
                                                name="zipCode"
                                                value={zipCode}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="timeframe"
                                                name="timeframe"
                                                value={timeframe}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="ownership"
                                                name="ownership"
                                                value={ownership}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="motivation"
                                                name="motivation"
                                                value={motivation}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="utm_source"
                                                name="utm_source"
                                                value={utmSource}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="utm_campaign"
                                                name="utm_campaign"
                                                value={utmCampaign}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="hidden">
                                            <input
                                                id="utm_term"
                                                name="utm_term"
                                                value={utmTerm}
                                                className="hidden"
                                                required
                                                readOnly
                                            />
                                        </div>

                                        <div className="flex items-center border rounded-md border-gray-300 bg-gray-100 shadow-inner p-2">
                                            <input
                                                type="checkbox"
                                                name="terms"
                                                id="terms"
                                                checked={termsChecked}
                                                onChange={(e) => setTermsChecked(e.target.checked)}
                                            />
                                            <label htmlFor="terms" className="ml-2 text-gray-700">I agree to the <Link href="/terms" className="text-primary underline">Terms and Conditions</Link> and the <Link href="/privacy" className="text-primary underline">Privacy Policy</Link></label>
                                        </div>

                                        <div className="flex items-center border rounded-md border-gray-300 bg-gray-100 shadow-inner p-2">
                                            <input
                                                type="checkbox"
                                                name="privacy"
                                                id="privacy"
                                                checked={privacyChecked}
                                                onChange={(e) => setPrivacyChecked(e.target.checked)}
                                            />
                                            <label htmlFor="privacy" className="ml-2 text-gray-700">Message and data rates may apply.</label>
                                        </div>

                                        <button
                                            className="rounded-xl bg-primary py-4 text-white font-semibold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-125"
                                            type="submit"
                                            disabled={!name || !email || !phone || !address || !termsChecked || !privacyChecked || submitting}
                                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)}

                                        >
                                            {!name || !email || !phone || !address || !termsChecked || !privacyChecked ? "Form Incomplete" : submitting ? "Submitting" : "Get My Cash Offer"}
                                        </button>
                                        {<p className='text-red-500'>{submissionWarning}</p>}
                                    </form>
                                ) : (
                                    <div></div>
                                )}

                                <div className="mt-4 flex justify-around">
                                    {viewState === 'map' ? (
                                        <div className='flex flex-row sm:gap-4 gap-2'>
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="rounded-xl bg-gray-500 sm:py-4 py-2 px-4 sm:px-8 text-white brightness-90 font-semibold text-md sm:text-xl"
                                            >
                                                Search New Address
                                            </button>
                                            <button
                                                type="button"
                                                onClick={confirmAddress}
                                                className="rounded-xl bg-primary sm:py-4 py-2 px-4 sm:px-8 text-white brightness-125 font-semibold text-md sm:text-xl"
                                            >
                                                Confirm Address
                                            </button>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MapModal;

