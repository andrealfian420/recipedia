import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/actions/recipeActions';

const MyRecipe = ({ myRecipes, deleteRecipe, isOwnProfile }) => {
  const handleDeleteButton = (recipeId) => {
    Swal.fire({
      title: 'Are you sure about this?',
      text: 'The selected recipe will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, please delete it',
      allowOutsideClick: false,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteRecipe(recipeId);

        Swal.fire(
          'Deleted!',
          'The selected recipe has been deleted!',
          'success'
        );
      }
    });
  };

  const recipeCards = myRecipes.map((recipe) => {
    return (
      <div className="card hover:shadow-lg" key={recipe.id}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-img"
          loading="lazy"
        />
        <div className="m-4 mb-2 flex flex-col">
          <Link
            to={`/recipe/${recipe.slug}`}
            className="font-bold hover:underline"
          >
            {recipe.title}
          </Link>
          {isOwnProfile ? (
            <div className="mt-1">
              <Link
                to={`/edit/${recipe.id}`}
                className="text-white bg-green-600 hover:bg-green-500 cursor-pointer rounded-sm p-1 mr-1"
              >
                Update
              </Link>
              <span
                className="text-white bg-red-600 hover:bg-red-500 cursor-pointer rounded-sm p-1"
                onClick={() => handleDeleteButton(recipe.id)}
              >
                Delete
              </span>
            </div>
          ) : null}
        </div>
        <div className="card-badge">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="clock w-6 h-6 inline-block"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span> {recipe.duration}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
      {recipeCards}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecipe: (recipeId) => dispatch(deleteRecipe(recipeId)),
  };
};

export default connect(null, mapDispatchToProps)(MyRecipe);
