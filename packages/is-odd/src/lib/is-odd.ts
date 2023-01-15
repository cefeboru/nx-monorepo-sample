import { isEven } from '@monorepo-test/is-even';

export function isOdd(value: number): boolean {
  return !isEven(value);
}
