export async function registerUser(db, user) {
    if (!user || !user.email || !user.password) {
        throw new Error("Invalid user data");
    }
    if (db.collection("users") === undefined) {
        throw new Error("Users collection does not exist");
    }
    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email: user.email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    return db.collection("users").insertOne(user);
}
export async function getUserByEmail(db, email) {
    if (!email) {
        throw new Error("Email is required");
    }
    if (db.collection("users") === undefined) {
        throw new Error("Users collection does not exist");
    }
    return db.collection("users").findOne({ email });
}
