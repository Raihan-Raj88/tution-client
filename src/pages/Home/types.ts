export type TTeacher = {
  _id: string;
  name: string;
  university: string;
  whatsApp: string;
  email: string;
  classRange: string;
  description: string;
  photo: string;
  studentIDPhoto: string;
  subjects: string[];
  userId: string;
};

export type TPost = {
  _id: string;
  userId: string;
  whatsApp: string;
  title: string;
  class: string;
  subject: string[];
  medium: string;
  description: string;
  division: string;
  district: string;
  salary: string;
  gender: string;
  daysPerWeek: string;
  createdAt: Date;
};

export type TParamsQuery = {
  name: string;
  value: any;
};

export type TLocation = {
  district: string;
  thana: string;
};

export type TUser = {
  _id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

type ImageDetails = {
  filename: string;
  name: string;
  mime: string; // MIME type of the image
  extension: string;
  url: string;
};

type ImageData = {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: number;
  height: number;
  size: number;
  time: number; // Timestamp, might need to be handled as a Date depending on usage
  expiration: number;
  image: ImageDetails;
  thumb: ImageDetails;
  delete_url: string;
};

export type TImageApiResponse = {
  data: ImageData;
  success: boolean;
  status: number;
};

export type TBlog = {
  _id: string;
  title: string;
  blog: string;
  views: number;
  userId: string;
  userName: string;
  bannerPhoto: string;
  photo: string;
  keyWords: string[];
  createdAt: Date;
};
