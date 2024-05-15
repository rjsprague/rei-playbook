"use client"
import usePlacesAutocomplete, {
    getDetails,
    getZipCode,
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

interface PlacesAutocompleteProps {
    setAddressLatLng: (latLng: { lat: number; lng: number }) => void;
    setIsOpen: (isOpen: boolean) => void;
    setAddress: (address: string) => void;
    setZipCode: (zipCode: string) => void;
    handleLoadMap: () => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({ setAddressLatLng, setIsOpen, setAddress, setZipCode, handleLoadMap }) => {

    const validateAddress = process.env.NEXT_PUBLIC_VALIDATE_ADDRESS;
    const formRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [invalidAddressWarning, setInvalidAddressWarning] = useState("")


    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 500,
        requestOptions: {
            /* Define search scope here */
            locationBias: {
                center: { lat: 37, lng: -91 },
                radius: 2000,
            },
            componentRestrictions: { country: "US" },
            region: "US",
        },
    });

    const ref = useOnclickOutside(() => {
        // When the user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the keyword of the input element
        setValue(e.target.value)
        setAddress(e.target.value)
    };

    const handleSelect =
        ({ description }: { description: string }) =>
            () => {
                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    setAddressLatLng({ lat, lng })
                    const zipCode = getZipCode(results[0], false) ? getZipCode(results[0], false) as string : "";
                    setZipCode(zipCode);
                })
                // When the user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                setAddress(description);
                clearSuggestions();
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });



    const handleOfferClick = () => {
        // Clear previous warnings
        setInvalidAddressWarning("");

        if (!value) {
            toast.error("Please enter an address");
            setInvalidAddressWarning("Please enter an address");
            return;
        }

        getGeocode({ address: value })
            .then((results) => {
                const addressTypes = results[0].types;
                const isStreetAddress = addressTypes.includes('street_address') || addressTypes.includes('route') || addressTypes.includes('premise');
                const formattedAddress = results[0].formatted_address;
                const isUSAddress = formattedAddress.includes("USA") || formattedAddress.endsWith("US");

                if (validateAddress === "true") {
                    console.log("Validating address...");
                    if (!isUSAddress) {
                        toast.error("Please enter a US address");
                        setInvalidAddressWarning("Please enter a US address");
                    } else if (!isStreetAddress) {
                        toast.error("Please enter a full street address, including the street name and number.");
                        setInvalidAddressWarning("Please enter a full street address, including the street name and number.");
                    } else {
                        // Address is valid
                        const { lat, lng } = getLatLng(results[0]);
                        setAddressLatLng({ lat, lng });
                        setIsOpen(true);
                        handleLoadMap();
                    }
                } else {
                    console.log("Skipping address validation...");
                    // Address is valid
                    const { lat, lng } = getLatLng(results[0]);
                    setAddressLatLng({ lat, lng });
                    setIsOpen(true);
                    handleLoadMap();
                }
            })
            .catch((error) => {
                // Handle geocode failure
                console.error("Error: ", error);
                setInvalidAddressWarning("Failed to validate the address. Please try again.");
            });
    };


    function debounce(func: () => void, wait: number) {
        let timeout: NodeJS.Timeout | null = null;
        return () => {
            const later = () => {
                timeout = null;
                func();
            };
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(later, wait);
        };
    }

    useEffect(() => {
        const handleScroll = () => {
            if (formRef.current) {
                const formTop = formRef.current.getBoundingClientRect().top;
                const threshold = 20;
                setIsSticky(window.scrollY > formTop + threshold + 500);
            }
        };

        const debouncedHandleScroll = debounce(handleScroll, 100);

        window.addEventListener("scroll", debouncedHandleScroll);

        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, []);

    useEffect(() => {
        if (ready && inputRef.current) {
            inputRef.current.focus();
        }
    }, [ready])

    useEffect(() => {
        if (isSticky && inputRef.current) {
            inputRef.current.focus();
        } else if (!isSticky && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSticky]);

    const content = (
        <div
            ref={formRef}
            style={isSticky ? { position: 'fixed', top: '0px' } : {}}
            className={`z-20 my-2 sm:w-full transition-all duration-150 ease-in-out ${isSticky ? "w-full max-w-[90%] xl:max-w-[1280px] left-1/2 -translate-x-1/2" : "relative"}`}
        >
            <div
                ref={ref}
                className=""
            >
                <input
                    ref={inputRef}
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    className={"w-full h-full py-4 pl-4 pr-2 rounded-lg  shadow-md sm:text-xl text-left bg-white text-black" + (invalidAddressWarning ? " placeholder:text-red-500 border-2 border-red-500" : "")}
                    placeholder={invalidAddressWarning ? invalidAddressWarning : "123 Main St, City, State, Zip Code"}
                />

                <button onClick={handleOfferClick} type="button" className="flex p-1.5 sm:p-2 font-bold text-lg rounded-lg items-center justify-center text-white bg-primary absolute top-1 bottom-1 sm:top-1 sm:bottom-1 right-1 sm:right-1  sm:w-36">Get Offer</button>
                {/* We can use the "status" to decide whether we should display the dropdown or not */}
                {status === "OK" && <ul className="absolute top-16 bg-white mx-2 shadow-md rounded-md p-2 cursor-pointer z-50">{renderSuggestions()}</ul>}
            </div>
        </div>
    )

    if (isSticky) {
        // Render in a portal
        return ReactDOM.createPortal(
            content,
            document.getElementById("sticky-portal")!
        );
    }

    return content;
};

export default PlacesAutocomplete;