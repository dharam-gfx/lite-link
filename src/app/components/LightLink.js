'use client';
import { Button, Field, Input } from '@headlessui/react'; // Import necessary components from @headlessui/react
import clsx from 'clsx'; // Import clsx for conditional classNames
import { databaseService } from '../Services/databaseService'; // Import database service for URL management
import { useRef, useState, useCallback } from 'react'; // Import hooks from React
import toast from 'react-hot-toast'; // Import toast for notifications

// Predefined regex pattern for URL validation
const urlPattern = new RegExp(
    '^(https?:\\/\\/)' + // protocol (http or https)
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?' + // port
    '(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // path
    '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // query string
    '(\\#[-a-zA-Z\\d_]*)?$', 'i' // fragment locator
);

// URL validation function
const validateUrl = ( url ) => urlPattern.test( url );

const LightLink = () => {
    // State to toggle visibility of the copy button
    const [showCopyBtn, setShowCopyBtn] = useState( false );
    // Reference to the input field
    const inputField = useRef();

    // Function to copy the generated URL to the clipboard
    const copyUrl = useCallback( () => {
        navigator.clipboard.writeText( inputField.current.value ); // Copy the input field value to the clipboard
        toast.success( 'URL copied successfully 😊' ); // Show success notification
    }, [] );

    // Function to validate and shorten the URL
    const sortUrl = useCallback( async () => {
        const url = inputField.current.value; // Get the current value of the input field

        if ( !validateUrl( url ) ) { // Validate the URL
            toast.error( 'Please check your URL! 🤨' ); // Show error notification if URL is invalid
            return;
        }

        try {
            const generatedUrl = await databaseService.setUrl( url ); // Shorten the URL using the database service
            toast.success( 'URL Generated!' ); // Show success notification
            inputField.current.value = generatedUrl; // Update the input field with the shortened URL
            setShowCopyBtn( true ); // Show the copy button
        } catch ( error ) {
            toast.error( 'Error generating URL. Please try again later.' ); // Show error notification if URL generation fails
        }
    }, [] );

    return (
        <div className="relative bg-white/2">
            <div className="absolute inset-[30%] block rounded-full bg-white/5 blur-2xl"></div>
            <div className="h-[calc(100vh-65px)]">
                <h1 className="text-3xl text-center font-medium pt-8">Free URL Shortener</h1>
                <p className='max-w-lg mx-auto px-4 mt-4 text-center text-gray-100/60'>
                    A LightLink App is a tool that allows you to create shorter, more manageable links from long URLs.
                    These shortened links are easier to share, especially on social media platforms or in messages.
                    Users can input a lengthy URL, and the tool generates a shorter version that redirects to the original page when clicked.
                </p>

                <div className="grid place-items-center h-[35%]">
                    <div className="w-full max-w-2xl px-4 relative z-auto">
                        <div className="w-full mx-auto px-4">
                            <Field>
                                <Input
                                    type='url'
                                    ref={inputField} // Attach reference to the input field
                                    placeholder="Enter link here"
                                    className={clsx(
                                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-3 px-5 text-2xl text-white',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                    )}
                                />
                            </Field>
                            {
                                // Conditional rendering of buttons based on showCopyBtn state
                                !showCopyBtn ? (
                                    <Button onClick={sortUrl} className='mt-3 mx-auto block rounded-lg border-none bg-white/5 py-3 px-5 text-lg text-white transition-colors hover:bg-white/15'>
                                        Generate
                                    </Button>
                                ) : (
                                    <Button onClick={copyUrl} className='mt-3 mx-auto block rounded-lg border-none bg-white/5 py-3 px-5 text-lg text-white transition-colors hover:bg-white/15'>
                                        Copy
                                    </Button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LightLink;
