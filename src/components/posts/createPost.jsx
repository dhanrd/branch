'use client';
import { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

export default function CreatePostModal({ onClose, onSubmit, author = 'You', hideGroupSelector = false, userGroups = [], groupId = null, isEvent }) {
  
  const editor = useRef(null);
  const [step, setStep] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media: null,
    audience: 'everyone',
    eventDate: '',
    eventTime: '',
  });

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title cannot be empty');
      return;
    }
    if (!formData.content.trim()) {
      alert('Description cannot be empty');
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {

    if (!formData.audience) {
      alert('Please select where to post (Everyone or a Group).');
      return;
    }

    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      author,
      likes: 0,
      comments: 0,
      hasImage: !!formData.media,
      audience: formData.audience,
      groupId: formData.groupId || null,
      type: isEvent ? 'event' : 'posts',
    };
    
    onSubmit(newPost);
    setShowNotification(true); 
    setTimeout(() => {
      setShowNotification(false);
      onClose();
    }, 3000);
  };

  return (
    <>
    {/* Notification outside popup*/}
    {showNotification && (
    <div className="fixed top-6 right-6 z-[9999] w-[calc(100%-300px)] max-w-[1250px] bg-[#2f2f2f] text-white px-6 py-4 rounded-lg flex items-start gap-4 shadow-md text-[20px] whitespace-nowrap">
      <div className="text-[#4caf9e] text-2xl">✔️</div>
      <div>
        <p className="text-sm font-medium">
          '{formData.title || `Your  ${isEvent ? 'event' : 'post'}`}' was posted successfully to 'Everyone'
        </p>
        <a href="#" className="text-[#4caf9e] underline text-sm">See {isEvent ? 'event' : 'post'}</a>
      </div>
    </div>
    )}

    {!showNotification && (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="w-[1000px] h-[600px] bg-[#3d3d3d] rounded-md shadow-lg border border-[#444] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 bg-[#555555] rounded-t-md">

          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            {isEvent ? 'Create New Event' : 'Create New Post'}</h2>
          <button onClick={onClose} className="text-white text-xl hover:text-gray-300 transition">×</button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleContinue} className="flex flex-col justify-between flex-grow p-6 space-y-4">
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full p-3 rounded bg-[#5c5c5c] text-white placeholder-gray-400"
                value={formData.title}
                onChange={handleChange}
              />

              <label className="flex items-center space-x-2 cursor-pointer text-white">
                <input
                  type="file"
                  name="media"
                  className="hidden"
                  onChange={handleChange}
                />
                <div className="flex items-center bg-[#5c5c5c] text-sm px-3 py-1 rounded hover:bg-[#555] transition">
                  📎 Attach Media
                </div>
              </label>
              {isEvent && (
                <div className="flex items-center bg-[#5c5c5c] text-sm px-3 py-1 rounded hover:bg-[#555] transition">
                  <h3 className="text-sm font-semibold text-white">Event Date & Time: </h3>
                  <input type="date" name="eventDate" className="bg-[#5c5c5c] text-sm px-3 py-1 rounded hover:bg-[#555] transition" value={formData.eventDate} onChange={handleChange} />
                  <input type="time" name="eventTime" className="bg-[#5c5c5c] text-sm px-3 py-1 rounded hover:bg-[#555] transition" value={formData.eventTime} onChange={handleChange}/>
                </div>
              )}
            </div>

            <JoditEditor
              ref={editor}
              value={formData.content}
              config={{
                readonly: false,
                theme: 'dark',
                height: 300,
                toolbarSticky: false,
                buttons: ['bold', 'italic', 'underline', '|', 'superscript', 'subscript'],
              }}
              onBlur={(newContent) =>
                setFormData((prev) => ({ ...prev, content: newContent }))
              }
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 bg-[#4caf9e] hover:bg-[#3d9b8d] text-white font-semibold rounded"
              >
                Continue
                <span className="text-sm">→</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col justify-between flex-grow p-6 space-y-6">
          {/* 2nd popup */}
          <div className="bg-[#2e2e2e] p-4 rounded text-white space-y-2 relative">
            <p className="text-sm text-gray-300">{author}</p>
            <h3 className="text-lg font-semibold">{formData.title}</h3>
              {isEvent && (
                <div className="absolute top-4 right-4 text-right">
                  <h3 className="text-sm font-semibold">Event Date & Time:</h3>
                  <p>{formData.eventDate} at {formData.eventTime}</p>
                </div>
              )}
            <div dangerouslySetInnerHTML={{ __html: formData.content }} />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-white">Post To:</p>

            {/* ✅ Always show 'Everyone' */}
            <label className="flex items-center gap-2 text-white">
              <input
                type="radio"
                name="audience"
                value="everyone"
                checked={formData.audience === 'everyone'}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    audience: 'everyone',
                    groupId: null
                  }))
                }
              />
              <span>Everyone</span>
            </label>

            {/* ✅ Only show groups if selector is enabled and user has joined groups */}
            {!hideGroupSelector && userGroups.length > 0 && (
              <>
                <p className="font-semibold mt-4">Groups</p>
                <div className="ml-4 space-y-2">
                {userGroups.map((group) => (
                  <label key={group.id} className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="audience"
                      value={group.name}
                      checked={formData.audience === group.name}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          audience: group.name,
                          groupId: group.id
                        }))
                      }
                    />
                    <span>{group.name}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ✅ Post/Draft/Back Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-4 py-2 bg-[#555] text-white rounded hover:bg-[#666]"
          >
            &lt;
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              className="px-5 py-2 bg-[#777] text-white rounded hover:bg-[#888]"
            >
              Draft
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4caf9e] text-white rounded font-semibold hover:bg-[#3d9b8d]"
            >
              Post
            </button>
          </div>
        </div>
      </form>
        )}
      </div>
    </div>
    )}
    </>
  );
}
