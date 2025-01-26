"use client"

import React, { useEffect, useState } from "react";
import { getArchivBySlug } from "../../lib/ApiService";
import { useRouter } from "next/navigation";
import { ArchivPost } from "../../lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


const ArchivPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [archiv, setArchiv] = useState<ArchivPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArchiv = async () => {
      if (slug) {
        try {
          // Fetch the post using the slug
          const fetchedArchiv = await getArchivBySlug(slug);
          setArchiv(fetchedArchiv);
        } catch (err) {
          setError("Error fetching Archiv.");
          console.log(err);
        } 
        finally {
          setLoading(false);
        }
      }
    };

    fetchArchiv();
  }, [slug]);

  if (error) return <p>Error: {error}</p>;
  if (!archiv) return <p>No archiv found.</p>;
  
  return (
    <div>

    {!loading && !error && (
        <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {archiv.content}
      </ReactMarkdown>
      </>
      )}
    </div>


  );
}


export default ArchivPage;
