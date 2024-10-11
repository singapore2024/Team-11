import { SeniorInterface, UserInterface } from "./interfaces";

export const seniorData: SeniorInterface[] = [
  {
    senior_id: 2,
    name: "Paya Lebar Farm 2",
    gender: "F",
    age: 72,
    languages: ["Basil", "Kang Kong"],
    daysLastVisited: 10,
    postal_code: 510774,
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: 0.001,
    lon: 0.001
  },
  {
    senior_id: 3,
    name: "Paya Lebar Farm 3",
    gender: "M",
    age: 65,
    languages: ["Carrots", "Tomatoes"],
    daysLastVisited: 15,
    postal_code: 510775,
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: 0.001,
    lon: -0.001
  },
  {
    senior_id: 4,
    name: "Paya Lebar Farm 4",
    gender: "F",
    age: 80,
    languages: ["Spinach", "Bok Choy"],
    daysLastVisited: 20,
    postal_code: 510776,
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: -0.001,
    lon: 0.001
  },
  {
    senior_id: 5,
    name: "Paya Lebar Farm 5",
    gender: "M",
    age: 68,
    languages: ["Lettuce", "Radishes"],
    daysLastVisited: 5,
    postal_code: 510777,
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: 0.0005,
    lon: 0.0005
  },
  {
    senior_id: 6,
    name: "Paya Lebar Farm 6",
    gender: "F",
    age: 75,
    languages: ["Cucumbers", "Beans"],
    daysLastVisited: 12,
    postal_code: 510778,
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: 0.0008,
    lon: -0.0008
  },
  {
    senior_id: 7,
    name: "Paya Lebar Farm 7",
    gender: "M",
    age: 70,
    languages: ["Basil", "Spring Onions"],
    daysLastVisited: 8,
    postal_code: 510779,
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: -0.0003,
    lon: 0.0004
  }
];

export const userData: UserInterface[] = [
  {
    id: "1",
    name: "Josephine",
    age: 24,
    gender: "F",
    languages: ["English", "Indonesian"],
    nric: "696i",
    address: "Pasir Ris",
    totalVisits: 2,
    postalCode: "510773",
    lat: 1.37625,
    lon: 103.93609,
    email: "josephine.hemingway@gmail.com",
    mobile: "+65 8611 9550",
  },
];

export const farmData = {
  farm_id: 2,
  postal_code: "738099",
  address: "Seletar Aerospace Park, 1 The Oval",
  story:
    "In the heart of Seletar, Auntie Lily's dream took root. At 58, she transformed an abandoned lot into a vibrant urban farm. Starting with a handful of chili plants and herbs, her passion soon infected the community. Young professionals from nearby offices spent their lunch breaks learning to plant. Children from the local school adopted plots, giggling as they discovered the magic of growing their own food. As the farm flourished, so did the bonds between neighbors. Auntie Lily's farm became more than just a source of fresh produce; it became a living classroom, a stress-relief haven, and a symbol of how nature can thrive even in the most unexpected urban spaces.",
  list_of_farmers: [2, 4, 7, 9],
  plot_size: 1500,
  inventory_id: 456,
  lat: 1.41667,
  lon: 103.86667,
};
