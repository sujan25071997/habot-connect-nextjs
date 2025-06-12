import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaStar, FaUserMd } from "react-icons/fa";
import { Provider } from "@/api/providerService";

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <Link href={`/providers/${provider.id}`} className="provider-card-link">
      <div className="provider-card">
        <h2>{provider.name}</h2>

        <div className="card-info">
          <p className="icon-text">
            <FaUserMd /> {provider.specialization}
          </p>
          <p className="icon-text">
            <FaMapMarkerAlt /> {provider.location}
          </p>
        </div>

        <div className="card-footer">
          <div className="rating icon-text">
            <FaStar color="#f5c518" />
            <span>{provider.rating.toFixed(1)}</span>
          </div>
          <div className="details-link">View Details →</div>
        </div>
      </div>
    </Link>
  );
};
