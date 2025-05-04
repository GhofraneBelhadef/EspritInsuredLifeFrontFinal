import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContractRequestService } from 'src/app/Services/ContractServices/contract-requirement.service';

@Component({
  selector: 'app-contract-request',
  templateUrl: './contract-request.component.html',
  styleUrls: ['./contract-request.component.scss']
})
export class ContractRequestComponent {
  requestForm: FormGroup;

  constructor(private fb: FormBuilder, private contractService: ContractRequestService) {
    this.requestForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      contractType: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      this.contractService.sendRequest(this.requestForm.value).subscribe({
        next: res => {
          alert('Request sent successfully!');
          this.requestForm.reset();
        },
        error: err => {
          console.error('Error sending request:', err);
          alert('An error occurred.');
        }
      });
    }
  }
}
