import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt'

interface UserDocument extends Document {
    email: string;
    password?: string | Buffer;
    googleId?: string;
    facebookId?: string;
}

const userSchema: Schema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String},
    googleId: {type: String},
    facebookId: {type: String}
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password as string, salt);
    next();
})

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;