import { Component, Prop, Element } from '@stencil/core';
import { Service, FeaturesEnvironment } from '../../service/service';

@Component({
  tag: 'poc-app',
  styleUrl: 'poc-app.scss'
})
export class PocApp {

  @Element() element: HTMLElement

  @Prop() apiUrl: string
  @Prop() environment: string

  private service: Service


  // Lifecycle
  //

  componentWillLoad() {
    console.log('PocApp.componentWillLoad()')

    this.service = new Service(this.apiUrl, this.environment as FeaturesEnvironment, this.element)
    this.service.load()
  }

  componentDidUnload() {
    console.log('PocApp.componentDidUnload()')
    this.service.unload()
  }

  onToggleEnvClick() {
    this.service
      .environment = this.service.environment === FeaturesEnvironment.Green
        ? FeaturesEnvironment.Blue
        : FeaturesEnvironment.Green
  }

  // --

  render() {
    return (
      <div>
        <main>
          <stencil-router id="app-router">
            <stencil-route url='/' component='page-landing' exact={true}></stencil-route>
            <stencil-route url="/other" component="page-other" exact={true}></stencil-route>
          </stencil-router>
        </main>

        <footer>
          <button onClick={() => this.onToggleEnvClick()}>Toggle Environment</button>

          <div class='right'>
            <stencil-route-link url='/'>Home</stencil-route-link>
            <stencil-route-link url='/other'>Other</stencil-route-link>
          </div>
        </footer>
      </div>
    )
  }
}

