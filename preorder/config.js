// ============================================================
// Mercy Built preorder page settings. Edit this file only.
// ============================================================
// colors: the 4 first-release hoodie colors.
//   name  = what customers see and what gets saved with the preorder
//   hex   = swatch / illustration color
//   image = optional product photo path, e.g. "../assets/black.jpg" (leave "" to use the drawn hoodie)
// price: leave "" to hide the price. Example: "$55"
// ============================================================
window.MB_CONFIG = {
  colors: [
    { name: "Black",      hex: "#131210", image: "../assets/hoodie-romans-black.jpg?v=sleeves" },
    { name: "Olive",      hex: "#4a4630", image: "../assets/hoodie-romans-olive.jpg?v=sleeves" },
    { name: "Cream",      hex: "#d8c6b5", image: "../assets/hoodie-romans-cream.jpg?v=sleeves" },
    { name: "Blush Pink", hex: "#ce9a8e", image: "../assets/hoodie-romans-blush-pink.jpg?v=sleeves" }
  ],
  product: "Romans 8:39 hoodie",
  lineup: "../assets/mercy-built-hoodies-romans.jpg?v=sleeves",
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  price: "",
  supabaseUrl: "https://wkftusmqasujgqgokpgw.supabase.co",
  supabaseKey: "sb_publishable_2kN3iBrnaZ0feEBy_tydhw_6CyaUGx2"
};
