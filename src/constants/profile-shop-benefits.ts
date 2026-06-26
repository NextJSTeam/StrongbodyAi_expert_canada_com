export interface ProfileShopBenefit {
  number: string;
  title: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
}

export const PROFILE_SHOP_BENEFIT_TABS = ["Home","Product","Writing","Gallery","Certificate","Network"] as const;

export const PROFILE_SHOP_BENEFITS: ProfileShopBenefit[] = [
  {
    "number": "01",
    "title": "You will own your own Profile Shop",
    "paragraphs": [
      "Bring your expertise, services, products, credentials, and contact options together in one professional destination."
    ],
    "imageUrl": "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Seller/1780476165845890973_1.png",
    "imageAlt": "Profile Shop home page preview"
  },
  {
    "number": "02",
    "title": "Package your time and knowledge into services and products",
    "paragraphs": [
      "Turn your expertise into clear offers customers can understand, choose, and request directly from your Profile Shop."
    ],
    "imageUrl": "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Seller/1780476165972196653_2.png",
    "imageAlt": "Profile Shop products section preview"
  },
  {
    "number": "03",
    "title": "You will have your own Blog hub",
    "paragraphs": [
      "Share helpful articles that explain your approach and give customers clear reasons to trust and contact you."
    ],
    "imageUrl": "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Seller/1780476166003432382_3.png",
    "imageAlt": "Profile Shop writing section preview"
  },
  {
    "number": "04",
    "title": "You will have a dedicated Gallery",
    "paragraphs": [
      "Keep consultation highlights, before-and-after photos, events, and proud professional moments in one lasting space."
    ],
    "imageUrl": "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Seller/1780476165985336057_4.png",
    "imageAlt": "Profile Shop gallery section preview"
  },
  {
    "number": "05",
    "title": "A dedicated place to showcase your certificates and credentials",
    "paragraphs": [
      "Unlike social posts that quickly disappear, your Profile Shop keeps your achievements visible for customers to see."
    ],
    "imageUrl": "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Seller/1780476165993140583_5.png",
    "imageAlt": "Profile Shop certificates section preview"
  },
  {
    "number": "06",
    "title": "Invite trusted people into your Network",
    "paragraphs": [
      "Show real customers, partners, and professional connections that strengthen the credibility of your Profile Shop."
    ],
    "imageUrl": "https://strongbody-files-api.s3.ap-southeast-1.amazonaws.com/public/Seller/1780476165945941388_6.png",
    "imageAlt": "Profile Shop network section preview"
  }
];

export const PARTNER_RECRUITMENT_ACTIVATION_FEE = 179;
