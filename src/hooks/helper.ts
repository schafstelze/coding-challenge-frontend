import { API_URL } from "../constans/constans";

export const parseLinkHeader = ( linkHeader: string ) => {
    const linkHeadersArray = linkHeader.split( ", " ).map( (header: string) => header.split( "; " ) );
    const linkHeadersMap = linkHeadersArray.map( (header: string[]) => {
       const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
       const thisHeaderUrl = header[0].slice( 1, -1 );
       return [ thisHeaderRel, thisHeaderUrl ]
    });
    return Object.fromEntries( linkHeadersMap );
 }

const extractPage = (url: string): number => {
    const parameters = Object.fromEntries( 
        url.replace( `${ API_URL }?`, "" )
            .split( "&" ).map( attribute => [ attribute.split( "=" )[ 0 ]
            .slice( 1 ), 
        attribute.split( "=" )[ 1 ] ] ) 
    );
    if (parameters.page) {
        return parseInt(parameters.page);
    }
    return 0;
}

export const pageNumber = (url: string): number => {
    return extractPage( url )
};