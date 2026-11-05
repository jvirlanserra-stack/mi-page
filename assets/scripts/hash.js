
import { argon2id } from
  "https://esm.sh/hash-wasm";

export async function hashPassword(password) {
    const hash = await argon2id({
        password: password,
        salt: crypto.getRandomValues(
            new Uint8Array(16)
        ),
        parallelism: 1,
        iterations: 3,
        memorySize: 19456,
        hashLength: 32,
        outputType: "encoded"
    });

    return hash;
}