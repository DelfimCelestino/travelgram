import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>Travelgram © {new Date().getFullYear()}</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-gray-900">
              Termos de uso
            </Link>
            <Link href="/privacy" className="hover:text-gray-900">
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
