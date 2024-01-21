import { NumberMilPipe } from './number-mil.pipe';

describe('NumberMilPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberMilPipe();
    expect(pipe).toBeTruthy();
  });
});
