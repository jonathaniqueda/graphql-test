import {
  Arg,
  Args,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import User from '../models/User';
import CreateUserInputArgs from './typeInputs/CreateUserInputArgs';

@Resolver(User)
export default class UserResolver {
  @Query(returns => [User])
  public async getUserList() {
    return await User.findAll();
  }

  @Query((returns) => User)
  public async getUser(@Arg('id') id: number) {
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Mutation(() => User)
  public async createUser(
    @Args() args: CreateUserInputArgs,
  ) {
    const newUser = await User.create({
      ...args,
    });
    return newUser;
  }
}
