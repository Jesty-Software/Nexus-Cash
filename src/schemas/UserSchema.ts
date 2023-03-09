type User = {
  username: string;
  created_at: string;
  updated_at: string;
  isVerified: boolean;
  history: string[];
  profileImage: string;
  bannerImage: string;
};

export default User;
