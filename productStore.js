
function productStore() {
    return {
      products: [],
      selectedProduct: {},
      showPanel: false,
  
      init() {
        console.log("Alpine initialized"); // Debug check
        this.products = [
          {
            title: "ASHVA20",
            summary: "Baggage and Cargo Puller",
            description: "Baggage and Cargo Puller",
            image: "assets/ashva20.webp",
            features: ["15 tons pulling capacity", "Electrically operated equipment", "Single paddle operated"]
          },
          {
            title: "ASHVA20",
            summary: "Baggage and Cargo Puller",
            description: "Baggage and Cargo Puller",
            image: "assets/ASHVA.webp",
            features: ["35 tons pulling capacity", "Electrically operated equipment ", "Single paddle operated"]
          },
          {
            title: "BAG30 ",
            summary: "Baggage Dolly",
            description: "Baggage Dolly",
            image: "assets/baggage.webp",
            features: ["3 tons load bearing capacity", "High strength structure ", "All weather suitable, Anti corrosive"]
          },
          {
            title: "CARGO80",
            summary: "Cargo Dolly",
            description: "Cargo Dolly",
            image: "assets/cargo.webp",
            features: ["Weight bearing capacity of 8 tons", "High strength structure ", "Solid, anti-burst tyre"]
          },
          {
            title: "E-CONVEY0R",
            summary: "Belt Loader",
            description: "Belt Loader",
            image: "assets/convey.webp",
            features: ["Electrically operated", "Adjustable height", "Bi-directional"]
          }
        ];
      }
    };
  }