"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../GlobalRedux/Features/color/colorSlice'; // Import the setColor action
import { RootState } from '../GlobalRedux/store'; // Import RootState to access Redux state
import Link from 'next/link';

const SettingsPage: React.FC = () => {
  // Get the selected color from Redux store
  const selectedColor = useSelector((state: RootState) => state.color.selectedColor);
  
  // Dispatch method to update the color in Redux
  const dispatch = useDispatch();

  // Handler to update color in Redux
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setColor(event.target.value));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h2>

          {/* Color Slider */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Theme Color
            </label>
            <input
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
              className="w-full h-12 border rounded-lg cursor-pointer"
            />
            <div className="mt-2 text-sm text-gray-500">
              <p>Selected Color: {selectedColor}</p>
            </div>
          </div>

          {/* Example of how the selected color is applied */}
          <div
            className="mt-4 p-4 text-white rounded-md"
            style={{ backgroundColor: selectedColor }}
          >
            This is a preview of the selected color.
          </div>
        </div>
        <div className="mt-6 w-full">
            <Link href={"/"}>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Go Home
            </button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default SettingsPage;
