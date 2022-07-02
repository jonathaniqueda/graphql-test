import { Sequelize } from 'sequelize-typescript';
import {
  Arg,
  Args,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import Bet from '../models/Bet';
import User from '../models/User';
import CreateBetInputArgs from './typeInputs/CreateBetInputArgs';

@Resolver(Bet)
export default class BetResolver {
  @Query(returns => [Bet])
  public async getBetList() {
    return await Bet.findAll();
  }

  @Query((returns) => Bet)
  public async getUser(@Arg('id') id: number) {
    const bet = await Bet.findOne({
      where: { id },
    });

    if (!bet) {
      throw new Error('Bet not found');
    }

    return bet;
  }

  @Query(returns => [Bet])
  public async getBestBetPerUser(@Arg('limit', {
    nullable: true,
  }) limit: number) {
    return await Bet.findAll({
      attributes: [
        [Sequelize.fn('MAX', Sequelize.col('id')), 'id'],
        'userId',
        [Sequelize.fn('MAX', Sequelize.col('betAmount')), 'betAmount'],
        [Sequelize.fn('MAX', Sequelize.col('chance')), 'chance'],
        [Sequelize.fn('MAX', Sequelize.col('win')), 'win'],
        [Sequelize.fn('MAX', Sequelize.col('payout')), 'payout'],
        [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'createdAt'],
        [Sequelize.fn('MAX', Sequelize.col('updatedAt')), 'updatedAt'],
      ],
      group: 'userId',
      limit,
      where: {
        win: true,
      },
    });
  }

  @Mutation(() => Bet)
  public async createBet(
    @Args() args: CreateBetInputArgs,
  ) {
    const user = await User.findOne({
      where: {
        id: args.userId,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const chanceToWin = this.getRandomArbitrary(0, 100);

    // How user win one bet?
    const userWonBet = (args.chance > chanceToWin);

    // How can I know the payout? What is the odd?
    const payout = userWonBet ? args.betAmount * args.chance : 0;

    const newBet = await Bet.create({
      ...args,
      payout,
      win: userWonBet,
    });
    
    return newBet;
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
