import * as yup from "yup";
import { isValidObjectId } from "mongoose";

export const PostSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  content: yup.string().trim().required("Content is required"),
  slug: yup.string().trim().required("Slug is required"),
  meta: yup.string().trim(),
  tags: yup.array().of(yup.string().trim()),
  thumbnail: yup.object().shape({
    url: yup.string().trim(),
    public_id: yup.string().trim(),
  }),
});

// _id: mongoose.Types.ObjectId;
// title: string;
// slug: string;
// meta: string;
// content: string;
// tags: string[];
// thumbnail?: { url: string; public_id: string };
// author: mongoose.Types.ObjectId;
// createdAt: Date;
