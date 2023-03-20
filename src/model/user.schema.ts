import * as mongoose from "mongoose";
import { Model } from "mongoose";

type UserType = UserModel  & mongoose.Document;

export interface UserModel {
  user_name: {
    type: string;
    required: true;
  };
  user_email: {
    type: string;
    required: true;
  };
  user_password: {
    type: string;
    required: true;
  };
  user_mobile_no: {
    type: string;
    required: true;
  };
  user_city: {
    type: string;
    required: true;
  };
}

const Userschema = new mongoose.Schema({
  user_name: {
        type: String,
        required: true
      },
      user_email: {
        type: String,
        required: true,
      },
      user_password: {
        type: String,
        required: true,
      },
      user_mobile_no: {
        type: String,
        required: true,
      },
      user_city: {
        type: String,
        required: true,
      },
});

const USER:Model<UserType>=mongoose.model<UserType>('user',Userschema)

export default USER