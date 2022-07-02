import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class CreateBetInputArgs {
  @Field()
  public userId!: number;

  @Field()
  public betAmount!: number;

  @Field()
  public chance!: number;
}
