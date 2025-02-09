import React from "react";

const HeroSection = () => {
  return (
    <div id="root">
      <section
        id="hero"
        className="bg-neutral-900 text-white min-h-[70vh] flex items-center"
      >
        <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate__animated animate__fadeInLeft">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Explore APIs with <span className="text-buttonBackground">Clarity</span>
              </h1>
              <p className="text-xl text-gray-300">
                Modern, intuitive documentation viewer that makes API
                exploration and testing seamless.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/playground"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-buttonBackground hover:bg-orange-700 transition-all"
                >
                  Playground
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#guides"
                  className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-white hover:bg-neutral-800 transition-all"
                >
                  Documentation
                </a>
              </div>
            </div>
            <div className="animate__animated animate__fadeInRight">
              <div className="bg-neutral-800 p-6 rounded-lg shadow-xl">
                <pre className="text-sm text-blue-400">
                  <code>
                    {`
GET /api/v1/docs HTTP/1.1
Host: api.example.com
Authorization: Bearer token123
Accept: application/json

{
    "status": "success",
    "data": {
        "endpoints": [...]
    }
}
                    `}
                  </code>
                </pre>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">Trusted by developers worldwide</p>
            <div className="flex justify-center space-x-8">
              <div className="text-gray-500">Company 1</div>
              <div className="text-gray-500">Company 2</div>
              <div className="text-gray-500">Company 3</div>
              <div className="text-gray-500">Company 4</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
