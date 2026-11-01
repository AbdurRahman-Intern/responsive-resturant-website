// Shown for any URL that does not match a route (the "*" route in router.jsx).
import { useLanguage } from "../hooks/useLanguage";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

export default function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <p className="font-display text-7xl font-semibold text-accent" dir="ltr">
        404
      </p>
      <h1 className="mt-4 text-section">{t("notFound.title")}</h1>
      <p className="mt-3 max-w-md text-muted">{t("notFound.text")}</p>
      <Button to="/" className="mt-8">
        {t("notFound.home")}
      </Button>
    </Container>
  );
}
