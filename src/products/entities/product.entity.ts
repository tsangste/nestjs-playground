import { ApiProperty } from '@nestjs/swagger'

import { Entity, ManyToOne, PrimaryKey, Property, Ref, SerializedPrimaryKey } from '@mikro-orm/core'
import { ObjectId } from '@mikro-orm/mongodb'

import { Category } from '../../categories/entities/category.entity'

@Entity()
export class Product {
  @PrimaryKey({ hidden: true })
  _id: ObjectId

  @ApiProperty()
  @SerializedPrimaryKey()
  id!: string

  @ApiProperty()
  @Property()
  name: string

  @ApiProperty()
  @Property()
  description: string

  @ApiProperty()
  @Property()
  colour: string

  @ApiProperty()
  @Property()
  stock: number

  @ApiProperty()
  @Property()
  price: number

  @ApiProperty()
  @ManyToOne(() => Category, { ref: true })
  category: Ref<Category>
}
