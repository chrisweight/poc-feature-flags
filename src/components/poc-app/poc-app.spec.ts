import { render } from '@stencil/core/testing';
import { PocApp } from './poc-app'

describe('poc-app', () => {
  it('should build', () => {
    expect(new PocApp()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [PocApp],
        html: '<poc-app></poc-app>'
      });
    });
  });
});
