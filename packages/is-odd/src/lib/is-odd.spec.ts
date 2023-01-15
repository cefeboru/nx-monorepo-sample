import { isOdd } from './is-odd';

describe('isOdd', () => {
  it('should work', () => {
    expect(isOdd(3)).toEqual(true);
    expect(isOdd(5)).toEqual(true);
  });
});
