import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';
import User from './User';

@ObjectType()
@Table
export default class Bet extends Model {
  @Field({ description: 'PK' })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @ForeignKey(() => User)
  @Default(DataType.INTEGER)
  @Column(DataType.INTEGER)
  public userId!: number;

  @Field({ description: 'Bet amount' })
  @Column(DataType.FLOAT)
  public betAmount!: number;

  @Field({ description: 'Chance to win' })
  @Column(DataType.FLOAT)
  public chance!: number;

  @Field({ description: 'Bet payout' })
  @Column(DataType.FLOAT)
  public payout!: number;

  @Field({ description: 'Win results' })
  @Column(DataType.BOOLEAN)
  public win!: boolean;

  @Field()
  @Column(DataType.DATE)
  public createdAt!: Date;

  @Field()
  @Column(DataType.DATE)
  public updatedAt!: Date;
}
