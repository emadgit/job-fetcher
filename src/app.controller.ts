import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { Provider } from "./types";
import { OffersService } from "./modules/offers.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly offers: OffersService
  ) {}

  @Get()
  home(): string {
    return this.appService.home();
  }

  @Get("/offers")
  async getOffers() {
    const offers = await this.offers.fetchAll();
    return offers;
  }

  @Get("/offers/:provider")
  async getOffersByProvider(@Param("provider") provider: Provider) {
    const offers = await this.offers.fetchOffers(provider);
    return offers;
  }
}
