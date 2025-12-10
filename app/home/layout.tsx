import { Metadata } from "next";

export const metadata: Metadata = {
  title: "X - Home",
  description: "X is a social media platform built around real-time public conversation using short-form posts.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}