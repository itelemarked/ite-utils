import { isArray, isBoolean, isFunction, isInterface, isNull, isNumber, isOptional, isPlainObject, isString, isUndefined } from "./validation";

describe('validation.ts', () => {

  const ALL_TYPES = {
    'undefined': undefined,
    'null': null,
    'string': 'abcd',
    'number': 1234,
    'boolean': true,
    'array': [1,2,3,4],
    'plain-object': {x: 1, y: 2, z: 3},
    'function': () => {}
  }

  function mapAllTypes(fn: (val: any) => boolean): boolean[] {
    return Object.values(ALL_TYPES).map(val => fn(val))
  }

  it(`isUndefined()`, () => {
    expect(mapAllTypes(isUndefined)).toEqual([true, false, false, false, false, false, false, false]);
  });

  it(`isNull()`, () => {
    expect(mapAllTypes(isNull)).toEqual([false, true, false, false, false, false, false, false]);
  });

  it(`isString()`, () => {
    expect(mapAllTypes(isString)).toEqual([false, false, true, false, false, false, false, false]);
  });

  it(`isNumber()`, () => {
    expect(mapAllTypes(isNumber)).toEqual([false, false, false, true, false, false, false, false]);
  });

  it(`isBoolean()`, () => {
    expect(mapAllTypes(isBoolean)).toEqual([false, false, false, false, true, false, false, false]);
  });

  it(`isArray()`, () => {
    expect(mapAllTypes(isArray)).toEqual([false, false, false, false, false, true, false, false]);
  });

  it(`isPlainObject()`, () => {
    expect(mapAllTypes(isPlainObject)).toEqual([false, false, false, false, false, false, true, false]);
  });

  it(`isFunction()`, () => {
    expect(mapAllTypes(isFunction)).toEqual([false, false, false, false, false, false, false, true]);
  });

  describe(`isInterface()`, () => {
    type Point1 = {
      x: number,
      y: number,
      z: number
    }
    type Point2 = {
      x?: number,
      y: number,
      z: number
    }
    type Point3 = {
      x: number | undefined,
      y: number,
      z: number
    }
    const interface1 = {
      x: [isNumber],
      y: [isNumber],
      z: [isNumber]
    }
    const interface2 = {
      x: [isNumber, isOptional],
      y: [isNumber],
      z: [isNumber]
    }
    const interface3 = {
      x: [isNumber, isUndefined],
      y: [isNumber],
      z: [isNumber]
    }

    const interface5 = {
      x: [ (val: any) => isInterface(val, {mgrs: [isString], latlong: [isString]}) ],
      y: [isNumber]
    }
    const val1 = {
      x: 1,
      y: 2,
      z: 3
    }
    const val2 = {
      y: 2,
      z: 3
    }
    const val3a = {
      x: 1,
      y: 2,
      z: 3
    }
    const val3b = {
      x: undefined,
      y: 2,
      z: 3
    }
    const val4 = {
      x: 'aaa',
      y: 2,
      z: 3
    }
    const val5 = {
      x: {
        mgrs: 'mgrs',
        latlong: 'latlong'
      },
      y: 2
    }

    it('first', () => {
      expect( isInterface(val1, interface1)).toEqual(true);
    })
    it('second', () => {
      expect( isInterface(val2, interface2)).toEqual(true);
    })
    it('third-a', () => {
      expect( isInterface(val3a, interface3)).toEqual(true);
    })
    it('third-b', () => {
      expect( isInterface(val3b, interface3)).toEqual(true);
    })
    it('fourth-a', () => {
      expect( isInterface(val4, interface1)).toEqual(false);
    })
    it('fourth-b', () => {
      expect( isInterface(val4, interface2)).toEqual(false);
    })
    it('fourth-c', () => {
      expect( isInterface(val4, interface3)).toEqual(false);
    })
    it('fifth', () => {
      expect( isInterface(val5, interface5)).toEqual(true);
    })
  });

  

})