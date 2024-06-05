'use client';

import { useEffect, useState, useCallback } from 'react'; // Import necessary hooks from React
import { databaseService } from '../Services/databaseService'; // Import database service for URL management
import { Button } from '@headlessui/react'; // Import Button component from @headlessui/react
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation for client-side navigation

const Page = ( { params } ) => {
    const router = useRouter(); // Initialize the router for navigation
    const urlCode = params.urlCode; // Extract URL code from params

    // State for managing loading message and status
    const [loading, setLoading] = useState( {
        message: "Please wait, we are redirecting you 😊...",
        isLoaded: false
    } );

    // Function to fetch URL data based on the URL code
    const fetchUrl = useCallback( async ( urlCode ) => {
        try {
            const urlData = await databaseService.getUrl( urlCode ); // Fetch URL data from the service
            if ( urlData ) {
                window.location.href = urlData; // Redirect to the fetched URL
                return;
            }
            setLoading( {
                message: "We apologize, but we are unable to redirect you at this time 😌.",
                isLoaded: true
            } );
        } catch ( error ) {
            setLoading( {
                message: "An error occurred while redirecting. Please try again later.",
                isLoaded: true
            } );
        }
    }, [] );

    // useEffect to fetch URL on component mount
    useEffect( () => {
        fetchUrl( urlCode );
    }, [urlCode, fetchUrl] );

    return (
        <div className='h-[70vh] grid place-items-center'>
            <div>
                <h3>{loading.message}</h3>
                {
                    loading.isLoaded && (
                        <Button onClick={() => router.push( "/" )} className='mt-3 mx-auto block rounded-lg border-none bg-white/5 py-3 px-5 text-lg text-white transition-colors hover:bg-white/15'>
                            Go to Home
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default Page;
