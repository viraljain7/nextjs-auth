import React from "react";

const Profile = ({ params }: any) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <div className="text-center mt-5">
                <h1 className="text-4xl font-semibold text-gray-900">
                  Profile
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Welcome to your profile page!
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Name:</span>
                  <span>Your Name</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Email:</span>
                  <span>youremail@example.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Username:</span>
                  <span>@username</span>
                </div>
                {/* Add more profile information here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
