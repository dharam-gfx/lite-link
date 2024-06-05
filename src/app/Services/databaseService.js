// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig/config";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

class Service {

  constructor() {
    // Initialize Firebase
    const app = initializeApp( firebaseConfig );
    this.db = getDatabase( app );
  }

  // Get  URL in your database
  async setUrl( url ) {
    try {
      // Generate a new unique key for the 'urls' path
      const newUrlRef = push( ref( this.db, 'urls' ) );
      const uniqueID = newUrlRef.key;

      await set( newUrlRef, {
        url: url,
      } );

      return `${window.location.origin}/${uniqueID}`;
    } catch ( error ) {
      console.log( 'Error writing URL:', error );
      return '';
    }
  }

  // Get URL from your database
  async getUrl( urlCode ) {
    try {
      const starCountRef = ref( this.db, `urls/${urlCode}` );

      const data = await new Promise( ( resolve, reject ) => {
        onValue( starCountRef, ( snapshot ) => {
          resolve( snapshot.val() );
        }, ( error ) => {
          reject( error );
        } );
      } );

      return data?.url || null;
    } catch ( error ) {
      console.log( 'Error getting URL:', error );
      return null;
    }
  }
}

// Create an instance of the Service class
export const databaseService = new Service();


