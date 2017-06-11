import {UserDetail} from "./user-detail";

export class AuthenticationResult {

  constructor(private _result: boolean, private _urlRequested: string, private _httpResponse: any) {
    this._result = _result;
    this._urlRequested = _urlRequested;
    this._httpResponse = _httpResponse;
  }

  get result(): boolean {
    return this._result;
  }

  set result(value: boolean) {
    this._result = value;
  }

  get urlRequested(): string {
    return this._urlRequested;
  }

  set urlRequested(value: string) {
    this._urlRequested = value;
  }

  get httpResponse(): any {
    return this._httpResponse;
  }

  set httpResponse(value: any) {
    this._httpResponse = value;
  }
}
