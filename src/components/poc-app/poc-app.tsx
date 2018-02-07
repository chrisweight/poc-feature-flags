import { Component, Prop, State, Element } from '@stencil/core';
import { Service } from '../../service/service';
import { autorun } from 'mobx';


@Component({
  tag: 'poc-app',
  styleUrl: 'poc-app.scss'
})
export class PocApp {

  @Element() element: HTMLElement

  @State() features: any

  @Prop() apiUrl: string
  @Prop() environment: string

  private service: Service
  private rendered: NodeListOf<Element>

  componentWillLoad() {
    console.log('PocApp.componentWillLoad()')

    this.updateRenderedReferences()
    this.hideAll()

    this.service = new Service(this.apiUrl, this.environment)
    this.service.load()

    autorun(() => {
      this.features = this.service.features
    })
  }

  componentWillUpdate() {
    console.log('PocApp.componentWillUpdate()')

    console.log(this.features)

    this.updateRenderedReferences()
    this.hideAll() // This is a bit naff, but you get the idea...
    this.showActive()
  }

  updateRenderedReferences() {
    this.rendered = this.element.querySelectorAll('[data-feature]')
    console.log('PocApp.updateRenderedReferences()', this.rendered)
  }

  hideAll() {
    for (let i = 0; i < this.rendered.length; i++) {
      let _element = this.rendered[i]
      _element.setAttribute('hidden', 'true')
    }
  }

  showActive() {
    if (!this.features) {
      return
    }

    for (let i = 0; i < this.rendered.length; i++) {
      let _element  = this.rendered[i]
      let _fName    = _element.getAttribute('data-feature')

      let _isActive = !!this.features[_fName]
        ? this.features[_fName] === true
        : false

      console.log(_fName, _isActive)

      if (!_isActive) {
        continue
      }

      _element.removeAttribute('hidden')
    }
  }

  onToggleEnvClick() {
    this.service
      .setEnvironment(
        this.service.environment === 'green'
          ? 'blue'
          : 'green'
      )
  }

  render() {
    return (
      <div>
        <button onClick={() => this.onToggleEnvClick()}>Toggle Environment</button>
      </div>
    )
  }
}

