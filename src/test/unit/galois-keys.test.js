import { Seal } from '../../index.js'
import { getLibrary } from '../../index'
import { GaloisKeys } from '../../components'

let Morfix = null
let parms = null
let context = null
let keyGenerator = null
let GaloisKeysObject = null
beforeAll(async () => {
  Morfix = await Seal
  const lib = getLibrary()
  GaloisKeysObject = GaloisKeys(lib)(Morfix)

  parms = Morfix.EncryptionParameters(Morfix.SchemeType.BFV)
  parms.setPolyModulusDegree(4096)
  parms.setCoeffModulus(
    Morfix.CoeffModulus.BFVDefault(4096, Morfix.SecurityLevel.tc128)
  )
  parms.setPlainModulus(Morfix.PlainModulus.Batching(4096, 20))
  context = Morfix.Context(parms, true, Morfix.SecurityLevel.tc128)
  keyGenerator = Morfix.KeyGenerator(context)
})

describe('GaloisKeys', () => {
  test('It should be a factory', () => {
    expect(GaloisKeysObject).toBeDefined()
    expect(typeof GaloisKeysObject.constructor).toBe('function')
    expect(GaloisKeysObject).toBeInstanceOf(Object)
    expect(GaloisKeysObject.constructor).toBe(Function)
    expect(GaloisKeysObject.constructor.name).toBe('Function')
  })
  test('It should have properties', () => {
    const item = GaloisKeysObject()
    // Test properties
    expect(item).toHaveProperty('instance')
    expect(item).toHaveProperty('inject')
    expect(item).toHaveProperty('delete')
    expect(item).toHaveProperty('getIndex')
    expect(item).toHaveProperty('hasKey')
    expect(item).toHaveProperty('save')
    expect(item).toHaveProperty('saveArray')
    expect(item).toHaveProperty('load')
    expect(item).toHaveProperty('loadArray')
    expect(item).toHaveProperty('copy')
    expect(item).toHaveProperty('clone')
    expect(item).toHaveProperty('move')
  })
  test('It should have an instance', () => {
    const item = GaloisKeysObject()
    expect(item.instance).toBeDefined()
  })
  test('It should inject', () => {
    const item = GaloisKeysObject()
    const str = item.save()
    const newItem = GaloisKeysObject()
    newItem.delete()
    const spyOn = jest.spyOn(newItem, 'inject')
    newItem.inject(item.instance)
    expect(spyOn).toHaveBeenCalledWith(item.instance)
    expect(newItem.save()).toEqual(str)
  })
  test('It should delete the old instance and inject', () => {
    const item = GaloisKeysObject()
    const str = item.save()
    const newItem = GaloisKeysObject()
    const spyOn = jest.spyOn(newItem, 'inject')
    newItem.inject(item.instance)
    expect(spyOn).toHaveBeenCalledWith(item.instance)
    expect(newItem.save()).toEqual(str)
  })
  test("It should delete it's instance", () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'delete')
    item.delete()
    expect(spyOn).toHaveBeenCalled()
    expect(item.instance).toBeNull()
    expect(() => item.save()).toThrow(TypeError)
  })
  test('It should skip deleting twice', () => {
    const item = GaloisKeysObject()
    item.delete()
    const spyOn = jest.spyOn(item, 'delete')
    item.delete()
    expect(spyOn).toHaveBeenCalled()
    expect(item.instance).toBeNull()
    expect(() => item.size).toThrow(TypeError)
  })
  test('It should get the index of a galois element', () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'getIndex')
    const index = item.getIndex(5)
    expect(spyOn).toHaveBeenCalledWith(5)
    expect(typeof index).toBe('number')
  })
  test('It should fail to get the index of a galois element', () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'getIndex')
    expect(() => item.getIndex(2)).toThrow()
    expect(spyOn).toHaveBeenCalledWith(2)
  })
  test('It should return if the galois element exists', () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'hasKey')
    const index = item.hasKey(3)
    expect(spyOn).toHaveBeenCalledWith(3)
    expect(typeof index).toBe('boolean')
  })
  test('It should fail to return if the galois element exists', () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'hasKey')
    expect(() => item.hasKey(2)).toThrow()
    expect(spyOn).toHaveBeenCalledWith(2)
  })
  test('It should save to a string', () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'save')
    const str = item.save()
    expect(spyOn).toHaveBeenCalledWith()
    expect(typeof str).toBe('string')
  })
  test('It should save to an array', () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'saveArray')
    const array = item.saveArray()
    expect(spyOn).toHaveBeenCalledWith()
    expect(array.constructor).toBe(Uint8Array)
  })
  test('It should load from a string', () => {
    const item = keyGenerator.genGaloisKeys()
    const newItem = GaloisKeysObject()
    const str = item.save()
    const spyOn = jest.spyOn(newItem, 'load')
    newItem.load(context, str)
    expect(spyOn).toHaveBeenCalledWith(context, str)
    expect(newItem.save()).toEqual(str)
  })
  test('It should load from a typed array', () => {
    const item = keyGenerator.genGaloisKeys()
    const newItem = GaloisKeysObject()
    const array = item.saveArray()
    const spyOn = jest.spyOn(newItem, 'loadArray')
    newItem.loadArray(context, array)
    expect(spyOn).toHaveBeenCalledWith(context, array)
    expect(newItem.saveArray()).toEqual(array)
  })
  test('It should fail to load from a string', () => {
    const newItem = GaloisKeysObject()
    const spyOn = jest.spyOn(newItem, 'load')
    expect(() =>
      newItem.load(
        context,
        'XqEAASUAAAAAAAAAAAAAAHicY2CgCHywj1vIwCCBRQYAOAcCRw=='
      )
    ).toThrow()
    expect(spyOn).toHaveBeenCalledWith(
      context,
      'XqEAASUAAAAAAAAAAAAAAHicY2CgCHywj1vIwCCBRQYAOAcCRw=='
    )
  })
  test('It should fail to load from a Uint8Array', () => {
    const newItem = GaloisKeysObject()
    const spyOn = jest.spyOn(newItem, 'loadArray')
    expect(() =>
      newItem.loadArray(
        context,
        Uint8Array.from([
          93,
          161,
          0,
          1,
          27,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          120,
          156,
          99,
          103,
          128,
          0,
          0,
          0,
          64,
          0,
          8
        ])
      )
    ).toThrow()
    expect(spyOn).toHaveBeenCalledWith(
      context,
      Uint8Array.from([
        93,
        161,
        0,
        1,
        27,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        120,
        156,
        99,
        103,
        128,
        0,
        0,
        0,
        64,
        0,
        8
      ])
    )
  })
  test('It should copy another instance', () => {
    const item = keyGenerator.genGaloisKeys()
    const newItem = GaloisKeysObject()
    const spyOn = jest.spyOn(newItem, 'copy')
    newItem.copy(item)
    expect(spyOn).toHaveBeenCalledWith(item)
  })
  test('It should fail to copy another instance', () => {
    const item = keyGenerator.genGaloisKeys()
    const newItem = GaloisKeysObject()
    item.delete()
    const spyOn = jest.spyOn(newItem, 'copy')
    expect(() => newItem.copy(item)).toThrow()
    expect(spyOn).toHaveBeenCalledWith(item)
  })
  test('It should clone itself', () => {
    const item = GaloisKeysObject()
    const spyOn = jest.spyOn(item, 'clone')
    const newItem = item.clone()
    expect(spyOn).toHaveBeenCalledWith()
    expect(newItem).toBeDefined()
    expect(typeof newItem.constructor).toBe('function')
    expect(newItem).toBeInstanceOf(Object)
    expect(newItem.constructor).toBe(Object)
    expect(newItem.instance.constructor.name).toBe('GaloisKeys')
  })
  test('It should fail to clone itself', () => {
    const item = GaloisKeysObject()
    item.delete()
    const spyOn = jest.spyOn(item, 'clone')
    expect(() => item.clone()).toThrow()
    expect(spyOn).toHaveBeenCalledWith()
  })
  test('It should move another instance into itself and delete the old', () => {
    const item = keyGenerator.genGaloisKeys()
    const newItem = GaloisKeysObject()
    const spyOn = jest.spyOn(newItem, 'move')
    newItem.move(item)
    expect(spyOn).toHaveBeenCalledWith(item)
    expect(item.instance).toBeNull()
  })
  test('It should fail to move another instance into itself and delete the old', () => {
    const item = keyGenerator.genGaloisKeys()
    const newItem = GaloisKeysObject()
    item.delete()
    const spyOn = jest.spyOn(newItem, 'move')
    expect(() => newItem.move(item)).toThrow()
    expect(spyOn).toHaveBeenCalledWith(item)
  })
})
