import {Item} from '../types/items';

const LIMIT = 3;
let apiUrl = "http://localhost:3004/items"

function parseLinkHeader( linkHeader: any ) {
    const linkHeadersArray = linkHeader.split( ", " ).map( (header: string) => header.split( "; " ) );
    const linkHeadersMap = linkHeadersArray.map( (header: string[]) => {
       const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
       const thisHeaderUrl = header[0].slice( 1, -1 );
       return [ thisHeaderRel, thisHeaderUrl ]
    } );
    return Object.fromEntries( linkHeadersMap );
 }

const parseRoute = (url: string) => Object.fromEntries( url.replace( `${ apiUrl }?`, "" ).split( "&" ).map( attribute => [ attribute.split( "=" )[ 0 ].slice( 1 ), attribute.split( "=" )[ 1 ] ] ) );

const pageNumber = (url: string) => parseRoute( url ).page;
//  {
//     data: Item[]; pagination: Record<string, string>
// }
export const getPaginatedItems = async (page: number): Promise<any> => {
    const url = `${apiUrl}?_page=${page}&_limit=${LIMIT}`
    const res = await fetch(url);
    const data = await res.json();
    let linkHeaders = res.headers.get( "Link" );
    const pagination = parseLinkHeader(linkHeaders);
    const totalPages = pageNumber(pagination.last)
    return {data, pagination};
}