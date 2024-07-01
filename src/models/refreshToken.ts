import mongoose, { InferSchemaType, Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid'

interface User {
  _id?: mongoose.Types.ObjectId
}

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },

},
  {
    methods: {
      verifyExpiration() {
        return this.expiryDate.getTime() < new Date().getTime();
      }
    },
    statics: {
      async createToken(user: User) {
        const expiredAt = new Date();

        expiredAt.setSeconds(
          expiredAt.getSeconds() + Number.parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY!)
        );

        const _token = uuidv4();

        const _object = new this({
          token: _token,
          user: user._id,
          expiryDate: expiredAt.getTime(),
        });

        const refreshToken = await _object.save();

        return refreshToken.token;
      }
    }
  }
);


export interface RefreshTokenType extends mongoose.Model<InferSchemaType<typeof refreshTokenSchema>> {
  createToken(user: User): Promise<string>;
}


const RefreshTokenModel = mongoose.models.refreshtokens || model<RefreshTokenType>("refreshtokens", refreshTokenSchema)
export default RefreshTokenModel
