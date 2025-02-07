const MainContent = () => {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Service 1</h3>
              <p className="mt-4 text-gray-600">
                Detailed description of the service and its benefits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Service 2</h3>
              <p className="mt-4 text-gray-600">
                Detailed description of the service and its benefits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Service 3</h3>
              <p className="mt-4 text-gray-600">
                Detailed description of the service and its benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default MainContent;
  