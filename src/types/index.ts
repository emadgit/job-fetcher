import { OfferValidatorType } from "../validations/validator";

interface Offer {
  id: number;
  name: string;
  slug: string;
  description: string;
  requirements: string;
  thumbnail: string;
  isDesktop: number;
  isAndroid: number;
  isIos: number;
  offerUrlTemplate: string;
  providerName: Provider;
  externalOfferId: string | null;
}

interface OfferProvider {
  get(): Promise<OfferValidatorType[]>;

  parseResponse(payload: any): Promise<OfferValidatorType[]>;
}

enum Provider {
  P1 = "p1",
  P2 = "p2",
}

enum Platform {
  WEB = "web",
  MOBILE = "mobile",
}

enum Device {
  ANDROID = "android",
  IPHONE = "iphone_ipad",
}

export { Offer, OfferProvider, Provider, Platform, Device };
