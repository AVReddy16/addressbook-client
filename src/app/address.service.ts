import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressBook } from './address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'http://localhost:3000/address';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<AddressBook[]> {
    return this.http.get<AddressBook[]>(this.apiUrl);
  }

  addAddress(address: AddressBook): Observable<AddressBook> {
    return this.http.post<AddressBook>(this.apiUrl, address);
  }

  updateAddress(id: string, address: AddressBook): Observable<AddressBook> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<AddressBook>(url, address);
  }

  deleteAddress(addressId: string): Observable<any> {
    const url = `${this.apiUrl}/${addressId}`;
    return this.http.delete(url);
  }
}
