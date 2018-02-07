import { Component, Prop, Element } from '@stencil/core';
import { Service } from '../../service/service';

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

    this.service = new Service(this.apiUrl, this.environment, this.element)
    this.service.load()
  }

  componentDidUnload() {
    console.log('PocApp.componentDidUnload()')
    this.service.unload()
  }

  onToggleEnvClick() {
    this.service
      .environment = this.service.environment === 'green'
        ? 'blue'
        : 'green'
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
          <br />
          <a href='/'>HOME</a>
          <br />
          <a href='/other'>OTHER</a>
        </footer>
      </div>
    )
  }
}

