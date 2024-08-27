import { Button } from '@headlessui/react';


interface FreeTrialButtonProps {
    setIsOpen: (value: boolean) => void;
}

export default function FreeTrialButton({ setIsOpen }: FreeTrialButtonProps) {
    return (
        <>
            <Button
                className="bg-secondary text-white text-4xl font-semibold flex flex-shrink-1 self-center py-4 px-6 max-w-fit rounded-lg shadow-super"
                onClick={() => setIsOpen(true)}
            >
                <div className="text-center">
                    <div>START YOUR 14-DAY FREE TRIAL</div>
                    <div className="text-lg text-gray-300">Then just $97/mo for REI Playbook and REI Playbook Mastermind</div>
                </div>
            </Button>
        </>
    )
}