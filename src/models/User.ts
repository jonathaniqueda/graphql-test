import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Table
export default class User extends Model {
  @Field({ description: 'PK' })
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Field({ description: 'User name' })
  @Column(DataType.STRING)
  public name!: string;

  @Field({ description: 'User account balance' })
  @Column(DataType.FLOAT)
  public balance!: number;

  @Field()
  @Column(DataType.DATE)
  public createdAt!: Date;

  @Field()
  @Column(DataType.DATE)
  public updatedAt!: Date;
}
