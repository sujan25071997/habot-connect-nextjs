"use client";

import React, { useState, useEffect } from "react";
import { fetchProviders, Provider } from "../api/providerService";

import { ProviderCard } from "../components/ProviderCard";
import { SkeletonCard } from "../components/SkeletonCard";

export default function HomePage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProviders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 750));

      try {
        const data = await fetchProviders();
        setProviders(data);
        setFilteredProviders(data);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      } finally {
        setLoading(false);
      }
    };
    getProviders();
  }, []);

  useEffect(() => {
    const results = providers.filter(
      (provider) =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProviders(results);
  }, [searchTerm, providers]);

  if (loading) {
    return (
      <div className="container">
        <div className="provider-list">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Learning Support Provider Directory</h1>
      <p className="subtitle">
        {"Find the right support for your child's needs."}
      </p>
      <input
        type="text"
        placeholder="Search by name or specialization..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="provider-list">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))
        ) : (
          <p>No providers match your search.</p>
        )}
      </div>
    </div>
  );
}
