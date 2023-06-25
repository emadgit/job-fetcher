import { Injectable, Logger } from "@nestjs/common";
import { Offer } from "../../offers.entity";
import { OfferProvider } from "../../../types";
import { payload } from "./provider2.payload";
import { OfferValidator } from "src/validations/validator";

type Offer2Payload = (typeof payload.data)[keyof typeof payload.data];

@Injectable()
export class Offer2Service implements OfferProvider {
  private logger = new Logger(Offer2Service.name);

  async get() {
    const response = await Promise.resolve(payload);
    const offerResponse = Object.values(response.data);
    return this.parseResponse(offerResponse);
  }

  async parseResponse(offerResponse: Array<Offer2Payload>) {
    const offersPromises = offerResponse
      .map(async (offerItem) => {
        const offer = new Offer();

        offer.thumbnail = offerItem.Offer.icon;
        offer.name = offerItem.Offer.name;
        offer.description = offerItem.Offer.description;
        offer.offerUrlTemplate = offerItem.Offer.tracking_url;
        offer.requirements = offerItem.Offer.instructions;
        offer.externalOfferId = offerItem.Offer.campaign_id.toString();
        offer.isDesktop = offerItem.OS.web ? 1 : 0;
        offer.isAndroid = offerItem.OS.android ? 1 : 0;
        offer.isIos = offerItem.OS.ios ? 1 : 0;

        const validateOfferSchema = OfferValidator.safeParse(offer);

        if (!validateOfferSchema) {
          this.logger.error(`Error parsing payload for ${offerItem}`);
          return null;
        }

        return offer;
      })
      .filter((o) => o !== null);

    return await Promise.all(offersPromises);
  }
}
