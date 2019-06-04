import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getDecodedAccessToken(token: string, callback): any {
    try{
        return callback(jwt_decode(token));
    }
    catch(Error){
        return callback(null);
    }
  }
}
