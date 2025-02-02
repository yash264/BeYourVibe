import React, { useState } from 'react';

const Create = () => {
  const [media, setMedia] = useState(null); 
  const [caption, setCaption] = useState(''); 

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(URL.createObjectURL(file)); 
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = () => {
    // Logic to submit the post
    console.log('Post Submitted:', { media, caption });
    
    setMedia(null);
    setCaption('');
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
      {/* Main Content Wrapper */}
      <div className="w-full max-w-4xl bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Create Post</h2>

        {/* Media Upload */}
        <div className="w-full max-w-4xl mb-6">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="w-full cursor-pointer">
            <div className="border-2 border-gray-700 p-8 rounded-lg text-center">
              {media ? (
                <div className="relative">
                  <img
                    src={media}
                    alt="Preview"
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>
              ) : (
                <span className="text-gray-400">Click to Upload Photo/Video</span>
              )}
            </div>
          </label>
        </div>

        {/* Caption Input */}
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Write a caption..."
          rows="4"
          className="w-full max-w-4xl p-4 bg-gray-800 rounded-lg text-white border-2 border-gray-700 resize-none mb-6"
        />

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4 w-full max-w-4xl">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-400 w-full md:w-auto"
          >
            Post
          </button>
          <button
            onClick={() => {
              setMedia(null);
              setCaption('');
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-500 w-full md:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
