import React, { useEffect, useState, useRef } from 'react';
import SignOutLinks from '../layout/SignOutLinks';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateRecipe = () => {
  useEffect(() => {
    document.title = 'Create Recipe';
  });

  const [isImageExist, setIsImageExist] = useState(false);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const reInputFile = useRef(null);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
    ],
  };
  const formats = ['bold', 'italic', 'underline', 'list', 'size'];

  const handleInputFile = (e) => {
    e.preventDefault();

    const inputtedImage = e.target.files[0] ?? image;

    setImage(URL.createObjectURL(inputtedImage));
    setIsImageExist(true);
  };

  const handleReInputFile = () => {
    reInputFile.current.click();
  };

  const handleIngredientsChange = (ingredientsInput) => {
    setIngredients(ingredientsInput);
  };

  const handleInstructionsChange = (InstructionsInput) => {
    setInstructions(InstructionsInput);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const recipeData = { image, ingredients, instructions };

    console.log(recipeData);
  };

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      <SignOutLinks />

      <header>
        <h2 className="text-gray-700 border-b-4 border-gray-300 text-center md:text-left text-4xl font-semibold">
          Create New Recipe
        </h2>
      </header>

      <form className="mt-5" onSubmit={handleFormSubmit}>
        <div className="mb-3 flex flex-col items-center justify-center md:block">
          <h5 className="text-xl w-48 text-center md:text-left font-semibold border-b-2 border-gray-500 mb-4">
            Recipe Image
          </h5>
          {!isImageExist ? (
            <label className="w-64 flex flex-col items-center px-4 py-6 mt-2 bg-white text-blue-600 rounded-lg shadow-lg tracking-wide uppercase border border-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                Select an image
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpg,image/jpeg"
                onChange={handleInputFile}
              />
            </label>
          ) : (
            <div>
              <img
                src={image}
                alt=""
                className="w-full md:w-6/12 h-64 mt-2 cursor-pointer object-cover rounded-md border-4 border-gray-300 outline-none"
                onClick={handleReInputFile}
              />
              <input
                type="file"
                id="image"
                ref={reInputFile}
                className="hidden"
                onChange={handleInputFile}
              />
            </div>
          )}
        </div>
        <div className="my-5 flex flex-col items-center justify-center md:block">
          <h5 className="text-xl w-48 text-center md:text-left font-semibold border-b-2 border-gray-500 mb-4">
            Recipe Ingredients
          </h5>

          <div className="w-full md:w-3/4 max-h-full">
            <ReactQuill
              className="bg-white"
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Write your ingredients here..."
              value={ingredients}
              onChange={handleIngredientsChange}
            />
          </div>
        </div>
        <div className="my-5 flex flex-col items-center justify-center md:block">
          <h5 className="text-xl w-48 text-center md:text-left font-semibold border-b-2 border-gray-500 mb-4">
            Recipe Instructions
          </h5>

          <div className="w-full md:w-3/4 max-h-full">
            <ReactQuill
              className="bg-white"
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Write your recipe instructions here..."
              value={instructions}
              onChange={handleInstructionsChange}
            />
          </div>
        </div>

        <div className="my-5 text-center md:text-left">
          <button
            type="submit"
            className="rounded-lg w-48 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateRecipe;
