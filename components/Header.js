import { useState } from "react";
import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = useState(""); // This is called array destructuring and the useState is a function
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [nOfGuests, setNofGuests] = useState(1);
  const router = useRouter();

  const handleSelect = (ranges) => {
    console.log(ranges);
    setStartDate(ranges.selection?.startDate);
    setEndDate(ranges.selection?.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const Search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberofguests: nOfGuests,
      },
    });

    setSearchInput("");
  };
  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10'>
      {/* Left */}
      <div
        className='relative flex items-center h-10 cursor-pointer my-auto'
        onClick={() => router.push("/")}
      >
        <Image
          src='https://links.papareact.com/qd3'
          layout='fill'
          objectFit='contain'
          objectPosition='left'
        />
      </div>
      {/* Middle */}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
        <input
          className='pl-5 pr-5 bg-transparent outline-none w-100 flex-grow text-sm text-gray-600 placeholder-gray-400'
          type='text'
          placeholder={placeholder ? placeholder : "Start your search"}
          value={searchInput}
          onChange={({ target }) => setSearchInput(target.value)}
        />
        <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-auto md:mx-2' />
      </div>
      {/* Right */}
      <div className='flex items-center space-x-4 justify-end text-gray-500 '>
        <p className='hidden md:inline cursor-pointer'>Become a host</p>
        <GlobeAltIcon className='h-6 cursor-pointer' />
        <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
          <MenuIcon className='h-6' />
          <UserCircleIcon className='h-6' />
        </div>
      </div>

      {searchInput && (
        <div className='flex flex-col col-span-3 mx-auto'>
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div className='flex items-center border-b mb-4'>
            <h2 className='text-2xl flex-grow font-semibold'>
              Number of Guests
            </h2>
            <UsersIcon className='h-5' />
            <input
              type='number'
              className='w-12 pl-2 text-lg outline-none text-red-400'
              value={nOfGuests}
              min={1}
              onChange={({ target }) => setNofGuests(target.value)}
            />
          </div>
          <div className='flex'>
            <button
              className='flex-grow text-gray-500'
              onClick={() => setSearchInput("")}
            >
              Cancel
            </button>
            <button onClick={Search} className='flex-grow text-red-400'>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;


