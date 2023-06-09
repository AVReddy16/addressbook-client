import { Component, OnInit } from '@angular/core';
import { AddressBook } from './address.model';
import { AddressService } from './address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  addresses: AddressBook[] = [];
  newAddress: AddressBook = {
    name: '',
    address: '',
    age: 0,
    email: '',
    phone: '',
  };
  selectedAddress: AddressBook | null = null;
  showAddressForm = false;

  constructor(private addressService: AddressService) {
    this.getAddresses();
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  showUpdateForm(address: AddressBook): void {
    this.selectedAddress = address;
    this.showAddressForm = true;
  }

  hideForm(): void {
    this.selectedAddress = null;
    this.showAddressForm = false;
  }

  getAddresses(): void {
    this.addressService
      .getAddresses()
      .subscribe((address) => (this.addresses = address));
  }

  addAddress(): void {
    this.addressService.addAddress(this.newAddress).subscribe(() => {
      this.getAddresses();
      this.newAddress = {
        name: '',
        address: '',
        age: 0,
        email: '',
        phone: '',
      };
    });
  }

  updateAddress(address: AddressBook) {
    if (address._id) {
      this.addressService.updateAddress(address._id, address).subscribe(
        (updatedAddress) => {
          const index = this.addresses.findIndex(
            (p) => p._id === updatedAddress._id
          );
          if (index !== -1) {
            this.addresses[index] = updatedAddress;
            this.selectedAddress = null;
            this.showAddressForm = false;
          }
        },
        (error) => {
          console.error('Error updating address:', error);
        }
      );
    }
  }

  deleteAddress(addressId: string): void {
    this.addressService
      .deleteAddress(addressId)
      .subscribe(() => this.getAddresses());
  }
}
