import { z } from "zod";

const ProviderEnum = z.enum(["p1", "p2"]);
type Provider = z.infer<typeof ProviderEnum>;

const OfferValidator = z.object({
  name: z.string().nonempty(),
  slug: z.string().nonempty(),
  description: z.string().nonempty(),
  requirements: z.string().nonempty(),
  thumbnail: z.string().nonempty(),
  isDesktop: z.number().int(),
  isAndroid: z.number().int(),
  isIos: z.number().int(),
  offerUrlTemplate: z.string().nonempty(),
  providerName: ProviderEnum,
  externalOfferId: z.string().nonempty(),
});

type OfferValidatorType = z.infer<typeof OfferValidator>;

export { OfferValidator, OfferValidatorType, Provider };
