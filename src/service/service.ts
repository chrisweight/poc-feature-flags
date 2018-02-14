export class IFeatures {
  [id: string]: boolean
}


export enum FeaturesEnvironment {
  Green = 'green',
  Blue = 'blue'
}


export class FeaturesObserver extends MutationObserver {

  private static ATTR_FEATURE: string = 'data-feature'

  private _apiUrl: string
  private _environment: FeaturesEnvironment
  private _root: Element
  private _features: IFeatures

  readonly config: any = {
    childList: true,
    subtree: true
  }

  constructor(apiUrl: string, environment: FeaturesEnvironment, root: Element) {

    super(mutations => {
      mutations.forEach(mutation => {
        let elements = this.getFeatureElements(mutation.target)
        this.update(elements)
      })
    })

    this._apiUrl      = apiUrl
    this._environment = environment
    this._root        = root

    this.observe(this._root, this.config)

    console.log(`Service! -> ${this._apiUrl, this._environment, this._root}`)
  }

  // Public
  //

  public async load() {
    console.log(`Service.load() -> ${this._apiUrl, this._environment}`)

    try {
      let request   = fetch(this._apiUrl + '/' + this._environment)
      let response  = await request
      let json      = await response.json()

      this._features = json.features
    }
    catch(e) {
      console.log('Error!', e);
    }

    let elements = this.getFeatureElements(this._root)
    this.update(elements)
  }

  public unload() {
    this.disconnect()
  }

  set environment(value: FeaturesEnvironment) {
    this._environment = value
    this.load()
  }

  get environment(): FeaturesEnvironment {
    return this._environment
  }


  // Private
  //


  private getFeatureElements(fromTarget) {
    return fromTarget.querySelectorAll(`[${FeaturesObserver.ATTR_FEATURE}]`)
  }

  private update(elements) {
    for (let i = 0; i < elements.length; i++) {
      let _element  = elements[i]
      let _fName    = _element.getAttribute(FeaturesObserver.ATTR_FEATURE)

      let _isActive = !!this._features[_fName]
        ? this._features[_fName] === true
        : false

      console.log(_fName, _isActive)

      // TODO: HTML5 'hidden' probably isn't enough here, we actually need to do some clever DOM
      // Removal and re-assignment
      if (!_isActive) {
        _element.setAttribute('hidden', true)
        continue
      }

      _element.removeAttribute('hidden')
    }
  }
}
