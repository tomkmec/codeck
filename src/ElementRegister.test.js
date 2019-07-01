import { ElementRegister } from './ElementRegister.js'

describe('ElementRegister.get', () => {

  test('default element', () => {
    const textSpec = new ElementRegister().get('text');
    expect(textSpec).toBeDefined()
    expect(textSpec.content).toBe(true)
  });

  test('undefined element', () => {
    const textSpec = new ElementRegister().get('?');
    expect(textSpec).toBeUndefined()
  });

  test('register', () => {
    const register = new ElementRegister();
    register.register('X', {x: true})
    const spec = register.get('X')
    expect(spec).toBeDefined()
    expect(spec.x).toBe(true)
  });

})

