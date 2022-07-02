import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class CreateUserInputArgs {
  @Field()
  public name!: string;

  @Field()
  public balance!: string;
}
