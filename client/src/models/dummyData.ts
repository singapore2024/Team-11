import { SeniorInterface, UserInterface } from "./interfaces";

export const data: SeniorInterface[] = [
    {   
        id: '1',
        title: 'Mr',
        name: 'Lim',
        gender: 'M',
        age: 78,
        languages: ['Hokkien', 'Mandarin'],
        lastVisitedDate: '10 Sep 2024',
        postalCode: '510773',
        imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no',
        lat: 1.37625,
        lon: 103.93609
    },
    {   
        id: '2',
        title: 'Ms',
        name: 'Soh',
        gender: 'F',
        age: 85,
        languages: ['English', 'Cantonese'],
        lastVisitedDate: '13 Sep 2024',
        postalCode: '520123',
        imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no',
        lat: 1.3766264708024798,
        lon: 103.93051796826676
    }
]


export const userData: UserInterface[] = [
    {
        id: '1',
        name: 'Josephine',
        age: 24,
        gender: 'F',
        languages: ['English', 'Indonesian'],
        nric: '696i',
        address: 'Pasir Ris',
        totalVisits: 2,
        postalCode: '510773',
        lat: 1.37625,
        lon: 103.93609,
        email: 'josephine.hemingway@gmail.com',
        mobile: '+65 8611 9550'
    }
]