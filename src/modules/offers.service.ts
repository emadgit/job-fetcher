import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OfferValidatorType } from "../validations/validator";
import { Offer } from "./offers.entity";
import { OfferProvider, Provider } from "../types";
import { Offer1Service } from "./providers/p1/provider1.service";
import { Offer2Service } from "./providers/p2/provider2.service";

@Injectable()
export class OffersService {
  services: Map<Provider, OfferProvider> = new Map([
    [Provider.P1, this.offer1Service as OfferProvider],
    [Provider.P2, this.offer2Service as OfferProvider],
  ]);

  constructor(
    private offer1Service: Offer1Service,
    private offer2Service: Offer2Service,
    @InjectRepository(Offer)
    private offersRep: Repository<Offer>
  ) {}

  providers() {
    return Array.from(this.services.values());
  }

  async storeOffers(offers) {
    return this.offersRep.save(offers);
  }

  async fetchOffers(provider: Provider) {
    return await this.services.get(provider).get();
  }

  async fetchAndStoreOffers(provider: Provider) {
    return this.fetchOffers(provider).then(this.storeOffers);
  }

  async getProvider(provider: Provider) {
    return this.services.get(provider);
  }

  async fetchAll() {
    return (await Promise.all(this.providers().map((p) => p.get()))).flat();
  }

  async fetchAllAndStore() {
    return this.fetchAll().then(this.storeOffers);
  }
}
