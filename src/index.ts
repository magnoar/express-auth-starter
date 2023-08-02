import { app } from "./app";
import * as dotenv from 'dotenv';
dotenv.config();
import * as dynamoose from 'dynamoose';
import { 
  INVALID_REGION, 
  INVALID_TABLE_NAME, 
  INVALID_JWT_KEY, 
  ERR_DBCONNECT 
} from './messages/messages';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error(INVALID_JWT_KEY);
  }
  if (!process.env.TABLE_NAME) {
    throw new Error(INVALID_TABLE_NAME);
  }
  if (!process.env.REGION) {
    throw new Error(INVALID_REGION);
  }

  try {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      "region": process.env.REGION
    });
    dynamoose.aws.ddb.set(ddb);
  } catch (err) {
    throw new Error(ERR_DBCONNECT);
  }

  app.listen(8081, () => {
    console.log("Listening on port 8081!");
  });
};

start();