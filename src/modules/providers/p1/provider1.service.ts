import { Injectable, Logger } from "@nestjs/common";
import { Offer } from "../../offers.entity";
import { Device, OfferProvider, Provider, Platform } from "../../../types";
import { payload } from "./provider1.payload";
import { OfferValidator } from "../../../validations/validator";

type Offer1Payload = (typeof payload.response.offers)[number];

@Injectable()
export class Offer1Service implements OfferProvider {
  private logger = new Logger(Offer1Service.name);

  async get() {
    const response = await Promise.resolve(payload);
    return this.parseResponse(response.response.offers);
  }

  async parseResponse(offersResponse: Offer1Payload[]) {
    const offersPromises = offersResponse
      .map(async (offerItem) => {
        const offer = new Offer();

        offer.name = offerItem.offer_name;
        offer.slug = offerItem.offer_id;
        offer.description = offerItem.offer_desc;
        offer.requirements = offerItem.call_to_action;
        offer.thumbnail = offerItem.image_url;
        offer.offerUrlTemplate = offerItem.offer_url;
        offer.providerName = Provider.P1;
        offer.externalOfferId = offerItem.offer_id;
        offer.isDesktop = offerItem.platform === Platform.WEB ? 1 : 0;
        offer.isIos = offerItem.device === Device.IPHONE ? 1 : 0;
        offer.isAndroid =
          offerItem.platform !== Platform.WEB &&
          offerItem.device === Device.ANDROID
            ? 1
            : 0;

        const validated_offer = OfferValidator.safeParse(offer);

        if (!validated_offer.success) {
          this.logger.error(`Error parsing payload for ${offerItem}`);
          return null;
        }

        return offer;
      })
      .filter((o) => o !== null);

    return await Promise.all(offersPromises);
  }
}
