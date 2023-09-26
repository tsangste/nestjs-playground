import { ApiProperty } from '@nestjs/swagger'
import { Collection, Entity, OneToMany, PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core'
import { ObjectId } from '@mikro-orm/mongodb'

import { Product } from '../../products/entities/product.entity'

@Entity()
export class Category {
  @PrimaryKey({ hidden: true })
  _id: ObjectId

  @ApiProperty()
  @SerializedPrimaryKey()
  id!: string

  @ApiProperty()
  @Property()
  name: string

  @ApiProperty()
  @Property({ nullable: true })
  description?: string

  @OneToMany({ entity: () => Product, mappedBy: product => product.category, hidden: true })
  products = new Collection<Product>(this)
}
