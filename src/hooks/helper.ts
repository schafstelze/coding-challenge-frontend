import { API_URL } from "../constans/constans";

export function parseLinkHeader( linkHeader: any ) {
    const linkHeadersArray = linkHeader.split( ", " ).map( (header: string) => header.split( "; " ) );
    const linkHeadersMap = linkHeadersArray.map( (header: string[]) => {
       const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
       const thisHeaderUrl = header[0].slice( 1, -1 );
       return [ thisHeaderRel, thisHeaderUrl ]
    } );
    return Object.fromEntries( linkHeadersMap );
 }

const parseRoute = (url: string) => Object.fromEntries( url.replace( `${ API_URL }?`, "" ).split( "&" ).map( attribute => [ attribute.split( "=" )[ 0 ].slice( 1 ), attribute.split( "=" )[ 1 ] ] ) );

export const pageNumber = (url: string) => parseInt(parseRoute( url ).page);