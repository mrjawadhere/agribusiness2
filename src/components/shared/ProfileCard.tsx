import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { WhatsAppButton } from "./WhatsAppButton";
import { useState } from "react";

export type UserType = "student" | "company" | "consultant" | "farmer" | "org";

interface ProfileCardProps {
  id: string;
  type: UserType;
  name: string;
  title: string;
  location: string;
  rating?: number;
  keywords?: string[];
  isVerified?: boolean;
  image?: string;
  phone?: string;
  className?: string;
}

const typeColors: Record<UserType, string> = {
  student: "bg-blue-50 text-blue-700 border-blue-100",
  company: "bg-purple-50 text-purple-700 border-purple-100",
  consultant: "bg-primary/5 text-primary border-primary/10",
  farmer: "bg-green-50 text-green-700 border-green-100",
  org: "bg-amber-50 text-amber-700 border-amber-100",
};

const typeLabels: Record<UserType, string> = {
  student: "Student",
  company: "Company",
  consultant: "Consultant",
  farmer: "Farmer",
  org: "Organisation",
};

const typeIcons: Record<UserType, string> = {
  student: "school",
  company: "domain",
  consultant: "psychology",
  farmer: "agriculture",
  org: "corporate_fare",
};

export function ProfileCard({
  id,
  type,
  name,
  title,
  location,
  rating,
  keywords = [],
  isVerified = false,
  image,
  phone,
  className,
}: ProfileCardProps) {
  const [imgError, setImgError] = useState(false);

  // Initials fallback (max 2 chars)
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article
      className={cn(
        "bg-white p-8 rounded-[2.5rem] border border-outline-variant/30",
        "hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
        "transition-all duration-300 flex flex-col gap-6 group text-left",
        className
      )}
    >
      {/* Header: avatar + name + verified badge */}
      <div className="flex items-start gap-5">
        <div className="relative shrink-0">
          {image && !imgError ? (
            <img
              src={image}
              alt={`${name}'s profile photo`}
              onError={() => setImgError(true)}
              loading="lazy"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-outline-variant/20"
            />
          ) : (
            /* Initials fallback — never shows broken image icon */
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center border-2 border-outline-variant/20">
              <span className="text-white font-bold text-lg">{initials}</span>
            </div>
          )}
          {isVerified && (
            <div
              className="absolute -bottom-1.5 -right-1.5 bg-secondary text-primary w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow"
              title="Verified member"
            >
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                verified
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-bold text-primary text-base tracking-tight truncate">
              {name}
            </h3>
          </div>
          <p className="text-xs text-on-surface-variant font-medium line-clamp-1">
            {title}
          </p>
          <span
            className={cn(
              "inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] border",
              typeColors[type]
            )}
          >
            <span className="material-symbols-outlined text-[11px]" aria-hidden="true">
              {typeIcons[type]}
            </span>
            {typeLabels[type]}
          </span>
        </div>
      </div>

      {/* Location + Rating */}
      <div className="flex items-center gap-6 text-xs font-medium text-on-surface-variant">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
            location_on
          </span>
          {location}
        </span>
        {rating !== undefined && (
          <span className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5`}>
            <span className="material-symbols-outlined text-[16px] text-secondary" aria-hidden="true">
              star
            </span>
            <span className="font-bold text-primary">{rating.toFixed(1)}</span>
          </span>
        )}
      </div>

      {/* Keywords */}
      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {keywords.slice(0, 4).map((kw) => (
            <span
              key={kw}
              className="px-3 py-1 rounded-xl bg-surface-container-low text-[9px] font-bold uppercase tracking-widest text-primary border border-outline-variant/20"
            >
              {kw}
            </span>
          ))}
          {keywords.length > 4 && (
            <span className="px-3 py-1 rounded-xl bg-surface-container-low text-[9px] font-bold text-on-surface-variant/50 border border-outline-variant/20">
              +{keywords.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-auto pt-2">
        <Link
          to={`/profile/${id}`}
          className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold text-xs uppercase tracking-widest text-center hover:bg-primary-container transition-all"
          aria-label={`View ${name}'s full profile`}
        >
          View Profile
        </Link>
        {phone && (
          <WhatsAppButton
            phone={phone}
            variant="outline"
            className="w-full justify-center"
          />
        )}
      </div>
    </article>
  );
}
