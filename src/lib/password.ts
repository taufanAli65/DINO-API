import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
    if (!password) {
        throw new Error("Password is required");
    }
    const saltRoundsEnv = process.env.SALT_ROUNDS;
    const saltRounds = saltRoundsEnv ? parseInt(saltRoundsEnv) : 5;
    return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export { hashPassword, comparePassword };