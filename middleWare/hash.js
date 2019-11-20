const bcrypt=require('bcryptjs');

async function hashingPassword(password)
{
    const salt =await bcrypt.genSalt(10);
    console.log(salt);
    const hash=await bcrypt.hash(password,salt)
    console.log(hash);

    return hash;
}

async function vaildPassowrd(password,hashPassword)
{
    const isPass =await bcrypt.compare(password ,hashPassword);
    console.log(salt);
    return isPass;
}
exports.isVaild = vaildPassowrd;
exports.hashing = hashingPassword;