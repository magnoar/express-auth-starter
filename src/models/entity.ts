import * as dotenv from 'dotenv';
dotenv.config();
import * as dynamoose from 'dynamoose';
import { Password } from '../auth/Password';
import { EntityModel } from './models';
import { INVALID_REGION, INVALID_TABLE_NAME } from '../messages/messages';


if (!process.env.TABLE_NAME) {
  throw new Error(INVALID_TABLE_NAME);
}
if (!process.env.REGION) {
  throw new Error(INVALID_REGION);
}

const UserSchema = new dynamoose.Schema(
  {
    pk: {
      type: String,
      required: true,
      hashKey: true,
    },
    sk: {
      type: String,
      required: true,
      rangeKey: true,
    },
    passwd: {
      type: String,
      required: true,
      set: async (value) => await Password.toHash(value as string),
    },
    name: {
      type: String,
      required: false,
    }
  },
  {
      timestamps: true
  }
);

const Entity = dynamoose.model<EntityModel>(
  process.env.TABLE_NAME!,
  [UserSchema], 
  {create: true, waitForActive: true}
);

export { Entity, EntityModel }