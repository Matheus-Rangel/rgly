import { Injectable } from '@angular/core';
import {Observable, Observer, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationResponse} from './models/authentication-response.model';
import {finalize} from 'rxjs/operators';
import {Link} from "./models/link.model";
import {LinkRequest} from "./models/link-request.model.js";
import {RedirectResponse} from "./models/redirect-response.model";


export interface AuthState{
  isAuthenticated: boolean;
  authFailed: boolean;
  jwtToken: string;
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class RglyService {
  private rglyUrl = 'http://localhost:8080/';
  private authenticateUrl = this.rglyUrl + 'authenticate';
  private authStateSubject = new Subject<AuthState>();
  private saveDialogSubject = new Subject<LinkRequest>();
  private authState: AuthState = {
    isAuthenticated: false,
    username: '',
    authFailed: false,
    jwtToken: ''
  }

  private links: Link[] = []
  private linksSubject = new Subject<Link[]>();
  private selectedLinkSubject = new Subject<Link>();
  private selectedLink: Link;
  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<AuthState>{
    const {authStateSubject} = this;
    this.http.post<AuthenticationResponse>(this.authenticateUrl, {username, password}).pipe(finalize(() => {
      authStateSubject.next({...this.authState});
    }))
      .subscribe(value => {
        this.authState.jwtToken = value.jwt;
        this.authState.isAuthenticated = true;
        this.authState.username = username;
      }, error => {
        console.log(error);
        this.authState.authFailed = true;
      });
    return authStateSubject.asObservable();
  }
  saveDialog(link: LinkRequest){
    this.saveDialogSubject.next({...link});
  }
  saveDialogObservable(): Observable<LinkRequest> {
    return this.saveDialogSubject.asObservable();
  }
  getAuthState(): AuthState {
    return {...this.authState};
  }
  getAuthStateObservable(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }

  getToken(): string{
    return this.authState.jwtToken;
  }

  getUrl(link: string): Observable<RedirectResponse> {
    return this.http.get<RedirectResponse>(this.rglyUrl + link)
  }
  saveLink(link: Link): Observable<Link> {
    if (['authenticate', 'management', '404', 'link', 'links', ''].includes(link.aliasName)){
      return throwError('link ja está em uso');
    }
    return this.http.put<Link>(this.rglyUrl + 'management/link', link);
  }
  selectLink(link: Link): void{
    this.selectedLink = link;
    this.selectedLinkSubject.next(link);
  }
  getLinks(): Observable<Link[]>{
    this.http.get<Link[]>(this.rglyUrl + 'management/links').subscribe(value => {
      this.links = value
      this.linksSubject.next([...value]);
      if (value.length>0){
        this.selectedLink = value[0];
        this.selectedLinkSubject.next({...value[0]})
      }
    });
    return this.linksSubject.asObservable();
  }
  getSelectedLink(): Link{
    return {...this.selectedLink}
  }
  getSelectLinkUpdate(): Observable<Link>{
    return this.selectedLinkSubject.asObservable();
  }
  getLinksUpdate(): Observable<Link[]>{
    return this.linksSubject.asObservable();
  }
  deleteLink(link: Link){
    return this.http.delete(this.rglyUrl + 'management/link/' + link.linkName).subscribe(value => this.getLinks())
  }


  logout() {
    this.authState = {
      isAuthenticated: false,
      username: '',
      authFailed: false,
      jwtToken: ''
    }
  }
}
