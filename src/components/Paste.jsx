import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from "../redux/pasteSlice";
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title &&
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }


  const handleShare = (paste) => {

  const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

  if (navigator.share) {
    navigator.share({
      title: paste.title,
      text: paste.content,
      url: shareUrl
    })
    .then(() => console.log("Shared successfully"))
    .catch((error) => console.log("Error sharing", error));
  } else {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied!");
  }

};



  return (
    <div>
      {/* <input
      className='p-2 rounded-2xl min-w-[600px] mt-5'
      type='search'
      placeholder='search here'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      /> */}

      <input
      className="p-3 rounded-full w-[600px] border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      type="search"
      placeholder="Search your paste..."
      />

      <h2 className="text-xl font-bold mt-6 mb-4">
  All Pastes
</h2>


      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
               // <div className='border' key={paste?._id}>
               <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4" key={paste?._id}>
                      <div>
                        {paste.title}
                      </div>
                      <div>
                        {paste.content}
                      </div>
                      <div className='flex flex-row gap-4 place-content-evenly'>
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300">
                         <a href={`/?pasteId=${paste?._id}`}>
                           Edit
                         </a>
                        </button>
                        
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition duration-300">
                         <a href={`/pastes/${paste?._id}`}>
                          View
                         </a>
                         </button>
                        
                        <button 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                        onClick={() => handleDelete(paste?._id)}>
                          Delete
                        </button>
                        
                        <button 
                        className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-700 transition duration-300"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content)
                          toast.success("copied to clipboard")
                        }}>
                          Copy
                        </button>

                       {/* homework:share button ka logic */}
                        <button 
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-purple-700 transition duration-300"
                        onClick={() => handleShare(paste)}>
                          Share
                        </button>
                        </div>
                       <div className="text-gray-500 text-sm mt-2">
  {new Date(paste.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</div>
                  </div>

              )
            }
          )
        }

      </div>
    </div>
  )
}

export default Paste
