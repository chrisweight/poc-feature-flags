export class IFeatures {
  [id: string]: boolean
}

export class Service {

  private static ATTR_FEATURE: string = 'data-feature'

  private _apiUrl: string
  private _environment: string
  private _root: Element
  private _features: IFeatures
  private _mObserver: MutationObserver


  constructor(apiUrl: string, environment: string, root: Element) {
    this._apiUrl      = apiUrl
    this._environment = environment
    this._root        = root

    this._mObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        let elements = this.getFeatureElements(mutation.target)
        this.update(elements)
      })
    })

    this._mObserver
      .observe(this._root, {
        childList: true,
        subtree: true
      })

    console.log(`Service! -> ${this._apiUrl, this._environment, this._root}`)
  }


  // Public
  //



  public async load() {
    console.log(`Service.load() -> ${this._apiUrl, this._environment}`)

    let response  = await fetch(this._apiUrl + '/' + this._environment)
    let parsed    = await response.json()

    this._features = parsed.features

    let elements = this.getFeatureElements(this._root)
    this.update(elements)
  }

  public unload() {
    if (!!this._mObserver) {
      this._mObserver.disconnect()
      this._mObserver = null
    }
  }

  set environment(value: string) {
    this._environment = value
    this.load()
  }

  get environment(): string {
    return this._environment
  }


  // Private
  //

  private getFeatureElements(fromTarget) {
   return fromTarget.querySelectorAll(`[${Service.ATTR_FEATURE}]`)
  }

  private update(elements) {
    if (elements.length < 1) {
      return
    }

    for (let i = 0; i < elements.length; i++) {
      let _element  = elements[i]
      let _fName    = _element.getAttribute(Service.ATTR_FEATURE)

      let _isActive = !!this._features[_fName]
        ? this._features[_fName] === true
        : false

      console.log(_fName, _isActive)

      if (!_isActive) {
        _element.setAttribute('hidden', true)
        continue
      }

      _element.removeAttribute('hidden')
    }
  }
}
