import { useSeoMeta } from "@unhead/react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useSeoMeta({
    title: "404 — Delphi",
    description: "The oracle has no answer for this path. Return to find your way.",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center py-24 sm:py-32 px-4 text-center">
        <p className="font-serif italic text-oracle text-sm tracking-widest mb-4">
          οὐδὲν ἄγαν
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-foreground mb-4">{t('notFound.title')}</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-sm">
          {t('notFound.message')}
        </p>
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/">
            <ArrowLeft className="size-4 mr-1" />
            {t('notFound.returnHome')}
          </Link>
        </Button>
      </div>
    </AppLayout>
  );
};

export default NotFound;
