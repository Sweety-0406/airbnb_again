import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt : string
    updatedAt : string
    emailVerified  : string | null
}

export type SafeImage = {
  id: string,
  url: string,
}

export type SafeVideo = {
  id: string,
  url: string,
}

export type SafeListing = Omit<
 Listing,
 'createdAt'
> & {
  createdAt : string;
  images: SafeImage[];
  videos: SafeVideo[];
}
 
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
>&{
  createdAt : string;
  startDate : string;
  endDate : string;
  listing : SafeListing;
}

