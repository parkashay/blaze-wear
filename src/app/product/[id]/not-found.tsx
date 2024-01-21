export default function NotFound() {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="border border-gray-500 rounded shadow-lg p-10 md:p-20 transition-all duration-200 hover:scale-110">
          <h2 className="text-3xl text-center font-bold text-gray-700 pb-3">
            Not Found
          </h2>
          <p className="text-xl text-gray-700">
            Could not find requested resource
          </p>
        </div>
      </div>
    );
  }
  