import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { OffersService } from "./modules/offers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer1Service } from "./modules/providers/p1/provider1.service";
import { Offer2Service } from "./modules/providers/p2/provider2.service";
import { Offer } from "./modules/offers.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Offer]),
  ],
  controllers: [AppController],
  providers: [AppService, OffersService, Offer1Service, Offer2Service],
})
export class AppModule {}
