export interface IItem {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: IImage;
  user: IUser;
  analytics_response_payload: string;
  analytics: object;
}

export interface IImage {
  fixed_height: {
    height: string | number;
    mp4: string;
    mp4_size: string;
    size: string;
    url: string;
    webp: string;
    webp_size: string;
    width: string | number;
  };
}

export interface IUser {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  description: string;
  display_name: string;
  instagram_url: string;
  is_verified: boolean;
  profile_url: string;
  username: string;
  website_url: string;
}

export interface IPagination {
  count: number;
  offset: number;
  total_count: number;
}

export interface IResponse {
  data: IItem;
}

export interface IAllResponse {
  data: IItem[];
  pagination: IPagination;
}
