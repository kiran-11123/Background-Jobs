"use client";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function JobsPage({ params }: Props) {
  const { id } = use(params); // unwrap the promise

  return <div>Jobs Page for Project ID: {id}</div>;
}
