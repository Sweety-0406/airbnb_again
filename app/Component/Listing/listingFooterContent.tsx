'use client'

import { useTranslations } from "next-intl";
import { CiGlobe } from "react-icons/ci";
import { FaFacebookSquare,FaTwitterSquare,FaInstagramSquare  } from "react-icons/fa";

const ListingFooterContent = ()=>{
    const s =  useTranslations("support")
    const h =  useTranslations("hosting")
    const a =  useTranslations("airbnb")
    return(
        <div className="bg-stone-100">
            <div className="flex flex-col md:flex-row justify-around px-5 ">
                <div className="flex flex-col space-y-2 text-sm my-3">
                    <p className="font-semibold">{s("title")}</p>
                    <p>{s("help")}</p>
                    <p>{s("safety")}</p>
                    <p>{s("aircover")}</p>
                    <p>{s("discimination")}</p>
                    <p>{s("disability")}</p>
                    <p>{s("cancel")}</p>
                    <p>{s("report")}</p>
                </div>
                <hr className="md:hidden"/>
                <div className="flex flex-col space-y-2 text-sm my-3">
                    <p className="font-semibold">{h("title")}</p>
                    <p>{h("home")}</p>
                    <p>{h("host")}</p>
                    <p>{h("resource")}</p>
                    <p>{h("community")}</p>
                    <p>{h("responsibility")}</p>
                    <p>{h("class")}</p>
                </div>
                <hr className="md:hidden"/>
                <div className="flex flex-col space-y-2 text-sm my-3">
                    <p className="font-semibold">{a("title")}</p>
                    <p>{a("newsroom")}</p>
                    <p>{a("feature")}</p>
                    <p>{a("career")}</p>
                    <p>{a("discimination")}</p>
                    <p>{a("investor")}</p>
                    <p>{a("org")}</p>
                </div>
            </div>
            <hr />
            <div className="px-5 flex  justify-center mt-4 pb-4 -mb-8 items-center">
                <div className="text-sm">
                &#169; 2024 Airbnb, Inc . Privacy . Terms . Sitemap . Company details
                </div>
            </div>
        </div>
    )
}

export default ListingFooterContent