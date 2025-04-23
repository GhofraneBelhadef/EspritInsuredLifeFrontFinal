import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/Services/User/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  photoPreviewUrl: string | ArrayBuffer | null = null;

  signupForm: FormGroup;
  files: { [key: string]: File } = {};

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telephone: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      
    });
  }

  onFileChange(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.files[field] = file;
  
      // Gérer l'aperçu pour la photo de profil
      if (field === 'photoProfil') {
        const reader = new FileReader();
        reader.onload = () => {
          this.photoPreviewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  

  onSubmit() {
    if (this.signupForm.invalid) return;

    const user = this.signupForm.value;
    const formData = new FormData();

    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));

    // Ajouter tous les fichiers présents
    for (const key in this.files) {
      if (this.files[key]) {
        formData.append(key, this.files[key]);
      }
    }

    this.signupService.register(formData).subscribe({
      next: (res) => {
        console.log('Inscription réussie', res);
        alert("Inscription réussie !");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur', err);
        alert("Erreur lors de l'inscription.");
      }
    });
  }
}
