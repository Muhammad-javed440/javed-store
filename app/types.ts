// types.ts

// Define the structure for an individual image object
export interface ImageType {
  _id: string;
  alt?: string;
  asset: {
    _ref: string;
    _type: string;
  };
}
  
  // Define the props for the ImageGallery component
  export interface ImageGalleryProps {
    images: ImageType[]; // Array of ImageType objects
  }
  

  export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
  }
  
  export interface ShoppingCartProps {
    cartCount: number;
    shouldDisplayCart: boolean;
    handleCartClick: () => void;
    cartDetails: Record<string, CartItem>;
    removeItem: (id: string) => void;
    totalPrice: number;
    redirectToCheckout: () => Promise<{ error?: string } | void>;
  }


 