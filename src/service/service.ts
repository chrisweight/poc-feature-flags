import { observable, action } from "mobx";

export class IFeatures {
  [id: string]: boolean
}

export class Service {

  private _apiUrl: string
  private _environment: string

  @observable features: IFeatures

  constructor(apiUrl: string, environment: string) {
    this._apiUrl      = apiUrl
    this._environment = environment

    console.log(`Service! -> ${this._apiUrl, this._environment}`)
  }

  async load() {
    console.log(`Service.load() -> ${this._apiUrl, this._environment}`)

    let response  = await fetch(this._apiUrl + '/' + this._environment)
    let _features = await response.json()

    this.features = _features.features
  }

  @action setEnvironment(value: string) {
    this._environment = value
    this.load()
  }

  get environment(): string {
    return this._environment
  }
}
