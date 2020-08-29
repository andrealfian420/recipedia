import React, { useState, useEffect } from 'react';
import RecipeDetailHeader from '../layout/RecipeDetailHeader';
import SignOutLinks from '../layout/SignOutLinks';
// import UserProfileNavbar from '../layout/UserProfileNavbar';
import { Link } from 'react-router-dom';
import dummyImg from '../../images/seblak.jpg';

const RecipeDetail = () => {
  useEffect(() => {
    document.title = 'Recipe Detail';
  });

  const [starClicked, setStarClicked] = useState(false);

  const handleStarClick = (e) => {
    setStarClicked(!starClicked);
  };

  return (
    <main className="px-16 py-6 bg-gray-100 md:col-span-10">
      <SignOutLinks />
      <RecipeDetailHeader />

      <div className="py-2 overflow-hidden">
        <img
          src={dummyImg}
          alt="Seblak"
          className="recipe-image object-cover w-full h-full md:h-64 rounded-md"
        />
      </div>

      <div className="p-2 my-2">
        <h3 className="text-xl font-semibold">Ingredients :</h3>

        <span>
          - 25 lembar kulit pangsit atau dimsum yang siap dipakai <br />
          - 50 gram udang yang telah dikupas <br />
          - 150 gram daging ayam yang telah dicincang <br />
          - 50 gram jamur kuping <br />
          - Merica <br />
          - Daun bawang <br />- 1 buah wortel yang sudah dipotong kecil-kecil
        </span>
      </div>

      <div className="p-2 my-2">
        <h3 className="text-xl font-semibold">How to make :</h3>

        <div className="recipe-step text-justify">
          <p>
            Pertama potong udang, jamur, dan daging ayam dalam potongan yang
            kecil. Tak lupa juga, mencincang halus daun bawang. Setelah itu
            campurkan potongan udang, daging ayam, jamur, dan daun bawang
            kemudian taburi bumbu garam, gula pasir dan merica. Tambahkan dan
            uleni kepung kanji pada siomay.
          </p>

          <p>
            Kemudian ambil selembar kulit pangsit, isi dengan campuran adonan
            udang dan yam. Satukan ujung-ujung kulit pangsit. Perhatikan jangan
            sampai kulit siomay penuh dengan isi supaya tidak tumpah. Kemudian
            hias bagian atasnya dengan wotel. Setelah itu, kukus di panic selama
            15 menit. Dan setelah matang, sajikan dengan saus sambal.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center mt-6">
        <svg
          viewBox="0 0 20 20"
          fill={!starClicked ? 'currentColor' : '#fae13c'}
          className="star w-12 h-12 cursor-pointer"
          onClick={handleStarClick}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>

        <span>Give this recipe a star !</span>
      </div>

      <div className="mt-6 text-center md:text-left text-lg">
        <Link to="/" className="hover:underline">
          &larr; Back to homepage
        </Link>
      </div>
    </main>
  );
};

export default RecipeDetail;
