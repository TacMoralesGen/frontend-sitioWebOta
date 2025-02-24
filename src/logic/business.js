export class cabin{
  constructor(
    //Propiedades del tipo de cabaña
    typeName,
    maxAdults,
    maxChildrens,
    capacity,
    priceHotTubPerInstance,
    pricePerNight,
    amenities,
    size,
    bedType,
    imgURL,
    //Propiedades especificas de la cabaña
    number,
    statusCabin,
    statusHotTub,
    reservedDates
  ){
    this.typeName = typeName;
    this.maxAdults = maxAdults;
    this.maxChildrens = maxChildrens;
    this.capacity = capacity;
    this.priceHotTubPerInstance = priceHotTubPerInstance;
    this.pricePerNight = pricePerNight;
    this.amenities = amenities;
    this.size = size;
    this.bedType = bedType;
    this.imgURL = imgURL;
    this.number = number;
    this.statusCabin = statusCabin;
    this.statusHotTub = statusHotTub;
    this.reservedDates = reservedDates;
  }
}

import { addDays } from "date-fns";

export class reservation{
  constructor(
    documentTypeClient,
    documentNumberClient,
    nameClient,
    countryOfResidence,
    phoneClient,
    emailClient,
    checkinDate,
    checkoutDate,
    statusReservation,
    totalPrice,
    notes
  ){
    this.documentTypeClient = documentTypeClient;
    this.documentNumberClient = documentNumberClient;
    this.nameClient = nameClient;
    this.countryOfResidence = countryOfResidence;
    this.phoneClient = phoneClient;
    this.emailClient = emailClient;
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
    this.reservedRabge = () => checkinDate
    this.statusReservation = statusReservation;
    this.totalPrice = totalPrice;
    this.notes = notes;
    this.reservationCabins = (id) => getReservationCabinsByReservationId(id);
    this.totalAdults = 
      () => 
        this.reservationCabins.reduce((totalAdults, reservationCabin) => (totalAdults += reservationCabin.adults), 0);
    this.totalChildrens = 
      () =>
        this.reservationCabins.reduce((totalChildrens, reservationCabin) => (totalChildrens += reservationCabin.childrens), 0);
    this.isHotTubDateSelected = 
      () =>
        this.reservationCabins.some((reservationCabin) => reservationCabin.datesHotTub.length > 0);
  }
}

import Cabin from "./cabin";

export class reservationCabin{
  constructor(
    reservationId, //id de la reserva
    cabinNumber,
    adults,
    childrens,
    mainGuest,
    datesHotTub,
    priceCabin,
    priceHotTub,
  ){
    this.reservationId = reservationId; //id de la reserva
    this.cabinNumber = cabinNumber; 
    this.adults = adults;
    this.childrens = childrens;
    this.mainGuest = mainGuest;
    this.datesHotTub = datesHotTub;
    this.priceCabin = priceCabin;
    this.priceHotTub = priceHotTub;
    this.subTotal = () => this.priceCabin + this.priceHotTub;
    this.cabin = (cabins) => new Cabin(cabinDatabaseToCabinObject(cabins.find((cabin) => cabin.number === this.cabinNumber)));
  }
}