export type TDivisionDistrict = {
  division: string;
  districts: string[];
};

export const bdDivisionDistricts: TDivisionDistrict[] = [
  {
    division: "Dhaka",
    districts: [
      "Dhaka", "Gazipur", "Narayanganj", "Narsingdi", "Manikganj",
      "Munshiganj", "Rajbari", "Shariatpur", "Madaripur", "Gopalganj",
      "Faridpur", "Kishoreganj", "Tangail",
    ],
  },
  {
    division: "Chattogram",
    districts: [
      "Chattogram", "Cox's Bazar", "Brahmanbaria", "Cumilla", "Chandpur",
      "Feni", "Lakshmipur", "Noakhali", "Rangamati", "Khagrachhari", "Bandarban",
    ],
  },
  {
    division: "Rajshahi",
    districts: [
      "Rajshahi", "Bogura", "Pabna", "Sirajganj", "Natore",
      "Naogaon", "Chapainawabganj", "Joypurhat",
    ],
  },
  {
    division: "Khulna",
    districts: [
      "Khulna", "Jashore", "Satkhira", "Bagerhat", "Narail",
      "Magura", "Jhenaidah", "Kushtia", "Chuadanga", "Meherpur",
    ],
  },
  {
    division: "Barisal",
    districts: [
      "Barisal", "Bhola", "Patuakhali", "Pirojpur", "Jhalokati", "Barguna",
    ],
  },
  {
    division: "Sylhet",
    districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  },
  {
    division: "Rangpur",
    districts: [
      "Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat",
      "Nilphamari", "Panchagarh", "Thakurgaon",
    ],
  },
  {
    division: "Mymensingh",
    districts: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  },
];

export const allDivisions = bdDivisionDistricts.map((d) => d.division);

export const getDistrictsByDivision = (division: string): string[] => {
  return bdDivisionDistricts.find((d) => d.division === division)?.districts || [];
};
