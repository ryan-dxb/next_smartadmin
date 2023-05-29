export interface IUser {
  success: boolean;
  user: {
    id: string;
    email: string;
    username: string;
    isVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
    firstName?: string;
    lastName?: string;
    avatar?: {
      url: string;
      public_id: string;
    };

    accessToken: string;
  };
}
