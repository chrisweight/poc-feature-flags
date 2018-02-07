import { Component } from '@stencil/core';


@Component({
  tag: 'page-landing',
  styleUrl: 'page-landing.scss'
})
export class PageLanding {

  render() {
    return (
      <div>
        <h1 data-feature='featureOne'>Woot!</h1>

        <p data-feature='featureTwo'>I'm an app feature!</p>

        <div data-feature='featureThree'>
          <h3> I'm a bigger Feature that contains multiple elements</h3>
          <blockquote>Some profound feature-y quote</blockquote>
        </div>
      </div>
    )
  }
}
