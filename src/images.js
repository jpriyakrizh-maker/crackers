
export const IMG = {
  hero: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1920",

  heroCard: "https://www.fnp.com/images/pr/x/v20220926163733/diwali-special-choco-crackers_1.jpg",

  banner: "https://madeinsivakasi.com/uploads/festive_product_showcase_right_side-1788716538750-205378485.webp",

  footer: "https://img.magnific.com/free-photo/fireworks-isolated-black-background_1373-4.jpg?semt=ais_hybrid&w=740&q=80",

  offers: [
    "https://images.archanfireworks.in/uploads/all/2-34-kuruvi-crackers-1-pkt-garland-crackers-eco-friendly-diwali-crackers-online-diwali-fatake-name.jpg",
    "https://www.crackersindia.co/wp-content/uploads/2014/08/IMG-20170731-WA00021.jpg",
    "https://i.ytimg.com/vi/wtG5hxvhvJA/maxresdefault.jpg"
  ],

  why: [
    "https://giftocean.in/cdn/shop/files/8012EE55-5911-4FB2-8899-9E28D614310E.jpg?v=1759324118&width=1946",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYHNdr9-5FZR4HxpJjbpi_55P1aBoJwiCn8koca8cWk3kq6vzaSWiBzGM&s=10",
    "https://images.openai.com/static-rsc-4/rseMx0bxVWB8RybXpSh3rzvn4YQMff9Kcv2OJFB03hbyYADixqb7ezznfRupabw-t5kqNu9r_f4GZfjRK0-HtojccJ7B2Jcvh40RQNt8SGVC2LMbcd5AGxvAVXbTLAEBbRaCaveB8Ix-tpXxbqRNGg-N22LCwsVTYR3XYZGCn6H_6H6bj23lZUZLSP3ThXK6?purpose=fullsize",
    "https://images.openai.com/static-rsc-4/8Tz6kYSPhOATsoosz4LcecKe3FDS17dcy-hANJvSb6vYsfcADybJOZPAY3h1XtkRYDvwZ1Ds0bUgUnh069O9mYFz8rYaARYHhdVPUT4Sw_LV60DRfJHCqdxw7BJ2e10B3x4jIdfVczlDdpkYpCVnWv-KPuhVKEEn0F-VKFAselGaKxUqWuBX0_PWtqj7c2M3?purpose=fullsize"
  ],

  people: [
    "https://i.pravatar.cc/200?img=12",
    "https://i.pravatar.cc/200?img=47",
    "https://i.pravatar.cc/200?img=33"
  ],

  product: (id) => {
    const products = {
      1: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/fEdaxERpo-product.jpeg",
      2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1m9XAb5xDrheQYWRYtIgOqNB4dvZdqiK8ZO3w3on_alolnHWBlmM4RSJD&s=10",
      3: "https://gocracker.in/wp-content/uploads/2026/07/1.5-INCH-CHOTTA-FANCY-SKY-SHOT.jpg",
      4: "https://cdn2.hubspot.net/hubfs/3003156/news-images/FireworksHistory4.jpg",
      5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQsbH2kVQuW4CIMjPTWKtjcNTwbWg4BEZy5WleOyrDyuqiQL5lF5jBX8sw&s=10",
    };

    return products[id];
  }
};
