'use client'

import { CiGlobe } from "react-icons/ci";
import { FaFacebookSquare,FaTwitterSquare,FaInstagramSquare  } from "react-icons/fa";

const ListingFooterContent = ()=>{
    return(
        <div className="bg-stone-100">
            <div className="flex flex-col md:flex-row justify-around px-5 ">
                <div className="flex flex-col space-y-2 text-sm my-3">
                    <p className="font-semibold">Support</p>
                    <p>Help Centre</p>
                    <p>Get help with a safety issue</p>
                    <p>AirCover</p>
                    <p>Anti-discrimination</p>
                    <p>Disability support</p>
                    <p>Cancellation options</p>
                    <p>Report neighbourhood concern</p>
                </div>
                <hr className="md:hidden"/>
                <div className="flex flex-col space-y-2 text-sm my-3">
                    <p className="font-semibold">Hosting</p>
                    <p>Airbnb your home</p>
                    <p>AirCover for Hosts</p>
                    <p>Hosting resources</p>
                    <p>Community forum</p>
                    <p>Hosting responsibly</p>
                    <p>Join a free Hosting class</p>
                </div>
                <hr className="md:hidden"/>
                <div className="flex flex-col space-y-2 text-sm my-3">
                    <p className="font-semibold">Airbnb</p>
                    <p>Newsroom</p>
                    <p>New fatures</p>
                    <p>Careers</p>
                    <p>Anti-discrimination</p>
                    <p>Investors</p>
                    <p>Airbnb.org emergency stays</p>
                </div>
            </div>
            <hr />
            <div className="px-5 flex flex-col md:flex-row-reverse justify-between mt-4 pb-4 -mb-8 items-center">
                <div className="flex space-x-5 text-sm font-semibold">
                    <div className="flex space-x-2">
                       <CiGlobe className="mt-1"/>
                        English(IN)
                    </div>
                    <div>$ USD</div>
                    <div className="flex space-x-2 mt-1">
                    <FaFacebookSquare />
                    <FaTwitterSquare />
                    <FaInstagramSquare />
                    </div>
                </div>
                <div className="text-sm">
                &#169; 2024 Airbnb, Inc . Privacy . Terms . Sitemap . Company details
                </div>
            </div>
        </div>
    )
}

export default ListingFooterContent