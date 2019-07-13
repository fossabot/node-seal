export class Evaluator {
  constructor({library, context}) {
    this._Evaluator = library.Evaluator
    this._MemoryPoolHandle = library.MemoryPoolHandle

    // Static methods
    this._MemoryPoolHandleGlobal = this._MemoryPoolHandle.MemoryPoolHandleGlobal

    this._instance = new this._Evaluator(context.instance)
  }

  get instance() {
    return this._instance
  }

  inject({instance}) {
    if (this._instance) {
      delete this._instance
    }
    this._instance = instance
  }

  /**
   * Negates a ciphertext and stores the result in the destination parameter.
   *
   * @param encrypted
   * @param destination
   */
  negate({encrypted, destination}) {
    this._instance.negate(encrypted.instance, destination.instance)
  }

  /**
   * Adds two ciphertexts. This function adds together a and b
   * and stores the result in the destination parameter.
   *
   * @param a
   * @param b
   * @param destination
   */
  add({a, b, destination}) {
    this._instance.add(a.instance, b.instance, destination.instance)
  }

  /**
   * Subtracts two ciphertexts. This function computes the difference of a
   * and b and stores the result in the destination parameter.
   *
   * @param a
   * @param b
   * @param destination
   * @returns {*}
   */
  sub({a, b, destination}) {
    return this._instance.sub(a.instance, b.instance, destination.instance)
  }

  /**
   * Multiplies two ciphertexts. This functions computes the product of a
   * and b and stores the result in the destination parameter. Dynamic
   * memory allocations in the process are allocated from the memory pool pointed
   * to by the given MemoryPoolHandle.
   *
   * @param a
   * @param b
   * @param destination
   * @param {optional} pool
   */
  multiply({a, b, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.multiply(a.instance, b.instance, destination.instance, pool)
  }

  /**
   * Squares a ciphertext. This functions computes the square of encrypted and
   * stores the result in the destination parameter. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   *
   * @param encrypted
   * @param destination
   * @param {optional} pool
   */
  square({encrypted, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.square(encrypted.instance, destination.instance, pool)
  }

  /**
   * Relinearizes a ciphertext. This functions relinearizes encrypted, reducing
   * its size down to 2, and stores the result in the destination parameter.
   * If the size of encrypted is K+1, the given relinearization keys need to
   * have size at least K-1. Dynamic memory allocations in the process are allocated
   * from the memory pool pointed to by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param relinKeys
   * @param destination
   * @param {optional} pool
   */
  relinearize({encrypted, relinKeys, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.relinearize(encrypted.instance, relinKeys.instance, destination.instance, pool)
  }

  /**
   * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
   * modulus down to q_1...q_{k-1} and stores the result in the destination
   * parameter. Dynamic memory allocations in the process are allocated from
   * the memory pool pointed to by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param destination
   * @param {optional} pool
   */
  cipherModSwitchToNext({encrypted, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.cipherModSwitchToNext(encrypted.instance, destination.instance, pool)
  }

  /**
   * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
   * modulus down until the parameters reach the given parmsId and stores the
   * result in the destination parameter. Dynamic memory allocations in the process
   * are allocated from the memory pool pointed to by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param parmsId
   * @param destination
   * @param {optional} pool
   */
  cipherModSwitchTo({encrypted, parmsId, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.cipherModSwitchTo(encrypted.instance, parmsId, destination.instance, pool)
  }

  /**
   * Modulus switches an NTT transformed plaintext from modulo q_1...q_k down
   * to modulo q_1...q_{k-1} and stores the result in the destination parameter.
   *
   * @param encrypted
   * @param destination
   */
  plainModSwitchToNext({plain, destination}) {
    this._instance.plainModSwitchToNext(plain.instance, destination.instance)
  }

  /**
   * Given an NTT transformed plaintext modulo q_1...q_k, this function switches
   * the modulus down until the parameters reach the given parmsId and stores
   * the result in the destination parameter.
   *
   * @param encrypted
   * @param parmsId
   * @param destination
   */
  plainModSwitchTo({plain, parmsId, destination}) {
    this._instance.plainModSwitchTo(plain.instance, parmsId, destination.instance)
  }
  /**
   * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
   * modulus down to q_1...q_{k-1}, scales the message down accordingly, and
   * stores the result in the destination parameter. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   *
   * @param encrypted
   * @param destination
   * @param {optional} pool
   */
  rescaleToNext({encrypted, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.rescaleToNext(encrypted.instance, destination.instance, pool)
  }

  /**
   * Given a ciphertext encrypted modulo q_1...q_k, this function switches the
   * modulus down until the parameters reach the given parms_id, scales the message
   * down accordingly, and stores the result in the destination parameter. Dynamic
   * memory allocations in the process are allocated from the memory pool pointed
   * to by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param parmsId
   * @param destination
   * @param {optional} pool
   */
  rescaleTo({encrypted, parmsId, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.rescaleTo(encrypted.instance, parmsId, destination.instance, pool)
  }

  /**
   * Exponentiates a ciphertext. This functions raises encrypted to a power and
   * stores the result in the destination parameter. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle. The exponentiation is done in a depth-optimal order, and
   * relinearization is performed automatically after every multiplication in
   * the process. In relinearization the given relinearization keys are used.
   *
   * @param encrypted
   * @param exponent
   * @param relinKeys
   * @param destination
   * @param {optional} pool
   */
  exponentiate({encrypted, exponent, relinKeys, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.exponentiate(encrypted.instance, exponent, relinKeys.instance, destination.instance, pool)
  }

  /**
   * Adds a ciphertext and a plaintext. This function adds a ciphertext and
   * a plaintext and stores the result in the destination parameter. The plaintext
   * must be valid for the current encryption parameters.
   *
   * @param encrypted
   * @param plain
   * @param destination
   */
  addPlain({encrypted, plain, destination}) {
    this._instance.addPlain(encrypted.instance, plain.instance, destination.instance)
  }

  /**
   * Subtracts a plaintext from a ciphertext. This function subtracts a plaintext
   * from a ciphertext and stores the result in the destination parameter. The
   * plaintext must be valid for the current encryption parameters.
   *
   * @param encrypted
   * @param plain
   * @param destination
   */
  subPlain({encrypted, plain, destination}) {
    this._instance.subPlain(encrypted.instance, plain.instance, destination.instance)
  }

  /**
   * Multiplies a ciphertext with a plaintext. This function multiplies
   * a ciphertext with a plaintext and stores the result in the destination
   * parameter. The plaintext must be a valid for the current encryption parameters,
   * and cannot be identially 0. Dynamic memory allocations in the process are
   * allocated from the memory pool pointed to by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param plain
   * @param destination
   * @param {optional} pool
   */
  multiplyPlain({encrypted, plain, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.multiplyPlain(encrypted.instance, plain.instance, destination.instance, pool)
  }

  /**
   * Transforms a plaintext to NTT domain. This functions applies the Number
   * Theoretic Transform to a plaintext by first embedding integers modulo the
   * plaintext modulus to integers modulo the coefficient modulus and then
   * performing David Harvey's NTT on the resulting polynomial. The transformation
   * is done with respect to encryption parameters corresponding to a given
   * parmsId. The result is stored in the destinationNtt parameter. For the
   * operation to be valid, the plaintext must have degree less than poly_modulus_degree
   * and each coefficient must be less than the plaintext modulus, i.e., the plaintext
   * must be a valid plaintext under the current encryption parameters. Dynamic
   * memory allocations in the process are allocated from the memory pool pointed
   * to by the given MemoryPoolHandle.
   *
   * @param plain
   * @param parmsId
   * @param destinationNtt
   * @param {optional} pool
   */
  plainTransformToNtt({plain, parmsId, destinationNtt, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.plainTransformToNtt(plain.instance, parmsId, destinationNtt.instance, pool)
  }

  /**
   * Transforms a ciphertext to NTT domain. This functions applies David Harvey's
   * Number Theoretic Transform separately to each polynomial of a ciphertext.
   * The result is stored in the destinationNtt parameter.
   *
   * @param encrypted
   * @param parmsId
   * @param destinationNtt
   */
  cipherTransformToNtt({encrypted, parmsId, destinationNtt}) {
    this._instance.cipherTransformToNtt(encrypted.instance, parmsId, destinationNtt.instance)
  }

  /**
   * Transforms a ciphertext back from NTT domain. This functions applies the
   * inverse of David Harvey's Number Theoretic Transform separately to each
   * polynomial of a ciphertext. The result is stored in the destination parameter.
   *
   * @param encryptedNtt
   * @param destination
   */
  cipherTransformFromNtt({encryptedNtt, destination}) {
    this._instance.cipherTransformFromNtt(encryptedNtt.instance, destination.instance)
  }

  /**
   * Applies a Galois automorphism to a ciphertext and writes the result to the
   * destination parameter. To evaluate the Galois automorphism, an appropriate
   * set of Galois keys must also be provided. Dynamic memory allocations in
   * the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   *
   * The desired Galois automorphism is given as a Galois element, and must be
   * an odd integer in the interval [1, M-1], where M = 2*N, and N = degree(poly_modulus).
   * Used with batching, a Galois element 3^i % M corresponds to a cyclic row
   * rotation i steps to the left, and a Galois element 3^(N/2-i) % M corresponds
   * to a cyclic row rotation i steps to the right. The Galois element M-1 corresponds
   * to a column rotation (row swap) in BFV, and complex conjugation in CKKS.
   * In the polynomial view (not batching), a Galois automorphism by a Galois
   * element p changes Enc(plain(x)) to Enc(plain(x^p)).
   *
   * @param encrypted
   * @param galoisElt
   * @param galoisKeys
   * @param destination
   * @param {optional} pool
   */
  applyGalois({encrypted, galoisElt, galoisKeys, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.applyGalois(encrypted.instance, galoisElt, galoisKeys.instance, destination.instance, pool)
  }

  /**
   * Rotates plaintext matrix rows cyclically. When batching is used with the
   * BFV scheme, this function rotates the encrypted plaintext matrix rows
   * cyclically to the left (steps > 0) or to the right (steps < 0) and writes
   * the result to the destination parameter. Since the size of the batched
   * matrix is 2-by-(N/2), where N is the degree of the polynomial modulus,
   * the number of steps to rotate must have absolute value at most N/2-1. Dynamic
   * memory allocations in the process are allocated from the memory pool pointed
   * to by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param steps
   * @param galoisKeys
   * @param destination
   * @param {optional} pool
   */
  rotateRows({encrypted, steps, galoisKeys, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.rotateRows(encrypted.instance, steps, galoisKeys.instance, destination.instance, pool)
  }

  /**
   * Rotates plaintext matrix columns cyclically. When batching is used with
   * the BFV scheme, this function rotates the encrypted plaintext matrix columns
   * cyclically, and writes the result to the destination parameter. Since the
   * size of the batched matrix is 2-by-(N/2), where N is the degree of the
   * polynomial modulus, this means simply swapping the two rows. Dynamic memory
   * allocations in the process are allocated from the memory pool pointed to
   * by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param galoisKeys
   * @param destination
   * @param {optional} pool
   */
  rotateColumns({encrypted, galoisKeys, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.rotateColumns(encrypted.instance, galoisKeys.instance, destination.instance, pool)
  }

  /**
   * Rotates plaintext vector cyclically. When using the CKKS scheme, this function
   * rotates the encrypted plaintext vector cyclically to the left (steps > 0)
   * or to the right (steps < 0) and writes the result to the destination parameter.
   * Since the size of the batched matrix is 2-by-(N/2), where N is the degree
   * of the polynomial modulus, the number of steps to rotate must have absolute
   * value at most N/2-1. Dynamic memory allocations in the process are allocated
   * from the memory pool pointed to by the given MemoryPoolHandle.
   *
   * @param encrypted
   * @param steps
   * @param galoisKeys
   * @param destination
   * @param {optional} pool
   */
  rotateVector({encrypted, steps, galoisKeys, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.rotateVector(encrypted.instance, steps, galoisKeys.instance, destination.instance, pool)
  }

  /**
   * Complex conjugates plaintext slot values. When using the CKKS scheme, this
   * function complex conjugates all values in the underlying plaintext, and
   * writes the result to the destination parameter. Dynamic memory allocations
   * in the process are allocated from the memory pool pointed to by the given
   * MemoryPoolHandle.
   *
   * @param encrypted
   * @param galoisKeys
   * @param destination
   * @param {optional} pool
   */
  complexConjugate({encrypted, galoisKeys, destination, pool = this._MemoryPoolHandleGlobal()}) {
    this._instance.complexConjugate(encrypted.instance, galoisKeys.instance, destination.instance, pool)
  }
}
