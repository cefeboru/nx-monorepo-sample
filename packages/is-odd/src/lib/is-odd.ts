import { isEven } from '@monorepo-test/is-even';

export function isOdd(value: number): boolean {
  console.log('Hello world');
  return !isEven(value);
}
