import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  companyStats = [
    { number: '10K+', label: 'Products' },
    { number: '50K+', label: 'Users' },
    { number: '99%', label: 'Satisfaction' },
    { number: '24/7', label: 'Support' }
  ];

  teamMembers: TeamMember[] = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      description: 'Visionary leader with 15+ years of experience in e-commerce.',
      socialLinks: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      description: 'Tech expert specializing in scalable architecture.',
      socialLinks: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      description: 'Full-stack developer with a passion for clean code.',
      socialLinks: {
        github: '#',
        twitter: '#'
      }
    }
  ];

  features: Feature[] = [
    {
      icon: '🛡️',
      title: 'Secure Platform',
      description: 'Enterprise-grade security with end-to-end encryption.'
    },
    {
      icon: '⚡',
      title: 'Fast Performance',
      description: 'Optimized for speed with cutting-edge technology.'
    },
    {
      icon: '🎯',
      title: 'User-Focused',
      description: 'Intuitive interface designed with users in mind.'
    },
    {
      icon: '🔄',
      title: 'Regular Updates',
      description: 'Continuous improvements and new features.'
    }
  ];

  timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize e-commerce management.'
    },
    {
      year: '2021',
      title: 'First Major Release',
      description: 'Launched our core platform with essential features.'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded to international markets and grew our team.'
    },
    {
      year: '2023',
      title: 'Innovation Award',
      description: 'Recognized as industry leader in platform innovation.'
    }
  ];
}
