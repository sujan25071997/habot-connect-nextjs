"use client"; // FIX: Converted this to a Client Component to resolve the server-side error.

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation"; // Import client-side hooks

// Using a relative path to ensure module resolution
import { fetchProviderById, Provider } from "../../../api/providerService";

// This is now a Client Component
export default function ProviderDetailPage() {
  const params = useParams(); // Get params using the client-side hook
  const id = params.id as string; // Extract the id

  // State for managing the provider data, loading, and error states
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Only run the effect if the id is available
    if (id) {
      const getProvider = async () => {
        try {
          setLoading(true);
          const data = await fetchProviderById(id);
          setProvider(data);
        } catch (error) {
          // If the provider is not found, trigger the Next.js 404 page.
          console.error(`Failed to fetch provider with id: ${id}`, error);
          notFound();
        } finally {
          setLoading(false);
        }
      };
      getProvider();
    }
  }, [id]); // This effect re-runs if the id changes

  // Display a loading state while fetching data
  if (loading) {
    return <div className="loading">Loading provider details...</div>;
  }

  // If no provider was found (after loading)
  if (!provider) {
    // This case should be handled by notFound(), but it's good practice
    return <div className="loading">Provider could not be loaded.</div>;
  }

  // Render the provider details once data is available
  return (
    <div className="container">
      <Link href="/" className="back-button">
        ← Back to List
      </Link>
      <div className="provider-detail">
        <h1>{provider.name}</h1>
        <p>
          <strong>Specialization:</strong> {provider.specialization}
        </p>
        <p>
          <strong>Rating:</strong> {provider.rating} / 5
        </p>
        <p>
          <strong>Location:</strong> {provider.location}
        </p>
        <p style={{ marginTop: "1.5rem", lineHeight: "1.6" }}>
          {provider.longDescription}
        </p>

        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>
            <strong>Email:</strong> {provider.contactEmail}
          </p>
          <p>
            <strong>Phone:</strong> {provider.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
