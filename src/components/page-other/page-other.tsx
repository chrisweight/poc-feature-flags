import { Component } from '@stencil/core';


@Component({
  tag: 'page-other',
  styleUrl: 'page-other.scss'
})
export class PageOther {

  render() {
    return (
      <div data-feature="featureFour">
        <p>Lazy page component feature thingy</p>
      </div>
    );
  }
}
