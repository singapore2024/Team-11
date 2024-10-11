import { SeniorInterface, UserInterface } from "./interfaces";

export const data: SeniorInterface[] = [
  {
    id: "1",
    title: "Mr",
    name: "Lim",
    gender: "M",
    age: 78,
    languages: ["Hokkien", "Mandarin"],
    lastVisitedDate: "10 Sep 2024",
    postalCode: "510773",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: 1.37625,
    lon: 103.93609,
  },
  {
    id: "2",
    title: "Ms",
    name: "Soh",
    gender: "F",
    age: 85,
    languages: ["English", "Cantonese"],
    lastVisitedDate: "13 Sep 2024",
    postalCode: "520123",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipPbk2FP1r3FWXTKbEtB6H6jAjJN9ZZuUhts9BqL=w524-h208-p-k-no",
    lat: 1.3766264708024798,
    lon: 103.93051796826676,
  },
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
