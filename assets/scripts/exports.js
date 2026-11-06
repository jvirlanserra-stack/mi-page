import { argon2id } from "https://esm.sh/hash-wasm";
import { argon2Verify } from "https://esm.sh/hash-wasm";

export async function hash(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  return argon2id({
    password, // texto original
    salt,
    parallelism: 1,
    iterations: 3,
    memorySize: 19456,
    hashLength: 32,
    outputType: "encoded",
  });
}

export async function verify(password, hashGuardado) {
  return argon2Verify({
    password, // texto original
    hash: hashGuardado, // resultado de hash(password)
  });
}

export async function upload(ruta, contenido) {
  const respuesta = await fetch(
    "https://mi-page-worker.jvirlanserra.workers.dev",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: ruta, content: contenido }),
    },
  );

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.error || "No se pudo actualizar el archivo");
  }

  return resultado;
}
