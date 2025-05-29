export interface Word {
  id: string;
  japanese: string;
  english: string;
  meaning: string;
  idiom?: string;
  image?: Blob;
  createdAt: number;
}