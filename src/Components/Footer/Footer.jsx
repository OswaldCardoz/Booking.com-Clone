import "./Footer.css";
import { useMediaQuery, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Footer(){
    const isScreenBelow960 = useMediaQuery('(max-width:960px)');
    return(
        <div className="footer">
            <div className="flists">
                <ul className="flist-1">
                    <li className="flistitem">Contries</li>
                    <li className="flistitem">Regions</li>
                    <li className="flistitem">Cites</li>
                    <li className="flistitem">Districts</li>
                    <li className="flistitem">Airports</li>
                    <li className="flistitem">Hotels</li>
                </ul>
                <ul className="flist-2">
                    <li className="flistitem">Homes</li>
                    <li className="flistitem">Apartments</li>
                    <li className="flistitem">Resorts</li>
                    <li className="flistitem">Villas</li>
                    <li className="flistitem">Hostels</li>
                    <li className="flistitem">B&Bs</li>
                    <li className="flistitem">Guest houses</li>
                </ul>
                <ul className="flist-t">
                    <li className="flistitem">Unique places to stay</li>
                    <li className="flistitem">All destinations</li>
                    <li className="flistitem">All flight destinations</li>
                    <li className="flistitem">All car hire locations</li>
                    <li className="flistitem">Discover</li>
                    <li className="flistitem">Reviews</li>
                    <li className="flistitem">Discover monthly stays</li>
                    <li className="flistitem">Unpacked: Travel articles</li>
                    <li className="flistitem">Seasonal and holiday deals</li>
                    <li className="flistitem">Traveller Review Awards</li>
                </ul>

                <ul className="flist-4">
                    <li className="flistitem">Car hire</li>
                    <li className="flistitem">Flight finder</li>
                    <li className="flistitem">Restaurant reservations</li>
                    <li className="flistitem">Booking.com for Travel Agents</li>
                </ul>
                <ul className="flist-5">


                    <li className="flistitem">About Booking.com</li>
                    <li className="flistitem">Coronavirus (COVID-19) FAQs</li>
                    <li className="flistitem">Customer Service help</li>
                    <li className="flistitem">Partner help</li>
                    <li className="flistitem">Careers</li>
                    <li className="flistitem">Sustainability</li>
                    <li className="flistitem">Press centre</li>
                    <li className="flistitem">Safety resource centre</li>
                    <li className="flistitem">Investor relations</li>
                    <li className="flistitem">Terms & Conditions</li>
                    <li className="flistitem">Partner dispute</li>
                    <li className="flistitem">How we work</li>
                    <li className="flistitem">Privacy & Cookie Statement</li>
                    <li className="flistitem">MSA Statement</li>
                    <li className="flistitem">Corporate contact</li>
                    <li className="flistitem">Content guidelines and reporting</li>
                    <li className="flistitem">We Price Match</li>


                </ul>
            </div>
            <div className="ftext">Copyright © 1996-2024 Booking.com™. All rights reserved.</div>
        </div>
    )
}
export default Footer;