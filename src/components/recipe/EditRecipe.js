import React, { useEffect, useState, useRef } from 'react';
import UserProfileNavbar from '../layout/UserProfileNavbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Swal from 'sweetalert2';
import { updateRecipe } from '../../store/actions/recipeActions';
import { actionTypes } from 'redux-firestore';
import Loading from '../loading/Loading';

const EditRecipe = (props) => {
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [durationNumber, setDurationNumber] = useState(null);
  const [durationUnit, setDurationUnit] = useState(null);
  const [imageTempURL, setImageTempURL] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    updateRecipe,
    successUpdateRecipeStatus,
    resetRecipeSuccessStatus,
    errorUpdateRecipeMessage,
    cleanupRecipeErrorMessage,
    removePreviousRecipeOnMount,
    recipe,
  } = props;

  const reInputFile = useRef(null);

  useEffect(() => {
    document.title = 'Edit Recipe';

    image && URL.revokeObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      removePreviousRecipeOnMount();
    };
  }, [removePreviousRecipeOnMount]);

  useEffect(() => {
    setLoading(recipe ? false : true);
  }, [recipe]);

  if (loading) {
    return (
      <main className="px-16 py-6 bg-gray-100 md:col-span-10 mt-10 md:mt-0">
        <UserProfileNavbar />
        <Loading loading={loading} component="editRecipe" />
      </main>
    );
  }

  // duration from firestore documents
  const [recipeDurationNumber, recipeDurationUnit] = recipe?.duration.split(
    ' '
  );

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
    ],
  };
  const formats = ['bold', 'italic', 'underline', 'list', 'size'];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputFile = (e) => {
    e.preventDefault();

    const recipeImage = e.target.files[0] ?? image;

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    if (!allowedTypes.includes(recipeImage.type)) {
      return Swal.fire({
        title: 'Error',
        text: 'The selected file is not a valid image !',
        icon: 'error',
      });
    }

    setImage(recipeImage);
    setImageTempURL(URL.createObjectURL(recipeImage));
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

  const handleDurationNumberChange = (e) => {
    const rules = /^[0-9\b]+$/;

    if (e.target.value === '') {
      setDurationNumber(null);
    } else if (rules.test(e.target.value)) {
      setDurationNumber(e.target.value);
    } else {
      e.target.value = '';

      return Swal.fire({
        title: 'Error',
        text: 'Please input number on this field !',
        icon: 'error',
      });
    }
  };

  const handleDurationUnitChange = (e) => {
    const durationUnit = e.target.value;

    if (durationUnit !== '') {
      return setDurationUnit(durationUnit);
    } else {
      return setDurationUnit(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const duration = `${durationNumber ?? recipeDurationNumber} ${
      durationUnit ?? recipeDurationUnit
    }`;

    const recipeData = {
      title: title?.length ? title : recipe.title,
      image: image?.length ? image : recipe.image,
      ingredients: ingredients?.length ? ingredients : recipe.ingredients,
      instructions: instructions?.length ? instructions : recipe.instructions,
      duration,
    };

    if (
      Object.values(recipeData).some((value) => value === null) ||
      recipeData.ingredients === '<p><br></p>' ||
      recipeData.instructions === '<p><br></p>'
    ) {
      return Swal.fire({
        title: 'Error',
        text: 'Some data is still empty !',
        icon: 'error',
      });
    }

    updateRecipe(recipe.id, recipeData);
  };

  if (successUpdateRecipeStatus) {
    Swal.fire({
      title: 'Success',
      text: 'Your recipe has been updated !',
      icon: 'success',
    }).then(() => {
      resetRecipeSuccessStatus();

      return props.history.push('/myprofile'); // redirect to user's profile after updating recipe
    });
  }

  if (errorUpdateRecipeMessage) {
    Swal.fire({
      title: 'Error',
      text: errorUpdateRecipeMessage,
      icon: 'error',
    }).then(() => {
      return cleanupRecipeErrorMessage();
    });
  }

  return (
    <main className="px-16 py-6 mt-8 md:mt-0 bg-gray-100 md:col-span-10">
      <UserProfileNavbar />

      <header>
        <h2 className="text-gray-700 border-b-4 border-gray-300 text-center md:text-left text-4xl font-semibold">
          Edit recipe
        </h2>
      </header>

      <form className="mt-5" onSubmit={handleFormSubmit}>
        <div className="mb-3 flex flex-col items-center justify-center md:block">
          <h5 className="text-xl w-48 text-center md:text-left font-semibold border-b-2 border-gray-500 mb-4">
            Recipe Title
          </h5>

          <input
            type="text"
            className="shadow apperance-none border rounded w-full sm:w-3/4 lg:w-6/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleTitleChange}
            placeholder="Write a perfect name for your recipe..."
            defaultValue={recipe?.title}
          ></input>
        </div>
        <div className="my-3 flex flex-col items-center justify-center md:block">
          <h5 className="text-xl w-48 text-center md:text-left font-semibold border-b-2 border-gray-500 mb-4">
            Recipe Image
          </h5>

          <img
            src={imageTempURL ?? recipe?.image}
            alt={recipe.title}
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
              defaultValue={recipe?.ingredients}
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
              defaultValue={recipe?.instructions}
              onChange={handleInstructionsChange}
            />
          </div>
        </div>
        <div className="my-5 flex flex-col items-center justify-center md:block">
          <h5 className="text-xl w-48 text-center md:text-left font-semibold border-b-2 border-gray-500 mb-4">
            Recipe Durations
          </h5>

          <div className="flex flex-row items-center">
            <input
              className="shadow apperance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleDurationNumberChange}
              placeholder="Num"
              defaultValue={recipeDurationNumber}
            ></input>
            <select
              className="ml-3 block appearance-none w-auto bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleDurationUnitChange}
              defaultValue={recipeDurationUnit}
            >
              <option value="">--Select unit of time--</option>
              <option value="mins">Mins</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>

        <div className="my-5 text-center md:text-left">
          <button
            type="submit"
            className="rounded-lg w-48 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold"
          >
            Save changes
          </button>
        </div>
      </form>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    recipe: state?.firestore?.ordered?.recipe?.[0],
    successUpdateRecipeStatus: state?.recipe?.successUpdateRecipeStatus,
    errorUpdateRecipeMessage: state?.recipe?.errorUpdateRecipeMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRecipe: (recipeId, recipeData) =>
      dispatch(updateRecipe(recipeId, recipeData)),
    resetRecipeSuccessStatus: () =>
      dispatch({ type: 'RESET_RECIPE_SUCCESS_STATUS' }),
    cleanupRecipeErrorMessage: () =>
      dispatch({ type: 'CLEANUP_RECIPE_ERROR_MESSAGE' }),
    removePreviousRecipeOnMount: () =>
      dispatch({
        type: actionTypes.CLEAR_DATA,
        preserve: {
          data: [],
          ordered: ['recipes'],
        },
      }),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: 'recipes',
        doc: props.match.params.id,
        storeAs: 'recipe',
      },
    ];
  })
)(EditRecipe);
