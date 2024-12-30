import Link from "next/link";

export default function NotFound() {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="font-bold text-8xl text-gray-200">404</h1>
          </div>
          <div className="ml-4">
            <p className="font-medium text-4xl text-gray-200">
              Página no encontrada
            </p>
            <Link
              href="/"
              className="mt-4 text-cyan-600 text-xl hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
