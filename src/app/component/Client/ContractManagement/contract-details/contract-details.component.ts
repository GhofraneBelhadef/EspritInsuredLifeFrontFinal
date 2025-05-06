import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  contractType: string = '';

  // Liste des produits d'assurance vie
  lifeProducts = [
    {
      title: 'Life Protection Plan',
      description: 'Long-term protection for your family.',
      image: 'assets/images/life1.jpeg',
      details: 'This plan ensures that your loved ones are financially protected even after your passing, providing them with a steady income.'
    },
    {
      title: 'Senior Life Plan',
      description: 'Tailored insurance for seniors.',
      image: 'assets/images/life2.jpg',
      details: 'Designed for seniors, this plan offers affordable coverage that takes into account the unique needs of aging individuals.'
    },
    {
      title: 'Children’s Life Plan',
      description: 'Secure your child’s future.',
      image: 'assets/images/life3.avif',
      details: 'A life insurance plan for children, helping secure their future with long-term coverage that can grow over time.'
    }
  ];

  // Liste des produits d'assurance non-vie
  nonLifeProducts = [
    {
      title: 'Car Insurance',
      description: 'Comprehensive protection for your vehicle.',
      image: 'assets/images/car1.jpg',
      details: 'Covering accidents, theft, and damages, this policy ensures your car is protected in a wide range of situations.'
    },
    {
      title: 'Home Insurance',
      description: 'Secure your home against risks.',
      image: 'assets/images/home.jpg',
      details: 'Protect your home from natural disasters, fire, theft, and vandalism, with options to add additional coverage for personal belongings.'
    },
    {
      title: 'Travel Insurance',
      description: 'Peace of mind while you travel.',
      image: 'assets/images/travel.jpg',
      details: 'Cover medical emergencies, trip cancellations, and loss of baggage when you travel, ensuring that you are always prepared.'
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupère le paramètre 'contractType' de l'URL pour savoir quel type de contrat afficher
    this.route.paramMap.subscribe(params => {
      this.contractType = params.get('contractType') || 'life';
    });
  }
}
